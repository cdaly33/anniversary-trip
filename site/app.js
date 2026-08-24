(function () {
  "use strict";

  const trips = typeof module !== "undefined" && module.exports
    ? require("./trip-data.js")
    : globalThis.ANNIVERSARY_TRIPS;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = trips;
    return;
  }

  const CAVEAT = "2027 schedules, prices, availability, operating dates, entry rules, and weather expectations remain provisional. Verify before booking.";
  const COST_CAVEAT = "Rough 2027 planning range for two, not a quote. Includes economy travel from STL, stated midrange hotel nights, required route transport, ordinary meals, representative anchors, insurance, and contingency. Excludes shopping, premium upgrades, and unlisted extras; recalculate after any route, gateway, season, positioning-night, or hotel-night change.";
  const STORAGE_KEY = "anniversaryTripReview.v1";
  const RETAINED_IDS = new Set(trips.map(trip => trip.id));
  const storage = globalThis.ANNIVERSARY_REVIEW_STORAGE;
  const reactions = ["Love this", "Interested", "Unsure", "Not for us"];
  const confidences = ["First impression", "Leaning", "Confident"];
  const byId = id => document.getElementById(id);
  const ids = [
    "concept-list", "sort-concepts", "mobile-concept-trigger", "mobile-current-concept", "review-progress", "map-heading",
    "map-fallback", "fallback-route", "retry-map", "fit-route", "enable-map", "route-description", "compare-strip",
    "concept-kicker", "concept-title", "status-detail", "route-shape", "pin-comparison", "route-facts", "why-fit",
    "flight-summary", "flight-detail", "flight-burden", "flight-links", "cost-range", "cost-hotels", "cost-buys",
    "cost-pressure", "cost-confidence", "cost-verdict", "image-gallery", "mobility-summary", "responsible-copy",
    "toggle-plan", "beat-position", "beat-title", "beat-detail", "beat-extra", "previous-beat", "next-beat",
    "itinerary-list", "hard-question", "repair", "favorite-toggle", "reaction-options", "confidence-options",
    "trip-notes", "needs-answer", "save-status", "rail-beats", "live-region", "summary-dialog", "summary-content",
    "summary-feedback", "clear-dialog"
  ];
  const els = Object.fromEntries(ids.map(id => [id, byId(id)]));

  let selectedId = "portugal";
  let dayIndex = 0;
  let comparisonId = null;
  let map;
  let tileLayer;
  let routeLayers = [];
  let mapEnabled = false;
  let pendingNote = null;
  let review = loadReview();

  function emptyReview() {
    return storage.emptyReview();
  }

  function loadReview() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const migrated = storage.sanitizeReview(parsed, RETAINED_IDS);
      if (JSON.stringify(parsed) !== JSON.stringify(migrated)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      }
      return migrated;
    } catch (error) {
      console.warn("Review could not be loaded.", error);
      return emptyReview();
    }
  }

  function currentTrip() {
    return trips.find(trip => trip.id === selectedId) || trips[0];
  }

  function currentReview() {
    return review.trips[selectedId] || {};
  }

  function isReviewed(value) {
    return Boolean(value && (value.favorite || value.reaction || value.confidence || value.notes || value.needsAnswer));
  }

  function writeReviewForTrip(tripId, patch, { announceSave = true, updateUi = true } = {}) {
    if (!RETAINED_IDS.has(tripId)) return false;
    const savedAt = new Date().toISOString();
    const next = {
      ...review,
      updatedAt: savedAt,
      trips: {
        ...review.trips,
        [tripId]: { ...(review.trips[tripId] || {}), ...patch, updatedAt: savedAt }
      }
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      review = next;
      if (tripId === selectedId) els["save-status"].textContent = "Saved in this browser profile";
      if (announceSave) announce("Review saved in this browser profile.");
    } catch (error) {
      console.warn("Review could not be saved.", error);
      if (tripId === selectedId) els["save-status"].textContent = "This browser could not save your review. Copy or download it before leaving.";
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

  function flushPendingNotes({ announceSave = true, updateUi = true } = {}) {
    if (!pendingNote) return true;
    const { routeId, value, timer } = pendingNote;
    clearTimeout(timer);
    pendingNote = null;
    return writeReviewForTrip(routeId, { notes: value }, { announceSave, updateUi });
  }

  function debouncedNotesSave() {
    if (pendingNote) clearTimeout(pendingNote.timer);
    const routeId = selectedId;
    const value = els["trip-notes"].value;
    els["save-status"].textContent = "Saving…";
    pendingNote = { routeId, value, timer: setTimeout(() => flushPendingNotes(), 350) };
  }

  function announce(message) {
    els["live-region"].textContent = "";
    setTimeout(() => { els["live-region"].textContent = message; }, 20);
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
      const saved = review.trips[trip.id] || {};
      const button = document.createElement("button");
      button.type = "button";
      button.className = "concept-item";
      button.classList.toggle("selected", trip.id === selectedId);
      button.classList.toggle("compared", trip.id === comparisonId);
      button.setAttribute("aria-pressed", String(trip.id === selectedId));
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = trip.name;
      const status = document.createElement("span");
      status.className = "concept-status";
      status.textContent = trip.status;
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${trip.calendarEntries} calendar days · ${trip.bases} bases`;
      const personal = document.createElement("span");
      personal.className = "personal";
      personal.textContent = [saved.favorite ? "♥ Shortlist" : "", saved.reaction || ""].filter(Boolean).join(" · ");
      button.append(name, status, meta, personal);
      button.addEventListener("click", () => selectTrip(trip.id, 0, true));
      els["concept-list"].append(button);
    });
  }

  function linkElement(link) {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.language ? `${link.label} (${link.language})` : link.label;
    return a;
  }

  function renderLinks(container, links) {
    container.replaceChildren();
    links.forEach(link => {
      const li = document.createElement("li");
      li.append(linkElement(link));
      container.append(li);
    });
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

  function renderEvidence() {
    const trip = currentTrip();
    const saved = currentReview();
    const day = trip.daysPlan[dayIndex];
    document.title = `${trip.name} · Four anniversary routes`;
    els["mobile-current-concept"].textContent = trip.name;
    els["map-heading"].textContent = `${trip.name} route`;
    els["concept-kicker"].textContent = trip.status;
    els["concept-title"].textContent = trip.name;
    els["status-detail"].textContent = trip.statusDetail;
    els["route-shape"].textContent = trip.shape;
    els["why-fit"].textContent = trip.why;
    els["hard-question"].textContent = trip.question;
    els.repair.textContent = trip.repair;
    els["route-description"].textContent = `${trip.route}. Working season: ${trip.timing}.`;
    els["fallback-route"].textContent = mapTextSummary(trip);
    els["route-facts"].replaceChildren(
      fact("Calendar", `${trip.calendarEntries} days`),
      fact("Hotel nights", String(trip.nights)),
      fact("Bases", String(trip.bases)),
      fact("Major moves", String(trip.transfers)),
      fact("Whole-trip SWAG", trip.cost.range),
      fact("Flight burden", trip.flight.burden),
      fact("Hotel expectation", trip.cost.hotels)
    );

    els["flight-summary"].textContent = trip.flight.summary;
    els["flight-detail"].textContent = trip.flight.detail;
    els["flight-burden"].textContent = trip.flight.burden;
    renderLinks(els["flight-links"], trip.flight.links);
    els["cost-range"].textContent = trip.cost.range;
    els["cost-hotels"].textContent = trip.cost.hotels;
    els["cost-buys"].textContent = trip.cost.buys;
    els["cost-pressure"].textContent = trip.cost.pressure;
    els["cost-confidence"].textContent = trip.cost.confidence;
    els["cost-verdict"].textContent = trip.cost.verdict;
    renderMobility(trip);
    els["responsible-copy"].textContent = trip.responsible;
    renderImages(trip);

    els["favorite-toggle"].setAttribute("aria-pressed", String(Boolean(saved.favorite)));
    els["favorite-toggle"].innerHTML = saved.favorite
      ? '<span aria-hidden="true">♥</span> Shortlisted'
      : '<span aria-hidden="true">♡</span> Shortlist this trip';
    renderChoices(els["reaction-options"], reactions, saved.reaction, "reaction");
    renderChoices(els["confidence-options"], confidences, saved.confidence, "confidence");
    els["trip-notes"].value = saved.notes || "";
    els["needs-answer"].checked = Boolean(saved.needsAnswer);
    els["save-status"].textContent = saved.updatedAt ? "Saved in this browser profile" : "";
    els["pin-comparison"].textContent = comparisonId === trip.id ? "Remove comparison" : "Pin for comparison";
    els["pin-comparison"].setAttribute("aria-pressed", String(comparisonId === trip.id));
    renderItinerary(day);
  }

  function renderMobility(trip) {
    const list = els["mobility-summary"];
    list.replaceChildren();
    [
      ["Hardest day", trip.mobility.hardest],
      ["Likely walking / standing", trip.mobility.walking],
      ["Lower-walking / seated option", trip.mobility.lower],
      ["Protected recovery", trip.mobility.recovery]
    ].forEach(([label, value]) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = `${label}: `;
      li.append(strong, value);
      list.append(li);
    });
  }

  function renderImages(trip) {
    els["image-gallery"].replaceChildren();
    trip.images.forEach(image => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = image.file;
      img.alt = image.alt;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 800;
      img.height = 533;
      const caption = document.createElement("figcaption");
      const source = document.createElement("a");
      source.href = image.source;
      source.textContent = image.credit;
      const license = document.createElement("a");
      license.href = image.license;
      license.textContent = "License details";
      caption.append(source, document.createTextNode(` ${image.note} `), license);
      figure.append(img, caption);
      els["image-gallery"].append(figure);
    });
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

  function renderItinerary(day) {
    const trip = currentTrip();
    els["beat-position"].textContent = `${day.label} · ${dayIndex + 1} of ${trip.daysPlan.length}`;
    els["beat-title"].textContent = day.title;
    els["beat-detail"].textContent = day.main;
    const dayDetail = document.createElement("details");
    dayDetail.className = "current-day-detail";
    const daySummary = document.createElement("summary");
    daySummary.textContent = "Open day detail";
    const dayBody = document.createElement("div");
    dayBody.append(
      detailRow("Companion idea", day.companion),
      detailRow("Why it fits", day.fit),
      detailRow("Pace / terrain", day.pace),
      detailRow("Fallback", day.fallback),
      detailLinks(day.links)
    );
    dayDetail.append(daySummary, dayBody);
    els["beat-extra"].replaceChildren(dayDetail);
    els["previous-beat"].disabled = dayIndex === 0;
    els["next-beat"].disabled = dayIndex === trip.daysPlan.length - 1;
    els["itinerary-list"].replaceChildren();
    els["rail-beats"].replaceChildren();
    trip.daysPlan.forEach((entry, index) => {
      const li = document.createElement("li");
      const details = document.createElement("details");
      if (index === dayIndex) details.open = true;
      const summary = document.createElement("summary");
      summary.textContent = `${entry.label} — ${entry.title}`;
      const body = document.createElement("div");
      body.className = "day-expanded";
      body.append(
        detailRow("Main idea", entry.main),
        detailRow("Companion idea", entry.companion),
        detailRow("Why it fits", entry.fit),
        detailRow("Pace / terrain", entry.pace),
        detailRow("Fallback", entry.fallback),
        detailLinks(entry.links)
      );
      summary.addEventListener("click", () => setDay(index, true));
      details.append(summary, body);
      li.append(details);
      els["itinerary-list"].append(li);

      const rail = document.createElement("button");
      rail.type = "button";
      rail.className = "rail-beat";
      rail.classList.toggle("active", index === dayIndex);
      rail.textContent = entry.title;
      const count = document.createElement("span");
      count.textContent = entry.label;
      rail.append(count);
      rail.addEventListener("click", () => setDay(index, true));
      els["rail-beats"].append(rail);
    });
  }

  function detailRow(label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    p.append(strong, value);
    return p;
  }

  function detailLinks(links) {
    const wrapper = document.createElement("div");
    wrapper.className = "day-links";
    const strong = document.createElement("strong");
    strong.textContent = "Selected planning links:";
    const ul = document.createElement("ul");
    renderLinks(ul, links);
    wrapper.append(strong, ul);
    return wrapper;
  }

  function selectTrip(id, newDay = 0, updateHash = false) {
    flushPendingNotes();
    selectedId = RETAINED_IDS.has(id) ? id : "portugal";
    dayIndex = Math.min(Math.max(newDay, 0), currentTrip().daysPlan.length - 1);
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

  function setDay(index, updateHash = false) {
    dayIndex = Math.max(0, Math.min(index, currentTrip().daysPlan.length - 1));
    renderItinerary(currentTrip().daysPlan[dayIndex]);
    updateMapDay(true);
    if (updateHash) updateUrl();
    announce(`${currentTrip().daysPlan[dayIndex].title}. ${currentTrip().daysPlan[dayIndex].main}`);
  }

  function updateUrl() {
    history.pushState(null, "", `#${selectedId}/day-${dayIndex + 1}`);
  }

  function readUrl() {
    const match = location.hash.match(/^#([a-z-]+)\/(?:day|beat)-(\d+)$/);
    if (!match || !RETAINED_IDS.has(match[1])) return ["portugal", 0];
    return [match[1], Number(match[2]) - 1];
  }

  function initMap() {
    if (!window.L) return showMapFallback("Leaflet did not load.");
    try {
      map = L.map("map", { scrollWheelZoom: false, dragging: false, touchZoom: false, keyboard: true, zoomControl: true, attributionControl: true, preferCanvas: true });
      tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        crossOrigin: true
      });
      let loadedTile = false;
      tileLayer.once("tileload", () => { loadedTile = true; });
      tileLayer.on("tileerror", () => { if (!loadedTile) showTileNotice(); });
      tileLayer.addTo(map);
      document.querySelector(".map-shell").classList.add("interaction-off");
      drawRoutes(true);
      setTimeout(() => { if (!loadedTile) showTileNotice(); }, 5000);
    } catch (error) {
      console.warn("Map initialization failed.", error);
      showMapFallback("Map initialization failed.");
    }
  }

  function mapTextSummary(trip) {
    const bases = trip.stops.filter(stop => stop.role === "base").map(stop => stop.name).join(" → ");
    const excursions = trip.stops.filter(stop => stop.role === "excursion").map(stop => stop.name);
    const alternatives = trip.stops.filter(stop => stop.role === "alternative").map(stop => stop.name.replace(/ — .+$/, ""));
    return [
      `Bases: ${bases}.`,
      excursions.length ? `Excursion spokes return to a base: ${excursions.join(", ")}.` : "",
      alternatives.length ? `Alternatives, not combined stops: ${alternatives.join(" or ")}.` : ""
    ].filter(Boolean).join(" ");
  }

  function stopIdsForDay(day) {
    return day.stops;
  }

  function markerIcon(stop, label, active = false, compare = false) {
    return L.divIcon({
      className: `route-marker role-${stop.role}${active ? " active" : ""}${compare ? " compare" : ""}`,
      html: `<span>${label}</span>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
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
      flight: { dashArray: "15 8 2 8", weight: 4 },
      uncertain: { dashArray: "4 7", weight: 3 },
      excursion: { dashArray: "1 7", weight: 3 },
      "road-excursion": { dashArray: "10 6", weight: 3 },
      alternative: { dashArray: "2 8", weight: 2 }
    };
    return { color: compare ? "#187184" : "#d94a38", opacity: compare ? 0.68 : segment.type === "alternative" ? 0.62 : 0.9, lineCap: "round", ...styles[segment.type] };
  }

  function segmentLabel(type) {
    return {
      rail: "Rail transfer",
      road: "Road transfer",
      flight: "Flight pattern; exact route not implied",
      uncertain: "Transfer mode not yet verified",
      excursion: "Excursion spoke; returns to base",
      "road-excursion": "Road excursion; returns to base",
      alternative: "Alternative excursion; choose one"
    }[type] || "Route segment";
  }

  function addTripRoute(trip, compare = false) {
    const stopById = new Map(trip.stops.map(stop => [stop.id, stop]));
    const bounds = L.latLngBounds(trip.stops.map(stop => [stop.lat, stop.lng]));
    trip.segments.forEach(segment => {
      const from = stopById.get(segment.from);
      const to = stopById.get(segment.to);
      const line = L.polyline([[from.lat, from.lng], [to.lat, to.lng]], segmentStyle(compare, segment)).addTo(map);
      line.bindTooltip(segmentLabel(segment.type), { sticky: true });
      routeLayers.push(line);
    });
    let baseNumber = 0;
    const activeIds = !compare ? stopIdsForDay(trip.daysPlan[dayIndex]) : [];
    trip.stops.forEach(stop => {
      const label = stop.role === "base" ? String(++baseNumber) : stop.role === "alternative" ? "or" : "";
      const marker = L.marker([stop.lat, stop.lng], {
        icon: markerIcon(stop, label, activeIds.includes(stop.id), compare),
        title: stop.name,
        keyboard: !compare,
        alt: stop.name
      }).addTo(map);
      marker.bindTooltip(stop.name, { direction: "top" });
      if (!compare) {
        marker.on("click", () => {
          const matching = trip.daysPlan.findIndex(day => day.stops.includes(stop.id));
          if (matching >= 0) setDay(matching, true);
        });
      }
      routeLayers.push(marker);
    });
    return bounds;
  }

  function drawRoutes(fit) {
    if (!map) return;
    clearRouteLayers();
    const bounds = addTripRoute(currentTrip());
    if (comparisonId) bounds.extend(addTripRoute(trips.find(trip => trip.id === comparisonId), true));
    if (fit) fitBounds(bounds);
  }

  function updateMapDay(reframe) {
    if (!map) return;
    drawRoutes(false);
    if (!reframe) return;
    const activeIds = stopIdsForDay(currentTrip().daysPlan[dayIndex]);
    const activeStops = currentTrip().stops.filter(stop => activeIds.includes(stop.id));
    const animate = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (activeStops.length === 1) map.setView([activeStops[0].lat, activeStops[0].lng], Math.max(map.getZoom(), 6), { animate });
    else if (activeStops.length > 1) map.fitBounds(activeStops.map(stop => [stop.lat, stop.lng]), { padding: [55, 55], maxZoom: 7, animate });
  }

  function fitBounds(bounds) {
    if (map && bounds && bounds.isValid()) map.fitBounds(bounds, { padding: [35, 35], maxZoom: 8, animate: !matchMedia("(prefers-reduced-motion: reduce)").matches });
  }

  function showTileNotice() {
    if (byId("tile-notice")) return;
    const notice = document.createElement("div");
    notice.id = "tile-notice";
    notice.className = "map-legend tile-notice";
    notice.textContent = "Map detail is unavailable. Route lines and itinerary controls still work.";
    document.querySelector(".map-shell").append(notice);
  }

  function showMapFallback(reason) {
    console.warn(reason);
    els["map-fallback"].hidden = false;
    byId("map").hidden = true;
  }

  function renderComparison() {
    if (!comparisonId) {
      els["compare-strip"].hidden = true;
      els["compare-strip"].replaceChildren();
      return;
    }
    const compared = trips.find(trip => trip.id === comparisonId);
    const strong = document.createElement("strong");
    strong.textContent = `Compared: ${compared.name} — ${compared.status}`;
    const details = document.createElement("span");
    details.textContent = `${compared.calendarEntries} days · ${compared.nights} nights · ${compared.bases} bases · ${compared.transfers} major moves · ${compared.cost.range} rough range · Hardest burden: ${compared.mobility.hardest}`;
    els["compare-strip"].replaceChildren(strong, details);
    els["compare-strip"].hidden = false;
  }

  function updateProgress() {
    const count = trips.filter(trip => isReviewed(review.trips[trip.id])).length;
    els["review-progress"].textContent = `${count} of 4 reviewed`;
  }

  function summaryText() {
    flushPendingNotes();
    const savedAt = review.updatedAt ? new Date(review.updatedAt) : new Date();
    const reviewed = trips.filter(trip => isReviewed(review.trips[trip.id]));
    const shortlist = reviewed.filter(trip => review.trips[trip.id].favorite);
    const others = reviewed.filter(trip => !review.trips[trip.id].favorite);
    const lines = [`Rachel's anniversary trip review — saved ${savedAt.toLocaleDateString()}`, ""];
    const addGroup = (title, group) => {
      if (!group.length) return;
      lines.push(title);
      group.forEach((trip, index) => {
        const item = review.trips[trip.id];
        const judgment = [item.reaction, item.confidence].filter(Boolean).join(" · ") || "No reaction selected";
        lines.push(`${title === "Shortlist" ? `${index + 1}. ` : ""}${trip.name} — ${trip.status} — ${judgment}`);
        lines.push(`   Expected flight pattern: ${trip.flight.summary.replace(/^Expected pattern — /, "")}`);
        lines.push(`   Rough 2027 whole-trip range for two: ${trip.cost.range} (not a quote; no itemized prices)`);
        if (item.notes) lines.push(`   Note: ${item.notes}`);
        if (item.needsAnswer) lines.push("   Needs an answer before deciding.");
      });
      lines.push("");
    };
    addGroup("Shortlist", shortlist);
    addGroup("Still considering", others);
    if (!reviewed.length) lines.push("No trips reviewed yet.", "");
    lines.push(CAVEAT, COST_CAVEAT, "No trip is booked or selected by this review.");
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
      heading.textContent = `${trip.name} — ${trip.status}`;
      section.append(
        heading,
        detailRow("Your take", [item.reaction, item.confidence].filter(Boolean).join(" · ") || "No reaction selected"),
        detailRow("Expected flight pattern", trip.flight.summary.replace(/^Expected pattern — /, "")),
        detailRow("Rough 2027 whole-trip range for two", `${trip.cost.range}; not a quote`)
      );
      if (item.favorite) section.append(detailRow("Shortlist", "Yes"));
      if (item.notes) section.append(detailRow("Note", item.notes));
      if (item.needsAnswer) section.append(detailRow("Decision status", "Needs an answer before deciding"));
      els["summary-content"].append(section);
    });
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText());
      els["summary-feedback"].textContent = "Review copied.";
    } catch (error) {
      console.warn("Copy failed.", error);
      els["summary-feedback"].textContent = "Copy failed. Use Download review instead.";
    }
  }

  function downloadSummary() {
    try {
      const blob = new Blob([summaryText()], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "rachel-anniversary-trip-review.txt";
      document.body.append(link);
      link.click();
      const href = link.href;
      link.remove();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
      els["summary-feedback"].textContent = "Review downloaded.";
    } catch (error) {
      console.warn("Download failed.", error);
      els["summary-feedback"].textContent = "Download failed. Use Copy review instead.";
    }
  }

  function openSummary() {
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
    els["previous-beat"].addEventListener("click", () => setDay(dayIndex - 1, true));
    els["next-beat"].addEventListener("click", () => setDay(dayIndex + 1, true));
    byId("toggle-plan").addEventListener("click", () => {
      const expanded = els["itinerary-list"].classList.toggle("expanded");
      byId("toggle-plan").setAttribute("aria-expanded", String(expanded));
      byId("toggle-plan").textContent = expanded ? "Hide all days" : "Open all days";
    });
    document.querySelector(".itinerary-section").addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); setDay(dayIndex - 1, true); }
      if (event.key === "ArrowRight") { event.preventDefault(); setDay(dayIndex + 1, true); }
    });
    els["favorite-toggle"].addEventListener("click", () => writeReview({ favorite: !currentReview().favorite }));
    els["trip-notes"].addEventListener("input", debouncedNotesSave);
    els["needs-answer"].addEventListener("change", () => writeReview({ needsAnswer: els["needs-answer"].checked }));
    els["pin-comparison"].addEventListener("click", () => {
      comparisonId = comparisonId === selectedId ? null : selectedId;
      renderConcepts();
      renderEvidence();
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
    ["open-summary", "footer-summary"].forEach(id => byId(id).addEventListener("click", openSummary));
    byId("copy-summary").addEventListener("click", copySummary);
    byId("download-summary").addEventListener("click", downloadSummary);
    byId("clear-review").addEventListener("click", () => els["clear-dialog"].showModal());
    byId("cancel-clear").addEventListener("click", () => els["clear-dialog"].close());
    byId("confirm-clear").addEventListener("click", () => {
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
      const [id, day] = readUrl();
      selectTrip(id, day, false);
    });
    window.addEventListener("pagehide", () => flushPendingNotes({ announceSave: false, updateUi: false }));
  }

  function start() {
    const [id, initialDay] = readUrl();
    selectedId = id;
    dayIndex = initialDay;
    bindEvents();
    renderConcepts();
    renderEvidence();
    renderComparison();
    updateProgress();
    initMap();
  }

  start();
})();
