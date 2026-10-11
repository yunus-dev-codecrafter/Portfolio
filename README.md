# Yunus Zakari Abdulhameed — Software Developer Portfolio

A single-page developer portfolio built with **HTML5, CSS3 and vanilla JavaScript only**.
No frameworks, no build step, no dependencies — it runs as a static website and deploys
directly to GitHub Pages.

Live site: <https://yunus-dev-codecrafter.github.io/Portfolio/>

Positioning: **Software Developer | Web Applications & Frontend Engineering**.

## Structure

```
portfolio/
├── index.html              # Single-page markup for every section
├── css/
│   └── style.css           # Design tokens, layout, responsive rules, accessibility
├── js/
│   └── script.js           # Mobile drawer, reveal-on-scroll, active section, footer year
├── assets/
│   ├── fonts/
│   │   ├── inter.woff2          # Body font (variable, latin subset)
│   │   └── space-grotesk.woff2  # Heading font (variable, latin subset)
│   ├── images/
│   │   ├── yunus-zakari-abdulhameed.jpg      # Optimized hero photo (600×700)
│   │   ├── professional display picture.png  # Original source photo (uncompressed)
│   │   ├── project-fikra-todo.jpg            # Fikra To-Do App screenshot (1280×800)
│   │   ├── project-lisanun-mubeen.jpg        # Lisanun Mubeen Academy screenshot (1280×800)
│   │   └── project-rafeequl-hifz.jpg         # Rafeequl Hifz V2 screenshot (1280×800)
│   ├── certificates/
│   │   └── CPN-NSQ-Level-3-Frontend-Web-Development.pdf  # AIMKIO SOLUTIONS LTD certificate
│   └── icons/
│       └── favicon.svg                       # Text-based favicon (initials)
├── portfolio.txt           # Project brief
└── README.md
```

## Run it locally

Any static server works. From the project folder:

```powershell
# Option 1 — VS Code
# Install the "Live Server" extension, then right-click index.html → "Open with Live Server"

# Option 2 — Node
node --version   # if you have Node, any static server works, e.g. npx serve

# Option 3 — just open the file
# Double-click index.html (everything is relative, so it works from the filesystem too)
```

## Repository links and privacy

The featured project cards link **only to live demos** — no source-repository links, so the
page stays correct when the project repositories become private. The only GitHub link on the
site is the personal profile (`https://github.com/yunus-dev-codecrafter`).

If any project repo stays public and you want to link it again, add a second `.text-link`
anchor inside that project's `.project-links` block in `index.html`.

## Typography and fonts

Fonts are **self-hosted** (no external requests, no Google Fonts CDN):

- **Inter** — body text (`assets/fonts/inter.woff2`)
- **Space Grotesk** — headings (`assets/fonts/space-grotesk.woff2`)

Both are variable fonts served as the latin subset, declared with `@font-face` at the top of
`css/style.css` using `font-display: swap`, and preloaded in `index.html`. System monospace is
used for eyebrow/label accents. To change fonts, replace the woff2 files (keeping their names)
or update the `@font-face` rules and the `--font-sans` / `--font-heading` tokens.

## Mobile navigation (left drawer)

Below `900px` the primary navigation is a **left slide-out drawer**:

- A `.nav-backdrop` scrim (dark + `backdrop-filter: blur`) fades in behind it and closes the
  drawer on click.
- The drawer has its own header (title + close button), numbered links, and a footer with a
  "Get in touch" button and GitHub / WhatsApp / email icons.
- Opening locks body scroll, moves focus into the drawer and traps Tab; `Escape`, a link click,
  the close button or an outside click all close it and return focus to the toggle.
- When closed the drawer is `inert` (not tabbable); `prefers-reduced-motion` disables the slide.
- On desktop the drawer chrome (numbers, socials, close button) is hidden and the same `<nav>`
  renders as a horizontal menu. With JavaScript disabled, the `<noscript>` block renders a
  plain inline nav instead.

## UI enhancements

- Hero credibility strip with verified counts (merged open-source PRs, live projects, certificate).
- Numbered section eyebrows (01–07) and inline SVG icons on each Services card.
- Gradient hero title (solid-colour fallback via `@supports`) with a soft hero glow.
- Experience section rendered as a vertical timeline.
- Floating "back to top" button that appears after scrolling.

## Hero photo

The hero uses `assets/images/yunus-zakari-abdulhameed.jpg` (600×700, ~60 KB), generated from
the original `professional display picture.png` by cropping it to the 6:7 frame the CSS uses.
The original PNG is kept only as a source file and can be deleted once you no longer need it.

## Project screenshots

Each project card uses a real capture at **1280×800** (the CSS frame is 16:10). To refresh one:

1. Open the live site and capture the visible area at a 1280×800 viewport.
   (Lisanun Mubeen and Rafeequl Hifz sit behind an InfinityFree JavaScript challenge —
   a real browser clears it automatically; a plain HTTP fetch does not.)
2. Save over the matching file in `assets/images/` and keep `loading="lazy"`, the
   `width`/`height` attributes and descriptive `alt` text.

## Certifications

The **Certifications & Professional Development** section displays:

- **Level 3 in Frontend Web Development** — AIMKIO SOLUTIONS LTD — awarded 3 November 2025.

The certificate PDF is served from
`assets/certificates/CPN-NSQ-Level-3-Frontend-Web-Development.pdf` and linked with a
"View Certificate" button. Before making the repository public, confirm the PDF contains
nothing you would rather keep private (it is published as-is).

## Services

The **Services** section is split into two clearly labelled groups so the page stays honest
about current ability:

- **Services I can deliver now** — responsive website/web-app development, frontend
  implementation from designs (Figma), backend development and REST API integration (PHP),
  database-driven applications (MySQL/SQL), business/school/portfolio websites, redesign,
  debugging, performance and maintenance, Git/GitHub collaboration and deployment, and PWAs.
- **Actively developing (not yet expert-level)** — modern frontend with React (Tailwind CSS,
  Bootstrap), backend services with Node.js & Express, and AI API integration.

Each card lists its stack in a small mono line, and the "actively developing" cards use a
dashed border to set them apart. As skills progress, move a card up into the first group in
`index.html` and drop the `service--learning` class.

## Download CV button

The brief asks for a "Download CV" button in the hero and a link in the contact section.
No CV PDF exists in the project yet, so **no link to a missing file is shipped**. Both
places are prepared and commented out:

- Hero: inside `.hero-actions` in `index.html`.
- Contact: inside the "CV" contact card in `index.html`.

To enable them:

1. Add your CV as `assets/Yunus_Zakari_Abdulhameed_CV.pdf`.
2. Uncomment the prepared `<a href="assets/Yunus_Zakari_Abdulhameed_CV.pdf" download>`
   anchor in each location.

## SEO

`index.html` includes a canonical URL, Open Graph tags (`og:title`, `og:description`,
`og:url`, `og:image`) and Twitter card tags. If you move to a custom domain, update the
absolute URLs in the `<head>`.

## Deploy to GitHub Pages

1. Push this folder to the GitHub repository.
2. Open the repository on GitHub → **Settings → Pages**.
3. Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)`.
4. Save. The site appears at `https://<your-username>.github.io/<repo>/` in a minute or two.

> The site uses only relative paths, so it works from a sub-path without configuration.

## Accessibility & motion

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus states.
- Mobile drawer: `aria-expanded` + `aria-label` on the toggle, `inert` when closed, focus
  moved in on open and trapped while open, and closed on `Escape`, a link click, the close
  button, the backdrop, or an outside click.
- Reveal animations use `IntersectionObserver` and are disabled automatically when the OS
  reports `prefers-reduced-motion: reduce`.
- With JavaScript disabled the page is fully readable — all content is visible by default.

## Verified facts and remaining items

**Verified**

- Contact details: email, WhatsApp (`+234 916 886 2025`) and GitHub are the real accounts.
- Open-source contributions: 100+ pull requests merged across open-source projects. The four
  listed in the Experience section (QuickLendX #2792, CredenceOrg/Credence-Backend #1486,
  DelegoLabs/Delego-backend #409, bridgelet #744 & #743) are confirmed merged via the GitHub API.
- Live links: the portfolio and all three project demos return HTTP 200.

**Needs your input**

- **CV** — add `assets/Yunus_Zakari_Abdulhameed_CV.pdf` and uncomment the two prepared links.
- **Certificate PDF** — published as-is; confirm it is safe for public distribution.
- **Teaching & school leadership** — currently described in general terms only. Supply the
  role, institution and dates if you want specifics on the page.
- **Lisanun Mubeen Academy** — description is based on the public repository; confirm which
  features are live before publishing.
- **Fikrah-Tech School Management System** — not featured. There is no public live demo or
  reference to point to, so it cannot be presented credibly yet. Add a demo URL to include it.
