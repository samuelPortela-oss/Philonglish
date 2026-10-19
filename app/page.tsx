import { levels } from "@/data/levels";
import LevelCard from "@/components/LevelCard";

export default function HomePage() {
  return (
    <div>
      <h1 className="font-serif text-4xl">Philosophy in English</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-500">
        Read the great thinkers in carefully levelled English. One text and six
        questions per session, designed for B2 learners.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}
