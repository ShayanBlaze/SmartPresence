# SmartPresence Client (Vite)

This package now runs on [Vite](https://vitejs.dev) for faster dev server start-up and leaner production builds.

## Prerequisites

- Node.js 18+
- npm 9+

## Scripts

- `npm run dev` – start the Vite dev server on [http://localhost:5173](http://localhost:5173)
- `npm run build` – create an optimized production build inside `dist`
- `npm run preview` – serve the production build locally for quick smoke tests
- `npm test` – reserved for running component tests (configure via Vitest + Testing Library)

## Static Assets

Place static files (AI models, images, etc.) inside `public`. They are served at the root of the dev server and copied to the final build. For example, assets in `public/models` are available at `/models`.

## Environment Variables

Vite exposes env vars via `import.meta.env`. Add custom values to `.env` (or `.env.local`) using the `VITE_` prefix, e.g. `VITE_API_BASE_URL`.

## Further Reading

- [Vite Docs](https://vitejs.dev/guide/)
- [React Docs](https://react.dev/)
