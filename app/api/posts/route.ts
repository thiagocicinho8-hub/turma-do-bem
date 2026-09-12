import { verifySession } from "@/lib/dal";
import { dbReady } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { User } from "@/lib/models/User";

export const runtime = "nodejs";

const PLATFORMS = ["instagram", "tiktok", "youtube"];

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) return Response.json({ error: "Não autorizado." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Corpo inválido." }, { status: 400 });

  const platform = String(body.platform ?? "");
  const url = String(body.url ?? "").trim();
  const caption = String(body.caption ?? "").trim();

  const p = platform as "instagram" | "tiktok" | "youtube";
  if (!PLATFORMS.includes(platform)) return Response.json({ error: "Plataforma inválida." }, { status: 400 });
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return Response.json({ error: "Informe um link válido (começando com http)." }, { status: 400 });
  }

  const ready = await dbReady();
  if (!ready) return Response.json({ error: "Banco de dados indisponível." }, { status: 503 });

  const user = await User.findById(session.userId).lean();

  const doc = await Post.create({
    userId: session.userId,
    userName: user?.name ?? "tropa",
    platform: p,
    url,
    caption,
    views: 0,
    interactions: 0,
    status: "aprovado",
  });

  return Response.json({ ok: true, postId: String(doc._id) });
}