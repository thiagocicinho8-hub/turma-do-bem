"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { Button, Input, Field } from "@/components/ui";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="E-mail" error={state?.errors?.email}>
        <Input type="email" name="email" placeholder="voce@email.com" autoComplete="email" required />
      </Field>
      <Field label="Senha" error={state?.errors?.password}>
        <Input type="password" name="password" placeholder="••••••••" autoComplete="current-password" required />
      </Field>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.message}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </Button>

      <p className="text-center text-sm text-navy-500">
        Ainda não tem conta?{" "}
        <Link href="/registro" className="font-semibold text-navy-900 underline hover:text-gold-600">
          Criar minha conta
        </Link>
      </p>
      <p className="text-center">
        <Link href="/esqueci-senha" className="text-xs text-navy-500 underline hover:text-navy-900">
          Esqueci minha senha
        </Link>
      </p>
    </form>
  );
}