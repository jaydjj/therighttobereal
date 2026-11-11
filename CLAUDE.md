# The Right to Be Real

Static website for The Right to Be Real, a social movement against the beauty standards and pressures corporations use to sell insecurity. Live at https://therighttobereal.com, hosted on GitHub Pages.

## Design and copy

Follow `DESIGN.md` for all design and writing decisions: the feel, principles, colours, fonts and don'ts.

Key points:
- Warm, confident editorial. Restraint over decoration. Type leads.
- Headlines pair an upright statement with an italic turn.
- Copy is short, plain and dry. Challenge systems, never individuals. Never anti-makeup.
- Never write "BeReal" as one word.

## Working preferences

- **Check before adding.** Propose new content, sections or events and get approval before building them. Only make the changes that were asked for.
- **Give options first** for new copy, names and visual directions, with a recommendation.
- **Keep events simple.** The website describes what's happening; how-to-join instructions live on Instagram (@therighttobereal).
- **One main call to action:** the March 8 Beauty Blackout.

## Publishing

- No pull requests. Commit and merge straight to `main`; this is a low-risk solo project.
- Pushing to `main` deploys automatically via `.github/workflows/pages.yml` (GitHub Actions).
- When `assets/styles.css` changes, bump the `?v=` number on the stylesheet link in `index.html` and `404.html` so browsers load the new styles.
- Check layouts at phone width as well as desktop.

## Files

- `index.html`: the whole site (single page)
- `assets/styles.css`: styles and colour variables
- `404.html`: not-found page
- `CNAME`: custom domain
- `brand/`: logo files and the profile picture (`avatar.html` is the source used to render them)
- `DESIGN.md`: design guide

## Not yet connected

The March 8 sign-up form in `index.html` doesn't send anything yet. It will be connected to Kit (the email tool) once the account and sender email are set up. Mailing must follow Canada's anti-spam law (CASL): an unticked consent box, a sender address in every email, and an unsubscribe link.
