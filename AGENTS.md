# Lineart Cultural Site — Guia para Agents

Site institucional one-page da LINEART (Capoeira Angola) — produção em `capoeiralineart.com`. Angular 18 standalone + SSR (Express) + Tailwind + PWA. **Só existe o branch `main`** — push direto em `main` dispara o deploy via GitHub Actions.

## Stack e estrutura

- **Angular 18** (standalone, sem módulos), SSR via `@angular/ssr` + Express (`server.ts` → `dist/lineart-cultural-site/server/server.mjs`).
- **Tailwind 3** — `tailwind.config.js` com paleta `primary` (verdes) / `secondary` (laranjas) / `gray`. O `ng build`/`ng serve` já processa via `src/styles.css` (`@tailwind` directives). O script `npm run css` (watch legado) **não é necessário** no fluxo normal.
- **PWA**: `ngsw-config.json` — prefetch do app shell, lazy para imagens/fonts; service worker só registra em produção (`!isDevMode()`). Ícones/manifest em `public/`.
- Rotas: `''` → `HomeComponent` (sections `banner`, `about-section`, `mestre-section`, `instagram-section`, `contact-section`, `posts-section` em `src/app/components/` + `src/app/pages/home/`), `/publicacoes` e `/publicacoes/:id` (`src/app/pages/posts/`), `/servicos` (`src/app/pages/services/`).
- `src/app/layouts/` (header/footer) entram no `AppComponent` via array `components` exportado de `src/app/app.imports.ts` — ao adicionar layout global, registre lá.
- `src/app/services/instagram.service.ts` injeta `instagram.com/embed.js` uma vez (`afterRender` no HomeComponent) e chama `instgrm.Embeds.process()` — se embeds novos entrarem no DOM depois, chame `process()` de novo.

## Consumo da lineart-api

O site consome a `lineart-api` em **endpoints públicos** (leitura, sem auth):

| Service | Endpoint | Uso |
|---|---|---|
| `src/app/services/post.service.ts` | `GET api/posts` (paginado, anônimo → só `isActive=true`), `GET api/posts/{id}` | `posts-section` na home, `/publicacoes`, `/publicacoes/:id` |
| `src/app/services/services.service.ts` | `GET api/users/services` (anônimo → só `ShowOnSite`) | `/servicos` — "Serviços da comunidade" cadastrados no perfil do admin |

- `src/env.ts` → `appEnv.apiUrl` (dev: `http://localhost:8201`, typo `isPorduction` compartilhado com o admin — não renomear). `provideHttpClient(withFetch())` em `app.config.ts`; services usam `take(1)` e tratam erro silenciosamente (página renderiza estado vazio).
- **SSR/prerender**: o fetch roda no Node durante SSR — `localhost:8201` dentro do container aponta pro próprio container e falha; o estado vazio é renderizado e o browser re-busca na hidratação (CORS já cobre `localhost:8202`). Funciona, mas o HTML do SSR não traz os dados — quirk conhecido.
- O formulário de contato (`ContactSectionComponent`) continua estático — só monta texto e abre `wa.me/557991469391` (Mestre Formiga).
- **Env de produção**: o `Dockerfile` gera `env-prod.ts` com `ARG API_URL` (default `http://localhost:8201`) e `env.sh` faz `mv env-prod.ts → env.ts` antes do build — mesmo padrão do admin (`env-prod.ts` é gitignored). Quando o domínio público da API existir, passe `--build-arg API_URL=https://<dominio-api>` no build da imagem (o workflow hoje não passa — mantém localhost).

## SEO/meta

`src/index.html` carrega OG/Twitter/canonical apontando `https://capoeiralineart.com/` e imagem `/images/logo.webp?v=1`. Ao trocar a imagem social, **bump o `?v=`** para invalidar cache de crawlers. Título oficial: `LINEART | Capoeira Angola` (caps em LINEART é padrão do projeto — não "Lineart").

## Rodar e buildar

```sh
npm install
npm start          # ng serve --port 4202 (NÃO 4200)
npm run build      # gera dist/.../browser + dist/.../server/server.mjs — obrigatório antes de commitar
npm run serve:ssr:lineart-cultural-site   # sobe o SSR local na porta 4200 (PORT env sobrescreve)
```

- Build AOT+SSR é a validação real — erros de template que `tsc` deixa passar quebram aqui. Warnings já conhecidos e benignos: budget de CSS do `banner.component.css` estourado (~228 bytes) e `hammerjs` (CommonJS, via `@ngu/carousel`) causando bailout de otimização.
- `npm test` existe (Karma/Jasmine) mas só há specs geradas pelo CLI; exige Chrome headless.
- Dockerfile local usa `node:18-alpine`; o CI usa Node 22 — ambos funcionam, mas se algo quebrar só no CI, suspeite de diferença de versão.

## Deploy (automático — o push É o deploy)

`.github/workflows/angular.yml` em push/PR para `main` — **atenção: o job `deploy` não tem `if` de branch, então PRs de branches do próprio repo também fazem deploy** (PRs de fork falham por não receber secrets — esperado):

1. Build da imagem `ghcr.io/<repo>/lineart-cultural-site:latest` + push pro GHCR.
2. SSH na VPS (secrets `VPS_HOST`/`VPS_USER`/`VPS_PASSWORD` — presumivelmente a mesma máquina da lineart-api, 147.79.81.208) via `sshpass`.
3. `docker pull` + `docker run -d --name lineart-cultural-site --network lineart-net --restart unless-stopped -p 4202:4200 <img>` (cria `lineart-net` se não existir).

Container expõe SSR na `4202:4200`; o nginx do VPS proxyfies `capoeiralineart.com` pra essa porta. **Local** roda na `8202:4200` (range lineart: db `5460`, api `8201`, site `8202`, admin `8203` — fora das faixas ujamaa): `docker build -t lineart-cultural-site . && docker run -p 8202:4200 --network lineart-net lineart-cultural-site`.

## Fluxo pós-alteração (sempre)

```sh
# 1. Build local (AOT+SSR pega o que o editor não vê)
npm run build

# 2. Commit + push em main
git add -A && git commit -q -m "fix: descricao"
git push origin main

# 3. Deploy local (rebuild + recria container na 8202)
docker build -q -t lineart-cultural-site:latest .
docker rm -f lineart-cultural-site && docker run -d --name lineart-cultural-site \
  --network lineart-net --network-alias lineart-site --restart unless-stopped \
  -p 8202:4200 lineart-cultural-site:latest

# 4. Verificar local
curl -s -o /dev/null -w '%{http_code}' http://localhost:8202/
```

**Não declare "feito" sem container local recriado e verificado** — o push também dispara a Action de produção (GHCR → VPS :4202); se ela falhar no step SSH, o deploy de prod não aconteceu.

## Git

- Push HTTPS para `github.com/Kuumba-Lab/lineart-cultural-site`, direto em `main`.
- Estilo dos commits: conventional lowercase — `fix: update ...`, `feat: add ...`. Sem `-i`, sem push forçado, sem alterar git config.

## Receitas de debug rápido

- "Embed do Instagram não renderiza": `InstagramService` só carrega o script uma vez — conteúdo inserido no DOM depois precisa de `instgrm.Embeds.process()`.
- "Site servindo versão velha em produção": service worker (ngsw) faz prefetch do app shell — hard refresh / unregister pra testar; ao trocar assets com URL fixa, prefira bump de query (`?v=`).
- "Classe Tailwind não aplica": confirme que o arquivo está dentro de `./src/**/*` (content glob do `tailwind.config.js`) — fora disso o purge remove.
- "Porta errada em dev": `npm start` usa **4202**; o `ng serve` padrão e o SSR standalone usam 4200 — confusão comum.
- "Nada renderiza sem JS": SSR cobre isso; se `server.mjs` não estiver rodando no container, é SPA puro — verifique `docker logs lineart-cultural-site` na VPS.
