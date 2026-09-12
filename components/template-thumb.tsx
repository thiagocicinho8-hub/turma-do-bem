"use client";

import { useEffect, useRef } from "react";
import { renderFrame } from "@/lib/video/render";

type Props = {
  layers: any[];
  width: number;
  height: number;
  className?: string;
};

export function TemplateThumb({ layers, width, height, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxDisplay = 480;
  const renderScale =
    Math.min(maxDisplay / width, maxDisplay / height, 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderFrame(ctx, {
      width,
      height,
      layers,
      scale: renderScale,
      drawSketch: true,
    });
  }, [layers, width, height, renderScale]);

  return (
    <div className={`flex items-center justify-center overflow-hidden bg-navy-100 ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        width={width * renderScale}
        height={height * renderScale}
        className="h-auto w-full"
      />
    </div>
  );
}