import { verifySession } from "@/lib/dal";
import { dbReady } from "@/lib/db";
import { Video } from "@/lib/models/Video";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) return Response.json({ error: "Não autorizado." }, { status: 401 });

  const ready = await dbReady();
  if (!ready) return Response.json({ error: "Banco de dados indisponível." }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file") as File | null;
  const templateId = String(form.get("templateId") ?? "");
  const inputType = String(form.get("inputType") ?? "photo");
  const fileType = String(form.get("fileType") ?? "");

  if (!file || !templateId) {
    return Response.json({ error: "Dados incompletos." }, { status: 400 });
  }

  let outputUrl = "";
  let outputName = "";

  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  if (hasBlob) {
    try {
      const { put } = await import("@vercel/blob");
      const ext = fileType.includes("mp4") ? "mp4" : "webm";
      outputName = `tropa-${session.userId}-${Date.now()}.${ext}`;
      const blob = await put(`videos/${outputName}`, file, { access: "public" });
      outputUrl = blob.url;
    } catch (e) {
      console.error("[api/videos] upload falhou:", e);
    }
  }

  const doc = await Video.create({
    userId: session.userId,
    templateId,
    inputType: inputType === "video" ? "video" : "photo",
    inputName: file.name,
    outputUrl,
    outputName: outputName || file.name,
    size: file.size,
    status: hasBlob ? "pronto" : "processando",
  });

  return Response.json({ ok: true, video: { id: String(doc._id), outputUrl } });
}