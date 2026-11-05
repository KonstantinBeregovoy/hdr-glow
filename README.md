# hdr-glow

**Live: [glow.bereg.dev](https://glow.bereg.dev)**

Make colors brighter than white on HDR screens, in the browser, with no backend:

- **Image tool**: upload a logo (PNG, JPEG, WebP, AVIF or SVG), pick which colors should glow,
  and download an HDR JPEG (gain map, for the web and Apple Photos) and a Rec.2100 PQ JPEG
  (for LinkedIn). A few built-in samples let you try it without a file at hand.
- **Text demo**: `background-clip: text` over a gain-map JPEG, with the exact HTML and CSS to copy.

Everything, including the JPEG encoder, the gain-map container and the ICC profile, is written
from scratch in TypeScript and runs in a Web Worker. Nothing is uploaded anywhere.

The hosted site at glow.bereg.dev counts visits with Cloudflare Web Analytics (no cookies, no
personal data). Your images are never sent anywhere, and the code in this repository has no
analytics of its own.

    npm install
    npm run dev        # http://localhost:5180
    npm run dev:lan    # same, reachable from a phone on your Wi-Fi
    npm run check      # tests for the image modules (Vitest, no browser needed)
    npm run lint       # oxlint
    npm run format     # Prettier (format:check only verifies)
    npm run build      # type check + production build in dist/

CI runs lint, format:check, check and build on every pull request. Node 22 (see `.nvmrc`).

Check on an HDR screen (Chrome 137+, Safari 26 / iOS 26): the glowing parts should look brighter
than white. On other screens and browsers the files still look like normal pictures.

## Detecting an HDR screen

The status line at the top of the site says whether your screen and browser show HDR. To do the
same on your own site, use the `dynamic-range` media query. It matches when the screen the window
is on can show HDR.

First make sure HDR is on: macOS, System Settings, Displays, High Dynamic Range (if your display
offers it); Windows, Settings, System, Display, Use HDR.

In CSS:

```css
.headline {
  color: #fff; /* every screen */
}

@media (dynamic-range: high) {
  .headline {
    /* HDR screens only */
  }
}
```

In JavaScript:

```js
const query = window.matchMedia("(dynamic-range: high)");

function update() {
  document.documentElement.classList.toggle("hdr", query.matches);
}

update();
query.addEventListener("change", update); // fires when the window moves to another display
```

The query reports the screen, not the browser. A browser that cannot draw HDR images still matches
on an HDR screen, so the site also checks the browser version (Chrome 137+ and Safari 26 show HDR
today) before it calls the glow real. The full version is in `src/useHdrDisplay.ts` and
`src/browserSupport.ts`.
