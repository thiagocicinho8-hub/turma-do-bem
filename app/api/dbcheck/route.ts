import { dbReady, lastDbError } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const ready = await dbReady();
  const msg = lastDbError ? String((lastDbError as any)?.message ?? lastDbError) : null;
  return Response.json({
    ready,
    hasUri: Boolean(process.env.MONGODB_URI),
    uriHost: process.env.MONGODB_URI?.replace(/\/\/[^@]+@/, "//***:***@"),
    error: msg,
  });
}