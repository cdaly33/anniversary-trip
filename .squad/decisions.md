# Squad Decisions

## Active Decisions

### 2026-08-23T12:33:15.248-05:00: Initial anniversary-trip planning guardrails

**By:** @cdaly33

**What:** Use the confirmed nine-member descriptive roster. Plan for 10–12 days, stretching to 14 only when justified; favor 2 bases and allow 3 maximum; target 1–2 meaningful experiences per day; prioritize safe, comfortable, well-located, good-value travel over luxury.

**Why:** These constraints reflect Rachel and Chris's established travel style and keep comparisons consistent across Northern Italy + Croatia, New Zealand + Australia, and Portugal.

### 2026-08-23T12:45:11.098-05:00: 2027 travel-window flexibility

**By:** @cdaly33

**What:** Candidate itineraries may use any travel dates after March 2027 through December 31, 2027. Council drafts should remain concise while following the consolidated planning guardrails.

**Why:** The wider window lets each concept use its strongest season rather than anchoring every option to the May 17 anniversary date.

### 2026-08-23T19:00:01.589-05:00: Published trip-review scope

**By:** @cdaly33

**What:** The review experience will retain Portugal, Spain, Northern Italy + Croatia, and New Zealand + Australia. Remove Türkiye, Austria + Slovenia, and Sicily + Malta. Each retained concept must include expected flight patterns from St. Louis (STL), deeper day-level ideas with trustworthy visual/reference links, and a high-level whole-trip cost range with general lodging assumptions rather than itemized prices.

**Why:** Rachel needs a focused comparison with enough practical depth to understand each trip without turning the review into a detailed booking quote.

### 2026-08-23T19:00:52.324-05:00: Site-refresh comparison assumptions

**By:** Trip Lead, facilitating the auto-triggered Trip Concept Review for @cdaly33

**What:** Apply the shared assumptions and agent handoffs in `docs/2027-trip-council/09-site-refresh-scope.md`: two travelers; economy airfare from STL unless labeled otherwise; safe, comfortable, well-located midrange lodging; provisional 2027 USD estimates; consistent whole-trip SWAG inclusions/exclusions; verified links and flight wording; and only properly attributed open-license/public-domain images. New Zealand + Australia remains structurally high-risk and rejected as a recommendation unless material new evidence passes fresh review.

**Why:** The four retained concepts need comparable, trustworthy depth without false precision, licensing risk, or a misleading change to the council's existing conclusion.

### 2026-08-24T17:04:52.553-05:00: Design revision — shorter masthead, dropdown nav at all widths, feedback UI removal, 50/50 map split with expand mode

**By:** Web Developer, requested by @cdaly33

**What:**

- **Masthead ~40–45% shorter:** padding reduced from `38px 48px 30px` to `20px 48px 16px`, the anniversary mark from 96px to 72px, and `h1` from `clamp(3.4rem,7vw,7.2rem)` to `clamp(2.4rem,4.6vw,4.2rem)` (mobile: `clamp(2.2rem,11vw,3.4rem)`). Large-type identity kept via the Antonio display face and multi-line headline.
- **Dropdown concept nav at all widths:** the persistent 250px left rail is gone. The former `mobile-concept-trigger` pattern (renamed `concept-trigger` / `current-concept`) is now the only nav presentation: a full-width trigger button with `aria-expanded`/`aria-controls` toggling the concept list (4-column grid when open at desktop, single column ≤759px). Escape closes the list and returns focus to the trigger; selecting a route closes it. The 1099px media query was deleted because its layout became the default.
- **Feedback UI removed:** shortlist, gut-reaction, confidence, notes, needs-answer, review-progress, review tray/clear dialogs, and all `localStorage` review persistence are removed. `review-storage.js` is deleted; `validate-content.js` no longer imports it and the storage-migration test block is removed (the approved day-content fixture and its sha256 check are retained). Route pin-for-comparison stays — it compares routes on the map, not feedback.
- **Map/description split:** default desktop grid is 50/50 (`minmax(0,1fr) minmax(0,1fr)`). An **Expand map** button (`aria-expanded`, `aria-controls="map-shell"`) switches the grid to ~70/30 (`7fr/3fr`) and raises the map shell to `min(78vh,880px)`; it stays expanded until the same button (now "Collapse map") or Escape exits, with focus returned to the button. Expanding also enables map gestures (drag/touch/scroll-wheel zoom) and restores the prior interaction state on collapse; Leaflet `invalidateSize()` plus a route re-fit run after each layout change. At ≤759px the layout stays stacked and expansion instead raises the map shell to 70vh.
- **Flights untouched:** no flight data or flight-panel rendering was modified; Logistics' parallel routing verification is unaffected.

**Why:** Chris asked for a shorter header, the iPad-style collapsible nav at desktop to reclaim dead space, removal of the in-site feedback flow (Rachel and Chris discuss in person), and a roomier default reading split with an opt-in map-focus mode. Button-plus-Escape (rather than click-into-map) was chosen for the expand interaction because it is keyboard-operable, screen-reader-announced, and cannot be triggered accidentally while panning.

### 2026-08-24T17:04:52.553-05:00: Flight routing reality corrections for all concepts (Fact Checker follow-up pending)

**By:** Logistics, applied by Web Developer

**What:**

Baseline assumption correction: "STL has no transatlantic service" is outdated as of 2026. Replace with:
- **STL–FRA (Lufthansa):** nonstop, seasonal (roughly late March–late October, 3–5x/week). Covers late-September/early-October 2027 window; confirm exact season end for 2027.
- **STL–LHR (British Airways):** nonstop, starts April 19, 2026, 4x/week (Tue/Wed/Fri/Sun), seasonal summer service. Confirm whether 2027 season extends into early October.
- Everything else intercontinental still requires a US/European hub. No nonstop STL–Lisbon, STL–Madrid, STL–Milan, or any STL–Oceania service exists.

**Portugal:** one connection each way (typically ORD, EWR, JFK, or IAD); two possible from Porto on weaker dates. Outbound: STL–ORD–LIS (TAP, year-round ORD–LIS nonstop) cleanest one-stop; alternates STL–EWR/JFK/IAD/BOS–LIS; seasonal STL–FRA (Lufthansa) or STL–LHR (BA) when operating. Return: OPO–EWR (United, seasonal) one-stop best case; OPO–LIS or European hub two stops on weaker dates. Total travel time: ~11–15h outbound, 13–17h home.

**Spain:** one stop via PHL, CLT, JFK, MIA, DFW, ORD, ATL, or IAD (all have MAD nonstops); seasonal STL–FRA and STL–LHR now true one-stop options when operating. Seville return needs two connections or rail to Madrid plus one flight. Total travel time: 11–18h each way.

**Italy–Croatia:** Return gateway hierarchy: VCE (only one-stop option via seasonal US nonstops); TRS and ZAG (two stops); PUY (least useful, seasonal, two stops and fragile schedules). Seasonal STL–FRA–MXP (Lufthansa) valid one-stop outbound. Lake transfer: 1–1.5h. Total travel time: 12–20h to MXP / 14–24h home.

**New Zealand–Australia:** Return can be single connection via Qantas SYD–DFW–STL; SYD–LAX/SFO–STL similarly one-stop. ORD–AKL (Air New Zealand/United) valid Auckland gateway. AA DFW–AKL seasonal (verify Nov 2027). ZQN–SYD trans-Tasman seasonal; AKL connection fallback. Total travel time: 22–32h inbound / 19–27h home.

**Why:** Rachel needs flight expectations that match current carrier realities and seasonal dependencies, not outdated assumptions. Wording throughout marked as provisional pending 2027 booking-window confirmations.

**Fact Checker follow-up:** Verify 5 date-sensitive items once 2027 booking windows open: (1) BA STL–LHR season end vs. late-Sep/early-Oct 2027, (2) Lufthansa STL–FRA 2027 season, (3) United OPO–EWR and VCE US nonstops 2027 operation, (4) AA DFW–AKL and Qantas SYD–DFW for Nov 2027, (5) TAP ORD–LIS shoulder-season frequency.

### 2026-08-24T17:39:37.000-05:00: Day-detail polish — toggle removal, transit specification, pin-for-comparison removal, Commons thumbnail integration

**By:** Web Developer, requested by @cdaly33

**What:**

1. **Day details render expanded by default.** Removed the "Open day detail" toggle and "Open all days" button. Itinerary entries are now always-expanded; day titles remain buttons that sync map focus, with the active day marked via `aria-current` and an inset accent bar.

2. **Transit convention (`transit` field).** Day entries carry an optional `transit` string rendered as a "Getting there" row directly after "Main idea". Conventions: Day 0 / Day 1 states sample flight routing with layover gateways and total travel time from Logistics' corrected spec; arrival days state airport→base transfer (mode + time); intercity transfer days state mode + duration; return days state routing and anticipated hours. One to two lines each, labeled "Getting there".

3. **Pin-for-comparison removed.** Removed the comparison pinning feature entirely: the button, compare panel, compare map styling, `comparisonId` state, and associated rendering logic. Concept selection still closes the dropdown and re-fits the map.

4. **Commons thumbnail integration.** Merged 29 verified Wikimedia Commons thumbnails (provided by Scout) as `image` objects `{ url, alt, credit, width, height }` on 29 specific entries. Rendering: 150px fixed-width figure beside day text (stacks ≤759px), `loading="lazy"`, `decoding="async"`, and CC attribution captions. `validate-content.js` enforces the uniform key set; fixture hash regenerated.

**Why:** Chris requested expanded-by-default details, inline flight/transfer expectations, removal of unused comparison pinning, and visual entry anchors via day images. Keeping transit as a labeled field (not prose) maintains consistent presentation and validator coverage.

**Verification:** Validators passed (4 trips, 51 entries, 116 day links, 131 production URLs); coordinate validator passed; headless-Chrome smoke confirmed all entries expanded, 20/20 transit rows rendered, 29/29 thumbnails rendered with proper attributes, no toggle/pin UI remaining.

### 2026-08-24T19:55:38.791-05:00: Day-detail polish — bugfix pass (CSP + link rules)

**By:** Web Developer, requested by @cdaly33

**What:**

1. **CSP blocked day thumbnails.** The site's only Content-Security-Policy lives in `staticwebapp.config.json` `globalHeaders` (index.html has no meta CSP). `img-src` allowed `'self' data: https://tile.openstreetmap.org` but not the thumbnail origin, so browsers refused the 29 hotlinked Commons thumbnails. Added `https://upload.wikimedia.org` to `img-src`. Verified by serving the site locally with the production CSP header byte-for-byte (except test-only `frame-ancestors` relaxation for the iframe harness): all 29 thumbnails loaded.

2. **Full-width rules under planning links.** `.itinerary-list li` lacked a child combinator, so the day-entry `border-bottom` bled onto nested `.day-links li` items. Changed the three selectors to `.itinerary-list>li`, scoping separators to top-level day entries. Smoke test asserts 0/116 planning-link items ruled while day-entry separators remain 1px.

**Why:** The thumbnail integration introduced external Wikimedia Commons image origins and CSS descendant-selector bleed that affected nested links. CSP must allow new origins before the asset is deployed. Descendant selectors can collide with nested content — child combinators isolate styling to the intended layer.

**Verification:** `validate-content.js` passed (4 trips, 51 entries, 116 placements, 131 URLs); `validate-coordinates.js` passed; headless-Chrome smoke under production-equivalent CSP: 29/29 thumbnails load; all 51 entries expanded; no link rules; no toggle/pin UI.

## Governance

- Trip Lead records accepted scope and planning decisions here.
- Agents propose cross-team decisions in `.squad/decisions/inbox/`.
- Keep agent history focused on durable personal learnings; keep shared direction here.
- Append corrections or superseding decisions rather than rewriting prior decision meaning.
