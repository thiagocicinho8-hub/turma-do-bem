"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function PostSubmit() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    if (!url.trim()) {
      setError("Informe o link da publicação.");
      return;
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, url: url.trim(), caption: caption.trim() }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => null);
      setError(d?.error ?? "Não foi possível registrar.");
      return;
    }
    setDone(true);
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg uppercase text-navy-950">Quer aparecer aqui?</h2>
      <p className="mt-1 text-sm text-navy-600">
        Publique seu vídeo marcando o perfil na legenda e registre o link abaixo.
      </p>
      {!open ? (
        <Button className="mt-4" onClick={() => setOpen(true)}>Registrar minha publicação</Button>
      ) : done ? (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          Publicação registrada. Aparecer nesta lista não gera benefício material — é apenas um mural de apoio espontâneo.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-navy-900"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube Shorts</option>
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link da sua publicação"
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-navy-900"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Legenda (opcional)"
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-navy-900"
          />
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <Button onClick={submit}>Enviar</Button>
        </div>
      )}
    </div>
  );
}