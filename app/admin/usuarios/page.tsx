import { getAdminUsers } from "@/lib/dal";
import { Badge } from "@/components/ui";
import { deleteUser } from "@/lib/actions/admin";

export const metadata = { title: "Usuários — Admin" };

export default async function AdminUsuariosPage() {
  const users = await getAdminUsers();

  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Usuários</h2>
      <p className="mt-1 text-sm text-navy-500">{users.length} contas registradas.</p>
      <div className="mt-6 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy-100">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-100 font-bold text-navy-950">
              {u.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-navy-950">{u.name}</p>
              <p className="truncate text-xs text-navy-500">{u.email}</p>
            </div>
            <Badge tone={u.role === "admin" ? "gold" : "navy"}>{u.role}</Badge>
            <span className="text-xs text-navy-400">{new Date(u.createdAt).toLocaleDateString("pt-BR")}</span>
            <form action={deleteUser as unknown as (fd: FormData) => void} onSubmit={(e) => { if (!confirm(`Remover ${u.name}?`)) e.preventDefault(); }}>
              <input type="hidden" name="id" value={u.id} />
              <button type="submit" className="text-xs font-semibold text-red-600 hover:underline">Excluir</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}