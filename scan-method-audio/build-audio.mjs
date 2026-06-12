/*
 * SCAN trainer narration builder.
 *
 * Generates one MP3 per fixed spoken string in scan-method-trainer.html using
 * the project's standard narration voice (see the "Narration voice (TTS)"
 * section in ../CLAUDE.md). Idempotent: existing clips are skipped unless you
 * pass --force.
 *
 * Requires: Node 18+ (global fetch), ffmpeg on PATH, and ELEVENLABS_API_KEY in
 * the environment.
 *
 *   ELEVENLABS_API_KEY=… node scan-method-audio/build-audio.mjs [--force]
 *
 * Data is read straight from scan-method-trainer.html so the audio set can
 * never drift from the trainer's text. Filenames are the stable IDs the page
 * passes to playClip().
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

// ---- Standard narration voice: ElevenLabs "Daniel — Steady Broadcaster" (UK) ----
const VOICE_ID = "onwK4e9ZLuTAKqWW03F9";
const MODEL_ID = "eleven_multilingual_v2";
const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.8, style: 0.0 };
const ATEMPO = "0.93"; // slightly calmer/slower rhythm, pitch-preserving

const __dirname = dirname(fileURLToPath(import.meta.url));
const force = process.argv.includes("--force");
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error("ELEVENLABS_API_KEY is not set"); process.exit(1); }

// ---- pull the trainer's data block (pure data, no DOM) and eval it ----
const html = readFileSync(join(__dirname, "..", "scan-method-trainer.html"), "utf8");
const start = html.indexOf("const STEPS =");
const end = html.indexOf("// ---------------- STATE");
if (start < 0 || end < 0) { console.error("Could not locate data block in trainer HTML"); process.exit(1); }
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  html.slice(start, end) + "\nthis.__d = { ZONES, ZONE_ORDER, STEP_ORDER, RESCUE, FACTS, LEVELS };",
  ctx
);
const { ZONES, ZONE_ORDER, STEP_ORDER, RESCUE, FACTS, LEVELS } = ctx.__d;

// ---- build the manifest (id -> text) ----
const items = [];
for (const z of ZONE_ORDER)
  for (const s of STEP_ORDER)
    items.push({ id: `zone-${z}-${s}`, text: ZONES[z].steps[s].model });
FACTS.forEach((f, i) => items.push({ id: `fact-${i}`, text: f.model }));
LEVELS.forEach((lv, i) => items.push({ id: `level-${i}`, text: lv.text.join(" ") }));
RESCUE.forEach((r, i) => items.push({ id: `rescue-${i}`, text: r }));

writeFileSync(
  join(__dirname, "manifest.json"),
  JSON.stringify({ voice: "ElevenLabs Daniel", voice_id: VOICE_ID, model: MODEL_ID, voice_settings: VOICE_SETTINGS, atempo: ATEMPO, items }, null, 2)
);

async function tts(text, outPath) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  const raw = outPath + ".raw.mp3";
  writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-filter:a", `atempo=${ATEMPO}`, outPath]);
  unlinkSync(raw);
}

let made = 0, skipped = 0;
for (const { id, text } of items) {
  const out = join(__dirname, `${id}.mp3`);
  if (existsSync(out) && !force) { skipped++; continue; }
  process.stdout.write(`  ${id} … `);
  await tts(text, out);
  console.log("ok");
  made++;
}
console.log(`\nDone. ${made} generated, ${skipped} skipped, ${items.length} total.`);
