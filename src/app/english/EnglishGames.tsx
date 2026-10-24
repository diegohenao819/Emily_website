"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { Flower, FLOWER_KINDS } from "@/components/paper/Flower";
import { Tape } from "@/components/paper/Decor";
import { FlowerReward, PaperButton, ProgressCells, shuffle, type CellState } from "@/components/ui";
import { earnFlower } from "@/lib/garden";
import { speak } from "@/lib/speech";
import { TOPICS, TRIP, type Topic, type Word } from "./words";

type Screen = { name: "menu" } | { name: "topics"; game: "listen" | "cards" } | { name: "listen" | "cards"; topic: Topic } | { name: "trip" };

function Sticker({ name, className = "" }: { name: string; className?: string }) {
  return <Image src={`/pictures/${name}.svg`} alt="" width={256} height={256} loading="eager" className={`sticker ${className}`} />;
}

/** A paper loudspeaker with two sound waves, glued in the middle of a flower. */
function PaperSpeaker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden style={{ filter: "drop-shadow(0 2px 2px rgba(29,33,82,.25))" }}>
      <path d="M6 18 H16 L30 6 V44 L16 32 H6 Z" fill="#1d2152" />
      <path d="M36 15 C 42 20 42 30 36 35 L 39 38 C 47 31 47 19 39 12 Z" fill="#ff4f9a" />
      <path d="M43 8 C 54 17 54 33 43 42 L 46 45 C 59 35 59 15 46 5 Z" fill="#8e5cf7" />
    </svg>
  );
}

/** A sailboat cut from paper, riding two strips of torn-paper sea. */
function PaperBoat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden style={{ filter: "drop-shadow(0 3px 2px rgba(29,33,82,.2)) drop-shadow(0 10px 12px rgba(29,33,82,.18))" }}>
      <path d="M100 12 L100 108 L36 108 C 60 80 84 44 100 12 Z" fill="#fffaf0" />
      <path d="M106 26 L106 108 L160 108 C 146 82 128 52 106 26 Z" fill="#ffd23f" />
      <rect x="99" y="8" width="7" height="104" rx="3" fill="#8a5a2b" />
      <path d="M100 8 L128 16 L100 24 Z" fill="#ff4757" />
      <path d="M20 110 H180 L160 138 H42 Z" fill="#ff7a1a" />
      <path d="M0 140 L18 132 L34 142 L52 130 L70 141 L90 131 L108 143 L128 131 L146 141 L166 130 L184 140 L200 133 V170 H0 Z" fill="#00b3c7" />
      <path d="M0 152 L22 146 L40 155 L60 145 L80 154 L102 146 L122 156 L142 146 L162 155 L182 147 L200 152 V170 H0 Z" fill="#6fd0ff" />
    </svg>
  );
}

function DoorLabel({ title, hint, paper, tilt }: { title: string; hint: string; paper: string; tilt: number }) {
  return (
    <span className="relative z-10 -mt-2 flex flex-col items-center gap-1.5">
      <span className={`paper px-4 py-1.5 font-display text-[clamp(1.5rem,4.6vw,2.1rem)] leading-tight text-ink ${paper}`} style={{ transform: `rotate(${tilt}deg)` }}>
        {title}
      </span>
      <span className="paper max-w-[16rem] bg-paper px-3 py-1 text-center text-lg font-bold leading-snug text-ink" style={{ transform: `rotate(${-tilt / 2}deg)` }}>
        {hint}
      </span>
    </span>
  );
}

export function EnglishGames() {
  const [screen, setScreen] = useState<Screen>({ name: "menu" });
  const toMenu = () => setScreen({ name: "menu" });

  if (screen.name === "topics") {
    return <TopicPicker game={screen.game} onBack={toMenu} onPick={(topic) => setScreen({ name: screen.game, topic })} />;
  }
  if (screen.name === "listen") return <ListenAndFind topic={screen.topic} onBack={() => setScreen({ name: "topics", game: "listen" })} />;
  if (screen.name === "cards") return <WordCards topic={screen.topic} onBack={() => setScreen({ name: "topics", game: "cards" })} />;
  if (screen.name === "trip") return <MyTrip onBack={toMenu} />;

  const door = "group flex cursor-pointer flex-col items-center transition-transform duration-300 ease-out hover:-translate-y-1 active:scale-95";
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="paper relative rotate-[-1deg] bg-paper px-5 py-2.5 text-center text-2xl font-bold">
        <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[4deg]" />
        Pick a game!
      </p>
      <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-end md:justify-center md:gap-[clamp(1.5rem,4vw,4rem)]">
        <button type="button" className={door} onClick={() => setScreen({ name: "topics", game: "listen" })}>
          <span className="sway relative block w-[clamp(12rem,52vw,15rem)]">
            <Flower colors={{ outer: "#00b3c7", inner: "#9bd423", center: "#fffaf0" }} seed={21} petals={8} size="100%" className="h-auto w-full" />
            <span className="absolute inset-0 grid place-items-center">
              <PaperSpeaker className="w-[30%]" />
            </span>
          </span>
          <DoorLabel title="Listen and find" hint="Hear a word. Tap the picture!" paper="bg-turquoise" tilt={-2} />
        </button>

        <button type="button" className={door} onClick={() => setScreen({ name: "topics", game: "cards" })}>
          <span className="relative block h-[clamp(11rem,46vw,13.5rem)] w-[clamp(13rem,58vw,17rem)]" aria-hidden>
            {[
              { pic: "cat", paper: "bg-yellow", rot: -14, x: "8%" },
              { pic: "icecream", paper: "bg-lime", rot: 9, x: "52%" },
              { pic: "butterfly", paper: "bg-paper", rot: -2, x: "30%" },
            ].map((c) => (
              <span
                key={c.pic}
                className={`paper absolute bottom-0 grid h-[85%] w-[44%] origin-bottom place-items-center transition-transform duration-300 ease-out group-hover:scale-105 ${c.paper}`}
                style={{ left: c.x, transform: `rotate(${c.rot}deg)` }}
              >
                <Sticker name={c.pic} className="w-[72%]" />
              </span>
            ))}
          </span>
          <DoorLabel title="Word cards" hint="Tap a picture to hear the word." paper="bg-yellow" tilt={1.5} />
        </button>

        <button type="button" className={door} onClick={() => setScreen({ name: "trip" })}>
          <span className="relative block w-[clamp(13rem,58vw,17rem)]">
            <PaperBoat className="h-auto w-full" />
            <Sticker name="airplane" className="absolute -top-4 right-0 w-[28%] rotate-[-10deg]" />
            <Sticker name="dolphin" className="absolute bottom-[14%] left-0 w-[24%]" />
          </span>
          <DoorLabel title="My trip to Cartagena" hint="Finish the sentences about your vacation." paper="bg-orange" tilt={-1} />
        </button>
      </div>
    </div>
  );
}

function TopicPicker({ game, onBack, onPick }: { game: "listen" | "cards"; onBack: () => void; onPick: (t: Topic) => void }) {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex w-full flex-wrap items-center gap-4">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Other games
        </PaperButton>
        <p className="paper rotate-[1deg] bg-paper px-5 py-2.5 text-2xl font-bold">
          {game === "listen" ? "Listen and find:" : "Word cards:"} pick a topic!
        </p>
      </div>
      <ul className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {TOPICS.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => onPick(t)}
              className={`paper-btn flex w-full flex-col items-center gap-2 px-3 pb-4 pt-3 ${t.paper} ${t.paper === "bg-yellow" ? "text-ink" : "text-ink"}`}
              style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
            >
              {t.cover ? (
                <Image src={t.cover} alt="" width={256} height={256} className="sticker size-24 sm:size-28" />
              ) : (
                <ColorFan />
              )}
              <span className="paper bg-paper px-3 py-1 font-display text-2xl text-ink">{t.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ColorFan() {
  const colors = ["#f02d3a", "#ff7a1a", "#ffd23f", "#2fae3b", "#2563eb", "#7c3aed"];
  return (
    <span className="relative block size-24 sm:size-28" aria-hidden>
      {colors.map((c, i) => (
        <span
          key={c}
          className="absolute bottom-2 left-1/2 h-20 w-7 origin-bottom rounded-[10px_14px_8px_12px] shadow-glue sm:h-24"
          style={{ backgroundColor: c, transform: `translateX(-50%) rotate(${(i - 2.5) * 16}deg)` }}
        />
      ))}
    </span>
  );
}

function WordPicture({ word, className = "", eager = false }: { word: Word; className?: string; eager?: boolean }) {
  if (word.color) {
    return (
      <span
        className={`block rounded-[18px_26px_14px_30px/24px_14px_28px_16px] shadow-glue ${word.color === "#ffffff" ? "ring-2 ring-ink/15" : ""} ${className}`}
        style={{ backgroundColor: word.color, backgroundImage: "var(--grain)" }}
        aria-hidden
      />
    );
  }
  return <Image src={word.img!} alt="" width={256} height={256} loading={eager ? "eager" : "lazy"} className={`sticker ${className}`} />;
}

function ListenAndFind({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const ROUNDS = Math.min(10, topic.words.length);
  const build = () => shuffle(topic.words).slice(0, ROUNDS).map((target) => ({ target, options: shuffle([target, ...shuffle(topic.words.filter((w) => w !== target)).slice(0, 3)]) }));
  const [rounds, setRounds] = useState(build);
  const [i, setI] = useState(0);
  const [cells, setCells] = useState<CellState[]>(() => Array(ROUNDS).fill("todo"));
  const [chosen, setChosen] = useState<Word | null>(null);
  const [reward, setReward] = useState<{ kind: number; seed: number } | null>(null);

  const r = rounds[i];

  useEffect(() => {
    if (!reward) speak(r.target.word);
  }, [r, reward]);

  const next = () => {
    if (i === rounds.length - 1) {
      const f = earnFlower(`english-listen-${topic.id}`, FLOWER_KINDS.length);
      setReward({ kind: f.kind, seed: f.seed });
      return;
    }
    setI(i + 1);
    setChosen(null);
  };

  const choose = (w: Word) => {
    if (chosen) return;
    setChosen(w);
    const ok = w === r.target;
    setCells((c) => c.map((s, j) => (j === i ? (ok ? "right" : "oops") : s)));
    if (ok) {
      speak(`Yes! ${r.target.word}!`);
      window.setTimeout(next, 1300);
    } else {
      speak(`This is ${r.target.word}`);
    }
  };

  const restart = () => {
    setRounds(build());
    setI(0);
    setCells(Array(ROUNDS).fill("todo"));
    setChosen(null);
    setReward(null);
  };

  if (reward) {
    return (
      <FlowerReward kind={reward.kind} seed={reward.seed} right={cells.filter((c) => c === "right").length} total={ROUNDS} onAgain={restart}>
        <PaperButton tone="paper" onClick={onBack}>
          Pick another topic
        </PaperButton>
      </FlowerReward>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Topics
        </PaperButton>
        <span className="paper bg-yellow px-4 py-2 text-lg font-bold">
          {topic.name} · {i + 1} of {ROUNDS}
        </span>
      </div>

      <ProgressCells cells={cells} current={i} />

      <button
        type="button"
        onClick={() => speak(r.target.word)}
        className="paper-btn inline-flex min-h-20 items-center gap-3 bg-turquoise-deep px-8 py-4 font-display text-[clamp(1.8rem,6vw,2.6rem)] text-white"
      >
        <Volume2 aria-hidden className="size-10" strokeWidth={2.6} />
        Listen again
      </button>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {r.options.map((w) => {
          const isTarget = w === r.target;
          const isChosen = w === chosen;
          const dim = chosen && !isTarget && !isChosen;
          return (
            <button
              key={`${i}-${w.word}`}
              type="button"
              onClick={() => choose(w)}
              disabled={!!chosen}
              aria-label={chosen ? w.word : "Picture"}
              className={`paper-btn flex w-[clamp(8.5rem,40vw,11rem)] flex-col items-center gap-2 bg-paper p-3 transition-[transform,opacity] ${dim ? "scale-90 opacity-40" : ""} ${
                chosen && isTarget ? "scale-105 ring-4 ring-lime" : ""
              } ${isChosen && !isTarget ? "wiggle" : ""}`}
            >
              <WordPicture word={w} eager className="size-[clamp(6rem,30vw,8.5rem)]" />
              <span className={`min-h-8 text-2xl font-bold ${chosen && (isTarget || isChosen) ? "" : "invisible"}`}>{w.word}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-20" aria-live="polite">
        {chosen && chosen !== r.target && (
          <div className="flex flex-col items-center gap-3">
            <p className="paper bg-paper px-5 py-2.5 text-2xl font-bold">
              Almost! This is <span className="text-pink-deep">{r.target.word}</span>.
            </p>
            <PaperButton tone="pink" onClick={next} className="text-2xl">
              {i === rounds.length - 1 ? "Finish" : "Next"}
              <ArrowRight aria-hidden className="size-7" strokeWidth={2.6} />
            </PaperButton>
          </div>
        )}
        {chosen && chosen === r.target && <p className="font-display text-4xl text-turquoise-deep">Great job!</p>}
      </div>
    </div>
  );
}

function WordCards({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center gap-4">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Topics
        </PaperButton>
        <p className="paper rotate-[1deg] bg-paper px-5 py-2.5 text-2xl font-bold">{topic.name}: tap to hear!</p>
      </div>
      <ul className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {topic.words.map((w, i) => (
          <li key={w.word}>
            <button
              type="button"
              onClick={() => {
                speak(w.word);
                setLast(w.word);
              }}
              className={`paper-btn flex w-full flex-col items-center gap-2 bg-paper px-3 pb-3 pt-4 ${last === w.word ? "ring-4 ring-yellow" : ""}`}
              style={{ transform: `rotate(${((i * 7) % 5) - 2}deg)` }}
            >
              <WordPicture word={w} className="size-[clamp(5.5rem,24vw,8rem)]" />
              <span className="inline-flex items-center gap-1.5 text-2xl font-bold">
                <Volume2 aria-hidden className="size-5 text-turquoise-deep" strokeWidth={2.8} />
                {w.word}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyTrip({ onBack }: { onBack: () => void }) {
  const build = () => TRIP.map((s) => ({ ...s, options: shuffle([s.answer, ...s.wrong]) }));
  const [items, setItems] = useState(build);
  const [i, setI] = useState(0);
  const [cells, setCells] = useState<CellState[]>(() => Array(TRIP.length).fill("todo"));
  const [chosen, setChosen] = useState<string | null>(null);
  const [reward, setReward] = useState<{ kind: number; seed: number } | null>(null);

  const s = items[i];
  const full = `${s.before} ${s.answer} ${s.after}`;

  const next = () => {
    if (i === items.length - 1) {
      const f = earnFlower("english-trip", FLOWER_KINDS.length);
      setReward({ kind: f.kind, seed: f.seed });
      return;
    }
    setI(i + 1);
    setChosen(null);
  };

  const choose = (v: string) => {
    if (chosen) return;
    setChosen(v);
    const ok = v === s.answer;
    setCells((c) => c.map((x, j) => (j === i ? (ok ? "right" : "oops") : x)));
    speak(ok ? `Yes! ${full}` : full);
  };

  const restart = () => {
    setItems(build());
    setI(0);
    setCells(Array(TRIP.length).fill("todo"));
    setChosen(null);
    setReward(null);
  };

  if (reward) {
    return (
      <FlowerReward kind={reward.kind} seed={reward.seed} right={cells.filter((c) => c === "right").length} total={TRIP.length} onAgain={restart}>
        <PaperButton tone="paper" onClick={onBack}>
          Other games
        </PaperButton>
      </FlowerReward>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Other games
        </PaperButton>
        <span className="paper bg-yellow px-4 py-2 text-lg font-bold">
          {i + 1} of {items.length}
        </span>
      </div>

      <ProgressCells cells={cells} current={i} />

      <div className="paper flex w-full max-w-3xl flex-col items-center gap-4 bg-paper px-5 py-6 sm:flex-row sm:gap-8 sm:px-8">
        <Image key={s.img + i} src={s.img} alt="" width={256} height={256} loading="eager" className="sticker glue-in size-28 shrink-0 sm:size-36" />
        <p className="text-center font-display text-[clamp(1.9rem,6vw,3rem)] leading-snug sm:text-left" aria-live="polite">
          {s.before}{" "}
          <span
            className={`inline-block min-w-[3.2em] rounded-xl px-2 text-center ${
              chosen ? (chosen === s.answer ? "bg-lime" : "bg-yellow") : "border-b-4 border-dashed border-ink/50"
            }`}
          >
            {chosen ? s.answer : " "}
          </span>{" "}
          {s.after}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {s.options.map((v, j) => {
          const isRight = v === s.answer;
          const isChosen = v === chosen;
          return (
            <PaperButton
              key={`${i}-${v}`}
              tone={(["pink", "violet", "turquoise"] as const)[j % 3]}
              tilt={j === 1 ? 1.5 : -1.5}
              onClick={() => choose(v)}
              disabled={!!chosen}
              className={`min-w-36 font-display text-3xl font-normal ${chosen && !isRight && !isChosen ? "opacity-35" : ""} ${isChosen && !isRight ? "wiggle line-through" : ""} ${
                chosen && isRight ? "ring-4 ring-lime" : ""
              }`}
            >
              {v}
            </PaperButton>
          );
        })}
      </div>

      <div className="flex min-h-24 flex-col items-center gap-3" aria-live="polite">
        {chosen && (
          <>
            <p className="text-center text-2xl font-bold">
              {chosen === s.answer ? "Great job!" : `Almost! We say "${s.answer}".`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <PaperButton tone="turquoise" onClick={() => speak(full)} className="text-xl">
                <Volume2 aria-hidden className="size-6" strokeWidth={2.6} />
                Hear it
              </PaperButton>
              <PaperButton tone="pink" onClick={next} className="text-xl">
                {i === items.length - 1 ? "Finish" : "Next"}
                <ArrowRight aria-hidden className="size-6" strokeWidth={2.6} />
              </PaperButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
