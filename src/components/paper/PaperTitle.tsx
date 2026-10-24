const SCRAPS = ["#ff4f9a", "#ffd23f", "#00b3c7", "#ff7a1a", "#8e5cf7", "#9bd423", "#ff4757"];
// Light papers need dark letters; dark papers get white ones.
const LIGHT = new Set(["#ffd23f", "#9bd423", "#00b3c7", "#ff7a1a"]);

type Props = {
  text: string;
  size?: "xl" | "lg" | "md";
  offset?: number;
  className?: string;
};

/** Each letter is cut from its own scrap of paper and glued on a little crooked. */
export function PaperTitle({ text, size = "xl", offset = 0, className = "" }: Props) {
  const sizes = {
    xl: "text-[clamp(2.6rem,9vw,5.6rem)] px-[0.12em] pt-[0.02em] pb-[0.06em]",
    lg: "text-[clamp(2rem,6vw,3.6rem)] px-[0.14em] pb-[0.05em]",
    md: "text-[clamp(1.6rem,4.5vw,2.4rem)] px-[0.16em] pb-[0.04em]",
  } as const;
  let n = offset;
  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-x-[0.06em] gap-y-[0.12em] ${className}`} aria-hidden>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap mx-[0.28em]">
          {word.split("").map((ch, ci) => {
            const i = n++;
            const color = SCRAPS[i % SCRAPS.length];
            const tilt = ((i * 37) % 11) - 5;
            const lift = ((i * 13) % 5) - 2;
            return (
              <span
                key={ci}
                className={`paper inline-block font-display leading-none ${sizes[size]}`}
                style={{
                  backgroundColor: color,
                  color: LIGHT.has(color) ? "#1d2152" : "#ffffff",
                  transform: `rotate(${tilt}deg) translateY(${lift}px)`,
                  borderRadius: `${8 + (i % 3) * 3}px ${12 - (i % 4)}px ${7 + (i % 5)}px ${13 - (i % 3) * 2}px`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
