import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { googleAuthUrl, googleEnabled, callbackOrigin } from "@/lib/google";

export async function GET(request: Request) {
  if (!googleEnabled) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_config", request.url)
    );
  }

  const url = new URL(request.url);
  const returnTo =
    url.searchParams.get("returnTo")?.startsWith("/") &&
    !url.searchParams.get("returnTo")?.startsWith("//")
      ? url.searchParams.get("returnTo")!
      : "/criar";

  const state = crypto.randomBytes(16).toString("hex");
  (await cookies()).set(
    "oauth_state",
    JSON.stringify({ state, returnTo }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    }
  );

  return NextResponse.redirect(googleAuthUrl(callbackOrigin(url.origin), state));
}