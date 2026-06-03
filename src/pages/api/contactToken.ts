import type { APIRoute } from "astro";

import { createContactFormToken } from "@scripts/contactFormToken.ts";
export const prerender = false;

export const GET: APIRoute = async () => {

  return new Response(
    JSON.stringify({ token: createContactFormToken() }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );

};
