/*
 * Actor-Methods trainer narration builder.
 *
 * Generates one MP3 per core spoken string in
 * ../actor-methods-to-remember-aviation-texts.html using the project's standard
 * narration voice (see the "Narration voice (TTS)" section in ../../CLAUDE.md).
 * Idempotent: existing clips are skipped unless you pass --force.
 *
 * Requires: Node 18+ (global fetch), ffmpeg on PATH, and ELEVENLABS_API_KEY in
 * the environment.
 *
 *   ELEVENLABS_API_KEY=… node aviation_english_cockpit_class/actor-methods-audio/build-audio.mjs [--force]
 *
 * The id->text list is read straight from the page's `AUDIO` data block (sliced
 * between the ===AUDIO DATA=== markers) so the audio set can never drift from the
 * page text. Filenames are the stable ids the page passes to playClip().
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

// ---- pull the page's AUDIO data block (pure data, no DOM) and eval it ----
const html = readFileSync(join(__dirname, "..", "actor-methods-to-remember-aviation-texts.html"), "utf8");
const start = html.indexOf("const AUDIO = [");
const end = html.indexOf("/* ===END AUDIO DATA=== */");
if (start < 0 || end < 0) { console.error("Could not locate AUDIO data block in page HTML"); process.exit(1); }
const ctx = {};
vm.createContext(ctx);
vm.runInContext(html.slice(start, end) + "\nthis.__d = AUDIO;", ctx);
const items = ctx.__d;
if (!Array.isArray(items) || !items.length) { console.error("AUDIO block is empty"); process.exit(1); }

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
