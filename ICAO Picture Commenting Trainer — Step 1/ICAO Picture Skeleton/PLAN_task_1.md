# План виконання — три тренажери SCAN (Actor Method)

> План для `task_1.md`. Узгоджені рішення: **файли в корені репозиторію + публікація**, **статичні картки SCAN×4P** (без tap-the-zone overlay), **повний Speak-режим + AI-коуч** зі `scan-method-trainer.html`, плюс actor-method віджети (їхнє аудіо — vanilla `SpeechSynthesis`).

## Контекст

`task_1.md` просить перетворити три скелети картинок (Runway Incursion, Crosswind Landing, Ground Vehicle Collision) на **три окремі опубліковані сторінки-тренажери SCAN**, кожну збагачену actor-method технікою запам'ятовування (beats, chunk builder, first-letter prompts, cue–response flashcards, recall mode, camera checklist, memory route, TTS-аудіо).

Зараз є рівно **одна** SCAN-сторінка — `scan-method-trainer.html` (runway excursion у воді). Вона містить увесь рушій, який ми перевикористовуємо: світла тема Georgia, SCAN-інтро, Learn/Drill тренажер фраз, evidence drill, Speak-режим з авто-метриками ICAO та Anthropic AI-коуч. Нові сторінки клонують її вигляд, **прибирають per-image SVG zone overlay** (рішення: статичні картки SCAN×4P), **зберігають Speak + AI coach** і **додають** actor-method секції.

Результат: три нові файли в корені репозиторію, три стиснені зображення, три картки в `index.html`, запушено на live.

Контент уже існує і є авторитетним — три скелетні `.md` містять повний текст SCAN×4P, історії Level 4 / Level 5, логіку beats і корисні фрази. Текст cue–response карток для всіх трьох сцен наведено дослівно в `task_1.md` (рядки 78–137).

## Файли

Нові сторінки (корінь репо), по одній на сцену:

- `scan-runway-incursion-trainer.html`
- `scan-crosswind-landing-trainer.html`
- `scan-ground-collision-trainer.html`

Нові зображення (стиснути з PNG скелетів через `sips`, ціль ~250–400 KB JPEG):

- `img/scan-runway-incursion.jpg`  ← `…/ICAO Picture Skeleton/Runway Incursion.png`
- `img/scan-crosswind-landing.jpg` ← `…/ICAO Picture Skeleton/Crosswind Landing.png`
- `img/scan-ground-collision.jpg`  ← `…/ICAO Picture Skeleton/Ground Vehicle Collision.png`

Редагується:

- `index.html` — додати три об'єкти `MODULES`.

## Підхід до збірки

Зробити **сторінку 1 (Runway Incursion) повністю**, перевірити, потім **клонувати двічі**, замінивши лише дані-масиви + опис картинки в AI-коучі + зображення + заголовок. Кожна сторінка самодостатня (inline `<style>` + `<script>`), згідно з архітектурою репо «no shared CSS/JS».

### Перевикористати зі `scan-method-trainer.html` (копіювати майже дослівно)

- Увесь блок `<style>` (тема, картки, кнопки, level-акордеон, speak/metrics, AI box, SOS) — `scan-method-trainer.html:7-338`.
- Хелпер `speak(text)` SpeechSynthesis — `:672-679` (en-GB, rate 0.92). Він керує кожною новою actor-method аудіо-кнопкою (немає записаних кліпів → викликати `speak()` напряму, без `playClip`).
- Білдер Levels-акордеону — `:1207-1232`.
- Блок Speak-режиму повністю (recorder, ASR, `computeMetrics`, history) — `:923-1116`. Перевикористати як є; замінити лише `ZONE_KEYWORDS` / `VOCAB_LIST` під сцену.
- Блок AI-коуча — `:1118-1204`. Перевикористати як є; переписати лише абзац про картинку в `COACH_SYSTEM` під сцену.
- SOS rescue кнопка + панель — `:484-490, 603-608, 1239-1257`.

### Нові дані-масиви на кожну сторінку (керують actor-method секціями)

```
SCAN4P   = { plane:{see,call,assume,next}, people:{…}, place:{…}, panorama:{…} }  // string[] кожне, зі скелета
BEATS    = [ {n:1,title:"What I can see", line:"…"}, … 7 beats ]                   // task 14-22 ↔ текст скелета
VOCAB    = [ "runway incursion", "active runway", … ]                              // "Useful phrases" зі скелета
STORY_L4 = "…", STORY_L5 = "…"                                                     // історії Level 4 / Level 5
CHUNKS   = [ "I can see …", "The runway appears …", … ]                            // 5-7 коротких рядків
LINES    = [ { full:"…", code:"…" }, … ]                                           // first-letter; code заздалегідь
CARDS    = [ { cue:"What can you see?", resp:"…" }, … ]                            // task 78-137 дослівно
QUIZ     = [ { q, options:[…], correct, explanation }, … 4-5 self-check ]
```

First-letter `code` обчислюється під час авторингу (напр. `"The landing aircraft is on final approach…"` → `"T l a i o f a…"`), без runtime-обробки тексту.

### Порядок секцій сторінки (task §9 — однаковий на всіх трьох)

1. Header + back-link `← All quizzes` (`href="index.html"`).
2. Картинка (`<img src="img/scan-…​.jpg">`).
3. Коротке пояснення SCAN Method (інтро-картка + 4-кроковий ряд).
4. **Memory Route Panel** — горизонтальний chip-маршрут: `Picture → Aviation Logic → Beats → Chunks → Active Recall → First-Letter Code → Camera Practice`, з однорядковою філософією («запам'ятовуй логіку, не слова»).
5. **SCAN × 4P** — статичний акордеон: 4 картки зон (Plane/People/Place/Panorama), кожна S-C-A-N списками зі `SCAN4P`; "▶ Listen" озвучує зону.
6. **Vocabulary** — chips зі `VOCAB` + "▶ Speak vocabulary".
7. **Speaking beats** — 7 `BEATS` показані *перед* історією (це actor-method якір).
8. **ICAO Story Levels 4–5** — Levels-акордеон з `STORY_L4`/`STORY_L5` + "▶ Speak story".
9. **Build the Answer / Chunk Builder** — кнопки `Add chunk` / `Say so far` / `Reset` + `▶ Speak current chunk`; розкриває `CHUNKS` по одному.
10. **First-Letter Prompt Trainer** — показати `code`; `Reveal sentence` / `Hide sentence` / `Next line` / `▶ Speak full line` по `LINES`.
11. **Cue–Response Flashcards** — показати cue; `Reveal response` / `Next card` / `▶ Speak response` по `CARDS`.
12. **Recall Mode** — перемикач `Full text · Beats only · First letters only · Image only`, який ставить body-клас і ховає/показує секції 5–11 (та ізолює картинку) через CSS.
13. **Mini Quiz / Self-check** — невеликий клієнтський `QUIZ` (стандартний патерн `questions`, inline).
14. **Camera Practice Checklist** — статичні `<input type="checkbox">`, Before / After recording (task 171–188).
15. **Useful phrases** — той самий `VOCAB` як друкований довідник.
16. **Navigation links** — назад на `index.html`, перехресні лінки на інші два SCAN-тренажери + `scan-method-trainer.html`.

Картки Speak-режиму + AI-коуча (вибір користувача) — після секції 8, перед actor-method дрилами, як у `scan-method-trainer.html`.

### Картки `index.html` (додати в `MODULES`, ~`index.html:901`)

Три об'єкти за зразком наявної SCAN-картки (`cat:"interactive"`):

```
{ cat:"interactive", tag:"SCAN Method", title:"SCAN Trainer — Runway Incursion",
  desc:"Describe a runway-incursion scene with the SCAN×4P loop, then lock it into memory the actor way: speaking beats, a chunk builder, first-letter prompts, cue–response flashcards, recall mode and a camera-practice checklist. Speak mode with ICAO metrics and optional AI coach.",
  href:"scan-runway-incursion-trainer.html", cta:"Start Scanning" }
```
…та аналогічні Crosswind Landing / Ground Vehicle Collision.

## Карта контенту по сценах (звідки кожен масив)

| Секція | Runway Incursion | Crosswind Landing | Ground Vehicle Collision |
|---|---|---|---|
| SCAN4P, історії, vocab, beats | `Runway Incursion.md` | `Crosswind Landing.md` | `Ground Vehicle Collision.md` |
| Cue–Response cards | task 80–96 | task 100–116 | task 120–136 |
| Абзац картинки AI-коуча | один борт на short final, інший wide-body ще на активній смузі, вечірнє світло | wide-body на final, gear/flaps down, нахил для crosswind, серпанок над містом | припаркований лайнер, пошкоджений оранжевий nacelle, тягач дуже близько, мокрий перон |
| Приклад chunk-builder | task 42–46 (готовий) | вивести 5 рядків з L4 | вивести 5 рядків з L4 |

## Перевірка

1. Локальний прев'ю: `python3 -m http.server` з кореня репо → `http://localhost:8000/scan-runway-incursion-trainer.html`.
2. Пройти кожен віджет на кожній сторінці:
   - Chunk Builder: `Add chunk` розкриває рядки по порядку; `Say so far` озвучує накопичене; `Reset` чистить.
   - First-Letter: `Reveal/Hide sentence`, `Next line` циклить, `Speak full line` чутно.
   - Flashcards: cue → `Reveal response` → `Next card` → `Speak response`.
   - Recall Mode: кожен перемикач ховає/показує потрібні секції; "Image only" лишає лише фото.
   - Mini quiz рахує правильно; чекбокси перемикаються.
   - Speak-режим записує + показує метрики (Chrome/Edge); AI-коуч без ключа падає м'яко.
3. Back-link `← All quizzes` і перехресні лінки працюють; картинка вантажиться і < ~400 KB.
4. `http://localhost:8000/index.html` → три нові картки рендеряться й відкриваються.
5. `git push` з кореня репо, потім відкрити кожен live-URL під `https://stszu.github.io/aviation-quiz/` і підтвердити рендер (~20–60 с після пушу).

## Поза обсягом

- Записані ElevenLabs MP3 (actor-method аудіо — runtime `SpeechSynthesis`; premium-voice пас — окремий крок).
- Tap-the-zone SVG overlay (замінено статичними картками SCAN×4P).
- Forced-alignment / тайм-субтитри.
