// src/scripts/shared/combineCssClasses.ts
// ---
// Use this function to combine multiple CSS classes into a single string.
// This is especially useful when you need to combine a component "class" prop
// with other component internal specific classes to be applied to the root element.
//
// Example:
// --------
//
// combinedCssClasses(
//   "base classes",
//   variant === "primary" && "bg-accent",
//   size === "sm" && "text-xs",
//   className
// );
// The "className" prop is, in this example, the "class" prop of the component."
//
// ---

type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassDictionary
  | ClassArray;

interface ClassDictionary {
  [key: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

export function combineCssClasses(...inputs: ClassValue[]): string {
  const result: string[] = [];
  const seen = new Set<string>();

  // The below "add" function is used to prevent duplicate classes from being
  // added to the result array.
  // In case this "combineCssClasses“ function is used along with
  // tailwind-merge (twMerge), deduplication is handled by twMerge therefore,
  // deduplicating in this function may not be necessary.

  const add = (cls: string) => {
    if (!seen.has(cls)) {
      seen.add(cls);
      result.push(cls);
    }
  };

  const process = (input: ClassValue): void => {
    if (!input) return;

    if (typeof input === "string" || typeof input === "number") {
      input
        .toString()
        .split(/\s+/)
        .forEach(add);
      return;
    }

    if (Array.isArray(input)) {
      input.forEach(process);
      return;
    }

    if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          key.split(/\s+/).forEach(add);
        }
      }
    }
  };

  inputs.forEach(process);

  return result.join(" ");
}
