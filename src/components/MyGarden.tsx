"use client";

import { useState } from "react";
import { Flower, FLOWER_KINDS } from "./paper/Flower";
import { clearGarden, useGarden } from "@/lib/garden";

/** Every flower Emily has earned, planted in rows on the grass. */
export function MyGarden() {
  const garden = useGarden();
  const [asking, setAsking] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 pt-8">
      {/* The yellow sign on the grass above is the visible title of this garden. */}
      <h2 className="sr-only">
        My Garden: {garden.length} {garden.length === 1 ? "flower" : "flowers"}
      </h2>

      {garden.length === 0 ? (
        <p className="paper max-w-md rotate-[1deg] bg-paper px-6 py-4 text-center text-xl font-bold text-ink">
          Play a game to plant your first flower here!
        </p>
      ) : (
        <ul className="flex max-w-4xl flex-wrap items-end justify-center gap-x-1 gap-y-3" aria-label="Flowers in my garden">
          {garden.map((f, i) => (
            <li key={`${f.at}-${i}`} className="sway" style={{ animationDelay: `${(i % 7) * -0.7}s` }}>
              <Flower colors={FLOWER_KINDS[f.kind % FLOWER_KINDS.length]} seed={f.seed} size={i === garden.length - 1 ? 76 : 60} petals={5 + (f.seed % 4)} />
            </li>
          ))}
        </ul>
      )}

      {garden.length > 0 && (
        <div className="mt-2 text-base text-ink">
          {asking ? (
            <span className="inline-flex flex-wrap items-center justify-center gap-3 font-bold">
              Start a new garden?
              <button type="button" className="paper-btn bg-paper px-4 py-2 text-ink" onClick={() => setAsking(false)}>
                No, keep it
              </button>
              <button
                type="button"
                className="paper-btn bg-red px-4 py-2 text-ink"
                onClick={() => {
                  clearGarden();
                  setAsking(false);
                }}
              >
                Yes, start again
              </button>
            </span>
          ) : (
            <button type="button" className="font-bold underline decoration-2 underline-offset-4" onClick={() => setAsking(true)}>
              Start a new garden
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** The garden sign stuck on the grass of the first screen: how many flowers, and a way down to them. */
export function GardenTag({ className = "" }: { className?: string }) {
  const garden = useGarden();
  return (
    <a
      href="#garden"
      className={`paper-btn inline-flex items-center gap-2 whitespace-nowrap bg-yellow px-4 py-2 font-display text-[clamp(1.1rem,3vw,1.6rem)] leading-none text-ink ${className}`}
      style={{ transform: "rotate(-2deg)" }}
    >
      <Flower colors={FLOWER_KINDS[0]} seed={3} petals={6} size={30} />
      My Garden · {garden.length} {garden.length === 1 ? "flower" : "flowers"}
    </a>
  );
}
