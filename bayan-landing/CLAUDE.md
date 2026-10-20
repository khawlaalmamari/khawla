# Bayan landing page (bayan.edu.om redesign)

A redesign of the public landing page for **bayan.edu.om**. Bayan AI Technologies is an
Omani startup building AI-powered medical education platforms for students. This page is
the front door: it explains what Bayan does and sends students and institutions to the
right next step (sign up, request a demo, contact).

This folder is a **standalone static site**, separate from the Next.js app at the
repo root. The root `AGENTS.md` Next.js guidance does **not** apply here: no React, no
Next.js, no build framework beyond Tailwind. Don't import anything from `../app`,
`../components` or `../lib`.

## Stack

- Plain, hand-written **HTML5**: one file per language, semantic markup, no templating.
- **Tailwind CSS v4** through the standalone CLI (`@tailwindcss/cli`). Configuration is
  CSS-first (`@import "tailwindcss";` plus `@theme` in `src/input.css`); there is no
  `tailwind.config.js` in v4. Don't use the Play CDN (`cdn.tailwindcss.com`) outside
  throwaway prototypes.
- JavaScript only where HTML/CSS can't do it (mobile menu toggle, language switch
  persistence). Vanilla JS in one small deferred file, no frameworks, no jQuery. The
  page must stay readable and navigable with JS disabled.

## Layout

```
bayan-landing/
  index.html          Arabic (default): <html lang="ar" dir="rtl">
  en/index.html       English:          <html lang="en" dir="ltr">
  src/input.css       Tailwind entry: @import, @theme tokens, @font-face, base layer
  dist/styles.css     Built output. Generated, never edit by hand
  assets/img/         Optimised images (AVIF/WebP + fallback), SVG icons
  assets/fonts/       Self-hosted WOFF2 fonts
  assets/js/main.js   The only script
```

## Commands

```bash
npm install                      # tailwindcss + @tailwindcss/cli
npx @tailwindcss/cli -i src/input.css -o dist/styles.css --watch   # dev
npx @tailwindcss/cli -i src/input.css -o dist/styles.css --minify  # production
npx serve .                      # preview at http://localhost:3000
```

Add these as `dev`, `build` and `preview` scripts in `package.json` when scaffolding.

## Bilingual content (Arabic / English)

- **Arabic is the default and primary language.** Write Arabic copy as Arabic, not as a
  word-for-word translation of English. Use Modern Standard Arabic with an Omani,
  professional tone.
- The two language files must stay **structurally identical**: same sections, same
  order, same `id`s, same CTAs. Any change to one file goes into the other file in the
  same commit. If you don't have an approved translation, write `<!-- TODO(ar): … -->`
  rather than leaving English text on the Arabic page or making up copy.
- Each page sets `lang` and `dir` on `<html>`. A span of the other language inside a
  page gets its own `lang` (and `dir` if needed), e.g. `<span lang="en" dir="ltr">AI</span>`.
- Language switcher: a real link (`<a href="/en/" hreflang="en" lang="en">English</a>` on
  the Arabic page, and the equivalent `hreflang="ar" lang="ar"` link with the Arabic word
  for "Arabic" on the English page). Write each label in its own language, never a flag. It takes the visitor to the same section on the other page.
- In `<head>`, add `<link rel="alternate" hreflang="ar|en|x-default">`, a per-language
  `<title>` and meta description, and Open Graph tags with `og:locale` set to `ar_OM` or
  `en_US`.
- Numerals: use Western digits (0-9) on both pages unless the brand team says otherwise.
  Wrap phone numbers, emails and URLs in `dir="ltr"` so they don't reorder in RTL.

## RTL rules

The Arabic page must look designed, not mirrored as an afterthought. Every component is
built once and has to work in both directions.

- **Use logical utilities only:** `ms-/me-`, `ps-/pe-`, `start-/end-`, `text-start/end`,
  `border-s/e`, `rounded-s/e`, `scroll-ms`… Never use `ml-/mr-/pl-/pr-/left-/right-/
  text-left/text-right` for layout. Flex and grid follow `dir` on their own, so don't use
  `flex-row-reverse` to "fix" RTL.
- Use `rtl:` / `ltr:` variants only where you actually need a different result, mostly
  for flipping directional icons: `rtl:-scale-x-100` on arrows and chevrons.
- **Do not mirror:** logos, photos, media play controls, checkmarks, clocks, charts'
  numeric axes, or brand marks.
- Typography: Arabic needs more line-height (`leading-relaxed` or more for body text),
  no letter-spacing (`tracking-*` breaks joined letters), and never `uppercase` or
  `italic` on Arabic text. Increase Arabic font size slightly if it looks small next to
  Latin text.
- Fonts: **Tajawal** (Arabic + Latin, matching the existing E-nursing app), self-hosted
  as WOFF2 subsets with `font-display: swap`. Set it on `:lang(ar)` and `:lang(en)` in
  `src/input.css` so mixed-language spans render correctly.
- Test every change in both `dir="rtl"` and `dir="ltr"` before calling it done.

## Mobile-first

- Write unprefixed classes for the smallest screen (360px), then add `sm:`, `md:`, `lg:`
  for larger screens. Never design desktop first and squeeze it down.
- Check at 360, 390, 768, 1024 and 1440px wide. There must be no horizontal scroll at
  any width and no text clipped in either language (Arabic and English line lengths
  differ).
- Tap targets are at least 44×44px. The primary CTA is visible without scrolling on a
  390px phone.
- Navigation collapses into a disclosure menu below `md`. It uses a `<button>` with
  `aria-expanded`/`aria-controls`, closes on Escape, and returns focus to the toggle.

## Accessibility (target: WCAG 2.2 AA)

- Landmarks: one `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`. Headings
  go in order with one `<h1>` per page. Put a "skip to content" link first in the
  `<body>`, translated on each page.
- Contrast is at least 4.5:1 for body text and 3:1 for large text, icons and focus rings.
  Check the teal/amber tokens against both white and dark backgrounds; don't put amber
  text on white.
- Every interactive element shows a visible `focus-visible:` ring. Never write
  `outline-none` without a replacement.
- Images: meaningful images get `alt` text in the page's language, decorative images get
  `alt=""`, and icon-only buttons get an `aria-label` in the page's language.
- Forms (demo request, newsletter): every field has a visible `<label>`, errors are
  linked with `aria-describedby`, and inputs use the right `type`, `autocomplete` and
  `inputmode`.
- Respect `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:`). No autoplaying
  video or carousels that auto-advance.
- Use real elements: `<a>` to navigate, `<button>` for actions. No clickable `<div>`s.

## Brand and design tokens

Define the tokens once in `@theme` and use them only through Tailwind classes. No
hard-coded hex colours in the HTML.

- Primary: clinical teal (`#0d9488` = 600, `#0f766e` = 700, `#134e4a` = 900).
- Accent: amber (`#f59e0b` = 500, `#d97706` = 600). Use it for highlights and CTAs on
  dark backgrounds only.
- Neutrals: the slate scale. These match `../app/globals.css`, so the landing page and
  the product feel like one brand. If Bayan's official brand guide differs, the brand
  guide wins: update `@theme` and this section.
- Support dark mode via `prefers-color-scheme`, with semantic tokens (`background`,
  `foreground`, `surface`, `border`, `muted`) rather than raw scale colours.

## Content rules (medical education)

- Don't invent facts: no made-up statistics, partner universities, accreditations,
  testimonials, student counts or awards. Use clearly marked placeholders
  (`<!-- TODO(content): … -->`) until the Bayan team provides real ones.
- Don't make medical or outcome claims ("guarantees exam success", "replaces clinical
  training"). Describe AI features as study aids that support educators, not replace
  them.
- Mention student data privacy in plain language and link the privacy policy from the
  footer on both pages.

## Performance

- Budget: total page weight under 500 KB on first load, LCP under 2.5s on a mid-range
  phone over 4G.
- Give images explicit `width`/`height`, `loading="lazy"` below the fold,
  `fetchpriority="high"` on the hero image, and responsive `srcset`.
- Preload only the main font weight. Third-party scripts (analytics, chat) are deferred
  and need approval first.

## Before you call a change done

1. `npm run build` succeeds and `dist/styles.css` is up to date.
2. Both `index.html` and `en/index.html` were updated, and they still match section for
   section.
3. Both pages checked at 360px and 1440px: no overflow, nothing mirrored that shouldn't
   be.
4. You can reach and use everything with the keyboard alone, with a visible focus ring
   on each element.
5. Lighthouse Accessibility ≥ 95 and the W3C HTML validator reports no errors, on both
   pages.
