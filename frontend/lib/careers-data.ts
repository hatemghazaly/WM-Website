export type Vacancy = {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  emailSubject: string;
  appliedJob?: string;
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

export const DEFAULT_VACANCIES: Vacancy[] = [
  {
    title: "Full Time Medical Representative",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Full-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Full Time Medical Representative",
    appliedJob: "full",
  },
  {
    title: "Part Time Medical Representative",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Part-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Part Time Medical Representative",
    appliedJob: "part",
  },
  {
    title: "District Manager",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Part-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Part Time Medical Representative",
    appliedJob: "dm",
  },
  {
    title: "Associate Product Manager",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Part-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Part Time Medical Representative",
    appliedJob: "apm",
  },
  {
    title: "National Sales Manager",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Full-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Part Time Medical Representative",
    appliedJob: "nsm",
  },
];

export const DEFAULT_AVAILABLE_ROLES: AvailableRole[] = [
  { label: "Full Time Medical Representative", code: "full" },
  { label: "Part Time Medical Representative", code: "part" },
  { label: "District Manager", code: "dm" },
  { label: "National Sales Manager", code: "nsm" },
  { label: "Product Manager", code: "pm" },
  { label: "Associate Product Manager", code: "apm" },
  { label: "Business Unit Manager", code: "bum" },
  { label: "Accountant", code: "accountant" },
  { label: "HR Specialist", code: "hr" },
  { label: "IT", code: "it" },
  { label: "HR Manager", code: "hrm" },
  { label: "Sales Representative", code: "sr" },
  { label: "Supply Chain Specialist", code: "sc" },
  { label: "Supply Chain Manager", code: "scm" },
  { label: "Office Administrator", code: "oa" },
  { label: "Franchise Manager", code: "fm" },
  { label: "Regulatory Affairs Specialist", code: "ra" },
  { label: "Regulatory Affairs Manager", code: "ram" },
  { label: "Office Boy", code: "ob" },
  { label: "Other", code: "other" },
];

export const DEFAULT_CAREERS_CONFIG: CareersConfig = {
  vacancies: DEFAULT_VACANCIES,
  availableRoles: DEFAULT_AVAILABLE_ROLES.map((role) => ({ ...role })),
};

export function cloneCareersConfig(config: CareersConfig): CareersConfig {
  return {
    vacancies: config.vacancies.map((vacancy) => ({
      ...vacancy,
      responsibilities: [...vacancy.responsibilities],
      qualifications: [...vacancy.qualifications],
    })),
    availableRoles: config.availableRoles.map((role) => ({ ...role })),
  };
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeList(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => normalizeText(item)).filter(Boolean)
    : [];
}

function normalizeAvailableRole(value: unknown): AvailableRole {
  const role = (value ?? {}) as Partial<AvailableRole>;
  const label = normalizeText(role.label);
  const code = normalizeText(role.code);

  return {
    label,
    code,
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
    summary: normalizeText(vacancy.summary),
    responsibilities: normalizeList(vacancy.responsibilities),
    qualifications: normalizeList(vacancy.qualifications),
    emailSubject: emailSubject || (title ? `Application for ${title}` : ""),
    appliedJob: normalizeText(vacancy.appliedJob) || undefined,
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
  const roles = Array.from(
    new Set(
      [
        ...config.availableRoles.map((role) => role.label),
        ...config.vacancies.map((vacancy) => vacancy.title),
      ]
        .map((role) => normalizeText(role))
        .filter(Boolean),
    ),
  );

  return roles.length > 0
    ? roles
    : DEFAULT_AVAILABLE_ROLES.map((role) => role.label);
}

export function createEmptyVacancy(): Vacancy {
  return {
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    summary: "",
    responsibilities: [],
    qualifications: [],
    emailSubject: "",
    appliedJob: "",
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

  for (const vacancy of config.vacancies) {
    const label = normalizeText(vacancy.title);
    const code = normalizeText(vacancy.appliedJob);
    if (label && code) {
      options.set(`${label}::${code}`, { label, code });
    }
  }

  return Array.from(options.values());
}

export function resolveAppliedJobCode(config: CareersConfig, role: string) {
  const normalizedRole = normalizeText(role);
  if (!normalizedRole) {
    return "";
  }

  const options = getRoleOptions(config);
  const exactMatch = options.find(
    (option) =>
      option.code === normalizedRole || option.label === normalizedRole,
  );
  if (exactMatch) {
    return exactMatch.code;
  }

  return "";
}
