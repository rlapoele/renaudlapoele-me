import type { ResumeType } from "../Types.ts";

export const resumeFR: ResumeType = {
  data: {
    personal: {
      firstName: "Renaud",
      lastName: "Lapoële",
      fullName: "Renaud Lapoële",
      location: "France",
      workStyle: "Hybride ou télétravail",
      availability: "Ouvert à de nouvelles opportunités",
      languages: ["Français (natif)", "Anglais (courant)"],
      yearsExperience: 25,
    },
  },

  content: {
    hero: {
      title: "Ingénieur Front-End Senior / Ingénieur Produit",
      tagline: "UX/UI · Produit · Ingénierie",
      summary:
        "Leader front-end orienté produit avec plus de 25 ans d'expérience dans la transformation de besoins complexes en applications web évolutives, interfaces claires et systèmes utilisables pour des équipes internationales.",
      meta: [
        { type: "Basé en", value: "France"}, // "🇫🇷 France"
        { type: "Type de travail", value:"Télétravail ou Hybride"}, // "💻 Télétravail ou Hybride"
        { type: "Focus", value:"Environnements complexes · Produit · UX"},
      ],
      focus: ["Frontend", "UX", "Produit", "Design Systems", "Leadership"],
      portraitImageAlt: "Portrait de Renaud Lapoële",
      availability: {
        availableFromText: "Disponible dès ",
        availabilityPeriodText: 'Septembre 2026',
        openToText: 'ouvert à un CDI, CDD ou une mission freelance'
      }
    },

    snapshot: {
      title: "Un profil d’ingénieur avec une forte sensibilité produit et design",
      items: [
        {
          label: "25+ ans d’expérience",
          description:
            "Expérience couvrant le développement, l’expérience utilisateur et des rôles orientés produit",
        },
        {
          label: "Cisco Systems",
          description:
            "Expérience long terme sur des plateformes à grande échelle",
        },
        {
          label: "Tech Lead & Product Owner",
          description:
            "Capacité à faire le lien entre delivery, produit et alignement des équipes",
        },
        {
          label: "React · TypeScript · UX",
          description:
            "Expertise front-end moderne avec une forte attention portée à l’expérience utilisateur",
        },
      ],
    },

    selectedImpact: {
      title:
        "Un parcours construit autour de systèmes utiles et d’interfaces ergonomiques",
      items: [
        {
          title: "Plateformes partenaires à grande échelle",
          description:
            "Pilotage et contribution à des initiatives front-end et produit sur des plateformes globales à destination de partenaires, en transformant des besoins métiers complexes en interfaces utilisables et évolutives.",
          highlights: [
            "Alignement entre contraintes techniques, UX et enjeux métiers",
            "Amélioration de la clarté et de l’utilisabilité de parcours complexes",
            "Contribution sur la delivery, l’alignement et les décisions produit",
          ],
        },
        {
          title: "Refonte de plateformes de recherche",
          description:
            "Participation à la refonte d’expériences de recherche avec un focus sur l’architecture de l’information, l’utilisabilité et la qualité d’implémentation.",
          highlights: [
            "Combinaison de réflexion UX et d’implémentation front-end",
            "Intervention du prototype jusqu’à la mise en production",
            "Amélioration de la découvrabilité et réduction des frictions",
          ],
        },
        {
          title: "Leadership produit et technique",
          description:
            "Positionnement à l’intersection du produit, du développement et du design pour faire avancer des sujets complexes de l’ambiguïté vers la réalisation.",
          highlights: [
            "Facilitation de la collaboration entre équipes pluridisciplinaires",
            "Structuration des priorités et du delivery",
            "Attention portée à la valeur utilisateur et à la qualité technique",
          ],
        },
      ],
    },

    selectedWork: {
      title: "Une ingénierie structurée avec une dimension créative",
      items: [
        {
          name: "Application de gestion de projets offline-first",
          type: "Expérimentation produit",
          description:
            "Application web de gestion de projets explorant le fonctionnement offline-first, la synchronisation multi-appareils et une UX adaptée aux usages locaux.",
          highlights: [
            "Implémentation avec OPFS et horloges logiques hybrides",
            "Conçue pour la cohérence multi-appareils",
            "Attention portée à l’utilisabilité en mode hors ligne",
          ],
          tags: ["TypeScript", "UX", "Sync", "Architecture"],
        },
        {
          name: "Site de présentation / Positionnement professionnel",
          type: "Design & Engineering",
          description:
            "Site de CV bilingue conçu pour refléter un positionnement senior en ingénierie tout en mettant en avant une sensibilité produit et UX.",
          highlights: [
            "Contenu structuré pour une lecture rapide par les recruteurs",
            "Équilibre entre clarté technique et qualité de design",
            "Réalisé avec Astro et Tailwind",
          ],
          tags: ["Astro", "Tailwind", "Typescript", "Localisation", "Accessibilité", "Design Tokens", "Stratégie de contenu"],
        },
      ],
    },

    skills: {
      title:
        "Une expertise large et diversifiée, avec de la profondeur là où ça compte",
      groups: [
        {
          name: "Frontend",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "HTML",
            "CSS",
            "Interfaces réactives",
          ],
        },
        {
          name: "UX / Produit",
          items: [
            "UX/UI",
            "Approche produit",
            "Architecture de l’information",
            "Prototypage",
            "Collaboration au design",
            "Accessibilité"
          ],
        },
        {
          name: "Ingénierie",
          items: [
            "APIs",
            "Architecture",
            "Responsabilité technique",
            "Agile",
            "Applications web évolutives",
          ],
        },
      ],
    },

    contact: {
      title:
        "Discutons de produits utiles, utilisables et conçus pour durer",
      description:
        "Que ce soit pour un poste permanent, une mission freelance ou un besoin spécifique en ingénierie orienté produit, n’hésitez pas à me contacter.",
      note: "Réponse généralement sous 24 à 48 heures.",
    },

    footer: {
      tagline:
        "Concevoir des produits numériques utiles, utilisables et durables",
    },
  },

  ui: {
    header: {
//      availability: "Ouvert à de nouvelles opportunités",
      navigation: {
        menuOpenSelectorLabel: "Ouvrir le menu de navigation",
        menuCloseSelectorLabel: "Fermer le menu de navigation",
        navItems: {
          about: "Profil",
          snapshot: "Repères",
          impacts: "Contributions",
          works: "Réalisations",
          skills: "Compétences",
          contact: "Contact"
        }
      },
      settings: {
        menuOpenSelectorLabel: "Ouvrir le menu de paramétrage",
        menuCloseSelectorLabel: "Fermer le menu de paramétrage",
        language: {
          selectorLabel: "English"
        },
        colorTheme: {
          osThemeSelectorTitle: "Utiliser le thème couleurs système",
          osThemeSelectorActiveTitle: "Le thème couleurs système est actif",
          lightThemeSelectorTitle: "Utiliser le thème couleurs claires",
          lightThemeSelectorActiveTitle: "Le thème couleurs claires est actif",
          darkThemeSelectorTitle: "Utiliser le thème couleurs sombres",
          darkThemeSelectorActiveTitle: "Le thème couleurs sombres est actif",
        }
      },
    },

    sections: {
      hero: {
        links: {
          toContactForm: "Démarrer une conversation",
          resumeDownload: "Télécharger le CV",
        }
      },
      snapshot: { label: "Repères clés"},
      selectedImpact: { label: "Contributions"},
      selectedWork: { label: "Réalisations" },
      skills: { label: "Compétences" },
      contact: {
        label: "Contact",
        form: {
          ariaLabel: "Formulaire de contact",
          inputs: {
            locale: {
              errorMessages: {
                required: "Le langage est requis",
              }
            },
            name: {
              label: "Nom",
              placeholder: "Votre nom",
              errorMessages: {
                required: "Votre nom est requis",
                min: "{MIN} caractères minimum sont requis",
                max: "{MAX} caractères maximum sont acceptés",
              }
            },
            email: {
              label: "Email",
              placeholder: "vous@entreprise.com",
              errorMessages: {
                required: "Votre email est nécessaire",
                email: "Merci d'indiquer une adresse mail valide",
                min: "{MIN} caractères minimum sont requis",
                max: "{MAX} caractères maximum sont acceptés",
              }
            },
            message: {
              label: "Message",
              placeholder: "Décrivez brièvement le contexte, le poste ou le projet.",
              errorMessages: {
                required: "Un message est obligatoire",
                min: "{MIN} caractères minimum sont requis",
                max: "{MAX} caractères maximum sont acceptés"
              }
            },
            subject: {
              label: "Sujet",
              placeholder: "Sujet du message",
              errorMessages: {
                length: "Le sujet doit rester vide",
              }
            }
          },
          requiredFieldMessage: "Information requise",
          notifications: {
            success: "Votre message a bien été envoyé. Merci de m'avoir contacté!",
            validation: "Certains champs demandent votre attention. Vérifiez le formulaire puis réessayez.",
            sessionExpired: "Cette session de formulaire a expiré. Merci de renvoyer votre message.",
            rateLimited: "Trop de tentatives en peu de temps. Merci d'attendre quelques minutes avant de réessayer.",
            network: "Le serveur est momentanément inaccessible. Vérifiez votre connexion, puis réessayez.",
            serviceUnavailable: "Le service d'envoi est temporairement indisponible. Merci de réessayer plus tard.",
            unknown: "Votre message n'a pas pu être envoyé. Merci de réessayer plus tard.",
          },
          controls: {
            submitButton: {
              labels: {
                send: "Envoyer votre message",
                sending: "Envoi en cours...",
                done: "Message envoyé!",
              }
            }
          }
        }
      },
    },
    misc: {
      poweredBy: "Propulsé par ",
      responseTime: "Réponse sous 24 à 48 heures",
    },
    footer: {
      copyright: (year: number, name: string) =>
        `© ${year} ${name}`,
    },
  },
};
