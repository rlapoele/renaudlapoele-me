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
  let tokenPromise: Promise<void> | null = null;

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

  async function loadToken(tokenFormInput: HTMLInputElement) {
    const response = await fetch("/api/contactToken");

    if (!response.ok) {
      throw new Error(`Contact token API returned HTTP ${response.status}.`);
    }

    const responseData: unknown = await response.json();

    if (!isContactFormTokenResponse(responseData)) {
      throw new Error('Unexpected response from contact token API.');
    }

    tokenFormInput.value = responseData.token;
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
      if(!tokenPromise) {
        tokenPromise = loadToken(formTokenElement);
      }
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
    disabledElementsOnProcessing: HTMLElement[] = [],
    notificationManager: CreateNotificationManagerType
  ): (event: SubmitEvent) => void {
    return async (event: SubmitEvent) => {
      event.preventDefault();

      let isFormValid = true;
      let elementToFocusOn: HTMLInputElement | null = null;

      // Since the elementToFocusOn is init. as null, we use a for ... of loop to help typescript
      // track assignment to the element to focus on and thereby avoid a type issue when trying to
      // focus on the element (...toFocusOn).
      for (const formInput of formInputs) {
        const validationResult: ValidationResultType =
          validateFieldInputValue(formInput.name, formInput.value.trim(), Object.keys(inputErrorMessages[formInput.name]) as ValidationType[]);
        if(!validationResult.isValid) {
          showFieldErrorMessage(formInput, errorMessageElements[formInput.name], inputErrorMessages[formInput.name][validationResult.errorType] as string);
          isFormValid = false;
          if(!elementToFocusOn) {
            elementToFocusOn = formInput;
          }
        }
        else {
          hideFieldErrorMessage(formInput, errorMessageElements[formInput.name]);
        }
      }

      if(isFormValid) {
        disableElements(disabledElementsOnProcessing);

        submitButton.classList.add('c-button--processing');
        submitButtonTextLabelElement.textContent = submitButtonLabels.sending;

        let hasBeenSent = false;
        let errorMessage = submitButtonLabels.error ?? submitButtonLabels.send;

        try {
          if (tokenPromise) {
            await tokenPromise;
          }

          if (!tokenFormInput.value) {
            notificationManager.notifyError('An error occurred, please retry.');
            throw new Error('Contact form token is missing.');
          }

          let formData = new FormData();
          formInputs.forEach((formInput) => formData.append(formInput.name, formInput.value.trim()));
          formData.append(tokenFormInput.name, tokenFormInput.value.trim());

          const response = await fetch("/api/sendMessage", { method: "POST", body: formData });
          const responseData: unknown = await response.json();

          //console.log(responseData);

          if(!isContactFormSubmitResponse(responseData)) {
            notificationManager.notifyError('An error occurred, please retry.');
            throw new Error('Unexpected response from contact form API.');
          }

          if(!response.ok || !responseData.isValid) {
            errorMessage = responseData.message ?? errorMessage;
            notificationManager.notifyError('An error occurred, please retry.');
            throw new Error(responseData.message ?? `Contact form API returned HTTP ${response.status}.`);
          }

          hasBeenSent = true;
          submitButtonTextLabelElement.textContent = submitButtonLabels.done;
          notificationManager.notifySuccess('Your message has been sent successfully, thank you!');
          window.setTimeout(() => {
            formInputs.forEach((formInput) => {
              resetField(formInput, errorMessageElements[formInput.name]);
            });
            resetTokenField(tokenFormInput);
            submitButtonTextLabelElement.textContent = submitButtonLabels.send;
            enableElements(disabledElementsOnProcessing);
          }, 3000);
        }
        catch (error) {
          console.error('Contact form submission failed:', error);

          //submitButtonTextLabelElement.textContent = errorMessage;

          window.setTimeout(() => {
            submitButtonTextLabelElement.textContent = submitButtonLabels.send;
          }, 3000);
        }
        finally {

          submitButton.classList.remove('c-button--processing');

          if(!hasBeenSent) {
            enableElements(disabledElementsOnProcessing);
          }
        }
      }
      else {
        if(!!elementToFocusOn) {
          elementToFocusOn.focus();
        }
      }
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

    inputErrorMessages[contactFormInputName.name].min = inputErrorMessages[contactFormInputName.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MIN.toString());
    inputErrorMessages[contactFormInputName.name].max = inputErrorMessages[contactFormInputName.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MAX.toString());
    inputErrorMessages[contactFormInputEmail.name].min = inputErrorMessages[contactFormInputEmail.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MIN.toString());
    inputErrorMessages[contactFormInputEmail.name].max = inputErrorMessages[contactFormInputEmail.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MAX.toString());
    inputErrorMessages[contactFormInputMessage.name].min = inputErrorMessages[contactFormInputMessage.name].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MIN.toString());
    inputErrorMessages[contactFormInputMessage.name].max = inputErrorMessages[contactFormInputMessage.name].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MAX.toString());

    contactForm.addEventListener('focusin', formFocusInEventHandler(contactFormInputToken));
    contactForm.addEventListener('submit', formSubmitEventHandler(formInputs as HTMLInputElement[], contactFormInputToken, contactFormButtonSubmit, errorMessageElements, inputErrorMessages, contactFormButtonSubmitTextLabel, submitButtonLabels, disabledElementsOnProcessing, options.notificationManager));
    contactFormInputName.addEventListener('blur', inputBlurEventHandler(contactFormInputName, contactFormErrorMessageName, inputErrorMessages[contactFormInputName.name]));
    contactFormInputEmail.addEventListener('blur', inputBlurEventHandler(contactFormInputEmail, contactFormErrorMessageEmail, inputErrorMessages[contactFormInputEmail.name]));
    contactFormInputMessage.addEventListener('blur', inputBlurEventHandler(contactFormInputMessage, contactFormErrorMessageMessage, inputErrorMessages[contactFormInputMessage.name]));

    contactFormManagerState = CONTACT_FORM_MANAGER_STATES.SETUP;
    console.log('The contact form manager has successfully been setup!');
  }

  function init(): void {
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.CREATED) {
      throw new Error('ContactFormManager.init(): the contact form manager must be setup before initialization');
    }
    if (contactFormManagerState === CONTACT_FORM_MANAGER_STATES.READY) {
      throw new Error('ContactFormManager.init(): the contact form manager has already been setup and initialized. It is ready to work');
    }
    contactFormManagerState = CONTACT_FORM_MANAGER_STATES.READY;
    console.log('The contact form manager has successfully been initialized!');
  }

  return {
    setup,
    init
  }
}
