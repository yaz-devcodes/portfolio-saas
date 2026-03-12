# Portfolio SaaS Starter

A minimal SaaS starter built with Next.js App Router and Clerk.  
The project includes a landing page, authentication shell, pricing surface, and feature-gated app cards.

## Tech stack

- Next.js (App Router)
- TypeScript
- Clerk (`@clerk/nextjs`)
- Tailwind CSS v4
- Zod
- Shiki (for syntax-highlighted docs snippets)

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local` using values from your Clerk app.

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev`: Start local development server.
- `npm run build`: Create a production build.
- `npm run start`: Run the production build.
- `npm run lint`: Run ESLint.

## Project structure

- `src/app`: Route pages and root layout.
- `src/components`: Reusable UI primitives and composite sections.
- `src/lib/contracts.ts`: Route and feature-gate behavior contracts.
- `src/lib/site-content.ts`: Centralized, Zod-validated content models for links/cards/hero content.
- `src/lib/auth-gates.ts`: Pure auth decision helpers shared by pages and middleware.
- `src/proxy.ts`: Clerk middleware with app access guard + redirect behavior.
- `public/assets`: Card preview assets.

## Behavior contracts

The codebase keeps these runtime expectations stable:

- `/app` requires a signed-in user with `dashboard_access`.
- Unauthorized or missing access redirects to `/pricing`.
- Landing and app cards render in a deterministic order from centralized typed config.
- Navbar links, hero CTAs, and footer links come from validated schemas.

## Notes for customization

- Add or change feature keys in Clerk and mirror them in `src/lib/contracts.ts`.
- Update card/nav/footer/hero copy in `src/lib/site-content.ts`.
- Keep route paths in `src/lib/contracts.ts` as the single source of truth.
