# Approved Text - First Progression Map

## Current Design Decisions

* The game starts painfully slow with World.
* First resource is Meaning.
* First active word is World.
* World gives +0.01 Meaning per tap/stamp.
* First path choice happens at 1 Meaning.
* Early game has only two path choices:
  * Farm path
  * Flow path
* Dream/Chance layer appears later, around 100 Meaning, through Understand World.
* Paths are run-exclusive for now.
* The player chooses one main path per run.
* Later reset/prestige systems may allow the player to keep learned words or permanent bonuses between runs.
* Dictionary should only show acquired/unlocked words.
* Do not show full locked word trees yet.
* Mystery is important.

## Early Meaning Milestone Scale

Use this as the first milestone ladder:

* 0 Meaning: World starts active.
* 1 Meaning: choose first run path, Farm or Flow.
* 10 Meaning: unlock next word in chosen path.
* 25 Meaning: unlock another word or first small path effect.
* 50 Meaning: unlock stronger path identity or second path word.
* 100 Meaning: unlock second sentence slot and let Understand World reveal Dream/Chance.
* 500 Meaning: first real acceleration milestone.

This scale is not final. It exists so we can test pacing.

## Progression Philosophy

* Balance by time to next interesting decision.
* Every new number range should unlock a new tool, word, or structural change.
* Early game should feel slow but not boring.
* Later game should reward the grind with explosive progression.
* Explosive progression should be controlled by:
  * sentence slot limits
  * one word per category/type rules
  * run-exclusive paths
  * higher costs
  * later prestige/reset systems
  * later instability/chance systems

## Player Speed Bands

Design around three rough player speeds:

* Low path: passive play or weak choices, slower progress.
* Average path: normal play, expected pacing.
* High path: smart choices and good word combinations, faster progress.

Smart play should matter, but should not completely break the game.

## Path Structure

### Farm Path

Role:

* Active/manual progression.
* Stronger tapping.
* Harvest/growth style bonuses.
* Good for players who interact often.

Possible word pool:

* Farm
* Seed
* Soil
* Root
* Harvest
* Orchard
* Field
* Plow
* Basket
* Season

Possible future effects:

* Better tap value.
* Stamping streaks.
* Harvest bursts.
* Growth over repeated taps.
* Strong active combos.

### Flow Path

Role:

* Passive/idle progression.
* Meaning/sec.
* Slow but steady growth.
* Good for players who wait and return.

Possible word pool:

* Water
* Drip
* Rain
* Stream
* River
* Reservoir
* Current
* Tide
* Spring
* Flood

Possible future effects:

* Passive Meaning/sec.
* Offline gain.
* Slow scaling over time.
* Stored Meaning.
* Flow-based combo bonuses.

### Dream / Chance Path

Role:

* Appears later, around 100 Meaning.
* Randomness, rare events, high bursts.
* Should combine well with second sentence slot.
* Not available at the first path choice.

Possible word pool:

* Dream
* Chance
* Slumber
* Dice
* Omen
* Echo
* Vision
* Sleep
* Miracle
* Whim
* Accident

Possible future effects:

* Rare large gains.
* Random word events.
* Unstable multipliers.
* Luck-based sentence combos.
* High burst potential with risk.

## First Run Shape

A simple first run should look like this:

1. Player starts with World.
2. Player stamps World slowly.
3. At 1 Meaning, player chooses Farm or Flow.
4. Chosen path becomes the run identity.
5. Dictionary shows only acquired words.
6. At 10, 25, and 50 Meaning, the player gains more path words/effects.
7. Around 100 Meaning, the player unlocks the second sentence slot.
8. Around 100 Meaning, Understand World can reveal Dream and Slumber.
9. Around 500 Meaning, the first stronger acceleration layer should begin.

## Important Unknowns To Test Later

* Is 1 Meaning still the correct first path unlock?
* Is 10 Meaning too soon or too slow for the next word?
* Should the second sentence slot unlock exactly at 100 Meaning?
* Should Dream appear at 100 Meaning or after the second slot?
* How much faster should Farm be for active players?
* How much passive income should Flow generate?
* How much randomness is fun before Dream becomes annoying?
* How should reset/prestige preserve learned words?

## Hard Rules For Current Prototype

Do not add yet:

* Ink
* Reject
* clerks
* generic upgrade shop
* full word tree preview
* visible locked dictionary entries
* prestige
* policies
* world reports
* archive systems
* lore systems
* full sentence combo system
