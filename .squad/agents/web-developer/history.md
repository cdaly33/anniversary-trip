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
