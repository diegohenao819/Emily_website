function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** An irregular torn edge from left to right, closed down to the bottom of the strip. */
function tornPath(seed: number, base: number, rough: number) {
  const r = rng(seed);
  let x = 0;
  let d = `M0 ${base}`;
  while (x < 800) {
    x = Math.min(800, x + 6 + r() * 22);
    const y = base + (r() - 0.5) * rough + (r() > 0.85 ? -rough * 0.6 : 0);
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d} L800 140 L0 140 Z`;
}

const BACK = tornPath(7, 30, 26);
const FRONT = tornPath(19, 54, 22);

/** Two strips of green construction paper torn by hand; the torn edge shows the pale paper core. */
export function Grass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 140" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <filter id="grass-paper" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="n" />
          <feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0.1  0 0 0 0 0  0 0 0 0.2 0" result="g" />
          <feComposite in="g" in2="SourceGraphic" operator="in" result="gi" />
          <feDropShadow in="SourceGraphic" dx="0" dy="-2" stdDeviation="3" floodColor="#1d2152" floodOpacity="0.22" result="s" />
          <feMerge>
            <feMergeNode in="s" />
            <feMergeNode in="gi" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#grass-paper)">
        <path d={BACK} fill="#eef9dc" transform="translate(0 -3)" />
        <path d={BACK} fill="#8fdc4f" />
      </g>
      <g filter="url(#grass-paper)">
        <path d={FRONT} fill="#e4f6d0" transform="translate(0 -3.5)" />
        <path d={FRONT} fill="#4cbf45" />
      </g>
    </svg>
  );
}
