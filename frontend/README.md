# Frontend (`Allere` / Vite + React)

This folder is the web UI: a React 19 app built with Vite, styled with Tailwind CSS v4, and served in production via Docker + nginx.

---

## File reference

Each project-owned file below is listed with a short description of what it does. Generated folders such as `node_modules/` and `dist/` are omitted.

### Root config and tooling

| File | Purpose |
|------|--------|
| `package.json` | npm scripts (`dev`, `build`, `lint`, `preview`) and dependency list for the app. |
| `package-lock.json` | Locked npm dependency tree so installs are reproducible. |
| `tsconfig.json` | Root TypeScript project references (`tsconfig.app.json` + `tsconfig.node.json`). |
| `tsconfig.app.json` | Compiler options for application source under `src/`. |
| `tsconfig.node.json` | Compiler options for Node-only tooling (e.g. `vite.config.ts`). |
| `vite.config.ts` | Vite configuration: React plugin, Tailwind Vite plugin (`@tailwindcss/vite`). |
| `eslint.config.js` | ESLint flat config for TypeScript + React + hooks + refresh rules. |
| `index.html` | HTML shell: mounts the React app on `#root` and loads `src/main.tsx`. |
| `.gitignore` | Paths Git should ignore (e.g. `node_modules`, build output, env files). |

### Production build and deploy

| File | Purpose |
|------|--------|
| `Dockerfile` | Multi-stage image: Node builds the app (`npm run build`), nginx serves static `dist/`. |
| `nginx.conf` | nginx site config for the production container (serving the SPA static files). |

### Application source (`src/`)

| File | Purpose |
|------|--------|
| `main.tsx` | React entry: renders `<App />` into the DOM root in strict mode. |
| `App.tsx` | Top-level page: header, hero line, and the `PromptInputBox` demo wiring. |
| `index.css` | Global styles: Tailwind import (`@import "tailwindcss"`), custom scrollbar rules, mobile scrollbar hiding. |
| `speech-recognition.d.ts` | TypeScript declarations for the Web Speech API (`SpeechRecognition`, events, `window` constructors) where `lib.dom` is incomplete. |

### Utilities (`src/lib/`)

| File | Purpose |
|------|--------|
| `cn.ts` | Small helper to join class name strings (Tailwind-friendly). |
| `speechRecognition.ts` | Detects `SpeechRecognition` / `webkitSpeechRecognition` and exposes a constructor getter. |

### Prompt UI (`src/components/prompt/`)

| File | Purpose |
|------|--------|
| `types.ts` | Shared types: `ToolOption`, `PromptBoxStyles` (style tokens for the prompt box). |
| `promptBoxStyles.ts` | Default Tailwind class strings for `PromptInputBox` (visual theme in one place). |
| `PromptIcons.tsx` | Inline SVG icons (gear, microphone, chevron) used by the prompt toolbar. |
| `ToolsDropdown.tsx` | Gear button + tool label + dropdown menu; keyboard (`Escape`) and click-outside to close. |
| `MicButton.tsx` | Microphone button using the Web Speech API; appends final transcripts to the textarea. |
| `PromptInputBox.tsx` | Composes textarea + toolbar (tools on the left, mic on the right); merges default styles with overrides. |
| `index.ts` | Barrel exports for the prompt module and its public types. |

---

## Roadmap

Planned product direction for this app (not necessarily implemented yet):

1. **Topic research and real-world applications**  
   Let the user enter or pick a topic, then surface **research results** and **real-world applications** using **videos** and **articles** (search, summaries, and curated links).

2. **Adaptive Q&A from a topic or job posting**  
   Generate **questions** from a **topic** or pasted **job posting**, then **grade the user’s answers** and provide feedback (score, strengths, gaps).

3. **Feynman-style teaching with AI grading**  
   Let the user **pick a topic** and **explain it in their own words** (Feynman technique). The **agent evaluates** the explanation, **grades** understanding, and gives **actionable improvement feedback** on **what to study next**.

---

## Local commands

- **Dev server:** `npm run dev`  
- **Production build:** `npm run build`  
- **Lint:** `npm run lint`  
- **Preview production build:** `npm run preview`

After Docker image changes, rebuild the frontend image so the container includes new assets (see project root `docker-compose` workflow).
