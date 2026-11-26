import { Dropzone } from "bereg-ds/react";
import { DROP_HINT } from "../siteFacts";

type Props = { hasImage: boolean; onFile: (file: File) => void };

/** The Bereg DS drop area (click, keyboard, drag and drop); the file checks stay in useImageSession. */
export function DropZone({ hasImage, onFile }: Props) {
  return (
    <Dropzone
      accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,.svg"
      onFiles={(files) => onFile(files[0])}
      title={
        hasImage
          ? "Drag another image in, or click to browse"
          : "Drag a logo in, or click to browse"
      }
      hint={DROP_HINT}
    />
  );
}
