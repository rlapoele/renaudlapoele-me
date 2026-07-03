import { createColorThemeManager } from "@scripts/client/colorThemeManagement.ts";
import { createContactFormManager } from "@scripts/client/contactFormManagement.ts";
import { createNotificationManager } from "@scripts/client/notificationManagement.ts";
import {createNavigationManager} from "@scripts/client/navigationManagement.ts";
import { defineIconElement } from "@components/wc/Icon.ts";

function setup(): void {
  defineIconElement();

  const ctm = createColorThemeManager();
  const nm = createNotificationManager();
  const cfm = createContactFormManager({ disabledElementIDsOnProcessing: ['rl-site-link', 'rl-settings-bar-language-selector'], notificationManager: nm });
  const navm = createNavigationManager();

  ctm.setup();
  ctm.init();

  nm.setup();
  nm.init();

  cfm.setup();
  cfm.init();

  navm.setup();
  navm.init();
}

export function setupInteractions(): void {
  document.addEventListener('DOMContentLoaded', (): void => {
    setup();
  });
}
