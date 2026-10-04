"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { getSpeechState, speechSupported, stopSpeech, subscribeSpeech, toggleSpeech } from "@/lib/speech";

const noopSubscribe = () => () => {};

export default function ListenButton({
  text,
  minutes,
  showStop = false,
}: {
  text: string;
  minutes: number;
  /** Only one instance per page should own cleanup and the stop control. */
  showStop?: boolean;
}) {
  const state = useSyncExternalStore(subscribeSpeech, getSpeechState, () => "idle" as const);
  const supported = useSyncExternalStore(noopSubscribe, speechSupported, () => true);

  useEffect(() => {
    if (!showStop) return;
    // Stop reading when leaving the essay, by client navigation or unload.
    window.addEventListener("pagehide", stopSpeech);
    return () => {
      window.removeEventListener("pagehide", stopSpeech);
      stopSpeech();
    };
  }, [showStop]);

  if (!supported) return null;

  const label = state === "playing" ? "Pause" : state === "paused" ? "Resume" : "Listen";

  return (
    <span className="listen-wrap inline-flex items-center gap-4">
      <button
        type="button"
        className="listen"
        data-state={state}
        onClick={() => toggleSpeech(text)}
      >
        <span className="pb" aria-hidden="true">
          {state === "playing" ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </span>
        <span>{label}</span>{" "}
        <span className="lm">{minutes} min</span>
        <span className="sr-only">, read this essay aloud</span>
      </button>
      {showStop && state !== "idle" && (
        <button type="button" className="textlink" onClick={stopSpeech}>
          Stop
        </button>
      )}
    </span>
  );
}
