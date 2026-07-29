const RUNG_COUNT = 90;
const RUNG_SPACING = 34;
const AMPLITUDE = 26;
const TURNS = 12;

interface Node {
  x: number;
  y: number;
  z: number;
}

function buildStrand(mirrored: boolean): Node[] {
  return Array.from({ length: RUNG_COUNT }, (_, i) => {
    const t = i / (RUNG_COUNT - 1);
    const angle = t * TURNS * Math.PI * 2;
    const sway = Math.sin(angle) * AMPLITUDE;
    return {
      x: 50 + (mirrored ? -sway : sway),
      y: i * RUNG_SPACING,
      z: Math.cos(angle),
    };
  });
}

function pathFrom(nodes: Node[]) {
  return nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x.toFixed(2)} ${n.y}`).join(" ");
}

const STRAND_A = buildStrand(false);
const STRAND_B = buildStrand(true);
const RAIL_HEIGHT = RUNG_COUNT * RUNG_SPACING;
const PATH_A = pathFrom(STRAND_A);
const PATH_B = pathFrom(STRAND_B);

function DnaRail({ side }: { side: "left" | "right" }) {
  return (
    <div className={`dna-rail dna-rail--${side}`} aria-hidden="true">
      <svg
        viewBox={`0 0 100 ${RAIL_HEIGHT}`}
        width={100}
        height={RAIL_HEIGHT}
        className="dna-rail-svg"
      >
        <path d={PATH_A} className="dna-strand dna-strand--gold" />
        <path d={PATH_B} className="dna-strand dna-strand--violet" />
        {STRAND_A.map((n, i) =>
          i % 3 === 0 ? (
            <line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={STRAND_B[i].x}
              y2={STRAND_B[i].y}
              className="dna-rung"
              style={{ opacity: 0.15 + ((n.z + 1) / 2) * 0.35 }}
            />
          ) : null
        )}
      </svg>
    </div>
  );
}

export const DnaBackdrop = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="ambient-glow" />
      <DnaRail side="left" />
      <DnaRail side="right" />
    </div>
  );
};