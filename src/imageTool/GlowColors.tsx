import { Button, Tag, TextInput } from "bereg-ds/react";
import { useId, useState } from "react";
import { GLOW_COLORS_FULL, isGlowListFull, parseHex, sameColor, toHex } from "../tool/colors";
import type { RGB } from "../tool/mask";

type Props = {
  colors: RGB[];
  /** Colors the picture itself suggested; the ones not chosen can be added back. */
  suggested: RGB[];
  onAdd: (color: RGB) => void;
  onRemove: (color: RGB) => void;
};

/** The chosen glow colors, and the two keyboard ways to add one: a hex code, or a found color. */
export function GlowColors({ colors, suggested, onAdd, onRemove }: Props) {
  const id = useId();
  const [hexInput, setHexInput] = useState("");
  const [hexError, setHexError] = useState<string | null>(null);

  const notChosen = suggested.filter((s) => !colors.some((c) => sameColor(c, s)));

  const addHexColor = () => {
    const color = parseHex(hexInput);
    if (!color) {
      setHexError("Not a color. Use a hex code like #fff or #a86bff.");
      return;
    }
    if (isGlowListFull(colors, color)) {
      setHexError(GLOW_COLORS_FULL);
      return;
    }
    onAdd(color);
    setHexInput("");
    setHexError(null);
  };

  return (
    <div className="field">
      <span className="field-label">Glowing colors</span>
      <ul className="chips">
        {colors.map((color) => (
          <li key={toHex(color)}>
            <Tag
              className="chip"
              onRemove={() => onRemove(color)}
              removeLabel={`Remove ${toHex(color)}`}
            >
              <span className="chip__swatch" style={{ background: toHex(color) }} />
              <code>{toHex(color)}</code>
            </Tag>
          </li>
        ))}
        {colors.length === 0 ? (
          <li className="chips__empty">None yet. Click a color in the image.</li>
        ) : null}
      </ul>

      <p className="field-hint">Know the exact color? Type its hex code to add it here.</p>

      <form
        className="hex-add"
        onSubmit={(event) => {
          event.preventDefault();
          addHexColor();
        }}
      >
        <label className="visually-hidden" htmlFor={`${id}-hex`}>
          Add a color by hex code
        </label>
        <TextInput
          id={`${id}-hex`}
          className="hex-add__input"
          inputMode="text"
          placeholder="#rrggbb"
          value={hexInput}
          aria-invalid={hexError !== null}
          onChange={(event) => {
            setHexInput(event.target.value);
            setHexError(null);
          }}
        />
        <Button type="submit" variant="secondary" size="sm">
          Add color
        </Button>
      </form>
      {hexError ? (
        <p className="field-error hex-add__error" role="alert">
          {hexError}
        </p>
      ) : null}

      {notChosen.length > 0 ? (
        <div className="hex-add__suggested">
          <span>Found in the image:</span>
          <ul className="chips">
            {notChosen.map((color) => (
              <li key={toHex(color)}>
                <Tag as="button" className="chip" onClick={() => onAdd(color)}>
                  <span className="chip__swatch" style={{ background: toHex(color) }} />
                  <code>{toHex(color)}</code>
                  <span aria-hidden="true">+</span>
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
