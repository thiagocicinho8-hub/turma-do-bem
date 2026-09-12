import type { TemplateKind } from "@/lib/config";

export type Role = "user" | "admin";

export interface UserDoc {
  _id: string;
  name: string;
  email: string;
  role: Role;
  acceptedTermsAt: Date;
  createdAt: Date;
}

export interface TemplateLayer {
  type: "background" | "photo" | "text" | "shape";
  id: string;
  x: number; // px (relative to template width/height, 1080-based)
  y: number;
  w: number;
  h: number;
  radius?: number;
  rotation?: number;
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
}

export type TemplateCategory = "todos" | "story" | "feed" | "instagram" | "whatsapp";

export interface TemplateDoc {
  _id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  kind: TemplateKind;
  width: number;
  height: number;
  fallbackDuration: number;
  hasAudio: boolean;
  layers: TemplateLayer[];
  status: "ativo" | "inativo";
  createdAt: Date;
}

export interface VideoDoc {
  _id: string;
  userId: string;
  templateId: TemplateDoc | string;
  inputType: "photo" | "video";
  inputName: string;
  outputUrl: string;
  outputName: string;
  duration: number;
  size: number;
  status: "processando" | "pronto" | "falhou";
  createdAt: Date;
}

export type Platform = "instagram" | "tiktok" | "youtube";

export interface PostDoc {
  _id: string;
  userId: string;
  userName: string;
  platform: Platform;
  url: string;
  caption: string;
  views: number;
  interactions: number;
  status: "aprovado" | "revisao" | "rejeitado";
  createdAt: Date;
}