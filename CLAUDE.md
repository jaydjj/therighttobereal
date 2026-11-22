# The Right to Be Real

Website for The Right to Be Real, a social movement against the beauty standards and pressures corporations use to sell insecurity. Live at https://therighttobereal.com, built with Jekyll and hosted on GitHub Pages.

## Design and copy

Follow `DESIGN.md` for all design and writing decisions: the feel, voice, colours, fonts, signature devices and don'ts.

Key points:
- Counterculture meets radical humanity. Defiant, wry, human.
- Palette: paper, ink and one red. Headlines pair an upright statement with an italic turn.
- Challenge systems, never individuals. Never anti-makeup.
- Never write "BeReal" as one word.
- The logo is one shared file, `assets/logo.svg` ("The right to be real."). Use it as an image wherever the logo appears; never retype or rebuild it. To change it, rerun `brand/make_logo.py` (usage is in the file).

## Working preferences

- **Check before adding.** Propose new content, sections or events and get approval before building them. Only make the changes that were asked for.
- **Give options first** for new copy, names and visual directions, with a recommendation.
- **Never invent** campaign dates, activities or commitments. Campaign pages hold only content that's been approved for the public site.
- **Never delete campaign detail.** Short summaries go on the homepage and `/campaigns/`; full detail stays on each campaign page.
- **Keep events simple.** The website describes what's happening; how-to-join instructions live on Instagram (@therighttobereal).
- **One main call to action:** the March 8 Beauty Blackout.

## Structure

Home → Campaigns (`/campaigns/`) → one page per campaign (`/campaigns/<name>/`).

- `index.html`: homepage (hero, the argument, the action, the movement, the people, the invitation)
- `campaigns/index.html`: campaign overview, grouped into three pillars
- `_campaigns/*.md`: one file per campaign. Front matter holds the title, pillar, dates, summary, facts and the agenda; the body holds the longer sections. Edit these to change campaign content.
- `_data/pillars.yml`: the three pillars (The Protest, The Reclamation, The People)
- `_layouts/`, `_includes/`: shared page templates (header, footer, sign-up form, receipt)
- `assets/styles.css`, `assets/site.js`: styles and small scripts (old one-page links redirect to campaign pages)
- `assets/logo.svg`, `assets/favicon.png`: logo and tab icon
- `brand/`: profile picture and wordmark images, and the scripts that make them
- `404.html`, `CNAME`, `DESIGN.md`

## Publishing

- No pull requests. Commit and merge straight to `main`; this is a low-risk solo project.
- Pushing to `main` builds the site with Jekyll and deploys it via `.github/workflows/pages.yml`.
- The stylesheet link has an automatic cache-busting version, so there's no number to bump.
- Preview locally with `jekyll build` and check layouts at phone width as well as desktop.

## Not yet connected

The March 8 sign-up form (`_includes/join-form.html`) doesn't send anything yet. It will be connected to Kit (the email tool) once the account and sender email are set up. Mailing must follow Canada's anti-spam law (CASL): an unticked consent box, a sender address in every email, and an unsubscribe link.
