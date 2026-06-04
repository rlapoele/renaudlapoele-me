import {
  type CreateColorThemeManagerType,
  createColorThemeManager
} from "@scripts/colorThemeManagement.ts";
import {type CreateContactFormManagerType, createContactFormManager} from "@scripts/contactFormManagement.ts";
import {createNotificationManager, type CreateNotificationManagerType} from "@scripts/notificationManagement.ts";
import { defineIconElement } from "@components/wc/Icon.ts";

function setup(): void {
  defineIconElement();

  const ctm : CreateColorThemeManagerType = createColorThemeManager();
  const nm : CreateNotificationManagerType = createNotificationManager();
  const cfm : CreateContactFormManagerType = createContactFormManager({ disabledElementIDsOnProcessing: ['rl-site-link', 'rl-language-selector'], notificationManager: nm });

  ctm.setup();
  ctm.init();

  nm.setup();
  nm.init();

  cfm.setup();
  cfm.init();
}

export function setupInteractions(): void {
  document.addEventListener('DOMContentLoaded', (): void => {
    setup();
  });
}
