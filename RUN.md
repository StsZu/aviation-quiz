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

Головна `index.html` — це меню-дашборд: картки всіх розділів (рендеряться з масиву `MODULES`), пошук + фільтри за категоріями, чекбокси прогресу (зберігаються в браузері), міні-дрил ATC і перемикач день/ніч.

### Cockpit Class (folder-backed секція)

- Уроки лежать у підпапці `aviation_english_cockpit_class/` — це домівка секції (можна додавати ще уроки).
- Сторінка уроку самодостатня (Tailwind CDN + Web Speech API), без локальних картинок/аудіо.
- **Важливо:** сторінка в підпапці, тож її посилання на кореневі сторінки йдуть через `../` (напр. `../index.html`, `../songs.html#it-depends-on-safety`), а картка/посилання з кореня на урок — через `aviation_english_cockpit_class/<файл>.html`.

### Crosswords (folder-backed секція)

- Усі кросворди лежать у підпапці `Crosswords/` — це домівка секції.
- Сторінка кросворду самодостатня (власний день/ніч-дизайн, без локальних ресурсів).
- **Важливо:** сторінка в підпапці, тож back-link `← All quizzes` веде на `../index.html`, а картка в `index.html` (і посилання з `songs.html`/`infographics.html`) — через `Crosswords/<файл>.html`.

Поточні кросворди (5):

- `present-perfect-1.html` — Present Perfect Crossword: Set 1
- `present-perfect-2.html` — Present Perfect Crossword: Set 2
- `1_crossword.html` — Communication Problems (радіотелефонія)
- `rejected-takeoffs.html` — Rejected Takeoffs (V1 / abort decision)
- `stall.html` — Stall Recognition and Recovery

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

## Структура файлів у репозиторії

```
index.html              # головна (меню-картки)
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
