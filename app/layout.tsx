import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — vídeos prontos para postar`,
    template: `%s — ${SITE.shortName}`,
  },
  description: `Crie, compartilhe e participe. Ferramenta de apoio do vereador ${SITE.title}. Envie sua foto ou vídeo, escolha um template e receba conteúdo pronto para postar.`,
  keywords: [SITE.shortName, "Tropa do Bem", "vereador", "depoimento", "apoio"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivoBlack.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}