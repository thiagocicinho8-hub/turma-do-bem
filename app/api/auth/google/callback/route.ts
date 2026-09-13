import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  exchangeCode,
  googleProfile,
  googleEnabled,
  callbackOrigin,
} from "@/lib/google";
import { dbReady } from "@/lib/db";
import { User } from "@/lib/models/User";
import { encrypt } from "@/lib/session";

function fail(request: Request) {
  return NextResponse.redirect(new URL("/login?error=oauth", request.url));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cookieStore = await cookies();

  if (!googleEnabled) return fail(request);

  const stored = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const googleError = url.searchParams.get("error");
  if (googleError || !code || !state || !stored) return fail(request);

  let pending: { state: string; returnTo: string };
  try {
    pending = JSON.parse(stored);
  } catch {
    return fail(request);
  }
  if (pending.state !== state) return fail(request);

  let accessToken: string;
  try {
    accessToken = await exchangeCode(callbackOrigin(url.origin), code);
  } catch {
    return fail(request);
  }

  const profile = await googleProfile(accessToken).catch(() => null);
  if (!profile?.email) return fail(request);

  const email = profile.email.toLowerCase();

  const ready = await dbReady();
  if (!ready) {
    return NextResponse.redirect(new URL("/login?error=db", request.url));
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    const session = await encrypt({
      userId: String(existing._id),
      role: existing.role,
    });
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.redirect(new URL(pending.returnTo, request.url));
  }

  cookieStore.set(
    "oauth_pending",
    JSON.stringify({
      email,
      name: profile.name?.trim() || email.split("@")[0],
      picture: profile.picture || "",
      returnTo: pending.returnTo,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    }
  );

  return NextResponse.redirect(new URL("/aceitar-termos", request.url));
}