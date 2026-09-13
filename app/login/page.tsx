import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { LoginForm } from "@/components/forms/login-form";
import GoogleButton from "@/components/auth/google-button";
import OAuthErrorBanner from "@/components/auth/oauth-error-banner";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/config";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await verifySession();
  if (session) redirect("/criar");

  const { error } = await props.searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-navy-100">
          <h1 className="font-display text-2xl uppercase text-navy-950">Acesso</h1>
          <p className="mt-1 mb-6 text-sm text-navy-500">
            Entre para criar seus vídeos e fazer parte da {SITE.name}.
          </p>
          <OAuthErrorBanner error={error} />
          <LoginForm />
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-navy-100" />
            <span className="text-xs font-medium uppercase tracking-wider text-navy-400">
              ou
            </span>
            <span className="h-px flex-1 bg-navy-100" />
          </div>
          <GoogleButton />
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-navy-500">
          A plataforma disponibiliza ferramentas para criação e compartilhamento de
          conteúdos de apoio. Guardamos apenas seu nome e e-mail.
        </p>
      </div>
    </div>
  );
}