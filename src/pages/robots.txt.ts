import { SITE_URL } from "astro:env/server";
import { buildAbsoluteUrl, normalizeSiteUrl } from "@scripts/server/configUtils.ts";

const DEFAULT_SITE_URL = "https://renaudlapoele.me";

export function GET(): Response {
  const siteUrl = normalizeSiteUrl(SITE_URL) || DEFAULT_SITE_URL;
  const sitemapUrl = buildAbsoluteUrl(siteUrl, "/sitemap.xml");

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${sitemapUrl}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
