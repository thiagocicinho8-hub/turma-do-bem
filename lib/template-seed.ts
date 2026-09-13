export type SeedLayer = {
  type: "background" | "photo" | "text" | "shape";
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  radius?: number;
  fill?: string;
  gradient?: { from: string; to: string; angle?: number };
  text?: string;
  fontSize?: number;
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  lineHeight?: number;
  uppercase?: boolean;
};

export type SeedTemplate = {
  name: string;
  description: string;
  category: string;
  kind: "story" | "feed";
  width: number;
  height: number;
  fallbackDuration: number;
  hasAudio: boolean;
  layers: SeedLayer[];
};

export const seedTemplates: SeedTemplate[] = [
  {
    name: "Meu voto é Thiago",
    description: "Cartaz vertical com a sua foto + frase de apoio.",
    category: "todos",
    kind: "story",
    width: 1080,
    height: 1920,
    fallbackDuration: 8,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1920,
        gradient: { from: "#071229", to: "#1f3772", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 178, y: 228, w: 724, h: 924, radius: 56, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 190, y: 240, w: 700, h: 900, radius: 48 },
      {
        type: "text", id: "kicker", x: 90, y: 1240, w: 900, text: "MEU VOTO É",
        fontSize: 64, color: "#ffc400", weight: "800", align: "center", maxWidth: 900,
      },
      {
        type: "text", id: "title", x: 90, y: 1320, w: 900, text: "THIAGO CICINHO",
        fontSize: 118, color: "#ffffff", weight: "900", align: "center", maxWidth: 900,
      },
      {
        type: "text", id: "handle", x: 90, y: 1660, w: 900, text: "@vereadorthiagocicinho",
        fontSize: 50, color: "#ffc400", weight: "700", align: "center", maxWidth: 900,
      },
    ],
  },
  {
    name: "Depoimento",
    description: "Moldura de depoimento: você fala e a marca completa.",
    category: "todos",
    kind: "story",
    width: 1080,
    height: 1920,
    fallbackDuration: 10,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1920,
        gradient: { from: "#0d1d45", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "guide", x: 120, y: 300, w: 840, h: 14, radius: 7, fill: "#ffc400" },
      {
        type: "text", id: "badge", x: 90, y: 170, w: 900, text: "DEPOIMENTO REAL",
        fontSize: 56, color: "#ffc400", weight: "800", align: "center", maxWidth: 900,
      },
      { type: "shape", id: "frame-ring", x: 82, y: 330, w: 916, h: 1196, radius: 44, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 96, y: 344, w: 888, h: 1168, radius: 36 },
      {
        type: "text", id: "brand", x: 90, y: 1610, w: 900, text: "THIAGO CICINHO",
        fontSize: 92, color: "#ffffff", weight: "900", align: "center", maxWidth: 900,
      },
      {
        type: "text", id: "handle", x: 90, y: 1850, w: 900, text: "@vereadorthiagocicinho",
        fontSize: 48, color: "#ffc400", weight: "700", align: "center", maxWidth: 900,
      },
    ],
  },
  {
    name: "Tropa do Bem",
    description: "Fundo amarelo e energia da Tropa. Sua foto em destaque.",
    category: "todos",
    kind: "story",
    width: 1080,
    height: 1920,
    fallbackDuration: 8,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1920,
        gradient: { from: "#ffc400", to: "#e6b000", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 378, y: 288, w: 324, h: 324, radius: 162, fill: "#0d1d45" },
      { type: "photo", id: "photo", x: 390, y: 300, w: 300, h: 300, radius: 150 },
      {
        type: "text", id: "title", x: 80, y: 720, w: 920, text: "JUNTE-SE À TROPA DO BEM",
        fontSize: 88, color: "#0d1d45", weight: "900", align: "center", maxWidth: 920, uppercase: true,
      },
      {
        type: "text", id: "phrase", x: 90, y: 900, w: 900, text: "A verdade vence sempre.",
        fontSize: 56, color: "#ffffff", weight: "700", align: "center", maxWidth: 900,
      },
      {
        type: "text", id: "handle", x: 90, y: 1800, w: 900, text: "@vereadorthiagocicinho",
        fontSize: 52, color: "#0d1d45", weight: "700", align: "center", maxWidth: 900,
      },
    ],
  },
  {
    name: "Feed: Meu voto é Thiago",
    description: "Arte quadrada para o feed do Instagram.",
    category: "feed",
    kind: "feed",
    width: 1080,
    height: 1080,
    fallbackDuration: 8,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1080,
        gradient: { from: "#071229", to: "#1f3772", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 228, y: 148, w: 624, h: 624, radius: 36, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 240, y: 160, w: 600, h: 600, radius: 28 },
      {
        type: "text", id: "kicker", x: 60, y: 800, w: 960, text: "MEU VOTO É",
        fontSize: 52, color: "#ffc400", weight: "800", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "title", x: 60, y: 870, w: 960, text: "THIAGO CICINHO",
        fontSize: 88, color: "#ffffff", weight: "900", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "handle", x: 60, y: 995, w: 960, text: "@vereadorthiagocicinho",
        fontSize: 40, color: "#ffc400", weight: "700", align: "center", maxWidth: 960,
      },
    ],
  },
  {
    name: "Moldura de perfil",
    description: "Arte quadrada com o seu rosto circular no estilo perfil.",
    category: "feed",
    kind: "feed",
    width: 1080,
    height: 1080,
    fallbackDuration: 8,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1080,
        gradient: { from: "#0d1d45", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 278, y: 198, w: 524, h: 524, radius: 262, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 290, y: 210, w: 500, h: 500, radius: 250 },
      {
        type: "text", id: "handle", x: 60, y: 860, w: 960, text: "@vereadorthiagocicinho",
        fontSize: 72, color: "#ffc400", weight: "800", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "sub", x: 60, y: 970, w: 960, text: "Tropa do Bem",
        fontSize: 46, color: "#ffffff", weight: "700", align: "center", maxWidth: 960,
      },
    ],
  },
  {
    name: "Você também é Thiago",
    description: "Depoimento com título forte para Reels e Shorts.",
    category: "todos",
    kind: "story",
    width: 1080,
    height: 1920,
    fallbackDuration: 10,
    hasAudio: false,
    layers: [
      {
        type: "background",
        id: "bg",
        x: 0,
        y: 0,
        w: 1080,
        h: 1920,
        gradient: { from: "#1f3772", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 78, y: 300, w: 924, h: 1204, radius: 44, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 92, y: 314, w: 896, h: 1176, radius: 36 },
      {
        type: "text", id: "title", x: 90, y: 1560, w: 900, text: "VOCÊ TAMBÉM É THIAGO",
        fontSize: 96, color: "#ffffff", weight: "900", align: "center", maxWidth: 900, uppercase: true,
      },
      {
        type: "text", id: "handle", x: 90, y: 1810, w: 900, text: "@vereadorthiagocicinho",
        fontSize: 48, color: "#ffc400", weight: "700", align: "center", maxWidth: 900,
      },
    ],
  },
];