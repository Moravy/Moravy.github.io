import { COHORT } from "@/lib/metrics";

// Anonymized domain-cohort standing, shown as typographic figures (no chart).
// Each row: the achievement, then its rank and percentile within the 38-engineer
// field. #1 rows are emphasized in terracotta. Server component.
export default function CohortStanding() {
  return (
    <figure className="ranks" data-reveal>
      <p className="ranks-headline">
        <span className="ranks-headline-fig">{COHORT.headline.fig}</span> {COHORT.headline.rest}
      </p>
      <p className="ranks-head">{COHORT.head}</p>
      <ul className="ranks-list" role="list">
        {COHORT.rows.map((r) => (
          <li className="rank-row" key={r.label}>
            <span className="rank-label">{r.label}</span>
            <span className="rank-lead" aria-hidden="true" />
            <span className="rank-pos" data-top={r.top || undefined}>
              {r.pos}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="ranks-note">{COHORT.note}</figcaption>
    </figure>
  );
}
