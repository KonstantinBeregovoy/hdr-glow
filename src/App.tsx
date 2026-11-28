import { Section, Sections } from "bereg-ds/react";
import { DetectHdr } from "./DetectHdr";
import { Explainer } from "./Explainer";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { ImageTool } from "./ImageTool";
import { Nav } from "./Nav";
import { SwatchGenerator } from "./SwatchGenerator";
import { TextExample } from "./TextExample";
import { describeSupport, useHdrSupport } from "./useHdrDisplay";
import { HDR_CLASS, HDR_CSS, PAGE_CSS, PLAIN_CLASS, PLAIN_CSS, SWATCH_FILE } from "./snippets";
import {
  DEFAULT_GLOW_TEXT,
  HDR_TEXT_METHOD,
  HDR_TEXT_TITLE,
  HERO_AFTER,
  HERO_BEFORE,
  HERO_CODE,
  PLAIN_TEXT_METHOD,
  PLAIN_TEXT_TITLE,
  SWATCH_NOTE_LEAD,
  TEXT_AFTER,
  TEXT_BEFORE,
  TEXT_TITLE,
  swatchNoteTail,
} from "./siteFacts";

export function App() {
  const support = useHdrSupport();

  return (
    <>
      {/* The same CSS strings that are shown and copied below. */}
      <style>{PAGE_CSS}</style>

      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main" className="wrap glow-main">
        <header className="intro">
          <h1 className={`${HDR_CLASS} text-h2-article`}>hdr-glow</h1>
          <p className="lede">
            {HERO_BEFORE} <code>{HERO_CODE}</code>. {HERO_AFTER}
          </p>
          <p className="status" data-hdr={support.live}>
            {describeSupport(support)}
          </p>
        </header>

        <Nav />

        <Features />

        <Sections>
          <ImageTool support={support} />

          <Section
            id="text-title"
            sectionId="text"
            title={TEXT_TITLE}
            headingClassName={`${HDR_CLASS} text-post-title`}
            className="text"
          >
            <p className="lede">
              {TEXT_BEFORE} <code>{HERO_CODE}</code>
              {TEXT_AFTER}
            </p>

            <TextExample
              title={HDR_TEXT_TITLE}
              method={HDR_TEXT_METHOD}
              inputLabel="Glowing text"
              className={HDR_CLASS}
              css={HDR_CSS}
              defaultText={DEFAULT_GLOW_TEXT}
              note={
                <>
                  {SWATCH_NOTE_LEAD}{" "}
                  <a href={`/${SWATCH_FILE}`} download>
                    download {SWATCH_FILE}
                  </a>{" "}
                  {swatchNoteTail}
                </>
              }
            />

            <SwatchGenerator />

            <TextExample
              title={PLAIN_TEXT_TITLE}
              method={PLAIN_TEXT_METHOD}
              inputLabel="Regular text"
              className={PLAIN_CLASS}
              css={PLAIN_CSS}
              defaultText={DEFAULT_GLOW_TEXT}
            />
          </Section>

          <DetectHdr />

          <Explainer />
        </Sections>
      </main>

      <Footer />
    </>
  );
}
