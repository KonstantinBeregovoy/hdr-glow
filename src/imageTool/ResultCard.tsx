import { Button } from "bereg-ds/react";
import type { ReactNode } from "react";
import { formatSize } from "./config";
import type { Result } from "./useBuiltFile";

type CardProps = {
  title: string;
  lede: string;
  file: Result | null;
  busy: boolean;
  downloadName: string;
  buttonLabel: string;
  emptyText: string;
  note: ReactNode;
};

export function ResultCard({
  title,
  lede,
  file,
  busy,
  downloadName,
  buttonLabel,
  emptyText,
  note,
}: CardProps) {
  return (
    <section className="result">
      <output className="visually-hidden">
        {file ? `${title} ready, ${formatSize(file.size)}` : busy ? "Building…" : ""}
      </output>
      <h3>{title}</h3>
      <p className="tool__note">{lede}</p>
      {file ? (
        <>
          <img className="tool__image" src={file.url} alt={`${title}, the file you can download`} />
          <p className="text-meta">
            {formatSize(file.size)}
            {busy ? ", updating…" : ""}
          </p>
          <Button href={file.url} download={downloadName}>
            {buttonLabel}
          </Button>
          <p className="tool__note">{note}</p>
        </>
      ) : (
        <p className="tool__note">{busy ? "Building…" : emptyText}</p>
      )}
    </section>
  );
}
