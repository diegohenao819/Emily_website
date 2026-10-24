import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Bud, Flower, PAPER, Stem } from "@/components/paper/Flower";
import { Grass } from "@/components/paper/Grass";
import { PaperTitle } from "@/components/paper/PaperTitle";
import { GardenTag, MyGarden } from "@/components/MyGarden";
import { Butterfly, Cloud, Meadow, Sun, Tape } from "@/components/paper/Decor";

type Door = {
  href: string;
  label: string;
  hint: string;
  face: ReactNode;
  colors: { outer: string; inner: string; center: string };
  tag: string;
  tagText: string;
  stem: string;
  tilt: number;
  seed: number;
};

const DOORS: Door[] = [
  {
    href: "/tables",
    label: "Times Tables",
    hint: "Learn and play from 1 to 10",
    face: <span className="font-display text-[clamp(1.5rem,5vw,2.7rem)] leading-none text-ink">3×4</span>,
    colors: { outer: PAPER.pink, inner: PAPER.orange, center: PAPER.yellow },
    tag: "bg-violet-deep",
    tagText: "text-white",
    stem: "h-[clamp(6.5rem,15vh,10rem)] max-sm:h-[28vh]",
    tilt: -3,
    seed: 4,
  },
  {
    href: "/english",
    label: "English",
    hint: "Listen, find the picture, tell your trip",
    face: <span className="font-display text-[clamp(1.4rem,4.6vw,2.5rem)] leading-none text-ink">ABC</span>,
    colors: { outer: PAPER.turquoise, inner: PAPER.lime, center: PAPER.white },
    tag: "bg-pink-deep",
    tagText: "text-white",
    stem: "h-[clamp(9rem,21vh,12.5rem)] max-sm:h-[36vh]",
    tilt: 2.5,
    seed: 9,
  },
];

function FlowerDoor({ door, delay }: { door: Door; delay: string }) {
  return (
    <Link
      href={door.href}
      className="group relative flex w-[clamp(8.2rem,34vw,18rem)] flex-col items-center outline-none"
      aria-label={`${door.label}. ${door.hint}`}
    >
      <span className="sway relative block transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105" style={{ animationDelay: delay }}>
        <Flower colors={door.colors} seed={door.seed} petals={8} size="100%" className="h-auto w-[clamp(8.2rem,34vw,18rem)]" />
        <span className="absolute inset-0 grid place-items-center">{door.face}</span>
      </span>
      <span
        className={`paper relative z-10 -mt-3 whitespace-nowrap px-[clamp(0.6rem,2vw,1rem)] py-2 text-center font-display text-[clamp(1.05rem,3.4vw,2rem)] leading-tight ${door.tag} ${door.tagText} group-focus-visible:outline-4 group-focus-visible:outline-dashed group-focus-visible:outline-ink`}
        style={{ transform: `rotate(${door.tilt}deg)` }}
      >
        {door.label}
      </span>
      <Stem height={300} leafSide={door.tilt > 0 ? 1 : -1} className={`-mt-2 w-16 ${door.stem}`} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <section className="relative flex min-h-dvh flex-col overflow-hidden">
        <Sun className="sway pointer-events-none absolute -right-6 -top-6 w-[clamp(6rem,16vw,11rem)] sm:right-8 sm:top-6" />
        <Cloud className="pointer-events-none absolute left-[3%] top-[6%] w-[clamp(6rem,14vw,12rem)] opacity-95" />
        <Cloud className="pointer-events-none absolute right-[16%] top-[38%] hidden w-[clamp(5rem,10vw,9rem)] md:block" />
        <Cloud className="pointer-events-none absolute left-[8%] top-[40%] hidden w-[clamp(4rem,8vw,7rem)] lg:block" />
        <Butterfly className="sway pointer-events-none absolute left-[12%] top-[48%] max-sm:left-[8%] max-sm:top-[33%] w-[clamp(2.5rem,6vw,4rem)] rotate-[-12deg]" />
        <Butterfly colors={["#00b3c7", "#9bd423"]} className="sway pointer-events-none absolute right-[10%] top-[56%] w-[clamp(2.2rem,5vw,3.4rem)] rotate-[14deg]" />
        <header className="relative z-10 flex flex-col items-center gap-3 px-4 pt-[clamp(1.5rem,5vh,3.5rem)] text-center">
          <h1 className="flex flex-col items-center gap-2">
            <span className="sr-only">Emily&apos;s Learning Garden</span>
            <PaperTitle text="Emily's" size="xl" />
            <PaperTitle text="Learning Garden" size="lg" offset={3} />
          </h1>
          <p
            className="paper relative mt-2 max-w-[22rem] bg-paper px-5 py-2 text-[clamp(1.1rem,3vw,1.5rem)] font-bold text-balance text-ink sm:max-w-none"
            style={{ transform: "rotate(-1deg)" }}
          >
            <Tape className="-top-3 left-5 rotate-[-8deg]" />
            <Tape className="-top-3 right-5 rotate-[7deg]" />
            Play, learn and watch your garden bloom!
          </p>
        </header>

        <div className="relative z-10 mt-auto flex items-end justify-center gap-[clamp(0.1rem,3vw,5rem)] px-1 pt-8">
          <FlowerDoor door={DOORS[0]} delay="-1.2s" />
          <FlowerDoor door={DOORS[1]} delay="-3.1s" />
          <div className="flex w-[clamp(4.4rem,17vw,11rem)] flex-col items-center" aria-label="More games are coming soon">
            <Bud color={PAPER.violet} size="100%" className="sway h-auto w-[clamp(3.6rem,13vw,8rem)]" />
            <span
              className="paper relative z-10 -mt-1 bg-paper px-3 py-1.5 text-center text-[clamp(0.9rem,2.6vw,1.25rem)] font-bold leading-tight text-ink"
              style={{ transform: "rotate(2deg)" }}
            >
              Coming soon!
            </span>
            <Stem height={300} leafSide={1} className="-mt-1 h-[clamp(4rem,11vh,7rem)] w-12" />
          </div>
        </div>

        <Meadow count={11} className="absolute inset-x-[2%] bottom-10 z-0 max-sm:*:origin-bottom max-sm:*:scale-[0.62] sm:bottom-14" />
        <GardenTag className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 sm:bottom-5" />
        <Grass className="pointer-events-none relative z-20 -mt-8 h-20 w-full sm:-mt-10 sm:h-24" />
      </section>

      <section
        className="relative -mt-px flex-1 bg-grass px-4 pb-16 pt-4"
        style={{ backgroundImage: "var(--grain)" } as CSSProperties}
        id="garden"
        aria-label="My garden"
      >
        <MyGarden />
      </section>
    </div>
  );
}
