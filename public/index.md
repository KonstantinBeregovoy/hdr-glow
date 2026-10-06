# hdr-glow

> Make colors brighter than white on HDR screens, entirely in the browser. Upload a logo, pick the colors that should glow, and download an HDR JPEG or a PQ JPEG for LinkedIn.

HDR screens can show colors brighter than `#fff`. Make an image or a line of text use that headroom.

- Runs entirely in this browser tab: no server, no account, no upload.
- Upload a logo, pick which colors should glow, download an HDR JPEG.
- Makes text on your own site glow too, with a few lines of CSS.

## Image

Pick the colors that should outshine the page. Everything else stays exactly as drawn.

PNG, JPEG, WebP, AVIF or SVG. Processed in your browser, nothing is uploaded.

### HDR JPEG

For websites and Apple Photos. An ordinary JPEG with a gain map that tells HDR screens where to glow.

The glow only shows on an HDR display in Chrome 137+ or Safari 26; elsewhere this is a normal JPEG.

### LinkedIn (PQ JPEG)

The glow is written into the pixels as Rec.2100 PQ, with a color profile that says so. Upload this one to LinkedIn.

Check it in the LinkedIn app on your phone. Where a site strips the color profile this picture looks dark and flat, so use the HDR JPEG there.

The picture is saved as a full-quality JPEG, images larger than 2048px are scaled down, and transparent areas never glow. An SVG is drawn 2048px wide on its long side, and fonts or pictures it links to are not loaded, so turn text into outlines first.

## Text

No CSS color goes past `#fff`, but letters can be cut out of an HDR image instead. Type a line in each box and compare.

### HDR text

background-clip: text over a gain-map JPEG.

Needs the swatch image next to your CSS: [download hdr-glow-swatch-7.5x.jpg](https://glow.bereg.dev/hdr-glow-swatch-7.5x.jpg) (3 KB, up to 7.5× brighter than #fff). Use it for headlines and accents, not paragraphs.

This tiny image is what the CSS above cuts the letters out of. Lower the strength for a subtler glow.

```html
<p class="hdr-glow-text">Glow on HDR screens</p>
```

```css
.hdr-glow-text {
  color: #fff; /* SDR fallback */
}

@media (dynamic-range: high) {
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    .hdr-glow-text {
      background: url("hdr-glow-swatch-7.5x.jpg") center / cover;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
}
```

### Plain text

color: #fff.

```css
.plain-text {
  color: #fff;
}
```

## How it works

1. **Mask.** Each pixel gets a score from 0 to 255: how close it is to one of your colors.
2. **Gain map.** The score is stored as a small grayscale layer inside the JPEG. HDR-aware viewers multiply the pixel by up to 7.5×; everyone else sees the normal picture.
3. **LinkedIn.** A second file bakes the boost into the pixels (Rec.2100 PQ, SDR white at 203 nits) and labels it with a matching color profile.
4. **Where it runs.** In this tab. The encoder is written from scratch in TypeScript, and no image leaves your device.

## Known limits

- You need three things at once: an HDR screen, HDR turned on, and an app that reads gain maps or PQ. Tested: Chrome 137+, Safari 26 / iOS 26, Apple Photos, the LinkedIn app. On Android it glows on a Samsung Galaxy S23; an older Xiaomi phone showed no glow.
- Everywhere else the HDR JPEG is an ordinary picture. A PQ file can look dark and flat where the color profile is stripped, so use the HDR JPEG there.
- Black times anything is still black. Deep colors get brighter but read as dim neon; pale colors on dark backgrounds are where the effect lands.
- The peak is 7.5× (about 1,500 nits); screens scale it to what they can show.
- Images larger than 2048 px are scaled down, transparent areas never glow, and the picture is saved again as a JPEG.
- The simulated preview only suggests the effect.

hdr-glow · © 2026 Konstantin Beregovoy · [LinkedIn](https://www.linkedin.com/in/konstantin-beregovoy/) · [GitHub](https://github.com/KonstantinBeregovoy/hdr-glow)
