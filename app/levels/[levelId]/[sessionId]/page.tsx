import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevel, getSession } from "@/data/levels";
import SessionRunner from "@/components/session/SessionRunner";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ levelId: string; sessionId: string }>;
}) {
  const { levelId, sessionId } = await params;
  const level = getLevel(levelId);
  const session = getSession(levelId, sessionId);
  if (!level || !session) notFound();

  return (
    <div>
      <Link href={`/levels/${level.id}`} className="text-sm text-ink-500 hover:text-ink-900">
        ← {level.title}
      </Link>
      <div className="mt-6">
        <SessionRunner key={session.id} level={level} session={session} />
      </div>
    </div>
  );
}
