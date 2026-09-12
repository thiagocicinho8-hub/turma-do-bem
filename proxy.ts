import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const protectedPaths = ["/criar", "/perfil", "/meus-videos", "/admin"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!isProtected) return NextResponse.next();

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// eslint-disable-next-line
export const config = {
  matcher: ["/criar/:path*", "/perfil/:path*", "/meus-videos/:path*", "/admin/:path*"],
};