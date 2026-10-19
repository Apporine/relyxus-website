import type { ChangeEvent, FocusEvent, ReactNode } from "react";

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Label above, 48 px control, inline error in plain words. */
export function Field({
  id,
  label,
  optional,
  error,
  hint,
  type = "text",
  value,
  onChange,
  onBlur,
  options,
  rows,
  autoComplete,
  maxLength,
  placeholder,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  type?: "text" | "email" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<Control>) => void;
  options?: readonly string[];
  rows?: number;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  const describedBy =
    [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") ||
    undefined;
  const shared = {
    id,
    name: id,
    value,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    required: !optional,
    onChange: (event: ChangeEvent<Control>) => onChange(event.target.value),
  };
  return (
    <div className={`field ${error ? "field-invalid" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="field-optional"> (optional)</span>}
      </label>
      {type === "select" ? (
        <select {...shared}>
          <option value="">Choose one</option>
          {options?.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...shared}
          rows={rows ?? 4}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      )}
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
