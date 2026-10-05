import { HDR_CLASS } from "./snippets";
import { AUTHOR, GITHUB_URL, LINKEDIN_URL } from "./siteFacts";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <p>
        <span className={`footer__mark ${HDR_CLASS}`}>hdr-glow</span> · © {year} {AUTHOR} ·{" "}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{" "}
        ·{" "}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}
