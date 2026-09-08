# NexaUI

NexaUI is a polished, reusable SaaS dashboard starter kit built for teams who want to spend less time wiring interface states and more time building their product.
## Live Demo

**[Open NexaUI](https://nexa-ui-nine.vercel.app)**

## GitHub Repository

**[View Source Code](https://github.com/bahrozabbas123-cloud/nexa-ui)**


## Features

- Next.js App Router with strict TypeScript
- Responsive application shell with collapsible desktop sidebar and mobile navigation
- Light and dark themes
- Reusable buttons, cards, badges, avatars, progress, inputs, and headings
- Interactive Recharts visualizations
- Dashboard, analytics, projects, users, tasks, messages, files, billing, settings, profile, login, and signup routes
- Realistic local mock data with no backend or external API
- Accessible labels, focusable controls, semantic tables, and responsive overflow handling

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the landing page or `/dashboard` for the product UI.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` checks the codebase with ESLint.

## Project structure

- `src/app` contains App Router pages and route entry points.
- `src/components` contains the shell, dashboard, charts, and UI primitives.
- `src/data` contains typed mock data and navigation configuration.
- `src/app/globals.css` contains theme tokens and responsive component styles.

## Customization

Change the color tokens at the top of `src/app/globals.css` to rebrand the kit. Add new navigation items in `src/data/mock.ts`, then create a page under `src/app` or extend the shared dynamic page for a quick new workspace view. Reuse `Card`, `Button`, `Badge`, `Avatar`, `Progress`, and `Input` instead of introducing one-off controls.

The dashboard data is intentionally local in `src/data/mock.ts`. Replace those arrays with your own typed data fetching layer when your backend is ready. No authentication, billing, payment, or API provider is connected in this starter.

## Deployment

NexaUI can be deployed to any platform that supports Next.js. Run `npm run build` locally first, then configure your platform to use `npm run start` for a Node deployment. For a managed Next.js deployment, connect the repository and use the default build settings.


