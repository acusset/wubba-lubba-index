import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavBar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="font-heading font-semibold">
          Wubba Lubba Index
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/characters" className="hover:underline">
            Characters
          </Link>
          <Link href="/favorites" className="hover:underline">
            Favorites
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
