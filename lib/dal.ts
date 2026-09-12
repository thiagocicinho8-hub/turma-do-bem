import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import { dbReady } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Template } from "@/lib/models/Template";
import { Post } from "@/lib/models/Post";
import { Video } from "@/lib/models/Video";
import { seedTemplates } from "@/lib/template-seed";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }
  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getSessionOrRedirect = cache(async () => {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

export const getCurrentUserSafe = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  const ready = await dbReady();
  if (!ready) return null;
  const user = await User.findById(session.userId).lean();
  if (!user) return null;
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    acceptedTermsAt: user.acceptedTermsAt,
  };
});

let seedingAttempted = false;

export async function ensureTemplatesSeeded() {
  const ready = await dbReady();
  if (!ready) return;
  if (seedingAttempted) return;
  seedingAttempted = true;
  const count = await Template.countDocuments();
  if (count > 0) return;
  await Template.insertMany(seedTemplates as any[]);
}

export async function getTemplates(opts: { onlyActive?: boolean; kind?: string; filter?: string } = {}) {
  await ensureTemplatesSeeded();
  const ready = await dbReady();
  if (!ready) return [];
  const query: Record<string, unknown> = {};
  if (opts.onlyActive) query.status = "ativo";
  if (opts.kind && opts.kind !== "todos") query.kind = opts.kind;
  if (opts.filter && opts.filter !== "todos") query.category = opts.filter;
  const docs = await Template.find(query).sort({ createdAt: 1 }).lean();
  return docs.map((t: any) => ({
    _id: String(t._id),
    name: t.name,
    description: t.description,
    category: t.category,
    kind: t.kind,
    width: t.width,
    height: t.height,
    fallbackDuration: t.fallbackDuration,
    hasAudio: t.hasAudio,
    layers: t.layers,
    status: t.status,
    createdAt: t.createdAt,
  }));
}

export async function getTemplateById(id: string) {
  const ready = await dbReady();
  if (!ready) return null;
  const doc = await Template.findById(id).lean();
  if (!doc) return null;
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description,
    category: doc.category,
    kind: doc.kind,
    width: doc.width,
    height: doc.height,
    fallbackDuration: doc.fallbackDuration,
    hasAudio: doc.hasAudio,
    layers: doc.layers,
    status: doc.status,
    createdAt: doc.createdAt,
  };
}

export async function getAllTemplates() {
  await ensureTemplatesSeeded();
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await Template.find().sort({ createdAt: 1 }).lean();
  return docs.map((t: any) => ({
    _id: String(t._id),
    name: t.name,
    description: t.description,
    category: t.category,
    kind: t.kind,
    width: t.width,
    height: t.height,
    fallbackDuration: t.fallbackDuration,
    hasAudio: t.hasAudio,
    layers: t.layers,
    status: t.status,
    createdAt: t.createdAt,
  }));
}

export async function getRecentPosts() {
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await Post.find({ status: "aprovado" })
    .sort({ interactions: -1, createdAt: -1 })
    .limit(30)
    .lean();
  return docs.map((p: any) => ({
    _id: String(p._id),
    userName: p.userName,
    platform: p.platform,
    url: p.url,
    caption: p.caption,
    views: p.views,
    interactions: p.interactions,
    createdAt: p.createdAt,
  }));
}

export async function getVideosForUser(userId: string) {
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await Video.find({ userId })
    .sort({ createdAt: -1 })
    .lean();
  return docs.map((v: any) => ({
    _id: String(v._id),
    userId: String(v.userId),
    templateId: String(v.templateId),
    inputType: v.inputType,
    inputName: v.inputName,
    outputUrl: v.outputUrl,
    outputName: v.outputName,
    duration: v.duration,
    size: v.size,
    status: v.status,
    createdAt: v.createdAt,
  }));
}

export async function getAdminUsers() {
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await User.find().sort({ createdAt: -1 }).limit(200).lean();
  return docs.map((u: any) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    acceptedTermsAt: u.acceptedTermsAt,
    createdAt: u.createdAt,
  }));
}

export async function getAdminVideos() {
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await Video.find().sort({ createdAt: -1 }).limit(100).lean();
  const templateNames = new Map<string, string>();
  for (const t of await Template.find().lean()) {
    templateNames.set(String(t._id), t.name);
  }
  return docs.map((v: any) => ({
    id: String(v._id),
    templateName: templateNames.get(String(v.templateId)) ?? "—",
    inputType: v.inputType,
    outputUrl: v.outputUrl,
    outputName: v.outputName,
    size: v.size,
    status: v.status,
    createdAt: v.createdAt,
  }));
}

export async function getAdminPosts() {
  const ready = await dbReady();
  if (!ready) return [];
  const docs = await Post.find().sort({ createdAt: -1 }).limit(200).lean();
  return docs.map((p: any) => ({
    id: String(p._id),
    userName: p.userName,
    platform: p.platform,
    url: p.url,
    caption: p.caption,
    views: p.views,
    interactions: p.interactions,
    status: p.status,
    createdAt: p.createdAt,
  }));
}

export async function getStats() {
  const ready = await dbReady();
  if (!ready) {
    return { users: 0, templates: 0, videos: 0, posts: 0, views: 0, interactions: 0 };
  }
  const [users, templates, videos, posts] = await Promise.all([
    User.countDocuments(),
    Template.countDocuments(),
    Video.countDocuments(),
    Post.countDocuments(),
  ]);
  const agg = await Post.aggregate([
    { $group: { _id: null, views: { $sum: "$views" }, interactions: { $sum: "$interactions" } } },
  ]);
  return {
    users,
    templates,
    videos,
    posts,
    views: agg[0]?.views ?? 0,
    interactions: agg[0]?.interactions ?? 0,
  };
}