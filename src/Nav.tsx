import { NavLink } from "bereg-ds/react";

// A thin sticky strip of anchor links, mainly for someone who already knows
// the page and just wants to jump straight to a section, e.g. back for the
// text swatch. Plain anchors, no JS beyond the browser's own smooth scroll.

const LINKS = [
  { href: "#image", label: "Image" },
  { href: "#text", label: "Text" },
  { href: "#detect-hdr", label: "Detect HDR" },
  { href: "#how-it-works", label: "How it works" },
];

export function Nav() {
  return (
    <nav className="glow-nav" aria-label="Page sections">
      {LINKS.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
