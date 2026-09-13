export const SITE = {
  name: "Tropa do Thiago Cicinho",
  shortName: "Thiago Cicinho",
  brand: "THIAGO CICINHO",
  title: "Vereador Thiago Cicinho",
  slogan: "Crie. Compartilhe. Participe.",
  phrase:
    "Uma voz pode ser ignorada. Milhares, não. Junte-se à Tropa do Bem.",
  handle: "@vereadorthiagocicinho",
  instagram: "https://www.instagram.com/vereadorthiagocicinho",
  tiktok: "",
  whatsapp: "",
  video: {
    width: 1080,
    height: 1920,
    fps: 30,
    defaultDuration: 8,
    maxDuration: 30,
  },
  contactEmail: "tropadobem@thiagocicinho.com.br",
} as const;

export const TEMPLATE_SIZES = {
  story: { width: 1080, height: 1920, label: "Stories / Reels / TikTok" },
  feed: { width: 1080, height: 1080, label: "Feed do Instagram" },
} as const;

export type TemplateKind = keyof typeof TEMPLATE_SIZES;