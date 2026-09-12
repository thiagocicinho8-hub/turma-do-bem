import { TemplateForm } from "@/components/admin/template-form";

export const metadata = { title: "Novo template — Admin" };

export default function NovoTemplatePage() {
  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Novo template</h2>
      <p className="mt-1 text-sm text-navy-500">Crie um novo template para os apoiadores usarem.</p>
      <div className="mt-6 max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
        <TemplateForm mode="create" />
      </div>
    </div>
  );
}