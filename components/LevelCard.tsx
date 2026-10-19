import Link from "next/link";
import type { Level } from "@/types/learning";

export default function LevelCard({ level }: { level: Level }) {
  const sessionCount = level.sessions.length;

  return (
    <Link
      href={`/levels/${level.id}`}
      className="group block rounded-xl border border-ink-100 bg-white p-6 transition-colors hover:border-ochre-500"
    >
      <p className="text-xs uppercase tracking-widest text-ochre-700">
        Level · {level.period}
      </p>
      <h2 className="mt-2 font-serif text-xl">{level.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{level.description}</p>
      <p className="mt-4 text-sm text-ink-700">
        {sessionCount > 0 ? `${sessionCount} session${sessionCount > 1 ? "s" : ""}` : "Coming soon"}
      </p>
    </Link>
  );
}
