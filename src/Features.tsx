import { FEATURES } from "./siteFacts";

// A short version of "What it does", meant to sit before the tool itself, so
// a first-time visitor knows what they're looking at before they touch it.
// The longer explanation lives in Explainer, after both demos.

export function Features() {
  return (
    <ul className="features">
      {FEATURES.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
