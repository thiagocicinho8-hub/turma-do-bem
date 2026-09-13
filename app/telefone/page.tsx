import { redirect } from "next/navigation";
import { getSessionOrRedirect, getCurrentUserSafe } from "@/lib/dal";
import { savePhone } from "@/lib/actions/onboarding";
import { Logo } from "@/components/logo";
import { LogoutButton } from "@/components/logout-button";
import { OnboardingSteps } from "@/components/onboarding/steps";

export default async function TelefonePage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSessionOrRedirect();
  const user = await getCurrentUserSafe();
  if (!user || user.id !== session.userId) redirect("/login");
  if (user.phone) redirect("/instagram");

  const { error } = await props.searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Logo />
          <div className="text-center text-sm text-navy-600">
            Você entrou como <b className="text-navy-900">{user.name}</b>. Não é você?{" "}
            <LogoutButton className="!bg-transparent !p-0 !text-blue-700 underline" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-navy-100">
          <OnboardingSteps current={1} />

          <h1 className="mt-6 font-display text-2xl uppercase text-navy-950">Seu telefone</h1>
          <p className="mt-1 mb-6 text-sm text-navy-500">
            Usamos para falar com você sobre a mobilização. Depois disso, é só ligar seu
            Instagram.
          </p>

          {error === "invalid" && (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Confira o número: celular com DDD, 10 ou 11 dígitos.
            </p>
          )}
          {error === "db" && (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Banco de dados indisponível. Tente novamente em instantes.
            </p>
          )}

          <form action={savePhone} className="space-y-4">
            <div>
              <label htmlFor="country" className="mb-1 block text-sm font-bold text-navy-800">
                País
              </label>
              <div className="flex items-center gap-2 rounded-full bg-navy-50 px-4 py-3 ring-1 ring-navy-200">
                <span className="text-lg">🇧🇷</span>
                <span className="text-sm font-semibold text-navy-800">Brasil (+55)</span>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-bold text-navy-800">
                Telefone com DDD
              </label>
              <div className="flex items-center gap-2 rounded-full bg-navy-50 px-2 py-2 ring-1 ring-navy-200">
                <span className="ml-2 shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-navy-500 ring-1 ring-navy-100">
                  🇧🇷 +55
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoFocus
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  pattern="[0-9\(\)\-\s]{10,15}"
                  className="w-full bg-transparent text-sm font-semibold text-navy-900 outline-none placeholder:text-navy-400"
                />
              </div>
              <p className="mt-1 pl-2 text-xs text-navy-400">Celular com DDD, 11 dígitos.</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-navy-600">
              <input
                type="checkbox"
                name="terms"
                required
                defaultChecked
                className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-blue-600"
              />
              <span>
                Li e aceito o termo de responsabilidade. Entendo que o que eu gravo e publico é
                responsabilidade minha e que conteúdo de ódio, sexual ou ilegal é proibido.
                Criar e postar vídeos não gera qualquer tipo de benefício material. A gente
                libera a ferramenta; o que você faz com ela é decisão sua.
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-900"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}