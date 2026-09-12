import Link from "next/link";
import { getRecentPosts, verifySession } from "@/lib/dal";
import { SITE } from "@/lib/config";
import { PostSubmit } from "@/components/post-submit";
import { ButtonLink } from "@/components/ui";

export const metadata = { title: "A Tropa postando" };

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube Shorts",
};

export default async function PostsPage() {
  const [posts, session] = await Promise.all([getRecentPosts(), verifySession()]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">Últimas publicações</p>
        <h1 className="mt-1 font-display text-3xl uppercase text-navy-950 sm:text-4xl">A Tropa postando</h1>
        <p className="mt-3 max-w-2xl text-navy-600">
          Depoimentos e conteúdos publicados pela Tropa, marcando {SITE.handle} na legenda.
          A lista é aberta: veja sem entrar.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-navy-300 bg-navy-50 p-12 text-center">
              <p className="font-display text-xl uppercase text-navy-700">Nada por aqui ainda</p>
              <p className="mt-2 text-sm text-navy-500">
                Seja a primeira pessoa da Tropa a publicar e registrar um post.
              </p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2">
              {posts.map((p, i) => (
                <li key={p._id}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-bold text-navy-950">
                        <span className="text-gold-600">@{p.userName || "tropa"}</span>
                      </p>
                      <span className="shrink-0 rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-500">
                        {PLATFORM_LABEL[p.platform]}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-navy-700">{p.caption || "Depoimento da Tropa"}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-navy-500">
                      <span className="flex items-center gap-1">
                        <span aria-hidden>👁</span> {p.views.toLocaleString("pt-BR")} views
                      </span>
                      <span className="flex items-center gap-1">
                        <span aria-hidden>❤️</span> {p.interactions.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <span className="mt-3 inline-block text-xs font-bold text-navy-900 underline">Ver publicação n.º {i + 1} →</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          {session ? (
            <PostSubmit />
          ) : (
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg uppercase text-navy-950">Entre para participar</h2>
              <p className="mt-1 text-sm text-navy-600">Crie sua conta, gere um vídeo e publique marcando {SITE.handle}.</p>
              <ButtonLink href="/login" className="mt-4 w-full">Entrar para criar</ButtonLink>
            </div>
          )}
          <p className="rounded-2xl bg-navy-950 p-5 text-xs leading-relaxed text-navy-200">
            Aparecer nesta lista não gera qualquer benefício material, financeiro ou vantagem de
            qualquer espécie. Não é concurso nem premiação. O site existe apenas para facilitar
            atos de apoio espontâneos. A gente só libera a ferramenta; o que você faz com ela é
            decisão sua.
          </p>
        </div>
      </div>
    </div>
  );
}