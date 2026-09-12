"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderFrame } from "@/lib/video/render";
import { createCanvasRecorder, downloadBlob } from "@/components/studio/recorder";
import { TemplateThumb } from "@/components/template-thumb";
import { Button } from "@/components/ui";

type Tpl = {
  _id: string;
  name: string;
  description: string;
  kind: "story" | "feed";
  width: number;
  height: number;
  fallbackDuration: number;
  layers: any[];
};

type MediaStatus = "empty" | "video" | "photo";

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

export function VideoStudio({ templates, preSelectedId }: { templates: Tpl[]; preSelectedId?: string }) {
  const [selectedId, setSelectedId] = useState(preSelectedId ?? templates[0]?._id);
  const template = useMemo(
    () => templates.find((t) => t._id === selectedId) ?? templates[0],
    [templates, selectedId]
  );

  const [mediaStatus, setMediaStatus] = useState<MediaStatus>("empty");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>("");

  const [phase, setPhase] = useState<"edit" | "rendering" | "done">("edit");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; name: string; blob?: Blob } | null>(null);

  const [postOpen, setPostOpen] = useState(false);
  const [postPlatform, setPostPlatform] = useState("instagram");
  const [postUrl, setPostUrl] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postDone, setPostDone] = useState(false);
  const [savedMine, setSavedMine] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(0);

  const previewRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  const editableLayers = useMemo(
    () => (template?.layers ?? []).filter((l) => l.type === "text" && !l.text?.startsWith("@")),
    [template]
  );

  useEffect(() => {
    const initial: Record<string, string> = {};
    (template?.layers ?? [])
      .filter((l) => l.type === "text" && !l.text?.startsWith("@"))
      .forEach((l) => {
        initial[l.id] = l.text ?? "";
      });
    setOverrides(initial);
    setPhase("edit");
    setProgress(0);
    setResult(null);
    setPostOpen(false);
    setPostDone(false);
    setSavedMine(false);
  }, [template]);

  const previewScale = template ? Math.min(380 / template.width, 380 / template.height, 1) : 0.35;

  const drawPreview = useCallback(
    (time = 0) => {
      const canvas = previewRef.current;
      const mediaEl = mediaStatus === "video" ? (videoRef.current as unknown as CanvasImageSource) : mediaStatus === "photo" ? (imgRef.current as unknown as CanvasImageSource) : null;
      if (!canvas || !template) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      renderFrame(ctx, {
        width: template.width,
        height: template.height,
        layers: template.layers,
        media: mediaEl,
        textOverrides: overrides,
        scale: previewScale,
        zoom: mediaStatus === "photo" ? 1 + 0.08 * time : 1,
      });
    },
    [template, overrides, mediaStatus, previewScale]
  );

  useEffect(() => {
    if (!template) return;
    const canvas = previewRef.current;
    if (!canvas) return;
    canvas.width = Math.round(template.width * previewScale);
    canvas.height = Math.round(template.height * previewScale);

    drawPreview();

    if (mediaStatus === "video") {
      const loop = (time: number) => {
        drawPreview(time % 1);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [drawPreview, template, mediaStatus, previewScale, mediaLoaded]);

  function handleFile(file: File) {
    setError("");
    setResult(null);
    if (file.type.startsWith("video/")) {
      if (file.size > MAX_VIDEO_BYTES) {
        setError("Vídeo muito grande. Use até 80 MB.");
        return;
      }
    } else if (file.type.startsWith("image/")) {
      if (file.size > MAX_IMAGE_BYTES) {
        setError("Imagem muito grande. Use até 12 MB.");
        return;
      }
    } else {
      setError("Formato não suportado. Envie uma foto ou um vídeo.");
      return;
    }
    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    setMediaFile(file);
    setMediaStatus(file.type.startsWith("video/") ? "video" : "photo");
  }

  async function handleGenerate() {
    if (!template) return;
    if (mediaStatus === "empty") {
      setError("Envie uma foto ou um vídeo primeiro para gerar.");
      return;
    }
    setError("");
    setPhase("rendering");
    setProgress(0);

    try {
      const video = videoRef.current;
      if (mediaStatus === "video" && video) {
        video.currentTime = 0;
        await video.play();
      }

      const canvas = document.createElement("canvas");
      canvas.width = template.width;
      canvas.height = template.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas indisponível.");

      const duration =
        mediaStatus === "video" && video && video.duration
          ? Math.min(video.duration, 30)
          : template.fallbackDuration;
      const fps = 30;
      const mediaEl = mediaStatus === "video" ? (video as CanvasImageSource) : (imgRef.current as CanvasImageSource);

      const recorder = createCanvasRecorder(canvas, { fps, bitsPerSecond: 2_000_000 });
      recorder.start();

      const drawFrame = (t: number) => {
        renderFrame(ctx, {
          width: template.width,
          height: template.height,
          layers: template.layers,
          media: mediaEl,
          textOverrides: overrides,
          zoom: mediaStatus === "photo" ? 1 + 0.12 * t : 1,
        });
      };

      const start = performance.now();
      await new Promise<void>((resolve) => {
        function frame() {
          const elapsed = (performance.now() - start) / 1000;
          const t = Math.min(elapsed / duration, 1);
          drawFrame(t);
          setProgress(t);
          if (t >= 1) {
            resolve();
            return;
          }
          requestAnimationFrame(frame);
        }
        frame();
      });

      if (video && mediaStatus === "video") video.pause();

      const { blob, mimeType } = await recorder.stop();
      const ext = mimeType.includes("mp4") ? "mp4" : "webm";
      const name = `tropa-thiago-${template.kind}-${Date.now()}.${ext}`;
      const url = URL.createObjectURL(blob);
      setResult({ url, name, blob });
      setPhase("done");
      setProgress(1);
    } catch (e: any) {
      setError(e?.message ?? "Não foi possível gerar seu vídeo.");
      setPhase("edit");
    }
  }

  async function saveToMine() {
    if (!result?.blob) return;
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", result.blob, result.name);
      fd.append("templateId", template!._id);
      fd.append("inputType", mediaStatus);
      fd.append("fileType", result.blob.type);
      const res = await fetch("/api/videos", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Falha ao salvar.");
      setSavedMine(true);
    } catch {
      setError("Não foi possível salvar nos meus vídeos. O download local continua disponível.");
    }
  }

  async function submitPost() {
    if (!postUrl.trim()) return;
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: postPlatform, url: postUrl.trim(), caption: postCaption.trim() }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => null);
      setError(d?.error ?? "Não foi possível registrar a publicação.");
      return;
    }
    setPostDone(true);
  }

  if (!template) {
    return <p className="text-navy-500">Nenhum template disponível ainda.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Seleção de template */}
      <aside>
        <h2 className="font-display text-lg uppercase text-navy-950">1. Template</h2>
        <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-1">
          {templates.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelectedId(t._id)}
              className={`overflow-hidden rounded-xl text-left ring-2 transition ${
                selectedId === t._id ? "ring-gold-400" : "ring-transparent hover:ring-navy-200"
              }`}
            >
              <TemplateThumb layers={t.layers} width={t.width} height={t.height} className="w-full" />
              <span className={`block px-2 py-1.5 text-xs font-bold ${selectedId === t._id ? "text-navy-950" : "text-navy-600"}`}>
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* Preview + controles */}
      <div>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div>
            <h2 className="mb-3 font-display text-lg uppercase text-navy-950 md:hidden">2. Preview</h2>
            <div className="w-full max-w-[300px] overflow-hidden rounded-2xl ring-1 ring-navy-200 md:max-w-[340px]">
              <canvas ref={previewRef} className="block h-auto w-full" />
            </div>
          </div>

          <div className="w-full flex-1">
            <h2 className="mb-3 font-display text-lg uppercase text-navy-950 hidden md:block">2. Sua foto/vídeo</h2>

            {mediaStatus === "empty" ? (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy-300 bg-navy-50 px-6 py-12 text-center transition hover:border-gold-400 hover:bg-gold-50">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-xl text-gold-400">+</span>
                <span className="font-semibold text-navy-900">Adicionar foto ou vídeo</span>
                <span className="text-xs text-navy-500">Vertical fica melhor para Reels / Stories / TikTok</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
            ) : (
              <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-navy-950">{mediaFile?.name}</p>
                <p className="mt-0.5 text-xs text-navy-500">
                  {mediaStatus === "video" ? "Vídeo" : "Foto"} · {Math.round((mediaFile?.size ?? 0) / 1024)} KB
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("re-upload")?.click()}>
                    Trocar arquivo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setMediaStatus("empty"); setMediaUrl(""); setMediaFile(null); }}>
                    Remover
                  </Button>
                </div>
                <input id="re-upload" type="file" accept="image/*,video/*" capture="environment" className="sr-only"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              </div>
            )}

            {/* Personalização */}
            {editableLayers.length > 0 && (
              <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-navy-950">Personalizar textos</p>
                <div className="mt-3 space-y-3">
                  {editableLayers.map((l) => (
                    <label key={l.id} className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy-500">{l.id}</span>
                      <input
                        value={overrides[l.id] ?? ""}
                        onChange={(e) => setOverrides((o) => ({ ...o, [l.id]: e.target.value }))}
                        className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus:border-navy-900"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

            <div className="mt-4">
              <Button size="lg" onClick={handleGenerate} disabled={phase === "rendering" || mediaStatus === "empty"}>
                {phase === "rendering" ? "Gerando…" : "Gerar vídeo"}
              </Button>
            </div>
          </div>
        </div>

        {/* Progresso */}
        {phase === "rendering" && (
          <div className="mt-6">
            <div className="mb-1 flex justify-between text-xs font-semibold text-navy-600">
              <span>Gravando seu vídeo…</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
              <div className="h-full rounded-full bg-gold-400 transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}

        {/* Resultado */}
        {phase === "done" && result && (
          <div className="mt-8 rounded-3xl bg-navy-950 p-6 text-white">
            <h3 className="font-display text-xl uppercase text-gold-400">Seu vídeo está pronto!</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-[260px_1fr]">
              <video src={result.url} controls className="w-full rounded-xl bg-navy-900" />
              <div className="flex flex-col gap-3">
                <Button size="lg" onClick={() => downloadBlob(result.blob!, result.name)}>
                  Baixar vídeo ({result.name.split(".").pop()}) 
                </Button>
                {!savedMine ? (
                  <Button variant="primary" size="md" onClick={saveToMine}>
                    Salvar nos meus vídeos
                  </Button>
                ) : (
                  <p className="inline-flex items-center rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300">
                    Salvo nos seus vídeos
                  </p>
                )}

                {!postOpen ? (
                  <Button variant="outline" size="md" className="border-gold-400 text-gold-400 hover:bg-white/10" onClick={() => setPostOpen(true)}>
                    Já publiquei — registrar link
                  </Button>
                ) : (
                  <div className="rounded-2xl bg-navy-900 p-4">
                    {postDone ? (
                      <p className="text-sm font-semibold text-emerald-300">Publicação registrada. Obrigado!</p>
                    ) : (
                      <div className="space-y-3">
                        <select
                          value={postPlatform}
                          onChange={(e) => setPostPlatform(e.target.value)}
                          className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-sm text-white outline-none"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube Shorts</option>
                        </select>
                        <input
                          value={postUrl}
                          onChange={(e) => setPostUrl(e.target.value)}
                          placeholder="Link da publicação"
                          className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-sm text-white placeholder:text-navy-400 outline-none"
                        />
                        <input
                          value={postCaption}
                          onChange={(e) => setPostCaption(e.target.value)}
                          placeholder="Legenda (opcional)"
                          className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-sm text-white placeholder:text-navy-400 outline-none"
                        />
                        <Button size="md" className="w-full" onClick={submitPost}>
                          Enviar link
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Elementos escondidos de mídia */}
      <div className="hidden">
        {mediaStatus === "photo" && mediaUrl && (
          <img
            ref={imgRef}
            src={mediaUrl}
            alt=""
            onLoad={() => setMediaLoaded((v) => v + 1)}
          />
        )}
        {mediaStatus === "video" && mediaUrl && (
          <video
            ref={videoRef}
            src={mediaUrl}
            muted
            playsInline
            loop
            crossOrigin="anonymous"
            onLoadedMetadata={() => setMediaLoaded((v) => v + 1)}
          />
        )}
      </div>
    </div>
  );
}