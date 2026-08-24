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

📌 Team update (2026-08-23T13:12:59.719-05:00): The dependency-light Azure SWA site under `site\` now presents all seven concepts, three detailed itinerary navigators, corrected Leaflet/OSM maps, local review controls, copy/download summaries, accessibility fallbacks, SWA configuration, and deployment guidance; final validation passed — decided by Web Developer, Visual Designer, Fact Checker, and Rai

📌 Team update (2026-08-23T16:56:46.384-05:00): The static site is deployed through `.github\workflows\azure-static-web-apps.yml` to Azure SWA `anniversary-trip-review-cdaly33`; commit `f855413f9afd84f4f80dc8551f4ecf77e777ccd9`, Actions run `32669165471`, and the production URL were independently verified successful — decided by Web Developer

📌 Team update (2026-08-23T16:56:46.384-05:00): Corrective commit `8a4c312aaaa2451e2c1b2d4cfdaee1ac13f46fa0` fixed Lake Como to `[45.9870, 9.2572]` and explicitly located Derinkuyu, introduced shared verified coordinates/tolerances plus `site\validate-coordinates.js`, and made coordinate validation a pre-deployment CI gate; deployment run `32669719665` passed — decided by Web Developer and Fact Checker

📌 Team update (2026-08-23T19:00:01.589-05:00): Production commit `7b7e809c6bfe1c44e56c8ed2b5f08d8f18baed7e` implements four retained trips, 51 itinerary entries, STL flights, cost bands, 8 attributed images, 116 day links, and 20-marker/17-segment maps; independent remediation and final deployment run `32680227700` passed — decided by Web Developer, Visual Designer, and Fact Checker

📌 Team update (2026-08-24T17:04:52.553-05:00): Design revision pass shipped uncommitted — masthead shortened ~40-45% (h1 clamp now 2.4-4.2rem), dropdown concept nav (`concept-trigger`) applies at all widths with the 1099px breakpoint deleted, all Rachel feedback UI and `review-storage.js`/localStorage persistence removed (`validate-content.js` migration test dropped, fixture+hash retained), and the map/description split is now 50/50 with a keyboard-accessible Expand map mode (70/30, Escape to exit, `invalidateSize` + re-fit). Both validators and a headless-Chrome render smoke test passed — decided by Web Developer, requested by @cdaly33

📌 Team update (2026-08-24T17:04:52.553-05:00): Applied Logistics' flight-reality corrections to `site\trip-data.js` (uncommitted) — Portugal now names STL–ORD–LIS (TAP) as the cleanest one-stop and drops stale PHL; Spain detail reframed around real US gateways plus seasonal STL–FRA/STL–LHR one-stops; Italy–Croatia gains the VCE-only-one-stop return hierarchy; NZ–Australia return upgraded to "one to two connections" with Qantas SYD–DFW–STL named. Schema unchanged; `approved-content-fixture.json` hash updated for the two Portugal daysPlan wording edits; both validators passed. Logistics' 5 date-sensitive flags left for Fact Checker — merged into `.squad/decisions.md` with open follow-up for coordinator handoff to Fact Checker. — decided by Web Developer, per Logistics spec, requested by @cdaly33
