# Approved Text - Game Context Export
Generated at: 2026-06-20T14:45:30.652982
Project root: C:\Users\mariu\Desktop\Idle game

# Package summary
```json
{
  "name": "idle-word-office",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "test": "node --experimental-strip-types --experimental-specifier-resolution=node tests/game-logic.test.ts",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "break_infinity.js": "^2.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.5.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.6.2",
    "vite": "^5.4.1"
  }
}
```

# Project file tree
```txt
├── .agents/

├── docs/
│   ├── first-progression-map.md
│   ├── game-design.md
│   ├── progression-scale.md
│   └── word-pool-map.md
├── src/
│   ├── components/
│   │   ├── DictionaryScreen.tsx
│   │   ├── FeedbackLog.tsx
│   │   ├── PathBlock.tsx
│   │   ├── PathChoicePanel.tsx
│   │   ├── QuoteFeed.tsx
│   │   ├── ResourceBar.tsx
│   │   ├── SentenceControls.tsx
│   │   ├── StampButton.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── UpgradesScreen.tsx
│   │   ├── WordCard.tsx
│   │   ├── WordSelector.tsx
│   │   └── WordUpgradesMessage.tsx
│   ├── data/
│   │   ├── quotes.ts
│   │   ├── upgrades.ts
│   │   └── words.ts
│   ├── types/
│   │   └── game.ts
│   ├── utils/
│   │   ├── bigNumber.ts
│   │   ├── dream.ts
│   │   ├── format.ts
│   │   ├── gameState.ts
│   │   ├── milestones.ts
│   │   ├── pathEvents.ts
│   │   ├── progression.ts
│   │   ├── stampInput.ts
│   │   ├── stats.ts
│   │   ├── storage.ts
│   │   ├── stream.ts
│   │   ├── upgrades.ts
│   │   └── workbench.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   └── game-logic.test.ts
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

# Important keyword matches
- docs/first-progression-map.md:5 - * The game starts painfully slow with World.
- docs/first-progression-map.md:6 - * First resource is Meaning.
- docs/first-progression-map.md:7 - * First active word is World.
- docs/first-progression-map.md:8 - * World gives +0.01 Meaning per tap/stamp.
- docs/first-progression-map.md:9 - * First path choice happens at 1 Meaning.
- docs/first-progression-map.md:11 - * Farm path
- docs/first-progression-map.md:12 - * Flow path
- docs/first-progression-map.md:13 - * Dream/Chance layer appears later, around 100 Meaning, through Understand World.
- docs/first-progression-map.md:21 - ## Early Meaning Milestone Scale
- docs/first-progression-map.md:25 - * 0 Meaning: World starts active.
- docs/first-progression-map.md:26 - * 1 Meaning: choose first run path, Farm or Flow.
- docs/first-progression-map.md:27 - * 10 Meaning: unlock next word in chosen path.
- docs/first-progression-map.md:28 - * 25 Meaning: unlock another word or first small path effect.
- docs/first-progression-map.md:29 - * 50 Meaning: unlock stronger path identity or second path word.
- docs/first-progression-map.md:30 - * 100 Meaning: unlock second sentence slot and let Understand World reveal Dream/Chance.
- docs/first-progression-map.md:31 - * 500 Meaning: first real acceleration milestone.
- docs/first-progression-map.md:42 - * sentence slot limits
- docs/first-progression-map.md:49 - ## Player Speed Bands
- docs/first-progression-map.md:53 - * Low path: passive play or weak choices, slower progress.
- docs/first-progression-map.md:55 - * High path: smart choices and good word combinations, faster progress.
- docs/first-progression-map.md:61 - ### Farm Path
- docs/first-progression-map.md:66 - * Stronger tapping.
- docs/first-progression-map.md:67 - * Harvest/growth style bonuses.
- docs/first-progression-map.md:72 - * Farm
- docs/first-progression-map.md:73 - * Seed
- docs/first-progression-map.md:74 - * Soil
- docs/first-progression-map.md:75 - * Root
- docs/first-progression-map.md:85 - * Better tap value.
- docs/first-progression-map.md:88 - * Growth over repeated taps.
- docs/first-progression-map.md:91 - ### Flow Path
- docs/first-progression-map.md:95 - * Passive/idle progression.
- docs/first-progression-map.md:96 - * Meaning/sec.
- docs/first-progression-map.md:97 - * Slow but steady growth.
- docs/first-progression-map.md:98 - * Good for players who wait and return.
- docs/first-progression-map.md:102 - * Water
- docs/first-progression-map.md:104 - * Rain
- docs/first-progression-map.md:105 - * Stream
- docs/first-progression-map.md:106 - * River
- docs/first-progression-map.md:115 - * Passive Meaning/sec.
- docs/first-progression-map.md:118 - * Stored Meaning.
- docs/first-progression-map.md:119 - * Flow-based combo bonuses.
- docs/first-progression-map.md:121 - ### Dream / Chance Path
- docs/first-progression-map.md:125 - * Appears later, around 100 Meaning.
- docs/first-progression-map.md:126 - * Randomness, rare events, high bursts.
- docs/first-progression-map.md:127 - * Should combine well with second sentence slot.
- docs/first-progression-map.md:132 - * Dream
- docs/first-progression-map.md:134 - * Slumber
- docs/first-progression-map.md:137 - * Echo
- docs/first-progression-map.md:147 - * Random word events.
- docs/first-progression-map.md:156 - 1. Player starts with World.
- docs/first-progression-map.md:157 - 2. Player stamps World slowly.
- docs/first-progression-map.md:158 - 3. At 1 Meaning, player chooses Farm or Flow.
- docs/first-progression-map.md:161 - 6. At 10, 25, and 50 Meaning, the player gains more path words/effects.
- docs/first-progression-map.md:162 - 7. Around 100 Meaning, the player unlocks the second sentence slot.
- docs/first-progression-map.md:163 - 8. Around 100 Meaning, Understand World can reveal Dream and Slumber.
- docs/first-progression-map.md:164 - 9. Around 500 Meaning, the first stronger acceleration layer should begin.
- docs/first-progression-map.md:168 - * Is 1 Meaning still the correct first path unlock?
- docs/first-progression-map.md:169 - * Is 10 Meaning too soon or too slow for the next word?
- docs/first-progression-map.md:170 - * Should the second sentence slot unlock exactly at 100 Meaning?
- docs/first-progression-map.md:171 - * Should Dream appear at 100 Meaning or after the second slot?
- docs/first-progression-map.md:172 - * How much faster should Farm be for active players?
- docs/first-progression-map.md:173 - * How much passive income should Flow generate?
- docs/first-progression-map.md:174 - * How much randomness is fun before Dream becomes annoying?
- docs/first-progression-map.md:184 - * generic upgrade shop
- docs/first-progression-map.md:189 - * world reports
- docs/game-design.md:7 - The player begins with one word on screen. They tap/stamp the word to generate Meaning. Meaning is then used to unlock new words, paths, and eventually more complex language systems.
- docs/game-design.md:13 - Dictionary = upgrade tree
- docs/game-design.md:16 - The game should start extremely simple, almost boring, and slowly reveal deeper systems over time.
- docs/game-design.md:18 - The “cookie” of this game is the stamp/tap interaction.
- docs/game-design.md:24 - WORLD
- docs/game-design.md:26 - The player taps directly on the word or paper area.
- docs/game-design.md:28 - Each tap creates a visible stamp mark where the player tapped.
- docs/game-design.md:30 - Each stamp gives a tiny amount of Meaning.
- docs/game-design.md:34 - WORLD
- docs/game-design.md:35 - +0.01 Meaning per tap
- docs/game-design.md:39 - tap word → gain Meaning → unlock next word/path → choose direction → repeat
- docs/game-design.md:41 - There should be no random word rotation at the start. The player should not approve disposable words one after another. The current word should matter.
- docs/game-design.md:49 - The game should avoid fast mobile-game pacing where the player reaches huge numbers too quickly. The early game should make progress like this feel meaningful:
- docs/game-design.md:51 - 0.01 → 0.02 → 0.05 → 0.10 Meaning
- docs/game-design.md:57 - The first important choice should not happen instantly. A cost of 1 Meaning for the first path choice is currently the target.
- docs/game-design.md:65 - * Random word rotation
- docs/game-design.md:74 - * World reports
- docs/game-design.md:84 - If a mechanic is only friction, remove it until it has meaning.
- docs/game-design.md:88 - The main screen should be clean and focused.
- docs/game-design.md:93 - * Current Meaning
- docs/game-design.md:98 - * Tap value
- docs/game-design.md:99 - * Passive Meaning/sec, if applicable
- docs/game-design.md:100 - * Large tappable word/paper area
- docs/game-design.md:102 - The player should tap the word/card/paper itself.
- docs/game-design.md:104 - A visible stamp mark should appear at the tap location.
- docs/game-design.md:108 - Navigation should be handled through bottom or sidebar tabs.
- docs/game-design.md:114 - * Paths or Upgrades
- docs/game-design.md:122 - Words are upgrades.
- docs/game-design.md:130 - WORLD
- docs/game-design.md:131 - Starter word. Gives small Meaning per tap.
- docs/game-design.md:133 - FARM
- docs/game-design.md:134 - Manual/tap-focused word. Improves active stamping.
- docs/game-design.md:136 - WATER
- docs/game-design.md:137 - Idle/flow-focused word. Adds passive Meaning/sec.
- docs/game-design.md:140 - Random/luck-focused word. Adds small chances for large effects.
- docs/game-design.md:156 - * Farm / Ground / Nature path
- docs/game-design.md:157 - * Water / Flow path
- docs/game-design.md:158 - * Dream / Chance path
- docs/game-design.md:168 - ## 8. Path and Word Relationship
- docs/game-design.md:177 - World → Farm → Seed → Harvest → Orchard
- docs/game-design.md:179 - Water/Flow Path
- docs/game-design.md:180 - Water → Rain → River → Flow → Reservoir
- docs/game-design.md:182 - Dream/Chance Path
- docs/game-design.md:183 - Dream → Chance → Dice → Omen → Miracle
- docs/game-design.md:191 - GROW from the Farm path
- docs/game-design.md:192 - RIVER from the Water path
- docs/game-design.md:196 - Grow River
- docs/game-design.md:198 - Meaning:
- docs/game-design.md:200 - Passive income slowly increases over time.
- docs/game-design.md:202 - This makes the system flexible without needing generic upgrade buttons.
- docs/game-design.md:206 - ### Farm / Ground / Nature Path
- docs/game-design.md:211 - * soil
- docs/game-design.md:212 - * growth
- docs/game-design.md:215 - * physically building meaning
- docs/game-design.md:219 - * active tapping
- docs/game-design.md:220 - * manual growth
- docs/game-design.md:221 - * tap bonuses
- docs/game-design.md:222 - * tap combos
- docs/game-design.md:223 - * increasing tap value
- docs/game-design.md:228 - * World
- docs/game-design.md:229 - * Farm
- docs/game-design.md:230 - * Soil
- docs/game-design.md:231 - * Seed
- docs/game-design.md:233 - * Grow
- docs/game-design.md:234 - * Root
- docs/game-design.md:242 - FARM
- docs/game-design.md:243 - Improves manual tap value.
- docs/game-design.md:246 - Gives bonus Meaning every X taps.
- docs/game-design.md:248 - GROW
- docs/game-design.md:251 - ### Water / Flow Path
- docs/game-design.md:255 - * water
- docs/game-design.md:256 - * flow
- docs/game-design.md:258 - * passive accumulation
- docs/game-design.md:263 - * Meaning/sec
- docs/game-design.md:264 - * passive income
- docs/game-design.md:271 - * Water
- docs/game-design.md:272 - * Rain
- docs/game-design.md:273 - * River
- docs/game-design.md:274 - * Stream
- docs/game-design.md:275 - * Flow
- docs/game-design.md:282 - WATER
- docs/game-design.md:283 - Adds small passive Meaning/sec.
- docs/game-design.md:285 - RAIN
- docs/game-design.md:286 - Improves passive income.
- docs/game-design.md:288 - RIVER
- docs/game-design.md:289 - Passive income scales slowly over time.
- docs/game-design.md:291 - FLOW
- docs/game-design.md:292 - Later verb/concept. Makes meaning continue moving.
- docs/game-design.md:294 - ### Dream / Chance Path
- docs/game-design.md:298 - * dreams
- docs/game-design.md:301 - * rare events
- docs/game-design.md:303 - * risk and reward
- docs/game-design.md:307 - * random bonuses
- docs/game-design.md:315 - * Dream
- docs/game-design.md:322 - * Echo
- docs/game-design.md:328 - 1% chance per stamp to gain 100x tap value.
- docs/game-design.md:331 - Randomizes bonus size.
- docs/game-design.md:334 - Rare massive burst of Meaning.
- docs/game-design.md:349 - GROW
- docs/game-design.md:351 - Path: Farm/Nature
- docs/game-design.md:354 - RIVER
- docs/game-design.md:356 - Path: Water/Flow
- docs/game-design.md:357 - Effect: passive income
- docs/game-design.md:361 - Grow River
- docs/game-design.md:363 - Meaning:
- docs/game-design.md:365 - A Farm-path action applied to a Water-path noun.
- docs/game-design.md:380 - * World
- docs/game-design.md:381 - * Farm
- docs/game-design.md:382 - * Water
- docs/game-design.md:383 - * River
- docs/game-design.md:384 - * Soil
- docs/game-design.md:385 - * Dream
- docs/game-design.md:400 - * Grow
- docs/game-design.md:401 - * Flow
- docs/game-design.md:415 - * create bonuses and drawbacks
- docs/game-design.md:432 - * one tap action
- docs/game-design.md:433 - * one resource: Meaning
- docs/game-design.md:446 - * adjectives and verbs modify nouns
- docs/game-design.md:448 - * builds become strange and powerful
- docs/game-design.md:452 - Lucky Farm
- docs/game-design.md:453 - Manual taps have a small chance to trigger a harvest bonus.
- docs/game-design.md:455 - Heavy Rain
- docs/game-design.md:456 - Passive income is stronger but slower.
- docs/game-design.md:458 - Miracle World
- docs/game-design.md:459 - Rare chance for massive Meaning burst.
- docs/game-design.md:461 - Grow River
- docs/game-design.md:462 - Passive income slowly increases over time.
- docs/game-design.md:464 - Rooted Dream
- docs/game-design.md:465 - Random effects become more stable.
- docs/game-design.md:491 - Farm / Ground / Nature path
- docs/game-design.md:492 - Green, earthy brown, soil tones
- docs/game-design.md:494 - Water / Flow path
- docs/game-design.md:497 - Dream / Chance path
- docs/game-design.md:498 - Purple, violet, pink, dark dream tones
- docs/game-design.md:552 - GROW
- docs/game-design.md:554 - Farm Path
- docs/game-design.md:557 - RIVER
- docs/game-design.md:559 - Water Path
- docs/game-design.md:560 - Generates passive Meaning.
- docs/game-design.md:568 - GROW → RIVER
- docs/game-design.md:570 - The player should visually understand:
- docs/game-design.md:572 - * GROW is a Farm-path verb
- docs/game-design.md:573 - * RIVER is a Water-path noun
- docs/game-design.md:574 - * the sentence applies a Farm action to a Water object
- docs/game-design.md:583 - This keeps the UI readable when words from different paths and types are combined.
- docs/game-design.md:591 - * Start with World
- docs/game-design.md:592 - * Tap World
- docs/game-design.md:593 - * Stamp appears where tapped
- docs/game-design.md:594 - * Gain +0.01 Meaning
- docs/game-design.md:604 - Is tapping a word, gaining Meaning, and unlocking the next word/path satisfying?
- docs/game-design.md:611 - * Whether first choice is Farm vs Water only, or includes Dream/Chance
- docs/game-design.md:613 - * Exact effects for Farm and Water
- docs/game-design.md:616 - * When passive income begins
- docs/game-design.md:617 - * When random/luck path appears
- docs/game-design.md:625 - World → first path choice → first small word tree
- docs/game-design.md:629 - WORLD
- docs/game-design.md:631 - +0.01 Meaning per tap
- docs/game-design.md:637 - FARM
- docs/game-design.md:639 - Higher tap value
- docs/game-design.md:640 - Unlocks growth-related words
- docs/game-design.md:644 - WATER
- docs/game-design.md:645 - Flow/idle path
- docs/game-design.md:646 - Small passive Meaning/sec
- docs/game-design.md:647 - Unlocks passive-flow words
- docs/game-design.md:649 - Dream/Chance path should probably appear slightly later, after the player understands manual vs idle.
- docs/game-design.md:658 - * The Dictionary should become the upgrade tree.
- docs/game-design.md:662 - * Avoid generic upgrades if a word can do the job.
- docs/progression-scale.md:7 - * Later progression should accelerate strongly through unlocked words, paths, and sentence combos.
- docs/progression-scale.md:11 - ## Meaning Scale
- docs/progression-scale.md:13 - * 0.01 to 1 Meaning: slow manual World stamping.
- docs/progression-scale.md:14 - * 1 Meaning: first path choice.
- docs/progression-scale.md:15 - * 10 Meaning: next word in chosen path.
- docs/progression-scale.md:16 - * 100 Meaning: first major structural unlock, likely second sentence slot.
- docs/progression-scale.md:17 - * 1,000 Meaning: first modifier/early combo layer.
- docs/progression-scale.md:18 - * 10,000 Meaning: stronger path synergy.
- docs/progression-scale.md:19 - * 100,000 Meaning: automation or major acceleration tool.
- docs/progression-scale.md:20 - * 1,000,000 Meaning: first prestige/New Edition territory.
- docs/progression-scale.md:21 - * 1B+ Meaning: deep systems, grammar/reality editing later.
- docs/progression-scale.md:26 - * Do not add tools randomly.
- docs/progression-scale.md:27 - * Each tool should change how Meaning is generated.
- docs/progression-scale.md:30 - * Explosive progression must be controlled by limits: sentence slots, path restrictions, word types, costs, instability later, and prestige.
- docs/progression-scale.md:32 - ## Player Speed Bands
- docs/progression-scale.md:34 - * Low path: passive or weak choices, slower progress.
- docs/progression-scale.md:37 - * Random path: unreliable, sometimes huge bursts.
- docs/progression-scale.md:41 - * World starts at +0.01 Meaning/tap.
- docs/progression-scale.md:42 - * First path choice currently appears at 1 Meaning.
- docs/progression-scale.md:44 - * Farm/Manual path should improve active tapping.
- docs/progression-scale.md:45 - * Water/Flow path should improve passive Meaning/sec.
- docs/progression-scale.md:46 - * Rain currently provides +0.006 Meaning/sec to smooth the Water 10 -> 25 segment.
- docs/progression-scale.md:47 - * Dream/Chance path should appear later and focus on rare high-value events.
- docs/progression-scale.md:51 - * Meaning Bloom grants max(current Meaning * 10%, current tap gain * 10).
- docs/progression-scale.md:52 - * Final upgrade costs use max(discounted cost, base cost * 25%, 0.1 Meaning).
- docs/progression-scale.md:53 - * Normal event delay has a hard minimum of 90 seconds after frequency bonuses.
- docs/progression-scale.md:58 - * Build only the next tool needed for the next Meaning range.
- docs/word-pool-map.md:3 - This is a planning reference for the first shared, Farm, Flow, and Dream word pools. The listed powers are metadata only unless marked implemented.
- docs/word-pool-map.md:8 - * Each word should eventually have base production plus a special rule.
- docs/word-pool-map.md:9 - * Upgrades provide general scaling.
- docs/word-pool-map.md:11 - * Events provide temporary bursts.
- docs/word-pool-map.md:16 - | Unlock Meaning | Word | Type | Path | Tap | Passive | Possible power | Status |
- docs/word-pool-map.md:18 - | 0 | World | noun | Starter / Universal | 0.01 | 0 | The first word. A small beginning for all Meaning. | Implemented |
- docs/word-pool-map.md:19 - | 100 | Understand | verb | Universal | 0 | 0 | Doubles the next noun's base values and supported special-effect magnitude | Implemented |
- docs/word-pool-map.md:21 - ## Farm / Ground Path
- docs/word-pool-map.md:23 - Role: active/manual progression, tapping power, stamping events, and strong active scaling.
- docs/word-pool-map.md:25 - | Unlock Meaning | Word | Type | Path | Tap | Passive | Possible power | Status |
- docs/word-pool-map.md:27 - | 2 | Farm | noun | Farm / Ground Path | 0.02 | 0 | +25% path tapping bonus | Implemented |
- docs/word-pool-map.md:28 - | 10 | Seed | noun | Farm / Ground Path | 0.03 | 0 | Stamp Upgrade bonus +10% | Implemented |
- docs/word-pool-map.md:29 - | 25 | Soil | noun | Farm / Ground Path | 0.05 | 0 | Stamp Upgrade cost -5% | Implemented |
- docs/word-pool-map.md:30 - | 50 | Root | noun | Farm / Ground Path | 0.08 | 0 | Every 25th stamp gives x5 tap gain | Implemented |
- docs/word-pool-map.md:31 - | 100 | Grow | verb | Farm / Ground Path | 0.12 | 0 | Adds 0.5% of current Meaning to tap gain | Planned |
- docs/word-pool-map.md:32 - | 500 | Harvest | verb | Farm / Ground Path | 0.22 | 0 | Once per run, harvest a paired word and retain its base production until reset | Planned |
- docs/word-pool-map.md:33 - | 1,000 | Orchard | noun | Farm / Ground Path | 0.40 | 0 | +10% total tap gain | Planned |
- docs/word-pool-map.md:34 - | 5,000 | Plow | verb | Farm / Ground Path | 0.75 | 0 | Buying Stamp Upgrade has chance for +1 extra level | Planned |
- docs/word-pool-map.md:35 - | 10,000 | Fertile | adjective | Farm / Ground Path | 1.40 | 0 | Improves Farm sentence synergies later | Planned |
- docs/word-pool-map.md:36 - | 50,000 | Season | noun | Farm / Ground Path | 2.50 | 0 | 60-second tap cycle moving from x0.5 to x2.0 | Planned |
- docs/word-pool-map.md:38 - ## Flow / Water Path
- docs/word-pool-map.md:40 - Role: passive/idle progression, Meaning/sec, waiting and returning, and efficiency.
- docs/word-pool-map.md:42 - | Unlock Meaning | Word | Type | Path | Tap | Passive | Possible power | Status |
- docs/word-pool-map.md:44 - | 2 | Water | noun | Water / Flow Path | 0.005 | 0.003 | +25% path idle bonus | Implemented |
- docs/word-pool-map.md:45 - | 10 | Rain | noun | Water / Flow Path | 0.005 | 0.006 | Filing Upgrade bonus +10% | Implemented |
- docs/word-pool-map.md:46 - | 25 | Stream | noun | Water / Flow Path | 0.005 | 0.008 | Every 8 seconds, gain 3 seconds worth of passive Meaning | Implemented |
- docs/word-pool-map.md:47 - | 50 | River | noun | Water / Flow Path | 0.005 | 0.02 | Passive gain grows +1% per minute while active, capped at +200% | Implemented |
- docs/word-pool-map.md:48 - | 100 | Flow | verb | Water / Flow Path | 0.005 | 0.05 | Every 5 active idle minutes, trigger 30 seconds of +50% gains | Planned |
- docs/word-pool-map.md:49 - | 500 | Ice | noun | Water / Flow Path | 0.005 | 0.12 | Stores active idle gain; a tap releases twice the stored amount | Planned |
- docs/word-pool-map.md:50 - | 1,000 | Pour | verb | Water / Flow Path | 0 | 0 | Converts a percentage of idle gain into tap power | Planned |
- docs/word-pool-map.md:51 - | 500 | Reservoir | noun | Water / Flow Path | 0.005 | 0.12 | Stores bonus Meaning while idle later | Planned |
- docs/word-pool-map.md:52 - | 1,000 | Tide | noun | Water / Flow Path | 0.005 | 0.30 | Flow event bonus stronger | Planned |
- docs/word-pool-map.md:53 - | 5,000 | Current | noun | Water / Flow Path | 0.005 | 0.75 | Flow events last longer | Planned |
- docs/word-pool-map.md:54 - | 10,000 | Flood | verb | Water / Flow Path | 0.005 | 1.80 | Passive bursts every 30 seconds later | Planned |
- docs/word-pool-map.md:55 - | 50,000 | Ocean | noun | Water / Flow Path | 0.005 | 4.00 | +10% total passive gain | Planned |
- docs/word-pool-map.md:57 - ## Dream / Chance Path
- docs/word-pool-map.md:59 - Role: later random events, burst gains, strange synergies, and unstable high-value moments. Dream is not part of the first Farm/Flow choice.
- docs/word-pool-map.md:61 - | Unlock Meaning | Word | Type | Path | Tap | Passive | Possible power | Status |
- docs/word-pool-map.md:63 - | 100 | Slumber | noun | Dream / Chance Path | 0.03 | 0.03 | Events appear 30% more often | Implemented |
- docs/word-pool-map.md:64 - | 100 | Dream | noun | Dream / Chance Path | 0.01 | 0.01 | Unlocks Dream-style random events later | Planned |
- docs/word-pool-map.md:65 - | 250 | Echo | noun | Dream / Chance Path | 0.01 | 0.01 | Recursive 50% extra-tap chance, capped at 10 | Planned |
- docs/word-pool-map.md:66 - | 500 | Clock | noun | Dream / Chance Path | 0.01 | 0.01 | Every 24 seconds, 24% chance for a time-based Meaning reward | Planned |
- docs/word-pool-map.md:67 - | 1,000 | Remember | verb | Dream / Chance Path | 0 | 0 | Chance-based noun effects +20% | Planned |
- docs/word-pool-map.md:68 - | 5,000 | Acquire | verb | Dream / Chance Path | 0 | 0 | May allow learning words from other paths | Planned |
- docs/word-pool-map.md:69 - | 500 | Chance | noun | Dream / Chance Path | 0.01 | 0.01 | Random event rewards +10% | Planned |
- docs/word-pool-map.md:70 - | 1,000 | Dice | noun | Dream / Chance Path | 0.01 | 0.01 | Small chance for x5 tap | Planned |
- docs/word-pool-map.md:71 - | 5,000 | Omen | noun | Dream / Chance Path | 0.01 | 0.01 | Reveals or improves upcoming special effects/events | Planned |
- docs/word-pool-map.md:72 - | 25,000 | Lucid | adjective | Dream / Chance Path | 0.01 | 0.01 | Stabilizes Dream randomness | Planned |
- docs/word-pool-map.md:73 - | 100,000 | Mirror | noun | Dream / Chance Path | 0.01 | 0.01 | Copies part of another word's base statistics | Planned |
- docs/word-pool-map.md:74 - | 250,000 | Nightmare | noun | Dream / Chance Path | 0.01 | 0.01 | High reward paired with a drawback | Planned |
- docs/word-pool-map.md:75 - | 10,000 | Vision | noun | Dream / Chance Path | 0.01 | 0.01 | Event rectangles stay visible longer | Planned |
- docs/word-pool-map.md:76 - | 50,000 | Sleep | noun | Dream / Chance Path | 0.01 | 0.01 | Chance for idle burst later | Planned |
- docs/word-pool-map.md:77 - | 100,000 | Whim | noun | Dream / Chance Path | 0.01 | 0.01 | Random temporary multiplier later | Planned |
- docs/word-pool-map.md:78 - | 500,000 | Miracle | noun | Dream / Chance Path | 0.01 | 0.01 | Rare huge reward later | Planned |
- docs/word-pool-map.md:79 - | 1,000,000 | Accident | noun | Dream / Chance Path | 0.01 | 0.01 | Expired/failed events may still give partial reward later | Planned |
- index.html:9 - <div id="root"></div>
- package-lock.json:338 - "node_modules/@esbuild/android-arm": {
- package-lock.json:340 - "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
- package-lock.json:349 - "android"
- package-lock.json:355 - "node_modules/@esbuild/android-arm64": {
- package-lock.json:357 - "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
- package-lock.json:366 - "android"
- package-lock.json:372 - "node_modules/@esbuild/android-x64": {
- package-lock.json:374 - "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
- package-lock.json:383 - "android"
- package-lock.json:762 - "node_modules/@nodelib/fs.scandir": {
- package-lock.json:764 - "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
- package-lock.json:793 - "@nodelib/fs.scandir": "2.1.5",
- package-lock.json:807 - "node_modules/@rollup/rollup-android-arm-eabi": {
- package-lock.json:809 - "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.62.0.tgz",
- package-lock.json:818 - "android"
- package-lock.json:821 - "node_modules/@rollup/rollup-android-arm64": {
- package-lock.json:823 - "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.62.0.tgz",
- package-lock.json:832 - "android"
- package-lock.json:1497 - "fsevents": "~2.3.2"
- package-lock.json:1513 - "node_modules/commander": {
- package-lock.json:1515 - "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
- package-lock.json:1614 - "@esbuild/android-arm": "0.21.5",
- package-lock.json:1615 - "@esbuild/android-arm64": "0.21.5",
- package-lock.json:1616 - "@esbuild/android-x64": "0.21.5",
- package-lock.json:1715 - "node_modules/fsevents": {
- package-lock.json:1717 - "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
- package-lock.json:1893 - "node_modules/lines-and-columns": {
- package-lock.json:1895 - "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
- package-lock.json:2369 - "@rollup/rollup-android-arm-eabi": "4.62.0",
- package-lock.json:2370 - "@rollup/rollup-android-arm64": "4.62.0",
- package-lock.json:2394 - "fsevents": "~2.3.2"
- package-lock.json:2458 - "commander": "^4.0.0",
- package-lock.json:2459 - "lines-and-columns": "^1.1.6",
- package-lock.json:2688 - "fsevents": "~2.3.3"
- src/App.tsx:4 - ActivePathEvent,
- src/App.tsx:7 - SessionStats,
- src/App.tsx:9 - VisiblePathEvent,
- src/App.tsx:11 - WorkbenchGridSlot,
- src/App.tsx:14 - import { formatMeaning, formatRate } from './utils/format';
- src/App.tsx:20 - import WordUpgradesMessage from './components/WordUpgradesMessage';
- src/App.tsx:23 - import StatsScreen from './components/StatsScreen';
- src/App.tsx:25 - import { getHundredMeaningUnlockWordIds } from './utils/milestones';
- src/App.tsx:26 - import { canTriggerDreamUnlock, unlockDreamLayer } from './utils/dream';
- src/App.tsx:28 - getActiveWordTapMultiplier,
- src/App.tsx:29 - getPassiveGain,
- src/App.tsx:30 - getTapGain,
- src/App.tsx:31 - getEffectiveFilingUpgradeCost,
- src/App.tsx:32 - getEffectiveStampUpgradeCost,
- src/App.tsx:33 - getUpgradeMilestoneMultiplier,
- src/App.tsx:34 - } from './utils/upgrades';
- src/App.tsx:36 - createActivePathEvent,
- src/App.tsx:37 - createVisiblePathEvent,
- src/App.tsx:38 - getActivePathEventSecondsRemaining,
- src/App.tsx:39 - getEventSpawnMultiplier,
- src/App.tsx:40 - getFarmEventTapMultiplier,
- src/App.tsx:41 - getFlowEventIdleMultiplier,
- src/App.tsx:42 - getMeaningBloomGain,
- src/App.tsx:43 - getNextPathEventDelayMs,
- src/App.tsx:44 - getRandomVisibleEventType,
- src/App.tsx:45 - getSoftenedRulesUpgradeCostMultiplier,
- src/App.tsx:46 - } from './utils/pathEvents';
- src/App.tsx:48 - FIRST_VERB_WORKBENCH_SLOT,
- src/App.tsx:49 - STARTING_WORKBENCH_SLOT,
- src/App.tsx:50 - getNearestWorkbenchSlot,
- src/App.tsx:51 - moveWorkbenchWordToSlot,
- src/App.tsx:52 - parseWorkbenchSentence,
- src/App.tsx:53 - placeWorkbenchWord,
- src/App.tsx:54 - unlockWorkbenchSlotsForProgress,
- src/App.tsx:55 - } from './utils/workbench';
- src/App.tsx:58 - createDefaultSessionStats,
- src/App.tsx:59 - recordEventClaim,
- src/App.tsx:60 - recordEventSpawn,
- src/App.tsx:61 - recordPassiveGain,
- src/App.tsx:62 - recordTap,
- src/App.tsx:63 - recordUpgradePurchase,
- src/App.tsx:64 - } from './utils/stats.ts';
- src/App.tsx:66 - getStreamDrizzleGain,
- src/App.tsx:67 - isStreamDrizzleActive,
- src/App.tsx:68 - STREAM_DRIZZLE_INTERVAL_SECONDS,
- src/App.tsx:69 - } from './utils/stream.ts';
- src/App.tsx:71 - const TEN_MEANING_MILESTONE = 10;
- src/App.tsx:72 - const TWENTY_FIVE_MEANING_MILESTONE = 25;
- src/App.tsx:73 - const FIFTY_MEANING_MILESTONE = 50;
- src/App.tsx:74 - const HUNDRED_MEANING_MILESTONE = 100;
- src/App.tsx:75 - const PASSIVE_TICK_MS = 1000;
- src/App.tsx:82 - const [sessionStats, setSessionStats] = useState<SessionStats>(() => createDefaultSessionStats());
- src/App.tsx:84 - const [, setNotice] = useState('Tap World to stamp Meaning into the record.');
- src/App.tsx:85 - const [visiblePathEvent, setVisiblePathEvent] = useState<VisiblePathEvent | null>(null);
- src/App.tsx:86 - const [activePathEvent, setActivePathEvent] = useState<ActivePathEvent | null>(null);
- src/App.tsx:87 - const [dreamPromptDismissed, setDreamPromptDismissed] = useState(false);
- src/App.tsx:89 - const nextEventTimerRef = useRef<number | null>(null);
- src/App.tsx:90 - const visibleEventTimerRef = useRef<number | null>(null);
- src/App.tsx:99 - () => parseWorkbenchSentence(gameState.workbenchBoard, gameState.activeNounId),
- src/App.tsx:100 - [gameState.activeNounId, gameState.workbenchBoard],
- src/App.tsx:110 - const verbSlotUnlocked = gameState.unlockedWordIds.includes('understand');
- src/App.tsx:119 - const activeEventSecondsRemaining = getActivePathEventSecondsRemaining(activePathEvent, now);
- src/App.tsx:120 - const farmEventTapMultiplier = getFarmEventTapMultiplier(activePathEvent);
- src/App.tsx:121 - const flowEventIdleMultiplier = getFlowEventIdleMultiplier(activePathEvent, gameState.filingUpgradeLevel);
- src/App.tsx:122 - const softenedRulesCostMultiplier = getSoftenedRulesUpgradeCostMultiplier(activePathEvent);
- src/App.tsx:123 - const currentTapGain = mul(
- src/App.tsx:124 - getTapGain(effectiveNoun, gameState.stampUpgradeLevel, effectiveVerb),
- src/App.tsx:125 - farmEventTapMultiplier,
- src/App.tsx:127 - const currentPassiveGain = mul(
- src/App.tsx:128 - getPassiveGain(
- src/App.tsx:130 - gameState.filingUpgradeLevel,
- src/App.tsx:135 - flowEventIdleMultiplier,
- src/App.tsx:137 - const currentPassiveGainRef = useRef(currentPassiveGain);
- src/App.tsx:138 - const activeEventLabel = activePathEvent && activeEventSecondsRemaining > 0
- src/App.tsx:139 - ? `${activePathEvent.name}: ${activeEventSecondsRemaining}s`
- src/App.tsx:141 - const canShowDreamPrompt =
- src/App.tsx:142 - canTriggerDreamUnlock(gameState.meaning, effectiveNoun, effectiveVerb, gameState.dreamUnlocked) &&
- src/App.tsx:143 - !dreamPromptDismissed;
- src/App.tsx:146 - return `Choose Farm or Water at ${formatMeaning(FIRST_CHOICE_COST)} Meaning.`;
- src/App.tsx:149 - if (!gameState.tenMeaningMilestoneGranted) {
- src/App.tsx:150 - return `Next milestone: new path word at ${formatMeaning(TEN_MEANING_MILESTONE)} Meaning.`;
- src/App.tsx:153 - if (!gameState.twentyFiveMeaningMilestoneGranted) {
- src/App.tsx:154 - return `Next milestone: new path word at ${formatMeaning(TWENTY_FIVE_MEANING_MILESTONE)} Meaning.`;
- src/App.tsx:157 - if (!gameState.fiftyMeaningMilestoneGranted) {
- src/App.tsx:158 - return `Next milestone: new path word at ${formatMeaning(FIFTY_MEANING_MILESTONE)} Meaning.`;
- src/App.tsx:161 - if (!gameState.hundredMeaningMilestoneGranted) {
- src/App.tsx:162 - return `Next milestone: path verb at ${formatMeaning(HUNDRED_MEANING_MILESTONE)} Meaning.`;
- src/App.tsx:165 - return 'Next milestone: Dream path and stronger sentence tools coming soon.';
- src/App.tsx:175 - gameState.meaning,
- src/App.tsx:181 - gameState.passiveMeaningPerSecond,
- src/App.tsx:182 - gameState.tenMeaningMilestoneGranted,
- src/App.tsx:183 - gameState.twentyFiveMeaningMilestoneGranted,
- src/App.tsx:184 - gameState.fiftyMeaningMilestoneGranted,
- src/App.tsx:185 - gameState.hundredMeaningMilestoneGranted,
- src/App.tsx:188 - gameState.stampUpgradeLevel,
- src/App.tsx:189 - gameState.filingUpgradeLevel,
- src/App.tsx:190 - gameState.workbenchLayout,
- src/App.tsx:191 - gameState.workbenchBoard,
- src/App.tsx:192 - gameState.dreamUnlocked,
- src/App.tsx:193 - gameState.totalMeaningEarned,
- src/App.tsx:194 - gameState.stats,
- src/App.tsx:197 - const clearPathEventTimers = useCallback(() => {
- src/App.tsx:198 - if (nextEventTimerRef.current) {
- src/App.tsx:199 - window.clearTimeout(nextEventTimerRef.current);
- src/App.tsx:200 - nextEventTimerRef.current = null;
- src/App.tsx:203 - if (visibleEventTimerRef.current) {
- src/App.tsx:204 - window.clearTimeout(visibleEventTimerRef.current);
- src/App.tsx:205 - visibleEventTimerRef.current = null;
- src/App.tsx:209 - const scheduleNextPathEvent = useCallback((
- src/App.tsx:211 - dreamUnlocked: boolean,
- src/App.tsx:215 - const eventType = getRandomVisibleEventType(chosenFirstPath, dreamUnlocked);
- src/App.tsx:217 - if (!eventType) {
- src/App.tsx:221 - if (nextEventTimerRef.current) {
- src/App.tsx:222 - window.clearTimeout(nextEventTimerRef.current);
- src/App.tsx:225 - nextEventTimerRef.current = window.setTimeout(() => {
- src/App.tsx:226 - setVisiblePathEvent(createVisiblePathEvent(eventType));
- src/App.tsx:227 - setGameState((current) => ({ ...current, stats: recordEventSpawn(current.stats) }));
- src/App.tsx:228 - setSessionStats((current) => recordEventSpawn(current));
- src/App.tsx:229 - nextEventTimerRef.current = null;
- src/App.tsx:230 - }, getNextPathEventDelayMs(getEventSpawnMultiplier(activeWordForSchedule, effectiveVerbForSchedule)));
- src/App.tsx:234 - clearPathEventTimers();
- src/App.tsx:235 - setVisiblePathEvent(null);
- src/App.tsx:236 - setActivePathEvent(null);
- src/App.tsx:237 - scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
- src/App.tsx:239 - return clearPathEventTimers;
- src/App.tsx:241 - clearPathEventTimers,
- src/App.tsx:244 - gameState.dreamUnlocked,
- src/App.tsx:245 - scheduleNextPathEvent,
- src/App.tsx:249 - if (!visiblePathEvent) {
- src/App.tsx:253 - if (visibleEventTimerRef.current) {
- src/App.tsx:254 - window.clearTimeout(visibleEventTimerRef.current);
- src/App.tsx:257 - visibleEventTimerRef.current = window.setTimeout(() => {
- src/App.tsx:258 - setVisiblePathEvent(null);
- src/App.tsx:259 - scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
- src/App.tsx:260 - visibleEventTimerRef.current = null;
- src/App.tsx:261 - }, Math.max(0, visiblePathEvent.expiresAt - Date.now()));
- src/App.tsx:264 - if (visibleEventTimerRef.current) {
- src/App.tsx:265 - window.clearTimeout(visibleEventTimerRef.current);
- src/App.tsx:266 - visibleEventTimerRef.current = null;
- src/App.tsx:272 - gameState.dreamUnlocked,
- src/App.tsx:273 - scheduleNextPathEvent,
- src/App.tsx:274 - visiblePathEvent,
- src/App.tsx:278 - setDreamPromptDismissed(false);
- src/App.tsx:282 - gameState.workbenchBoard,
- src/App.tsx:301 - stats: {
- src/App.tsx:302 - ...current.stats,
- src/App.tsx:303 - totalPlayTimeMs: current.stats.totalPlayTimeMs + elapsedMs,
- src/App.tsx:312 - const nextWorkbenchBoard = unlockWorkbenchSlotsForProgress(gameState.workbenchBoard, gameState.meaning);
- src/App.tsx:314 - if (nextWorkbenchBoard === gameState.workbenchBoard) {
- src/App.tsx:320 - workbenchBoard: unlockWorkbenchSlotsForProgress(current.workbenchBoard, current.meaning),
- src/App.tsx:323 - gameState.meaning,

# Priority files


## package.json

```json
{
  "name": "idle-word-office",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "test": "node --experimental-strip-types --experimental-specifier-resolution=node tests/game-logic.test.ts",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "break_infinity.js": "^2.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.5.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.6.2",
    "vite": "^5.4.1"
  }
}

```


## vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

```


## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```


## src/main.tsx

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```


## src/App.tsx

```ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getUnlockChoices, getUnlockedWords, getWordById } from './data/words';
import type {
  ActivePathEvent,
  AppTab,
  GameState,
  SessionStats,
  StampEffect,
  VisiblePathEvent,
  WordId,
  WorkbenchGridSlot,
} from './types/game';
import { loadGameState, resetGameState, saveGameState } from './utils/storage';
import { formatMeaning, formatRate } from './utils/format';
import { add, eq, lt, lte, mul, sub } from './utils/bigNumber.ts';
import ResourceBar from './components/ResourceBar';
import WordCard from './components/WordCard';
import PathChoicePanel from './components/PathChoicePanel';
import DictionaryScreen from './components/DictionaryScreen';
import WordUpgradesMessage from './components/WordUpgradesMessage';
import PathBlock from './components/PathBlock';
import QuoteFeed from './components/QuoteFeed';
import StatsScreen from './components/StatsScreen';
import { createDefaultState, mergeSavedState } from './utils/gameState';
import { getHundredMeaningUnlockWordIds } from './utils/milestones';
import { canTriggerDreamUnlock, unlockDreamLayer } from './utils/dream';
import {
  getActiveWordTapMultiplier,
  getPassiveGain,
  getTapGain,
  getEffectiveFilingUpgradeCost,
  getEffectiveStampUpgradeCost,
  getUpgradeMilestoneMultiplier,
} from './utils/upgrades';
import {
  createActivePathEvent,
  createVisiblePathEvent,
  getActivePathEventSecondsRemaining,
  getEventSpawnMultiplier,
  getFarmEventTapMultiplier,
  getFlowEventIdleMultiplier,
  getMeaningBloomGain,
  getNextPathEventDelayMs,
  getRandomVisibleEventType,
  getSoftenedRulesUpgradeCostMultiplier,
} from './utils/pathEvents';
import {
  FIRST_VERB_WORKBENCH_SLOT,
  STARTING_WORKBENCH_SLOT,
  getNearestWorkbenchSlot,
  moveWorkbenchWordToSlot,
  parseWorkbenchSentence,
  placeWorkbenchWord,
  unlockWorkbenchSlotsForProgress,
} from './utils/workbench';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from './utils/progression.ts';
import {
  createDefaultSessionStats,
  recordEventClaim,
  recordEventSpawn,
  recordPassiveGain,
  recordTap,
  recordUpgradePurchase,
} from './utils/stats.ts';
import {
  getStreamDrizzleGain,
  isStreamDrizzleActive,
  STREAM_DRIZZLE_INTERVAL_SECONDS,
} from './utils/stream.ts';

const TEN_MEANING_MILESTONE = 10;
const TWENTY_FIVE_MEANING_MILESTONE = 25;
const FIFTY_MEANING_MILESTONE = 50;
const HUNDRED_MEANING_MILESTONE = 100;
const PASSIVE_TICK_MS = 1000;
const STAMP_LIFETIME_MS = 850;
const IS_DEV_MODE = import.meta.env.DEV;

function App() {
  const [gameState, setGameState] = useState<GameState>(() => mergeSavedState(loadGameState()));
  const [activeTab, setActiveTab] = useState<AppTab>('main');
  const [sessionStats, setSessionStats] = useState<SessionStats>(() => createDefaultSessionStats());
  const [stamps, setStamps] = useState<StampEffect[]>([]);
  const [, setNotice] = useState('Tap World to stamp Meaning into the record.');
  const [visiblePathEvent, setVisiblePathEvent] = useState<VisiblePathEvent | null>(null);
  const [activePathEvent, setActivePathEvent] = useState<ActivePathEvent | null>(null);
  const [dreamPromptDismissed, setDreamPromptDismissed] = useState(false);
  const [now, setNow] = useState(Date.now());
  const nextEventTimerRef = useRef<number | null>(null);
  const visibleEventTimerRef = useRef<number | null>(null);
  const lastPlayTimeUpdateRef = useRef(Date.now());

  const activeNoun = useMemo(() => getWordById(gameState.activeNounId), [gameState.activeNounId]);
  const activeVerb = useMemo(
    () => (gameState.activeVerbId ? getWordById(gameState.activeVerbId) : null),
    [gameState.activeVerbId],
  );
  const parsedSentence = useMemo(
    () => parseWorkbenchSentence(gameState.workbenchBoard, gameState.activeNounId),
    [gameState.activeNounId, gameState.workbenchBoard],
  );
  const effectiveVerb = useMemo(
    () => (parsedSentence.effectiveVerbId ? getWordById(parsedSentence.effectiveVerbId) : null),
    [parsedSentence.effectiveVerbId],
  );
  const effectiveNoun = useMemo(
    () => getWordById(parsedSentence.activeNounId),
    [parsedSentence.activeNounId],
  );
  const verbSlotUnlocked = gameState.unlockedWordIds.includes('understand');
  const unlockedWords = useMemo(
    () => getUnlockedWords(gameState.unlockedWordIds),
    [gameState.unlockedWordIds],
  );
  const unlockChoices = useMemo(
    () => getUnlockChoices(gameState.chosenFirstPath),
    [gameState.chosenFirstPath],
  );
  const activeEventSecondsRemaining = getActivePathEventSecondsRemaining(activePathEvent, now);
  const farmEventTapMultiplier = getFarmEventTapMultiplier(activePathEvent);
  const flowEventIdleMultiplier = getFlowEventIdleMultiplier(activePathEvent, gameState.filingUpgradeLevel);
  const softenedRulesCostMultiplier = getSoftenedRulesUpgradeCostMultiplier(activePathEvent);
  const currentTapGain = mul(
    getTapGain(effectiveNoun, gameState.stampUpgradeLevel, effectiveVerb),
    farmEventTapMultiplier,
  );
  const currentPassiveGain = mul(
    getPassiveGain(
      effectiveNoun,
      gameState.filingUpgradeLevel,
      gameState.activeWordStartedAt,
      now,
      effectiveVerb,
    ),
    flowEventIdleMultiplier,
  );
  const currentPassiveGainRef = useRef(currentPassiveGain);
  const activeEventLabel = activePathEvent && activeEventSecondsRemaining > 0
    ? `${activePathEvent.name}: ${activeEventSecondsRemaining}s`
    : null;
  const canShowDreamPrompt =
    canTriggerDreamUnlock(gameState.meaning, effectiveNoun, effectiveVerb, gameState.dreamUnlocked) &&
    !dreamPromptDismissed;
  const currentMilestone = (() => {
    if (!gameState.chosenFirstPath) {
      return `Choose Farm or Water at ${formatMeaning(FIRST_CHOICE_COST)} Meaning.`;
    }

    if (!gameState.tenMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(TEN_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.twentyFiveMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(TWENTY_FIVE_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.fiftyMeaningMilestoneGranted) {
      return `Next milestone: new path word at ${formatMeaning(FIFTY_MEANING_MILESTONE)} Meaning.`;
    }

    if (!gameState.hundredMeaningMilestoneGranted) {
      return `Next milestone: path verb at ${formatMeaning(HUNDRED_MEANING_MILESTONE)} Meaning.`;
    }

    return 'Next milestone: Dream path and stronger sentence tools coming soon.';
  })();

  useEffect(() => {
    const lastSavedAt = Date.now();
    const nextState = { ...gameState, lastSavedAt };

    saveGameState(nextState);
    setGameState((current) => ({ ...current, lastSavedAt }));
  }, [
    gameState.meaning,
    gameState.activeNounId,
    gameState.activeVerbId,
    gameState.activeWordId,
    gameState.unlockedWordIds,
    gameState.chosenFirstPath,
    gameState.passiveMeaningPerSecond,
    gameState.tenMeaningMilestoneGranted,
    gameState.twentyFiveMeaningMilestoneGranted,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.hundredMeaningMilestoneGranted,
    gameState.manualStampCount,
    gameState.activeWordStartedAt,
    gameState.stampUpgradeLevel,
    gameState.filingUpgradeLevel,
    gameState.workbenchLayout,
    gameState.workbenchBoard,
    gameState.dreamUnlocked,
    gameState.totalMeaningEarned,
    gameState.stats,
  ]);

  const clearPathEventTimers = useCallback(() => {
    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
      nextEventTimerRef.current = null;
    }

    if (visibleEventTimerRef.current) {
      window.clearTimeout(visibleEventTimerRef.current);
      visibleEventTimerRef.current = null;
    }
  }, []);

  const scheduleNextPathEvent = useCallback((
    chosenFirstPath: WordId | null,
    dreamUnlocked: boolean,
    activeWordForSchedule = effectiveNoun,
    effectiveVerbForSchedule = effectiveVerb,
  ) => {
    const eventType = getRandomVisibleEventType(chosenFirstPath, dreamUnlocked);

    if (!eventType) {
      return;
    }

    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
    }

    nextEventTimerRef.current = window.setTimeout(() => {
      setVisiblePathEvent(createVisiblePathEvent(eventType));
      setGameState((current) => ({ ...current, stats: recordEventSpawn(current.stats) }));
      setSessionStats((current) => recordEventSpawn(current));
      nextEventTimerRef.current = null;
    }, getNextPathEventDelayMs(getEventSpawnMultiplier(activeWordForSchedule, effectiveVerbForSchedule)));
  }, [effectiveNoun, effectiveVerb]);

  useEffect(() => {
    clearPathEventTimers();
    setVisiblePathEvent(null);
    setActivePathEvent(null);
    scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);

    return clearPathEventTimers;
  }, [
    clearPathEventTimers,
    effectiveNoun,
    gameState.chosenFirstPath,
    gameState.dreamUnlocked,
    scheduleNextPathEvent,
  ]);

  useEffect(() => {
    if (!visiblePathEvent) {
      return;
    }

    if (visibleEventTimerRef.current) {
      window.clearTimeout(visibleEventTimerRef.current);
    }

    visibleEventTimerRef.current = window.setTimeout(() => {
      setVisiblePathEvent(null);
      scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
      visibleEventTimerRef.current = null;
    }, Math.max(0, visiblePathEvent.expiresAt - Date.now()));

    return () => {
      if (visibleEventTimerRef.current) {
        window.clearTimeout(visibleEventTimerRef.current);
        visibleEventTimerRef.current = null;
      }
    };
  }, [
    effectiveNoun,
    gameState.chosenFirstPath,
    gameState.dreamUnlocked,
    scheduleNextPathEvent,
    visiblePathEvent,
  ]);

  useEffect(() => {
    setDreamPromptDismissed(false);
  }, [
    gameState.activeNounId,
    gameState.activeVerbId,
    gameState.workbenchBoard,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      const elapsedMs = Math.max(0, timestamp - lastPlayTimeUpdateRef.current);
      lastPlayTimeUpdateRef.current = timestamp;

      setGameState((current) => ({
        ...current,
        stats: {
          ...current.stats,
          totalPlayTimeMs: current.stats.totalPlayTimeMs + elapsedMs,
        },
      }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextWorkbenchBoard = unlockWorkbenchSlotsForProgress(gameState.workbenchBoard, gameState.meaning);

    if (nextWorkbenchBoard === gameState.workbenchBoard) {
      return;
    }

    setGameState((current) => ({
      ...current,
      workbenchBoard: unlockWorkbenchSlotsForProgress(current.workbenchBoard, current.meaning),
    }));
  }, [
    gameState.meaning,
    gameState.workbenchBoard,
  ]);

  useEffect(() => {
    if (!activePathEvent || activePathEvent.endsAt > now) {
      return;
    }

    setActivePathEvent(null);
  }, [
    activePathEvent,
    now,
  ]);

  useEffect(() => {
    const nextPassiveMeaningPerSecond = currentPassiveGain;

    if (eq(gameState.passiveMeaningPerSecond, nextPassiveMeaningPerSecond)) {
      return;
    }

    setGameState((current) => ({
      ...current,
      passiveMeaningPerSecond: nextPassiveMeaningPerSecond,
    }));
  }, [
    effectiveNoun,
    effectiveVerb,
    currentPassiveGain,
    gameState.activeWordStartedAt,
    gameState.filingUpgradeLevel,
    gameState.passiveMeaningPerSecond,
  ]);

  useEffect(() => {
    currentPassiveGainRef.current = currentPassiveGain;
  }, [currentPassiveGain]);

  useEffect(() => {
    if (!isStreamDrizzleActive(effectiveNoun)) {
      return;
    }

    const timer = window.setInterval(() => {
      const passiveRate = currentPassiveGainRef.current;
      const streamGain = getStreamDrizzleGain(passiveRate, effectiveNoun, effectiveVerb);

      if (lte(streamGain, 0)) {
        return;
      }

      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, streamGain),
        totalMeaningEarned: add(current.totalMeaningEarned, streamGain),
        stats: recordPassiveGain(current.stats, streamGain, passiveRate),
      }));
      setSessionStats((current) => recordPassiveGain(current, streamGain, passiveRate));
      setNotice(`Stream: +${formatMeaning(streamGain)} Meaning`);

      const feedbackId = Date.now() + Math.random();
      setStamps((current) => [
        ...current,
        {
          id: feedbackId,
          x: '50%',
          y: '50%',
          value: streamGain,
          label: 'STREAM',
        },
      ]);
      window.setTimeout(() => {
        setStamps((current) => current.filter((stamp) => stamp.id !== feedbackId));
      }, STAMP_LIFETIME_MS);
    }, STREAM_DRIZZLE_INTERVAL_SECONDS * 1000);

    return () => window.clearInterval(timer);
  }, [effectiveNoun, effectiveVerb]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      gameState.tenMeaningMilestoneGranted ||
      lt(gameState.meaning, TEN_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'seed' : 'rain';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        current.tenMeaningMilestoneGranted ||
        !current.chosenFirstPath ||
        lt(current.meaning, TEN_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        tenMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.meaning,
    gameState.tenMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.tenMeaningMilestoneGranted ||
      gameState.twentyFiveMeaningMilestoneGranted ||
      lt(gameState.meaning, TWENTY_FIVE_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'soil' : 'stream';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.tenMeaningMilestoneGranted ||
        current.twentyFiveMeaningMilestoneGranted ||
        lt(current.meaning, TWENTY_FIVE_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        twentyFiveMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.meaning,
    gameState.tenMeaningMilestoneGranted,
    gameState.twentyFiveMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.twentyFiveMeaningMilestoneGranted ||
      gameState.fiftyMeaningMilestoneGranted ||
      lt(gameState.meaning, FIFTY_MEANING_MILESTONE)
    ) {
      return;
    }

    const milestoneWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'root' : 'river';
    const milestoneWord = getWordById(milestoneWordId);

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.twentyFiveMeaningMilestoneGranted ||
        current.fiftyMeaningMilestoneGranted ||
        lt(current.meaning, FIFTY_MEANING_MILESTONE)
      ) {
        return current;
      }

      return {
        ...current,
        unlockedWordIds: current.unlockedWordIds.includes(milestoneWordId)
          ? current.unlockedWordIds
          : [...current.unlockedWordIds, milestoneWordId],
        fiftyMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New word acquired: ${milestoneWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.meaning,
    gameState.twentyFiveMeaningMilestoneGranted,
  ]);

  useEffect(() => {
    if (
      !gameState.chosenFirstPath ||
      !gameState.fiftyMeaningMilestoneGranted ||
      gameState.hundredMeaningMilestoneGranted ||
      lt(gameState.meaning, HUNDRED_MEANING_MILESTONE)
    ) {
      return;
    }

    const pathWordId: WordId = gameState.chosenFirstPath === 'farm' ? 'grow' : 'flow';
    const pathWord = getWordById(pathWordId);
    const understandWord = getWordById('understand');

    setGameState((current) => {
      if (
        !current.chosenFirstPath ||
        !current.fiftyMeaningMilestoneGranted ||
        current.hundredMeaningMilestoneGranted ||
        lt(current.meaning, HUNDRED_MEANING_MILESTONE)
      ) {
        return current;
      }

      const wordsToUnlock = getHundredMeaningUnlockWordIds(current.chosenFirstPath);

      return {
        ...current,
        unlockedWordIds: Array.from(new Set<WordId>([
          ...current.unlockedWordIds,
          ...wordsToUnlock,
        ])),
        hundredMeaningMilestoneGranted: true,
      };
    });
    setNotice(`New words acquired: ${pathWord.text} and ${understandWord.text}`);
  }, [
    gameState.chosenFirstPath,
    gameState.fiftyMeaningMilestoneGranted,
    gameState.hundredMeaningMilestoneGranted,
    gameState.meaning,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const passiveGain = mul(
        getPassiveGain(
          effectiveNoun,
          gameState.filingUpgradeLevel,
          gameState.activeWordStartedAt,
          Date.now(),
          effectiveVerb,
        ),
        getFlowEventIdleMultiplier(activePathEvent, gameState.filingUpgradeLevel),
      );

      if (lte(passiveGain, 0)) {
        return;
      }

      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, passiveGain),
        totalMeaningEarned: add(current.totalMeaningEarned, passiveGain),
        passiveMeaningPerSecond: passiveGain,
        stats: recordPassiveGain(current.stats, passiveGain, passiveGain),
      }));
      setSessionStats((current) => recordPassiveGain(current, passiveGain, passiveGain));
    }, PASSIVE_TICK_MS);

    return () => window.clearInterval(timer);
  }, [
    activePathEvent,
    effectiveNoun,
    effectiveVerb,
    gameState.activeWordStartedAt,
    gameState.filingUpgradeLevel,
  ]);

  const handleStamp = (x: number, y: number) => {
    const stampId = Date.now() + Math.random();
    const nextManualStampCount = gameState.manualStampCount + 1;
    const activeWordTapMultiplier = getActiveWordTapMultiplier(effectiveNoun, nextManualStampCount, effectiveVerb);
    const stampedValue = mul(currentTapGain, activeWordTapMultiplier);
    const stampedLabel = activeWordTapMultiplier > 1
      ? `Root bonus: +${formatMeaning(stampedValue)} Meaning`
      : `${effectiveNoun.text} stamped: +${formatMeaning(stampedValue)} Meaning`;

    setGameState((current) => {
      const currentParsedSentence = parseWorkbenchSentence(current.workbenchBoard, current.activeNounId);
      const currentActiveWord = getWordById(currentParsedSentence.activeNounId);
      const currentActiveVerb = currentParsedSentence.effectiveVerbId
        ? getWordById(currentParsedSentence.effectiveVerbId)
        : null;
      const nextCurrentManualStampCount = current.manualStampCount + 1;
      const baseTapGain = mul(
        getTapGain(currentActiveWord, current.stampUpgradeLevel, currentActiveVerb),
        getFarmEventTapMultiplier(activePathEvent),
      );
      const currentActiveWordTapMultiplier = getActiveWordTapMultiplier(
        currentActiveWord,
        nextCurrentManualStampCount,
        currentActiveVerb,
      );
      const tapGain = mul(baseTapGain, currentActiveWordTapMultiplier);

      return {
        ...current,
        meaning: add(current.meaning, tapGain),
        totalMeaningEarned: add(current.totalMeaningEarned, tapGain),
        activeWordId: currentActiveWord.id,
        activeNounId: currentActiveWord.id,
        manualStampCount: nextCurrentManualStampCount,
        stats: recordTap(current.stats, tapGain),
      };
    });
    setSessionStats((current) => recordTap(current, stampedValue));
    setNotice(stampedLabel);
    setStamps((current) => [
      ...current,
      {
        id: stampId,
        x,
        y,
        value: stampedValue,
      },
    ]);

    window.setTimeout(() => {
      setStamps((current) => current.filter((stamp) => stamp.id !== stampId));
    }, STAMP_LIFETIME_MS);
  };

  const handleChooseWord = (wordId: WordId) => {
    const word = getWordById(wordId);

    setGameState((current) => {
      if (current.chosenFirstPath || !isFirstPathChoiceUnlocked(current.meaning) || word.id === 'world') {
        return current;
      }

      return {
        ...current,
        meaning: sub(current.meaning, word.unlockCost),
        activeNounId: word.id,
        activeWordId: word.id,
        unlockedWordIds: [...current.unlockedWordIds, word.id],
        chosenFirstPath: word.id,
        workbenchBoard: placeWorkbenchWord(current.workbenchBoard, word.id, current.activeNounId, STARTING_WORKBENCH_SLOT),
        activeWordStartedAt: Date.now(),
        passiveMeaningPerSecond: getPassiveGain(word, current.filingUpgradeLevel, Date.now(), Date.now(), null),
      };
    });
    setNotice(`${word.text} approved as the next word.`);
  };

  const handleSelectWord = (wordId: WordId) => {
    if (!gameState.unlockedWordIds.includes(wordId)) {
      return;
    }

    const word = getWordById(wordId);

    if (word.type === 'verb') {
      setGameState((current) => {
        const nextWorkbenchBoard = placeWorkbenchWord(
          current.workbenchBoard,
          wordId,
          current.activeVerbId,
          FIRST_VERB_WORKBENCH_SLOT,
        );
        const nextSentence = parseWorkbenchSentence(nextWorkbenchBoard, current.activeNounId);
        const nextNoun = getWordById(nextSentence.activeNounId);
        const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

        return {
          ...current,
          activeVerbId: wordId,
          activeNounId: nextNoun.id,
          activeWordId: nextNoun.id,
          workbenchBoard: nextWorkbenchBoard,
          passiveMeaningPerSecond: getPassiveGain(
            nextNoun,
            current.filingUpgradeLevel,
            current.activeWordStartedAt,
            Date.now(),
            nextVerb,
          ),
        };
      });
      setActiveTab('main');
      setNotice(`${word.text} is now the active verb.`);
      return;
    }

    if (word.type !== 'noun') {
      setNotice('Only noun and verb slots are available.');
      return;
    }

    setGameState((current) => {
      const nextWorkbenchBoard = placeWorkbenchWord(
        current.workbenchBoard,
        wordId,
        current.activeNounId,
        STARTING_WORKBENCH_SLOT,
      );
      const nextSentence = parseWorkbenchSentence(nextWorkbenchBoard, wordId);
      const nextNoun = getWordById(nextSentence.activeNounId);
      const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

      return {
        ...current,
        activeNounId: nextNoun.id,
        activeWordId: nextNoun.id,
        workbenchBoard: nextWorkbenchBoard,
        activeWordStartedAt: Date.now(),
        passiveMeaningPerSecond: getPassiveGain(
          nextNoun,
          current.filingUpgradeLevel,
          Date.now(),
          Date.now(),
          nextVerb,
        ),
      };
    });
    setActiveTab('main');
    setNotice(`${word.text} is now the active noun.`);
  };

  const handleUnavailableSentenceControl = () => {
    setNotice('More word slots coming soon.');
  };

  const handlePathEventClick = (event: VisiblePathEvent) => {
    if (event.type === 'dream-bloom') {
      const meaningGain = getMeaningBloomGain(gameState.meaning, currentTapGain);

      setVisiblePathEvent(null);
      setGameState((current) => ({
        ...current,
        meaning: add(current.meaning, meaningGain),
        totalMeaningEarned: add(current.totalMeaningEarned, meaningGain),
        stats: recordEventClaim(current.stats, event.type, meaningGain),
      }));
      setSessionStats((current) => recordEventClaim(current, event.type, meaningGain));
      scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);
      setNotice(`Meaning Bloom: +${formatMeaning(meaningGain)} Meaning`);
      return;
    }

    const nextActiveEvent = createActivePathEvent(event);

    setVisiblePathEvent(null);
    setActivePathEvent(nextActiveEvent);
    setGameState((current) => ({ ...current, stats: recordEventClaim(current.stats, event.type) }));
    setSessionStats((current) => recordEventClaim(current, event.type));
    scheduleNextPathEvent(gameState.chosenFirstPath, gameState.dreamUnlocked, effectiveNoun);

    if (event.type === 'farm') {
      setNotice('Harvest Window active: tapping x2 for 20s');
      return;
    }

    if (event.type === 'water') {
      setNotice('Clear Current active: idle gain increased for 20s');
      return;
    }

    setNotice('Softened Rules active: upgrade costs -25% for 20s');
  };

  const handleDevSpawnPathEvent = () => {
    const eventType = getRandomVisibleEventType(gameState.chosenFirstPath, gameState.dreamUnlocked);

    if (!eventType) {
      setNotice('Choose Farm or Water or unlock Dream before spawning an event.');
      return;
    }

    if (nextEventTimerRef.current) {
      window.clearTimeout(nextEventTimerRef.current);
      nextEventTimerRef.current = null;
    }

    setVisiblePathEvent(createVisiblePathEvent(eventType));
    setGameState((current) => ({ ...current, stats: recordEventSpawn(current.stats) }));
    setSessionStats((current) => recordEventSpawn(current));
    setNotice('Dev test event spawned.');
  };

  const handleBuyStampUpgrade = () => {
    const cost = getEffectiveStampUpgradeCost(
      gameState.stampUpgradeLevel,
      effectiveNoun,
      effectiveVerb,
      softenedRulesCostMultiplier,
    );

    if (lt(gameState.meaning, cost)) {
      return;
    }

    const nextLevel = gameState.stampUpgradeLevel + 1;

    setGameState((current) => {
      const currentActiveNoun = getWordById(current.activeNounId);
      const currentActiveVerb = current.activeVerbId ? getWordById(current.activeVerbId) : null;
      const currentCost = getEffectiveStampUpgradeCost(
        current.stampUpgradeLevel,
        currentActiveNoun,
        currentActiveVerb,
        getSoftenedRulesUpgradeCostMultiplier(activePathEvent),
      );

      if (lt(current.meaning, currentCost)) {
        return current;
      }

      return {
        ...current,
        meaning: sub(current.meaning, currentCost),
        stampUpgradeLevel: current.stampUpgradeLevel + 1,
        stats: recordUpgradePurchase(current.stats),
      };
    });
    setSessionStats((current) => recordUpgradePurchase(current));

    if (getUpgradeMilestoneMultiplier(nextLevel) > getUpgradeMilestoneMultiplier(nextLevel - 1)) {
      setNotice(`Stamp Upgrade milestone reached: x${getUpgradeMilestoneMultiplier(nextLevel)} tapping bonus`);
      return;
    }

    setNotice('Stamp Upgrade increased.');
  };

  const handleBuyFilingUpgrade = () => {
    const cost = getEffectiveFilingUpgradeCost(
      gameState.filingUpgradeLevel,
      effectiveNoun,
      effectiveVerb,
      softenedRulesCostMultiplier,
    );

    if (lt(gameState.meaning, cost)) {
      return;
    }

    const nextLevel = gameState.filingUpgradeLevel + 1;

    setGameState((current) => {
      const currentActiveNoun = getWordById(current.activeNounId);
      const currentActiveVerb = current.activeVerbId ? getWordById(current.activeVerbId) : null;
      const currentCost = getEffectiveFilingUpgradeCost(
        current.filingUpgradeLevel,
        currentActiveNoun,
        currentActiveVerb,
        getSoftenedRulesUpgradeCostMultiplier(activePathEvent),
      );

      if (lt(current.meaning, currentCost)) {
        return current;
      }

      const nextFilingUpgradeLevel = current.filingUpgradeLevel + 1;

      return {
        ...current,
        meaning: sub(current.meaning, currentCost),
        filingUpgradeLevel: nextFilingUpgradeLevel,
        stats: recordUpgradePurchase(current.stats),
        passiveMeaningPerSecond: getPassiveGain(
          currentActiveNoun,
          nextFilingUpgradeLevel,
          current.activeWordStartedAt,
          Date.now(),
          currentActiveVerb,
        ),
      };
    });
    setSessionStats((current) => recordUpgradePurchase(current));

    if (getUpgradeMilestoneMultiplier(nextLevel) > getUpgradeMilestoneMultiplier(nextLevel - 1)) {
      setNotice(`Filing Upgrade milestone reached: x${getUpgradeMilestoneMultiplier(nextLevel)} idle bonus`);
      return;
    }

    setNotice('Filing Upgrade increased.');
  };

  const handleMoveWorkbenchWord = (wordId: WordId, xPercent: number, yPercent: number) => {
    const targetSlot = getNearestWorkbenchSlot(xPercent, yPercent);

    setGameState((current) => {
      const moveResult = moveWorkbenchWordToSlot(current.workbenchBoard, wordId, targetSlot);

      if (!moveResult.moved) {
        setNotice('That sentence slot is locked.');
        return current;
      }

      const nextSentence = parseWorkbenchSentence(moveResult.board, current.activeNounId);
      const nextNoun = getWordById(nextSentence.activeNounId);
      const nextVerb = nextSentence.effectiveVerbId ? getWordById(nextSentence.effectiveVerbId) : null;

      return {
        ...current,
        activeNounId: nextNoun.id,
        activeWordId: nextNoun.id,
        workbenchBoard: moveResult.board,
        passiveMeaningPerSecond: getPassiveGain(
          nextNoun,
          current.filingUpgradeLevel,
          current.activeWordStartedAt,
          Date.now(),
          nextVerb,
        ),
      };
    });
  };

  const handleResetWorkbenchLayout = () => {
    setGameState((current) => {
      const placements = {
        [current.activeNounId]: STARTING_WORKBENCH_SLOT,
      };

      return {
        ...current,
        workbenchBoard: {
          ...current.workbenchBoard,
          placements: current.activeVerbId && current.workbenchBoard.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT)
            ? { ...placements, [current.activeVerbId]: FIRST_VERB_WORKBENCH_SLOT }
            : placements,
        },
      };
    });
    setNotice('Workbench layout reset.');
  };

  const handleReset = () => {
    resetGameState();
    setGameState(createDefaultState());
    const resetAt = Date.now();
    lastPlayTimeUpdateRef.current = resetAt;
    setSessionStats(createDefaultSessionStats(resetAt));
    setActiveTab('main');
    setStamps([]);
    setDreamPromptDismissed(false);
    setNotice('Tap World to stamp Meaning into the record.');
  };

  const handleEnterDream = () => {
    setGameState(unlockDreamLayer);
    setDreamPromptDismissed(false);
    setNotice('Dream entered. New word acquired: Slumber');
  };

  const handleDeclineDream = () => {
    setDreamPromptDismissed(true);
    setNotice('Dream postponed.');
  };

  return (
    <main className={`h-dvh overflow-hidden px-4 py-4 text-ink sm:px-6 ${
      gameState.dreamUnlocked ? 'bg-[#f4e8f1]' : 'bg-paper'
    }`}>
      <div className={`mx-auto grid h-full w-full max-w-2xl grid-rows-[auto_auto_minmax(0,1fr)] rounded-lg border shadow-[0_18px_45px_rgba(61,43,27,0.16)] ${
        gameState.dreamUnlocked
          ? 'border-[#cdb0d6] bg-[#fff7fb]'
          : 'border-[#d7c3a3] bg-[#fffaf0]'
      }`}>
        <header className="border-b border-[#e3d2b7] px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase text-stone-500">Bureau of Ordinary Terms</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#27211a]">Approved Text</h1>
        </header>

        <ResourceBar
          meaning={formatMeaning(gameState.meaning)}
          passiveMeaningPerSecond={formatRate(currentPassiveGain)}
          activeWord={parsedSentence.sentenceText || effectiveNoun.text}
          pathLabel={effectiveNoun.pathLabel}
          activeEventLabel={activeEventLabel}
        />

        <section className="min-h-0 overflow-y-auto p-4 pb-24">
          {activeTab === 'main' ? (
            <div className="grid min-h-full content-start gap-3">
              <PathBlock activeWord={effectiveNoun} milestone={currentMilestone} />

              {canShowDreamPrompt ? (
                <section className="rounded-lg border-2 border-[#9b6aa8] bg-[#f7ecfb] p-3 shadow-sm">
                  <p className="text-sm font-bold text-[#35263d]">
                    We often understand our world by dreaming about it.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleEnterDream}
                      className="min-h-10 rounded bg-[#6d4a9a] px-3 py-2 text-sm font-bold text-white shadow-sm active:translate-y-px"
                    >
                      Enter Dream
                    </button>
                    <button
                      type="button"
                      onClick={handleDeclineDream}
                      className="min-h-10 rounded border border-[#cbb5d6] bg-white px-3 py-2 text-sm font-bold text-[#5d4770] shadow-sm active:translate-y-px"
                    >
                      Not yet
                    </button>
                  </div>
                </section>
              ) : null}

              {/* Future rule: sentences should eventually allow only one active word per grammatical type/category. */}
              <WordCard
                noun={effectiveNoun}
                verb={activeVerb}
                effectiveVerb={effectiveVerb}
                verbSlotUnlocked={verbSlotUnlocked}
                manualStampCount={gameState.manualStampCount}
                activeWordStartedAt={gameState.activeWordStartedAt}
                now={now}
                tapGain={currentTapGain}
                passiveGain={currentPassiveGain}
                visiblePathEvent={visiblePathEvent}
                board={gameState.workbenchBoard}
                stamps={stamps}
                onStamp={handleStamp}
                onPathEventClick={handlePathEventClick}
                onUnavailableSlot={handleUnavailableSentenceControl}
                onMoveWord={handleMoveWorkbenchWord}
                onResetLayout={handleResetWorkbenchLayout}
              />

              <QuoteFeed />

              <PathChoicePanel
                meaning={gameState.meaning}
                chosenFirstPath={gameState.chosenFirstPath}
                choices={unlockChoices}
                onChooseWord={handleChooseWord}
              />

              <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-9 rounded border border-stone-300 bg-white px-3 py-1 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 active:translate-y-px"
                >
                  Reset Save
                </button>
                {IS_DEV_MODE ? (
                  <button
                    type="button"
                    onClick={handleDevSpawnPathEvent}
                    className="min-h-9 rounded border border-[#b89764] bg-[#fff7e8] px-3 py-1 text-sm font-semibold text-[#6f4f24] shadow-sm transition hover:bg-white active:translate-y-px"
                  >
                    Dev Event
                  </button>
                ) : null}
                <span>
                  {gameState.lastSavedAt
                    ? `Last saved ${new Date(gameState.lastSavedAt).toLocaleTimeString()}`
                    : 'Not saved yet'}
                </span>
              </div>
            </div>
          ) : null}

          {activeTab === 'dictionary' ? (
            <DictionaryScreen
              unlockedWords={unlockedWords}
              activeNounId={gameState.activeNounId}
              activeVerbId={gameState.activeVerbId}
              onSelectWord={handleSelectWord}
            />
          ) : null}

          {activeTab === 'upgrades' ? (
            <WordUpgradesMessage
              meaning={gameState.meaning}
              activeWord={effectiveNoun}
              activeVerb={effectiveVerb}
              stampUpgradeLevel={gameState.stampUpgradeLevel}
              filingUpgradeLevel={gameState.filingUpgradeLevel}
              upgradeCostMultiplier={softenedRulesCostMultiplier}
              onBuyStampUpgrade={handleBuyStampUpgrade}
              onBuyFilingUpgrade={handleBuyFilingUpgrade}
            />
          ) : null}

          {activeTab === 'stats' ? (
            <StatsScreen
              gameState={gameState}
              sessionStats={sessionStats}
              currentTapGain={currentTapGain}
              currentPassiveGain={currentPassiveGain}
              currentSentence={parsedSentence.sentenceText || effectiveNoun.text}
              now={now}
            />
          ) : null}
        </section>

        <nav className="fixed bottom-0 left-1/2 z-50 grid w-full max-w-2xl -translate-x-1/2 grid-cols-4 border border-b-0 border-[#d7c3a3] bg-[#f7eddb] p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(61,43,27,0.14)]">
          {(['main', 'dictionary', 'upgrades', 'stats'] as AppTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 rounded text-sm font-bold capitalize transition ${
                activeTab === tab
                  ? 'bg-[#2d2922] text-[#fff8e9]'
                  : 'text-stone-600 hover:bg-[#fffaf0]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}

export default App;

```


## src/data/words.ts

```ts
import type { PathTheme, WordDefinition, WordId, WordType } from '../types/game';

type WordInput = Omit<WordDefinition, 'definition' | 'unlockCost' | 'unlocked'> & {
  unlocked?: boolean;
};

function createWord(input: WordInput): WordDefinition {
  return {
    ...input,
    definition: input.description,
    unlockCost: input.unlockMeaning,
    unlocked: input.unlocked ?? false,
  };
}

const farmPath = {
  pathId: 'manual' as const,
  pathLabel: 'Farm / Ground Path',
  pathTheme: 'farm' as const,
};

const flowPath = {
  pathId: 'idle' as const,
  pathLabel: 'Water / Flow Path',
  pathTheme: 'water' as const,
};

const dreamPath = {
  pathId: 'chance' as const,
  pathLabel: 'Dream / Chance Path',
  pathTheme: 'chance' as const,
};

export const words: WordDefinition[] = [
  createWord({
    id: 'world',
    text: 'World',
    type: 'noun',
    pathId: 'starter',
    pathLabel: 'Starter / Universal',
    pathTheme: 'starter',
    description: 'The first word. A small beginning for all Meaning.',
    unlockMeaning: 0,
    tapValue: 0.01,
    passiveValue: 0,
    effectDescription: 'The first word. A small beginning for all Meaning.',
    specialEffectType: 'none',
    specialEffectValue: null,
    implemented: true,
    unlocked: true,
    unlocks: ['farm', 'water'],
  }),
  createWord({
    id: 'apple',
    text: 'Apple',
    type: 'noun',
    pathId: 'starter',
    pathLabel: 'Legacy Starter',
    pathTheme: 'starter',
    description: 'A previous first word kept only so old saves can migrate safely.',
    unlockMeaning: 0,
    tapValue: 0.01,
    passiveValue: 0,
    effectDescription: 'Legacy starter word.',
    specialEffectType: 'none',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'understand',
    text: 'Understand',
    type: 'verb',
    pathId: 'starter',
    pathLabel: 'Universal',
    pathTheme: 'starter',
    description: 'A first official action applied to an approved noun.',
    unlockMeaning: 100,
    tapValue: 0,
    passiveValue: 0,
    effectDescription: 'Doubles the active noun base tap and passive values.',
    specialEffectType: 'double_noun_base',
    specialEffectValue: 2,
    implemented: true,
  }),
  createWord({
    id: 'farm',
    text: 'Farm',
    type: 'noun',
    ...farmPath,
    description: 'A controlled area where approved things are permitted to grow.',
    unlockMeaning: 1,
    tapValue: 0.02,
    passiveValue: 0,
    effectDescription: '+25% path tapping bonus.',
    specialEffectType: 'tap_multiplier',
    specialEffectValue: 1.25,
    implemented: true,
  }),
  createWord({
    id: 'seed',
    text: 'Seed',
    type: 'noun',
    ...farmPath,
    description: 'A small approved beginning with permission to become more.',
    unlockMeaning: 10,
    tapValue: 0.03,
    passiveValue: 0,
    effectDescription: 'Stamp Upgrade bonus +10%.',
    specialEffectType: 'stamp_upgrade_bonus_multiplier',
    specialEffectValue: 1.1,
    implemented: true,
  }),
  createWord({
    id: 'soil',
    text: 'Soil',
    type: 'noun',
    ...farmPath,
    description: 'Ground made suitable for official growth.',
    unlockMeaning: 25,
    tapValue: 0.05,
    passiveValue: 0,
    effectDescription: 'Stamp Upgrade cost -5%.',
    specialEffectType: 'stamp_upgrade_discount',
    specialEffectValue: 0.95,
    implemented: true,
  }),
  createWord({
    id: 'root',
    text: 'Root',
    type: 'noun',
    ...farmPath,
    description: 'A buried support structure for approved growth.',
    unlockMeaning: 50,
    tapValue: 0.08,
    passiveValue: 0,
    effectDescription: 'Every 25th stamp gives x5 tap gain.',
    specialEffectType: 'tap_multiplier',
    specialEffectValue: 5,
    implemented: true,
  }),
  createWord({
    id: 'grow',
    text: 'Grow',
    type: 'verb',
    ...farmPath,
    description: 'An action word authorizing small things to become larger.',
    unlockMeaning: 100,
    tapValue: 0.12,
    passiveValue: 0,
    effectDescription: 'Planned: adds 0.5% of current Meaning to tap gain.',
    specialEffectType: 'current_meaning_tap_bonus',
    specialEffectValue: 0.005,
    implemented: false,
  }),
  createWord({
    id: 'harvest',
    text: 'Harvest',
    type: 'verb',
    ...farmPath,
    description: 'The official gathering of completed growth.',
    unlockMeaning: 500,
    tapValue: 0.22,
    passiveValue: 0,
    effectDescription: 'Planned: harvest a paired word once per run and retain its base production until reset.',
    specialEffectType: 'harvest_word_for_run',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'orchard',
    text: 'Orchard',
    type: 'noun',
    ...farmPath,
    description: 'A managed collection of fruit-bearing approvals.',
    unlockMeaning: 1000,
    tapValue: 0.4,
    passiveValue: 0,
    effectDescription: '+10% total tap gain.',
    specialEffectType: 'tap_multiplier',
    specialEffectValue: 1.1,
    implemented: false,
  }),
  createWord({
    id: 'plow',
    text: 'Plow',
    type: 'verb',
    ...farmPath,
    description: 'A tool-action for preparing future production.',
    unlockMeaning: 5000,
    tapValue: 0.75,
    passiveValue: 0,
    effectDescription: 'Buying Stamp Upgrade has chance for +1 extra level.',
    specialEffectType: 'chance_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'fertile',
    text: 'Fertile',
    type: 'adjective',
    ...farmPath,
    description: 'A modifier indicating unusually productive conditions.',
    unlockMeaning: 10000,
    tapValue: 1.4,
    passiveValue: 0,
    effectDescription: 'Improves Farm sentence synergies later.',
    specialEffectType: 'future_sentence_synergy',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'season',
    text: 'Season',
    type: 'noun',
    ...farmPath,
    description: 'A measured period in which growth becomes meaningful.',
    unlockMeaning: 50000,
    tapValue: 2.5,
    passiveValue: 0,
    effectDescription: 'Planned: a 60-second cycle moves tap strength from x0.5 to x2.0.',
    specialEffectType: 'season_cycle',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'water',
    text: 'Water',
    type: 'noun',
    ...flowPath,
    description: 'A permitted fluid with a tendency to move without supervision.',
    unlockMeaning: 1,
    tapValue: 0.005,
    passiveValue: 0.003,
    effectDescription: '+25% path idle bonus.',
    specialEffectType: 'passive_multiplier',
    specialEffectValue: 1.25,
    implemented: true,
  }),
  createWord({
    id: 'rain',
    text: 'Rain',
    type: 'noun',
    ...flowPath,
    description: 'Water arriving from above, already sorted into many small approvals.',
    unlockMeaning: 10,
    tapValue: 0.005,
    passiveValue: 0.006,
    effectDescription: 'Filing Upgrade bonus +10%.',
    specialEffectType: 'filing_upgrade_bonus_multiplier',
    specialEffectValue: 1.1,
    implemented: true,
  }),
  createWord({
    id: 'stream',
    text: 'Stream',
    type: 'noun',
    ...flowPath,
    description: 'A narrow approved movement of water.',
    unlockMeaning: 25,
    tapValue: 0.005,
    passiveValue: 0.008,
    effectDescription: 'Every 8 seconds, gain 3 seconds worth of passive Meaning.',
    specialEffectType: 'periodic_passive_burst',
    specialEffectValue: 3,
    implemented: true,
  }),
  createWord({
    id: 'river',
    text: 'River',
    type: 'noun',
    ...flowPath,
    description: 'A larger moving body of approved water.',
    unlockMeaning: 50,
    tapValue: 0.005,
    passiveValue: 0.02,
    effectDescription: 'Passive gain grows +1% per minute, capped at +200%.',
    specialEffectType: 'passive_multiplier',
    specialEffectValue: 0.01,
    implemented: true,
  }),
  createWord({
    id: 'flow',
    text: 'Flow',
    type: 'verb',
    ...flowPath,
    description: 'An action word allowing meaning to continue moving.',
    unlockMeaning: 100,
    tapValue: 0.005,
    passiveValue: 0.05,
    effectDescription: 'Planned: every 5 active idle minutes triggers 30 seconds of +50% gains.',
    specialEffectType: 'timed_idle_surge',
    specialEffectValue: 1.5,
    implemented: false,
  }),
  createWord({
    id: 'ice',
    text: 'Ice',
    type: 'noun',
    ...flowPath,
    description: 'Water held still long enough to remember its shape.',
    unlockMeaning: 500,
    tapValue: 0.005,
    passiveValue: 0.12,
    effectDescription: 'Planned: stores part of active idle gain, then a tap releases twice the stored amount.',
    specialEffectType: 'store_idle_release',
    specialEffectValue: 2,
    implemented: false,
  }),
  createWord({
    id: 'pour',
    text: 'Pour',
    type: 'verb',
    ...flowPath,
    description: 'An instruction allowing stored flow to become deliberate action.',
    unlockMeaning: 1000,
    tapValue: 0,
    passiveValue: 0,
    effectDescription: 'Planned: converts a percentage of idle gain into tap power.',
    specialEffectType: 'idle_to_tap',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'reservoir',
    text: 'Reservoir',
    type: 'noun',
    ...flowPath,
    description: 'A stored body of approved water.',
    unlockMeaning: 500,
    tapValue: 0.005,
    passiveValue: 0.12,
    effectDescription: 'Stores bonus Meaning while idle later.',
    specialEffectType: 'offline_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'tide',
    text: 'Tide',
    type: 'noun',
    ...flowPath,
    description: 'A scheduled movement of water and implication.',
    unlockMeaning: 1000,
    tapValue: 0.005,
    passiveValue: 0.3,
    effectDescription: 'Flow event bonus stronger.',
    specialEffectType: 'event_strength_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'current',
    text: 'Current',
    type: 'noun',
    ...flowPath,
    description: 'A directional force within approved water.',
    unlockMeaning: 5000,
    tapValue: 0.005,
    passiveValue: 0.75,
    effectDescription: 'Flow events last longer.',
    specialEffectType: 'event_duration_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'flood',
    text: 'Flood',
    type: 'verb',
    ...flowPath,
    description: 'A sudden overflow of water permissions.',
    unlockMeaning: 10000,
    tapValue: 0.005,
    passiveValue: 1.8,
    effectDescription: 'Passive bursts every 30 seconds later.',
    specialEffectType: 'instant_event_reward',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'ocean',
    text: 'Ocean',
    type: 'noun',
    ...flowPath,
    description: 'The largest regular container of approved water.',
    unlockMeaning: 50000,
    tapValue: 0.005,
    passiveValue: 4,
    effectDescription: '+10% total passive gain.',
    specialEffectType: 'passive_multiplier',
    specialEffectValue: 1.1,
    implemented: false,
  }),
  createWord({
    id: 'dream',
    text: 'Dream',
    type: 'noun',
    ...dreamPath,
    description: 'A permitted unreality waiting outside the first paths.',
    unlockMeaning: 100,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Unlocks Dream-style random events later.',
    specialEffectType: 'chance_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'slumber',
    text: 'Slumber',
    type: 'noun',
    ...dreamPath,
    description: 'A half-waking word, balanced between action and stillness.',
    unlockMeaning: 100,
    tapValue: 0.03,
    passiveValue: 0.03,
    effectDescription: 'Increases event frequency by 30%.',
    specialEffectType: 'event_spawn_bonus',
    specialEffectValue: 0.3,
    implemented: true,
  }),
  createWord({
    id: 'echo',
    text: 'Echo',
    type: 'noun',
    ...dreamPath,
    description: 'A repeated sound of a previous approval.',
    unlockMeaning: 250,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Planned: each tap has a 50% recursive echo chance, capped at 10 extra taps.',
    specialEffectType: 'recursive_tap_chance',
    specialEffectValue: 0.5,
    implemented: false,
  }),
  createWord({
    id: 'clock',
    text: 'Clock',
    type: 'noun',
    ...dreamPath,
    description: 'A device that persuades uncertain moments to arrive on schedule.',
    unlockMeaning: 500,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Planned: every 24 seconds, a 24% chance grants roughly one minute of Meaning.',
    specialEffectType: 'timed_chance_reward',
    specialEffectValue: 0.24,
    implemented: false,
  }),
  createWord({
    id: 'remember',
    text: 'Remember',
    type: 'verb',
    ...dreamPath,
    description: 'An action that asks uncertain words to repeat what almost happened.',
    unlockMeaning: 1000,
    tapValue: 0,
    passiveValue: 0,
    effectDescription: 'Planned: increases chance-based noun effects by 20%.',
    specialEffectType: 'chance_effect_bonus',
    specialEffectValue: 1.2,
    implemented: false,
  }),
  createWord({
    id: 'acquire',
    text: 'Acquire',
    type: 'verb',
    ...dreamPath,
    description: 'An action for obtaining words whose paperwork belongs elsewhere.',
    unlockMeaning: 5000,
    tapValue: 0,
    passiveValue: 0,
    effectDescription: 'Planned: may allow learning words from other paths; exact rules are undecided.',
    specialEffectType: 'cross_path_acquisition',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'chance',
    text: 'Chance',
    type: 'noun',
    ...dreamPath,
    description: 'An approved uncertainty.',
    unlockMeaning: 500,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Random event rewards +10%.',
    specialEffectType: 'event_strength_bonus',
    specialEffectValue: 1.1,
    implemented: false,
  }),
  createWord({
    id: 'dice',
    text: 'Dice',
    type: 'noun',
    ...dreamPath,
    description: 'Small numbered objects that make uncertainty official.',
    unlockMeaning: 1000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Small chance for x5 tap.',
    specialEffectType: 'chance_bonus',
    specialEffectValue: 5,
    implemented: false,
  }),
  createWord({
    id: 'omen',
    text: 'Omen',
    type: 'noun',
    ...dreamPath,
    description: 'A sign that an unlikely approval may be approaching.',
    unlockMeaning: 5000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Planned: reveals or improves upcoming special effects and events.',
    specialEffectType: 'event_preview_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'lucid',
    text: 'Lucid',
    type: 'adjective',
    ...dreamPath,
    description: 'A quality of dreaming in which uncertainty becomes briefly manageable.',
    unlockMeaning: 25000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Planned: stabilizes Dream randomness.',
    specialEffectType: 'randomness_stabilizer',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'mirror',
    text: 'Mirror',
    type: 'noun',
    ...dreamPath,
    description: 'A reflective word that borrows the outline of another approved term.',
    unlockMeaning: 100000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: "Planned: copies part of another word's base statistics.",
    specialEffectType: 'copy_base_stats',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'nightmare',
    text: 'Nightmare',
    type: 'noun',
    ...dreamPath,
    description: 'A dangerous dream accepted despite a clearly attached warning form.',
    unlockMeaning: 250000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Planned: a high reward paired with a meaningful drawback.',
    specialEffectType: 'risk_reward',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'vision',
    text: 'Vision',
    type: 'noun',
    ...dreamPath,
    description: 'A glimpse of text before it becomes real.',
    unlockMeaning: 10000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Event rectangles stay visible longer.',
    specialEffectType: 'event_duration_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'sleep',
    text: 'Sleep',
    type: 'noun',
    ...dreamPath,
    description: 'A sanctioned absence from waking approval.',
    unlockMeaning: 50000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Chance for idle burst later.',
    specialEffectType: 'offline_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'whim',
    text: 'Whim',
    type: 'noun',
    ...dreamPath,
    description: 'A small unauthorized preference with surprising power.',
    unlockMeaning: 100000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Random temporary multiplier later.',
    specialEffectType: 'chance_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'miracle',
    text: 'Miracle',
    type: 'noun',
    ...dreamPath,
    description: 'A rare approval that should not have passed review.',
    unlockMeaning: 500000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Rare huge reward later.',
    specialEffectType: 'instant_event_reward',
    specialEffectValue: null,
    implemented: false,
  }),
  createWord({
    id: 'accident',
    text: 'Accident',
    type: 'noun',
    ...dreamPath,
    description: 'A mistake that reality decides to keep.',
    unlockMeaning: 1000000,
    tapValue: 0.01,
    passiveValue: 0.01,
    effectDescription: 'Expired/failed events may still give partial reward later.',
    specialEffectType: 'chance_bonus',
    specialEffectValue: null,
    implemented: false,
  }),
];

export function getWordById(wordId: WordId): WordDefinition {
  return words.find((word) => word.id === wordId) ?? words[0];
}

export function getUnlockedWords(unlockedWordIds: WordId[]): WordDefinition[] {
  return words.filter((word) => unlockedWordIds.includes(word.id));
}

export function getUnlockChoices(chosenFirstPath: WordId | null): WordDefinition[] {
  if (chosenFirstPath) {
    return [];
  }

  return words.filter((word) => word.id === 'farm' || word.id === 'water');
}

export function getWordTypeStyles(type: WordType): string {
  const styles: Record<WordType, string> = {
    noun: 'border-stone-500 bg-white text-stone-700',
    adjective: 'rounded-full border-stone-400 bg-white text-stone-700',
    verb: 'border-stone-700 bg-white text-stone-800',
  };

  return styles[type];
}

export function getPathThemeStyles(pathTheme: PathTheme): string {
  const styles: Record<PathTheme, string> = {
    starter: 'border-[#d6bc92] bg-[#fffdf6]',
    farm: 'border-[#6f7f35] bg-[#f0f5dd]',
    water: 'border-[#4f8ba0] bg-[#e7f5f7]',
    chance: 'border-[#8260a8] bg-[#f1e9fb]',
  };

  return styles[pathTheme];
}

export function getPathRibbonStyles(pathTheme: PathTheme): string {
  const styles: Record<PathTheme, string> = {
    starter: 'bg-[#9a6a36] text-white',
    farm: 'bg-[#5e6f2d] text-white',
    water: 'bg-[#2f778c] text-white',
    chance: 'bg-[#6d4a9a] text-white',
  };

  return styles[pathTheme];
}

```


## src/data/upgrades.ts

```ts
import type { UpgradeDefinition, UpgradePath } from '../types/game';

export const upgrades: UpgradeDefinition[] = [
  {
    id: 'better-basket',
    name: 'Better Basket',
    path: 'farm',
    cost: 1,
    description: 'A small basket for carrying officially recognized fruit.',
    effectLabel: 'World tap value +0.01',
    effectType: 'addTapValue',
    effectValue: 0.01,
  },
  {
    id: 'orchard-permit',
    name: 'Orchard Permit',
    path: 'farm',
    cost: 5,
    description: 'The Office now permits worlds to exist in larger quantities.',
    effectLabel: 'World tap value x2',
    effectType: 'multiplyTapValue',
    effectValue: 2,
  },
  {
    id: 'harvest-routine',
    name: 'Harvest Routine',
    path: 'farm',
    cost: 25,
    description: 'Repeated stamping has been classified as agricultural labor.',
    effectLabel: 'Every 10 stamps grants 5x tap value',
    effectType: 'harvestRoutine',
    effectValue: 5,
  },
  {
    id: 'leaking-tap',
    name: 'Leaking Tap',
    path: 'water',
    cost: 1,
    description: 'A small leak. Officially approved.',
    effectLabel: '+0.005 Meaning/sec',
    effectType: 'addPassiveMeaning',
    effectValue: 0.005,
  },
  {
    id: 'rain-barrel',
    name: 'Rain Barrel',
    path: 'water',
    cost: 5,
    description: 'Collected rain tends to remember where it fell.',
    effectLabel: 'Passive Meaning/sec x2',
    effectType: 'multiplyPassiveMeaning',
    effectValue: 2,
  },
  {
    id: 'irrigation-form',
    name: 'Irrigation Form',
    path: 'water',
    cost: 25,
    description: 'A form authorizing water to move with purpose.',
    effectLabel: '+0.02 Meaning/sec',
    effectType: 'addPassiveMeaning',
    effectValue: 0.02,
  },
];

export function getUpgradesForPath(path: UpgradePath): UpgradeDefinition[] {
  return upgrades.filter((upgrade) => upgrade.path === path);
}

```


## src/utils/format.ts

```ts
import type { BigNumberSource } from './bigNumber.ts';
import { formatMeaning, formatRate } from './bigNumber.ts';

export { formatMeaning, formatRate };

export function formatNumber(value: BigNumberSource): string {
  return formatMeaning(value);
}

```


## src/components/WordCard.tsx

```ts
import { useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { getPathRibbonStyles, getPathThemeStyles } from '../data/words';
import type {
  StampEffect,
  VisiblePathEvent,
  WordDefinition,
  WordId,
  WorkbenchBoard,
  WorkbenchGridSlot,
} from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';
import type { BigNumber } from '../utils/bigNumber.ts';
import { isStampBlockedElement, shouldStampFromPointerInteraction } from '../utils/stampInput';
import { getActiveWordPowerLabel, getRootChargeLabel } from '../utils/upgrades';
import { WORKBENCH_SLOT_COUNT } from '../utils/workbench';

interface WordCardProps {
  noun: WordDefinition;
  verb: WordDefinition | null;
  effectiveVerb: WordDefinition | null;
  verbSlotUnlocked: boolean;
  manualStampCount: number;
  activeWordStartedAt: number;
  now: number;
  tapGain: BigNumber;
  passiveGain: BigNumber;
  visiblePathEvent: VisiblePathEvent | null;
  board: WorkbenchBoard;
  stamps: StampEffect[];
  onStamp: (x: number, y: number) => void;
  onPathEventClick: (event: VisiblePathEvent) => void;
  onUnavailableSlot: () => void;
  onMoveWord: (wordId: WordId, xPercent: number, yPercent: number) => void;
  onResetLayout: () => void;
}

interface DragState {
  wordId: WordId;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  moved: boolean;
}

interface DragPosition {
  wordId: WordId;
  x: number;
  y: number;
}

function getSlotStyle(slot: WorkbenchGridSlot) {
  const col = slot % 3;
  const row = Math.floor(slot / 3);

  return {
    left: `calc(${col * (100 / 3)}% + 0.25rem)`,
    top: `calc(${row * (100 / 3)}% + 0.25rem)`,
    width: 'calc(33.333% - 0.5rem)',
    height: 'calc(33.333% - 0.5rem)',
  };
}

function getCellCenterPercent(clientX: number, clientY: number, bounds: DOMRect) {
  return {
    xPercent: bounds.width > 0 ? ((clientX - bounds.left) / bounds.width) * 100 : 0,
    yPercent: bounds.height > 0 ? ((clientY - bounds.top) / bounds.height) * 100 : 0,
  };
}

function WorkbenchWordCard({
  word,
  noun,
  effectiveVerb,
  manualStampCount,
  activeWordStartedAt,
  now,
  tapGain,
  passiveGain,
  dragPosition,
  slot,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  word: WordDefinition;
  noun: WordDefinition;
  effectiveVerb: WordDefinition | null;
  manualStampCount: number;
  activeWordStartedAt: number;
  now: number;
  tapGain: BigNumber;
  passiveGain: BigNumber;
  dragPosition: DragPosition | null;
  slot: WorkbenchGridSlot;
  onPointerDown: (event: PointerEvent<HTMLElement>, wordId: WordId) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
}) {
  const isNoun = word.type === 'noun';
  const powerLabel = getActiveWordPowerLabel(
    word,
    isNoun ? effectiveVerb : null,
    activeWordStartedAt,
    now,
  );
  const rootChargeLabel = word.id === noun.id && word.id === 'root' ? getRootChargeLabel(manualStampCount) : null;
  const cardStyle = dragPosition?.wordId === word.id
    ? {
        left: dragPosition.x,
        top: dragPosition.y,
        width: 'calc(33.333% - 0.5rem)',
        height: 'calc(33.333% - 0.5rem)',
      }
    : getSlotStyle(slot);

  return (
    <article
      className={`absolute z-[2] grid cursor-grab touch-none grid-rows-[auto_auto_auto_1fr] overflow-hidden rounded-md border-2 p-1.5 shadow-sm active:cursor-grabbing ${getPathThemeStyles(word.pathTheme)}`}
      style={cardStyle}
      onPointerDown={(event) => onPointerDown(event, word.id)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="text-[0.55rem] font-black uppercase leading-none text-stone-500">{word.type}</div>
      <div className={`mt-1 h-1 rounded-full ${getPathRibbonStyles(word.pathTheme)}`} />
      <h3 className="min-w-0 whitespace-nowrap font-serif text-[clamp(0.7rem,3.2vw,0.95rem)] font-bold leading-5 text-[#27211a]">
        {word.text}
      </h3>
      <div className="mt-1 min-h-0 overflow-hidden text-[0.56rem] font-bold leading-3 text-[#27211a]">
        {word.id === noun.id ? (
          <>
            <div>Tap +{formatMeaning(tapGain)}</div>
            <div>Idle +{formatRate(passiveGain)}/s</div>
          </>
        ) : null}
        {powerLabel ? <div className="mt-1 line-clamp-2">Power: {powerLabel}</div> : null}
        {rootChargeLabel ? <div className="mt-1">Root: {rootChargeLabel}</div> : null}
      </div>
    </article>
  );
}

function WordCard({
  noun,
  verb,
  effectiveVerb,
  verbSlotUnlocked,
  manualStampCount,
  activeWordStartedAt,
  now,
  tapGain,
  passiveGain,
  visiblePathEvent,
  board,
  stamps,
  onStamp,
  onPathEventClick,
  onUnavailableSlot,
  onMoveWord,
  onResetLayout,
}: WordCardProps) {
  const workbenchRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null);
  const cards = [noun, verb].filter((word): word is WordDefinition => Boolean(word));

  const handlePointerStamp = (event: MouseEvent<HTMLDivElement>) => {
    if (isStampBlockedElement(event.target)) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    onStamp(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  const stampAtClientPoint = (clientX: number, clientY: number) => {
    if (!workbenchRef.current) {
      return;
    }

    const bounds = workbenchRef.current.getBoundingClientRect();
    onStamp(clientX - bounds.left, clientY - bounds.top);
  };

  const handleCardPointerDown = (event: PointerEvent<HTMLElement>, wordId: WordId) => {
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!workbenchBounds) {
      return;
    }

    const cardBounds = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      wordId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - cardBounds.left,
      offsetY: event.clientY - cardBounds.top,
      moved: false,
    };
    setDragPosition({
      wordId,
      x: cardBounds.left - workbenchBounds.left,
      y: cardBounds.top - workbenchBounds.top,
    });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  };

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!dragState || !workbenchBounds) {
      return;
    }

    const moveDistance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
    dragState.moved = dragState.moved || !shouldStampFromPointerInteraction({ movementDistance: moveDistance });

    const cardBounds = event.currentTarget.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(workbenchBounds.width - cardBounds.width, event.clientX - workbenchBounds.left - dragState.offsetX));
    const nextY = Math.max(0, Math.min(workbenchBounds.height - cardBounds.height, event.clientY - workbenchBounds.top - dragState.offsetY));

    setDragPosition({
      wordId: dragState.wordId,
      x: nextX,
      y: nextY,
    });
    event.stopPropagation();
  };

  const handleCardPointerUp = (event: PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    const workbenchBounds = workbenchRef.current?.getBoundingClientRect();

    if (!dragState || !workbenchBounds) {
      return;
    }

    const moveDistance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);

    if (!shouldStampFromPointerInteraction({ movementDistance: moveDistance, dragWasActive: dragState.moved })) {
      const { xPercent, yPercent } = getCellCenterPercent(event.clientX, event.clientY, workbenchBounds);
      onMoveWord(dragState.wordId, xPercent, yPercent);
    } else {
      stampAtClientPoint(event.clientX, event.clientY);
    }

    dragStateRef.current = null;
    setDragPosition(null);
    event.stopPropagation();
  };

  return (
    <section className="relative grid w-full grid-rows-[auto_auto] rounded-lg border border-[#d6bc92] bg-[#fffdf6] p-3 text-left shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Sentence Workbench</div>
          <div className="text-sm font-medium text-stone-500">Drag words into reading order.</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded border border-[#decaa9] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
            {board.unlockedSlots.length} / 9
          </div>
          <button
            type="button"
            data-no-stamp="true"
            onClick={onResetLayout}
            className="min-h-8 rounded border border-stone-300 bg-white px-2 text-xs font-bold text-stone-500 shadow-sm active:translate-y-px"
          >
            Reset
          </button>
          <button
            type="button"
            data-no-stamp="true"
            onClick={onUnavailableSlot}
            className="grid h-8 w-8 place-items-center rounded border border-stone-300 bg-white text-base font-bold text-stone-500 shadow-sm active:translate-y-px"
            aria-label="Add word slot"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={workbenchRef}
        role="button"
        tabIndex={0}
        onClick={handlePointerStamp}
        className="relative mx-auto mt-3 aspect-square min-h-0 w-[min(92vw,620px)] max-w-full overflow-hidden rounded border border-dashed border-[#decaa9] bg-white/55 p-1 text-left outline-none transition active:scale-[0.997]"
      >
        <div className="pointer-events-none absolute left-2 top-2 z-[1] rounded bg-white/75 px-2 py-1 text-[0.62rem] font-bold text-stone-500 shadow-sm">
          Tap anywhere here to stamp Meaning.
        </div>

        <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: WORKBENCH_SLOT_COUNT }, (_, index) => {
            const unlocked = board.unlockedSlots.includes(index as WorkbenchGridSlot);
            return (
              <div
                key={index}
                className={`rounded border text-center text-[0.58rem] font-bold ${
                  unlocked
                    ? 'border-[#e2cfad] bg-white/50 text-stone-300'
                    : 'border-[#ded4c2] bg-[#eee4d4]/60 text-stone-400'
                }`}
              >
                {unlocked ? index + 1 : 'LOCK'}
              </div>
            );
          })}
        </div>

        {cards.map((word) => {
          const slot = board.placements[word.id];

          if (slot === undefined || !board.unlockedSlots.includes(slot)) {
            return null;
          }

          return (
            <WorkbenchWordCard
              key={word.id}
              word={word}
              noun={noun}
              effectiveVerb={effectiveVerb}
              manualStampCount={manualStampCount}
              activeWordStartedAt={activeWordStartedAt}
              now={now}
              tapGain={tapGain}
              passiveGain={passiveGain}
              dragPosition={dragPosition}
              slot={slot}
              onPointerDown={handleCardPointerDown}
              onPointerMove={handleCardPointerMove}
              onPointerUp={handleCardPointerUp}
            />
          );
        })}

        {verbSlotUnlocked && !verb ? (
          <div
            className="absolute grid place-items-center rounded-md border-2 border-dashed border-[#d8c8ad] bg-[#f3eadc]/70 p-2 text-center text-[0.65rem] font-bold text-stone-400"
            style={getSlotStyle(1)}
            onClick={(event) => event.stopPropagation()}
          >
            Select a verb
          </div>
        ) : null}

        {!verbSlotUnlocked ? (
          <div
            className="absolute grid place-items-center rounded-md border-2 border-dashed border-[#d8c8ad] bg-[#f3eadc]/70 p-2 text-center text-[0.65rem] font-bold text-stone-400"
            style={getSlotStyle(1)}
            onClick={(event) => event.stopPropagation()}
          >
            Verb slot unlocks at 100 Meaning.
          </div>
        ) : null}

        {visiblePathEvent ? (
          <button
            type="button"
            data-no-stamp="true"
            onClick={(event) => {
              event.stopPropagation();
              onPathEventClick(visiblePathEvent);
            }}
            className="absolute z-10 w-32 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-[#8e2020] bg-[#fff7e8] px-3 py-2 text-left shadow-[0_8px_18px_rgba(91,32,24,0.22)] transition hover:bg-white active:scale-95"
            style={{ left: `${visiblePathEvent.xPercent}%`, top: `${visiblePathEvent.yPercent}%` }}
          >
            <div className="text-sm font-black text-[#8e2020]">{visiblePathEvent.name}</div>
            <div className="text-xs font-bold text-stone-600">{visiblePathEvent.prompt}</div>
          </button>
        ) : null}

        {stamps.map((stamp) => (
          <span
            key={stamp.id}
            className="stamp-effect pointer-events-none absolute"
            style={{ left: stamp.x, top: stamp.y }}
          >
            <span className="stamp-mark">{stamp.label ?? 'APPROVED'}</span>
            <span className="stamp-value">+{formatMeaning(stamp.value)}</span>
          </span>
        ))}
      </div>

    </section>
  );
}

export default WordCard;

```


# Source files


## src/components/DictionaryScreen.tsx

```ts
import { useMemo, useState } from 'react';
import { getPathRibbonStyles, getPathThemeStyles, getWordTypeStyles } from '../data/words';
import type { WordDefinition } from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';

interface DictionaryScreenProps {
  unlockedWords: WordDefinition[];
  activeNounId: string;
  activeVerbId: string | null;
  onSelectWord: (wordId: WordDefinition['id']) => void;
}

function DictionaryScreen({ unlockedWords, activeNounId, activeVerbId, onSelectWord }: DictionaryScreenProps) {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();

  const filteredWords = useMemo(() => {
    if (!normalizedSearch) {
      return unlockedWords;
    }

    return unlockedWords.filter((word) => {
      const searchableText = `${word.text} ${word.type} ${word.pathLabel}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [normalizedSearch, unlockedWords]);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-stone-500">Unlocked words</p>
            <h2 className="font-serif text-2xl font-bold text-[#27211a]">Dictionary</h2>
          </div>
          <div className="text-xs font-bold text-stone-500">{filteredWords.length}/{unlockedWords.length}</div>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search word, type, or path"
          className="min-h-10 w-full rounded border border-[#decaa9] bg-white px-3 text-sm font-semibold text-[#27211a] outline-none placeholder:text-stone-400 focus:border-[#9a6a36]"
        />
      </div>

      <div className="min-h-0 overflow-y-auto pr-1">
        <div className="grid gap-2">
          {filteredWords.map((word) => (
            (() => {
              const isActiveNoun = activeNounId === word.id;
              const isActiveVerb = activeVerbId === word.id;
              const activeLabel = isActiveNoun ? 'Active noun' : isActiveVerb ? 'Active verb' : null;

              return (
            <button
              key={word.id}
              type="button"
              onClick={() => onSelectWord(word.id)}
              className={`rounded-lg border-2 p-2 text-left shadow-sm transition ${getPathThemeStyles(word.pathTheme)} ${
                isActiveNoun || isActiveVerb
                  ? 'ring-2 ring-[#9a6a36] ring-offset-1'
                  : 'hover:brightness-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#27211a]">{word.text}</h3>
                    <span className={`rounded border px-2 py-0.5 text-[0.7rem] font-bold capitalize ${getWordTypeStyles(word.type)}`}>
                      {word.type}
                    </span>
                  </div>
                  <div className={`mt-1 inline-block rounded px-2 py-0.5 text-[0.68rem] font-bold ${getPathRibbonStyles(word.pathTheme)}`}>
                    {word.pathLabel}
                  </div>
                  {activeLabel ? (
                    <div className="mt-1 inline-block rounded border border-[#cbb58f] bg-white/80 px-2 py-0.5 text-[0.65rem] font-bold text-[#6f4f24]">
                      {activeLabel}
                    </div>
                  ) : null}
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-1 text-center text-[0.68rem] font-bold text-[#27211a]">
                  <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                    +{formatMeaning(word.tapValue)}
                  </div>
                  <div className="rounded border border-[#eadbc3] bg-white/75 px-2 py-1">
                    +{formatRate(word.passiveValue)}/s
                  </div>
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-xs leading-4 text-stone-600">{word.definition}</p>
            </button>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
}

export default DictionaryScreen;

```


## src/components/FeedbackLog.tsx

```ts
interface FeedbackLogProps {
  message: string;
}

function FeedbackLog({ message }: FeedbackLogProps) {
  return (
    <section className="mt-4 rounded-lg border border-[#decaa9] bg-[#2d2922] px-4 py-3 text-sm font-medium text-[#fff8e9] shadow-inner">
      {message}
    </section>
  );
}

export default FeedbackLog;

```


## src/components/PathBlock.tsx

```ts
import { getPathRibbonStyles, getPathThemeStyles } from '../data/words';
import type { WordDefinition } from '../types/game';
import { getPathBonusLabel } from '../utils/upgrades';

interface PathBlockProps {
  activeWord: WordDefinition;
  milestone: string;
}

function PathBlock({ activeWord, milestone }: PathBlockProps) {
  return (
    <section className={`rounded-lg border-2 p-3 shadow-sm ${getPathThemeStyles(activeWord.pathTheme)}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Current Path</div>
          <h2 className="mt-1 font-serif text-xl font-bold text-[#27211a]">{activeWord.pathLabel}</h2>
        </div>
        <span className={`rounded px-2 py-1 text-xs font-bold ${getPathRibbonStyles(activeWord.pathTheme)}`}>
          {activeWord.text}
        </span>
      </div>
      <div className="mt-3 rounded border border-white/70 bg-white/65 px-3 py-2 text-sm font-bold text-[#27211a]">
        {milestone}
      </div>
      <div className="mt-2 rounded border border-white/70 bg-white/65 px-3 py-2 text-xs font-bold text-stone-700">
        {getPathBonusLabel(activeWord)}
      </div>
    </section>
  );
}

export default PathBlock;

```


## src/components/PathChoicePanel.tsx

```ts
import type { WordDefinition, WordId } from '../types/game';
import { formatMeaning } from '../utils/format';
import { getPathRibbonStyles, getPathThemeStyles } from '../data/words';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from '../utils/progression.ts';

interface PathChoicePanelProps {
  meaning: BigNumberSource;
  chosenFirstPath: WordId | null;
  choices: WordDefinition[];
  onChooseWord: (wordId: WordId) => void;
}

function PathChoicePanel({ meaning, chosenFirstPath, choices, onChooseWord }: PathChoicePanelProps) {
  if (chosenFirstPath) {
    return (
      <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3">
        <div className="text-sm font-bold text-[#27211a]">
          Approved word path: {chosenFirstPath === 'farm' ? 'Farm' : 'Water'}
        </div>
      </section>
    );
  }

  if (!isFirstPathChoiceUnlocked(meaning)) {
    return (
      <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3 text-sm font-semibold text-stone-600">
        Next word choice unlocks at {formatMeaning(FIRST_CHOICE_COST)} Meaning.
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#decaa9] bg-[#f7eddb] p-3">
      <h3 className="font-serif text-xl font-bold text-[#27211a]">Choose the next approved word</h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {choices.map((word) => (
          <button
            key={word.id}
            type="button"
            onClick={() => onChooseWord(word.id)}
            className={`min-h-32 rounded border-2 p-3 text-left shadow-sm transition hover:brightness-[1.02] active:translate-y-px ${getPathThemeStyles(word.pathTheme)}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-lg font-bold text-[#27211a]">{word.text}</div>
              <div className={`rounded px-2 py-1 text-xs font-bold ${getPathRibbonStyles(word.pathTheme)}`}>
                {word.pathLabel}
              </div>
            </div>
            <div className="mt-1 text-xs font-semibold text-stone-500">Cost: {formatMeaning(word.unlockCost)} Meaning</div>
            <p className="mt-2 text-sm leading-5 text-stone-700">{word.effectDescription}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PathChoicePanel;

```


## src/components/QuoteFeed.tsx

```ts
import { useEffect, useState } from 'react';
import { gameQuotes, selectQuoteIndex } from '../data/quotes.ts';

const FADE_DURATION_MS = 1500;
const MIN_VISIBLE_DURATION_MS = 8000;
const VISIBLE_DURATION_RANGE_MS = 4000;
const MIN_PAUSE_DURATION_MS = 1000;
const PAUSE_DURATION_RANGE_MS = 2000;

function QuoteFeed() {
  const [quoteIndex, setQuoteIndex] = useState(() => selectQuoteIndex(gameQuotes.length));
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownFirstQuote, setHasShownFirstQuote] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const visibleDuration = MIN_VISIBLE_DURATION_MS + Math.random() * VISIBLE_DURATION_RANGE_MS;
      const timeoutId = window.setTimeout(() => setIsVisible(false), visibleDuration);
      return () => window.clearTimeout(timeoutId);
    }

    const pauseDuration = hasShownFirstQuote
      ? FADE_DURATION_MS + MIN_PAUSE_DURATION_MS + Math.random() * PAUSE_DURATION_RANGE_MS
      : 50;
    const timeoutId = window.setTimeout(() => {
      setQuoteIndex((currentIndex) => selectQuoteIndex(gameQuotes.length, currentIndex));
      setHasShownFirstQuote(true);
      setIsVisible(true);
    }, pauseDuration);

    return () => window.clearTimeout(timeoutId);
  }, [hasShownFirstQuote, isVisible]);

  const quote = gameQuotes[quoteIndex];

  if (!quote) {
    return null;
  }

  return (
    <section
      data-no-stamp="true"
      aria-live="off"
      className="pointer-events-none flex min-h-20 w-full items-center justify-center rounded-lg border border-[#d6bc92] bg-[#fffdf6] px-4 py-2 text-center shadow-sm"
    >
      <div className={`transition-opacity duration-[1500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-serif text-sm italic leading-5 text-stone-600">&ldquo;{quote.text}&rdquo;</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          {quote.author}
        </p>
      </div>
    </section>
  );
}

export default QuoteFeed;

```


## src/components/ResourceBar.tsx

```ts
interface ResourceBarProps {
  meaning: string;
  passiveMeaningPerSecond: string;
  activeWord: string;
  pathLabel: string;
  activeEventLabel: string | null;
}

function ResourceBar({ meaning, passiveMeaningPerSecond, activeWord, pathLabel, activeEventLabel }: ResourceBarProps) {
  return (
    <section className="border-b border-[#e3d2b7] bg-[#fffaf0] px-4 py-3 shadow-sm">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <div className="text-xs font-semibold uppercase text-stone-500">Meaning</div>
          <div className="font-serif text-3xl font-bold leading-none text-[#27211a]">{meaning}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold uppercase text-stone-500">Meaning/sec</div>
          <div className="text-base font-bold text-[#27211a]">+{passiveMeaningPerSecond}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-bold text-stone-500">
        <span>{activeWord}</span>
        <span className="truncate text-right">{pathLabel}</span>
      </div>
      {activeEventLabel ? (
        <div className="mt-2 rounded border border-[#decaa9] bg-white px-2 py-1 text-center text-xs font-bold text-[#8e2020]">
          {activeEventLabel}
        </div>
      ) : null}
    </section>
  );
}

export default ResourceBar;

```


## src/components/SentenceControls.tsx

```ts
interface SentenceControlsProps {
  onUnavailable: () => void;
}

function SentenceControls({ onUnavailable }: SentenceControlsProps) {
  return (
    <section className="flex items-center justify-between gap-3 rounded-lg border border-[#decaa9] bg-[#f7eddb] px-3 py-2">
      <div className="text-xs font-semibold uppercase text-stone-500">Sentence slots</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onUnavailable}
          className="grid h-9 w-9 place-items-center rounded border border-stone-300 bg-white text-lg font-bold text-stone-500 shadow-sm active:translate-y-px"
          aria-label="Add word slot"
        >
          +
        </button>
        <button
          type="button"
          onClick={onUnavailable}
          className="grid h-9 w-9 place-items-center rounded border border-stone-300 bg-white text-lg font-bold text-stone-500 shadow-sm active:translate-y-px"
          aria-label="Remove word slot"
        >
          -
        </button>
      </div>
    </section>
  );
}

export default SentenceControls;

```


## src/components/StampButton.tsx

```ts
interface StampButtonProps {
  stampCost: number;
  onStamp: () => void;
}

function StampButton({ stampCost, onStamp }: StampButtonProps) {
  return (
    <section className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onStamp}
        className="min-h-28 rounded-lg border-4 border-[#8e2020] bg-[#ba2f2f] px-5 py-5 text-center text-3xl font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_0_#7b1d1d,0_18px_26px_rgba(91,32,24,0.28)] transition active:translate-y-2 active:shadow-[0_2px_0_#7b1d1d,0_10px_18px_rgba(91,32,24,0.22)]"
      >
        Stamp
      </button>

      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <button
          type="button"
          disabled
          className="min-h-12 cursor-not-allowed rounded border border-stone-300 bg-stone-100 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-stone-400"
        >
          Reject Locked
        </button>
        <div className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
          Cost: {stampCost} Ink
        </div>
      </div>
      <p className="text-center text-xs font-medium text-stone-500">Rejection review not available yet.</p>
    </section>
  );
}

export default StampButton;

```


## src/components/StatsScreen.tsx

```ts
import { words } from '../data/words.ts';
import type { GameState, SessionStats } from '../types/game.ts';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { formatMeaning, formatRate } from '../utils/format.ts';
import { formatDuration, getTrackedMeaningTotal } from '../utils/stats.ts';

interface StatsScreenProps {
  gameState: GameState;
  sessionStats: SessionStats;
  currentTapGain: BigNumberSource;
  currentPassiveGain: BigNumberSource;
  currentSentence: string;
  now: number;
}

function StatRow({ label, value, secondary }: { label: string; value: string; secondary?: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-[#eadbc3] px-3 py-2 last:border-b-0">
      <div className="text-sm font-semibold text-stone-600">{label}</div>
      <div className="min-w-0 text-right">
        <div className="break-words text-sm font-bold text-[#27211a]">{value}</div>
        {secondary ? <div className="text-[0.68rem] font-semibold text-stone-400">{secondary}</div> : null}
      </div>
    </div>
  );
}

function StatSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-lg font-bold text-[#27211a]">{title}</h2>
      <div className="overflow-hidden rounded-lg border border-[#decaa9] bg-white shadow-sm">{children}</div>
    </section>
  );
}

function StatsScreen({
  gameState,
  sessionStats,
  currentTapGain,
  currentPassiveGain,
  currentSentence,
  now,
}: StatsScreenProps) {
  const implementedWordsUnlocked = gameState.unlockedWordIds.filter((wordId) => {
    return words.find((word) => word.id === wordId)?.implemented;
  }).length;
  const chosenPath = gameState.chosenFirstPath === 'farm'
    ? 'Farm / Ground'
    : gameState.chosenFirstPath === 'water'
      ? 'Water / Flow'
      : 'Starter';

  return (
    <div className="grid content-start gap-5 pb-2">
      <div>
        <p className="text-xs font-semibold uppercase text-stone-500">Player record</p>
        <h2 className="font-serif text-2xl font-bold text-[#27211a]">Stats</h2>
      </div>

      <StatSection title="Overview">
        <StatRow label="Current Meaning" value={formatMeaning(gameState.meaning)} />
        <StatRow label="Meaning/sec" value={`+${formatRate(currentPassiveGain)}`} />
        <StatRow label="Current tap" value={`+${formatMeaning(currentTapGain)}`} />
        <StatRow label="Chosen path" value={chosenPath} />
        <StatRow label="Dream unlocked" value={gameState.dreamUnlocked ? 'Yes' : 'No'} />
        <StatRow label="Current sentence" value={currentSentence || 'World'} />
      </StatSection>

      <StatSection title="Meaning">
        <StatRow
          label="Total earned"
          value={formatMeaning(gameState.totalMeaningEarned)}
          secondary={`Session ${formatMeaning(getTrackedMeaningTotal(sessionStats))}`}
        />
        <StatRow
          label="From tapping"
          value={formatMeaning(gameState.stats.meaningEarnedFromTapping)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromTapping)}`}
        />
        <StatRow
          label="From passive"
          value={formatMeaning(gameState.stats.meaningEarnedFromPassive)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromPassive)}`}
        />
        <StatRow
          label="From events"
          value={formatMeaning(gameState.stats.meaningEarnedFromEvents)}
          secondary={`Session ${formatMeaning(sessionStats.meaningEarnedFromEvents)}`}
        />
        <StatRow
          label="Best single tap"
          value={formatMeaning(gameState.stats.bestSingleTapGain)}
          secondary={`Session ${formatMeaning(sessionStats.bestSingleTapGain)}`}
        />
        <StatRow
          label="Best Meaning/sec"
          value={formatRate(gameState.stats.bestMeaningPerSecond)}
          secondary={`Session ${formatRate(sessionStats.bestMeaningPerSecond)}`}
        />
      </StatSection>

      <StatSection title="Actions">
        <StatRow label="Manual stamps" value={gameState.stats.manualStamps.toLocaleString()} secondary={`Session ${sessionStats.manualStamps.toLocaleString()}`} />
        <StatRow label="Generated taps" value={gameState.stats.generatedTaps.toLocaleString()} secondary="Not generated yet" />
        <StatRow label="Upgrades bought" value={gameState.stats.upgradesBought.toLocaleString()} secondary={`Session ${sessionStats.upgradesBought.toLocaleString()}`} />
        <StatRow label="Events spawned" value={gameState.stats.eventsSpawned.toLocaleString()} secondary={`Session ${sessionStats.eventsSpawned.toLocaleString()}`} />
        <StatRow label="Events claimed" value={gameState.stats.eventsClaimed.toLocaleString()} secondary={`Session ${sessionStats.eventsClaimed.toLocaleString()}`} />
        <StatRow label="Meaning Blooms" value={gameState.stats.eventClaims['dream-bloom'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-bloom'].toLocaleString()}`} />
        <StatRow label="Softened Rules" value={gameState.stats.eventClaims['dream-softened-rules'].toLocaleString()} secondary={`Session ${sessionStats.eventClaims['dream-softened-rules'].toLocaleString()}`} />
        <StatRow label="Farm events" value={gameState.stats.eventClaims.farm.toLocaleString()} secondary={`Session ${sessionStats.eventClaims.farm.toLocaleString()}`} />
        <StatRow label="Water events" value={gameState.stats.eventClaims.water.toLocaleString()} secondary={`Session ${sessionStats.eventClaims.water.toLocaleString()}`} />
      </StatSection>

      <StatSection title="Progress">
        <StatRow label="Words unlocked" value={`${gameState.unlockedWordIds.length} / ${words.length}`} />
        <StatRow label="Implemented words unlocked" value={implementedWordsUnlocked.toLocaleString()} />
        <StatRow label="Board slots unlocked" value={`${gameState.workbenchBoard.unlockedSlots.length} / 9`} />
        <StatRow label="Stamp Upgrade" value={`Level ${gameState.stampUpgradeLevel}`} />
        <StatRow label="Filing Upgrade" value={`Level ${gameState.filingUpgradeLevel}`} />
      </StatSection>

      <StatSection title="Time">
        <StatRow label="Total time played" value={formatDuration(gameState.stats.totalPlayTimeMs)} />
        <StatRow label="Current session" value={formatDuration(now - sessionStats.startedAt)} />
      </StatSection>
    </div>
  );
}

export default StatsScreen;

```


## src/components/UpgradesScreen.tsx

```ts
import { getUpgradesForPath } from '../data/upgrades';
import type { PathChoice, UpgradeDefinition } from '../types/game';
import { formatMeaning } from '../utils/format';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { gte } from '../utils/bigNumber.ts';

interface UpgradesScreenProps {
  meaning: BigNumberSource;
  purchasedPath: PathChoice;
  purchasedUpgradeIds: string[];
  onBuyUpgrade: (upgrade: UpgradeDefinition) => void;
}

function UpgradesScreen({ meaning, purchasedPath, purchasedUpgradeIds, onBuyUpgrade }: UpgradesScreenProps) {
  if (!purchasedPath) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-[#decaa9] bg-white p-6 text-center text-base font-bold leading-6 text-[#27211a]">
        Choose Farm or Water on the Main screen to unlock upgrades.
      </div>
    );
  }

  const pathUpgrades = getUpgradesForPath(purchasedPath);

  return (
    <section className="h-full overflow-y-auto pr-1">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase text-stone-500">
          {purchasedPath === 'farm' ? 'Farm' : 'Water'} upgrades
        </p>
        <h2 className="font-serif text-2xl font-bold text-[#27211a]">Office Improvements</h2>
      </div>

      <div className="grid gap-3">
        {pathUpgrades.map((upgrade) => {
          const isPurchased = purchasedUpgradeIds.includes(upgrade.id);
          const canAfford = gte(meaning, upgrade.cost);

          return (
            <article
              key={upgrade.id}
              className={`rounded-lg border p-3 shadow-sm ${
                isPurchased
                  ? 'border-[#879a55] bg-[#eff3df]'
                  : canAfford
                    ? 'border-[#decaa9] bg-white'
                    : 'border-[#decaa9] bg-[#f4ead9] opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#27211a]">{upgrade.name}</h3>
                  <p className="mt-1 text-sm leading-5 text-stone-700">{upgrade.description}</p>
                </div>
                <span className="rounded border border-[#d6bc92] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                  {isPurchased ? 'Bought' : `${formatMeaning(upgrade.cost)} M`}
                </span>
              </div>

              <div className="mt-3 rounded border border-[#eadbc3] bg-[#fffaf0] px-3 py-2 text-sm font-bold text-[#27211a]">
                {upgrade.effectLabel}
              </div>

              <button
                type="button"
                disabled={isPurchased || !canAfford}
                onClick={() => onBuyUpgrade(upgrade)}
                className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                  isPurchased
                    ? 'cursor-default bg-[#4b5f27] text-white'
                    : canAfford
                      ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                      : 'cursor-not-allowed bg-stone-200 text-stone-500'
                }`}
              >
                {isPurchased ? 'Purchased' : canAfford ? 'Buy Upgrade' : 'Not Enough Meaning'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default UpgradesScreen;

```


## src/components/WordSelector.tsx

```ts
import { getWordTypeStyles } from '../data/words';
import type { WordDefinition, WordId, WordProgress } from '../types/game';

interface WordSelectorProps {
  words: WordDefinition[];
  wordProgress: Record<string, WordProgress>;
  activeWordId: WordId;
  onSelectWord: (wordId: WordId) => void;
}

function WordSelector({ words, wordProgress, activeWordId, onSelectWord }: WordSelectorProps) {
  return (
    <section className="mt-4 rounded-lg border border-[#e3d2b7] bg-[#f7eddb] p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Dictionary Preview</div>
      <div className="grid gap-2">
        {words.map((word) => {
          const progress = wordProgress[word.id];
          const isUnlocked = progress?.unlocked ?? false;
          const isActive = word.id === activeWordId;

          return (
            <button
              key={word.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelectWord(word.id)}
              className={`flex min-h-11 items-center justify-between gap-3 rounded border px-3 py-2 text-left text-sm transition ${
                isActive
                  ? 'border-[#9a6a36] bg-white shadow-sm'
                  : isUnlocked
                    ? 'border-[#decaa9] bg-[#fffaf0] hover:bg-white'
                    : 'cursor-not-allowed border-[#decaa9] bg-[#efe4d3] opacity-65'
              }`}
            >
              <span>
                <span className="font-bold capitalize text-[#27211a]">{isUnlocked ? word.text : 'Locked term'}</span>
                {isUnlocked ? (
                  <span className="ml-2 text-xs font-semibold text-stone-500">Lv {progress.level}</span>
                ) : null}
              </span>
              <span className={`rounded border px-2 py-1 text-xs font-bold capitalize ${getWordTypeStyles(word.type)}`}>
                {word.type}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default WordSelector;

```


## src/components/WordUpgradesMessage.tsx

```ts
import type { WordDefinition } from '../types/game';
import { formatMeaning, formatRate } from '../utils/format';
import type { BigNumberSource } from '../utils/bigNumber.ts';
import { gte } from '../utils/bigNumber.ts';
import {
  getEffectiveFilingUpgradeCost,
  getEffectiveFilingUpgradeBonus,
  getEffectiveStampUpgradeCost,
  getEffectiveStampUpgradeBonus,
  getFilingUpgradeBonusModifierLabel,
  getFilingUpgradeDiscountModifierLabel,
  getNextUpgradeMilestone,
  getPathBonusLabel,
  getStampUpgradeBonusModifierLabel,
  getStampUpgradeDiscountModifierLabel,
  getUpgradeBaseBonus,
  getUpgradeMilestoneMultiplier,
} from '../utils/upgrades';

interface WordUpgradesMessageProps {
  meaning: BigNumberSource;
  activeWord: WordDefinition;
  activeVerb: WordDefinition | null;
  stampUpgradeLevel: number;
  filingUpgradeLevel: number;
  upgradeCostMultiplier: number;
  onBuyStampUpgrade: () => void;
  onBuyFilingUpgrade: () => void;
}

function WordUpgradesMessage({
  meaning,
  activeWord,
  activeVerb,
  stampUpgradeLevel,
  filingUpgradeLevel,
  upgradeCostMultiplier,
  onBuyStampUpgrade,
  onBuyFilingUpgrade,
}: WordUpgradesMessageProps) {
  const stampCost = getEffectiveStampUpgradeCost(stampUpgradeLevel, activeWord, activeVerb, upgradeCostMultiplier);
  const filingCost = getEffectiveFilingUpgradeCost(filingUpgradeLevel, activeWord, activeVerb, upgradeCostMultiplier);
  const stampMultiplier = getUpgradeMilestoneMultiplier(stampUpgradeLevel);
  const filingMultiplier = getUpgradeMilestoneMultiplier(filingUpgradeLevel);
  const nextStampMilestone = getNextUpgradeMilestone(stampUpgradeLevel);
  const nextFilingMilestone = getNextUpgradeMilestone(filingUpgradeLevel);
  const stampBonusModifier = getStampUpgradeBonusModifierLabel(activeWord, activeVerb);
  const stampDiscountModifier = getStampUpgradeDiscountModifierLabel(activeWord, activeVerb);
  const filingBonusModifier = getFilingUpgradeBonusModifierLabel(activeWord, activeVerb);
  const filingDiscountModifier = getFilingUpgradeDiscountModifierLabel(activeWord, activeVerb);
  const canAffordStamp = gte(meaning, stampCost);
  const canAffordFiling = gte(meaning, filingCost);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
        <div className="text-xs font-semibold uppercase text-stone-500">Current path bonus</div>
        <div className="mt-1 text-sm font-bold text-[#27211a]">{getPathBonusLabel(activeWord)}</div>
        {upgradeCostMultiplier < 1 ? (
          <div className="mt-2 rounded border border-[#cbb5d6] bg-[#f7ecfb] px-2 py-1 text-xs font-bold text-[#5d4770]">
            Softened Rules: upgrade costs -25%
          </div>
        ) : null}
      </div>

      <div className="min-h-0 overflow-y-auto pr-1">
        <div className="grid gap-3">
          <article className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#27211a]">Stamp Upgrade</h2>
                <p className="mt-1 text-sm leading-5 text-stone-600">Improves Meaning gained from stamping.</p>
              </div>
              <span className="rounded border border-[#eadbc3] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                Lv {stampUpgradeLevel}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Base bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getUpgradeBaseBonus(stampUpgradeLevel))}/tap</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Multiplier</dt>
                <dd className="font-bold text-[#27211a]">x{stampMultiplier}</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Total bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getEffectiveStampUpgradeBonus(stampUpgradeLevel, activeWord, activeVerb))}/tap</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Next milestone</dt>
                <dd className="font-bold text-[#27211a]">
                  {nextStampMilestone ? `Lv ${nextStampMilestone}, x${getUpgradeMilestoneMultiplier(nextStampMilestone)}` : 'Max listed'}
                </dd>
              </div>
            </dl>

            {stampBonusModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#5e6f2d]">
                Active word bonus: {stampBonusModifier}
              </p>
            ) : null}

            {stampDiscountModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#5e6f2d]">
                Active word discount: {stampDiscountModifier}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canAffordStamp}
              onClick={onBuyStampUpgrade}
              className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                canAffordStamp
                  ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                  : 'cursor-not-allowed bg-stone-200 text-stone-500'
              }`}
            >
              Buy for {formatMeaning(stampCost)} Meaning
            </button>
          </article>

          <article className="rounded-lg border border-[#decaa9] bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#27211a]">Filing Upgrade</h2>
                <p className="mt-1 text-sm leading-5 text-stone-600">Improves passive Meaning/sec.</p>
              </div>
              <span className="rounded border border-[#eadbc3] bg-[#fff7e8] px-2 py-1 text-xs font-bold text-stone-600">
                Lv {filingUpgradeLevel}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Base bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getUpgradeBaseBonus(filingUpgradeLevel))}/sec</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Multiplier</dt>
                <dd className="font-bold text-[#27211a]">x{filingMultiplier}</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Total bonus</dt>
                <dd className="font-bold text-[#27211a]">+{formatRate(getEffectiveFilingUpgradeBonus(filingUpgradeLevel, activeWord, activeVerb))}/sec</dd>
              </div>
              <div className="rounded border border-[#eadbc3] bg-[#fffaf0] px-2 py-2">
                <dt className="text-xs font-bold uppercase text-stone-500">Next milestone</dt>
                <dd className="font-bold text-[#27211a]">
                  {nextFilingMilestone ? `Lv ${nextFilingMilestone}, x${getUpgradeMilestoneMultiplier(nextFilingMilestone)}` : 'Max listed'}
                </dd>
              </div>
            </dl>

            {filingBonusModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#2f778c]">
                Active word bonus: {filingBonusModifier}
              </p>
            ) : null}

            {filingDiscountModifier ? (
              <p className="mt-2 rounded border border-[#d8c8ad] bg-[#fffaf0] px-2 py-1 text-xs font-bold text-[#2f778c]">
                Active word discount: {filingDiscountModifier}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canAffordFiling}
              onClick={onBuyFilingUpgrade}
              className={`mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-bold transition ${
                canAffordFiling
                  ? 'bg-[#2d2922] text-[#fff8e9] hover:bg-[#443d33] active:translate-y-px'
                  : 'cursor-not-allowed bg-stone-200 text-stone-500'
              }`}
            >
              Buy for {formatMeaning(filingCost)} Meaning
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WordUpgradesMessage;

```


## src/data/quotes.ts

```ts
export interface GameQuote {
  text: string;
  author: string;
  category: 'words' | 'meaning' | 'reality' | 'dreaming' | 'time' | 'growth' | 'memory';
}

// Original lines written for Approved Text keep the ambient feed attribution-safe.
export const gameQuotes: GameQuote[] = [
  { text: 'A word is small until it is believed.', author: 'Approved Text', category: 'words' },
  { text: 'Meaning gathers where attention returns.', author: 'Approved Text', category: 'meaning' },
  { text: 'The world begins as a sentence you dare to keep.', author: 'Approved Text', category: 'reality' },
  { text: 'What is understood once may be dreamed again.', author: 'Approved Text', category: 'dreaming' },
  { text: 'Growth is a slow agreement between time and form.', author: 'Approved Text', category: 'growth' },
  { text: 'Still water remembers the shape of the sky.', author: 'Approved Text', category: 'memory' },
  { text: 'Every stamp is a small refusal of nothing.', author: 'Approved Text', category: 'meaning' },
  { text: 'Time files every moment under becoming.', author: 'Approved Text', category: 'time' },
  { text: 'Some words wait years for reality to notice them.', author: 'Approved Text', category: 'words' },
  { text: 'Memory is meaning that learned to remain.', author: 'Approved Text', category: 'memory' },
  { text: 'A dream is a draft the world has not approved.', author: 'Approved Text', category: 'dreaming' },
  { text: 'Reality grows around the names we give it.', author: 'Approved Text', category: 'reality' },
  { text: 'To name a thing is to ask it to remain.', author: 'Approved Text', category: 'words' },
  { text: 'Dreams are meanings before they learn to stand.', author: 'Approved Text', category: 'dreaming' },
  { text: 'The page waits without judgment.', author: 'Approved Text', category: 'time' },
];

export function selectQuoteIndex(
  quoteCount: number,
  previousIndex: number | null = null,
  randomValue = Math.random(),
): number {
  if (quoteCount <= 0) {
    return -1;
  }

  const safeRandom = Math.max(0, Math.min(randomValue, 0.999999999));
  let index = Math.floor(safeRandom * quoteCount);

  if (quoteCount > 1 && index === previousIndex) {
    index = (index + 1) % quoteCount;
  }

  return index;
}

```


## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

html, body, #root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: radial-gradient(circle at top, #f8f3e9 0%, #f0e7d7 50%, #e9dfcf 100%);
  color: #2c2c2c;
}

* {
  box-sizing: border-box;
}

button {
  font: inherit;
}

::selection {
  background: rgba(194, 58, 58, 0.2);
}

.stamp-effect {
  transform: translate(-50%, -50%) rotate(-12deg);
  animation: stamp-fade 850ms ease-out forwards;
}

.stamp-mark {
  display: block;
  border: 3px solid #b72c2c;
  border-radius: 999px;
  color: #b72c2c;
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1;
  padding: 0.45rem 0.75rem;
  text-transform: uppercase;
}

.stamp-value {
  display: block;
  margin-top: 0.2rem;
  color: #7b1d1d;
  font-size: 0.8rem;
  font-weight: 800;
  text-align: center;
  animation: value-rise 850ms ease-out forwards;
}

@keyframes stamp-fade {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-12deg) scale(1.35);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(-12deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -58%) rotate(-12deg) scale(0.95);
  }
}

@keyframes value-rise {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-0.85rem);
  }
}

```


## src/types/game.ts

```ts
import type { BigNumber } from '../utils/bigNumber.ts';

export type WordType = 'noun' | 'adjective' | 'verb';

export type AppTab = 'main' | 'dictionary' | 'upgrades' | 'stats';

export type WordId =
  | 'apple'
  | 'world'
  | 'understand'
  | 'farm'
  | 'seed'
  | 'soil'
  | 'root'
  | 'grow'
  | 'harvest'
  | 'orchard'
  | 'plow'
  | 'fertile'
  | 'season'
  | 'water'
  | 'rain'
  | 'stream'
  | 'river'
  | 'flow'
  | 'ice'
  | 'pour'
  | 'reservoir'
  | 'tide'
  | 'current'
  | 'flood'
  | 'ocean'
  | 'dream'
  | 'slumber'
  | 'echo'
  | 'clock'
  | 'remember'
  | 'acquire'
  | 'chance'
  | 'dice'
  | 'omen'
  | 'lucid'
  | 'mirror'
  | 'nightmare'
  | 'vision'
  | 'sleep'
  | 'whim'
  | 'miracle'
  | 'accident';

export type PathId = 'starter' | 'manual' | 'idle' | 'chance';

export type PathTheme = 'starter' | 'farm' | 'water' | 'chance';

export type UpgradePath = 'farm' | 'water';

export type PathChoice = UpgradePath | null;

export type WorkbenchSlot = 'noun' | 'verb';
export type WorkbenchGridSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface WorkbenchCardPosition {
  xPercent: number;
  yPercent: number;
}

export interface WorkbenchLayout {
  noun: WorkbenchCardPosition;
  verb: WorkbenchCardPosition;
}

export interface WorkbenchBoard {
  unlockedSlots: WorkbenchGridSlot[];
  placements: Partial<Record<WordId, WorkbenchGridSlot>>;
}

export interface ParsedSentence {
  orderedWordIds: WordId[];
  activeNounId: WordId;
  effectiveVerbId: WordId | null;
  sentenceText: string;
  feedback: string;
}

export type SpecialEffectType =
  | 'none'
  | 'double_noun_base'
  | 'tap_multiplier'
  | 'passive_multiplier'
  | 'stamp_upgrade_bonus_multiplier'
  | 'filing_upgrade_bonus_multiplier'
  | 'stamp_upgrade_discount'
  | 'filing_upgrade_discount'
  | 'periodic_passive_burst'
  | 'event_spawn_bonus'
  | 'current_meaning_tap_bonus'
  | 'harvest_word_for_run'
  | 'season_cycle'
  | 'timed_idle_surge'
  | 'store_idle_release'
  | 'idle_to_tap'
  | 'recursive_tap_chance'
  | 'timed_chance_reward'
  | 'chance_effect_bonus'
  | 'cross_path_acquisition'
  | 'event_preview_bonus'
  | 'randomness_stabilizer'
  | 'copy_base_stats'
  | 'risk_reward'
  | 'event_duration_bonus'
  | 'event_strength_bonus'
  | 'instant_event_reward'
  | 'chance_bonus'
  | 'offline_bonus'
  | 'future_sentence_synergy';

export type UpgradeEffectType =
  | 'addTapValue'
  | 'multiplyTapValue'
  | 'harvestRoutine'
  | 'addPassiveMeaning'
  | 'multiplyPassiveMeaning';

export interface WordDefinition {
  id: WordId;
  text: string;
  type: WordType;
  pathId: PathId;
  pathLabel: string;
  pathTheme: PathTheme;
  definition: string;
  description: string;
  unlockMeaning: number;
  tapValue: number;
  passiveValue: number;
  effectDescription: string;
  specialEffectType: SpecialEffectType;
  specialEffectValue: number | null;
  implemented: boolean;
  unlockCost: number;
  unlocked: boolean;
  unlocks?: WordId[];
}

export interface EventStatCounts {
  farm: number;
  water: number;
  'dream-bloom': number;
  'dream-softened-rules': number;
}

export interface TrackedStats {
  meaningEarnedFromTapping: BigNumber;
  meaningEarnedFromPassive: BigNumber;
  meaningEarnedFromEvents: BigNumber;
  manualStamps: number;
  generatedTaps: number;
  bestSingleTapGain: BigNumber;
  bestMeaningPerSecond: BigNumber;
  upgradesBought: number;
  eventsSpawned: number;
  eventsClaimed: number;
  eventClaims: EventStatCounts;
}

export interface GlobalStats extends TrackedStats {
  totalPlayTimeMs: number;
}

export interface SessionStats extends TrackedStats {
  startedAt: number;
}

export interface GameState {
  meaning: BigNumber;
  activeNounId: WordId;
  activeVerbId: WordId | null;
  activeWordId: WordId;
  unlockedWordIds: WordId[];
  chosenFirstPath: WordId | null;
  passiveMeaningPerSecond: BigNumber;
  tenMeaningMilestoneGranted: boolean;
  twentyFiveMeaningMilestoneGranted: boolean;
  fiftyMeaningMilestoneGranted: boolean;
  hundredMeaningMilestoneGranted: boolean;
  manualStampCount: number;
  activeWordStartedAt: number;
  stampUpgradeLevel: number;
  filingUpgradeLevel: number;
  workbenchLayout: WorkbenchLayout;
  workbenchBoard: WorkbenchBoard;
  dreamUnlocked: boolean;
  totalMeaningEarned: BigNumber;
  stats: GlobalStats;
  lastSavedAt: number | null;
}

export interface SerializedGameState extends Omit<
  GameState,
  'meaning' | 'passiveMeaningPerSecond' | 'totalMeaningEarned' | 'stats'
> {
  meaning: string | number;
  passiveMeaningPerSecond: string | number;
  totalMeaningEarned?: string | number;
  stats?: SerializedGlobalStats;
}

export interface SerializedGlobalStats extends Omit<
  GlobalStats,
  | 'meaningEarnedFromTapping'
  | 'meaningEarnedFromPassive'
  | 'meaningEarnedFromEvents'
  | 'bestSingleTapGain'
  | 'bestMeaningPerSecond'
> {
  meaningEarnedFromTapping: string | number;
  meaningEarnedFromPassive: string | number;
  meaningEarnedFromEvents: string | number;
  bestSingleTapGain: string | number;
  bestMeaningPerSecond: string | number;
}

export interface StampEffect {
  id: number;
  x: number | string;
  y: number | string;
  value: BigNumber;
  label?: string;
}

export type PathEventType = 'farm' | 'water';
export type DreamEventType = 'dream-bloom' | 'dream-softened-rules';
export type VisibleEventType = PathEventType | DreamEventType;

export interface VisiblePathEvent {
  id: number;
  type: VisibleEventType;
  name: string;
  prompt: string;
  xPercent: number;
  yPercent: number;
  expiresAt: number;
}

export interface ActivePathEvent {
  type: VisibleEventType;
  name: string;
  endsAt: number;
}

export interface UpgradeDefinition {
  id: string;
  name: string;
  path: UpgradePath;
  cost: number;
  description: string;
  effectLabel: string;
  effectType: UpgradeEffectType;
  effectValue: number;
}

export interface WordProgress {
  id: string;
  level: number;
  unlocked: boolean;
}

```


## src/utils/bigNumber.ts

```ts
import Decimal from 'break_infinity.js';
import type { DecimalSource } from 'break_infinity.js';

export type BigNumber = Decimal;
export type BigNumberSource = DecimalSource;

export function isDecimal(value: unknown): value is BigNumber {
  return value instanceof Decimal;
}

export function toDecimal(value: BigNumberSource | null | undefined): BigNumber {
  if (value === null || value === undefined) {
    return new Decimal(0);
  }

  return Decimal.fromValue(value);
}

export function add(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.add(a, b);
}

export function sub(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.sub(a, b);
}

export function mul(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.mul(a, b);
}

export function div(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.div(a, b);
}

export function pow(a: BigNumberSource, b: number | BigNumber): BigNumber {
  return Decimal.pow(a, b);
}

export function gt(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.gt(a, b);
}

export function gte(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.gte(a, b);
}

export function lt(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.lt(a, b);
}

export function lte(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.lte(a, b);
}

export function eq(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.eq(a, b);
}

export function max(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.max(a, b);
}

export function min(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.min(a, b);
}

function formatCompact(value: BigNumberSource, decimalPlaces: number): string {
  const decimal = toDecimal(value);
  const absolute = Decimal.abs(decimal);

  if (absolute.lt(1000)) {
    return decimal.toFixed(decimalPlaces);
  }

  if (absolute.lt(1e6)) {
    return `${decimal.div(1e3).toFixed(2)}K`;
  }

  if (absolute.lt(1e9)) {
    return `${decimal.div(1e6).toFixed(2)}M`;
  }

  return decimal.toExponential(2).replace('e+', 'e');
}

export function formatMeaning(value: BigNumberSource): string {
  return formatCompact(value, 2);
}

export function formatRate(value: BigNumberSource): string {
  return formatCompact(value, 3);
}

export function serializeBigNumber(value: BigNumberSource): string {
  return toDecimal(value).toString();
}

```


## src/utils/dream.ts

```ts
import type { GameState, WordDefinition, WordId } from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { gte } from './bigNumber.ts';

export function canTriggerDreamUnlock(
  meaning: BigNumberSource,
  activeNoun: WordDefinition,
  activeVerb: WordDefinition | null,
  dreamUnlocked: boolean,
): boolean {
  return (
    !dreamUnlocked &&
    gte(meaning, 100) &&
    activeNoun.id === 'world' &&
    activeVerb?.id === 'understand'
  );
}

export function getDreamUnlockWordIds(): WordId[] {
  return ['slumber'];
}

export function unlockDreamLayer(state: GameState): GameState {
  return {
    ...state,
    dreamUnlocked: true,
    unlockedWordIds: Array.from(new Set<WordId>([
      ...state.unlockedWordIds,
      ...getDreamUnlockWordIds(),
    ])),
  };
}

```


## src/utils/gameState.ts

```ts
import { getWordById } from '../data/words.ts';
import type { GameState, SerializedGameState, WordId, WorkbenchCardPosition, WorkbenchLayout } from '../types/game';
import { max, toDecimal } from './bigNumber.ts';
import { createDefaultGlobalStats, mergeGlobalStats } from './stats.ts';
import {
  createDefaultWorkbenchBoard,
  migrateActiveWordsToWorkbenchBoard,
  unlockWorkbenchSlotsForProgress,
} from './workbench.ts';

export const DEFAULT_WORKBENCH_LAYOUT: WorkbenchLayout = {
  noun: { xPercent: 7, yPercent: 14 },
  verb: { xPercent: 47, yPercent: 14 },
};

function migrateStarterWordId(wordId: WordId | null | undefined): WordId | null {
  return wordId === 'apple' ? 'world' : wordId ?? null;
}

function mergeWorkbenchPosition(
  savedPosition: WorkbenchCardPosition | undefined,
  defaultPosition: WorkbenchCardPosition,
): WorkbenchCardPosition {
  if (
    !savedPosition ||
    typeof savedPosition.xPercent !== 'number' ||
    typeof savedPosition.yPercent !== 'number'
  ) {
    return defaultPosition;
  }

  return {
    xPercent: Math.max(0, Math.min(100, savedPosition.xPercent)),
    yPercent: Math.max(0, Math.min(100, savedPosition.yPercent)),
  };
}

export function mergeWorkbenchLayout(savedLayout: WorkbenchLayout | undefined): WorkbenchLayout {
  return {
    noun: mergeWorkbenchPosition(savedLayout?.noun, DEFAULT_WORKBENCH_LAYOUT.noun),
    verb: mergeWorkbenchPosition(savedLayout?.verb, DEFAULT_WORKBENCH_LAYOUT.verb),
  };
}

export function createDefaultState(): GameState {
  const now = Date.now();

  return {
    meaning: toDecimal(0),
    activeNounId: 'world',
    activeVerbId: null,
    activeWordId: 'world',
    unlockedWordIds: ['world'],
    chosenFirstPath: null,
    passiveMeaningPerSecond: toDecimal(0),
    tenMeaningMilestoneGranted: false,
    twentyFiveMeaningMilestoneGranted: false,
    fiftyMeaningMilestoneGranted: false,
    hundredMeaningMilestoneGranted: false,
    manualStampCount: 0,
    activeWordStartedAt: now,
    stampUpgradeLevel: 0,
    filingUpgradeLevel: 0,
    workbenchLayout: DEFAULT_WORKBENCH_LAYOUT,
    workbenchBoard: createDefaultWorkbenchBoard(),
    dreamUnlocked: false,
    totalMeaningEarned: toDecimal(0),
    stats: createDefaultGlobalStats(),
    lastSavedAt: null,
  };
}

export function mergeSavedState(saved: GameState | SerializedGameState | null): GameState {
  const defaultState = createDefaultState();

  if (!saved) {
    return defaultState;
  }

  const savedMeaning = max(toDecimal(saved.meaning), 0);
  const savedPassiveMeaningPerSecond = max(toDecimal(saved.passiveMeaningPerSecond), 0);
  const savedTotalMeaningEarned = max(
    max(toDecimal(saved.totalMeaningEarned ?? saved.meaning), savedMeaning),
    0,
  );

  const savedUnlockedWordIds = Array.from(new Set<WordId>([
    'world',
    ...saved.unlockedWordIds.map((wordId) => migrateStarterWordId(wordId) ?? 'world'),
  ])).filter((wordId) => wordId !== 'apple');
  const shouldMigrateUnderstand =
    savedUnlockedWordIds.includes('grow') ||
    savedUnlockedWordIds.includes('flow') ||
    savedUnlockedWordIds.includes('understand');
  const dreamUnlocked = saved.dreamUnlocked ?? saved.unlockedWordIds.includes('slumber');
  const unlockedWordIds = Array.from(new Set<WordId>([
    ...savedUnlockedWordIds,
    ...(shouldMigrateUnderstand ? (['understand'] as WordId[]) : []),
    ...(dreamUnlocked ? (['slumber'] as WordId[]) : []),
  ]));
  const migratedActiveWordId = migrateStarterWordId(saved.activeWordId) ?? 'world';
  const savedActiveWord = getWordById(migratedActiveWordId);
  const migratedSavedActiveNounId = migrateStarterWordId(saved.activeNounId);
  const migratedSavedActiveVerbId = migrateStarterWordId(saved.activeVerbId);
  const activeNounIdFromSave = migratedSavedActiveNounId ?? (savedActiveWord.type === 'noun' ? migratedActiveWordId : 'world');
  const activeVerbIdFromSave = migratedSavedActiveVerbId ?? (savedActiveWord.type === 'verb' ? migratedActiveWordId : null);
  const activeNounId = unlockedWordIds.includes(activeNounIdFromSave) && getWordById(activeNounIdFromSave).type === 'noun'
    ? activeNounIdFromSave
    : 'world';
  const activeVerbId =
    activeVerbIdFromSave && unlockedWordIds.includes(activeVerbIdFromSave) && getWordById(activeVerbIdFromSave).type === 'verb'
      ? activeVerbIdFromSave
      : null;

  const workbenchBoard = unlockWorkbenchSlotsForProgress(
    migrateActiveWordsToWorkbenchBoard(
      activeVerbId
        ? {
            ...(saved.workbenchBoard ?? createDefaultWorkbenchBoard()),
            unlockedSlots: Array.from(new Set([
              ...((saved.workbenchBoard ?? createDefaultWorkbenchBoard()).unlockedSlots),
              1,
            ])),
          }
        : saved.workbenchBoard,
      activeNounId,
      activeVerbId,
    ),
    savedMeaning,
  );

  return {
    ...defaultState,
    ...saved,
    meaning: savedMeaning,
    activeNounId,
    activeVerbId,
    activeWordId: activeNounId,
    unlockedWordIds,
    passiveMeaningPerSecond: savedPassiveMeaningPerSecond,
    tenMeaningMilestoneGranted:
      saved.tenMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('seed') ||
        saved.unlockedWordIds.includes('rain') ||
        saved.unlockedWordIds.includes('soil') ||
        saved.unlockedWordIds.includes('stream') ||
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    twentyFiveMeaningMilestoneGranted:
      saved.twentyFiveMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('soil') ||
        saved.unlockedWordIds.includes('stream') ||
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    fiftyMeaningMilestoneGranted:
      saved.fiftyMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('root') ||
        saved.unlockedWordIds.includes('river') ||
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    hundredMeaningMilestoneGranted:
      saved.hundredMeaningMilestoneGranted ??
      (
        saved.unlockedWordIds.includes('grow') ||
        saved.unlockedWordIds.includes('flow') ||
        saved.unlockedWordIds.includes('understand')
      ),
    manualStampCount: Math.max(0, saved.manualStampCount ?? 0),
    activeWordStartedAt: saved.activeWordStartedAt ?? Date.now(),
    stampUpgradeLevel: Math.max(0, saved.stampUpgradeLevel ?? 0),
    filingUpgradeLevel: Math.max(0, saved.filingUpgradeLevel ?? 0),
    workbenchLayout: mergeWorkbenchLayout(saved.workbenchLayout),
    workbenchBoard,
    dreamUnlocked,
    totalMeaningEarned: savedTotalMeaningEarned,
    stats: mergeGlobalStats(saved.stats),
  };
}

```


## src/utils/milestones.ts

```ts
import type { WordId } from '../types/game';

export function getHundredMeaningUnlockWordIds(chosenFirstPath: WordId | null): WordId[] {
  if (chosenFirstPath === 'farm') {
    return ['grow', 'understand'];
  }

  if (chosenFirstPath === 'water') {
    return ['flow', 'understand'];
  }

  return ['understand'];
}

```


## src/utils/pathEvents.ts

```ts
import type { ActivePathEvent, PathEventType, VisibleEventType, VisiblePathEvent, WordDefinition, WordId } from '../types/game';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { max, mul } from './bigNumber.ts';
import { getVerbEffectMultiplier } from './upgrades.ts';

const EVENT_DURATION_MS = 20_000;
const EVENT_VISIBLE_MS = 10_000;
export const MIN_EVENT_DELAY_SECONDS = 90;
const DREAM_BLOOM_CURRENT_MEANING_PERCENT = 0.10;
const DREAM_BLOOM_MIN_TAP_MULTIPLIER = 10;
const SOFTENED_RULES_COST_MULTIPLIER = 0.75;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getEventSpawnMultiplier(
  activeWord: WordDefinition | null,
  effectiveVerb: WordDefinition | null = null,
): number {
  if (
    activeWord?.implemented &&
    activeWord.specialEffectType === 'event_spawn_bonus' &&
    typeof activeWord.specialEffectValue === 'number'
  ) {
    return 1 + activeWord.specialEffectValue * getVerbEffectMultiplier(effectiveVerb);
  }

  return 1;
}

export function getNextPathEventDelayMs(spawnMultiplier = 1): number {
  const minSeconds = 120;
  const maxSeconds = 240;
  const randomDelayMs = ((minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000) / Math.max(1, spawnMultiplier);
  return Math.max(randomDelayMs, MIN_EVENT_DELAY_SECONDS * 1000);
}

export function getPathEventType(chosenFirstPath: WordId | null): PathEventType | null {
  if (chosenFirstPath === 'farm') {
    return 'farm';
  }

  if (chosenFirstPath === 'water') {
    return 'water';
  }

  return null;
}

export function getAvailableEventTypes(chosenFirstPath: WordId | null, dreamUnlocked: boolean): VisibleEventType[] {
  const eventTypes: VisibleEventType[] = [];
  const pathEventType = getPathEventType(chosenFirstPath);

  if (pathEventType) {
    eventTypes.push(pathEventType);
  }

  if (dreamUnlocked) {
    eventTypes.push('dream-bloom', 'dream-softened-rules');
  }

  return eventTypes;
}

export function getRandomVisibleEventType(chosenFirstPath: WordId | null, dreamUnlocked: boolean): VisibleEventType | null {
  const eventTypes = getAvailableEventTypes(chosenFirstPath, dreamUnlocked);

  if (eventTypes.length === 0) {
    return null;
  }

  return eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

export function createVisiblePathEvent(type: VisibleEventType): VisiblePathEvent {
  const eventCopy: Record<VisibleEventType, Pick<VisiblePathEvent, 'name' | 'prompt'>> = {
    farm: { name: 'Harvest Window', prompt: 'Stamp now' },
    water: { name: 'Clear Current', prompt: 'Flow quickens' },
    'dream-bloom': { name: 'Meaning Bloom', prompt: 'Meaning flowers' },
    'dream-softened-rules': { name: 'Softened Rules', prompt: 'Costs blur' },
  };

  return {
    id: Date.now() + Math.random(),
    type,
    name: eventCopy[type].name,
    prompt: eventCopy[type].prompt,
    xPercent: 10 + Math.random() * 80,
    yPercent: 15 + Math.random() * 70,
    expiresAt: Date.now() + EVENT_VISIBLE_MS,
  };
}

export function createActivePathEvent(visibleEvent: VisiblePathEvent): ActivePathEvent {
  return {
    type: visibleEvent.type,
    name: visibleEvent.name,
    endsAt: Date.now() + EVENT_DURATION_MS,
  };
}

export function getFarmEventTapMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'farm' ? 2 : 1;
}

export function getSoftenedRulesUpgradeCostMultiplier(activePathEvent: ActivePathEvent | null): number {
  return activePathEvent?.type === 'dream-softened-rules' ? SOFTENED_RULES_COST_MULTIPLIER : 1;
}

export function getMeaningBloomGain(
  currentMeaning: BigNumberSource,
  currentTapGain: BigNumberSource,
): BigNumber {
  return max(
    mul(currentMeaning, DREAM_BLOOM_CURRENT_MEANING_PERCENT),
    mul(currentTapGain, DREAM_BLOOM_MIN_TAP_MULTIPLIER),
  );
}

export function getFlowEventIdleMultiplier(activePathEvent: ActivePathEvent | null, filingUpgradeLevel: number): number {
  if (activePathEvent?.type !== 'water') {
    return 1;
  }

  const flowEventBonusPercent = clamp(filingUpgradeLevel, 10, 100);
  return 1 + flowEventBonusPercent / 100;
}

export function getActivePathEventSecondsRemaining(activePathEvent: ActivePathEvent | null, now: number): number {
  if (!activePathEvent) {
    return 0;
  }

  return Math.max(0, Math.ceil((activePathEvent.endsAt - now) / 1000));
}

```


## src/utils/progression.ts

```ts
import type { BigNumberSource } from './bigNumber.ts';
import { gte } from './bigNumber.ts';

export const FIRST_CHOICE_COST = 1;

export function isFirstPathChoiceUnlocked(meaning: BigNumberSource): boolean {
  return gte(meaning, FIRST_CHOICE_COST);
}

```


## src/utils/stampInput.ts

```ts
export const STAMP_DRAG_THRESHOLD_PX = 8;

export interface StampInteractionState {
  movementDistance: number;
  isControlTarget?: boolean;
  isNoStampTarget?: boolean;
  dragWasActive?: boolean;
}

export function shouldStampFromPointerInteraction({
  movementDistance,
  isControlTarget = false,
  isNoStampTarget = false,
  dragWasActive = false,
}: StampInteractionState): boolean {
  return (
    movementDistance <= STAMP_DRAG_THRESHOLD_PX &&
    !isControlTarget &&
    !isNoStampTarget &&
    !dragWasActive
  );
}

export function isStampBlockedElement(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.closest('[data-no-stamp="true"]')) {
    return true;
  }

  return Boolean(target.closest('button,input,select,textarea,a'));
}

```


## src/utils/stats.ts

```ts
import type {
  GlobalStats,
  SerializedGlobalStats,
  SessionStats,
  TrackedStats,
  VisibleEventType,
} from '../types/game.ts';
import type { BigNumberSource } from './bigNumber.ts';
import { add, max, serializeBigNumber, toDecimal } from './bigNumber.ts';

function createTrackedStats(): TrackedStats {
  return {
    meaningEarnedFromTapping: toDecimal(0),
    meaningEarnedFromPassive: toDecimal(0),
    meaningEarnedFromEvents: toDecimal(0),
    manualStamps: 0,
    generatedTaps: 0,
    bestSingleTapGain: toDecimal(0),
    bestMeaningPerSecond: toDecimal(0),
    upgradesBought: 0,
    eventsSpawned: 0,
    eventsClaimed: 0,
    eventClaims: {
      farm: 0,
      water: 0,
      'dream-bloom': 0,
      'dream-softened-rules': 0,
    },
  };
}

export function createDefaultGlobalStats(): GlobalStats {
  return {
    ...createTrackedStats(),
    totalPlayTimeMs: 0,
  };
}

export function createDefaultSessionStats(startedAt = Date.now()): SessionStats {
  return {
    ...createTrackedStats(),
    startedAt,
  };
}

function safeCount(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value ?? 0)) : 0;
}

function safeBigNumber(value: BigNumberSource | null | undefined) {
  try {
    return max(value ?? 0, 0);
  } catch {
    return toDecimal(0);
  }
}

export function mergeGlobalStats(
  saved: Partial<SerializedGlobalStats | GlobalStats> | null | undefined,
): GlobalStats {
  const defaults = createDefaultGlobalStats();

  if (!saved) {
    return defaults;
  }

  return {
    meaningEarnedFromTapping: safeBigNumber(saved.meaningEarnedFromTapping),
    meaningEarnedFromPassive: safeBigNumber(saved.meaningEarnedFromPassive),
    meaningEarnedFromEvents: safeBigNumber(saved.meaningEarnedFromEvents),
    manualStamps: safeCount(saved.manualStamps),
    generatedTaps: safeCount(saved.generatedTaps),
    bestSingleTapGain: safeBigNumber(saved.bestSingleTapGain),
    bestMeaningPerSecond: safeBigNumber(saved.bestMeaningPerSecond),
    upgradesBought: safeCount(saved.upgradesBought),
    eventsSpawned: safeCount(saved.eventsSpawned),
    eventsClaimed: safeCount(saved.eventsClaimed),
    eventClaims: {
      farm: safeCount(saved.eventClaims?.farm),
      water: safeCount(saved.eventClaims?.water),
      'dream-bloom': safeCount(saved.eventClaims?.['dream-bloom']),
      'dream-softened-rules': safeCount(saved.eventClaims?.['dream-softened-rules']),
    },
    totalPlayTimeMs: Number.isFinite(saved.totalPlayTimeMs)
      ? Math.max(0, saved.totalPlayTimeMs ?? 0)
      : 0,
  };
}

export function serializeGlobalStats(stats: GlobalStats): SerializedGlobalStats {
  return {
    ...stats,
    meaningEarnedFromTapping: serializeBigNumber(stats.meaningEarnedFromTapping),
    meaningEarnedFromPassive: serializeBigNumber(stats.meaningEarnedFromPassive),
    meaningEarnedFromEvents: serializeBigNumber(stats.meaningEarnedFromEvents),
    bestSingleTapGain: serializeBigNumber(stats.bestSingleTapGain),
    bestMeaningPerSecond: serializeBigNumber(stats.bestMeaningPerSecond),
  };
}

export function recordTap<T extends TrackedStats>(stats: T, gain: BigNumberSource): T {
  return {
    ...stats,
    meaningEarnedFromTapping: add(stats.meaningEarnedFromTapping, gain),
    manualStamps: stats.manualStamps + 1,
    bestSingleTapGain: max(stats.bestSingleTapGain, gain),
  };
}

export function recordPassiveGain<T extends TrackedStats>(
  stats: T,
  gain: BigNumberSource,
  rate: BigNumberSource,
): T {
  return {
    ...stats,
    meaningEarnedFromPassive: add(stats.meaningEarnedFromPassive, gain),
    bestMeaningPerSecond: max(stats.bestMeaningPerSecond, rate),
  };
}

export function recordEventSpawn<T extends TrackedStats>(stats: T): T {
  return { ...stats, eventsSpawned: stats.eventsSpawned + 1 };
}

export function recordEventClaim<T extends TrackedStats>(
  stats: T,
  eventType: VisibleEventType,
  meaningGain: BigNumberSource = 0,
): T {
  return {
    ...stats,
    meaningEarnedFromEvents: add(stats.meaningEarnedFromEvents, meaningGain),
    eventsClaimed: stats.eventsClaimed + 1,
    eventClaims: {
      ...stats.eventClaims,
      [eventType]: stats.eventClaims[eventType] + 1,
    },
  };
}

export function recordUpgradePurchase<T extends TrackedStats>(stats: T): T {
  return { ...stats, upgradesBought: stats.upgradesBought + 1 };
}

export function getTrackedMeaningTotal(stats: TrackedStats) {
  return add(
    add(stats.meaningEarnedFromTapping, stats.meaningEarnedFromPassive),
    stats.meaningEarnedFromEvents,
  );
}

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}

```


## src/utils/storage.ts

```ts
import type { GameState, SerializedGameState, WordId } from '../types/game';
import { serializeBigNumber, toDecimal } from './bigNumber.ts';
import { serializeGlobalStats } from './stats.ts';

const STORAGE_KEY = 'approved-text-save-v4';
const OLD_STORAGE_KEYS = ['approved-text-save-v1', 'approved-text-save-v2', 'approved-text-save-v3'];

function isWordId(value: unknown): value is WordId {
  return (
    value === 'apple' ||
    value === 'world' ||
    value === 'understand' ||
    value === 'farm' ||
    value === 'seed' ||
    value === 'soil' ||
    value === 'root' ||
    value === 'grow' ||
    value === 'harvest' ||
    value === 'orchard' ||
    value === 'plow' ||
    value === 'fertile' ||
    value === 'season' ||
    value === 'water' ||
    value === 'rain' ||
    value === 'stream' ||
    value === 'river' ||
    value === 'flow' ||
    value === 'ice' ||
    value === 'pour' ||
    value === 'reservoir' ||
    value === 'tide' ||
    value === 'current' ||
    value === 'flood' ||
    value === 'ocean' ||
    value === 'dream' ||
    value === 'slumber' ||
    value === 'echo' ||
    value === 'clock' ||
    value === 'remember' ||
    value === 'acquire' ||
    value === 'chance' ||
    value === 'dice' ||
    value === 'omen' ||
    value === 'lucid' ||
    value === 'mirror' ||
    value === 'nightmare' ||
    value === 'vision' ||
    value === 'sleep' ||
    value === 'whim' ||
    value === 'miracle' ||
    value === 'accident'
  );
}

function isBigNumberSaveValue(value: unknown): value is number | string {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return false;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  }

  try {
    const decimal = toDecimal(value);
    return Number.isFinite(decimal.m) && Number.isFinite(decimal.e);
  } catch {
    return false;
  }
}

function isSavedGameState(value: unknown): value is SerializedGameState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const saved = value as Partial<SerializedGameState>;
  const workbenchLayoutValid =
    saved.workbenchLayout === undefined ||
    (
      typeof saved.workbenchLayout === 'object' &&
      saved.workbenchLayout !== null &&
      typeof saved.workbenchLayout.noun?.xPercent === 'number' &&
      typeof saved.workbenchLayout.noun?.yPercent === 'number' &&
      typeof saved.workbenchLayout.verb?.xPercent === 'number' &&
      typeof saved.workbenchLayout.verb?.yPercent === 'number'
    );
  const workbenchBoardValid =
    saved.workbenchBoard === undefined ||
    (
      typeof saved.workbenchBoard === 'object' &&
      saved.workbenchBoard !== null &&
      Array.isArray(saved.workbenchBoard.unlockedSlots) &&
      saved.workbenchBoard.unlockedSlots.every((slot) => typeof slot === 'number') &&
      typeof saved.workbenchBoard.placements === 'object' &&
      saved.workbenchBoard.placements !== null &&
      Object.entries(saved.workbenchBoard.placements).every(([wordId, slot]) => isWordId(wordId) && typeof slot === 'number')
    );

  return (
    isBigNumberSaveValue(saved.meaning) &&
    isWordId(saved.activeWordId) &&
    (isWordId(saved.activeNounId) || saved.activeNounId === undefined) &&
    (isWordId(saved.activeVerbId) || saved.activeVerbId === null || saved.activeVerbId === undefined) &&
    Array.isArray(saved.unlockedWordIds) &&
    saved.unlockedWordIds.every(isWordId) &&
    (isWordId(saved.chosenFirstPath) || saved.chosenFirstPath === null) &&
    isBigNumberSaveValue(saved.passiveMeaningPerSecond) &&
    (typeof saved.tenMeaningMilestoneGranted === 'boolean' || saved.tenMeaningMilestoneGranted === undefined) &&
    (
      typeof saved.twentyFiveMeaningMilestoneGranted === 'boolean' ||
      saved.twentyFiveMeaningMilestoneGranted === undefined
    ) &&
    (typeof saved.fiftyMeaningMilestoneGranted === 'boolean' || saved.fiftyMeaningMilestoneGranted === undefined) &&
    (typeof saved.hundredMeaningMilestoneGranted === 'boolean' || saved.hundredMeaningMilestoneGranted === undefined) &&
    (typeof saved.manualStampCount === 'number' || saved.manualStampCount === undefined) &&
    (typeof saved.activeWordStartedAt === 'number' || saved.activeWordStartedAt === undefined) &&
    (typeof saved.stampUpgradeLevel === 'number' || saved.stampUpgradeLevel === undefined) &&
    (typeof saved.filingUpgradeLevel === 'number' || saved.filingUpgradeLevel === undefined) &&
    workbenchLayoutValid &&
    workbenchBoardValid &&
    (typeof saved.dreamUnlocked === 'boolean' || saved.dreamUnlocked === undefined) &&
    (isBigNumberSaveValue(saved.totalMeaningEarned) || saved.totalMeaningEarned === undefined) &&
    (saved.stats === undefined || (typeof saved.stats === 'object' && saved.stats !== null)) &&
    (typeof saved.lastSavedAt === 'number' || saved.lastSavedAt === null || saved.lastSavedAt === undefined)
  );
}

export function parseSavedGameState(value: unknown): SerializedGameState | null {
  return isSavedGameState(value) ? value : null;
}

export function loadGameState(): SerializedGameState | null {
  try {
    const rawSave = window.localStorage.getItem(STORAGE_KEY);

    if (!rawSave) {
      return null;
    }

    const parsedSave: unknown = JSON.parse(rawSave);
    return parseSavedGameState(parsedSave);
  } catch {
    return null;
  }
}

export function serializeGameState(state: GameState): SerializedGameState {
  return {
    ...state,
    meaning: serializeBigNumber(state.meaning),
    passiveMeaningPerSecond: serializeBigNumber(state.passiveMeaningPerSecond),
    totalMeaningEarned: serializeBigNumber(state.totalMeaningEarned),
    stats: serializeGlobalStats(state.stats),
  };
}

export function saveGameState(state: GameState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeGameState(state)));
}

export function resetGameState(): void {
  window.localStorage.removeItem(STORAGE_KEY);

  for (const key of OLD_STORAGE_KEYS) {
    window.localStorage.removeItem(key);
  }
}

```


## src/utils/stream.ts

```ts
import type { WordDefinition } from '../types/game.ts';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { mul, toDecimal } from './bigNumber.ts';

export const STREAM_DRIZZLE_INTERVAL_SECONDS = 8;
export const STREAM_DRIZZLE_PASSIVE_SECONDS = 3;
export const UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS = 6;

export function isStreamDrizzleActive(activeNoun: WordDefinition): boolean {
  return (
    activeNoun.id === 'stream' &&
    activeNoun.implemented &&
    activeNoun.specialEffectType === 'periodic_passive_burst'
  );
}

export function getStreamDrizzlePassiveSeconds(
  activeNoun: WordDefinition,
  effectiveVerb: WordDefinition | null = null,
): number {
  if (!isStreamDrizzleActive(activeNoun)) {
    return 0;
  }

  return effectiveVerb?.id === 'understand'
    ? UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS
    : STREAM_DRIZZLE_PASSIVE_SECONDS;
}

export function getStreamDrizzleGain(
  currentPassiveGainPerSecond: BigNumberSource,
  activeNoun: WordDefinition,
  effectiveVerb: WordDefinition | null = null,
): BigNumber {
  const passiveSeconds = getStreamDrizzlePassiveSeconds(activeNoun, effectiveVerb);

  if (passiveSeconds === 0) {
    return toDecimal(0);
  }

  return mul(currentPassiveGainPerSecond, passiveSeconds);
}

```


## src/utils/upgrades.ts

```ts
import type { WordDefinition } from '../types/game';
import type { BigNumber, BigNumberSource } from './bigNumber.ts';
import { add, max as bigMax, mul, pow, toDecimal } from './bigNumber.ts';
import { getStreamDrizzlePassiveSeconds, STREAM_DRIZZLE_INTERVAL_SECONDS } from './stream.ts';

const UPGRADE_BASE_COST = 1;
const UPGRADE_COST_GROWTH = 1.15;
const UPGRADE_BONUS_PER_LEVEL = 0.001;
const UPGRADE_COST_FLOOR_BASE_MULTIPLIER = 0.25;
const UPGRADE_ABSOLUTE_MIN_COST = 0.1;
const FARM_TAP_MULTIPLIER = 1.25;
const FLOW_IDLE_MULTIPLIER = 1.25;
const RIVER_PASSIVE_GROWTH_PER_MINUTE = 0.01;
export const RIVER_PASSIVE_GROWTH_CAP = 2;
const ROOT_PROC_INTERVAL = 25;

export const UPGRADE_MILESTONES = [10, 25, 50, 100, 500, 1000];

export function getUpgradeCost(level: number): BigNumber {
  return mul(UPGRADE_BASE_COST, pow(UPGRADE_COST_GROWTH, level));
}

export function applyUpgradeCostFloor(
  baseCost: BigNumberSource,
  discountedCost: BigNumberSource,
): BigNumber {
  return bigMax(
    bigMax(discountedCost, mul(baseCost, UPGRADE_COST_FLOOR_BASE_MULTIPLIER)),
    UPGRADE_ABSOLUTE_MIN_COST,
  );
}

export function getUpgradeMilestoneMultiplier(level: number): number {
  const reachedMilestoneCount = UPGRADE_MILESTONES.filter((milestone) => level >= milestone).length;
  return 2 ** reachedMilestoneCount;
}

export function getNextUpgradeMilestone(level: number): number | null {
  return UPGRADE_MILESTONES.find((milestone) => level < milestone) ?? null;
}

export function getUpgradeBaseBonus(level: number): BigNumber {
  return toDecimal(level * UPGRADE_BONUS_PER_LEVEL);
}

export function getStampUpgradeBonus(level: number): BigNumber {
  return mul(getUpgradeBaseBonus(level), getUpgradeMilestoneMultiplier(level));
}

export function getFilingUpgradeBonus(level: number): BigNumber {
  return mul(getUpgradeBaseBonus(level), getUpgradeMilestoneMultiplier(level));
}

export function getPathTapMultiplier(word: WordDefinition): number {
  return word.pathId === 'manual' ? FARM_TAP_MULTIPLIER : 1;
}

export function getPathIdleMultiplier(word: WordDefinition): number {
  return word.pathId === 'idle' ? FLOW_IDLE_MULTIPLIER : 1;
}

export function getVerbNounBaseMultiplier(verb: WordDefinition | null): number {
  if (
    verb?.implemented &&
    verb.specialEffectType === 'double_noun_base' &&
    typeof verb.specialEffectValue === 'number'
  ) {
    return verb.specialEffectValue;
  }

  return 1;
}

export function getVerbEffectMultiplier(verb: WordDefinition | null): number {
  return getVerbNounBaseMultiplier(verb);
}

function applyVerbToBonusMultiplier(multiplier: number, verb: WordDefinition | null): number {
  return 1 + (multiplier - 1) * getVerbEffectMultiplier(verb);
}

function applyVerbToDiscountMultiplier(multiplier: number, verb: WordDefinition | null): number {
  return Math.max(0, 1 - (1 - multiplier) * getVerbEffectMultiplier(verb));
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function applyActiveWordStampBonus(
  baseBonus: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseBonus, applyVerbToBonusMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseBonus);
}

export function applyActiveWordFilingBonus(
  baseBonus: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_bonus_multiplier' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseBonus, applyVerbToBonusMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseBonus);
}

export function applyActiveWordStampDiscount(
  baseCost: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'stamp_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseCost, applyVerbToDiscountMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseCost);
}

export function applyActiveWordFilingDiscount(
  baseCost: BigNumberSource,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  if (
    word.implemented &&
    word.specialEffectType === 'filing_upgrade_discount' &&
    typeof word.specialEffectValue === 'number'
  ) {
    return mul(baseCost, applyVerbToDiscountMultiplier(word.specialEffectValue, verb));
  }

  return toDecimal(baseCost);
}

export function getEffectiveStampUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  return applyActiveWordStampBonus(getStampUpgradeBonus(level), word, verb);
}

export function getEffectiveFilingUpgradeBonus(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
): BigNumber {
  return applyActiveWordFilingBonus(getFilingUpgradeBonus(level), word, verb);
}

export function getEffectiveStampUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = mul(applyActiveWordStampDiscount(baseCost, word, verb), extraCostMultiplier);
  return applyUpgradeCostFloor(baseCost, discountedCost);
}

export function getEffectiveFilingUpgradeCost(
  level: number,
  word: WordDefinition,
  verb: WordDefinition | null = null,
  extraCostMultiplier = 1,
): BigNumber {
  const baseCost = getUpgradeCost(level);
  const discountedCost = mul(applyActiveWordFilingDiscount(baseCost, word, verb), extraCostMultiplier);
  return applyUpgradeCostFloor(baseCost, discountedCost);
}

export function getActiveWordTapMultiplier(
  word: WordDefinition,
  manualStampCount: number,
  verb: WordDefinition | null = null,
): number {
  if (
    word.implemented &&
    word.id === 'root' &&
    word.specialEffectType === 'tap_multiplier' &&
    typeof word.specialEffectValue === 'number' &&
    manualStampCount > 0 &&
    manualStampCount % ROOT_PROC_INTERVAL === 0
  ) {
    return word.specialEffectValue * getVerbEffectMultiplier(verb);
  }

  return 1;
}

export function getRootCharge(manualStampCount: number): number {
  return manualStampCount % ROOT_PROC_INTERVAL;
}

export function getRootChargeLabel(manualStampCount: number): string {
  return `${getRootCharge(manualStampCount)}/${ROOT_PROC_INTERVAL}`;
}

export function getActiveWordPassiveMultiplier(
  word: WordDefinition,
  activeWordStartedAt: number,
  now: number,
  verb: WordDefinition | null = null,
): number {
  return 1 + getRiverPassiveIncrease(word, activeWordStartedAt, now, verb);
}

export function getRiverPassiveIncrease(
  word: WordDefinition,
  activeWordStartedAt: number,
  now: number,
  verb: WordDefinition | null = null,
): number {
  if (!word.implemented || word.id !== 'river' || word.specialEffectType !== 'passive_multiplier') {
    return 0;
  }

  const elapsedMinutes = Math.max(0, now - activeWordStartedAt) / 60000;
  const uncappedIncrease = elapsedMinutes * RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb);
  return Math.min(uncappedIncrease, RIVER_PASSIVE_GROWTH_CAP);
}

export function getTapGain(
  word: WordDefinition,
  stampUpgradeLevel: number,
  verb: WordDefinition | null = null,
): BigNumber {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return mul(
    add(
      mul(word.tapValue, verbNounBaseMultiplier),
      getEffectiveStampUpgradeBonus(stampUpgradeLevel, word, verb),
    ),
    getPathTapMultiplier(word),
  );
}

export function getPassiveGain(
  word: WordDefinition,
  filingUpgradeLevel: number,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
  verb: WordDefinition | null = null,
): BigNumber {
  const verbNounBaseMultiplier = getVerbNounBaseMultiplier(verb);

  return mul(
    mul(
      add(
        mul(word.passiveValue, verbNounBaseMultiplier),
        getEffectiveFilingUpgradeBonus(filingUpgradeLevel, word, verb),
      ),
      getPathIdleMultiplier(word),
    ),
    getActiveWordPassiveMultiplier(word, activeWordStartedAt, now, verb),
  );
}

export function getPathBonusLabel(word: WordDefinition): string {
  if (word.pathId === 'manual') {
    return 'Path bonus: +25% tapping power';
  }

  if (word.pathId === 'idle') {
    return 'Path bonus: +25% passive Meaning/sec';
  }

  return 'Path bonus: none';
}

export function getActiveWordPowerLabel(
  word: WordDefinition,
  verb: WordDefinition | null = null,
  activeWordStartedAt = Date.now(),
  now = Date.now(),
): string | null {
  if (!word.implemented) {
    return null;
  }

  if (word.id === 'seed') {
    return `Stamp Upgrade bonus +${formatPercent((applyVerbToBonusMultiplier(1.1, verb) - 1))}`;
  }

  if (word.id === 'rain') {
    return `Filing Upgrade bonus +${formatPercent((applyVerbToBonusMultiplier(1.1, verb) - 1))}`;
  }

  if (word.id === 'soil') {
    return `Stamp Upgrade cost -${formatPercent(1 - applyVerbToDiscountMultiplier(0.95, verb))}`;
  }

  if (word.id === 'stream') {
    return `Every ${STREAM_DRIZZLE_INTERVAL_SECONDS}s, gain ${getStreamDrizzlePassiveSeconds(word, verb)}s of passive Meaning`;
  }

  if (word.id === 'root') {
    return `Every 25th stamp gives x${5 * getVerbEffectMultiplier(verb)} tap gain`;
  }

  if (word.id === 'river') {
    const currentIncrease = getRiverPassiveIncrease(word, activeWordStartedAt, now, verb);
    const currentPercent = currentIncrease * 100;
    const displayedPercent = Number.isInteger(currentPercent) ? currentPercent.toFixed(0) : currentPercent.toFixed(1);
    return `Passive +${displayedPercent}% (+${formatPercent(RIVER_PASSIVE_GROWTH_PER_MINUTE * getVerbEffectMultiplier(verb))}/min, cap +200%)`;
  }

  if (word.id === 'slumber') {
    return `Events appear ${30 * getVerbEffectMultiplier(verb)}% more often`;
  }

  if (word.id === 'understand') {
    return 'Doubles the active noun base tap and passive values';
  }

  return null;
}

export function getStampUpgradeBonusModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'stamp_upgrade_bonus_multiplier'
    ? `${word.text} +${formatPercent(applyVerbToBonusMultiplier(word.specialEffectValue ?? 1, verb) - 1)}`
    : null;
}

export function getFilingUpgradeBonusModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'filing_upgrade_bonus_multiplier'
    ? `${word.text} +${formatPercent(applyVerbToBonusMultiplier(word.specialEffectValue ?? 1, verb) - 1)}`
    : null;
}

export function getStampUpgradeDiscountModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'stamp_upgrade_discount'
    ? `${word.text} -${formatPercent(1 - applyVerbToDiscountMultiplier(word.specialEffectValue ?? 1, verb))}`
    : null;
}

export function getFilingUpgradeDiscountModifierLabel(word: WordDefinition, verb: WordDefinition | null = null): string | null {
  return word.implemented && word.specialEffectType === 'filing_upgrade_discount'
    ? `${word.text} -${formatPercent(1 - applyVerbToDiscountMultiplier(word.specialEffectValue ?? 1, verb))}`
    : null;
}

```


## src/utils/workbench.ts

```ts
import { getWordById } from '../data/words.ts';
import type { ParsedSentence, WordId, WorkbenchBoard, WorkbenchGridSlot } from '../types/game';
import type { BigNumberSource } from './bigNumber.ts';
import { lt } from './bigNumber.ts';

export const WORKBENCH_GRID_SIZE = 3;
export const WORKBENCH_SLOT_COUNT = 9;
export const STARTING_WORKBENCH_SLOT: WorkbenchGridSlot = 0;
export const FIRST_VERB_WORKBENCH_SLOT: WorkbenchGridSlot = 1;

export function createDefaultWorkbenchBoard(): WorkbenchBoard {
  return {
    unlockedSlots: [STARTING_WORKBENCH_SLOT],
    placements: {
      world: STARTING_WORKBENCH_SLOT,
    },
  };
}

export function isWorkbenchGridSlot(value: number): value is WorkbenchGridSlot {
  return Number.isInteger(value) && value >= 0 && value < WORKBENCH_SLOT_COUNT;
}

export function getSlotCenter(slot: WorkbenchGridSlot): { xPercent: number; yPercent: number } {
  return {
    xPercent: (slot % WORKBENCH_GRID_SIZE) * (100 / WORKBENCH_GRID_SIZE) + (100 / WORKBENCH_GRID_SIZE) / 2,
    yPercent: Math.floor(slot / WORKBENCH_GRID_SIZE) * (100 / WORKBENCH_GRID_SIZE) + (100 / WORKBENCH_GRID_SIZE) / 2,
  };
}

export function getNearestWorkbenchSlot(xPercent: number, yPercent: number): WorkbenchGridSlot {
  const col = Math.max(0, Math.min(2, Math.floor(xPercent / (100 / WORKBENCH_GRID_SIZE))));
  const row = Math.max(0, Math.min(2, Math.floor(yPercent / (100 / WORKBENCH_GRID_SIZE))));
  return (row * WORKBENCH_GRID_SIZE + col) as WorkbenchGridSlot;
}

export function normalizeWorkbenchBoard(board: WorkbenchBoard | undefined): WorkbenchBoard {
  if (!board) {
    return createDefaultWorkbenchBoard();
  }

  const unlockedSlots = Array.from(new Set([
    STARTING_WORKBENCH_SLOT,
    ...(board.unlockedSlots ?? []).filter(isWorkbenchGridSlot),
  ])).sort((a, b) => a - b) as WorkbenchGridSlot[];
  const placements: WorkbenchBoard['placements'] = {};

  for (const [wordId, slot] of Object.entries(board.placements ?? {}) as [WordId, WorkbenchGridSlot][]) {
    if (isWorkbenchGridSlot(slot) && unlockedSlots.includes(slot)) {
      placements[wordId] = slot;
    }
  }

  if (!Object.values(placements).includes(STARTING_WORKBENCH_SLOT)) {
    placements.world = STARTING_WORKBENCH_SLOT;
  }

  return {
    unlockedSlots,
    placements,
  };
}

export function unlockWorkbenchSlotsForProgress(board: WorkbenchBoard, meaning: BigNumberSource): WorkbenchBoard {
  if (lt(meaning, 100) || board.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT)) {
    return board;
  }

  return {
    ...board,
    unlockedSlots: [...board.unlockedSlots, FIRST_VERB_WORKBENCH_SLOT].sort((a, b) => a - b) as WorkbenchGridSlot[],
  };
}

export function migrateActiveWordsToWorkbenchBoard(
  board: WorkbenchBoard | undefined,
  activeNounId: WordId,
  activeVerbId: WordId | null,
): WorkbenchBoard {
  const nextBoard = normalizeWorkbenchBoard(board);
  const placements = { ...nextBoard.placements };

  if (!Object.prototype.hasOwnProperty.call(placements, activeNounId)) {
    placements[activeNounId] = STARTING_WORKBENCH_SLOT;
  }

  if (
    activeVerbId &&
    nextBoard.unlockedSlots.includes(FIRST_VERB_WORKBENCH_SLOT) &&
    !Object.prototype.hasOwnProperty.call(placements, activeVerbId)
  ) {
    placements[activeVerbId] = FIRST_VERB_WORKBENCH_SLOT;
  }

  return {
    ...nextBoard,
    placements,
  };
}

export function moveWorkbenchWordToSlot(
  board: WorkbenchBoard,
  wordId: WordId,
  targetSlot: WorkbenchGridSlot,
): { board: WorkbenchBoard; moved: boolean } {
  if (!board.unlockedSlots.includes(targetSlot)) {
    return { board, moved: false };
  }

  const currentSlot = board.placements[wordId];
  const occupyingWordId = (Object.entries(board.placements) as [WordId, WorkbenchGridSlot][])
    .find(([, slot]) => slot === targetSlot)?.[0] ?? null;
  const placements = { ...board.placements, [wordId]: targetSlot };

  if (occupyingWordId && occupyingWordId !== wordId && currentSlot !== undefined) {
    placements[occupyingWordId] = currentSlot;
  }

  return {
    board: {
      ...board,
      placements,
    },
    moved: true,
  };
}

export function placeWorkbenchWord(
  board: WorkbenchBoard,
  wordId: WordId,
  replacedWordId: WordId | null,
  fallbackSlot: WorkbenchGridSlot,
): WorkbenchBoard {
  const placements = { ...board.placements };
  const preferredSlot = replacedWordId ? placements[replacedWordId] : undefined;
  const targetSlot = preferredSlot ?? fallbackSlot;

  if (replacedWordId) {
    delete placements[replacedWordId];
  }

  if (!board.unlockedSlots.includes(targetSlot)) {
    return {
      ...board,
      placements,
    };
  }

  return {
    ...board,
    placements: {
      ...placements,
      [wordId]: targetSlot,
    },
  };
}

export function parseWorkbenchSentence(
  board: WorkbenchBoard,
  fallbackNounId: WordId,
): ParsedSentence {
  const orderedEntries = (Object.entries(board.placements) as [WordId, WorkbenchGridSlot][])
    .filter(([, slot]) => board.unlockedSlots.includes(slot))
    .sort(([, firstSlot], [, secondSlot]) => firstSlot - secondSlot);
  const orderedWordIds = orderedEntries.map(([wordId]) => wordId);
  const firstNounId = orderedWordIds.find((wordId) => getWordById(wordId).type === 'noun') ?? fallbackNounId;
  const firstVerbIndex = orderedWordIds.findIndex((wordId) => getWordById(wordId).type === 'verb');
  const nounAfterVerbId = firstVerbIndex >= 0
    ? orderedWordIds.slice(firstVerbIndex + 1).find((wordId) => getWordById(wordId).type === 'noun') ?? null
    : null;
  const effectiveVerbId = nounAfterVerbId
    ? orderedWordIds[firstVerbIndex]
    : null;
  const activeNounId = nounAfterVerbId ?? firstNounId;
  const sentenceText = orderedWordIds.map((wordId) => getWordById(wordId).text).join(' ');

  if (effectiveVerbId && nounAfterVerbId) {
    return {
      orderedWordIds,
      activeNounId,
      effectiveVerbId,
      sentenceText,
      feedback: `Sentence: ${getWordById(effectiveVerbId).text} ${getWordById(nounAfterVerbId).text}`,
    };
  }

  if (firstVerbIndex >= 0) {
    return {
      orderedWordIds,
      activeNounId,
      effectiveVerbId: null,
      sentenceText,
      feedback: orderedWordIds.length > 1
        ? 'Sentence inactive: place a verb before a noun.'
        : `${getWordById(orderedWordIds[firstVerbIndex]).text} waits for a word.`,
    };
  }

  return {
    orderedWordIds,
    activeNounId,
    effectiveVerbId: null,
    sentenceText,
    feedback: sentenceText || getWordById(fallbackNounId).text,
  };
}

```


## src/vite-env.d.ts

```ts
/// <reference types="vite/client" />

```


# Test files


## tests/game-logic.test.ts

```ts
import assert from 'node:assert/strict';
import { getUnlockedWords, getWordById, words } from '../src/data/words.ts';
import { createDefaultState, mergeSavedState } from '../src/utils/gameState.ts';
import {
  add,
  eq,
  formatMeaning,
  formatRate,
  gte,
  isDecimal,
  sub,
  toDecimal,
} from '../src/utils/bigNumber.ts';
import type { BigNumberSource } from '../src/utils/bigNumber.ts';
import { parseSavedGameState, serializeGameState } from '../src/utils/storage.ts';
import { getHundredMeaningUnlockWordIds } from '../src/utils/milestones.ts';
import { canTriggerDreamUnlock, unlockDreamLayer } from '../src/utils/dream.ts';
import {
  FIRST_VERB_WORKBENCH_SLOT,
  STARTING_WORKBENCH_SLOT,
  createDefaultWorkbenchBoard,
  moveWorkbenchWordToSlot,
  parseWorkbenchSentence,
  unlockWorkbenchSlotsForProgress,
} from '../src/utils/workbench.ts';
import {
  applyUpgradeCostFloor,
  getActiveWordPassiveMultiplier,
  getActiveWordPowerLabel,
  getActiveWordTapMultiplier,
  getEffectiveFilingUpgradeBonus,
  getEffectiveFilingUpgradeCost,
  getEffectiveStampUpgradeBonus,
  getEffectiveStampUpgradeCost,
  getPassiveGain,
  getRiverPassiveIncrease,
  getRootCharge,
  getRootChargeLabel,
  getTapGain,
  getUpgradeCost,
  RIVER_PASSIVE_GROWTH_CAP,
} from '../src/utils/upgrades.ts';
import {
  getEventSpawnMultiplier,
  getAvailableEventTypes,
  getFarmEventTapMultiplier,
  getFlowEventIdleMultiplier,
  getMeaningBloomGain,
  MIN_EVENT_DELAY_SECONDS,
  getNextPathEventDelayMs,
  getSoftenedRulesUpgradeCostMultiplier,
} from '../src/utils/pathEvents.ts';
import { shouldStampFromPointerInteraction } from '../src/utils/stampInput.ts';
import type { GameState, WorkbenchBoard } from '../src/types/game.ts';
import { gameQuotes, selectQuoteIndex } from '../src/data/quotes.ts';
import { FIRST_CHOICE_COST, isFirstPathChoiceUnlocked } from '../src/utils/progression.ts';
import {
  createDefaultGlobalStats,
  createDefaultSessionStats,
  getTrackedMeaningTotal,
  mergeGlobalStats,
  recordEventClaim,
  recordPassiveGain,
  recordTap,
  recordUpgradePurchase,
} from '../src/utils/stats.ts';
import {
  getStreamDrizzleGain,
  getStreamDrizzlePassiveSeconds,
  isStreamDrizzleActive,
  STREAM_DRIZZLE_INTERVAL_SECONDS,
  STREAM_DRIZZLE_PASSIVE_SECONDS,
  UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS,
} from '../src/utils/stream.ts';

function nearlyEqual(actual: BigNumberSource, expected: BigNumberSource): void {
  assert.ok(
    toDecimal(sub(actual, expected)).abs().lt(0.000001),
    `Expected ${toDecimal(actual).toString()} to equal ${toDecimal(expected).toString()}`,
  );
}

const seed = getWordById('seed');
const water = getWordById('water');
const rain = getWordById('rain');
const soil = getWordById('soil');
const root = getWordById('root');
const river = getWordById('river');
const stream = getWordById('stream');
const understand = getWordById('understand');
const world = getWordById('world');
const slumber = getWordById('slumber');

assert.equal(FIRST_CHOICE_COST, 1);
assert.equal(isFirstPathChoiceUnlocked(0.99), false);
assert.equal(isFirstPathChoiceUnlocked(1), true);
assert.equal(isFirstPathChoiceUnlocked(2), true);
assert.equal(getWordById('farm').unlockMeaning, 1);
assert.equal(getWordById('farm').unlockCost, 1);
assert.equal(getWordById('water').unlockMeaning, 1);
assert.equal(getWordById('water').unlockCost, 1);

assert.ok(gameQuotes.length > 0);
for (const quote of gameQuotes) {
  assert.ok(quote.text.length > 0);
  assert.ok(quote.author.length > 0);
}
assert.equal(selectQuoteIndex(gameQuotes.length, null, 0), 0);
assert.notEqual(selectQuoteIndex(gameQuotes.length, 0, 0), 0);
assert.equal(selectQuoteIndex(0), -1);

const wordIds = words.map((word) => word.id);
assert.equal(new Set(wordIds).size, wordIds.length);

for (const word of words) {
  assert.ok(word.id.length > 0);
  assert.ok(word.text.length > 0);
  assert.ok(['noun', 'verb', 'adjective'].includes(word.type));
  assert.ok(word.pathId.length > 0);
  assert.ok(word.pathLabel.length > 0);
  assert.ok(word.pathTheme.length > 0);
  assert.ok(word.description.length > 0);
  assert.ok(word.effectDescription.length > 0);
  assert.ok(Number.isFinite(word.unlockMeaning) && word.unlockMeaning >= 0);
  assert.ok(Number.isFinite(word.tapValue) && word.tapValue >= 0);
  assert.ok(Number.isFinite(word.passiveValue) && word.passiveValue >= 0);
  assert.equal(typeof word.implemented, 'boolean');
}

const requiredPlannedWordIds = [
  'grow',
  'harvest',
  'season',
  'flow',
  'ice',
  'pour',
  'echo',
  'clock',
  'remember',
  'acquire',
  'omen',
  'lucid',
  'mirror',
  'nightmare',
  'miracle',
  'accident',
] as const;

for (const wordId of requiredPlannedWordIds) {
  const plannedWord = getWordById(wordId);
  assert.equal(plannedWord.implemented, false);
  assert.equal(getActiveWordPowerLabel(plannedWord), null);
  assert.equal(getActiveWordTapMultiplier(plannedWord, 25), 1);
  assert.equal(getActiveWordPassiveMultiplier(plannedWord, 0, 60000), 1);
  assert.equal(getEventSpawnMultiplier(plannedWord), 1);
}

const defaultState = createDefaultState();
assert.equal(isDecimal(defaultState.meaning), true);
nearlyEqual(defaultState.meaning, 0);
assert.equal(defaultState.activeNounId, 'world');
assert.equal(defaultState.activeWordId, 'world');
assert.deepEqual(defaultState.unlockedWordIds, ['world']);
assert.deepEqual(defaultState.workbenchBoard.unlockedSlots, [STARTING_WORKBENCH_SLOT]);
assert.equal(defaultState.workbenchBoard.placements.world, STARTING_WORKBENCH_SLOT);
const defaultDictionaryWordIds = getUnlockedWords(defaultState.unlockedWordIds).map((word) => word.id);
assert.deepEqual(defaultDictionaryWordIds, ['world']);
assert.equal(requiredPlannedWordIds.some((wordId) => defaultDictionaryWordIds.includes(wordId)), false);
nearlyEqual(defaultState.stats.meaningEarnedFromTapping, 0);
nearlyEqual(defaultState.stats.meaningEarnedFromPassive, 0);
nearlyEqual(defaultState.stats.meaningEarnedFromEvents, 0);
assert.equal(defaultState.stats.manualStamps, 0);
assert.equal(defaultState.stats.totalPlayTimeMs, 0);

const defaultSessionStats = createDefaultSessionStats(1000);
assert.equal(defaultSessionStats.startedAt, 1000);
assert.equal(defaultSessionStats.manualStamps, 0);

const tappedGlobalStats = recordTap(createDefaultGlobalStats(), 2.5);
assert.equal(tappedGlobalStats.manualStamps, 1);
nearlyEqual(tappedGlobalStats.meaningEarnedFromTapping, 2.5);
nearlyEqual(tappedGlobalStats.bestSingleTapGain, 2.5);

const passiveGlobalStats = recordPassiveGain(tappedGlobalStats, 1.25, 3.5);
nearlyEqual(passiveGlobalStats.meaningEarnedFromPassive, 1.25);
nearlyEqual(passiveGlobalStats.bestMeaningPerSecond, 3.5);

const eventGlobalStats = recordEventClaim(passiveGlobalStats, 'dream-bloom', 10);
assert.equal(eventGlobalStats.eventsClaimed, 1);
assert.equal(eventGlobalStats.eventClaims['dream-bloom'], 1);
nearlyEqual(eventGlobalStats.meaningEarnedFromEvents, 10);
nearlyEqual(getTrackedMeaningTotal(eventGlobalStats), 13.75);
assert.equal(recordUpgradePurchase(eventGlobalStats).upgradesBought, 1);

assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0 }), true);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 5 }), true);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 9 }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, isControlTarget: true }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, isNoStampTarget: true }), false);
assert.equal(shouldStampFromPointerInteraction({ movementDistance: 0, dragWasActive: true }), false);

assert.equal(understand.unlockMeaning, 100);
assert.equal(understand.type, 'verb');
assert.equal(understand.specialEffectType, 'double_noun_base');
assert.deepEqual(getHundredMeaningUnlockWordIds('farm'), ['grow', 'understand']);
assert.deepEqual(getHundredMeaningUnlockWordIds('water'), ['flow', 'understand']);
nearlyEqual(water.passiveValue, 0.003);
nearlyEqual(rain.passiveValue, 0.006);
nearlyEqual(world.tapValue, 0.01);
assert.equal(world.implemented, true);
assert.equal(slumber.type, 'noun');
assert.equal(slumber.specialEffectType, 'event_spawn_bonus');
nearlyEqual(slumber.specialEffectValue ?? 0, 0.3);
nearlyEqual(getEventSpawnMultiplier(slumber), 1.3);
nearlyEqual(getEventSpawnMultiplier(slumber, understand), 1.6);
nearlyEqual(getTapGain(slumber, 0), 0.03);
nearlyEqual(getPassiveGain(slumber, 0, 0, 0), 0.03);
nearlyEqual(getTapGain(slumber, 0, understand), 0.06);
nearlyEqual(getPassiveGain(slumber, 0, 0, 0, understand), 0.06);
assert.equal(MIN_EVENT_DELAY_SECONDS, 90);
assert.equal(getUnlockedWords(defaultState.unlockedWordIds).some((word) => word.id === 'slumber'), false);

const oldNounSave = {
  meaning: 12,
  activeWordId: 'seed',
  unlockedWordIds: ['apple', 'farm', 'seed'],
  chosenFirstPath: 'farm',
  passiveMeaningPerSecond: 0,
  tenMeaningMilestoneGranted: true,
  stampUpgradeLevel: 0,
  filingUpgradeLevel: 0,
  lastSavedAt: null,
} as unknown as GameState;

const migratedNounSave = mergeSavedState(oldNounSave);
assert.notEqual(parseSavedGameState(oldNounSave), null);
nearlyEqual(migratedNounSave.meaning, 12);
assert.equal(migratedNounSave.activeNounId, 'seed');
assert.equal(migratedNounSave.activeVerbId, null);
assert.ok(migratedNounSave.unlockedWordIds.includes('world'));
assert.ok(!migratedNounSave.unlockedWordIds.includes('apple'));
assert.equal(migratedNounSave.stats.manualStamps, 0);
nearlyEqual(migratedNounSave.stats.meaningEarnedFromTapping, 0);

const hugeMeaningState = {
  ...defaultState,
  meaning: toDecimal('1e1000'),
  passiveMeaningPerSecond: toDecimal('2.5e500'),
  totalMeaningEarned: toDecimal('3e1000'),
};
const serializedHugeMeaningState = serializeGameState(hugeMeaningState);
assert.notEqual(parseSavedGameState(serializedHugeMeaningState), null);
assert.equal(typeof serializedHugeMeaningState.meaning, 'string');
assert.equal(typeof serializedHugeMeaningState.passiveMeaningPerSecond, 'string');
assert.equal(typeof serializedHugeMeaningState.totalMeaningEarned, 'string');
assert.equal(typeof serializedHugeMeaningState.stats?.meaningEarnedFromTapping, 'string');
const loadedHugeMeaningState = mergeSavedState(serializedHugeMeaningState);
assert.equal(eq(loadedHugeMeaningState.meaning, '1e1000'), true);
assert.equal(eq(loadedHugeMeaningState.passiveMeaningPerSecond, '2.5e500'), true);
assert.equal(eq(loadedHugeMeaningState.totalMeaningEarned, '3e1000'), true);

const savedStatsState = {
  ...hugeMeaningState,
  stats: {
    ...eventGlobalStats,
    meaningEarnedFromTapping: toDecimal('1e500'),
    totalPlayTimeMs: 123456,
  },
};
const loadedStatsState = mergeSavedState(serializeGameState(savedStatsState));
assert.equal(eq(loadedStatsState.stats.meaningEarnedFromTapping, '1e500'), true);
nearlyEqual(loadedStatsState.stats.meaningEarnedFromPassive, 1.25);
assert.equal(loadedStatsState.stats.eventsClaimed, 1);
assert.equal(loadedStatsState.stats.totalPlayTimeMs, 123456);
nearlyEqual(mergeGlobalStats({ meaningEarnedFromTapping: 'not-a-number' }).meaningEarnedFromTapping, 0);

assert.equal(eq(add('1e1000', '2e1000'), '3e1000'), true);
assert.equal(gte(toDecimal('1e1000'), getUpgradeCost(1000)), true);
assert.equal(gte(toDecimal(0.5), getUpgradeCost(0)), false);
assert.equal(formatMeaning(999.99), '999.99');
assert.equal(formatMeaning(1234), '1.23K');
assert.equal(formatMeaning(1.23e6), '1.23M');
assert.equal(formatMeaning('1.23e9'), '1.23e9');
assert.equal(formatRate(0.005), '0.005');
assert.equal(formatMeaning(getUpgradeCost(0)), '1.00');

const oldStarterSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'apple',
  activeNounId: 'apple',
  unlockedWordIds: ['apple'],
  chosenFirstPath: null,
} as unknown as GameState);
assert.equal(oldStarterSave.activeNounId, 'world');
assert.equal(oldStarterSave.activeWordId, 'world');
assert.deepEqual(oldStarterSave.unlockedWordIds, ['world']);

const oldVerbSave = {
  ...oldNounSave,
  activeWordId: 'grow',
  unlockedWordIds: ['apple', 'farm', 'seed', 'soil', 'root', 'grow'],
  hundredMeaningMilestoneGranted: true,
} as unknown as GameState;

const migratedVerbSave = mergeSavedState(oldVerbSave);
assert.equal(migratedVerbSave.activeNounId, 'world');
assert.equal(migratedVerbSave.activeVerbId, 'grow');
assert.ok(migratedVerbSave.unlockedWordIds.includes('understand'));
assert.deepEqual(migratedVerbSave.workbenchLayout, {
  noun: { xPercent: 7, yPercent: 14 },
  verb: { xPercent: 47, yPercent: 14 },
});

const dreamSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'world',
  activeNounId: 'world',
  activeVerbId: 'understand',
  unlockedWordIds: ['world', 'farm', 'understand'],
  meaning: 100,
  dreamUnlocked: true,
  totalMeaningEarned: 150,
} as unknown as GameState);
assert.equal(dreamSave.dreamUnlocked, true);
assert.ok(dreamSave.unlockedWordIds.includes('slumber'));
nearlyEqual(dreamSave.totalMeaningEarned, 150);

assert.equal(canTriggerDreamUnlock(99.99, world, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, false), true);
assert.equal(canTriggerDreamUnlock(100, seed, understand, false), false);
assert.equal(canTriggerDreamUnlock(100, world, null, false), false);
assert.equal(canTriggerDreamUnlock(100, world, understand, true), false);

const unlockedTwoSlotBoard = unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 100);
assert.deepEqual(unlockedTwoSlotBoard.unlockedSlots, [0, 1]);
assert.equal(unlockWorkbenchSlotsForProgress(createDefaultWorkbenchBoard(), 99).unlockedSlots.includes(1), false);

const lockedMove = moveWorkbenchWordToSlot(createDefaultWorkbenchBoard(), 'world', 1);
assert.equal(lockedMove.moved, false);
assert.equal(lockedMove.board.placements.world, 0);

const understandWorldBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    world: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandWorld = parseWorkbenchSentence(understandWorldBoard, 'world');
assert.equal(parsedUnderstandWorld.activeNounId, 'world');
assert.equal(parsedUnderstandWorld.effectiveVerbId, 'understand');
assert.equal(parsedUnderstandWorld.feedback, 'Sentence: Understand World');
assert.equal(canTriggerDreamUnlock(100, getWordById(parsedUnderstandWorld.activeNounId), understand, false), true);
nearlyEqual(getTapGain(world, 0, understand), 0.02);

const stateBeforeDream = {
  ...defaultState,
  meaning: toDecimal(125),
  chosenFirstPath: 'farm',
  stampUpgradeLevel: 4,
  filingUpgradeLevel: 3,
  workbenchBoard: understandWorldBoard,
} as GameState;
const stateAfterDream = unlockDreamLayer(stateBeforeDream);
assert.equal(stateBeforeDream.dreamUnlocked, false);
assert.equal(stateAfterDream.dreamUnlocked, true);
assert.equal(stateAfterDream.chosenFirstPath, 'farm');
nearlyEqual(stateAfterDream.meaning, 125);
assert.equal(stateAfterDream.stampUpgradeLevel, 4);
assert.equal(stateAfterDream.filingUpgradeLevel, 3);
assert.equal(stateAfterDream.workbenchBoard, stateBeforeDream.workbenchBoard);
assert.equal(getUnlockedWords(stateAfterDream.unlockedWordIds).some((word) => word.id === 'slumber'), true);
assert.deepEqual(getAvailableEventTypes('farm', true), ['farm', 'dream-bloom', 'dream-softened-rules']);
assert.deepEqual(getAvailableEventTypes('water', true), ['water', 'dream-bloom', 'dream-softened-rules']);

const worldUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    world: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedWorldUnderstand = parseWorkbenchSentence(worldUnderstandBoard, 'world');
assert.equal(parsedWorldUnderstand.activeNounId, 'world');
assert.equal(parsedWorldUnderstand.effectiveVerbId, null);
assert.equal(parsedWorldUnderstand.feedback, 'Sentence inactive: place a verb before a noun.');
assert.equal(canTriggerDreamUnlock(100, getWordById(parsedWorldUnderstand.activeNounId), null, false), false);
nearlyEqual(getTapGain(world, 0, null), 0.01);

const understandRootBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    root: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandRoot = parseWorkbenchSentence(understandRootBoard, 'root');
assert.equal(parsedUnderstandRoot.activeNounId, 'root');
assert.equal(parsedUnderstandRoot.effectiveVerbId, 'understand');
assert.equal(getActiveWordTapMultiplier(root, 25, understand), 10);

const rootUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    root: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedRootUnderstand = parseWorkbenchSentence(rootUnderstandBoard, 'root');
assert.equal(parsedRootUnderstand.activeNounId, 'root');
assert.equal(parsedRootUnderstand.effectiveVerbId, null);
assert.equal(getActiveWordTapMultiplier(root, 25, null), 5);

const understandStreamBoard = {
  unlockedSlots: [0, 1],
  placements: {
    understand: 0,
    stream: 1,
  },
} as WorkbenchBoard;
const parsedUnderstandStream = parseWorkbenchSentence(understandStreamBoard, 'stream');
assert.equal(parsedUnderstandStream.activeNounId, 'stream');
assert.equal(parsedUnderstandStream.effectiveVerbId, 'understand');

const streamUnderstandBoard = {
  unlockedSlots: [0, 1],
  placements: {
    stream: 0,
    understand: 1,
  },
} as WorkbenchBoard;
const parsedStreamUnderstand = parseWorkbenchSentence(streamUnderstandBoard, 'stream');
assert.equal(parsedStreamUnderstand.activeNounId, 'stream');
assert.equal(parsedStreamUnderstand.effectiveVerbId, null);

const swappedBoard = moveWorkbenchWordToSlot(understandWorldBoard, 'world', 0);
assert.equal(swappedBoard.moved, true);
assert.equal(swappedBoard.board.placements.world, 0);
assert.equal(swappedBoard.board.placements.understand, 1);

const layoutSave = mergeSavedState({
  ...oldNounSave,
  workbenchLayout: {
    noun: { xPercent: 12, yPercent: 22 },
    verb: { xPercent: 55, yPercent: 18 },
  },
} as unknown as GameState);
assert.deepEqual(layoutSave.workbenchLayout, {
  noun: { xPercent: 12, yPercent: 22 },
  verb: { xPercent: 55, yPercent: 18 },
});

const boardSave = mergeSavedState({
  ...oldNounSave,
  activeWordId: 'world',
  activeNounId: 'world',
  activeVerbId: 'understand',
  unlockedWordIds: ['world', 'understand'],
  meaning: 100,
  workbenchBoard: understandWorldBoard,
} as unknown as GameState);
assert.equal(boardSave.workbenchBoard.placements.understand, 0);
assert.equal(boardSave.workbenchBoard.placements.world, 1);

const slumberBoardSave = mergeSavedState({
  ...stateAfterDream,
  activeWordId: 'slumber',
  activeNounId: 'slumber',
  activeVerbId: 'understand',
  workbenchBoard: {
    unlockedSlots: [0, 1],
    placements: {
      understand: 0,
      slumber: 1,
    },
  },
} as GameState);
assert.equal(slumberBoardSave.dreamUnlocked, true);
assert.equal(slumberBoardSave.workbenchBoard.placements.understand, 0);
assert.equal(slumberBoardSave.workbenchBoard.placements.slumber, 1);

const seedStampBonus = getEffectiveStampUpgradeBonus(10, seed);
nearlyEqual(seedStampBonus, 0.022);
nearlyEqual(getTapGain(seed, 10), 0.065);
const understoodSeedStampBonus = getEffectiveStampUpgradeBonus(10, seed, understand);
nearlyEqual(understoodSeedStampBonus, 0.024);
nearlyEqual(getTapGain(seed, 10, understand), 0.105);

const rainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain);
nearlyEqual(rainFilingBonus, 0.022);
nearlyEqual(getPassiveGain(rain, 10, 0, 0), 0.035);
const understoodRainFilingBonus = getEffectiveFilingUpgradeBonus(10, rain, understand);
nearlyEqual(understoodRainFilingBonus, 0.024);
nearlyEqual(getPassiveGain(rain, 10, 0, 0, understand), 0.045);

nearlyEqual(getEffectiveStampUpgradeCost(0, soil), 0.95);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand), 0.9);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream), 1);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand), 1);
nearlyEqual(getEffectiveStampUpgradeCost(0, soil, understand, 0.75), 0.675);
nearlyEqual(getEffectiveFilingUpgradeCost(0, stream, understand, 0.75), 0.75);
nearlyEqual(applyUpgradeCostFloor(1, 0.01), 0.25);
nearlyEqual(applyUpgradeCostFloor(0.2, 0.01), 0.1);

assert.equal(rain.specialEffectType, 'filing_upgrade_bonus_multiplier');
assert.equal(stream.specialEffectType, 'periodic_passive_burst');
assert.equal(stream.effectDescription, 'Every 8 seconds, gain 3 seconds worth of passive Meaning.');
assert.equal(STREAM_DRIZZLE_INTERVAL_SECONDS, 8);
assert.equal(STREAM_DRIZZLE_PASSIVE_SECONDS, 3);
assert.equal(UNDERSTAND_STREAM_DRIZZLE_PASSIVE_SECONDS, 6);
assert.equal(isStreamDrizzleActive(stream), true);
assert.equal(isStreamDrizzleActive(rain), false);
assert.equal(getStreamDrizzlePassiveSeconds(stream), 3);
assert.equal(getStreamDrizzlePassiveSeconds(stream, understand), 6);
assert.equal(
  getStreamDrizzlePassiveSeconds(stream, parsedStreamUnderstand.effectiveVerbId ? understand : null),
  3,
);
assert.equal(
  getStreamDrizzlePassiveSeconds(stream, parsedUnderstandStream.effectiveVerbId ? understand : null),
  6,
);
nearlyEqual(getStreamDrizzleGain(2.5, stream), 7.5);
nearlyEqual(getStreamDrizzleGain(2.5, stream, understand), 15);
assert.equal(eq(getStreamDrizzleGain('1e1000', stream, understand), '6e1000'), true);
nearlyEqual(getStreamDrizzleGain(2.5, rain), 0);

assert.equal(getActiveWordTapMultiplier(root, 24), 1);
assert.equal(getActiveWordTapMultiplier(root, 25), 5);
assert.equal(getActiveWordTapMultiplier(root, 26), 1);
assert.equal(getActiveWordTapMultiplier(root, 24, understand), 1);
assert.equal(getActiveWordTapMultiplier(root, 25, understand), 10);
assert.equal(getActiveWordTapMultiplier(root, 26, understand), 1);
assert.equal(getRootCharge(24), 24);
assert.equal(getRootCharge(25), 0);
assert.equal(getRootCharge(26), 1);
assert.equal(getRootChargeLabel(24), '24/25');
assert.equal(getRootChargeLabel(25), '0/25');
assert.equal(getRootChargeLabel(26), '1/25');

nearlyEqual(getPassiveGain(river, 0, 0, 120000), 0.02 * 1.25 * 1.02);
nearlyEqual(getPassiveGain(river, 0, 0, 120000, understand), (0.02 * 2) * 1.25 * 1.04);
assert.equal(RIVER_PASSIVE_GROWTH_CAP, 2);
nearlyEqual(getRiverPassiveIncrease(river, 0, 90000), 0.015);
nearlyEqual(getRiverPassiveIncrease(river, 0, 90000, understand), 0.03);
nearlyEqual(getRiverPassiveIncrease(river, 0, 300 * 60000), 2);
nearlyEqual(getRiverPassiveIncrease(river, 0, 300 * 60000, understand), 2);
nearlyEqual(getActiveWordPassiveMultiplier(river, 0, 300 * 60000), 3);
nearlyEqual(getActiveWordPassiveMultiplier(river, 0, 300 * 60000, understand), 3);
assert.equal(
  getActiveWordPowerLabel(river, null, 0, 90000),
  'Passive +1.5% (+1%/min, cap +200%)',
);
assert.equal(
  getActiveWordPowerLabel(river, understand, 0, 300 * 60000),
  'Passive +200% (+2%/min, cap +200%)',
);

const clearCurrentEvent = {
  type: 'water',
  name: 'Clear Current',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 0), 1.1);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 50), 1.5);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 100), 2);
nearlyEqual(getFlowEventIdleMultiplier(clearCurrentEvent, 150), 2);

const harvestWindowEvent = {
  type: 'farm',
  name: 'Harvest Window',
  endsAt: Date.now() + 1000,
} as const;
nearlyEqual(getFarmEventTapMultiplier(harvestWindowEvent), 2);

const softenedRulesEvent = {
  type: 'dream-softened-rules',
  name: 'Softened Rules',
  endsAt: Date.now() + 1000,
} as const;

nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(null), 1);
nearlyEqual(getSoftenedRulesUpgradeCostMultiplier(softenedRulesEvent), 0.75);
nearlyEqual(getMeaningBloomGain(1000, 1), 100);
nearlyEqual(getMeaningBloomGain(10, 2), 20);
assert.equal(eq(getMeaningBloomGain('1e1000', 1), '1e999'), true);

for (const value of [
  getTapGain(world, 0),
  getPassiveGain(water, 0, 0, 0),
  getUpgradeCost(1000),
  getMeaningBloomGain(1000, 1),
]) {
  assert.equal(Number.isFinite(value.m), true);
  assert.equal(Number.isFinite(value.e), true);
}

const originalRandom = Math.random;
try {
  Math.random = () => 0;
  nearlyEqual(getNextPathEventDelayMs(10), 90000);
} finally {
  Math.random = originalRandom;
}

console.log('game logic tests passed');

```
