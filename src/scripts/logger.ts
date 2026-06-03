import pino from "pino";
import { LOG_LEVEL, LOG_PRETTY } from "astro:env/server";

const transport =
  LOG_PRETTY
    ? {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
      },
    }
    : undefined;

export const logger = pino({
  level: LOG_LEVEL,
  redact: {
    paths: [
      "email",
      "name",
      "message",
      "formToken",
      "contactFormToken",
      "authorization",
      "cookie",
      "resendApiKey",
      "RESEND_API_KEY",
      "*.email",
      "*.name",
      "*.message",
      "*.formToken",
      "*.contactFormToken",
    ],
    censor: "[REDACTED]",
  },
  transport,
});
