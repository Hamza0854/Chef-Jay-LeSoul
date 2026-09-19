# Image Manifest — Chef Jay LeSoul Catering

Every image in this site currently points to a **placehold.co** CDN placeholder
(so the site looks complete and on-brand right now) instead of a local file.
When you're ready to drop in your real photos, do the following for each row:

1. Save your photo into `assets/images/` using the **suggested filename** below.
2. In the matching HTML file, replace the placeholder `src="https://placehold.co/..."`
   with `src="assets/images/<filename>"`.
3. Keep the `alt` text as-is (or refine it) — it's already written for SEO.

| Used on          | Suggested filename                | Recommended size | Placeholder shows |
|-------------------|-----------------------------------|-------------------|--------------------|
| index.html (hero) | hero-plating.jpg                  | 1920×1080         | Chef plating a dish |
| index.html (hero) | hero-private-dinner.jpg           | 1920×1080         | Private dinner table |
| index.html (hero) | hero-seasoning-pour.jpg           | 1920×1080         | Seasoning being poured |
| index.html        | chef-jay-kitchen.jpg               | 900×1100          | Chef Jay in the kitchen |
| index.html        | black-crack-bottle.jpg             | 520×640           | Seasoning bottle |
| index.html        | gallery-plating.jpg                | 700×900           | Signature plating |
| index.html        | gallery-private-dinner.jpg         | 700×440           | Private dinner guests |
| index.html        | gallery-culinary-action.jpg        | 900×440           | Chef searing a steak |
| index.html        | gallery-seasoning.jpg              | 700×440           | Seasoning close-up |
| index.html        | gallery-service.jpg                | 700×440           | Chef greeting guests |
| catering.html      | catering-hero.jpg                  | 1920×900          | Event table setting |
| catering.html      | private-dining-table.jpg           | 900×1100          | Private dining table |
| shop.html          | shop-hero.jpg                      | 1920×900          | Seasoning poured over dish |
| shop.html          | black-crack-bottle-large.jpg       | 560×700            | Seasoning bottle, large |
| shop.html          | recipe-steak.jpg                   | 700×525            | Seared steak |
| shop.html          | recipe-chicken.jpg                 | 700×525            | Roasted chicken |
| shop.html          | recipe-vegetables.jpg              | 700×525            | Roasted vegetables |
| order.html         | order-hero.jpg                     | 1920×900            | Book Chef Jay banner |
| all pages          | og-cover.jpg                       | 1200×630            | Social share preview image |

## Logo & favicon
The logo and favicon are hand-drawn inline SVG (a gold flame), so they need **no
image file** and will always render crisply at any size. If you'd rather use
your real logo artwork, save it as `assets/images/logo.svg` (or `.png`) and
swap the `<svg>` block in the `.brand` link across all four HTML files for
`<img src="assets/images/logo.svg" alt="Chef Jay LeSoul Catering logo" width="30" height="30">`.

## Social icons
Facebook / Instagram / TikTok / YouTube icons in the footer are also inline
SVG — no files needed, and they inherit the gold hover color automatically.
