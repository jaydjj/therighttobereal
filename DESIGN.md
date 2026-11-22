# The Right to Be Real: Design Guide

Guidance for anyone (people or AI agents) designing or writing for The Right to Be Real: the website, Instagram, merch and anything else.

## The feel

Counterculture meets radical humanity. An intelligent, slightly rebellious cultural movement with the wit of an independent magazine and the warmth of documentary photography. Not a nonprofit, a wellness brand or a body-positivity campaign.

## The argument

The point is not that everyone is beautiful. It's that people shouldn't have to be beautiful to be valued. The beauty industry manufactures insecurity and sells the fix. We challenge that business model and defend people's freedom to make their own choices.

**Narrative:** Challenge the system. Reclaim your choices. Find your people.

## Personality

- **Defiant:** confident, independent, willing to take on powerful interests.
- **Wry:** observant and dryly funny. Satire exposes the contradictions.
- **Human:** warm, candid, grounded in ordinary people's lives.

## Voice

- Write like an independent editorial publication, not an earnest nonprofit.
- Short, memorable statements. Observational humour. Specific examples of industry absurdity.
- Challenge the system, never the individual. Criticize manufactured insecurity, never people who buy beauty products. Never anti-makeup.
- Invite people in. Don't lecture.
- Avoid empowerment clichés, inspirational platitudes, corporate activism language and repeated affirmations about beauty or self-love.
- Not everything is a slogan. Balance provocation with quiet, human moments.
- Keep: "we're not buying it.", "Our insecurities are someone else's business model.", "Buy nothing. Say everything.", "Have a real day."

## Visual identity

**Art direction: the movement's own broadside.** Inspired by 19th-century French broadsides and early 20th-century labour posters: woodcut and lithograph illustration, hand-printed ink, simple monumental compositions, carved shadows, strong diagonals, limited colour and commanding type. It should feel like a contemporary movement printing its own posters, serious, collective, human and lasting. Not a history costume and not a copy of any real poster.

**Avoid:** 1980s/90s retro (neon, Memphis shapes, airbrush, chrome, glossy gradients); punk-zine or photocopy styling (ransom-note type, grunge, torn paper, xerox noise); sepia or "vintage" filters; stamps as the main device; raised fists, weapons, guillotines, famous figures.

**Texture with restraint:** a faint paper fibre on the page and slightly rough ink edges on illustrations. Never on text.

### The broadside panel (recurring motif)

A compact framed poster panel: double ink frame, a small wood-type top line ("The Right to Be Real" + a label), an illustration, and a wood-type caption. Built from `_includes/broadside.html`.

**Illustrations** are print-style artwork (relief-print or lithograph look: heavy black line, cross-hatching, paper grain, flat brick red, gold and ink). Files live in `assets/art/` as `<id>-480.webp`, `-800.webp`, `-1120.webp` and `-800.jpg`, with alt text in `_data/art.yml`. Every illustration needs alt text that describes the scene and any words in it.

- `crowd`: a grey-haired woman standing calmly while a crowd hurries past giant beauty billboards (homepage hero).
- `press`: a printing press churning out the same idealized face (Beauty Blackout, homepage and campaign page).
- `walk`: three women of different ages walking and talking past a blank billboard toward the sun (Instagram).

Older drawn SVG scenes remain in `_includes/broadsides/` as a fallback.

Use it selectively (hero, the featured campaign, Instagram), never in every section, and never so it competes with the Blackout button. New scenes should keep the same palette, frame and print language: symbolic, dignified, diverse figures; not crowds by default.

Other devices: **the Receipt** (money and time reclaimed). Documentary photos of real people can join later; no stock photos.

## Principles

1. **The message does the shouting.** Restraint everywhere else so the statement lands.
2. **Type leads.** Headlines pair an upright statement with an italic turn.
3. **Calm by default, bold on purpose.** Mostly paper and ink; brick red and full ink sections for the moments that matter.
4. **One clear next step.** The March 8 Beauty Blackout is the main call to action.
5. **Progressive disclosure.** Short summaries on the homepage and campaign overview; full detail on each campaign page.
6. **Describe here, mobilize there.** The site describes; Instagram carries how-to-join instructions.
7. **Readable everywhere.** Phone first, accessible contrast, no gimmicky motion.
8. **Inclusive by default.** No gender, age or look is the "intended" audience.

## Reference

| Role | Value |
|---|---|
| Paper (background) | `#efe6d4` |
| Paper 2 (quiet sections, flaps) | `#e4d6ba` |
| Paper light (panels, inputs) | `#f7f0e1` |
| Ink (text, frames, bold sections) | `#1a1714` |
| Brick red (main buttons, key words) | `#9e2a1f` (use `#e2876f` for small text on ink) |
| Ochre (illustration fills only) | `#b8862b` (use `#d9a441` for small text on ink) |
| Logo | `assets/logo.svg`: "THE RIGHT TO" in tracked capitals over a black bold italic "be" resting on a large brick-red "real". Always use this file; never retype or rebuild the logo |
| Headlines | DM Serif Display, upright paired with italic |
| Poster lettering | Big Shoulders Display (wood type), only inside broadside panels |
| Body and labels | Work Sans; labels in small spaced capitals |
| Receipts and dates | System monospace |

## Instagram system

The site's devices carry over so posts are recognizable without the logo:
- **Editorial statements:** big serif on paper or ink, one italic turn, brick red only for the key word.
- **Satire posts:** a broadside panel with a woodcut scene that undermines a beauty-ad promise.
- **Money and time posts:** the Receipt.
- **Stories and portraits:** a documentary photo with a short caption in Work Sans.
- **Event reminders:** date in small red capitals, campaign name in serif.

## Don'ts

- Pastel wellness palettes, soft gradients, generic feminine branding, or pink as a "women's issue" colour.
- Retro 80s/90s styling, punk-zine collage, sepia filters, or stamps as the main device.
- Loud activist styling or punk nostalgia without purpose.
- Writing "BeReal" as one word (a separate, unrelated app uses that).
- Shaming anyone's personal choices.
- Inventing campaign dates, activities or commitments.
