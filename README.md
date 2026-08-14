# MyFlixCatalog (MVP)

Projeto MVP para catálogo pessoal de filmes e séries.

Stack:
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase Auth & Postgres
- TMDB API proxy (server-side) + cache no Postgres

Configuração:
1. Copie .env.example -> .env.local e preencha variáveis.
2. npm install
3. npm run dev

Principais rotas:
- / -> Dashboard
- /search -> Search + Typeahead
- /title/[media_type]/[tmdb_id] -> Página do título
- /stats -> Estatísticas do usuário
- /api/search?q=...
- /api/tmdb/movie/[id]
- /api/tmdb/tv/[id]

Observações:
- TMDB_API_KEY deve ficar apenas no servidor. Nunca publicar.
