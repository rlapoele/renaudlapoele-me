export type RLItemKeyType = "renaudlapoeledotme";

export type RLItemType = {
  key: RLItemKeyType,
  url: (urlString: string) => string
};

export type NavBarNavigationItemKeyType =
  "about" |
  "snapshot" |
  "impacts" |
  "works" |
  "skills" |
  "contact";

export type NavBarItemType = {
  key: NavBarNavigationItemKeyType;
  url: string;
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

export type ConfigType = {
  rl: RLItemType;
  navBarItems: NavBarItemType[];
  sections: {
    hero: HeroConfigType
  }
}
