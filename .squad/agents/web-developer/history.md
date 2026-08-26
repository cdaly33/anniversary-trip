# Project Context

- **Requester:** @cdaly33
- **Project:** Rachel and Chris's 30th anniversary trip in 2027
- **Planning medium:** Local-backend Squad repository with an interactive static HTML review experience
- **Web platform:** Azure Static Web Apps using accessible HTML, CSS, JavaScript, and a map for each destination
- **Created:** 2026-08-23T13:12:59.719-05:00

## Seeded Context

- Build an interactive HTML review experience that lets Rachel and Chris compare the anniversary-trip destinations and inspect a map for each destination.
- The retained planning directions are Northern Italy + Croatia and Portugal; New Zealand + Australia was structurally rejected in the completed council review.
- Trip guardrails remain 10–12 days, up to 14 when justified; 2 bases preferred and 3 maximum; 1–2 meaningful experiences daily; safe, comfortable, good-value travel over luxury.
- The implementation must be accessible, responsive, performant, compatible with Azure Static Web Apps, and validated across relevant browsers.
- Map failures, disabled JavaScript, reduced-motion preferences, touch input, keyboard input, and narrow screens need intentional behavior.

## Learnings

Initial frontend implementation and deployment context established for the anniversary-trip web experience.

- Day-entry schema now includes optional `transit` (rendered as a "Getting there" row) and `image` (`{ url, alt, credit, width, height }` Commons thumbnail, rendered as a lazy 150px figure with a "Photo: …" caption); `validate-content.js` enforces the uniform key set, so any new day field must be added to `expectedDayKeys` and the fixture hash regenerated (`sha256` of `id + daysPlan` JSON). Day images came from Scout's `day-images.json` handoff keyed by conceptId + zero-based daysPlan index; the file was deleted after merging.
- `site\trip-data.js` has CRLF line endings — line-oriented codemods must preserve `\r` or regexes with `$` silently miss.
- The site's CSP lives only in `staticwebapp.config.json` globalHeaders (no meta tag); any new external asset origin must be added there. Verify by replaying globalHeaders from a local Node server under headless Chrome — note the harness page itself is bound by the same CSP (inline scripts blocked; use external files) and `frame-ancestors 'none'` blocks iframe-based harnesses, so relax only that directive in the test server.
- Descendant selector bleed bit us: `.itinerary-list li` styled nested planning-link items with day-entry borders. Use child combinators (`.itinerary-list>li`) for list-row rules that wrap rich nested content.
- Pin-for-comparison and all day expand/collapse toggles were removed at user request — the itinerary is always expanded; day titles are plain buttons that sync map focus with `aria-current` on the active day.
- Headless-Chrome smoke checks work well via a temporary iframe harness page + `--headless=new --dump-dom --virtual-time-budget=30000`, asserting expanded-entry visibility and control removal per concept.

📌 Team update (2026-08-23T13:12:59.719-05:00): The dependency-light Azure SWA site under `site\` now presents all seven concepts, three detailed itinerary navigators, corrected Leaflet/OSM maps, local review controls, copy/download summaries, accessibility fallbacks, SWA configuration, and deployment guidance; final validation passed — decided by Web Developer, Visual Designer, Fact Checker, and Rai

📌 Team update (2026-08-23T16:56:46.384-05:00): The static site is deployed through `.github\workflows\azure-static-web-apps.yml` to Azure SWA `anniversary-trip-review-cdaly33`; commit `f855413f9afd84f4f80dc8551f4ecf77e777ccd9`, Actions run `32669165471`, and the production URL were independently verified successful — decided by Web Developer

📌 Team update (2026-08-23T16:56:46.384-05:00): Corrective commit `8a4c312aaaa2451e2c1b2d4cfdaee1ac13f46fa0` fixed Lake Como to `[45.9870, 9.2572]` and explicitly located Derinkuyu, introduced shared verified coordinates/tolerances plus `site\validate-coordinates.js`, and made coordinate validation a pre-deployment CI gate; deployment run `32669719665` passed — decided by Web Developer and Fact Checker

📌 Team update (2026-08-23T19:00:01.589-05:00): Production commit `7b7e809c6bfe1c44e56c8ed2b5f08d8f18baed7e` implements four retained trips, 51 itinerary entries, STL flights, cost bands, 8 attributed images, 116 day links, and 20-marker/17-segment maps; independent remediation and final deployment run `32680227700` passed — decided by Web Developer, Visual Designer, and Fact Checker

📌 Team update (2026-08-24T17:04:52.553-05:00): Design revision pass shipped uncommitted — masthead shortened ~40-45% (h1 clamp now 2.4-4.2rem), dropdown concept nav (`concept-trigger`) applies at all widths with the 1099px breakpoint deleted, all Rachel feedback UI and `review-storage.js`/localStorage persistence removed (`validate-content.js` migration test dropped, fixture+hash retained), and the map/description split is now 50/50 with a keyboard-accessible Expand map mode (70/30, Escape to exit, `invalidateSize` + re-fit). Both validators and a headless-Chrome render smoke test passed — decided by Web Developer, requested by @cdaly33

📌 Team update (2026-08-24T17:04:52.553-05:00): Applied Logistics' flight-reality corrections to `site\trip-data.js` (uncommitted) — Portugal now names STL–ORD–LIS (TAP) as the cleanest one-stop and drops stale PHL; Spain detail reframed around real US gateways plus seasonal STL–FRA/STL–LHR one-stops; Italy–Croatia gains the VCE-only-one-stop return hierarchy; NZ–Australia return upgraded to "one to two connections" with Qantas SYD–DFW–STL named. Schema unchanged; `approved-content-fixture.json` hash updated for the two Portugal daysPlan wording edits; both validators passed. Logistics' 5 date-sensitive flags left for Fact Checker — merged into `.squad/decisions.md` with open follow-up for coordinator handoff to Fact Checker. — decided by Web Developer, per Logistics spec, requested by @cdaly33

📌 Team update (2026-08-24T18:05:09.064-05:00): Detail polish pass shipped uncommitted — removed day-detail toggles (entries now always-expanded), removed pin-for-comparison entirely (button, compare panel, compare styling), added transit specification ("Getting there" rows on 20 entries with flight routings/transfers per Logistics spec), integrated 29 Commons thumbnails from Scout (150px lazy figures with CC attribution), extended validate-content.js to enforce uniform key set including image objects and added 131 unique production URLs, regenerated fixture. Validators, coordinate check, and headless-Chrome smoke render all passed. Fact Checker to verify transit durations vs 2027 timetables. — decided by Web Developer, requested by @cdaly33

📌 Team update (2026-08-24T19:55:38.791-05:00): Bugfix pass shipped uncommitted — added `https://upload.wikimedia.org` to `img-src` CSP in `staticwebapp.config.json` to unblock 29 Commons thumbnail loads; fixed `.itinerary-list li` descendant-selector bleed onto nested `.day-links li` by converting to child-combinator form `.itinerary-list>li`. Production-equivalent CSP smoke test: 29/29 thumbnails load, 0/116 link rules. Decision merged into `.squad/decisions.md`. — decided by Web Developer, requested by @cdaly33

📌 Team update (2026-08-25T20:42:01.924-05:00): Italy + Slovenia replaced Croatia as the live-site lead concept; default selection, gallery framing, and itinerary copy now center Lake Como → Dolomites → Lake Bled with rail-first transfers and an optional non-swim Piran day — decided by Web Developer, Visual Designer, and @cdaly33

📌 Team update (2026-08-25T21:58:42.851-05:00): Lake Bled Commons hero image replaced the temporary duplicate Canaletto placeholder for the Italy + Slovenia concept; validators passed and attribution stayed aligned with the site's Commons convention. — decided by Web Developer
