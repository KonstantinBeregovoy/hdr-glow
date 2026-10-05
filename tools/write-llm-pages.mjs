// Rewrites public/index.md and public/llms.txt from src/siteFacts.ts.
// Run after changing page copy: node tools/write-llm-pages.mjs
import { writeFileSync } from "node:fs";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { indexMarkdown, llmsTxt } = await server.ssrLoadModule("/src/siteFacts.ts");
  writeFileSync(new URL("../public/index.md", import.meta.url), indexMarkdown());
  writeFileSync(new URL("../public/llms.txt", import.meta.url), llmsTxt());
} finally {
  await server.close();
}
