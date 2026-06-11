# ICAO Picture Description Trainer — Step 1 (source)

Source assets for the published trainer page `picture-description-trainer.html` (repo root). The student-facing page is built from the materials in this folder; this folder itself is the authoring source, not the deployed page.

## What the module is for

Teaches ICAO aviation-English **Step 1: Topic Statement** — the short general overview a candidate gives before describing a picture in detail. The student moves: keywords → simple sentence → stronger (ICAO 4–5) → full exam version → describe from memory. Plus a keyboard-driven Active Recall audio drill for collocations.

## How to open

The trainer is a standalone page; from the repo root:

```
python3 -m http.server
# open http://localhost:8000/picture-description-trainer.html
```

No build, no dependencies — pure HTML/CSS/vanilla JS, works offline once assets are present.

## Folder structure (source)

```
ICAO Picture Commenting Trainer — Step 1/
  NN-<slug>.png            # scene image (8)
  NN-<slug>_S1.md          # Step-1 script (keywords + simple/stronger/exam)
  mp3/
    NN-<slug>_S1.mp3        # narration per scene
    NN-<slug>_S1.srt        # timed subtitles (optional transcript)
  songs/
    <Song Title>.mp3        # memorization songs
  README.md
```

## How the page consumes this

Content is **extracted once** from the `_S1.md` scripts into the inline `LESSONS` array in `picture-description-trainer.html` (the MD format is inconsistent — some files use ` ```text ` fences and extra `##` alternatives — so it is not parsed at runtime). Each MD splits on fixed markers:

- keywords = lines before `Now listen and repeat.`
- `simple` = after `Now listen and repeat.`
- `stronger` = after `Now listen to a stronger version.`
- `exam` = after `Now listen to the full exam version.`

Assets are served from the site folders (already populated, clean slugs):

| Asset | Path |
| --- | --- |
| Image | `img/picture-description/<slug>.jpg` |
| Narration | `audio/picture-description/<slug>.mp3` |
| Song audio | `audio/picture-description/songs/<song-slug>.mp3` |
| Song cover | `img/picture-description/songs/<song-slug>.jpg` |
| Drill clip | `audio/picture-description-drills/<audio_id>.mp3` |

Source `NN-name` → site `slug`: drop the number and `_S1`; `09-aircraft-with-collapsed-nose-gear` → `nose-gear-collapse`.

## Naming convention

- Source files: `NN-<lowercase-hyphen>_S1.{png,md,mp3,srt}`, `NN` zero-padded (note: `04` is intentionally absent).
- Site slug: lowercase-hyphen, no number/`_S1`.
- Drill clip id: `drill-NN-<target-collocation-slug>`.

## Add a new picture lesson

1. Add source `NN-<slug>_S1.md` (+ `.png`) here and `mp3/NN-<slug>_S1.mp3` (+ `.srt`).
2. Convert/copy the image to `img/picture-description/<slug>.jpg` and the narration to `audio/picture-description/<slug>.mp3`.
3. Append one object to `LESSONS` in `picture-description-trainer.html` (`slug, num, title, topic, keywords[], simple, stronger, exam, img, audio, songs[], template`). `template` ∈ `normal | abnormal | runway | aftermath`.
4. Optionally add Active Recall cards to `DRILLS` (`task`, `target`, `audio_id`).

## Add MP3 / SRT

- Narration → `audio/picture-description/<slug>.mp3` (referenced by `audio` field).
- SRT stays in `mp3/` as the timed transcript; the page currently uses the MD-derived text, so SRT is reference only.

## Add a song

1. Drop the MP3 in `songs/`, copy to `audio/picture-description/songs/<song-slug>.mp3` and a cover to `img/picture-description/songs/<song-slug>.jpg`.
2. Add `{ title, file: "<song-slug>" }` to the lesson's `songs` array. The Songs section de-duplicates by `file`.

## Generate drill clips (ElevenLabs)

Active Recall `target` collocations are voiced as premium clips (one voice, **Daniel — Steady Broadcaster, en-GB**, `onwK4e9ZLuTAKqWW03F9`) in `audio/picture-description-drills/`. If a clip is missing, the page falls back to browser TTS, so it works before clips exist. To regenerate: extract `(target, audio_id)` from `DRILLS` and POST each to ElevenLabs TTS (see `SOUND/premium-voice-clips-howto.md`; needs `ELEVENLABS_API_KEY` in env — never commit the key).

## Recommended daily routine (20 min)

- 5 min — listen to one audio script.
- 5 min — repeat after the audio.
- 5 min — speak using only keywords.
- 5 min — describe a random picture without reading the answer.
