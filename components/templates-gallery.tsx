"use client";

import { useState } from "react";
import Link from "next/link";
import { TemplateThumb } from "@/components/template-thumb";

type Template = {
  _id: string;
  name: string;
  description: string;
  kind: "story" | "feed";
  width: number;
  height: number;
  layers: any[];
};

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "story", label: "Stories / Reels / TikTok" },
  { key: "feed", label: "Feed do Instagram" },
];

export function TemplatesGallery({ templates }: { templates: Template[] }) {
  const [filter, setFilter] = useState("todos");

  const filtered = filter === "todos" ? templates : templates.filter((t) => t.kind === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === f.key
                ? "bg-navy-950 text-gold-400"
                : "bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-navy-500">Nenhum template nesta categoria ainda.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((t) => (
            <div key={t._id} className="group">
              <div className="overflow-hidden rounded-2xl ring-1 ring-navy-100 transition group-hover:ring-gold-400">
                <TemplateThumb layers={t.layers} width={t.width} height={t.height} />
              </div>
              <p className="mt-2.5 text-sm font-bold text-navy-950">{t.name}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-navy-500">{t.description}</p>
              <Link
                href={`/criar?template=${t._id}`}
                className="mt-2 inline-flex rounded-full bg-gold-400 px-4 py-1.5 text-xs font-bold text-navy-950 transition hover:bg-gold-300"
              >
                Usar template
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}