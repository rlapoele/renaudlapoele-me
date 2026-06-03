import type { APIRoute } from "astro";

import { createContactFormToken } from "@scripts/contactFormToken.ts";
import { logger } from "@scripts/logger.ts";

export const prerender = false;

export const GET: APIRoute = async () => {
  const token = createContactFormToken();

  logger.info(
    { contactFormToken: token },
    "Generated contact form token",
  );

  return new Response(
    JSON.stringify({ token }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );

};
