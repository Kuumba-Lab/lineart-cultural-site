# Lineart Cultural Site — Guia para agentes

Site público (Angular 18, standalone components, SSR/prerender com Express, Tailwind) do coletivo
LINEART Capoeira Angola. Apresenta a página institucional (home) e as **publicações** criadas no
`lineart-cultural-admin`, consumindo apenas os endpoints públicos da `lineart-api` (sem login).

## Estrutura

```
src/
├── env.ts                      # appEnv.apiUrl (https://localhost:7207 em dev)
├── styles.css                  # Tailwind + estilos globais (.post-content para HTML do editor)
├── app/
│   ├── app.routes.ts           # '' (home), 'publicacoes', 'publicacoes/:id', '**' -> ''
│   ├── app.config.ts           # router (scroll top + âncoras), HttpClient (fetch), hydration, SW, pt-BR
│   ├── layouts/                # header (logo + nav Sobre/Publicações/Contato) e footer
│   ├── components/             # seções da home (banner, about, contact, instagram...)
│   ├── models/post.model.ts    # PostModel, AuthorModel, TagModel, PagedModel, PostFilters
│   ├── pages/
│   │   ├── home/               # composição das seções institucionais
│   │   └── posts/
│   │       ├── post-list/      # busca (título/autor/tag), chips de autores e tags, paginação
│   │       └── post-detail/    # capa, autores, tags, data e conteúdo HTML (innerHTML)
│   └── services/
│       ├── instagram.service.ts
│       └── post.service.ts     # GET api/posts, api/posts/{id}, api/tags, api/users/authors
server.ts                       # Express + Angular SSR (porta 4000 padrão / 4200 no Dockerfile)
```

## Convenções

- **Standalone components** sempre; sem NgModules. Rotas e textos em português.
- Sem autenticação: use somente endpoints públicos. Anônimos só recebem posts `isActive = true`.
- O site roda no servidor (SSR/prerender) e no navegador: **não acesse `window`/`document`
  diretamente** fora de `afterNextRender`/`isPlatformBrowser`. Chamadas HTTP devem tolerar falha
  (a API pode não estar disponível durante o prerender do build): trate `error` e mostre estado
  vazio/erro em vez de quebrar a renderização.
- Filtros da lista vivem na URL (`?busca=&tag=&autor=&pagina=`), assim páginas de busca são
  compartilháveis e o SSR renderiza o mesmo resultado. Nomes dos query params em português;
  no `PostService` são traduzidos para `searchTerm`, `tag`, `author`, `page`, `size`.
- O `content` das publicações é HTML confiável gerado pelo `ngx-editor` do admin e renderizado com
  `[innerHTML]` (o Angular sanitiza scripts). A tipografia (h1–h3, negrito, itálico, sublinhado,
  blockquote, listas, código, imagens) fica em `.post-content` no `styles.css`, pois o Tailwind
  reseta esses elementos.
- Tailwind: cores `primary` (verde) e `secondary` (amarelo) em `tailwind.config.js`; fundo escuro
  institucional `#0a0d29`. Reaproveite os padrões de card/seção usados na home.

## Comandos

```bash
npm ci
npm start                                  # dev server em http://localhost:4202
npm run build                              # build browser + server + prerender (dist/lineart-cultural-site)
npm run serve:ssr:lineart-cultural-site    # roda o SSR a partir do dist
npm test                                   # Karma/Jasmine
```

Não há script de lint; `ng build` é a verificação obrigatória (falhas de template quebram o build).
Avisos de budget do `banner.component.css` e de CommonJS (`hammerjs`) são pré-existentes.

## Integração com a API

| Uso                         | Endpoint                          | Observação                                 |
|-----------------------------|-----------------------------------|--------------------------------------------|
| Lista/busca de publicações  | `GET api/posts`                   | `searchTerm`, `tag`, `author`, `page`, `size`; retorna `PagedViewModel` |
| Detalhe                     | `GET api/posts/{id}`              | 404/erro => "Publicação não encontrada"     |
| Tags para filtros           | `GET api/tags`                    |                                            |
| Autores com posts ativos    | `GET api/users/authors`           |                                            |

Ao mudar contratos na `lineart-api`, atualize `src/app/models/post.model.ts` e o `agent.md` do admin.
