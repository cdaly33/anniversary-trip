# Map Coordinate Audit

_Fact Checker audit: August 23, 2026. Verdict: **REJECT**._

## Method and thresholds

All 37 markers and all 31 segments were extracted from the `trips` data model in `site/app.js`; the deployed `app.js` contains the same Lake Como value. References were resolved with OpenStreetMap Nominatim using a descriptive User-Agent and requests spaced above one second. Distances are WGS84 great-circle (haversine) distances.

- **City or discrete landmark:** PASS at no more than 10 km from the named reference.
- **Broad region, valley, island, strait, lake, or sound:** PASS at no more than 25 km from a representative named-feature reference, with the representative nature disclosed.
- A coordinate can still FAIL inside the distance threshold if the data gives an unresolved choice a definite, unnamed point.
- Checks also covered sign and latitude/longitude swaps, zero/default coordinates, exact duplicates, unintended water placement, wrong country/region, combined alternatives, and endpoint integrity.

Nominatim is the coordinate source in every row. UNESCO independently corroborates the geographic scope of the [Alto Douro](https://whc.unesco.org/en/list/1046/), [Göreme/Cappadocia](https://whc.unesco.org/en/list/357/), and [Wachau](https://whc.unesco.org/en/list/970/) regional references.

## Complete marker audit

| Trip | ID / label | Role | Stored `[lat, lon]` | Verified reference `[lat, lon]` / source | Distance | Result | Notes |
|---|---|---:|---:|---|---:|---|---|
| Portugal | `lisbon` / Lisbon | base | `[38.7223, -9.1393]` | `[38.7077507, -9.1365919]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Lisbon%2C%20Portugal) | 1.63 km | PASS | Lisbon, Portugal. |
| Portugal | `sintra` / Sintra | excursion | `[38.8029, -9.3817]` | `[38.8355446, -9.3522371]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Sintra%2C%20Portugal) | 4.44 km | PASS | Within Sintra municipality. |
| Portugal | `porto` / Porto | base | `[41.1579, -8.6291]` | `[41.1502195, -8.6103497]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Porto%2C%20Portugal) | 1.79 km | PASS | Porto, Portugal. |
| Portugal | `douro` / Douro Valley | excursion | `[41.1621, -7.7898]` | `[41.1822538, -7.5357745]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Alto%20Douro%20Wine%20Region%2C%20Portugal) | 21.38 km | PASS | Broad cultural landscape; 25 km regional threshold. Representative point is in the Alto Douro wine region. |
| Portugal | `guimaraes` / Guimarães — alternative | alternative | `[41.4425, -8.2918]` | `[41.4417677, -8.2955712]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Guimar%C3%A3es%2C%20Portugal) | 0.32 km | PASS | Distinct alternative, not combined with Braga. |
| Portugal | `braga` / Braga — alternative | alternative | `[41.5454, -8.4265]` | `[41.5510583, -8.4280045]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Braga%2C%20Portugal) | 0.64 km | PASS | Distinct alternative, not combined with Guimarães. |
| Spain | `madrid` / Madrid | base | `[40.4168, -3.7038]` | `[40.4167820, -3.7035070]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Madrid%2C%20Spain) | 0.02 km | PASS | Madrid, Spain. |
| Spain | `toledo` / Toledo | excursion | `[39.8628, -4.0273]` | `[39.8558913, -4.0242650]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Toledo%2C%20Spain) | 0.81 km | PASS | Toledo, Spain. |
| Spain | `segovia` / Segovia — optional | alternative | `[40.9429, -4.1088]` | `[40.9481192, -4.1172101]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Segovia%2C%20Spain) | 0.91 km | PASS | Correctly represented as optional. |
| Spain | `seville` / Seville | base | `[37.3891, -5.9845]` | `[37.3886303, -5.9953403]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Seville%2C%20Spain) | 0.96 km | PASS | Seville, Spain. |
| Spain | `cordoba` / Córdoba | excursion | `[37.8882, -4.7794]` | `[37.8845813, -4.7760138]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=C%C3%B3rdoba%2C%20Spain) | 0.50 km | PASS | Córdoba, Spain. |
| Northern Italy + Croatia | `como` / Lake Como | base | `[45.9870, -9.2572]` | `[45.9917589, 9.2648810]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Lake%20Como%2C%20Italy) | **1,427.73 km** | **FAIL** | Longitude sign is wrong. Stored point is in the Atlantic west of France; verified Lake Como is in Italy at positive longitude. |
| Northern Italy + Croatia | `venice` / Venice | base | `[45.4408, 12.3155]` | `[45.4371908, 12.3345898]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Venice%2C%20Italy) | 1.54 km | PASS | Venice, Italy. |
| Northern Italy + Croatia | `rovinj` / Rovinj | base | `[45.0812, 13.6387]` | `[45.0807411, 13.6417282]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Rovinj%2C%20Croatia) | 0.24 km | PASS | Rovinj, Croatia. |
| Northern Italy + Croatia | `istria` / Istrian interior | excursion | `[45.2500, 13.8200]` | `[45.1934345, 13.9150536]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Istria%2C%20Croatia) | 9.75 km | PASS | Broad-region representative point; the eventual hill town remains unselected. |
| New Zealand + Australia | `queenstown` / Queenstown | base | `[-45.0312, 168.6626]` | `[-45.0321923, 168.6610000]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Queenstown%2C%20New%20Zealand) | 0.17 km | PASS | Queenstown, New Zealand. |
| New Zealand + Australia | `glenorchy` / Glenorchy area | excursion | `[-44.8504, 168.3880]` | `[-44.8497490, 168.3851983]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Glenorchy%2C%20Otago%2C%20New%20Zealand) | 0.23 km | PASS | Correct town-area representative. |
| New Zealand + Australia | `te-anau` / Te Anau | base | `[-45.4145, 167.7181]` | `[-45.4144900, 167.7174890]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Te%20Anau%2C%20New%20Zealand) | 0.05 km | PASS | Te Anau, New Zealand. |
| New Zealand + Australia | `milford` / Milford Sound | excursion | `[-44.6414, 167.8974]` | `[-44.6190189, 167.8687603]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Milford%20Sound%2C%20New%20Zealand) | 3.37 km | PASS | Within the named sound; intentional water feature. |
| New Zealand + Australia | `sydney` / Sydney | base | `[-33.8688, 151.2093]` | `[-33.8698439, 151.2082848]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Sydney%2C%20Australia) | 0.15 km | PASS | Sydney, Australia. |
| Türkiye | `istanbul` / Istanbul | base | `[41.0082, 28.9784]` | `[41.0063810, 28.9758715]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Istanbul%2C%20T%C3%BCrkiye) | 0.29 km | PASS | Istanbul, Türkiye. |
| Türkiye | `bosphorus` / Bosphorus | excursion | `[41.1040, 29.0550]` | `[41.1125268, 29.0718072]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Bosphorus%2C%20Istanbul%2C%20T%C3%BCrkiye) | 1.70 km | PASS | Representative point in the named strait; intentional water feature. |
| Türkiye | `cappadocia` / Cappadocia | base | `[38.6431, 34.8289]` | `[38.6386124, 34.8455184]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Cappadocia%2C%20T%C3%BCrkiye) | 1.53 km | PASS | Broad-region base point near Göreme. |
| Türkiye | `underground` / Underground city | excursion | `[38.3735, 34.7348]` | `[38.3735761, 34.7351222]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Derinkuyu%20Underground%20City%2C%20T%C3%BCrkiye) | 0.03 km | **FAIL** | Coordinate is specifically Derinkuyu, but neither the label nor approved itinerary selects Derinkuyu over Kaymaklı or another underground city. A generic unresolved choice is rendered as a definite landmark. |
| Türkiye | `valleys` / Cappadocia valleys | excursion | `[38.6550, 34.8400]` | `[38.6420890, 34.8296234]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=G%C3%B6reme%2C%20Nev%C5%9Fehir%2C%20T%C3%BCrkiye) | 1.70 km | PASS | Broad Göreme/Cappadocia landscape representative; not asserted as one named valley. |
| Austria + Slovenia | `ljubljana` / Ljubljana | base | `[46.0569, 14.5058]` | `[46.0500268, 14.5069289]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Ljubljana%2C%20Slovenia) | 0.77 km | PASS | Ljubljana, Slovenia. |
| Austria + Slovenia | `bled` / Lake Bled | excursion | `[46.3625, 14.0938]` | `[46.3639132, 14.0938069]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Lake%20Bled%2C%20Slovenia) | 0.16 km | PASS | Intentional lake point. |
| Austria + Slovenia | `bohinj` / Lake Bohinj | excursion | `[46.2867, 13.8630]` | `[46.2822654, 13.8645306]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Lake%20Bohinj%2C%20Slovenia) | 0.51 km | PASS | Intentional lake point. |
| Austria + Slovenia | `predjama` / Predjama | excursion | `[45.8158, 14.1274]` | `[45.8157344, 14.1265916]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Predjama%20Castle%2C%20Slovenia) | 0.06 km | PASS | Predjama Castle. |
| Austria + Slovenia | `vienna` / Vienna | base | `[48.2082, 16.3738]` | `[48.2083537, 16.3725042]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Vienna%2C%20Austria) | 0.10 km | PASS | Vienna, Austria. |
| Austria + Slovenia | `wachau` / Wachau | excursion | `[48.3890, 15.4500]` | `[48.3275518, 15.4116456]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Wachau%2C%20Austria) | 7.40 km | PASS | Broad Danube cultural-landscape representative. |
| Sicily + Malta | `ortigia` / Ortigia / Syracuse | base | `[37.0646, 15.2937]` | `[37.0606437, 15.2947166]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Ortigia%2C%20Syracuse%2C%20Italy) | 0.45 km | PASS | Ortigia is the historic island quarter of Syracuse; slash label is a nested place, not competing alternatives. |
| Sicily + Malta | `noto` / Noto | excursion | `[36.8918, 15.0702]` | `[36.8908864, 15.0706454]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Noto%2C%20Italy) | 0.11 km | PASS | Noto, Sicily. |
| Sicily + Malta | `etna` / Mount Etna | excursion | `[37.7510, 14.9934]` | `[37.7510251, 14.9940321]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Etna%20volcano%2C%20Sicily%2C%20Italy) | 0.06 km | PASS | Volcano summit reference. |
| Sicily + Malta | `valletta` / Valletta | base | `[35.8989, 14.5146]` | `[35.8989979, 14.5136607]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Valletta%2C%20Malta) | 0.09 km | PASS | Valletta, Malta. |
| Sicily + Malta | `mdina` / Mdina | excursion | `[35.8869, 14.4031]` | `[35.8858923, 14.4025288]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Mdina%2C%20Malta) | 0.12 km | PASS | Mdina, Malta. |
| Sicily + Malta | `gozo` / Gozo | excursion | `[36.0443, 14.2512]` | `[36.0467778, 14.2582565]` [OSM](https://nominatim.openstreetmap.org/ui/search.html?q=Gozo%2C%20Malta) | 0.69 km | PASS | Island representative point. |

## Segment endpoint and semantics audit

Every endpoint ID exists in its trip's marker set. No orphan endpoint, cross-trip endpoint, zero/default coordinate, exact coordinate duplicate, latitude/longitude swap, or combined Guimarães/Braga marker was found.

| Trip | Actual segments (`from → to: type`) | Result |
|---|---|---|
| Portugal | `lisbon → sintra: excursion`; `lisbon → porto: rail`; `porto → douro: excursion`; `porto → guimaraes: alternative`; `porto → braga: alternative` | PASS — bases, return excursions, and mutually exclusive alternatives are correct. |
| Spain | `madrid → toledo: excursion`; `madrid → segovia: alternative`; `madrid → seville: rail`; `seville → cordoba: excursion` | PASS — base and excursion semantics match the itinerary. |
| Northern Italy + Croatia | `como → venice: uncertain`; `venice → rovinj: uncertain`; `rovinj → istria: excursion` | **FAIL in rendered geography** — IDs and types are correct, but `como`'s bad longitude makes the first transfer originate in the Atlantic. |
| New Zealand + Australia | `queenstown → glenorchy: excursion`; `queenstown → te-anau: road`; `te-anau → milford: road-excursion`; `te-anau → queenstown: road`; `queenstown → sydney: flight` | PASS — the return to Queenstown before the trans-Tasman flight is explicit. |
| Türkiye | `istanbul → bosphorus: excursion`; `istanbul → cappadocia: flight`; `cappadocia → underground: excursion`; `cappadocia → valleys: excursion` | **FAIL for unresolved landmark semantics** — the `underground` endpoint silently means Derinkuyu although the itinerary does not select it. |
| Austria + Slovenia | `ljubljana → bled: excursion`; `ljubljana → bohinj: excursion`; `ljubljana → predjama: excursion`; `ljubljana → vienna: rail`; `vienna → wachau: excursion` | PASS — base/excursion semantics remain correct. |
| Sicily + Malta | `ortigia → noto: excursion`; `ortigia → etna: excursion`; `ortigia → valletta: uncertain`; `valletta → mdina: excursion`; `valletta → gozo: excursion` | PASS — unresolved island transfer remains explicitly uncertain. |

## Lake Como root cause

The source data stores Lake Como as `lat: 45.987, lng: -9.2572`. The verified longitude is east, approximately `+9.2649`; the source has a longitude-sign error, not a latitude/longitude ordering error.

Rendering does no correction or geocoding. `addTripRoute()` passes each stop directly to Leaflet as `[stop.lat, stop.lng]` for bounds, the marker, and both segment endpoints. Leaflet therefore correctly interprets `-9.2572` as 9.2572° west, plots the marker in the Atlantic, expands the fitted route bounds to include it, and draws the `como → venice` polyline from that wrong point. The screenshot is the exact deterministic result of the stored negative longitude.

## Totals, failures, and required independent revision

- **Markers audited:** 37 of 37
- **Segments audited:** 31 of 31
- **Marker PASS:** 35
- **Marker FAIL:** 2
- **Blocking failures:** Lake Como longitude sign; unnamed “Underground city” silently fixed to Derinkuyu
- **Verdict:** **REJECT**

**Independent revision agent: Web Developer.** Visual Designer is locked out of this revision cycle.

Required changes and tests:

1. Change only Lake Como's longitude from `-9.2572` to a verified positive-longitude Lake Como coordinate (recommended minimal correction: `9.2572`, which is within 1 km of the OSM named-lake reference).
2. Do not silently preserve a specific underground-city point under a generic label. Either:
   - formally select Derinkuyu in the itinerary and label the marker `Derinkuyu Underground City`, retaining the verified coordinate; or
   - remove the marker and its segment until an underground city is selected.
3. Add an automated data test that enumerates every stop, rejects non-finite/out-of-range/zero-default coordinates and exact duplicates, confirms every segment endpoint exists, and checks all fixed city/landmark coordinates against an approved reference fixture with the 10 km threshold (25 km only for explicitly tagged broad regions/natural areas).
4. Add regression assertions that Lake Como has positive longitude and is within 10 km of the approved Lake Como reference, and that no generic unresolved underground-city marker has a definite coordinate.
5. Render Northern Italy + Croatia and confirm the fitted bounds and `como → venice` segment remain in northern Italy/Croatia; rerun the complete 37-marker audit, not a spot check.
