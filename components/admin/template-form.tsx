"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { createTemplate, updateTemplate } from "@/lib/actions/admin";
import { Button, Input, Field, Select, Textarea } from "@/components/ui";

export function TemplateForm({
  initial,
  mode,
}: {
  initial?: { id: string; name: string; description: string; kind: string; category: string; fallbackDuration: number; status: string; layers: any[] };
  mode: "create" | "edit";
}) {
  const action = mode === "create" ? createTemplate : updateTemplate;
  const [state, formAction, pending] = useActionState(action, undefined);
  const [layersText, setLayersText] = useState(
    JSON.stringify(initial?.layers ?? defaultLayers(), null, 2)
  );

  useEffect(() => {
    setLayersText(JSON.stringify(initial?.layers ?? defaultLayers(), null, 2));
  }, [initial]);

  return (
    <form action={formAction} className="space-y-4">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <Field label="Nome" error={state?.errors?.name}>
        <Input name="name" defaultValue={initial?.name} placeholder="Ex.: Meu voto é Thiago" required />
      </Field>
      <Field label="Descrição">
        <Input name="description" defaultValue={initial?.description} placeholder="Breve descrição" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Formato">
          <Select name="kind" defaultValue={initial?.kind ?? "story"}>
            <option value="story">Story 1080×1920</option>
            <option value="feed">Feed 1080×1080</option>
          </Select>
        </Field>
        <Field label="Categoria">
          <Select name="category" defaultValue={initial?.category ?? "todos"}>
            <option value="todos">Todos</option>
            <option value="story">Stories</option>
            <option value="feed">Feed</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Duração (foto)">
          <Input type="number" name="fallbackDuration" defaultValue={initial?.fallbackDuration ?? 8} min={3} max={30} />
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue={initial?.status ?? "ativo"}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </Select>
        </Field>
      </div>

      <Field label="Camadas (JSON)" error={state?.errors?.layers}>
        <Textarea
          name="layers"
          value={layersText}
          onChange={(e) => setLayersText(e.target.value)}
          className="min-h-64 font-mono text-xs"
        />
      </Field>

      <details className="rounded-xl bg-navy-50 p-4 text-xs text-navy-600">
        <summary className="cursor-pointer font-semibold text-navy-900">Como funciona o JSON de camadas?</summary>
        <p className="mt-2 leading-relaxed">
          Cada camada tem <code>type</code>, <code>id</code>, posição <code>x/y</code> e tamanho{" "}
          <code>w/h</code> em pixels (base 1080). Tipos: <code>background</code> (cor gradiente
          preenchendo a tela), <code>shape</code> (retângulo arredondado), <code>photo</code>{" "}
          (região onde a foto/vídeo do apoiador entra) e <code>text</code> (frase com{" "}
          <code>fontSize</code>, <code>color</code>, <code>align</code>, <code>maxWidth</code>).
          Para a foto não aparecer no preview sem mídia, deixe a camada <code>photo</code> com{" "}
          <code>radius</code> para bordas arredondadas.
        </p>
      </details>

      {state?.ok && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          {state.message}
        </p>
      )}
      {state?.message && !state.ok && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.message}</p>
      )}
      {state?.errors?.layers && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.errors.layers}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando…" : mode === "create" ? "Criar template" : "Salvar alterações"}
        </Button>
        <Link href="/admin/templates" className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50">
          Voltar
        </Link>
      </div>
    </form>
  );
}

function defaultLayers() {
  return [
    { type: "background", id: "bg", x: 0, y: 0, w: 1080, h: 1920, gradient: { from: "#071229", to: "#1f3772", angle: 180 } },
    { type: "photo", id: "photo", x: 190, y: 300, w: 700, h: 900, radius: 48 },
    { type: "text", id: "kicker", x: 90, y: 1300, w: 900, text: "MEU VOTO É", fontSize: 64, color: "#ffc400", weight: "800", align: "center", maxWidth: 900 },
    { type: "text", id: "title", x: 90, y: 1380, w: 900, text: "THIAGO CICINHO", fontSize: 118, color: "#ffffff", weight: "900", align: "center", maxWidth: 900 },
    { type: "text", id: "handle", x: 90, y: 1660, w: 900, text: "@vereadorthiagocicinho", fontSize: 50, color: "#ffc400", weight: "700", align: "center", maxWidth: 900 },
  ];
}