import { useId, type CSSProperties } from "react";

export type FlowerColors = {
  outer: string;
  inner: string;
  center: string;
  dots?: string;
};

export const PAPER = {
  pink: "#ff4f9a",
  turquoise: "#00b3c7",
  lime: "#9bd423",
  orange: "#ff7a1a",
  violet: "#8e5cf7",
  yellow: "#ffd23f",
  red: "#ff4757",
  white: "#fffaf0",
  sky: "#6fd0ff",
  peach: "#ffb08a",
  lilac: "#c9a8ff",
  mint: "#7fe0b8",
} as const;

/** The flower recipes Emily can earn. Each one is a different mix of paper. */
export const FLOWER_KINDS: FlowerColors[] = [
  { outer: PAPER.pink, inner: PAPER.yellow, center: PAPER.orange, dots: PAPER.white },
  { outer: PAPER.violet, inner: PAPER.lilac, center: PAPER.yellow },
  { outer: PAPER.orange, inner: PAPER.yellow, center: PAPER.red, dots: PAPER.yellow },
  { outer: PAPER.turquoise, inner: PAPER.white, center: PAPER.pink },
  { outer: PAPER.red, inner: PAPER.pink, center: PAPER.yellow, dots: PAPER.orange },
  { outer: PAPER.yellow, inner: PAPER.orange, center: PAPER.violet, dots: PAPER.yellow },
  { outer: PAPER.lilac, inner: PAPER.pink, center: PAPER.turquoise },
  { outer: PAPER.white, inner: PAPER.yellow, center: PAPER.orange, dots: PAPER.red },
  { outer: PAPER.mint, inner: PAPER.turquoise, center: PAPER.yellow },
  { outer: PAPER.peach, inner: PAPER.red, center: PAPER.yellow, dots: PAPER.white },
];

function rng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** A petal cut with scissors: a soft teardrop with a slightly uneven tip. */
function petalPath(length: number, width: number, wobble: number) {
  const l = length;
  const w = width;
  return `M0 0 C ${w * 0.9} ${-l * 0.18} ${w * (1 + wobble)} ${-l * 0.78} ${w * 0.12} ${-l}
          C ${-w * 0.25} ${-l * (1.02 + wobble * 0.1)} ${-w * (1 - wobble)} ${-l * 0.8} ${-w * 0.9} ${-l * 0.2} Z`;
}

function PaperFilters({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-paper`} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise" />
        <feColorMatrix
          in="noise"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0.1  0 0 0 0.16 0"
          result="grain"
        />
        <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainIn" />
        <feDropShadow in="SourceGraphic" dx="0" dy="2.5" stdDeviation="2.2" floodColor="#1d2152" floodOpacity="0.28" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="grainIn" />
        </feMerge>
      </filter>
    </defs>
  );
}

type FlowerProps = {
  colors: FlowerColors;
  petals?: number;
  seed?: number;
  size?: number | string;
  className?: string;
  title?: string;
};

/** A flower head made of three layers of cut paper glued on top of each other. */
export function Flower({ colors, petals = 7, seed = 1, size = 120, className, title }: FlowerProps) {
  const id = useId().replace(/:/g, "");
  const r = rng(seed);
  const outer = Array.from({ length: petals }, (_, i) => ({
    angle: (360 / petals) * i + (r() - 0.5) * 10,
    len: 46 + r() * 5,
    w: 17 + r() * 4,
    wob: (r() - 0.5) * 0.25,
  }));
  const innerCount = Math.max(5, petals - 1);
  const inner = Array.from({ length: innerCount }, (_, i) => ({
    angle: (360 / innerCount) * i + 360 / innerCount / 2 + (r() - 0.5) * 12,
    len: 30 + r() * 4,
    w: 12 + r() * 3,
    wob: (r() - 0.5) * 0.3,
  }));
  const dots = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 6 + r();
    const d = 6 + r() * 4;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  });

  return (
    <svg
      viewBox="-60 -60 120 120"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <PaperFilters id={id} />
      <g filter={`url(#${id}-paper)`}>
        {outer.map((p, i) => (
          <path key={`o${i}`} d={petalPath(p.len, p.w, p.wob)} fill={colors.outer} transform={`rotate(${p.angle})`} />
        ))}
      </g>
      <g filter={`url(#${id}-paper)`}>
        {inner.map((p, i) => (
          <path key={`i${i}`} d={petalPath(p.len, p.w, p.wob)} fill={colors.inner} transform={`rotate(${p.angle})`} />
        ))}
      </g>
      <g filter={`url(#${id}-paper)`}>
        <path
          d="M0 -15 C 9 -15 15 -9 15 0 C 15.5 9 8 15.5 0 15 C -9 15 -15 8.5 -14.5 0 C -15 -9 -8.5 -15.5 0 -15 Z"
          fill={colors.center}
        />
      </g>
      {colors.dots &&
        dots.map((d, i) => <circle key={`d${i}`} cx={d.x} cy={d.y} r={1.9} fill={colors.dots} opacity={0.9} />)}
    </svg>
  );
}

/** A closed paper bud: something that has not bloomed yet. */
export function Bud({ color, size = 80, className }: { color: string; size?: number | string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="-40 -60 80 80" width={size} height={size} className={className} aria-hidden>
      <PaperFilters id={id} />
      <g filter={`url(#${id}-paper)`}>
        <path d="M0 15 C -22 8 -24 -22 -10 -44 C -6 -30 -2 -26 0 -26 Z" fill={color} />
        <path d="M0 15 C 22 8 24 -22 10 -44 C 6 -30 2 -26 0 -26 Z" fill={color} />
      </g>
      <g filter={`url(#${id}-paper)`}>
        <path d="M0 16 C -12 10 -12 -18 0 -38 C 12 -18 12 10 0 16 Z" fill={color} style={{ filter: "brightness(1.12)" }} />
      </g>
      <g filter={`url(#${id}-paper)`}>
        <path d="M-17 10 C -12 0 -6 -2 0 4 C 6 -2 12 0 17 10 C 8 18 -8 18 -17 10 Z" fill="#4cbf45" />
      </g>
    </svg>
  );
}

/** A paper stem strip with two leaves, for flowers that grow out of the grass. */
export function Stem({
  height,
  leafSide = 1,
  className,
  style,
}: {
  height: number;
  leafSide?: 1 | -1;
  className?: string;
  style?: CSSProperties;
}) {
  const id = useId().replace(/:/g, "");
  const h = height;
  return (
    <svg viewBox={`-50 0 100 ${h}`} width={100} height={h} className={className} aria-hidden style={{ overflow: "visible", ...style }}>
      <PaperFilters id={id} />
      <g filter={`url(#${id}-paper)`}>
        <path d={`M-5 0 C -2 ${h * 0.35} -8 ${h * 0.7} -4 ${h} L 6 ${h} C 2 ${h * 0.7} 8 ${h * 0.35} 5 0 Z`} fill="#2f9a35" />
      </g>
      <g filter={`url(#${id}-paper)`}>
        <path
          d={`M0 ${h * 0.55} C ${leafSide * 18} ${h * 0.4} ${leafSide * 40} ${h * 0.42} ${leafSide * 46} ${h * 0.3} C ${leafSide * 36} ${h * 0.55} ${leafSide * 16} ${h * 0.6} 0 ${h * 0.58} Z`}
          fill="#4cbf45"
        />
        <path
          d={`M0 ${h * 0.78} C ${-leafSide * 16} ${h * 0.64} ${-leafSide * 34} ${h * 0.66} ${-leafSide * 42} ${h * 0.56} C ${-leafSide * 32} ${h * 0.78} ${-leafSide * 14} ${h * 0.82} 0 ${h * 0.8} Z`}
          fill="#8fdc4f"
        />
      </g>
    </svg>
  );
}
