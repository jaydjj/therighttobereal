# The Right to Be Real

Website for The Right to Be Real, a social movement against the beauty standards and pressures corporations use to sell insecurity. Live at https://therighttobereal.com, built with Jekyll and hosted on GitHub Pages.

## Design and copy

Follow `DESIGN.md` for all design and writing decisions: the feel, voice, colours, fonts, signature devices and don'ts.

Key points:
- A contemporary movement printing its own broadsides: print-style illustration, paper, ink, brick red, gold. Defiant, wry, human.
- On black, gold is the accent: all labels, the italic turn in headlines, the pledge bar. Red is for buttons.
- Copy is minimal and scannable: say each thing once per page; no captions under pictures on the site.
- Headlines pair an upright statement with an italic turn.
- Illustrations live in `assets/art/` with size and alt text in `_data/art.yml`, shown with `_includes/picture.html` (a framed print). Every new one needs descriptive alt text. Never in the hero; the Blackout button always stays the most prominent thing on the page.
- Challenge systems, never individuals. Never anti-makeup.
- Never write "BeReal" as one word.
- The logo is one shared file, `assets/logo.svg` ("THE RIGHT TO" / black italic "be" / brick-red "real"). Use it as an image wherever the logo appears; never retype or rebuild it. To change it, edit and rerun `brand/make_logo.py` (usage is in the file).

## Working preferences

- **Check before adding.** Propose new content, sections or events and get approval before building them. Only make the changes that were asked for.
- **Give options first** for new copy, names and visual directions, with a recommendation.
- **Never invent** event dates, activities or commitments. The calendar holds only content that's been approved for the public site.
- **Never delete event detail.** Every date, rule and description lives in `_data/calendar.yml`; tighten wording, don't drop information.
- **Keep events simple.** The website describes what's happening; how-to-join instructions live on Instagram (@therighttobereal).
- **One main call to action:** the March 8 Beauty Blackout.

## Structure

One page. Everything lives on the homepage (`index.html`). Every section follows the same pattern (`section.section` → `.container` → `.section-head` → content); sections are separated by spacing and background tone, never lines. Only four font styles: serif, serif italic, sans, label (see `DESIGN.md`).

1. Hero: centred headline, one paragraph, the Blackout button. No image.
2. The Beauty Blackout (`#blackout`, black): heading and a small facts strip, the pledge (live count "74/1,000 pledges", "Pledge for March 8" beside an outlined "Pledge for the whole month" jump button; once per device, the red button then says "You're in!" and a temporary line points to the footer sign-up), claims-street illustration to the right. The main purpose of the site.
2b. Beauty Blackout *all month* (`#whole-month`, lighter black): the Long Blackout pledge (rules from `calendar.yml`), perks (group chats, featured stories), email required (`_includes/month-form.html`).
3. Women's Month (`#march`): compact list. 4. One action a week (`#monthly`): four cards. 5. More to come (`#also`): compact list.
6. Manifesto band (brick, press illustration). 7. What we stand for (`#why`, text only, principles). 8. Instagram (notice-board illustration).

- `_data/calendar.yml`: **all event content.** The Blackout details, the March events (`march`), the monthly rhythm (`monthly`, weeks 1–4) and other campaigns (`also`, shown without descriptions). Edit this file to change dates, names or descriptions. Event names are short commands; descriptions are one or two lines in "we", present tense; dates like "Mar 8" or "Mar 1–7".
- `_includes/compact.html` (date/name/tag rows), `_includes/cards.html` (event cards), `_includes/picture.html` (framed illustration), `_includes/join-form.html` (sign-up form).
- `campaigns/`: redirect stubs only. The old campaign pages now point to the matching spot on the homepage. Don't add pages here.
- `_layouts/default.html`, `_layouts/redirect.html`, `_includes/header.html`, `footer.html` (sign-off and the permanent email sign-up, `#newsletter`)
- `assets/styles.css`, `assets/site.js` (old one-page anchors redirect to their new spots)
- `assets/logo.svg`: logo; `assets/favicon.png`, `favicon.ico`, `assets/apple-touch-icon.png`: icons
- `assets/art/`: illustrations (alt text in `_data/art.yml`)
- `brand/`: profile picture and wordmark images, and the scripts that make them
- `404.html`, `CNAME`, `DESIGN.md`

## Publishing

- No pull requests. Commit and merge straight to `main`; this is a low-risk solo project.
- Pushing to `main` builds the site with Jekyll and deploys it via `.github/workflows/pages.yml`.
- The stylesheet link has an automatic cache-busting version, so there's no number to bump.
- Preview locally with `jekyll build` and check layouts at phone width as well as desktop. Keep all text at WCAG AA contrast (see `DESIGN.md`).

## Not yet connected

The pledge (`_includes/join-form.html`, logic in `assets/site.js`) sends March 8 pledges to a Google Sheet web app once `pledge_endpoint` is set in `_config.yml` (script: `tools/pledge-sheet.gs`; no personal data, one row per device). The public count always shows, as count/goal: `pledge_start` (72) plus the pledges in the Sheet, over `pledge_goal` (1,000). Optional emails, from the footer sign-up, are saved to the Sheet's "Emails" tab when someone types an email and presses "Sign up" (no tick box; the action is the opt-in, saved with the time and consent wording), to import into Kit later. Whole-month pledges (email required) go to the "Month" tab with their consent wording and also count toward the total. Mailing must follow Canada's anti-spam law (CASL): opt-in by clear action (never pre-filled), a sender address in every email, and an unsubscribe link.
