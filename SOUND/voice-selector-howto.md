# Як додати вибір голосу TTS на сторінку

Інструкція для себе: як перенести dropdown вибору голосу вимови (Web Speech API) на іншу сторінку. Еталон — `aviation_english_cockpit_class/icao_mastery_dashboard.html`.

## Що це робить

- Читає системні голоси через `window.speechSynthesis.getVoices()`.
- Фільтрує лише англійські (`lang` починається з `en`), сортує «преміум»-голоси вгору.
- Перший у списку стає голосом за замовчуванням (`selectedVoice`).
- `speakText(text)` озвучує переданий рядок обраним голосом; якщо голос не обрано — fallback на Google/Samantha.

Працює лише з браузерним TTS (Web Speech API). Якщо на сторінці вже преміум аудіокліпи (mp3), цей dropdown не потрібен.

## 4 кроки переносу

### 1. HTML — сам dropdown

Вставити там, де має бути селектор (класи Tailwind, підлаштувати під тему сторінки):

```html
<!-- Voice Selection Dropdown for Clear Pronunciation -->
<div class="space-y-1.5">
  <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Pronunciation Voice (Default: Clear US/UK English)</label>
  <select id="voice-selector" onchange="onVoiceSelected()" class="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
    <option value="">Searching available system voices...</option>
  </select>
</div>
```

### 2. JS — стан + завантажувач голосів

```javascript
let selectedVoice = null;

function populateVoices() {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  const selector = document.getElementById("voice-selector");
  selector.innerHTML = '';

  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  englishVoices.sort((a, b) => {
    const primaryNames = ['google', 'natural', 'premium', 'samantha', 'zira', 'daniel', 'david', 'hazel', 'mark'];
    const aScore = primaryNames.reduce((acc, term) => acc + (a.name.toLowerCase().includes(term) ? 1 : 0), 0);
    const bScore = primaryNames.reduce((acc, term) => acc + (b.name.toLowerCase().includes(term) ? 1 : 0), 0);
    return bScore - aScore;
  });

  if (englishVoices.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.innerText = "No clear English voice found on system";
    selector.appendChild(opt);
    return;
  }

  englishVoices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = voice.name;
    const isPremium = voice.name.toLowerCase().includes('google') || voice.name.toLowerCase().includes('natural') || voice.name.toLowerCase().includes('premium');
    option.innerText = `${voice.name} (${voice.lang}) ${isPremium ? '★ CLEAR VOICE' : ''}`;
    if (index === 0) {
      option.selected = true;
      selectedVoice = voice;
    }
    selector.appendChild(option);
  });
}

function onVoiceSelected() {
  const selector = document.getElementById("voice-selector");
  const voices = window.speechSynthesis.getVoices();
  selectedVoice = voices.find(v => v.name === selector.value) || null;
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = populateVoices;
}
```

> Примітка: в еталоні `onVoiceSelected()` ще викликає `showNotification(...)`. Якщо на новій сторінці немає тостів — прибрати цей рядок.

### 3. JS — озвучення тексту

```javascript
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      const voices = window.speechSynthesis.getVoices();
      const autoFallback = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha')));
      if (autoFallback) utterance.voice = autoFallback;
    }
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
```

Будь-яке озвучення на сторінці має йти через `speakText(...)`, щоб поважати обраний голос.

### 4. Ініціалізація при завантаженні

В обробнику старту сторінки (`DOMContentLoaded` / кінець `init`) викликати з невеликою затримкою — голоси в Chrome підвантажуються асинхронно:

```javascript
setTimeout(populateVoices, 300);
```

## Чек-лист після вставки

- [ ] `id="voice-selector"` присутній рівно один раз.
- [ ] `populateVoices` викликається і через `onvoiceschanged`, і через `setTimeout(..., 300)`.
- [ ] Усі точки озвучення йдуть через `speakText()`, а не власні `SpeechSynthesisUtterance`.
- [ ] Класи Tailwind/інлайн-стилі підлаштовані під тему сторінки (cockpit-сторінки темні; кореневі quiz-сторінки — Georgia/`#e7dfd2`, де Tailwind немає — переписати на інлайн-CSS).
- [ ] Якщо немає `showNotification` — прибрати його виклик з `onVoiceSelected`.
- [ ] Локальна перевірка: `python3 -m http.server`, відкрити сторінку, у dropdown є голоси, перший обрано, озвучення працює.

## Обмеження

- Голоси залежать від ОС/браузера користувача — на iOS Safari список бідніший, «★ CLEAR VOICE» може не бути.
- Це браузерний TTS, не преміум mp3. Для фіксованих фраз кращий заздалегідь записаний аудіокліп (див. підхід `icao_aviation_phrases_micro_course.html`).
