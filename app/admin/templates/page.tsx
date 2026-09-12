import Link from "next/link";
import { getAllTemplates } from "@/lib/dal";
import { toggleTemplate, deleteTemplate } from "@/lib/actions/admin";
import { TemplateThumb } from "@/components/template-thumb";
import { Button } from "@/components/ui";

export const metadata = { title: "Templates — Admin" };

export default async function AdminTemplatesPage() {
  const templates = await getAllTemplates();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl uppercase text-navy-950">Templates</h2>
        <Link href="/admin/templates/novo" className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-navy-950 hover:bg-gold-300">
          + Novo template
        </Link>
      </div>

      <Table templates={templates} onToggle={toggleTemplate} onDelete={deleteTemplate} />
    </div>
  );
}

function Table({
  templates,
  onToggle,
  onDelete,
}: {
  templates: any[];
  onToggle: (fd: FormData) => Promise<any>;
  onDelete: (fd: FormData) => Promise<any>;
}) {
  return (
    <div className="mt-6 space-y-4">
      {templates.length === 0 && <p className="text-navy-500">Nenhum template.</p>}
      {templates.map((t) => (
        <div key={t._id} className="flex flex-wrap items-center gap-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy-100">
          <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-navy-100">
            <TemplateThumb layers={t.layers} width={t.width} height={t.height} className="h-full w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-navy-950">{t.name}</p>
            <p className="truncate text-xs text-navy-500">{t.description}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-[10px] font-bold uppercase">
              <span className="rounded bg-navy-100 px-2 py-0.5 text-navy-700">{t.kind}</span>
              <span className={`rounded px-2 py-0.5 ${t.status === "ativo" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                {t.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <form action={onToggle}>
              <input type="hidden" name="id" value={t._id} />
              <Button variant="ghost" size="sm">{t.status === "ativo" ? "Desativar" : "Ativar"}</Button>
            </form>
            <Link href={`/admin/templates/${t._id}`} className="rounded-full px-4 py-1.5 text-sm font-semibold text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50">
              Editar
            </Link>
            <form action={onDelete} onSubmit={(e) => { if (!confirm("Remover template?")) e.preventDefault(); }}>
              <input type="hidden" name="id" value={t._id} />
              <Button variant="ghost" size="sm" className="text-red-600">Remover</Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}