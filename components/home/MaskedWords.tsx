"use client";

import { Fragment } from "react";

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
        // Tách space đuôi ra khỏi span animate: space nằm cuối một
        // inline-block luôn bị CSS nuốt (line-box trailing whitespace),
        // nên phải trả nó về text node của container cha.
        const word = seg.text.replace(/\s+$/, "");
        const hasTrailingSpace = word.length !== seg.text.length;
        return (
          <Fragment key={i}>
            <span
              className={`hero-word inline-block ${seg.isAccent ? "text-orange-400" : ""}`}
              style={{ animationDelay: `${delayBase + idx * 15}ms` }}
            >
              {word}
            </span>
            {hasTrailingSpace ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
