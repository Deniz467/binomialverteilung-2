export const SigmaGraph = () => {
  const xMin = 40;
  const xMax = 360;
  const yBase = 170;

  const positions = Array.from({ length: 7 }, (_, i) =>
      xMin + (i * (xMax - xMin)) / 6
  );
  const labels = ["-3σ", "-2σ", "-1σ", "μ", "+1σ", "+2σ", "+3σ"];

  return (
      <div className="
      not-prose
      rounded-xl
      border border-default-200
      bg-content1
      px-5
      py-4
      max-w-xl      /* Bild kleiner */
      mx-auto       /* in der Mitte */
      shadow-sm
    ">
        <p className="text-sm text-foreground-600 mb-3">
          Normalverteilung mit markierten 1σ-, 2σ- und 3σ-Bereichen.
        </p>

        <div className="bg-default-50 rounded-lg px-2 py-2"> {/* Neue Box */}
          <svg viewBox="0 0 400 220" className="w-full h-auto">
            {/* 3σ-Bereich */}
            <rect
                x={xMin}
                y={30}
                width={xMax - xMin}
                height={yBase - 30}
                style={{ fill: "var(--(sigma)-3)" }}
            />

            {/* 2σ-Bereich */}
            <rect
                x={positions[1]}
                y={30}
                width={positions[5] - positions[1]}
                height={yBase - 30}
                style={{ fill: "var(--(sigma)-2)" }}
            />

            {/* 1σ-Bereich */}
            <rect
                x={positions[2]}
                y={30}
                width={positions[4] - positions[2]}
                height={yBase - 30}
                style={{ fill: "var(--(sigma)-1)" }}
            />

            {/* Glockenkurve */}
            <path
                d={`M ${xMin} ${yBase} C 140 35 260 35 ${xMax} ${yBase}`}
                style={{
                  stroke: "var(--(sigma)-line)",
                  strokeWidth: 2.5,
                  fill: "none",
                }}
            />

            {/* x-Achse */}
            <line
                x1={xMin}
                y1={yBase}
                x2={xMax}
                y2={yBase}
                style={{
                  stroke: "var(--(sigma)-axis)",
                  strokeWidth: 1,
                }}
            />

            {/* Ticks + Labels */}
            {positions.map((x, idx) => (
                <g key={idx}>
                  <line
                      x1={x}
                      y1={yBase}
                      x2={x}
                      y2={yBase + (idx === 3 ? 10 : 6)}
                      style={{
                        stroke: "var(--(sigma)-axis)",
                        strokeWidth: idx === 3 ? 1.5 : 1,
                      }}
                  />
                  <text
                      x={x}
                      y={yBase + 22}
                      textAnchor="middle"
                      style={{
                        fill: "var(--(sigma)-label)",
                        fontSize: "10px",
                      }}
                  >
                    {labels[idx]}
                  </text>
                </g>
            ))}

            {/* μ oben */}
            <text
                x={positions[3]}
                y={yBase - 12}
                textAnchor="middle"
                style={{
                  fill: "var(--(sigma)-label)",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
            >
              μ
            </text>
          </svg>
        </div>

        {/* Legende */}
        <div className="mt-4 grid gap-2 text-xs text-foreground-700">
          <div className="flex items-center gap-2">
          <span
              className="inline-block h-3 w-3 rounded"
              style={{ backgroundColor: "var(--(sigma)-1)" }}
          />
            <span>≈ 68,3 % in [μ − σ, μ + σ]</span>
          </div>

          <div className="flex items-center gap-2">
          <span
              className="inline-block h-3 w-3 rounded"
              style={{ backgroundColor: "var(--(sigma)-2)" }}
          />
            <span>≈ 95,4 % in [μ − 2σ, μ + 2σ]</span>
          </div>

          <div className="flex items-center gap-2">
          <span
              className="inline-block h-3 w-3 rounded"
              style={{ backgroundColor: "var(--(sigma)-3)" }}
          />
            <span>≈ 99,7 % in [μ − 3σ, μ + 3σ]</span>
          </div>
        </div>
      </div>
  );
};
