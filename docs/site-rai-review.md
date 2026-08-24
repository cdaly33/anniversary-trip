# Site RAI Review

**Verdict: 🟡 Yellow — publication may proceed, with recommended improvements.**

**Publication blocker:** No Red finding was identified. Nothing in this review blocks publication.

## Findings

### 1. External map requests are not disclosed before they occur — Yellow

**WHAT:** Leaflet and all fonts are self-hosted, but OpenStreetMap tiles load automatically from `tile.openstreetmap.org` on page load (`site/app.js:407-411`). The “Enable map interaction” control does not control this request. Attribution identifies the map source, but the page does not explain that the visitor's browser contacts an external service.

**WHY:** OpenStreetMap's tile service can receive normal network metadata such as the visitor's IP address and site origin. Visitors may reasonably interpret a static personal review site as fully local because the external request is not stated.

**HOW:** Add a short disclosure near the map naming OpenStreetMap and linking its privacy information. Prefer loading tiles only after an explicit “Load map detail” action; otherwise clearly state that map detail loads from OpenStreetMap when the page opens.

### 2. “Private” and “saved on this device” need clearer boundaries — Yellow

**WHAT:** Reviews are stored only in browser `localStorage`, with no account, analytics, or backend (`site/app.js:181-211`). Clear, copy, and text-download controls exist. However, “private review controls” and “Saved on this device” can imply stronger privacy than browser storage provides (`site/index.html:38,178,194`). The page does not say that other users of the same browser profile may see the review, clearing site data can erase it, and copied/downloaded notes leave browser storage.

**WHY:** Notes may contain personal concerns or travel intentions. Browser-local storage is useful but is neither encrypted personal storage nor durable backup.

**HOW:** Say “Stored in this browser profile; not sent to this site.” Add concise shared-device, browser-data-loss, clipboard, and downloaded-file cautions in the summary. Confirm that publishing first names and the anniversary/travel context is intentional; otherwise anonymize them or restrict site access.

### 3. A pending note can be lost or exported stale — Yellow

**WHAT:** Notes save after a 350 ms debounce (`site/app.js:217-220`). Switching routes, opening/exporting the summary immediately, or leaving before the timer fires can omit the latest edit. Because the delayed callback reads the then-current route and textarea, a fast route switch can also associate the save attempt with the wrong route (`site/app.js:220,295,600-617`).

**WHY:** Users are explicitly told their review is saved and may rely on copy/download as a durable handoff. Silent loss undermines that expectation.

**HOW:** Capture the route ID and note value when scheduling; flush pending notes before route changes, summary rendering, copy/download, and page exit. Only show “Saved” after the current value has been persisted.

### 4. Small utility text reduces readability — Yellow

**WHAT:** Several labels and controls use approximately 11–12 px text (`site/styles.css:25,63,71,82,99,123,143,156`), below the design brief's 14 px utility-text floor.

**WHY:** Dense small text is harder to read for low-vision users and for travelers using phones in variable lighting, even where color contrast is adequate.

**HOW:** Raise utility text to at least 14 px, then recheck wrapping at 320 px and zoom to 200%.

### 5. Mobility and energy support is useful but uneven — Yellow

**WHAT:** Portugal, Italy/Croatia, and New Zealand/Australia include recovery, seated, lower-walking, hill-reducing, and reducible options. Other routes provide fewer equivalent cues, and sorting/comparison cannot expose walking terrain, transfer load, rest opportunities, or adjustable days.

**WHY:** A visitor with lower energy or mobility preferences cannot compare all seven routes consistently without reading every itinerary and making assumptions.

**HOW:** Add neutral, non-medical facts for each route: transfer intensity, likely hill/stair exposure, seated/low-walking alternatives, and protected flex/recovery time. Offer a “lower transfer load” or “more recovery time” sort/filter without claiming an accessibility score.

### 6. Responsible-travel framing is incomplete — Yellow

**WHAT:** The content is commendably provisional, non-promotional, non-wine-inclusive, and explicit about humane transfers and avoiding overpacked days. It does not consistently prompt consideration of local cultural respect, resident impact, resource pressure, or the environmental difference between long-haul and regional options.

**WHY:** The comparison may otherwise treat responsible-travel effects as outside the decision despite materially different flight and excursion patterns.

**HOW:** Add a brief, factual “responsible-travel checks” prompt for every route: local guidance and customs, locally owned options, pressure-sensitive sites/seasons, rail versus flight where practical, and avoiding invented sustainability rankings.

## Positive controls observed

- No analytics, account, paid map token, or server-side note transmission is present.
- Fonts and Leaflet assets are self-hosted; the only application-defined external resource is OpenStreetMap tile imagery.
- OSM attribution, CSP restrictions, reduced-motion handling, visible focus, skip navigation, map fallbacks, clear confirmation, and text export are present.
- Provisional facts, rejected concepts, accessibility alternatives, rest days, and non-booking language are generally framed responsibly.
