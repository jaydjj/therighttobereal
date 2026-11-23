# The Right to Be Real: Design System

The rules for anyone, people or AI agents, designing, building or writing for The Right to Be Real: the website, Instagram, merch and anything else.

- **Source of truth:** the tokens at the top of `assets/styles.css`. This guide explains them; if the two ever disagree, fix whichever is wrong and keep them in step.
- **Checked automatically:** `node tools/check-ui.js` enforces the type, colour, mode, layout and media rules below (see [Quality checks](#11-quality-checks)).
- **Changing the system:** propose the change first, update the tokens, this guide and the checker together, then ship.

**Contents:** 1 Principles · 2 Brand · 3 Voice and copy · 4 Foundations · 5 Components · 6 Page structure · 7 Illustration · 8 Logo and icons · 9 Accessibility · 10 Instagram · 11 Quality checks · 12 Don'ts

---

## 1. Principles

1. **One action leads.** The March 8 Beauty Blackout pledge is always the most prominent thing on the page. Everything else supports it.
2. **Print, not polish.** A movement printing its own broadsides: flat colour, heavy line, hard shadows, paper. No gradients, blur or glossy effects.
3. **Say it once.** Every word, picture and element earns its place. If something repeats, cut it.
4. **One pattern per job.** The same kind of content always looks the same. New patterns need a reason and an entry in this guide.
5. **Two modes, never mixed.** Light and dark are complete themes. A page is entirely one or the other.
6. **Accessible by default.** WCAG 2.2 AA is the floor, in both modes, on every screen size.

---

## 2. Brand

**The feel.** A contemporary movement printing its own broadsides. Serious, warm, collective and a little defiant, with the confidence of an independent magazine. Not a nonprofit, a wellness brand, a body-positivity account or a history costume.

**The argument.** The point isn't that everyone is beautiful. It's that nobody should have to be beautiful to be valued. The beauty industry profits from self-doubt and sells the fix. We challenge that business model and defend everyone's freedom to make their own choices.

**Narrative:** Challenge the system. Reclaim your choices. Find your people.

**Personality**
- **Defiant:** confident, willing to take on powerful interests.
- **Wry:** observant and dryly funny when it fits.
- **Human:** warm, candid, grounded in ordinary lives.

**Lines we use**
- "The pressure is everywhere. *So is our power to change it.*" (homepage headline)
- "Our insecurities should not be someone else's *business model.*"
- "You shouldn't have to be beautiful *to be valued.*" (core belief)
- "Buy nothing. Say everything." (Beauty Blackout)
- "Have a real *day.*" (sign-off)

---

## 3. Voice and copy

1. **Minimal and scannable.** Short sentences, one idea per line. Cut anything that doesn't help someone understand or act.
2. **Say it once per page.** If a line repeats a headline, a button, a picture or another section, cut it.
3. **Headlines pair an upright statement with an italic turn:** "Women's *Month.*"
4. **Buttons say what happens,** in a few words: "Pledge for March 8", "Sign up". No "Click here" or "Learn more".
5. **No captions under pictures on the site.** The page around them carries the words.
6. **Challenge systems, never individuals.** Criticize manufactured insecurity, not people who buy beauty products. Never anti-makeup.
7. **Invite, don't lecture.** No empowerment clichés, platitudes or corporate-activism language.
8. **Describe here, mobilize there.** The website says what's happening; how to take part lives on Instagram (@therighttobereal).
9. **Never invent** dates, activities, numbers or commitments.
10. **Mechanics:** sentence case everywhere (labels are set in capitals by the style, not typed in capitals); Canadian spelling; dates as "Mar 8" in lists and "March 8, 2027" in prose; en dash for ranges ("Mar 8 – Apr 8").
11. Never write "BeReal" as one word (a separate, unrelated app uses that).

---

## 4. Foundations

### 4.1 Colour

**Palette.** The raw colours. Use them only to define role tokens, never directly in components.

| Name | Hex | Notes |
|---|---|---|
| Paper | `#efe6d4` | Light-mode page |
| Sand | `#e4d6ba` | Light-mode alternate sections |
| Sheet | `#f7f0e1` | Cards, picture frames, form fields |
| Ink | `#1a1714` | Light-mode text; dark-mode page |
| Black 2 | `#26211c` | Dark-mode alternate sections and cards |
| Muted | `#62584b` | Secondary text in light mode |
| Muted on black | `#c4b8a3` | Secondary text in dark mode |
| Brick | `#9e2a1f` | Light-mode primary; "real" in the logo |
| Gold | `#d9a441` | Dark-mode primary |
| Ochre | `#b8862b` | Illustration fills only. Never text (2.6:1 on paper) |

**Roles.** Components use these tokens, so both modes are always complete.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | Paper | Ink | Page and plain sections |
| `--bg-alt` | Sand | Black 2 | Alternate sections (including the Blackout) |
| `--surface` | Sheet | Black 2 | Cards, highlighted targets |
| `--text` | Ink | Paper | Headlines and body |
| `--text-lead` | Ink | Muted on black | The paragraph under a headline |
| `--text-muted` | Muted | Muted on black | Descriptions, hints, notes |
| `--text-soft` | `#3a332c` | `#ddd2bd` | The closing line, the how-to-join note |
| `--primary` / `--on-primary` | Brick / Sheet | Gold / Ink | Primary buttons, the pledge bar, the March 8 row, focus rings |
| `--label` | Muted | Gold | Kickers and other labels |
| `--date` | Brick | Gold | Dates in lists and cards |
| `--em` | Inherits | Gold | The italic turn in headlines |
| `--line` / `--shadow` | Ink / Ink | Paper / Sheet | Borders and hard shadows |

**Rules**
- Light mode is cream, black and red. Dark mode is black, gold and cream. **Never red in dark mode.**
- The mode follows the visitor's device setting; the sun/moon button in the header overrides it and is remembered.
- Light mode has no black sections; dark mode has no light sections. The one coloured block is the manifesto band: red with cream text in light mode, gold with black text in dark.
- Colour never carries meaning on its own; there is always text too.
- Illustrations keep their printed paper frame in both modes.

### 4.2 Typography

**Four styles, seven sizes.** Nothing else: no other typefaces, weights or one-off sizes; no bold body text, sans italic or monospace.

| Style | Typeface | Job |
|---|---|---|
| **Serif** | DM Serif Display 400 | Things that are *said*: headlines, statements, the count |
| **Serif italic** | DM Serif Display 400 italic | The turn in a headline, emphasis inside a statement |
| **Sans** | Work Sans 400 | Things that are *read* or *listed*: copy, item names, facts, forms |
| **Label** | Work Sans 600, capitals, +0.16em tracking | Kickers, dates, buttons, navigation |

| Token | Style | Size (phone → desktop) | Line height | Used for |
|---|---|---|---|---|
| `--t-display` | Serif | 42 → 74 px | 1.0 | Homepage headline, manifesto statement, sign-off, the pledge count |
| `--t-h2` | Serif | 35 → 58 px | 1.0 | Section headlines |
| `--t-title` | Serif | 22 px | 1.2–1.4 | The closing line, "/1,000 pledges" |
| `--t-lead` | Sans | 18 → 20 px | 1.3–1.5 | The paragraph under a headline; item names |
| `--t-body` | Sans | 17 px | 1.6 | Body copy, item descriptions, key facts, form fields |
| `--t-small` | Sans | 15 px | 1.6 | Form hints, notes, copyright |
| `--t-label` | Label | 11.5 px | 1.2 | Kickers, dates, buttons, navigation |

**Rules**
- A sentence is either a headline (serif) or copy (sans). Never set a body sentence in serif.
- Line length: leads and paragraphs 46–60 characters wide; headlines balanced across lines.
- Fonts load from Google Fonts with `display=swap`, so text is readable before the fonts arrive.
- The logo is an image, not a font.

### 4.3 Space and layout

- **Container:** max 1160 px wide, with at least 20 px side gutters (more on notched phones).
- **Section pattern:** `section.section` → `.container` → `.section-head` (kicker, h2, optional lead) → content. Sections are separated by space and background tone, **never lines**. Plain and alternate tones alternate down the page.
- **Spacing tokens:** `--space-section` (72 → 128 px, top and bottom of every section), `--space-head` (28 → 48 px, heading to content), `--space-gap` (32 → 88 px, between columns). Gaps inside components stay small and even (8–24 px); reuse the values already in the component rather than inventing new ones.
- **Columns:** `.split` (two equal columns), `.split-art` (picture right), `.split-art-left` (picture left). Lists of items use two columns on desktop, cards four. On phones everything stacks to one column, text before picture.
- **Breakpoints:** phone up to 560 px, tablet up to 860 px, desktop above. Components may add a breakpoint only where their content needs it.

### 4.4 Shape and depth

- **Corners:** square, with a 2 px radius on buttons and fields. No pills, apart from the round icon buttons.
- **Borders:** 1.5–3 px in the line colour: cards 1.5 px with a 6 px top, picture frames 3 px, fields 2 px.
- **Shadows:** hard offset, no blur, in the shadow colour: buttons 6 px (8 px on hover), cards 5 px, frames 7 px. This is the only depth on the site.

### 4.5 Motion

- **Allowed:** button lift on hover (2 px); the pledge count counting up once when it scrolls into view (1.2 s, ease-out); the bar filling; the "Want reminders?" line fading in, then out after 12 s; looping illustrations.
- **Reduce motion:** with the device setting on, nothing animates; counts appear instantly, loops show a still frame, and smooth scrolling is off.
- Loops play only while on screen and always have a pause button (anything moving longer than 5 s must be pausable).

### 4.6 Icons

Only where words don't fit: the mode toggle (sun/moon) and the loop pause/play. Simple 2 px line or solid shapes in the current text colour, inside 40 px round buttons, always with an accessible name ("Switch to dark mode", "Pause animation").

---

## 5. Components

Every component uses role tokens and the type scale. States: **hover** (lift or underline, only on devices with a mouse), **focus** (3 px outline in the primary colour, 3 px offset), **disabled/done** (no lift, default cursor), **error** (message in words next to the field).

**Header.** Fixed to the top. Logo left; the mode toggle, "Instagram" and a small primary "Join March 8" button right. On phones the Instagram link hides; the button always stays.

**Buttons.** At most one primary per section.

| Type | Look | Use |
|---|---|---|
| Primary | `--primary` fill, `--on-primary` text, hard shadow on large buttons | Join the Beauty Blackout, Pledge for March 8, Pledge for the whole month (in its form), Sign up |
| Secondary | Solid text colour, page-colour text | Follow @therighttobereal |
| Outline | 2 px border in the text colour | The secondary choice beside a primary, e.g. "Pledge for the whole month" next to the pledge |

Large buttons go full width on phones. Busy buttons say what's happening ("Sending…") and can't be pressed twice.

**Section head.** Kicker (label), headline (serif with an italic turn), optional lead (one paragraph). Nothing else.

**Items.** Every name-plus-description (calendar events, week cards, principles, perks) uses one pattern: the name in sans at lead size, full text colour, on its own line; the description below in sans at body size, muted. The checker fails if any two differ.

**Calendar list.** Date (label, date colour) and event name per row, two columns on desktop. No tags, no descriptions on the site (both stay in `_data/calendar.yml`). March 8 is the one highlighted row, in the primary colour.

**Week cards.** "Week 1–4" (label, date colour), name, description. Sheet (dark: Black 2) with a 1.5 px border, 6 px top border and 5 px hard shadow. Four across, two on tablets, one on phones.

**Pledge.** In the Blackout section, straight on the background, no box:
- The count, "74/1,000 pledges" (`pledge_start` plus the Sheet's pledges, over `pledge_goal`), with an outlined progress bar.
- The primary "Pledge for March 8" beside the outline "Pledge for the whole month" (which jumps to `#whole-month`).
- Each device counts once. After pledging, the count goes up straight away, the button reads "You're in!", and a line under the buttons ("Want reminders? Sign up for emails") links to the footer sign-up, then fades.

**Whole-month pledge** (`#whole-month`). Dates, name and rules from `_data/calendar.yml`; "Beauty Blackout *all month.*"; the perks (items); an email form where **email is required**, because it's how we send the group chat invite.

**Forms.** Every field has a visible label (label style), a hint underneath linked to the field, and messages in words. No placeholder-only fields. Consent is by action (typing an email and pressing the button), with what they'll get and "Unsubscribe any time" beside the button; no pre-ticked or hidden consent (Canada's anti-spam law).

**Picture frame** (`_includes/picture.html`). The illustration on sheet with a 3 px ink border and a 7 px hard shadow, no caption. At most one per section, never in the hero.

**Looping illustration** (`_includes/loop.html`). The picture frame with an MP4 inside, a round pause/play button in the corner, and a description. See [Illustration](#7-illustration).

**Manifesto band.** The one coloured block: a big serif statement beside an illustration.

**Footer.** "Have a real *day.*" beside the permanent email sign-up (`#newsletter`), then the copyright. No repeated navigation.

---

## 6. Page structure

One page; everything lives on the homepage.

| # | Section | Tone | Contents |
|---|---|---|---|
| 1 | Hero | Plain | Centred headline, one paragraph, the Blackout button. No image |
| 2 | Beauty Blackout `#beautyblackoutpledge` | Alternate; "*Blackout.*" in the primary colour | Kicker, headline, intro, Date and Where, the pledge; the looping illustration right (below on phones) |
| 3 | Beauty Blackout *all month.* `#whole-month` | Plain | The whole-month pledge |
| 4 | Women's Month `#march` | Alternate | Calendar list |
| 5 | One action a week `#monthly` | Plain | Four week cards |
| 6 | More to come `#also` | Alternate | Calendar list, plus the one Instagram how-to-join line |
| 7 | Manifesto band | Red (dark: gold) | "Our insecurities should not be someone else's *business model.*" with the printing-press illustration |
| 8 | What we stand for `#why` | Plain | Headline, principles (items, two columns), closing line |
| 9 | Instagram | Alternate | Follow button and the notice-board illustration |
| 10 | Footer | Plain | Sign-off and email sign-up |

Recurring events live only in "One action a week", never in the March list.

---

## 7. Illustration

**Art direction.** Inspired by 19th-century broadsides and early 20th-century labour and lithograph posters: relief-print and lithograph look, heavy black line, cross-hatching, paper grain, limited flat colour (brick, ochre, ink on warm paper), strong diagonals and dignified figures. One clear symbolic idea per image: the beauty industry's machinery and promises in the background, real people at ease in the foreground.

**People.** A real range of ages, skin tones, body shapes, styles and (over time) genders. Dignified, relaxed, mid-conversation or mid-stride. The beauty ad is only ever the thing being walked past, peeled back or produced by a machine.

**Avoid.** 80s/90s retro (neon, Memphis shapes, airbrush, chrome, gradients); punk-zine or photocopy collage; sepia or "vintage" filters; stamps as the main device; raised fists, weapons, guillotines, famous figures; copying any real poster.

**Files**
- Still: portrait 4:5, at least 1100 × 1400 px, as `assets/art/<id>-480.webp`, `-800.webp`, `-1120.webp` and `-800.jpg`, served by screen size and lazy-loaded below the first screen.
- Animated: MP4, never GIF, as `assets/art/<id>.mp4` plus `<id>-poster.webp` and `.jpg`. Crop off any baked-in border (the site adds the frame). Keep loops short and under about 1.5 MB.
- Words inside an illustration only as satire (billboard slogans). Real information (dates, calls to action) is always real text.
- Every image needs alt text, and every video a description, in `_data/art.yml`, including any words shown and, for loops, what changes.

**Current set**

| Id | Scene | Used on |
|---|---|---|
| `blackout-loop` | A street of beauty and diet claims; the signs go dark until only a neon "be real with us" glows, then the lights return (8.8 s loop) | Beauty Blackout |
| `press` | A printing press churning out the same idealized face | Manifesto band |
| `board` | A community notice board: Come As You Are, All Bodies Welcome, Rest Is a Right… | Instagram |
| `claims` | The street of claims, still | Not on the site (kept for Instagram) |

**Prompt recipe**
> Vintage relief-print / lithograph poster illustration, heavy black ink outlines, cross-hatching, visible paper grain, limited palette of brick red, mustard gold, black and warm cream paper. [SCENE]. Diverse, dignified people of different ages and body types, relaxed and real. Strong diagonal composition. No text except [ANY SATIRICAL SIGN TEXT]. Portrait 4:5.

---

## 8. Logo and icons

- **Logo:** `assets/logo.svg`: "THE RIGHT TO" in tracked capitals, a heavy black italic "be" resting on a large brick-red "real". No full stop. Dark mode uses `assets/logo-dark.svg` (cream lettering, gold "real").
- Use the files as images wherever the logo appears. Never retype, redraw or recolour by hand: edit and rerun `brand/make_logo.py`, then `brand/make_logo_dark.py`.
- Minimum height about 48 px on screen, so "THE RIGHT TO" stays readable. Keep clear space of at least the height of "be" around it.
- **Tab icon:** "be" over a red "r" on paper (`assets/favicon.png`, `favicon.ico`, `assets/apple-touch-icon.png`).
- **Profile picture and wordmark:** `brand/instagram-avatar.png`, `brand/wordmark.png` (rendered by `brand/avatar.html`).

---

## 9. Accessibility

WCAG 2.2 AA in both modes, at every screen size.

- **Contrast:** text at least 4.5:1 (3:1 for 24 px and up); icons and field borders at least 3:1.

  | Pair | Light | Dark |
  |---|---|---|
  | Text on page / alternate | 14.4 / 12.4 | 14.4 / 12.9 |
  | Muted on page / alternate / sheet | 5.6 / 4.8 / 6.1 | 9.1 / 8.2 / – |
  | Primary on page / alternate | 6.0 / 5.2 (brick) | 7.9 / 7.1 (gold) |
  | Button text on primary | 6.6 (sheet on brick) | 7.9 (ink on gold) |
  | Ochre on paper | 2.6: never text | – |

- **Keyboard:** everything works with Tab, Enter and Space; focus is always visible (primary-colour outline); "Skip to content" appears on the first Tab; nothing is hidden behind the fixed header when focused or linked to.
- **Targets:** at least 40 × 40 px for icon buttons and comfortable spacing between buttons.
- **Structure:** one h1; h2 for every section; lists for lists; real buttons for actions and links for navigation; the page language is set.
- **Screen readers:** images have alt text and videos descriptions; icon buttons have names; the pledge count is announced once when it settles, not on every frame; form hints and errors are linked to their fields, and invalid fields are marked invalid; status messages use live regions.
- **Motion:** respects "reduce motion"; loops can be paused.
- **Zoom and reflow:** works at 200% zoom and at 320 px wide with no sideways scrolling.

---

## 10. Instagram

The site's look carries over so posts are recognizable without the logo.
- **Statements:** big serif on paper or black, one italic turn; red for the key word on paper, gold on black.
- **Illustrations:** the print-style artwork in the picture frame, with a short caption in the post (never baked into the art).
- **The Receipt:** an Instagram-only device for money and time reclaimed (Keep the Change): a receipt with crossed-out items. Not used on the site.
- **Event reminders:** the date in small capitals, the campaign name in serif.
- **Profile picture:** `brand/instagram-avatar.png`.

---

## 11. Quality checks

Before every push that changes how the site looks:

1. **Run `node tools/check-ui.js`** and fix every failure. It builds the site and opens every page in light and dark mode, at 1280, 390 and 320 px, including hidden states, and fails on:
   - text outside the four styles and seven sizes;
   - item names or item descriptions that don't all match;
   - text below WCAG AA contrast;
   - mixed modes (a black section in light mode, a light one in dark), any red in dark mode, or a dark-mode label that isn't gold;
   - anything wider than a phone screen, or a line between sections;
   - an image without alt text, a video without a description, or a loop without a pause button.
2. **Run axe** (WCAG 2.2 AA plus best practice) on every page in both modes: no violations.
3. **Look** at desktop and phone screenshots in both modes. The scripts check the rules, not whether it looks right.
4. **After pushing,** confirm the "Deploy site to GitHub Pages" run finished green.

---

## 12. Don'ts

- More than one primary button per section, or anything louder than the Blackout pledge.
- One-off font sizes, serif body sentences, bold body text, or a new typeface.
- Raw colours in components, mixing light and dark sections, or red in dark mode.
- Lines between sections, gradients, blurred shadows or rounded pills.
- Repeating copy, captions under pictures on the site, or long paragraphs where a line will do.
- Tags, badges or decorative labels that don't help someone act.
- GIFs, autoplaying motion without a pause button, or information only inside an image.
- Pastel wellness palettes, generic feminine branding, or pink as a "women's issue" colour.
- Shaming personal choices or anti-makeup messages.
- Inventing campaign dates, activities or numbers.
