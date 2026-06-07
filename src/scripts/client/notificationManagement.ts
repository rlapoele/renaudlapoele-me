export const DOM_ELEM_IDS = {
  TOAST_CONTAINER: 'rl-toast-container',
  TOAST_LIVE_REGION_POLITE: 'rl-toast-live-region-polite',
  TOAST_LIVE_REGION_ASSERTIVE: 'rl-toast-live-region-assertive',
} as const;


export type CreateNotificationManagerType = {
  setup: () => void;
  init: () => void;
  notifySuccess: (message: string) => string;
  notifyError: (message: string) => string;
  notifyInfo: (message: string) => string;
  notifyWarning: (message: string) => string;
  dismissNotification: (notificationDOMElementId: string) => void;
}

const TOAST_PRE_FADE_DELAY = 10;
const TOAST_FADE_DURATION = 500;
const TOAST_DISPLAY_DURATION = 3000;


export type CreateNotificationManagerOptionsType = {
  toastContainerId?: string;
  politeLiveRegionId?: string;
  assertiveLiveRegionId?: string;
  fadeDuration?: number;
  toastDisplayDuration?: number;
}

const defaultOptions: Required<CreateNotificationManagerOptionsType> = {
  toastContainerId: DOM_ELEM_IDS.TOAST_CONTAINER,
  politeLiveRegionId: DOM_ELEM_IDS.TOAST_LIVE_REGION_POLITE,
  assertiveLiveRegionId: DOM_ELEM_IDS.TOAST_LIVE_REGION_ASSERTIVE,
  fadeDuration: TOAST_FADE_DURATION,
  toastDisplayDuration: TOAST_DISPLAY_DURATION,
}

export function createNotificationManager(
  options: CreateNotificationManagerOptionsType = {}
): CreateNotificationManagerType {
  const NOTIFICATION_MANAGER_STATE_CREATED = 'created';
  const NOTIFICATION_MANAGER_STATE_SETUP = 'setup';
  const NOTIFICATION_MANAGER_STATE_READY = 'ready';

  type NotificationManagerStateType =
    typeof NOTIFICATION_MANAGER_STATE_CREATED |
    typeof NOTIFICATION_MANAGER_STATE_SETUP |
    typeof NOTIFICATION_MANAGER_STATE_READY;

  const NOTIFICATION_TYPE_SUCCESS = 'success';
  const NOTIFICATION_TYPE_ERROR = 'error';
  const NOTIFICATION_TYPE_INFO = 'info';
  const NOTIFICATION_TYPE_WARNING = 'warning';
  const NOTIFICATION_TYPE_DEFAULT = NOTIFICATION_TYPE_INFO;

  type NotificationType =
    typeof NOTIFICATION_TYPE_INFO |
    typeof NOTIFICATION_TYPE_SUCCESS |
    typeof NOTIFICATION_TYPE_WARNING |
    typeof NOTIFICATION_TYPE_ERROR;

  const NOTIFICATION_ICON_TYPES: Record<NotificationType, string> = {
    [NOTIFICATION_TYPE_INFO]: 'adjustments-vertical',
    [NOTIFICATION_TYPE_SUCCESS]: 'check-circle',
    [NOTIFICATION_TYPE_WARNING]: 'exclamation-triangle',
    [NOTIFICATION_TYPE_ERROR]: 'exclamation-triangle',
  };

  const resolvedOptions: Required<CreateNotificationManagerOptionsType> = {
    ...defaultOptions,
    ...options,
  };

  let toastIndex = 0;

  function getLiveRegionElement(notificationType: NotificationType): HTMLElement | null {
    if (notificationType === NOTIFICATION_TYPE_ERROR || notificationType === NOTIFICATION_TYPE_WARNING) {
      return assertiveLiveRegion;
    }

    return politeLiveRegion;
  }

  function announceToast(message: string, notificationType: NotificationType): void {
    const liveRegion = getLiveRegionElement(notificationType);

    if (!liveRegion) {
      return;
    }

    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    });
  }

  function safelyRemoveToast(toastElement: HTMLElement): void {
    toastElement.remove();
  }

  function createToast(
    toastContainerElement: HTMLElement,
    message: string,
    notificationType: NotificationType = NOTIFICATION_TYPE_DEFAULT,
    preFadeDelay = TOAST_PRE_FADE_DELAY,
    fadeDuration = TOAST_FADE_DURATION,
    toastDisplayDuration = TOAST_DISPLAY_DURATION,
  ): string {
    if(notificationManagerState !== NOTIFICATION_MANAGER_STATE_READY ) {
      console.warn('NotificationManager.createToast(): the notification manager must be setup and initialized before creating notifications.');
      return '';
    }
    const toastElement = document.createElement('div');
    toastElement.id = `c-toast-${Date.now()}-${toastIndex++}`;
    toastElement.classList.add('c-toast', `c-toast--${notificationType}`);
    toastElement.dataset.type = notificationType;
    toastElement.setAttribute('aria-live', 'off');

    const iconElement = document.createElement('rl-icon');
    iconElement.classList.add('c-toast__icon', 'size-5', 'shrink-0');
    iconElement.setAttribute('type', NOTIFICATION_ICON_TYPES[notificationType]);
    iconElement.setAttribute('is-decorative', 'true');

    const messageElement = document.createElement('span');
    messageElement.classList.add('c-toast__message');
    messageElement.textContent = message;

    toastElement.append(iconElement, messageElement);
    toastContainerElement.prepend(toastElement);
    announceToast(message, notificationType);
    setTimeout(() => toastElement.classList.add('c-toast--active'), preFadeDelay);
    setTimeout(() => toastElement.classList.remove('c-toast--active'), toastDisplayDuration);
    setTimeout(() => safelyRemoveToast(toastElement), toastDisplayDuration + fadeDuration);
    return toastElement.id;
  }

  function deleteToast(
    toastDOMElementId: string,
    fadeDuration = TOAST_FADE_DURATION
  ) {
    const toastDOMElement = document.getElementById(toastDOMElementId);
    if(toastDOMElement) {
      setTimeout(() => toastDOMElement.classList.remove('c-toast--active'));
      setTimeout(() => safelyRemoveToast(toastDOMElement), fadeDuration);
    }
    else {
      console.warn(`NotificationManager.deleteToast(): toast with id ${toastDOMElementId} not found in container`);
    }
  }

  function notify(message: string, notificationType: NotificationType = NOTIFICATION_TYPE_DEFAULT): string {
    return createToast(
      toastContainer as HTMLElement,
      message,
      notificationType,
      TOAST_PRE_FADE_DELAY,
      resolvedOptions.fadeDuration,
      resolvedOptions.toastDisplayDuration
    );
  }

  let notificationManagerState: NotificationManagerStateType = NOTIFICATION_MANAGER_STATE_CREATED;
  let toastContainer : HTMLElement | null = null;
  let politeLiveRegion : HTMLElement | null = null;
  let assertiveLiveRegion : HTMLElement | null = null;

  return {
    setup: () => {
      if (notificationManagerState === NOTIFICATION_MANAGER_STATE_SETUP) {
        throw new Error('NotificationManager.setup(): the notification manager has already been setup');
      }
      if (notificationManagerState === NOTIFICATION_MANAGER_STATE_READY) {
        throw new Error('NotificationManager.setup(): the notification manager has already been setup and initialized. It is ready to work');
      }
      toastContainer = document.getElementById(resolvedOptions.toastContainerId);
      if (!toastContainer) {
        throw new Error(`NotificationManager.setup(): Toast container DOM element id ("${resolvedOptions.toastContainerId}") is missing.`);
      }
      politeLiveRegion = document.getElementById(resolvedOptions.politeLiveRegionId);
      if (!politeLiveRegion) {
        throw new Error(`NotificationManager.setup(): Polite live region DOM element id ("${resolvedOptions.politeLiveRegionId}") is missing.`);
      }
      assertiveLiveRegion = document.getElementById(resolvedOptions.assertiveLiveRegionId);
      if (!assertiveLiveRegion) {
        throw new Error(`NotificationManager.setup(): Assertive live region DOM element id ("${resolvedOptions.assertiveLiveRegionId}") is missing.`);
      }
      notificationManagerState = NOTIFICATION_MANAGER_STATE_SETUP;
    },


    init: () => {
      if (notificationManagerState === NOTIFICATION_MANAGER_STATE_CREATED) {
        throw new Error('NotificationManager.init(): the notification manager must be setup before initialization');
      }
      if (notificationManagerState === NOTIFICATION_MANAGER_STATE_READY) {
        throw new Error('NotificationManager.init(): the notification manager has already been setup and initialized. It is ready to work');
      }

      notificationManagerState = NOTIFICATION_MANAGER_STATE_READY;
    },

    notifySuccess: (message: string): string => { return notify(message, NOTIFICATION_TYPE_SUCCESS); },
    notifyError: (message: string): string => { return notify(message, NOTIFICATION_TYPE_ERROR); },
    notifyInfo: (message: string): string => { return notify(message, NOTIFICATION_TYPE_INFO); },
    notifyWarning: (message: string): string => { return notify(message, NOTIFICATION_TYPE_WARNING); },
    dismissNotification: (notificationDOMElementId: string) => {
      deleteToast(notificationDOMElementId, resolvedOptions.fadeDuration);
    }
  }

}
