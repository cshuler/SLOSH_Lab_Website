# October 2026 Hiring | SLOSH Lab and Hawaiʻi Mesonet

This directory is **self-contained** and built for the existing Eleventy repository passthrough-copy of `images/`.

## Install

In the repository, place this entire folder at:

`images/subpages/Oct_2026_Hiring/`

Do **not** place `Oct_2026_Hiring/` at the repository root. You do not need to edit Eleventy or site CSS.

Live destination (after GitHub Pages finishes rebuilding):

https://cshuler.github.io/SLOSH_Lab_Website/images/subpages/Oct_2026_Hiring/

Entry point: `index.html` (the compact version supplied by the user, with only nested-URL corrections and an adjusted crop for the helmet photo).

## Pages

- `index.html` — overview, all three opportunities
- `oahu-technician/index.html` — full-time Hawaiʻi Mesonet field technician
- `maui-postdoc/index.html` — Maui-based 50/50 postdoc
- `phd-student/index.html` — water sensing, AI and reservoir PhD

Each page has an accessible PDF position brief (under `assets/descriptions/`), and editable Word originals are also included.

## Swap photos

Images live under `assets/photos/`. Edit an `<img src="../assets/photos/filename.webp">` on the individual job pages, or `src="assets/photos/..."` on the homepage. `.jpg`, `.jpeg`, `.png` and `.webp` are all supported. If a portrait looks overly zoomed, change `object-position` or switch `object-fit` to `contain`.

The site includes these **additional photo/visual options**:
- `File_051.jpeg` — original helmet selfie supplied by the team; used on homepage
- `hawaiian-islands-satellite.jpg` — *exact* Hawaiian Islands image recovered from the uploaded PhD PowerPoint; used as the top PhD image
- `rainfall-stream-stage-timeseries.png` — actual time-series graphic from the uploaded PhD flyer
- `hydrologic-monitoring-map.webp` — actual sensor-map graphic from the uploaded PhD flyer
- `hydrology-data-analytics.webp` — formatted from the *actual* uploaded time-series graphic for the Maui research-side image
- All ten field photographs from the earlier recruitment site remain available.

The analytical graphic is a photo/visual for the research theme, **not a claim of a specific newly developed algorithm or AI output**.

### Additional online references (not bundled; check usage before reuse)

- UH News Mesonet dashboard (2025): https://www.hawaii.edu/news/2025/05/07/hawaii-mesonet-dashboard-launch/
- HCDP data visualization tutorial (actual station plots): https://www.hawaii.edu/climate-data-portal/visualize-data-tutorial-explore-station-data/
- UH News Hurricane Lowell tracker: https://www.hawaii.edu/news/2026/09/09/hurricane-lowell-tracker-website/

The final bundle uses user-supplied original assets instead of hotlinking or embedding unlicensed third-party media.

## Important links

- Main SLOSH Lab website links now point to `https://cshuler.github.io/SLOSH_Lab_Website/` from any depth.
- Canonical and Open Graph URLs and the homepage "Forward by email" link all target the new `Oct_2026_Hiring/` location.
- Tom contact email everywhere in *this package*: `thomas@hawaii.edu`, no phone number. The Oʻahu one-page PDF and Word original are updated too.
- The RCUH link points to its job listings portal; do not assume the draft position is formally posted until verified.

## Flyers

`assets/flyers/` is a placeholder for your final approved PDFs. Current flyer drafts were intentionally **not included**, because you're still working on their designs. When ready, copy them into the folder and add links on individual pages.

## Publishing note

If you previously deployed older files at `images/subpages/`, those will continue to exist until removed. Publish this new URL in the flyers and outreach email. Existing static sites under `images/subpages/` will not automatically redirect.
