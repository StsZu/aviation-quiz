# Prompt: згенерувати дрили для тренажера «Active Recall»

Цей промпт перетворює **набір слів/колокацій** або **текст** на масив дрилів
`[task, target]` для усного тренажера активного пригадування
(див. `SKILL-active-recall-drill.md`).

Встав промпт у будь-яку LLM (Claude / Gemini), підставивши свій матеріал у
`<SOURCE>`.

---

## PROMPT (копіювати від цього рядка)

You are building data for an **active-recall speaking drill** for aviation/medical
English learners. The learner reads an English description, says a target
collocation **out loud**, then reveals the answer to self-check.

### Your task
From the source below, produce a JSON array of drill cards. Each card is a
two-element array: `["<task>", "<target>"]`.

- `target` — a fixed, natural **collocation / chunk** (usually 2–4 words) exactly
  as it should be spoken (e.g. `"administer CPR"`, `"flight resumed"`,
  `"emergency services"`). Keep it short and idiomatic, not a full sentence.
- `task` — an **English** definition or communicative situation that prompts the
  learner to produce the target. It must:
  - **NOT contain the target word(s)** or obvious derivatives (force active recall).
  - be one clear sentence, paraphrasing the meaning or giving a use-situation.
  - stay in the same professional domain as the source (aviation / medical / ATC).

### Hard rules (Definition of Done)
1. **English only.** No Cyrillic, no translations — descriptions and targets are
   all in English.
2. One card per target collocation. Preserve the **order** of the source.
3. Do not repeat a target. Do not leak the target inside its own `task`.
4. Output **only** the JSON array — no prose, no code fences, no `audio_id`
   (audio is not used by the trainer).

### Source modes (auto-detect)
- **Word/collocation list** → one card per item; write a fresh definition for each.
- **Gap-fill answers** → use each answer as the `target`.
- **Passage / transcript** → extract 8–16 of the most useful, exam-relevant
  collocations and build a card for each.

### Output format (exactly this shape)
```json
[
  ["Say that an unexpected event took place or occurred at a specific time.", "incident happened"],
  ["Name the medical emergency where the heart suddenly stops beating effectively.", "cardiac arrest"]
]
```

### Source
<SOURCE>
(встав сюди список слів/колокацій АБО текст/транскрипт)
</SOURCE>

## END PROMPT

---

## Як використати результат
1. Скопіюй виданий JSON-масив.
2. Збережи як `<назва-сторінки>-drills.json` у цій папці
   (`Active Recall & Audio Drill/`), напр. `medical-incident-drills.json`.
3. Далі — `SKILL-active-recall-drill.md`, крок «Вбудувати тренажер».

## Порада щодо якості
- Перевір, що в жодному `task` немає цільового слова (інакше recall зламано).
- `target` має бути саме тим, що людина вимовляє вголос — без артиклів-зайвин,
  якщо вони не частина колокації.
- 8–16 карток на сторінку — комфортний обсяг; більше дроби на теми.
