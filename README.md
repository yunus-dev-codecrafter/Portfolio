# Yunus Zakari Abdulhameed — Developer Portfolio

A single-page developer portfolio built with **HTML5, CSS3 and vanilla JavaScript only**.
No frameworks, no build step, no dependencies — it runs as a static website and deploys
directly to GitHub Pages.

Live site: <https://yunus-dev-codecrafter.github.io/Portfolio/>

## Structure

```
portfolio/
├── index.html              # Single-page markup for every section
├── css/
│   └── style.css           # Design tokens, layout, responsive rules, accessibility
├── js/
│   └── script.js           # Mobile nav, reveal-on-scroll, active section, footer year
├── assets/
│   ├── images/
│   │   ├── yunus-zakari-abdulhameed.jpg      # Optimized hero photo (600×700)
│   │   ├── professional display picture.png  # Original source photo (uncompressed)
│   │   ├── project-fikra-todo.jpg            # Fikra To-Do App screenshot (1280×800)
│   │   ├── project-lisanun-mubeen.jpg        # Lisanun Mubeen Academy screenshot (1280×800)
│   │   └── project-rafeequl-hifz.jpg         # Rafeequl Hifz V2 screenshot (1280×800)
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

## Hero photo

The hero uses `assets/images/yunus-zakari-abdulhameed.jpg` (600×700, ~60 KB),
generated from the original `professional display picture.png` (1254×1254, ~1.9 MB)
by cropping it to the 6:7 frame the CSS uses.

To swap in a different photo:

1. Export the new photo at roughly **600×700** (or any 6:7 crop), as JPG or WebP.
2. Replace `assets/images/yunus-zakari-abdulhameed.jpg`.
3. Update the hero `<img>` `src`, `alt`, `width` and `height` in `index.html` if the
   filename or dimensions change.

The original PNG is kept only as a source file — it is not referenced by the page and
can be deleted once you no longer need it.

## Project screenshots

Each project card in `index.html` uses a real capture at **1280×800** (the CSS frame is
16:10). To refresh one:

1. Open the live site and capture the visible area at a 1280×800 viewport.
   (Lisanun Mubeen and Rafeequl Hifz sit behind an InfinityFree JavaScript challenge —
   a real browser clears it automatically; a plain HTTP fetch does not.)
2. Save over the matching file in `assets/images/` and keep `loading="lazy"`, the
   `width`/`height` attributes and descriptive `alt` text.

Descriptions and tech tags live in `.project-desc` and `.tag-list` — only list
technologies that can be pointed to in the source repository.

## Download CV button

A ready-to-use CV button is already written into the hero of `index.html`, but it is
**commented out** so the page never links to a file that does not exist. To enable it:

1. Add your CV as `assets/Yunus_Zakari_Abdulhameed_CV.pdf`.
2. In `index.html`, uncomment this line inside `.hero-actions`:

   ```html
   <a class="btn btn-ghost" href="assets/Yunus_Zakari_Abdulhameed_CV.pdf" download>Download CV</a>
   ```

## SEO

`index.html` includes a canonical URL, Open Graph tags (`og:title`, `og:description`,
`og:url`, `og:image`) and Twitter card tags. If you move the site to a custom domain,
update the four absolute URLs in the `<head>` (canonical, `og:url`, `og:image`).

## Deploy to GitHub Pages

1. Push this folder to the GitHub repository.
2. Open the repository on GitHub → **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
4. Save. The site appears at `https://<your-username>.github.io/<repo>/` in a minute or two.

> The site uses only relative paths, so it works from a sub-path without configuration.

## Accessibility & motion

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus states.
- Mobile menu: `aria-expanded`, closes on `Escape`, on link click, and on outside click.
- Reveal animations use `IntersectionObserver` and are disabled automatically when the
  OS reports `prefers-reduced-motion: reduce`.
- With JavaScript disabled the page is fully readable — all content is visible by default.

## Verified facts and remaining items

**Verified**

- Contact details: email, WhatsApp (`+234 916 886 2025`) and GitHub are the real accounts.
- Open-source contributions: the four pull requests listed in the Experience section
  (QuickLendX #2792, CredenceOrg/Credence-Backend #1486, DelegoLabs/Delego-backend #409,
  bridgelet #744 & #743) are merged, confirmed via the GitHub API.
- Live links: the portfolio and all three project demos return HTTP 200.

**To confirm / update**

- **Lisanun Mubeen Academy** — the description is based on the public repository; confirm
  which features are live before publishing.
- **CV** — add `assets/Yunus_Zakari_Abdulhameed_CV.pdf` and uncomment the hero button.
- **Screenshots** — captured from the live sites; re-capture if the designs change.
