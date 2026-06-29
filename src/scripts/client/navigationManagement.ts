export const DOM_ELEMENT_IDS = {
  LINK_NAVBAR_EXPERIENCES: "rl-navbar-link-experiences",
  LINK_NAVBAR_EDUCATION: "rl-navbar-link-education",
  LINK_NAVBAR_CERTIFICATIONS: "rl-navbar-link-certifications",
  LINK_NAVBAR_LANGUAGES: "rl-navbar-link-languages",

  LINK_NAVMENU_EXPERIENCES: "rl-navmenu-link-experiences",
  LINK_NAVMENU_EDUCATION: "rl-navmenu-link-education",
  LINK_NAVMENU_CERTIFICATIONS: "rl-navmanu-link-certifications",
  LINK_NAVMENU_LANGUAGES: "rl-navmenu-link-languages",

  CAREER_DETAILS: "career-details"
} as const;


export type CreateNavigationManagerType = {
  setup: () => void;
  init: () => void;
};

export function createNavigationManager(): CreateNavigationManagerType {
  const NAVIGATION_MANAGER_STATES = {
    CREATED: 'created',
    SETUP: 'setup',
    READY: 'ready',
  };
  type NavigationManagerStateType = typeof NAVIGATION_MANAGER_STATES.CREATED | typeof NAVIGATION_MANAGER_STATES.SETUP | typeof NAVIGATION_MANAGER_STATES.READY;
  let navigationManagerState: NavigationManagerStateType = NAVIGATION_MANAGER_STATES.CREATED;

  let linkNavbarExperiencesElement: HTMLAnchorElement | null = null;
  let linkNavbarEducationElement: HTMLAnchorElement | null = null;
  let linkNavbarCertificationsElement: HTMLAnchorElement | null = null;
  let linkNavbarLanguagesElement: HTMLAnchorElement | null = null;
  let careerDetailsElement: HTMLDetailsElement | null = null;

  function scrollToTargetElement(target: HTMLElement, hash: string, shouldUpdateHistory = false) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (shouldUpdateHistory) {
          history.pushState(null, "", hash);
        }

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function getHashTarget(hash: string): HTMLElement | null {
    const id = hash.slice(1);

    if (!id) return null;

    return document.getElementById(decodeURIComponent(id));
  }

  function openDetailsAndScrollToTarget(target: HTMLElement, hash: string, shouldUpdateHistory = false) {
    const details = target.closest("details");

    if (details && !details.open) {
      details.addEventListener(
        "toggle",
        () => scrollToTargetElement(target, hash, shouldUpdateHistory),
        { once: true },
      );
      details.open = true;
      return;
    }

    scrollToTargetElement(target, hash, shouldUpdateHistory);
  }

  function handleHashNavigation(hash: string, shouldUpdateHistory = false) {
    const target = getHashTarget(hash);

    if (!target) return;

    openDetailsAndScrollToTarget(target, hash, shouldUpdateHistory);
  }

  function handleLinkClick(event: MouseEvent) {
    const link = event.currentTarget as HTMLAnchorElement;

    if (!link.hash) return;

    const target = getHashTarget(link.hash);

    if (!target) return;

    event.preventDefault();

    openDetailsAndScrollToTarget(target, link.hash, true);
  }

  function handleHashChange() {
    handleHashNavigation(window.location.hash);
  }

  return {
    setup: () => {
      if (navigationManagerState === NAVIGATION_MANAGER_STATES.SETUP) {
        throw new Error('NavigationManager.setup(): the navigation manager has already been setup');
      }
      if (navigationManagerState === NAVIGATION_MANAGER_STATES.READY) {
        throw new Error('NavigationManager.setup(): the navigation manager has already been setup and initialized. It is ready to work');
      }
      if (typeof window === 'undefined') {
        throw new Error('NavigationManager.setup(): browser `window` object is undefined');
      }

      linkNavbarExperiencesElement = document.getElementById(DOM_ELEMENT_IDS.LINK_NAVBAR_EXPERIENCES) as HTMLAnchorElement;
      if (!linkNavbarExperiencesElement) {
        throw new Error(`NavigationManager.setup(): could not find navigation link element ${DOM_ELEMENT_IDS.LINK_NAVBAR_EXPERIENCES}`);
      }
      linkNavbarEducationElement = document.getElementById(DOM_ELEMENT_IDS.LINK_NAVBAR_EDUCATION) as HTMLAnchorElement;
      if (!linkNavbarEducationElement) {
        throw new Error(`NavigationManager.setup(): could not find navigation link element ${DOM_ELEMENT_IDS.LINK_NAVBAR_EDUCATION}`);
      }
      linkNavbarCertificationsElement = document.getElementById(DOM_ELEMENT_IDS.LINK_NAVBAR_CERTIFICATIONS) as HTMLAnchorElement;
      if (!linkNavbarCertificationsElement) {
        throw new Error(`NavigationManager.setup(): could not find navigation link element ${DOM_ELEMENT_IDS.LINK_NAVBAR_CERTIFICATIONS}`);
      }
      linkNavbarLanguagesElement = document.getElementById(DOM_ELEMENT_IDS.LINK_NAVBAR_LANGUAGES) as HTMLAnchorElement;
      if (!linkNavbarLanguagesElement) {
        throw new Error(`NavigationManager.setup(): could not find navigation link element ${DOM_ELEMENT_IDS.LINK_NAVBAR_LANGUAGES}`);
      }
      careerDetailsElement = document.getElementById(DOM_ELEMENT_IDS.CAREER_DETAILS) as HTMLDetailsElement;
      if (!careerDetailsElement) {
        throw new Error(`NavigationManager.setup(): could not find anchor element ${DOM_ELEMENT_IDS.CAREER_DETAILS}`);
      }

      const linkElements = [linkNavbarExperiencesElement, linkNavbarEducationElement, linkNavbarCertificationsElement, linkNavbarLanguagesElement];

      linkElements.forEach((linkElement) => {
        linkElement.addEventListener('click', handleLinkClick);
      });

      window.addEventListener("hashchange", handleHashChange);

      navigationManagerState = NAVIGATION_MANAGER_STATES.SETUP;
    },

    init: () => {
      if (navigationManagerState === NAVIGATION_MANAGER_STATES.CREATED) {
        throw new Error('NavigationManager.init(): the navigation manager must be setup before initialization');
      }
      if (navigationManagerState === NAVIGATION_MANAGER_STATES.READY) {
        throw new Error('NavigationManager.init(): the navigation manager has already been setup and initialized. It is ready to work');
      }
      handleHashNavigation(window.location.hash);
      navigationManagerState = NAVIGATION_MANAGER_STATES.READY;
    }
  }
}
