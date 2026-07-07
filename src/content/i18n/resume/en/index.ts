import type { ResumeType } from "@content/i18n/resume/Types.ts";

export const resumeEN : ResumeType = {
  data: {
    personal: {
      firstName: "Renaud",
      lastName: "Lapoële",
      fullName: "Renaud Lapoële",
      location: "France",
      workStyle: "Hybrid or Remote",
      availability: "Open to opportunities",
      languages: ["English (fluent)", "French (native)", "Spanish (basic)"],
      yearsExperience: 25
    },
  },

  content: {
    pageMetadata: {
      title: "Renaud Lapoële | Senior Front-End & Product Engineer",
      description: "Senior Front-End & Product Engineer in France with 25+ years of experience building scalable web applications across UX, product, JavaScript, TypeScript, React, SolidJS, and design systems.",
      openGraph: {
        type: "website",
        title: "Renaud Lapoële | Senior Front-End & Product Engineer",
        description: "Senior Front-End & Product Engineer in France with 25+ years of experience building scalable web applications across UX, product, JavaScript, TypeScript, React, SolidJS, and design systems.",
        url: "https://renaudlapoele.me/en",
        image: {
          url: "https://renaudlapoele.me/images/og/og-image-renaud-lapoele-en.jpg",
          secureUrl: "https://renaudlapoele.me/images/og/og-image-renaud-lapoele-en.jpg",
          alt: "Renaud Lapoële | Senior Front-End & Product Engineer",
          width: "1200",
          height: "630",
          type: "image/jpeg",
        },
        locale: "en_GB",
        alternateLocale: "fr_FR"
      },
      jsonLdSchema: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": "https://renaudlapoele.me/en#profilepage",
        "url": "https://renaudlapoele.me/en",
        "name": "Renaud Lapoële | Senior Front-End & Product Engineer",
        "inLanguage": "en-GB",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://renaudlapoele.me/#person",
          "name": "Renaud Lapoële",
          "url": "https://renaudlapoele.me",
          "image": "https://renaudlapoele.me/images/hero/renaud-hero-desktop.jpg",
          "jobTitle": "Senior Front-End & Product Engineer",
          "description": "Senior Front-End & Product Engineer in France with 25+ years of experience building scalable web applications across UX, product, JavaScript, TypeScript, React, SolidJS, and design systems.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          },
          "knowsLanguage": [
            "fr-FR",
            "en-GB"
          ],
          "knowsAbout": [
            "Front-End Engineering",
            "TypeScript",
            "JavaScript",
            "React",
            "SolidJS",
            "Astro",
            "Tailwind CSS",
            "Node.js",
            "UX Design",
            "UI Design",
            "Product Engineering",
            "Web Accessibility",
            "WCAG",
            "Design Systems"
          ],
          "sameAs": [
            "https://www.linkedin.com/in/renaud-lapoele-167106/",
            "https://github.com/rlapoele/renaudlapoele-me"
          ]
        }
      }
    },
    hero: {
      title: "Senior Front-End & Product Engineer",
      tagline: "UX/UI · Product · Engineering",
      summary:
        "Product-oriented front-end leader with 25+ years of experience turning complex business requirements into scalable web applications, clear interfaces, and usable systems for global teams.",
      meta: [
        { type: "Location", value: "France"},
        { type: "Work type", value:"Remote or Hybrid"},
        { type: "Focus", value:"Enterprise · Product · UX-minded"},
      ],
      focus: ["Front-End Engineering", "Product Engineering", "UX/UI", "JavaScript", "TypeScript", "React", "SolidJS", "Vue", "Astro", "Design Systems"],
      portraitImageAlt: "Portrait of Renaud Lapoële",
      resumePdfFileUrl: "/pdf/renaud_lapoele_resume_en_07-Jul-2026.pdf",
      availability: {
        availableFromText: "Available from ",
        availabilityPeriodText: 'September 2026',
        openToText: 'Open to permanent or contract opportunities'
      }
    },
    careerOverview: {
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
            label: "JS/TS · React · UX/UI",
            description:
              "Modern front-end execution with design sensitivity",
          },
        ],
      },
      selectedImpact: {
        title: "A career shaped by product engineering, user experience, and business impact",
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
          /*
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
          },*/
          {
            name: "Resume Website / Personal Positioning",
            type: "Design + Engineering",
            description:
              "A bilingual resume website designed to communicate senior engineering credibility with a strong product and UX sensibility.",
            highlights: [
              "Content structured for recruiter scanning",
              "Balanced engineering clarity with design quality",
              "Built with Astro and Tailwind CSS",
            ],
            tags: ["Astro", "Tailwind","Typescript", "Localization", "Accessibility", "Design Tokens", "Content Strategy", "Web Components"],
          },
        ],
      },
      skills: {
        title: "A unique blend of engineering, UX, and product expertise",
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
              "Requirements Analysis",
              "Information Architecture",
              "Software Specification",
              "Prototyping",
              "Design Collaboration",
              "Accessibility"
            ],
          },
          {
            name: "Engineering",
            items: [
              "Architecture",
              "System Design",
              "APIs",
              "Tech Leadership",
              "AI-Assisted Development",
              "Scalable Web Applications",
            ],
          },
        ],
      },
    },
    careerDetails: {
      experiences: {
        title: 'A progression through engineering, UX, and product leadership',
        items: [
          {
            "company": "YunikApps",
            "role": "Independent Consulting & Professional Development",
            "location": "France",
            "startDate": {
              "label": "January 2024",
              "year": 2024,
              "month": 1
            },
            "endDate": {
              "label": "Present",
              "year": null,
              "month": null
            },
            "duration": null,
            "summary": "Independent consulting preparation, modern front-end engineering, accessibility, and AI-assisted product development.",
            "responsibilities": [
              "Created and prepared the launch of an independent consulting activity focused on web applications and digital product development.",
              "Designed and implemented personal projects using modern front-end technologies including TypeScript, Astro, React, SolidJS, Tailwind CSS, and Node.js.",
              "Completed professional accessibility training and strengthened expertise in inclusive web design and WCAG-compliant development.",
              "Conducted continuous technology research and hands-on experimentation in modern front-end engineering, AI-assisted development, and emerging AI engineering practices.",
              /*"Developed proof-of-concepts and prototypes exploring productivity, developer experience, and product creation workflows leveraging AI technologies.",*/
              "Maintained active technical learning through self-directed projects, technical research, and practical implementation work."
            ],
            "keyFocus": "Modern Front-End engineering, accessibility, AI-assisted development, and continuous professional growth.",
            "skillGroups": [
              {
                name: "Front-End Engineering",
                skills: [
                  "Front-End Development",
                  "TypeScript",
                  "Astro",
                  "Tailwind CSS",
                  "Node.js",
                  "SolidJS"
                ]
              },
              {
                name: "UX & Product Design",
                skills: [
                  "Web Accessibility",
                  "Inclusive Design",
                  "WCAG Compliance",
                  "Prototyping"
                ]
              },
/*
              {
                name: "Product & Delivery",
                skills: [
                  "Proof of Concept Development",
                  "MVP Development"
                ]
              },
 */
              {
                name: "Technical Leadership & Innovation",
                skills: [
                  "Technology Research",
                  "Technical Experimentation",
                  "AI-Assisted Development",
                  "AI Engineering",
                  "OpenAI",
                  "Codex"
                ]
              },
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Senior Front-End Engineer / Tech Lead / Product Owner",
            "location": "France",
            "startDate": {
              "label": "July 2019",
              "year": 2019,
              "month": 7
            },
            "endDate": {
              "label": "January 2024",
              "year": 2024,
              "month": 1
            },
            "duration": null,
            "summary": "Senior individual contributor role combining Front-End leadership, UX design, and product ownership on global, large-scale partner platforms.",
            "responsibilities": [
              "Partnered with the design team to redesign the UX and led the Front-End implementation of two global Cisco partner search platforms, improving how customers and partners discover and connect with Cisco partners worldwide.",
              /*"Collaborated closely with design team on the UX redesign and led the Front-End implementation of two worldwide Cisco Partner search platforms used by customers and partners across multiple regions, delivering a more intuitive and consistent partner search experience.",*/
              "Acted as Tech Lead and Product Owner, owning backlog, epics, user stories, priorities, and stakeholder alignment while remaining hands-on with Front-End development.",
              "Drove UI architecture and Front-End best practices using React, JavaScript, HTML, CSS, and Tailwind CSS.",
              "Designed and delivered scalable web APIs supporting partner incentive program management.",
              "Collaborated closely with business, UX, and engineering teams to translate complex requirements into intuitive, usable solutions.",
              "Contributed to an application portfolio migration to Salesforce by acting as Product Owner on a direct partner contract management solution.",
              "Trained and mentored a junior Product Owner on backlog and priority management, user stories, and stakeholder communication."
            ],
            "keyFocus": "Front-End architecture, UX quality, product ownership, and delivery at scale.",
            "skillGroups": [
              {
                "name": "Front-End Engineering",
                "skills": [
                  "Front-End Development",
                  "React.js",
                  "JavaScript",
                  "TypeScript"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "ElasticSearch",
                  "Solr",
                  "Kibana",
                ]
              },
              {
                "name": "UX & Product Design",
                "skills": [
                  "UX/UI Design"
                ]
              },
              {
                "name": "Product & Delivery",
                "skills": [
                  "Product Ownership",
                  "User Stories",
                  "Agile Methodologies"
                ]
              },
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Requirements Analysis",
                  "Written Communication"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "UX Lead / Front-End Engineer",
            "location": "France",
            "startDate": {
              "label": "August 2016",
              "year": 2016,
              "month": 8
            },
            "endDate": {
              "label": "June 2019",
              "year": 2019,
              "month": 6
            },
            "duration": null,
            "summary": "Front-End engineer with a strong UX leadership role, focused on improving usability, consistency, and product clarity.",
            "responsibilities": [
              "Promoted UI and UX design practices across teams, helping embed user-centered thinking into delivery and improve overall product usability.",
              "Designed and redesigned user experiences using wireframes, mockups, prototypes, and journey maps.",
              "Implemented complex user interfaces using AngularJS / Angular, leveraging prototype-driven approaches.",
              "Contributed as Front-End engineer on a business intelligence dashboard, balancing data density with usability.",
              "Rapidly prototyped Front-End concepts using Vue.js to validate ideas and support MVP initiatives.",
              "Worked closely with product owners, analysts, and developers in Lean and Agile environments."
            ],
            "keyFocus": "UX-driven Front-End development, prototyping, and cross-functional collaboration.",
            "skillGroups": [
              {
                "name": "UX & Product Design",
                "skills": [
                  "UX/UI Design",
                  "User Experience (UX)",
                  "Wireframing",
                  "Prototyping",
                  "Product Discovery",
                  "Human-Centered Design"
                ]
              },
              {
                "name": "Front-End Engineering",
                "skills": [
                  "Front-End Development",
                  "Responsive Web Design",
                  "Vue.js"
                ]
              },
              {
                "name": "Leadership & Collaboration",
                "skills": [
                  "Written Communication",
                  "Cross-Functional Collaboration"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "IT Analyst / Technical Lead",
            "location": "France",
            "startDate": {
              "label": "March 2008",
              "year": 2008,
              "month": 3
            },
            "endDate": {
              "label": "July 2016",
              "year": 2016,
              "month": 7
            },
            "duration": null,
            "summary": "Hybrid role at the intersection of business analysis, UX design, and technical leadership.",
            "responsibilities": [
              "Gathered, analyzed, and documented business requirements for worldwide partner management platforms and pricing and discounting initiatives.",
              "Designed user interfaces and user experiences aligned with business processes and user needs, improving usability and alignment between business and IT.",
              "Authored technical specifications, functional documentation, and user manuals.",
              "Acted as technical lead or project lead on multiple initiatives, coordinating small delivery teams.",
              "Served as a key interface between business stakeholders and engineering teams."
            ],
            "keyFocus": "Requirements analysis, UX design, and translating business needs into deliverable solutions.",
            "skillGroups": [
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Requirements Analysis",
                  "Requirements Gathering",
                  "Technical Documentation"
                ]
              },
              {
                "name": "Product & Delivery",
                "skills": [
                  "Product Ownership",
                  "User Stories",
                  "Agile Methodologies"
                ]
              },
              {
                "name": "UX & Product Design",
                "skills": [
                  "Human-Centered Design",
                  "Responsive Web Design"
                ]
              },
              {
                "name": "Leadership & Collaboration",
                "skills": [
                  "Cross-Functional Collaboration"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Software Engineer",
            "location": "San Jose, CA, USA",
            "startDate": {
              "label": "February 2007",
              "year": 2007,
              "month": 2
            },
            "endDate": {
              "label": "February 2008",
              "year": 2008,
              "month": 2
            },
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Contributed to a worldwide Partner Deal Registration platform, early Cisco Commerce Workspace.",
              "Gathered and documented business requirements and technical specifications.",
              "Designed user interfaces and led application localization efforts."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Front-End Engineering",
                "skills": [
                  "Front-End Development",
                  "JavaScript",
                  "HTML",
                  "CSS"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "Back-End Development",
                  "SQL",
                  "PL/SQL",
                  "Java"
                ]
              },
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Technical Documentation",
                  "Requirements Gathering",
                  "Requirements Analysis"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Software Engineer",
            "location": "France",
            "startDate": {
              "label": "March 1998",
              "year": 1998,
              "month": 3
            },
            "endDate": {
              "label": "January 2007",
              "year": 2007,
              "month": 1
            },
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Designed, implemented, and supported web applications for logistics, marketing, e-learning, finance, and channel organizations across EMEA.",
              "Worked across Front-End and Back-End layers using Java, JavaScript, HTML, CSS, and Oracle technologies."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Front-End Engineering",
                "skills": [
                  "Front-End Development",
                  "JavaScript",
                  "HTML",
                  "CSS"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "Back-End Development",
                  "SQL",
                  "PL/SQL",
                  "Java",
                  "Oracle Web Application Technologies"
                ]
              }
            ]
          },
          {
            "company": "Nantes University",
            "role": "Technical Support Engineer",
            "location": "Nantes, Pays de la Loire, France",
            "startDate": {
              "label": "July 1996",
              "year": 1996,
              "month": 7
            },
            "endDate": {
              "label": "December 1997",
              "year": 1997,
              "month": 12
            },
            "duration": "1 year 6 months",
            "summary": null,
            "responsibilities": [
              "System administration and support of computer local networks, servers, workstations, and printers.",
              "Designed and implemented a text to Unimarc file format converter. Unimarc is a bibliographic file format.",
              "Designed, implemented, and maintained library event web pages and prints."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "UX & Product Design",
                "skills": [
                  "Web Design"
                ]
              },
              {
                "name": "Systems & Support",
                "skills": [
                  "System administration",
                  "Unix"
                ]
              },
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Written Communication"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "Turbo Pascal"
                ]
              }
            ]
          },
          {
            "company": "Hegler France",
            "role": "Junior Developer",
            "location": "France",
            "startDate": {
              "label": "1995",
              "year": 1995,
              "month": null
            },
            "endDate": null,
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Designed and implemented a billing management application in Microsoft Access."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Requirements Gathering",
                  "Requirements Analysis"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "Database Design",
                  "Microsoft Access"
                ]
              }
            ]
          },
          {
            "company": "Celia",
            "role": "Junior Developer",
            "location": "France",
            "startDate": {
              "label": "1994",
              "year": 1994,
              "month": null
            },
            "endDate": null,
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Designed and implemented a trademark management application in Microsoft Access."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Business Analysis & Communication",
                "skills": [
                  "Requirements Gathering",
                  "Requirements Analysis"
                ]
              },
              {
                "name": "Back-End & Data",
                "skills": [
                  "Database Design",
                  "Microsoft Access"
                ]
              }
            ]
          },

        ]
      },
      educationDegrees: {
        title: 'Strong technical foundations in computer science',
        items: [
          {
            institution: "Nantes University",
            degree: "Master's Degree (Maîtrise)",
            location: "France",
            fieldOfStudy: "Computer Science and Software Engineering",
            startDate: null,
            endDate: {
              label: "1996",
              year: 1996,
              month: null
            },
            duration: "1 year",
            summary: null
          },
          {
            institution: "Nantes University",
            degree: "Bachelor's Degree (Licence)",
            location: "France",
            fieldOfStudy: "Computer Science and Software Engineering",
            startDate: null,
            endDate: {
              label: "1995",
              year: 1995,
              month: null
            },
            duration: "1 year",
            summary: null
          },
          {
            institution: "Nantes University",
            degree: "University Diploma of Technology (DUT)",
            location: "France",
            fieldOfStudy: "Computer Science and Software Engineering",
            startDate: null,
            endDate: {
              label: "1994",
              year: 1994,
              month: null
            },
            duration: "2 years",
            summary: null
          },
          {
            institution: "Nantes University",
            degree: "High School Diploma",
            location: "France",
            fieldOfStudy: "Biology and Mathematics",
            startDate: null,
            endDate: {
              label: "1992",
              year: 1992,
              month: null
            },
            duration: null,
            summary: null
          }
        ]
      },
      certifications: {
        title: 'Continuous learning with a focus on accessibility',
        items: [
          {
            name: "Développer des sites et des applications web accessibles",
            institution: "Access42",
            fieldOfStudy: "Accessibility",
            startDate: null,
            endDate: {
              label: "October 2024",
              year: 2024,
              month: 10
            },
            duration: null,
            summary: null,
            certificateURL: "https://certificate.bcdiploma.com/check/A5B83C3A8F1FAC493938BB27FBB0F509A0D418B9803F5D6D00BB736DDAED0EFAVEpoSTBnMjNUY0c2TUNtWEZ5MkxsWm1pU250YlVma2RpelZkdWRMTzkwU0dvcFBZ"
          }
        ]
      },
      languages: {
        title: 'Collaborating across global teams and cultures',
        items: [
          {
            name: "French",
            level: "Native"
          },
          {
            name: "English",
            level: "Fluent"
          },
          {
            name: "Spanish",
            level: "Basic"
          }
        ]
      },
    },
    contact: {
      title: "Let’s build better digital products",
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
      navigation: {
        menu: {
          title: "Navigation",
          openTriggerLabel: "Open navigation menu",
          closeTriggerLabel: "Close navigation menu",
        },
        navItems: {
          about: { label: "Profile" },
          careerOverview: {
            label: "Overview",
            items: {
              snapshot: { label: "Highlights" },
              impacts: { label: "Impact" },
              works: { label: "Work" },
              skills: { label: "Skills" },
            },
          },
          careerDetails: {
            label: "Details",
            items: {
              experiences: { label: "Experience" },
              certifications: { label: "Certifications" },
              education: { label: "Education" },
              languages: { label: "Languages" },
            },
          },
          contact: { label: "Contact" }
        }
      },
      settings: {
        menu: {
          title: "Settings",
          openTriggerLabel: "Open Settings",
          closeTriggerLabel: "Close Settings",
          languageLabel: "Language",
          colorThemeLabel: "Color Theme",
          buttonSystemLabel: "System",
          buttonLightLabel: "Light",
          buttonDarkLabel: "Dark",
        },
        language: {
          selectorTitle: "Choisir le français",
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
      careerOverview: {
        label: "Career overview",
        snapshot: { label: "Highlights" },
        selectedImpact: { label: "Selected impact" },
        selectedWork: { label: "Selected work"},
        skills: { label: "Skills & stack" },
      },
      careerDetails: {
        label: "Career details",
        experiences: {
          label: "Experience",
          keyFocus: { label: "Key focus" },
          skills: { label: "Skills" }
        },
        education: { label: "Education" },
        certifications: { label: "Certifications" },
        languages: { label: "Languages" },
      },
      contact: {
        label: "Contact",
        cardLabel: "Get in touch",
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
      scrollToTopA11yLabel: "Scroll to top",
    },
    footer: {
      copyright: (year: number, name: string) =>
        `© ${year} ${name}`,
    },
  },
};
