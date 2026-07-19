import type { ResumeType } from "@content/i18n/resume/Types.ts";

export const resumeFR: ResumeType = {
  data: {
    personal: {
      firstName: "Renaud",
      lastName: "Lapoële",
      fullName: "Renaud Lapoële",
      location: "France",
      workStyle: "Hybride ou télétravail",
      availability: "Ouvert à de nouvelles opportunités",
      languages: ["Français (natif)", "Anglais (courant)", "Espagnol (notions)"],
      yearsExperience: 25,
    },
  },

  content: {
    pageMetadata: {
      title: "Renaud Lapoële | Ingénieur Front-End Senior orienté Produit",
      description: "Ingénieur Front-End Senior orienté Produit en France avec plus de 25 ans d'expérience dans la conception d'applications web évolutives, avec une forte expertise UX, produit, JavaScript, TypeScript, React, SolidJS et design systems.",
      openGraph: {
        type: "website",
        title: "Renaud Lapoële | Ingénieur Front-End Senior orienté Produit",
        description: "Ingénieur Front-End Senior en France avec plus de 25 ans d'expérience dans la conception d'applications web évolutives, avec une forte expertise UX, produit, JavaScript, TypeScript, React, SolidJS et design systems.",
        url: "https://renaudlapoele.me/fr",
        image: {
          url: "https://renaudlapoele.me/images/og/og-image-renaud-lapoele-fr.jpg",
          secureUrl: "https://renaudlapoele.me/images/og/og-image-renaud-lapoele-fr.jpg",
          alt: "Renaud Lapoële | Ingénieur Front-End Senior orienté Produit",
          width: "1200",
          height: "630",
          type: "image/jpeg",
        },
        locale: "fr_FR",
        alternateLocale: "en_GB",
      },
      jsonLdSchema: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": "https://renaudlapoele.me/fr#profilepage",
        "url": "https://renaudlapoele.me/fr",
        "name": "Renaud Lapoële | Ingénieur Front-End Senior orienté Produit",
        "inLanguage": "fr-FR",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://renaudlapoele.me/#person",
          "name": "Renaud Lapoële",
          "url": "https://renaudlapoele.me",
          "image": "https://renaudlapoele.me/images/hero/renaud-hero-desktop.jpg",
          "jobTitle": "Ingénieur Front-End Senior orienté Produit",
          "description": "Ingénieur Front-End Senior en France avec plus de 25 ans d'expérience dans la conception d'applications web évolutives, avec une forte expertise UX, produit, JavaScript, TypeScript, React, SolidJS et design systems.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          },
          "knowsLanguage": [
            "fr-FR",
            "en-GB"
          ],
          "knowsAbout": [
            "Ingénierie Front-End",
            "TypeScript",
            "JavaScript",
            "Astro",
            "Tailwind CSS",
            "SolidJS",
            "React",
            "Node.js",
            "UX Design",
            "UI Design",
            "Ingénierie Produit",
            "Accessibilité numérique",
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
      title: "Ingénieur Front-End Senior orienté Produit",
      tagline: "UX/UI · Produit · Ingénierie",
      summary:
        "Leader front-end orienté produit avec plus de 25 ans d'expérience dans la transformation de besoins complexes en applications web évolutives, interfaces claires et systèmes utilisables pour des équipes internationales.",
      meta: [
        {type: "Basé en", value: "France"}, // "🇫🇷 France"
        {type: "Type de travail", value: "Télétravail ou Hybride"}, // "💻 Télétravail ou Hybride"
        {type: "Focus", value: "Environnements complexes · Produit · UX"},
      ],
      focus: ["Ingénierie Front-End", "Produit", "UX/UI", "Architecture par Composants", "JavaScript", "TypeScript", "React", "SolidJS", "Vue", "Astro", "Design Systems"],
      portraitImageAlt: "Portrait de Renaud Lapoële",
      resumePdfFileUrl: "/pdf/renaud_lapoele_resume_fr_19-Jul-2026.pdf",
      availability: {
        availableFromText: "Disponible dès ",
        availabilityPeriodText: 'Septembre 2026',
        openToText: 'ouvert à un CDI, CDD ou une mission freelance'
      }
    },
    careerOverview: {
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
            label: "JS/TS · React · UX/UI",
            description:
              "Expertise front-end moderne avec une forte attention portée à l’expérience utilisateur",
          },
        ],
      },

      selectedImpact: {
        title:
          "Un parcours façonné par l’ingénierie produit, l’expérience utilisateur et l’impact métier",
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
          /*
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
          },*/
          {
            name: "Site de présentation / Positionnement professionnel",
            type: "Design & Engineering",
            description:
              "Site de CV bilingue conçu pour refléter un positionnement senior en ingénierie tout en mettant en avant une sensibilité produit et UX.",
            highlights: [
              "Contenu structuré pour une lecture rapide par les recruteurs",
              "Équilibre entre clarté technique et qualité de design",
              "Réalisé avec Astro et Tailwind CSS",
            ],
            tags: ["Astro", "Tailwind CSS", "Typescript", "Localisation", "Accessibilité", "Design Tokens", "Stratégie de contenu", "Web Components"],
          },
        ],
      },

      skills: {
        title:
          "Une expertise construite à la croisée de l’ingénierie, de l’UX et du produit",
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
              "Analyse des besoins",
              "Architecture de l’information",
              "Spécification logicielle",
              "Prototypage",
              "Collaboration au design",
              "Accessibilité"
            ],
          },
          {
            name: "Ingénierie",
            items: [
              "Architecture",
              "Conception de systèmes",
              "APIs",
              "Responsabilité technique",
              "Développement assisté par l'IA",
              "Applications Web évolutives",
            ],
          },
        ],
      },
    },
    careerDetails: {
      experiences: {
        title: 'Un parcours à la croisée de l’ingénierie, de l’UX et du produit',
        items: [
          {
            "company": "YunikApps",
            "role": "Consultant indépendant & Développement professionnel",
            "location": "France",
            "startDate": {
              "label": "Mai 2024",
              "year": 2024,
              "month": 5
            },
            "endDate": {
              "label": "Aujourd’hui",
              "year": null,
              "month": null
            },
            "duration": null,
            "summary": "Préparation d’une activité de conseil indépendante autour de l’ingénierie front-end, de l’accessibilité numérique et du développement de produits assisté par l’IA.",
            "responsibilities": [
              "Création et préparation du lancement d’une activité de conseil indépendante spécialisée dans les applications web et le développement de produits numériques.",
              "Conception et réalisation de projets personnels avec des technologies front-end modernes, notamment TypeScript, Astro, React, SolidJS, Tailwind CSS et Node.js.",
              "Suivi d’une formation professionnelle en accessibilité numérique et renforcement de l’expertise en conception inclusive et développement conforme aux normes WCAG.",
              "Réalisation d’une veille technologique continue et d’expérimentations pratiques autour du développement front-end moderne, du développement assisté par l’IA et des nouvelles pratiques d’ingénierie IA.",
              /*"Développement de preuves de concept et de prototypes explorant la productivité, l’expérience développeur et les processus de création de produits s’appuyant sur les technologies d’IA.",*/
              "Maintien d’une montée en compétences continue à travers des projets personnels, des recherches techniques et des réalisations concrètes."
            ],
            keyFocus: "Ingénierie Front-End moderne, accessibilité, développement assisté par l’IA et développement professionnel continu.",
            skillGroups: [
              {
                name: "Ingénierie Front-End",
                skills: [
                  "Développement Front-End",
                  "Architecture par Composants",
                  "TypeScript",
                  "Astro",
                  "Tailwind CSS",
                  "Node.js",
                  "SolidJS"
                ]
              },
              {
                name: "UX & Conception Produit",
                skills: [
                  "Accessibilité Web",
                  "Conception Inclusive",
                  "Conformité WCAG",
                  "Prototypage"
                ]
              },
              /*
              {
                name: "Produit & Delivery",
                skills: [
                  "Développement de preuves de concept (PoC)",
                  "Développement de MVP"
                ]
              },
               */
              {
                name: "Leadership Technique & Innovation",
                skills: [
                  "Veille Technologique",
                  "Expérimentation Technique",
                  "Développement Assisté par l’IA",
                  "Ingénierie IA",
                  "OpenAI",
                  "Codex"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Senior Front-End Engineer / Tech Lead / Product Owner",
            "location": "France",
            "startDate": {
              "label": "Juillet 2019",
              "year": 2019,
              "month": 7
            },
            "endDate": {
              "label": "Mai 2024",
              "year": 2024,
              "month": 5
            },
            "duration": null,
            "summary": "Rôle senior combinant leadership Front-End, conception UX et responsabilité produit sur des plateformes partenaires mondiales à grande échelle.",
            "responsibilities": [
              "Collaboré étroitement avec l’équipe Design sur la refonte de l’expérience utilisateur et piloté l’implémentation Front-End de deux plateformes mondiales de recherche de partenaires Cisco, afin de faciliter l’identification des partenaires Cisco les plus adaptés aux besoins des clients et des partenaires.",
              /*"Collaboration étroite avec l’équipe design sur la refonte UX et pilotage de l’implémentation Front-End de deux plateformes mondiales de recherche de partenaires Cisco utilisées par les clients et les partenaires dans plusieurs régions, offrant une expérience de recherche plus intuitive et cohérente.",*/
              "Intervention en tant que Tech Lead et Product Owner, avec la responsabilité du backlog, des epics, des user stories, des priorités et de l’alignement des parties prenantes tout en restant impliqué dans le développement Front-End.",
              "Définition de l’architecture UI et promotion des bonnes pratiques Front-End avec React, JavaScript, HTML, CSS et Tailwind CSS.",
              "Conception et réalisation d’API web évolutives pour la gestion des programmes d’incentive partenaires.",
              "Collaboration étroite avec les équipes métier, UX et ingénierie afin de transformer des besoins complexes en solutions intuitives et efficaces.",
              "Contribution à la migration d’un portefeuille applicatif vers Salesforce en tant que Product Owner d’une solution de gestion directe des contrats partenaires.",
              "Formation et accompagnement d’une Product Owner junior sur la gestion du backlog et des priorités, la rédaction des user stories et la communication avec les parties prenantes."
            ],
            "keyFocus": "Architecture Front-End, qualité UX, responsabilité produit et pilotage de la livraison à grande échelle.",
            "skillGroups": [
              {
                "name": "Ingénierie Front-End",
                "skills": [
                  "Développement Front-End",
                  "Architecture par Composants",
                  "React.js",
                  "JavaScript",
                  "TypeScript"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "ElasticSearch",
                  "Solr",
                  "Kibana",
                ]
              },

              {
                "name": "UX & Design produit",
                "skills": [
                  "Conception UX/UI"
                ]
              },
              {
                "name": "Produit & Delivery",
                "skills": [
                  "Product Ownership",
                  "User Stories",
                  "Méthodologies Agile"
                ]
              },
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Analyse des besoins",
                  "Communication écrite"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "UX Lead / Front-End Engineer",
            "location": "France",
            "startDate": {
              "label": "Août 2016",
              "year": 2016,
              "month": 8
            },
            "endDate": {
              "label": "Juin 2019",
              "year": 2019,
              "month": 6
            },
            "duration": null,
            "summary": "Ingénieur Front-End avec une forte dimension de leadership UX, centré sur l’amélioration de l’utilisabilité, de la cohérence et de la clarté des produits.",
            "responsibilities": [
              "Promotion des pratiques UI et UX au sein des équipes afin d’ancrer une approche centrée utilisateur et d’améliorer l’expérience globale des produits.",
              "Conception et refonte d’expériences utilisateur à l’aide de wireframes, maquettes, prototypes et parcours utilisateurs.",
              "Développement d’interfaces utilisateur complexes avec AngularJS / Angular en s’appuyant sur des approches pilotées par le prototypage.",
              "Contribution en tant qu’ingénieur Front-End à un tableau de bord de business intelligence, conciliant densité d’information et facilité d’utilisation.",
              "Réalisation rapide de prototypes Front-End avec Vue.js pour valider des idées et soutenir des initiatives MVP.",
              "Collaboration étroite avec les Product Owners, analystes et développeurs dans des environnements Lean et Agile."
            ],
            "keyFocus": "Développement Front-End orienté UX, prototypage et collaboration transverse.",
            "skillGroups": [
              {
                "name": "UX & Design produit",
                "skills": [
                  "Conception UX/UI",
                  "Expérience utilisateur (UX)",
                  "Wireframing",
                  "Prototypage",
                  "Découverte produit",
                  "Conception centrée utilisateur"
                ]
              },
              {
                "name": "Ingénierie Front-End",
                "skills": [
                  "Développement Front-End",
                  "Architecture par Composants",
                  "Responsive Web Design",
                  "Vue.js"
                ]
              },
              {
                "name": "Leadership & Collaboration",
                "skills": [
                  "Communication écrite",
                  "Collaboration transverse"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "IT Analyst / Technical Lead",
            "location": "France",
            "startDate": {
              "label": "Mars 2008",
              "year": 2008,
              "month": 3
            },
            "endDate": {
              "label": "Juillet 2016",
              "year": 2016,
              "month": 7
            },
            "duration": null,
            "summary": "Rôle hybride à l’intersection de l’analyse métier, de la conception UX et du leadership technique.",
            "responsibilities": [
              "Recueil, analyse et formalisation des besoins métier pour des plateformes mondiales de gestion des partenaires ainsi que pour des initiatives liées à la tarification et aux remises.",
              "Conception d’interfaces et d’expériences utilisateur alignées sur les processus métier et les besoins des utilisateurs afin d’améliorer l’utilisabilité et l’alignement entre les métiers et l’IT.",
              "Rédaction de spécifications techniques, de documentation fonctionnelle et de guides utilisateurs.",
              "Intervention comme responsable technique ou chef de projet sur plusieurs initiatives, avec coordination de petites équipes de réalisation.",
              "Rôle d’interface clé entre les parties prenantes métier et les équipes d’ingénierie."
            ],
            "keyFocus": "Analyse des besoins, conception UX et transformation des besoins métier en solutions concrètes.",
            "skillGroups": [
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Analyse des besoins",
                  "Recueil des besoins",
                  "Documentation technique"
                ]
              },
              {
                "name": "Produit & Delivery",
                "skills": [
                  "Product Ownership",
                  "User Stories",
                  "Méthodologies Agile"
                ]
              },
              {
                "name": "UX & Design produit",
                "skills": [
                  "Conception centrée utilisateur",
                  "Responsive Web Design"
                ]
              },
              {
                "name": "Leadership & Collaboration",
                "skills": [
                  "Collaboration transverse"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Software Engineer",
            "location": "San Jose, Californie, États-Unis",
            "startDate": {
              "label": "Février 2007",
              "year": 2007,
              "month": 2
            },
            "endDate": {
              "label": "Février 2008",
              "year": 2008,
              "month": 2
            },
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Contribution à une plateforme mondiale d’enregistrement des opportunités partenaires, précurseur de Cisco Commerce Workspace.",
              "Recueil et formalisation des besoins métier ainsi que des spécifications techniques.",
              "Conception d’interfaces utilisateur et pilotage des efforts de localisation de l’application."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Ingénierie Front-End",
                "skills": [
                  "Développement Front-End",
                  "JavaScript",
                  "HTML",
                  "CSS"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "Développement Back-End",
                  "SQL",
                  "PL/SQL",
                  "Java"
                ]
              },
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Documentation technique",
                  "Recueil des besoins",
                  "Analyse des besoins"
                ]
              }
            ]
          },
          {
            "company": "Cisco Systems",
            "role": "Software Engineer",
            "location": "France",
            "startDate": {
              "label": "Mars 1998",
              "year": 1998,
              "month": 3
            },
            "endDate": {
              "label": "Janvier 2007",
              "year": 2007,
              "month": 1
            },
            "duration": null,
            "summary": null,
            "responsibilities": [
              "Conception, développement et support d’applications web pour les équipes logistique, marketing, e-learning, finance et partenaires de la région EMEA.",
              "Intervention sur les couches Front-End et Back-End avec Java, JavaScript, HTML, CSS et les technologies Oracle."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Ingénierie Front-End",
                "skills": [
                  "Développement Front-End",
                  "JavaScript",
                  "HTML",
                  "CSS"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "Développement Back-End",
                  "SQL",
                  "PL/SQL",
                  "Java",
                  "Technologies Oracle pour applications web"
                ]
              }
            ]
          },
          {
            "company": "Université de Nantes",
            "role": "Technicien support informatique",
            "location": "Nantes, Pays de la Loire, France",
            "startDate": {
              "label": "Juillet 1996",
              "year": 1996,
              "month": 7
            },
            "endDate": {
              "label": "Décembre 1997",
              "year": 1997,
              "month": 12
            },
            "duration": "1 an et 6 mois",
            "summary": null,
            "responsibilities": [
              "Administration système et support des réseaux informatiques locaux, serveurs, postes de travail et imprimantes.",
              "Conception et développement d’un convertisseur de fichiers texte vers le format bibliographique Unimarc.",
              "Conception, réalisation et maintenance de pages web et supports imprimés pour les événements de la bibliothèque."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "UX & Design produit",
                "skills": [
                  "Conception Web"
                ]
              },
              {
                "name": "Systèmes & Support",
                "skills": [
                  "Administration système",
                  "Unix"
                ]
              },
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Communication écrite"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "Turbo Pascal"
                ]
              }
            ]
          },
          {
            "company": "Hegler France",
            "role": "Développeur junior",
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
              "Conception et développement d’une application de gestion de facturation sous Microsoft Access."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Recueil des besoins",
                  "Analyse des besoins"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "Conception de bases de données",
                  "Microsoft Access"
                ]
              }
            ]
          },
          {
            "company": "Celia",
            "role": "Développeur junior",
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
              "Conception et développement d’une application de gestion de marques sous Microsoft Access."
            ],
            "keyFocus": null,
            "skillGroups": [
              {
                "name": "Analyse métier & Communication",
                "skills": [
                  "Recueil des besoins",
                  "Analyse des besoins"
                ]
              },
              {
                "name": "Back-End & Données",
                "skills": [
                  "Conception de bases de données",
                  "Microsoft Access"
                ]
              }
            ]
          },
        ]
      },
      educationDegrees: {
        title: 'Des bases solides en informatique et en génie logiciel',
        items: [
          {
            institution: "Université de Nantes",
            degree: "Maîtrise",
            location: "France",
            fieldOfStudy: "Informatique et Génie Logiciel",
            startDate: null,
            endDate: {
              label: "1996",
              year: 1996,
              month: null
            },
            duration: "1 an",
            summary: null
          },
          {
            institution: "Université de Nantes",
            degree: "Licence",
            location: "France",
            fieldOfStudy: "Informatique et Génie Logiciel",
            startDate: null,
            endDate: {
              label: "1995",
              year: 1995,
              month: null
            },
            duration: "1 an",
            summary: null
          },
          {
            institution: "Université de Nantes",
            degree: "Diplôme Universitaire de Technologie (DUT)",
            location: "France",
            fieldOfStudy: "Informatique et Génie Logiciel",
            startDate: null,
            endDate: {
              label: "1994",
              year: 1994,
              month: null
            },
            duration: "2 ans",
            summary: null
          },
          {
            institution: "Université de Nantes",
            degree: "Baccalauréat",
            location: "France",
            fieldOfStudy: "Biologie et Mathématiques",
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
        title: 'Une démarche d’apprentissage continu tournée vers l’accessibilité',
        items: [
          {
            name: "Développer des sites et des applications web accessibles",
            institution: "Access42",
            fieldOfStudy: "Accessibilité",
            startDate: null,
            endDate: {
              label: "Octobre 2024",
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
        title: 'Collaborer efficacement dans des environnements internationaux',
        items: [
          {
            name: "Français",
            level: "Natif"
          },
          {
            name: "Anglais",
            level: "Courant"
          },
          {
            name: "Espagnol",
            level: "Notions"
          }
        ]
      },
    },
    contact: {
      title:
        "Construisons de meilleurs produits numériques",
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
      navigation: {
        menu: {
          title: "Navigation",
          openTriggerLabel: "Ouvrir le menu de navigation",
          closeTriggerLabel: "Fermer le menu de navigation",
        },
        navItems: {
          about: { label: "Profil" },
          careerOverview: {
            label: "Aperçu",
            items: {
              snapshot: { label: "Repères" },
              impacts: { label: "Contributions" },
              works: { label: "Réalisations" },
              skills: { label: "Compétences" },
            },
          },
          careerDetails: {
            label: "Détails",
            items: {
              experiences: { label: "Expérience" },
              education: { label: "Formation" },
              certifications: { label: "Certifications" },
              languages: { label: "Langues" },
            },
          },
          contact: { label: "Contact" }
        }
      },
      settings: {
        menu: {
          title: "Paramétrage",
          openTriggerLabel: "Ouvrir le menu de paramétrage",
          closeTriggerLabel: "Fermer le menu de paramétrage",
          languageLabel: "Langage",
          colorThemeLabel: "Thème Couleur",
          buttonSystemLabel: "Système",
          buttonLightLabel: "Clair",
          buttonDarkLabel: "Sombre",
        },
        language: {
          selectorTitle: "Choose English",
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
      careerOverview: {
        label: "Aperçu de la carrière",
        snapshot: { label: "Repères clés"},
        selectedImpact: { label: "Contributions"},
        selectedWork: { label: "Réalisations" },
        skills: { label: "Compétences" },
      },
      careerDetails: {
        label: "Détails de la carrière",
        experiences: {
          label: "Expérience",
          keyFocus: { label: "Repères clés" },
          skills: { label: "Compétences" }
        },
        certifications: { label: "Certifications" },
        education: { label: "Éducation" },
        languages: { label: "Langues" },
      },
      contact: {
        label: "Contact",
        cardLabel: "Contactez-moi",
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
      scrollToTopA11yLabel: "Retour en haut de la page",
    },
    footer: {
      copyright: (year: number, name: string) =>
        `© ${year} ${name}`,
    },
  },
};
