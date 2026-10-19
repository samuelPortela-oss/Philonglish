import type { Level } from "@/types/learning";
import type { SessionViewState } from "@/lib/progress";
import SessionCard from "./SessionCard";

export default function LevelOverview({
  level,
  sessions,
}: {
  level: Level;
  sessions: SessionViewState[];
}) {
  return (
    <section>
      <header className="border-b border-ink-100 pb-6">
        <p className="text-xs uppercase tracking-widest text-ochre-700">
          Level · {level.period}
        </p>
        <h2 className="mt-2 font-serif text-2xl">{level.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          {level.description}
        </p>
      </header>

      <ol className="mt-6 space-y-3">
        {sessions.map((view) => (
          <li key={view.session.id}>
            <SessionCard view={view} />
          </li>
        ))}
      </ol>
    </section>
  );
}
