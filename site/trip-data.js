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
      id: "portugal",
      order: 1,
      name: "Portugal",
      short: "Lisbon → Porto",
      status: "Alternative concept",
      statusDetail: "Still an appealing low-friction option, but now trails Italy + Slovenia on anniversary distinctiveness and castle-and-scenery payoff.",
      days: 11,
      calendarEntries: 12,
      nights: 10,
      bases: 2,
      transfers: 1,
      timing: "Late September–early October 2027",
      shape: "Travel Day 0 + Days 1–11 · Lisbon 5 nights + Porto 5 nights",
      route: "Lisbon (5 nights) → rail → Porto (5 nights)",
      why: "Two bases protect usable time while preserving layered history, food, palaces, river and coast scenery. A defined Douro day gives the anniversary a specific centerpiece.",
      question: "Could an efficient two-city trip become a generic sequence of old towns and day trips?",
      repair: "Keep Sintra disciplined, choose only one Lisbon-region contrast and one northern-history trip, protect a true flex day, and test the open-jaw return before booking.",
      mobility: {
        hardest: "Sintra: slopes, stairs, queues, shuttles, and uneven paths.",
        walking: "Moderate overall; Lisbon and Porto hills, cobbles, and slick paving need selective rides.",
        lower: "Level riverfront time, one-interior days, seated food experiences, and a zero-activity flex day.",
        recovery: "Arrival day stays light; Day 10 is protected flex/recovery."
      },
      responsible: "Prefer rail between bases, visit pressure-sensitive Sintra with timed entry and restraint, choose locally owned food/guide options, and treat the long-haul aviation burden as part of the decision.",
      flight: {
        summary: "Expected pattern — STL–LIS / OPO–STL open jaw with one connection each way (typically ORD, EWR, JFK, or IAD); two connections possible from Porto on weaker dates. No direct STL–Lisbon flight exists.",
        detail: "STL–ORD–LIS (TAP, year-round ORD–LIS nonstop) is the cleanest one-stop; alternates include STL–EWR/JFK/IAD/BOS–LIS (TAP/United; BOS and MIA are TAP-served). When operating, seasonal STL–Frankfurt (Lufthansa) and STL–London Heathrow (British Airways, from April 2026) nonstops add FRA/LHR one-stop gateways. Return best case is OPO–EWR (United, seasonal) for one stop; OPO–LIS or a European hub means two stops on weaker dates. Allow roughly 11–15 hours outbound and 13–17 hours home. If OPO is poor, position by rail to Lisbon the prior day and add the airport-area night openly.",
        burden: "Overnight outbound; airport walking, connection time, and prolonged sitting.",
        links: [
          L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm"),
          L("Lisbon Metro", "https://www.metrolisboa.pt/en/"),
          L("Metro do Porto maps and timetables", "https://en.metrodoporto.pt/pages/396", "Portuguese metadata")
        ]
      },
      cost: {
        range: "$7,500–$10,500",
        hotels: "Lisbon $180–$300/night · Porto $160–$270/night",
        buys: "Comfortable, well-reviewed midrange near useful historic-core transit; lower prices may mean smaller rooms, more hill exposure, or no view.",
        pressure: "Lower: open-jaw airfare, Lisbon demand, Douro format, events, and exchange rates.",
        confidence: "Medium-high",
        verdict: "Strongest probability of a comfortable, distinctive anniversary trip without paying heavily for logistical complexity."
      },
      images: [
        {
          file: "assets/images/portugal-pena-palace.webp",
          alt: "Colorful red-and-yellow Pena Palace rising above wooded Sintra hills.",
          credit: "Palacio Nacional da Pena, Sintra, Portugal, Diego Delso, CC BY-SA 4.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Palacio_Nacional_da_Pena,_Sintra,_Portugal,_2019-05-25,_DD_131.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0/",
          note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP."
        },
        {
          file: "assets/images/portugal-douro-valley.webp",
          alt: "Steep green vineyard terraces descending toward the Douro River.",
          credit: "Douro Valley, Portugal, flowcomm, CC BY 2.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Douro_Valley,_Portugal_%2853975017619%29.jpg",
          license: "https://creativecommons.org/licenses/by/2.0/",
          note: "Displayed uncropped. Local file is an uncropped resized derivative, converted from the original JPEG to WebP."
        }
      ],
      stops: [
        { id: "lisbon", name: "Lisbon", lat: 38.7223, lng: -9.1393, role: "base" },
        { id: "sintra", name: "Sintra", lat: 38.8029, lng: -9.3817, role: "excursion" },
        { id: "porto", name: "Porto", lat: 41.1579, lng: -8.6291, role: "base" },
        { id: "douro", name: "Douro Valley", lat: 41.1621, lng: -7.7898, role: "excursion" },
        { id: "guimaraes", name: "Guimarães — alternative", lat: 41.4425, lng: -8.2918, role: "alternative" },
        { id: "braga", name: "Braga — alternative", lat: 41.5454, lng: -8.4265, role: "alternative" }
      ],
      segments: [
        { from: "lisbon", to: "sintra", type: "excursion" },
        { from: "lisbon", to: "porto", type: "rail" },
        { from: "porto", to: "douro", type: "excursion" },
        { from: "porto", to: "guimaraes", type: "alternative" },
        { from: "porto", to: "braga", type: "alternative" }
      ],
      daysPlan: [
        D("Travel Day 0", "Depart STL", "Begin the overnight international itinerary to Lisbon.", "Meals, hydration, movement, and sleep are the plan.", "Makes the true calendar burden visible and protects arrival.", "Airport walking, one connection (two on weaker dates), and prolonged sitting.", "After disruption, discard Day 1 orientation rather than borrow from sleep.", "lisbon", [L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Sample routing: STL–ORD–LIS on TAP is the cleanest one-stop; alternates connect via EWR, JFK, IAD, or BOS, and seasonal STL–FRA or STL–LHR work when operating. Anticipate roughly 11–15 hours total."),
        D("Day 1", "Lisbon arrival and recovery", "Transfer, check in, and take a short Baixa or Praça do Comércio orientation only if energy permits.", "Early meal near the hotel or a seated Tagus-side pause.", "Immediate atmosphere without turning jet lag into a checklist.", "Very light; choose the level riverfront and avoid optional hills.", "Hotel meal and sleep.", "lisbon", [L("Visit Lisboa", "https://www.visitlisboa.com/en"), L("Lisbon Metro", "https://www.metrolisboa.pt/en/")], "recovery", "LIS airport to the historic center: about 30 minutes by metro or taxi.", I("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Arco_Triunfal_da_Rua_Augusta%2C_Plaza_del_Comercio%2C_Lisboa%2C_Portugal%2C_2012-05-12%2C_DD_02.JPG/500px-Arco_Triunfal_da_Rua_Augusta%2C_Plaza_del_Comercio%2C_Lisboa%2C_Portugal%2C_2012-05-12%2C_DD_02.JPG", "Rua Augusta Arch framing Lisbon’s Praça do Comércio.", "Diego Delso, CC BY-SA 3.0", 500, 339)),
        D("Day 2", "Historic Lisbon and local food", "Explore Alfama and the castle district, starting uphill by transit and descending selectively.", "Fado Museum or Lisboa Story Centre, then a focused food evening.", "Layered history, neighborhood character, and food.", "Moderate; steep grades, cobbles, and steps require rides and a seated break.", "One historic interior and nearby dinner.", "lisbon", [L("São Jorge Castle", "https://castelodesaojorge.pt/en/"), L("Fado Museum", "https://www.museudofado.pt/en"), L("Lisboa Story Centre", "https://www.lisboastorycentre.pt/en")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/View_of_Castelo_de_S%C3%A3o_Jorge_from_S%C3%A3o_Pedro_de_Alc%C3%A2ntara%2C_Lisbon%2C_20250604_1614_9358.jpg/500px-View_of_Castelo_de_S%C3%A3o_Jorge_from_S%C3%A3o_Pedro_de_Alc%C3%A2ntara%2C_Lisbon%2C_20250604_1614_9358.jpg", "São Jorge Castle’s walls and towers above Lisbon’s rooftops.", "Jakub Hałun, CC BY 4.0", 500, 334)),
        D("Day 3", "Sintra palace day", "Use Pena Palace and park as the single timed anchor.", "Add Monserrate only as the lighter second stop.", "Portugal’s clearest palace-and-castle day.", "High-moderate; slopes, stairs, queues, shuttles, and uneven paths.", "Shorten gardens or replace severe weather with a Lisbon museum day.", "sintra", [L("Pena Palace", "https://www.parquesdesintra.pt/en/parks-monuments/park-and-national-palace-of-pena/"), L("Pena ticket guidance", "https://www.parquesdesintra.pt/en/plan-your-visit/tickets-palace-of-pena/"), L("Monserrate", "https://www.parquesdesintra.pt/en/parks-monuments/park-and-palace-of-monserrate/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Pena_Palace%2C_Sintra%2C_Portugal%2C_20250606_1031_9983.jpg/500px-Pena_Palace%2C_Sintra%2C_Portugal%2C_20250606_1031_9983.jpg", "Colorful terraces and towers of Pena Palace above Sintra.", "Jakub Hałun, CC BY 4.0", 500, 334)),
        D("Day 4", "Easier Lisbon and free afternoon", "Visit the National Tile Museum as a compact indoor anchor.", "Keep the afternoon genuinely free; Belém is optional.", "Adds Portuguese visual history while protecting breathing room.", "Light and adjustable; Belém is flatter but involves distance.", "Cafés, laundry, a nap, or independent wandering.", "lisbon", [L("National Tile Museum", "https://www.museusemonumentos.pt/en/museus-e-monumentos/national-tile-museum", "Portuguese metadata"), L("Belém Tower", "https://en.wikipedia.org/wiki/Bel%C3%A9m_Tower")], "recovery", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Museu_Nacional_do_Azulejo%2C_Lisbon%2C_townscape_azulejo.jpg/500px-Museu_Nacional_do_Azulejo%2C_Lisbon%2C_townscape_azulejo.jpg", "Blue-and-white azulejo tile panel of Lisbon at the National Tile Museum.", "Gerda Arendt, CC0", 500, 383)),
        D("Day 5", "One Lisbon-region contrast", "Choose Évora for concentrated history or Cascais for coast and recovery.", "Final Lisbon dinner in a new neighborhood.", "Adds history or scenic contrast without a third base.", "Moderate; Évora has uneven paving, while the coast is exposed.", "Gulbenkian Museum and a long Lisbon lunch.", "lisbon", [L("Évora historic city", "https://en.wikipedia.org/wiki/%C3%89vora"), L("Visit Cascais", "https://www.visitcascais.com/en"), L("Gulbenkian Museum", "https://gulbenkian.pt/museu/en/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Roman_Temple_Evora_Portugal_01.jpg/500px-Roman_Temple_Evora_Portugal_01.jpg", "Granite columns of Évora’s Roman temple.", "Norbert Nagel, CC BY-SA 3.0", 500, 343)),
        D("Day 6", "Rail to Porto", "Take intercity rail, check in, and reset luggage.", "Brief Ribeira orientation or São Bento’s tiled hall.", "One straightforward move earns a different northern base.", "Transfer day; hills, stairs, and slick paving increase luggage effort.", "Direct hotel arrival and nearby dinner.", "porto", [L("Porto historic center — official tourism", "https://visitporto.travel/en-GB")], "transfer", "Intercity rail Lisbon–Porto (Campanhã): about 3 hours."),
        D("Day 7", "Historic Porto", "Tour Palácio da Bolsa.", "Choose a cathedral-to-river sequence or a lower-walking riverfront version.", "Ceremonial architecture, lived-in history, food, and exploration.", "Moderate; start high, work downhill, and use transport back.", "One interior and a covered food experience.", "porto", [L("Palácio da Bolsa", "https://palaciodabolsa.com/en/"), L("Visit Porto", "https://visitporto.travel/en-GB")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Palacio_da_Bolsa_%28Porto%29.JPG/500px-Palacio_da_Bolsa_%28Porto%29.JPG", "Neoclassical facade of Porto’s Palácio da Bolsa.", "Manuel de Sousa, public domain", 500, 375)),
        D("Day 8", "Anniversary Douro day", "Take a defined small-group or private landscape day centered on scenery, river, and regional food.", "Keep the special dinner simple enough to avoid an endurance day.", "Supplies the singular landscape-and-food occasion; wine is optional.", "Mostly seated transport with selected viewpoints.", "Serralves, sheltered river views, and anniversary dinner in Porto.", "douro", [L("Douro Valley — Visit Portugal", "https://www.visitportugal.com/en/content/douro-valley"), L("Serralves", "https://www.serralves.pt/en/")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Douro_Valley%2C_Portugal_%2853975017619%29.jpg/500px-Douro_Valley%2C_Portugal_%2853975017619%29.jpg", "Vineyard terraces stepping down toward the Douro River.", "flowcomm, CC BY 2.0", 500, 333)),
        D("Day 9", "Northern Portugal history", "Visit Guimarães historic center and castle zone.", "Have one regional lunch; Braga is an alternative, never an addition.", "Adds concentrated medieval and early-national history.", "Moderate; old paving and grades require a shortened core route.", "Porto museum, historic interior, or food experience.", ["guimaraes", "braga"], [L("Guimarães historic center — official tourism", "https://www.visitguimaraes.travel/", "Portuguese metadata"), L("Bom Jesus do Monte — official site", "https://bomjesus.pt/", "Portuguese")], "day", "", I("https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Castelo_de_Guimaraes.jpg/500px-Castelo_de_Guimaraes.jpg", "Stone keep and battlements of Guimarães Castle.", "Filipe Fortes, CC BY-SA 2.0", 500, 250)),
        D("Day 10", "Porto flex and recovery", "Make no required booking; move a weather anchor, revisit a favorite area, or rest.", "Slow Serralves visit or short river experience if energy is good.", "Protects the trip from rain and excursion fatigue.", "Fully adjustable, including zero formal activity.", "Rest, pack, and eat nearby.", "porto", [L("Serralves", "https://www.serralves.pt/en/"), L("Visit Porto", "https://visitporto.travel/en-GB")], "recovery"),
        D("Day 11", "Porto departure and return to STL", "Transfer to OPO and begin the international return.", "None.", "A travel-only final day protects the long-haul connection.", "Luggage, airport walking, and roughly 13–17 hours expected travel.", "If OPO fails the booking gate, revise to a Lisbon positioning night and update counts.", "porto", [L("Metro do Porto", "https://en.metrodoporto.pt/pages/396"), L("St. Louis Lambert airport overview", "https://www.stlouis-mo.gov/government/departments/airport/index.cfm")], "travel", "Return routing: OPO–EWR (United, seasonal) is the one-stop best case; weaker dates route via Lisbon or a European hub with two stops. Anticipate roughly 13–17 hours home.")
      ]
    },
    {
      id: "spain",
      order: 2,
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
        verdict: "A modest premium over Portugal converts into an especially strong history, royal-site, food, and independent-exploration fit."
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
      id: "new-zealand-australia",
      order: 3,
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

