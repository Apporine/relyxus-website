import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { EnquiryType } from "@shared/contact";
import { Button } from "@/components/ui/Button";
import { isEmail, sendEnquiry } from "@/lib/enquiry";

/** Email only: for the checklist download and the monthly email. */
export function EmailCapture({
  enquiry,
  label,
  button,
  done,
  compact = false,
}: {
  enquiry: Extract<EnquiryType, "Readiness checklist" | "Newsletter">;
  label: string;
  button: string;
  done: ReactNode;
  compact?: boolean;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmail(email)) {
      setError("Enter an email address, like you@bank.com.");
      return;
    }
    setStatus("sending");
    const result = await sendEnquiry({
      name: "",
      company: "",
      email,
      enquiry,
      marketing: enquiry === "Newsletter",
    });
    if (result.ok) setStatus("sent");
    else {
      setStatus("idle");
      setError(result.errors?.email ?? result.error);
    }
  };

  if (status === "sent")
    return (
      <div className="capture-done" role="status">
        {done}
      </div>
    );

  return (
    <form
      className={`capture ${compact ? "capture-compact" : ""}`}
      noValidate
      onSubmit={onSubmit}
    >
      <label htmlFor={id}>{label}</label>
      <div className="capture-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="you@company.com"
          required
        />
        <Button
          type="submit"
          variant={compact ? "secondary" : "primary"}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : button}
        </Button>
      </div>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </form>
  );
}
