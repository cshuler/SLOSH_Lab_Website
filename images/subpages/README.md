# SLOSH Lab recruiting microsite (GitHub Pages drop-in)

This folder contains a standalone, responsive website for THREE recruitment opportunities:
1. Oʻahu Hawaiʻi Mesonet Field Technician
2. Maui Postdoctoral Researcher (50% Mesonet / 50% research)
3. PhD Research Opportunity (remote sensing / hydrology / AI)

## Deploy: no website configuration changes needed

**Unzip, then upload the entire `subpages` folder into the existing `images` folder** in your repository:

`SLOSH_Lab_Website/images/subpages/`

The repository's existing `.eleventy.js` includes `eleventyConfig.addPassthroughCopy("images")`, which publishes all nested files as static assets. Once your normal GitHub Pages workflow finishes, the public address will be:

**https://cshuler.github.io/SLOSH_Lab_Website/images/subpages/**

Do not put the ZIP itself on GitHub expecting automatic extraction. Unzip locally first. Do not copy `subpages` into a second `subpages` folder.

## What's inside

- `index.html` — landing page for all three positions
- `oahu-technician/index.html` — Oʻahu technician duties, qualifications, salary context, and RCUH route
- `maui-postdoc/index.html` — 50/50 Maui postdoc duties, preferred skills, contact
- `phd-student/index.html` — PhD research directions, desired background, contact
- `assets/site.css` — shared mobile-responsive stylesheet
- `assets/photos/` — optimized WebP copies of field photographs supplied by your team
- `assets/descriptions/` — draft one-page descriptions in PDF plus Markdown reference copy
- `assets/flyers/` — destination for your final one-page recruitment flyers
- `assets/share-card.jpg` — email/social link preview image

Everything uses relative paths and requires no Node packages, database, third-party fonts, JavaScript frameworks, or external image hosting.

## Add the finished flyers

When final PDFs are ready, copy them into `assets/flyers/` as `oahu-technician.pdf`, `maui-postdoc.pdf`, and `phd-student.pdf`. Then add the download links described in `assets/flyers/README.txt` to each role page. **Unfinished flyer drafts are intentionally excluded.** The current pages already offer PDF downloads of the one-page position briefs.

## Things to update before sending your email blast

1. **Oʻahu technician:** Confirm the actual published RCUH position, closing date, and approved salary, then update `oahu-technician/index.html`. The current pay is marked *proposed* based on the October 20, 2026 HR draft. The generic RCUH jobs page is linked, not a made-up specific posting.
2. **Maui postdoc:** Confirm formal hiring requirements, term and compensation. Contact currently is `cshuler@hawaii.edu`.
3. **PhD:** Confirm graduate program/campus, funding support, application procedures, and timing. Contact currently is `cshuler@hawaii.edu`.
4. **Photographs:** Uploaded user-provided photos were reused for this draft. Confirm permission from identifiable people and photo owners before public distribution.
5. **Optional:** Add a link to the new subpage from the main SLOSH Lab navigation; not needed for direct email linking.

## Editing

You can edit `index.html` files directly in GitHub's pencil editor. All visible wording is ordinary HTML, not loaded from a service. Shared styling is in `assets/site.css`. After editing, commit the files and wait for the standard website build to publish.

## Local preview

Open `subpages/index.html` in a browser, or from the folder containing `subpages` run `python3 -m http.server 8000` and visit `http://localhost:8000/subpages/`.

This recruitment microsite is informational, and does not replace the official RCUH job posting or UH graduate admissions requirements.
