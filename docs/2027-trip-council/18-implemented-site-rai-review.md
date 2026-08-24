# Implemented Four-Trip Site — Final RAI Review

**Verdict: 🟡 Yellow — no critical RAI violation; publication is not blocked.**

## Blocking findings

None. Reviewer lockout is not activated.

## Non-blocking findings

### 1. Removed-trip content is excluded, but removed IDs remain persisted — Yellow

**What:** A stale-review test confirmed that notes, reactions, and other values for Türkiye, Austria + Slovenia, and Sicily + Malta are removed from `trips` and do not appear in the review dialog or downloaded export. However, their IDs remain in `archivedRemovedTripIds` in `localStorage` (`site/app.js:44,52-60`).

**Why:** This prevents content leakage but does not satisfy the strictest interpretation of “removed concepts must not appear through stale saved state.” The removed route names remain discoverable in persisted browser data, and retention has no user-facing purpose.

**How:** Purge unknown IDs completely during migration. Persist only the current schema fields and retained-trip records; do not spread arbitrary legacy properties into the migrated object.

### 2. The cost summary still uses unexplained shorthand and some flight wording can sound firmer than the evidence — Yellow

**What:** The prominent fact list still labels the estimate “Whole-trip SWAG” (`site/app.js:217`), despite the earlier review requesting plain language. Flight copy also uses phrases such as “usually one connection” and “one connection is normal” (`site/trip-data.js:40,177,280-281,329`).

**Why:** The surrounding “not a quote,” provisional-schedule, verification, inclusion, and recalculation notices are strong, including in exports. The remaining shorthand and frequency language can nevertheless be read as more settled than unpublished 2027 schedules support.

**How:** Use “Rough 2027 range for two” everywhere. Replace “normal/usually” with explicitly provisional planning-pattern language tied to rechecking exact dates.

### 3. The itinerary rail creates a long keyboard and cognitive path — Yellow

**What:** Every day in the 12–14-entry horizontal route rail is a separate tab stop (`site/app.js:374-384`), before the reader reaches the evidence and review controls. The same days are also available through previous/next controls and the expandable itinerary.

**Why:** The richer content is progressively disclosed and the page does not horizontally overflow at 320 px, but repeated controls increase keyboard effort and decision fatigue.

**How:** Use a roving-tabindex pattern for the rail, or keep only the active day in the tab order with arrow-key movement. Add a skip path from the map to the route evidence.

### 4. Public personal context still needs an intentionality check — Yellow

**What:** The page and metadata publish first names, the 30th-anniversary context, and the 2027 timing (`site/index.html:6,22-24`). Notes are correctly described as browser-profile storage, with shared-profile, deletion, clipboard, and download cautions.

**Why:** If the deployed site is publicly reachable, the names and travel context are personal information even though no account, analytics, or note backend exists.

**How:** Confirm that public identification is intentional. Otherwise anonymize the page or restrict access.

### 5. Map attribution remains below the established utility-text floor — Yellow

**What:** Practical computed-style checks found Leaflet attribution at 12 px; the rest of the reviewed authored utility text met the 14 px floor.

**Why:** Attribution is legally and informationally important and should remain comfortably readable at zoom and on small screens.

**How:** Override the Leaflet attribution text to at least 14 px and recheck wrapping.

## Checks that passed

- Eight local images exist, load, have specific alt text, and show source, creator/license, and modification notes; the Canaletto image is identified as historical artwork.
- External content links are descriptive and open in the same tab; no unexpected new-tab behavior was found. OSM loading and privacy are disclosed.
- Mobility summaries use comparable, non-medical facts; lower-effort options and recovery time are visible for every trip.
- Each trip includes a responsible-travel prompt without an invented sustainability score.
- Reduced-motion emulation disabled smooth scrolling and animation; visible focus styling and the skip link are present.
- At 320 px, the document width matched the viewport; overflow remained contained within the intended map/itinerary components.
- Browser checks found no duplicate IDs, application console errors, or missing loaded route images.
