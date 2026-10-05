import { HDR_CLASS } from "./snippets";
import { HOW_IT_WORKS, HOW_TITLE, LIMITS, LIMITS_TITLE } from "./siteFacts";

export function Explainer() {
  return (
    <>
      <section id="how-it-works" className="info" aria-labelledby="how-title">
        <h2 id="how-title" className={`section-title ${HDR_CLASS}`}>
          {HOW_TITLE}
        </h2>
        <ol>
          {HOW_IT_WORKS.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong> {step.body}
            </li>
          ))}
        </ol>
      </section>

      <section className="info" aria-labelledby="limits-title">
        <h2 id="limits-title" className={`section-title ${HDR_CLASS}`}>
          {LIMITS_TITLE}
        </h2>
        <ul>
          {LIMITS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
