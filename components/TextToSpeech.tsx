"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

type TTSState = "idle" | "playing" | "paused";

const btnClass =
  "flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(201,164,101,0.3)] text-[var(--text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors";

export default function TextToSpeech({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [state, setState] = useState<TTSState>("idle");
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const play = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`${title}. ${text}`);
    utterance.rate = 0.92;
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");

    // Keep a ref so the utterance isn't garbage-collected mid-speech
    utteranceRef.current = utterance;

    // Chrome's autoplay policy requires speak() to be called synchronously
    // within a user gesture — setTimeout breaks that context. Cancel only if
    // something is already playing, then speak immediately.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    window.speechSynthesis.speak(utterance);
    setState("playing");
  }, [state, title, text]);

  const pause = useCallback(() => {
    window.speechSynthesis?.pause();
    setState("paused");
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
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
