# Завдання — замінити озвучення на ElevenLabs (три SCAN-тренажери)

## Мета

Зараз три SCAN-тренажери озвучують усі кнопки через браузерний `SpeechSynthesis` (функція `speak(text)`). Якість і голос непередбачувані (залежать від ОС/браузера). Треба **замінити озвучення на заздалегідь згенеровані MP3 від ElevenLabs** (голос «Daniel»), як уже зроблено для `scan-method-trainer.html` (папка `scan-method-audio/`). Браузерний `SpeechSynthesis` лишається лише як **fallback**, коли кліпу немає або відтворення заблоковане.

Сторінки:

- `scan-runway-incursion-trainer.html`
- `scan-crosswind-landing-trainer.html`
- `scan-ground-collision-trainer.html`

## Голос і налаштування (стандарт проєкту — не змінювати)

ElevenLabs **«Daniel — Steady Broadcaster» (UK)**:

- `voice_id`: `onwK4e9ZLuTAKqWW03F9`
- `model_id`: `eleven_multilingual_v2`
- `voice_settings`: `{ stability: 0.6, similarity_boost: 0.8, style: 0.0 }`
- ритм: уповільнити до `atempo=0.93` через ffmpeg (зберігає висоту тону)
- потрібні: `ELEVENLABS_API_KEY` в env, `ffmpeg` у PATH
- **ключ ніколи не комітити**

Еталонний пайплайн для клонування: **`scan-method-audio/build-audio.mjs`** + `scan-method-audio/manifest.json` (ідемпотентний, `--force` для перегенерації).

## Папки аудіо (по одній на сторінку)

- `scan-runway-incursion-audio/`
- `scan-crosswind-landing-audio/`
- `scan-ground-collision-audio/`

Кожен MP3 називається `<id>.mp3`, де `<id>` — стабільний ідентифікатор, який сторінка передає у `playClip(id, fallbackText)`.

## Схема ID та текст для озвучення (однакова на всіх трьох сторінках)

Будуються з тих самих JS-масивів даних, що вже є на сторінці (`SCAN4P`, `VOCAB`, `BEATS`, `STORY`, `CHUNKS`, `LINES`, `CARDS`, `RESCUE`). 27 кліпів на сторінку:

| ID | Кількість | Текст для TTS (точно як зараз говорить `speak()`) |
|---|---|---|
| `zone-plane`, `zone-people`, `zone-place`, `zone-panorama` | 4 | `Name + ". " + [see, call, assume, next].map(arr => arr.join(", ")).join(". ") + "."` |
| `vocab` | 1 | `VOCAB.join(", ")` |
| `beats` | 1 | `BEATS.map(b => b.title + ". " + b.line).join(" ")` |
| `story-l4`, `story-l5` | 2 | `STORY.l4.join(" ")` / `STORY.l5.join(" ")` |
| `chunk-0` … `chunk-4` | 5 | `CHUNKS[i]` |
| `line-0` … `line-4` | 5 | `LINES[i].full` (озвучуємо повне речення, не код) |
| `card-0` … `card-4` | 5 | `CARDS[i].resp` |
| `rescue-0` … `rescue-3` | 4 | `RESCUE[i]` |

**Важливо:** текст кліпа має точно збігатися з рядком, який зараз передається у `speak()`, щоб аудіо та fallback були ідентичні. Кнопка **«Say so far»** у Chunk Builder динамічна (накопичує довільну кількість чанків) — для неї **окремий кліп не робимо**, лишаємо `SpeechSynthesis` (або відтворення `chunk-0…chunk-(n-1)` послідовно — на вибір виконавця, MVP = fallback).

## Зміни на сторінках (рефактор `speak` → `playClip`)

1. Додати константу теки та хелпер `playClip`, скопійований зі `scan-method-trainer.html` (рядки ~681–693):
   ```js
   const AUDIO_DIR = "scan-runway-incursion-audio/"; // своя тека на кожній сторінці
   let currentAudio = null;
   function playClip(id, text) {
     if (currentAudio) { currentAudio.pause(); currentAudio = null; }
     if ("speechSynthesis" in window) window.speechSynthesis.cancel();
     let fellBack = false;
     const fallback = () => { if (fellBack) return; fellBack = true; speak(text); };
     try {
       const a = new Audio(AUDIO_DIR + id + ".mp3");
       a.addEventListener("error", fallback);
       currentAudio = a;
       const p = a.play();
       if (p && p.catch) p.catch(fallback);
     } catch (e) { fallback(); }
   }
   ```
   `speak(text)` (Web Speech, `lang="en-GB"`, `rate=0.92`) **лишається** як fallback.

2. Замінити кожен виклик `speak(X)` на `playClip("<id>", X)` за схемою вище:
   - SCAN×4P: `playClip("zone-" + zid, speakText)`
   - vocab: `playClip("vocab", VOCAB.join(", "))`
   - beats: `playClip("beats", …)`
   - story: `playClip("story-l4" | "story-l5", …)`
   - chunk «Speak current chunk»: `playClip("chunk-" + (shown - 1), CHUNKS[shown-1])`
   - chunk «Say so far»: **лишити** `speak(...)` (динамічний)
   - first-letter «Speak full line»: `playClip("line-" + i, LINES[i].full)`
   - flashcard «Speak response»: `playClip("card-" + i, CARDS[i].resp)`
   - SOS: `playClip("rescue-" + ri, ph)`

3. Більше нічого в UI не міняти — кнопки, тексти, поведінка ті самі.

## Build-скрипт (клонувати `scan-method-audio/build-audio.mjs`)

Один скрипт на кожну сцену (або один параметризований). Для кожної сторінки:

1. Витягнути JS-масиви даних із відповідного `*-trainer.html` (розпарсити блок між `// ================= DATA =================` і `// ================= AUDIO =================`; масиви — валідний JS, можна `eval`/`Function` у пісочниці або JSON-парсингом).
2. Зібрати пари `(id, text)` за таблицею вище.
3. Для кожної пари: POST у ElevenLabs TTS з голосом/налаштуваннями вище → отримати MP3 → прогнати через `ffmpeg -filter:a "atempo=0.93"` → записати `<audio-dir>/<id>.mp3`.
4. Ідемпотентність: пропускати наявні кліпи, якщо текст не змінився; `--force` — перегенерувати все.
5. Записати `<audio-dir>/manifest.json` (`id → { text, hash, generatedAt }`), як у еталоні.

Запуск (приклад): `ELEVENLABS_API_KEY=… node scan-runway-incursion-audio/build-audio.mjs`.

## Git

- **Комітити:** MP3-кліпи у трьох теках, `build-audio.mjs`, `manifest.json`, оновлені три HTML.
- **Не комітити:** `ELEVENLABS_API_KEY`, тимчасові файли ffmpeg, проєкти Audacity (`*.aup3*`).
- Публікація — як завжди: `git push` із кореня репо (auto-deploy ~20–60 с).

## Перевірка

1. Згенерувати кліпи для однієї сцени, локально `python3 -m http.server` із кореня.
2. На сторінці натиснути кожну кнопку з ▶ — має грати голос Daniel (а не системний TTS):
   - 4 зони SCAN×4P, vocabulary, beats, обидві story, 5×«Speak full line», 5×«Speak response», 5×«Speak current chunk», 4 SOS.
3. Тимчасово перейменувати один MP3 → переконатися, що кнопка коректно падає у `SpeechSynthesis` (fallback працює).
4. Повторити для двох інших сторінок.
5. Перевірити, що кількість кліпів = 27 на сцену, `manifest.json` повний, повторний запуск без `--force` нічого не перегенеровує.
6. `git push`, відкрити три live-URL під `https://stszu.github.io/aviation-quiz/` і перевірити звук.

## Поза обсягом

- Окремий кліп для «Say so far» (динамічний — лишається fallback).
- Точна посегментна синхронізація / субтитри (forced alignment) — окремий крок.
- Зміна голосу чи налаштувань — заборонено (стандарт проєкту).
