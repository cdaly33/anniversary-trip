(() => {
  "use strict";

  const CAVEAT = "2027 schedules, prices, availability, operating dates, entry rules, and weather expectations remain provisional.";
  const STORAGE_KEY = "anniversaryTripReview.v1";
  const reactions = ["Love this", "Interested", "Unsure", "Not for us"];
  const confidences = ["First impression", "Leaning", "Confident"];

  const trips = [
    {
      id: "portugal", order: 0, group: "Current shortlist", name: "Portugal", short: "Lisbon → Porto", status: "Current leading fit · Conditional",
      days: 11, bases: 2, timing: "Sep 23–Oct 3", shape: "11 days / 10 nights · Lisbon 5 + Porto 5",
      why: "The best current comfort/value hypothesis: two bases protect usable time while preserving history, food, palaces, river and coast scenery. A defined Douro day gives the anniversary a specific centerpiece.",
      question: "Could an efficient two-city trip become a generic sequence of old towns and day trips?",
      repair: "Keep Sintra to one major site, choose only one Lisbon day trip and one northern-history trip, define the Douro celebration with non-wine and rain fallbacks, protect a true flex day, reduce hills, and test open-jaw flights.",
      pace: "Two bases and one rail move. Use transit or rides for hill reduction, keep seated options in the easier Lisbon day, and protect the Porto flex/recovery day.",
      route: "Lisbon (5 nights) → rail → Porto (5 nights)", centerpiece: "Douro scenic-and-regional-food day",
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
      beats: [
        ["Arrive Lisbon", "Settle in, gentle neighborhood walk, and an early meal.", "lisbon"],
        ["Historic Lisbon", "One historic district and viewpoint sequence using transit or rides to reduce hills; food evening.", "lisbon"],
        ["Sintra", "One major timed-admission site—Pena only if chosen—plus one lighter town, garden, or scenic element.", "sintra"],
        ["Easier Lisbon", "One market or museum; free afternoon with seated options.", "lisbon"],
        ["Lisbon day trip", "Choose a coast outing or a countryside/history outing after travel times are verified; drop it if rest matters more.", "lisbon"],
        ["Rail to Porto", "Travel north, check in, and take a riverside orientation.", "porto"],
        ["Historic Porto", "One old-city/history route with hill-reducing transport and café breaks.", "porto"],
        ["Anniversary Douro day", "One defined small-group scenic-and-regional-food experience, with non-wine and weather fallbacks; celebration dinner.", "douro"],
        ["Northern history", "Guimarães or Braga, never both, after realistic transfer time is accepted.", ["guimaraes", "braga"]],
        ["True flex / recovery", "Gardens, one river or food experience, a moved excursion, or no formal activity.", "porto"],
        ["Depart Porto", "Use open-jaw routing only if schedules, connections, and fares support it.", "porto"]
      ]
    },
    {
      id: "spain", order: 1, group: "Council alternative", name: "Spain", short: "Madrid → Seville", status: "Strongest challenger · Alternative",
      days: 11, bases: 2, timing: "Late Sep–early Oct", shape: "11 days · Madrid 5 + Seville 5",
      why: "The clearest match for Rachel and Chris's proven love of history, castles and royal sites, food, active days, and independent exploration, with two bases and one simple rail move.",
      question: "Would a monument- and city-heavy route lack the natural drama expected of an anniversary trip?",
      repair: "Test Andalusian heat and event crowds, then decide whether the royal, art, food, and historic-city depth creates enough contrast on its own.",
      pace: "Two bases and one rail move. Keep Segovia optional, separate major monument days, and confirm lower-walking or seated alternatives with each venue before committing.",
      repairLabel: "What still needs testing", route: "Madrid (5 nights) → rail → Seville (5 nights)", centerpiece: "Final celebration in Seville",
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
      beats: [
        ["Madrid arrival + recovery", "Settle into Madrid before the royal and art focus.", "madrid"],
        ["Madrid royal + art focus", "Build the city stay around major royal, historic, and art anchors.", "madrid"],
        ["Toledo", "Use Madrid as the base for a history-forward Toledo day trip.", "toledo"],
        ["Optional Segovia", "Keep Segovia optional rather than stacking day trips.", "segovia"],
        ["Rail to Seville", "Make one simple intercity move.", "seville"],
        ["Seville depth", "Monumental core plus a separate neighborhood and food day.", "seville"],
        ["Córdoba + flex", "Córdoba, one flexible cultural or countryside day, and a final celebration.", "cordoba"]
      ]
    },
    {
      id: "italy-croatia", order: 2, group: "Current shortlist", name: "Northern Italy + Croatia", short: "Como → Venice → Rovinj", status: "Conditional outline",
      days: 12, bases: 3, timing: "Sep 9–20", shape: "12 days / 11 nights · Lake Como 4 + Venice 3 + Rovinj 4",
      why: "A romantic, cinematic progression from lake scenery to historic Venice and the Adriatic, with an excellent mix of scenery, history, and regional food.",
      question: "Could the unresolved Venice–Rovinj link and final airport consume two vacation days?",
      repair: "Confirm a direct or one-change route, a door-to-door time ceiling, and a humane departure gateway before commitment; preserve protected transfer evenings and equal-status accessible, non-swimming, and alcohol-free choices.",
      pace: "Three bases create the highest relocation load among the European routes shown. Keep both transfer evenings protected and retain the outlined recovery, seated, and lower-walking choices.",
      route: "Lake Como (4 nights) → Venice (3) → Rovinj (4)", centerpiece: "Lake anniversary day + Adriatic finale",
      stops: [
        { id: "como", name: "Lake Como", lat: 45.987, lng: 9.2572, role: "base" },
        { id: "venice", name: "Venice", lat: 45.4408, lng: 12.3155, role: "base" },
        { id: "rovinj", name: "Rovinj", lat: 45.0812, lng: 13.6387, role: "base" },
        { id: "istria", name: "Istrian interior", lat: 45.25, lng: 13.82, role: "excursion" }
      ],
      segments: [
        { from: "como", to: "venice", type: "uncertain" },
        { from: "venice", to: "rovinj", type: "uncertain" },
        { from: "rovinj", to: "istria", type: "excursion" }
      ],
      beats: [
        ["Arrive Lake Como", "Settle in, short lakefront orientation, and early dinner.", "como"],
        ["Lake villages", "One ferry-linked village pairing and a long lunch; lower-walking alternative.", "como"],
        ["Anniversary lake day", "One villa or garden plus scenic time and a celebratory dinner.", "como"],
        ["Protected recovery", "One optional lake cruise, garden, or town only; otherwise rest.", "como"],
        ["Transfer to Venice", "Travel, check in, and take an easy neighborhood evening.", "venice"],
        ["Historic Venice", "One major landmark complex, then quiet lanes or café time.", "venice"],
        ["Venice choice", "Lagoon-island outing or food-and-neighborhood experience, not both.", "venice"],
        ["Transfer to Rovinj", "Use the verified direct or one-change route; harbor evening only.", "rovinj"],
        ["Rovinj", "Old town and waterfront, with seated, low-walking, and non-swimming choices.", "rovinj"],
        ["Istrian interior", "One hill town plus regional food; wine and alcohol-free versions have equal status.", "istria"],
        ["Adriatic flex", "One weather-flexible coastal, heritage, or food anchor; final dinner and packing.", "rovinj"],
        ["Depart", "Reserved transfer to the confirmed regional gateway; abandon this shape if it cannot be humane.", "rovinj"]
      ]
    },
    {
      id: "new-zealand-australia", order: 3, group: "Current shortlist", name: "New Zealand + Australia", short: "Queenstown → Te Anau ⇢ Sydney", status: "Council: rejected as recommended",
      days: 14, bases: 3, timing: "November", shape: "14 calendar days / 11 hotel nights · Queenstown 4 + Te Anau 3 + Sydney 4",
      why: "Potentially the highest spectacle and clearest once-in-a-lifetime scale, but the travel-to-experience ratio is the weakest and the historical fit is limited.",
      question: "Can two countries leave enough recovery, weather resilience, New Zealand scenery, and Australian depth under a 14-day ceiling?",
      repair: "The shown route is only the least-bad fallback: Te Anau reduces the Milford road day, the first 48 hours stay low-stakes, and a weather reserve protects Fiordland. It remains structurally rejected; a New Zealand-only rebuild needs fresh review.",
      pace: "This route has the heaviest transfer and recovery burden shown. Keep the first 48 hours low-stakes, preserve the weather reserve, and treat every scenic day as reducible or seated where the outline allows.",
      route: "Queenstown (4 nights) → Te Anau (3) ⇢ Sydney (4)", centerpiece: "Fiordland scenery + Sydney harbor",
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
      beats: [
        ["Depart", "Pacific travel begins.", "queenstown"], ["In transit", "No itinerary commitments.", "queenstown"],
        ["Arrive Queenstown", "Transfer, meal, and sleep.", "queenstown"],
        ["Recovery day", "Lakefront orientation or seated scenic option; fully reducible.", "queenstown"],
        ["Queenstown scenery", "One Glenorchy-area or local lake experience selected for weather and effort.", "glenorchy"],
        ["Anniversary day", "One scenic lake or food-country experience and a special dinner; no strenuous prepaid anchor.", "queenstown"],
        ["Transfer to Te Anau", "Daytime road transfer and a quiet lakeside evening.", "te-anau"],
        ["Fiordland anchor", "Milford Sound excursion from Te Anau, subject to safe operations and weather.", "milford"],
        ["Weather reserve", "Move Fiordland here if needed; otherwise one short nature/cultural experience or rest.", "te-anau"],
        ["Transfer / fly to Sydney", "Te Anau to Queenstown airport, then trans-Tasman flight; no sightseeing obligation.", ["te-anau", "queenstown", "sydney"]],
        ["Sydney harbor", "Landmarks plus one historic neighborhood, with seated alternatives.", "sydney"],
        ["Sydney culture + food", "One museum or historic site and a food-focused evening.", "sydney"],
        ["Sydney flex", "Gardens, harbor outing, coast, or rest according to weather and energy.", "sydney"],
        ["Depart", "Begin return travel.", "sydney"]
      ]
    },
    {
      id: "turkiye", order: 4, group: "Council alternative", name: "Türkiye", short: "Istanbul ⇢ Cappadocia", status: "Alternative",
      days: 11, bases: 2, timing: "Late Sep–mid Oct", shape: "11 days · Istanbul 6 + Cappadocia 4",
      why: "No other proposal combines an imperial city on two continents with Cappadocia's rock-cut landscape so efficiently. Its Bosphorus evening and sunrise moments come from place rather than luxury.",
      question: "Does the operational burden—safety, entry, aviation, urban intensity, and balloon or weather dependence—remain acceptable?",
      repair: "Actively monitor official conditions and flight reliability, and ensure Cappadocia still works if balloon operations do not.",
      pace: "Two bases but one domestic flight and an intense city stay. Before choosing Derinkuyu or valley activities, ask providers about walking distance, stairs, terrain, and lower-effort alternatives.",
      repairLabel: "What still needs testing", route: "Istanbul (6 nights) ⇢ domestic flight ⇢ Cappadocia (4)", centerpiece: "Bosphorus evening + Cappadocia sunrise",
      stops: [
        { id: "istanbul", name: "Istanbul", lat: 41.0082, lng: 28.9784, role: "base" },
        { id: "bosphorus", name: "Bosphorus", lat: 41.104, lng: 29.055, role: "excursion" },
        { id: "cappadocia", name: "Cappadocia", lat: 38.6431, lng: 34.8289, role: "base" },
        { id: "underground", name: "Derinkuyu Underground City", lat: 38.3735, lng: 34.7348, role: "excursion" },
        { id: "valleys", name: "Cappadocia valleys", lat: 38.655, lng: 34.84, role: "excursion" }
      ],
      segments: [
        { from: "istanbul", to: "bosphorus", type: "excursion" },
        { from: "istanbul", to: "cappadocia", type: "flight" },
        { from: "cappadocia", to: "underground", type: "excursion" },
        { from: "cappadocia", to: "valleys", type: "excursion" }
      ],
      beats: [
        ["Istanbul arrival + depth", "Settle in, then explore the city's layered history without rushing.", "istanbul"],
        ["Topkapı + imperial history", "Use the longer Istanbul stay for major historic anchors.", "istanbul"],
        ["Bosphorus + food neighborhoods", "Pair a water perspective with regional food and neighborhood time.", "bosphorus"],
        ["Fly to Cappadocia", "One domestic flight connects the two bases.", "cappadocia"],
        ["Rock-cut heritage", "Churches, carved landscapes, and regional history.", "cappadocia"],
        ["Derinkuyu option + valleys", "If selected, balance Derinkuyu's underground heritage with the open landscape; no timed visit is assumed.", ["underground", "valleys"]],
        ["Two sunrise chances", "Allow two opportunities without making balloon operation essential.", "valleys"]
      ]
    },
    {
      id: "austria-slovenia", order: 5, group: "Council alternative", name: "Austria + Slovenia", short: "Ljubljana → Vienna", status: "Alternative",
      days: 12, bases: 2, timing: "Early–mid Sep", shape: "12 days / 11 nights · Ljubljana 6 + Vienna 5",
      why: "The strongest logistical alternative: scenery, castles, regional food, and imperial anniversary grandeur with one hotel change and no intra-trip flight.",
      question: "Would repeated road excursions in Slovenia and the omission of Salzburg make the two-country balance feel uneven?",
      repair: "Verify the day-trip rhythm and whether Ljubljana plus Vienna feels like one coherent contrast rather than Vienna with a series of Slovenian excursions.",
      pace: "One hotel change keeps relocation low, but Slovenia relies on repeated road excursions. Protect the Slovenia flex day and compare shorter or seated versions of each outing.",
      repairLabel: "What still needs testing", route: "Ljubljana (6 nights) → rail → Vienna (5 nights)", centerpiece: "Vienna anniversary dinner",
      stops: [
        { id: "ljubljana", name: "Ljubljana", lat: 46.0569, lng: 14.5058, role: "base" },
        { id: "bled", name: "Lake Bled", lat: 46.3625, lng: 14.0938, role: "excursion" },
        { id: "bohinj", name: "Lake Bohinj", lat: 46.2867, lng: 13.863, role: "excursion" },
        { id: "predjama", name: "Predjama", lat: 45.8158, lng: 14.1274, role: "excursion" },
        { id: "vienna", name: "Vienna", lat: 48.2082, lng: 16.3738, role: "base" },
        { id: "wachau", name: "Wachau", lat: 48.389, lng: 15.45, role: "excursion" }
      ],
      segments: [
        { from: "ljubljana", to: "bled", type: "excursion" },
        { from: "ljubljana", to: "bohinj", type: "excursion" },
        { from: "ljubljana", to: "predjama", type: "excursion" },
        { from: "ljubljana", to: "vienna", type: "rail" },
        { from: "vienna", to: "wachau", type: "excursion" }
      ],
      beats: [
        ["Ljubljana + castle", "Use a compact base for city character and castle history.", "ljubljana"],
        ["Bled + Bohinj", "A scenery-focused outing from Ljubljana.", ["bled", "bohinj"]],
        ["Karst + Predjama", "One karst cave plus Predjama rather than a checklist circuit.", "predjama"],
        ["Slovenia flex day", "Keep one day open for pace, weather, or another regional experience.", "ljubljana"],
        ["Rail to Vienna", "One substantial move connects the two bases.", "vienna"],
        ["Imperial Vienna", "Palace, historic center, music, museum, and food in a deeper city stay.", "vienna"],
        ["Wachau + anniversary", "One Wachau outing and an anniversary dinner.", "wachau"]
      ]
    },
    {
      id: "sicily-malta", order: 6, group: "Council alternative", name: "Sicily + Malta", short: "Ortigia ⇢ Valletta", status: "Alternative",
      days: 12, bases: 2, timing: "Sep 24–Oct 10", shape: "12 days / 11 nights · Ortigia/Syracuse 6 + Valletta 5",
      why: "Layered Rome-like history, Mediterranean atmosphere, Etna-scale scenery, strong food, and two character-rich bases. The anniversary effect comes from views and place, not prestige spending.",
      question: "Could dispersed Sicily sights and the Sicily–Malta transfer recreate the costly cross-border friction criticized elsewhere?",
      repair: "Test realistic guided transport and the island transfer before treating the two-base simplicity as proven.",
      pace: "Two bases, with dispersed excursions and an unverified island transfer. Keep the slow Ortigia celebration and Malta flex day protected, and verify walking, stairs, and transfer effort before selecting outings.",
      repairLabel: "What still needs testing", route: "Ortigia/Syracuse (6 nights) ⇢ Valletta (5 nights)", centerpiece: "Slow Ortigia celebration day",
      stops: [
        { id: "ortigia", name: "Ortigia / Syracuse", lat: 37.0646, lng: 15.2937, role: "base" },
        { id: "noto", name: "Noto", lat: 36.8918, lng: 15.0702, role: "excursion" },
        { id: "etna", name: "Mount Etna", lat: 37.751, lng: 14.9934, role: "excursion" },
        { id: "valletta", name: "Valletta", lat: 35.8989, lng: 14.5146, role: "base" },
        { id: "mdina", name: "Mdina", lat: 35.8869, lng: 14.4031, role: "excursion" },
        { id: "gozo", name: "Gozo", lat: 36.0443, lng: 14.2512, role: "excursion" }
      ],
      segments: [
        { from: "ortigia", to: "noto", type: "excursion" },
        { from: "ortigia", to: "etna", type: "excursion" },
        { from: "ortigia", to: "valletta", type: "uncertain" },
        { from: "valletta", to: "mdina", type: "excursion" },
        { from: "valletta", to: "gozo", type: "excursion" }
      ],
      beats: [
        ["Ancient Syracuse", "Use Ortigia/Syracuse as the base for layered ancient history.", "ortigia"],
        ["Noto", "A focused southeast Sicily day trip.", "noto"],
        ["Etna", "One landscape anchor at Etna scale.", "etna"],
        ["Slow Ortigia celebration", "Protect a slower anniversary day rooted in waterfront atmosphere and food.", "ortigia"],
        ["Taormina or southeast", "Choose one rather than stretching the Sicily stay.", "ortigia"],
        ["Transfer to Valletta", "Move to Malta only after the transfer is shown to be humane.", "valletta"],
        ["Fortified Malta", "Valletta, Mdina, Gozo, and a flex day from the second base.", ["valletta", "mdina", "gozo"]]
      ]
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = trips;
    return;
  }

  const els = Object.fromEntries([
    "concept-list","sort-concepts","mobile-concept-trigger","mobile-current-concept","review-progress","map-heading",
    "map-fallback","fallback-route","retry-map","fit-route","enable-map","route-description","compare-strip",
    "concept-kicker","concept-title","route-shape","pin-comparison","route-facts","why-fit","plan-kind","toggle-plan",
    "beat-position","beat-title","beat-detail","previous-beat","next-beat","itinerary-list","hard-question","repair-label",
    "repair","pace-cue","favorite-toggle","reaction-options","confidence-options","trip-notes","needs-answer","save-status",
    "rail-beats","live-region","summary-dialog","summary-content","summary-feedback","clear-dialog"
  ].map(id => [id, document.getElementById(id)]));

  let selectedId = "portugal";
  let beatIndex = 0;
  let comparisonId = null;
  let map;
  let tileLayer;
  let routeLayers = [];
  let mapEnabled = false;
  let pendingNote = null;
  let review = loadReview();

  function emptyReview() {
    return { schemaVersion: 1, updatedAt: null, trips: {} };
  }

  function loadReview() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return stored && stored.schemaVersion === 1 && stored.trips ? stored : emptyReview();
    } catch (error) {
      console.warn("Review could not be loaded.", error);
      return emptyReview();
    }
  }

  function currentTrip() {
    return trips.find(trip => trip.id === selectedId);
  }

  function currentReview() {
    return review.trips[selectedId] || {};
  }

  function isReviewed(item) {
    return Boolean(item && (item.favorite || item.reaction || item.confidence || item.notes || item.needsAnswer));
  }

  function writeReviewForTrip(tripId, patch, { announceSave = true, updateUi = true } = {}) {
    const savedAt = new Date().toISOString();
    const nextReview = {
      ...review,
      updatedAt: savedAt,
      trips: {
        ...review.trips,
        [tripId]: { ...(review.trips[tripId] || {}), ...patch, updatedAt: savedAt }
      }
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReview));
      review = nextReview;
      if (tripId === selectedId) els["save-status"].textContent = "Saved in this browser profile";
      if (announceSave) announce("Review saved in this browser profile.");
    } catch (error) {
      console.warn("Review could not be saved.", error);
      if (tripId === selectedId) {
        els["save-status"].textContent = "This browser could not save your review. Copy or download it before leaving.";
      }
      return false;
    }
    if (updateUi) {
      updateProgress();
      renderConcepts();
    }
    return true;
  }

  function writeReview(patch) {
    return writeReviewForTrip(selectedId, patch);
  }

  function debouncedNotesSave() {
    if (pendingNote) clearTimeout(pendingNote.timer);
    const routeId = selectedId;
    const value = els["trip-notes"].value;
    els["save-status"].textContent = "Saving…";
    pendingNote = {
      routeId,
      value,
      timer: window.setTimeout(() => flushPendingNotes(), 350)
    };
  }

  function flushPendingNotes({ announceSave = true, updateUi = true } = {}) {
    if (!pendingNote) return true;
    const { routeId, value, timer } = pendingNote;
    window.clearTimeout(timer);
    pendingNote = null;
    return writeReviewForTrip(routeId, { notes: value }, { announceSave, updateUi });
  }

  function announce(message) {
    els["live-region"].textContent = "";
    window.setTimeout(() => { els["live-region"].textContent = message; }, 20);
  }

  function sortedTrips() {
    const list = [...trips];
    const sort = els["sort-concepts"].value;
    if (sort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "bases") list.sort((a, b) => a.bases - b.bases || a.order - b.order);
    if (sort === "days") list.sort((a, b) => a.days - b.days || a.order - b.order);
    return list;
  }

  function renderConcepts() {
    els["concept-list"].replaceChildren();
    sortedTrips().forEach(trip => {
      const itemReview = review.trips[trip.id] || {};
      const button = document.createElement("button");
      button.type = "button";
      button.className = "concept-item";
      if (trip.id === selectedId) button.classList.add("selected");
      if (trip.id === comparisonId) button.classList.add("compared");
      button.setAttribute("aria-pressed", String(trip.id === selectedId));
      button.dataset.tripId = trip.id;

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = trip.name;
      const meta = document.createElement("span");
      meta.className = "meta";
      const status = document.createElement("span");
      status.textContent = `${trip.group} · ${trip.status}`;
      const personal = document.createElement("span");
      personal.className = "personal";
      personal.textContent = [itemReview.favorite ? "♥" : "", itemReview.reaction || ""].filter(Boolean).join(" ");
      meta.append(status, personal);
      button.append(name, meta);
      button.addEventListener("click", () => selectTrip(trip.id, 0, true));
      els["concept-list"].append(button);
    });
  }

  function renderEvidence() {
    const trip = currentTrip();
    const itemReview = currentReview();
    document.title = `${trip.name} · Seven anniversary routes`;
    els["mobile-current-concept"].textContent = trip.name;
    els["map-heading"].textContent = `${trip.name} route`;
    els["concept-kicker"].textContent = `${trip.group} · ${trip.status}`;
    els["concept-title"].textContent = trip.name;
    els["route-shape"].textContent = trip.shape;
    els["why-fit"].textContent = trip.why;
    els["hard-question"].textContent = trip.question;
    els["repair-label"].textContent = trip.repairLabel || "What would make it work";
    els.repair.textContent = trip.repair;
    els["pace-cue"].textContent = trip.pace;
    els["plan-kind"].textContent = trip.order <= 3 && trip.id !== "spain" ? "Daily plan" : "Route beats";
    els["route-description"].textContent = `${trip.route}. Working timing: ${trip.timing}.`;
    els["fallback-route"].textContent = mapTextSummary(trip);

    els["route-facts"].replaceChildren(
      fact("Duration", `${trip.days} days`),
      fact("Bases", String(trip.bases)),
      fact("Timing", trip.timing)
    );

    els["favorite-toggle"].setAttribute("aria-pressed", String(Boolean(itemReview.favorite)));
    els["favorite-toggle"].innerHTML = itemReview.favorite
      ? '<span aria-hidden="true">♥</span> Shortlisted'
      : '<span aria-hidden="true">♡</span> Shortlist this trip';
    renderChoices(els["reaction-options"], reactions, itemReview.reaction, "reaction");
    renderChoices(els["confidence-options"], confidences, itemReview.confidence, "confidence");
    els["trip-notes"].value = itemReview.notes || "";
    els["needs-answer"].checked = Boolean(itemReview.needsAnswer);
    els["save-status"].textContent = itemReview.updatedAt ? "Saved in this browser profile" : "";
    els["pin-comparison"].textContent = comparisonId === trip.id ? "Remove comparison" : "Pin for comparison";
    els["pin-comparison"].setAttribute("aria-pressed", String(comparisonId === trip.id));
    renderItinerary();
  }

  function fact(label, value) {
    const wrapper = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    wrapper.append(dt, dd);
    return wrapper;
  }

  function renderChoices(container, values, selected, field) {
    container.replaceChildren();
    values.forEach(value => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = value;
      button.setAttribute("aria-pressed", String(value === selected));
      button.addEventListener("click", () => writeReview({ [field]: value === selected ? null : value }));
      container.append(button);
    });
  }

  function renderItinerary() {
    const trip = currentTrip();
    const beat = trip.beats[beatIndex];
    els["beat-position"].textContent = `${trip.id === "spain" || trip.order > 3 ? "Beat" : "Day"} ${beatIndex + 1} of ${trip.beats.length}`;
    els["beat-title"].textContent = beat[0];
    els["beat-detail"].textContent = beat[1];
    els["previous-beat"].disabled = beatIndex === 0;
    els["next-beat"].disabled = beatIndex === trip.beats.length - 1;

    els["itinerary-list"].replaceChildren();
    els["rail-beats"].replaceChildren();
    trip.beats.forEach((entry, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      if (index === beatIndex) button.classList.add("active");
      const label = document.createElement("span");
      label.className = "day-label";
      label.textContent = `${trip.id === "spain" || trip.order > 3 ? "Beat" : "Day"} ${index + 1}`;
      const copy = document.createElement("span");
      copy.className = "day-copy";
      copy.textContent = `${entry[0]} — ${entry[1]}`;
      button.append(label, copy);
      button.addEventListener("click", () => setBeat(index, true));
      li.append(button);
      els["itinerary-list"].append(li);

      const rail = document.createElement("button");
      rail.type = "button";
      rail.className = "rail-beat";
      if (index === beatIndex) rail.classList.add("active");
      rail.textContent = entry[0];
      const count = document.createElement("span");
      count.textContent = `${trip.id === "spain" || trip.order > 3 ? "Beat" : "Day"} ${index + 1}`;
      rail.append(count);
      rail.addEventListener("click", () => setBeat(index, true));
      els["rail-beats"].append(rail);
    });
  }

  function selectTrip(id, newBeat = 0, updateHash = false) {
    flushPendingNotes();
    selectedId = id;
    beatIndex = Math.min(newBeat, currentTrip().beats.length - 1);
    if (comparisonId === selectedId) comparisonId = null;
    renderConcepts();
    renderEvidence();
    renderComparison();
    drawRoutes(true);
    els["concept-list"].classList.remove("open");
    els["mobile-concept-trigger"].setAttribute("aria-expanded", "false");
    if (updateHash) updateUrl();
    announce(`${currentTrip().name} selected. ${currentTrip().status}.`);
  }

  function setBeat(index, updateHash = false) {
    beatIndex = Math.max(0, Math.min(index, currentTrip().beats.length - 1));
    renderItinerary();
    updateMapBeat(true);
    if (updateHash) updateUrl();
    announce(`${currentTrip().beats[beatIndex][0]}. ${currentTrip().beats[beatIndex][1]}`);
  }

  function updateUrl() {
    history.pushState(null, "", `#${selectedId}/beat-${beatIndex + 1}`);
  }

  function readUrl() {
    const match = location.hash.match(/^#([a-z-]+)\/beat-(\d+)$/);
    if (!match || !trips.some(trip => trip.id === match[1])) return ["portugal", 0];
    return [match[1], Number(match[2]) - 1];
  }

  function initMap() {
    if (!window.L) {
      showMapFallback("Leaflet did not load.");
      return;
    }
    try {
      map = L.map("map", {
        scrollWheelZoom: false, dragging: false, touchZoom: false, keyboard: true,
        zoomControl: true, attributionControl: true, preferCanvas: true
      });
      tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        crossOrigin: true
      });
      let loadedTile = false;
      tileLayer.once("tileload", () => { loadedTile = true; });
      tileLayer.on("tileerror", () => {
        if (!loadedTile) showTileNotice();
      });
      tileLayer.addTo(map);
      document.querySelector(".map-shell").classList.add("interaction-off");
      drawRoutes(true);
      window.setTimeout(() => {
        if (!loadedTile) showTileNotice();
      }, 5000);
    } catch (error) {
      console.warn("Map initialization failed.", error);
      showMapFallback("Map initialization failed.");
    }
  }

  function mapTextSummary(trip) {
    const bases = trip.stops.filter(stop => stop.role === "base").map(stop => stop.name).join(" → ");
    const excursions = trip.stops.filter(stop => stop.role === "excursion").map(stop => stop.name);
    const alternatives = trip.stops.filter(stop => stop.role === "alternative").map(stop => stop.name.replace(" — alternative", ""));
    const parts = [`Bases: ${bases}.`];
    if (excursions.length) parts.push(`Excursions return to their active base: ${excursions.join(", ")}.`);
    if (alternatives.length) parts.push(`Alternatives, not a combined stop: ${alternatives.join(" or ")}.`);
    return parts.join(" ");
  }

  function stopIdsForBeat(beat) {
    return Array.isArray(beat[2]) ? beat[2] : [beat[2]];
  }

  function markerIcon(stop, label, active = false, compare = false) {
    return L.divIcon({
      className: `route-marker role-${stop.role}${active ? " active" : ""}${compare ? " compare" : ""}`,
      html: `<span>${label}</span>`, iconSize: [44, 44], iconAnchor: [22, 22]
    });
  }

  function clearRouteLayers() {
    if (!map) return;
    routeLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];
  }

  function segmentStyle(compare, segment) {
    const styles = {
      rail: { dashArray: null, weight: 4 },
      road: { dashArray: "10 6", weight: 4 },
      ferry: { dashArray: "2 7", weight: 4 },
      flight: { dashArray: "15 8 2 8", weight: 4 },
      uncertain: { dashArray: "4 7", weight: 3 },
      excursion: { dashArray: "1 7", weight: 3 },
      "road-excursion": { dashArray: "10 6", weight: 3 },
      alternative: { dashArray: "2 8", weight: 2 }
    };
    return {
      color: compare ? "#187184" : "#d94a38",
      opacity: compare ? .68 : segment.type === "alternative" ? .62 : .9,
      lineCap: "round",
      ...styles[segment.type]
    };
  }

  function segmentLabel(type) {
    return {
      rail: "Rail transfer",
      road: "Road transfer",
      ferry: "Ferry transfer",
      flight: "Flight",
      uncertain: "Transfer mode not yet verified",
      excursion: "Excursion spoke; returns to base",
      "road-excursion": "Road excursion; returns to base",
      alternative: "Alternative excursion; choose one"
    }[type] || "Route segment";
  }

  function addTripRoute(trip, compare = false) {
    const stopById = new Map(trip.stops.map(stop => [stop.id, stop]));
    const featureBounds = L.latLngBounds(trip.stops.map(stop => [stop.lat, stop.lng]));
    trip.segments.forEach(segment => {
      const from = stopById.get(segment.from);
      const to = stopById.get(segment.to);
      if (!from || !to) return;
      const line = L.polyline([[from.lat, from.lng], [to.lat, to.lng]], segmentStyle(compare, segment)).addTo(map);
      line.bindTooltip(segmentLabel(segment.type), { sticky: true });
      routeLayers.push(line);
    });
    let baseNumber = 0;
    const activeIds = !compare && trip.beats[beatIndex] ? stopIdsForBeat(trip.beats[beatIndex]) : [];
    trip.stops.forEach(stop => {
      const label = stop.role === "base" ? String(++baseNumber) : stop.role === "alternative" ? "or" : "";
      const activeStop = activeIds.includes(stop.id);
      const marker = L.marker([stop.lat, stop.lng], {
        icon: markerIcon(stop, label, activeStop, compare),
        title: stop.name, keyboard: !compare, alt: stop.name
      }).addTo(map);
      marker.bindTooltip(stop.name, { direction: "top" });
      if (!compare) {
        marker.on("click", () => {
          const matchingBeat = trip.beats.findIndex(beat => stopIdsForBeat(beat).includes(stop.id));
          if (matchingBeat >= 0) setBeat(matchingBeat, true);
        });
      }
      routeLayers.push(marker);
    });
    return featureBounds;
  }

  function drawRoutes(fit) {
    if (!map) return;
    clearRouteLayers();
    const bounds = addTripRoute(currentTrip(), false);
    if (comparisonId) {
      const comparison = trips.find(trip => trip.id === comparisonId);
      bounds.extend(addTripRoute(comparison, true));
    }
    if (fit) fitBounds(bounds);
  }

  function updateMapBeat(reframe) {
    if (!map) return;
    drawRoutes(false);
    if (reframe) {
      const trip = currentTrip();
      const activeIds = stopIdsForBeat(trip.beats[beatIndex]);
      const activeStops = trip.stops.filter(stop => activeIds.includes(stop.id));
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (activeStops.length === 1) {
        map.setView([activeStops[0].lat, activeStops[0].lng], Math.max(map.getZoom(), 6), { animate: !reduced });
      } else if (activeStops.length > 1) {
        map.fitBounds(activeStops.map(stop => [stop.lat, stop.lng]), { padding: [55, 55], maxZoom: 7, animate: !reduced });
      }
    }
  }

  function fitBounds(bounds) {
    if (!map || !bounds || !bounds.isValid()) return;
    map.fitBounds(bounds, { padding: [35, 35], maxZoom: 8, animate: !matchMedia("(prefers-reduced-motion: reduce)").matches });
  }

  function showTileNotice() {
    const control = document.querySelector(".leaflet-control-attribution");
    if (control && !document.getElementById("tile-notice")) {
      const notice = document.createElement("div");
      notice.id = "tile-notice";
      notice.className = "map-legend";
      notice.style.bottom = "44px";
      notice.textContent = "Map detail is unavailable. Route lines still work.";
      document.querySelector(".map-shell").append(notice);
    }
  }

  function showMapFallback(reason) {
    console.warn(reason);
    els["map-fallback"].hidden = false;
    document.getElementById("map").hidden = true;
  }

  function renderComparison() {
    if (!comparisonId) {
      els["compare-strip"].hidden = true;
      els["compare-strip"].replaceChildren();
      return;
    }
    const compared = trips.find(trip => trip.id === comparisonId);
    const text = document.createElement("div");
    const heading = document.createElement("strong");
    heading.textContent = `Compared: ${compared.name}`;
    const details = document.createElement("span");
    details.textContent = `${compared.days} days · ${compared.bases} bases · ${compared.timing} · ${compared.status} · Centerpiece: ${compared.centerpiece} · Risk: ${compared.question}`;
    text.append(heading, details);
    els["compare-strip"].replaceChildren(text);
    els["compare-strip"].hidden = false;
  }

  function updateProgress() {
    const count = trips.filter(trip => isReviewed(review.trips[trip.id])).length;
    els["review-progress"].textContent = `${count} of 7 reviewed`;
  }

  function summaryText() {
    flushPendingNotes();
    const saved = review.updatedAt ? new Date(review.updatedAt) : new Date();
    const reviewed = trips.filter(trip => isReviewed(review.trips[trip.id]));
    const shortlist = reviewed.filter(trip => review.trips[trip.id].favorite);
    const others = reviewed.filter(trip => !review.trips[trip.id].favorite);
    const lines = [`Rachel's anniversary trip review — saved ${saved.toLocaleDateString()}`, ""];
    const addGroup = (title, group) => {
      if (!group.length) return;
      lines.push(title);
      group.forEach((trip, index) => {
        const item = review.trips[trip.id];
        const judgments = [item.reaction, item.confidence].filter(Boolean).join(" · ") || "No reaction selected";
        lines.push(`${title === "Shortlist" ? `${index + 1}. ` : ""}${trip.name} — ${judgments}`);
        if (item.notes) lines.push(`   Note: ${item.notes}`);
        if (item.needsAnswer) lines.push("   Needs an answer before deciding.");
      });
      lines.push("");
    };
    addGroup("Shortlist", shortlist);
    addGroup("Still considering", others);
    if (!reviewed.length) lines.push("No trips reviewed yet.", "");
    lines.push(CAVEAT, "No trip is booked or council-approved by this review.");
    return lines.join("\n");
  }

  function renderSummary() {
    flushPendingNotes();
    els["summary-content"].replaceChildren();
    const reviewed = trips.filter(trip => isReviewed(review.trips[trip.id]));
    if (!reviewed.length) {
      const empty = document.createElement("p");
      empty.textContent = "No trips reviewed yet. Add a reaction, shortlist, note, or question to begin.";
      els["summary-content"].append(empty);
      return;
    }
    reviewed.forEach(trip => {
      const item = review.trips[trip.id];
      const section = document.createElement("section");
      section.className = "summary-item";
      const heading = document.createElement("h3");
      const name = document.createElement("span");
      name.textContent = trip.name;
      const favorite = document.createElement("span");
      favorite.textContent = item.favorite ? "♥ Shortlist" : "";
      heading.append(name, favorite);
      const judgment = document.createElement("p");
      judgment.textContent = [item.reaction, item.confidence].filter(Boolean).join(" · ") || "No reaction selected";
      section.append(heading, judgment);
      if (item.notes) {
        const note = document.createElement("p");
        note.textContent = `Note: ${item.notes}`;
        section.append(note);
      }
      if (item.needsAnswer) {
        const question = document.createElement("p");
        question.textContent = "Needs an answer before deciding.";
        section.append(question);
      }
      els["summary-content"].append(section);
    });
  }

  async function copySummary() {
    flushPendingNotes();
    try {
      await navigator.clipboard.writeText(summaryText());
      els["summary-feedback"].textContent = "Review copied.";
    } catch (error) {
      console.warn("Copy failed.", error);
      els["summary-feedback"].textContent = "Copy failed. Select the review text and copy it manually.";
    }
  }

  function downloadSummary() {
    flushPendingNotes();
    try {
      const blob = new Blob([summaryText()], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "rachel-anniversary-trip-review.txt";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      els["summary-feedback"].textContent = "Review downloaded.";
    } catch (error) {
      console.warn("Download failed.", error);
      els["summary-feedback"].textContent = "Download failed. Use Copy review instead.";
    }
  }

  function openSummary() {
    flushPendingNotes();
    renderSummary();
    els["summary-feedback"].textContent = "";
    els["summary-dialog"].showModal();
  }

  function bindEvents() {
    els["sort-concepts"].addEventListener("change", renderConcepts);
    els["mobile-concept-trigger"].addEventListener("click", () => {
      const open = els["concept-list"].classList.toggle("open");
      els["mobile-concept-trigger"].setAttribute("aria-expanded", String(open));
    });
    els["previous-beat"].addEventListener("click", () => setBeat(beatIndex - 1, true));
    els["next-beat"].addEventListener("click", () => setBeat(beatIndex + 1, true));
    els["toggle-plan"].addEventListener("click", () => {
      const expanded = els["itinerary-list"].classList.toggle("expanded");
      els["toggle-plan"].setAttribute("aria-expanded", String(expanded));
      els["toggle-plan"].textContent = expanded ? "Hide full plan" : "Show full plan";
    });
    document.querySelector(".itinerary-section").addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); setBeat(beatIndex - 1, true); }
      if (event.key === "ArrowRight") { event.preventDefault(); setBeat(beatIndex + 1, true); }
    });
    els["favorite-toggle"].addEventListener("click", () => writeReview({ favorite: !currentReview().favorite }));
    els["trip-notes"].addEventListener("input", debouncedNotesSave);
    els["needs-answer"].addEventListener("change", () => writeReview({ needsAnswer: els["needs-answer"].checked }));
    els["pin-comparison"].addEventListener("click", () => {
      comparisonId = comparisonId === selectedId ? null : selectedId;
      els["pin-comparison"].textContent = comparisonId ? "Remove comparison" : "Pin for comparison";
      els["pin-comparison"].setAttribute("aria-pressed", String(Boolean(comparisonId)));
      renderConcepts();
      renderComparison();
      drawRoutes(true);
      announce(comparisonId ? `${currentTrip().name} pinned. Choose another route to compare.` : "Comparison removed.");
    });
    els["fit-route"].addEventListener("click", () => drawRoutes(true));
    els["enable-map"].addEventListener("click", () => {
      if (!map) return;
      mapEnabled = !mapEnabled;
      map.dragging[mapEnabled ? "enable" : "disable"]();
      map.touchZoom[mapEnabled ? "enable" : "disable"]();
      map.scrollWheelZoom[mapEnabled ? "enable" : "disable"]();
      document.querySelector(".map-shell").classList.toggle("interaction-off", !mapEnabled);
      els["enable-map"].textContent = mapEnabled ? "Disable map interaction" : "Enable map interaction";
    });
    els["retry-map"].addEventListener("click", () => location.reload());
    ["open-summary", "footer-summary"].forEach(id => document.getElementById(id).addEventListener("click", openSummary));
    document.getElementById("copy-summary").addEventListener("click", copySummary);
    document.getElementById("download-summary").addEventListener("click", downloadSummary);
    document.getElementById("clear-review").addEventListener("click", () => {
      flushPendingNotes();
      els["clear-dialog"].showModal();
    });
    document.getElementById("cancel-clear").addEventListener("click", () => els["clear-dialog"].close());
    document.getElementById("confirm-clear").addEventListener("click", () => {
      flushPendingNotes();
      review = emptyReview();
      try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
      els["clear-dialog"].close();
      renderConcepts();
      renderEvidence();
      renderSummary();
      updateProgress();
      els["summary-feedback"].textContent = "Saved review cleared.";
    });
    window.addEventListener("popstate", () => {
      const [id, beat] = readUrl();
      selectTrip(id, beat, false);
    });
    window.addEventListener("pagehide", () => flushPendingNotes({ announceSave: false, updateUi: false }));
    window.addEventListener("beforeunload", () => flushPendingNotes({ announceSave: false, updateUi: false }));
  }

  function start() {
    const [id, initialBeat] = readUrl();
    selectedId = id;
    beatIndex = initialBeat;
    bindEvents();
    renderConcepts();
    renderEvidence();
    renderComparison();
    updateProgress();
    initMap();
  }

  start();
})();
