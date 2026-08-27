(function () {
  "use strict";

  const trips = typeof module !== "undefined" && module.exports
    ? require("./trip-data.js")
    : globalThis.ANNIVERSARY_TRIPS;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = trips;
    return;
  }

  const RETAINED_IDS = new Set(trips.map(trip => trip.id));
  const byId = id => document.getElementById(id);
  const ids = [
    "concept-list", "sort-concepts", "concept-trigger", "current-concept", "map-heading",
    "map-fallback", "fallback-route", "retry-map", "fit-route", "enable-map", "expand-map", "route-description",
    "concept-kicker", "concept-title", "status-detail", "route-shape", "route-facts", "why-fit",
    "flight-summary", "flight-detail", "flight-burden", "flight-links", "cost-range", "cost-hotels", "cost-buys",
    "cost-pressure", "cost-confidence", "cost-verdict", "image-gallery", "mobility-summary", "responsible-copy",
    "beat-position", "beat-title", "beat-detail", "beat-extra", "previous-beat", "next-beat",
    "itinerary-list", "hard-question", "repair", "rail-beats", "live-region"
  ];
  const els = Object.fromEntries(ids.map(id => [id, byId(id)]));

  let selectedId = "italy-croatia";
  let dayIndex = 0;
  let map;
  let tileLayer;
  let routeLayers = [];
  let mapEnabled = false;
  let mapInteractionBeforeExpand = false;

  function currentTrip() {
    return trips.find(trip => trip.id === selectedId) || trips[0];
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
      const button = document.createElement("button");
      button.type = "button";
      button.className = "concept-item";
      button.classList.toggle("selected", trip.id === selectedId);
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
      button.append(name, status, meta);
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
    const day = trip.daysPlan[dayIndex];
    document.title = `${trip.name} · Anniversary trip concepts`;
    els["current-concept"].textContent = trip.name;
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

  function renderItinerary(day) {
    const trip = currentTrip();
    els["beat-position"].textContent = `${day.label} · ${dayIndex + 1} of ${trip.daysPlan.length}`;
    els["beat-title"].textContent = day.title;
    els["beat-detail"].textContent = day.main;
    els["beat-extra"].replaceChildren(...dayDetailRows(day, false));
    els["previous-beat"].disabled = dayIndex === 0;
    els["next-beat"].disabled = dayIndex === trip.daysPlan.length - 1;
    els["itinerary-list"].replaceChildren();
    els["rail-beats"].replaceChildren();
    trip.daysPlan.forEach((entry, index) => {
      const li = document.createElement("li");
      li.classList.toggle("active", index === dayIndex);
      const select = document.createElement("button");
      select.type = "button";
      select.className = "day-select";
      select.textContent = `${entry.label} — ${entry.title}`;
      if (index === dayIndex) select.setAttribute("aria-current", "true");
      select.addEventListener("click", () => setDay(index, true));
      const body = document.createElement("div");
      body.className = "day-expanded";
      const text = document.createElement("div");
      text.className = "day-text";
      text.append(...dayDetailRows(entry, true));
      body.append(text);
      if (entry.image) body.append(dayFigure(entry.image));
      li.append(select, body);
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

  function dayDetailRows(entry, includeMain) {
    const rows = [];
    if (includeMain) rows.push(detailRow("Main idea", entry.main));
    if (entry.transit) rows.push(detailRow("Getting there", entry.transit));
    rows.push(
      detailRow("Companion idea", entry.companion),
      detailRow("Why it fits", entry.fit),
      detailRow("Pace / terrain", entry.pace),
      detailRow("Fallback", entry.fallback),
      detailLinks(entry.links)
    );
    return rows;
  }

  function dayFigure(image) {
    const figure = document.createElement("figure");
    figure.className = "day-figure";
    const img = document.createElement("img");
    img.className = "day-thumb";
    img.src = image.url;
    img.alt = image.alt;
    img.width = image.width;
    img.height = image.height;
    img.loading = "lazy";
    img.decoding = "async";
    const caption = document.createElement("figcaption");
    caption.textContent = `Photo: ${image.credit}, via Wikimedia Commons`;
    figure.append(img, caption);
    return figure;
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
    selectedId = RETAINED_IDS.has(id) ? id : "italy-croatia";
    dayIndex = Math.min(Math.max(newDay, 0), currentTrip().daysPlan.length - 1);
    renderConcepts();
    renderEvidence();
    drawRoutes(true);
    closeConceptList();
    if (updateHash) updateUrl();
    announce(`${currentTrip().name} selected. ${currentTrip().status}.`);
  }

  function closeConceptList() {
    els["concept-list"].classList.remove("open");
    els["concept-trigger"].setAttribute("aria-expanded", "false");
  }

  function toggleConceptList() {
    const open = els["concept-list"].classList.toggle("open");
    els["concept-trigger"].setAttribute("aria-expanded", String(open));
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
    if (!match || !RETAINED_IDS.has(match[1])) return ["italy-croatia", 0];
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

  function markerIcon(stop, label, active = false) {
    return L.divIcon({
      className: `route-marker role-${stop.role}${active ? " active" : ""}`,
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

  function segmentStyle(segment) {
    const styles = {
      rail: { dashArray: null, weight: 4 },
      road: { dashArray: "10 6", weight: 4 },
      flight: { dashArray: "15 8 2 8", weight: 4 },
      uncertain: { dashArray: "4 7", weight: 3 },
      excursion: { dashArray: "1 7", weight: 3 },
      "road-excursion": { dashArray: "10 6", weight: 3 },
      alternative: { dashArray: "2 8", weight: 2 }
    };
    return { color: "#d94a38", opacity: segment.type === "alternative" ? 0.62 : 0.9, lineCap: "round", ...styles[segment.type] };
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

  function addTripRoute(trip) {
    const stopById = new Map(trip.stops.map(stop => [stop.id, stop]));
    const bounds = L.latLngBounds(trip.stops.map(stop => [stop.lat, stop.lng]));
    trip.segments.forEach(segment => {
      const from = stopById.get(segment.from);
      const to = stopById.get(segment.to);
      const line = L.polyline([[from.lat, from.lng], [to.lat, to.lng]], segmentStyle(segment)).addTo(map);
      line.bindTooltip(segmentLabel(segment.type), { sticky: true });
      routeLayers.push(line);
    });
    let baseNumber = 0;
    const activeIds = stopIdsForDay(trip.daysPlan[dayIndex]);
    trip.stops.forEach(stop => {
      const label = stop.role === "base" ? String(++baseNumber) : stop.role === "alternative" ? "or" : "";
      const marker = L.marker([stop.lat, stop.lng], {
        icon: markerIcon(stop, label, activeIds.includes(stop.id)),
        title: stop.name,
        keyboard: true,
        alt: stop.name
      }).addTo(map);
      marker.bindTooltip(stop.name, { direction: "top" });
      marker.on("click", () => {
        const matching = trip.daysPlan.findIndex(day => day.stops.includes(stop.id));
        if (matching >= 0) setDay(matching, true);
      });
      routeLayers.push(marker);
    });
    return bounds;
  }

  function drawRoutes(fit) {
    if (!map) return;
    clearRouteLayers();
    const bounds = addTripRoute(currentTrip());
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

  function setMapInteraction(enabled) {
    if (!map) return;
    mapEnabled = enabled;
    map.dragging[enabled ? "enable" : "disable"]();
    map.touchZoom[enabled ? "enable" : "disable"]();
    map.scrollWheelZoom[enabled ? "enable" : "disable"]();
    document.querySelector(".map-shell").classList.toggle("interaction-off", !enabled);
    els["enable-map"].textContent = enabled ? "Disable map interaction" : "Enable map interaction";
  }

  function setMapExpanded(expanded, { announceChange = true } = {}) {
    document.querySelector(".route-table").classList.toggle("map-expanded", expanded);
    els["expand-map"].setAttribute("aria-expanded", String(expanded));
    els["expand-map"].textContent = expanded ? "Collapse map" : "Expand map";
    if (map) {
      if (expanded) {
        mapInteractionBeforeExpand = mapEnabled;
        if (!mapEnabled) setMapInteraction(true);
      } else if (!mapInteractionBeforeExpand && mapEnabled) {
        setMapInteraction(false);
      }
      map.invalidateSize();
      drawRoutes(true);
    }
    if (announceChange) announce(expanded ? "Map expanded. Press Escape or the Collapse map button to return." : "Map returned to split view.");
  }

  function bindEvents() {
    els["sort-concepts"].addEventListener("change", renderConcepts);
    els["concept-trigger"].addEventListener("click", toggleConceptList);
    els["previous-beat"].addEventListener("click", () => setDay(dayIndex - 1, true));
    els["next-beat"].addEventListener("click", () => setDay(dayIndex + 1, true));
    document.querySelector(".itinerary-section").addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); setDay(dayIndex - 1, true); }
      if (event.key === "ArrowRight") { event.preventDefault(); setDay(dayIndex + 1, true); }
    });
    els["fit-route"].addEventListener("click", () => drawRoutes(true));
    els["enable-map"].addEventListener("click", () => setMapInteraction(!mapEnabled));
    els["expand-map"].addEventListener("click", () => {
      setMapExpanded(!document.querySelector(".route-table").classList.contains("map-expanded"));
    });
    els["retry-map"].addEventListener("click", () => location.reload());
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      const table = document.querySelector(".route-table");
      if (table.classList.contains("map-expanded")) {
        setMapExpanded(false);
        els["expand-map"].focus();
      } else if (els["concept-list"].classList.contains("open")) {
        closeConceptList();
        els["concept-trigger"].focus();
      }
    });
    window.addEventListener("popstate", () => {
      const [id, day] = readUrl();
      selectTrip(id, day, false);
    });
  }

  function start() {
    const [id, initialDay] = readUrl();
    selectedId = id;
    dayIndex = initialDay;
    bindEvents();
    renderConcepts();
    renderEvidence();
    initMap();
  }

  start();
})();
