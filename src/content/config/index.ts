import type {ConfigType} from "@content/config/Types";

export const config: ConfigType = {
  rl: {
    key: "renaudlapoeledotme",
    url: (urlString: string)=> urlString
  },
  navBarItems: [
    { key: "about", url: "#hero" },
    { key: "snapshot", url: "#snapshot" },
    { key: "impacts", url: "#impacts" },
    { key: "works", url: "#works" },
    { key: "skills", url: "#skills" },
    { key: "contact", url: "#contact" },
  ],
  sections: {
    hero: {
      links: {
        toContactForm: { href: "#contact" },
        resumeDownload: { href: "#" },
      },
      availability: {
        isAvailable: true
      }
    }
  }
}
