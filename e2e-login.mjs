import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const suffix = Date.now();
const EMAIL = `e2e-${suffix}@teste.com`;
const PASS = "segredo12345";
const log = (...a) => console.log("[e2e]", ...a);
const failed = [];

function watch(page, tag) {
  page.on("pageerror", (e) => failed.push(`pageerror(${tag}): ${e.message}`));
  page.on("console", (m) => m.type() === "error" && failed.push(`console(${tag}): ${m.text()}`));
}

async function register(page, name, email) {
  await page.goto(`${BASE}/registro`, { waitUntil: "networkidle" });
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', PASS);
  await page.fill('input[name="confirm"]', PASS);
  await page.check('input[name="terms"]');
  await page.click('button[type="submit"]');
  await page.waitForURL("**/criar**", { timeout: 45000 });
}

let browser;
try {
  browser = await chromium.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });

  // 1) Registro de novo usuário -> deve cair no /criar
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  watch(page, "cadastro");
  await register(page, "Teste E2E", EMAIL);
  log("registro ok ->", page.url());
  const cookies = await ctx.cookies();
  log("cookie session:", cookies.some((c) => c.name === "session"));
  if (cookies.some((c) => c.name === "session") === false) failed.push("cookie session ausente");

  // 2) /criar ainda logado (nova página) responde 200
  const p2 = await ctx.newPage();
  const r2 = await p2.goto(`${BASE}/criar`, { waitUntil: "domcontentloaded" });
  log("/criar logado:", r2.status(), p2.url());

  // 3) Anônimo /criar -> redirect /login?returnTo=/criar
  const ctxAnon = await browser.newContext();
  const pAnon = await ctxAnon.newPage();
  const r3 = await pAnon.goto(`${BASE}/criar`, { waitUntil: "domcontentloaded" });
  log("/criar anonimo:", r3.status(), "->", pAnon.url());

  // 4) Login com as credenciais recém-criadas
  const ctxLogin = await browser.newContext();
  const pLogin = await ctxLogin.newPage();
  watch(pLogin, "login");
  await pLogin.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await pLogin.fill('input[name="email"]', EMAIL);
  await pLogin.fill('input[name="password"]', PASS);
  await pLogin.click('button[type="submit"]');
  await pLogin.waitForURL("**/criar**", { timeout: 45000 });
  log("login ok ->", pLogin.url());

  // 5) Erro de credenciais no login
  const ctxBad = await browser.newContext();
  const pBad = await ctxBad.newPage();
  await pBad.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await pBad.fill('input[name="email"]', EMAIL);
  await pBad.fill('input[name="password"]', "senha-invalida-x");
  await pBad.click('button[type="submit"]');
  await pBad.waitForSelector("text=E-mail ou senha incorretos", { timeout: 20000 });
  log("login invalido -> mensagem de erro mostrada");

  // 6) Usuário comum tentando /admin -> redirect para /
  const ctxUser = await browser.newContext();
  const pUser = await ctxUser.newPage();
  watch(pUser, "admin-block");
  await register(pUser, "Teste Comum", `comum-${suffix}@teste.com`);
  const ra = await pUser.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" });
  log("/admin (user comum):", ra.status(), "->", pUser.url());

  if (failed.length) {
    log("failures:", failed);
  }
  console.log(failed.length === 0 ? "E2E OK" : "E2E COM FALHAS");
  process.exitCode = failed.length ? 1 : 0;
} finally {
  await browser?.close();
}