import mongoose, { Schema, models } from "mongoose";

const TemplateLayerSchema = new Schema(
  {
    type: { type: String, required: true },
    id: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    w: { type: Number, default: 0 },
    h: { type: Number, default: 0 },
    radius: { type: Number, default: 0 },
    rotation: { type: Number, default: 0 },
    fill: { type: String },
    gradient: {
      from: { type: String },
      to: { type: String },
      angle: { type: Number, default: 0 },
    },
    text: { type: String },
    fontSize: { type: Number },
    color: { type: String },
    weight: { type: String },
    align: { type: String, enum: ["left", "center", "right"], default: "center" },
    maxWidth: { type: Number },
    lineHeight: { type: Number },
    uppercase: { type: Boolean, default: false },
  },
  { _id: false }
);

const TemplateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["todos", "story", "feed", "instagram", "whatsapp"],
      default: "todos",
    },
    kind: { type: String, enum: ["story", "feed"], default: "story" },
    width: { type: Number, default: 1080 },
    height: { type: Number, default: 1920 },
    fallbackDuration: { type: Number, default: 8 },
    hasAudio: { type: Boolean, default: false },
    layers: [TemplateLayerSchema],
    status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Template =
  (models.Template as mongoose.Model<TemplateDoc> | undefined) ??
  mongoose.model<TemplateDoc>("Template", TemplateSchema);

export interface TemplateDoc {
  name: string;
  description: string;
  category: string;
  kind: "story" | "feed";
  width: number;
  height: number;
  fallbackDuration: number;
  hasAudio: boolean;
  layers: any[];
  status: "ativo" | "inativo";
  createdAt: Date;
}