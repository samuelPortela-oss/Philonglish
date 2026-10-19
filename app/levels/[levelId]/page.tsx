import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevel } from "@/data/levels";

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) {
  const { levelId } = await params;
  const level = getLevel(levelId);
  if (!level) notFound();

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-ochre-700">
        Level · {level.period}
      </p>
      <h1 className="mt-2 font-serif text-3xl">{level.title}</h1>
      <p className="mt-3 leading-relaxed text-ink-500">{level.description}</p>

      <ol className="mt-10 space-y-3">
        {level.sessions.map((session) => (
          <li key={session.id}>
            <Link
              href={`/levels/${level.id}/${session.id}`}
              className="group flex items-baseline justify-between rounded-xl border border-ink-100 bg-white p-5 transition-colors hover:border-ochre-500"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-500">
                  Session {session.order}
                </p>
                <p className="mt-1 font-serif text-lg">{session.title}</p>
              </div>
              <p className="text-sm text-ink-500">{session.philosopher}</p>
            </Link>
          </li>
        ))}
        {level.sessions.length === 0 && (
          <li className="rounded-xl border border-dashed border-ink-100 p-5 text-sm text-ink-500">
            Sessions for this level are coming soon.
          </li>
        )}
      </ol>
    </div>
  );
}
