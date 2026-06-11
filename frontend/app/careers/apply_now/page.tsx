"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileUser,
  Mail,
  Phone,
  User,
  BriefcaseBusiness,
  MessageSquareText,
  Paperclip,
} from "lucide-react";

import {
  getRoleOptions,
  normalizeCareersConfig,
  type RoleOption,
} from "@/lib/careers-data";

export const dynamic = "force-dynamic";

const residenceOptions = [
  { value: "", label: "Select your residence" },
  { value: "cai", label: "Cairo" },
  { value: "alx", label: "Alexandria" },
  { value: "giz", label: "Giza" },
  { value: "sharq", label: "Sharqia" },
  { value: "dak", label: "Dakahlia" },
  { value: "beh", label: "Beheira" },
  { value: "qaly", label: "Qalyubia" },
  { value: "mnf", label: "Monufia" },
  { value: "ghar", label: "Gharbia" },
  { value: "kfr", label: "Kafr El Sheikh" },
  { value: "dam", label: "Damietta" },
  { value: "por", label: "Port Said" },
  { value: "ism", label: "Ismailia" },
  { value: "suez", label: "Suez" },
  { value: "lux", label: "Luxor" },
  { value: "asw", label: "Aswan" },
  { value: "soh", label: "Sohag" },
  { value: "qena", label: "Qena" },
  { value: "asy", label: "Asyut" },
  { value: "min", label: "Minya" },
  { value: "beni", label: "Beni Suef" },
  { value: "fay", label: "Fayoum" },
  { value: "wad", label: "New Valley" },
  { value: "mat", label: "Matrouh" },
  { value: "red", label: "Red Sea" },
  { value: "ns", label: "North Sinai" },
  { value: "ss", label: "South Sinai" },
] as const;

export default function ApplyNowPage() {
  return (
    <Suspense fallback={<ApplyNowSkeleton />}>
      <ApplyNowForm />
    </Suspense>
  );
}

function ApplyNowForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const initialRole = roleParam ?? "";

  const [availableRoles, setAvailableRoles] = useState<RoleOption[]>([]);
  const [role, setRole] = useState(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [residence, setResidence] = useState("");
  const [hasACar, setHasACar] = useState(false);
  const [subject, setSubject] = useState(`Application for ${initialRole}`);
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const reveal = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  useEffect(() => {
    let cancelled = false;

    async function loadCareersConfig() {
      try {
        const response = await fetch("/api/admin/careers", {
          cache: "no-store",
        });
        const payload = (await response.json()) as unknown;

        if (!response.ok) {
          throw new Error("We could not load the latest roles.");
        }

        const config = normalizeCareersConfig(payload);
        const nextRoles = getRoleOptions(config);
        const preferredRole = roleParam ?? "";

        if (!cancelled) {
          setAvailableRoles(nextRoles);

          setRole((currentRole) => {
            const preferredRoleOption = nextRoles.find(
              (option) =>
                option.label === preferredRole || option.code === preferredRole,
            );

            if (preferredRoleOption) {
              setSubject(`Application for ${preferredRoleOption.label}`);
              return preferredRoleOption.label;
            }

            const currentRoleOption = nextRoles.find(
              (option) => option.label === currentRole,
            );
            if (currentRoleOption) {
              return currentRoleOption.label;
            }

            const fallbackRole = nextRoles[0];
            if (fallbackRole) {
              setSubject(`Application for ${fallbackRole.label}`);
              return fallbackRole.label;
            }

            return currentRole;
          });
        }
      } catch {
        if (!cancelled) {
          setAvailableRoles([]);
          setRole("");
          setSubject("");
        }
      }
    }

    loadCareersConfig();

    return () => {
      cancelled = true;
    };
  }, [roleParam]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setAttemptedSubmit(true);
    setFeedback("");
    setCvError("");

    const selectedRole = availableRoles.find((item) => item.label === role);
    const appliedJob = selectedRole?.code.trim() ?? "";
    const missingRequiredField =
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !residence ||
      !role.trim() ||
      !subject.trim() ||
      !message.trim() ||
      !cvFile;

    if (missingRequiredField) {
      setStatus("error");
      setFeedback(
        !cvFile
          ? "Please attach your CV before submitting."
          : "Please complete all required fields highlighted in red.",
      );
      return;
    }

    setStatus("submitting");

    try {
      if (!selectedRole || !appliedJob) {
        setStatus("error");
        setFeedback(
          "The selected role is missing an applied job code. Please refresh the page or contact support.",
        );
        return;
      }

      let cv_attachment_name: string | undefined;
      let cv_attachment_type: string | undefined;
      let cv_attachment_base64: string | undefined;

      if (cvFile) {
        if (cvFile.size > 5 * 1024 * 1024) {
          setCvError("CV file must be 5MB or smaller.");
          throw new Error("CV file must be 5MB or smaller.");
        }

        cv_attachment_name = cvFile.name;
        cv_attachment_type = cvFile.type || "application/octet-stream";
        const fileBuffer = await cvFile.arrayBuffer();
        const bytes = new Uint8Array(fileBuffer);
        let binary = "";
        bytes.forEach((byte) => {
          binary += String.fromCharCode(byte);
        });
        cv_attachment_base64 = btoa(binary);
      }

      const response = await fetch("/api/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          residence,
          role: selectedRole.label,
          applied_job: appliedJob,
          subject,
          message,
          has_a_car: hasACar,
          cv_attachment_name,
          cv_attachment_type,
          cv_attachment_base64,
        }),
      });

      const rawResponse = await response.text();
      let payload:
        | {
            message?: string;
            error?: string;
            recruitment_error?: string;
          }
        | undefined;

      if (rawResponse) {
        try {
          payload = JSON.parse(rawResponse) as
            | {
                message?: string;
                error?: string;
                recruitment_error?: string;
              }
            | undefined;
        } catch {
          payload = { message: rawResponse };
        }
      }

      if (!response.ok) {
        throw new Error(
          payload?.recruitment_error ??
            payload?.error ??
            payload?.message ??
            "We could not send your application right now.",
        );
      }

      setStatus("success");
      setAttemptedSubmit(false);

      setFullName("");
      setEmail("");
      setPhone("");
      setResidence("");
      setHasACar(false);
      setMessage("");
      setCvFile(null);
      form.reset();

      router.replace(
        `/careers/apply_now/confirmation?role=${encodeURIComponent(selectedRole.label)}&name=${encodeURIComponent(fullName)}`,
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not send your application right now.",
      );
    }
  }

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <FileUser className="h-3.5 w-3.5" />
              Apply Now
            </motion.div>

            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
            >
              Start Your Application
            </motion.h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              Share your details below and our team will review your application
              for the role that fits you best.
            </motion.p>
            <p className="mx-auto mt-3 text-sm font-medium text-rose-600">
              All fields are mandatory. Missing fields will be highlighted in
              red when you submit.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
        >
          <motion.div
            className="relative h-[260px] w-full overflow-hidden border-y border-white/70 bg-slate-100 sm:h-[320px] lg:h-[360px]"
            initial={{ opacity: 0, scale: 1.02, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.03 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/join.png"
                alt="Join Willi Med careers"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.22))]" />
          </motion.div>

          <div className="px-6 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                  Selected role
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {role}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 lg:p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="full_name"
                  value={fullName}
                  onChange={setFullName}
                  icon={User}
                  error={attemptedSubmit && !fullName.trim()}
                  required
                />
                <Field
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  icon={Mail}
                  error={attemptedSubmit && !email.trim()}
                  required
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  icon={Phone}
                  error={attemptedSubmit && !phone.trim()}
                  required
                />
              </div>

              <div className="mt-4 space-y-2">
                <label
                  className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
                    attemptedSubmit && !residence
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  Residence <span className="text-rose-500">*</span>
                </label>
                <select
                  value={residence}
                  onChange={(event) => setResidence(event.target.value)}
                  className={`h-12 w-full rounded-2xl border bg-white/95 px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                    attemptedSubmit && !residence
                      ? "border-rose-300 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-100"
                      : "border-slate-200 focus:border-slate-400 focus:ring-slate-200/70"
                  }`}
                >
                  {residenceOptions.map((item) => (
                    <option key={item.value || "empty"} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
                      attemptedSubmit && !role.trim()
                        ? "text-rose-500"
                        : "text-slate-400"
                    }`}
                  >
                    Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(event) => {
                      const nextRoleLabel = event.target.value;
                      const nextRole = availableRoles.find(
                        (item) => item.label === nextRoleLabel,
                      );
                      setRole(nextRole?.label ?? nextRoleLabel);
                      setSubject(
                        `Application for ${nextRole?.label ?? nextRoleLabel}`,
                      );
                    }}
                    disabled={!availableRoles.length}
                    className={`h-12 w-full rounded-2xl border bg-white/95 px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                      attemptedSubmit && !role.trim()
                        ? "border-rose-300 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-100"
                        : "border-slate-200 focus:border-slate-400 focus:ring-slate-200/70"
                    }`}
                  >
                    <option value="">
                      {availableRoles.length
                        ? "Select a role"
                        : "No roles available"}
                    </option>
                    {availableRoles.map((item) => (
                      <option key={`${item.label}:${item.code}`} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 text-sm text-slate-700 shadow-sm transition hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={hasACar}
                    onChange={(event) => setHasACar(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-300"
                  />
                  <span className="font-medium text-slate-900">
                    Have a Car
                  </span>
                </label>
              </div>

              <div className="mt-4 space-y-2">
                <label
                  htmlFor="cv"
                  className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
                    attemptedSubmit && !cvFile
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  CV Attachment <span className="text-rose-500">*</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed px-4 py-4 text-sm transition hover:bg-slate-100 ${
                    attemptedSubmit && !cvFile
                      ? "border-rose-300 bg-rose-50/50 text-rose-700"
                      : "border-slate-300 bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <Paperclip
                      className={`h-4 w-4 ${
                        attemptedSubmit && !cvFile
                          ? "text-rose-400"
                          : "text-slate-400"
                      }`}
                    />
                    {cvFile ? cvFile.name : "Attach your CV (PDF, DOC, DOCX)"}
                  </span>
                  <span
                    className={`font-medium ${
                      attemptedSubmit && !cvFile
                        ? "text-rose-700"
                        : "text-slate-900"
                    }`}
                  >
                    Choose file
                  </span>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setCvFile(file);
                      setCvError("");
                    }}
                  />
                </label>
                <p className="text-xs text-slate-500">
                  Maximum file size: 5MB.
                </p>
                {cvError ? (
                  <p className="text-sm text-rose-700">{cvError}</p>
                ) : null}
              </div>

              <div className="mt-4 space-y-2">
                <label
                  htmlFor="subject"
                  className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
                    attemptedSubmit && !subject.trim()
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  Subject <span className="text-rose-500">*</span>
                </label>
                <div
                  className={`flex h-12 items-center overflow-hidden rounded-2xl border bg-white/95 text-sm text-slate-900 transition focus-within:ring-4 ${
                    attemptedSubmit && !subject.trim()
                      ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-100"
                      : "border-slate-200 focus-within:border-slate-400 focus-within:ring-slate-200/70"
                  }`}
                >
                  <MessageSquareText
                    className={`ml-7 h-4 w-4 shrink-0 ${
                      attemptedSubmit && !subject.trim()
                        ? "text-rose-400"
                        : "text-slate-400"
                    }`}
                  />
                  <input
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    type="text"
                    required
                    className="h-full w-full bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label
                  className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
                    attemptedSubmit && !message.trim()
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  Cover Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us why you're a great fit..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  name="message"
                  required
                  className={`w-full rounded-2xl border bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    attemptedSubmit && !message.trim()
                      ? "border-rose-300 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-100"
                      : "border-slate-200 focus:border-slate-400 focus:ring-slate-200/70"
                  }`}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Submit Application"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-sm text-slate-500">
                  All fields must be completed before submission.
                </p>
              </div>

              {status === "error" && feedback ? (
                <div className="mt-4 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-900">
                  {feedback}
                </div>
              ) : null}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ApplyNowSkeleton() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <div className="animate-pulse rounded-[40px] border border-slate-200/70 bg-white/80 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="mx-auto h-8 w-32 rounded-full bg-slate-200" />
            <div className="mx-auto h-12 w-3/4 rounded-2xl bg-slate-200" />
            <div className="mx-auto h-4 w-1/2 rounded-full bg-slate-200" />
          </div>
          <div className="mt-8 h-[640px] rounded-[34px] bg-slate-100" />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  error = false,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon: typeof User;
  error?: boolean;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className={`text-[0.72rem] font-medium uppercase tracking-[0.28em] ${
          error ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </label>
      <div
        className={`flex h-14 items-center gap-3 rounded-2xl border bg-white px-5 ${
          error
            ? "border-rose-300 bg-rose-50/50"
            : "border-slate-200"
        }`}
      >
        <Icon
          className={`h-5 w-5 flex-none ${error ? "text-rose-400" : "text-slate-400"}`}
        />
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          placeholder={label}
          aria-invalid={error}
          className="h-full w-full bg-transparent px-5 text-base text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
      {error ? <p className="text-sm text-rose-600">This field is required.</p> : null}
    </div>
  );
}
