---
name: Emily's Learning Garden
description: A classroom wall of cut-paper flowers where every game is a flower door and every finished game glues a new flower into Emily's garden.
colors:
  wall: "#a8e0ff"
  wall-deep: "#7cc8f2"
  grass: "#4cbf45"
  grass-deep: "#2f9a35"
  grass-light: "#8fdc4f"
  paper: "#fffaf0"
  ink: "#1d2152"
  ink-soft: "#3a3f7a"
  pink: "#ff4f9a"
  pink-deep: "#c81f68"
  turquoise: "#00b3c7"
  turquoise-deep: "#00798b"
  lime: "#9bd423"
  orange: "#ff7a1a"
  orange-deep: "#c94f00"
  violet: "#8e5cf7"
  violet-deep: "#5f2fcf"
  yellow: "#ffd23f"
  red: "#ff4757"
  flower-sky: "#6fd0ff"
  flower-peach: "#ffb08a"
  flower-lilac: "#c9a8ff"
  flower-mint: "#7fe0b8"
typography:
  display:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 7vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4.6vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Andika, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    fontFeature: "tnum"
  label:
    fontFamily: "Andika, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  cut: "18px 26px 14px 30px / 24px 14px 28px 16px"
  scrap: "8px 12px 7px 13px"
  focus: "14px"
  pill: "9999px"
spacing:
  sign-y: "10px"
  sign-x: "20px"
  button-y: "12px"
  button-x: "24px"
  gap-sm: "16px"
  gap-md: "24px"
  gap-lg: "32px"
  grass-clearance: "160px"
components:
  paper-button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-turquoise:
    backgroundColor: "{colors.turquoise-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-violet:
    backgroundColor: "{colors.violet-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  paper-button-orange:
    backgroundColor: "{colors.orange-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.cut}"
    padding: "12px 24px"
    height: "56px"
  listen-button:
    backgroundColor: "{colors.turquoise-deep}"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.cut}"
    padding: "16px 32px"
    height: "80px"
  paper-sign:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.cut}"
    padding: "10px 20px"
  counter-sign:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.cut}"
    padding: "8px 16px"
  letter-scrap:
    typography: "{typography.display}"
    rounded: "{rounded.scrap}"
    padding: "0.02em 0.12em 0.06em"
  door-label:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.cut}"
    padding: "6px 16px"
  answer-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.cut}"
    padding: "12px"
---

# Design System: Emily's Learning Garden

## Overview

**Creative North Star: "The Classroom Paper Wall"**

Everything on screen is a piece of construction paper someone cut with scissors and glued to a sky-blue classroom wall. Color is not a fill, it is a sheet: every surface carries a fine grain, hand-cut corners that are never the same twice, and a soft glue-stick shadow that lifts it a few millimetres off the wall. A strip of torn green paper runs along the bottom of every screen, and flowers grow out of it.

The world is loud in color and calm in structure. Six saturated construction papers (pink, turquoise, lime, orange, violet, yellow) do all the talking against a single pale sky; ink-navy carries the words. Nothing is perfectly straight: signs, buttons and letters sit a degree or two off-true, flowers sway on their stems, and finished games end with a flower being pressed into the garden. Density is low and targets are huge, because the reader is eight years old and often using a finger.

Menus are not grids of cards. Each choice is a differently shaped paper object (a big flower on a stem, a fanned stack of word cards, a paper sailboat), and the shape itself tells Emily what the game is. Pictures are flat stickers with a white cut-out border, never glossy 3D renders.

**Key Characteristics:**
- Sky-blue paper wall with fractal grain and vertical paper fibers on every page.
- Torn green grass strip at the bottom of every screen, with a pale paper-core lip on the torn edge and a meadow of small swaying flowers.
- Every surface is a sheet: grain texture, asymmetric hand-cut radius, glue shadow.
- Small deliberate tilts (-3deg to +3deg) on signs, labels, buttons and letters.
- Chunky display letters, each cut on its own colored scrap.
- Flat stickers for all pictures; Lucide icons only on functional controls.
- Reward is physical: a flower glues in with an overshoot and petals rain down.

## Colors

A full-saturation construction-paper set on a pale sky wall, with one deep navy ink for words; every hue has a light paper for surfaces and (where text needs it) a deep paper for white lettering.

### Primary
- **Bubblegum Paper** (pink): the lead paper. Primary action buttons ("Play again", "Next"), the first letter scrap of titles, the outer petals of the Times Tables door and the default earned flower. Takes ink text at button size.
- **Raspberry Card** (pink-deep): the deep partner of pink. Door labels that need white lettering ("English") and the corrected answer number in an "Almost!" message.

### Secondary
- **Pool Turquoise** (turquoise): petals, door labels with ink text, letter scraps (ink letters).
- **Deep Lagoon** (turquoise-deep): everything that speaks. The Listen / Listen again buttons and the "Great job!" display line use it, with white text.
- **Sunshine Yellow** (yellow): signs that count things (the "My Garden" tag, "Food · 1 of 10" round counter), flower centers, text selection.
- **Lime Leaf** (lime): the "See my garden" button, the "Yes!" chip and the 4px ring on a correct picture. Always with ink text.

### Tertiary
- **Tangerine Paper** (orange) / **Burnt Orange Card** (orange-deep): sun rays, inner petals, the "My trip" door label (light, ink text); orange-deep for white-lettered buttons.
- **Grape Paper** (violet) / **Deep Grape Card** (violet-deep): the closed "Coming soon" bud, title scraps; violet-deep for the "Times Tables" label and the selected "Mix all the tables" toggle, with white text.
- **Poppy Red** (red): petals, flower centers, letter scraps, the masthead flag on the boat, and the destructive "Yes, start again" confirm.
- **Flower-only papers** (flower-sky, flower-peach, flower-lilac, flower-mint): extra sheets that exist only inside the ten earnable flower recipes and the sea of the paper boat, so the garden never repeats. Not used for surfaces or text.

### Neutral
- **Classroom Sky** (wall): the page itself, under grain and fibers; also the browser theme color.
- **Shadowed Sky** (wall-deep): scrollbar track; the wall's own darker paper.
- **Meadow Green** (grass), **Stem Green** (grass-deep), **Leaf Green** (grass-light): the torn grass strips, stems and leaves, the "still learning" leaf in progress cells, the garden floor below the first screen.
- **Cream Paper** (paper): signs, instruction strips, answer cards, the Home tab, clouds, white petals. Slightly warm, never pure white.
- **Classroom Ink** (ink): all body and display text, butterfly bodies, focus outlines, the glue-shadow tint (rgba of ink, never black).
- **Soft Ink** (ink-soft): secondary ink, defined but rarely needed.

### Named Rules
**The Ink-On-Light Rule.** Ink text sits on the light papers: pink, turquoise, orange, yellow, lime, cream. White text appears only on the deep papers (pink-deep, violet-deep, turquoise-deep, orange-deep) or on pink, violet and red letter scraps at display size. Body-size white text on a light or mid paper is a defect.

**The Ink Shadow Rule.** Every shadow, drop-shadow and filter shadow is tinted with Classroom Ink (rgba(29, 33, 82, a)), never neutral black or gray. The glue is navy.

**The Sheet, Not Fill Rule.** A colored surface always carries the grain texture over its color. A flat untextured color block is not paper and does not belong on the wall.

## Typography

**Display Font:** Lilita One (with system-ui, sans-serif)
**Body Font:** Andika (with system-ui, sans-serif)

**Character:** Lilita One is a single heavy weight of chunky, slightly soft letters that look scissor-cut from card; Andika was drawn for children learning to read (single-story "a", open shapes), and is used bold almost everywhere so short instructions read at a glance.

### Hierarchy
- **Display** (Lilita 400, clamp(2.6rem, 9vw, 5.6rem), line-height 1): the site name, set as letter scraps. Smaller scrap sizes: lg clamp(2rem, 6vw, 3.6rem) for the second title line, md clamp(1.6rem, 4.5vw, 2.4rem) for activity titles in the header.
- **Headline** (Lilita 400, clamp(2.2rem, 7vw, 3.6rem), ~1.25): reward messages ("Perfect! Wow, Emily!"); quiz questions and the digits of a multiplication go larger, up to clamp(3.2rem, 13vw, 6.5rem).
- **Title** (Lilita 400, clamp(1.5rem, 4.6vw, 2.1rem), ~1.25): door labels, topic names, the Listen again button, flower faces ("3×4", numbers on answer flowers).
- **Body** (Andika 700, 1.5rem, tabular figures): instruction signs ("Pick a table!", "Almost! 3 × 4 = 12"). Buttons use Andika 700 at 1.25rem.
- **Label** (Andika 700, 1.125rem): hints under door labels, round counters, the Home tab. Nothing smaller than 1rem appears.

### Named Rules
**The Scrap Letter Rule.** Titles are spelled one letter per paper scrap: each scrap cycles through pink, yellow, turquoise, orange, violet, lime, red, with its own tilt (-5deg to +5deg), its own 2px vertical lift and its own slightly different corner radius. Ink letters on yellow, lime, turquoise and orange scraps; white letters on pink, violet and red. The accessible name is carried by an sr-only copy.

**The Bold Reader Rule.** Running text is Andika 700. Regular weight is reserved for nothing; an 8-year-old reading English as a second language gets the heaviest clear letterforms.

**The Tabular Count Rule.** The body sets tabular numerals globally, so counters and multiplication facts never jitter as digits change.

## Layout

Every screen is a single centered column on the wall, with the grass anchored to the bottom edge. Activity pages share one frame: a header row with the cream Home tab at left and the scrap-letter title beside it (centered on mobile), then a content column capped at 64rem (max-w-5xl) with 16px side padding (32px from 640px up) and 160px of bottom clearance so content never sits on the grass. The grass strip is 112px tall (128px from 640px) with a meadow of 14 small flowers just above it.

The home screen is one full-viewport scene: title scraps and a taped tagline in the top third, the flower doors rising from the grass in the lower half, a yellow "My Garden" counter stuck on the grass, and the garden itself on a solid grass field below the fold. Flower doors have different stem heights so their heads land at different levels.

Vertical rhythm inside activities runs on 24px to 32px gaps between blocks (gap-6 to gap-8), 16px to 24px between sibling choices. Sizes are fluid with clamp() throughout rather than stepped at breakpoints; breakpoints (Tailwind 640 / 768 / 1024px) mostly change padding, column count of picture grids (2 then 4), and whether the English doors stack or sit in a row.

### Named Rules
**The Grass Floor Rule.** Every screen ends in torn grass with flowers growing from it. Content keeps 160px clear of the bottom edge.

**The Different Doors Rule.** A menu of games is a row of differently shaped paper objects at different heights, never a grid of same-size cards. Each door's shape announces its game.

## Elevation & Depth

Depth is physical and shallow: paper glued to a wall. There is no z-axis of floating panels, no blur, no glass. Every sheet has the same resting glue shadow; it lifts slightly on hover as if peeling off the wall, and presses flat on tap. Layered pieces (petal rings, flower center, stem and leaves) each get their own small filter shadow so stacked paper reads as stacked.

### Shadow Vocabulary
- **Glue** (`box-shadow: 0 3px 2px rgba(29,33,82,0.18), 0 10px 18px -6px rgba(29,33,82,0.35)`): resting state of every sheet: signs, buttons, scraps, answer cards.
- **Glue lift** (`box-shadow: 0 6px 4px rgba(29,33,82,0.16), 0 18px 28px -8px rgba(29,33,82,0.4)`): hover on paper buttons only (pointer devices).
- **Petal layer** (SVG `feDropShadow dx=0 dy=2.5 stdDeviation=2.2`, ink at 0.28): each layer of a flower, bud and stem.
- **Decor float** (`drop-shadow(0 3px 2px rgba(29,33,82,0.16)) drop-shadow(0 10px 12px rgba(29,33,82,0.14))`): clouds, sun, butterflies, the paper boat.
- **Sticker** (four 2.5px white drop-shadows plus `drop-shadow(0 4px 4px rgba(29,33,82,0.28))`): every picture.
- **Grass edge** (SVG `feDropShadow dy=-2 stdDeviation=3`, ink at 0.22): the torn strips cast upward onto the wall.

### Named Rules
**The Glue-Stick Rule.** Shadows are soft, short and ink-tinted, as if a sheet were glued down. No hard offset shadows, no long dramatic shadows, no glow.

## Shapes

No corner on the wall is a clean circle-arc. Sheets use one asymmetric elliptical cut (18px 26px 14px 30px / 24px 14px 28px 16px) so each corner looks trimmed by hand; letter scraps vary their four radii per letter between roughly 7px and 14px. Organic shapes (petals, leaves, clouds, bud, butterfly wings) are drawn as SVG curves with seeded wobble, so no two flowers are identical. Torn edges (grass, sea) are irregular polylines of 6px to 28px steps with occasional deep notches, and the torn green paper shows a pale paper-core lip (#eef9dc, #e4f6d0) 3px above its color. Masking tape is a translucent cream strip with a zig-zag clip-path at both ends. Fully round shapes are kept for small functional marks: progress dots, the "Yes!" chip, the selected-table underline bar.

### Named Rules
**The Scissor Rule.** Every sheet uses the hand-cut radius, every organic shape carries seeded irregularity, and every torn edge is ragged with a pale core. Uniform rounded rectangles do not exist on the wall.

## Components

### Buttons
Paper buttons feel like a card you could peel off the wall.
- **Shape:** hand-cut radius ({rounded.cut}), grain over color, glue shadow, min height 56px, padding 12px 24px, Andika 700 at 1.25rem, 10px icon gap.
- **Tones:** pink, yellow, lime and cream with ink text; turquoise-deep, violet-deep and orange-deep with white text. Pink is the default forward action.
- **Hover (pointer only):** rises 3px and tilts by a per-button angle (default -1deg) while the shadow becomes Glue lift, 260ms cubic-bezier(0.16, 1, 0.3, 1).
- **Active:** presses 1px down and scales to 0.97, shadow back to Glue.
- **Focus:** 4px dashed ink outline, 5px offset, 14px radius (global).
- **Listen button:** the turquoise-deep speaker button; the large form ("Listen again") is 80px tall in Lilita at title size.
- **Toggle:** a selected paper button switches from cream/ink to violet-deep/white ("Mix all the tables").

### Signs
- **Instruction sign:** a cream sheet, Andika 700 at 1.5rem, padding 10px 20px, tilted -1deg or +1deg. May be held by one or two strips of masking tape.
- **Counter sign:** yellow sheet with Andika 700 at 1.125rem for round counters; the home "My Garden · N flowers" tag is yellow in Lilita with a tiny flower.

### Flower Doors (signature)
A big layered paper flower (outer petals, inner petals, round center, seeded wobble) with a face in its center (Lilita "3×4", "ABC", or a paper speaker), a tilted colored label sheet overlapping its base, and a paper stem with two leaves growing from the grass. Heads sway on a 5s loop with staggered delays; hover and focus scale the head to 1.05. A closed bud with a cream "Coming soon!" sign stands in for future games. Inside a game, choices of the same kind may also be flowers (table numbers 1 to 10, answer numbers), with the selected one scaled 1.15 and underlined by a short ink bar.

### Picture Cards
Cream paper buttons (12px padding, width clamp(8.5rem, 40vw, 11rem)) holding a flat sticker picture. Correct: scale 1.05 with a 4px lime ring. Wrong pick: wiggles. Others dim to 40% opacity and scale 0.9.

### Stickers
Every picture (Fluent Emoji Flat SVGs) is shown as a sticker: a 2.5px white cut-out border and an ink glue shadow. Color words are shown as a grained paper swatch with the hand-cut radius instead of a picture.

### Navigation
A cream "Home" paper tab with a Lucide house icon at the top left of every activity; inside games, a cream "back" paper button with a Lucide arrow-left. There is no nav bar.

### Progress Cells
A row of fixed cells, one per question: a dashed-outline circle to do (ink outline and cream fill on the current one), a small paper flower gluing in for a right answer, a green leaf for "still learning". Mistakes never show red.

### Flower Reward
The end of every game: petals rain from the top (28 paper petals in the six papers), a 200px flower glues in, a Lilita headline praises Emily by name, a cream sign states the score, and two buttons offer "Play again" (pink) and "See my garden" (lime), tilted in opposite directions.

### Motion
- **Glue-in** (700ms, cubic-bezier(0.16, 1, 0.3, 1)): from scale 1.4 and -16deg with a long shadow, overshoot to 0.94 / +3deg, settle flat. Used whenever a flower or picture is earned or revealed.
- **Sway** (5s ease-in-out, infinite, -2deg to +2deg from the stem base): flower heads, meadow, sun, butterflies, garden.
- **Pop-digit** (420ms, same curve): digits rise and scale in.
- **Wiggle** (480ms ease-out): a wrong choice shakes, kindly.
- **Petal fall** (about 2.2s to 3.5s with randomized drift, spin and delay): reward rain.
- **Reduced motion:** all animations and transitions collapse to 1ms and a single iteration; petal rain is removed.

## Do's and Don'ts

### Do:
- **Do** put ink (#1d2152) text on pink, turquoise, orange, yellow, lime and cream paper; use white text only on pink-deep, violet-deep, turquoise-deep or orange-deep, or on pink, violet and red letter scraps at display size.
- **Do** give every sheet the grain texture, the hand-cut radius and the Glue shadow.
- **Do** tilt signs, labels and buttons by 1 to 3 degrees, alternating direction between neighbors.
- **Do** show every picture as a flat sticker with the white cut-out border and ink glue shadow.
- **Do** build game menus from differently shaped paper doors at different heights.
- **Do** end every screen with torn grass that has an irregular edge and a pale paper-core lip.
- **Do** hold a sign to the wall with masking tape when it should feel pinned up.
- **Do** keep touch targets at 56px or taller and use Andika bold for all running text.
- **Do** mark every earned or revealed thing with the glue-in motion, and respect reduced motion.

### Don't:
- **Don't** set body-size white text on a light or mid paper (pink, turquoise, orange, yellow, lime, red).
- **Don't** use glossy, gradient-lit or 3D-rendered pictures; stickers are flat style only.
- **Don't** place Lucide icons as decoration next to pictures; Lucide is only for functional controls (Home, back/next, speaker, shuffle).
- **Don't** lay out a menu of games as a grid of same-size rounded cards.
- **Don't** use perfectly straight torn edges, uniform rounded rectangles, or untextured flat color blocks.
- **Don't** use neutral gray or black shadows, hard offset shadows, blur or glass.
- **Don't** show mistakes in red or with an X; a wrong answer wiggles and becomes a leaf.
