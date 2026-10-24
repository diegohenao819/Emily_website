"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Eye, Shuffle, Sparkles } from "lucide-react";
import { Flower, FLOWER_KINDS, PAPER } from "@/components/paper/Flower";
import { FlowerReward, PaperButton, ProgressCells, shuffle, type CellState } from "@/components/ui";
import { earnFlower } from "@/lib/garden";
import { speak } from "@/lib/speech";

type Pick = number | "mix";
type Screen = { name: "pick" } | { name: "learn"; table: number } | { name: "quiz"; pick: Pick };

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const numberWord = (n: number) => (n <= 10 ? WORDS[n] : String(n));

export function TablesGame() {
  const [screen, setScreen] = useState<Screen>({ name: "pick" });
  const [selected, setSelected] = useState<Pick | null>(null);

  if (screen.name === "learn") {
    return <Learn table={screen.table} onBack={() => setScreen({ name: "pick" })} onQuiz={() => setScreen({ name: "quiz", pick: screen.table })} />;
  }
  if (screen.name === "quiz") {
    return <Quiz pick={screen.pick} onBack={() => setScreen({ name: "pick" })} />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="paper rotate-[-1deg] bg-paper px-5 py-2.5 text-center text-2xl font-bold">Pick a table!</p>

      <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:gap-x-5 sm:gap-y-4" role="radiogroup" aria-label="Times tables">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const on = selected === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`Table of ${n}`}
              onClick={() => setSelected(n)}
              className={`relative grid size-[clamp(3.8rem,16vw,6.5rem)] cursor-pointer place-items-center rounded-full transition-transform duration-300 ease-out ${on ? "scale-115" : "hover:scale-105"}`}
            >
              <Flower colors={FLOWER_KINDS[(n - 1) % FLOWER_KINDS.length]} seed={n * 7} petals={6 + (n % 3)} size="100%" className={on ? "glue-in" : ""} />
              <span className="absolute inset-0 grid place-items-center font-display text-[clamp(1.4rem,5vw,2.3rem)] text-ink">{n}</span>
              {on && <span className="absolute -bottom-2 h-1.5 w-2/3 rounded-full bg-ink" aria-hidden />}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        role="radio"
        aria-checked={selected === "mix"}
        onClick={() => setSelected("mix")}
        className={`paper-btn inline-flex min-h-14 items-center gap-2 px-6 py-3 text-xl font-bold ${selected === "mix" ? "bg-violet-deep text-white" : "bg-paper text-ink"}`}
      >
        <Shuffle aria-hidden className="size-6" strokeWidth={2.6} />
        Mix all the tables
      </button>

      <div className="flex min-h-36 flex-wrap items-start justify-center gap-4" aria-live="polite">
        {selected === null ? (
          <p className="pt-4 text-xl font-bold text-ink-soft">Tap a flower to start.</p>
        ) : (
          <>
            {selected !== "mix" && (
              <PaperButton tone="orange" tilt={-1.5} onClick={() => setScreen({ name: "learn", table: selected })} className="text-2xl">
                <BookOpen aria-hidden className="size-7" strokeWidth={2.6} />
                Learn the {selected}s
              </PaperButton>
            )}
            <PaperButton tone="pink" tilt={1.5} onClick={() => setScreen({ name: "quiz", pick: selected })} className="text-2xl">
              <Sparkles aria-hidden className="size-7" strokeWidth={2.6} />
              {selected === "mix" ? "Play the mix quiz" : `Play the ${selected}s quiz`}
            </PaperButton>
          </>
        )}
      </div>
    </div>
  );
}

/** Rows of little flowers: 3 × 4 is three rows with four flowers in each row. */
function FlowerRows({ rows, cols }: { rows: number; cols: number }) {
  const big = Math.max(rows, cols);
  const size = big <= 4 ? "size-9 sm:size-11" : big <= 7 ? "size-6 sm:size-8" : "size-5 sm:size-6";
  return (
    <div className="paper inline-flex flex-col gap-1 bg-paper p-3 sm:p-4" aria-hidden>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-1">
          {Array.from({ length: cols }, (_, c) => (
            <Flower key={c} colors={FLOWER_KINDS[r % FLOWER_KINDS.length]} seed={r * 11 + c} petals={5} size="100%" className={size} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Learn({ table, onBack, onQuiz }: { table: number; onBack: () => void; onQuiz: () => void }) {
  const [k, setK] = useState(1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const open = shown.has(k);
  const answer = table * k;

  const reveal = () => {
    setShown((s) => new Set(s).add(k));
    speak(`${numberWord(table)} times ${numberWord(k)} is ${answer}`);
  };
  const go = (next: number) => setK(Math.min(10, Math.max(1, next)));

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Other tables
        </PaperButton>
        <PaperButton tone="pink" onClick={onQuiz} className="text-lg">
          <Sparkles aria-hidden className="size-6" strokeWidth={2.6} />
          Quiz me!
        </PaperButton>
      </div>

      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-col items-center gap-4">
          <p className="font-display text-[clamp(3rem,12vw,6rem)] leading-none" aria-live="polite">
            {table} × {k} ={" "}
            {open ? (
              <span key={`${table}-${k}`} className="inline-flex text-pink-deep">
                {String(answer)
                  .split("")
                  .map((d, i) => (
                    <span key={i} className="pop-digit" style={{ animationDelay: `${i * 140}ms` }}>
                      {d}
                    </span>
                  ))}
              </span>
            ) : (
              <span className="text-ink-soft">?</span>
            )}
          </p>
          <FlowerRows rows={table} cols={k} />
          <p className="text-lg font-bold text-ink-soft">
            {table} {table === 1 ? "row" : "rows"} of {k} {k === 1 ? "flower" : "flowers"}
          </p>
        </div>

        <ol className="paper grid grid-cols-2 gap-x-6 gap-y-1 bg-paper px-5 py-4 text-xl font-bold sm:text-2xl lg:grid-cols-1" aria-label={`The ${table} times table`}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <li key={n}>
              <button
                type="button"
                onClick={() => setK(n)}
                className={`w-full cursor-pointer rounded-lg px-2 py-0.5 text-left tabular-nums ${n === k ? "bg-yellow" : "hover:bg-yellow/40"}`}
              >
                {table} × {n} = {shown.has(n) ? table * n : "…"}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <PaperButton tone="paper" onClick={() => go(k - 1)} disabled={k === 1} aria-label="Back" className="disabled:opacity-40">
          <ArrowLeft aria-hidden className="size-7" strokeWidth={2.8} />
        </PaperButton>
        {open ? (
          <PaperButton tone="turquoise" onClick={() => speak(`${numberWord(table)} times ${numberWord(k)} is ${answer}`)} className="text-2xl">
            Say it again
          </PaperButton>
        ) : (
          <PaperButton tone="orange" onClick={reveal} className="text-2xl">
            <Eye aria-hidden className="size-7" strokeWidth={2.6} />
            Show me
          </PaperButton>
        )}
        <PaperButton tone="paper" onClick={() => go(k + 1)} disabled={k === 10} aria-label="Next" className="disabled:opacity-40">
          <ArrowRight aria-hidden className="size-7" strokeWidth={2.8} />
        </PaperButton>
      </div>
    </div>
  );
}

type Question = { a: number; b: number; options: number[] };

function makeQuestions(pick: Pick): Question[] {
  const tables = pick === "mix" ? [2, 3, 4, 5, 6, 7, 8, 9, 10] : [pick];
  const bs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return bs.map((b) => {
    const a = tables[Math.floor(Math.random() * tables.length)];
    const right = a * b;
    const near = new Set<number>();
    for (const c of shuffle([right + a, right - a, right + 1, right - 1, right + 2, (a + 1) * b, a * (b + 1), right + 10])) {
      if (c > 0 && c !== right) near.add(c);
      if (near.size === 3) break;
    }
    return { a, b, options: shuffle([right, ...near]) };
  });
}

const PETAL_COLORS = [PAPER.pink, PAPER.turquoise, PAPER.orange, PAPER.violet];

function Quiz({ pick, onBack }: { pick: Pick; onBack: () => void }) {
  const [round, setRound] = useState(0);
  const [questions, setQuestions] = useState(() => makeQuestions(pick));
  const [i, setI] = useState(0);
  const [cells, setCells] = useState<CellState[]>(() => Array(10).fill("todo"));
  const [chosen, setChosen] = useState<number | null>(null);
  const [reward, setReward] = useState<{ kind: number; seed: number } | null>(null);

  const q = questions[i];
  const right = q.a * q.b;
  const answered = chosen !== null;
  const wasRight = chosen === right;

  const next = () => {
    if (i === questions.length - 1) {
      const f = earnFlower(pick === "mix" ? "tables-mix" : `tables-${pick}`, FLOWER_KINDS.length);
      setReward({ kind: f.kind, seed: f.seed });
      return;
    }
    setI(i + 1);
    setChosen(null);
  };

  const choose = (n: number) => {
    if (answered) return;
    setChosen(n);
    const ok = n === right;
    setCells((c) => c.map((s, j) => (j === i ? (ok ? "right" : "oops") : s)));
    if (ok) {
      speak(`${right}! Yes!`);
      window.setTimeout(next, 1100);
    }
  };

  const restart = () => {
    setQuestions(makeQuestions(pick));
    setI(0);
    setCells(Array(10).fill("todo"));
    setChosen(null);
    setReward(null);
    setRound((r) => r + 1);
  };

  if (reward) {
    return (
      <FlowerReward kind={reward.kind} seed={reward.seed} right={cells.filter((c) => c === "right").length} total={10} onAgain={restart}>
        <PaperButton tone="paper" onClick={onBack}>
          Pick another table
        </PaperButton>
      </FlowerReward>
    );
  }

  return (
    <div className="flex flex-col items-center gap-7" key={round}>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <PaperButton tone="paper" onClick={onBack} className="text-lg">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={2.6} />
          Other tables
        </PaperButton>
        <span className="paper bg-yellow px-4 py-2 text-lg font-bold">Question {i + 1} of 10</span>
      </div>

      <ProgressCells cells={cells} current={i} />

      <p className="font-display text-[clamp(3.2rem,13vw,6.5rem)] leading-none" aria-live="polite">
        {q.a} × {q.b} = <span className={answered ? "text-pink-deep" : "text-ink-soft"}>{answered ? right : "?"}</span>
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-x-8">
        {q.options.map((n, j) => {
          const isRight = n === right;
          const isChosen = n === chosen;
          const dim = answered && !isRight && !isChosen;
          return (
            <button
              key={`${i}-${n}`}
              type="button"
              onClick={() => choose(n)}
              disabled={answered}
              aria-label={String(n)}
              className={`relative grid size-[clamp(7rem,30vw,9.5rem)] cursor-pointer place-items-center transition-[transform,opacity] duration-300 ease-out disabled:cursor-default ${
                dim ? "scale-90 opacity-35" : ""
              } ${answered && isRight ? "scale-110" : ""} ${isChosen && !isRight ? "wiggle" : ""} ${!answered ? "hover:scale-105 active:scale-95" : ""}`}
            >
              <Flower colors={{ outer: PETAL_COLORS[j], inner: PAPER.white, center: PAPER.white }} seed={j * 5 + 2} petals={7} size="100%" />
              <span className="absolute inset-0 grid place-items-center font-display text-[clamp(1.9rem,7vw,2.8rem)] text-ink">{n}</span>
              {answered && isRight && (
                <span className="absolute -top-2 right-0 rounded-full bg-lime px-2.5 py-0.5 text-base font-bold text-ink shadow-glue">Yes!</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-20" aria-live="polite">
        {answered && !wasRight && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="paper bg-paper px-5 py-2.5 text-2xl font-bold">
              Almost! {q.a} × {q.b} = <span className="text-pink-deep">{right}</span>
            </p>
            <PaperButton tone="pink" onClick={next} className="text-2xl">
              {i === questions.length - 1 ? "Finish" : "Next"}
              <ArrowRight aria-hidden className="size-7" strokeWidth={2.6} />
            </PaperButton>
          </div>
        )}
        {answered && wasRight && <p className="font-display text-4xl text-turquoise-deep">Great job!</p>}
      </div>
    </div>
  );
}
