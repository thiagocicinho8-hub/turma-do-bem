import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionOrRedirect, getVideosForUser, getCurrentUserSafe } from "@/lib/dal";
import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Meus vídeos" };

export default async function MeusVideosPage() {
  const session = await getSessionOrRedirect();
  const [videos, user] = await Promise.all([getVideosForUser(session.userId), getCurrentUserSafe()]);
  if (!user || user.id !== session.userId) redirect("/login");
  if (!user.phone) redirect("/telefone");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase text-navy-950">Meus vídeos</h1>
          <p className="mt-1 text-sm text-navy-500">
            {user?.name}, aqui ficam os vídeos que você salvou na plataforma.
          </p>
        </div>
        <ButtonLink href="/criar">+ Criar novo</ButtonLink>
      </div>

      {videos.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-navy-300 bg-navy-50 p-12 text-center">
          <p className="font-display text-xl uppercase text-navy-700">Nenhum vídeo salvo</p>
          <p className="mt-2 text-sm text-navy-500">
            Gere um vídeo e clique em <strong>“Salvar nos meus vídeos”</strong> para ele aparecer aqui.
          </p>
          <ButtonLink href="/criar" variant="primary" className="mt-5">Criar vídeo</ButtonLink>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v._id} className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
              {v.outputUrl && v.outputUrl.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <video src={v.outputUrl} className="aspect-[9/16] w-full rounded-xl bg-navy-950" controls />
              ) : (
                <div className="flex aspect-[9/16] w-full items-center justify-center rounded-xl bg-navy-950 text-sm text-navy-300">
                  Download local
                </div>
              )}
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold text-navy-950">{v.outputName || "Vídeo gerado"}</p>
                <span className="shrink-0 text-[10px] font-bold uppercase text-navy-400">{v.inputType}</span>
              </div>
              <p className="mt-0.5 text-xs text-navy-500">{new Date(v.createdAt).toLocaleDateString("pt-BR")}</p>
              {v.outputUrl && v.outputUrl.startsWith("http") && (
                <Link href={v.outputUrl} target="_blank" className="mt-2 inline-block text-xs font-bold text-navy-900 underline">
                  Abrir link
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}