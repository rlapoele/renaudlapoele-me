export type ResumeType = {
  data: ResumeDataType;
  content: ResumeContentType;
  ui: ResumeUIType;
};

// =============================
// DATA
// =============================
export type ResumeDataType = {
  personal: {
    firstName: string;
    lastName: string;
    fullName: string;
    location: string;
    workStyle: string;
    availability: string;
    languages: string[];
    yearsExperience: number;
  };
};

// =============================
// CONTENT (narrative / positioning)
// =============================
export type PageMetadataType = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    image: {
      url: string;
      secureUrl: string;
      alt: string;
      width: string;
      height: string;
      type: string;
    };
    url: string;
    type: string;
    locale: string;
    alternateLocale: string;
  },
  jsonLdSchema: JsonLdSchemaType;
};

export type JsonLdSchemaType = {
  "@context": string,
  "@type": string,
  "@id": string,
  "url": string,
  "name": string,
  "inLanguage": string,
  "mainEntity": {
    "@type": string,
    "@id": string;
    "name": string;
    "url": string;
    "image": string;
    "jobTitle": string;
    "description": string;
    "address": {
      "@type": string;
      "addressCountry": string;
    };
    "knowsLanguage": string[];
    "knowsAbout": string[];
    "sameAs": string[];
  };
}


export type HeroMetadataType = HeroMetadataItemType[];

export type HeroMetadataItemType = {
  type: string,
  value: string
}

export type HeroType = {
  title: string;
  tagline: string;
  summary: string;
  meta: HeroMetadataType;
  focus: string[];
  portraitImageAlt: string;
  availability: {
    availableFromText: string;
    availabilityPeriodText: string;
    openToText: string;
  }
};

export type SnapshotType = {
  title: string;
  items: SnapshotItemType[];
};

export type SelectedImpactType = {
    title: string;
    items: ImpactItemType[];
  };

export type SelectedWorkType = {
  title: string;
  items: WorkItemType[];
};

export type SkillsType = {
  title: string;
  groups: SkillGroupType[];
};

export type GenericDateType = {
  label: string;
  year: number | null;
  month: number | null;
};

export type ExperienceType = {
  title: string;
  items: ExperienceItemType[];
}

export type ExperienceSkillGroupType = {
  name: string;
  skills: string[];
};

export type ExperienceItemType = {
  company: string;
  role: string | null;
  location: string | null;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
  responsibilities: string[];
  keyFocus: string | null;
  skillGroups: ExperienceSkillGroupType[];
};

export type CertificationsType = {
  title: string;
  items: CertificationItemType[];
};

export type CertificationItemType = {
  name: string;
  institution: string;
  fieldOfStudy: string;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
  certificateURL: string | null;
};

export type EducationDegreeType = {
  title: string;
  items: EducationDegreeItemType[];
};

export type EducationDegreeItemType = {
  institution: string;
  degree: string;
  location: string;
  fieldOfStudy: string;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
};

export type LanguageType = {
  title: string;
  items: LanguageItemType[];
};
export type LanguageItemType = {
  name: string;
  level: string;
};

export type ContactType = {
  title: string;
  description: string;
  note: string;
};

export type FooterType = {
  tagline: string;
};


export type CareerOverviewType = {
  snapshot: SnapshotType;
  selectedImpact: SelectedImpactType;
  selectedWork: SelectedWorkType;
  skills: SkillsType;
};

export type CareerDetailsType = {
  experiences: ExperienceType;
  educationDegrees: EducationDegreeType;
  certifications: CertificationsType;
  languages: LanguageType;
};

export type ResumeContentType = {
  pageMetadata: PageMetadataType;
  hero: HeroType;
  careerOverview: CareerOverviewType;
  careerDetails: CareerDetailsType;
  contact: ContactType;
  footer: FooterType;
};

// ---- Content subtypes

export type SnapshotItemType = {
  label: string;
  description: string;
};

export type ImpactItemType = {
  title: string;
  description: string;
  highlights: string[];
};

export type WorkItemType = {
  name: string;
  type: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export type SkillGroupType = {
  name: string;
  items: string[];
};




// =============================
// UI (labels, microcopy, forms)
// =============================

 export type NavigationUIType = {
   menu: {
     title: string;
     openTriggerLabel: string;
     closeTriggerLabel: string;
   };

   navItems: {
     about: { label: string; };
     careerOverview: {
       label: string;
       items: {
         snapshot: { label: string };
         impacts: { label: string };
         works: { label: string };
         skills: { label: string };
       };
     };
     careerDetails: {
       label: string;
       items: {
         experiences: { label: string; };
         education: { label: string };
         certifications: { label: string };
         languages: { label: string };
       };
     };
     contact: { label: string; }
   }
};

export type SettingsUIType = {
  menu: {
    title: string;
    openTriggerLabel: string;
    closeTriggerLabel: string;
    languageLabel: string;
    colorThemeLabel: string;
    buttonSystemLabel: string,
    buttonLightLabel: string,
    buttonDarkLabel: string,
  };
  language: {
    selectorTitle: string,
    selectorLabel: string /* English or Français */
  };
  colorTheme: {
    osThemeSelectorTitle: string,
    osThemeSelectorActiveTitle: string,
    lightThemeSelectorTitle: string,
    lightThemeSelectorActiveTitle: string,
    darkThemeSelectorTitle: string,
    darkThemeSelectorActiveTitle: string,
  };
};

export type FormUIType = {
  ariaLabel: string,
  inputs: {
    locale: {
      errorMessages: {
        required: string,
      }
    },
    name: {
      label: string,
      placeholder: string,
      errorMessages: {
        required: string,
        min: string,
        max: string,
      }
    },
    email: {
      label: string,
      placeholder: string,
      errorMessages: {
        required: string,
        min: string,
        max: string,
        email: string,
      }
    },
    message: {
      label: string,
      placeholder: string,
      errorMessages: {
        required: string,
        min: string,
        max: string,
      }
    },
    subject: {
      label: string,
      placeholder: string,
      errorMessages: {
        length: string,
      }
    }
  },
  requiredFieldMessage: string,
  notifications: {
    success: string,
    validation: string,
    sessionExpired: string,
    rateLimited: string,
    network: string,
    serviceUnavailable: string,
    unknown: string,
  },
  controls: {
    submitButton: {
      labels: {
        send: string,
        sending: string,
        done: string,
      }
    }
  }
};

export type MiscUIType = {
  poweredBy: string;
  responseTime: string;
  scrollToTopA11yLabel: string;
};

export type HeroUIType = {
  links: {
    toContactForm: string,
    resumeDownload: string,
  }
};

export type CareerOverviewUIType = {
  label: string;
  snapshot: { label: string };
  selectedImpact: { label: string };
  selectedWork: { label: string };
  skills: { label: string };
};

export type CareerDetailsUIType = {
  label: string;
  experiences: {
    label: string;
    keyFocus: { label: string };
    skills: { label: string };
  };
  education: { label: string };
  certifications: { label: string };
  languages: { label: string };
}

export type ContactUIType = {
  label: string;
  cardLabel: string,
  form: FormUIType;
};

export type ResumeUIType = {
  header: {
    navigation: NavigationUIType;
    settings: SettingsUIType,
  };

  sections: {
    hero: HeroUIType;
    careerOverview: CareerOverviewUIType;
    careerDetails: CareerDetailsUIType;
    contact: ContactUIType;
  };

  misc: MiscUIType;
  footer: {
    copyright: (year: number, name: string) => string;
  };
};
