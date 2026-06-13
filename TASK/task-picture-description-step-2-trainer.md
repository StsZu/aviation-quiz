# ТЗ: Picture Description Trainer — Step 2 (Detailed Description)

## 0. Контекст (прочитай першим)

Це продовження сайту ICAO aviation-English (`/Users/zubarstanislav/Projects/Drafts/Aviation-quiz/`, деплой GitHub Pages, live: https://stszu.github.io/aviation-quiz/).

Уже існує **Step 1** тренажер: `picture-description-trainer.html` (корінь). Він навчає **topic statement** — короткий вступний огляд сцени (keywords → simple → stronger → exam). **Цей ТЗ — наступний крок методу: Step 2 — Detailed Description** (повний детальний опис того, що відбувається на фото, з cause-effect та Level 5 deduction).

**ПЕРЕД РОБОТОЮ обов'язково прочитай:**
- `picture-description-trainer.html` — це твій **головний шаблон-орієнтир** (тема, структура секцій, overlay-флоу, прогрес у localStorage, аудіо-рушій, drill, клавіатура). Клонуй патерни звідти, не винаходь заново.
- `CLAUDE.md` (корінь репо) — архітектура сторінок, тема, контракти data-масивів.
- `RUN.md` — авторський робочий процес (укр.), секції «Преміум-голоси» і «Picture Description Trainer — Step 1».
- `SOUND/premium-voice-clips-howto.md` і `SOUND/voice-selector-howto.md` — як озвучувати (ElevenLabs + браузерний TTS fallback).
- `ICAO Picture Commenting Trainer — Step 1/README.md` — приклад source-README.

## 1. Джерело

Папка: **`ICAO Picture-2 Commenting Trainer — Step 1/`** (так, у назві «Step 1» — це історична назва батчу; за змістом це Step-2 матеріал).

Містить **10 фото** + на кожне `.md`-файл (`NN-<slug>-photo.md`) + зведений `ICAO-picture-descriptions.md`. **Аудіо/SRT немає** — його треба згенерувати.

10 сцен (`NN-<slug>` → site `slug` = прибрати `NN-` і `-photo`):
`01-no-landing-gear`, `02-vehicle-on-runway`, `03-vehicle-hit-aircraft`, `04-foam-covered`, `05-lightning-strike`, `06-bird-strike`, `07-blaze-of-fire`, `08-bus-collision-wing`, `09-service-door-ripped`, `10-tail-strike`.

Кожен `.md` має 4 секції (формат стабільний по всіх 10):
- **Card text** — keywords дослівно з картки.
- **ICAO description** — повний детальний опис (Level 4): present continuous/perfect, авіа-лексика, cause-effect.
- **ICAO Level 5 upgrade** — той самий сюжет із possibility/deduction (*it must have been…*, *could have been caused by…*, *may indicate…*) + safety phrases (*from a safety perspective…*, *the main risk is…*).
- **Repeat-After-Me ICAO Drill** — 4 короткі модельні фрази для повторення вголос.
- **Mini Speaking Task** — Question + Exam-safe answer.

**Контент бери verbatim з `.md`.** Можна нормалізувати пробіли/переноси, але не переписувати й не вигадувати. Source-файли (png/md) НЕ видаляй і НЕ перейменовуй.

## 2. Що будуємо

**Мета:** тренажер для **вивчення й запам'ятовування текстів детальних описів** (на відміну від Step 1, де будували topic statement із keywords). Студент: читає → слухає → повторює → відтворює опис із пам'яті → перевіряє себе. Плюс активна робота з Level 5 deduction-мовою та examiner Q&A.

**Один standalone HTML** у корені: `picture-description-trainer-step-2.html`. Inline `<style>`+`<script>`, тема сайту (Georgia, фон `#e7dfd2`, картки `#f8f3e9`, бордер `#d4c7b3`; day/night toggle як у Step 1), back-link `← All quizzes` → `index.html`. Без React/CDN/бандлерів/бекенду — працює відкриттям файлу. UI-інструкції укр., усі speaking-відповіді англ. (ICAO L4–5).

### Структура сторінки

1. **Хедер** — назва «ICAO Picture Description Trainer — Step 2: Detailed Description», коротке пояснення кроку (що таке детальний опис, present continuous/perfect, cause-effect, Level 5 deduction).
2. **Прогрес** (localStorage, окремий ключ від Step 1, напр. `pdtrainer2.progress`): practiced/attempts/last date, «N of 10».
3. **Сітка 10 карток** → клік відкриває **study overlay** з покроковим флоу (нижче).
4. **Active Recall — Deduction Drill** — keyboard-driven (як Step 1: `Space` show, `Enter`/`→` next, `R` replay), картки з усіх «Repeat-After-Me» фраз (40 шт.) та/або Mini Speaking Tasks (task=Question → target=Exam-safe answer). Без повтору двічі поспіль.
5. **Random Picture Practice** — випадкова сцена, лише фото + keywords, таймер (напр. 90 с для довшого опису), reveal детального опису.
6. **Daily Training Mode** — коротка рутина під тексти (read → listen → shadow → reconstruct from memory).
7. **Speaking templates** — кілька reusable Level 5 каркасів (deduction + safety), зібраних із повторюваних фраз джерела.

### Study-overlay (per-picture флоу запам'ятовування тексту)

Орієнтуйся на 8-stage флоу Step 1, але адаптований під **тексти**:
- **Look** — фото, не говорити, оцінити ситуацію.
- **Read description** — показати повний ICAO description + аудіо-плеєр.
- **Listen & shadow** — слухати й повторювати в такт.
- **Level 5 upgrade** — показати deduction-версію + аудіо; підсвітити ключові звороти (*it must have been*, *from a safety perspective*).
- **Repeat-After-Me** — 4 фрази, кнопка Play на кожну.
- **Reconstruct from memory** — показати лише keywords (Card text), сховати опис; студент відтворює.
- **Mini Speaking Task** — показати Question; кнопки Show answer / Hide; відтворити Exam-safe answer (аудіо).
- **Self-check** — Show/Hide answer, **Mark as practiced** (оновлює прогрес).

Додай корисні для запам'ятовування механіки (обери 1–2, не перевантажуй): «hide-and-recall» (схований опис, поступове розкриття по реченню), або «sentence scramble» (переставити речення опису у правильний порядок). Не обов'язково, але вітається — головне, щоб реально тренувало відтворення тексту, а не пасивне читання.

## 3. Дані (inline JS)

`LESSONS2` — 10 об'єктів, наповнених із `.md`:
```js
{ slug, num, title, topic,            // topic = коротка одно-рядкова сцена
  cardText,                            // keywords з "Card text"
  description,                         // ICAO description (verbatim)
  level5,                              // ICAO Level 5 upgrade (verbatim)
  repeat: ["...", "...", "...", "..."],// 4 Repeat-After-Me фрази
  task: { question, answer },          // Mini Speaking Task
  img:   "img/picture-description-2/<slug>.jpg",
  audio: { description: "...id", level5: "...id", repeat: ["...ids"], answer: "...id" } }
```
`DRILLS2` — картки активного пригадування з `repeat`-фраз (+ опційно Mini Speaking Tasks). Формат як Step 1: `{ task, target, audio_id }`.

## 4. Асети

- **Зображення:** сконвертуй 10 photo-PNG у `img/picture-description-2/<slug>.jpg` (через `sips`, як у проєкті). Source PNG не чіпай.
- **Аудіо (ElevenLabs):** згенеруй преміум-кліпи **тим самим голосом, що Step 1 — Daniel — Steady Broadcaster (en-GB), `onwK4e9ZLuTAKqWW03F9`**, model `eleven_multilingual_v2`, у:
  - `audio/picture-description-2/<slug>-description.mp3`, `<slug>-level5.mp3`, `<slug>-answer.mp3`, `<slug>-repeat-N.mp3`;
  - drill-кліпи → `audio/picture-description-2-drills/<audio_id>.mp3`.
  - Скрипт-болванка й правила — у `SOUND/premium-voice-clips-howto.md`. Ключ `ELEVENLABS_API_KEY` бери з env, **НЕ комітити**. Сторінка має працювати й без кліпів (browser-TTS fallback, як у Step 1) — генерація може бути окремим кроком.

## 5. Інтеграція в сайт

- `index.html` → +1 об'єкт у `MODULES`: `{ cat:"interactive", tag:"Describe Picture", title:"Picture Description Trainer — Step 2: Detailed Description", desc:"...", href:"picture-description-trainer-step-2.html", cta:"Start Training" }`.
- `changelog-data.js` → +1 запис на верх: `{ date:"<день публікації>", type:"Describe Picture", title:"...", href:"picture-description-trainer-step-2.html" }`.
- README у source-папці `ICAO Picture-2 Commenting Trainer — Step 1/README.md` (як зібрано сторінку, slug-конвенція, як додати сцену/аудіо) + рядок-вказівник у `RUN.md` (поряд із секцією Step 1).

## 6. Definition of Done / перевірка

1. `python3 -m http.server` з кореня → `picture-description-trainer-step-2.html` відкривається.
2. 10 карток рендеряться; усі 10 зображень і всі згенеровані mp3 вантажаться (DevTools Network без 404).
3. Study-overlay проходиться повністю; **Mark as practiced** оновлює прогрес; після reload прогрес зберігся (localStorage).
4. Deduction drill: `Space`/`Enter`/`→`/`R` працюють без миші; немає повтору картки двічі поспіль; на Show грає кліп (або TTS-fallback); лічильник «Card X of N» коректний.
5. Random practice: таймер тікає, reveal показує опис.
6. Респонсив (ноут/планшет/моб); без зовнішніх залежностей/CDN; жодних console errors (перевір Playwright-смоуком, як це робилось для Step 1).
7. Головна: картка + бейдж New; лінк відкриває сторінку. Після всього — `git commit` + `git push` (з дозволу автора) і перевірка live-URL (~20–60 с деплой).

## 7. Чого НЕ робити

- Не переписувати/вигадувати авіа-контент — тільки з `.md` джерела.
- Не чіпати source png/md, не видаляти/перейменовувати папки.
- Не комітити ключі, Audacity-проєкти, тимчасові файли (`output/`, `tmp/`).
- Не ламати Step 1 сторінку — Step 2 окремий файл і окремі асет-папки (`*-2`).
