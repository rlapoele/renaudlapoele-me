export type ObjectArrayType = ReadonlyArray<Readonly<Record<string, string>>>;

const ESCAPE_CHARACTER = "\\";
const DOUBLE_QUOTE_CHARACTER = "\"";
const OBJECT_KEY_VALUE_SEPARATOR = ":";
const KEY_VALUE_STRING_SEPARATOR = ";";

function escapeString(str: string): string {
  return str
    .replaceAll(
      DOUBLE_QUOTE_CHARACTER,
      `${ESCAPE_CHARACTER}${DOUBLE_QUOTE_CHARACTER}`
    )
    .replaceAll(
      OBJECT_KEY_VALUE_SEPARATOR,
      `${ESCAPE_CHARACTER}${OBJECT_KEY_VALUE_SEPARATOR}`
    )
    .replaceAll(
      KEY_VALUE_STRING_SEPARATOR,
      `${ESCAPE_CHARACTER}${KEY_VALUE_STRING_SEPARATOR}`
    );
}

export function objectKeyValueArrayToString(objectArray: ObjectArrayType): string {
  return objectArray
    .flatMap((obj) =>
      Object.entries(obj).map(
        ([objKey, objValue]) =>
          `${objKey}${OBJECT_KEY_VALUE_SEPARATOR}${escapeString(objValue)}`
      )
    )
    .join(KEY_VALUE_STRING_SEPARATOR);
}
