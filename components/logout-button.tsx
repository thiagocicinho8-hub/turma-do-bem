"use client";

import { useActionState } from "react";
import { logout } from "@/lib/actions/auth";

export function LogoutButton({ className }: { className?: string }) {
  const [, action, pending] = useActionState(logout, undefined);
  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className={`inline-flex items-center rounded-full bg-gold-400 px-4 py-2 text-sm font-bold text-navy-950 transition hover:bg-gold-300 disabled:opacity-60 ${className ?? ""}`}
      >
        {pending ? "Saindo…" : "Sair"}
      </button>
    </form>
  );
}