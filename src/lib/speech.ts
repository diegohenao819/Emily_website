"use client";

let voice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (voice !== undefined) return voice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  if (!voices.length) return null;
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  voice =
    english.find((v) => /female|samantha|zira|aria|jenny|google us english/i.test(v.name)) ??
    english.find((v) => v.lang === "en-US") ??
    english[0] ??
    null;
  return voice;
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Say an English word or sentence slowly and clearly. */
export function speak(text: string, rate = 0.85) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  u.pitch = 1.1;
  const v = pickVoice();
  if (v) u.voice = v;
  synth.speak(u);
}
