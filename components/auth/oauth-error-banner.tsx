const MESSAGES: Record<string, string> = {
  oauth: "Não foi possível entrar pelo Google. Tente novamente.",
  oauth_config: "Entrada pelo Google ainda não foi configurada.",
  db: "Banco de dados indisponível. Tente novamente em instantes.",
};

export default function OAuthErrorBanner({
  error,
}: {
  error?: string | undefined;
}) {
  if (!error || !MESSAGES[error]) return null;
  return (
    <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
      {MESSAGES[error]}
    </p>
  );
}