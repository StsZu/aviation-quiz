# TASK: зробити gap-fill сторінку з тексту (за зразком medical-incident)

Як із будь-якої сторінки з суцільним текстом (напр.
`runway-excursion-picture-description.html` — її транскрипт) зробити
**інтерактивну gap-fill сторінку активного навчання** на кшталт
`quiz_medical_incident_gapfill.html`
(https://stszu.github.io/aviation-quiz/quiz_medical_incident_gapfill.html):
банк слів зверху → текст із пронумерованими пропусками → миттєва перевірка,
показ відповідей, скидання, рахунок.

**Еталон-шаблон для клонування:** `quiz_medical_incident_gapfill.html`
(беж-тема, inline CSS+JS, vanilla, без збірки). Не переписувати з нуля — копіювати
його CSS і весь скрипт, міняти лише дані.

---

## Крок 1. Взяти вихідний текст
- Скопіюй абзаци основного тексту з джерельної сторінки (на runway-сторінці —
  блок `.transcript`, абзаци `<p>` з рядка ~332).
- Це буде тіло `reportHTML`.

## Крок 2. Отримати слова
- Прогони текст через `prompt-extract-gapfill-words.md`.
- Отримаєш `[{answer, clue}]` (10–20). Збережи як `<page>-words.json`.

## Крок 3. Зібрати дані (data contract з еталону)
Сторінка-еталон використовує рівно три структури в `<script>`:

```js
// 1) правильні відповіді в порядку появи в тексті
const answers = ["runway excursion", "emergency evacuation slides", /* ... */];

// 2) той самий список, перемішаний — це банк-чипи зверху
const bankWords = [/* shuffle(answers) */];

// 3) текст із маркерами __1__ … __N__ замість кожного answer (по порядку)
const reportHTML =
  '<span class="report-title">Runway Excursion — Model Description</span>' +
  '<p>Alright, so in this photo I see a narrow body aircraft … the result of a __1__ since I can see part of the runway…</p>' +
  '<p>… at least two __2__ that were deployed …</p>';
```

Правила формування:
- кожен `answer` із JSON замінюється в тексті на `__N__` **у порядку появи**;
  нумерація з 1, без пропусків у нумерації.
- якщо вираз трапляється кілька разів — блансимо лише **перше** входження (решту
  лишаємо як підказку-контекст), або робимо окремий номер, якщо хочемо.
- `answers[i]` ↔ маркер `__(i+1)__`.
- `bankWords` = перемішаний `answers` (можна просто захардкодити вже перемішаним).

## Крок 4. Зібрати HTML (клон еталону)
Скопіюй `quiz_medical_incident_gapfill.html` і заміни:
- `<title>`, `.backlink`, `<h1>`, `.subtitle`, `.instruction` — під нову тему.
- `<audio>` блок — лишити, якщо для сторінки є аудіо; інакше прибрати разом із
  `.audio-note`.
- `answers`, `bankWords`, `reportHTML` — на свої (Крок 3).
- **Логіку НЕ чіпати**: `buildReport / buildBank / dropWord / refreshBank /
  checkAnswers / showAnswers / resetAll` працюють як є.

### Активне навчання (вже закладено в еталоні — зберегти)
- банк слів **зверху** над текстом (`.bank` із клікабельними `.chip`);
- клік по слову вставляє його у сфокусований пропуск; використане слово гасне
  (`.chip.used`);
- набір руками теж дозволений;
- **Check answers** — миттєво підсвічує `.blank.correct` (зелене) / `.blank.wrong`
  (червоне) і показує рахунок; **Show answers**; **Reset**.

### Багатослівні пропуски (відмінність від medical)
medical мав однослівні відповіді (`.blank{width:130px}`). Тут вирази довші —
заміни фіксовану ширину на гнучку:
```css
.blank { width: auto; min-width: 90px; }
```
(текст вводу = повний вираз; порівняння в `checkAnswers` уже `trim().toLowerCase()`).

## Крок 5. (Опційно) додати тренажер і відео
- **Active-recall дрил**: візьми `[{answer, clue}]` → пари `[clue, answer]` як
  `DRILLS`, встав блок за `../Active Recall & Audio Drill/SKILL-active-recall-drill.md`
  (після кнопок квізу). Так само active-learning, тільки усно.
- **Відео-кліп**: за патерном `.video-frame` (див.
  `runway-excursion-picture-description.html` / medical-сторінку), якщо є релевантне.

## Крок 6. Інтеграція в сайт
- Назва файлу: `<topic>-gap-fill.html` (lowercase-hyphen).
- Додай картку на `index.html` (за зразком інших квіз-карток).
- back-link `&larr; All quizzes` зверху і знизу.

## Крок 7. Перевірка (Playwright або вручну)
1. `python3 -m http.server` з `Aviation-quiz/`, відкрити нову сторінку.
2. К-сть `.blank` == к-сть `.chip` == довжина `answers`; нумерація 1..N без дірок.
3. Клік чипа → вставляється у фокус-пропуск і гасне; Check → зелене/червоне +
   рахунок; Show answers заповнює все; Reset чистить.
4. Кожен `answer` дослівно збігається з тим, що в тексті (інакше «wrong» на
   правильному слові).
5. (Якщо є дрил) клавіші не перехоплюють набір у пропусках.
6. 375px без overflow; 0 console-помилок.

## Крок 8. Деплой
- `git add <page>.html index.html` (+ за бажання `<page>-words.json`).
- commit → push у `main` `StsZu/aviation-quiz` **тільки за проханням користувача**.
- Відстежити Pages (`gh run watch …`); інколи транзитна 401 на deploy-pages —
  rerun workflow.

---

## Реєстр
| Джерело | Нова gap-fill сторінка | К-сть слів | Статус |
|---|---|---|---|
| `runway-excursion-picture-description.html` (transcript) | _todo_ | 10–20 | planned |
