import { Flower, FLOWER_KINDS, Stem } from "./Flower";

const shadow = "drop-shadow(0 3px 2px rgba(29,33,82,0.16)) drop-shadow(0 10px 12px rgba(29,33,82,0.14))";

/** A cloud cut from white paper. */
export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} aria-hidden style={{ filter: shadow }}>
      <path
        d="M22 78 C 4 78 2 52 22 50 C 18 30 44 20 58 34 C 64 8 104 4 114 30 C 126 14 156 20 154 44 C 178 40 192 62 176 78 Z"
        fill="#fffaf0"
      />
    </svg>
  );
}

/** A paper sun with zig-zag scissor-cut rays. */
export function Sun({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden style={{ filter: shadow }}>
      {rays.map((a) => (
        <path key={a} d="M-7 -36 L0 -56 L7 -36 Z" fill="#ff7a1a" transform={`rotate(${a})`} />
      ))}
      <circle r="38" fill="#ffd23f" />
      <circle r="27" fill="#ffe680" />
    </svg>
  );
}

/** A butterfly: four wing shapes and a little body, glued with the wings slightly open. */
export function Butterfly({ className = "", colors = ["#ff4f9a", "#ffd23f"] }: { className?: string; colors?: [string, string] }) {
  return (
    <svg viewBox="-40 -34 80 64" className={className} aria-hidden style={{ filter: shadow }}>
      <path d="M-2 -2 C -18 -34 -40 -30 -36 -10 C -34 2 -16 4 -2 -2 Z" fill={colors[0]} />
      <path d="M2 -2 C 18 -34 40 -30 36 -10 C 34 2 16 4 2 -2 Z" fill={colors[0]} />
      <path d="M-2 2 C -14 6 -30 14 -24 26 C -18 32 -6 20 -2 2 Z" fill={colors[1]} />
      <path d="M2 2 C 14 6 30 14 24 26 C 18 32 6 20 2 2 Z" fill={colors[1]} />
      <circle cx="-22" cy="-14" r="5" fill="#fffaf0" opacity="0.85" />
      <circle cx="22" cy="-14" r="5" fill="#fffaf0" opacity="0.85" />
      <rect x="-3" y="-16" width="6" height="34" rx="3" fill="#1d2152" />
      <path d="M-1 -15 C -4 -24 -8 -28 -12 -29 M1 -15 C 4 -24 8 -28 12 -29" stroke="#1d2152" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Little flowers that grow along the grass between the big ones. */
export function Meadow({ count = 9, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none flex items-end justify-between ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const h = 40 + ((i * 29) % 46);
        const size = 34 + ((i * 17) % 22);
        return (
          <div key={i} className="sway flex flex-col items-center" style={{ animationDelay: `${-i * 0.9}s` }}>
            <Flower colors={FLOWER_KINDS[(i * 3) % FLOWER_KINDS.length]} seed={i * 13 + 5} petals={5 + (i % 4)} size={size} />
            <Stem height={300} leafSide={i % 2 ? 1 : -1} className="-mt-1 w-6" style={{ height: h }} />
          </div>
        );
      })}
    </div>
  );
}

/** A strip of masking tape holding a paper sign to the wall. */
export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block h-5 w-16 ${className}`}
      style={{
        backgroundColor: "rgba(255, 244, 196, 0.78)",
        backgroundImage: "var(--grain)",
        boxShadow: "0 1px 2px rgba(29,33,82,0.18)",
        clipPath: "polygon(0 8%, 6% 0, 12% 10%, 100% 0, 96% 50%, 100% 100%, 8% 92%, 0 100%, 4% 50%)",
      }}
    />
  );
}
