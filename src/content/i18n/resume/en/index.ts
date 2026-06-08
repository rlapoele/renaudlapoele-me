import type { ResumeType } from "../Types.ts";

export const resumeEN : ResumeType = {
  data: {
    personal: {
      firstName: "Renaud",
      lastName: "Lapoële",
      fullName: "Renaud Lapoële",
      location: "France",
      workStyle: "Hybrid or Remote",
      availability: "Open to opportunities",
      languages: ["English (fluent)", "French (native)"],
      yearsExperience: 25
    },
  },

  content: {
    hero: {
      title: "Senior Front-End Engineer / Product Engineer",
      tagline: "UX/UI · Product · Engineering",
      summary:
        "Product-oriented front-end leader with 25+ years of experience turning complex business requirements into scalable web applications, clear interfaces, and usable systems for global teams.",
      meta: [
        { type: "Location", value: "France"},
        { type: "Work type", value:"Remote or Hybrid"},
        { type: "Focus", value:"Enterprise · Product · UX-minded"},
      ],
      focus: ["Frontend", "UX", "Product", "Design Systems", "Leadership"],
      portraitImageAlt: "Portrait of Renaud Lapoële",
      availability: {
        availableFromText: "Available from ",
        availabilityPeriodText: 'September 2026',
        openToText: 'Open to permanent or contract opportunities'
      }
    },

    snapshot: {
      title: "Design-minded engineering leadership",
      items: [
        {
          label: "25+ Years",
          description:
            "Experience across engineering, UX, and product-facing roles",
        },
        {
          label: "Cisco Systems",
          description:
            "Long-term experience in enterprise-scale environments",
        },
        {
          label: "Tech Lead + Product Owner",
          description:
            "Bridging delivery, alignment, and product thinking",
        },
        {
          label: "React · TypeScript · UX",
          description:
            "Modern front-end execution with design sensitivity",
        },
      ],
    },

    selectedImpact: {
      title: "A career shaped by useful systems and ergonomic user interfaces",
      items: [
        {
          title: "Large-scale partner platforms",
          description:
            "Led front-end and product-facing initiatives across global partner ecosystems, translating complex business requirements into usable, scalable interfaces.",
          highlights: [
            "Bridged engineering, UX, and business constraints",
            "Improved clarity and usability of complex flows",
            "Contributed across delivery, alignment, and product decisions",
          ],
        },
        {
          title: "Search platform redesign",
          description:
            "Helped rethink search experiences with a stronger focus on information architecture, usability, and implementation quality.",
          highlights: [
            "Combined UX thinking with front-end execution",
            "Worked across prototype, design, and delivery phases",
            "Focused on discoverability and reduced interaction friction",
          ],
        },
        {
          title: "Product and engineering leadership",
          description:
            "Operated at the intersection of product ownership, technical leadership, and interface design to move initiatives from ambiguity to execution.",
          highlights: [
            "Facilitated collaboration across disciplines",
            "Helped structure priorities and delivery direction",
            "Maintained attention to both user value and implementation detail",
          ],
        },
      ],
    },

    selectedWork: {
      title: "Engineering with structured creativity",
      items: [
        {
          name: "Offline-first Project Workspace",
          type: "Product Experiment",
          description:
            "A project management web app exploring offline-first behavior, multi-device sync, and clear UX for local-first workflows.",
          highlights: [
            "Built with OPFS and hybrid logical clocks",
            "Designed for multi-device consistency",
            "Focused on usability in offline scenarios",
          ],
          tags: ["TypeScript", "UX", "Sync", "Architecture"],
        },
        {
          name: "Resume Website / Personal Positioning",
          type: "Design + Engineering",
          description:
            "A bilingual resume website designed to communicate senior engineering credibility with a strong product and UX sensibility.",
          highlights: [
            "Content structured for recruiter scanning",
            "Balanced engineering clarity with design quality",
            "Built with Astro and Tailwind",
          ],
          tags: ["Astro", "Tailwind","Typescript", "Localization", "Accessibility", "Design Tokens", "Content Strategy"],
        },
      ],
    },

    skills: {
      title: "Breadth where it matters, depth where it counts",
      groups: [
        {
          name: "Frontend",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "HTML",
            "CSS",
            "Responsive UI",
          ],
        },
        {
          name: "UX / Product",
          items: [
            "UX/UI",
            "Product Thinking",
            "Information Architecture",
            "Prototyping",
            "Design Collaboration",
            "Accessibility"
          ],
        },
        {
          name: "Engineering",
          items: [
            "APIs",
            "Architecture",
            "Tech Leadership",
            "Agile",
            "Scalable Web Applications",
          ],
        },
      ],
    },

    contact: {
      title: "Let’s talk about useful, usable, scalable products",
      description:
        "Whether you are hiring for a permanent role, looking for contract support, or exploring a product-facing engineering need, feel free to get in touch.",
      note: "Usually replies within 24–48 hours.",
    },

    footer: {
      tagline:
        "Crafting usable, scalable, and thoughtful digital products",
    },
  },

  ui: {
    header: {
      /*
      availability: "Open to opportunities",
      languageSwitch: "EN / FR",
      download: "Download CV",
      */

      navigation: {
        menuOpenSelectorLabel: "Open navigation menu",
        menuCloseSelectorLabel: "Close navigation menu",
        navItems: {
          about: "Profile",
          snapshot: "Highlights",
          impacts: "Impact",
          works: "Work",
          skills: "Skills",
          contact: "Contact"
        }
      },
      settings: {
        menuOpenSelectorLabel: "Open settings menu",
        menuCloseSelectorLabel: "Close settings menu",
        language: {
          selectorLabel: "Français"
        },
        colorTheme: {
          osThemeSelectorTitle: "Use System Color Theme",
          osThemeSelectorActiveTitle: "System Color Theme is active",
          lightThemeSelectorTitle: "Use Light Color Theme",
          lightThemeSelectorActiveTitle: "Light Color Theme is active",
          darkThemeSelectorTitle: "Use Dark Color Theme",
          darkThemeSelectorActiveTitle: "Dark Color Theme is active",
        }
      },
    },

    sections: {
      hero: {
        links: {
          toContactForm: "Start a conversation",
          resumeDownload: "Download Resume",
        }
      },
      snapshot: { label: "Highlights" },
      selectedImpact: { label: "Selected impact" },
      selectedWork: { label: "Selected work"},
      skills: { label: "Skills & stack" },
      contact: {
        label: "Contact",
        form: {
          ariaLabel: "Contact form",
          inputs: {
            locale: {
              errorMessages: {
                required: "Language is required",
              }
            },
            name: {
              label: "Name",
              placeholder: "Your name",
              errorMessages: {
                required: "Your name is required",
                min: "{MIN} characters minimum required",
                max: "{MAX} characters maximum allowed",
              }
            },
            email: {
              label: "Email",
              placeholder: "you@company.com",
              errorMessages: {
                required: "Your email is required",
                email: "Please enter a valid email address",
                min: "{MIN} characters minimum required",
                max: "{MAX} characters maximum allowed",
              }
            },
            message: {
              label: "Message",
              placeholder: "Tell me a bit about the role, project, or context.",
              errorMessages: {
                required: "A message is required",
                min: "{MIN} characters minimum required",
                max: "{MAX} characters maximum allowed",
              }
            },
            subject: {
              label: "Subject",
              placeholder: "Message subject",
              errorMessages: {
                length: "Subject must remain empty",
              }
            }
          },
          requiredFieldMessage: "Required information",
          notifications: {
            success: "Your message has been sent successfully. Thank you for contacting me!",
            validation: "Some fields need attention. Please review the form and try again.",
            sessionExpired: "This form session expired. Please try sending your message again.",
            rateLimited: "Too many attempts in a short time. Please wait a few minutes before retrying.",
            network: "I could not reach the server. Check your connection, then try again.",
            serviceUnavailable: "The message service is temporarily unavailable. Please try again later.",
            unknown: "Your message could not be sent. Please try again later.",
          },
          controls: {
            submitButton: {
              labels: {
                send: "Send message",
                sending: "Sending message...",
                done: "Message sent!",
              }
            }
          }
        }
      }
    },
    misc: {
      poweredBy: "Powered by ",
      responseTime: "Usually replies within 24–48 hours",
    },
    footer: {
      copyright: (year: number, name: string) =>
        `© ${year} ${name}`,
    },
  },
};
