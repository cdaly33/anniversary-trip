# Destination Guide Link-Check Report — Revised Publishable Site Refresh

_Checked August 23, 2026 against `14-publishable-site-refresh.md` after independent rejection remediation._

## Complete extraction result

- **131 unique active Markdown link destinations** extracted. The eight rejected addresses remain only as non-clickable code literals in the remediation history and are excluded from the active-link count.
- **Final HTTP results:** **123 × 200**, **8 × 206** byte-range image responses, **0 unresolved 4xx/5xx**, **0 timeouts after secondary retrieval**, **0 captcha/login/challenge pages**.
- **Redirects:** **12**, all benign canonical/domain/path updates to relevant intended content.
- **Content relevance:** **131/131** active destinations support their adjacent limited claim, image/license record, cost methodology, currency series, or general booking guidance.
- The three FRED pages timed out in the concurrent bulk pass but each returned its intended series through a separate direct retrieval. Six Wikimedia assets returned 429 during the concurrent pass; all eight approved assets then returned **206** with valid byte ranges when retried sequentially. This matches ordinary bulk-rate limiting rather than a missing asset.

## Eight required dispositions

| # | Rejected destination | Revised disposition |
|---:|---|---|
| 1 | Malpensa generic `/en/from-to` redirect | Replaced with official `/en/from-to/by-train`; train content confirmed. |
| 2 | Empty Pula destination list | Replaced with official flight timetable; PUY explicitly remains an unverified exact-date booking candidate. |
| 3 | Prado 403 | Replaced with Madrid official-tourism Prado page. |
| 4 | Tourism New Zealand Glenorchy 403 | Replaced with Queenstown official-tourism Glenorchy page. |
| 5 | Tourism New Zealand Milford Sound 403 | Removed; DOC Fiordland and Fiordland tourism already support the day. |
| 6 | QLDC recreation captcha | Removed; Queenstown tourism and Kiwi Park already support the day. |
| 7 | Venice Airport destinations 403 | Replaced with stable Wikipedia background supporting VCE only as a general gateway candidate. |
| 8 | Venice Airport transport 403 | Replaced with accessible Visit Venezia airport-to-city transport guidance. |

Fresh complete-check challenges on the previously accepted Lisbon Airport, Porto Airport, and Venezia Unica pages were also replaced with Lisbon Metro, Metro do Porto, and Visit Venezia respectively.

## Full active-link results

| HTTP | Requested URL | Final URL when redirected | HTML language | Relevance/result |
|---:|---|---|---|---|
| 200 | `https://actv.avmspa.it/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://adriatic-lines.com/schedule` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://airport-pula.hr/en/flight-info/flight-timetable/` | `—` | en-US | Official Pula flight timetable; supports booking-time verification, not a future-route promise. |
| 200 | `https://alcazarsevilla.org/` | `—` | es | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://australian.museum/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://carezzonico.visitmuve.it/en/home/` | `https://carezzonico.visitmuve.it/en/` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://castelodesaojorge.pt/en/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Douro_Valley,_Portugal_%2853975017619%29.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:JardinLasDamas_Alcazar_Seville.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Milford_Sound_in_Fiordland_National_Park_01.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Palacio_Nacional_da_Pena,_Sintra,_Portugal,_2019-05-25,_DD_131.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Queenstown_Bay_Lake_Wakatipu_01.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://commons.wikimedia.org/wiki/File:Sunset_in_old_town_Rovinj_%288093140959%29.jpg` | `—` | en | Approved image file/license page; intended file confirmed. |
| 200 | `https://creativecommons.org/licenses/by-sa/4.0/` | `—` | en | License deed supporting the adjacent image credit. |
| 200 | `https://creativecommons.org/licenses/by/2.0/` | `—` | en | License deed supporting the adjacent image credit. |
| 200 | `https://en.metrodoporto.pt/pages/396` | `—` | pt-PT | Official Metro do Porto maps/timetables; proactive replacement after fresh challenge response. |
| 200 | `https://en.wikipedia.org/wiki/Venice_Marco_Polo_Airport` | `—` | en | Stable general background for VCE as an international gateway; no 2027 schedule claim. |
| 200 | `https://fondoambiente.it/luoghi/villa-del-balbianello?lang=en` | `—` | it | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://fred.stlouisfed.org/series/DEXUSAL` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://fred.stlouisfed.org/series/DEXUSEU` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://fred.stlouisfed.org/series/DEXUSNZ` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://gulbenkian.pt/museu/en/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://ich.unesco.org/en/RL/flamenco-00363` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601` | `—` | en-AU | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://lakecomo.is/en/` | `https://www.lakecomo.is/en/` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://mezquita-catedraldecordoba.es/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://mhnsw.au/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://museodelbaileflamenco.com/en/` | `https://museodelbaileflamenco.com/en/authentic-flamenco-seville/` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://museovetro.visitmuve.it/en/home/` | `—` | it-IT | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://palaciodabolsa.com/en/` | `https://palaciodabolsa.com/en/intro/` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://palazzoducale.visitmuve.it/en/home/` | `https://palazzoducale.visitmuve.it/en/` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://triesteairport.it/en/airport/flights-and-destinations/direct-flights/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://turismo.toledo.es/` | `—` | es | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/1/1a/Douro_Valley%2C_Portugal_%2853975017619%29.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/3/34/Queenstown_Bay_Lake_Wakatipu_01.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/3/37/Sunset_in_old_town_Rovinj_%288093140959%29.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/4/43/Palacio_Nacional_da_Pena%2C_Sintra%2C_Portugal%2C_2019-05-25%2C_DD_131.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/6/66/Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/8/86/JardinLasDamas_Alcazar_Seville.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/d/da/Milford_Sound_in_Fiordland_National_Park_01.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 206 | `https://upload.wikimedia.org/wikipedia/commons/e/e5/Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg` | `—` | n/a | Exact approved image asset; byte-range retrieval confirmed. |
| 200 | `https://visitasevilla.es/en/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://visitporto.travel/en-GB` | `—` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/1031/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/1046/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/1590/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/166/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/263/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/313/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/361/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/379/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/383/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://whc.unesco.org/en/list/755/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.aena.es/en/adolfo-suarez-madrid-barajas/airlines-and-destinations/airport-destinations.html` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.aena.es/en/adolfo-suarez-madrid-barajas/getting-there/trains.html` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.aena.es/en/sevilla/airlines-and-destinations/airport-destinations.html` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.aena.es/en/sevilla/getting-there/bus.html` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.airnewzealand.com/interactive-map` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.alcazardesegovia.com/` | `—` | es | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.ami-pula.hr/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.arrowtown.com/` | `—` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.artgallery.nsw.gov.au/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.basilicasanmarco.it/?lang=en` | `—` | it-IT | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.batana.org/en/` | `—` | not declared | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.botanicgardens.org.au/royal-botanic-garden-sydney` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/about` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/australia/sydney` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/croatia` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/italy/como` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/italy/venice` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/new-zealand/queenstown` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/new-zealand/te-anau` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/portugal/lisbon` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/portugal/porto` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/spain/madrid` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.budgetyourtrip.com/spain/seville` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.catedraldesevilla.es/` | `—` | es-ES | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.catedralprimada.es/en/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/` | `—` | en-nz | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/` | `—` | en-nz | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.esmadrid.com/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.esmadrid.com/en/tourist-information/museo-del-prado` | `—` | en | Madrid official-tourism Prado overview; supports the limited museum option. |
| 200 | `https://www.esmadrid.com/en/tourist-information/plaza-mayor-madrid` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.fiordland.org.nz/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.flystl.com/business/commercial-development/passenger-air-service-development/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.fundacionmedinaceli.org/monumentos/pilatos/` | `https://fundacionmedinaceli.org/monumentos/casa-de-pilatos/` | es-ES | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.immigration.govt.nz/new-zealand-visas/visas/visa/nzeta` | `https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.istra.hr/en/destinations/motovun` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.istra.hr/en/destinations/rovinj` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.istra.hr/en/experience/gourmet` | `https://www.istra.hr/en/gourmet` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.journeys.nzta.govt.nz/journey-planner` | `—` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.kiwipark.co.nz/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.lasduenas.es/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.lisboastorycentre.pt/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.metrolisboa.pt/en/` | `—` | en-US | Official Lisbon Metro source; proactive replacement after fresh challenge response. |
| 200 | `https://www.milanomalpensa-airport.com/en/from-to/by-train` | `—` | en | Official Malpensa train-access guidance; intended content confirmed. |
| 200 | `https://www.museosetacomo.com/` | `—` | IT | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.museudofado.pt/en` | `—` | not declared | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.museumqueenstown.com/` | `https://www.lakesdistrictmuseum.nz/` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.museusemonumentos.pt/en/museus-e-monumentos/national-tile-museum` | `—` | pt | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.navigazionelaghi.it/en/` | `—` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.np-brijuni.hr/en` | `https://np-brijuni.hr/en` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.parquesdesintra.pt/en/parks-monuments/park-and-national-palace-of-pena/` | `—` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.parquesdesintra.pt/en/parks-monuments/park-and-palace-of-monserrate/` | `—` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.parquesdesintra.pt/en/plan-your-visit/tickets-palace-of-pena/` | `—` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.patrimonionacional.es/en/visita/royal-palace-madrid` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.pulainfo.hr/` | `https://pulainfo.hr/` | en-US | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.qantas.com/en-us/where-we-fly/international-flight-routes` | `—` | not declared | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.queenstownairport.co.nz/flights/destinations/international-destinations/` | `—` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.queenstownairport.co.nz/parking-transport/transport-options` | `—` | en-NZ | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.queenstownnz.co.nz/` | `—` | en-us | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.queenstownnz.co.nz/plan/surrounding-region/glenorchy/` | `—` | en | Official Queenstown tourism Glenorchy page; scenery and selective activities confirmed. |
| 200 | `https://www.rovinj-tourism.com/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.serralves.pt/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.sydney.com/` | `—` | en-AU | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.sydney.com/things-to-do/nature-and-parks/walks/bondi-to-coogee-coastal-walk` | `—` | en-AU | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.sydneyairport.com.au/info-sheet/transport-options` | `—` | not declared | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.sydneyoperahouse.com/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.turismodecordoba.org/` | `—` | es | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.turismodesegovia.com/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.villacarlotta.it/en/` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.villamonastero.eu/en/` | `https://www.villamonastero.eu/en/home_en/` | en-GB | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.visitcascais.com/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.visitguimaraes.travel/` | `—` | pt-PT | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.visitlisboa.com/en` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.visitportugal.com/en/content/douro-valley` | `—` | en | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
| 200 | `https://www.visitvenezia.eu/en` | `—` | en | Venice destination context; proactive replacement after fresh challenge response. |
| 200 | `https://www.visitvenezia.eu/en/venetianity/walk-venice/all-the-way-to-get-from-marco-polo-airport-to-venice` | `—` | en | Visit Venezia airport-to-city page; bus, water-bus, taxi and transfer content confirmed. |
| 200 | `https://www.zagreb-airport.hr/en/passengers/flight-information/airlines/66` | `—` | not declared | Relevant; unchanged source mapping retained from the authoritative verification and destination revalidated. |
