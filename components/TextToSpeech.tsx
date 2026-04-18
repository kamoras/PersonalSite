"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

type TTSState = "idle" | "playing" | "paused";

const btnClass =
  "flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(201,164,101,0.3)] text-[var(--text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors";

// Chrome silently drops utterances longer than ~200 chars in some versions.
// Split on sentence boundaries and speak chunks sequentially.
function toChunks(text: string, maxLen = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|\S[^.!?]*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const s of sentences) {
    if ((current + s).length > maxLen && current) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export default function TextToSpeech({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [state, setState] = useState<TTSState>("idle");
  const [supported, setSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    setSupported(true);
    const loadVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakChunk = useCallback((index: number) => {
    const synth = window.speechSynthesis;
    if (stoppedRef.current || index >= chunksRef.current.length) {
      setState("idle");
      return;
    }
    const chunk = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = 0.92;
    const englishVoice = voicesRef.current.find((v) => v.lang.startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;

    console.log(`[TTS] chunk ${index + 1}/${chunksRef.current.length} (${chunk.length} chars):`, chunk.slice(0, 60));
    utterance.onstart = () => console.log(`[TTS] onstart chunk ${index + 1}`);
    utterance.onend = () => speakChunk(index + 1);
    utterance.onerror = (e) => { console.error("[TTS] onerror:", e.error); setState("idle"); };

    synth.speak(utterance);
  }, []);

  const play = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }

    const fullText = `${title}. ${text}`;
    chunksRef.current = toChunks(fullText);
    chunkIndexRef.current = 0;
    stoppedRef.current = false;

    console.log("[TTS] chunks:", chunksRef.current.length, "| voices:", voicesRef.current.length);

    speakChunk(0);
    setState("playing");
  }, [state, title, text, speakChunk]);

  const pause = useCallback(() => {
    window.speechSynthesis?.pause();
    setState("paused");
  }, []);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    window.speechSynthesis?.cancel();
    setState("idle");
  }, []);

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2.5" aria-label="Article reader controls">
      <Volume2 size={13} aria-hidden="true" className="text-[var(--color-gold)]" />
      <span className="text-xs font-mono text-[var(--text-muted)]">Listen</span>

      {state === "playing" ? (
        <button onClick={pause} aria-label="Pause reading" className={btnClass}>
          <Pause size={12} aria-hidden="true" />
        </button>
      ) : (
        <button
          onClick={play}
          aria-label={state === "paused" ? "Resume reading" : "Read article aloud"}
          className={btnClass}
        >
          <Play size={12} aria-hidden="true" />
        </button>
      )}

      {state !== "idle" && (
        <button onClick={stop} aria-label="Stop reading" className={btnClass}>
          <Square size={12} aria-hidden="true" />
        </button>
      )}

      <span aria-live="polite" aria-atomic="true" className="text-xs font-mono">
        {state === "playing" && <span className="text-[var(--color-gold)]">Reading…</span>}
        {state === "paused" && <span className="text-[var(--text-muted)]">Paused</span>}
      </span>
    </div>
  );
}
