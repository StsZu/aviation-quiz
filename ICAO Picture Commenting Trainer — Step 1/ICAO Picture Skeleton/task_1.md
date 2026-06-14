ADDITIONAL REQUIREMENT — Actor Memory Method Integration

Also use ideas from this existing page as a learning-method reference:

https://stszu.github.io/aviation-quiz/aviation_english_cockpit_class/actor-methods-to-remember-aviation-texts.html

Local or project reference if available:
aviation_english_cockpit_class/actor-methods-to-remember-aviation-texts.html

Integrate the following actor-method ideas into each of the three SCAN trainer pages:

1. Beats, not memorized text

Each ICAO story must be divided into clear speaking beats:

- Beat 1: What I can see
- Beat 2: What it is called
- Beat 3: What may be happening
- Beat 4: Possible causes
- Beat 5: Main risks
- Beat 6: What the crew / ATC / ground staff should do
- Beat 7: Safety conclusion

Show the beats before the full story.
The goal is to help the learner remember the logic of the answer, not memorize the text like a poem.

2. Chunk Builder

For each Level 3, Level 4, and Level 5 story, add a “Build the Answer” section.

It should work like this:

- Show the story as small chunks.
- Add a button: “Add chunk”
- Add a button: “Say so far”
- Add a button: “Reset”
- Each click reveals the next chunk.
- The learner can practise building the full answer step by step.

Example chunks:

- I can see a large passenger aircraft on final approach.
- The runway appears to be occupied.
- This may indicate a runway incursion.
- The main risk is a collision or loss of separation.
- The safest action is to go around.

3. First-Letter Prompt Trainer

For each page, add a first-letter code for one model answer.

Example:

Full sentence:
The landing aircraft is on final approach, while another aircraft is still on the active runway.

First-letter code:
T l a i o f a, w a a i s o t a r.

The page should include:

- first-letter code
- “Reveal sentence” button
- “Hide sentence” button
- “Next line” button
- optional “Speak full line” button using SpeechSynthesis

Purpose:
The learner should reconstruct the sentence from memory using only the first-letter prompt.

4. Cue–Response Cards

Add a small flashcard section for each page.

The cue is an ICAO examiner-style prompt.
The response is a short model answer.

Examples for Runway Incursion:

Cue:
What can you see?

Response:
I can see one aircraft on final approach and another aircraft still on the runway.

Cue:
What is the main risk?

Response:
The main risk is a collision or loss of separation.

Cue:
What should the landing aircraft do?

Response:
The landing aircraft should go around if the runway is not clear.

Examples for Crosswind Landing:

Cue:
What may be happening?

Response:
The aircraft may be landing in crosswind conditions.

Cue:
What is the main risk?

Response:
The main risk is a hard landing, bounced landing, or runway excursion.

Cue:
What should the crew do if the approach is unstable?

Response:
The crew should go around.

Examples for Ground Vehicle Collision:

Cue:
What can you see?

Response:
I can see a damaged engine nacelle and a ground support vehicle very close to the aircraft.

Cue:
What may have happened?

Response:
The vehicle may have hit the engine during ground handling.

Cue:
What should happen before departure?

Response:
Maintenance must inspect the aircraft before it is cleared for flight.

Flashcard interaction:

- Show cue first.
- Button: “Reveal response”
- Button: “Next card”
- Button: “Speak response”

5. Cover-and-Recall Practice

Add a “Recall Mode” section.

It should allow the learner to practise without seeing the full text.

Modes:

- Show only beats
- Show only first-letter prompts
- Show only vocabulary
- Hide all text and show only the image

Add a simple toggle:

- Full text
- Beats only
- First letters only
- Image only

This supports active recall instead of passive reading.

6. Camera / Voice Practice Checklist

Add a short checklist at the end of each page:

Before recording:

- I started within 5 seconds.
- I used the SCAN structure.
- I mentioned the aircraft.
- I explained a possible cause.
- I named the main risk.
- I said what the crew / ATC / ground staff should do.
- I finished with a safety conclusion.

After recording:

- Was my answer clear?
- Did I stop for too long?
- Did I use aviation vocabulary?
- Did I sound natural or just memorized?
- What one sentence should I improve?

Do not overcomplicate this.
This section can be static HTML with checkboxes.

7. Memory Route Panel

Each page should include a small visual route:

Picture → Aviation Logic → Beats → Chunks → Active Recall → First-Letter Code → Camera Practice

This route should appear near the top or after the SCAN Method explanation.

Use this idea from the actor-method page:
The goal is not to memorize the text word by word.
The goal is to remember the logic of the situation and speak clearly.

8. Audio buttons

Where practical, add SpeechSynthesis buttons:

- Speak vocabulary
- Speak Level 4 story
- Speak Level 5 story
- Speak current chunk
- Speak flashcard response

Use vanilla JavaScript SpeechSynthesis only.
No external APIs.

9. Page structure after adding actor-method ideas

Each of the three pages should have this structure:

1. Header
2. Picture
3. SCAN Method short explanation
4. Memory Route Panel
5. SCAN × 4P skeleton
6. Necessary vocabulary
7. Speaking beats
8. ICAO Story Levels 4–5
9. Build the Answer / Chunk Builder
10. First-Letter Prompt Trainer
11. Cue–Response Flashcards
12. Recall Mode
13. Mini Quiz / Self-check
14. Camera Practice Checklist
15. Useful phrases
16. Navigation links

10. Design requirement

Keep the style consistent with:

scan-method-trainer.html

and visually compatible with:

aviation_english_cockpit_class/actor-methods-to-remember-aviation-texts.html

The pages should feel like part of the same training ecosystem:
SCAN = picture logic
Actor Method = memory and speaking automation

Do not create a heavy academic page.
Make it practical, interactive, and suitable for daily ICAO speaking practice.