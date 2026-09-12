import { SITE } from "@/lib/config";

export const metadata = { title: "Esqueci minha senha" };

export default function EsqueciSenhaPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-navy-100">
        <h1 className="font-display text-2xl uppercase text-navy-950">Esqueci minha senha</h1>
        <p className="mt-2 text-sm text-navy-500">
          No MVP a recuperação de senha é feita pela equipe da campanha. Fale com
          administradores pelo contato oficial ou envie um e-mail para{" "}
          <span className="font-semibold text-navy-900">{SITE.contactEmail}</span> com
          o e-mail da sua conta que restabelecemos o acesso.
        </p>
      </div>
    </div>
  );
}