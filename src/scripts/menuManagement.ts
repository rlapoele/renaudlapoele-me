export const DOM_ELEM_IDS = {
  MENU_TRIGGER_SETTINGS: "menu-settings-trigger",
  MENU_SETTINGS: "menu-settings",
  MENU_TRIGGER_NAV: "menu-nav-trigger",
  MENU_NAV: "menu-nav",
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
  return {
    setup: () => {
      if (menuManagerState === MENU_MANAGER_STATES.SETUP) {
        throw new Error('MenuManager.setup(): the menu manager has already been setup');
      }
      if (menuManagerState === MENU_MANAGER_STATES.READY) {
        throw new Error('MenuManager.setup(): the menu manager has already been setup and initialized. It is ready to work');
      }


      menuManagerState = MENU_MANAGER_STATES.SETUP;
      console.log('The menu manager has successfully been setup!');
    },


    init: () => {
      if (menuManagerState === MENU_MANAGER_STATES.CREATED) {
        throw new Error('MenuManager.init(): the menu manager must be setup before initialization');
      }
      if (menuManagerState === MENU_MANAGER_STATES.READY) {
        throw new Error('MenuManager.init(): the menu manager has already been setup and initialized. It is ready to work');
      }


      menuManagerState = MENU_MANAGER_STATES.READY;
      console.log('The menu manager has successfully been initialized!');
    }
  }
}
