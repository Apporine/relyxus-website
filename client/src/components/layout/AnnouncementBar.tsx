import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { announcement } from "@/content/home";

export function AnnouncementBar() {
  return (
    <div className="announce on-canvas" role="region" aria-label="Announcement">
      <div className="container announce-inner">
        <p>
          {announcement.text}{" "}
          <Link href={announcement.href} className="announce-link">
            {announcement.linkLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </div>
  );
}
