"use server";

import { getSessionOrRedirect, ensureTemplatesSeeded } from "@/lib/dal";
import { dbReady } from "@/lib/db";
import { Template } from "@/lib/models/Template";
import { Post } from "@/lib/models/Post";
import { User } from "@/lib/models/User";

export type AdminFormState =
  | { ok?: boolean; message?: string; errors?: Record<string, string> }
  | undefined;

async function ensureAdmin() {
  const s = await getSessionOrRedirect();
  if (s.role !== "admin") throw new Error("Não autorizado.");
  return s;
}

export async function toggleTemplate(fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    await ensureTemplatesSeeded();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };
    const id = String(fd.get("id"));
    const doc = await Template.findById(id).lean();
    if (!doc) return { message: "Template não encontrado." };
    await Template.findByIdAndUpdate(id, { status: doc.status === "ativo" ? "inativo" : "ativo" });
    return { ok: true, message: "Status atualizado." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}

export async function createTemplate(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    await ensureTemplatesSeeded();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };

    const name = String(fd.get("name") ?? "").trim();
    const description = String(fd.get("description") ?? "").trim();
    const kind = String(fd.get("kind") ?? "story");
    const category = String(fd.get("category") ?? "todos");
    const fallbackDuration = Number(fd.get("fallbackDuration") ?? 8);
    const status = String(fd.get("status") ?? "ativo");
    const layersRaw = String(fd.get("layers") ?? "[]");

    if (!name) return { errors: { name: "Nome obrigatório." } };

    let layers: any[];
    try {
      layers = JSON.parse(layersRaw);
      if (!Array.isArray(layers)) throw new Error();
    } catch {
      return { errors: { layers: "JSON inválido — deve ser um array." } };
    }

    await Template.create({
      name,
      description,
      kind: kind === "feed" ? "feed" : "story",
      category,
      fallbackDuration,
      status,
      width: kind === "feed" ? 1080 : 1080,
      height: kind === "feed" ? 1080 : 1920,
      layers,
    } as any);

    return { ok: true, message: "Template criado." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}

export async function updateTemplate(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };
    const id = String(fd.get("id"));
    const update: Record<string, unknown> = {};
    const fields = ["name", "description", "kind", "category", "fallbackDuration", "status"] as const;
    for (const f of fields) {
      const v = fd.get(f);
      if (v !== null) update[f] = f === "fallbackDuration" ? Number(v) : String(v);
    }
    const layersRaw = fd.get("layers");
    if (layersRaw) {
      try {
        const layers = JSON.parse(String(layersRaw));
        if (Array.isArray(layers)) update.layers = layers;
      } catch {
        return { errors: { layers: "JSON inválido." } };
      }
    }
    await Template.findByIdAndUpdate(id, update as any);
    return { ok: true, message: "Template atualizado." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}

export async function deleteTemplate(fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };
    await Template.findByIdAndDelete(String(fd.get("id")));
    return { ok: true, message: "Template removido." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}

export async function updatePostMetrics(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };
    const id = String(fd.get("id"));
    const views = Number(fd.get("views") ?? 0);
    const interactions = Number(fd.get("interactions") ?? 0);
    const status = String(fd.get("status") ?? "aprovado");
    await Post.findByIdAndUpdate(id, { views, interactions, status } as any);
    return { ok: true, message: "Post atualizado." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}

export async function deleteUser(fd: FormData): Promise<AdminFormState> {
  try {
    await ensureAdmin();
    const ready = await dbReady();
    if (!ready) return { message: "Banco de dados indisponível." };
    await User.findByIdAndDelete(String(fd.get("id")));
    return { ok: true, message: "Usuário removido." };
  } catch (e: any) {
    return { message: e.message ?? "Falha." };
  }
}