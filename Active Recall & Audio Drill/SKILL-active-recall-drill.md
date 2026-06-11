# SKILL: додати усний тренажер «Active Recall» на сторінку

Інструкція для себе: як на будь-яку standalone-сторінку `aviation-quiz` додати
усний тренажер активного пригадування (як уже зроблено на
`quiz_medical_incident_gapfill.html` →
https://stszu.github.io/aviation-quiz/quiz_medical_incident_gapfill.html).

Тренажер: учень читає англ. опис → вимовляє колокацію вголос → «Show answer»
розкриває еталон. Reveal-only (без аудіо), keyboard-driven, без повторів поспіль.

Стек сторінок: один HTML-файл, inline `<style>` + `<script>`, vanilla JS, без
збірки/CDN. GitHub Pages з `main` репо `StsZu/aviation-quiz`.

Першоджерела ідеї: `TASK/task-11-06-2026.md` (ТЗ + DoD),
`Active Recall & Audio Drill/task-11-06-2026.md` (приклад набору слів).

---

## Крок 1. Отримати JSON для тренажера

1. Візьми джерело: список колокацій, відповіді gap-fill, або текст/транскрипт.
2. Прогони через `prompt-generate-drills.md` (підстав джерело в `<SOURCE>`).
3. Результат — масив `[task, target]`. Збережи як
   `Active Recall & Audio Drill/<page>-drills.json`.
4. Швидка перевірка: English-only (без кирилиці); у жодному `task` немає цільового
   слова; порядок збережено; 8–16 карток.

Приклад валідного масиву:
```json
[
  ["Use the professional medical phrase for performing chest compressions and rescue breaths.", "administer CPR"],
  ["Say that the flight continued its journey again after a temporary interruption or unscheduled stop.", "flight resumed"]
]
```

---

## Крок 2. Вбудувати тренажер у сторінку

Три вставки в цільовий HTML. **Єдине, що змінюється від сторінки до сторінки —
масив `DRILLS`** (вміст JSON із Кроку 1). Решта — копіюється без змін.

### 2a. CSS — у `<style>` (палітра беж-теми сайту)
```css
.drill { margin-top: 28px; padding: 20px; background: rgba(255,251,244,0.6);
  border: 1px solid #d4c7b3; border-radius: 14px; }
.drill-head { display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px; font-family: "SF Pro Text", Arial, sans-serif; }
.drill-title { font-size: 13px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; color: #7a6858; }
.drill-counter { font-size: 13px; color: #7a6858; font-family: "SF Pro Text", Arial, sans-serif; }
.drill-task { font-size: 17px; color: #2f2822; line-height: 1.5; min-height: 3em; margin-bottom: 14px; }
.drill-target { font-size: 20px; font-weight: bold; text-align: center; padding: 12px;
  border-radius: 10px; background: #c8f0c8; color: #1a5a1a; margin-bottom: 14px; }
.drill-target[hidden] { display: none; }
.drill-controls { display: flex; gap: 8px; flex-wrap: wrap; }
.drill-hint { margin-top: 10px; font-size: 12px; color: #7a6858; font-family: "SF Pro Text", Arial, sans-serif; }
```
> Якщо сторінка не беж-тема (напр. Tailwind cockpit-класи) — адаптуй кольори під
> її палітру, але збережи структуру класів і `id`.

### 2b. HTML — куди вставити блок
Постав `<section class="drill">` **після основного матеріалу / тексту**
(на medical-incident — після кнопок квізу `.footer`, перед відеоблоком).
Лічильник стартує з `Card 0 / N`; `N` підставиться автоматично з `DRILLS`.
```html
<section class="drill" aria-label="Active recall speaking drill">
  <div class="drill-head">
    <span class="drill-title">Speaking drill · say it out loud</span>
    <span class="drill-counter" id="drillCounter">Card 0 / 0</span>
  </div>
  <p class="drill-task" id="drillTask">Read the description, say the collocation out loud, then check yourself.</p>
  <div class="drill-target" id="drillTarget" hidden>&raquo; <span id="drillTargetText"></span> &laquo;</div>
  <div class="drill-controls">
    <button class="btn" id="drillShow" disabled onclick="drillShowAnswer()">Show answer (Space)</button>
    <button class="btn primary" id="drillNext" onclick="drillNextCard()">Next drill (Enter)</button>
  </div>
  <p class="drill-hint">Keys: Space — show answer · Enter / &rarr; — next drill</p>
</section>
```
> Кнопки використовують класи `.btn` / `.btn.primary`. Якщо їх на сторінці нема —
> додай мінімальні стилі кнопок або заміни на власні класи.

### 2c. JS — наприкінці `<script>`
Підстав свій масив у `const DRILLS`. Решта — без змін.
```js
/* ---- Active-recall speaking drill (drop-in: only DRILLS changes per page) ---- */
const DRILLS = [
  ["...task...", "...target..."]
  // ← встав сюди вміст <page>-drills.json
];

let drillHistory = [];
let drillIndex = -1;
let drillRevealed = false;

function drillNextCard() {
  if (!DRILLS.length) return;
  if (drillHistory.length >= DRILLS.length) drillHistory = [];
  let pool = DRILLS.map(function (_, i) { return i; })
    .filter(function (i) { return drillHistory.indexOf(i) === -1 && i !== drillIndex; });
  if (!pool.length) pool = [0];
  drillIndex = pool[Math.floor(Math.random() * pool.length)];
  drillHistory.push(drillIndex);
  drillRevealed = false;
  document.getElementById('drillTask').textContent = DRILLS[drillIndex][0];
  document.getElementById('drillTargetText').textContent = DRILLS[drillIndex][1];
  document.getElementById('drillTarget').hidden = true;
  document.getElementById('drillCounter').textContent = 'Card ' + drillHistory.length + ' / ' + DRILLS.length;
  document.getElementById('drillShow').disabled = false;
}

function drillShowAnswer() {
  if (drillIndex === -1 || drillRevealed) return;
  document.getElementById('drillTarget').hidden = false;
  document.getElementById('drillShow').disabled = true;
  drillRevealed = true;
}

document.addEventListener('keydown', function (e) {
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA') return; // не перехоплювати набір у полях
  if (e.code === 'Space' || e.key === ' ') {
    if (drillIndex === -1) return;
    e.preventDefault();
    drillShowAnswer();
  } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
    e.preventDefault();
    drillNextCard();
  }
});
```
> Ініціалізувати лічильник одразу можна, виставивши в HTML `Card 0 / 0` — після
> першого `drillNextCard()` він стане `Card 1 / N`. За бажання виклич
> `drillNextCard()` на старті, щоб одразу показати першу картку.

---

## Крок 3. Критичні моменти (не забути)
- **Keyboard guard обов'язковий.** Якщо на сторінці є `<input>`/`<textarea>`
  (напр. пропуски gap-fill) — без перевірки `activeElement` Space/Enter ламають
  набір. Guard уже в шаблоні.
- **English-only** в `task`/`target`; цільове слово не світиться в описі.
- **Без повторів поспіль** і без повтору, доки пул не вичерпано — закладено в
  `drillNextCard()`.
- Унікальність `id` (`drill*`) — якщо на сторінці колись буде два тренажери,
  префіксуй id і функції.

---

## Крок 4. Перевірка (Playwright або вручну)
1. `python3 -m http.server` з `Aviation-quiz/`, відкрити сторінку.
2. Блок стоїть там, де треба; «Next» показує task + `Card N / total`; «Show
   answer» розкриває зелений target і дизейблиться.
3. 20 кліків «Next» — жодної однакової картки поспіль; після `total` цикл
   починається знову.
4. Фокус у полі вводу + Space/літери — тренажер не реагує; поза полем Space/Enter/→
   працюють.
5. Решта сторінки (квіз/відео) і консоль — без помилок; 375px без overflow.

---

## Крок 5. Деплой
1. `git add <page>.html` (тільки цей файл; не змітати чужі незакомічені зміни).
2. `git commit -m "Add active-recall speaking drill to <page>"`.
3. Пуш у `main` — **тільки за явним проханням користувача**.
4. Відстежити Pages: `gh run watch <id> --repo StsZu/aviation-quiz`.
   Інколи деплой падає транзитною **401** на кроці «deploy-pages» — тоді
   `gh run rerun <id> --failed` або штовхнути порожнім комітом.
5. Live-перевірка: `curl` сторінки → `grep -c "Speaking drill"` має бути `>0`.

---

## Реєстр зроблених тренажерів
| Сторінка | Джерело дрилів | К-сть | Статус |
|---|---|---|---|
| `quiz_medical_incident_gapfill.html` | `Active Recall & Audio Drill/task-11-06-2026.md` | 14 | live |
