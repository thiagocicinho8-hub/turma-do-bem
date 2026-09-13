import { redirect } from "next/navigation";
import Link from "next/link";
import { readOAuthPending, acceptOAuthTerms } from "@/lib/actions/auth";
import { Logo } from "@/components/logo";

export default async function AceitarTermosPage() {
  const pending = await readOAuthPending();
  if (!pending) redirect("/login");

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-navy-100">
          <h1 className="font-display text-2xl uppercase text-navy-950">
            Um último passo
          </h1>
          <p className="mt-1 mb-6 text-sm text-navy-500">
            Seu acesso será criado com o Google (<b className="text-navy-800">{pending.email}</b>).
            Antes de publicar, precisamos do seu aceite aos termos.
          </p>

          <div className="mb-6 rounded-2xl bg-navy-50 p-4 text-sm leading-relaxed text-navy-700">
            <p className="font-bold text-navy-900">
              Termo de responsabilidade (resumo)
            </p>
            <p className="mt-2">
              Você assume a responsabilidade pelos conteúdos que criar e publicar;
              se compromete a não gerar desinformação, discurso de ódio ou conteúdo
              ilegal; e entende que a plataforma apenas fornece as ferramentas de
              apoio. Guardamos somente seu nome e e-mail.
            </p>
            <Link
              href="/termos"
              className="mt-2 inline-block font-medium text-blue-600 underline"
            >
              Ler o termo completo
            </Link>
          </div>

          <form action={acceptOAuthTerms}>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-700">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-blue-600"
              />
              <span>
                Li e aceito o termo de responsabilidade da plataforma.
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-900"
            >
              Aceitar e criar conta
            </button>
          </form>

          <Link
            href="/login"
            className="mt-4 block text-center text-sm font-medium text-navy-500 hover:text-navy-700"
          >
            Cancelar e voltar
          </Link>
        </div>
      </div>
    </div>
  );
}