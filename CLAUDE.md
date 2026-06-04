# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static site for ICAO aviation-English exam prep, deployed via GitHub Pages.

- Repo: `StsZu/aviation-quiz`, branch `main`. This folder is the local clone — all `git add`/`commit`/`push` run from here.
- Live site: **https://stszu.github.io/aviation-quiz/** (not the github.com URL). Push auto-deploys in ~20–60s.
- No build, lint, or test step. Local preview: `python3 -m http.server` from this folder, open `http://localhost:8000`.
- `RUN.md` is the authoritative user-facing workflow doc (Ukrainian) — read it before adding content; keep it in sync with any process change.

This folder is **only the published site**. Quizzes are authored in a separate generator at `../../ACTIVE/Creator_quiz/`, then copied here for publishing. `Quiz-1/` here holds source drafts and is gitignored (along with `.DS_Store`, `.claude/`).

## Page architecture

Every page is a standalone HTML file with an inline `<style>` block — no shared CSS, no JS framework, no bundler. Pages are kept visually consistent by hand, not by includes.

Shared theme (replicate it when adding/editing a page): `font-family: Georgia`, background `#e7dfd2`, cards `#f8f3e9` with `1px solid #d4c7b3` borders and ~18–22px radius, text `#2f2822`, muted `#7a6858`. Buttons/links use `"SF Pro Text", Arial, sans-serif`.

Exception: `aviation_vocabulary_quiz.html` uses a Tailwind CDN; all other quizzes use plain inline CSS.

Three page types:

- **`index.html`** — the menu. A `.quiz-list` grid of static `.quiz-card` `<article>`s, one per quiz/section. Adding a quiz means hand-adding a card here.
- **Quiz pages** (`quiz_*.html`, `aviation_*.html`) — driven by a JS `questions` array of `{ question, options: [...], correct: <index>, explanation }`. Client-side scoring, one question at a time. Every quiz page must include a `← All quizzes` back-link to `index.html`.
- **Gallery pages** — `infographics.html` and `songs.html` render from a JS data array; the markup is generated in JS, so add content by editing the array, not the DOM.
- **Cockpit Class pages** — immersive lessons under `aviation_english_cockpit_class/` (own dark Tailwind-CDN theme, Web Speech API for TTS, self-contained). Because they live in a subfolder, their links to root pages need `../` (e.g. `../index.html`, `../songs.html#it-depends-on-safety`); links from root pages to them use `aviation_english_cockpit_class/<file>.html`.

## Adding content (data-array contracts)

**Infographic** → push to the `images` array in `infographics.html`: `{ file, title }`. `file` is the basename (no extension). Full image goes to `img/<file>.png`; a compressed JPEG preview to `img/thumb/<file>.jpg` (generate with `sips`, target ~200 KB).

**Song** → push to the `songs` array in `songs.html`: `{ file, title, artist, topic, link: { href, label }, lyrics }`. MP3 goes to `audio/<file>.mp3`; cover art to `img/<file>.jpg`. Suno MP3 exports are self-contained — extract the embedded lyrics and cover from the file rather than sourcing them separately (Suno pages can't be iframed). `link` optionally points to the related quiz.

**Quiz** → copy the HTML in, add its `← All quizzes` back-link, then add a `.quiz-card` to `index.html`.

After any addition: `git push` from this folder, then verify the live URL renders the new card and the page opens.
