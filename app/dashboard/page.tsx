import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl">Your path</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-500">
        One text, six questions, four sessions per level. Finish a session to unlock the next.
      </p>
      <div className="mt-10">
        <Dashboard />
      </div>
    </div>
  );
}
