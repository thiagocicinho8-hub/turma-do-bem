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
  {
    name: "Rodapé Oficial",
    description: "Modelo igual ao da arte oficial. Foto no topo e rodapé com VEREADOR THIAGO CICINHO.",
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
        gradient: { from: "#0d1d45", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "glow", x: 140, y: 340, w: 800, h: 800, radius: 400, fill: "rgba(59,100,200,0.25)" },
      { type: "photo", id: "photo", x: 90, y: 140, w: 900, h: 1360, radius: 32 },
      { type: "shape", id: "footer", x: 0, y: 1620, w: 1080, h: 300, fill: "#0052b9" },
      {
        type: "text", id: "vereador", x: 0, y: 1650, w: 1080, text: "VEREADOR",
        fontSize: 60, color: "#ffc400", weight: "800", align: "center", maxWidth: 1080,
      },
      {
        type: "text", id: "thiago", x: 0, y: 1720, w: 760, text: "THIAGO",
        fontSize: 130, color: "#ffffff", weight: "900", align: "right", maxWidth: 760,
      },
      {
        type: "shape", id: "arrow1", x: 310, y: 1760, w: 80, h: 80, fill: "#ffc400",
      },
      {
        type: "shape", id: "arrow2", x: 390, y: 1760, w: 80, h: 80, fill: "#ffffff",
      },
      {
        type: "text", id: "cicinho", x: 480, y: 1750, w: 560, text: "CICINHO",
        fontSize: 120, color: "#ffc400", weight: "900", align: "left", maxWidth: 560,
      },
    ],
  },
  {
    name: "Foto Inteira Overlay",
    description: "Sua foto em tela cheia com marca d'água e overlay do vereador no topo.",
    category: "todos",
    kind: "story",
    width: 1080,
    height: 1920,
    fallbackDuration: 8,
    hasAudio: false,
    layers: [
      { type: "photo", id: "photo", x: 0, y: 0, w: 1080, h: 1920, radius: 0 },
      {
        type: "shape", id: "overlay-top", x: 0, y: 0, w: 1080, h: 220,
        gradient: { from: "rgba(7,18,41,0.92)", to: "rgba(7,18,41,0)", angle: 180 },
      },
      {
        type: "shape", id: "overlay-bottom", x: 0, y: 1620, w: 1080, h: 300,
        gradient: { from: "rgba(7,18,41,0)", to: "rgba(7,18,41,0.92)", angle: 180 },
      },
      {
        type: "text", id: "top-brand", x: 0, y: 70, w: 1080, text: "VEREADOR THIAGO CICINHO",
        fontSize: 54, color: "#ffffff", weight: "800", align: "center", maxWidth: 1080,
      },
      {
        type: "text", id: "hashtag", x: 0, y: 1690, w: 1080, text: "#TropaDoBem",
        fontSize: 72, color: "#ffc400", weight: "900", align: "center", maxWidth: 1080,
      },
      {
        type: "text", id: "handle", x: 0, y: 1800, w: 1080, text: "@vereadorthiagocicinho",
        fontSize: 42, color: "#ffffff", weight: "700", align: "center", maxWidth: 1080,
      },
    ],
  },
  {
    name: "Tarja Amarela",
    description: "Tarja forte em amarelo no topo com a sua foto centralizada.",
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
        gradient: { from: "#1f3772", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "tarja", x: 0, y: 0, w: 1080, h: 260, fill: "#ffc400" },
      {
        type: "text", id: "tarja-text", x: 0, y: 85, w: 1080, text: "JUNTE-SE À NOSSA CAUSA",
        fontSize: 72, color: "#071229", weight: "900", align: "center", maxWidth: 1080, uppercase: true,
      },
      { type: "shape", id: "photo-ring", x: 148, y: 328, w: 784, h: 1124, radius: 48, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 162, y: 342, w: 756, h: 1096, radius: 40 },
      {
        type: "text", id: "brand", x: 0, y: 1530, w: 1080, text: "THIAGO CICINHO",
        fontSize: 100, color: "#ffffff", weight: "900", align: "center", maxWidth: 1080,
      },
      {
        type: "text", id: "handle", x: 0, y: 1800, w: 1080, text: "@vereadorthiagocicinho",
        fontSize: 48, color: "#ffc400", weight: "700", align: "center", maxWidth: 1080,
      },
    ],
  },
  {
    name: "Split Azul e Amarelo",
    description: "Layout dividido: lado esquerdo sua foto, lado direito mensagem.",
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
        gradient: { from: "#0d1d45", to: "#071229", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 78, y: 180, w: 484, h: 1280, radius: 40, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 90, y: 192, w: 460, h: 1256, radius: 32 },
      {
        type: "text", id: "kicker", x: 600, y: 260, w: 420, text: "EU APOIO",
        fontSize: 52, color: "#ffc400", weight: "800", align: "center", maxWidth: 420,
      },
      {
        type: "text", id: "name1", x: 600, y: 360, w: 420, text: "THIAGO",
        fontSize: 100, color: "#ffffff", weight: "900", align: "center", maxWidth: 420,
      },
      {
        type: "text", id: "name2", x: 600, y: 490, w: 420, text: "CICINHO",
        fontSize: 100, color: "#ffc400", weight: "900", align: "center", maxWidth: 420,
      },
      { type: "shape", id: "divider", x: 680, y: 650, w: 260, h: 10, radius: 5, fill: "#ffc400" },
      {
        type: "text", id: "phrase", x: 600, y: 700, w: 420, text: "A verdade vence sempre. Juntos somos mais fortes.",
        fontSize: 44, color: "#ffffff", weight: "600", align: "center", maxWidth: 420, lineHeight: 1.4,
      },
      {
        type: "text", id: "handle", x: 600, y: 1720, w: 420, text: "@vereadorthiagocicinho",
        fontSize: 38, color: "#ffc400", weight: "700", align: "center", maxWidth: 420,
      },
    ],
  },
  {
    name: "Moldura Dourada",
    description: "Sua foto dentro de uma moldura grossa dourada.",
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
        gradient: { from: "#071229", to: "#0d1d45", angle: 180 },
      },
      { type: "shape", id: "glow", x: 180, y: 200, w: 720, h: 720, radius: 360, fill: "rgba(255,196,0,0.08)" },
      { type: "shape", id: "frame-outer", x: 108, y: 160, w: 864, h: 1480, radius: 56, fill: "#ffc400" },
      { type: "shape", id: "frame-inner", x: 130, y: 182, w: 820, h: 1436, radius: 48, fill: "#0d1d45" },
      { type: "photo", id: "photo", x: 154, y: 206, w: 772, h: 1180, radius: 32 },
      {
        type: "text", id: "badge", x: 154, y: 1420, w: 772, text: "VEREADOR",
        fontSize: 48, color: "#ffc400", weight: "800", align: "center", maxWidth: 772,
      },
      {
        type: "text", id: "name", x: 154, y: 1480, w: 772, text: "THIAGO CICINHO",
        fontSize: 96, color: "#ffffff", weight: "900", align: "center", maxWidth: 772,
      },
    ],
  },
  {
    name: "Feed Rodapé Oficial",
    description: "Formato quadrado com sua foto e rodapé oficial azul no fim.",
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
      { type: "shape", id: "glow", x: 190, y: 120, w: 700, h: 700, radius: 350, fill: "rgba(59,100,200,0.22)" },
      { type: "photo", id: "photo", x: 120, y: 80, w: 840, h: 800, radius: 28 },
      { type: "shape", id: "footer", x: 0, y: 840, w: 1080, h: 240, fill: "#0052b9" },
      {
        type: "text", id: "vereador", x: 0, y: 860, w: 1080, text: "VEREADOR",
        fontSize: 44, color: "#ffc400", weight: "800", align: "center", maxWidth: 1080,
      },
      {
        type: "text", id: "thiago", x: 0, y: 910, w: 720, text: "THIAGO",
        fontSize: 96, color: "#ffffff", weight: "900", align: "right", maxWidth: 720,
      },
      {
        type: "shape", id: "arrow1", x: 340, y: 938, w: 60, h: 60, fill: "#ffc400",
      },
      {
        type: "shape", id: "arrow2", x: 400, y: 938, w: 60, h: 60, fill: "#ffffff",
      },
      {
        type: "text", id: "cicinho", x: 470, y: 930, w: 560, text: "CICINHO",
        fontSize: 92, color: "#ffc400", weight: "900", align: "left", maxWidth: 560,
      },
    ],
  },
  {
    name: "Feed Diagonal",
    description: "Arte quadrada com corte diagonal amarelo e foto em destaque.",
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
        gradient: { from: "#071229", to: "#1f3772", angle: 135 },
      },
      { type: "shape", id: "diag", x: 540, y: 0, w: 540, h: 540, fill: "#ffc400" },
      { type: "shape", id: "photo-ring", x: 228, y: 168, w: 624, h: 624, radius: 312, fill: "#ffc400" },
      { type: "photo", id: "photo", x: 246, y: 186, w: 588, h: 588, radius: 294 },
      {
        type: "text", id: "kicker", x: 60, y: 820, w: 960, text: "VEREADOR",
        fontSize: 44, color: "#ffc400", weight: "800", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "title", x: 60, y: 870, w: 960, text: "THIAGO CICINHO",
        fontSize: 84, color: "#ffffff", weight: "900", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "handle", x: 60, y: 990, w: 960, text: "@vereadorthiagocicinho • #TropaDoBem",
        fontSize: 34, color: "#ffc400", weight: "700", align: "center", maxWidth: 960,
      },
    ],
  },
  {
    name: "Feed Tropa do Bem Quadrado",
    description: "Fundo amarelo vibrante com foto redonda e chamada Tropa do Bem.",
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
        gradient: { from: "#ffc400", to: "#e6b000", angle: 180 },
      },
      { type: "shape", id: "photo-ring", x: 318, y: 78, w: 444, h: 444, radius: 222, fill: "#0d1d45" },
      { type: "photo", id: "photo", x: 332, y: 92, w: 416, h: 416, radius: 208 },
      {
        type: "text", id: "title", x: 60, y: 570, w: 960, text: "TROPA DO BEM",
        fontSize: 110, color: "#0d1d45", weight: "900", align: "center", maxWidth: 960, uppercase: true,
      },
      { type: "shape", id: "line", x: 390, y: 720, w: 300, h: 10, radius: 5, fill: "#ffffff" },
      {
        type: "text", id: "phrase", x: 60, y: 750, w: 960, text: "A verdade vence sempre.",
        fontSize: 48, color: "#ffffff", weight: "800", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "brand", x: 60, y: 860, w: 960, text: "THIAGO CICINHO",
        fontSize: 78, color: "#0d1d45", weight: "900", align: "center", maxWidth: 960,
      },
      {
        type: "text", id: "handle", x: 60, y: 980, w: 960, text: "@vereadorthiagocicinho",
        fontSize: 36, color: "#0d1d45", weight: "700", align: "center", maxWidth: 960,
      },
    ],
  },
];