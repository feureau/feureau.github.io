# feureau.github.io

Personal website for Feureau, served by GitHub Pages at
<https://feureau.github.io>.

Hand-written HTML, one stylesheet, one small script. **No build step, no
dependencies, no CI**: what is committed is what the browser receives. Files are
stored with LF endings; [.gitattributes](.gitattributes) (`* text=auto`)
normalises line endings on commit.

## Layout

```
index.html                  Home
about/index.html            About and experience
projects/index.html         Project cards
blog/index.html             Post list with a tag filter
blog/<slug>/index.html      One folder per post
demos/index.html            Demo cards
demos/<name>/index.html     One folder per self-contained demo
links/index.html            Link list (link-in-bio)
404.html                    Custom not-found page
assets/css/style.css        All styling, token-driven
assets/js/site.js           Optional enhancements only
assets/img/favicon.svg      Site icon
robots.txt, sitemap.xml     Search-engine files
```

## Previewing locally

Open `index.html` in a browser &mdash; every internal link is relative, so the
site works straight from disk, with no server.

Nothing here needs a web server, but one is useful if you add a demo that
fetches local files:

```
python -m http.server 8000
```

then visit <http://localhost:8000/>.

## Adding a blog post

1. Copy a post folder, for example `blog/hello-world/` to `blog/my-new-post/`.
2. In the new `index.html`, change the `<title>`, the `description`, the
   `canonical` URL, the `og:` tags, the `<h1>`, the date and the body.
3. Add one `<li class="post-item" data-tags="tag-one tag-two">` block to
   `blog/index.html`, matching the existing ones.
4. Add an entry to `sitemap.xml`.
5. If it is the newest post, update the "Latest writing" list in `index.html`.

Tags are free-form: any word used in `data-tags` can be offered as a filter
button in the `data-tag-filter` block of `blog/index.html`. The filter needs
JavaScript; without it the full list is still shown.

## Adding a project

Add one `<article class="card">` block to `projects/index.html`, and optionally
a copy of it to the "Featured projects" grid in `index.html` (keep that grid to
three cards).

The card title carries a `<a class="card-link" href="…">` pointing at the
card's primary destination &mdash; usually the live demo. That link is stretched
over the whole card with CSS, so clicking anywhere on the card follows it,
without nesting anchors. Put secondary links (source, details) in the
`.card-foot` block, which stays clickable above the stretched link.

## Adding a demo

1. Copy `demos/hello-canvas/` to `demos/my-demo/`.
2. Edit the `<head>`, the heading and the script. Keep the resize handling and
   the `visibilitychange` pause.
3. Add a card to `demos/index.html` (title wrapped in the same `card-link`
   anchor, pointing at the demo) and a URL to `sitemap.xml`.

House rules for demos: no dependencies, no network requests, keyboard
accessible, and animation that respects `prefers-reduced-motion`.

## Adding a link

The `links/` page is a plain stack of rows, and no script is involved.

1. Copy one `<li>` block from `links/index.html`, including its `<svg>` icon.
2. Edit three things: the `href` on the `.link-row`, the `.link-label` text and
   the one-line `.link-note`. Keep notes short so every row stays the same height.
3. Delete rows you do not need rather than leaving placeholder URLs behind.

The icons are generic hand-drawn outlines (code brackets, envelope, at-sign,
briefcase, play, globe) rather than brand logos, so there is nothing to fetch and
nothing to keep in sync. Reuse an existing icon for a similar link, or drop in
your own 24&times;24 `<svg>` using `stroke="currentColor"` so it follows the theme.

## Placeholders to replace

Everything still to fill in is marked as `[Square Brackets]` in visible text, or
as an HTML comment beginning `TODO`. Search for `[`, `example.com` and `TODO`:

| Placeholder | Where |
| --- | --- |
| The brand letter `F` (`.brand-mark` in every header, and `favicon.svg`) | a literal, not bracketed: change it by hand if your initial is not F |
| `[One-line tagline...]`, bio and "What I do" paragraphs | `index.html`, `about/index.html` |
| `[Social]` / `[your-handle]` links | `index.html`, `about/` |
| `[Role Title]`, `[Previous Role Title]`, `[Earlier Role Title]`, `[Organisation]` | `about/` |
| `[One-line bio…]`, `[your-handle]`, `[your-channel]`, `[your-handle@instance]` | `links/index.html` |
| `[Your next demo]` card and its `[Tag]` pills | `demos/index.html` |
| `Person` structured data (`name`, `jobTitle`, `sameAs`) | end of `index.html`'s `<head>` |

A quick way to rename the site across the pages (PowerShell, from this folder).
The encoding flags matter: the pages are UTF-8 and contain em dashes, and
Windows PowerShell 5.1 would otherwise read and write them as ANSI. The snippet
covers `*.html` only, so it leaves `README.md` and the brand letter `F` alone —
change those two by hand.

```powershell
Get-ChildItem -Recurse -Filter *.html | ForEach-Object {
  (Get-Content $_.FullName -Raw -Encoding UTF8) -replace '\[Your Name\]', 'Real Name' |
    Set-Content $_.FullName -NoNewline -Encoding UTF8
}
```

## Design notes

- Re-theme the whole site from the tokens at the top of `assets/css/style.css`.
  The site ships a single dark palette; to follow the operating system instead,
  move that block under `@media (prefers-color-scheme: dark)` and add a light set
  under `@media (prefers-color-scheme: light)`. The `theme-color` meta tag in each
  `<head>` matches the dark background (`#0f1115`).
- Internal links are relative and point at explicit `index.html` files, so the
  site also works over `file://`.
- `404.html` is the one exception: GitHub Pages serves it for a missing path
  while the browser keeps the requested URL, so its links are root-absolute
  (`/about/`) and it has no `file://` preview.
- Navigation is duplicated in each page rather than injected by a script, so it
  survives JavaScript being disabled or failing.
- `assets/js/site.js` is a classic script, not a module, and only adds: the
  footer year, the blog tag filter and closing the mobile menu after a link tap.

## Still to add later

- `assets/img/og.png` (1200&times;630) plus this line in each `<head>`:
  `<meta property="og:image" content="https://feureau.github.io/assets/img/og.png">`
  for richer link previews.

## Deploying

Committing to `master` publishes the site; GitHub Pages rebuilds it
automatically. `.nojekyll` keeps Jekyll out of the way so the files are served
exactly as written.

```
git add -A
git commit -m "Update site"
git push origin master
```

## Licence

The repository's [LICENSE](LICENSE) is the GNU GPL v3. Site text and images are
the author's own unless stated otherwise.
