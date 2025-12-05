"use client";

import {useMemo, useState} from "react";

interface NormalDistributionGraphProps {
  mu?: number;
  sigma?: number;
}

export const NormalDistributionGraph = ({mu = 0, sigma = 1,}: NormalDistributionGraphProps) => {
  const xMinDomain = -4;
  const xMaxDomain = 4;

  const svgXMin = 60;
  const svgXMax = 540;
  const svgYBase = 260;
  const svgYTop = 40;



  const {pathD, ticks, toSvgX} = useMemo(() => {
    const steps = 200;
    const points: { x: number; y: number }[] = [];
    let maxY = 0;

    for (let i = 0; i <= steps; i++) {
      const x = xMinDomain + ((xMaxDomain - xMinDomain) * i) / steps;
      const y =
          (1 / (sigma * Math.sqrt(2 * Math.PI))) *
          Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));

      if (y > maxY) maxY = y;
      points.push({x, y});
    }

    const toSvgXInner = (x: number) =>
        svgXMin +
        ((x - xMinDomain) / (xMaxDomain - xMinDomain)) * (svgXMax - svgXMin);

    const toSvgYInner = (y: number) =>
        svgYBase - (y / maxY) * (svgYBase - svgYTop);

    const d =
        points
        .map((p, idx) => {
          const X = toSvgXInner(p.x);
          const Y = toSvgYInner(p.y);
          return `${idx === 0 ? "M" : "L"} ${X} ${Y}`;
        })
        .join(" ") + ` L ${svgXMax} ${svgYBase} L ${svgXMin} ${svgYBase} Z`;

    const ticksInner = [-3, -2, -1, 0, 1, 2, 3];

    return {pathD: d, ticks: ticksInner, toSvgX: toSvgXInner};
  }, [mu, sigma]);

  return (
      <div className="rounded-xl border border-default-200 bg-content1 px-6 py-5">
        <p className="mb-1 text-xs text-foreground-600">
          Interaktive Normalverteilung – passe Mittelwert μ und Standardabweichung σ an.
        </p>
        <p className="mb-3 text-[11px] text-foreground-500">
          Aktuell: μ = {mu.toFixed(1)}, σ = {sigma.toFixed(1)}
        </p>

        <svg viewBox="0 0 600 320" className="w-full h-[320px]">

        {/* Plot-Hintergrund */}
          <rect
              x={svgXMin}
              y={svgYTop}
              width={svgXMax - svgXMin}
              height={svgYBase - svgYTop}
              style={{ fill: "var(--nd-graph-bg)" }}
          />

          {/* Kurvenfläche */}
          <path d={pathD} style={{ fill: "var(--nd-graph-fill)" }}/>

          {/* Kurvenlinie */}
          <path
              d={pathD}
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

          {/* Ticks + Beschriftung */}
          {ticks.map((t) => (
              <g key={t}>
                <line
                    x1={toSvgX(t)}
                    y1={svgYBase}
                    x2={toSvgX(t)}
                    y2={svgYBase + (t === 0 ? 10 : 6)}
                    className="stroke-default-400"
                    strokeWidth={t === 0 ? 1.5 : 1}
                />
                <text
                    x={toSvgX(t)}
                    y={svgYBase + 22}
                    textAnchor="middle"
                    style={{ fill: "var(--color-fd-foreground)", fontSize: "10px" }}
                >
                  {t === 0 ? "μ" : t}
                </text>
              </g>
          ))}
        </svg>
      </div>
  );
};