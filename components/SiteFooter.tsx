import { SOCIAL, FOOTER_LINE } from "@/lib/profile";

// One footer for every page so the link set + tagline can never drift apart.
// `fine` is the optional small print under the links (home uses the longer,
// ask-aware line; subpages get a short credit).
export default function SiteFooter({ fine }: { fine?: string }) {
  return (
    <footer className="footer">
      <p className="foot-line" data-reveal>
        {FOOTER_LINE}
      </p>
      <div className="foot-links">
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={`mailto:${SOCIAL.email}`}>Email</a>
        <a href={SOCIAL.resume} target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
      </div>
      {fine ? <p className="foot-fine">{fine}</p> : null}
    </footer>
  );
}
