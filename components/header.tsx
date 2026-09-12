import Link from "next/link";
import { Logo } from "@/components/logo";
import { UserMenu } from "@/components/user-menu";
import { getCurrentUserSafe } from "@/lib/dal";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/criar", label: "Criar" },
  { href: "/templates", label: "Templates" },
  { href: "/posts", label: "A Tropa" },
];

export async function Header() {
  const user = await getCurrentUserSafe();

  return (
    <header className="sticky top-0 z-40 border-b border-navy-800 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-100 transition hover:text-gold-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu userName={user.name} role={user.role} />
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gold-400 px-5 py-2 text-sm font-bold text-navy-950 transition hover:bg-gold-300"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>

      <nav
        className="flex gap-5 overflow-x-auto border-t border-navy-800 px-6 py-2.5 md:hidden"
        aria-label="Principal (mobile)"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 text-sm font-medium text-navy-100 hover:text-gold-400"
          >
            {item.label}
          </Link>
        ))}
        {!user && (
          <Link href="/login" className="shrink-0 text-sm font-medium text-gold-400">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}