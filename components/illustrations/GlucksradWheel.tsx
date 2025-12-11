import type { SVGProps } from "react";

export function GlucksradWheel(props: SVGProps<SVGSVGElement>) {
  return (
      <svg
          viewBox="-110 -110 220 220"
          aria-hidden="true"
          {...props}
      >
        <circle
            cx="0"
            cy="0"
            r="100"
            fill="var(--color-fd-card)"
            stroke="var(--color-fd-border)"
            strokeWidth="4"
        />

        <g stroke="var(--color-fd-border)" strokeWidth="2">
          <line x1="0" y1="0" x2="100.0" y2="-0.0" />
          <line x1="0" y1="0" x2="80.9" y2="-58.8" />
          <line x1="0" y1="0" x2="30.9" y2="-95.1" />
          <line x1="0" y1="0" x2="-30.9" y2="-95.1" />
          <line x1="0" y1="0" x2="-80.9" y2="-58.8" />
          <line x1="0" y1="0" x2="-100.0" y2="-0.0" />
          <line x1="0" y1="0" x2="-80.9" y2="58.8" />
          <line x1="0" y1="0" x2="-30.9" y2="95.1" />
          <line x1="0" y1="0" x2="30.9" y2="95.1" />
          <line x1="0" y1="0" x2="80.9" y2="58.8" />
        </g>

        <g
            fill="var(--color-fd-foreground)"
            fontSize="20"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        >
          <text x="61.8" y="-20.1">7</text>
          <text x="38.2" y="-52.6">0</text>
          <text x="0.0" y="-65.0">9</text>
          <text x="-38.2" y="-52.6">2</text>
          <text x="-61.8" y="-20.1">5</text>
          <text x="-61.8" y="20.1">6</text>
          <text x="-38.2" y="52.6">3</text>
          <text x="0.0" y="65.0">8</text>
          <text x="38.2" y="52.6">1</text>
          <text x="61.8" y="20.1">4</text>
        </g>

        <circle cx="0" cy="0" r="4" fill="var(--color-green-600)" />
      </svg>
  );
}
