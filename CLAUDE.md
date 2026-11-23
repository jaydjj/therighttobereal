# The Right to Be Real

Website for The Right to Be Real, a social movement against the beauty standards and pressures corporations use to sell insecurity. Live at https://therighttobereal.com, built with Jekyll and hosted on GitHub Pages.

## Design and copy

Follow `DESIGN.md` for all design and writing decisions: the feel, voice, colours, fonts, signature devices and don'ts.

Key points:
- A contemporary movement printing its own broadsides: print-style illustration, paper, ink, brick red, gold. Defiant, wry, human.
- Copy is minimal and scannable: say each thing once per page; no captions under pictures on the site.
- Headlines pair an upright statement with an italic turn.
- Illustrations live in `assets/art/` with size and alt text in `_data/art.yml`, shown with `_includes/picture.html` (a framed print). Every new one needs descriptive alt text. Never in the hero; the Blackout button always stays the most prominent thing on the page.
- Challenge systems, never individuals. Never anti-makeup.
- Never write "BeReal" as one word.
- The logo is one shared file, `assets/logo.svg` ("THE RIGHT TO" / black italic "be" / brick-red "real"), with a dark-mode copy `assets/logo-dark.svg` made from it. Use them as images wherever the logo appears; never retype or rebuild them. To change the logo, edit and rerun `brand/make_logo.py` (usage is in the file), then `brand/make_logo_dark.py`.

## Working preferences

- **Check before adding.** Propose new content, sections or events and get approval before building them. Only make the changes that were asked for.
- **Give options first** for new copy, names and visual directions, with a recommendation.
- **Never invent** event dates, activities or commitments. The calendar holds only content that's been approved for the public site.
- **Never delete event detail.** Every date, rule and description lives in `_data/calendar.yml`; tighten wording, don't drop information.
- **Keep events simple.** The website describes what's happening; how-to-join instructions live on Instagram (@therighttobereal).
- **One main call to action:** the March 8 Beauty Blackout.

## Structure

One page. Everything lives on the homepage (`index.html`). Every section follows the same pattern (`section.section` → `.container` → `.section-head` → content); sections are separated by spacing and background tone, never lines. Only four font styles at seven sizes (`--t-display` … `--t-label`; see `DESIGN.md`). Two modes, never mixed: light (cream, black, red) and dark (black, gold, cream; never red), following the device setting with a header toggle. Use the role tokens (`--bg`, `--text`, `--primary`…) in `assets/styles.css`, never raw colours.

1. Hero: centred headline, one paragraph, the Blackout button. No image.
2. The Beauty Blackout (`#beautyblackoutpledge`, sand in light mode with "*Blackout.*" in red; black 2 with gold in dark): heading and a small facts strip, the pledge (live count "74/1,000 pledges", "Pledge for March 8" beside an outlined "Pledge for the whole month" jump button; once per device, the red button then says "You're in!" and a temporary line points to the footer sign-up). No image, for breathing room. The main purpose of the site.
2b. Beauty Blackout *all month* (`#whole-month`): the Long Blackout pledge (rules from `calendar.yml`), perks (group chats, featured stories), email required (`_includes/month-form.html`).
3. Women's Month (`#march`): compact list. 4. One action a week (`#monthly`): four cards. 5. More to come (`#also`): compact list.
6. Manifesto band (red; gold in dark mode; press illustration). 7. What we stand for (`#why`, text only, principles). 8. Instagram (notice-board illustration).

- `_data/calendar.yml`: **all event content.** The Blackout details, the March events (`march`), the monthly rhythm (`monthly`, weeks 1–4) and other campaigns (`also`, shown without descriptions). Edit this file to change dates, names or descriptions. Event names are short commands; descriptions are one or two lines in "we", present tense; dates like "Mar 8" or "Mar 1–7".
- `_includes/compact.html` (date/name rows; no tags on the site), `_includes/cards.html` (event cards), `_includes/picture.html` (framed illustration), `_includes/loop.html` (framed looping video with pause button), `_includes/join-form.html` (sign-up form).
- `campaigns/`: redirect stubs only. The old campaign pages now point to the matching spot on the homepage. Don't add pages here.
- `_layouts/default.html`, `_layouts/redirect.html`, `_includes/header.html`, `footer.html` (sign-off and the permanent email sign-up, `#newsletter`)
- `assets/styles.css`, `assets/site.js` (old one-page anchors redirect to their new spots)
- `assets/logo.svg`: logo; `assets/logo-dark.svg`: dark-mode logo (run `python3 brand/make_logo_dark.py` after changing the logo); `assets/favicon.png`, `favicon.ico`, `assets/apple-touch-icon.png`: icons
- `assets/art/`: illustrations (alt text in `_data/art.yml`)
- `brand/`: profile picture and wordmark images, and the scripts that make them
- `404.html`, `CNAME`, `DESIGN.md`
- `tools/`: the Google Sheet script and `check-ui.js` (not published)

## Publishing

- No pull requests. Commit and merge straight to `main`; this is a low-risk solo project.
- Pushing to `main` builds the site with Jekyll and deploys it via `.github/workflows/pages.yml`.
- The stylesheet link has an automatic cache-busting version, so there's no number to bump.
- **Before every push that changes the UI, run `node tools/check-ui.js` and fix every failure.** It checks both modes: type (four styles, seven sizes), WCAG AA contrast, no mixed light/dark sections, no red and gold labels in dark mode, phone-width overflow, lines between sections and alt text, on desktop and phone. Then look at desktop and phone screenshots yourself.
- After pushing, check the "Deploy site to GitHub Pages" run finished green; re-run it if it failed.

## Not yet connected

The pledge (`_includes/join-form.html`, logic in `assets/site.js`) sends March 8 pledges to a Google Sheet web app once `pledge_endpoint` is set in `_config.yml` (script: `tools/pledge-sheet.gs`; no personal data, one row per device). The public count always shows, as count/goal: `pledge_start` (72) plus the pledges in the Sheet, over `pledge_goal` (1,000). Optional emails, from the footer sign-up, are saved to the Sheet's "Emails" tab when someone types an email and presses "Sign up" (no tick box; the action is the opt-in, saved with the time and consent wording), to import into Kit later. Whole-month pledges (email required) go to the "Month" tab with their consent wording and also count toward the total. Mailing must follow Canada's anti-spam law (CASL): opt-in by clear action (never pre-filled), a sender address in every email, and an unsubscribe link.
