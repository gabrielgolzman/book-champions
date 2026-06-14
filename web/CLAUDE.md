# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite HMR)
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint check
```

No test runner is configured.

## Stack

- React 19 + Vite 8, JavaScript (`.jsx`)
- **React Compiler** enabled via `babel-plugin-react-compiler` — do not manually `useMemo`/`useCallback` for memoization; the compiler handles it
- ESLint: `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

## Architecture

Early-stage university project (UTN DSW). Current structure:

- `src/App.jsx` — root component, maps `BOOKS` array → `<BookItem>` list
- `src/data/books.js` — static `BOOKS` array (the only data source, no backend yet)
- `src/components/bookItem/BookItem.jsx` — presentational component for a single book

Componentsa should all be inside their own folder. componentA/ComponentA.jsx. Also, only one component per file.

## Component Structure Convention

For any component that exceeds ~300 lines, has multiple server calls, or has significant business logic, use folder-based file separation:

```
componentName/
├── ComponentName.jsx        # JSX, hooks, handlers
├── ComponentName.scss       # styles
├── ComponentName.data.js    # hardcoded arrays/objects, defaults
├── ComponentName.const.js   # primitive constants (SCREAMING_SNAKE_CASE)
├── ComponentName.helpers.js # pure JS functions — no React, no hooks
└── ComponentName.server.js  # API calls with onSuccess/onError callbacks
```

Only create files that are actually needed — no empty stubs.
