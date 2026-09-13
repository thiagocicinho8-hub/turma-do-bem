import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionOrRedirect, getCurrentUserSafe } from "@/lib/dal";
import {
  connectInstagram,
  confirmInstagram,
  removeInstagram,
} from "@/lib/actions/onboarding";
import { SITE } from "@/lib/config";
import { Logo } from "@/components/logo";
import { LogoutButton } from "@/components/logout-button";
import { OnboardingSteps } from "@/components/onboarding/steps";

export default async function InstagramPage(props: {
  searchParams: Promise<{ error?: string; added?: string; confirmed?: string }>;
}) {
  const session = await getSessionOrRedirect();
  const user = await getCurrentUserSafe();
  if (!user || user.id !== session.userId) redirect("/login");

  const { error, added, confirmed } = await props.searchParams;
  const profiles = user.instagramProfiles ?? [];
  const remaining = 3 - profiles.length;
  const pending = profiles.find((p) => p.status === "pending");
  const canContinue = profiles.some((p) => p.status === "confirmed");

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
          <OnboardingSteps current={2} />

          <h1 className="mt-6 font-display text-2xl uppercase text-navy-950">Ligue seu Instagram</h1>
          <p className="mt-1 text-sm leading-relaxed text-navy-600">
            Verificando seu @ agora: todo vídeo que você postar marcando{" "}
            <b className="text-navy-900">{SITE.handle}</b> já entra na contagem da tropa desde o
            primeiro. Sem senha: você põe um código temporário na bio e depois apaga.
          </p>

          {error === "invalid" && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Perfil, @ ou link não reconhecido. Confira e tente de novo.
            </p>
          )}
          {error === "duplicate" && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Esse perfil já está ligado à sua conta.
            </p>
          )}
          {error === "limit" && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Você já ligou 3 perfis, que é o máximo.
            </p>
          )}
          {error === "db" && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Banco de dados indisponível. Tente novamente em instantes.
            </p>
          )}
          {added === "1" && (
            <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 ring-1 ring-green-200">
              Perfil salvo. Faça a verificação abaixo.
            </p>
          )}
          {confirmed === "1" && (
            <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 ring-1 ring-green-200">
              Perfil verificado. Bem-vindo à tropa!
            </p>
          )}

          <div className="mt-6 space-y-3 rounded-2xl bg-navy-50 p-4 text-sm leading-relaxed text-navy-600">
            <p>
              Você coloca um <b className="text-navy-900">código temporário na bio</b> para provar
              que o perfil é seu e depois pode apagar. A gente não pede senha nem acesso à conta, e
              só olha os posts públicos que mencionam {SITE.handle}. O perfil precisa ser público.
              Dá para conectar até 3 perfis.
            </p>
            <p>
              Seus posts entram na lista da tropa, uma página aberta: qualquer pessoa, logada ou
              não, vê o seu @, a legenda e os números públicos do post. Aparecer nesta lista não
              gera qualquer benefício material, financeiro ou vantagem de qualquer espécie. Não é
              concurso nem premiação. O site existe apenas para facilitar atos de apoio
              espontâneos.
            </p>
          </div>

          {profiles.length > 0 && (
            <ul className="mt-6 space-y-3">
              {profiles.map((p) => (
                <li
                  key={p._id}
                  className="rounded-2xl ring-1 ring-navy-200 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-navy-900">@{p.handle}</p>
                    {p.status === "confirmed" ? (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold uppercase text-green-700 ring-1 ring-green-200">
                        Verificado
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase text-amber-700 ring-1 ring-amber-200">
                        Aguardando verificação
                      </span>
                    )}
                    <form action={removeInstagram}>
                      <input type="hidden" name="profileId" value={p._id} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-red-600 hover:text-red-800"
                      >
                        Remover
                      </button>
                    </form>
                  </div>

                  {p.status === "pending" && (
                    <div className="mt-3 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-200">
                      <p className="text-xs text-amber-800">
                        1. Copie o código abaixo e coloque na bio do Instagram.
                      </p>
                      <p className="my-2 rounded-lg bg-white px-3 py-2 text-center font-mono text-lg font-bold tracking-widest text-navy-950 ring-1 ring-navy-200">
                        {p.code}
                      </p>
                      <p className="mb-2 text-xs text-amber-800">
                        2. Depois que estiver na bio, confirme aqui. Você pode apagar o código em
                        seguida.
                      </p>
                      <form action={confirmInstagram}>
                        <input type="hidden" name="profileId" value={p._id} />
                        <button
                          type="submit"
                          className="w-full rounded-full bg-amber-500 px-4 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-amber-400"
                        >
                          Já coloquei o código na bio
                        </button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {remaining > 0 && !pending && (
            <form action={connectInstagram} className="mt-6">
              <label htmlFor="handle" className="mb-1 block text-sm font-bold text-navy-800">
                Perfil, @ ou link
              </label>
              <input
                id="handle"
                name="handle"
                type="text"
                required
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="seuperfil, @seuperfil ou instagram.com/seuperfil"
                className="w-full rounded-2xl bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-navy-200 outline-none placeholder:font-normal placeholder:text-navy-400 focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-900"
              >
                Conectar meu perfil
              </button>
            </form>
          )}

          {remaining > 0 && (
            <p className="mt-3 text-center text-xs text-navy-400">
              Você pode ligar até 3 perfis ({remaining} restante{remaining > 1 ? "s" : ""}).
            </p>
          )}

          <div className="mt-8 border-t border-navy-100 pt-5">
            {canContinue ? (
              <Link
                href="/criar"
                className="block w-full rounded-full bg-green-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-700"
              >
                Ir para o estúdio
              </Link>
            ) : (
              <Link
                href="/criar"
                className="block w-full rounded-full bg-navy-100 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-navy-700 transition hover:bg-navy-200"
              >
                Fazer isso depois
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}