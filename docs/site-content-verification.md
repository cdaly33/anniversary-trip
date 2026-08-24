# Static Site Content Verification

_Final publication review: August 23, 2026. Authorized comparison sources: council final report, final verification, `site/index.html`, and `site/app.js`._

## Publication verdict: **REJECT**

The written site content is a faithful, concise presentation of the council record. Publication is blocked only by the map, which visually presents excursion markers as a continuous route and places unresolved alternatives at single definite points.

## Ratings

| Area | Rating | Finding |
|---|---|---|
| Seven concepts | **VERIFIED** | Portugal, Spain, Northern Italy + Croatia, New Zealand + Australia, Türkiye, Austria + Slovenia, and Sicily + Malta are all present with faithful durations, bases, timing, and council roles. |
| Three revised outlines | **VERIFIED** | The daily Portugal, Northern Italy + Croatia, and New Zealand + Australia plans preserve the report's sequence, recovery/flex provisions, conditions, and fallback language. |
| Verdicts and reviewer conclusions | **VERIFIED** | Portugal remains the conditional leading fit; Spain the strongest challenger; Northern Italy + Croatia conditional; New Zealand + Australia structurally rejected and not Fact Checker-approved. The site does not imply a booking decision. |
| Provisional 2027 caveats | **VERIFIED** | The global caveat covers schedules, prices, availability, operating dates, entry rules, and weather; the footer says the site is not a booking recommendation and no trip is booked. |
| Advocate arguments and weaknesses | **VERIFIED** | Each alternative retains its advocate's distinct case and self-identified weakness. The compression is accurate paraphrase, not drift. |
| Current operational facts and exact map coordinates | **UNVERIFIED** | The authorized scope did not independently revalidate 2027 services or geographic coordinates. The site appropriately treats operational facts as provisional. |
| Map route sequencing | **CONTRADICTED** | `app.js` draws each concept's entire `stops` array as one continuous polyline. This turns base-based day trips into onward travel—for example Madrid → Toledo → Segovia → Seville → Córdoba—although the approved outline returns to Madrid and later uses Seville as the Córdoba base. Comparable false continuity affects Portugal, Austria + Slovenia, Sicily + Malta, Türkiye, and New Zealand + Australia. |
| Unresolved map stops | **CONTRADICTED** | Northern Italy + Croatia maps an exact point called “Regional gateway” although the report requires the gateway to be selected later. Portugal maps “Guimarães / Braga” as one point although the outline requires choosing one of two distinct cities. |
| Transport styling | **CONTRADICTED** | A trip-level `isFlight` rule applies flight-style dashes to every segment of New Zealand + Australia, Türkiye, and Sicily + Malta, including local road/excursion legs. |

## Required revision

**Revision agent: Visual Designer**

1. Replace continuous stop-to-stop polylines with base-and-excursion paths that explicitly return to the active base, or use non-directional/spoke markers that make no route-order claim.
2. Remove the Northern Italy + Croatia “Regional gateway” marker until a gateway is confirmed; retain the unresolved departure condition in text.
3. Represent Guimarães and Braga as mutually exclusive alternatives, not one shared geographic marker.
4. Style transport per segment, not per trip. Road, rail, ferry, and flight legs must not inherit one trip-wide flight treatment.
5. Recheck every map path against the displayed itinerary beats before resubmission. No changes are required to the written concept summaries.

## Revision-cycle re-review — August 23, 2026

### Verdict: **APPROVE**

All four publication blockers are resolved:

- **No false continuous day-trip routes:** `app.js` now defines explicit `segments` and `addTripRoute()` draws each segment independently. Excursions are spokes from their active base, with tooltips stating that they return; they are no longer chained through later stops.
- **No definite regional gateway:** Northern Italy + Croatia has no gateway marker or coordinate. Its departure beat retains the conditional “confirmed regional gateway” language from the council report.
- **Guimarães and Braga are distinct:** Portugal now has separate city markers and separate alternative spokes from Porto. Both are marked “alternative,” and the itinerary still says “Guimarães or Braga, never both.”
- **Flight styling is limited to actual flights:** Only Queenstown–Sydney and Istanbul–Cappadocia use `type: "flight"`, matching the report. New Zealand road legs use road styling, while the unresolved Sicily–Malta and Italy–Croatia transfers use unverified-transfer styling.

No new factual contradiction or misleading route-order claim was found. Written durations, bases, itinerary beats, statuses, and provisional caveats remain consistent with the council final report. Exact coordinates and future operations remain outside this approval and retain their prior unverified/provisional status.
