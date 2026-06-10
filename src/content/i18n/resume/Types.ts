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
  company: string;
  role: string | null;
  location: string | null;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
  responsibilities: string[];
  keyFocus: string | null;
  skills: string[];
};

export type CertificationType = {
  name: string;
  institution: string;
  fieldOfStudy: string;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
};

export type EducationDegreeType = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: GenericDateType | null;
  endDate: GenericDateType | null;
  duration: string | null;
  summary: string | null;
};

export type LanguageType = {
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

export type ResumeContentType = {
  hero: HeroType;
  snapshot: SnapshotType;
  selectedImpact: SelectedImpactType;
  selectedWork: SelectedWorkType;
  skills: SkillsType;
  experiences: ExperienceType[];
  educationDegrees: EducationDegreeType[];
  certifications: CertificationType[];
  languages: LanguageType[];
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
   menuOpenSelectorLabel: string,
   menuCloseSelectorLabel: string,
   navItems: {
     about: string,
     snapshot: string,
     impacts: string,
     works: string,
     skills: string,
     contact: string
   }
};

export type SettingsUIType = {
  menuOpenSelectorLabel: string,
  menuCloseSelectorLabel: string,
  language: {
    selectorLabel: string /* English or Français */
  },
	  colorTheme: {
	    osThemeSelectorTitle: string,
	    osThemeSelectorActiveTitle: string,
	    lightThemeSelectorTitle: string,
	    lightThemeSelectorActiveTitle: string,
	    darkThemeSelectorTitle: string,
	    darkThemeSelectorActiveTitle: string,
	  }
	}

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

export type MiscType = {
  poweredBy: string;
  responseTime: string;
};

export type HeroUIType = {
  links: {
    toContactForm: string,
    resumeDownload: string,
  }
}

export type ResumeUIType = {
  header: {
    navigation: NavigationUIType;
    settings: SettingsUIType,
  };

  sections: {
    hero: HeroUIType;
    snapshot: { label: string };
    selectedImpact: { label: string };
    selectedWork: { label: string };
    skills: { label: string };
    contact: {
      label: string;
      form: FormUIType;
    };
  };

  misc: MiscType;
  footer: {
    copyright: (year: number, name: string) => string;
  };
};
