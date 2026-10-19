import { describe, expect, it } from "vitest";
import { buildContactEmail, validateContactPayload } from "../shared/contact";

describe("validateContactPayload", () => {
  it("requires name and company for a demo request", () => {
    const result = validateContactPayload({
      email: "ops@bank.com",
      enquiry: "Demo",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.company).toBeDefined();
    }
  });

  it.each(["Readiness checklist", "Newsletter"])(
    "accepts an email address alone for %s",
    enquiry => {
      const result = validateContactPayload({ email: "ops@bank.com", enquiry });
      expect(result.ok).toBe(true);
    }
  );

  it("still rejects a bad email on email-only forms", () => {
    const result = validateContactPayload({
      email: "not-an-email",
      enquiry: "Newsletter",
    });
    expect(result.ok).toBe(false);
  });

  it("labels missing name and company in the team email", () => {
    const result = validateContactPayload({
      email: "ops@bank.com",
      enquiry: "Readiness checklist",
    });
    if (!result.ok) throw new Error("expected a valid payload");
    const email = buildContactEmail(result.data);
    expect(email.subject).toContain("ops@bank.com");
    expect(email.text).toContain("Name: Not provided");
  });
});
