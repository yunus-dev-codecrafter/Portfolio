# Yunus Abdulhameed Zakari — Developer Portfolio

A single-page developer portfolio built with **HTML5, CSS3 and vanilla JavaScript only**.
No frameworks, no build step, no dependencies — it runs as a static website and deploys
directly to GitHub Pages.

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
│   │   ├── professional display picture.png  # Your photo (used in the hero)
│   │   ├── profile-photo.svg                # Original placeholder (spare)
│   │   ├── project-fikra-todo.svg           # Screenshot placeholder
│   │   ├── project-lisanun-mubeen.svg       # Screenshot placeholder
│   │   └── project-rafeequl-hifz.svg        # Screenshot placeholder
│   └── icons/
│       └── favicon.svg                       # Text-based favicon (initials)
├── portfolio.txt           # Original project brief
└── README.md
```

## Run it locally

Any static server works. From the project folder:

```powershell
# Option 1 — VS Code
# Install the "Live Server" extension, then right-click index.html → "Open with Live Server"

# Option 2 — Python
python -m http.server 8000
# then open http://localhost:8000

# Option 3 — just open the file
# Double-click index.html (everything is relative, so it works from the filesystem too)
```

## Your photo

`assets/images/professional display picture.png` is already wired into the hero
(1254×1254, displayed inside a 6:7 frame with `object-fit: cover`).

Two optional improvements:

1. **Rename** it to something without spaces, e.g. `yunus-photo.png`, and update
   `src` in the hero `<img>` inside `index.html`.
2. **Optimize it** — the file is about 2 MB. Exporting a ~600×700 WebP or JPG
   (typically 80–200 KB) makes the page load much faster on mobile.
   Then update the `src` and set `width`/`height` to the new dimensions.

To swap in a different photo later, replace the file and update the hero `<img>`:

```html
<img
  class="photo"
  src="assets/images/your-photo.jpg"
  alt="Yunus Abdulhameed Zakari"
  width="480"
  height="560">
```

`assets/images/profile-photo.svg` is the original placeholder — delete it whenever
you no longer need it.

## Update project screenshots and descriptions

Each project card lives in `index.html` under `#projects`:

- **Screenshot** — replace `assets/images/project-*.svg` with a real capture
  (16:10 works best), or change the `src` to your new file. Keep `loading="lazy"`
  and write descriptive `alt` text.
- **Description / tech tags** — edit the text inside `.project-desc` and `.tag-list`.
  Only list technologies you can point to in the repository.
- **Links** — update the `href` on `.text-link` anchors. Remove the live-demo link
  if a project no longer has one.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (for example `portfolio`).
2. Open the repository on GitHub → **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
4. Save. The site appears at `https://<your-username>.github.io/<repo>/` in a minute or two.
5. To use a custom domain later, add a `CNAME` file and fill in the DNS settings on the same page.

> The site uses only relative paths, so it works from a sub-path without configuration.

## Accessibility & motion

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus states.
- Mobile menu: `aria-expanded`, closes on `Escape`, on link click, and on outside click.
- Reveal animations use `IntersectionObserver` and are disabled automatically when the
  OS reports `prefers-reduced-motion: reduce`.
- With JavaScript disabled the page is fully readable — all content is visible by default.

## Needs your verification

- **Photo** — in place; consider renaming and compressing it (see above).
- **Project screenshots** — still tasteful placeholders, not real captures.
- **Experience section** — the marked `[add your details here]` line for open-source
  contributions, freelance work or community involvement.
- **Lisanun Mubeen Academy** — description is based on the public repository; confirm
  which features are live before publishing.
