"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  cloneCareersConfig,
  createEmptyVacancy,
  EMPTY_CAREERS_CONFIG,
  mergeApplyRoles,
  normalizeCareersConfig,
  type CareersConfig,
  type Vacancy,
} from "@/lib/careers-data";

type SaveState = "idle" | "loading" | "saving" | "saved" | "error";

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toText(value: string[]) {
  return value.join("\n");
}

export default function CareersAdminPage() {
  const [draft, setDraft] = useState<CareersConfig>(() =>
    cloneCareersConfig(EMPTY_CAREERS_CONFIG),
  );
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"roles" | "vacancies">("roles");

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/admin/careers", {
          cache: "no-store",
        });
        const payload = (await response.json()) as unknown;

        if (!response.ok) {
          throw new Error(
            typeof payload === "object" && payload && "error" in payload
              ? String((payload as { error?: string }).error ?? "")
              : "We could not load the careers config.",
          );
        }

        if (!cancelled) {
          setDraft(cloneCareersConfig(normalizeCareersConfig(payload)));
          setSaveState("idle");
        }
      } catch (error) {
        if (!cancelled) {
          setSaveState("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "We could not load the careers config.",
          );
        }
      }
    }

    loadConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  const rolePreview = useMemo(() => mergeApplyRoles(draft), [draft]);
  const vacancyTitleOptions = useMemo(
    () =>
      draft.availableRoles.filter(
        (role) => Boolean(role.label.trim()) && Boolean(role.code.trim()),
      ),
    [draft.availableRoles],
  );
  const vacancyTypeOptions = [
    "Full-Time",
    "Part-Time",
    "Remote Working",
    "Per Hour",
  ];

  function updateVacancy(
    index: number,
    field: keyof Vacancy,
    value: string | string[],
  ) {
    setDraft((current) => ({
      ...current,
      vacancies: current.vacancies.map((vacancy, currentIndex) =>
        currentIndex === index ? { ...vacancy, [field]: value } : vacancy,
      ),
    }));
  }

  function updateVacancyTitle(index: number, title: string) {
    setDraft((current) => ({
      ...current,
      vacancies: current.vacancies.map((vacancy, currentIndex) =>
        currentIndex === index ? { ...vacancy, title } : vacancy,
      ),
    }));
  }

  function addVacancy() {
    setDraft((current) => ({
      ...current,
      vacancies: [...current.vacancies, createEmptyVacancy()],
    }));
  }

  function removeVacancy(index: number) {
    setDraft((current) => ({
      ...current,
      vacancies: current.vacancies.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    }));
  }

  function updateRole(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      availableRoles: current.availableRoles.map((role, currentIndex) =>
        currentIndex === index ? { ...role, label: value } : role,
      ),
    }));
  }

  function updateRoleCode(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      availableRoles: current.availableRoles.map((role, currentIndex) =>
        currentIndex === index ? { ...role, code: value } : role,
      ),
    }));
  }

  function addRole() {
    setDraft((current) => ({
      ...current,
      availableRoles: [...current.availableRoles, { label: "", code: "" }],
    }));
  }

  function removeRole(index: number) {
    setDraft((current) => ({
      ...current,
      availableRoles: current.availableRoles.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    }));
  }

  function resetToDefaults() {
    setDraft(cloneCareersConfig(EMPTY_CAREERS_CONFIG));
    setMessage("Restored the default careers content.");
    setSaveState("idle");
  }

  async function saveConfig() {
    setSaveState("saving");
    setMessage("");

    const payload = normalizeCareersConfig(draft);

    if (
      payload.vacancies.some(
        (vacancy) => !vacancy.title || !vacancy.emailSubject,
      )
    ) {
      setSaveState("error");
      setMessage(
        "Each vacancy needs a title and an email subject before saving.",
      );
      return;
    }

    if (payload.availableRoles.some((role) => !role.label || !role.code)) {
      setSaveState("error");
      setMessage(
        "Each available role needs both a label and a code before saving.",
      );
      return;
    }

    try {
      const response = await fetch("/api/admin/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as unknown;

      if (!response.ok) {
        throw new Error(
          typeof result === "object" && result && "error" in result
            ? String((result as { error?: string }).error ?? "")
            : "We could not save the careers config.",
        );
      }

      setDraft(cloneCareersConfig(normalizeCareersConfig(result)));
      setSaveState("saved");
      setMessage("Careers content saved successfully.");
    } catch (error) {
      setSaveState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not save the careers config.",
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
        <div className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              Careers Admin
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Vacancy and Role Control
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Edit the open vacancies content and the apply-now role options
              from one place. The public apply form always includes your vacancy
              titles, so new postings stay selectable automatically.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/careers/open_vacancies"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                View Public Page
              </Link>
              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </button>
              <button
                type="button"
                onClick={saveConfig}
                disabled={saveState === "saving" || saveState === "loading"}
                className="inline-flex items-center gap-2 rounded-full border border-slate-950 bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saveState === "saving" ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              Role options currently exposed on apply-now: {rolePreview.length}
            </div>

            {message ? (
              <div
                className={`mt-6 rounded-[24px] border px-4 py-4 text-sm leading-7 ${
                  saveState === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-900"
                    : "border-emerald-200 bg-emerald-50 text-emerald-900"
                }`}
              >
                {message}
              </div>
            ) : null}
          </div>

          <div className="mt-10 grid gap-6">
            <div className="rounded-[32px] border border-slate-200/70 bg-white/85 p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)] sm:p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("roles")}
                  className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                    activeTab === "roles"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  Available Roles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("vacancies")}
                  className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                    activeTab === "vacancies"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  Vacancy Cards
                </button>
              </div>
            </div>

            {activeTab === "roles" ? (
              <section className="rounded-[32px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                      Apply Now
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      Available Roles
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={addRole}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Role
                  </button>
                </div>

                <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
                  <div className="overflow-x-auto">
                    <table className="min-w-[720px] w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/80 text-left text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                          <th className="px-5 py-4">Role Title</th>
                          <th className="px-5 py-4">Applied Job Code</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {draft.availableRoles.map((role, index) => (
                          <tr
                            key={index}
                            className="border-b border-slate-200 last:border-b-0"
                          >
                            <td className="px-5 py-4 align-top">
                              <input
                                value={role.label}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>,
                                ) => updateRole(index, event.target.value)}
                                placeholder="Role title"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                              />
                            </td>
                            <td className="px-5 py-4 align-top">
                              <input
                                value={role.code}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>,
                                ) => updateRoleCode(index, event.target.value)}
                                placeholder="Applied job code"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                              />
                            </td>
                            <td className="px-5 py-4 align-top text-right">
                              <button
                                type="button"
                                onClick={() => removeRole(index)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                                aria-label={`Remove role ${index + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : (
              <section className="rounded-[32px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                      Open Vacancies
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      Vacancy Cards
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={addVacancy}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Vacancy
                  </button>
                </div>

                <div className="mt-5 grid gap-5">
                  {draft.vacancies.map((vacancy, index) => (
                    <article
                      key={index}
                      className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                            Vacancy {index + 1}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-950">
                            {vacancy.title || "Untitled vacancy"}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVacancy(index)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <SelectField
                          label="Title"
                          value={vacancy.title}
                          onChange={(value) => updateVacancyTitle(index, value)}
                          options={vacancyTitleOptions.map(
                            (role) => role.label,
                          )}
                          placeholder="Choose from available roles"
                        />
                        <Field
                          label="Department"
                          value={vacancy.department}
                          onChange={(value) =>
                            updateVacancy(index, "department", value)
                          }
                          placeholder="Department"
                        />
                        <Field
                          label="Location"
                          value={vacancy.location}
                          onChange={(value) =>
                            updateVacancy(index, "location", value)
                          }
                          placeholder="Location"
                        />
                        <SelectField
                          label="Type"
                          value={vacancy.type}
                          onChange={(value) =>
                            updateVacancy(index, "type", value)
                          }
                          options={vacancyTypeOptions}
                          placeholder="Select type"
                        />
                        <Field
                          label="Experience"
                          value={vacancy.experience}
                          onChange={(value) =>
                            updateVacancy(index, "experience", value)
                          }
                          placeholder="0-3 years"
                        />
                        <Field
                          label="Email Subject"
                          value={vacancy.emailSubject}
                          onChange={(value) =>
                            updateVacancy(index, "emailSubject", value)
                          }
                          placeholder="Application subject"
                        />
                      </div>

                      <div className="mt-4 grid gap-4">
                        <TextareaField
                          label="Summary"
                          value={vacancy.summary}
                          onChange={(value) =>
                            updateVacancy(index, "summary", value)
                          }
                          placeholder="Short role summary"
                          rows={6}
                        />
                        <TextareaField
                          label="Responsibilities"
                          value={toText(vacancy.responsibilities)}
                          onChange={(value) =>
                            updateVacancy(
                              index,
                              "responsibilities",
                              splitLines(value),
                            )
                          }
                          placeholder="One responsibility per line"
                          rows={9}
                        />
                        <TextareaField
                          label="Qualifications"
                          value={toText(vacancy.qualifications)}
                          onChange={(value) =>
                            updateVacancy(
                              index,
                              "qualifications",
                              splitLines(value),
                            )
                          }
                          placeholder="One qualification per line"
                          rows={8}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 disabled:cursor-not-allowed disabled:bg-slate-100"
        disabled={!options.length}
      >
        <option value="">{placeholder ?? "Select an option"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
      />
    </label>
  );
}
