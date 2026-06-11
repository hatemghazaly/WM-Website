"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  cloneCareersConfig,
  createEmptyVacancy,
  EMPTY_CAREERS_CONFIG,
  mergeApplyRoles,
  normalizeCareersConfig,
  type CareersConfig,
  type Vacancy,
} from "@/lib/careers-data";
import { sanitizeRichTextHtml } from "@/lib/rich-text";

type SaveState = "idle" | "loading" | "saving" | "saved" | "error";

async function readJsonResponse(response: Response) {
  const raw = await response.text();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { error: raw };
  }
}

function responseError(payload: unknown, fallback: string) {
  return typeof payload === "object" && payload && "error" in payload
    ? String((payload as { error?: unknown }).error ?? fallback)
    : fallback;
}

export default function CareersAdminPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<CareersConfig>(() =>
    cloneCareersConfig(EMPTY_CAREERS_CONFIG),
  );
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"roles" | "vacancies">(
    "vacancies",
  );
  const [expandedVacancies, setExpandedVacancies] = useState<boolean[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/admin/careers", {
          cache: "no-store",
        });
        const payload = await readJsonResponse(response);
        const normalized = normalizeCareersConfig(payload);

        if (!response.ok) {
          throw new Error(responseError(payload, "We could not load the careers config."));
        }

        if (!cancelled) {
          setDraft(cloneCareersConfig(normalized));
          setExpandedVacancies(normalized.vacancies.map(() => false));
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
  const allVacanciesExpanded =
    draft.vacancies.length > 0 &&
    expandedVacancies.length === draft.vacancies.length &&
    expandedVacancies.every(Boolean);

  function updateVacancy(
    index: number,
    field: keyof Vacancy,
    value: string | string[] | boolean,
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

  function toggleVacancyActive(index: number) {
    setDraft((current) => ({
      ...current,
      vacancies: current.vacancies.map((vacancy, currentIndex) =>
        currentIndex === index
          ? { ...vacancy, active: !vacancy.active }
          : vacancy,
      ),
    }));
  }

  function addVacancy() {
    setDraft((current) => ({
      ...current,
      vacancies: [...current.vacancies, createEmptyVacancy()],
    }));
    setExpandedVacancies((current) => [...current, false]);
  }

  function removeVacancy(index: number) {
    setDraft((current) => ({
      ...current,
      vacancies: current.vacancies.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    }));
    setExpandedVacancies((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
  }

  function moveVacancy(index: number, direction: "up" | "down") {
    const nextIndex = direction === "up" ? index - 1 : index + 1;

    setDraft((current) => {
      if (nextIndex < 0 || nextIndex >= current.vacancies.length) {
        return current;
      }

      const vacancies = [...current.vacancies];
      const [movedItem] = vacancies.splice(index, 1);
      vacancies.splice(nextIndex, 0, movedItem);

      return {
        ...current,
        vacancies,
      };
    });

    setExpandedVacancies((current) => {
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const nextExpanded = [...current];
      const [movedItem] = nextExpanded.splice(index, 1);
      nextExpanded.splice(nextIndex, 0, movedItem);
      return nextExpanded;
    });
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

  async function logout() {
    await fetch("/api/admin/careers/auth", { method: "DELETE" });
    router.replace("/admin/careers/login");
    router.refresh();
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

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(responseError(result, "We could not save the careers config."));
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
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Log Out
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
                  onClick={() => setActiveTab("vacancies")}
                  className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                    activeTab === "vacancies"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  Vacancy Cards
                </button>
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

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedVacancies(
                          draft.vacancies.map(() => !allVacanciesExpanded),
                        )
                      }
                      disabled={draft.vacancies.length === 0}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {allVacanciesExpanded ? "Collapse All" : "Expand All"}
                    </button>

                    <button
                      type="button"
                      onClick={addVacancy}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      <Plus className="h-4 w-4" />
                      Add Vacancy
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-5">
                  {draft.vacancies.map((vacancy, index) => {
                    const isExpanded = expandedVacancies[index] ?? false;

                    return (
                      <article
                        key={index}
                        className={`rounded-[28px] border p-4 sm:p-5 ${
                          vacancy.active === false
                            ? "border-slate-200 bg-slate-100/80 opacity-80"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedVacancies((current) =>
                                current.map((item, currentIndex) =>
                                  currentIndex === index ? !item : item,
                                ),
                              )
                            }
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                                Vacancy {index + 1}
                              </p>
                              <h3 className="mt-2 truncate text-xl font-semibold tracking-[-0.04em] text-slate-950">
                                {vacancy.title || "Untitled vacancy"}
                              </h3>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => removeVacancy(index)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => moveVacancy(index, "up")}
                              disabled={index === 0}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Move vacancy ${index + 1} up`}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => moveVacancy(index, "down")}
                              disabled={index === draft.vacancies.length - 1}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Move vacancy ${index + 1} down`}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleVacancyActive(index)}
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] transition ${
                              vacancy.active === false
                                ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                                : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {vacancy.active === false
                              ? "Inactive"
                              : "Active"}
                          </button>
                        </div>

                        {isExpanded ? (
                          <>
                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                              <SelectField
                                label="Title"
                                value={vacancy.title}
                                onChange={(value) =>
                                  updateVacancyTitle(index, value)
                                }
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
                              <RichTextEditorField
                                label="Summary"
                                value={vacancy.summary}
                                onChange={(value) =>
                                  updateVacancy(index, "summary", value)
                                }
                                placeholder="Write the summary like a short introduction"
                                helperText="You can format the summary the same way as the responsibilities."
                              />
                              <RichTextEditorField
                                label="Responsibilities"
                                value={vacancy.responsibilities}
                                onChange={(value) =>
                                  updateVacancy(index, "responsibilities", value)
                                }
                                placeholder="Write the responsibilities like an email"
                                helperText="Use the toolbar to add bold text, colors, and bullet lists."
                              />
                              <RichTextEditorField
                                label="Qualifications"
                                value={vacancy.qualifications}
                                onChange={(value) =>
                                  updateVacancy(index, "qualifications", value)
                                }
                                placeholder="Write the qualifications like bullets in an email"
                                helperText="You can use bullets, bold text, and colors here too."
                              />
                            </div>
                          </>
                        ) : null}
                      </article>
                    );
                  })}
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

function RichTextEditorField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.innerHTML === value) {
      return;
    }

    editor.innerHTML = value;
  }, [value]);

  function syncEditor() {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    onChange(editor.innerHTML);
  }

  function insertCleanHtml(html: string) {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const cleaned = sanitizeRichTextHtml(html);
    if (!cleaned) {
      return;
    }

    editor.focus();
    document.execCommand("insertHTML", false, cleaned);
    syncEditor();
  }

  function runCommand(command: string, commandValue?: string) {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    editor.focus();
    document.execCommand(command, false, commandValue);
    syncEditor();
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const clipboardHtml = event.clipboardData.getData("text/html");
    const clipboardText = event.clipboardData.getData("text/plain");
    insertCleanHtml(clipboardHtml || clipboardText);
  }

  return (
    <div className="space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
        {label}
      </span>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
          <ToolbarGroup label="Text">
            <ToolbarButton onClick={() => runCommand("bold")} label="Bold">
              B
            </ToolbarButton>
            <ToolbarButton onClick={() => runCommand("italic")} label="Italic">
              I
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("removeFormat")}
              label="Clear formatting"
            >
              Clear
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Blocks">
            <ToolbarButton
              onClick={() => runCommand("formatBlock", "<h2>")}
              label="Heading 2"
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("formatBlock", "<h3>")}
              label="Heading 3"
            >
              H3
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("formatBlock", "<p>")}
              label="Paragraph"
            >
              P
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Lists">
            <ToolbarButton
              onClick={() => runCommand("insertUnorderedList")}
              label="Bullets"
            >
              • List
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("insertOrderedList")}
              label="Numbered list"
            >
              1. List
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Align">
            <ToolbarButton
              onClick={() => runCommand("justifyLeft")}
              label="Align left"
            >
              Left
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("justifyCenter")}
              label="Align center"
            >
              Center
            </ToolbarButton>
            <ToolbarButton
              onClick={() => runCommand("justifyRight")}
              label="Align right"
            >
              Right
            </ToolbarButton>
          </ToolbarGroup>

          <label className="ml-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
            Color
            <input
              type="color"
              onChange={(event) => runCommand("foreColor", event.target.value)}
              className="h-7 w-8 cursor-pointer border-0 bg-transparent p-0"
              aria-label="Text color"
              title="Text color"
            />
          </label>

          <ToolbarButton onClick={() => runCommand("undo")} label="Undo">
            Undo
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand("redo")} label="Redo">
            Redo
          </ToolbarButton>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onPaste={handlePaste}
          onInput={syncEditor}
          className="rich-text min-h-[220px] px-4 py-3 text-sm leading-7 text-slate-900 outline-none [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic [&_u]:underline"
          aria-label={label}
        />

        {!value ? (
          <div className="pointer-events-none -mt-[220px] px-4 py-3 text-sm leading-7 text-slate-400">
            {placeholder ?? "Start typing here"}
          </div>
        ) : null}
      </div>

      {helperText ? <p className="text-xs leading-5 text-slate-500">{helperText}</p> : null}
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function ToolbarGroup({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
      <span className="px-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </span>
      {children}
    </div>
  );
}
