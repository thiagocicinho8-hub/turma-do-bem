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

const PLACEHOLDER_POSTS = [
  {
    _id: "exemplo-1",
    userName: "maria_da_tropa",
    platform: "instagram",
    caption: `Meu voto é Thiago Cicinho! Marquei ${SITE.handle} na legenda e já fiz meu vídeo. 🗳`,
    url: "https://www.instagram.com/",
    views: 2340,
    interactions: 318,
  },
  {
    _id: "exemplo-2",
    userName: "jose_diretoria",
    platform: "tiktok",
    caption: `Gente, o site é simples demais: grava, escolhe o template e posta. ${SITE.handle} 👏`,
    url: "https://www.tiktok.com/",
    views: 1876,
    interactions: 254,
  },
  {
    _id: "exemplo-3",
    userName: "clara_fiel",
    platform: "instagram",
    caption: `Apoio de verdade é atitude. Criei meu vídeo com a Tropa do Bem e postei marcando ${SITE.handle}.`,
    url: "https://www.instagram.com/",
    views: 1429,
    interactions: 197,
  },
  {
    _id: "exemplo-4",
    userName: "rafael_zinho",
    platform: "youtube",
    caption: "Todo mundo da família já fez o dela. Bora lá, Tropa!",
    url: "https://www.youtube.com/",
    views: 987,
    interactions: 121,
  },
];

export default async function PostsPage() {
  const [posts, session] = await Promise.all([getRecentPosts(), verifySession()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
            <>
              <p className="mb-5 rounded-xl bg-gold-50 px-4 py-2.5 text-xs font-semibold text-gold-800 ring-1 ring-gold-200">
                Ainda não há publicações reais — abaixo uma prévia de como o mural vai ficar.
              </p>
              <ul className="grid gap-5 sm:grid-cols-2">
                {PLACEHOLDER_POSTS.map((p, i) => (
                  <li key={p._id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-bold text-navy-950">
                          <span className="text-gold-600">@{p.userName}</span>
                        </p>
                        <span className="shrink-0 rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-500">
                          {PLATFORM_LABEL[p.platform]}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-navy-700">{p.caption}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-navy-500">
                        <span className="flex items-center gap-1">
                          <span aria-hidden>👁</span> {p.views.toLocaleString("pt-BR")} views
                        </span>
                        <span className="flex items-center gap-1">
                          <span aria-hidden>❤️</span> {p.interactions.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </>
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