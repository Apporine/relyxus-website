import { useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import type { EnquiryType } from "@shared/contact";
import { Field } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import { isEmail, sendEnquiry } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { replyPromise } from "@/content/site";

/** Set NEXT_PUBLIC_BOOKING_URL (Cal.com or HubSpot) to offer a calendar after submit. */
const bookingUrl = (import.meta.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();

const roles = [
  "Payments engineering / SRE",
  "Resilience, risk or compliance",
  "Technology or payments leadership",
  "Security or architecture",
  "Other",
] as const;

type Values = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!isEmail(values.email))
    errors.email = "Enter a work email, like you@bank.com.";
  if (values.company.trim().length < 2)
    errors.company = "Enter your company name.";
  if (!values.role) errors.role = "Choose the role closest to yours.";
  if (values.message.length > 2000)
    errors.message = "Keep this under 2,000 characters.";
  return errors;
}

/** The short demo form: name, work email, company, role, one optional question. */
export function DemoForm({
  enquiry = "Demo",
  messageLabel = "Tell us about an incident you’d want to replay",
  submitLabel = "Book a 30 minute demo",
}: {
  enquiry?: EnquiryType;
  messageLabel?: string;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof Values) => (value: string) => {
    setValues(current => ({ ...current, [key]: value }));
    if (errors[key]) setErrors(current => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    setFailure(null);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`demo-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await sendEnquiry({ ...values, enquiry });
    if (result.ok) {
      setStatus("sent");
      setValues(empty);
    } else {
      setStatus("idle");
      setFailure(result.error);
      if (result.errors) setErrors(result.errors as Errors);
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  if (status === "sent") {
    return (
      <div className="form-done" ref={resultRef} tabIndex={-1} role="status">
        <h3>Thanks. Your note is with the team.</h3>
        {bookingUrl ? (
          <>
            <p>Pick a 30 minute slot now and skip the email back and forth.</p>
            <ButtonLink
              href={bookingUrl}
              onClick={() => track("booking_click", { place: enquiry })}
            >
              Choose a time
            </ButtonLink>
          </>
        ) : (
          <p>
            {replyPromise} You’ll hear from a named person on the team, with
            times to meet and what to bring: ideally one closed incident.
          </p>
        )}
      </div>
    );
  }

  const field = (key: keyof Values) => ({
    id: `demo-${key}`,
    value: values[key],
    onChange: set(key),
    error: errors[key],
  });

  return (
    <form
      className="form"
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
    >
      <div className="form-row">
        <Field
          {...field("name")}
          label="Name"
          autoComplete="name"
          maxLength={100}
        />
        <Field
          {...field("email")}
          label="Work email"
          type="email"
          autoComplete="email"
          maxLength={254}
        />
      </div>
      <div className="form-row">
        <Field
          {...field("company")}
          label="Company"
          autoComplete="organization"
          maxLength={160}
        />
        <Field {...field("role")} label="Role" type="select" options={roles} />
      </div>
      <Field
        {...field("message")}
        label={messageLabel}
        type="textarea"
        optional
        rows={3}
        maxLength={2000}
        hint="No credentials or confidential incident data, please. A sentence or two is plenty."
      />
      {failure && (
        <div className="form-error" role="alert" ref={resultRef} tabIndex={-1}>
          {failure}
        </div>
      )}
      <div className="form-actions">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </Button>
        <p className="small muted">
          {replyPromise} See our <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
