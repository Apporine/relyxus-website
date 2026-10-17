import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type FocusEvent,
} from "react";
import { ArrowRight, Check, CircleAlert, LockKeyhole } from "lucide-react";
import {
  PageIntro,
  PageMeta,
  TextLink,
} from "@/components/marketing/PublicSite";
import {
  CONTACT_RECIPIENTS,
  ENQUIRY_TYPES,
  type EnquiryType,
} from "@shared/contact";

type FormValues = {
  name: string;
  email: string;
  company: string;
  enquiry: EnquiryType;
  role: string;
  deployment: string;
  message: string;
  marketing: boolean;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValue = (value: string | null): EnquiryType =>
  ENQUIRY_TYPES.includes(value as EnquiryType)
    ? (value as EnquiryType)
    : "Demo";

const validateField = (
  key: keyof FormValues,
  value: FormValues[keyof FormValues]
): string | undefined => {
  const text = typeof value === "string" ? value.trim() : "";
  if (key === "name" && text.length < 2)
    return "Enter your name (at least 2 characters).";
  if (key === "name" && text.length > 100)
    return "Name must be 100 characters or fewer.";
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))
    return "Enter a valid work email address.";
  if (key === "email" && text.length > 254)
    return "Email address must be 254 characters or fewer.";
  if (key === "company" && text.length < 2) return "Enter your company name.";
  if (key === "company" && text.length > 160)
    return "Company must be 160 characters or fewer.";
  if (key === "enquiry" && !ENQUIRY_TYPES.includes(text as EnquiryType))
    return "Choose an enquiry type.";
  if (key === "message" && text.length > 2000)
    return "Message must be 2,000 characters or fewer.";
  return undefined;
};

export function DemoPage() {
  const queryType = useMemo(
    () => initialValue(new URLSearchParams(window.location.search).get("type")),
    []
  );
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    enquiry: queryType,
    role: "",
    deployment: "",
    message: "",
    marketing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<
    Partial<Record<keyof FormValues, HTMLElement | null>>
  >({});

  const update = (
    key: keyof FormValues,
    value: FormValues[keyof FormValues]
  ) => {
    setValues(current => ({ ...current, [key]: value }));
    if (errors[key])
      setErrors(current => ({ ...current, [key]: validateField(key, value) }));
    setSubmitted(false);
    setSubmitError(null);
  };

  const onBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const key = event.currentTarget.name as keyof FormValues;
    const error = validateField(key, values[key]);
    setErrors(current => ({ ...current, [key]: error }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors: FormErrors = {};
    (Object.keys(values) as (keyof FormValues)[]).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) nextErrors[key] = error;
    });
    setErrors(nextErrors);
    setShowSummary(Object.keys(nextErrors).length > 0);
    setSubmitted(false);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      } | null;

      if (!response.ok || !payload?.ok) {
        if (payload?.errors) {
          setErrors(payload.errors);
          setShowSummary(true);
          requestAnimationFrame(() => summaryRef.current?.focus());
        }
        throw new Error(
          payload?.error ||
            "We could not send your enquiry. Please try again or email us directly."
        );
      }

      setSubmitted(true);
      setValues({
        name: "",
        email: "",
        company: "",
        enquiry: queryType,
        role: "",
        deployment: "",
        message: "",
        marketing: false,
      });
      requestAnimationFrame(() =>
        document.getElementById("submit-success")?.focus()
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not send your enquiry right now.";
      setSubmitError(message);
      requestAnimationFrame(() =>
        document.getElementById("submit-error")?.focus()
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const errorProps = (key: keyof FormValues, helpId?: string) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby":
      [errors[key] ? `${key}-error` : undefined, helpId]
        .filter(Boolean)
        .join(" ") || undefined,
  });
  const fieldError = (key: keyof FormValues) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        <CircleAlert size={14} />
        {errors[key]}
      </span>
    ) : null;

  return (
    <>
      <PageMeta
        title="Request a demo"
        description="Request a Relyxus demo, Replay pilot, deployment discussion or pricing conversation. Your enquiry is emailed to the Apporine team."
      />
      <PageIntro
        eyebrow="EVALUATE / REQUEST A DEMO"
        title="Tell us what you want to explore."
        summary="Share a little context about your team and we’ll follow up. Pick a demo, Replay pilot, deployment chat or pricing discussion."
        tone="ivory"
      />
      <section className="demo-section section-pad">
        <div className="container demo-layout">
          <aside className="demo-aside">
            <p className="eyebrow">A CONVERSATION WITH CONTEXT</p>
            <h2>Start with the question your team needs answered.</h2>
            <p>
              Choose the enquiry that fits. You can change the selection below.
            </p>
            <div className="demo-agenda">
              <div>
                <span>01</span>
                <div>
                  <strong>Walk through an incident</strong>
                  <small>Inspect evidence and human review.</small>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <strong>Discuss deployment</strong>
                  <small>Review operating and model boundaries.</small>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <strong>Agree an evaluation</strong>
                  <small>Define scope, evidence and misses.</small>
                </div>
              </div>
            </div>
            <div className="demo-privacy-note">
              <LockKeyhole size={17} />
              <p>
                <strong>Your enquiry is emailed to our team.</strong> Messages
                go to {CONTACT_RECIPIENTS.join(" and ")}. Please do not include
                credentials or sensitive incident data.
              </p>
            </div>
            <TextLink href="/deployment">Read deployment guidance</TextLink>
          </aside>
          <div className="demo-form-card">
            <div className="demo-form-heading">
              <span className="eyebrow">ENQUIRY FORM</span>
              <span className="local-preview-chip">TEAM INBOX</span>
            </div>
            <p className="demo-form-subtitle">
              Fields marked <span aria-hidden="true">*</span> are required.
            </p>

            {showSummary && (
              <div
                className="error-summary"
                role="alert"
                tabIndex={-1}
                ref={summaryRef}
              >
                <strong>
                  Please fix the highlighted fields before sending.
                </strong>
                <ul>
                  {Object.entries(errors)
                    .filter(([, message]) => message)
                    .map(([key, message]) => (
                      <li key={key}>
                        <a
                          href={`#${key}`}
                          onClick={event => {
                            event.preventDefault();
                            fieldRefs.current[key as keyof FormValues]?.focus();
                          }}
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {submitted && (
              <div
                className="preview-boundary"
                id="submit-success"
                role="status"
                tabIndex={-1}
              >
                <span className="preview-boundary-icon">
                  <Check size={16} />
                </span>
                <p>
                  <strong>Thanks — your enquiry is on its way.</strong>
                  <span>
                    We’ve emailed the Relyxus team and will follow up from
                    there.
                  </span>
                </p>
              </div>
            )}

            {submitError && (
              <div
                className="error-summary"
                id="submit-error"
                role="alert"
                tabIndex={-1}
              >
                <strong>We couldn’t send that just now.</strong>
                <p>{submitError}</p>
                <p>
                  You can also email{" "}
                  <a href={`mailto:${CONTACT_RECIPIENTS[0]}`}>
                    {CONTACT_RECIPIENTS[0]}
                  </a>{" "}
                  or{" "}
                  <a href={`mailto:${CONTACT_RECIPIENTS[1]}`}>
                    {CONTACT_RECIPIENTS[1]}
                  </a>
                  .
                </p>
              </div>
            )}

            <form
              className="demo-form"
              noValidate
              onSubmit={onSubmit}
              aria-busy={submitting}
            >
              {submitting && (
                <p className="local-progress" role="status">
                  Sending your enquiry…
                </p>
              )}
              <div className="form-grid-two">
                <label className="form-field" htmlFor="name">
                  <span>
                    Name <b>*</b>
                  </span>
                  <input
                    ref={element => {
                      fieldRefs.current.name = element;
                    }}
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={event => update("name", event.target.value)}
                    onBlur={onBlur}
                    maxLength={100}
                    required
                    {...errorProps("name")}
                    placeholder="Your name"
                  />
                  {fieldError("name")}
                </label>
                <label className="form-field" htmlFor="email">
                  <span>
                    Work email <b>*</b>
                  </span>
                  <input
                    ref={element => {
                      fieldRefs.current.email = element;
                    }}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={event => update("email", event.target.value)}
                    onBlur={onBlur}
                    maxLength={254}
                    required
                    {...errorProps("email")}
                    placeholder="you@company.com"
                  />
                  {fieldError("email")}
                </label>
              </div>
              <label className="form-field" htmlFor="company">
                <span>
                  Company <b>*</b>
                </span>
                <input
                  ref={element => {
                    fieldRefs.current.company = element;
                  }}
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={event => update("company", event.target.value)}
                  onBlur={onBlur}
                  maxLength={160}
                  required
                  {...errorProps("company")}
                  placeholder="Company name"
                />
                {fieldError("company")}
              </label>
              <label className="form-field" htmlFor="enquiry">
                <span>
                  What would you like to discuss? <b>*</b>
                </span>
                <select
                  ref={element => {
                    fieldRefs.current.enquiry = element;
                  }}
                  id="enquiry"
                  name="enquiry"
                  value={values.enquiry}
                  onChange={event =>
                    update("enquiry", event.target.value as EnquiryType)
                  }
                  onBlur={onBlur}
                  required
                  {...errorProps("enquiry")}
                >
                  {ENQUIRY_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {fieldError("enquiry")}
              </label>
              <div className="form-grid-two">
                <label className="form-field" htmlFor="role">
                  <span>
                    Your role <small>Optional</small>
                  </span>
                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={event => update("role", event.target.value)}
                  >
                    <option value="">Choose a role</option>
                    <option>Engineering / SRE</option>
                    <option>Security / architecture</option>
                    <option>Resilience / compliance</option>
                    <option>Executive / budget owner</option>
                    <option>Procurement / vendor risk</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="form-field" htmlFor="deployment">
                  <span>
                    Deployment interest <small>Optional</small>
                  </span>
                  <select
                    id="deployment"
                    name="deployment"
                    value={values.deployment}
                    onChange={event => update("deployment", event.target.value)}
                  >
                    <option value="">Not sure yet</option>
                    <option>SaaS</option>
                    <option>Dedicated</option>
                    <option>Self-hosted</option>
                    <option>Air-gapped</option>
                  </select>
                </label>
              </div>
              <label className="form-field" htmlFor="message">
                <span>
                  Anything else we should know? <small>Optional</small>
                </span>
                <textarea
                  ref={element => {
                    fieldRefs.current.message = element;
                  }}
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={values.message}
                  onChange={event => update("message", event.target.value)}
                  onBlur={onBlur}
                  {...errorProps("message", "message-help")}
                  placeholder="Please do not include credentials or sensitive incident data."
                />
                {fieldError("message")}
                <small className="field-help" id="message-help">
                  Do not include credentials, confidential details or sensitive
                  incident data.
                </small>
              </label>
              <label className="consent-option">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={values.marketing}
                  onChange={event => update("marketing", event.target.checked)}
                />
                <span>
                  Send me occasional product and evaluation updates.{" "}
                  <small>Optional and separate from this enquiry.</small>
                </span>
              </label>
              <p className="form-policy-note">
                By sending this form you agree that we may use your details to
                respond to this enquiry. See our{" "}
                <a href="/privacy">privacy notice</a> for more information.
              </p>
              <button
                type="submit"
                className="button button-primary demo-submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send enquiry"}{" "}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
