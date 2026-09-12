export function pickMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "video/mp4;codecs=avc1",
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c;
  }
  return "";
}

export function createCanvasRecorder(
  canvas: HTMLCanvasElement,
  opts: { fps?: number; bitsPerSecond?: number }
): {
  start: () => void;
  stop: () => Promise<{ blob: Blob; mimeType: string }>;
} {
  const fps = opts.fps ?? 30;
  const stream = canvas.captureStream(fps);
  const mimeType = pickMimeType();
  if (!mimeType) throw new Error("Seu navegador não suporta gravação de vídeo.");

  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: opts.bitsPerSecond ?? 2_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const stopPromise = new Promise<{ blob: Blob; mimeType: string }>((resolve) => {
    recorder.onstop = () => resolve({ blob: new Blob(chunks, { type: mimeType }), mimeType });
  });

  return {
    start: () => recorder.start(500),
    stop: async () => {
      recorder.stop();
      const result = await stopPromise;
      const tracks = stream.getTracks();
      for (const t of tracks) t.stop();
      return result;
    },
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}