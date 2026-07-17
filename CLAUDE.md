# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Speech Helper App for Kids** — a non-commercial educational React app that helps children practice Spanish pronunciation through leveled scenes with images, syllable-by-syllable audio, and speech-recognition feedback. All actual code lives under `jpld_react/`; the repo root only has the license/README.

## Commands

All commands run from `jpld_react/`:

- `npm start` — CRA dev server for the frontend at http://localhost:3000
- `npm run build` — production build to `jpld_react/build`
- `npm test` — CRA/Jest test runner (no test files currently exist in the repo)
- `node server.js` (or `npx nodemon server.js`) — start the Express backend on port 5000; there is no npm script for this, run it directly. Requires a `.env` file (loaded via `dotenv`) since `server.js` calls `require('dotenv').config()`.

Both the frontend and backend must be run simultaneously in development — the frontend calls the backend at `http://localhost:5000` (see `src/api/api.js`).

## Architecture

### Two independent halves, one package.json

`jpld_react/` contains both a CRA frontend (`src/`) and a standalone Express backend (`server.js`), sharing one `package.json`/`node_modules`. They are not built or deployed together — `server.js` is plain CommonJS run directly with Node, not bundled by react-scripts.

- **Backend (`server.js`)**: Express app on port 5000. Serves `public/` statically, exposes `POST /tts` (generates a Spanish mp3 via `gtts` and saves it) and a stub `POST /logIn`. Also contains a commented-out `generateSpeech()` bulk-generation function that pre-rendered all syllable audio in `public/audios` from a `phrases` map (level → sublevel → word → syllables).
- There is a second, **orphaned** `jpld_react/api.js` at the package root — a near-duplicate of `src/api/api.js` but pointed at port 1000. It is not imported anywhere; don't confuse it with the real API client at `src/api/api.js`.

### Frontend state: Context + reducer

Global state is a single `useReducer` store, not Redux:
- `src/context/DirectoryProvider.jsx` — creates `DirectoryContext`, exposes `useAppContext()`, and exports async action-creator functions (`setVolume`, `setBrightness`, `setLetterSize`, `setLevel`, `setDifficulty`, `setScene`, `setPlayers`, `textToSpeech`, `logIn`). Call these with `dispatch` from `useAppContext()`.
- `src/context/DirectoryReducer.jsx` — the reducer switch statement; throws on unknown action types.
- `src/context/actions.js` — action-type string constants only (no creators).

State shape: `{ settings: { volume, brightness, letterSize }, scene, level, difficulty, players }`. `App.js` reads `settings.letterSize`/`brightness` and writes them to CSS custom properties (`--font-scale`, `--color-brightness`) so styling reacts to accessibility settings globally.

### Routing

`App.js` wraps everything in `DirectoryProvider` and `react-router-dom` `Routes`. Only four routes are wired up: `/` (`PantallaDeInicio`), `/selector_jugadores`, `/level_selector`, `/level`. The `Gear` button and `InGameConfig` overlay are rendered globally outside `<Routes>` so settings are reachable from any screen.

Several files under `src/components/Pages/` (`Home.jsx`, `InGame.jsx`, `Configuration.jsx`, `PlayerSelector.jsx`) are legacy/unused stubs — not imported by `App.js`. Don't assume they're reachable; check `App.js` routes before wiring new navigation.

### Content model: levels → difficulty → scenes → syllables

Curriculum content (levels 0–6, e.g. jungle/school/beach/house/hygiene/transport/park) is organized as nested arrays: `phrases[level][difficulty - 1][scene]` yields a syllable-hyphenated phrase string (e.g. `"MO-NO"`). This structure is duplicated in at least two places that must stay in sync:
- `src/components/Pages/Level/Level.jsx` — accented, uppercase Spanish text used for on-screen display.
- `server.js` (`generateSpeech`) — unaccented, mixed-case phonetic transliteration used only to generate audio filenames/content.

Per-scene audio files follow the naming convention `lvl{level}_sub{difficulty-1}_w{scene}_s{syllableIndex}.mp3`, pre-generated into `public/audios/`. Word/animal sound effects are separate, simpler files in `public/sounds/{name}.mp3`, referenced by parallel `audioSets`/`animalSets`/`backgrounds` maps that also appear in both `Level.jsx` and `LevelOverlay.jsx` — when adding a level/scene, update all of these consistently.

### Speech recognition flow

`src/components/Screens/LevelOverlay/LevelOverlay.jsx` uses `react-speech-recognition` (Web Speech API) with `language: "es-ES"`. On stop, it normalizes both the expected phrase and the transcript (strip accents/punctuation/whitespace, lowercase) and compares them for an exact match to decide correct/incorrect, surfaced via `SpeechResultPopup`.

### Component organization

Under `src/components/`, grouped by role rather than by feature: `Buttons/`, `Frames/`, `Pages/`, `Screens/`. Each component is a directory with a `ComponentName.jsx` plus a co-located `style.css`. SVG assets in `src/assets/` are imported as React components (`import { ReactComponent as X } from '...svg'`, a CRA/webpack feature — this pattern won't work unmodified outside CRA's build).

## Licensing convention

Every source file in `jpld_react/` (backend and frontend alike) carries a CC BY-NC-SA 4.0 attribution header block crediting the original idea authors, code authors, and mockup/design team (see root `README.md` for the full list and rationale). When editing existing files, keep this header intact; the project is explicitly non-commercial and derivative works must retain attribution.
