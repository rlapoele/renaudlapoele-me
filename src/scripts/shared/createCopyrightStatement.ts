export function createCopyrightStatement(year: number = new Date().getFullYear(), fullName: string): string {
  return  `© ${year} - ${fullName}`;
}
