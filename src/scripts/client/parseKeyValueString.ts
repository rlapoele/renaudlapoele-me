export type StringKeyStringValueObjectType = Record<string, string>;

const ESCAPE_CHARACTER = "\\";
const OBJECT_KEY_VALUE_SEPARATOR = ":";
const KEY_VALUE_STRING_SEPARATOR = ";";

type SeparatorType =
  | typeof OBJECT_KEY_VALUE_SEPARATOR
  | typeof KEY_VALUE_STRING_SEPARATOR;

function splitOnUnescapedCharacter(
  value: string,
  separator: SeparatorType
): string[] {
  const result: string[] = [];
  let currentValue = "";
  let isEscaped = false;

  for (const character of value) {
    if (isEscaped) {
      currentValue += character;
      isEscaped = false;
      continue;
    }

    if (character === ESCAPE_CHARACTER) {
      currentValue += character;
      isEscaped = true;
      continue;
    }

    if (character === separator) {
      result.push(currentValue);
      currentValue = "";
      continue;
    }

    currentValue += character;
  }

  result.push(currentValue);

  return result;
}

function unescapeString(str: string): string {
  return str
    .replaceAll(
      `${ESCAPE_CHARACTER}${OBJECT_KEY_VALUE_SEPARATOR}`,
      OBJECT_KEY_VALUE_SEPARATOR
    )
    .replaceAll(
      `${ESCAPE_CHARACTER}${KEY_VALUE_STRING_SEPARATOR}`,
      KEY_VALUE_STRING_SEPARATOR
    );
}

export function parseKeyValueString(
  objectArrayAsString: string
): StringKeyStringValueObjectType {
  return splitOnUnescapedCharacter(
    objectArrayAsString,
    KEY_VALUE_STRING_SEPARATOR
  ).reduce((obj, objectAsString) => {
      if (!objectAsString) {
        return obj;
      }

      const [objectKey, ...objectValueAsString] = splitOnUnescapedCharacter(
        objectAsString,
        OBJECT_KEY_VALUE_SEPARATOR
      );

      if (!objectKey) {
        return obj;
      }

      obj[objectKey] = unescapeString(
        objectValueAsString.join(OBJECT_KEY_VALUE_SEPARATOR)
      );

      return obj;
    },
    {} as StringKeyStringValueObjectType
  );
}
