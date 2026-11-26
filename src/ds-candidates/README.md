# Candidates for Bereg DS

Parts of glow that Bereg DS (1.4.1) does not have. They are built only from Bereg DS tokens,
so moving one into the system means copying it, not redesigning it.

| Candidate                       | Files                           | Why it could be in the system                                                                                             |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Compare (before / after slider) | `compare.css`, `../Compare.tsx` | Any project that shows a change to an image: two layers, a draggable edge, a range input for the keyboard, labels on top. |

Stays in glow on purpose (not candidates, too specific to this tool), in `../styles.css`:

- the sticky strip of in-page links (`.glow-nav`); Bereg DS has `SiteHeader sticky` for a site header;
- the text stage with the glowing sample (`.stage`), sized above the type scale to show the effect;
- canvas panes and the glow mask (`.pane`), the color chips layout (`.chips`, `.chip__swatch`);
- the HDR text CSS itself (`src/snippets.ts`): it is the code the page shows and copies, and the
  Content-Security-Policy allows it by hash.
