# Azure Static Web Apps deployment

Create an Azure Static Web App connected to this repository with:

- **App location:** `site`
- **API location:** leave blank
- **Output location:** leave blank
- **Build preset:** Custom / no framework

The site needs no build command. Azure serves `site/index.html` directly and reads
`site/staticwebapp.config.json` for navigation fallback and security headers.
No deployment token or other secret belongs in this repository.

## Coordinate regression check

Run from the repository root before deployment:

```text
node site/validate-content.js
node site/validate-coordinates.js
```

The content check validates the current trip concepts, approved itinerary entries, and
day-link placements against the approved fixture, and verifies image transformation
disclosures and local files.

The check imports the shared deployed trip data from `site/trip-data.js` and validates all
marker IDs, labels, roles, reference distances, route endpoints, segment
semantics, and itinerary marker references without external geocoding. It also
runs a negative Lake Como longitude-sign regression.

## Browser/device regression check

Run from the repository root:

```text
npm --prefix site install
npm --prefix site run test:browser
```

The Playwright suite verifies clean default-trip selection, invalid-hash fallback,
trip/day selection synchronization, no horizontal overflow at 390×844, 820×1180,
1180×820, and 1440×900, plus key control usability and map-interaction safety.
