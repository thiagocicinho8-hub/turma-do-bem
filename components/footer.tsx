import Link from "next/link";
import { SITE } from "@/lib/config";
import { LogoDark } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <LogoDark />
            </Link>
            <p className="mt-4 text-sm text-navy-200">{SITE.phrase}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {SITE.instagram && (
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300"
                >
                  Instagram
                </a>
              )}
              {SITE.tiktok && (
                <a
                  href={SITE.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300"
                >
                  TikTok
                </a>
              )}
              {SITE.whatsapp && (
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-display uppercase text-gold-400 text-xs tracking-widest">Navegação</span>
              <Link href="/" className="hover:text-gold-300">Início</Link>
              <Link href="/criar" className="hover:text-gold-300">Criar vídeo</Link>
              <Link href="/templates" className="hover:text-gold-300">Templates</Link>
              <Link href="/posts" className="hover:text-gold-300">A Tropa postando</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-display uppercase text-gold-400 text-xs tracking-widest">Institucional</span>
              <Link href="/a-tropa" className="hover:text-gold-300">Como funciona</Link>
              <Link href="/termos" className="hover:text-gold-300">Termo de responsabilidade</Link>
              <Link href="/login" className="hover:text-gold-300">Entrar</Link>
            </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-6 text-xs text-navy-300">
          <p>
            Criar e postar vídeos não geram qualquer tipo de benefício material. A gente só
            libera a ferramenta; o que você faz com ela é decisão sua.
          </p>
          <p className="mt-2">
            {SITE.title} · 1080×1920 · 30 fps · H.264 — {SITE.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}