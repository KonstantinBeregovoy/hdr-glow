import { ColorField, Field, Range } from "bereg-ds/react";
import { MAX_BOOST, MAX_TOLERANCE, MIN_TOLERANCE } from "./config";

type Props = {
  tolerance: number;
  softness: number;
  boost: number;
  background: string;
  onTolerance: (value: number) => void;
  onSoftness: (value: number) => void;
  onBoost: (value: number) => void;
  onBackground: (value: string) => void;
};

export function GlowSliders(props: Props) {
  const { tolerance, softness, boost, background } = props;
  return (
    <>
      <Field
        label={`Color range: ${Math.round(
          ((tolerance - MIN_TOLERANCE) / (MAX_TOLERANCE - MIN_TOLERANCE)) * 100,
        )}%`}
      >
        <Range
          min={MIN_TOLERANCE}
          max={MAX_TOLERANCE}
          step="0.01"
          value={tolerance}
          onChange={(event) => props.onTolerance(Number(event.target.value))}
        />
      </Field>

      <Field label={`Edge softness: ${Math.round(softness * 100)}%`}>
        <Range
          min="0"
          max="1"
          step="0.05"
          value={softness}
          onChange={(event) => props.onSoftness(Number(event.target.value))}
        />
      </Field>

      <Field
        label={`Glow strength: ${boost.toFixed(1)}× brighter (+${Math.log2(boost).toFixed(1)} stops)`}
      >
        <Range
          min="1.5"
          max={MAX_BOOST}
          step="0.5"
          value={boost}
          onChange={(event) => props.onBoost(Number(event.target.value))}
        />
      </Field>

      <ColorField
        label="Background behind transparent areas"
        value={background}
        onChange={props.onBackground}
        hint="JPEG can't stay transparent, so pick the color that should show through instead, to match your page."
      />
    </>
  );
}
