// Copy for the page and for its markdown twin. Both read these strings, so a
// wording change shows up in the HTML and at /index.md together.

import { MAX_BOOST } from "./imageTool/config";
import { HDR_CLASS, HDR_CSS, PLAIN_CSS, SWATCH_FILE, htmlFor } from "./snippets";
import { MAX_SIDE } from "./tool/protocol";

export const SITE_URL = "https://glow.bereg.dev";
export const GITHUB_URL = "https://github.com/KonstantinBeregovoy/hdr-glow";
export const LINKEDIN_URL = "https://www.linkedin.com/in/konstantin-beregovoy/";
export const AUTHOR = "Konstantin Beregovoy";

export const SUMMARY =
  "Make colors brighter than white on HDR screens, entirely in the browser. Upload a logo, pick the colors that should glow, and download an HDR JPEG or a PQ JPEG for LinkedIn.";

export const HERO_BEFORE = "HDR screens can show colors brighter than";
export const HERO_CODE = "#fff";
export const HERO_AFTER = "Make an image or a line of text use that headroom.";

export const FEATURES = [
  "Runs entirely in this browser tab: no server, no account, no upload.",
  "Upload a logo, pick which colors should glow, download an HDR JPEG.",
  "Makes text on your own site glow too, with a few lines of CSS.",
];

export const IMAGE_TITLE = "Image";
export const IMAGE_LEDE =
  "Pick the colors that should outshine the page. Everything else stays exactly as drawn.";
export const DROP_HINT =
  "PNG, JPEG, WebP, AVIF or SVG. Processed in your browser, nothing is uploaded.";

export const HDR_JPEG_TITLE = "HDR JPEG";
export const HDR_JPEG_LEDE =
  "For websites and Apple Photos. An ordinary JPEG with a gain map that tells HDR screens where to glow.";
export const HDR_JPEG_NOTE =
  "The glow only shows on an HDR display in Chrome 137+ or Safari 26; elsewhere this is a normal JPEG.";
export const HDR_SCREEN_NOTE =
  "This screen and browser show HDR: the glowing parts should be brighter than white.";
export const HDR_PREVIEW_NOTE =
  "This shows the real HDR JPEG, which only glows on an HDR display in Chrome 137+ or Safari 26.";
export const SIMULATED_PREVIEW_NOTE =
  "Preview adds light to the glowing parts so you can see the effect on any screen. The real glow is brighter.";

export const PQ_JPEG_TITLE = "LinkedIn (PQ JPEG)";
export const PQ_JPEG_LEDE =
  "The glow is written into the pixels as Rec.2100 PQ, with a color profile that says so. Upload this one to LinkedIn.";
export const PQ_JPEG_NOTE =
  "Check it in the LinkedIn app on your phone. Where a site strips the color profile this picture looks dark and flat, so use the HDR JPEG there.";

export const imageSaveNote = `The picture is saved as a full-quality JPEG, images larger than ${MAX_SIDE}px are scaled down, and transparent areas never glow.`;
export const svgSaveNote = ` An SVG is drawn ${MAX_SIDE}px wide on its long side, and fonts or pictures it links to are not loaded, so turn text into outlines first.`;

export const TEXT_TITLE = "Text";
export const TEXT_BEFORE = "No CSS color goes past";
export const TEXT_AFTER =
  ", but letters can be cut out of an HDR image instead. Type a line in each box and compare.";
export const HDR_TEXT_TITLE = "HDR text";
export const HDR_TEXT_METHOD = "background-clip: text over a gain-map JPEG";
export const PLAIN_TEXT_TITLE = "Plain text";
export const PLAIN_TEXT_METHOD = "color: #fff";
export const DEFAULT_GLOW_TEXT = "Glow on HDR screens";

export const SWATCH_NOTE_LEAD = "Needs the swatch image next to your CSS:";
export const swatchNoteTail = `(3 KB, up to ${MAX_BOOST}× brighter than #fff). Use it for headlines and accents, not paragraphs.`;
export const SWATCH_HINT =
  "This tiny image is what the CSS above cuts the letters out of. Lower the strength for a subtler glow.";

export const HOW_TITLE = "How it works";
export const HOW_IT_WORKS = [
  {
    title: "Mask.",
    body: "Each pixel gets a score from 0 to 255: how close it is to one of your colors.",
  },
  {
    title: "Gain map.",
    body: `The score is stored as a small grayscale layer inside the JPEG. HDR-aware viewers multiply the pixel by up to ${MAX_BOOST}×; everyone else sees the normal picture.`,
  },
  {
    title: "LinkedIn.",
    body: "A second file bakes the boost into the pixels (Rec.2100 PQ, SDR white at 203 nits) and labels it with a matching color profile.",
  },
  {
    title: "Where it runs.",
    body: "In this tab. The encoder is written from scratch in TypeScript, and no image leaves your device.",
  },
];

export const LIMITS_TITLE = "Known limits";
export const LIMITS = [
  "You need three things at once: an HDR screen, HDR turned on, and an app that reads gain maps or PQ. Tested: Chrome 137+, Safari 26 / iOS 26, Apple Photos, the LinkedIn app. On Android it glows on a Samsung Galaxy S23; an older Xiaomi phone showed no glow.",
  "Everywhere else the HDR JPEG is an ordinary picture. A PQ file can look dark and flat where the color profile is stripped, so use the HDR JPEG there.",
  "Black times anything is still black. Deep colors get brighter but read as dim neon; pale colors on dark backgrounds are where the effect lands.",
  `The peak is ${MAX_BOOST}× (about 1,500 nits); screens scale it to what they can show.`,
  `Images larger than ${MAX_SIDE} px are scaled down, transparent areas never glow, and the picture is saved again as a JPEG.`,
  "The simulated preview only suggests the effect.",
];

const hero = `${HERO_BEFORE} \`${HERO_CODE}\`. ${HERO_AFTER}`;
const textLede = `${TEXT_BEFORE} \`${HERO_CODE}\`${TEXT_AFTER}`;

export function indexMarkdown(): string {
  const steps = HOW_IT_WORKS.map(
    (step, index) => `${index + 1}. **${step.title}** ${step.body}`,
  ).join("\n");
  const limits = LIMITS.map((item) => `- ${item}`).join("\n");
  const features = FEATURES.map((item) => `- ${item}`).join("\n");
  const year = new Date().getFullYear();

  return `# hdr-glow

> ${SUMMARY}

${hero}

${features}

## ${IMAGE_TITLE}

${IMAGE_LEDE}

${DROP_HINT}

### ${HDR_JPEG_TITLE}

${HDR_JPEG_LEDE}

${HDR_JPEG_NOTE}

### ${PQ_JPEG_TITLE}

${PQ_JPEG_LEDE}

${PQ_JPEG_NOTE}

${imageSaveNote}${svgSaveNote}

## ${TEXT_TITLE}

${textLede}

### ${HDR_TEXT_TITLE}

${HDR_TEXT_METHOD}.

${SWATCH_NOTE_LEAD} [download ${SWATCH_FILE}](${SITE_URL}/${SWATCH_FILE}) ${swatchNoteTail}

${SWATCH_HINT}

\`\`\`html
${htmlFor(HDR_CLASS, DEFAULT_GLOW_TEXT)}
\`\`\`

\`\`\`css
${HDR_CSS}
\`\`\`

### ${PLAIN_TEXT_TITLE}

${PLAIN_TEXT_METHOD}.

\`\`\`css
${PLAIN_CSS}
\`\`\`

## ${HOW_TITLE}

${steps}

## ${LIMITS_TITLE}

${limits}

hdr-glow · © ${year} ${AUTHOR} · [LinkedIn](${LINKEDIN_URL}) · [GitHub](${GITHUB_URL})
`;
}

export function llmsTxt(): string {
  return `# hdr-glow

> ${SUMMARY}

One page. The markdown version has the two JPEG formats, how the gain map works, the limits, and the CSS for glowing text.

## Page

- [hdr-glow](${SITE_URL}/index.md): Formats, gain map, limits, and the CSS for glowing text

## Optional

- [Source code](${GITHUB_URL}): TypeScript JPEG encoder, gain-map container, and ICC profile
- [Author on LinkedIn](${LINKEDIN_URL})
`;
}
