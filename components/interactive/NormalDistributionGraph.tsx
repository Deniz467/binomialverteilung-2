"use client";

import { useMemo } from "react";

interface NormalDistributionGraphProps {
  mu?: number;
  sigma?: number;
  sigmaMinForScale?: number;
}

export const NormalDistributionGraph = ({
  mu = 0,
  sigma = 1,
  sigmaMinForScale = 0.5,
}: NormalDistributionGraphProps) => {
  const svgXMin = 60;
  const svgXMax = 540;
  const svgYBase = 260;
  const svgYTop = 40;

  const { areaD, curveD, ticks, toSvgX } = useMemo(() => {
    const steps = 240;


    const xMinDomain = mu - 4 * sigma;
    const xMaxDomain = mu + 4 * sigma;

    const pdf = (x: number) =>
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));

    const yMaxRef = 1 / (sigmaMinForScale * Math.sqrt(2 * Math.PI));

    const toSvgXInner = (x: number) =>
      svgXMin +
      ((x - xMinDomain) / (xMaxDomain - xMinDomain)) * (svgXMax - svgXMin);

    const toSvgYInner = (y: number) => {
      const t = y / yMaxRef;
      const Y = svgYBase - t * (svgYBase - svgYTop);
      return Math.max(svgYTop, Math.min(svgYBase, Y));
    };

    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMinDomain + ((xMaxDomain - xMinDomain) * i) / steps;
      pts.push({ x, y: pdf(x) });
    }

    const curve = pts
      .map((p, idx) => {
        const X = toSvgXInner(p.x);
        const Y = toSvgYInner(p.y);
        return `${idx === 0 ? "M" : "L"} ${X} ${Y}`;
      })
      .join(" ");

    const area =
      curve + ` L ${svgXMax} ${svgYBase} L ${svgXMin} ${svgYBase} Z`;

    const tStart = Math.ceil(xMinDomain);
    const tEnd = Math.floor(xMaxDomain);
    const ticksInner = Array.from({ length: Math.max(0, tEnd - tStart + 1) }, (_, k) => tStart + k);

    return { areaD: area, curveD: curve, ticks: ticksInner, toSvgX: toSvgXInner };
  }, [mu, sigma, sigmaMinForScale]);

  return (
    <div className="rounded-xl border border-default-200 bg-content1 px-6 py-5">
      <p className="mb-1 text-xs text-foreground-600">
        Interaktive Normalverteilung – passe Mittelwert μ und Standardabweichung σ an.
      </p>
      <p className="mb-3 text-[11px] text-foreground-500">
        Aktuell: μ = {mu.toFixed(1)}, σ = {sigma.toFixed(1)}
      </p>

      <svg viewBox="0 0 600 320" className="w-full h-[320px]">
        <rect
          x={svgXMin}
          y={svgYTop}
          width={svgXMax - svgXMin}
          height={svgYBase - svgYTop}
          style={{ fill: "var(--nd-graph-bg)" }}
        />

        {/* Fläche */}
        <path d={areaD} style={{ fill: "var(--nd-graph-fill)" }} />

        {/* Linie (nur Kurve) */}
        <path
          d={curveD}
          style={{ stroke: "var(--nd-graph-line)", strokeWidth: 2.5, fill: "none" }}
        />

        {/* x-Achse */}
        <line
          x1={svgXMin}
          y1={svgYBase}
          x2={svgXMax}
          y2={svgYBase}
          style={{ stroke: "var(--nd-graph-axis)", strokeWidth: 1 }}
        />

        {/* Hilfslinie bei μ */}
        <line
          x1={toSvgX(mu)}
          y1={svgYBase}
          x2={toSvgX(mu)}
          y2={svgYTop}
          style={{
            stroke: "var(--nd-graph-line)",
            strokeWidth: 1,
            strokeDasharray: "4 4",
          }}
        />

        {/* μ Label an der richtigen Stelle */}
        <text
          x={toSvgX(mu)}
          y={svgYBase + 22}
          textAnchor="middle"
          style={{ fill: "var(--color-fd-foreground)", fontSize: "10px" }}
        >
          μ
        </text>

        {/* Ticks */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={toSvgX(t)}
              y1={svgYBase}
              x2={toSvgX(t)}
              y2={svgYBase + 6}
              className="stroke-default-400"
              strokeWidth={1}
            />
            <text
              x={toSvgX(t)}
              y={svgYBase + 34}
              textAnchor="middle"
              style={{ fill: "var(--color-fd-foreground)", fontSize: "10px" }}
            >
              {t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};