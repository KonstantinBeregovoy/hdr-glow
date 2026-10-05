import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Compare } from "./Compare";
import { DropZone } from "./imageTool/DropZone";
import { GlowColors } from "./imageTool/GlowColors";
import { GlowSliders } from "./imageTool/GlowSliders";
import { ResultCard } from "./imageTool/ResultCard";
import {
  BUILD_DELAY,
  DEFAULT_SOFTNESS,
  DEFAULT_TOLERANCE,
  MAX_BOOST,
  PQ_BUILD_DELAY,
} from "./imageTool/config";
import { useBuiltFile, type BuildInputs } from "./imageTool/useBuiltFile";
import { useImageSession } from "./imageTool/useImageSession";
import { useMaskPreview } from "./imageTool/useMaskPreview";
import { logError } from "./log";
import { drawOriginal, drawSimulated } from "./preview";
import { SAMPLES } from "./samples";
import { HDR_CLASS } from "./snippets";
import { addGlowColor, sameColor } from "./tool/colors";
import type { RGB } from "./tool/mask";
import {
  HDR_JPEG_LEDE,
  HDR_JPEG_NOTE,
  HDR_JPEG_TITLE,
  HDR_PREVIEW_NOTE,
  HDR_SCREEN_NOTE,
  IMAGE_LEDE,
  IMAGE_TITLE,
  PQ_JPEG_LEDE,
  PQ_JPEG_NOTE,
  PQ_JPEG_TITLE,
  SIMULATED_PREVIEW_NOTE,
  imageSaveNote,
  svgSaveNote,
} from "./siteFacts";
import { describeSupport, type HdrSupport } from "./useHdrDisplay";

type Mode = "live" | "simulated";
type Props = { support: HdrSupport };

export function ImageTool({ support }: Props) {
  const ids = useId();
  const sourceCanvas = useRef<HTMLCanvasElement>(null);
  const beforeCanvas = useRef<HTMLCanvasElement>(null);
  const simulatedCanvas = useRef<HTMLCanvasElement>(null);

  const session = useImageSession();
  const { workerRef, bitmap, background, pixelsVersion, setError } = session;
  const [colors, setColors] = useState<RGB[]>([]);
  const [suggestedColors, setSuggestedColors] = useState<RGB[]>([]);
  const [tolerance, setTolerance] = useState(DEFAULT_TOLERANCE);
  const [softness, setSoftness] = useState(DEFAULT_SOFTNESS);
  const [boost, setBoost] = useState(MAX_BOOST);
  const [mode, setMode] = useState<Mode>(support.live ? "live" : "simulated");

  const params = { colors, tolerance, softness };
  const { maskCanvas, coverage, maskVersion, resetCoverage } = useMaskPreview({
    workerRef,
    bitmap,
    pixelsVersion,
    params,
    onError: setError,
  });

  const inputs: BuildInputs = { ready: bitmap !== null, version: pixelsVersion, params, boost };
  const hdrFile = useBuiltFile(workerRef, "build", BUILD_DELAY, inputs, () =>
    setError("Could not build the HDR JPEG."),
  );
  const pqFile = useBuiltFile(workerRef, "buildPq", PQ_BUILD_DELAY, inputs, () =>
    setError("Could not build the LinkedIn PQ JPEG."),
  );

  // A new picture starts from the colors it suggests, with nothing built yet.
  const onLoaded = (info: { suggested: RGB[] }) => {
    setColors(info.suggested);
    setSuggestedColors(info.suggested);
    resetCoverage();
    hdrFile.clear();
    pqFile.clear();
  };
  const openFile = (file: File) => void session.loadFile(file, onLoaded);

  // The original, both where the person clicks and as the "before" of the preview.
  useEffect(() => {
    if (!bitmap) return;
    for (const canvas of [sourceCanvas.current, beforeCanvas.current]) {
      if (canvas) drawOriginal(canvas, bitmap, background);
    }
  }, [bitmap, background]);

  // The simulated glow, for when the real one can't be shown.
  useEffect(() => {
    const canvas = simulatedCanvas.current;
    const mask = maskCanvas.current;
    if (!bitmap || mode !== "simulated" || !canvas || !mask || mask.width === 0) return;
    drawSimulated(canvas, bitmap, background, mask, boost);
  }, [bitmap, background, boost, mode, maskVersion, maskCanvas]);

  const addColor = (color: RGB) => setColors((list) => addGlowColor(list, color));

  const onPick = async (event: MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    try {
      const color = await workerRef.current?.pick(
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      );
      if (color) addColor(color);
    } catch (caught) {
      logError("picking a color failed", caught);
      setError("Could not read the color there.");
    }
  };

  return (
    <section id="image" className="tool" aria-labelledby={`${ids}-title`}>
      <h2 id={`${ids}-title`} className={`section-title ${HDR_CLASS}`}>
        {IMAGE_TITLE}
      </h2>
      <p className="section-lede">{IMAGE_LEDE}</p>

      <DropZone hasImage={bitmap !== null} onFile={openFile} />

      <p className="samples">
        No logo at hand? Try a sample:
        {SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            className="samples__button"
            onClick={() => void session.loadSample(sample.id, onLoaded)}
          >
            {sample.label}
          </button>
        ))}
      </p>

      {session.error ? (
        <p className="tool__error" role="alert">
          {session.error}
        </p>
      ) : null}

      {bitmap ? (
        <>
          <div className="tool__panes">
            <figure className="pane">
              <figcaption>Click the image to add a color that glows</figcaption>
              <canvas
                ref={sourceCanvas}
                className="pane__canvas pane__canvas--pick"
                onClick={onPick}
                aria-label="Your image. Click a color to make it glow."
              />
            </figure>
            <figure className="pane">
              <figcaption>
                Glow mask
                {coverage === null ? "" : `, ${Math.round(coverage * 100)}% of the image`}
              </figcaption>
              <canvas
                ref={maskCanvas}
                className="pane__canvas"
                aria-label="White where the image will glow."
              />
            </figure>
          </div>

          <div className="tool__controls">
            <GlowColors
              colors={colors}
              suggested={suggestedColors}
              onAdd={addColor}
              onRemove={(color) =>
                setColors((list) => list.filter((other) => !sameColor(other, color)))
              }
            />
            <GlowSliders
              tolerance={tolerance}
              softness={softness}
              boost={boost}
              background={background}
              onTolerance={setTolerance}
              onSoftness={setSoftness}
              onBoost={setBoost}
              onBackground={session.setBackground}
            />
          </div>

          <section className="preview" aria-label="Preview">
            <h3 className="result__title">Preview</h3>
            {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
            <div className="mode" role="group" aria-label="Preview mode">
              <button
                type="button"
                className="mode__button"
                aria-pressed={mode === "live"}
                onClick={() => setMode("live")}
              >
                Real HDR
              </button>
              <button
                type="button"
                className="mode__button"
                aria-pressed={mode === "simulated"}
                onClick={() => setMode("simulated")}
              >
                Preview
              </button>
            </div>
            <p className="tool__note">
              {mode === "live"
                ? support.live
                  ? describeSupport(support)
                  : HDR_PREVIEW_NOTE
                : SIMULATED_PREVIEW_NOTE}
            </p>
            <Compare
              aspect={bitmap.width / bitmap.height}
              beforeLabel="Original"
              afterLabel={mode === "live" ? "HDR" : "Preview"}
              sliderLabel="Drag to compare the original with the glowing version"
              before={
                <canvas ref={beforeCanvas} className="compare__media" aria-label="Original image" />
              }
              after={
                mode === "live" ? (
                  hdrFile.file ? (
                    <img className="compare__media" src={hdrFile.file.url} alt="The HDR JPEG" />
                  ) : (
                    <div className="compare__empty">Building the HDR JPEG…</div>
                  )
                ) : (
                  <canvas
                    ref={simulatedCanvas}
                    className="compare__media"
                    aria-label="Simulated glow"
                  />
                )
              }
            />
          </section>

          <div className="tool__results">
            <ResultCard
              title={HDR_JPEG_TITLE}
              lede={HDR_JPEG_LEDE}
              file={hdrFile.file}
              busy={hdrFile.busy}
              downloadName={`${session.fileName}-hdr.jpg`}
              buttonLabel="Download HDR JPEG"
              emptyText={
                colors.length === 0
                  ? "Choose at least one color to make the HDR JPEG."
                  : "Building the HDR JPEG…"
              }
              note={support.live ? HDR_SCREEN_NOTE : HDR_JPEG_NOTE}
            />
            <ResultCard
              title={PQ_JPEG_TITLE}
              lede={PQ_JPEG_LEDE}
              file={pqFile.file}
              busy={pqFile.busy}
              downloadName={`${session.fileName}-linkedin-pq.jpg`}
              buttonLabel="Download for LinkedIn"
              emptyText={
                colors.length === 0
                  ? "Choose at least one color to make the LinkedIn file."
                  : "Building the LinkedIn file…"
              }
              note={PQ_JPEG_NOTE}
            />
          </div>

          <p className="tool__note">
            {imageSaveNote}
            {session.fromSvg ? svgSaveNote : ""}
          </p>
        </>
      ) : null}
    </section>
  );
}
