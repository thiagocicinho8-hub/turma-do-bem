import { getSessionOrRedirect, getTemplates } from "@/lib/dal";
import { VideoStudio } from "@/components/studio/video-studio";

export const metadata = { title: "Criar vídeo" };

export default async function CriarPage(props: PageProps<"/criar">) {
  await getSessionOrRedirect();
  const search = await props.searchParams;
  const preSelectedId = typeof search.template === "string" ? search.template : undefined;
  const templates = await getTemplates({ onlyActive: true });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">Criar vídeo</h1>
        <p className="mt-2 text-navy-600">
          Escolha um template, envie sua foto ou vídeo, personalize e gere conteúdo pronto para postar.
        </p>
      </div>
      <VideoStudio templates={templates} preSelectedId={preSelectedId} />
    </div>
  );
}