import { getTemplateById } from "@/lib/dal";
import { TemplateForm } from "@/components/admin/template-form";

export const metadata = { title: "Editar template — Admin" };

export default async function EditarTemplatePage(props: PageProps<"/admin/templates/[id]">) {
  const { id } = await props.params;
  const tpl = await getTemplateById(id);

  if (!tpl) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="font-display text-xl uppercase text-navy-700">Template não encontrado</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Editar template</h2>
      <div className="mt-6 max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
        <TemplateForm
          mode="edit"
          initial={{
            id: tpl.id,
            name: tpl.name,
            description: tpl.description,
            kind: tpl.kind,
            category: tpl.category,
            fallbackDuration: tpl.fallbackDuration,
            status: tpl.status,
            layers: tpl.layers,
          }}
        />
      </div>
    </div>
  );
}