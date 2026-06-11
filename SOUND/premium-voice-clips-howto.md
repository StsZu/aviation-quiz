# Як додати преміальні голоси (pre-rendered mp3-кліпи)

Інструкція для себе: як озвучити сторінку заздалегідь згенерованими преміум-mp3 (ElevenLabs) замість браузерного TTS. Еталон — `aviation_english_cockpit_class/icao_aviation_phrases_micro_course.html`.

Це другий, кращий за якістю підхід (перший — `voice-selector-howto.md`, браузерний Web Speech API). Преміум-кліпи дають стабільне однакове звучання на всіх пристроях (зокрема iOS, де системні голоси бідні), але працюють лише для **фіксованого, наперед відомого набору фраз** — бо кожну фразу треба згенерувати в mp3 заздалегідь.

Коли що обирати:
- **Преміум-кліпи** — фіксовані фрази/лексика/моделі-відповіді, де важлива якість і однаковість (емердженсі-фрази, lex-картки, level-5 зразки).
- **Браузерний TTS** (`voice-selector-howto.md`) — довільний/динамічний текст, який неможливо згенерувати наперед.

## Архітектура

1. Кожна озвучувана одиниця має **стабільний id** → один mp3-файл з ім'ям за схемою (`lex-0.mp3`, `level5-hypoxia.mp3`, `gen-action-divert.mp3`).
2. Усі mp3 лежать в одній папці курсу: `audio/<course-slug>/`.
3. Один спільний `Audio`-обʼєкт + черга програють кліпи послідовно.
4. Кнопка в розмітці викликає `playClip('<id>.mp3')` (або `playQueue([...])` для послідовності).

## 4 кроки

### 1. Папка аудіо

Створити `audio/<course-slug>/` у корені репо (поряд з `audio/icao-phrases-micro-course/`). Усі кліпи цього курсу — лише сюди.

### 2. JS — аудіо-движок

Вставити в `<script>` сторінки. `AUDIO_BASE` — відносний шлях від HTML до папки аудіо (зі сторінок у `aviation_english_cockpit_class/` це `../audio/<course-slug>/`):

```javascript
// --- Audio Engine (pre-rendered premium voice clips) ---
const AUDIO_BASE = '../audio/<course-slug>/';
const _audio = new Audio();
let _queue = [];
_audio.addEventListener('ended', () => {
    if (_queue.length) {
        _audio.src = _queue.shift();
        _audio.play().catch(() => {});
    }
});
function _playFiles(files) {
    _audio.pause();
    _queue = files.slice(1).map(f => AUDIO_BASE + f);
    _audio.src = AUDIO_BASE + files[0];
    _audio.play()
        .then(() => showToast("🔊 Audio Stream Initiated", "Premium voice — listen to the cadence."))
        .catch(() => showToast("⚠️ Audio Error", "Could not play the recording.", "error"));
}
function playClip(file) { _playFiles([file]); }
function playQueue(files) { _playFiles(files); }
```

> Якщо на сторінці немає `showToast` — прибрати ці `.then/.catch` або замінити на наявну систему сповіщень.

### 3. HTML — кнопки відтворення

Кнопка-динамік на кожній одиниці; `file` має точно збігатися з іменем mp3:

```html
<button onclick="playClip('lex-${index}.mp3')" class="text-base p-2.5 rounded-lg hover:bg-theme-inner text-theme-muted hover:text-theme-text transition-colors flex items-center justify-center border border-transparent hover:border-theme-border" title="Listen Pronunciation">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
</button>
```

Для послідовного програвання кількох фраз (як генератор брифів) — `onclick="playQueue(['gen-incident-x.mp3','gen-cause-y.mp3',...])"`.

### 4. Згенерувати mp3 через ElevenLabs

Для кожного id зібрати пару `(ім'я-файлу, текст)` і прогнати через ElevenLabs (text-to-speech). Тримати один `voice_id` і однакові налаштування на весь курс — інакше кліпи звучатимуть різнорідно.

Скрипт-болванка (Python, потрібен `ELEVENLABS_API_KEY` в env — ключ не комітити):

```python
import os, requests

VOICE_ID = "<your-voice-id>"        # один на весь курс
MODEL_ID = "eleven_multilingual_v2"  # або eleven_turbo_v2_5 для швидших/дешевших
OUT_DIR  = "audio/<course-slug>"

# id файлу -> дослівний текст для озвучення
CLIPS = {
    "lex-0": "go around",
    "lex-1": "declare an emergency",
    # ...
}

os.makedirs(OUT_DIR, exist_ok=True)
for name, text in CLIPS.items():
    r = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
        headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"],
                 "Content-Type": "application/json"},
        json={"text": text, "model_id": MODEL_ID,
              "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}},
    )
    r.raise_for_status()
    with open(f"{OUT_DIR}/{name}.mp3", "wb") as f:
        f.write(r.content)
    print("ok", name)
```

Альтернатива без коду: озвучити кожну фразу у веб-інтерфейсі ElevenLabs тим самим голосом, експортувати mp3 і перейменувати під схему id.

## Чек-лист

- [ ] Усі mp3 у `audio/<course-slug>/`, імена точно = id у `onclick`.
- [ ] `AUDIO_BASE` має правильний `../` (зі сторінок у `aviation_english_cockpit_class/` це `../audio/...`).
- [ ] Один `voice_id` + однакові `voice_settings` на весь курс.
- [ ] `ELEVENLABS_API_KEY` лише в env, ключ не в репо.
- [ ] Кожна кнопка/послідовність має наявний mp3 (немає 404 → перевірити в DevTools Network).
- [ ] Локальна перевірка: `python3 -m http.server` з кореня репо, відкрити сторінку, натиснути кілька динаміків.
- [ ] Закомітити нові mp3 разом з HTML; `git push` → перевірити live-URL.

## Обмеження

- Працює лише для наперед відомого скінченного набору фраз. Динамічний/користувацький текст → браузерний TTS (`voice-selector-howto.md`).
- Кожна нова/змінена фраза = новий рендер mp3; не забути перегенерувати після правки тексту.
- mp3 збільшують вагу репо — тримати короткі фрази, моно, без зайвого бітрейту.
