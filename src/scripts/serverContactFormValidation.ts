import { getResumeData } from "@content/i18n/resume";
import type {LocaleType} from "@content/i18n/locale";
import {SUPPORTED_LOCALES} from "@content/i18n/locale";
import {
  CONTACT_FORM_INPUT_MIN_MAX_LENGTHS,
  MAX_KEYWORD,
  MIN_KEYWORD,
  type ValidationResultType,
  type ValidationType,
  validateFieldInputValue,
} from "@scripts/contactFormValidation.ts";
import { logger } from "@scripts/logger.ts";

export type ServerContactFormValidationInputType = {
  token: string,
  locale: string,
  name: string
  email: string
  subject: string
  message: string
}

export type ServerContactFormValidationResultType = {
  isValid: boolean,
  validationMessage: string
}

export function serverValidateContactForm(contactFormInput: ServerContactFormValidationInputType): ServerContactFormValidationResultType {

  let isValid = true;
  let validationMessage: string = 'Your message has been sent successfully. Thank you for contacting me!';

  if(
    !contactFormInput.locale ||
    (contactFormInput.locale.length === 0) ||
    ![SUPPORTED_LOCALES.FR, SUPPORTED_LOCALES.EN].includes(contactFormInput.locale as LocaleType)
  ) {
    isValid = false;
    validationMessage = 'Missing or invalid locale';
  }
  else {
    const formInputs = getResumeData(contactFormInput.locale as LocaleType).ui.sections.contact.form.inputs;

    let inputErrorMessages: Record<string, Record<string, string>> = {
      locale: formInputs.locale.errorMessages,
      name: formInputs.name.errorMessages,
      email: formInputs.email.errorMessages,
      subject: formInputs.subject.errorMessages,
      message: formInputs.message.errorMessages,
    }

    inputErrorMessages["name"].min = inputErrorMessages["name"].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MIN.toString());
    inputErrorMessages["name"].max = inputErrorMessages["name"].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.NAME.MAX.toString());
    inputErrorMessages["email"].min = inputErrorMessages["email"].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MIN.toString());
    inputErrorMessages["email"].max = inputErrorMessages["email"].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.EMAIL.MAX.toString());
    inputErrorMessages["message"].min = inputErrorMessages["message"].min.replace(MIN_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MIN.toString());
    inputErrorMessages["message"].max = inputErrorMessages["message"].max.replace(MAX_KEYWORD, CONTACT_FORM_INPUT_MIN_MAX_LENGTHS.MESSAGE.MAX.toString());

    Object.keys(formInputs).forEach((key) => {
      if(isValid) {
        let error: ValidationResultType = validateFieldInputValue(key, contactFormInput[key as keyof typeof contactFormInput], Object.keys(inputErrorMessages[key]) as ValidationType[]);
        if (!error.isValid) {
          isValid = false;
          validationMessage = inputErrorMessages[key][error.errorType];
        }
      }
    });
  }

  logger.debug({ isValid, validationMessage }, 'Contact form server validation completed');
  return { isValid, validationMessage };
}
