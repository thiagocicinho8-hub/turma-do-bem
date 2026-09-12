import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, trim: true },
    platform: {
      type: String,
      enum: ["instagram", "tiktok", "youtube"],
      required: true,
    },
    url: { type: String, required: true, trim: true },
    caption: { type: String, default: "" },
    views: { type: Number, default: 0 },
    interactions: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["aprovado", "revisao", "rejeitado"],
      default: "aprovado",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const Post =
  (models.Post as mongoose.Model<PostDoc> | undefined) ??
  mongoose.model<PostDoc>("Post", PostSchema);

export interface PostDoc {
  userId: unknown;
  userName: string;
  platform: "instagram" | "tiktok" | "youtube";
  url: string;
  caption: string;
  views: number;
  interactions: number;
  status: "aprovado" | "revisao" | "rejeitado";
  createdAt: Date;
}