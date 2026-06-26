import type { CreateColorThemeManagerType } from "@scripts/client/colorThemeManagement.ts";
import type { CreateContactFormManagerType } from "@scripts/client/contactFormManagement.ts";
import type { CreateNotificationManagerType } from "@scripts/client/notificationManagement.ts";

import { createColorThemeManager } from "@scripts/client/colorThemeManagement.ts";
import { createContactFormManager } from "@scripts/client/contactFormManagement.ts";
import { createNotificationManager } from "@scripts/client/notificationManagement.ts";
import { defineIconElement } from "@components/wc/Icon.ts";

function setup(): void {
  defineIconElement();

  const ctm : CreateColorThemeManagerType = createColorThemeManager();
  const nm : CreateNotificationManagerType = createNotificationManager();
  const cfm : CreateContactFormManagerType = createContactFormManager({ disabledElementIDsOnProcessing: ['rl-site-link', 'rl-settings-bar-language-selector'], notificationManager: nm });

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
