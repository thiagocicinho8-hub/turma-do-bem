import Link from "next/link";
import { getSessionOrRedirect } from "@/lib/dal";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/templates", label: "Templates" },
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/videos", label: "Vídeos" },
  { href: "/admin/posts", label: "Posts" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await getSessionOrRedirect();
  if (session.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="font-display text-2xl uppercase text-navy-950">Acesso restrito</p>
        <p className="mt-2 text-sm text-navy-500">Esta área é exclusiva para administradores.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase text-navy-950">Painel</h1>
        <span className="rounded-full bg-navy-950 px-3 py-1 text-xs font-bold uppercase text-gold-400">Admin</span>
      </div>

      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Admin">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-700 ring-1 ring-navy-200 transition hover:bg-navy-50"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}