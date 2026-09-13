import { ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/config";

export const metadata = { title: "A Tropa" };

const PASSOS = [
  { n: "1", t: "Entre", d: "Crie sua conta e aceite o termo de responsabilidade." },
  { n: "2", t: "Escolha um template", d: "Há opções para Stories, Reels, TikTok e feed." },
  { n: "3", t: "Crie seu conteúdo", d: "Envie sua foto ou vídeo e veja a prévia antes de gerar." },
  { n: "4", t: "Publique", d: "Baixe o vídeo em 1080×1920 e poste nas suas redes." },
  { n: "5", t: "Compartilhe", d: "Marque o perfil oficial na legenda e chame mais gente." },
];

export default function ATropaPage() {
  return (
    <div>
      <section className="bg-navy-950 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">A Tropa do Bem</p>
          <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl">Uma comunidade de pessoas que querem ajudar a divulgar o trabalho do {SITE.shortName}.</h1>
          <p className="mx-auto mt-5 max-w-xl text-navy-100">{SITE.phrase}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-2xl uppercase text-navy-950">Como funciona?</h2>
        <div className="mt-8 space-y-4">
          {PASSOS.map((p) => (
            <div key={p.n} className="flex items-start gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-lg text-navy-950">
                {p.n}
              </span>
              <div>
                <h3 className="font-display text-lg uppercase text-navy-950">{p.t}</h3>
                <p className="mt-1 text-sm text-navy-600">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/login" size="lg">Entrar e criar meus vídeos</ButtonLink>
          <ButtonLink href="/posts" variant="outline" size="lg">Ver a Tropa postando</ButtonLink>
        </div>
      </section>
    </div>
  );
}