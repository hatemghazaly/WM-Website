export type Vacancy = {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string;
  qualifications: string;
  emailSubject: string;
  active: boolean;
};

export type AvailableRole = {
  label: string;
  code: string;
};

export type RoleOption = {
  label: string;
  code: string;
};

export type CareersConfig = {
  vacancies: Vacancy[];
  availableRoles: AvailableRole[];
};

export const EMPTY_CAREERS_CONFIG: CareersConfig = {
  vacancies: [],
  availableRoles: [],
};

export function cloneCareersConfig(config: CareersConfig): CareersConfig {
  return {
    vacancies: config.vacancies.map((vacancy) => ({
      ...vacancy,
      active: vacancy.active,
    })),
    availableRoles: config.availableRoles.map((role) => ({ ...role })),
  };
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeRichText(value: unknown) {
  if (Array.isArray(value)) {
    const items = value.map((item) => normalizeText(item)).filter(Boolean);
    if (!items.length) {
      return "";
    }

    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  return normalizeText(value);
}

function normalizeAvailableRole(value: unknown): AvailableRole {
  const role = (value ?? {}) as Partial<AvailableRole>;

  return {
    label: normalizeText(role.label),
    code: normalizeText(role.code),
  };
}

function normalizeVacancy(value: unknown): Vacancy {
  const vacancy = (value ?? {}) as Partial<Vacancy>;
  const title = normalizeText(vacancy.title);
  const emailSubject = normalizeText(vacancy.emailSubject);

  return {
    title,
    department: normalizeText(vacancy.department),
    location: normalizeText(vacancy.location),
    type: normalizeText(vacancy.type),
    experience: normalizeText(vacancy.experience),
    summary: normalizeRichText(vacancy.summary),
    responsibilities: normalizeRichText(vacancy.responsibilities),
    qualifications: normalizeRichText(vacancy.qualifications),
    emailSubject: emailSubject || (title ? `Application for ${title}` : ""),
    active: vacancy.active !== false,
  };
}

export function normalizeCareersConfig(value: unknown): CareersConfig {
  const config = (value ?? {}) as Partial<CareersConfig>;
  const vacancies = Array.isArray(config.vacancies)
    ? config.vacancies.map(normalizeVacancy)
    : [];

  const availableRoles = Array.isArray(config.availableRoles)
    ? Array.from(
        new Map(
          config.availableRoles
            .map(normalizeAvailableRole)
            .filter((role) => role.label)
            .map((role) => [role.label, role] as const),
        ).values(),
      )
    : [];

  return {
    vacancies,
    availableRoles,
  };
}

export function mergeApplyRoles(config: CareersConfig) {
  return Array.from(
    new Set(
      config.availableRoles
        .map((role) => normalizeText(role.label))
        .filter(Boolean),
    ),
  );
}

export function createEmptyVacancy(): Vacancy {
  return {
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    summary: "",
    responsibilities: "",
    qualifications: "",
    emailSubject: "",
    active: true,
  };
}

export function getRoleCodeMap(config: CareersConfig) {
  const entries = config.availableRoles
    .map((role) => [normalizeText(role.label), normalizeText(role.code)] as const)
    .filter(([label, code]) => Boolean(label) && Boolean(code));

  return Object.fromEntries(entries) as Record<string, string>;
}

export function getRoleOptions(config: CareersConfig): RoleOption[] {
  const options = new Map<string, RoleOption>();

  for (const role of config.availableRoles) {
    const label = normalizeText(role.label);
    const code = normalizeText(role.code);
    if (label && code) {
      options.set(`${label}::${code}`, { label, code });
    }
  }

  return Array.from(options.values());
}
