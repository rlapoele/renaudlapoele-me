import type {ConfigType} from "@content/config/Types";

export const config: ConfigType = {
  header: {
    rl: {
      key: "renaudlapoeledotme",
      url: (urlString: string) => urlString
    },
    navigation: {
      items: [
        {
          key: "about",
          url: "#hero",
          items: []
        },
        {
          key: "careerOverview",
          url: "#career-overview",
          items: [
            {key: "snapshot", url: "#snapshot"},
            {key: "impacts", url: "#impacts"},
            {key: "works", url: "#works"},
            {key: "skills", url: "#skills"},
          ]
        },
        {
          key: "careerDetails",
          url: "#career-details",
          items: [
            {key: "experiences", url: "#experience"},
            {key: "education", url: "#education"},
            {key: "certifications", url: "#certifications"},
            {key: "languages", url: "#languages"},
          ]
        },
        {key: "contact", url: "#contact", items:[]},
      ]
    },
  },
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
