"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const panelReveal = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
        <div className="rounded-[42px] border border-white/70 bg-white/75 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-10">
            <motion.div
              className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-slate-200/70 bg-slate-100 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] lg:min-h-full"
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <Image
                src="/images/contact-us.jpg"
                alt="Willi Med presence in Egypt and Poland"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.18))]" />
            </motion.div>

            <motion.div
              className="relative"
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div className="rounded-[34px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))] p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] sm:p-6">
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
                        staggerChildren: 0.07,
                        delayChildren: 0.08,
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
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-medium text-white transition duration-300 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                    variants={panelReveal}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
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
              </motion.div>
            </motion.div>
          </div>
        </div>
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
