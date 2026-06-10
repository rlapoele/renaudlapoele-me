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
    },
    certifications: [
      {
        certificationProofLink: "https://certificate.bcdiploma.com/check/A5B83C3A8F1FAC493938BB27FBB0F509A0D418B9803F5D6D00BB736DDAED0EFAVEpoSTBnMjNUY0c2TUNtWEZ5MkxsWm1pU250YlVma2RpelZkdWRMTzkwU0dvcFBZ"
      }
    ]
  }
}
