import mongoose, { Schema, models } from "mongoose";

const InstagramProfileSchema = new Schema(
  {
    handle: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: false, default: null },
    authProvider: { type: String, enum: ["password", "google"], default: "password" },
    phone: { type: String, default: null },
    instagramProfiles: { type: [InstagramProfileSchema], default: [] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    acceptedTermsAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const User =
  (models.User as mongoose.Model<UserDoc> | undefined) ??
  mongoose.model<UserDoc>("User", UserSchema);

export interface InstagramProfileDoc {
  _id: unknown;
  handle: string;
  code: string;
  status: "pending" | "confirmed";
  createdAt: Date;
}

export interface UserDoc {
  name: string;
  email: string;
  passwordHash: string | null;
  authProvider: "password" | "google";
  phone: string | null;
  instagramProfiles: InstagramProfileDoc[];
  role: "user" | "admin";
  acceptedTermsAt: Date | null;
  createdAt: Date;
}