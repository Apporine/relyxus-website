import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { carouselNote } from "@/content/home";
import { incidentFiles } from "@/content/incidents";

const SLIDE = 340;

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
          <div>
            <h2 id="carousel-title">Where the hours went</h2>
            <p className="carousel-note">{carouselNote}</p>
          </div>
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
        <ul className="carousel-track" ref={track}>
          {incidentFiles.map(file => (
            <li key={file.slug} className="carousel-card">
              <div className="carousel-card-top">
                <img
                  src={file.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="carousel-logo"
                  decoding="async"
                />
                <div className="carousel-card-ids">
                  <span className="carousel-firm">{file.firm}</span>
                  <span className="carousel-date">{file.date}</span>
                </div>
              </div>
              <div className="carousel-card-body">
                <h3>
                  <Link href={`/resources/incidents/${file.slug}`}>
                    {file.title}
                  </Link>
                </h3>
                <p className="carousel-highlight">{file.highlight}</p>
                <p className="carousel-summary">{file.summary}</p>
                <Link
                  href={`/resources/incidents/${file.slug}`}
                  className="carousel-cta"
                >
                  Read the file
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
