import mongoose, { Schema, models } from "mongoose";

const VideoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    templateId: { type: Schema.Types.ObjectId, ref: "Template", required: true },
    inputType: { type: String, enum: ["photo", "video"], required: true },
    inputName: { type: String, default: "" },
    outputUrl: { type: String, default: "" },
    outputName: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    size: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["processando", "pronto", "falhou"],
      default: "processando",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const Video =
  (models.Video as mongoose.Model<VideoDoc> | undefined) ??
  mongoose.model<VideoDoc>("Video", VideoSchema);

export interface VideoDoc {
  userId: unknown;
  templateId: unknown;
  inputType: "photo" | "video";
  inputName: string;
  outputUrl: string;
  outputName: string;
  duration: number;
  size: number;
  status: "processando" | "pronto" | "falhou";
  createdAt: Date;
}