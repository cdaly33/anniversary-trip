# Anniversary Route Table — visual and interaction design brief

## Product definition

**Subject:** Seven possible 2027 trips for Rachel and Chris's 30th wedding anniversary.

**Audience:** Rachel first, with Chris beside her or reviewing the same exported notes later.

**Single job:** Make the seven concepts easy to understand side by side and let Rachel express a useful preference. This is a review experience, not a booking engine, fare finder, or generic travel dashboard.

The experience must keep council judgment separate from Rachel's judgment. “Conditional,” “rejected,” and “alternative” describe the planning record; “Love this,” “Interested,” “Unsure,” and “Not for us” belong to Rachel.

## Chosen aesthetic thesis: a shared route table

The page should feel like a large, contemporary route chart spread between two people after dinner: geographic, calm, and made for conversation. It borrows the precision of transit diagrams and the warmth of handwritten deliberation without using passport stamps, polaroids, postcard collages, luxury-resort photography, or a grid of interchangeable destination cards.

The central map is the table. Destination material gathers at its edges, and Rachel's reactions remain visibly attached to each route. A single vermilion “decision thread” is the expressive risk: it traces the currently examined journey and links its map route to the itinerary beat in focus. Everything else stays quiet.

Photography, if added later, is subordinate evidence: one restrained, place-specific image per concept, never a full-bleed tourism hero and never the only way to distinguish options.

---

## Pass one: compact design system

### Color tokens

| Token | Value | Use |
|---|---:|---|
| **Deep chart** | `#123044` | Primary text, desktop map surround, selected controls |
| **Sea glass** | `#DCEBEC` | Page field, quiet comparison surfaces |
| **Paper white** | `#F8FAF8` | Reading panels and cards |
| **Route vermilion** | `#D94A38` | Active route, focus-adjacent emphasis, favorite heart |
| **Harbor teal** | `#187184` | Links, secondary route, informational states |
| **Milestone brass** | `#A66F16` | 30th-anniversary anchor and caution accents |

Use Deep chart on Paper white for primary reading. Route vermilion is not a general-purpose decoration; reserve it for the route under discussion, current itinerary beat, and deliberate preference actions. Statuses must use an icon and label, never color alone.

### Type roles

- **Destination/display — Antonio, 600–700:** Tall, compact place names with the feel of rail and ferry wayfinding. Use only for the opening thesis, destination names, and major route labels. Do not set paragraphs in it.
- **Narrative/body — Source Serif 4, 400–600:** Comfortable reading for daily plans, objections, repairs, and notes. Its editorial clarity gives the council material gravity without making the page look like a newspaper.
- **Utility/data — IBM Plex Sans, 450–650:** Controls, status labels, timing, base counts, filters, map labels, and export text.
- **Fallback stack:** `Antonio, "Arial Narrow", sans-serif`; `"Source Serif 4", Georgia, serif`; `"IBM Plex Sans", Arial, sans-serif`.

Self-host WOFF2 files in the eventual static build to avoid a font-CDN dependency. Body text is 17px/1.55 desktop and 16px/1.55 mobile. Utility text never drops below 14px. Destination labels use fluid sizing with `clamp(2.25rem, 5vw, 5.5rem)` and tight but not touching line-height.

### Spacing and shape

- 4px base spacing; primary rhythm: 8, 12, 16, 24, 32, 48, 72.
- Reading measure: 62–70 characters.
- Corners: 4px for controls and reading panels; 999px only for compact status/reaction chips. Avoid the soft rounded-card look.
- Dividers: 1px Deep chart at 18% opacity. Route lines: 4px active, 2px comparison, with high-contrast casing on maps.
- Shadows: none by default. Use a single short shadow only for a mobile sheet lifted over the map.

### Structural language

Do not number concepts 01–07; they are choices, not steps. Encode real structure instead:

- **Council status:** Leading fit, strongest challenger, conditional outline, rejected concept, or alternative.
- **Route facts:** duration, bases, relocations, working season.
- **Journey segments:** bases and meaningful transfers.
- **Review state:** favorite, gut reaction, confidence, notes.

### Signature interaction

**Route rehearsal:** Selecting a concept draws its geographic route and opens a horizontal/vertical itinerary rail. Moving through itinerary beats—by click, swipe, arrow key, or “Previous/Next”—moves the active waypoint, updates the concise day text, and gently reframes the map. A thin vermilion thread visually connects the active waypoint to its matching itinerary beat.

Rachel can pin one second concept. Its route remains in Harbor teal with reduced emphasis, allowing an immediate route-shape and travel-burden comparison without pretending that map distance alone determines fit.

---

## Layout concepts considered

### A. Map-centered route table — chosen

The map stays central, destination choices form a compact rail, and the selected trip's evidence occupies a reading panel.

```text
DESKTOP ≥ 1100px
┌──────────────────────────────────────────────────────────────────────┐
│ Seven ways to celebrate 30 years       Review summary · 3 reviewed  │
├──────────────┬───────────────────────────────┬───────────────────────┤
│ CONCEPTS     │                               │ PORTUGAL              │
│ Portugal  ♥  │        INTERACTIVE MAP        │ Leading fit           │
│ Spain        │                               │ 11 days · 2 bases     │
│ Italy/Croat. │   route + active day thread   │                       │
│ NZ/Australia │                               │ Why it fits           │
│ Türkiye      │                               │ Objection → repair    │
│ Austria/Slov.│                               │ Review controls       │
│ Sicily/Malta │                               │ Notes                 │
├──────────────┴───────────────────────────────┴───────────────────────┤
│ ARRIVE · LISBON · SINTRA · PORTO · DOURO · FLEX · DEPART            │
└──────────────────────────────────────────────────────────────────────┘
```

This is strongest because route shape, planning evidence, and personal reaction remain visible together.

### B. Stacked destination folios — rejected

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Destination story                                                    │
│ map ─ itinerary ─ objection ─ controls                               │
│ Destination story                                                    │
│ map ─ itinerary ─ objection ─ controls                               │
└──────────────────────────────────────────────────────────────────────┘
```

This reads well but makes seven-way comparison too dependent on scrolling and repeats the same visual module until it feels templated.

### C. Comparison matrix with map drawer — rejected

```text
┌──────────────────────────────────────────────────────────────────────┐
│ criteria × seven concepts                                            │
│ [open map]                                                           │
└──────────────────────────────────────────────────────────────────────┘
```

This overstates incomplete rankings, pushes the memorable geography aside, and turns an anniversary conversation into a spreadsheet.

---

## Pass-two critique and revision

### What initially felt generic

1. A “travel journal” direction risked familiar cream paper, serif headlines, stamps, and postcard decoration.
2. A row of seven image cards would be indistinguishable from destination marketing.
3. Numeric score bars would imply precision the council does not have and would bury the adversarial findings.
4. Animated map flyovers could become spectacle rather than comparison.

### Revisions

- The palette moved from warm travel-journal neutrals to cool chart colors grounded in lakes, sea crossings, and route planning.
- The map became the persistent work surface rather than a decorative hero.
- Structural labels now describe actual council status, bases, transfers, and review state instead of arbitrary numbering.
- The signature interaction became a day-by-day route rehearsal, not ambient animation.
- Comparison is limited to two pinned routes plus honest facts; no invented composite score.
- The opening uses Rachel and Chris's real choice: **“Seven routes. One 30th anniversary.”** Supporting copy: **“Trace each trip, test the tradeoffs, and mark what feels right.”**

The resulting direction is specific to a couple comparing seven anniversary itineraries, not reusable unchanged for a hotel site, travel blog, or analytics product.

---

## Information architecture

### 1. Orientation

- Heading: **Seven routes. One 30th anniversary.**
- One-sentence purpose.
- Small factual guardrail: **“Ideas for 2027; no trip is booked and schedules, prices, weather, and availability remain provisional.”**
- Progress, stated plainly: **“0 of 7 reviewed.”**
- Primary action: **Start with the leading fit**
- Secondary action: **Browse all routes**

No signup, search field, pricing CTA, or “Book now” language.

### 2. Route table workspace

Three coordinated regions:

1. **Concept rail:** all seven concepts, concise council label, reaction state, favorite state.
2. **Map:** selected route, optional comparison route, base markers, meaningful transfer style, active itinerary beat.
3. **Evidence panel:** rationale, route facts, daily plan, objection/repair, alternatives and caveats, then review controls.

### 3. Focused comparison

Rachel may pin one challenger from any concept. Show a factual comparison strip:

- duration;
- bases;
- major relocation pattern;
- proposed timing;
- council status;
- anniversary centerpiece;
- principal risk;
- Rachel's reaction and confidence.

Use phrases and counts from the source record. Do not infer costs, safety, weather quality, or accessibility scores.

### 4. Review summary

Show:

- favorites/shortlist;
- reaction and confidence for every reviewed concept;
- notes;
- unresolved questions Rachel marked;
- the source caveat;
- local save status.

Actions: **Copy review**, **Download review**, **Clear saved review**. “Clear” requires a confirmation dialog and never clears automatically.

---

## Real content to surface

### Default editorial order

The default order reflects the council lens, not a final ranking. Label it **Council view** and allow **Alphabetical**, **Fewest bases**, and **Shortest trip** sorts.

| Concept | Required status and headline content |
|---|---|
| **Portugal** | **Current leading fit · Conditional.** 11 days / 10 nights; Lisbon 5 + Porto 5; late September–early October 2027. Best current comfort/value hypothesis. Anniversary centerpiece: defined Douro scenic-and-regional-food day plus celebration dinner. Objection: two-city efficiency could become a generic sequence of old towns and day trips. Repair: disciplined Sintra, one Lisbon day trip, one northern-history choice, Douro weather/non-wine fallback, true flex day, hill-reducing options, open-jaw test. |
| **Spain** | **Strongest challenger · Alternative.** 11 days; Madrid 5 + Seville 5; late September–early October. Strongest match for history, castles/royal sites, food, and independent exploration. Objection: city- and monument-heavy, with less natural drama; heat and event crowds need testing. |
| **Northern Italy + Croatia** | **Conditional outline.** 12 days / 11 nights; Lake Como 4 + Venice 3 + Rovinj 4; September 9–20 working dates. Romantic lake–Venice–Adriatic progression. Objection: unresolved Venice–Rovinj and departure-gateway movements could consume two days. Repair: route/connection/time ceiling, gateway decision, protected transfer evening, light days, equal-status accessible/non-swimming/alcohol-free choices. |
| **New Zealand + Australia** | **Rejected as a recommended concept.** 14 calendar days / 11 hotel nights; Queenstown 4 + Te Anau 3 + Sydney 4; November working window. Potentially highest spectacle, but structurally unfit under the 14-day ceiling. Show the repaired outline only as the least-bad fallback and state that a New Zealand-only rebuild would require fresh review. |
| **Türkiye** | **Alternative.** 11 days; Istanbul 6 + Cappadocia 4; late September–mid-October. Imperial history, Bosphorus, food neighborhoods, rock-cut heritage, and two sunrise opportunities. Objection: the heaviest operational-confidence burden among alternatives; safety, entry, aviation, city intensity, and balloon/weather dependence require monitoring. |
| **Austria + Slovenia** | **Alternative.** 12 days / 11 nights; Ljubljana 6 + Vienna 5; early–mid September. One hotel change, castles, scenery, food, and imperial grandeur. Objection: repeated road excursions in Slovenia and an arguably uneven two-country balance. |
| **Sicily + Malta** | **Alternative.** 12 days / 11 nights; Ortigia/Syracuse 6 + Valletta 5; late September–October. Layered history, Mediterranean atmosphere, Etna-scale scenery, food, and two strong bases. Objection: dispersed Sicily sights and the Malta transfer may recreate costly cross-border friction. |

### Daily-plan presentation

- For the three current concepts, expose every sourced day as a concise one-line plan.
- For the four alternatives, present the sourced core shape as 5–7 clearly labeled **route beats**, not invented day-by-day certainty.
- Default view shows the current beat and the next beat. **Show full plan** expands the complete list.
- Each day/beat has at most: location, one main experience, one lighter/flex note, and a transfer or caveat when material.
- Preserve “or,” “optional,” “flex,” “weather reserve,” and “no sightseeing obligation.” These words are planning safeguards, not filler.

### Provisional caveat

Keep a persistent but quiet banner above the evidence panel:

> **2027 details are provisional.** Schedules, prices, availability, operating dates, entry rules, and weather expectations still need verification.

Repeat the full caveat in the copied/downloaded summary.

---

## Core components and states

### Concept item

- **Default:** destination, route shorthand, council label.
- **Hover:** subtle Sea glass field; no movement.
- **Focus:** 3px Route vermilion outline with 2px offset.
- **Selected:** Deep chart field, Paper white text, visible “Viewing” label.
- **Pinned for comparison:** Harbor teal left rule and “Compared” label.
- **Reviewed:** shows Rachel's reaction icon/text.
- **Favorite:** filled heart plus text available to assistive technology.
- **Rejected council concept:** no disabled styling; it remains fully reviewable. Use a clear “Council: rejected” label, not reduced opacity.

### Map markers and routes

- Base markers are labeled by place name, not only a number.
- Active base uses a vermilion ring; inactive selected-trip bases use Deep chart.
- Comparison-trip markers/routes use Harbor teal and a distinct dash pattern.
- Transfer semantics:
  - solid line: local/ground/water sequence where route detail is meaningful;
  - long dash: major relocation;
  - dotted arc: flight or conceptual long-distance link.
- Include a visible legend. Never rely on hue alone.
- Marker hit target: at least 44×44 CSS pixels, even if the visible dot is smaller.

### Itinerary rail

- **Resting:** all beats readable; active beat has vermilion rule and “Current” text.
- **Hover/focus:** beat and corresponding marker emphasize together.
- **Active:** map reframes and detail text updates.
- **Transfer day:** explicit transfer glyph and “Transfer” label.
- **Flex/recovery day:** open-circle glyph and “Flex/recovery” label.
- **Complete plan expanded:** reading panel owns page scroll; map does not trap wheel/touch gestures.

### Review controls

Use a small, human sequence headed **Your take**, not a dashboard form.

1. **Shortlist this trip** — toggle with favorite/heart icon.
2. **Gut reaction** — single choice: **Love this**, **Interested**, **Unsure**, **Not for us**.
3. **How settled does that feel?** — single choice: **First impression**, **Leaning**, **Confident**.
4. **Notes for Chris** — autosaving textarea with prompt: **“What stands out, worries you, or needs checking?”**
5. Optional checkbox: **Needs an answer before deciding**.

Reaction and confidence remain independent. Do not require all fields before moving to another route.

Control states:

- selected choices use icon, text, border, and filled background;
- save confirmation reads **Saved on this device**;
- localStorage failure reads **This browser could not save your review. Copy or download it before leaving.**

### Objection and repair

Present as a two-part cause/effect block, not a red warning card:

```text
THE HARDEST QUESTION
Could the Venice–Rovinj link and final airport consume two vacation days?

WHAT WOULD MAKE IT WORK
Confirm a direct/one-change route, time ceiling, and humane departure gateway first.
```

For alternatives with no formal repair, label the second section **What still needs testing**. Never invent a repair.

### Portable summary

Persist a versioned object in localStorage, for example:

```text
anniversaryTripReview.v1
```

Store only trip IDs, review values, notes, timestamps, and UI schema version. No account or analytics dependency.

**Copy review** produces readable plain text optimized for email/message:

```text
Rachel's anniversary trip review — saved August 23, 2026

Shortlist
1. Portugal — Love this · Leaning
   Note: The Douro day feels special; compare Porto flight options.

Still considering
Spain — Interested · First impression

2027 schedules, prices, availability, operating dates, entry rules,
and weather expectations remain provisional.
```

**Download review** downloads the same readable summary as `.txt`; optionally add a separate **Download data (.json)** under a secondary menu for reliable re-import later. The summary must not claim that a shortlist is booked or approved.

---

## Map interaction and implementation brief

### Recommended implementation

Use **Leaflet** with **OpenStreetMap** raster tiles. It is compatible with a static Azure Static Web Apps deployment and needs no paid API key.

- Self-host the pinned Leaflet JavaScript, CSS, marker assets, and font assets within the static build.
- Keep trip coordinates, bounds, stops, segment types, and accessible route descriptions in local versioned JSON.
- Use OpenStreetMap's standard tile endpoint only for the expected low-volume personal review and follow its tile usage policy. Do not bulk-download or prefetch tiles.
- Display visible attribution whenever OSM tiles are used: **© OpenStreetMap contributors**, linked to the copyright page.
- Do not expose a token because none is required.

### Per-trip behavior

- Each concept has a route definition containing named bases, meaningful day-trip anchors, transfer segments, route bounds, and a text equivalent.
- On concept selection, fit the route bounds with panel-aware padding. Do not zoom to street level automatically.
- On itinerary-beat selection, pan only enough to reveal the marker; retain geographic context.
- A selected concept receives the vermilion route. One pinned comparison receives teal/dashed treatment.
- Worldwide concepts use a dotted long-distance arc and separate regional clusters rather than a visually misleading straight solid line across the Pacific.
- Display only route details supported by the report. Do not imply exact ferry, rail, road, or flight paths before verification.

### Map/list synchronization

- Selecting a concept in the list updates map, evidence panel, URL hash, and document heading.
- Selecting a marker updates the active itinerary beat and announces the change in a polite live region.
- Focusing a list beat emphasizes its marker without moving the map. Activating it may reframe the map.
- Browser Back/Forward restores the selected concept and beat through URL state; private review values remain in localStorage, never the URL.
- On mobile, choosing a marker updates the sheet but does not unexpectedly open or fully expand it.

### Input safety

- Provide **Enable map interaction** on touch devices or require deliberate focus before wheel zoom on desktop, preventing scroll hijacking.
- Always show zoom controls and a **Fit full route** control.
- Do not rely on drag gestures: every map action has a list/button equivalent.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- replace fly/pan animation with an immediate map update;
- remove route-drawing animation and thread movement;
- use a static active marker state;
- keep all content and synchronization intact.

Even without reduced motion, route drawing happens once per explicit selection, lasts no more than 450ms, and does not autoplay on page load.

### Tile, CDN, or script failure

The map is enhancement, not the sole holder of route information.

1. Because Leaflet is self-hosted, a third-party CDN failure cannot remove the map controls.
2. If OSM tiles fail, retain markers and route overlays over a local low-detail chart background (simple bundled SVG continents/grid), with the notice: **“Map detail is unavailable. The route sequence and trip notes still work.”**
3. If Leaflet fails entirely, replace the map region with a semantic **route sequence**:

   **Lisbon (5 nights) → rail → Porto (5 nights)**  
   Working window: late September–early October 2027

4. Keep concept selection, itinerary steps, review controls, copy, and download fully operational.
5. Never show an endless loading spinner. After a short timeout, enter fallback state and offer **Retry map**.
6. Log failure only locally to the browser console unless a future privacy decision adds telemetry.

---

## Responsive behavior

### Wide desktop: 1100px and above

- Three-column workspace: 220–260px concept rail, flexible map, 360–420px evidence panel.
- Map height is `min(68vh, 760px)` with a 520px minimum where viewport permits.
- Itinerary rail spans beneath map/evidence to preserve route continuity.
- Concept rail and evidence panel may have independent internal scroll only when each retains visible headings; avoid nested scroll on shorter screens by allowing document scroll.

### Tablet/small desktop: 760–1099px

- Concept rail becomes a horizontally scrollable tab list above the map.
- Map occupies full content width at 42–50vh.
- Evidence panel appears below in a two-column reading layout where space allows.
- Pinned comparison becomes a compact sticky strip, not a second full panel.

### Mobile: below 760px

```text
┌──────────────────────────┐
│ Seven routes · 2 reviewed│
│ [Portugal ▼]   [Summary] │
├──────────────────────────┤
│                          │
│       ROUTE MAP          │  38–44vh
│                          │
├──────────────────────────┤
│ Portugal · Leading fit   │
│ Lisbon 5 → Porto 5       │
│ [‹] DOURO DAY [›]        │
│ Why it fits              │
│ Hardest question         │
│ Your take                │
└──────────────────────────┘
```

- Use a single concept picker that opens an accessible full-width list; do not force seven tiny tabs.
- Map comes before detail but after the page heading and provisional caveat.
- Detail is in normal document flow, not a permanently draggable bottom sheet. A small collapsed map-caption bar may stick while scrolling.
- Itinerary beats become a vertical list; Previous/Next remain available.
- Comparison shows a stacked fact strip, then lets Rachel swap which route owns the map.
- Touch targets are at least 44×44px with 8px between adjacent targets.
- Notes field grows to content up to a sensible maximum and remains visible above the virtual keyboard.

---

## Accessibility behavior

### Semantics and keyboard

- Provide a skip link: **Skip to trip review**.
- Use one `h1`, concept names as `h2`, and evidence sections as `h3`.
- Implement the desktop concept rail as a labeled list of buttons or links, not ARIA tabs unless full tab keyboard behavior is implemented correctly.
- Recommended keys:
  - `Tab`/`Shift+Tab`: normal control order;
  - `Enter`/`Space`: select concept, beat, marker-equivalent, or toggle;
  - Left/Right: previous/next itinerary beat only when focus is inside the itinerary control;
  - `Escape`: close concept picker, summary dialog, or clear confirmation.
- Do not create a large grid with custom arrow-key behavior.
- Map markers must be keyboard reachable only if they add an action; otherwise keep the synchronized itinerary list as the operable control and markers as presentational echoes.

### Focus

- Every interactive element receives a 3px vermilion or Paper white focus ring with at least 2px separation from the component.
- Focus is never removed after map updates.
- When a concept is selected, keep focus on the selecting control; update the evidence heading and announce **“Portugal selected. Leading fit, conditional outline.”**
- Opening summary moves focus to its heading; closing returns focus to the trigger.

### Text and color

- Validate token pairings against WCAG 2.2 AA; target 4.5:1 for body text and 3:1 for large text and component boundaries.
- Keep labels visible; placeholders do not replace labels.
- Icons always have adjacent text in review and council-status controls.
- Route and comparison differences use line style, label, and color.

### Motion and announcements

- Honor reduced motion as specified above.
- Use one polite live region for concept/beat changes and save outcomes.
- Do not announce every intermediate pan or hover.
- No autoplay video, parallax, ambient moving particles, or map pulse loops.

---

## Copy guidance

Write as one partner helping another make a choice:

- Prefer **“Why it could fit”** over “Benefits.”
- Prefer **“The hardest question”** over “Cons.”
- Prefer **“What would make it work”** over “Mitigation strategy.”
- Prefer **“Your take”** over “Rating.”
- Prefer **“Shortlist this trip”** over “Add to favorites.”
- Prefer **“Notes for Chris”** over “Comments.”
- Prefer **“Review saved on this device”** over “Data persisted successfully.”

Keep claims bounded:

- “Current leading fit,” not “Best trip.”
- “Likely best relative value, still uncosted,” not “Cheapest.”
- “Working dates,” not “Available dates.”
- “Council: rejected as recommended,” not “Impossible.”
- “Needs verification,” not “Confirmed.”

Avoid promotional filler such as “unforgettable escape,” “hidden gem,” “bucket-list adventure,” and “luxury of a lifetime.” Name the actual place, route, experience, tradeoff, or decision.

---

## Build acceptance checklist

- All seven concepts are available without a mouse and contain real council status, route shape, rationale, objection, and caveat.
- Portugal opens as the clearly labeled current leading fit; Spain is visibly the strongest challenger; New Zealand + Australia is unambiguously rejected as a recommended concept.
- The selected route and itinerary beat remain synchronized across list, map, URL state, and heading.
- A second route can be pinned without hiding the primary route's evidence.
- Favorite, reaction, confidence, notes, and unresolved-question state survive reload in localStorage.
- Copy and `.txt` download work offline and include the provisional-2027 caveat.
- The full comparison and review workflow works when map tiles fail and when JavaScript map initialization fails.
- Leaflet assets are self-hosted; OSM attribution is visible; no paid API key is required.
- Keyboard focus is visible and stable after every update.
- Reduced-motion mode has no animated pan, fly, route draw, or pulsing marker.
- Mobile at 320px has no horizontal page overflow, clipped controls, or map scroll trap.
- Council and Rachel statuses are never visually or linguistically conflated.
- No booking, fare search, account, generic star rating, or fabricated numeric ranking appears.

