"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions/auth";
import { Button, Input, Field } from "@/components/ui";
import { SITE } from "@/lib/config";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Nome" error={state?.errors?.name}>
        <Input type="text" name="name" placeholder="Seu nome" autoComplete="name" required />
      </Field>
      <Field label="E-mail" error={state?.errors?.email}>
        <Input type="email" name="email" placeholder="voce@email.com" autoComplete="email" required />
      </Field>
      <Field label="Senha" error={state?.errors?.password}>
        <Input type="password" name="password" placeholder="Mínimo 8 caracteres" autoComplete="new-password" minLength={8} required />
      </Field>
      <Field label="Confirmar senha" error={state?.errors?.confirm}>
        <Input type="password" name="confirm" placeholder="Repita a senha" autoComplete="new-password" minLength={8} required />
      </Field>

      <Field error={state?.errors?.terms}>
        <label className="flex items-start gap-2 text-sm text-navy-700">
          <input type="checkbox" name="terms" className="mt-0.5 h-4 w-4 accent-navy-900" />
          <span>
            Li e aceito o{" "}
            <Link href="/termos" className="font-semibold text-navy-900 underline hover:text-gold-600">
              termo de responsabilidade
            </Link>
            {" "}da plataforma {SITE.name}.
          </span>
        </label>
      </Field>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.message}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Criando…" : "Criar minha conta"}
      </Button>

      <p className="text-center text-sm text-navy-500">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-navy-900 underline hover:text-gold-600">
          Entrar
        </Link>
      </p>
    </form>
  );
}