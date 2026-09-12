# Tropa do Bem — Thiago Cicinho

Plataforma de apoio digital (clone da experiência da *Tropa do Renan*) adaptada ao vereador
Thiago Cicinho. Os apoiadores entram, aceitam o termo de responsabilidade, escolhem um
template, enviam sua foto/vídeo, geram conteúdo e publicam nas redes sociais.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4, Turbopack)
- **MongoDB Atlas** (mongoose)
- **Vercel Blob** — armazenamento dos vídeos gerados salvos
- **Autenticação própria** — cadastro/login com JWT em cookie httpOnly, aceite de termos
- **Geração de vídeo no navegador** — canvas + MediaRecorder (sem FFmpeg no servidor, custo zero)

## Rotas

| Rota            | Acesso   | Descrição                                        |
| --------------- | -------- | ------------------------------------------------ |
| `/`             | público  | Landing page                                     |
| `/login`        | público  | Acesso                                           |
| `/registro`     | público  | Cadastro com aceite de termos                    |
| `/esqueci-senha`| público  | Instruções (recuperação manual no MVP)           |
| `/templates`    | público  | Galeria de templates                             |
| `/criar`        | login    | Estúdio: template → foto/vídeo → gerar → baixar  |
| `/posts`        | público  | A Tropa postando (mural) + registro de link      |
| `/a-tropa`      | público  | Institucional                                    |
| `/termos`       | público  | Termo de responsabilidade                        |
| `/perfil`       | login    | Dados da conta                                   |
| `/meus-videos`  | login    | Vídeos salvos                                    |
| `/admin`        | admin    | Dashboard, templates, usuários, vídeos, posts    |

## Configuração local

1. Clone e instale:

```bash
npm install
```

2. Crie `.env.local` copiando `.env.example` e preencha `MONGODB_URI`, `SESSION_SECRET`
   (`openssl rand -base64 32`), `BLOB_READ_WRITE_TOKEN` (opcional no dev) e `ADMIN_EMAILS`.

3. Rode:

```bash
npm run dev
```

4. Os templates são criados automaticamente no primeiro acesso (`lib/template-seed.ts`).

## Deploy (Vercel)

1. Crie um cluster no **MongoDB Atlas** e um **Storage Blob** na Vercel.
2. Importe o projeto na Vercel e defina as variáveis de ambiente do `.env.example`.
3. `ADMIN_EMAILS` define quais e-mails cadastrados viram administradores.

## Geração de vídeo — como funciona

- Os templates são arte 1080×1920 (story) ou 1080×1080 (feed) descritas como **camadas**:
  fundo, formas, textos e a **região da foto** do apoiador.
- O navegador compõe tudo em `<canvas>`: a partir de uma **foto** aplica zoom suave; a partir
  de um **vídeo** mantém o tempo real; e grava via **MediaRecorder** (MP4/WebM).
- Limitações do MVP: sem áudio/música embutida (preserva o áudio de vídeos enviados) e, em
  iOS/Safari, a gravação pode ser restrita — nesse caso use o download ou o Safari mais novo.
- Evolução planejada: FFmpeg no servidor para mais formatos e qualidade.

## Material que falta (dono da campanha)

Troque os placeholders em `lib/config.ts` e `public/images/`:

1. Logo real (PNG/SVG transparente) → substituir `LogoMark` em `components/logo.tsx`.
2. Artes-templates personalizadas → editar via `/admin/templates`.
3. Slogan, handle `@...`, cores exatas e termos jurídicos → `lib/config.ts` e `/termos`.

## Scripts

```bash
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run lint      # ESLint
```