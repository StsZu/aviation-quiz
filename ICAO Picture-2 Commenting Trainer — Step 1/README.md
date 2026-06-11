# ICAO Picture Description Trainer — Step 2 (source)

Source assets for the published trainer page `picture-description-trainer-step-2.html` (repo root). This folder is the authoring source — not the deployed page. (The folder name says "Step 1" for historical batch reasons; the content is the **Step 2 — Detailed Description** material.)

## What the module is for

Teaches ICAO aviation-English **Step 2: Detailed Description** — the full detailed account a candidate gives after the opening topic statement (Step 1). The student moves: look → read the Level 4 description → listen & shadow → Level 5 upgrade (deduction + safety) → repeat-after-me → reconstruct from memory → mini speaking task → self-check. Plus a keyboard-driven Deduction Drill and 90-second random-picture practice.

## How to open

Standalone page; from the repo root:

```
python3 -m http.server
# open http://localhost:8000/picture-description-trainer-step-2.html
```

No build, no dependencies — pure HTML/CSS/vanilla JS, works offline once assets are present. Page works even without the mp3 clips (browser-TTS fallback that speaks the same verbatim text).

## Folder structure (source)

```
ICAO Picture-2 Commenting Trainer — Step 1/
  NN-<slug>-photo.md        # per-scene script (10; #01 is -photo-1.md)
  NN-<slug>-photo.png       # scene image (10; #01 is -photo-1.png)
  ICAO-picture-descriptions.md   # combined reference of all 10
  README.md
```

Each per-scene `.md` has a fixed format with these sections:

- **Card text** — short keywords (used for the Reconstruct-from-memory + Random-practice chips).
- **ICAO description** — full detailed Level 4 description (present continuous/perfect, aviation vocab, cause-effect).
- **ICAO Level 5 upgrade** — same scene with possibility/deduction (*it must have been…*, *could have been caused by…*, *may indicate…*) + safety framing (*from a safety perspective…*, *the main risk is…*).
- **Repeat-After-Me ICAO Drill** — 4 short model lines.
- **Mini Speaking Task** — Question + Exam-safe answer.

## How the page consumes this

Content is **extracted once, verbatim** from the `.md` files into the inline `LESSONS2` array in `picture-description-trainer-step-2.html` (whitespace/line-wraps normalized only; nothing invented). Per object:

```js
{ slug, num, title, topic, cardText[], description, level5, repeat[4], task: { question, answer } }
```

The `DRILLS2` array and the audio clip ids are **derived in JS** from `LESSONS2` — no separate data to maintain.

Assets are served from these site folders (slugs are clean, no `NN-`/`-photo`):

| Asset | Path |
| --- | --- |
| Image | `img/picture-description-2/<slug>.jpg` |
| Description narration | `audio/picture-description-2/<slug>-description.mp3` |
| Level 5 narration | `audio/picture-description-2/<slug>-level5.mp3` |
| Mini-task answer | `audio/picture-description-2/<slug>-answer.mp3` |
| Repeat line N (1–4) | `audio/picture-description-2/<slug>-repeat-N.mp3` |
| Drill clip | `audio/picture-description-2-drills/<audio_id>.mp3` |

Drill `audio_id` is `<slug>-repeat-N` for the 40 repeat lines and `<slug>-answer` for the 10 mini-task answers (50 drill clips total).

## Slug convention

Source `NN-<slug>-photo` → site `slug` = drop nothing but the `-photo` suffix; keep the `NN-` prefix in the slug (e.g. `01-no-landing-gear-photo` → `01-no-landing-gear`). The 10 slugs:

`01-no-landing-gear`, `02-vehicle-on-runway`, `03-vehicle-hit-aircraft`, `04-foam-covered`, `05-lightning-strike`, `06-bird-strike`, `07-blaze-of-fire`, `08-bus-collision-wing`, `09-service-door-ripped`, `10-tail-strike`.

(Scene #01 source files carry an extra `-1`: `01-no-landing-gear-photo-1.{md,png}`.)

## Add a new scene

1. Add source `NN-<slug>-photo.{md,png}` here, following the 5-section `.md` format above.
2. Convert the PNG: `sips -s format jpeg -Z 1280 -s formatOptions 70 NN-<slug>-photo.png --out ../img/picture-description-2/<slug>.jpg` (target ~200 KB; drop the size/quality if it overshoots).
3. Append one object to `LESSONS2` in `picture-description-trainer-step-2.html`, copying `description` / `level5` / `repeat` / `task` **verbatim** from the `.md`.
4. Generate the clips (next section). `DRILLS2` and the drill ids update automatically.

## Generate audio (ElevenLabs)

Premium clips use one voice — **Daniel — Steady Broadcaster, en-GB** (`onwK4e9ZLuTAKqWW03F9`), model `eleven_multilingual_v2`. For each scene generate `<slug>-description.mp3`, `<slug>-level5.mp3`, `<slug>-answer.mp3`, `<slug>-repeat-1..4.mp3` into `audio/picture-description-2/`, and the 5 drill clips (`<slug>-repeat-1..4`, `<slug>-answer`) into `audio/picture-description-2-drills/`.

Use the script-stub in `SOUND/premium-voice-clips-howto.md` (needs `ELEVENLABS_API_KEY` in env — **never commit the key**; `requests` is not installed, use `urllib`). If a clip is missing the page falls back to browser TTS speaking the same verbatim text, so it works before clips exist; regenerate after editing any text.

## Recommended daily routine (20 min)

- 5 min — read one detailed description and listen to its audio.
- 5 min — shadow the audio: repeat in sync.
- 5 min — reconstruct the description from the keywords only.
- 5 min — answer the mini speaking task and add the Level 5 deduction line.
