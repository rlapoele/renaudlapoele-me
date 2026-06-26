export const DOM_ELEMENT_IDS = {
  MENU_TRIGGER_SETTINGS: "rl-settings-menu-trigger",
  MENU_SETTINGS: "rl-settings-menu",
  MENU_TRIGGER_NAV: "rl-nav-menu-trigger",
  MENU_NAV: "rl-nav-menu",
} as const;

export type CreateMenuManagerType = {
  setup: () => void;
  init: () => void;
};

export function createMenuManager(): CreateMenuManagerType {
  const MENU_MANAGER_STATES = {
    CREATED: 'created',
    SETUP: 'setup',
    READY: 'ready',
  };
  type MenuManagerStateType = typeof MENU_MANAGER_STATES.CREATED | typeof MENU_MANAGER_STATES.SETUP | typeof MENU_MANAGER_STATES.READY;
  let menuManagerState: MenuManagerStateType = MENU_MANAGER_STATES.CREATED;

  let menuTriggerSettingsElement: HTMLElement | null = null;
  let menuSettingsElement: HTMLElement | null = null;
  let menuTriggerNavElement: HTMLElement | null = null;
  let menuNavElement: HTMLElement | null = null;

  return {
    setup: () => {
      if (menuManagerState === MENU_MANAGER_STATES.SETUP) {
        throw new Error('MenuManager.setup(): the menu manager has already been setup');
      }
      if (menuManagerState === MENU_MANAGER_STATES.READY) {
        throw new Error('MenuManager.setup(): the menu manager has already been setup and initialized. It is ready to work');
      }
      if (typeof window === 'undefined') {
        throw new Error('MenuManager.setup(): browser `window` object is undefined');
      }
      menuTriggerNavElement = document.getElementById(DOM_ELEMENT_IDS.MENU_TRIGGER_NAV);
      if (!menuTriggerNavElement) {
        throw new Error('MenuManager.setup(): could not find menu trigger nav element');
      }
      menuNavElement = document.getElementById(DOM_ELEMENT_IDS.MENU_NAV);
      if (!menuNavElement) {
        throw new Error('MenuManager.setup(): could not find menu nav element');
      }
      menuTriggerSettingsElement = document.getElementById(DOM_ELEMENT_IDS.MENU_TRIGGER_SETTINGS);
      if (!menuTriggerSettingsElement) {
        throw new Error('MenuManager.setup(): could not find menu trigger settings element');
      }
      menuSettingsElement = document.getElementById(DOM_ELEMENT_IDS.MENU_SETTINGS);
      if (!menuSettingsElement) {
        throw new Error('MenuManager.setup(): could not find menu settings element');
      }


      menuManagerState = MENU_MANAGER_STATES.SETUP;
    },


    init: () => {
      if (menuManagerState === MENU_MANAGER_STATES.CREATED) {
        throw new Error('MenuManager.init(): the menu manager must be setup before initialization');
      }
      if (menuManagerState === MENU_MANAGER_STATES.READY) {
        throw new Error('MenuManager.init(): the menu manager has already been setup and initialized. It is ready to work');
      }


      menuManagerState = MENU_MANAGER_STATES.READY;
    }
  }
}
