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
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    setSupported(true);

    // Trigger voice loading immediately at mount so voices are ready by the
    // time the user clicks play. Chrome loads voices asynchronously — calling
    // speak() before they're loaded results in silent no-op audio.
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const play = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`${title}. ${text}`);
    utterance.rate = 0.92;

    const voices = voicesRef.current;
    const englishVoice = voices.find((v) => v.lang.startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;

    console.log("[TTS] voices at click:", voices.length, "| using:", englishVoice?.name ?? "default");
    console.log("[TTS] text length:", utterance.text.length);

    utterance.onstart = () => console.log("[TTS] onstart");
    utterance.onend = () => { console.log("[TTS] onend"); setState("idle"); };
    utterance.onerror = (e) => { console.error("[TTS] onerror:", e.error); setState("idle"); };

    utteranceRef.current = utterance;

    if (synth.speaking) synth.cancel();
    synth.resume(); // unstick Chrome if it got into a paused state
    synth.speak(utterance);

    console.log("[TTS] after speak — speaking:", synth.speaking, "pending:", synth.pending);
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
