"use client";

import Link from "next/link";
import { Home, Volume2 } from "lucide-react";
import { type ReactNode, type CSSProperties } from "react";
import { Flower, FLOWER_KINDS } from "./paper/Flower";
import { Grass } from "./paper/Grass";
import { PaperTitle } from "./paper/PaperTitle";
import { Meadow } from "./paper/Decor";
import { speak } from "@/lib/speech";

/** Frame for every activity: a Home tab, the screen's title, the grass at the bottom. */
export function ActivityShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-3 px-4 pt-4 sm:px-8 sm:pt-6">
        <Link
          href="/"
          className="paper-btn inline-flex items-center gap-2 bg-paper px-4 py-2.5 text-lg font-bold text-ink"
          style={{ "--tilt-hover": "-2deg" } as CSSProperties}
        >
          <Home aria-hidden className="size-6" strokeWidth={2.6} />
          Home
        </Link>
        <h1 className="flex-1 text-center sm:text-left">
          <span className="sr-only">{title}</span>
          <PaperTitle text={title} size="md" offset={title.length} />
        </h1>
      </header>
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-40 pt-6 sm:px-8">
        {children}
      </main>
      <Meadow count={14} className="absolute inset-x-2 bottom-14 sm:inset-x-6 sm:bottom-16" />
      <Grass className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-32" />
    </div>
  );
}

type Tone = "pink" | "turquoise" | "orange" | "violet" | "yellow" | "lime" | "paper";

const TONES: Record<Tone, string> = {
  pink: "bg-pink text-ink",
  turquoise: "bg-turquoise-deep text-white",
  orange: "bg-orange-deep text-white",
  violet: "bg-violet-deep text-white",
  yellow: "bg-yellow text-ink",
  lime: "bg-lime text-ink",
  paper: "bg-paper text-ink",
};

export function PaperButton({
  tone = "pink",
  className = "",
  tilt = 0,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; tilt?: number }) {
  return (
    <button
      type="button"
      {...props}
      className={`paper-btn inline-flex min-h-14 items-center justify-center gap-2.5 px-6 py-3 text-xl font-bold ${TONES[tone]} ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...props.style }}
    />
  );
}

export function SpeakButton({ text, label = "Listen", className = "" }: { text: string; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      className={`paper-btn inline-flex min-h-14 items-center gap-2 bg-turquoise-deep px-5 py-3 text-xl font-bold text-white ${className}`}
    >
      <Volume2 aria-hidden className="size-7" strokeWidth={2.6} />
      {label}
    </button>
  );
}

export type CellState = "todo" | "right" | "oops";

/** Fixed cells: a full flower is a right answer, a leaf is still learning, a dashed bud is to do. */
export function ProgressCells({ cells, current }: { cells: CellState[]; current: number }) {
  const right = cells.filter((c) => c === "right").length;
  return (
    <div className="flex flex-col items-center gap-2">
      <ol className="flex flex-wrap justify-center gap-1.5 sm:gap-2" aria-label={`${right} right out of ${cells.length}`}>
        {cells.map((c, i) => (
          <li
            key={i}
            className={`grid size-9 place-items-center sm:size-11 ${i === current && c === "todo" ? "scale-110" : ""}`}
            aria-hidden
          >
            {c === "right" ? (
              <Flower colors={FLOWER_KINDS[i % FLOWER_KINDS.length]} seed={i + 3} size="100%" petals={6} className="glue-in" />
            ) : c === "oops" ? (
              <svg viewBox="-20 -20 40 40" className="size-[80%]">
                <path d="M-12 12 C -14 -4 -2 -14 14 -14 C 14 2 4 14 -12 12 Z" fill="#8fdc4f" />
                <path d="M-12 12 L 8 -8" stroke="#2f9a35" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            ) : (
              <span
                className={`block size-[70%] rounded-full border-[3px] border-dashed ${i === current ? "border-ink bg-paper/70" : "border-ink/35"}`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Paper petals falling from the top of the screen. Re-mount with a new key to throw again. */
export function PetalRain({ count = 28 }: { count?: number }) {
  const colors = ["#ff4f9a", "#ffd23f", "#00b3c7", "#ff7a1a", "#8e5cf7", "#9bd423", "#ff4757"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100;
        const style = {
          left: `${left}%`,
          top: 0,
          "--drift": `${((i * 53) % 120) - 60}px`,
          "--spin": `${360 + ((i * 97) % 540)}deg`,
          "--dur": `${2.2 + ((i * 7) % 10) / 8}s`,
          "--delay": `${((i * 11) % 9) / 14}s`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="-10 -16 20 20" className="petal-fall absolute size-6 sm:size-8" style={style}>
            <path d="M0 0 C 8 -3 8 -12 0 -16 C -8 -12 -8 -3 0 0 Z" fill={colors[i % colors.length]} />
          </svg>
        );
      })}
    </div>
  );
}

/** The end of a game: a new flower is glued into Emily's garden. */
export function FlowerReward({
  kind,
  seed,
  right,
  total,
  onAgain,
  againLabel = "Play again",
  children,
}: {
  kind: number;
  seed: number;
  right: number;
  total: number;
  onAgain: () => void;
  againLabel?: string;
  children?: ReactNode;
}) {
  const message =
    right === total ? "Perfect! Wow, Emily!" : right >= total * 0.7 ? "Great job, Emily!" : right >= total * 0.4 ? "Good work, Emily!" : "Nice try, Emily!";
  return (
    <section className="flex flex-col items-center gap-6 text-center" aria-live="polite">
      <PetalRain />
      <div className="relative">
        <Flower colors={FLOWER_KINDS[kind % FLOWER_KINDS.length]} seed={seed} size={200} petals={8} className="glue-in" title="Your new flower" />
      </div>
      <h2 className="font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-tight text-ink">{message}</h2>
      <p className="paper bg-paper px-6 py-3 text-2xl font-bold">
        {right} out of {total} right · a new flower for your garden!
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <PaperButton tone="pink" onClick={onAgain} tilt={-1.5}>
          {againLabel}
        </PaperButton>
        <Link href="/" className="paper-btn inline-flex min-h-14 items-center gap-2 bg-lime px-6 py-3 text-xl font-bold text-ink" style={{ transform: "rotate(1.5deg)" }}>
          See my garden
        </Link>
      </div>
      {children}
    </section>
  );
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
