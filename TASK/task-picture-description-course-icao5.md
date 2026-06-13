# ТЗ: Picture Description Course — From Zero to ICAO Level 5

## 0. Контекст (прочитай першим)

Це сайт ICAO aviation-English (`/Users/zubarstanislav/Projects/Drafts/Aviation-quiz/`, деплой GitHub Pages, live: https://stszu.github.io/aviation-quiz/).

**ПЕРЕД РОБОТОЮ обов'язково прочитай:**
- `CLAUDE.md` (корінь) — архітектура сторінок, тема, контракти data-масивів.
- `picture-description-trainer.html` — головний шаблон-орієнтир по темі/стилю (Georgia, фон `#e7dfd2`, картки `#f8f3e9`, бордер `#d4c7b3`, day/night якщо є).
- `runway-excursion-model-answer.html` — там уже використано схожий model answer + quiz. **Не дублюй його — це інший формат**: той файл = «прочитай відповідь + квіз», а цей курс = «методика з нуля → розбір → квіз → практика».
- `index.html` — масив `MODULES` для нової картки.

Уже існують суміжні сторінки (став крос-лінки, не копіюй контент): `picture-description-trainer.html` (Step 1 — topic statement), `picture-description-trainer-step-2.html` (Step 2 — detailed description), `runway-excursion-picture-description.html`, `runway-excursion-model-answer.html`.

## 1. Джерела (контент verbatim, не переписувати й не вигадувати)

Папка **`TASK/picture-description-course-sources/`**:

- `method-5-steps.md` — методика опису фото з 5 кроків (Topic Statement → Aircraft → Hypothesise → Background → Weather). Для кожного кроку: пояснення, USEFUL LANGUAGE, EXAMPLE.
- `model-answer.md` — повний model answer рівня ICAO 5 саме для фото цього курсу (737 у воді): 5 кроків + причини, дії екіпажу, зразковий radio call, дії УПР, висновок.
- `quiz.json.md` — готовий JSON-масив 10 питань `{ title, question, options[3], correct, feedback }`.

Фото: **`img/runway-excursion-water.jpg`** (вже в репо — Boeing 737 після runway excursion у воді, Jacksonville). Нових зображень не додавати.

Дозволено: нормалізувати пробіли/переноси, розбити model answer на секції. Заборонено: переписувати формулювання, вигадувати нові приклади чи факти про подію.

## 2. Що будуємо

**Один standalone HTML у корені: `picture-description-course.html`.** Inline `<style>` + `<script>`, без React/CDN/бандлерів/бекенду — працює відкриттям файлу. Тема сайту. Back-link `← All quizzes` → `index.html`.

**Уся сторінка повністю англійською** (включно з навігацією, кнопками, інструкціями) — без українських підказок.

**Мета:** провести студента від нуля до опису авіаційного фото на рівні ICAO 5 на одному наскрізному кейсі: теорія 5 кроків → worked example на реальному фото → квіз на розуміння → самостійна практика з таймером. Архітектура має масштабуватися: нові кейси пізніше = нові сторінки за цим же шаблоном.

## 3. Структура сторінки (4 модулі + прогрес)

Весь контент — у JS data-масивах (`STEPS`, `MODEL_SECTIONS`, `QUESTIONS`, `CHECKLIST`), markup генерується в JS. Модулі йдуть послідовно; зверху — степер/прогрес-бар «Module 1 of 4» з якорями.

### Hero
Назва курсу «Picture Description: From Zero to ICAO Level 5», 2–3 речення: що таке picture description в ICAO-іспиті, що дає курс (method → model → check → practice). Коротка плашка-роадмап 4 модулів.

### Module 1 — The 5-Step Method (теорія)
5 карток-акордеонів з `method-5-steps.md`, по одній на крок:
- заголовок (STEP N + назва), пояснення кроку;
- **Useful language** — фрази/лексика як клікабельні chips або списки по категоріях (TYPE/FEATURES/DAMAGE, vehicles/people/terrain, weather-групи — зберегти групування джерела);
- **Example** — приклад-абзац у відмінному блоці (цитата).
Внизу модуля: «You now know the method. Let's see it applied to a real accident photo →».

### Module 2 — Worked Example (розбір фото)
- Фото `img/runway-excursion-water.jpg` зверху, sticky або легко доступне при скролі.
- Model answer з `model-answer.md`, розбитий на секції з бейджами, який це крок методу: Step 1 (1-й абзац), Step 2 (fuselage/slides/exits), Step 3 (hypothesise: причини, slide deflated, timing), Step 4 (background: rescue vehicles, floodlight, boom barrier), плюс секції поза 5 кроками з власними бейджами — `Causes`, `Crew actions`, `Radio call`, `ATC actions`, `Conclusion`. Розбивку по абзацах зроби розумно, текст verbatim.
- **Level-5 highlighter**: toggle «Show Level 5 language», який підсвічує в тексті маркери рівня 5 — deduction modals (*must have, could have, may indicate*), hedging (*appears to, seems to, possibly*), safety perspective phrases (*from a safety/environmental perspective*). Список маркерів — окремий масив у JS; підсвітка через обгортання `<mark>`.

### Module 3 — Comprehension Quiz
10 питань з `quiz.json.md`, стандартний рушій сайту: по одному питанню, вибір → миттєвий feedback (текст із `feedback`), рахунок, фінальний екран з результатом і кнопкою Restart. `correct` — індекс.

### Module 4 — Your Turn (практика)
- Те саме фото, model answer прихований.
- Кнопка **Start practice** → таймер (вибір 60/90/120 с) + чекліст 5 кроків як підказка-скелет (тільки назви кроків + 2–3 стартові фрази з Useful language кожного кроку).
- Після таймера (або «Finish early») — **self-assessment чекліст**: «Did you… make a topic statement? / describe the aircraft type & damage? / hypothesise with modal verbs? / describe the background? / mention the weather? / use Level-5 deduction language? / add a safety perspective?» — чекбокси, підсумок «You covered N of 7».
- Кнопка «Compare with the model answer» → розгортає model answer (можна reuse секції Module 2).

### Прогрес
`localStorage`, окремий ключ (напр. `pdcourse1.progress`): пройдені модулі, best quiz score, кількість практик. Бейджики «✓ completed» на степері. Без зайвої складності.

### Футер
Крос-лінки: «Drill Step 1 separately» → `picture-description-trainer.html`, «Drill Step 2» → `picture-description-trainer-step-2.html`, «More on this accident» → `runway-excursion-model-answer.html`.

## 4. Інтеграція

- `index.html`: додати об'єкт у `MODULES` (не правити DOM руками): tag типу `Course`, title «Picture Description: Zero → ICAO 5», desc 1 речення, `href: "picture-description-course.html"`.
- Сторінка в корені → back-link без `../`.

## 5. Acceptance criteria

1. Файл відкривається локально без сервера, без помилок у консолі; мобільна верстка не розвалюється (фото масштабується, квіз юзабельний).
2. Весь текст методики, model answer і квіза — verbatim з джерел; UI повністю англійською.
3. Працюють: акордеони, Level-5 highlighter, квіз зі скорингом, таймер + self-assessment, localStorage-прогрес переживає reload.
4. Back-link на `index.html`; картка курсу видна в меню; крос-лінки футера ведуть на існуючі сторінки.
5. `git add` → `commit` → `push`, потім перевірити live: https://stszu.github.io/aviation-quiz/picture-description-course.html і нову картку на головній.
