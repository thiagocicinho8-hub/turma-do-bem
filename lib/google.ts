import "server-only";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const googleEnabled = Boolean(CLIENT_ID && CLIENT_SECRET);

export function callbackOrigin(requestOrigin: string): string {
  return process.env.AUTH_CALLBACK_ORIGIN ?? requestOrigin;
}

export function googleAuthUrl(origin: string, state: string) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${origin}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCode(origin: string, code: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: `${origin}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Falha ao trocar o código do Google.");
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google não retornou token.");
  return data.access_token;
}

export async function googleProfile(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Falha ao buscar perfil do Google.");
  return (await res.json()) as {
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
  };
}