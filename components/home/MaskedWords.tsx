"use client";

export interface MaskedSegment {
  text: string;
  isAccent?: boolean;
}

interface MaskedWordsProps {
  segments: MaskedSegment[];
  className?: string;
  delayBase?: number;
}

export function MaskedWords({ segments, className = "", delayBase = 0 }: MaskedWordsProps) {
  let wordIndex = 0;

  return (
    <span className={`inline-block overflow-hidden pb-[0.12em] align-bottom ${className}`}>
      {segments.map((seg, i) => {
        if (seg.text === "\n") {
          return <br key={i} />;
        }
        const idx = wordIndex++;
        return (
          <span
            key={i}
            className={`hero-word inline-block ${seg.isAccent ? "text-orange-400" : ""}`}
            style={{ animationDelay: `${delayBase + idx * 15}ms` }}
          >
            {seg.text}
          </span>
        );
      })}
    </span>
  );
}
