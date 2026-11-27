import { Section } from "bereg-ds/react";
import { HDR_CLASS } from "./snippets";
import { HOW_IT_WORKS, HOW_TITLE, LIMITS, LIMITS_TITLE } from "./siteFacts";

export function Explainer() {
  return (
    <>
      <Section
        id="how-title"
        sectionId="how-it-works"
        title={HOW_TITLE}
        headingClassName={`${HDR_CLASS} text-post-title`}
      >
        <div className="prose">
          <ol>
            {HOW_IT_WORKS.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong> {step.body}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        id="limits-title"
        title={LIMITS_TITLE}
        headingClassName={`${HDR_CLASS} text-post-title`}
      >
        <div className="prose">
          <ul>
            {LIMITS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
