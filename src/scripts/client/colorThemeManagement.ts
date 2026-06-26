export const DOM_ELEMENT_IDS = {
  SETTINGS_BAR_COLOR_THEME_SELECTOR_LIGHT: 'rl-settings-bar-color-theme-selector-light',
  SETTINGS_BAR_COLOR_THEME_SELECTOR_DARK: 'rl-settings-bar-color-theme-selector-dark',
  SETTINGS_BAR_COLOR_THEME_MANAGER_SELECTOR_SYSTEM: 'rl-settings-bar-color-theme-manager-selector-system',
  SETTINGS_MENU_COLOR_THEME_SELECTOR_LIGHT: 'rl-settings-menu-color-theme-selector-light',
  SETTINGS_MENU_COLOR_THEME_SELECTOR_DARK: 'rl-settings-menu-color-theme-selector-dark',
  SETTINGS_MENU_COLOR_THEME_MANAGER_SELECTOR_SYSTEM: 'rl-settings-menu-color-theme-manager-selector-system',
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

  const DATA_ATTRIBUTES = {
    DEFAULT_LABEL: 'defaultLabel',
    ACTIVE_LABEL: 'activeLabel',
  } as const;

  const MEDIA_QUERY_DARK_COLOR_THEME = '(prefers-color-scheme: dark)' as const;

  const COLOR_THEME_MANAGER_STATES = {
    CREATED: 'created',
    SETUP: 'setup',
    READY: 'ready',
  };

  type ColorThemeType = typeof COLOR_THEMES.LIGHT | typeof COLOR_THEMES.DARK;
  type ColorThemeManagerType = typeof COLOR_THEME_MANAGERS.SYSTEM | typeof COLOR_THEME_MANAGERS.USER;
  type ColorThemeManagerStateType = typeof COLOR_THEME_MANAGER_STATES.CREATED | typeof COLOR_THEME_MANAGER_STATES.SETUP | typeof COLOR_THEME_MANAGER_STATES.READY;

  let colorThemeManagerState: ColorThemeManagerStateType = COLOR_THEME_MANAGER_STATES.CREATED;
  let colorTheme: ColorThemeType = COLOR_THEMES.DEFAULT;
  let colorThemeManager: ColorThemeManagerType = COLOR_THEME_MANAGERS.DEFAULT;

  let sbUserLightColorThemeSelector: HTMLButtonElement | null = null;
  let sbUserDarkColorThemeSelector: HTMLButtonElement | null = null;
  let sbSystemColorThemeManagerSelector: HTMLButtonElement | null = null;

  let smUserLightColorThemeSelector: HTMLButtonElement | null = null;
  let smUserDarkColorThemeSelector: HTMLButtonElement | null = null;
  let smSystemColorThemeManagerSelector: HTMLButtonElement | null = null;


  function clickEventHandler(callbackFn: () => void): (event: MouseEvent) => void {
    return (event) => {
      event.preventDefault();
      if (event.currentTarget instanceof HTMLButtonElement && event.currentTarget.getAttribute('aria-disabled') === 'true') {
        return;
      }
      callbackFn();
    }
  }

  function getSystemColorTheme(): ColorThemeType {
    return window.matchMedia(MEDIA_QUERY_DARK_COLOR_THEME).matches
      ? COLOR_THEMES.DARK
      : COLOR_THEMES.LIGHT;
  }

  function getStoredValue(key: string, defaultValue = ''): string {
    try {
      return window.localStorage.getItem(key) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function setStoredValue(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Storage can be blocked in privacy-restricted contexts; keep in-memory state working.
    }
  }

  function getButtonElement(elementId: string): HTMLButtonElement {
    const element = document.getElementById(elementId);
    if (element instanceof HTMLButtonElement) {
      return element;
    }
    throw new Error(`ColorThemeManager.setup(): "${elementId}" button DOM element is missing.`);
  }

  function getSetupButtonElement(element: HTMLButtonElement | null, elementId: string): HTMLButtonElement {
    if (element) {
      return element;
    }
    throw new Error(`ColorThemeManager.applyThemeState(): "${elementId}" button DOM element has not been setup.`);
  }

  function setupButtonLabel(buttonElement: HTMLButtonElement): void {
    buttonElement.dataset[DATA_ATTRIBUTES.DEFAULT_LABEL] = buttonElement.getAttribute('aria-label') || buttonElement.title;
  }

  function setButtonPressed(buttonElement: HTMLButtonElement, isPressed: boolean): void {
    const defaultLabel = buttonElement.dataset[DATA_ATTRIBUTES.DEFAULT_LABEL] || buttonElement.getAttribute('aria-label') || buttonElement.title;
    const activeLabel = buttonElement.dataset[DATA_ATTRIBUTES.ACTIVE_LABEL] || defaultLabel;
    const label = isPressed ? activeLabel : defaultLabel;

    buttonElement.setAttribute('aria-pressed', String(isPressed));
    buttonElement.title = label;
    buttonElement.setAttribute('aria-label', label);
  }

  function setButtonActionAvailable(buttonElement: HTMLButtonElement, isAvailable: boolean): void {
    if (isAvailable) {
      buttonElement.removeAttribute('aria-disabled');
    } else {
      buttonElement.setAttribute('aria-disabled', 'true');
    }
  }

  function addSystemColorThemeChangeListener(): void {
    const mediaQueryList = window.matchMedia(MEDIA_QUERY_DARK_COLOR_THEME);
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', updateSystemColorTheme);
      return;
    }
    const legacyAddListener = (mediaQueryList as unknown as Record<string, unknown>).addListener;
    if (typeof legacyAddListener === 'function') {
      legacyAddListener.call(mediaQueryList, updateSystemColorTheme);
    }
  }

  function getStoredColorThemeManager(): ColorThemeManagerType {
    const storedColorThemeManager = getStoredValue(STORAGE_KEYS.COLOR_THEME_MANAGER);
    if (
      storedColorThemeManager === COLOR_THEME_MANAGERS.SYSTEM
      || storedColorThemeManager === COLOR_THEME_MANAGERS.USER
    ) {
      return storedColorThemeManager;
    }
    return COLOR_THEME_MANAGERS.DEFAULT;
  }

  function getStoredColorTheme(): ColorThemeType {
    const storedColorTheme: string = getStoredValue(STORAGE_KEYS.COLOR_THEME);
    return (Object.values(COLOR_THEMES).includes(storedColorTheme as ColorThemeType)) ? storedColorTheme as ColorThemeType : COLOR_THEMES.DEFAULT;
  }

  function applyThemeState(
    newColorTheme: ColorThemeType,
    newColorThemeManager: ColorThemeManagerType
  ): void {
    const sbSystemSelector = getSetupButtonElement(sbSystemColorThemeManagerSelector, DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_MANAGER_SELECTOR_SYSTEM);
    const sbLightSelector = getSetupButtonElement(sbUserLightColorThemeSelector, DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_SELECTOR_LIGHT);
    const sbDarkSelector = getSetupButtonElement(sbUserDarkColorThemeSelector, DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_SELECTOR_DARK);
    const smSystemSelector = getSetupButtonElement(smSystemColorThemeManagerSelector, DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_MANAGER_SELECTOR_SYSTEM);
    const smLightSelector = getSetupButtonElement(smUserLightColorThemeSelector, DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_SELECTOR_LIGHT);
    const smDarkSelector = getSetupButtonElement(smUserDarkColorThemeSelector, DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_SELECTOR_DARK);


    setStoredValue(STORAGE_KEYS.COLOR_THEME, newColorTheme);
    setStoredValue(STORAGE_KEYS.COLOR_THEME_MANAGER, newColorThemeManager);
    document.documentElement.classList.remove(COLOR_THEMES.DARK, COLOR_THEMES.LIGHT);
    document.documentElement.classList.add(newColorTheme);

    setButtonPressed(sbSystemSelector, newColorThemeManager === COLOR_THEME_MANAGERS.SYSTEM);
    setButtonPressed(sbLightSelector, newColorTheme === COLOR_THEMES.LIGHT);
    setButtonPressed(sbDarkSelector, newColorTheme === COLOR_THEMES.DARK);
    setButtonActionAvailable(sbSystemSelector, newColorThemeManager !== COLOR_THEME_MANAGERS.SYSTEM);
    setButtonActionAvailable(sbLightSelector, newColorTheme !== COLOR_THEMES.LIGHT);
    setButtonActionAvailable(sbDarkSelector, newColorTheme !== COLOR_THEMES.DARK);

    setButtonPressed(smSystemSelector, newColorThemeManager === COLOR_THEME_MANAGERS.SYSTEM);
    setButtonPressed(smLightSelector, newColorTheme === COLOR_THEMES.LIGHT);
    setButtonPressed(smDarkSelector, newColorTheme === COLOR_THEMES.DARK);
    setButtonActionAvailable(smSystemSelector, newColorThemeManager !== COLOR_THEME_MANAGERS.SYSTEM);
    setButtonActionAvailable(smLightSelector, newColorTheme !== COLOR_THEMES.LIGHT);
    setButtonActionAvailable(smDarkSelector, newColorTheme !== COLOR_THEMES.DARK);
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
    sbUserLightColorThemeSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_SELECTOR_LIGHT);
    sbUserDarkColorThemeSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_SELECTOR_DARK);
    sbSystemColorThemeManagerSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_BAR_COLOR_THEME_MANAGER_SELECTOR_SYSTEM);
    setupButtonLabel(sbUserLightColorThemeSelector);
    setupButtonLabel(sbUserDarkColorThemeSelector);
    setupButtonLabel(sbSystemColorThemeManagerSelector);
    sbUserLightColorThemeSelector.addEventListener('click', clickEventHandler(setUserLightColorTheme));
    sbUserDarkColorThemeSelector.addEventListener('click', clickEventHandler(setUserDarkColorTheme));
    sbSystemColorThemeManagerSelector.addEventListener('click', clickEventHandler(setSystemColorThemeManager));

    smUserLightColorThemeSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_SELECTOR_LIGHT);
    smUserDarkColorThemeSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_SELECTOR_DARK);
    smSystemColorThemeManagerSelector = getButtonElement(DOM_ELEMENT_IDS.SETTINGS_MENU_COLOR_THEME_MANAGER_SELECTOR_SYSTEM);
    setupButtonLabel(smUserLightColorThemeSelector);
    setupButtonLabel(smUserDarkColorThemeSelector);
    setupButtonLabel(smSystemColorThemeManagerSelector);
    smUserLightColorThemeSelector.addEventListener('click', clickEventHandler(setUserLightColorTheme));
    smUserDarkColorThemeSelector.addEventListener('click', clickEventHandler(setUserDarkColorTheme));
    smSystemColorThemeManagerSelector.addEventListener('click', clickEventHandler(setSystemColorThemeManager));

    addSystemColorThemeChangeListener();
    colorThemeManagerState = COLOR_THEME_MANAGER_STATES.SETUP;
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
  }

  return {
    setup,
    init
  }
}
