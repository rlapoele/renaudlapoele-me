import { readdir, stat } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const inputPath = resolve(process.argv[2] ?? process.cwd());
const productionDate = new Date();
const productionDateSuffix = productionDate
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
  .replaceAll(" ", "-");

function getOutputPdfPath(sourceHtmlPath: string) {
  const sourceHtmlBaseName = basename(sourceHtmlPath, extname(sourceHtmlPath));

  return join(
    dirname(sourceHtmlPath),
    `${sourceHtmlBaseName}_${productionDateSuffix}.pdf`
  );
}

async function getSourceHtmlPaths(path: string) {
  const pathStats = await stat(path);

  if (pathStats.isFile()) {
    if (extname(path).toLowerCase() !== ".html") {
      throw new Error(`Expected an HTML file, received: ${path}`);
    }

    return [path];
  }

  if (!pathStats.isDirectory()) {
    throw new Error(`Expected an HTML file or directory, received: ${path}`);
  }

  const directoryEntries = await readdir(path, { withFileTypes: true });

  return directoryEntries
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".html")
    .map((entry) => join(path, entry.name))
    .sort();
}

const sourceHtmlPaths = await getSourceHtmlPaths(inputPath);

if (sourceHtmlPaths.length === 0) {
  throw new Error(`No HTML files found in: ${inputPath}`);
}

const browser = await chromium.launch();

const requiredFonts = [
  "400 10pt Urbanist",
  "500 10pt Urbanist",
  "600 10pt Urbanist",
  "700 10pt Urbanist",
  "800 10pt Urbanist",
  "500 10pt Lora",
  "600 10pt Lora",
  "700 10pt Lora"
];

async function waitForRequiredFonts(page: import("playwright").Page) {
  const unavailableFonts = await page.evaluate(async (fonts) => {
    await document.fonts.ready;
    await Promise.all(fonts.map((font) => document.fonts.load(font, "Renaud Lapoële")));

    return fonts.filter((font) => !document.fonts.check(font, "Renaud Lapoële"));
  }, requiredFonts);

  if (unavailableFonts.length > 0) {
    throw new Error(
      `Unable to load required PDF fonts: ${unavailableFonts.join(", ")}`
    );
  }
}

try {
  for (const sourceHtmlPath of sourceHtmlPaths) {
    const outputPdfPath = getOutputPdfPath(sourceHtmlPath);
    const page = await browser.newPage();

    await page.goto(pathToFileURL(sourceHtmlPath).href, { waitUntil: "networkidle" });
    await waitForRequiredFonts(page);

    await page.pdf({
      path: outputPdfPath,
      format: "A4",
      printBackground: true
    });
    await page.close();

    console.log(`Generated ${outputPdfPath}`);
  }
} finally {
  await browser.close();
}
