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
    allowedDomains: [
      {
        protocol: 'https',
        hostname: 'renaudlapoele-me-production.up.railway.app',
      },
    ],
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
