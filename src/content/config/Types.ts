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

export type NavBarSubItemKeyType = Exclude<NavItemKeyType, NavBarItemKeyType>;

export type NavLinkType<Key extends NavItemKeyType = NavItemKeyType> = {
  key: Key;
  url: string;
};

export type NavBarItemType = NavLinkType<NavBarItemKeyType> & {
  items: NavLinkType<NavBarSubItemKeyType>[];
};

export type NavigationType = {
  items: NavBarItemType[];
};

export type LinkType = { href: string };

export type HeroLinksType = {
  toContactForm: LinkType
};

export type HeroConfigType = {
  links: HeroLinksType,
  availability: {
    isAvailable: boolean;
  }
}

export type ConfigType = {
  header: {
    rl: RLItemType;
    navigation: NavigationType;
  };
  sections: {
    hero: HeroConfigType;
  }
}
