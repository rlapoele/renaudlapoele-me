export type ObjectToObjectArrayType<ObjectType extends Record<string, unknown>> = {
  [Key in keyof ObjectType]: { [Property in Key]: ObjectType[Key] }
}[keyof ObjectType][];

export function objectToObjectArray<ObjectType extends Record<string, unknown>>(
  obj: ObjectType
): ObjectToObjectArrayType<ObjectType> {
  return Object.keys(obj).map((key) => ({
    [key]: obj[key],
  })) as ObjectToObjectArrayType<ObjectType>;
}
