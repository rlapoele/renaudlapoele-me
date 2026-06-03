import {disableElement, enableElement} from "@scripts/enableDisableElement.ts";

export const DOM_ELEMENT_IDS = {
  COLOR_THEME_SELECTOR_LIGHT: 'rl-color-theme-selector-light',
  COLOR_THEME_SELECTOR_DARK: 'rl-color-theme-selector-dark',
  COLOR_THEME_MANAGER_SELECTOR_SYSTEM: 'rl-color-theme-manager-selector-system',
} as const;

export type CreateColorThemeManagerType = {
  setup: () => void;
  init: () => void;
};

export function createColorThemeManager(): CreateColorThemeManagerType {
  const COLOR_THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    DEFAULT: 'dark'
  } as const;

  const COLOR_THEME_MANAGERS = {
    SYSTEM: 'system',
    USER: 'user',
    DEFAULT: 'system'
  } as const;

  const STORAGE_KEYS = {
    COLOR_THEME: 'rl-color-theme',
    COLOR_THEME_MANAGER: 'rl-color-theme-manager',
  } as const;

  const MEDIA_QUERY_DARK_COLOR_THEME = '(prefers-color-scheme: dark)' as const;

  const COLOR_THEME_MANAGER_STATES = {
    CREATED: 'created',
    SETUP: 'setup',
    READY: 'ready',
  };

  const RL_TOUCH_HANDLED_ATTRIBUTE = 'rl-touch-handled' as const;

  type ColorThemeType = typeof COLOR_THEMES.LIGHT | typeof COLOR_THEMES.DARK;
  type ColorThemeManagerType = typeof COLOR_THEME_MANAGERS.SYSTEM | typeof COLOR_THEME_MANAGERS.USER;
  type ColorThemeManagerStateType = typeof COLOR_THEME_MANAGER_STATES.CREATED | typeof COLOR_THEME_MANAGER_STATES.SETUP | typeof COLOR_THEME_MANAGER_STATES.READY;

  let colorThemeManagerState: ColorThemeManagerStateType = COLOR_THEME_MANAGER_STATES.CREATED;
  let colorTheme: ColorThemeType = COLOR_THEMES.DEFAULT;
  let colorThemeManager: ColorThemeManagerType = COLOR_THEME_MANAGERS.DEFAULT;

  let userLightColorThemeSelector: HTMLElement | null = null;
  let userDarkColorThemeSelector: HTMLElement | null = null;
  let systemColorThemeManagerSelector: HTMLElement | null = null;

  function touchstartEventHandler(
    elem: HTMLElement,
    callbackFn: () => void,
  ): (event: TouchEvent) => void {
    return (event: TouchEvent) => {
      event?.preventDefault();
      elem.setAttribute(RL_TOUCH_HANDLED_ATTRIBUTE, 'true')
      callbackFn();
    }
  }

  function clickEventHandler(
    elem: HTMLElement,
    callbackFn: () => void
  ): (event: MouseEvent) => void {
    return (event) => {
      event.preventDefault();
      if(!elem.hasAttribute(RL_TOUCH_HANDLED_ATTRIBUTE)) {
        callbackFn();
      }
      setTimeout((): void => { elem.removeAttribute(RL_TOUCH_HANDLED_ATTRIBUTE) },300);
    }
  }

  function getSystemColorTheme(): ColorThemeType {
    return window.matchMedia(MEDIA_QUERY_DARK_COLOR_THEME).matches
      ? COLOR_THEMES.DARK
      : COLOR_THEMES.LIGHT;
  }

  function getStoredColorThemeManager(): ColorThemeManagerType {
    const storedColorThemeManager = window.localStorage.getItem(STORAGE_KEYS.COLOR_THEME_MANAGER);
    if (
      storedColorThemeManager === COLOR_THEME_MANAGERS.SYSTEM
      || storedColorThemeManager === COLOR_THEME_MANAGERS.USER
    ) {
      return storedColorThemeManager;
    }
    return COLOR_THEME_MANAGERS.DEFAULT;
  }

  function getStoredColorTheme(): ColorThemeType {
    const storedColorTheme: string = window.localStorage.getItem(STORAGE_KEYS.COLOR_THEME) || '';
    return (Object.values(COLOR_THEMES).includes(storedColorTheme as ColorThemeType)) ? storedColorTheme as ColorThemeType : COLOR_THEMES.DEFAULT;
  }

  function applyThemeState(
    newColorTheme: ColorThemeType,
    newColorThemeManager: ColorThemeManagerType
  ): void {
    window.localStorage.setItem(STORAGE_KEYS.COLOR_THEME, newColorTheme);
    window.localStorage.setItem(STORAGE_KEYS.COLOR_THEME_MANAGER, newColorThemeManager);
    document.documentElement.classList.remove(COLOR_THEMES.DARK, COLOR_THEMES.LIGHT);
    document.documentElement.classList.add(newColorTheme);
    if (newColorThemeManager === COLOR_THEME_MANAGERS.SYSTEM) {
      disableElement(systemColorThemeManagerSelector as HTMLInputElement);
    }
    else {
      enableElement(systemColorThemeManagerSelector as HTMLInputElement);
    }
    if (newColorTheme === COLOR_THEMES.DARK) {
      enableElement(userLightColorThemeSelector as HTMLInputElement);
      disableElement(userDarkColorThemeSelector as HTMLInputElement);
    } else {
      enableElement(userDarkColorThemeSelector as HTMLInputElement);
      disableElement(userLightColorThemeSelector as HTMLInputElement);
    }

    console.log(
      `The color theme has been successfully changed to "${newColorTheme}" and the color theme manager to "${newColorThemeManager}".`
    )
  }

  function setUserLightColorTheme(): void {
    colorTheme = COLOR_THEMES.LIGHT;
    colorThemeManager = COLOR_THEME_MANAGERS.USER;
    applyThemeState(colorTheme, colorThemeManager);
  }
  function setUserDarkColorTheme(): void {
    colorTheme = COLOR_THEMES.DARK;
    colorThemeManager = COLOR_THEME_MANAGERS.USER;
    applyThemeState(colorTheme, colorThemeManager);
  }
  function setSystemColorThemeManager(): void {
    colorTheme = getSystemColorTheme();
    colorThemeManager = COLOR_THEME_MANAGERS.SYSTEM;
    applyThemeState(colorTheme, colorThemeManager);
  }
  function updateSystemColorTheme({matches}: MediaQueryListEvent): void {
    if (colorThemeManager === COLOR_THEME_MANAGERS.SYSTEM) {
      colorTheme = matches ? COLOR_THEMES.DARK : COLOR_THEMES.LIGHT;
      applyThemeState(colorTheme, colorThemeManager);
    }
  }

  function setup(): void {
    if (colorThemeManagerState === COLOR_THEME_MANAGER_STATES.SETUP) {
      throw new Error('ColorThemeManager.setup(): the color theme manager has already been setup');
    }
    if (colorThemeManagerState === COLOR_THEME_MANAGER_STATES.READY) {
      throw new Error('ColorThemeManager.setup(): the color theme manager has already been setup and initialized. It is ready to work');
    }
    if (typeof window === 'undefined') {
      throw new Error('ColorThemeManager.setup(): browser `window` object is undefined');
    }
    userLightColorThemeSelector = document.getElementById(DOM_ELEMENT_IDS.COLOR_THEME_SELECTOR_LIGHT);
    if (!userLightColorThemeSelector) {
      throw new Error(`ColorThemeManager.setup(): "${DOM_ELEMENT_IDS.COLOR_THEME_SELECTOR_LIGHT}" DOM element is missing.`);
    }
    userDarkColorThemeSelector = document.getElementById(DOM_ELEMENT_IDS.COLOR_THEME_SELECTOR_DARK);
    if (!userDarkColorThemeSelector) {
      throw new Error(`ColorThemeManager.setup(): "${DOM_ELEMENT_IDS.COLOR_THEME_SELECTOR_DARK}" DOM element is missing.`);
    }
    systemColorThemeManagerSelector = document.getElementById(DOM_ELEMENT_IDS.COLOR_THEME_MANAGER_SELECTOR_SYSTEM);
    if (!systemColorThemeManagerSelector) {
      throw new Error(`ColorThemeManager.setup(): "${DOM_ELEMENT_IDS.COLOR_THEME_MANAGER_SELECTOR_SYSTEM}" DOM element is missing.`);
    }
    userLightColorThemeSelector.addEventListener('touchstart', touchstartEventHandler(userLightColorThemeSelector, setUserLightColorTheme));
    userLightColorThemeSelector.addEventListener('click', clickEventHandler(userLightColorThemeSelector, setUserLightColorTheme));
    userDarkColorThemeSelector.addEventListener('touchstart', touchstartEventHandler(userDarkColorThemeSelector, setUserDarkColorTheme));
    userDarkColorThemeSelector.addEventListener('click', clickEventHandler(userDarkColorThemeSelector, setUserDarkColorTheme));
    systemColorThemeManagerSelector.addEventListener('touchstart', touchstartEventHandler(systemColorThemeManagerSelector, setSystemColorThemeManager));
    systemColorThemeManagerSelector.addEventListener('click', clickEventHandler(systemColorThemeManagerSelector, setSystemColorThemeManager));
    window.matchMedia(MEDIA_QUERY_DARK_COLOR_THEME).addEventListener('change', updateSystemColorTheme);
    colorThemeManagerState = COLOR_THEME_MANAGER_STATES.SETUP;
    console.log('The color theme manager has successfully been setup!');
  }

  function init(): void {
    if (colorThemeManagerState === COLOR_THEME_MANAGER_STATES.CREATED) {
      throw new Error('ColorThemeManager.init(): the color theme manager must be setup before initialization');
    }
    if (colorThemeManagerState === COLOR_THEME_MANAGER_STATES.READY) {
      throw new Error('ColorThemeManager.init(): the color theme manager has already been setup and initialized. It is ready to work');
    }

    colorThemeManager = getStoredColorThemeManager();

    if (colorThemeManager === COLOR_THEME_MANAGERS.SYSTEM) {
      colorTheme = getSystemColorTheme();
    } else {
      colorTheme = getStoredColorTheme();
    }
    applyThemeState(colorTheme, colorThemeManager);
    colorThemeManagerState = COLOR_THEME_MANAGER_STATES.READY;
    console.log('The color theme manager has successfully been initialized!');
  }

  return {
    setup,
    init
  }
}
