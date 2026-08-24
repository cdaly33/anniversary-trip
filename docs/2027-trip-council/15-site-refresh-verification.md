# Site Refresh Publication-Gate Verification

_Fact Checker review, August 23, 2026. Reviewed artifact: `14-publishable-site-refresh.md`. This is a publication gate, not booking approval._

## Verdict: **REJECT**

The specification is internally consistent on scope, status, calendars, costs, images, and approved map geography. It cannot yet pass publication because **8 distinct selected reference URLs fail the required empirical link gate**: five return access-denied responses, one redirects to a bot challenge, one official airport page contains no destination list, and one generic airport-transport URL redirects to a car-only page that does not support the broader adjacent claim.

Under the Reviewer Rejection Protocol, **Trip Lead is locked out of revising this rejected specification**. The eligible independent revision agent is **Destination Guide**. Fact Checker must re-run the complete URL gate after revision.

## Audit totals

| Verification area | Checked | Result |
|---|---:|---|
| Publication concepts | 7 total: 4 retained, 3 removed | **7/7 pass** |
| Status/verdict records | 4 | **4/4 pass** |
| Flight-pattern sections | 4 patterns; 16 unique cited URLs | Claims pass; **3 cited URLs block publication** |
| Displayed calendar/night structures | 4 | **4/4 pass** |
| Day-level links | 124 placements; 98 unique URLs | **91/98 verified; 7/98 block publication** |
| Whole-trip SWAGs | 4 | **4/4 pass** |
| Hotel bands | 10 | **10/10 pass** |
| Selected images | 8 source/asset pairs | **8/8 pass** |
| Retained map data covered by approved audit | 20 markers; 17 segments | **20/20 markers and 17/17 segments pass** |
| Distinct blocking URLs across all sections | 8 | **8 require correction or replacement** |

## 1. Scope and controlling verdict matrix

| Item | Expected | Published specification | Result |
|---|---|---|---|
| Retained | Portugal; Spain; Northern Italy + Croatia; New Zealand + Australia | Exact match | ✅ |
| Removed | Türkiye; Austria + Slovenia; Sicily + Malta | Exact match, including stale-data purge requirement | ✅ |
| Portugal | Conditional strongest comfort/value candidate, not selected/booked | “Provisional leading fit,” with explicit dependencies | ✅ |
| Spain | Strongest challenger, not selected winner | Exact meaning preserved | ✅ |
| Northern Italy + Croatia | Conditional; not approved unchanged | “Conditional on routing,” with failure conditions retained | ✅ |
| New Zealand + Australia | Structurally rejected as a recommendation under 14 days | “Highest burden · not recommended in this shape” | ✅ |

The wording remains faithful to `08-final-verification.md`, `09-site-refresh-scope.md`, and `.squad/decisions.md`. Inclusion of New Zealand + Australia is not presented as endorsement.

## 2. Flight and calendar verification matrix

| Concept | Pattern and inference check | Calendar/night arithmetic | Citation result |
|---|---|---|---|
| Portugal | Open-jaw LIS/OPO, normally one connection with a possible two-connection OPO return, is clearly an expected pattern rather than a 2027 promise. London/Frankfurt are conditional examples. | Travel Day 0 + Days 1–11 = 12 displayed dates; 5 Lisbon + 5 Porto nights = 10. | ⚠️ Pattern supported; all 3 flight-section URLs resolve and are relevant. |
| Spain | One connection to MAD and commonly two from SVQ are labeled planning norms. The MAD positioning-night consequence is disclosed rather than hidden. | Travel Day 0 + Days 1–11 = 12 displayed dates; 5 Madrid + 5 Seville nights = 10 unless the disclosed MAD night is added. | ⚠️ Pattern supported; all 3 flight-section URLs resolve and are relevant. |
| Northern Italy + Croatia | MXP inbound and unresolved PUY/TRS/VCE/ZAG egress are appropriately conditional. Seasonal Venice–Rovinj service is not extrapolated to 2027. | Travel Day 0 + Days 1–12 = 13 displayed dates; 4 Como + 3 Venice + 4 Rovinj nights = 11. Any gateway night is correctly treated as a shape-changing failure. | ❌ Three source defects: Malpensa redirects to car-only information; Pula’s list is empty; Venice destinations returns 403. |
| New Zealand + Australia | STL–gateway–AKL–ZQN and ZQN–SYD are presented as present-network inferences. Queenstown Airport presently identifies Sydney; no 2027 operation is promised. | Days 1–14 honestly consume two outbound dates; 4 Queenstown + 3 Te Anau + 4 Sydney nights = 11. Same-date westbound return is accurately qualified. | ✅ All 4 flight-section URLs resolve and support the pattern. |

Official STL releases dated October 1, 2025 and June 1, 2026 support seasonal STL–LHR and STL–FRA service as current examples. The specification correctly avoids promising either service for 2027. Elapsed-time bands are labeled planning allowances and are plausible for the stated connection counts; they are not represented as timetable results.

## 3. Day-level link verification matrix

Every `Links:` entry was requested directly with redirects enabled and checked for destination relevance. Repeated links were counted once in the unique total.

### Portugal

| Displayed entry | Result |
|---|---|
| Travel Day 0 | ✅ STL air-service source resolves. |
| Days 1–3 | ✅ Arrival, Lisbon, Sintra, ticketing, and Monserrate sources resolve to the intended resources. |
| Day 4 | ✅ Tile Museum and UNESCO Belém sources support the adjacent ideas. The Tile Museum page renders English but declares Portuguese HTML metadata. |
| Days 5–8 | ✅ Évora, Cascais, Gulbenkian, Porto, Bolsa, Douro, UNESCO, and Serralves sources resolve and are relevant. |
| Day 9 | ✅ Guimarães and UNESCO sources resolve. The Guimarães portal defaults to Portuguese. |
| Days 10–11 | ✅ Porto/Serralves and airport/STL sources resolve and are relevant. |

**Portugal result: 12/12 displayed entries pass.**

### Spain

| Displayed entry | Result |
|---|---|
| Travel Day 0–Day 1 | ✅ STL, Madrid tourism, Plaza Mayor, and airport rail sources resolve. |
| Day 2 | ❌ Royal Palace resolves; the selected Prado URL returns HTTP 403 to two independent fetch methods. |
| Days 3–6 | ✅ Madrid, Toledo, Segovia, Alcázar, and Seville resources resolve and support the itinerary. |
| Days 7–10 | ✅ Monument, UNESCO, museum, and tourism resources resolve and are relevant. Several official sites default to Spanish; see language flags below. |
| Day 11 | ✅ SVQ destination/bus and MAD destination sources resolve and support the conditional departure discussion. |

**Spain result: 11/12 displayed entries pass; Day 2 blocks publication.**

### Northern Italy + Croatia

| Displayed entry | Result |
|---|---|
| Travel Day 0 | ✅ STL source resolves. |
| Day 1 | ❌ `.../en/from-to` redirects to `.../by-car`; it does not support the implied general airport-to-lake transport choice. |
| Days 2–7 | ✅ Lake, ferry, villa, Venice transit, museum, palace, and basilica sources resolve and are relevant. Some English URLs declare Italian page metadata. |
| Days 8–11 | ✅ Adriatic Lines currently displays a dated 2026 Rovinj–Venice schedule and does not support a 2027 promise; Rovinj/Istria/Pula/Brijuni sources resolve. |
| Day 12 | ❌ Pula’s official “Flight & destination list” says only “The list is coming soon.” Venice Airport transport returns HTTP 403. Trieste and Zagreb sources resolve. |

**Northern Italy + Croatia result: 11/13 displayed entries pass; Days 1 and 12 block publication.**

### New Zealand + Australia

| Displayed entry | Result |
|---|---|
| Days 1–3 | ✅ Air New Zealand, STL, Queenstown Airport, and Queenstown tourism sources resolve. |
| Day 4 | ❌ Queenstown tourism and Kiwi Park resolve; the QLDC recreation URL redirects to a Radware captcha instead of the intended resource. |
| Day 5 | ❌ DOC Otago resolves; the Tourism New Zealand Glenorchy URL returns HTTP 403. |
| Days 6–7 | ✅ Queenstown, Arrowtown, museum, Fiordland, DOC, and NZTA sources resolve. The old museum domain benignly redirects to the current Lakes District Museum domain. |
| Day 8 | ❌ DOC and Fiordland tourism resolve; the Tourism New Zealand Milford Sound URL returns HTTP 403. |
| Days 9–14 | ✅ Fiordland, airport, NZTA, Sydney, UNESCO, museum, gallery, garden, Qantas, and airport-transport sources resolve and support the adjacent ideas. |

**New Zealand + Australia result: 11/14 displayed entries pass; Days 4, 5, and 8 block publication.**

### Redirect and language findings

- **17 redirects observed:** 15 are benign canonical/domain/path updates; the Malpensa car-only redirect and QLDC captcha redirect are blocking.
- Benign updates include Ca’ Rezzonico `/home/` → `/en/`, Lake Como → `www`, Palácio da Bolsa → `/intro/`, Doge’s Palace `/home/` → `/en/`, Casa de Pilatos to its renamed path, NZeTA to its current canonical path, Istria gourmet to `/en/gourmet`, the Lakes District Museum domain change, and minor canonical slash/host changes.
- **Language/metadata flags:** Real Alcázar, Toledo tourism, Alcázar of Segovia, Seville Cathedral, Casa de Pilatos, Córdoba tourism, Villa del Balbianello, St Mark’s Basilica, Glass Museum, Silk Museum, National Tile Museum, and Visit Guimarães expose Spanish/Italian/Portuguese content or non-English HTML language metadata. They are relevant official resources, not wrong-region links, but English alternatives or visible language labels would improve usability.
- No wrong-country or wrong-region destination was found.

## 4. Image-rights verification matrix

Wikimedia Commons `imageinfo` and `extmetadata` were queried for all eight exact file titles. Each file exists, the recorded direct asset matches the API’s original asset URL, and the creator/license pair matches current Commons metadata. CC BY and CC BY-SA permit downloading and self-hosting with attribution; share-alike and modification-notice obligations remain applicable. Bulk direct-asset requests were rate-limited with HTTP 429, but the Commons API confirmed every original asset and license record.

| Image | Creator | License | Pairing / attribution / alt text | Result |
|---|---|---|---|---|
| Pena Palace | Diego Delso | CC BY-SA 4.0 | Exact file and asset; complete credit and meaningful alt | ✅ |
| Douro Valley | flowcomm | CC BY 2.0 | Exact Flickr-derived Commons file and asset; complete credit and meaningful alt | ✅ |
| Alcázar of Segovia | Rafa Esteve | CC BY-SA 4.0 | Exact file and asset; complete credit and meaningful alt | ✅ |
| Real Alcázar gardens | Martinvl | CC BY-SA 4.0 | Exact file and asset; complete credit and meaningful alt | ✅ |
| Canaletto, Piazza San Marco | Canaletto | Public domain | Exact Google Art Project asset; historical-artwork label required and present | ✅ |
| Rovinj sunset | Valerii Tkachenko | CC BY 2.0 | Exact Flickr-derived Commons file and asset; complete credit and meaningful alt | ✅ |
| Queenstown Bay | Krzysztof Golik | CC BY-SA 4.0 | Exact file and asset; complete credit and meaningful alt | ✅ |
| Milford Sound | Krzysztof Golik | CC BY-SA 4.0 | Exact file and asset; complete credit and meaningful alt | ✅ |

The excluded Villa del Balbianello candidate remains correctly excluded. No uncertain-copyright image is approved.

## 5. Cost verification matrix

All values exactly match `13-high-level-cost-overview.md`. The specification repeatedly labels them broad 2027 USD SWAGs, not quotes, and discloses inclusions, exclusions, uncertainty, hotel-night assumptions, and confidence. Budget Your Trip states that its figures aggregate traveler submissions and travel-industry pricing through statistical models; FRED provides the cited daily USD/EUR, USD/NZD, and USD/AUD series. Those sources support broad order-of-magnitude comparison, not exact 2027 pricing, which is how the ranges are used.

| Concept | Whole-trip SWAG | Hotel bands checked | Method/result |
|---|---:|---|---|
| Portugal | $7,500–$10,500 | Lisbon $180–$300; Porto $160–$270 | ✅ Exact Value-report match; rounded, lower-pressure range |
| Spain | $8,000–$11,000 | Madrid $190–$310; Seville $170–$280 | ✅ Exact match; event and return-gateway uncertainty disclosed |
| Northern Italy + Croatia | $10,500–$15,000 | Como $250–$420; Venice $240–$400; Rovinj $180–$310 | ✅ Exact match; transfer uncertainty widens range |
| New Zealand + Australia | $14,000–$20,000 | Queenstown $230–$380; Te Anau $170–$290; Sydney $230–$390 | ✅ Exact match; airfare, two currencies, and complex transport justify lowest confidence |

No itemized pseudo-quote or false-cent/dollar precision is introduced.

## 6. Map/coordinate consistency

The refresh does not publish new coordinates. Its retained route geography matches the approved revision-cycle audit:

| Concept | Audited retained markers | Audited retained segments | Result |
|---|---:|---:|---|
| Portugal | 6 | 5 | ✅ |
| Spain | 5 | 4 | ✅ |
| Northern Italy + Croatia | 4 | 3 | ✅ Lake Como remains positive-east in the approved data |
| New Zealand + Australia | 5 | 5 | ✅ |

Day-only alternatives such as Évora, Cascais, Motovun/Grožnjan, Pula, and Brijuni are not assigned coordinates in the specification. They must not be silently promoted to map markers without a new coordinate audit.

## Blocking fixes required

**Revision agent: Destination Guide. Trip Lead may not perform this revision.**

1. Replace the Malpensa generic transport URL with claim-specific official pages. The verified train page is `https://www.milanomalpensa-airport.com/en/from-to/by-train`; add a separate road-transfer source only if road transfer is claimed.
2. Replace or remove the empty Pula destination-list page. Use a populated, date-stamped official timetable/route source; if none is available, retain PUY only as an explicitly unverified booking-time candidate, not as a sourced current-network option.
3. Replace the inaccessible Prado URL with the verified English Madrid tourism page: `https://www.esmadrid.com/en/tourist-information/museo-del-prado`.
4. Replace Tourism New Zealand’s blocked Glenorchy URL with the verified official Queenstown page: `https://www.queenstownnz.co.nz/plan/surrounding-region/glenorchy/`.
5. Remove the blocked Tourism New Zealand Milford URL; the already selected DOC Fiordland and Fiordland tourism pages adequately support the day.
6. Remove the QLDC recreation URL unless a stable non-captcha page is found; Queenstown tourism and Kiwi Park already support Day 4.
7. Replace both Venice Airport URLs with stable, independently retrievable sources for current VCE destinations and ground transport, or omit VCE-specific network claims until the official pages can be verified.
8. Re-run all 133 unique URLs after revision, recording final destination, HTTP result, language, and content relevance. Do not treat anti-bot pages as successful resolutions.

Publication remains blocked until these fixes pass a fresh Fact Checker review.

---

## Revision-cycle re-review — **APPROVE**

_Fact Checker re-review, August 23, 2026. Reviewed the Destination Guide revision of `14-publishable-site-refresh.md` and the complete results in `16-destination-guide-link-check.md` against reports 10–13._

All **8/8** rejection blockers are correctly remediated without expanding the supported claims:

1. Malpensa now cites the official train page and claims train access only.
2. PUY now cites the official timetable and is explicitly an unverified exact-date booking candidate.
3. Prado now cites the accessible Madrid official-tourism museum page.
4. Glenorchy now cites the Queenstown official-tourism page.
5. The blocked Milford Sound URL is removed; the existing DOC and Fiordland sources support the limited day description.
6. The QLDC captcha URL is removed; no unsupported recreation claim replaces it.
7. VCE is now only a general gateway candidate; no current-route or 2027-service claim is inferred from the background source.
8. Visit Venezia supports the stated airport-to-city transport modes.

Independent extraction confirmed **131 unique active links** and no rejected address remains clickable. A full concurrent recheck returned **120 HTTP 200**, **3 transient bulk-client 403 responses**, and **8 Wikimedia rate-limit 429 responses**. The three 403 pages—Lake Como, Toledo Cathedral, and Villa Monastero—each resolved to relevant intended content through independent retrieval, with no captcha, empty page, or misdirection. The Destination Guide’s clean sequential run recorded **123 × 200 + 8 × 206**, and the Commons API independently reconfirmed all **8/8** exact original asset URLs, creators, and licenses: **5 CC BY-SA 4.0, 2 CC BY 2.0, and 1 public-domain work**.

Scope, status hierarchy, flight uncertainty, elapsed-time bands, calendar/night arithmetic, itinerary structure, cost ranges and hotel bands remain faithful to reports 10–13. The retained/removed count remains **4/3**; map coverage remains the previously approved **20 markers / 17 segments** with no new coordinates; and 2027 schedules, prices, availability, entry rules, and licenses remain explicitly provisional or subject to recheck.

**Residual caveats:** automated bulk retrieval can trigger destination-site WAF responses and Wikimedia rate limiting; several official pages retain non-English metadata. These are retrieval/usability cautions, not unsupported claims or publication blockers. Publication approval is not booking approval.
