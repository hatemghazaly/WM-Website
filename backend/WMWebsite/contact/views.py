import base64
import json
import logging
import urllib.request
from urllib.error import HTTPError, URLError
from zoneinfo import ZoneInfo

from django.conf import settings
from django.core.mail import EmailMessage, get_connection
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import CareerApplication, ContactMessage

logger = logging.getLogger(__name__)

ROLE_TO_APPLIED_JOB = {
    "Full Time Medical Representative": "full",
    "Part Time Medical Representative": "part",
    "District Manager": "dm",
    "National Sales Manager": "nsm",
    "Product Manager": "pm",
    "Associate Product Manager": "apm",
    "Business Unit Manager": "bum",
    "Accountant": "accountant",
    "HR Specialist": "hr",
    "IT": "it",
    "HR Manager": "hrm",
    "Sales Representative": "sr",
    "Supply Chain Specialist": "sc",
    "Supply Chain Manager": "scm",
    "Office Administrator": "oa",
    "Franchise Manager": "fm",
    "Regulatory Affairs Specialist": "ra",
    "Regulatory Affairs Manager": "ram",
    "Office Boy": "ob",
    "Other": "other",
}

RESIDENCE_CHOICES = {
    "cai": "Cairo",
    "alx": "Alexandria",
    "giz": "Giza",
    "sharq": "Sharqia",
    "dak": "Dakahlia",
    "beh": "Beheira",
    "qaly": "Qalyubia",
    "mnf": "Monufia",
    "ghar": "Gharbia",
    "kfr": "Kafr El Sheikh",
    "dam": "Damietta",
    "por": "Port Said",
    "ism": "Ismailia",
    "suez": "Suez",
    "lux": "Luxor",
    "asw": "Aswan",
    "soh": "Sohag",
    "qena": "Qena",
    "asy": "Asyut",
    "min": "Minya",
    "beni": "Beni Suef",
    "fay": "Fayoum",
    "wad": "New Valley",
    "mat": "Matrouh",
    "red": "Red Sea",
    "ns": "North Sinai",
    "ss": "South Sinai",
}

RESIDENCE_LABEL_TO_CODE = {
    label.lower(): code for code, label in RESIDENCE_CHOICES.items()
}


def _error_response(message: str, *, status: int = 400, **extra):
    payload = {"error": message}
    payload.update(extra)
    return JsonResponse(payload, status=status)


def _build_jsonrpc_request(
    service: str, method: str, args: list, kwargs: dict | None = None
) -> bytes:
    return json.dumps(
        {
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
                "service": service,
                "method": method,
                "args": args,
                **({"kwargs": kwargs} if kwargs else {}),
            },
        }
    ).encode("utf-8")


def _remote_jsonrpc(url: str, payload: bytes) -> tuple[bool, dict]:
    request = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            response_text = response.read().decode("utf-8")
            data = json.loads(response_text or "{}")
            if response.status >= 400 or "error" in data:
                return False, data
            return True, data
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        try:
            data = json.loads(body)
        except Exception:
            data = {"error": body or str(exc)}
        return False, data
    except URLError as exc:
        return False, {"error": str(exc)}


def _today_in_cairo() -> str:
    return (
        timezone.localtime(timezone.now(), ZoneInfo("Africa/Cairo")).date().isoformat()
    )


def _recruitment_jsonrpc_url() -> str:
    base_url = str(settings.RECRUITMENT_SERVICE_URL or "").strip().rstrip("/")
    if not base_url:
        return ""
    if base_url.endswith("/jsonrpc"):
        return base_url
    return f"{base_url}/jsonrpc"


def _split_full_name(payload: dict) -> tuple[str, str]:
    full_name = str(payload.get("full_name", "")).strip()
    if full_name:
        parts = full_name.split()
        if len(parts) == 1:
            return parts[0], ""

        return parts[0], " ".join(parts[1:])

    first_name = str(payload.get("first_name", "")).strip()
    last_name = str(payload.get("last_name", "")).strip()
    return first_name, last_name


def _normalize_residence(value: object) -> str:
    residence = str(value or "").strip()
    if not residence:
        return ""

    if residence in RESIDENCE_CHOICES:
        return residence

    return RESIDENCE_LABEL_TO_CODE.get(residence.lower(), "")


def send_to_recruitment_service(payload: dict) -> tuple[bool, str]:
    if not all(
        [
            _recruitment_jsonrpc_url(),
            settings.RECRUITMENT_DB,
            settings.RECRUITMENT_USER,
            settings.RECRUITMENT_PASSWORD,
        ]
    ):
        return False, "Recruitment service credentials are not configured."

    url = _recruitment_jsonrpc_url()
    auth_payload = _build_jsonrpc_request(
        "common",
        "authenticate",
        [
            settings.RECRUITMENT_DB,
            settings.RECRUITMENT_USER,
            settings.RECRUITMENT_PASSWORD,
            {},
        ],
    )
    ok, auth_response = _remote_jsonrpc(url, auth_payload)
    if not ok or auth_response.get("result") is None:
        return False, str(auth_response.get("error", auth_response))

    uid = auth_response["result"]
    if not uid:
        return False, "Recruitment authentication failed."

    applicant_values = {
        "name": payload.get("name"),
        "stage_id": payload.get("stage_id", 1),
        "email": payload.get("email"),
        "phone_no": payload.get("phone"),
        "date": payload.get("date") or _today_in_cairo(),
        "cover_message": payload.get("message"),
        "applied_jobs": ROLE_TO_APPLIED_JOB.get(
            str(payload.get("role") or "").strip(), "other"
        ),
        "source": "wb",
    }
    # if payload.get("has_a_car") is not None:
    #     applicant_values["has_a_car"] = bool(payload.get("has_a_car"))

    logger.error(
        "HAS_A_CAR raw=%r type=%s",
        payload.get("has_a_car"),
        type(payload.get("has_a_car")).__name__,
    )

    if payload.get("has_a_car") is not None:
        applicant_values["has_a_car"] = payload.get("has_a_car")

    residence = str(payload.get("residence") or "").strip()
    if residence:
        applicant_values["residence"] = residence
    cv_attachment_base64 = str(payload.get("cv_attachment_base64") or "").strip()
    if cv_attachment_base64:
        applicant_values["cv_attachment"] = cv_attachment_base64

    create_payload = _build_jsonrpc_request(
        "object",
        "execute_kw",
        [
            settings.RECRUITMENT_DB,
            uid,
            settings.RECRUITMENT_PASSWORD,
            "recruitment",
            "create",
            [applicant_values],
        ],
    )
    ok, create_response = _remote_jsonrpc(url, create_payload)
    if not ok:
        return False, str(create_response.get("error", create_response))
    return True, json.dumps(create_response)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def submit_career_application(request):
    if request.method == "OPTIONS":
        return JsonResponse({"ok": True})

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return _error_response("Invalid JSON payload.")

    first_name, last_name = _split_full_name(payload)
    required_fields = [
        "email",
        "role",
        "subject",
        "message",
    ]
    missing_fields = [
        field for field in required_fields if not str(payload.get(field, "")).strip()
    ]
    if not first_name:
        missing_fields.append("full_name")
    if not last_name and not str(payload.get("full_name", "")).strip():
        missing_fields.append("full_name")

    normalized_residence = _normalize_residence(payload.get("residence"))
    if payload.get("residence") and not normalized_residence:
        return _error_response(
            "Invalid residence selection.",
            valid_residences=list(RESIDENCE_CHOICES.keys()),
        )
    if missing_fields:
        return _error_response(
            "Missing required fields.",
            missing_fields=missing_fields,
        )

    career_application = CareerApplication.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=str(payload["email"]).strip(),
        phone=str(payload.get("phone", "")).strip(),
        role=str(payload["role"]).strip(),
        subject=str(payload["subject"]).strip(),
        message=str(payload["message"]).strip(),
        cv_attachment_name=str(payload.get("cv_attachment_name", "")).strip(),
        cv_attachment_type=str(payload.get("cv_attachment_type", "")).strip(),
    )

    skip_email = request.headers.get("X-Skip-Email") == "1"
    if skip_email:
        logger.info(
            "Skipping SMTP delivery for career application %s.",
            career_application.id,
        )
        return JsonResponse(
            {
                "message": "Your career application was saved successfully.",
                "id": career_application.id,
                "email_sent": False,
                "saved": True,
                "smtp_skipped": True,
            },
            status=201,
        )

    email_subject = f"Career application: {career_application.role}"
    email_body = "\n".join(
        [
            "A new career application was received.",
            "",
            f"Name: {career_application.first_name} {career_application.last_name}",
            f"Email: {career_application.email}",
            f"Phone: {career_application.phone or 'N/A'}",
            f"Role: {career_application.role}",
            f"Subject: {career_application.subject}",
            "",
            "Message:",
            career_application.message,
        ]
    )

    email_sent = False
    last_error = None
    smtp_attempts = [
        {
            "EMAIL_HOST": settings.EMAIL_HOST,
            "EMAIL_PORT": settings.EMAIL_PORT,
            "EMAIL_USE_SSL": settings.EMAIL_USE_SSL,
            "EMAIL_USE_TLS": settings.EMAIL_USE_TLS,
        },
        {
            "EMAIL_HOST": settings.EMAIL_HOST,
            "EMAIL_PORT": 587,
            "EMAIL_USE_SSL": False,
            "EMAIL_USE_TLS": True,
        },
    ]

    for attempt in smtp_attempts:
        try:
            connection = get_connection(
                backend=settings.EMAIL_BACKEND,
                host=attempt["EMAIL_HOST"],
                port=attempt["EMAIL_PORT"],
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                use_tls=attempt["EMAIL_USE_TLS"],
                use_ssl=attempt["EMAIL_USE_SSL"],
                fail_silently=False,
            )
            message = EmailMessage(
                subject=email_subject,
                body=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_RECIPIENT_EMAIL],
                reply_to=[career_application.email],
                connection=connection,
            )

            attachment_base64 = payload.get("cv_attachment_base64")
            if career_application.cv_attachment_name and attachment_base64:
                try:
                    attachment_bytes = base64.b64decode(str(attachment_base64))
                    message.attach(
                        career_application.cv_attachment_name,
                        attachment_bytes,
                        career_application.cv_attachment_type
                        or "application/octet-stream",
                    )
                except Exception as exc:
                    logger.warning(
                        "Failed to attach CV for career application %s: %s",
                        career_application.id,
                        exc,
                    )

            email_sent = message.send(fail_silently=False) > 0
            if email_sent:
                break
        except Exception as exc:
            last_error = exc

    if not email_sent and last_error is not None:
        logger.warning("Career application email delivery failed: %s", last_error)

    recruitment_payload = {
        "name": " ".join(
            part
            for part in [career_application.first_name, career_application.last_name]
            if part
        ),
        "stage_id": 1,
        "email": career_application.email,
        "phone": career_application.phone,
        "date": _today_in_cairo(),
        "residence": normalized_residence,
        "role": career_application.role,
        "subject": career_application.subject,
        "message": career_application.message,
        "cv_attachment_base64": str(payload.get("cv_attachment_base64", "")).strip(),
    }
    if payload.get("has_a_car") is not None:
        recruitment_payload["has_a_car"] = bool(payload.get("has_a_car"))
    recruitment_sent, recruitment_response = send_to_recruitment_service(
        recruitment_payload
    )
    if not recruitment_sent:
        logger.warning(
            "Career application recruitment send failed: %s",
            recruitment_response,
        )

    response_payload = {
        "id": career_application.id,
        "email_sent": email_sent,
        "recruitment_sent": recruitment_sent,
    }

    if recruitment_sent:
        response_payload["message"] = (
            f"Your career application was sent to {settings.CONTACT_RECIPIENT_EMAIL} and forwarded to recruitment."
            if email_sent
            else "Your career application was forwarded to recruitment."
        )
        return JsonResponse(response_payload, status=201)

    response_payload["message"] = (
        "Your career application was saved, but recruitment forwarding failed."
    )
    response_payload["recruitment_error"] = recruitment_response
    return JsonResponse(response_payload, status=502)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def submit_contact_message(request):
    if request.method == "OPTIONS":
        return JsonResponse({"ok": True})

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return _error_response("Invalid JSON payload.")

    required_fields = [
        "first_name",
        "last_name",
        "email",
        "subject",
        "message",
    ]
    missing_fields = [
        field for field in required_fields if not str(payload.get(field, "")).strip()
    ]
    if missing_fields:
        return _error_response(
            "Missing required fields.",
            missing_fields=missing_fields,
        )

    contact_message = ContactMessage.objects.create(
        first_name=str(payload["first_name"]).strip(),
        last_name=str(payload["last_name"]).strip(),
        email=str(payload["email"]).strip(),
        phone=str(payload.get("phone", "")).strip(),
        company=str(payload.get("company", "")).strip(),
        subject=str(payload["subject"]).strip(),
        message=str(payload["message"]).strip(),
    )

    skip_email = request.headers.get("X-Skip-Email") == "1"
    if skip_email:
        logger.info(
            "Skipping SMTP delivery for contact submission %s.", contact_message.id
        )
        return JsonResponse(
            {
                "message": "Your contact message was saved successfully.",
                "id": contact_message.id,
                "email_sent": False,
                "saved": True,
                "smtp_skipped": True,
            },
            status=201,
        )

    email_subject = f"Contact form submission: {contact_message.subject}"
    email_body = "\n".join(
        [
            "A new contact form submission was received.",
            "",
            f"Name: {contact_message.first_name} {contact_message.last_name}",
            f"Email: {contact_message.email}",
            f"Phone: {contact_message.phone or 'N/A'}",
            f"Company: {contact_message.company or 'N/A'}",
            f"Subject: {contact_message.subject}",
            "",
            "Message:",
            contact_message.message,
        ]
    )

    email_sent = False

    smtp_attempts = [
        {
            "EMAIL_HOST": settings.EMAIL_HOST,
            "EMAIL_PORT": settings.EMAIL_PORT,
            "EMAIL_USE_SSL": settings.EMAIL_USE_SSL,
            "EMAIL_USE_TLS": settings.EMAIL_USE_TLS,
        },
        {
            "EMAIL_HOST": settings.EMAIL_HOST,
            "EMAIL_PORT": 587,
            "EMAIL_USE_SSL": False,
            "EMAIL_USE_TLS": True,
        },
    ]

    last_error = None
    for attempt in smtp_attempts:
        try:
            connection = get_connection(
                backend=settings.EMAIL_BACKEND,
                host=attempt["EMAIL_HOST"],
                port=attempt["EMAIL_PORT"],
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                use_tls=attempt["EMAIL_USE_TLS"],
                use_ssl=attempt["EMAIL_USE_SSL"],
                fail_silently=False,
            )
            message = EmailMessage(
                subject=email_subject,
                body=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_RECIPIENT_EMAIL],
                reply_to=[contact_message.email],
                connection=connection,
            )
            email_sent = message.send(fail_silently=False) > 0
            if email_sent:
                break
        except Exception as exc:
            last_error = exc

    if not email_sent:
        if last_error is not None:
            logger.warning("Contact email delivery failed: %s", last_error)

    response_payload = {
        "message": (
            f"Your contact message was sent to {settings.CONTACT_RECIPIENT_EMAIL}."
            if email_sent
            else "Your contact message was saved successfully."
        ),
        "id": contact_message.id,
        "email_sent": email_sent,
    }

    return JsonResponse(response_payload, status=201)
