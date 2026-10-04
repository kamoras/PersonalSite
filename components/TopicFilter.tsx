"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import type { TopicCount } from "@/lib/posts";

const TOPIC_EVENT = "topicchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(TOPIC_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(TOPIC_EVENT, onChange);
  };
}

function readTopic() {
  return new URLSearchParams(window.location.search).get("topic");
}

// The filter lives in ?topic= so a filtered view can be linked to.
function setTopic(topic: string | null) {
  const url = new URL(window.location.href);
  if (topic) url.searchParams.set("topic", topic);
  else url.searchParams.delete("topic");
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(TOPIC_EVENT));
}

function plural(n: number) {
  return `${n} ${n === 1 ? "essay" : "essays"}`;
}

// The archive itself is server-rendered with every essay visible; this island
// only hides entries ([data-topics]) and empty year groups ([data-year]), so
// visitors without JavaScript lose nothing and hydration stays small.
export default function TopicFilter({ topics, total }: { topics: TopicCount[]; total: number }) {
  const requested = useSyncExternalStore(subscribe, readTopic, () => null);
  const topic = topics.some((t) => t.topic === requested) ? requested : null;
  const shown = topic ? topics.find((t) => t.topic === topic)?.count ?? 0 : total;
  useLayoutEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-topics]").forEach((entry) => {
      entry.hidden = topic !== null && !(entry.dataset.topics ?? "").split("|").includes(topic);
    });
    document.querySelectorAll<HTMLElement>("[data-year]").forEach((year) => {
      year.hidden = !year.querySelector("[data-topics]:not([hidden])");
    });
  }, [topic]);

  useLayoutEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[data-topic]");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      setTopic(link.dataset.topic ?? null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="filters" role="group" aria-labelledby="filter-label">
      <span className="label" id="filter-label">Filter by topic</span>
      <div className="chips">
        <button type="button" className="chip" aria-pressed={topic === null} onClick={() => setTopic(null)}>
          All <span className="c">{total}<span className="sr-only"> {total === 1 ? "essay" : "essays"}</span></span>
        </button>
        {topics.map(({ topic: t, count }) => (
          <button
            key={t}
            type="button"
            className="chip"
            aria-pressed={topic === t}
            onClick={() => setTopic(topic === t ? null : t)}
          >
            {t} <span className="c">{count}<span className="sr-only"> {count === 1 ? "essay" : "essays"}</span></span>
          </button>
        ))}
      </div>
      <p className="label" role="status">
        {plural(shown)}
        {topic ? ` on “${topic}”` : ""}
      </p>
    </div>
  );
}
