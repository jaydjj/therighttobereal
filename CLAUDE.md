# The Right to Be Real

Website for The Right to Be Real, a social movement against the beauty standards and pressures corporations use to sell insecurity. Live at https://therighttobereal.com, built with Jekyll and hosted on GitHub Pages.

## Design and copy

Follow `DESIGN.md` for all design and writing decisions: the feel, voice, colours, fonts, signature devices and don'ts.

Key points:
- A contemporary movement printing its own broadsides: print-style illustration, paper, ink, brick red, gold. Defiant, wry, human.
- Copy is minimal and scannable: say each thing once per page; no captions under pictures on the site.
- Headlines pair an upright statement with an italic turn.
- Recurring motif: the broadside panel (`_includes/broadside.html`). Illustrations live in `assets/art/` with alt text in `_data/art.yml`; every new one needs descriptive alt text. Use it selectively; the Blackout button always stays the most prominent thing on the page.
- Challenge systems, never individuals. Never anti-makeup.
- Never write "BeReal" as one word.
- The logo is one shared file, `assets/logo.svg` ("THE RIGHT TO" / black italic "be" / brick-red "real"). Use it as an image wherever the logo appears; never retype or rebuild it. To change it, edit and rerun `brand/make_logo.py` (usage is in the file).

## Working preferences

- **Check before adding.** Propose new content, sections or events and get approval before building them. Only make the changes that were asked for.
- **Give options first** for new copy, names and visual directions, with a recommendation.
- **Never invent** campaign dates, activities or commitments. Campaign pages hold only content that's been approved for the public site.
- **Never delete event detail.** Every date, rule and description lives in `_data/calendar.yml`; tighten wording, don't drop information.
- **Keep events simple.** The website describes what's happening; how-to-join instructions live on Instagram (@therighttobereal).
- **One main call to action:** the March 8 Beauty Blackout.

## Structure

One page. Everything lives on the homepage (`index.html`):

1. Hero: headline, one paragraph, the Blackout button (jumps to `#blackout`), Instagram link, illustration.
2. The Beauty Blackout (`#blackout`): details beside the "Count me in" sign-up card. The main purpose of the site.
3. The calendar (`#calendar`): Women's Month (`#march`), then the whole year (`#year`). Each event has a tag (Protest, Reclaim or Gather) and, if it repeats, a "Recurring" label.
4. Why we're doing this (`#why`) with the principles (`#principles`).
5. Instagram.

- `_data/calendar.yml`: **all event content.** The Blackout details, the March events and the year events. Edit this file to change dates, names or descriptions. Event names are short commands; descriptions are one or two lines in "we", present tense; dates like "Mar 8" or "Mar 1–7".
- `_includes/calendar.html`: renders a list of events. `_includes/join-form.html`: the sign-up form.
- `campaigns/`: redirect stubs only. The old campaign pages now point to the matching spot on the homepage. Don't add pages here.
- `_layouts/default.html`, `_layouts/redirect.html`, `_includes/header.html`, `footer.html`, `broadside.html`
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

The March 8 sign-up form (`_includes/join-form.html`) doesn't send anything yet. It will be connected to Kit (the email tool) once the account and sender email are set up. Mailing must follow Canada's anti-spam law (CASL): an unticked consent box, a sender address in every email, and an unsubscribe link.
