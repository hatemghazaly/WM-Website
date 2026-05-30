"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const panelReveal = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const payload = (await response.json()) as
        | {
            message?: string;
            error?: string;
            warning?: string;
            smtp_error?: string;
          }
        | undefined;

      if (!response.ok) {
        throw new Error(
          payload?.error ?? "We could not send your message right now.",
        );
      }

      form.reset();
      setStatus("success");
      setFeedback(
        payload?.warning
          ? `${payload.message ?? "Your message was saved."} ${payload.warning}${payload.smtp_error ? ` SMTP error: ${payload.smtp_error}` : ""}`
          : (payload?.message ?? "Your message was sent successfully."),
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not send your message right now.",
      );
    }
  }

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="relative mb-12 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0.10)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={panelReveal}
              custom={0}
            >
              Contact
            </motion.div>

            <motion.h1
              className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
              variants={panelReveal}
              custom={0.12}
            >
              Contact Us
            </motion.h1>

            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={panelReveal}
              custom={0.22}
            />

            <motion.p
              className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
              variants={panelReveal}
              custom={0.32}
            >
              Send us a note and our team will get back to you with clarity,
              care, and speed. We aim for a calm, polished experience from the
              first message onward.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={panelReveal}
        >
          <div className="relative h-[260px] w-full overflow-hidden bg-slate-100 sm:h-[320px] lg:h-[360px]">
            <Image
              src="/images/contact-us.jpg"
              alt="Willi Med presence in Egypt and Poland"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.24))]" />
          </div>

          <div className="px-6 pt-6 pb-8 sm:px-7 sm:pt-7 sm:pb-10 lg:px-8 lg:pt-8 lg:pb-12">
            <div className="mb-6 space-y-2">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                Message
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                Tell us what you need.
              </h2>
            </div>

            <motion.form
              className="space-y-4"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.14,
                  },
                },
              }}
            >
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                variants={panelReveal}
              >
                <Field label="First Name" name="first_name" required />
                <Field label="Last Name" name="last_name" required />
              </motion.div>

              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                variants={panelReveal}
              >
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                />
                <Field label="Phone Number" name="phone" type="tel" />
              </motion.div>

              <motion.div variants={panelReveal}>
                <Field label="Company" name="company" />
              </motion.div>

              <motion.div className="space-y-2" variants={panelReveal}>
                <label
                  htmlFor="subject"
                  className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={panelReveal}>
                <label
                  htmlFor="message"
                  className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us about your inquiry..."
                  className="w-full rounded-[24px] border border-slate-200 bg-white/95 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                variants={panelReveal}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.form>

            {status === "success" && feedback ? (
              <div className="mt-4 rounded-[24px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-900">
                {feedback}
              </div>
            ) : null}

            {status === "error" && feedback ? (
              <div className="mt-4 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-900">
                {feedback}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
      />
    </div>
  );
}
