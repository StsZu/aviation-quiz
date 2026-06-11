/*
 * Single source of truth for the "What's New" journal.
 * Loaded by changelog.html (renders the journal) and index.html (NEW badges).
 *
 * Convention: every new material adds ONE entry at the TOP of this array.
 * Fields: { date: "YYYY-MM-DD", type, title, href }
 * `type` is one of TYPES below; `href` should match the material's page
 * (and a MODULES href in index.html when the material is a menu card, so it
 *  gets a NEW badge). Dates are the day the material was first published.
 */
window.CHANGELOG_TYPES = [
  "Quiz", "Gap-fill", "Crossword", "Infographic",
  "Song", "Listen & Read", "Cockpit Class", "Describe Picture"
];

window.CHANGELOG = [
  // 2026-06-11
  { date: "2026-06-11", type: "Describe Picture",title: "Picture Description Trainer — Step 2: Detailed Description", href: "picture-description-trainer-step-2.html" },
  { date: "2026-06-11", type: "Describe Picture",title: "Picture Description Trainer — Step 1: Topic Statement", href: "picture-description-trainer.html" },
  { date: "2026-06-11", type: "Gap-fill",        title: "Runway Excursion — Picture Description Gap-fill",       href: "runway-excursion-picture-gap-fill.html" },

  // 2026-06-09
  { date: "2026-06-09", type: "Describe Picture",title: "Picture Description — Listen & Describe Gallery",       href: "picture-description.html" },

  // 2026-06-08
  { date: "2026-06-08", type: "Gap-fill",        title: "Runway Excursion — Connector Gap-fill",                 href: "runway-excursion-gap-fill.html" },
  { date: "2026-06-08", type: "Infographic",     title: "Serious Accident Discussion Practice",                  href: "infographics.html" },
  { date: "2026-06-08", type: "Describe Picture",title: "Runway Excursion into Water — Model Answer & Quiz",      href: "runway-excursion-model-answer.html" },
  { date: "2026-06-08", type: "Describe Picture",title: "Runway Excursion & Emergency Evacuation — Picture Description", href: "runway-excursion-picture-description.html" },
  { date: "2026-06-08", type: "Listen & Read",   title: "Aircraft Emergency Evacuation — Picture Description",    href: "Flight_academy_trainer/emergency_evacuation_trainer.html" },
  { date: "2026-06-08", type: "Cockpit Class",   title: "Class: Takeoffs & Departure Climbs",                    href: "aviation_english_cockpit_class/takeoffs-and-departure-climbs.html" },

  // 2026-06-07
  { date: "2026-06-07", type: "Describe Picture",title: "Describe the Picture: Exam Console",                    href: "describe-picture-2/icao_aviation_english_exam_simulator.html" },
  { date: "2026-06-07", type: "Describe Picture",title: "Describe the Picture: Level 5 Examiner",                href: "describe-picture-2/icao_aviation_english_examiner.html" },
  { date: "2026-06-07", type: "Cockpit Class",   title: "Cabin Crew Medical Emergencies",                        href: "describe-picture-2/aviation_cabin_crew_medical_emergency_simulator_guide.html" },
  { date: "2026-06-07", type: "Cockpit Class",   title: "Class: AeroMedical English",                            href: "aviation_english_cockpit_class/aeromedical_english.html" },
  { date: "2026-06-07", type: "Gap-fill",        title: "Medical Incident Report Gap-fill",                      href: "quiz_medical_incident_gapfill.html" },
  { date: "2026-06-07", type: "Cockpit Class",   title: "Class: ICAO Level 4–5 Phrases",                         href: "aviation_english_cockpit_class/icao_aviation_phrases_micro_course.html" },
  { date: "2026-06-07", type: "Cockpit Class",   title: "Class: Damage & Failure Mastery",                       href: "aviation_english_cockpit_class/icao_mastery_dashboard.html" },
  { date: "2026-06-07", type: "Listen & Read",   title: "Emergency Phrases — ICAO Level 4 to 5",                 href: "Flight_academy_trainer/useful-aviation-phrases-for-emergencies-icao-level-4-to-5_trainer.html" },
  { date: "2026-06-07", type: "Quiz",            title: "Technical Problems & Safety Decisions Quiz",            href: "technical-problems-and-safety-decisions-quiz.html" },
  { date: "2026-06-07", type: "Crossword",       title: "Technical Problems Crossword: Part 1",                  href: "Crosswords/technical-problems-1.html" },
  { date: "2026-06-07", type: "Crossword",       title: "Technical Problems Crossword: Part 2",                  href: "Crosswords/technical-problems-2.html" },

  // 2026-06-06
  { date: "2026-06-06", type: "Cockpit Class",   title: "Class: Belgrade Takeoff Accident",                      href: "aviation_english_cockpit_class/embraer-e190-belgrade-takeoff-accident.html" },
  { date: "2026-06-06", type: "Listen & Read",   title: "Embraer E190 Takeoff Accident at Belgrade",             href: "Flight_academy_trainer/belgrade_takeoff_accident_trainer.html" },
  { date: "2026-06-06", type: "Crossword",       title: "Belgrade Takeoff Accident Crossword",                   href: "Crosswords/embraer-e190-belgrade-takeoff-accident-crossword.html" },
  { date: "2026-06-06", type: "Cockpit Class",   title: "Belgrade 30L — RTF Transmissions",                      href: "aviation_english_cockpit_class/belgrade-runway-30l-incident-study-transmissions.html" },
  { date: "2026-06-06", type: "Quiz",            title: "ICAO RTF Compliance Protocol Quiz",                     href: "icao-rtf-compliance-protocol-quiz.html" },
  { date: "2026-06-06", type: "Song",            title: "Belgrade Wrong-Intersection songs",                     href: "songs.html#wrong-intersection" },
  { date: "2026-06-06", type: "Infographic",     title: "Embraer E190 Takeoff Accident — Belgrade",              href: "infographics.html" },

  // 2026-06-05
  { date: "2026-06-05", type: "Listen & Read",   title: "Flight Academy: Pilot Guide LSA",                       href: "Flight_academy_trainer/flight_academy_trainer.html" },
  { date: "2026-06-05", type: "Crossword",       title: "Present Perfect Crossword: Set 1",                      href: "Crosswords/present-perfect-1.html" },
  { date: "2026-06-05", type: "Crossword",       title: "Present Perfect Crossword: Set 2",                      href: "Crosswords/present-perfect-2.html" },
  { date: "2026-06-05", type: "Crossword",       title: "Communication Problems Crossword",                      href: "Crosswords/1_crossword.html" },
  { date: "2026-06-05", type: "Crossword",       title: "Rejected Takeoffs Crossword",                           href: "Crosswords/rejected-takeoffs.html" },
  { date: "2026-06-05", type: "Crossword",       title: "Stall Recognition Crossword",                           href: "Crosswords/stall.html" },

  // 2026-06-04
  { date: "2026-06-04", type: "Cockpit Class",   title: "Class: It Depends On",                                  href: "aviation_english_cockpit_class/aviation_english_cockpit_class.html" },
  { date: "2026-06-04", type: "Cockpit Class",   title: "Class: Present Perfect",                                href: "aviation_english_cockpit_class/aviation_present_perfect_trainer.html" },
  { date: "2026-06-04", type: "Cockpit Class",   title: "Class: Passive Voice",                                  href: "aviation_english_cockpit_class/passive_voice_for_aviation_english.html" },
  { date: "2026-06-04", type: "Quiz",            title: '"It Depends On" Grammar Quiz',                          href: "it-depends-on-aviation-english-quiz.html" },
  { date: "2026-06-04", type: "Infographic",     title: "It Depends On / Present Perfect / Passive Voice",       href: "infographics.html" },
  { date: "2026-06-04", type: "Song",            title: "It Depends On Safety + Present Perfect songs",          href: "songs.html#it-depends-on-safety" },

  // 2026-06-02
  { date: "2026-06-02", type: "Quiz",            title: "Aviation Vocabulary Quiz",                              href: "aviation_vocabulary_quiz.html" },
  { date: "2026-06-02", type: "Quiz",            title: "Rejected Takeoffs Quiz",                                href: "quiz_reject_takeoff.html" },
  { date: "2026-06-02", type: "Quiz",            title: "Stall Recognition Quiz",                                href: "quiz_stall.html" },
  { date: "2026-06-02", type: "Quiz",            title: "Passive Voice Quiz",                                    href: "aviation-passive-voice-quiz.html" },
  { date: "2026-06-02", type: "Quiz",            title: "Incident Report Comprehension",                         href: "quiz_5.html" },
  { date: "2026-06-02", type: "Quiz",            title: "Expectation Bias / Fatigue / Busy Frequency Quizzes",   href: "quiz_01_starting_up_quiz_1.html" },
  { date: "2026-06-02", type: "Infographic",     title: "Aviation Infographics gallery",                         href: "infographics.html" },
  { date: "2026-06-02", type: "Song",            title: "Aviation Safety Songs gallery",                         href: "songs.html" }
];
