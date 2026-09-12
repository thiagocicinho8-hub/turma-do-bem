import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { RegisterForm } from "@/components/forms/register-form";
import { Logo } from "@/components/logo";

export default async function RegistroPage() {
  const session = await verifySession();
  if (session) redirect("/criar");

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-navy-100">
          <h1 className="font-display text-2xl uppercase text-navy-950">Criar conta</h1>
          <p className="mt-1 mb-6 text-sm text-navy-500">
            Leva menos de um minuto. Depois é só criar e publicar.
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}