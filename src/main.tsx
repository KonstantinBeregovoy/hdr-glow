import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bereg-ds/bereg-ds.css";
import "./ds-candidates/compare.css";
import "./styles.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is a nice-to-have; the site works fine without it.
    });
  });
}
