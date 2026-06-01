import json
import logging

from django.conf import settings
from django.core.mail import EmailMessage, get_connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import ContactMessage


logger = logging.getLogger(__name__)


def _error_response(message: str, *, status: int = 400, **extra):
    payload = {"error": message}
    payload.update(extra)
    return JsonResponse(payload, status=status)


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
