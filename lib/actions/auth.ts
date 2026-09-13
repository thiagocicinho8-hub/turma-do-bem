"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { dbReady } from "@/lib/db";
import { User } from "@/lib/models/User";
import { encrypt } from "@/lib/session";

export type FormState =
  | { errors?: Record<string, string>; message?: string; ok?: boolean }
  | undefined;

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function register(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const terms = formData.get("terms") === "on";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido.";
  if (password.length < 8) errors.password = "A senha precisa de pelo menos 8 caracteres.";
  if (password !== confirm) errors.confirm = "As senhas não conferem.";
  if (!terms) errors.terms = "Você precisa aceitar o termo de responsabilidade.";
  if (Object.keys(errors).length > 0) return { errors };

  const ready = await dbReady();
  if (!ready) return { message: "Banco de dados indisponível. Tente novamente em instantes." };

  const existing = await User.findOne({ email }).lean();
  if (existing) return { errors: { email: "Este e-mail já está cadastrado." } };

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role: adminEmails().includes(email) ? "admin" : "user",
    acceptedTermsAt: new Date(),
  });

  const session = await encrypt({ userId: String(user._id), role: user.role });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/criar");
}

export type OAuthPending = {
  email: string;
  name: string;
  picture: string;
  returnTo: string;
};

export async function readOAuthPending(): Promise<OAuthPending | null> {
  const raw = (await cookies()).get("oauth_pending")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OAuthPending;
  } catch {
    return null;
  }
}

export async function acceptOAuthTerms(): Promise<never> {
  const pending = await readOAuthPending();
  if (!pending) redirect("/login");

  const cookieStore = await cookies();
  cookieStore.delete("oauth_pending");

  const ready = await dbReady();
  if (!ready) redirect("/login?error=db");

  const existing = await User.findOne({ email: pending.email }).lean();
  const role = adminEmails().includes(pending.email) ? "admin" : "user";

  const userId = existing
    ? String(existing._id)
    : String(
        (
          await User.create({
            name: pending.name,
            email: pending.email,
            authProvider: "google",
            role,
            acceptedTermsAt: new Date(),
          })
        )._id
      );

  const finalRole =
    existing && (existing.role as string) === "admin" ? "admin" : role;
  const session = await encrypt({ userId, role: finalRole });
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(pending.returnTo);
}

export async function login(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const ready = await dbReady();
  if (!ready) return { message: "Banco de dados indisponível. Tente novamente em instantes." };

  const user = await User.findOne({ email }).lean();
  if (!user) return { message: "E-mail ou senha incorretos." };
  if (!user.passwordHash) {
    return { message: "Esta conta usa login com Google. Use o botão abaixo." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { message: "E-mail ou senha incorretos." };

  const session = await encrypt({ userId: String(user._id), role: user.role });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/criar");
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}