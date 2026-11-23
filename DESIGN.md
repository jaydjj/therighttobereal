# The Right to Be Real: Brand, Design and UI Guide

For anyone, people or AI agents, designing or writing for The Right to Be Real: the website, Instagram, merch and anything else. When this guide and the live site disagree, the live site is the reference and this guide should be updated.

---

## 1. Brand

### The feel
A contemporary movement printing its own broadsides. Serious, warm, collective and a little defiant, with the confidence of an independent magazine. Not a nonprofit, a wellness brand, a body-positivity account or a history costume.

### The argument
The point isn't that everyone is beautiful. It's that nobody should have to be beautiful to be valued. The beauty industry profits from self-doubt and sells the fix. We challenge that business model and defend everyone's freedom to make their own choices.

**Narrative:** Challenge the system. Reclaim your choices. Find your people.

### Personality
- **Defiant:** confident, willing to take on powerful interests.
- **Wry:** observant and dryly funny when it fits.
- **Human:** warm, candid, grounded in ordinary lives.

### Lines we use
- "The pressure is everywhere. *So is our power to change it.*" (homepage headline)
- "Our insecurities are someone else's *business model.*"
- "You shouldn't have to be beautiful to be valued." (core belief, top of the principles)
- "Buy nothing. *Say everything.*" (Beauty Blackout)
- "Have a real day." (sign-off)

---

## 2. Voice and copy

1. **Minimal and scannable.** Short sentences. One idea per line. Cut anything that doesn't help someone understand or act.
2. **Say it once per page.** If a line repeats a headline, a button, a picture or another section, cut it.
3. **Pictures don't need captions on the site.** The page around them carries the words.
4. **Challenge systems, never individuals.** Criticize manufactured insecurity, not people who buy beauty products. Never anti-makeup.
5. **Invite, don't lecture.** No empowerment clichés, platitudes or corporate-activism language.
6. **Describe here, mobilize there.** The website says what's happening. How to take part lives on Instagram.
7. **Never invent** dates, activities, numbers or commitments.
8. Never write "BeReal" as one word (a separate, unrelated app uses that).

---

## 3. Visual identity

### Art direction
Inspired by 19th-century broadsides and early 20th-century labour and lithograph posters: relief-print and lithograph illustration, heavy black line, cross-hatching, paper grain, limited flat colour, strong diagonals and dignified figures. It should feel like it could have been printed decades ago or today.

**Avoid:** 80s/90s retro (neon, Memphis shapes, airbrush, chrome, gradients); punk-zine or photocopy collage; sepia or "vintage" filters; stamps as the main device; raised fists, weapons, guillotines, famous figures; copying any real poster.

### Logo
- One shared file: **`assets/logo.svg`**. "THE RIGHT TO" in tracked capitals, a heavy black italic "be" resting on a large brick-red "real". No full stop.
- Use it as an image wherever the logo appears. Never retype, redraw or recolour it by hand. To change it, edit and rerun `brand/make_logo.py`.
- Minimum height: about 48 px on screen, so "THE RIGHT TO" stays readable.
- **Tab icon:** "be" over a red "r" on paper (`assets/favicon.png`, `favicon.ico`, `assets/apple-touch-icon.png`).
- **Profile picture and wordmark:** `brand/instagram-avatar.png`, `brand/wordmark.png` (rendered by `brand/avatar.html`).

### Colour

| Name | Hex | Use |
|---|---|---|
| **Paper** (tan) | `#efe6d4` | Page background |
| Paper light | `#f7f0e1` | Inside picture frames, form fields, cards |
| Paper dark | `#e4d6ba` | Quiet sections and cards |
| **Ink** (black) | `#1a1714` | Text, frames, the dark Blackout section |
| Muted ink | `#62584b` | Secondary text on paper |
| **Brick red** | `#9e2a1f` | Main buttons, key words, "real" in the logo |
| Gold (ochre) | `#b8862b` | Illustration fills only, never text on paper |

On the dark ink background, use the lighter tints for small text: brick tint `#e2876f`, gold tint `#d9a441`, muted `#c4b8a3`.

### Typography

| Role | Typeface | Notes |
|---|---|---|
| Headlines | DM Serif Display | Upright statement + italic turn, e.g. "The Beauty *Blackout.*" |
| Body, buttons, labels | Work Sans | Labels and buttons in small spaced capitals |
| Logo | Fraunces (outlined in the SVG) | Only via `assets/logo.svg` |
| Poster lettering | Big Shoulders Display | Only inside a picture frame, and only if a caption is truly needed |
| Dates in timelines, receipts | System monospace | |

### Texture
A faint paper grain on the page background. Never on text. Illustrations carry their own print texture.

---

## 4. Illustrations

### Style
Print-style artwork: relief-print or lithograph look, heavy black outlines, cross-hatching, visible paper grain, flat areas of brick red, gold and ink on warm paper. One clear symbolic idea per image: the beauty industry's machinery and promises in the background, real people at ease in the foreground.

### People
A real range of ages, skin tones, body shapes, styles and (over time) genders. Dignified, relaxed, mid-conversation or mid-stride. The beauty ad is only ever the thing being walked past, peeled back or produced by a machine.

### Format and files
- Portrait 4:5, at least 1100 × 1400 px. Send each image separately.
- Words in an illustration are fine only as part of the satire (billboard slogans). Never put real information (dates, calls to action) inside an image.
- Files: `assets/art/<id>-480.webp`, `-800.webp`, `-1120.webp` and `-800.jpg`. Alt text goes in `_data/art.yml`.
- **Every image needs alt text** describing the scene, including any words shown in it.

### Current set

| Id | Scene | Used on |
|---|---|---|
| `friends` | Three women of different ages, at ease, while a crowd hurries past beauty billboards | Not in use (removed from the hero for space) |
| `press` | A printing press churning out the same idealized face | Not in use (available for Instagram) |
| `walk` | Three women walking and talking past a blank billboard toward the sun | Homepage Instagram section |
| `crowd` | Earlier version of the hero with one woman | Not in use |

### Prompt recipe (for your image tool)
> Vintage relief-print / lithograph poster illustration, heavy black ink outlines, cross-hatching, visible paper grain, limited palette of brick red, mustard gold, black and warm cream paper. [SCENE]. Diverse, dignified people of different ages and body types, relaxed and real. Strong diagonal composition. No text except [ANY SATIRICAL SIGN TEXT]. Portrait 4:5.

---

## 5. UI components

**The picture frame (broadside panel).** `_includes/broadside.html`. A double ink frame with a hard offset shadow and a slight tilt. On the website it shows the picture only. Use it at most once per section and never so it competes with the main button.

**Buttons.** One primary action per section.

| Button | Look | Use |
|---|---|---|
| Primary | Brick red, cream text, hard black offset shadow (cream on dark sections) | Join the Beauty Blackout. Always the most prominent thing on the page |
| Secondary | Solid ink, cream text | Follow on Instagram, See every campaign |
| Text link | Small capitals, brick underline | Lesser actions, e.g. "Follow the movement on Instagram →" |
| Outline | Ink border | Secondary navigation, e.g. on the 404 page |

**Header.** Logo left; "Calendar", "Follow on Instagram" and a small red "Join March 8" button (jumps to the Blackout) right. On phones the Instagram link hides and the red button stays.

**Labels (kickers).** Small spaced capitals above headlines: muted on paper, gold tint on ink, brick for dates.

**Key facts.** A row of label + serif value (Date, Duration, Where, Goal). Only where the facts aren't already said nearby.

**How-to-join line.** One line under the calendar pointing to Instagram. Don't repeat it elsewhere.

**Sign-up form.** On a brick card or band, placed at the top of the Blackout section (before the timeline): email, "I'm in for" (March 8 / the whole month / both), an **unticked** consent box (required by Canada's anti-spam law), and an ink button. Not yet connected to Kit.

**The Receipt.** Monospace receipt with crossed-out items, for money and time reclaimed (Keep the Change).

---

## 6. Layout and pages

- **One page.** Hero → the Beauty Blackout (details beside the "Count me in" card) → the calendar (Women's Month, then the whole year) → **red manifesto band** ("Our insecurities are someone else's *business model.*", cream on brick, no buttons) → why we're doing this (statement, short paragraph, "You shouldn't have to be beautiful to be valued.", principles) → Instagram. No separate campaign pages.
- **Mobile first.** Check every change at iPhone width and on desktop. On phones, sections stack and the main button comes before any picture.
- **Breathing room.** If a section feels crowded, cut words before shrinking space.

### The calendar
- Each event: date (monospace, brick), short command-style name (serif), tag, optional "Recurring" label, one or two lines in "we", present tense.
- **Tags:** Protest (brick), Reclaim (dark gold `#7a5410`), Gather (olive `#4f5a1f`). Outlined chips in small capitals. **Recurring:** dashed ink chip with ↻ and how often (Weekly, Monthly, Twice a year, All year).
- The Beauty Blackout row (Mar 8) is the one full-width ink row.
- **Women's Month** is a dated list (rows) with full descriptions.
- **One action a week** (its own section): the monthly rhythm as four cards, Week 1–4: The Resistance, Money Hour, Mute the Ads, Take Back 20 Minutes. Each repeats every month.
- **Also this year** lists the other month-long campaigns compactly: date, name and tag only. Their descriptions stay in `_data/calendar.yml` for reference and Instagram planning.
- Date formats: "Mar 8", "Mar 1–7", "Tuesdays from Feb 2", "Monthly", "All year".
- **The Resistance** (people who were told to change, and didn't) runs in week 1 of every month.

---

## 7. Accessibility

- **Contrast:** all text meets WCAG AA. Checked pairs:

| Text on background | Ratio |
|---|---|
| Ink on paper | 14.4 : 1 |
| Muted ink on paper | 5.6 : 1 |
| Muted ink on paper dark | 4.8 : 1 |
| Brick on paper | 6.0 : 1 |
| Cream on brick (buttons) | 6.6 : 1 |
| Cream on ink | 14.4 : 1 |
| Brick tint / gold tint / muted on ink | 6.7 / 7.9 / 9.1 : 1 |
| Reclaim tag / Gather tag on light paper | 5.5 / 6.0 : 1 |
| Gold on paper | 2.6 : 1. **Fails: never use for text** |

- Every image has descriptive alt text. Decorative shapes are hidden from screen readers.
- Real information is real text, never baked into an image.
- Visible keyboard focus (brick outline). Motion is minimal and respects "reduce motion".
- Images are compressed and sized per screen; images below the first screen load lazily.

---

## 8. Instagram

The site's look carries over so posts are recognizable without the logo:
- **Statements:** big serif on paper or ink, one italic turn, brick red for the key word only.
- **Illustrations:** the print-style artwork in the picture frame, with a short caption below the image (in the post, not baked into the art).
- **Money and time:** the Receipt.
- **Event reminders:** date in small brick capitals, campaign name in serif.
- **Profile picture:** `brand/instagram-avatar.png`.

---

## 9. Don'ts

- Pastel wellness palettes, soft gradients, generic feminine branding, or pink as a "women's issue" colour.
- Retro 80s/90s styling, punk-zine collage, sepia filters, or stamps as the main device.
- More than one primary button per section, or anything louder than the Blackout button.
- Repeating copy, captions under pictures on the site, or long paragraphs where a line will do.
- Shaming personal choices or anti-makeup messages.
- Inventing campaign dates, activities or numbers.
