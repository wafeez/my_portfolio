# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, single-page personal portfolio site for Ts. Wan Muhammad Hafeez (Autonomous Driving Software Engineer). Plain HTML/CSS/JS — no build step, no package manager, no framework. Deployed to GitHub Pages directly from the repo root.

## Running locally

No build/install step. Open `index.html` directly in a browser, or serve the folder with any static file server (e.g. `npx serve .` or VS Code Live Server) so relative asset paths resolve correctly.

## Deployment

`.github/workflows/static.yml` deploys the entire repo as static content to GitHub Pages on every push to `main` (or manual `workflow_dispatch`). There is no build/compile step in CI — whatever is committed is what gets served, so `index.html` and asset paths must work as-is.

## Architecture

Everything lives in one page, `index.html`, divided into `<section>`s wired to a fixed nav (`.icon-bar` and the slide-out `.sidebar`) via anchor links/IDs: `#home`, `#about`, `#resume`, `#services`, `#skills`, `#portfolio`, `#contact`. To add/reorder content, add a section and matching nav links in both `.icon-bar` and `.sidebar .right-bar`.

Key behavior lives in `js/main.js` (jQuery-based), run after DOM ready:
- **Text/scroll animations**: GSAP + `SplitText` + `ScrollTrigger` (`js/gsap.min.js`, `js/split-text.min.js`, `js/scroll-trigger.min.js`). Elements with class `.text-anime` get split into lines and animated in; elements with `.fade-up-anime` fade/slide in on scroll. Adding either class to new markup wires it into the existing animation system automatically — no extra JS needed.
- **Accordion** (`.services-section`): plain jQuery slideToggle, one open at a time.
- **Lightbox** (`.portfolio` project images): Magnific Popup (`js/magnific.js`), triggered on elements with class `.lightbox` and `data-lightbox="pro"` (shared gallery group).
- **Mobile/slide-out sidebar**: GSAP timeline toggled by `.hamburger` click.
- **Active-nav-on-scroll**: scroll handler computes which `<section>` is in view and toggles `.active` on the matching `.icon-bar`/`.sidebar` link.
- **Carousel** (`.commentSlider`, currently unused in markup): Swiper (`js/swiper.js`), set up but no matching element exists in `index.html`.

Styling: Bootstrap grid (`css/bootstrap.min.css`) for layout, `css/main.css` for theme/component styles, `css/colors/*.css` are swappable accent-color palettes (only `purple.css` is currently linked in `index.html` — swap the `<link>` to try others). A `<svg>` filter (`#refractionFilter`) is defined inline in `index.html` for a frosted-glass/refraction effect used by `.glass-effect` elements.

Background hero video: `video/w_loop.mp4`, looped/muted/autoplay behind `<main>`.

Icons: RemixIcon icon font (`icon-fonts/remixicon/`), referenced via `<i class="ri-*">` classes.
