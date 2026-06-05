export function normalizeConfigValue(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function normalizeSiteUrl(value: string | undefined): string {
  const siteUrl = normalizeConfigValue(value);

  if (!siteUrl) {
    return "";
  }

  try {
    const url = new URL(siteUrl);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.origin;
    }
  }
  catch {
    // Fall through to the shared SITE_URL-specific error below.
  }

  throw new Error("SITE_URL must be an absolute HTTP(S) URL.");
}
