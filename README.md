# Wubba Lubba Index

> **Demo app.** This project was built as live material for a **kandev** presentation. It's meant to be explored, changed and broken on stage, not used in production.

A small Next.js app for browsing characters from the public [Rick and Morty API](https://rickandmortyapi.com). It's a realistic codebase for showing development workflows live: it's big enough to be interesting and small enough to follow.

## What it does

- **Browse characters:** a paginated grid of every character in the show
- **Search and filter:** by name, status and gender, kept in the URL
- **Character details:** a page for each character at `/characters/[id]`
- **Favorites:** star characters and find them again at `/favorites` (saved in the browser's localStorage)
- **Light and dark themes**

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- React 19, TypeScript
- Tailwind CSS 4 and [shadcn/ui](https://ui.shadcn.com) components on Base UI
- [SWR](https://swr.vercel.app) for client-side fetching, [Zod](https://zod.dev) to validate API responses

No API key or environment variables are needed: the Rick and Morty API is public.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/                 routes: home, /characters, /characters/[id], /favorites
components/
  characters/        character cards, filters, pagination, favorite button
  layout/            nav bar
  ui/                shadcn/ui primitives
hooks/               use-favorites
lib/rickandmorty/    API client and Zod schemas
```

## Disclaimer

This is an unofficial fan project for demo purposes. It isn't affiliated with Adult Swim or the creators of _Rick and Morty_. Character data and images come from the [Rick and Morty API](https://rickandmortyapi.com).
