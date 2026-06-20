# Approved Text - Game Design Direction

## 1. Core Concept

Approved Text is a slow-burn mobile idle/incremental game about certifying words into reality.

The player begins with one word on screen. They tap/stamp the word to generate Meaning. Meaning is then used to unlock new words, paths, and eventually more complex language systems.

The central idea is simple:

Word = power
Path = build direction
Dictionary = upgrade tree
Sentence = future combo system

The game should start extremely simple, almost boring, and slowly reveal deeper systems over time.

The “cookie” of this game is the stamp/tap interaction.

## 2. Core Loop

The player starts with:

WORLD

The player taps directly on the word or paper area.

Each tap creates a visible stamp mark where the player tapped.

Each stamp gives a tiny amount of Meaning.

Starting value:

WORLD
+0.01 Meaning per tap

Basic loop:

tap word → gain Meaning → unlock next word/path → choose direction → repeat

There should be no random word rotation at the start. The player should not approve disposable words one after another. The current word should matter.

## 3. Current Design Philosophy

The game should be slow.

Small numbers should matter for a long time.

The game should avoid fast mobile-game pacing where the player reaches huge numbers too quickly. The early game should make progress like this feel meaningful:

0.01 → 0.02 → 0.05 → 0.10 Meaning

The game should feel closer to Cookie Clicker’s slow-burn pacing than a typical modern dopamine-speed idle game.

Early unlocks should feel earned.

The first important choice should not happen instantly. A cost of 1 Meaning for the first path choice is currently the target.

## 4. Removed for Now

These systems should not be part of the current ground-level prototype:

* Ink
* Reject
* Random word rotation
* Dictionary preview on the main screen
* Certification complexity
* Clerks
* Policies
* Prestige
* Drift
* Archive
* Redaction
* World reports
* Adjectives as active modifiers
* Verbs as active rules
* Sentence system
* Lore-heavy systems

These may return later, but only when they have a clear gameplay purpose.

Current rule:

If a mechanic is only friction, remove it until it has meaning.

## 5. Main Screen

The main screen should be clean and focused.

It should show:

* Game title
* Current Meaning
* Active word
* Word type
* Word path
* Short dictionary-style definition
* Tap value
* Passive Meaning/sec, if applicable
* Large tappable word/paper area

The player should tap the word/card/paper itself.

A visible stamp mark should appear at the tap location.

There should be no scrolling on the main gameplay screen if possible.

Navigation should be handled through bottom or sidebar tabs.

Initial tabs:

* Main
* Dictionary
* Paths or Upgrades

## 6. Words

Words are not just flavor.

Words are active powers.

Words are upgrades.

Words are path nodes.

The word currently on screen gives the active gameplay effect.

Examples:

WORLD
Starter word. Gives small Meaning per tap.

FARM
Manual/tap-focused word. Improves active stamping.

WATER
Idle/flow-focused word. Adds passive Meaning/sec.

CHANCE
Random/luck-focused word. Adds small chances for large effects.

A word can later be selected from the Dictionary once unlocked.

Early game uses one active word at a time.

Later, the player can choose from unlocked words.

## 7. Paths

Paths are routes through the word tree.

A path represents a gameplay style or build direction.

Current known paths:

* Farm / Ground / Nature path
* Water / Flow path
* Dream / Chance path

More hidden paths can be revealed later.

Words belong to paths, but some words may connect paths later.

Unlocking a word adds it to the player’s Dictionary.

The Dictionary becomes the player’s permanent collection/toolbox of available words.

## 8. Path and Word Relationship

Paths are long-term direction.

Words are tools inside that direction.

Example:

Manual/Nature Path
World → Farm → Seed → Harvest → Orchard

Water/Flow Path
Water → Rain → River → Flow → Reservoir

Dream/Chance Path
Dream → Chance → Dice → Omen → Miracle

The player’s path determines what kind of words they can reach first.

Later, words from different paths can be combined.

Example:

GROW from the Farm path
RIVER from the Water path

Together:

Grow River

Meaning:

Passive income slowly increases over time.

This makes the system flexible without needing generic upgrade buttons.

## 9. Current Path Logic

### Farm / Ground / Nature Path

Theme:

* cultivation
* soil
* growth
* work
* active effort
* physically building meaning

Gameplay identity:

* active tapping
* manual growth
* tap bonuses
* tap combos
* increasing tap value
* rewards active play

Possible words:

* World
* Farm
* Soil
* Seed
* Harvest
* Grow
* Root
* Wood
* Mud
* Orchard
* Basket

Example effects:

FARM
Improves manual tap value.

HARVEST
Gives bonus Meaning every X taps.

GROW
Later verb. Increases a target word over time.

### Water / Flow Path

Theme:

* water
* flow
* patience
* passive accumulation
* movement without effort

Gameplay identity:

* Meaning/sec
* passive income
* slow scaling
* later offline progress
* rewards waiting

Possible words:

* Water
* Rain
* River
* Stream
* Flow
* Reservoir
* Flood
* Drip

Example effects:

WATER
Adds small passive Meaning/sec.

RAIN
Improves passive income.

RIVER
Passive income scales slowly over time.

FLOW
Later verb/concept. Makes meaning continue moving.

### Dream / Chance Path

Theme:

* dreams
* luck
* unstable power
* rare events
* strange outcomes
* risk and reward

Gameplay identity:

* random bonuses
* rare huge payouts
* low steady gain
* small chance for big effects
* future combo/synergy potential

Possible words:

* Dream
* Chance
* Dice
* Omen
* Miracle
* Accident
* Sleep
* Echo
* Vision

Example effects:

CHANCE
1% chance per stamp to gain 100x tap value.

DICE
Randomizes bonus size.

MIRACLE
Rare massive burst of Meaning.

## 10. Word Types

Words also have grammatical types.

This is separate from their path.

A word has two identities:

* Path: what build family it belongs to
* Word type: how it behaves inside future sentences

Example:

GROW
Type: verb
Path: Farm/Nature
Effect: increases production over time

RIVER
Type: noun
Path: Water/Flow
Effect: passive income

Later sentence:

Grow River

Meaning:

A Farm-path action applied to a Water-path noun.

### Nouns

Nouns are stable words.

Gameplay role:

* base generators
* flat bonuses
* stable early-game foundation
* things/objects/concepts

Examples:

* World
* Farm
* Water
* River
* Soil
* Dream

### Verbs

Verbs are actions.

Gameplay role:

* multipliers
* transformations
* rule triggers
* powerful effects

Examples:

* Grow
* Flow
* Repeat
* Forget
* Remember
* Multiply

### Adjectives

Adjectives are modifiers.

Gameplay role:

* change how nouns behave
* add traits
* create bonuses and drawbacks
* enable combo builds

Examples:

* Heavy
* Silent
* Lucky
* Ancient
* Hollow
* Bright

## 11. Future Sentence System

Early game:

* one active word on screen
* one tap action
* one resource: Meaning
* first choice between basic paths

Mid game:

* paths unlock more words
* words define playstyle
* player builds a personal Dictionary
* player chooses active words from unlocked pool

Late game:

* words combine into phrases or sentence-like powers
* adjectives and verbs modify nouns
* words from different paths can be used together
* builds become strange and powerful

Examples:

Lucky Farm
Manual taps have a small chance to trigger a harvest bonus.

Heavy Rain
Passive income is stronger but slower.

Miracle World
Rare chance for massive Meaning burst.

Grow River
Passive income slowly increases over time.

Rooted Dream
Random effects become more stable.

This creates future build synergy without adding complexity too early.

## 12. Visual Language Rules

Words have two important identities:

* Path
* Word type

These should be visually distinct.

### Path = Color

Path should be shown through color.

Use:

* colored top stripe
* border accent
* background tint
* small path ribbon

Example path colors:

Farm / Ground / Nature path
Green, earthy brown, soil tones

Water / Flow path
Blue, teal, soft cyan

Dream / Chance path
Purple, violet, pink, dark dream tones

Future hidden paths
Use new distinct palettes

Purpose:

Color tells the player what path or build family the word belongs to.

### Word Type = Shape / Frame / Icon

Word type should not rely mainly on color.

Use:

* shape
* frame style
* icon
* label

Noun visual style:

* solid rectangular card
* stable thick border
* object/cube icon

Verb visual style:

* slanted card
* arrow-shaped frame
* arrow/action icon
* sharper border

Adjective visual style:

* rounded pill/card
* decorative border
* sparkle/modifier icon

### Text Labels

Use labels too.

Players should not need to memorize colors or shapes.

Each word card should show:

* word text
* word type label
* path label
* short effect text

Example:

GROW
Verb
Farm Path
Increases a target word over time.

RIVER
Noun
Water Path
Generates passive Meaning.

## 13. Sentence Display

Later, when sentences exist, show word cards together.

Example:

GROW → RIVER

The player should visually understand:

* GROW is a Farm-path verb
* RIVER is a Water-path noun
* the sentence applies a Farm action to a Water object

Simple rule:

Path = color
Word type = shape/icon/frame
Effect = text
Sentence role = position

This keeps the UI readable when words from different paths and types are combined.

## 14. Current Ground-Level Prototype Goal

The first playable version should prove only the basic loop.

Current target:

* Start with World
* Tap World
* Stamp appears where tapped
* Gain +0.01 Meaning
* Reach first unlock threshold
* Choose next word/path
* Chosen word becomes active
* Dictionary stores unlocked words

No complex systems yet.

The question to answer first:

Is tapping a word, gaining Meaning, and unlocking the next word/path satisfying?

## 15. Immediate Design Questions

The next things to decide:

* Exact first unlock cost
* Whether first choice is Farm vs Water only, or includes Dream/Chance
* Whether first path choice is exclusive for the run
* Exact effects for Farm and Water
* What Dictionary tab does in the early prototype
* How many words each path should have in the first small tree
* When passive income begins
* When random/luck path appears
* Whether unlocked words can always be selected again
* How slow the first 30 minutes should be

## 16. Current Working Direction

The game should currently focus on:

World → first path choice → first small word tree

Suggested first structure:

WORLD
Starter word
+0.01 Meaning per tap

At threshold:

Choose one:

FARM
Nature/manual path
Higher tap value
Unlocks growth-related words

or

WATER
Flow/idle path
Small passive Meaning/sec
Unlocks passive-flow words

Dream/Chance path should probably appear slightly later, after the player understands manual vs idle.

## 17. Key Design Rules

* Build ground-level gameplay first.
* Do not add complex systems before the basic loop feels good.
* Every new mechanic needs a clear gameplay purpose.
* Words should be powers, not flavor text.
* Paths should define playstyle.
* The Dictionary should become the upgrade tree.
* The game should be slow.
* Small numbers should matter.
* Avoid huge multipliers too early.
* Avoid generic upgrades if a word can do the job.
* Use color for paths.
* Use shape/icon/frame for word type.
* Keep the main screen clean.
* No scrolling on the main gameplay screen if possible.
* Do not add lore before the game is mechanically clear.
