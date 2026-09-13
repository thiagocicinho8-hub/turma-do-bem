"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { dbReady } from "@/lib/db";
import { User } from "@/lib/models/User";
import { getSessionOrRedirect } from "@/lib/dal";

const MAX_PROFILES = 3;

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

function normalizeHandle(raw: string): string | null {
  let value = raw.trim().toLowerCase();
  value = value.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "");
  value = value.replace(/^instagram\.com\//i, "");
  value = value.replace(/^@/, "");
  value = value.replace(/\/+$/, "");
  if (!/^[a-z0-9_.]{1,30}$/.test(value)) return null;
  return value;
}

export async function savePhone(formData: FormData): Promise<never> {
  const session = await getSessionOrRedirect();
  const input = digits(String(formData.get("phone") ?? ""));

  if (input.length < 10 || input.length > 11) {
    redirect("/telefone?error=invalid");
  }

  const ready = await dbReady();
  if (!ready) redirect("/telefone?error=db");

  await User.updateOne(
    { _id: session.userId },
    { $set: { phone: `+55${input}` } }
  );

  redirect("/instagram");
}

export async function connectInstagram(formData: FormData): Promise<never> {
  const session = await getSessionOrRedirect();
  const handle = normalizeHandle(String(formData.get("handle") ?? ""));
  if (!handle) redirect("/instagram?error=invalid");

  const ready = await dbReady();
  if (!ready) redirect("/instagram?error=db");

  const user = await User.findById(session.userId).lean();
  if (!user) redirect("/instagram");

  const profiles = user.instagramProfiles ?? [];
  if (profiles.length >= MAX_PROFILES) redirect("/instagram?error=limit");
  if (profiles.some((p: any) => p.handle === handle))
    redirect("/instagram?error=duplicate");

  const code = `TROPA-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;

  await User.updateOne(
    { _id: session.userId },
    { $push: { instagramProfiles: { handle, code } } }
  );

  redirect("/instagram?added=1");
}

export async function confirmInstagram(formData: FormData): Promise<never> {
  const session = await getSessionOrRedirect();
  const id = String(formData.get("profileId") ?? "");
  if (!id) redirect("/instagram");

  const ready = await dbReady();
  if (!ready) redirect("/instagram?error=db");

  await User.updateOne(
    { _id: session.userId, "instagramProfiles._id": id },
    { $set: { "instagramProfiles.$.status": "confirmed" } }
  );

  redirect("/instagram?confirmed=1");
}

export async function removeInstagram(formData: FormData): Promise<never> {
  const session = await getSessionOrRedirect();
  const id = String(formData.get("profileId") ?? "");
  if (!id) redirect("/instagram");

  const ready = await dbReady();
  if (!ready) redirect("/instagram?error=db");

  await User.updateOne(
    { _id: session.userId },
    { $pull: { instagramProfiles: { _id: id } } }
  );

  redirect("/instagram");
}