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

The content check validates the four retained trips, all 51 approved itinerary entries and
116 day-link placements against the approved fixture, verifies image transformation
disclosures and local files, and proves storage migration keeps only allowlisted trip IDs.

The check imports the shared deployed trip data from `site/trip-data.js` and validates all
marker IDs, labels, roles, reference distances, route endpoints, segment
semantics, and itinerary marker references without external geocoding. It also
runs a negative Lake Como longitude-sign regression.
