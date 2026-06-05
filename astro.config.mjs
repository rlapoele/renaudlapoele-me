// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

/** @type {{ context: 'server', access: 'public' }} */
const serverPublicEnv = {
  context: 'server',
  access: 'public',
};

/** @type {{ context: 'server', access: 'secret' }} */
const serverSecretEnv = {
  context: 'server',
  access: 'secret',
};

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    host: true,
  },
  security: {
    // Railway terminates HTTPS before the Node server, which makes Astro's
    // automatic Origin check see same-origin form POSTs as cross-site.
    checkOrigin: false,
  },
  env: {
    schema: {
      RESEND_API_KEY:
        envField.string(
          serverSecretEnv
        ),
      RESEND_FROM_EMAIL:
        envField.string(
          serverSecretEnv
        ),
      RESEND_TO_EMAIL:
        envField.string(
          serverSecretEnv
        ),
      CONTACT_FORM_SECRET:
        envField.string(
          serverSecretEnv
        ),
      SITE_URL:
        envField.string(
          serverPublicEnv
        ),
      LOG_LEVEL:
        envField.enum({
          ...serverPublicEnv,
          values: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
          default: 'info',
        }),
      LOG_PRETTY:
        envField.boolean({
          ...serverPublicEnv,
          default: false,
        }),
    }
  }
});
