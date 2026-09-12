"use client";

import { useActionState } from "react";
import { updatePostMetrics } from "@/lib/actions/admin";
import { Button } from "@/components/ui";

export function PostEditor({ post }: { post: any }) {
  const [state, action, pending] = useActionState(updatePostMetrics, undefined);

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={post.id} />
      <input
        name="views"
        defaultValue={post.views}
        type="number"
        className="w-20 rounded-lg border border-navy-200 px-2 py-1 text-xs font-semibold"
        aria-label="Visualizações"
      />
      <input
        name="interactions"
        defaultValue={post.interactions}
        type="number"
        className="w-20 rounded-lg border border-navy-200 px-2 py-1 text-xs font-semibold"
        aria-label="Interações"
      />
      <select
        name="status"
        defaultValue={post.status}
        className="rounded-lg border border-navy-200 px-2 py-1 text-xs font-semibold"
      >
        <option value="aprovado">Aprovado</option>
        <option value="revisao">Revisão</option>
        <option value="rejeitado">Rejeitado</option>
      </select>
      <Button variant="ghost" size="sm" disabled={pending}>
        {pending ? "…" : "Salvar"}
      </Button>
      {state?.ok && <span className="text-xs font-bold text-emerald-600">OK</span>}
    </form>
  );
}