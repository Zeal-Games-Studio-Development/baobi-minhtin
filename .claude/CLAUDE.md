# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Minh Tín Plastics (MTP)** — a Vietnamese B2B packaging manufacturer (cartons, paper bags, PE film, COD boxes). Plain HTML/CSS/JS, no build system, no package manager, no backend.

Primary language of all user-facing copy is Vietnamese (`<html lang="vi">`).

## Architecture

The repo uses a **theme-shell pattern via iframe**:

- `index.html` (root) is a thin shell that renders a full-screen `<iframe>` pointing at a "style" subdirectory (`styles/blue/index.html`). It also provides a loading overlay that hides once the iframe `load` event fires.
- The actual site lives entirely under `styles/<theme>/`. Today only one theme exists: `styles/blue/`. The directory layout implies new themes (e.g. `styles/red/`) could be dropped in and the root `index.html` would just need its `iframe src` swapped.
- Inside `styles/blue/` the site is multi-page: `index.html`, `products.html`, `product-detail*.html` (one variant per product line: generic, `carton`, `cod`, `tui`), `news.html`, `contact.html`. All share `styles.css` and `script.js`.
- `script.js` is a single `DOMContentLoaded` handler containing self-contained widgets (hero slider with auto-rotate dots/arrows, etc.). Each widget guards on element existence so the same script can be included on every page.
- `assets/images/` is shared across themes and referenced from inside `styles/blue/*.html` via relative paths like `../../assets/images/...`.
- SEO surface: `robots.txt` and `sitemap.xml` live at the repo root and reference the root `index.html` (the iframe shell), not the inner pages.

### Implications when editing

- Visual/content changes belong in `styles/blue/`, not the root `index.html`.
- Because pages are loaded inside an iframe, any navigation links inside `styles/blue/*.html` stay within the iframe — top-level URL won't change. Don't add `target="_top"` unless the intent is to break out of the shell.
- Any new page added under `styles/blue/` must be reachable via in-iframe navigation; the outer `sitemap.xml` won't list it automatically.
- `script.js` assumes a single combined DOM — when adding a widget, follow the existing "query, null-check, attach" pattern so unrelated pages don't error.

## Development

There is no toolchain. To work on the site:

- **Preview locally:** serve the repo root over HTTP (e.g. `python -m http.server 8000`) and open `http://localhost:8000/`. Opening `index.html` via `file://` will work but the iframe + relative asset paths are more reliable over HTTP.
- **Edit a page:** modify the file in `styles/blue/` and refresh; no build step.
- **Lint/test:** none configured.

## Unrelated file

`QA_Report.md` is a Vietnamese QA report for a *different* project (an attendance/payroll system at `c:/UnityProject/app_cham_cong/`). It is not connected to this website's code and should be ignored when reasoning about this repository.
