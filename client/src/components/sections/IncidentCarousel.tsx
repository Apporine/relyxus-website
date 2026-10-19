import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { carouselNote } from "@/content/home";
import { incidentFiles } from "@/content/incidents";

const SLIDE = 324;

export function IncidentCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: -1 | 1) => {
    track.current?.scrollBy({ left: dir * SLIDE, behavior: "smooth" });
  };

  return (
    <section
      className="section section-canvas on-canvas incident-carousel"
      aria-labelledby="carousel-title"
    >
      <div className="container">
        <header className="carousel-header">
          <h2 id="carousel-title">Where the hours went</h2>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => scroll(-1)}
              aria-label="Previous incidents"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => scroll(1)}
              aria-label="Next incidents"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </header>
        <p className="small muted carousel-note">{carouselNote}</p>
        <ul className="carousel-track" ref={track}>
          {incidentFiles.map(file => (
            <li key={file.slug} className="carousel-card">
              <div className="carousel-card-top">
                <span className="carousel-firm">{file.firm}</span>
                <span className="carousel-date">{file.date}</span>
              </div>
              <h3>
                <Link href={`/resources/incidents/${file.slug}`}>
                  {file.title}
                </Link>
              </h3>
              <p className="small muted">{file.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
