import { getStats } from "@/lib/dal";

export const metadata = { title: "Dashboard" };

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    { label: "Usuários", value: stats.users },
    { label: "Templates", value: stats.templates },
    { label: "Vídeos gerados", value: stats.videos },
    { label: "Posts", value: stats.posts },
    { label: "Visualizações", value: stats.views.toLocaleString("pt-BR") },
    { label: "Interações", value: stats.interactions.toLocaleString("pt-BR") },
  ];

  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Visão geral</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
            <p className="font-display text-3xl text-gold-600">{c.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-500">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}