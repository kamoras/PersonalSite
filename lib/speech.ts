// A single page-wide reader over the Web Speech API, shared by every Listen
// button on the page (the toolbar and the rail) so they always agree.

export type SpeechState = "idle" | "playing" | "paused";

let state: SpeechState = "idle";
let chunks: string[] = [];
let stopped = true;
const listeners = new Set<() => void>();

function setState(next: SpeechState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function subscribeSpeech(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSpeechState(): SpeechState {
  return state;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Chrome silently stops utterances after roughly 15 seconds, so the text is
// spoken sentence-group by sentence-group.
function toChunks(text: string, maxLen = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|\S[^.!?]*/g) ?? [text];
  const out: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLen && current) {
      out.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

function speakChunk(index: number) {
  if (stopped || index >= chunks.length) {
    setState("idle");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(chunks[index]);
  utterance.rate = 0.92;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  utterance.onend = () => speakChunk(index + 1);
  utterance.onerror = () => setState("idle");
  window.speechSynthesis.speak(utterance);
}

export function toggleSpeech(text: string) {
  const synth = window.speechSynthesis;
  if (state === "playing") {
    synth.pause();
    setState("paused");
  } else if (state === "paused") {
    synth.resume();
    setState("playing");
  } else {
    synth.cancel();
    chunks = toChunks(text);
    stopped = false;
    setState("playing");
    speakChunk(0);
  }
}

export function stopSpeech() {
  stopped = true;
  if (speechSupported()) window.speechSynthesis.cancel();
  setState("idle");
}
