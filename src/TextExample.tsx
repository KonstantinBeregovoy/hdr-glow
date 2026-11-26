import { useId, useState, type ReactNode } from "react";
import { CodeBlock, Field, TextInput } from "bereg-ds/react";
import { copyText } from "./copyText";
import { htmlFor } from "./snippets";

type Props = {
  title: string;
  method: string;
  inputLabel: string;
  className: string;
  css: string;
  defaultText: string;
  note?: ReactNode;
};

export function TextExample({
  title,
  method,
  inputLabel,
  className,
  css,
  defaultText,
  note,
}: Props) {
  const [text, setText] = useState(defaultText);
  const inputId = useId();

  return (
    <section className="example" aria-labelledby={`${inputId}-title`}>
      <div className="example__demo">
        <header className="example__head">
          <h3 id={`${inputId}-title`}>{title}</h3>
          <p className="text-meta">{method}</p>
        </header>

        <Field label={inputLabel} id={inputId}>
          <TextInput
            value={text}
            maxLength={80}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setText(e.target.value)}
          />
        </Field>

        <div className="stage" aria-live="off">
          {text.trim() ? (
            <span className={`stage__text ${className}`}>{text}</span>
          ) : (
            <span className="stage__empty">Type something above</span>
          )}
        </div>
      </div>

      <div className="example__code">
        <CodeBlock label="HTML" code={htmlFor(className, text)} onCopy={copyText} />
        <CodeBlock label="CSS" code={css} onCopy={copyText} />
        {note ? <p className="example__note">{note}</p> : null}
      </div>
    </section>
  );
}
