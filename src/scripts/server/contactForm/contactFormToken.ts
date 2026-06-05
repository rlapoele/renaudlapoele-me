import { createHmac, timingSafeEqual } from "node:crypto";
import { CONTACT_FORM_SECRET } from "astro:env/server";

const MIN_ELAPSED_MS = 10_000;
const MAX_ELAPSED_MS = 60 * 60 * 1000; /* 1 hour */

function getSecret(): string {
  if (!CONTACT_FORM_SECRET) {
    throw new Error("CONTACT_FORM_SECRET is not configured");
  }
  return CONTACT_FORM_SECRET;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function isValidSignature(signature: string, expectedSignature: string): boolean {
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedSignatureBuffer);
}

export function createContactFormToken(): string {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export function validateContactFormToken(token: string) {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) {
    return { valid: false, reason: "invalid-token" };
  }

  const [issuedAt, signature] = tokenParts;
  const issuedAtTime = Number(issuedAt);
  if (!issuedAt || !signature || !Number.isFinite(issuedAtTime)) {
    return { valid: false, reason: "invalid-token" };
  }

  if (!isValidSignature(signature, sign(issuedAt))) {
    return { valid: false, reason: "invalid-signature" };
  }

  const elapsed = Date.now() - issuedAtTime;

  if (elapsed < MIN_ELAPSED_MS) {
    return { valid: false, reason: "too-fast" };
  }

  if (elapsed > MAX_ELAPSED_MS) {
    return { valid: false, reason: "expired" };
  }
  return { valid: true, elapsed };
}
