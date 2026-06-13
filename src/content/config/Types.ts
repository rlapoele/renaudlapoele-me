export type RLItemKeyType = "renaudlapoeledotme";

export type RLItemType = {
  key: RLItemKeyType,
  url: (urlString: string) => string
};

export type NavItemKeyType =
  "about" |
  "careerOverview" |
  "snapshot" |
  "impacts" |
  "works" |
  "skills" |
  "careerDetails" |
  "experiences" |
  "education" |
  "certifications" |
  "languages" |
  "contact";

export type NavBarItemKeyType =
  "about" |
  "careerOverview" |
  "careerDetails" |
  "contact";

export type NavItemType = {
  key: NavItemKeyType;
  url: string;
  items?: NavItemType[];
};

export type NavBarItemType = Omit<NavItemType, "key" | "items"> & {
  key: NavBarItemKeyType;
  items?: NavItemType[];
};

export type LinkType = { href: string };

export type HeroLinksType = {
  toContactForm: LinkType,
  resumeDownload: LinkType
};

export type HeroConfigType = {
  links: HeroLinksType,
  availability: {
    isAvailable: boolean;
  }
}

export type CertificationsConfigType = {
  certificationProofLink: string;
}

export type ConfigType = {
  rl: RLItemType;
  navBarItems: NavBarItemType[];
  sections: {
    hero: HeroConfigType
    certifications: CertificationsConfigType[]
  }
}
