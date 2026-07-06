import { SITE_URL } from "astro:env/server";
import { SUPPORTED_LOCALES } from "@content/i18n/locale";
import { buildAbsoluteUrl, normalizeSiteUrl } from "@scripts/server/configUtils.ts";

const DEFAULT_SITE_URL = "https://renaudlapoele.me";

const xmlEscape = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export function GET(): Response {
  const siteUrl = normalizeSiteUrl(SITE_URL) || DEFAULT_SITE_URL;
  const localizedUrls = {
    [SUPPORTED_LOCALES.EN]: buildAbsoluteUrl(siteUrl, "/"),
    [SUPPORTED_LOCALES.FR]: buildAbsoluteUrl(siteUrl, "/fr"),
    "x-default": buildAbsoluteUrl(siteUrl, "/"),
  };
  const pages = [
    {
      loc: localizedUrls[SUPPORTED_LOCALES.EN],
      priority: "1.0",
    },
    {
      loc: localizedUrls[SUPPORTED_LOCALES.FR],
      priority: "0.9",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((page) => `  <url>
    <loc>${xmlEscape(page.loc)}</loc>
    <xhtml:link rel="alternate" hreflang="${SUPPORTED_LOCALES.EN}" href="${xmlEscape(localizedUrls[SUPPORTED_LOCALES.EN])}" />
    <xhtml:link rel="alternate" hreflang="${SUPPORTED_LOCALES.FR}" href="${xmlEscape(localizedUrls[SUPPORTED_LOCALES.FR])}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(localizedUrls["x-default"])}" />
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
