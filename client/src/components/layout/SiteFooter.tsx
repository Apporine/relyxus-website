import { Link } from "wouter";
import {
  APPORINE_URL,
  companyDetails,
  footerColumns,
  legalLinks,
} from "@/content/site";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark />
            <p className="small muted">
              A product by{" "}
              <a href={APPORINE_URL} rel="noreferrer">
                Apporine
              </a>
            </p>
            <EmailCapture
              enquiry="Newsletter"
              label="One useful email a month: regulatory updates and an incident write-up."
              button="Subscribe"
              done={
                <p className="small">
                  Thanks. The next one is on its way to you.
                </p>
              }
              compact
            />
          </div>
          <nav className="footer-columns" aria-label="Footer">
            {footerColumns.map(column => (
              <div key={column.label}>
                <p className="footer-heading">{column.label}</p>
                <ul>
                  {column.items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                  {column.label === "Company" && companyDetails.linkedin && (
                    <li>
                      <a href={companyDetails.linkedin} rel="noreferrer">
                        LinkedIn
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Apporine. All rights reserved.
            {companyDetails.registration && ` ${companyDetails.registration}.`}
            {companyDetails.location && ` ${companyDetails.location}.`}
          </p>
          <ul>
            {legalLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
