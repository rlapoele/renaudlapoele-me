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

type PdfVariant = "polished" | "ats";

function getOutputPdfPath(sourceHtmlPath: string, variant: PdfVariant) {
  const sourceHtmlBaseName = basename(sourceHtmlPath, extname(sourceHtmlPath));
  const variantSuffix = variant === "ats" ? "_ats" : "";

  return join(
    dirname(sourceHtmlPath),
    `${sourceHtmlBaseName}${variantSuffix}_${productionDateSuffix}.pdf`
  );
}

const atsStyles = `
  @page {
    size: A4;
    margin: 15mm 17mm;
  }

  .resume-page {
    width: auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .resume-header {
    margin-bottom: 18px !important;
  }

  .resume-grid {
    display: block !important;
  }

  main {
    display: block !important;
  }

  section {
    margin: 0 0 22px !important;
  }

  .section-heading {
    margin: 0 0 8px !important;
  }

  .summary-copy,
  .role,
  .education-item,
  .certificate-item {
    margin-left: 0 !important;
  }

  .role {
    margin-bottom: 24px !important;
  }

  .role li::marker {
    font-size: 0.9em !important;
  }

  .contact-list li {
    display: block !important;
    margin-bottom: 4px !important;
  }

  .icon,
  .proficiency,
  .print-continuation-heading {
    display: none !important;
  }

  .print-page-break,
  .sidebar-page-two {
    break-before: auto !important;
    page-break-before: auto !important;
  }

  .skills-section {
    break-inside: auto !important;
    page-break-inside: auto !important;
  }

  .skill-group {
    margin-bottom: 10px !important;
  }

  .language-list li {
    margin-bottom: 6px !important;
  }
`;

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

async function prepareAtsLayout(page: import("playwright").Page) {
  await page.evaluate(() => {
    const main = document.querySelector("main");
    const aside = document.querySelector("aside");

    if (!main || !aside) {
      throw new Error("Expected the resume to contain main and aside elements");
    }

    const selectors = [
      ".contact-section",
      ".summary-section",
      ".skills-section",
      ".experience-section",
      ".education-section",
      ".certificates-section",
      ".languages-section"
    ];

    const orderedSections = selectors.map((selector) => {
      const section = document.querySelector<HTMLElement>(selector);

      if (!section) {
        throw new Error(`Expected resume section: ${selector}`);
      }

      return section;
    });

    main.replaceChildren(...orderedSections);
    aside.remove();

    const contactLinks = main.querySelectorAll<HTMLAnchorElement>(
      ".contact-section a"
    );

    for (const link of contactLinks) {
      const href = link.href;

      if (href.startsWith("mailto:")) {
        link.textContent = href.slice("mailto:".length);
      } else if (href.includes("linkedin.com")) {
        const url = new URL(href);
        const displayUrl = `${url.hostname.replace(/^www\./, "")}${decodeURI(url.pathname)}`;
        link.textContent = `LinkedIn: ${displayUrl}`;
      } else if (href.includes("github.com")) {
        const url = new URL(href);
        const displayUrl = `${url.hostname.replace(/^www\./, "")}${decodeURI(url.pathname)}`;
        link.textContent = `GitHub: ${displayUrl}`;
      }
    }
  });

  await page.addStyleTag({ content: atsStyles });
}

try {
  for (const sourceHtmlPath of sourceHtmlPaths) {
    const page = await browser.newPage();

    await page.goto(pathToFileURL(sourceHtmlPath).href, { waitUntil: "networkidle" });
    await waitForRequiredFonts(page);

    const polishedOutputPath = getOutputPdfPath(sourceHtmlPath, "polished");

    await page.pdf({
      path: polishedOutputPath,
      format: "A4",
      printBackground: false,
      tagged: true,
      outline: true
    });

    console.log(`Generated polished PDF: ${polishedOutputPath}`);

    await prepareAtsLayout(page);

    const atsOutputPath = getOutputPdfPath(sourceHtmlPath, "ats");

    await page.pdf({
      path: atsOutputPath,
      format: "A4",
      printBackground: false,
      tagged: true,
      outline: true
    });

    await page.close();

    console.log(`Generated ATS PDF: ${atsOutputPath}`);
  }
} finally {
  await browser.close();
}
