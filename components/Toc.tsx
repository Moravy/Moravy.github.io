"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";

// Sticky table of contents for an essay. Highlights the section you're reading.
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const heads = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!heads.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -68% 0px", threshold: 0 }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <aside className="toc" aria-label="Table of contents">
      <p className="toc-label">Contents</p>
      <nav>
        <ol className="toc-list">
          {items.map((item) => (
            <li key={item.id} className={`toc-item toc-l${item.level}`}>
              <a href={`#${item.id}`} data-active={item.id === active || undefined}>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
