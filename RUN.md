# Aviation Quiz — інструкція з користування

Як публікувати матеріали на сайті **https://stszu.github.io/aviation-quiz/**.

**Workflow:**

1. Project "ICAO Material Builder" — create a material — create a quiz — create an infographic
2. prompt for quiz — ACTIVE/Creator_quiz - 01_prompt_json_from_text.md
3. Run: codex CLI in ~/Projects/ACTIVE/Creator_quiz 
4. Run: claude CLI in ~/Projects/Drafts/Aviation-quiz

## Що це

Статичний сайт на GitHub Pages для підготовки до ICAO exam. Містить:

- **Квізи** — окремі HTML-сторінки (vocabulary, reading comprehension, passive voice тощо).
- **Infographics** — галерея зображень (`infographics.html`) з прев'ю та переглядом на весь екран.
- **Songs** — пісні (`songs.html`): картки з обкладинками, клік відкриває плеєр + текст.
- **Cockpit Class** — імерсивні уроки в підпапці `aviation_english_cockpit_class/` (власний темний дизайн, Web Speech API). Картка на головній веде на сторінку уроку.
- **Crosswords** — інтерактивні кросворди + тренажери набору тексту. **Усі кросворди лежать у підпапці `Crosswords/`** (напр. `Crosswords/1_crossword.html`). Картка на головній веде на сторінку кросворду.
- **Flight Academy Trainer** — «слухай + читай синхронно»: програвач MP3 + транскрипт, у якому активна відповідь підсвічується в такт аудіо (автоскрол, клік-на-відповідь → перемотка). Підпапка `Flight_academy_trainer/`; кожен **курс — окрема сторінка зі своєю папкою аудіо** й окремою карткою (тег «Listen & Read»). Зараз чотири курси: Pilot Guide LSA (`flight_academy_trainer.html`, 7 розділів, аудіо в `Pilot_Guide_LSA/`), Embraer E190 Belgrade (`belgrade_takeoff_accident_trainer.html`, 14 розділів, аудіо в `Belgrade_Accident/`), Emergency Phrases ICAO Level 4–5 (`useful-aviation-phrases-for-emergencies-icao-level-4-to-5_trainer.html`, 8 розділів, аудіо в `useful-aviation-phrases-for-emergencies-icao-level-4-to-5/`) і Aircraft Emergency Evacuation (`emergency_evacuation_trainer.html`, 1 розділ, аудіо в `Emergency_Evacuation/`).

Головна `index.html` — це меню-дашборд: картки всіх розділів (рендеряться з масиву `MODULES`), пошук + фільтри за категоріями, чекбокси прогресу (зберігаються в браузері), міні-дрил ATC і перемикач день/ніч.

### Cockpit Class (folder-backed секція)

- Уроки лежать у підпапці `aviation_english_cockpit_class/` — це домівка секції (можна додавати ще уроки).
- Сторінка уроку самодостатня (Tailwind CDN + Web Speech API), без локальних картинок/аудіо.
- **Важливо:** сторінка в підпапці, тож її посилання на кореневі сторінки йдуть через `../` (напр. `../index.html`, `../songs.html#it-depends-on-safety`), а картка/посилання з кореня на урок — через `aviation_english_cockpit_class/<файл>.html`.

### Crosswords (folder-backed секція)

- Усі кросворди лежать у підпапці `Crosswords/` — це домівка секції.
- Сторінка кросворду самодостатня (власний день/ніч-дизайн, без локальних ресурсів).
- **Важливо:** сторінка в підпапці, тож back-link `← All quizzes` веде на `../index.html`, а картка в `index.html` (і посилання з `songs.html`/`infographics.html`) — через `Crosswords/<файл>.html`.

Поточні кросворди (8):

- `present-perfect-1.html` — Present Perfect Crossword: Set 1
- `present-perfect-2.html` — Present Perfect Crossword: Set 2
- `1_crossword.html` — Communication Problems (радіотелефонія)
- `rejected-takeoffs.html` — Rejected Takeoffs (V1 / abort decision)
- `stall.html` — Stall Recognition and Recovery
- `embraer-e190-belgrade-takeoff-accident-crossword.html` — Belgrade Takeoff Accident
- `technical-problems-1.html` — Technical Problems Crossword: Part 1
- `technical-problems-2.html` — Technical Problems Crossword: Part 2

### Flight Academy Trainer (folder-backed секція)

- Кожен курс = **окрема standalone-сторінка** + **своя папка аудіо** + своя картка в `index.html` (тег «Listen & Read»). Курси не змішуються в одному файлі.
  - Pilot Guide LSA: `Flight_academy_trainer/flight_academy_trainer.html`, аудіо в `Pilot_Guide_LSA/` (7 розділів).
  - Embraer E190 Belgrade: `Flight_academy_trainer/belgrade_takeoff_accident_trainer.html`, аудіо в `Belgrade_Accident/` (14 розділів).
  - Emergency Phrases ICAO Level 4–5: `Flight_academy_trainer/useful-aviation-phrases-for-emergencies-icao-level-4-to-5_trainer.html`, аудіо в `useful-aviation-phrases-for-emergencies-icao-level-4-to-5/` (8 розділів).
  - Aircraft Emergency Evacuation: `Flight_academy_trainer/emergency_evacuation_trainer.html`, аудіо в `Emergency_Evacuation/` (1 розділ).
- Контент = масив `CHAPTERS` у JS: `{ num, title, mp3, segments: [{ q, a }] }`; `const DIR` вказує на папку аудіо курсу. `q` — заголовок секції, `a` — дослівний озвучений текст.
- **Стандарт: один MP3 на розділ** (`NN-<slug>.mp3`), коли матеріал має ≥3 секції — повноцінна «рейка» розділів і точніша синхронізація.
- Синхронізація зараз **приблизна** (рахується з довжини тексту `a`). Точні таймкоди по реченнях — наступний крок через forced alignment (`aeneas` → `chapters.json`).
- **Audacity-проєкт (`*.aup3*`) не комітимо** — у репо йдуть лише експортовані MP3 (+ опційно `.md`-транскрипт).
- Підпапка, тож back-link `← All quizzes` → `../index.html`, картка в `index.html` → `Flight_academy_trainer/<курс>_trainer.html`.
- **Повна специфікація додавання курсу — `Flight_academy_trainer/README.md`.**

### Кейс Belgrade 30L (де що лежить)

Матеріали про катастрофу Embraer E190 на зльоті в Белграді (18.02.2024) розкидані по
типах розділів — ось повний набір в одному місці:

- Інфографіка — `img/embraer-e190-belgrade-takeoff-accident.png` (запис у `infographics.html`).
- Cockpit Class — `aviation_english_cockpit_class/embraer-e190-belgrade-takeoff-accident.html` (розбір кейсу).
- Cockpit Class — `aviation_english_cockpit_class/belgrade-runway-30l-incident-study-transmissions.html` (RTF-радіообмін).
- Кросворд — `Crosswords/embraer-e190-belgrade-takeoff-accident-crossword.html`.
- Квіз — `icao-rtf-compliance-protocol-quiz.html` (20 питань, ICAO RTF).
- Flight Academy — `Flight_academy_trainer/belgrade_takeoff_accident_trainer.html` (14 розділів, аудіо в `Belgrade_Accident/`).
- Пісні (`songs.html`) — `wrong-intersection`, `tora-is-a-hard-limit`, `speak-up-in-the-cockpit`.

## Дві папки (ролі)

- **`Projects/Drafts/Aviation-quiz/`** — це сам сайт: локальна git-копія репозиторію `StsZu/aviation-quiz`. Звідси публікуємо (`git push` → GitHub Pages). Тут лежать `index.html`, `songs.html`, `infographics.html`, усі квізи, `img/`, `audio/`.
  - `Quiz-1/` усередині — вихідні HTML-чернетки (не входять у репо, в `.gitignore`).
- **`Projects/ACTIVE/Creator_quiz/`** — генератор квізів (промпти, `INPUT/`, `OUTPUT_quiz/`) для цього й інших сайтів. Тут квіз **створюється**, а потім публікується через папку сайту.

Робочий процес: створити квіз у `Creator_quiz` → отриманий HTML додати на сайт із `Drafts/Aviation-quiz`.

## Ключові факти

- GitHub-репозиторій: `StsZu/aviation-quiz`, гілка `main`. Локальний клон: `Projects/Drafts/Aviation-quiz/`.
- Жива адреса (відкривати тут): **https://stszu.github.io/aviation-quiz/**
  - `https://github.com/StsZu/aviation-quiz` — це код, а не сайт.
- Деплой автоматичний: після `git push` GitHub Pages оновлює сайт за ~20–60 секунд.
- Усі git-команди (`add`/`commit`/`push`) виконуються з `Projects/Drafts/Aviation-quiz/`.
- Локальний перегляд без деплою: `python3 -m http.server` із папки сайту, відкрити `http://localhost:8000`.

## Як додати матеріал (найпростіше)

Просто напиши Claude Code повідомлення з **шляхом до файлу** і словом «додай». Наприклад:

> додай `/шлях/до/quiz_new.html`

> додай пісні з `/шлях/до/папки/Songs`

> додай інфографіку з `/шлях/до/папки/infografic`

Claude зробить решту автоматично (копіювання, картки, посилання, деплой, перевірку).

## Що відбувається під капотом (для довідки)

### Новий квіз (HTML)
1. Файл копіюється в репозиторій.
2. На головну `index.html` додається **один запис у масив `MODULES`** (картки рендеряться з нього скриптом):
   ```js
   { cat: "grammar", tag: "Grammar", title: "Назва", desc: "Короткий опис.", href: "файл.html", cta: "Start Quiz" }
   ```
   - `cat` — категорія для фільтра і кольору тегу (`vocab` / `ops` / `comm` / `grammar` / `interactive`).
   - `tag` — видимий підпис; `cta` — текст кнопки.
   - Нумерація `Module NN`, чекбокс прогресу і лічильник (`totalModules`) рахуються автоматично — більше нічого правити не треба.
3. На сторінку квізу додається посилання **← All quizzes** (повернення на головну).
4. `commit` + `push` → перевірка, що URL відкривається.

### Нова інфографіка (PNG)
1. Повний PNG → папка `img/`.
2. Стиснуте прев'ю (JPEG, ~200 КБ) → `img/thumb/` (через `sips`).
3. Запис додається в масив `images` у `infographics.html`.
4. `commit` + `push` + перевірка.

### Нова пісня (MP3 з Suno)
- **Сторінку Suno не можна вставити iframe** (заблоковано), тому пісні хостяться на сайті.
- MP3-експорт із Suno самодостатній: всередині вже є **текст пісні** (тег `lyrics-eng`) і **обкладинка**.
1. MP3 → папка `audio/`.
2. Обкладинка витягується з MP3 → `img/`.
3. Текст витягується з MP3 → додається в масив `songs` у `songs.html`.
4. `commit` + `push` + перевірка.

### Преміум-голоси (озвучення фраз TTS)
- Преміум-кліпи вимови генеруються через **ElevenLabs** (один `voice_id` на весь курс), розкладаються у `audio/<course-slug>/` і програються наперед-відомими mp3 за стабільним id. Покрокова інструкція — `SOUND/premium-voice-clips-howto.md`; альтернатива для динамічного тексту (браузерний TTS) — `SOUND/voice-selector-howto.md`.

### Picture Description Trainer — Step 1
- `picture-description-trainer.html` (корінь) — 8-етапний усний тренажер опису картинок (look → keywords → listen → simple/stronger/exam → describe from memory) + keyboard-driven Active Recall drill, random-practice з 60-сек таймером, прогрес у localStorage, пісні. Контент авторено з MD-скриптів у `ICAO Picture Commenting Trainer — Step 1/` (там же `README.md` зі spec-ом). Асети — у `img/picture-description/` та `audio/picture-description/`; drill-кліпи (ElevenLabs, голос Daniel en-GB) — у `audio/picture-description-drills/`.
- `picture-description-trainer-step-2.html` (корінь) — наступний крок методу: **Step 2 — Detailed Description**. 8-етапний тренажер запам'ятовування текстів детальних описів над 10 новими сценами (look → read → listen & shadow → Level 5 upgrade → repeat → reconstruct from memory → mini speaking task → self-check) + keyboard-driven Deduction Drill (40 фраз + 10 examiner Q&A), random-practice з 90-сек таймером, Level 5 speaking-шаблони, окремий ключ прогресу `pdtrainer2.progress`. Контент авторено з MD у `ICAO Picture-2 Commenting Trainer — Step 1/` (там же `README.md` зі spec-ом). Асети — у `img/picture-description-2/` та `audio/picture-description-2/`; drill-кліпи — у `audio/picture-description-2-drills/`.

### Журнал змін «What's New» (changelog)

Сайт веде **журнал доданих матеріалів** — `changelog.html` (картка «Changelog — What's New» на головній). Це авторський журнал «коли і що зроблено», англійською, найновіше згори. Прогрес користувача він **не** відстежує.

- **Єдине джерело правди — `changelog-data.js`** (масив `window.CHANGELOG`). Його читають дві сторінки: `changelog.html` (рендерить журнал) і `index.html` (бейдж **New** на картках).
- Кожен запис: `{ date: "РРРР-ММ-ДД", type, title, href }`. `type` — один із: Quiz, Gap-fill, Crossword, Infographic, Song, Listen & Read, Cockpit Class, Describe Picture.
- **Правило: кожен новий матеріал = ОДИН запис на ВЕРХ масиву** `window.CHANGELOG`. `date` — день публікації; `href` має збігатися з `href` картки в `MODULES` (тоді картка отримає бейдж **New**).
- Бейдж **New** (і в журналі, і на картках) ставиться автоматично на записи з **найсвіжішою датою** в даних — отже підсвічений лише останній доданий блок, без прив'язки до системного годинника.

## Структура файлів у репозиторії

```
index.html              # головна (меню-картки)
changelog.html          # журнал «What's New» (рендериться з changelog-data.js)
changelog-data.js       # дані журналу — джерело правди для журналу + бейджів New
infographics.html       # галерея інфографіки
songs.html              # пісні (картки + плеєр/текст)
<quiz>.html             # окремі квізи
img/                    # повні зображення + обкладинки пісень
img/thumb/              # прев'ю інфографіки (JPEG)
audio/                  # MP3 пісень
RUN.md                  # ця інструкція
```

## Якщо щось треба змінити вручну

- Текст/назву/порядок картки на головній — масив `MODULES` у `index.html` (порядок у масиві = порядок на сторінці).
- Назву або опис пісні — масив `songs` у `songs.html`.
- Назву інфографіки — масив `images` у `infographics.html`.
- Тема й оформлення єдині для всіх сторінок: беж (`#e7dfd2` фон, `#f8f3e9` картки, шрифт Georgia).

## Перевірка після деплою

Відкрити https://stszu.github.io/aviation-quiz/ і переконатися, що:
- нова картка з'явилась на головній;
- сторінка відкривається;
- кнопка **← All quizzes** повертає на головну.
