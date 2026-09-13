import { getTemplates } from "@/lib/dal";
import { TemplatesGallery } from "@/components/templates-gallery";

export const metadata = { title: "Templates" };

export default async function TemplatesPage() {
  const templates = await getTemplates({ onlyActive: true });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">Templates</h1>
        <p className="mt-2 text-navy-600">
          Escolha um template, envie sua foto ou vídeo e gere conteúdo pronto para postar.
        </p>
      </div>
      <TemplatesGallery templates={templates} />
    </div>
  );
}