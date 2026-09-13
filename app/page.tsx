import Link from "next/link";
import { getTemplates, getStats } from "@/lib/dal";
import { SITE } from "@/lib/config";
import { ButtonLink } from "@/components/ui";
import { CountUp } from "@/components/count-up";
import { TemplateThumb } from "@/components/template-thumb";

const PASSOS = [
  { n: "01", t: "Grave", d: "Um vídeo ou uma foto no celular, na vertical. Pode enviar mais de um." },
  { n: "02", t: "Escolha", d: "Cada template já vem com texto e identidade da campanha. Você vê a prévia com o seu conteúdo antes de gerar." },
  { n: "03", t: "Poste e marque", d: "Os vídeos saem em 1080×1920, prontos para Reels, TikTok e Shorts. Ao publicar, marque o perfil." },
];

const PLACEHOLDER_STATS = { posts: 34, views: 13874, interactions: 5213 };

export default async function Home() {
  const [templates, stats] = await Promise.all([getTemplates({ onlyActive: true }), getStats()]);
  const featured = templates.slice(0, 4);
  const shown = stats.posts > 0 ? stats : PLACEHOLDER_STATS;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1f3772_0%,transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full bg-gold-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 ring-1 ring-gold-400/30">
              Ferramenta de apoio
            </p>
            <h1 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Você grava.
              <span className="block text-gold-400">A gente monta.</span>
              <span className="block">Você espalha.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-navy-100">
              Envie um vídeo ou uma foto sua e receba vídeos prontos para postar, com
              os textos e a identidade do {SITE.title}. Leva menos de dois minutos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/criar" size="lg" className="w-full justify-center sm:w-auto">Entrar para criar</ButtonLink>
              <ButtonLink href="/templates" variant="outline" size="lg" className="w-full justify-center border-gold-400 text-gold-400 hover:bg-white/10 sm:w-auto">
                Ver templates
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <div className="absolute -inset-4 rounded-full bg-gold-400/20 blur-2xl" />
            <img
              src="/images/thiago-retrato.png"
              alt={`Retrato de ${SITE.shortName}`}
              className="relative w-full rounded-3xl shadow-2xl ring-1 ring-gold-400/40"
              width={720}
              height={900}
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-950/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400 ring-1 ring-gold-400/40">
              {SITE.brand} #{SITE.handle}
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t border-navy-800 bg-navy-900/60 py-3">
          <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-gold-300">
            {[1, 2].map((k) => (
              <span key={k} className="flex gap-10">
                <span>Grave</span><span className="text-navy-400">·</span>
                <span>Escolha</span><span className="text-navy-400">·</span>
                <span>Baixe</span><span className="text-navy-400">·</span>
                <span>Poste</span><span className="text-navy-400">·</span>
                <span>Marque {SITE.handle}</span><span className="text-navy-400">·</span>
                <span>Chame mais gente</span><span className="text-navy-400">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">Faz assim.<br />Dois minutos. Três passos.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p) => (
            <div key={p.n} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
              <span className="font-display text-4xl text-gold-500">{p.n}</span>
              <h3 className="mt-3 font-display text-xl uppercase text-navy-950">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">Templates aprovados</h2>
              <p className="mt-2 text-navy-600">Escolha o seu, envie sua foto ou vídeo e gere.</p>
            </div>
            <ButtonLink href="/templates" variant="outline">Ver todos</ButtonLink>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {featured.map((t) => (
              <Link key={t._id} href="/criar" className="group">
                <div className="overflow-hidden rounded-2xl ring-1 ring-navy-100 transition group-hover:ring-gold-400">
                  <TemplateThumb layers={t.layers} width={t.width} height={t.height} />
                </div>
                <p className="mt-2 text-sm font-semibold text-navy-900 group-hover:text-navy-700">{t.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-center text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#e6b000_0%,transparent_45%)]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl uppercase leading-tight sm:text-5xl">
            Faça parte da<br /><span className="text-gold-400">Tropa do Bem</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-navy-100">
            Entre, concorde com o termo de responsabilidade, crie seu conteúdo e
            publique. A Tropa ficou forte porque cada um faz a sua parte.
          </p>
          <div className="mt-8">
            <ButtonLink href="/login" size="lg">Começar agora</ButtonLink>
          </div>
        </div>
      </section>

      {/* A TROPA POSTANDO */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">A Tropa postando</h2>
            <p className="mt-3 text-navy-600">
              Depoimentos reais publicados pela própria Tropa nas redes sociais.
              Veja o que a galera anda compartilhando.
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-5 sm:gap-6">
              <div>
                <p className="font-display text-3xl text-gold-600"><CountUp value={shown.posts} /></p>
                <p className="text-xs uppercase tracking-wider text-navy-500">posts</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-600"><CountUp value={shown.views} /></p>
                <p className="text-xs uppercase tracking-wider text-navy-500">visualizações</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-600"><CountUp value={shown.interactions} /></p>
                <p className="text-xs uppercase tracking-wider text-navy-500">interações</p>
              </div>
            </div>
            <div className="mt-8">
              <ButtonLink href="/posts" variant="primary">Ver a Tropa</ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl bg-navy-950 p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400">Ultimas publicações</p>
            <div className="mt-4 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-navy-900 px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400 text-sm font-bold text-navy-950">
                    {["@", "#", "❤"][i]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">@{["tropa_da_bem", "fiel_eleitor", "voz_do_bem"][i]}</p>
                    <p className="truncate text-xs text-navy-300">"{["Depoimento da Tropa…", "Vote certo, vote no bem.", "Todo apoio conta!"][i]}"</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-gold-400">{["2,3 mil", "1,1 mil", "856"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}