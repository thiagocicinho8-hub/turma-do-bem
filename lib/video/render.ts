export type Layer = {
  type: "background" | "photo" | "text" | "shape";
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: number;
  fill?: string;
  gradient?: { from: string; to: string; angle?: number };
  text?: string;
  fontSize?: number;
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  lineHeight?: number;
  uppercase?: boolean;
};

export type RenderTarget = {
  width: number;
  height: number;
  layers: Layer[];
  media?: CanvasImageSource | null;
  textOverrides?: Record<string, string>;
  zoom?: number;
  scale?: number;
  drawSketch?: boolean;
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

// Cover-fit a square/known source into the rect.
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  rect: { x: number; y: number; w: number; h: number },
  radius: number,
  zoom = 1
) {
  const { x, y, w, h } = rect;
  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();

  const source =
    img instanceof HTMLVideoElement
      ? { sw: img.videoWidth, sh: img.videoHeight }
      : img instanceof HTMLImageElement
        ? { sw: img.naturalWidth || 1, sh: img.naturalHeight || 1 }
        : { sw: 1, sh: 1 };

  const scale = Math.max(w / source.sw, h / source.sh) * zoom;
  const dw = source.sw * scale;
  const dh = source.sh * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;

  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}

function drawTextBlock(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  text: string
) {
  const fontSize = layer.fontSize ?? 48;
  const maxWidth = layer.maxWidth ?? layer.w;
  const align = layer.align ?? "center";
  const lineHeight = (layer.lineHeight ?? 1.15) * fontSize;
  const color = layer.color ?? "#ffffff";
  const weight = layer.weight ?? "normal";

  ctx.save();
  ctx.font = `${weight} ${fontSize}px sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align === "center" ? "center" : align === "left" ? "left" : "right";
  ctx.textBaseline = "top";

  // Word wrap
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const blockHeight = lines.length * lineHeight;
  let x = layer.x;
  if (align === "center") x = layer.x + layer.w / 2;
  else if (align === "right") x = layer.x + layer.w;

  lines.forEach((ln, i) => {
    ctx.fillText(ln, x, layer.y + i * lineHeight, maxWidth);
  });

  void blockHeight;
  ctx.restore();
}

// Sketch preview: no photo, dashed photo frame with label.
function drawPhotoPlaceholder(ctx: CanvasRenderingContext2D, layer: Layer, scale: number) {
  const x = layer.x * scale;
  const y = layer.y * scale;
  const w = layer.w * scale;
  const h = layer.h * scale;
  const radius = (layer.radius ?? 0) * scale;

  ctx.save();
  ctx.fillStyle = "rgba(13,29,69,0.55)";
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2 * scale;
  ctx.setLineDash([14 * scale, 10 * scale]);
  roundRect(ctx, x, y, w, h, radius);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `600 ${30 * scale}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SUA FOTO AQUI", x + w / 2, y + h / 2, w * 0.9);
  ctx.restore();
}

export function renderFrame(ctx: CanvasRenderingContext2D, target: RenderTarget) {
  const { width, height, layers, media, textOverrides, zoom = 1, scale = 1, drawSketch = false } = target;

  ctx.save();
  ctx.clearRect(0, 0, width * scale, height * scale);

  for (const layer of layers) {
    if (layer.type === "background") {
      const x = layer.x * scale;
      const y = layer.y * scale;
      const w = layer.w * scale;
      const h = layer.h * scale;
      if (layer.gradient) {
        const gy = ctx.createLinearGradient(0, y, 0, y + h);
        gy.addColorStop(0, layer.gradient.from);
        gy.addColorStop(1, layer.gradient.to);
        ctx.fillStyle = gy;
      } else {
        ctx.fillStyle = layer.fill ?? "#071229";
      }
      ctx.fillRect(x, y, w, h);
      continue;
    }

    if (layer.type === "shape") {
      const x = layer.x * scale;
      const y = layer.y * scale;
      const w = layer.w * scale;
      const h = layer.h * scale;
      ctx.save();
      ctx.fillStyle = layer.fill ?? "#ffffff";
      if (layer.radius) {
        roundRect(ctx, x, y, w, h, layer.radius * scale);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, w, h);
      }
      ctx.restore();
      continue;
    }

    if (layer.type === "photo") {
      if (media) {
        drawSketch
          ? drawPhotoPlaceholder(ctx, layer, scale)
          : drawCover(
              ctx,
              media,
              { x: layer.x * scale, y: layer.y * scale, w: layer.w * scale, h: layer.h * scale },
              (layer.radius ?? 0) * scale,
              zoom
            );
      } else {
        drawPhotoPlaceholder(ctx, layer, scale);
      }
      continue;
    }

    if (layer.type === "text") {
      const raw = textOverrides?.[layer.id] ?? layer.text ?? "";
      if (!raw) continue;
      const text = layer.uppercase ? raw.toUpperCase() : raw;
      drawTextBlock(
        ctx,
        {
          ...layer,
          x: layer.x * scale,
          y: layer.y * scale,
          w: layer.w * scale,
          fontSize: (layer.fontSize ?? 48) * scale,
          maxWidth: (layer.maxWidth ?? layer.w) * scale,
          lineHeight: layer.lineHeight,
        },
        text
      );
      continue;
    }
  }

  ctx.restore();
}

export function coverSourceSize(media: CanvasImageSource): { sw: number; sh: number } {
  if (media instanceof HTMLVideoElement) return { sw: media.videoWidth, sh: media.videoHeight };
  if (media instanceof HTMLImageElement) return { sw: media.naturalWidth || 1, sh: media.naturalHeight || 1 };
  return { sw: 1, sh: 1 };
}