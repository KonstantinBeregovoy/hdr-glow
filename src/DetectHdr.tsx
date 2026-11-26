import { CodeBlock, Section } from "bereg-ds/react";
import { copyText } from "./copyText";
import { DETECT_CSS, DETECT_JS, HDR_CLASS } from "./snippets";
import {
  DETECT_CSS_LEDE,
  DETECT_CSS_TITLE,
  DETECT_JS_LEDE,
  DETECT_JS_TITLE,
  DETECT_LEDE,
  DETECT_LIMIT,
  DETECT_LIMIT_TITLE,
  DETECT_SCREEN_STEPS,
  DETECT_SCREEN_TITLE,
  DETECT_TITLE,
} from "./siteFacts";

export function DetectHdr() {
  return (
    <Section
      id="detect-title"
      sectionId="detect-hdr"
      title={DETECT_TITLE}
      headingClassName={HDR_CLASS}
    >
      {/* .prose is split around the code blocks, so its own <pre> style does not reach them. */}
      <div className="prose">
        <p>{DETECT_LEDE}</p>

        <h3>{DETECT_SCREEN_TITLE}</h3>
        <ul>
          {DETECT_SCREEN_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <h3>{DETECT_CSS_TITLE}</h3>
        <p>{DETECT_CSS_LEDE}</p>
      </div>
      <CodeBlock label="CSS" code={DETECT_CSS} onCopy={copyText} />

      <div className="prose">
        <h3>{DETECT_JS_TITLE}</h3>
        <p>{DETECT_JS_LEDE}</p>
      </div>
      <CodeBlock label="JavaScript" code={DETECT_JS} onCopy={copyText} />

      <div className="prose">
        <h3>{DETECT_LIMIT_TITLE}</h3>
        <p>{DETECT_LIMIT}</p>
      </div>
    </Section>
  );
}
