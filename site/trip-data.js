(function (root, factory) {
  const data = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else root.ANNIVERSARY_TRIPS = data;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const L = (label, url, language) => ({ label, url, language });
  const D = (label, title, main, companion, fit, pace, fallback, stops, links, kind = "day", transit = "", image = null) => ({
    label, title, main, companion, fit, pace, fallback, stops: Array.isArray(stops) ? stops : [stops], links, kind, transit, image
  });
  const I = (url, alt, credit, width, height) => ({ url, alt, credit, width, height });

  return [
    {
      id: "northern-italy",
      order: 2,
      name: "Northern Italy",
      short: "Venice → Cinque Terre → Lake Como",
      status: "Focused Italy concept",
      statusDetail: "An all-Italy anniversary route built around Venice, Cinque Terre's sea-and-villages middle act, and a polished Lake Como finish, keeping the clean open-jaw logic without a cross-border move or internal flight.",
      days: 12,
      calendarEntries: 13,
      nights: 11,
      bases: 3,
      transfers: 2,
      timing: "September 2027",
      shape: "Travel Day 0 + Days 1–12 · Venice 4 nights + Cinque Terre 3 + Lake Como 4",
      route: "Venice (4 nights) → Cinque Terre (3 nights) → Lake Como (4 nights)",
      why: "It keeps the clean open-jaw Italy logic, swaps the hardest mountain segment for a sea-and-villages middle act, and still ends with Lake Como's villas, ferries, and anniversary-friendly polish.",
      question: "Do Cinque Terre's steep lanes, possible trail closures, and two substantial rail-transfer days still feel relaxed enough for an anniversary trip once exact 2027 schedules and base choices are verified?",
      repair: "Keep Venice to one clear landmark day plus one lagoon choice, use train-and-boat village hopping in Cinque Terre instead of forcing longer hikes, and protect the final Como days for villas, a boat experience, and recovery rather than more transfers.",
      mobility: {
        hardest: "Venice bridges and cobbles, Cinque Terre station stairs and uneven coastal paths, and Lake Como ferry boarding plus villa-garden walking.",
        walking: "Moderate overall; more forgiving than the Dolomites version, but still best with selective pacing on transfer days and in Cinque Terre's steeper villages.",
        lower: "Keep Venice to one major interior day, use train or boat village-hopping instead of longer Cinque Terre hikes, limit Como to one villa if needed, and favor seated water views over extra climbs.",
        recovery: "Arrival day plus both rail-transfer days stay intentionally light, and Day 11 protects a full Lake Como flex day."
      },
      responsible: "Use rail wherever practical, favor timed entry at Venice and villa sites, choose resident-aware lagoon and Cinque Terre operators, and avoid turning fragile village-and-coast areas into a checklist of viewpoints.",
      flight: {
        summary: "Expected pattern — open jaw via Frankfurt: STL–FRA–VCE outbound and MXP–FRA–STL return, with one Europe connection each way and no internal flights.",
        detail: "Current planning assumes Lufthansa-oriented routing through Frankfurt, with rail transfers inside Italy and a Milan-area return gateway. Exact September 2027 schedules, seasonal STL–FRA operation, protected-ticket status, and the final Venice/Milan airport pairing still require verification.",
        burden: "One transatlantic connection each way plus two substantial rail transfers; materially simpler than adding Croatia or an internal flight.",
        links: [
          L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm"),
          L("Venice Marco Polo Airport", "https://www.veneziaairport.it/en/"),
          L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train")
        ]
      },
      cost: {
        range: "$7,600–$9,900",
        hotels: "Venice $220–$320/night · Cinque Terre villages $190–$280/night or Levanto/La Spezia $140–$210/night · Lake Como $220–$330/night",
        buys: "Open-jaw airfare about $2,500–$3,200 total, main Venice/Cinque Terre/Lake Como rail about €130–€210 total for two if booked ahead, plus local trains or ferries and one celebratory Lake Como boat experience.",
        pressure: "Moderate: Venice and Como demand, Cinque Terre base choice, open-jaw airfare, and the exact mix of local train, ferry, and villa-day splurges.",
        confidence: "Medium",
        verdict: "Good value if you treat Cinque Terre pragmatically, but it stops looking cheap once Venice, a classic Como splurge, and prime-village lodging all stack together."
      },
      images: [
        { file: "assets/images/italy-venice-canaletto.webp", alt: "Canaletto painting of a busy eighteenth-century Piazza San Marco beneath a bright sky.", credit: "Canaletto, The Piazza San Marco in Venice, public domain, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", license: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", note: "Historical artwork, not a present-day view. Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." },
        { file: "assets/images/italy-cinque-terre-manarola.webp", alt: "Colorful houses of Manarola stacked above the Ligurian Sea in Cinque Terre beneath a blue sky.", credit: "Manarola, Cinque Terre, Timothy A. Gonsalves, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Manarola_NW_Cinque_Terre_Sep23_A7C_07233.jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." }
      ],
      stops: [
        { id: "venice", name: "Venice", lat: 45.4372, lng: 12.3346, role: "base" },
        { id: "murano", name: "Murano", lat: 45.4581, lng: 12.3566, role: "excursion" },
        { id: "burano", name: "Burano — alternative", lat: 45.4853, lng: 12.4167, role: "alternative" },
        { id: "cinque-terre", name: "Cinque Terre", lat: 44.11, lng: 9.72, role: "base" },
        { id: "monterosso", name: "Monterosso", lat: 44.1461, lng: 9.6536, role: "excursion" },
        { id: "vernazza", name: "Vernazza", lat: 44.1345, lng: 9.6842, role: "excursion" },
        { id: "manarola", name: "Manarola", lat: 44.1067, lng: 9.7275, role: "excursion" },
        { id: "riomaggiore", name: "Riomaggiore — alternative", lat: 44.0989, lng: 9.7383, role: "alternative" },
        { id: "portovenere", name: "Portovenere — alternative", lat: 44.0491, lng: 9.8397, role: "alternative" },
        { id: "como", name: "Lake Como", lat: 45.987, lng: 9.2572, role: "base" },
        { id: "villa-carlotta", name: "Villa Carlotta", lat: 45.9864, lng: 9.225, role: "excursion" },
        { id: "bellagio", name: "Bellagio — alternative", lat: 45.9869, lng: 9.261, role: "alternative" }
      ],
      segments: [
        { from: "venice", to: "murano", type: "excursion" },
        { from: "venice", to: "burano", type: "alternative" },
        { from: "venice", to: "cinque-terre", type: "rail" },
        { from: "cinque-terre", to: "monterosso", type: "excursion" },
        { from: "cinque-terre", to: "vernazza", type: "excursion" },
        { from: "cinque-terre", to: "manarola", type: "excursion" },
        { from: "cinque-terre", to: "riomaggiore", type: "alternative" },
        { from: "cinque-terre", to: "portovenere", type: "alternative" },
        { from: "cinque-terre", to: "como", type: "rail" },
        { from: "como", to: "villa-carlotta", type: "excursion" },
        { from: "como", to: "bellagio", type: "alternative" }
      ],
      daysPlan: [
        D("Travel Day 0", "Depart STL", "Begin the overnight international itinerary to Venice via Frankfurt.", "Meals, hydration, movement, and sleep are the plan.", "Makes the true calendar burden visible and protects arrival recovery.", "Airport walking, one transatlantic connection, and prolonged sitting.", "After disruption, protect Day 1 recovery instead of pushing the first landmark day.", "venice", [L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Sample routing: STL–FRA–VCE on a Lufthansa-oriented itinerary when the seasonal STL–FRA service operates; verify the September 2027 timetable."),
        D("Day 1", "Arrive Venice and recover", "Transfer from VCE, check in, and keep the first Venetian orientation intentionally light.", "A seated cicchetti lunch or short canal-side pause if energy permits.", "Delivers immediate atmosphere without spending a major anchor on jet lag.", "Very light; bridges, cobbles, and luggage handling require restraint.", "Direct hotel arrival, nearby meal, and sleep.", "venice", [L("Venice Marco Polo Airport", "https://www.veneziaairport.it/en/"), L("Venice official tourism", "https://www.veneziaunica.it/en")], "recovery", "VCE to central Venice by Alilaguna, water taxi, or land transfer depending on lodging location."),
        D("Day 2", "Historic Venice", "Use St. Mark's Basilica and the Doge's Palace as the focused historic anchor, then slow down in quieter sestieri.", "Choose one additional interior or a seated lagoon-facing meal rather than stacking monuments.", "Puts Venice's architecture, civic history, and sense of place at the center of the trip.", "Moderate; timed entry, standing, bridges, and uneven paving need breaks.", "One major interior, a vaporetto ride, and a long lunch.", "venice", [L("Doge's Palace", "https://palazzoducale.visitmuve.it/en/"), L("St. Mark's Basilica", "https://www.basilicasanmarco.it/en/")], "day", "Use vaporetto routes between the main sestieri; exact access and timed-entry rules require verification.", I("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Venice_-_Canal_Grande_-_Santa_Maria_della_Salute_-_2022.jpg/500px-Venice_-_Canal_Grande_-_Santa_Maria_della_Salute_-_2022.jpg", "Grand Canal and Santa Maria della Salute in Venice.", "Jakub Hałun, CC BY 4.0", 500, 333)),
        D("Day 3", "Lagoon islands: Murano or Burano", "Choose Murano for glass and a calmer island rhythm, or Burano as the equal-status colorful lagoon alternative.", "Keep the afternoon open for a vaporetto ride, neighborhood wandering, or a long lagoon-side meal.", "Gives Venice a distinct second full day without forcing two islands into one schedule.", "Light to moderate; boat boarding and island paving vary.", "Stay in central Venice for a museum, café, and slower waterfront time.", ["venice", "murano", "burano"], [L("Murano glass museum", "https://museovetro.visitmuve.it/en/"), L("Venice lagoon transport", "https://actv.avmspa.it/en"), L("Venice official tourism", "https://www.veneziaunica.it/en")], "day", "Murano and Burano are reached by vaporetto; choose one island rather than combining both."),
        D("Day 4", "Quiet Venice and anniversary dinner potential", "Keep the day intentionally flexible around Dorsoduro, Cannaregio, or a scenic Grand Canal ride before choosing one special evening plan.", "Use the anniversary slot for a celebratory dinner, gondola, aperitivo, or simply the prettiest low-pressure walk of the trip.", "The extra Venice night turns the opening into a calmer, more romantic base instead of a rushed pre-transfer stop.", "Light to moderate by design; bridges and standing are manageable if the day stays selective.", "Limit the plan to one neighborhood, one long meal, and an early night before the rail transfer.", "venice", [L("Venice official tourism", "https://www.veneziaunica.it/en"), L("Venice lagoon transport", "https://actv.avmspa.it/en")], "day", "Use the vaporetto as the scenic version of a Grand Canal outing and keep reservations limited to the evening's one anchor."),
        D("Day 5", "Rail to Cinque Terre", "Travel from Venice to the Cinque Terre base and keep arrival expectations limited to check-in, sea air, and a simple dinner.", "If energy survives the transfer, use only a short waterfront stroll near the station or harbor.", "Swaps the hardest mountain move for a sea-and-villages middle act while staying entirely inside Italy.", "Long transfer day with luggage handling, two rail changes, and schedule sensitivity.", "Go straight to the hotel and let the arrival meal count as the day's full experience.", "cinque-terre", [L("Trenitalia", "https://www.trenitalia.com/en.html"), L("Cinque Terre National Park", "https://www.parconazionale5terre.it/?l=en")], "transfer", "Plan about 5 to 5.5 hours by rail to La Spezia, usually with 2 changes via Bologna and Florence; add a short local train onward for the specific Cinque Terre village base. Re-check the exact 2027 timetable closer to booking."),
        D("Day 6", "Cinque Terre village-hopping by train", "Use the local rail line to make Monterosso, Vernazza, and Manarola the primary sequence, adding Riomaggiore only if energy still feels good.", "Pause for one long seaside lunch instead of trying to 'complete' every village.", "Keeps the middle act scenic and varied without forcing a long coastal hike.", "Moderate; station stairs, uneven lanes, and crowding require selective pacing.", "Choose only two villages plus a long meal if the transfer day still lingers.", ["cinque-terre", "monterosso", "vernazza", "manarola", "riomaggiore"], [L("Cinque Terre National Park", "https://www.parconazionale5terre.it/?l=en"), L("Trenitalia", "https://www.trenitalia.com/en.html")], "day", "Use village-to-village local trains as the primary mover, and re-check exact 2027 local service patterns closer to booking."),
        D("Day 7", "Cinque Terre sea day or Portovenere alternative", "Treat the coast itself as the point: choose a boat-focused day with time in the villages, or add a short Sentiero Azzurro segment only if conditions and energy look favorable.", "Portovenere serves as the equal-status alternative if trail closures, heat, or crowds make the classic village sequence feel like too much.", "Adds the water-and-villages contrast the Italy-only version needed after Venice and before Como.", "Moderate; coastal paths, stairs, docks, and weather all affect how ambitious the day should be.", "Keep it to one village, one boat, and one lunch stop if a slower day sounds better.", ["cinque-terre", "portovenere"], [L("Cinque Terre National Park", "https://www.parconazionale5terre.it/?l=en"), L("Golfo dei Poeti boat service", "https://www.navigazionegolfodeipoeti.it/en/")], "day", "Portovenere is reached by boat from the Cinque Terre villages or by ATC bus/local transfer from La Spezia, not by rail; trail access and boat schedules are weather- and season-dependent, so verify 2027 operations and closures before locking in a hike."),
        D("Day 8", "Rail to Lake Como", "Travel north through Milan to the Lake Como base and keep the evening light after the second substantial rail day.", "A simple waterfront dinner or terrace pause is enough on arrival.", "Preserves the polished lake finish without turning the route into a fourth transfer-heavy act.", "Transfer day with two rail changes; protect the evening from extra sightseeing.", "Go straight to the hotel and treat the view as the plan.", "como", [L("Trenitalia", "https://www.trenitalia.com/en.html"), L("Lake Como destination guide", "https://www.visitlakecomo.info/en/")], "transfer", "Plan about 4.5 to 5.25 hours by rail via Milan to the Lake Como rail gateway, plus any final ferry or local transfer to the chosen lake town. Re-check the exact 2027 timetable closer to booking."),
        D("Day 9", "Lake Como villas", "Use Villa Carlotta and Villa del Balbianello as the focused lake anchor, moving by ferry and keeping Bellagio secondary.", "A long lakeside lunch and gentle waterfront time.", "Combines gardens, classic scenery, and a cinematic villa day after the busier Cinque Terre middle act.", "Moderate; ferry boarding, gardens, paths, and some slopes matter.", "Keep one villa only if weather, reservations, or energy require it.", ["como", "villa-carlotta"], [L("Villa Carlotta", "https://www.villacarlotta.it/en/"), L("Villa del Balbianello", "https://fondoambiente.it/luoghi/villa-del-balbianello?lang=en"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "day", "Use lake ferries between the selected base, Tremezzo, Lenno, and Bellagio; check advance FAI booking requirements."),
        D("Day 10", "Classic boat anniversary anchor", "Take a private classic-boat cruise as the celebratory Lake Como experience.", "Keep the morning free for a short village visit or simply a slow breakfast.", "Supplies the clearest anniversary-only splurge after Venice and Cinque Terre have already delivered their distinct moods.", "Light to moderate depending on the morning option and water conditions.", "Skip the morning outing and keep only the cruise plus a long meal.", "como", [L("Lake Como destination guide", "https://www.visitlakecomo.info/en/"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "day", "Treat boat timing and weather as provisional; retain a seated lakefront dinner as the fixed celebration."),
        D("Day 11", "Bellagio or Lake Como flex day", "Choose Bellagio for a compact village-and-waterfront outing, or stay near the base for a museum, garden, or long lunch.", "Use the afternoon for rest, packing, or a moved anniversary dinner if the boat day needed weather flexibility.", "Gives the Lake Como finish one final low-pressure day after two transfers and three distinct Italy acts.", "Light to moderate; ferry access, paving, and crowding vary.", "Stay entirely near the hotel and let the final waterfront meal do the work.", ["como", "bellagio"], [L("Bellagio official tourism", "https://www.bellagiolakecomo.com/en"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "recovery", "Choose the easier waterfront version if ferry conditions, hills, or energy are unfavorable."),
        D("Day 12", "Milan-area departure and return to STL", "Transfer to Milan Malpensa and begin the international return via Frankfurt.", "None.", "Uses the Italy-only route's strongest practical homebound gateway.", "Travel-only with airport walking and one Europe connection.", "If the airport pairing changes, keep a prior positioning night visible rather than borrowing from the final lake day.", "como", [L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train"), L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Lake Como to MXP commonly requires a regional train, airport train, or car transfer depending on the base; current planning assumes MXP–FRA–STL.")
      ]
    },
    {
      id: "spain",
      order: 3,
      name: "Spain",
      short: "Madrid → Seville",
      status: "Strongest challenger",
      statusDetail: "Especially strong for royal sites, castles, layered history, food, and independent exploration; no final destination has been selected.",
      days: 11,
      calendarEntries: 12,
      nights: 10,
      bases: 2,
      transfers: 1,
      timing: "Late September–early October 2027",
      shape: "Travel Day 0 + Days 1–11 · Madrid 5 nights + Seville 5 nights",
      route: "Madrid (5 nights) → rail → Seville (5 nights)",
      why: "The clearest match for proven interests in history, castles and royal sites, food, active days, and independent exploration, with two bases and one simple rail move.",
      question: "Would a monument- and city-heavy route lack the natural drama expected of an anniversary trip?",
      repair: "Test Andalusian heat and event crowds, then decide whether the royal, art, food, and historic-city depth creates enough contrast on its own.",
      mobility: {
        hardest: "Toledo: steep lanes, cobbles, stairs, and sustained standing.",
        walking: "Moderate overall; crowds and standing in Madrid, heat and old paving in Andalusia.",
        lower: "Taxis between anchors, one-interior days, long midday rests, and seated food/cultural options.",
        recovery: "Arrival stays light; Segovia has equal-status recovery alternative; Day 10 is intentionally underfilled."
      },
      responsible: "Use rail between bases and day-trip cities, avoid stacking pressured monuments, seek locally grounded flamenco interpretation, and account for the aviation and possible positioning-night burden.",
      flight: {
        summary: "Expected pattern — STL–MAD with one plausible connection; return from SVQ often means two changes, or rail to MAD plus one air connection.",
        detail: "One stop is realistic via PHL, CLT, JFK, MIA, DFW, ORD, ATL, or IAD; seasonal STL–Frankfurt and STL–London nonstops (2026) make FRA/LHR one-stop gateways when operating. From Seville, plan two connections or rail to Madrid plus one flight. Allow roughly 11–18 hours each way, excluding Seville–Madrid positioning. If MAD is the return gateway, prefer a prior airport-area night and update the hotel count and planning range.",
        burden: "Overnight outbound; the return gateway decision can add a hotel night or a second aircraft change.",
        links: [
          L("Madrid airport rail", "https://www.aena.es/en/adolfo-suarez-madrid-barajas/getting-there/trains.html"),
          L("Seville airport destinations", "https://www.aena.es/en/sevilla/airlines-and-destinations/airport-destinations.html"),
          L("Seville airport bus", "https://www.aena.es/en/sevilla/getting-there/bus.html")
        ]
      },
      cost: {
        range: "$8,000–$11,000",
        hotels: "Madrid $190–$310/night · Seville $170–$280/night",
        buys: "Polished central or near-central midrange; the lowest prices may mean smaller rooms or more transit.",
        pressure: "Moderate: airfare/gateway choice, events, guided day trips, rail timing, and centrality.",
        confidence: "Medium-high if the return does not silently add a Madrid night",
        verdict: "The premium converts into an especially strong history, royal-site, food, and independent-exploration fit."
      },
      images: [
        { file: "assets/images/spain-segovia-alcazar.webp", alt: "Stone towers and slate roofs of Segovia’s castle above autumn trees.", credit: "Alcázar de Segovia, Rafa Esteve, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." },
        { file: "assets/images/spain-seville-alcazar-garden.webp", alt: "Formal green garden framed by arcades inside Seville’s Real Alcázar.", credit: "Jardín de las Damas, Real Alcázar of Seville, Martinvl, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:JardinLasDamas_Alcazar_Seville.jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." }
      ],
      stops: [
        { id: "madrid", name: "Madrid", lat: 40.4168, lng: -3.7038, role: "base" },
        { id: "toledo", name: "Toledo", lat: 39.8628, lng: -4.0273, role: "excursion" },
        { id: "segovia", name: "Segovia — optional", lat: 40.9429, lng: -4.1088, role: "alternative" },
        { id: "seville", name: "Seville", lat: 37.3891, lng: -5.9845, role: "base" },
        { id: "cordoba", name: "Córdoba", lat: 37.8882, lng: -4.7794, role: "excursion" }
      ],
      segments: [
        { from: "madrid", to: "toledo", type: "excursion" },
        { from: "madrid", to: "segovia", type: "alternative" },
        { from: "madrid", to: "seville", type: "rail" },
        { from: "seville", to: "cordoba", type: "excursion" }
      ],
      daysPlan: [
        D("Travel Day 0", "Depart STL", "Begin overnight travel to Madrid.", "None.", "Exposes flight burden and protects arrival recovery.", "Connection, airport walking, and prolonged sitting.", "After disruption, sacrifice orientation rather than sleep.", "madrid", [L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Sample routing: one stop via PHL, CLT, JFK, MIA, DFW, ORD, ATL, or IAD (all with MAD nonstops); seasonal STL–FRA or STL–LHR also work when operating. Anticipate roughly 11–18 hours total."),
        D("Day 1", "Madrid arrival and recovery", "Transfer, check in, and take one compact Plaza Mayor or neighborhood paseo.", "Early tapas-style meal close to lodging.", "Introduces atmosphere and food without spending a major admission on jet lag.", "Very light; conditions and distances vary.", "Hotel meal and sleep.", "madrid", [L("Madrid official tourism", "https://www.esmadrid.com/en"), L("Plaza Mayor", "https://www.esmadrid.com/en/tourist-information/plaza-mayor-madrid"), L("Madrid airport rail", "https://www.aena.es/en/adolfo-suarez-madrid-barajas/getting-there/trains.html")], "recovery", "MAD airport to the center: about 30–40 minutes by airport rail/metro or taxi.", I("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Plaza_Mayor%2C_Madrid%2C_Espa%C3%B1a%2C_2023-01-03%2C_DD_78.jpg/500px-Plaza_Mayor%2C_Madrid%2C_Espa%C3%B1a%2C_2023-01-03%2C_DD_78.jpg", "Arcaded facades around Madrid’s Plaza Mayor.", "Diego Delso, CC BY-SA 4.0", 500, 387)),
        D("Day 2", "Royal Madrid", "Use the Royal Palace as the principal complex.", "Choose one adjacent square or a tightly curated Prado route.", "Directly serves royal-history interests and ceremonial scale.", "Moderate standing, security, and timed access.", "Keep the palace interior and drop the outdoor or museum component.", "madrid", [L("Royal Palace", "https://www.patrimonionacional.es/en/visita/royal-palace-madrid"), L("Prado overview", "https://www.esmadrid.com/en/tourist-information/museo-del-prado")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Palacio_Real_de_Madrid_-_13.jpg/500px-Palacio_Real_de_Madrid_-_13.jpg", "Limestone facade of Madrid’s Royal Palace.", "Carlos Delgado, CC BY-SA 3.0", 500, 333)),
        D("Day 3", "Historic Madrid and food", "Explore Madrid de los Austrias at an independent pace.", "Add one market or neighborhood food experience.", "Balances civic history with living regional character.", "Light to moderate; crowds and standing matter more than grades.", "Shorten the walk and keep a seated food component.", "madrid", [L("Madrid official tourism", "https://www.esmadrid.com/en")]),
        D("Day 4", "Toledo’s layered history", "Center the old-city route on the cathedral and the city’s Christian, Jewish, Islamic, imperial, and artistic layers.", "Choose one Jewish-quarter interior or overlook.", "Concentrated historic depth comparable to favorite European cities.", "High-moderate; steep lanes, cobbles, stairs, and standing.", "Use taxis or escalators, keep two priority interiors, or substitute Madrid history.", "toledo", [L("Toledo historic city — official tourism", "https://turismo.toledo.es/", "Spanish"), L("Toledo Cathedral — official site", "https://catedralprimada.es/", "Spanish")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Exterior-Toledo-cathedral.jpg/500px-Exterior-Toledo-cathedral.jpg", "Gothic tower and facade of Toledo Cathedral.", "Acediscovery, CC BY 4.0", 500, 400)),
        D("Day 5", "Segovia castle day or recovery", "See the aqueduct and Alcázar, or remain in Madrid with equal status.", "Add a regional lunch.", "The clearest retained castle-focused day without forcing a second excursion.", "Moderate to high on grades and old paving.", "One smaller Madrid museum or garden and a protected afternoon.", ["segovia", "madrid"], [L("Segovia tourism", "https://www.turismodesegovia.com/en/"), L("Alcázar of Segovia", "https://www.alcazardesegovia.com/", "Spanish"), L("Madrid official tourism", "https://www.esmadrid.com/en")], "recovery", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg/500px-Segovia_-_Alc%C3%A1zar_de_Segovia_22_2017-10-24.jpg", "Segovia’s Alcázar rising above autumn trees.", "Rafa Esteve, CC BY-SA 4.0", 500, 333)),
        D("Day 6", "Rail to Seville", "Take intercity rail, check in, and rest.", "Short Santa Cruz or riverfront orientation.", "A single move creates a strong Castile-to-Andalusia contrast.", "Transfer day; warm conditions may require a long pause.", "Hotel rest and nearby dinner.", "seville", [L("Seville official tourism", "https://visitasevilla.es/en/")], "transfer", "AVE high-speed rail Madrid–Seville: about 2.5 hours."),
        D("Day 7", "Seville monumental core", "Use the Real Alcázar as the focused royal-palace anchor.", "Add the Cathedral area; Giralda is optional after a substantial break.", "Spain’s strongest combined royal and architectural day.", "Moderate standing, courtyards, old paving, and heat exposure.", "Prioritize the preferred interior and move the second element.", "seville", [L("Real Alcázar", "https://alcazarsevilla.org/", "Spanish"), L("Seville Cathedral", "https://www.catedraldesevilla.es/", "Spanish")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/JardinLasDamas_Alcazar_Seville.jpg/500px-JardinLasDamas_Alcazar_Seville.jpg", "Arcaded garden courtyard inside Seville’s Real Alcázar.", "Martinvl, CC BY-SA 4.0", 500, 347)),
        D("Day 8", "Triana and a cultural evening", "Explore Triana through ceramics, market, river identity, and food.", "Choose a carefully reviewed flamenco performance or interpretation.", "Gives living Andalusian identity equal weight with monuments.", "Light to moderate with a long midday rest.", "Indoor ceramics or market visit; the evening remains optional.", "seville", [L("Seville official tourism", "https://visitasevilla.es/en/"), L("UNESCO Flamenco", "https://ich.unesco.org/en/RL/flamenco-00363"), L("Museo del Baile Flamenco", "https://museodelbaileflamenco.com/en/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Triana_Bridge_at_night_-_Seville_01.JPG/500px-Triana_Bridge_at_night_-_Seville_01.JPG", "Triana bridge over the Guadalquivir toward the Triana district.", "Wilomanso, CC BY-SA 3.0 ES", 500, 335)),
        D("Day 9", "Córdoba day trip", "Give the Mosque-Cathedral unhurried time.", "Add selective Jewish Quarter and Roman Bridge context or a shaded lunch.", "Broadens the historic story without another hotel move.", "Moderate; heat, paving, worship restrictions, and crowds require restraint.", "Short core route or the best remaining Seville interior.", "cordoba", [L("Mosque-Cathedral", "https://mezquita-catedraldecordoba.es/en/"), L("Córdoba historic center — official tourism", "https://www.turismodecordoba.org/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/C%C3%B3rdoba_-_Mezquita-Catedral_-_Interior_-_04.jpg/500px-C%C3%B3rdoba_-_Mezquita-Catedral_-_Interior_-_04.jpg", "Striped double arches inside Córdoba’s Mosque-Cathedral.", "Benjamin Smith, CC BY-SA 4.0", 500, 334)),
        D("Day 10", "Seville flex and anniversary close", "Protect flex time or choose one smaller palace.", "Use María Luisa Park if conditions suit, then anniversary dinner.", "Ends with atmosphere, food, and choice.", "Light and intentionally underfilled.", "Keep only an indoor dinner or hotel celebration.", "seville", [L("Casa de Pilatos", "https://www.fundacionmedinaceli.org/monumentos/pilatos/", "Spanish"), L("Palacio de las Dueñas", "https://www.lasduenas.es/en"), L("Seville official tourism", "https://visitasevilla.es/en/")], "recovery"),
        D("Day 11", "Departure and return to STL", "Use the selected SVQ itinerary or begin the verified surface return to MAD.", "None.", "Protects the two-base plan from sightseeing-transfer stress.", "Travel-only; one connection is normal from MAD, two are common from SVQ.", "Add a prior positioning night openly if required.", ["seville", "madrid"], [L("Seville destinations", "https://www.aena.es/en/sevilla/airlines-and-destinations/airport-destinations.html"), L("Seville airport bus", "https://www.aena.es/en/sevilla/getting-there/bus.html"), L("Madrid destinations", "https://www.aena.es/en/adolfo-suarez-madrid-barajas/airlines-and-destinations/airport-destinations.html")], "travel", "Return routing: from SVQ usually two connections, or AVE rail back to Madrid (~2.5 hours) plus a one-stop flight from MAD. Anticipate roughly 11–18 hours excluding any positioning.")
      ]
    },
    {
      id: "italy-croatia",
      order: 0,
      name: "Italy + Slovenia",
      short: "Como → Dolomites → Bled",
      status: "Provisional leading fit",
      statusDetail: "Best current anniversary concept: three scenic bases, no internal flights, castle-and-landscape anchors, and a shorter car rental used only for the Dolomites → Bled leg.",
      days: 12,
      calendarEntries: 13,
      nights: 10,
      bases: 3,
      transfers: 2,
      timing: "September 2027",
      shape: "Travel Day 0 + Days 1–12 · Lake Como 3 nights + Dolomites 3 + Lake Bled 4",
      route: "Lake Como (3 nights) → Dolomites (3 nights) → Lake Bled (4 nights)",
      why: "It delivers the strongest mix of anniversary scenery, castle-and-villa visits, alpine drama, and a calmer final base while keeping the route linear and dropping the internal-flight burden.",
      question: "Is the third base and short cross-border rental-car segment acceptable in exchange for the richer castle-and-scenery payoff?",
      repair: "Keep the Como and Dolomites legs rail-first, use the rental car only from Ortisei or Bolzano to Bled, and treat Piran as an optional coast day rather than a required swim stop.",
      mobility: {
        hardest: "Dolomites and Vintgar days: cable cars, uneven paths, boardwalks, and some stairs or gradients.",
        walking: "Moderate overall; ferry docks, Alpine viewpoints, castle approaches, and gorge boardwalks add effort but no day requires forced speed.",
        lower: "Recovery arrival at Como, village-level Dolomite afternoons, lakefront Bled time, and Ljubljana or Piran as selective low-intensity alternatives.",
        recovery: "Day 1 stays light, Day 7 allows a gentler Dolomites alternative, and Day 11 keeps multiple lower-effort Bled-region options."
      },
      responsible: "Prefer rail for the first two legs, keep the rental only for the cross-border Alpine transfer, respect pressure-sensitive villa and gorge sites with timed or early entry, and avoid framing the Adriatic stop as a warm-water beach obligation.",
      flight: {
        summary: "Expected pattern — open jaw on Lufthansa via Frankfurt: STL–FRA–MXP outbound and LJU–FRA–STL return, with a single alliance and no internal flights.",
        detail: "Current planning assumes STL–Frankfurt nonstop on Lufthansa when the seasonal service operates, then Frankfurt–Milan Malpensa outbound and Ljubljana–Frankfurt return. The FRA–LJU segment is currently often up to three daily flights of about 1 hour 25 minutes, but exact 2027 schedules still need verification. If STL–FRA timing shifts, keep the same Europe gateway rather than introducing a second alliance or separate ticket.",
        burden: "One transatlantic connection each way plus a three-base land itinerary; materially easier than adding an internal European flight.",
        links: [
          L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm"),
          L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train"),
          L("Ljubljana Airport", "https://www.lju-airport.si/en/")
        ]
      },
      cost: {
        range: "$6,400–$8,500",
        hotels: "Lake Como $240–$340/night · Dolomites about €145 pp/night half-board · Lake Bled €80–€150/night",
        buys: "Comfortable lake lodging, a Dolomites stay with dinners included, and a well-located Bled base with room for castles, scenery, and one celebratory dinner.",
        pressure: "Moderate: open-jaw airfare, Lake Como demand, Dolomites lift/weather timing, and the short one-way rental with vignettes.",
        confidence: "Medium-high",
        verdict: "Currently the best balance of wow factor, usable time, and value — stronger and more distinctive than the Croatia version without costing more."
      },
      images: [
        { file: "assets/images/italy-venice-canaletto.webp", alt: "Canaletto painting of a busy eighteenth-century Piazza San Marco beneath a bright sky.", credit: "Canaletto, The Piazza San Marco in Venice, public domain, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", license: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", note: "Historical artwork, not a present-day view. Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." },
        { file: "assets/images/italy-bled.webp", alt: "Lake Bled with the pilgrimage church on Bled Island and Bled Castle on the cliff above.", credit: "Bled Island & Bled Castle, Lake Bled, Slovenia, Krzysztof Golik, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Bled_Island_%26_Bled_Castle_(1).jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." }
      ],
      stops: [
        { id: "como", name: "Lake Como", lat: 45.987, lng: 9.2572, role: "base" },
        { id: "venice", name: "Dolomites", lat: 46.5754, lng: 11.6713, role: "base" },
        { id: "rovinj", name: "Lake Bled", lat: 46.3683, lng: 14.1146, role: "base" },
        { id: "istria", name: "Piran or Slovenia side trip", lat: 45.5286, lng: 13.5684, role: "alternative" }
      ],
      segments: [
        { from: "como", to: "venice", type: "rail" },
        { from: "venice", to: "rovinj", type: "road" },
        { from: "rovinj", to: "istria", type: "alternative" }
      ],
      daysPlan: [
        D("Travel Day 0", "Depart STL", "Begin the overnight Lufthansa-oriented trip to Milan via Frankfurt.", "Meals, hydration, movement, and sleep are the plan.", "Keeps the true long-haul load visible and protects the first lake day.", "Airport walking, one transatlantic connection, and prolonged sitting.", "After disruption, protect Day 1 recovery instead of pushing scenery.", "como", [L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Sample routing: STL–FRA nonstop on Lufthansa when seasonal service operates, then FRA–MXP. Keep September 2027 timing tied to Lufthansa's published schedule when it opens."),
        D("Day 1", "Arrive Lake Como and recover", "Train from Milan Malpensa to Varenna, check in, and keep the day intentionally light.", "Lakeside lunch, short waterfront stroll, and early dinner.", "Gives the trip romance immediately without spending a major anchor on jet lag.", "Very light; rail transfer plus gentle walking only.", "Direct hotel arrival and sleep.", "como", [L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "recovery", "MXP to Varenna by rail usually runs about 2 hours with the Milan connection."),
        D("Day 2", "Lake Como villas by ferry", "Use Villa Carlotta and Villa del Balbianello as the focused lake anchor, moving by ferry and keeping Bellagio secondary.", "Bellagio waterfront and lunch if energy stays good.", "Combines gardens, classic lake scenery, and one of the trip's most cinematic villa visits.", "Moderate; ferry boarding, paths, and some slopes matter.", "Keep one villa only if weather, reservations, or energy require it.", "como", [L("Villa Carlotta", "https://www.villacarlotta.it/en/"), L("Villa del Balbianello", "https://fondoambiente.it/luoghi/villa-del-balbianello?lang=en"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "day", "Use lake ferries between Varenna, Tremezzo, Lenno, and Bellagio; Balbianello typically needs advance FAI booking. Villa interiors are usually guided rather than free-roam, so re-check current rules before booking."),
        D("Day 3", "Como boat day", "Take the private classic-boat cruise as the celebratory lake experience.", "Keep the morning free for Brunate or an easy Greenway segment before the cruise.", "Supplies the clearest anniversary-only splurge without adding another transfer.", "Light to moderate depending on the morning option.", "Skip Brunate and keep only the cruise plus a long meal.", "como", [L("Lake Como destination guide", "https://www.visitlakecomo.info/en/"), L("Brunate funicular", "https://www.funicularcomobrunate.it/en")], "day"),
        D("Day 4", "Rail to the Dolomites", "Travel Varenna → Milan → Bolzano and continue to Ortisei for the Alpine base.", "Check in, settle, and use the evening for a simple village walk and included dinner.", "Keeps the trip car-free until the cross-border leg and makes the route feel progressively grander.", "Longer transfer day with luggage handling.", "Go straight to the hotel and treat dinner as the full plan.", "venice", [L("Trenitalia", "https://www.trenitalia.com/en.html"), L("Val Gardena", "https://www.valgardena.it/en/")], "transfer", "Varenna to Bolzano by rail is the main move; continue locally to Ortisei after arrival."),
        D("Day 5", "Seceda ridge day", "Ride the Seceda cable car for the signature Dolomites panorama and a selective ridge walk.", "Rifugio lunch and an easy Ortisei village afternoon.", "This is the trip's biggest alpine wow moment.", "Moderate; cable cars, high-altitude walking, and weather exposure.", "Keep only the cable car viewpoint and lunch if a full walk feels too ambitious.", "venice", [L("Seceda", "https://www.seceda.it/en/"), L("Val Gardena", "https://www.valgardena.it/en/")], "day"),
        D("Day 6", "Alpe di Siusi or Lago di Braies", "Use Alpe di Siusi as the primary broad-meadow Dolomites day, with Lago di Braies as the scenic alternative.", "Keep the evening easy with half-board dinner and spa time if offered.", "Adds a second distinct Dolomites landscape without forcing a fourth base.", "Moderate; cable cars or a scenic drive, with weather affecting exposure.", "Stay village-based if conditions turn poor.", ["venice"], [L("Seiser Alm / Alpe di Siusi", "https://www.seiseralm.it/en"), L("Pragser Wildsee / Lago di Braies", "https://www.prags.bz/en")], "day", "September usually reads as late summer to early autumn here; classic golden larch color is more often early to mid-October, depending on altitude and weather."),
        D("Day 7", "Drive to Lake Bled", "Pick up a local rental near Ortisei or Bolzano and drive across the Alps to Bled.", "Use the scenic Tarvisio → Kranjska Gora route if timing and weather are favorable.", "The short rental keeps the route linear and drops the earlier internal-flight problem.", "Transfer day with driving, luggage, and vignette logistics.", "Take the simplest direct route and keep the evening quiet.", "rovinj", [L("Ljubljana Airport", "https://www.lju-airport.si/en/"), L("Bled official tourism", "https://www.bled.si/en/")], "transfer", "Ortisei/Bolzano to Bled is roughly 3.75–4.5 hours depending on pickup point and route. Buy Austrian and Slovenian vignettes; there is no Schengen border stop."),
        D("Day 8", "Bled Castle and island", "Use Bled Castle and the pletna boat to Bled Island as the core lake day.", "Finish with kremšnita and a flexible lakeside afternoon.", "Pairs storybook scenery with the trip's strongest castle-on-a-lake image.", "Moderate; castle approach, boat boarding, and the island's 99 steps matter.", "Keep only the castle or only the island if energy runs lower.", "rovinj", [L("Bled Castle", "https://www.blejski-grad.si/en/"), L("Bled official tourism", "https://www.bled.si/en/")], "day", "Lakefront movement within Bled is simple; the pletna adds a short hand-rowed crossing to the island."),
        D("Day 9", "Predjama Castle and Postojna Cave", "Make the castle-in-a-cliff day the principal inland excursion, pairing Predjama with nearby Postojna Cave.", "Keep dinner back in Bled simple after the longer outing.", "This is the clearest answer to why Slovenia belongs in the leading concept.", "Moderate; driving, cave routes, and castle terrain add effort.", "Use only Predjama if a shorter history-focused day is preferable.", "rovinj", [L("Predjama Castle", "https://www.postojnska-jama.eu/en/predjama-castle/"), L("Postojna Cave", "https://www.postojnska-jama.eu/en/postojna-cave/")], "day", "Drive time from Bled is roughly 1.5 hours each way."),
        D("Day 10", "Vintgar Gorge and a coast-or-city option", "Walk Vintgar Gorge early, then choose Piran for an Adriatic harbor afternoon or stay inland with Bohinj or Ljubljana.", "Use Piran for seafood, Tartini Square, and photos rather than a swim agenda.", "Builds in flexibility without hiding the new coast option.", "Light to moderate if you keep only one afternoon option after the gorge.", "Skip the afternoon drive and keep only Bled or Bohinj time.", ["rovinj", "istria"], [L("Vintgar Gorge", "https://www.vintgar.si/en/"), L("Piran tourism", "https://www.portoroz.si/en/discover/piran"), L("Visit Ljubljana", "https://www.visitljubljana.com/en/"), L("Lake Bohinj", "https://www.bohinj.si/en/")], "day", "Go to Vintgar early to beat crowds. Piran is a scenic harbor stop, not a warm-water beach day; Ljubljana and Bohinj remain equal-status alternatives."),
        D("Day 11", "Bled anniversary flex day", "Keep the final full day adjustable around weather, energy, or any moved Slovenia anchor.", "Use a lakeside anniversary dinner as the one fixed element.", "Protects the trip from over-scripting the third base.", "Light by design.", "Stay entirely in Bled and rest.", "rovinj", [L("Bled official tourism", "https://www.bled.si/en/"), L("Lake Bohinj", "https://www.bohinj.si/en/")], "recovery"),
        D("Day 12", "Ljubljana departure and return to STL", "Drive to Ljubljana Airport, drop the short rental, and fly home via Frankfurt.", "None.", "Ends the trip without a hidden repositioning day.", "Travel-only with airport walking and one Europe connection.", "If flight timing changes, keep the same open-jaw structure rather than adding a fourth base.", "rovinj", [L("Ljubljana Airport", "https://www.lju-airport.si/en/"), L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Bled to Ljubljana Airport is about 35 minutes by car; current planning assumes LJU–FRA–STL on Lufthansa.")
      ]
    },
    {
      id: "italy-slovenia-reversed",
      order: 1,
      name: "Italy + Slovenia (Reversed)",
      short: "Bled → Dolomites → Como",
      status: "Comparison variant of the lead",
      statusDetail: "Side-by-side variant of the lead: the same three bases and anchor experiences in reverse order, ending in Italy instead of Slovenia for a stronger homebound gateway and a calmer lake finish. The gallery temporarily reuses the lead card's two images until reversed-route photography is added.",
      days: 12,
      calendarEntries: 13,
      nights: 10,
      bases: 3,
      transfers: 2,
      timing: "September 2027",
      shape: "Travel Day 0 + Days 1–12 · Lake Bled 4 nights + Dolomites 3 + Lake Como 3",
      route: "Lake Bled (4 nights) → Dolomites (3 nights) → Lake Como (3 nights)",
      why: "It keeps the same best-fit castles, Alpine drama, and villa-and-lake anchors while testing a more immediately distinctive Slovenia opening and a more forgiving Milan-area finish.",
      question: "Does the stronger Milan finish outweigh starting on the thinner FRA → LJU feeder side and the fussier Slovenia → Italy one-way rental pattern?",
      repair: "Treat it as a true comparison variant: keep the same anchors, scrutinize the Slovenia-pickup / Italy-drop rental before booking, and stay with the forward order if supplier rules or pricing look worse.",
      mobility: {
        hardest: "Dolomites and Vintgar days: cable cars, uneven paths, boardwalks, and some stairs or gradients.",
        walking: "Moderate overall; ferry docks, Alpine viewpoints, castle approaches, and gorge boardwalks add effort but no day requires forced speed.",
        lower: "Recovery arrival at Bled, village-level Dolomite afternoons, lakefront Como time, and Ljubljana or Piran as selective low-intensity alternatives.",
        recovery: "Day 1 keeps Bled intentionally light, Day 7 allows a gentler Dolomites alternative, and Day 11 is a low-effort Como coda before the airport day."
      },
      responsible: "Keep the same rail-first logic where it works best, use the rental only for the Slovenia-to-Dolomites cross-border leg, respect pressure-sensitive villa and gorge sites with timed or early entry, and frame the Piran stop as scenic harbor time rather than a beach obligation.",
      flight: {
        summary: "Expected pattern — Lufthansa-oriented open jaw via Frankfurt: STL–FRA–LJU outbound and MXP–FRA–STL return, swapping the gateway order while keeping a single alliance and zero internal flights.",
        detail: "Current planning assumes STL–Frankfurt nonstop on Lufthansa when the seasonal service operates, then Frankfurt–Ljubljana outbound and Milan Malpensa–Frankfurt return. As of Aug. 2026, FRA↔LJU service appears directionally similar in both directions, but exact 2027 frequencies should not be treated as guaranteed. Ending at MXP gives the reversed version a denser major-hub gateway for the trip home. If STL–FRA timing shifts, keep the same Europe gateway rather than introducing a second alliance or separate ticket.",
        burden: "One transatlantic connection each way plus a thinner arrival feeder into Slovenia and a stronger Milan gateway for the trip home.",
        links: [
          L("Ljubljana Airport", "https://www.lju-airport.si/en/"),
          L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train"),
          L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")
        ]
      },
      cost: {
        range: "$6,420–$8,520",
        hotels: "Lake Bled €80–€150/night · Dolomites about €145 pp/night half-board · Lake Como $240–$340/night",
        buys: "The same comfortable three-base midrange shape as the forward lead, with room for castles, Alpine lift days, a private boat splurge, and one polished final dinner on Como.",
        pressure: "Moderate: open-jaw airfare, Lake Como demand, Dolomites lift/weather timing, and extra supplier scrutiny on the Slovenia-pickup / Italy-drop rental.",
        confidence: "Medium-high",
        verdict: "Essentially the same price as the forward lead; choose it for the emotional arc and Milan finish, not because it is materially cheaper."
      },
      images: [
        { file: "assets/images/italy-venice-canaletto.webp", alt: "Canaletto painting of a busy eighteenth-century Piazza San Marco beneath a bright sky.", credit: "Canaletto, The Piazza San Marco in Venice, public domain, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", license: "https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Piazza_San_Marco_in_Venice_-_Google_Art_Project.jpg", note: "Shared with the forward Italy + Slovenia entry pending dedicated reversed-route photography; the identical gallery is temporary comparison scaffolding. Historical artwork, not a present-day view. Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." },
        { file: "assets/images/italy-bled.webp", alt: "Lake Bled with the pilgrimage church on Bled Island and Bled Castle on the cliff above.", credit: "Bled Island & Bled Castle, Lake Bled, Slovenia, Krzysztof Golik, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Bled_Island_%26_Bled_Castle_(1).jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Shared with the forward Italy + Slovenia entry pending dedicated reversed-route photography; the identical gallery is temporary comparison scaffolding. Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." }
      ],
      stops: [
        { id: "como", name: "Lake Como", lat: 45.987, lng: 9.2572, role: "base" },
        { id: "venice", name: "Dolomites", lat: 46.5754, lng: 11.6713, role: "base" },
        { id: "rovinj", name: "Lake Bled", lat: 46.3683, lng: 14.1146, role: "base" },
        { id: "istria", name: "Piran or Slovenia side trip", lat: 45.5286, lng: 13.5684, role: "alternative" }
      ],
      segments: [
        { from: "rovinj", to: "venice", type: "road" },
        { from: "venice", to: "como", type: "rail" },
        { from: "rovinj", to: "istria", type: "alternative" }
      ],
      daysPlan: [
        D("Travel Day 0", "Depart STL", "Begin the overnight Lufthansa-oriented trip to Ljubljana via Frankfurt.", "Meals, hydration, movement, and sleep are the plan.", "Keeps the true long-haul load visible and lets Bled serve as the recovery arrival.", "Airport walking, one transatlantic connection, and prolonged sitting.", "After disruption, protect Day 1 recovery instead of pushing straight into sightseeing.", "rovinj", [L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm"), L("Ljubljana Airport", "https://www.lju-airport.si/en/")], "travel", "Sample routing: STL–FRA nonstop on Lufthansa when seasonal service operates, then FRA–LJU. September remains the right target window, but the 2027 schedule still needs re-verification when booking opens."),
        D("Day 1", "Arrive Lake Bled and recover", "Transfer from Ljubljana Airport to Bled, check in, and keep the day intentionally light.", "Lakeside lunch, short waterfront stroll, and early dinner.", "Starts with the storybook lake setting while respecting jet lag and avoiding a long first-day drive.", "Very light; short airport transfer plus gentle walking only.", "Direct hotel arrival and sleep.", "rovinj", [L("Ljubljana Airport", "https://www.lju-airport.si/en/"), L("Bled official tourism", "https://www.bled.si/en/")], "recovery", "Ljubljana Airport to Bled is roughly 35–45 minutes by car or transfer."),
        D("Day 2", "Bled Castle and island", "Use Bled Castle and the pletna boat to Bled Island as the core opening anchor.", "Finish with kremšnita and a flexible lakeside afternoon.", "Announces the storybook-castle logic immediately instead of saving it for the end.", "Moderate; castle approach, boat boarding, and the island's 99 steps matter.", "Keep only the castle or only the island if energy runs lower.", "rovinj", [L("Bled Castle", "https://www.blejski-grad.si/en/"), L("Bled official tourism", "https://www.bled.si/en/")], "day", "Lakefront movement within Bled is simple; the pletna adds a short hand-rowed crossing to the island."),
        D("Day 3", "Predjama Castle and Postojna Cave", "Make the castle-in-a-cliff day the principal inland excursion, pairing Predjama with nearby Postojna Cave.", "Keep dinner back in Bled simple after the longer outing.", "Preserves the clearest answer to why Slovenia belongs in this concept regardless of routing direction.", "Moderate; driving, cave routes, and castle terrain add effort.", "Use only Predjama if a shorter history-focused day is preferable.", "rovinj", [L("Predjama Castle", "https://www.postojnska-jama.eu/en/predjama-castle/"), L("Postojna Cave", "https://www.postojnska-jama.eu/en/postojna-cave/")], "day", "Drive time from Bled is roughly 1.5 hours each way."),
        D("Day 4", "Vintgar Gorge and a coast-or-city option", "Walk Vintgar Gorge early, then choose Piran for an Adriatic harbor afternoon or stay inland with Bohinj or Ljubljana.", "Use Piran for seafood, Tartini Square, and photos rather than a swim agenda.", "Keeps the same flexible Slovenia finish material, just moved earlier in the trip.", "Light to moderate if you keep only one afternoon option after the gorge.", "Skip the afternoon drive and keep only Bled or Bohinj time.", ["rovinj", "istria"], [L("Vintgar Gorge", "https://www.vintgar.si/en/"), L("Piran tourism", "https://www.portoroz.si/en/discover/piran"), L("Visit Ljubljana", "https://www.visitljubljana.com/en/"), L("Lake Bohinj", "https://www.bohinj.si/en/")], "day", "Go to Vintgar early to beat crowds. Piran is a scenic harbor stop, not a warm-water beach day; Ljubljana and Bohinj remain equal-status alternatives."),
        D("Day 5", "Drive to the Dolomites", "Pick up a short one-way rental in the Bled or Ljubljana area and drive across the Alps to Ortisei.", "Use the scenic Tarvisio → Kranjska Gora route if timing and weather are favorable.", "The same short rental keeps the route linear while testing the reversed cross-border direction.", "Transfer day with driving, luggage, vignette logistics, and the Karawanks Tunnel toll on the Austria route.", "Take the simplest direct route and keep the evening quiet.", "venice", [L("Ljubljana Airport", "https://www.lju-airport.si/en/"), L("Val Gardena", "https://www.valgardena.it/en/")], "transfer", "Bled/Ljubljana to Ortisei or Val Gardena is roughly 3.75–4.5 hours depending on pickup point and route. Buy Slovenian and Austrian vignettes; no routine Schengen border stop is expected."),
        D("Day 6", "Seceda ridge day", "Ride the Seceda cable car for the signature Dolomites panorama and a selective ridge walk.", "Rifugio lunch and an easy Ortisei village afternoon.", "Still the trip's biggest alpine wow moment, now functioning as the middle-act crescendo.", "Moderate; cable cars, high-altitude walking, and weather exposure.", "Keep only the cable car viewpoint and lunch if a full walk feels too ambitious.", "venice", [L("Seceda", "https://www.seceda.it/en/"), L("Val Gardena", "https://www.valgardena.it/en/")], "day"),
        D("Day 7", "Alpe di Siusi or Lago di Braies", "Use Alpe di Siusi as the primary broad-meadow Dolomites day, with Lago di Braies as the scenic alternative.", "Keep the evening easy with half-board dinner and spa time if offered.", "Adds the second distinct Dolomites landscape without changing the proven middle section.", "Moderate; cable cars or a scenic drive, with weather affecting exposure.", "Stay village-based if conditions turn poor.", ["venice"], [L("Seiser Alm / Alpe di Siusi", "https://www.seiseralm.it/en"), L("Pragser Wildsee / Lago di Braies", "https://www.prags.bz/en")], "day", "September usually reads as late summer to early autumn here; classic golden larch color is more often early to mid-October, depending on altitude and weather."),
        D("Day 8", "Rail to Lake Como", "Drop the rental near Bolzano or Bozen, then take rail via Milan to Varenna for the Como base.", "Check in, exhale, and keep the evening focused on a quiet lakefront dinner.", "Restores the elegant car-free finish and starts the trip's calmer romantic coda.", "Longer transfer day with luggage handling and the rental drop.", "Go straight to the hotel and treat dinner as the full plan.", ["venice", "como"], [L("Trenitalia", "https://www.trenitalia.com/en.html"), L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train")], "transfer", "Drop the car near Bolzano/Bozen before rail onward via Milan to Varenna-Esino."),
        D("Day 9", "Lake Como villas by ferry", "Use Villa Carlotta and Villa del Balbianello as the focused lake anchor, moving by ferry and keeping Bellagio secondary.", "Bellagio waterfront and lunch if energy stays good.", "Preserves the classic villa-and-gardens day while letting Como feel like the trip's polished last act.", "Moderate; ferry boarding, paths, and some slopes matter.", "Keep one villa only if weather, reservations, or energy require it.", "como", [L("Villa Carlotta", "https://www.villacarlotta.it/en/"), L("Villa del Balbianello", "https://fondoambiente.it/luoghi/villa-del-balbianello?lang=en"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "day", "Use lake ferries between Varenna, Tremezzo, Lenno, and Bellagio; Balbianello typically needs advance FAI booking. Villa interiors are usually guided rather than free-roam, so re-check current rules before booking."),
        D("Day 10", "Como boat day", "Take the private classic-boat cruise as the celebratory lake experience.", "Keep the morning free for Brunate or an easy Greenway segment before the cruise.", "Delivers the refined lakeside finish that makes the reversed option feel emotionally different from the forward version.", "Light to moderate depending on the morning option.", "Skip Brunate and keep only the cruise plus a long meal.", "como", [L("Lake Como destination guide", "https://www.visitlakecomo.info/en/"), L("Brunate funicular", "https://www.funicularcomobrunate.it/en")], "day"),
        D("Day 11", "Como finale and flex time", "Keep the final full day intentionally light around weather, energy, shopping, or one last easy lakefront outing.", "Use the final celebratory dinner on the Como side as the fixed element.", "Matches Section 9's case for a more polished Italy ending without forcing one more big commitment.", "Light by design.", "Stay in Varenna, take a slow lunch, and rest before the airport day.", "como", [L("Lake Como destination guide", "https://www.visitlakecomo.info/en/"), L("Navigazione Laghi", "https://www.navigazionelaghi.it/en/")], "recovery"),
        D("Day 12", "Milan departure and return to STL", "Transfer to Milan Malpensa and fly home via Frankfurt.", "None.", "Ends the trip from the denser major-hub gateway that makes the reversed option logistically attractive.", "Travel-only with airport walking and one Europe connection.", "If schedules shift, keep the same open-jaw structure rather than introducing a separate ticket.", "como", [L("Milan Malpensa train access", "https://www.milanomalpensa-airport.com/en/from-to/by-train"), L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Varenna to Milan Malpensa is a rail transfer via Milan; current planning assumes MXP–FRA–STL on Lufthansa.")
      ]
    },
    {
      id: "new-zealand-australia",
      order: 4,
      name: "New Zealand + Australia",
      short: "Queenstown → Te Anau ⇢ Sydney",
      status: "Highest burden · not recommended in this shape",
      statusDetail: "Retained for comparison, but structurally rejected as the recommended trip under the 14-day ceiling unless material new evidence changes the travel, recovery, weather-resilience, depth, and value findings.",
      days: 14,
      calendarEntries: 14,
      nights: 11,
      bases: 3,
      transfers: 2,
      timing: "November 2027",
      shape: "Days 1–14 · Queenstown 4 nights + Te Anau 3 + Sydney 4",
      route: "Queenstown (4 nights) → Te Anau (3 nights) ⇢ Sydney (4 nights)",
      why: "Potentially the highest spectacle and clearest statement-trip scale, but the travel-to-experience ratio is weakest and usable recovery is thin.",
      question: "Can two countries leave enough recovery, weather resilience, New Zealand scenery, and Australian depth under a 14-day ceiling?",
      repair: "The shown route is only the least-bad fallback. It remains structurally rejected; a New Zealand-only rebuild would require fresh review.",
      mobility: {
        hardest: "Day 10: Te Anau road transfer, international check-in, flight, border processing, and Sydney hotel transfer.",
        walking: "Long sitting dominates; boarding, airport walking, road travel, weather exposure, and some coastal stairs remain.",
        lower: "Lakefront orientation, coach-based Fiordland, seated ferry/harbor choices, short gallery routes, and full rest options.",
        recovery: "First 48 hours are low-stakes; Day 9 is weather reserve/recovery; Day 13 is flex."
      },
      responsible: "The extra long-haul and trans-Tasman flight burden is material. Use shared coach transport in Fiordland, heed Māori place names and qualified interpretation, avoid treating First Nations histories as scenery, and choose resident-aware operators.",
      flight: {
        summary: "Expected pattern — STL–U.S. gateway–Auckland–Queenstown, usually two connections; Sydney–STL one to two connections (Qantas SYD–DFW–STL can be a single stop).",
        detail: "Allow roughly 22–32 hours inbound and 19–27 hours home. Leaving STL on Day 1 normally consumes Day 2 and reaches Queenstown on Day 3 local time. ORD–AKL (Air New Zealand/United nonstop) is a valid gateway alongside DFW/IAH/LAX/SFO; AA's DFW–AKL is seasonal (typically resumes Oct/Nov), so verify against the November 2027 window. Home, SYD–DFW–STL on Qantas or SYD–LAX/SFO–STL can be a single connection. ZQN–SYD may be a seasonal direct flight (~3.5 hours) or require a protected Auckland connection; exact 2027 service is not confirmed.",
        burden: "Two outbound calendar dates, date-line effects, a trans-Tasman flight, and nearly a full day of elapsed return travel.",
        links: [
          L("Air New Zealand network map", "https://www.airnewzealand.com/interactive-map"),
          L("Queenstown international destinations", "https://www.queenstownairport.co.nz/flights/destinations/international-destinations/"),
          L("Qantas international routes", "https://www.qantas.com/en-us/where-we-fly/international-flight-routes")
        ]
      },
      cost: {
        range: "$14,000–$20,000",
        hotels: "Queenstown $230–$380 · Te Anau $170–$290 · Sydney $230–$390/night",
        buys: "Comfortable central or connected midrange; lake or harbor views and landmark frontage sit outside the value brief.",
        pressure: "Highest: multi-city long haul, Te Anau transfer, trans-Tasman flight, weather-sensitive Fiordland, scarce lodging, two currencies, and longer insurance exposure.",
        confidence: "Medium-low",
        verdict: "Largest statement-trip potential, but weakest usable-time-per-dollar proposition; retained only for comparison."
      },
      images: [
        { file: "assets/images/new-zealand-queenstown-bay.webp", alt: "Queenstown Bay opening onto blue Lake Wakatipu beneath steep mountains.", credit: "Queenstown Bay, Lake Wakatipu, Krzysztof Golik, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Queenstown_Bay_Lake_Wakatipu_01.jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." },
        { file: "assets/images/new-zealand-milford-sound.webp", alt: "Dark mountain walls reflected in the calm water of Milford Sound beneath low cloud.", credit: "Milford Sound in Fiordland National Park, Krzysztof Golik, CC BY-SA 4.0, via Wikimedia Commons.", source: "https://commons.wikimedia.org/wiki/File:Milford_Sound_in_Fiordland_National_Park_01.jpg", license: "https://creativecommons.org/licenses/by-sa/4.0/", note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP." }
      ],
      stops: [
        { id: "queenstown", name: "Queenstown", lat: -45.0312, lng: 168.6626, role: "base" },
        { id: "glenorchy", name: "Glenorchy area", lat: -44.8504, lng: 168.388, role: "excursion" },
        { id: "te-anau", name: "Te Anau", lat: -45.4145, lng: 167.7181, role: "base" },
        { id: "milford", name: "Milford Sound", lat: -44.6414, lng: 167.8974, role: "excursion" },
        { id: "sydney", name: "Sydney", lat: -33.8688, lng: 151.2093, role: "base" }
      ],
      segments: [
        { from: "queenstown", to: "glenorchy", type: "excursion" },
        { from: "queenstown", to: "te-anau", type: "road" },
        { from: "te-anau", to: "milford", type: "road-excursion" },
        { from: "te-anau", to: "queenstown", type: "road" },
        { from: "queenstown", to: "sydney", type: "flight" }
      ],
      daysPlan: [
        D("Day 1", "Depart STL", "Begin Pacific travel.", "Meals, hydration, movement, and sleep only.", "Prevents the plan from claiming destination time that does not exist.", "Prolonged sitting, airport walking, and multiple segments.", "Protect connection margin and baggage continuity.", "queenstown", [L("Air New Zealand network map", "https://www.airnewzealand.com/interactive-map"), L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Sample routing: STL–ORD–AKL (Air New Zealand/United nonstop ORD–AKL) or via DFW/IAH/LAX/SFO, then AKL–ZQN. Anticipate roughly 22–32 hours total across two calendar days."),
        D("Day 2", "Continue in transit", "Continue international travel and cross the date line as applicable.", "None.", "Shows the second consumed calendar date honestly.", "Travel-only and fatigue-heavy.", "No destination commitment; disruption removes Day 3 orientation.", "queenstown", [L("Air New Zealand network map", "https://www.airnewzealand.com/interactive-map")], "travel", "Continue to Auckland and connect onward to Queenstown (AKL–ZQN about 2 hours); the date line consumes this calendar day."),
        D("Day 3", "Arrive Queenstown", "Transfer, check in, eat, and sleep.", "Very short Queenstown Bay orientation only if energy permits.", "Offers an alpine-lake glimpse without calling arrival fully usable.", "Very light.", "Direct hotel arrival.", "queenstown", [L("Queenstown Airport transport", "https://www.queenstownairport.co.nz/parking-transport/transport-options"), L("Queenstown tourism", "https://www.queenstownnz.co.nz/")], "recovery", "ZQN airport to central Queenstown: about 15 minutes by taxi or shuttle.", I("https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Queenstown_Bay_Lake_Wakatipu_01.jpg/500px-Queenstown_Bay_Lake_Wakatipu_01.jpg", "Queenstown Bay on Lake Wakatipu beneath steep mountains.", "Krzysztof Golik, CC BY-SA 4.0", 500, 333)),
        D("Day 4", "Recovery and orientation", "Take a gentle lakefront and town orientation with no fixed start.", "Choose Skyline viewpoint or Kiwi Park or gardens—one only.", "Begins the scenery while respecting jet lag.", "Light and reducible; queues and garden walking vary.", "Sleep, hotel time, and one nearby meal.", "queenstown", [L("Queenstown tourism", "https://www.queenstownnz.co.nz/"), L("Kiwi Park", "https://www.kiwipark.co.nz/")], "recovery"),
        D("Day 5", "Queenstown-region scenery", "Take a selective Glenorchy road-and-landscape day.", "Add one short guided nature or heritage stop, or regional lunch.", "Starts delivering the landscape needed to justify the long haul.", "Moderate; road time, boarding, and walking vary.", "Local lake day or food-focused Queenstown day.", "glenorchy", [L("Glenorchy guide", "https://www.queenstownnz.co.nz/plan/surrounding-region/glenorchy/"), L("DOC Otago", "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Glenorchy_wharf_and_red_shed_at_Lake_Wakatipu.jpg/500px-Glenorchy_wharf_and_red_shed_at_Lake_Wakatipu.jpg", "Glenorchy’s wharf and red shed on Lake Wakatipu.", "Pseudopanax, public domain", 500, 333)),
        D("Day 6", "Anniversary day in Queenstown", "Choose a Lake Wakatipu scenic cruise or flexible shoreline experience.", "Use Arrowtown history and food as an alternative, then special dinner.", "Seeks scenery and food without strenuous activity.", "Light to moderate; avoid a long inflexible excursion.", "Sheltered lake view, special lunch, museum, and dinner.", "queenstown", [L("Queenstown tourism", "https://www.queenstownnz.co.nz/"), L("Arrowtown", "https://www.arrowtown.com/"), L("Lakes District Museum", "https://www.museumqueenstown.com/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TSS_Earnslaw._Lake_Wakatipu._NZ_%289770626903%29.jpg/500px-TSS_Earnslaw._Lake_Wakatipu._NZ_%289770626903%29.jpg", "The TSS Earnslaw steamer crossing Lake Wakatipu.", "Bernard Spragg, CC0", 500, 332)),
        D("Day 7", "Queenstown to Te Anau", "Take a daytime road transfer and check in.", "Short lakefront reset or visitor-centre context.", "The third base reduces the otherwise punishing Fiordland day trip.", "Transfer day; keep stops minimal.", "Direct hotel arrival.", "te-anau", [L("Fiordland tourism", "https://www.fiordland.org.nz/"), L("DOC Fiordland", "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/"), L("NZTA journey planner", "https://www.journeys.nzta.govt.nz/journey-planner")], "transfer", "Queenstown to Te Anau by road: about 2 hours."),
        D("Day 8", "Milford Sound / Piopiotahi anchor", "Use a coach-based Milford Road and fiord cruise from Te Anau.", "Selected safe interpretive stops belong inside the excursion.", "The principal scenic payoff intended to justify New Zealand’s place.", "Long road day with boarding; mostly seated but tiring.", "Move the anchor to Day 9 if road, weather, visibility, or operations are poor.", "milford", [L("DOC Fiordland", "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/"), L("Fiordland tourism", "https://www.fiordland.org.nz/")], "day", "Te Anau to Milford Sound by coach: about 2 hours each way on the Milford Road.", I("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Milford_Sound_in_Fiordland_National_Park_01.jpg/500px-Milford_Sound_in_Fiordland_National_Park_01.jpg", "Steep fiord walls reflected in Milford Sound.", "Krzysztof Golik, CC BY-SA 4.0", 500, 333)),
        D("Day 9", "Fiordland reserve and recovery", "Hold for Milford if Day 8 is disrupted; otherwise protect recovery.", "Bird sanctuary, lakeshore, or cave only if energy and operations suit.", "Acknowledges the signature landscape needs a weather reserve.", "Fully adjustable unless the major excursion moves here.", "Indoor interpretation, café, packing, and rest.", "te-anau", [L("DOC Fiordland", "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/"), L("Fiordland tourism", "https://www.fiordland.org.nz/")], "recovery"),
        D("Day 10", "Te Anau to Queenstown Airport and Sydney", "Combine buffered road transfer, check-in, flight, border processing, and hotel transfer.", "Nearby meal; no promised harbor evening.", "Honest treatment as a lost experience day exposes the burden.", "Highest-friction day.", "Use a protected Auckland connection; an early departure may consume the reserve.", ["te-anau", "queenstown", "sydney"], [L("Queenstown international destinations", "https://www.queenstownairport.co.nz/flights/destinations/international-destinations/"), L("NZTA journey planner", "https://www.journeys.nzta.govt.nz/journey-planner"), L("Sydney Airport transport", "https://www.sydneyairport.com.au/info-sheet/transport-options")], "transfer", "Te Anau to ZQN by road (~2 hours), then ZQN–SYD (~3.5 hours if the seasonal direct operates; otherwise a protected Auckland connection)."),
        D("Day 11", "Sydney harbor and history", "Choose Opera House guided context or an easy exterior and foreshore route.", "Add a focused Rocks walk or museum stop.", "Combines iconic scenery with the concept’s strongest history.", "Moderate with a seated ferry option; steps and security vary.", "One harbor-facing interior or Museum of Sydney.", "sydney", [L("Sydney Opera House", "https://www.sydneyoperahouse.com/"), L("Sydney Opera House heritage context", "https://www.sydneyoperahouse.com/our-story"), L("Museums of History NSW", "https://mhnsw.au/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sydney_%28AU%29%2C_Opera_House_--_2019_--_3054.jpg/500px-Sydney_%28AU%29%2C_Opera_House_--_2019_--_3054.jpg", "Sydney Opera House sails seen across the harbor.", "Dietmar Rabich, CC BY-SA 4.0", 500, 281)),
        D("Day 12", "Sydney culture and food", "Visit the Art Gallery of New South Wales, including Australian and First Nations art.", "Add one neighborhood food evening reflecting Sydney’s multicultural identity.", "Strengthens cultural depth and gives food a deliberate role.", "Light to moderate and weather-resilient.", "Short gallery highlights route and meal near the hotel.", "sydney", [L("Art Gallery of NSW", "https://www.artgallery.nsw.gov.au/"), L("Sydney tourism", "https://www.sydney.com/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sydney_%28AU%29%2C_Art_Gallery_of_New_South_Wales_--_2019_--_3103.jpg/500px-Sydney_%28AU%29%2C_Art_Gallery_of_New_South_Wales_--_2019_--_3103.jpg", "Sandstone facade of the Art Gallery of New South Wales.", "Dietmar Rabich, CC BY-SA 4.0", 500, 281)),
        D("Day 13", "Sydney flex", "Use the Royal Botanic Garden and a flexible harbor-edge walk.", "Choose a short terrain-appropriate coastal section or final dinner and rest.", "Genuine flex after the itinerary’s heaviest burden.", "Adjustable; coast adds stairs, sun, wind, and crowds.", "Museum, gallery, long lunch, or hotel rest.", "sydney", [L("Royal Botanic Garden", "https://www.botanicgardens.org.au/royal-botanic-garden-sydney"), L("Bondi to Coogee guidance", "https://www.sydney.com/things-to-do/nature-and-parks/walks/bondi-to-coogee-coastal-walk"), L("Australian Museum", "https://australian.museum/")], "recovery"),
        D("Day 14", "Depart Sydney", "Transfer to the airport and begin the long-haul return.", "None.", "Keeps the final day honest about travel.", "Travel-only; roughly 19–27 hours and usually one or two connections.", "Prioritize connection margin and protect the following local day.", "sydney", [L("Qantas international routes", "https://www.qantas.com/en-us/where-we-fly/international-flight-routes"), L("Sydney Airport transport", "https://www.sydneyairport.com.au/info-sheet/transport-options")], "travel", "Return routing: SYD–DFW–STL on Qantas can be a single stop; SYD–LAX/SFO–STL similar. Anticipate roughly 19–27 hours home.")
      ]
    }
  ];
});
