import { getSessionOrRedirect, getCurrentUserSafe } from "@/lib/dal";
import { SITE } from "@/lib/config";

export const metadata = { title: "Perfil" };

export default async function PerfilPage() {
  await getSessionOrRedirect();
  const user = await getCurrentUserSafe();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl uppercase text-navy-950">Meu perfil</h1>
      <p className="mt-1 text-sm text-navy-500">Suas informações de acesso.</p>

      <div className="mt-8 space-y-4 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-navy-100">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-xl font-bold text-navy-950">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-display text-lg text-navy-950">{user.name}</p>
            {user.role === "admin" && (
              <span className="mt-0.5 inline-block rounded bg-navy-950 px-2 py-0.5 text-[10px] font-bold uppercase text-gold-400">Admin</span>
            )}
          </div>
        </div>
        <dl className="divide-y divide-navy-100 text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-navy-500">E-mail</dt>
            <dd className="font-semibold text-navy-950">{user.email}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-navy-500">Termo aceito em</dt>
            <dd className="font-semibold text-navy-950">
              {user.acceptedTermsAt ? new Date(user.acceptedTermsAt).toLocaleDateString("pt-BR") : "—"}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-navy-500">Ferramenta</dt>
            <dd className="font-semibold text-navy-950">{SITE.name}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}