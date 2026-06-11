# Prompt: знайти слова/вирази для gap-fill із тексту

Цей промпт читає **текст** (транскрипт, model answer, опис картинки тощо) і
повертає **10–20 вартих вивчення виразів** + визначення кожного. Результат живить
одразу дві вправи: gap-fill (вираз = відповідь у пропуску) і active-recall дрил
(визначення → вираз). Див. `task-build-gapfill-page.md`.

Встав промпт у Claude/Gemini, підставивши текст у `<TEXT>`.

---

## PROMPT (копіювати від цього рядка)

You are preparing vocabulary data for an **active-learning gap-fill + recall**
exercise for aviation English learners.

### Input
A source passage (transcript / model answer / picture description).

### Your task
Pick **10–20 high-value expressions** to learn and, for each, write a definition.

Choose `answer` items that are:
- **memorable collocations / chunks** (1–4 words) — verb+noun, adj+noun, fixed
  phrases (e.g. `"runway excursion"`, `"emergency evacuation slides"`,
  `"tire tracks"`, `"hard hats"`). Avoid trivial function words and bare single
  nouns that aren't worth drilling.
- an **exact substring of the source text** (verbatim, same spelling/case) — so a
  blank can be cut from the text later.
- spread across the passage, not clustered; no duplicates.

For each item write a `clue`:
- an **English definition or use-situation** that lets the learner guess the
  expression.
- it **must NOT contain the answer words** or obvious derivatives.
- one clear sentence, same professional domain.

### Hard rules
1. **English only** (answers and clues). No Cyrillic, no translation.
2. 10–20 items, in **order of first appearance** in the text.
3. `answer` appears **verbatim** in the source; `clue` never leaks the answer.
4. Output **only** the JSON array — no prose, no code fences.

### Output format (exactly)
```json
[
  { "answer": "runway excursion", "clue": "The event when an aircraft veers off or overruns the paved landing surface." },
  { "answer": "emergency evacuation slides", "clue": "The inflatable ramps deployed so people can quickly leave the aircraft." }
]
```

### Source
<TEXT>
(встав сюди текст сторінки / транскрипт)
</TEXT>

## END PROMPT

---

## Як використати результат
1. Скопіюй JSON-масив `[{answer, clue}]`.
2. Збережи як `Gap_fill_text/<page>-words.json`.
3. Далі — `task-build-gapfill-page.md` (побудова сторінки).
   - `answer` → відповіді/банк gap-fill.
   - `clue` + `answer` → пари `[task, target]` для active-recall дрила
     (сумісно зі `../Active Recall & Audio Drill/SKILL-active-recall-drill.md`).

## Контроль якості
- Кожен `answer` дослівно є в тексті (інакше пропуск не виріжеться).
- У жодному `clue` немає слова-відповіді.
- Вирази «легко запам'ятовуються»: цілісні колокації, а не випадкові слова.
- 10–20 шт.; рівномірно по тексту.
