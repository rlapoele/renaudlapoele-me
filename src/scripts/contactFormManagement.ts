import { extractErrorMessages } from "@scripts/extractErrorMessages.ts";
import { disableElements, enableElements } from "@scripts/enableDisableElement.ts";
import type {CreateNotificationManagerType} from "@scripts/notificationManagement.ts";
import { DOM_ELEMENT_IDS } from "@scripts/contactFormConfig.ts";
import {
  CONTACT_FORM_INPUT_MIN_MAX_LENGTHS,
  MAX_KEYWORD,
  MIN_KEYWORD,
  type ValidationResultType,
  type ValidationType,
  validateFieldInputValue,
} from "@scripts/contactFormValidation.ts";

export { DOM_ELEMENT_IDS } from "@scripts/contactFormConfig.ts";
export { CONTACT_FORM_INPUT_MIN_MAX_LENGTHS } from "@scripts/contactFormValidation.ts";

export type CreateContactFormManagerType = {
  setup: () => void;
  init: () => void;
}

type ContactFormSubmitResponseType = {
  isValid: boolean,
  message?: string
};
type ContactFormTokenResponseType = {
  token: string
};
type ContactFormNotificationMessagesType = {
  success: string;
  validation: string;
  sessionExpired: string;
  rateLimited: string;
  network: string;
  serviceUnavailable: string;
  unknown: string;
};
type ContactFormSubmitFailureReason =
  'validation' |
  'session-expired' |
  'rate-limited' |
  'network' |
  'service-unavailable' |
  'unknown';
type ContactFormSubmitResult =
  | { ok: true }
  | { ok: false; reason: ContactFormSubmitFailureReason; status?: number; diagnostic?: string };
type ContactFormValidationResult = {
  isValid: boolean;
  firstInvalidInput: HTMLInputElement | null;
};
type ContactFormTokenResult =
  | { ok: true }
  | { ok: false; reason: Extract<ContactFormSubmitFailureReason, 'session-expired' | 'network' | 'unknown'>; status?: number; diagnostic?: string };

const DEFAULT_CONTACT_FORM_NOTIFICATION_MESSAGES: ContactFormNotificationMessagesType = {
  success: 'Your message has been sent. I will get back to you soon.',
  validation: 'Some fields need attention. Please review the form and try again.',
  sessionExpired: 'This form session expired. Please try sending your message again.',
  rateLimited: 'Too many attempts in a short time. Please wait a few minutes before retrying.',
  network: 'I could not reach the server. Check your connection, then try again.',
  serviceUnavailable: 'The message service is temporarily unavailable. Please try again later.',
  unknown: 'Your message could not be sent. Please try again later.',
};

function isContactFormSubmitResponse(value: unknown): value is ContactFormSubmitResponseType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isValid' in value &&
    typeof value.isValid === 'boolean' &&
    (!('message' in value) || typeof value.message === 'string')
  );
}

function isContactFormTokenResponse(value: unknown): value is ContactFormTokenResponseType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'token' in value &&
    typeof value.token === 'string' &&
    value.token.length > 0
  );
}

async function readContactFormSubmitResponse(response: Response): Promise<ContactFormSubmitResponseType | null> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return null;
  }

  let responseData: unknown;
  try {
    responseData = await response.json();
  }
  catch {
    return null;
  }

  if(!isContactFormSubmitResponse(responseData)) {
    return null;
  }

  return responseData;
}

async function readContactFormTokenResponse(response: Response): Promise<ContactFormTokenResponseType | null> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return null;
  }

  let responseData: unknown;
  try {
    responseData = await response.json();
  }
  catch {
    return null;
  }

  if(!isContactFormTokenResponse(responseData)) {
    return null;
  }

  return responseData;
}

function logContactFormSubmitFailure(result: ContactFormSubmitResult): void {
  if (result.ok) {
    return;
  }

  console.error('Contact form submission failed:', {
    reason: result.reason,
    status: result.status,
    diagnostic: result.diagnostic,
  });
}

function resolveContactFormNotificationMessages(
  notificationMessages: Record<string, string>
): ContactFormNotificationMessagesType {
  return {
    ...DEFAULT_CONTACT_FORM_NOTIFICATION_MESSAGES,
    ...notificationMessages,
  };
}

type CreateContactFormManagerOptionsType = {
  disabledElementIDsOnProcessing: string[];
  notificationManager: CreateNotificationManagerType;
};

export function createContactFormManager(options: CreateContactFormManagerOptionsType): CreateContactFormManagerType {

  const CONTACT_FORM_MANAGER_STATES = {
    CREATED: 'created',
    SETUP: 'setup',
    READY: 'ready',
  };

  let disabledElementsOnProcessing: HTMLElement[] = [];

  let contactForm: HTMLFormElement | null = null;
  let contactFormFieldset: HTMLFieldSetElement | null = null;

  let contactFormInputLocale: HTMLInputElement | null = null;
  let contactFormErrorMessageLocale: HTMLElement | null = null;

  let contactFormInputName: HTMLInputElement | null = null;
  let contactFormErrorMessageName: HTMLElement | null = null;

  let contactFormInputEmail: HTMLInputElement | null = null;
  let contactFormErrorMessageEmail: HTMLElement | null = null;

  let contactFormInputSubject: HTMLInputElement | null = null;
  let contactFormErrorMessageSubject: HTMLElement | null = null;

  let contactFormInputMessage: HTMLInputElement | null = null;
  let contactFormErrorMessageMessage: HTMLElement | null = null;

  let contactFormButtonSubmit: HTMLButtonElement | null = null;

  let contactFormButtonSubmitTextLabel: HTMLElement | null = null;

  type ContactFormManagerStateType = typeof CONTACT_FORM_MANAGER_STATES.CREATED | typeof CONTACT_FORM_MANAGER_STATES.SETUP | typeof CONTACT_FORM_MANAGER_STATES.READY;

  let contactFormManagerState: ContactFormManagerStateType = CONTACT_FORM_MANAGER_STATES.CREATED;

  let contactFormInputToken: HTMLInputElement | null = null;
  let tokenPromise: Promise<ContactFormTokenResult> | null = null;

  function showFieldErrorMessage(input: HTMLInputElement, errorMessageElement: HTMLElement, errorMessage: string): void {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorMessageElement?.id);
    input.dataset.isValid = 'false';
    errorMessageElement.textContent = errorMessage;
  }
  function hideFieldErrorMessage(input: HTMLInputElement, errorMessageElement: HTMLElement): void {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    input.dataset.isValid = 'true';
    errorMessageElement.textContent = null;
  }
  function resetField(input: HTMLInputElement, errorMessageElement: HTMLElement): void {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    delete input.dataset.isValid;
    errorMessageElement.textContent = null;
    input.value = input.defaultValue;
  }
  function resetTokenField(input: HTMLInputElement): void {
    input.value = input.defaultValue;
    tokenPromise = null;
  }

  function inputBlurEventHandler(
    input: HTMLInputElement,
    errorMessageElement: HTMLElement,
    inputErrorMessages: Record<string, string>
  ): () => void {
    return () => {
      const validationResult: ValidationResultType =
        validateFieldInputValue(input.name, input.value, Object.keys(inputErrorMessages) as ValidationType[]);
      if(!validationResult.isValid) {
        showFieldErrorMessage(input, errorMessageElement, inputErrorMessages[validationResult.errorType] as string);
      }
      else {
        hideFieldErrorMessage(input, errorMessageElement);
      }
    }
  }

  function clientValidateFields(
    formInputs: HTMLInputElement[],
    errorMessageElements: Record<string, HTMLElement>,
    inputErrorMessages: Record<string, Record<string, string>>,
  ): ContactFormValidationResult {
    let isValid = true;
    let firstInvalidInput: HTMLInputElement | null = null;

    for (const formInput of formInputs) {
      const validationResult: ValidationResultType =
        validateFieldInputValue(formInput.name, formInput.value.trim(), Object.keys(inputErrorMessages[formInput.name]) as ValidationType[]);
      if(!validationResult.isValid) {
        showFieldErrorMessage(formInput, errorMessageElements[formInput.name], inputErrorMessages[formInput.name][validationResult.errorType] as string);
        isValid = false;
        if(!firstInvalidInput) {
          firstInvalidInput = formInput;
        }
      }
      else {
        hideFieldErrorMessage(formInput, errorMessageElements[formInput.name]);
      }
    }

    return { isValid, firstInvalidInput };
  }

  async function loadToken(tokenFormInput: HTMLInputElement): Promise<ContactFormTokenResult> {
    let response: Response;

    try {
      response = await fetch("/api/contactToken");
    }
    catch {
      return { ok: false, reason: 'network', diagnostic: 'Contact token API request failed.' };
    }

    if (!response.ok) {
      return {
        ok: false,
        reason: 'session-expired',
        status: response.status,
        diagnostic: `Contact token API returned HTTP ${response.status}.`
      };
    }

    const responseData = await readContactFormTokenResponse(response);

    if (!responseData) {
      return {
        ok: false,
        reason: 'unknown',
        status: response.status,
        diagnostic: 'Contact token API returned an unexpected response.'
      };
    }

    tokenFormInput.value = responseData.token;
    return { ok: true };
  }

  async function ensureContactToken(tokenFormInput: HTMLInputElement): Promise<ContactFormTokenResult> {
    if (tokenFormInput.value) {
      return { ok: true };
    }

    if (!tokenPromise) {
      tokenPromise = loadToken(tokenFormInput);
    }

    const tokenResult = await tokenPromise;

    if (!tokenResult.ok) {
      tokenPromise = null;
    }

    return tokenResult;
  }

  function preloadContactToken(tokenFormInput: HTMLInputElement): void {
    if (tokenFormInput.value || tokenPromise) {
      return;
    }

    tokenPromise = loadToken(tokenFormInput);
    void tokenPromise.then((tokenResult) => {
      if (!tokenResult.ok) {
        tokenPromise = null;
      }
    });
  }

  function setProcessing(
    isProcessing: boolean,
    submitButton: HTMLButtonElement,
    submitButtonTextLabelElement: HTMLElement,
    submitButtonLabels: Record<string, string>,
    disabledElementsOnProcessing: HTMLElement[],
  ): void {
    if (isProcessing) {
      disableElements(disabledElementsOnProcessing);
      submitButton.classList.add('c-button--processing');
      submitButtonTextLabelElement.textContent = submitButtonLabels.sending;
      return;
    }

    submitButton.classList.remove('c-button--processing');
    enableElements(disabledElementsOnProcessing);
  }

  async function submitContactForm(
    formInputs: HTMLInputElement[],
    tokenFormInput: HTMLInputElement,
  ): Promise<ContactFormSubmitResult> {
    const tokenResult = await ensureContactToken(tokenFormInput);

    if (!tokenResult.ok) {
      return tokenResult;
    }

    let formData = new FormData();
    formInputs.forEach((formInput) => formData.append(formInput.name, formInput.value.trim()));
    formData.append(tokenFormInput.name, tokenFormInput.value.trim());

    let response: Response;
    try {
      response = await fetch("/api/sendMessage", { method: "POST", body: formData });
    }
    catch {
      return { ok: false, reason: 'network', diagnostic: 'Contact form API request failed.' };
    }

    const responseData = await readContactFormSubmitResponse(response);

    if(!responseData) {
      return {
        ok: false,
        reason: response.status >= 500 ? 'service-unavailable' : 'unknown',
        status: response.status,
        diagnostic: 'Contact form API returned an invalid or unexpected response.',
      };
    }

    if(response.ok && responseData.isValid) {
      return { ok: true };
    }

    if(response.status === 429) {
      return { ok: false, reason: 'rate-limited', status: response.status, diagnostic: responseData.message };
    }

    if(response.status >= 500) {
      return { ok: false, reason: 'service-unavailable', status: response.status, diagnostic: responseData.message };
    }

    if(response.status === 400) {
      if (responseData.message === 'Invalid form data') {
        return { ok: false, reason: 'session-expired', status: response.status, diagnostic: responseData.message };
      }

      return { ok: false, reason: 'validation', status: response.status, diagnostic: responseData.message };
    }

    return { ok: false, reason: 'unknown', status: response.status, diagnostic: responseData.message };
  }

  function getContactFormFailureMessage(
    result: ContactFormSubmitResult,
    notificationMessages: ContactFormNotificationMessagesType,
  ): string {
    if (result.ok) {
      return '';
    }

    switch (result.reason) {
      case 'validation':
        return notificationMessages.validation;
      case 'session-expired':
        return notificationMessages.sessionExpired;
      case 'rate-limited':
        return notificationMessages.rateLimited;
      case 'network':
        return notificationMessages.network;
      case 'service-unavailable':
        return notificationMessages.serviceUnavailable;
      case 'unknown':
        return notificationMessages.unknown;
    }
  }

  function handleSubmitSuccess(
    formInputs: HTMLInputElement[],
    tokenFormInput: HTMLInputElement,
    errorMessageElements: Record<string, HTMLElement>,
    submitButtonTextLabelElement: HTMLElement,
    submitButtonLabels: Record<string, string>,
    notificationMessages: ContactFormNotificationMessagesType,
    notificationManager: CreateNotificationManagerType,
  ): void {
    submitButtonTextLabelElement.textContent = submitButtonLabels.done;
    notificationManager.notifySuccess(notificationMessages.success);
    window.setTimeout(() => {
      formInputs.forEach((formInput) => {
        resetField(formInput, errorMessageElements[formInput.name]);
      });
      resetTokenField(tokenFormInput);
      submitButtonTextLabelElement.textContent = submitButtonLabels.send;
    }, 3000);
  }

  function handleSubmitFailure(
    result: ContactFormSubmitResult,
    submitButtonTextLabelElement: HTMLElement,
    submitButtonLabels: Record<string, string>,
    notificationMessages: ContactFormNotificationMessagesType,
    notificationManager: CreateNotificationManagerType,
  ): void {
    logContactFormSubmitFailure(result);
    notificationManager.notifyError(getContactFormFailureMessage(result, notificationMessages));

    window.setTimeout(() => {
      submitButtonTextLabelElement.textContent = submitButtonLabels.send;
    }, 3000);
  }

  // Call the contact token endpoint to obtain a token with a server timestamp which
  // cannot be tampered with.
  // This will allow the server form validation to verify that a human is submitting the form;
  // a bot would submit the form very quickly whereas a human would take longer.
  // The token will allow the server to calculate the time taken by the "user" to fill & submit
  // the form from the time the contact form is in focus till the form is submitted.
  function formFocusInEventHandler(
    formTokenElement: HTMLInputElement,
  ): () => void {
    return () => {
      preloadContactToken(formTokenElement);
    }
  }

  function formSubmitEventHandler(
    formInputs: HTMLInputElement[],
    tokenFormInput: HTMLInputElement,
    submitButton: HTMLButtonElement,
    errorMessageElements: Record<string, HTMLElement>,
    inputErrorMessages: Record<string, Record<string, string>>,
    submitButtonTextLabelElement: HTMLElement,
    submitButtonLabels: Record<string, string>,
    notificationMessages: ContactFormNotificationMessagesType,
    disabledElementsOnProcessing: HTMLElement[] = [],
    notificationManager: CreateNotificationManagerType
  ): (event: SubmitEvent) => void {
    return async (event: SubmitEvent) => {
      event.preventDefault();

      const validationResult = clientValidateFields(formInputs, errorMessageElements, inputErrorMessages);

      if(!validationResult.isValid) {
        validationResult.firstInvalidInput?.focus();
        return;
      }

      setProcessing(true, submitButton, submitButtonTextLabelElement, submitButtonLabels, disabledElementsOnProcessing);

      const submitResult = await submitContactForm(formInputs, tokenFormInput);

      if(submitResult.ok) {
        handleSubmitSuccess(formInputs, tokenFormInput, errorMessageElements, submitButtonTextLabelElement, submitButtonLabels, notificationMessages, notificationManager);
      }
      else {
        handleSubmitFailure(submitResult, submitButtonTextLabelElement, submitButtonLabels, notificationMessages, notificationManager);
      }

      setProcessing(false, submitButton, submitButtonTextLabelElement, submitButtonLabels, disabledElementsOnProcessing);
    }
  }

  function setup(): void {
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.SETUP) {
      throw new Error('ContactFormManager.setup(): the contact form manager has already been setup');
    }
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.READY) {
      throw new Error('ContactFormManager.setup(): the contact form manager has already been setup and initialized. It is ready to work');
    }
    options.disabledElementIDsOnProcessing.forEach(
      (disabledElementID): void => {
        const element: HTMLElement | null = document.getElementById(disabledElementID);
        if (!!element) {
          disabledElementsOnProcessing.push(element as HTMLElement);
        }
      }
    );

    contactForm = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM) as HTMLFormElement;
    contactFormFieldset = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_FIELDSET) as HTMLFieldSetElement;

    contactFormInputToken = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_TOKEN) as HTMLInputElement;

    contactFormInputLocale = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_LOCALE) as HTMLInputElement;
    contactFormErrorMessageLocale = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_LOCALE) as HTMLElement;

    contactFormInputName = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_NAME) as HTMLInputElement;
    contactFormErrorMessageName = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_NAME) as HTMLElement;

    contactFormInputEmail = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_EMAIL) as HTMLInputElement;
    contactFormErrorMessageEmail = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_EMAIL) as HTMLElement;

    contactFormInputMessage = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_MESSAGE) as HTMLInputElement;
    contactFormErrorMessageMessage = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_MESSAGE) as HTMLElement;

    contactFormButtonSubmit = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_BUTTON_SUBMIT) as HTMLButtonElement;
    contactFormButtonSubmitTextLabel = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_SUBMIT_BUTTON_TEXT_LABEL) as HTMLElement;

    contactFormInputSubject = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_SUBJECT) as HTMLInputElement;
    contactFormErrorMessageSubject = document.getElementById(DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_SUBJECT) as HTMLElement;

    if (!contactForm) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM}" DOM element is missing.`);
    }
    if (!contactFormFieldset) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_FIELDSET}" DOM element is missing.`);
    }
    if (!contactFormInputToken) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_TOKEN}" DOM element is missing.`);
    }
    if (!contactFormInputLocale) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_LOCALE}" DOM element is missing.`);
    }
    if (!contactFormErrorMessageLocale) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_LOCALE}" DOM element is missing.`);
    }

    if (!contactFormInputName) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_NAME}" DOM element is missing.`);
    }
    if (!contactFormErrorMessageName) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_NAME}" DOM element is missing.`);
    }
    if (!contactFormInputEmail) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_EMAIL}" DOM element is missing.`);
    }
    if (!contactFormErrorMessageEmail) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_EMAIL}" DOM element is missing.`);
    }
    if (!contactFormInputMessage) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_MESSAGE}" DOM element is missing.`);
    }
    if (!contactFormErrorMessageMessage) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_MESSAGE}" DOM element is missing.`);
    }
    if (!contactFormButtonSubmit) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_BUTTON_SUBMIT}" DOM element is missing.`);
    }
    if (!contactFormInputSubject) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_INPUT_SUBJECT}" DOM element is missing.`);
    }
    if (!contactFormErrorMessageSubject) {
      throw new Error(`ContactFormManager.setup(): "${DOM_ELEMENT_IDS.CONTACT_FORM_ERROR_MESSAGE_SUBJECT}" DOM element is missing.`);
    }

    disabledElementsOnProcessing.push(contactFormFieldset as HTMLElement);
    disabledElementsOnProcessing.push(contactFormButtonSubmit as HTMLElement);

    const formInputs = [
      contactFormInputLocale,
      contactFormInputName,
      contactFormInputEmail,
      contactFormInputSubject,
      contactFormInputMessage,
    ];
    const errorMessageElements = {
      [contactFormInputLocale.name]: contactFormErrorMessageLocale,
      [contactFormInputName.name]: contactFormErrorMessageName,
      [contactFormInputEmail.name]: contactFormErrorMessageEmail,
      [contactFormInputSubject.name]: contactFormErrorMessageSubject,
      [contactFormInputMessage.name]: contactFormErrorMessageMessage,
    }
    const inputErrorMessages = {
      [contactFormInputLocale.name]: extractErrorMessages(contactFormInputLocale.dataset.errorMessages as string),
      [contactFormInputName.name]: extractErrorMessages(contactFormInputName.dataset.errorMessages as string),
      [contactFormInputEmail.name]: extractErrorMessages(contactFormInputEmail.dataset.errorMessages as string),
      [contactFormInputMessage.name]: extractErrorMessages(contactFormInputMessage.dataset.errorMessages as string),
      [contactFormInputSubject.name]: extractErrorMessages(contactFormInputSubject.dataset.errorMessages as string),
    };

    const submitButtonLabels = extractErrorMessages(contactFormButtonSubmit.dataset.textLabels as string);
    const notificationMessages = resolveContactFormNotificationMessages(
      extractErrorMessages(contactForm.dataset.notificationMessages as string)
    );

    inputErrorMessages[contactFormInputName.name].min = inputErrorMessages[contactFormInputName.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MIN.toString());
    inputErrorMessages[contactFormInputName.name].max = inputErrorMessages[contactFormInputName.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MAX.toString());
    inputErrorMessages[contactFormInputEmail.name].min = inputErrorMessages[contactFormInputEmail.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MIN.toString());
    inputErrorMessages[contactFormInputEmail.name].max = inputErrorMessages[contactFormInputEmail.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MAX.toString());
    inputErrorMessages[contactFormInputMessage.name].min = inputErrorMessages[contactFormInputMessage.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MIN.toString());
    inputErrorMessages[contactFormInputMessage.name].max = inputErrorMessages[contactFormInputMessage.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MAX.toString());

    contactForm.addEventListener('focusin', formFocusInEventHandler(contactFormInputToken));
    contactForm.addEventListener('submit', formSubmitEventHandler(formInputs as HTMLInputElement[], contactFormInputToken, contactFormButtonSubmit, errorMessageElements, inputErrorMessages, contactFormButtonSubmitTextLabel, submitButtonLabels, notificationMessages, disabledElementsOnProcessing, options.notificationManager));
    contactFormInputName.addEventListener('blur', inputBlurEventHandler(contactFormInputName, contactFormErrorMessageName, inputErrorMessages[contactFormInputName.name]));
    contactFormInputEmail.addEventListener('blur', inputBlurEventHandler(contactFormInputEmail, contactFormErrorMessageEmail, inputErrorMessages[contactFormInputEmail.name]));
    contactFormInputMessage.addEventListener('blur', inputBlurEventHandler(contactFormInputMessage, contactFormErrorMessageMessage, inputErrorMessages[contactFormInputMessage.name]));

    contactFormManagerState = CONTACT_FORM_MANAGER_STATES.SETUP;
  }

  function init(): void {
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.CREATED) {
      throw new Error('ContactFormManager.init(): the contact form manager must be setup before initialization');
    }
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.READY) {
      throw new Error('ContactFormManager.init(): the contact form manager has already been setup and initialized. It is ready to work');
    }
    contactFormManagerState = CONTACT_FORM_MANAGER_STATES.READY;
  }

  return {
    setup,
    init
  }
}
