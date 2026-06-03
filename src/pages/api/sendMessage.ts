import type { APIRoute } from "astro";
import { Resend } from 'resend';
import { escapeHtml, normalizeInput, getStringFormValue } from "@scripts/htmlUtils.ts";
import { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from "astro:env/server";
import {
  type ServerContactFormValidationInputType,
  serverValidateContactForm
} from "@scripts/contactFormManagement.ts";
import {validateContactFormToken} from "@scripts/contactFormToken.ts";

export const prerender = false;

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const FORM_FIELDS = ["token","locale", "name", "email", "subject", "message"] as const;
const hits = new Map<string, { count: number; resetAt: number }>();


function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}

function successResponse(): Response {
  return jsonResponse({
    isValid: true,
    message: "Success!"
  }, 200);
}

function buildContactEmailHtml({ name, email, message }: ServerContactFormValidationInputType): string {
  return [
    "<h1>Message from renaudlapoele.me</h1>",
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Message:</strong></p>`,
    `<p>${escapeHtml(message).replace(/\r?\n/g, "<br>")}</p>`,
  ].join("");
}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export const POST: APIRoute = async ({ request }) => {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return jsonResponse({ isValid: false, message: "Rate limit exceeded" }, 429);
  }

  let postedData: FormData;
  try {
    postedData = await request.formData();
  }
  catch {
    return jsonResponse({ isValid: false, message: "Invalid form data" }, 400);
  }

  const contactFormData = FORM_FIELDS.reduce((formData, fieldName) => {
    formData[fieldName] = getStringFormValue(postedData, fieldName) ?? "";
    return formData;
  }, {} as ServerContactFormValidationInputType);

  contactFormData.email = contactFormData.email.toLowerCase();

  if (contactFormData.subject.length > 0) {
    return successResponse();
  }
  const tokenResult = validateContactFormToken(contactFormData.token);
  if (!tokenResult.valid) {
    return jsonResponse({ isValid: false, message: "Invalid form data" }, 400);
  }

  const formValidationResult = serverValidateContactForm(contactFormData);

  if (!formValidationResult.isValid) {
    return jsonResponse({
      isValid: formValidationResult.isValid,
      message: formValidationResult.validationMessage,
    }, 400);
  }

  const resendApiKey = normalizeInput(RESEND_API_KEY ?? "");
  const sendToEmail = normalizeInput(RESEND_TO_EMAIL ?? "");
  const sendFromEmail = normalizeInput(RESEND_FROM_EMAIL ?? "");

  if (!resendApiKey || !sendToEmail || !sendFromEmail) {
    return jsonResponse({ isValid: false, message: "Email service is not configured" }, 500);
  }

  //const resend = new Resend(resendApiKey);

  try {

    /*
    const { error } = await resend.emails.send({
      from: sendFromEmail,
      to: sendToEmail,
      replyTo: contactFormData.email,
      subject: "Message from via renaudlapoele.me",
      html: buildContactEmailHtml(contactFormData),
      text: [
        "Message from renaudlapoele.me",
        "",
        `Name: ${contactFormData.name}`,
        `Email: ${contactFormData.email}`,
        "",
        contactFormData.message,
      ].join("\n"),
    });

    if (error) {
      return jsonResponse({ isValid: false, message: "Error sending email" }, 500);
    }
*/
    console.log({
      from: sendFromEmail,
      to: sendToEmail,
      replyTo: contactFormData.email,
      subject: "Message from via renaudlapoele.me",
      html: buildContactEmailHtml(contactFormData),
      text: [
        "Message from renaudlapoele.me",
        "",
        `Name: ${contactFormData.name}`,
        `Email: ${contactFormData.email}`,
        "",
        contactFormData.message,
      ].join("\n"),
    });
    return successResponse();
  }
  catch {
    return jsonResponse({ isValid: false, message: "Error sending email" }, 500);
  }
};
