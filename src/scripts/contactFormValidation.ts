export const CONTACT_FORM_INPUT_MIN_MAX_LENGTHS = {
  NAME: {
    MIN: 2,
    MAX: 100
  },
  EMAIL: {
    MIN: 5,
    MAX: 254
  },
  MESSAGE: {
    MIN: 10,
    MAX: 2000
  },
  SUBJECT: {
    LEN: 0
  }
} as const;

export const MIN_KEYWORD = '{MIN}';
export const MAX_KEYWORD = '{MAX}';

export type ValidationResultType = { isValid: boolean, errorType: string }
export type ValidationType = 'min' | 'max' | 'email' | 'required' | 'length';

type ContactFormInputLengthKey = keyof typeof CONTACT_FORM_INPUT_MIN_MAX_LENGTHS;

function isContactFormInputLengthKey(inputName: string): inputName is ContactFormInputLengthKey {
  return Object.prototype.hasOwnProperty.call(CONTACT_FORM_INPUT_MIN_MAX_LENGTHS, inputName);
}

export function validateFieldInputValue(
  inputName: string,
  value: string,
  validationTypes: ValidationType[]
): ValidationResultType {
  const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
  const trimmedValue = `${value}`.trim();
  const uppercaseInputName = inputName.toUpperCase();
  const inputLengthRules = isContactFormInputLengthKey(uppercaseInputName)
    ? CONTACT_FORM_INPUT_MIN_MAX_LENGTHS[uppercaseInputName]
    : null;
  let isValid = true;
  let errorType = '';

  validationTypes.forEach((validationType) => {
    if(isValid) {
      if(validationType === 'required' && (trimmedValue.length === 0)) {
        isValid = false;
        errorType = 'required';
      }

      if(isValid && (validationType === 'email') && !emailRegex.test(trimmedValue)) {
        isValid = false;
        errorType = 'email';
      }

      if(isValid && (validationType === 'min') && inputLengthRules && ('MIN' in inputLengthRules) && (trimmedValue.length < inputLengthRules.MIN)) {
        isValid = false;
        errorType = 'min';
      }

      if(isValid && (validationType === 'max') && inputLengthRules && ('MAX' in inputLengthRules) && (trimmedValue.length > inputLengthRules.MAX)) {
        isValid = false;
        errorType = 'max';
      }

      if(isValid && (validationType === 'length') && inputLengthRules && ('LEN' in inputLengthRules) && (trimmedValue.length !== inputLengthRules.LEN)) {
        isValid = false;
        errorType = 'length';
      }
    }
  });
  return { isValid, errorType };
}
