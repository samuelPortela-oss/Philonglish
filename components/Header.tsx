import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-ink-100 bg-ink-50/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-lg tracking-tight">
          Philonglish
        </Link>
        <nav className="text-sm text-ink-500">
          <Link href="/" className="transition-colors hover:text-ink-900">
            Levels
          </Link>
        </nav>
      </div>
    </header>
  );
}
