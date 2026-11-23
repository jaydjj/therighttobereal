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
- "Our insecurities should not be someone else's *business model.*"
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

### Light and dark mode: never mixed

The site has two complete modes and never mixes them on one page. It follows the visitor's device setting; the round sun/moon button in the header switches and is remembered.

| | Light mode | Dark mode |
|---|---|---|
| Page and plain sections | Paper `#efe6d4` | Black `#1a1714` |
| Alternate sections | Sand `#e4d6ba` | Black 2 `#26211c` |
| Text | Black, muted `#62584b` | Cream, muted `#c4b8a3` |
| Primary (buttons, pledge bar, March 8 row) | Brick red, cream text | Gold `#d9a441`, black text |
| Labels | Muted black (dates brick) | Gold |
| Italic turn in headlines | Black | Gold |
| Bold blocks | Beauty Blackout and the manifesto band are red, with cream text and cream buttons | The Blackout is a Black 2 section; the manifesto band is gold with black text |
| Logo | `assets/logo.svg` | `assets/logo-dark.svg` (cream, gold "real"), made by `brand/make_logo_dark.py` |

Rules: no black sections in light mode; no light sections in dark mode (except the gold band); **never red in dark mode**. Illustrations keep their printed paper frame in both. Every colour in `assets/styles.css` goes through a role token (`--bg`, `--text`, `--primary`, `--label`, `--em`...), never a raw colour, so both modes stay complete.

### Typography: four styles, seven sizes

| Style | Typeface | Used for |
|---|---|---|
| **Serif** | DM Serif Display, upright | Headlines, statements, principle and perk names, the count. Kept for things that are said, not listed |
| **Serif italic** | DM Serif Display, italic | The turn in a headline ("So is our power *to change it.*"), emphasis |
| **Sans** | Work Sans 400 | Body copy, event names, week-card titles, key facts, form text |
| **Label** | Work Sans 600, small spaced capitals | Kickers, dates, tags, buttons, navigation |

Every piece of text uses one of these seven sizes (tokens in `assets/styles.css`). Nothing in between, no one-off sizes.

| Size | Style | Used for |
|---|---|---|
| `--t-display` | Serif | Homepage headline, manifesto statement, "Have a real *day.*", the pledge count |
| `--t-h2` | Serif | Section headlines |
| `--t-title` | Serif | Principle and perk names ("Group chats."), the closing line, "/1,000 pledges" |
| `--t-lead` | Sans | The one paragraph under a headline; event names and week-card titles |
| `--t-body` | Sans | Body copy, lists, key facts, form fields |
| `--t-small` | Sans | Form hints, notes, card text, copyright |
| `--t-label` | Label | Kickers, dates, tags, buttons, navigation |

No bold body text, no sans italic, no monospace, no new typefaces. A sentence is either a headline (serif) or copy (sans); don't set a body sentence in serif. The logo is an image (`assets/logo.svg`), not a font.

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
- **Animated illustrations** are MP4 video, never GIF (the Blackout GIF was 8.9 MB; the MP4 is 1.1 MB): `assets/art/<id>.mp4` plus `<id>-poster.webp` and `.jpg`, shown with `_includes/loop.html`. Crop off any baked-in border; the site adds the frame. They play only while on screen, stay still for visitors who ask for reduced motion, and always have a pause button. The description (in `_data/art.yml`) says what changes.
- **Every image needs alt text** describing the scene, including any words shown in it.

### Current set

| Id | Scene | Used on |
|---|---|---|
| `press` | A printing press churning out the same idealized face | Manifesto band ("business model") |
| `blackout-loop` | The street of beauty and diet claims; the signs go dark until only a neon "be real with us" glows, then the lights return (8.8-second loop) | Beauty Blackout |
| `claims` | The same street, still | Not in use (kept for Instagram) |
| `board` | A community notice board: Come As You Are, All Bodies Welcome, Rest Is a Right… | Instagram |

### Prompt recipe (for your image tool)
> Vintage relief-print / lithograph poster illustration, heavy black ink outlines, cross-hatching, visible paper grain, limited palette of brick red, mustard gold, black and warm cream paper. [SCENE]. Diverse, dignified people of different ages and body types, relaxed and real. Strong diagonal composition. No text except [ANY SATIRICAL SIGN TEXT]. Portrait 4:5.

---

## 5. UI components

**The picture frame.** `_includes/picture.html`. The illustration on a light sheet with an ink border and a hard offset shadow, no caption. At most one per section, never in the hero, never louder than the main button.

**Buttons.** One primary action per section.

| Button | Look | Use |
|---|---|---|
| Primary | Light: brick red, cream text, black offset shadow (cream button inside the red Blackout). Dark: gold, black text, cream shadow | Join the Beauty Blackout, Pledge, Sign up. Always the most prominent thing on the page |
| Secondary | Solid black, cream text (dark: cream, black text) | Follow on Instagram |
| Text link | Small capitals, brick underline | Lesser actions, e.g. "Follow the movement on Instagram →" |
| Outline | Border in the text colour | Secondary actions, e.g. "Pledge for the whole month" beside the pledge |

**Header.** Fixed to the top while scrolling. Logo left; the sun/moon mode toggle, "Instagram" and a small red "Join March 8" button (jumps to the Blackout) right. On phones the Instagram link hides and the red button stays.

**Labels (kickers).** Small spaced capitals above headlines: light mode muted (dates brick, cream inside red blocks); dark mode always gold.

**Key facts.** A small strip of label + sans value under the Blackout intro: Date and Where. The label above the heading says only "International Women's Day" so the date appears once; "24 hrs" is left out because the intro says "one day". (Duration and Goal stay in `_data/calendar.yml`.)

**How-to-join line.** One line under the calendar pointing to Instagram. Don't repeat it elsewhere.

**Pledge.** Straight on the ink, no boxes. The live count in big serif, "74/1,000 pledges" (`pledge_start` plus the pledges in the Sheet, over `pledge_goal`, both in `_config.yml`), counting up when it scrolls into view, with an outlined bar under it. Then two buttons side by side (stacked on phones): the red **"Pledge for March 8"** and an outlined "Pledge for the whole month" that jumps to the whole-month section. Each device counts once: pledging adds one straight away, the red button changes to **"You're in!"**, and a temporary line under the buttons ("Want reminders? Sign up for emails") links to the footer sign-up and fades after 12 seconds.

**Whole-month pledge** (`#whole-month`, plain section right after the Blackout). The Long Blackout's dates, name and rules come from `_data/calendar.yml`. "Beauty Blackout *all month.*" (gold italic), then what everyone who pledges gets (group chats; featured stories, shared April 8) and an email form. **Email is required** here: it's how we send the group chat invite. Pressing "Pledge for the whole month" is the opt-in; the wording beside it says what they'll get and that they can unsubscribe. It also counts toward the March 8 total, once per device.

**Email sign-up.** Permanent, in the footer beside "Have a real *day.*" (`#newsletter`, on every page). No tick box: typing an email and pressing "Sign up" is the opt-in, and the wording beside it says what they'll get and that they can unsubscribe (Canada's anti-spam law). Pledges, choices and opted-in emails go to a Google Sheet; emails move to Kit later.

**The Receipt.** Monospace receipt with crossed-out items, for money and time reclaimed (Keep the Change).

---

## 6. Layout and pages

### Section rules
- Every section follows one pattern: `section.section` → `.container` → `.section-head` (label kicker, h2, optional lead) → content.
- **Spacing separates sections, not lines.** Sections alternate background tone instead: paper, sand, ink (Blackout), brick (manifesto band). No borders or rules between sections.
- One spacing scale: `--space-section` (between sections), `--space-head` (heading to content), `--space-gap` (between columns).
- Two-column sections use `.split`; with an illustration, `.split-art` (picture right) or `.split-art-left` (picture left). On phones everything stacks to one column, text before picture.

### The page, top to bottom
1. **Hero** (paper): centred, text only. Headline, one paragraph, the Blackout button.
2. **Beauty Blackout** (red block; dark: Black 2): heading, body copy and the key-facts strip, then the pledge (count and button), with the street-of-claims illustration to the right (below on phones).
3. **Beauty Blackout *all month.*** (plain): the whole-month pledge, email required.
4. **Women's Month** (sand): compact two-column list (date, name, tag).
5. **One action a week** (paper): four cards, Week 1–4.
6. **More to come** (sand): compact list of the other campaigns, plus the one Instagram how-to-join line.
7. **Manifesto band** (red; dark: gold): "Our insecurities should not be someone else's *business model.*" with the printing-press illustration.
8. **What we stand for** (paper): text only. "You shouldn't have to be beautiful *to be valued.*", the principles in two columns and the closing line.
9. **Instagram** (sand): with the notice-board illustration.
10. **Footer** (plain): "Have a real *day.*" beside the email sign-up, then the copyright. No repeated links: Instagram is in the fixed header.

### The calendar
- Tags: Protest (brick), Reclaim (dark gold `#7a5410`), Unite (olive `#4f5a1f`). Outlined chips in label style, right beside the name. Recurring: dashed ink chip with ↻.
- Event names are sans (lead size); the tags on each row are the key, so there is no separate tag legend. Week cards have no "Monthly" tag: the section lead already says they repeat every month.
- March 8 is the one highlighted row in the Women's Month list (red in light mode, gold in dark).
- Recurring events live only in "One action a week", never in the March list.
- Descriptions for compact lists stay in `_data/calendar.yml` for reference and Instagram planning.

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
| Gold tint / muted on ink | 7.9 / 9.1 : 1 |
| Black on gold (dark-mode buttons, manifesto band) | 7.9 : 1 |
| Gold tint / muted on whole-month black `#26211c` | 7.1 / 8.2 : 1 |
| Reclaim tag / Unite tag on light paper | 5.5 / 6.0 : 1 |
| Gold on paper | 2.6 : 1. **Fails: never use for text** |

- Every image has descriptive alt text and every video a description. Looping animation has a pause button and respects "reduce motion". Decorative shapes are hidden from screen readers.
- Real information is real text, never baked into an image.
- Visible keyboard focus (outline in the primary colour: red in light mode, gold in dark, cream inside red blocks). A "Skip to content" link appears on the first Tab.
- Screen readers: the animated pledge count is announced once when it settles ("74 of 1,000 pledges"), not on every frame. Form hints and error messages are linked to their fields; invalid emails are marked invalid.
- Motion is minimal and respects "reduce motion".
- Automated check: axe (WCAG 2.2 AA plus best practice) runs clean on every page in both modes.
- Images are compressed and sized per screen; images below the first screen load lazily.

---

## 8. Checking the UI before it ships

Run `node tools/check-ui.js` before every push that changes how the site looks. It builds the site, opens every page in light and dark mode, at desktop and phone width (including the hidden states, like the line after pledging) and fails on:
- any text outside the four styles and seven sizes;
- any text below WCAG AA contrast;
- mixed modes (a black section in light mode, a light one in dark), any red in dark mode, or a dark-mode label that isn't gold;
- anything wider than a phone screen, or a line between sections;
- an image without alt text.

Fix every failure before pushing. Then look at desktop and phone screenshots: the script checks the rules, not whether it looks right.

## 9. Instagram

The site's look carries over so posts are recognizable without the logo:
- **Statements:** big serif on paper or ink, one italic turn, brick red for the key word only.
- **Illustrations:** the print-style artwork in the picture frame, with a short caption below the image (in the post, not baked into the art).
- **Money and time:** the Receipt.
- **Event reminders:** date in small brick capitals, campaign name in serif.
- **Profile picture:** `brand/instagram-avatar.png`.

---

## 10. Don'ts

- Pastel wellness palettes, soft gradients, generic feminine branding, or pink as a "women's issue" colour.
- Retro 80s/90s styling, punk-zine collage, sepia filters, or stamps as the main device.
- More than one primary button per section, or anything louder than the Blackout button.
- One-off font sizes, serif body sentences, raw colours instead of role tokens, mixing light and dark sections, or red in dark mode.
- Repeating copy, captions under pictures on the site, or long paragraphs where a line will do.
- Shaming personal choices or anti-makeup messages.
- Inventing campaign dates, activities or numbers.
