(function () {
  "use strict";

  if (typeof window === "undefined") {
    module.exports = {};
    return;
  }

  const rawTrips = globalThis.ANNIVERSARY_TRIPS || [];
  const model = globalThis.ANNIVERSARY_TRIP_MODEL;
  const stateStore = globalThis.ANNIVERSARY_STATE_STORE;
  const mapLegendPhoneQuery = matchMedia("(max-width: 759px)");

  if (!rawTrips.length || !model || !stateStore) {
    console.error("Trip data, trip model, or state store failed to load.");
    return;
  }

  const trips = model.prepareTrips(rawTrips);
  const stateModel = model.createStateModel(trips);
  const storageAdapter = stateStore.createLocalStorageAdapter();
  const defaultTrip = model.resolveDefaultTrip(trips);
  const tripIdSet = new Set(trips.map(trip => trip.id));
  const byId = id => document.getElementById(id);
  const ids = [
    "concept-list", "sort-concepts", "concept-trigger", "current-concept", "map-heading",
    "map-fallback", "fallback-route", "retry-map", "fit-route", "enable-map", "expand-map", "toggle-legend", "map-legend", "route-description",
    "concept-kicker", "concept-title", "status-detail", "route-shape", "route-facts", "why-fit",
    "flight-summary", "flight-detail", "flight-burden", "flight-links",
    "cost-range", "cost-hotels", "cost-buys", "cost-pressure", "cost-confidence", "cost-verdict",
    "rental-panel", "rental-status", "rental-primary", "rental-checklist", "rental-fallbacks",
    "image-gallery", "mobility-summary", "responsible-copy",
    "direction-panel", "direction-options", "direction-compare-table", "direction-cards",
    "compare-selection", "compare-warning", "compare-table", "compare-cards",
    "decision-summary", "trip-vote-rows", "anchor-vote-groups", "selected-variants-summary", "state-recovery-note",
    "friction-score", "friction-summary", "friction-breakdown",
    "budget-totals", "budget-categories", "reset-budget",
    "beat-position", "beat-title", "beat-detail", "beat-extra", "beat-variant-controls", "previous-beat", "next-beat",
    "itinerary-list", "hard-question", "repair", "rail-beats", "live-region"
  ];
  const els = Object.fromEntries(ids.map(id => [id, byId(id)]));
  const compareFields = [
    ["calendarDays", "Calendar days"],
    ["hotelNights", "Hotel nights"],
    ["bases", "Bases"],
    ["hotelMoves", "Hotel moves"],
    ["transferDays", "Transfer days"],
    ["interBaseTime", "Inter-base time"],
    ["rentalRequirement", "Rental requirement / days"],
    ["internalFlights", "Internal flights"],
    ["internationalFlightComplexity", "International flight complexity"],
    ["recoveryFlexDays", "Recovery/flex-day credits"],
    ["fullDestinationDays", "Full destination days"],
    ["estimatedTotalCost", "Estimated total cost (customized)"],
    ["tripFriction", "Trip friction score"],
    ["scenery", "Scenery"],
    ["historicSitesCastles", "Historic sites / castles"],
    ["food", "Food"],
    ["relaxation", "Relaxation"],
    ["logisticalSimplicity", "Logistical simplicity"],
    ["biggestStrength", "Biggest strength"],
    ["biggestConcern", "Biggest concern"],
    ["whyChoose", "Why we'd choose this one"],
    ["whyRegret", "Why we might regret it"]
  ];
  const decisionBucketLabels = {
    bothLove: "Both love",
    bothLike: "Both like",
    oneLovesOneNeutral: "One loves / one neutral",
    conflict: "Conflict",
    bothIndifferent: "Both indifferent",
    rejectedByEither: "Rejected by either",
    unrated: "Unrated"
  };

  let { state: appState, recovered: recoveredState } = stateStore.loadState(storageAdapter, stateModel);
  let selectedId = appState.selectedTripId || defaultTrip.id;
  let dayIndex = appState.selectedDayByTrip[selectedId] || 0;
  let legendExpanded = true;
  let map;
  let tileLayer;
  let routeLayers = [];
  let mapEnabled = false;
  let mapInteractionBeforeExpand = false;
  let resolvedTrips = [];
  let resolvedById = new Map();

  function createNode(tag, options = {}) {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text) node.textContent = options.text;
    if (options.html) node.innerHTML = options.html;
    return node;
  }

  function announce(message) {
    if (!els["live-region"]) return;
    els["live-region"].textContent = "";
    setTimeout(() => { els["live-region"].textContent = message; }, 25);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function asMoney(value, currency = "USD") {
    return model.formatCurrency(value, currency);
  }

  function currentTrip() {
    return resolvedById.get(selectedId) || resolvedById.get(defaultTrip.id) || resolvedTrips[0];
  }

  function canonicalHash(id = selectedId, index = dayIndex) {
    return `#${id}/day-${index + 1}`;
  }

  function updateUrl(mode = "push") {
    const hash = canonicalHash();
    if (location.hash === hash) return;
    history[mode === "replace" ? "replaceState" : "pushState"](null, "", hash);
  }

  function normalizeDayIndex(tripId, index) {
    const trip = resolvedById.get(tripId) || resolvedById.get(defaultTrip.id);
    if (!trip) return 0;
    return clamp(index, 0, Math.max(0, trip.daysPlan.length - 1));
  }

  function readUrl() {
    const parsed = location.hash.match(/^#([a-z0-9-]+)\/(?:day|beat)-(\d+)$/i);
    if (!parsed) {
      return {
        id: defaultTrip.id,
        day: 0,
        directionOverride: null,
        canonical: canonicalHash(defaultTrip.id, 0)
      };
    }

    const rawId = parsed[1];
    const day = Math.max(0, Number(parsed[2]) - 1);
    if (rawId === "italy-slovenia-reversed" && tripIdSet.has("italy-slovenia")) {
      const normalized = normalizeDayIndex("italy-slovenia", day);
      return {
        id: "italy-slovenia",
        day: normalized,
        directionOverride: "bled-to-como",
        canonical: canonicalHash("italy-slovenia", normalized)
      };
    }

    if (!tripIdSet.has(rawId)) {
      return {
        id: defaultTrip.id,
        day: 0,
        directionOverride: null,
        canonical: canonicalHash(defaultTrip.id, 0)
      };
    }

    const normalized = normalizeDayIndex(rawId, day);
    return { id: rawId, day: normalized, directionOverride: null, canonical: canonicalHash(rawId, normalized) };
  }

  function persistState(mutate) {
    const draft = JSON.parse(JSON.stringify(appState));
    if (mutate) mutate(draft);
    draft.selectedTripId = selectedId;
    draft.selectedDayByTrip = draft.selectedDayByTrip || {};
    draft.selectedDayByTrip[selectedId] = dayIndex;
    appState = stateStore.saveState(storageAdapter, draft, stateModel);
  }

  function tripStateSlice(tripId) {
    return {
      directionId: appState.routeDirectionByTrip[tripId],
      itinerarySelections: appState.itinerarySelections[tripId],
      budgetOverrides: appState.budgetOverrides[tripId]
    };
  }

  function recomputeResolvedTrips() {
    resolvedTrips = trips.map(trip => model.resolveTrip(trip, tripStateSlice(trip.id)));
    resolvedById = new Map(resolvedTrips.map(trip => [trip.id, trip]));
    if (!resolvedById.has(selectedId)) selectedId = defaultTrip.id;
    dayIndex = normalizeDayIndex(selectedId, dayIndex);
  }

  function linkElement(link) {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.language ? `${link.label} (${link.language})` : link.label;
    return anchor;
  }

  function renderLinks(container, links) {
    container.replaceChildren();
    links.forEach(link => {
      const li = createNode("li");
      li.append(linkElement(link));
      container.append(li);
    });
  }

  function renderConcepts() {
    const currentSort = els["sort-concepts"].value;
    const list = [...resolvedTrips];
    if (currentSort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));
    if (currentSort === "bases") list.sort((a, b) => a.bases - b.bases || model.compareTripOrder(a, b));
    if (currentSort === "days") list.sort((a, b) => a.days - b.days || model.compareTripOrder(a, b));
    if (currentSort === "council") list.sort(model.compareTripOrder);

    els["concept-list"].replaceChildren();
    list.forEach(trip => {
      const button = createNode("button", { className: "concept-item" });
      button.type = "button";
      button.dataset.tripId = trip.id;
      const isSelected = trip.id === selectedId;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
      const name = createNode("span", { className: "name", text: trip.name });
      const status = createNode("span", { className: "concept-status", text: trip.status });
      const meta = createNode("span", {
        className: "meta",
        text: `${trip.calendarEntries} calendar days · ${trip.bases} bases · friction ${trip.friction.score.toFixed(2)}`
      });
      const cost = createNode("span", {
        className: "meta",
        text: `Custom estimate ${asMoney(trip.budget.customizedTotal, trip.budget.currency)}`
      });
      button.append(name, status, meta, cost);
      button.addEventListener("click", () => selectTrip(trip.id, 0, true));
      els["concept-list"].append(button);
    });
  }

  function fact(label, value) {
    const wrapper = createNode("div");
    const dt = createNode("dt", { text: label });
    const dd = createNode("dd", { text: value });
    wrapper.append(dt, dd);
    return wrapper;
  }

  function renderDirectionPanel(trip) {
    const directions = trip.directionCompare || [];
    if (!directions.length) {
      els["direction-panel"].hidden = true;
      return;
    }

    els["direction-panel"].hidden = false;
    els["direction-options"].replaceChildren();
    directions.forEach(direction => {
      const label = createNode("label", { className: "choice-chip" });
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `direction-${trip.id}`;
      input.value = direction.id;
      input.checked = direction.id === trip.activeDirectionId;
      input.addEventListener("change", () => {
        persistState(draft => {
          draft.routeDirectionByTrip = draft.routeDirectionByTrip || {};
          draft.routeDirectionByTrip[trip.id] = direction.id;
        });
        recomputeResolvedTrips();
        renderAll({ fitMap: true });
        updateUrl();
        announce(`Direction set to ${direction.label}.`);
      });
      const text = createNode("span", { text: direction.label });
      label.append(input, text);
      els["direction-options"].append(label);
    });

    const compareRows = [
      ["gateway", "Gateway flow"],
      ["rentalDirectionComplexity", "Rental direction / complexity"],
      ["openingEnding", "Opening / ending mood"],
      ["gatewayConvenience", "Gateway convenience"],
      ["estimatedCostDelta", "Estimated cost delta"],
      ["logisticalRisk", "Logistical risk"]
    ];

    const table = createNode("table", { className: "matrix-table" });
    const thead = createNode("thead");
    const headingRow = createNode("tr");
    headingRow.append(createNode("th", { text: "Direction factor" }));
    directions.forEach(direction => {
      headingRow.append(createNode("th", { text: direction.label }));
    });
    thead.append(headingRow);
    const tbody = createNode("tbody");
    compareRows.forEach(([key, label]) => {
      const row = createNode("tr");
      row.append(createNode("th", { text: label }));
      directions.forEach(direction => {
        row.append(createNode("td", { text: direction.compare[key] || "—" }));
      });
      tbody.append(row);
    });
    table.append(thead, tbody);
    els["direction-compare-table"].replaceChildren(table);

    els["direction-cards"].replaceChildren();
    directions.forEach(direction => {
      const card = createNode("article", { className: "snap-card" });
      const heading = createNode("h4", { text: direction.label });
      const dl = createNode("dl", { className: "info-grid" });
      compareRows.forEach(([key, label]) => {
        const dt = createNode("dt", { text: label });
        const dd = createNode("dd", { text: direction.compare[key] || "—" });
        dl.append(dt, dd);
      });
      card.append(heading, dl);
      els["direction-cards"].append(card);
    });
  }

  function renderFriction(trip) {
    const score = trip.friction.score;
    els["friction-score"].textContent = `${score.toFixed(2)} / 5`;
    const metrics = trip.effectiveFrictionMetrics;
    els["friction-summary"].textContent = `Hotel changes ${metrics.hotelChanges.toFixed(1)}, transfer days ${metrics.transferDays.toFixed(1)}, inter-base time ${metrics.interBaseHours.toFixed(1)} hours, long-haul burden ${metrics.longHaulBurden.toFixed(1)}, recovery/flex credits ${metrics.recoveryFlexDays.toFixed(1)}.`;

    const table = createNode("table", { className: "matrix-table" });
    const thead = createNode("thead");
    const headingRow = createNode("tr");
    ["Factor", "Raw metric", "Normalized", "Weight", "Impact"].forEach(label => headingRow.append(createNode("th", { text: label })));
    thead.append(headingRow);
    const tbody = createNode("tbody");
    trip.friction.breakdown.forEach(factor => {
      const row = createNode("tr");
      row.append(
        createNode("th", { text: factor.label }),
        createNode("td", { text: `${factor.raw.toFixed(2)} ${factor.unit}` }),
        createNode("td", { text: factor.normalized.toFixed(3) }),
        createNode("td", { text: factor.weight.toFixed(2) }),
        createNode("td", { text: factor.weightedImpact.toFixed(3) })
      );
      tbody.append(row);
    });
    table.append(thead, tbody);
    els["friction-breakdown"].replaceChildren(table);
  }

  function updateBudgetOverride(tripId, categoryId, field, value) {
    persistState(draft => {
      draft.budgetOverrides = draft.budgetOverrides || {};
      draft.budgetOverrides[tripId] = draft.budgetOverrides[tripId] || {};
      draft.budgetOverrides[tripId][categoryId] = draft.budgetOverrides[tripId][categoryId] || {};
      if (value === null) {
        delete draft.budgetOverrides[tripId][categoryId][field];
        if (!Object.keys(draft.budgetOverrides[tripId][categoryId]).length) delete draft.budgetOverrides[tripId][categoryId];
        if (!Object.keys(draft.budgetOverrides[tripId]).length) delete draft.budgetOverrides[tripId];
      } else {
        draft.budgetOverrides[tripId][categoryId][field] = Math.max(0, value);
      }
    });
    recomputeResolvedTrips();
    renderBudget(currentTrip());
    renderComparison();
    announce("Budget values updated.");
  }

  function renderBudget(trip) {
    els["budget-totals"].replaceChildren();
    const totals = [
      ["Baseline total", asMoney(trip.budget.baselineTotal, trip.budget.currency)],
      ["Customized total", asMoney(trip.budget.customizedTotal, trip.budget.currency)],
      ["Per person", asMoney(trip.budget.perPerson, trip.budget.currency)],
      ["Delta", `${trip.budget.delta >= 0 ? "+" : "-"}${asMoney(Math.abs(trip.budget.delta), trip.budget.currency)}`]
    ];
    totals.forEach(([label, value]) => {
      const item = createNode("p");
      const strong = createNode("strong", { text: `${label}: ` });
      item.append(strong, value);
      els["budget-totals"].append(item);
    });

    els["budget-categories"].replaceChildren();
    trip.budget.categories.forEach(category => {
      const card = createNode("section", { className: "budget-card" });
      const heading = createNode("h4", { text: category.label });
      const baseline = createNode("p", {
        text: `Baseline: ${asMoney(category.baseline.estimate, trip.budget.currency)}${Number.isFinite(category.baseline.low) && Number.isFinite(category.baseline.high)
          ? ` (${asMoney(category.baseline.low, trip.budget.currency)}–${asMoney(category.baseline.high, trip.budget.currency)})`
          : ""}`
      });

      function numberInput(field, currentValue, hint) {
        const wrapper = createNode("label", { className: "budget-input" });
        wrapper.textContent = hint;
        const input = document.createElement("input");
        input.type = "number";
        input.inputMode = "decimal";
        input.min = "0";
        input.step = "10";
        input.value = Number.isFinite(currentValue) ? String(Math.round(currentValue)) : "";
        input.placeholder = "Use baseline";
        input.addEventListener("change", () => {
          const parsed = Number(input.value);
          if (!input.value.trim() || !Number.isFinite(parsed)) updateBudgetOverride(trip.id, category.id, field, null);
          else updateBudgetOverride(trip.id, category.id, field, parsed);
        });
        wrapper.append(input);
        return wrapper;
      }

      const inputs = createNode("div", { className: "budget-inputs" });
      inputs.append(
        numberInput("estimate", category.current.estimate, "Current estimate"),
        numberInput("low", category.current.low, "Override low (optional)"),
        numberInput("high", category.current.high, "Override high (optional)")
      );
      card.append(heading, baseline, inputs);
      els["budget-categories"].append(card);
    });
  }

  function renderComparisonSelection(selectedTrips) {
    const selectedIds = new Set(selectedTrips.map(trip => trip.id));
    const maxReached = selectedIds.size >= stateStore.MAX_COMPARE_TRIPS;
    els["compare-selection"].replaceChildren();
    resolvedTrips.forEach(trip => {
      const chip = createNode("label", { className: "choice-chip" });
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = selectedIds.has(trip.id);
      input.disabled = !selectedIds.has(trip.id) && maxReached;
      input.addEventListener("change", () => {
        persistState(draft => {
          const next = new Set(draft.compareTripIds || []);
          if (input.checked) {
            next.add(trip.id);
            if (next.size > stateStore.MAX_COMPARE_TRIPS) {
              const ordered = resolvedTrips.map(item => item.id).filter(id => next.has(id));
              draft.compareTripIds = ordered.slice(0, stateStore.MAX_COMPARE_TRIPS);
            } else {
              draft.compareTripIds = Array.from(next);
            }
          } else {
            next.delete(trip.id);
            if (next.size < stateStore.MIN_COMPARE_TRIPS) {
              draft.compareTripIds = Array.from(next);
              draft.compareTripIds.push(trip.id);
            } else {
              draft.compareTripIds = Array.from(next);
            }
          }
        });
        recomputeResolvedTrips();
        renderComparison();
      });
      chip.append(input, createNode("span", { text: trip.name }));
      els["compare-selection"].append(chip);
    });
  }

  function renderComparison() {
    const selectedIds = appState.compareTripIds || [];
    const selectedTrips = selectedIds
      .map(id => resolvedById.get(id))
      .filter(Boolean);
    const fallback = resolvedTrips.slice(0, Math.max(stateStore.MIN_COMPARE_TRIPS, Math.min(stateStore.MAX_COMPARE_TRIPS, resolvedTrips.length)));
    const comparisonTrips = selectedTrips.length >= stateStore.MIN_COMPARE_TRIPS ? selectedTrips : fallback;

    els["compare-warning"].textContent = `Select ${stateStore.MIN_COMPARE_TRIPS}-${stateStore.MAX_COMPARE_TRIPS} trips. Compare uses customized budget totals and current route/itinerary selections.`;
    renderComparisonSelection(comparisonTrips);

    const table = createNode("table", { className: "matrix-table" });
    const thead = createNode("thead");
    const headingRow = createNode("tr");
    headingRow.append(createNode("th", { text: "Comparison field" }));
    comparisonTrips.forEach(trip => headingRow.append(createNode("th", { text: trip.name })));
    thead.append(headingRow);
    const tbody = createNode("tbody");
    compareFields.forEach(([key, label]) => {
      const row = createNode("tr");
      row.append(createNode("th", { text: label }));
      comparisonTrips.forEach(trip => {
        row.append(createNode("td", { text: trip.compare[key] || "—" }));
      });
      tbody.append(row);
    });
    table.append(thead, tbody);
    els["compare-table"].replaceChildren(table);

    els["compare-cards"].replaceChildren();
    comparisonTrips.forEach(trip => {
      const card = createNode("article", { className: "snap-card" });
      card.append(createNode("h4", { text: trip.name }));
      const dl = createNode("dl", { className: "info-grid" });
      compareFields.forEach(([key, label]) => {
        dl.append(createNode("dt", { text: label }), createNode("dd", { text: trip.compare[key] || "—" }));
      });
      card.append(dl);
      els["compare-cards"].append(card);
    });
  }

  function voteSelect(targetId, person, value, onChange) {
    const select = document.createElement("select");
    const blank = createNode("option", { text: "—" });
    blank.value = "";
    select.append(blank);
    model.VOTE_VALUES.forEach(vote => {
      const option = createNode("option", { text: vote });
      option.value = vote;
      select.append(option);
    });
    select.value = value || "";
    select.setAttribute("aria-label", `${person} vote for ${targetId}`);
    select.addEventListener("change", () => {
      const next = select.value || "";
      onChange(next);
    });
    return select;
  }

  function updateVote(targetType, targetId, person, value) {
    persistState(draft => {
      draft.votes = draft.votes || { trips: {}, anchors: {} };
      draft.votes[targetType] = draft.votes[targetType] || {};
      draft.votes[targetType][targetId] = draft.votes[targetType][targetId] || {};
      if (!value) {
        delete draft.votes[targetType][targetId][person];
        if (!Object.keys(draft.votes[targetType][targetId]).length) delete draft.votes[targetType][targetId];
      } else {
        draft.votes[targetType][targetId][person] = value;
      }
    });
    recomputeResolvedTrips();
    renderDecision();
    announce("Vote saved locally.");
  }

  function renderDecisionSummary(summary) {
    els["decision-summary"].replaceChildren();
    const sections = [
      ["Trip alignment", summary.tripBuckets],
      ["Anchor alignment", summary.anchorBuckets]
    ];
    sections.forEach(([title, buckets]) => {
      const article = createNode("article", { className: "summary-card" });
      article.append(createNode("h4", { text: title }));
      const list = createNode("ul");
      Object.keys(decisionBucketLabels).forEach(key => {
        const items = buckets[key] || [];
        const li = createNode("li");
        const names = items.map(item => item.label).slice(0, 4).join(", ");
        li.textContent = `${decisionBucketLabels[key]}: ${items.length}${names ? ` — ${names}` : ""}`;
        list.append(li);
      });
      article.append(list);
      els["decision-summary"].append(article);
    });

    const favorites = createNode("article", { className: "summary-card" });
    favorites.append(createNode("h4", { text: "Our favorites" }));
    if (summary.favorites.length) {
      const list = createNode("ul");
      summary.favorites.forEach(item => list.append(createNode("li", { text: item })));
      favorites.append(list);
    } else {
      favorites.append(createNode("p", { text: "No shared favorites yet — add votes to surface overlap." }));
    }
    els["decision-summary"].append(favorites);
  }

  function renderTripVotes() {
    els["trip-vote-rows"].replaceChildren();
    resolvedTrips.forEach(trip => {
      const row = createNode("tr");
      const labelCell = createNode("th", { text: trip.name });
      const tripVotes = appState.votes.trips[trip.id] || {};
      const chrisCell = createNode("td");
      const rachelCell = createNode("td");
      chrisCell.append(voteSelect(trip.name, "Chris", tripVotes.chris, value => updateVote("trips", trip.id, "chris", value)));
      rachelCell.append(voteSelect(trip.name, "Rachel", tripVotes.rachel, value => updateVote("trips", trip.id, "rachel", value)));
      row.append(labelCell, chrisCell, rachelCell);
      els["trip-vote-rows"].append(row);
    });
  }

  function renderAnchorVotes() {
    els["anchor-vote-groups"].replaceChildren();
    resolvedTrips.forEach(trip => {
      const wrapper = createNode("section", { className: "anchor-group" });
      wrapper.append(createNode("h4", { text: trip.name }));
      const table = createNode("table", { className: "vote-table" });
      const thead = createNode("thead");
      const headRow = createNode("tr");
      ["Anchor experience", "Chris", "Rachel"].forEach(label => headRow.append(createNode("th", { text: label })));
      thead.append(headRow);
      const tbody = createNode("tbody");
      (trip.anchorExperiences || []).forEach(anchor => {
        const row = createNode("tr");
        const anchorVotes = appState.votes.anchors[anchor.id] || {};
        const label = createNode("th", { text: anchor.label });
        const chrisCell = createNode("td");
        const rachelCell = createNode("td");
        chrisCell.append(voteSelect(anchor.label, "Chris", anchorVotes.chris, value => updateVote("anchors", anchor.id, "chris", value)));
        rachelCell.append(voteSelect(anchor.label, "Rachel", anchorVotes.rachel, value => updateVote("anchors", anchor.id, "rachel", value)));
        row.append(label, chrisCell, rachelCell);
        tbody.append(row);
      });
      table.append(thead, tbody);
      wrapper.append(table);
      els["anchor-vote-groups"].append(wrapper);
    });
  }

  function renderSelectedVariants() {
    els["selected-variants-summary"].replaceChildren();
    const currentChoices = [];
    resolvedTrips.forEach(trip => {
      if (trip.activeDirectionLabel) currentChoices.push(`${trip.name}: ${trip.activeDirectionLabel}`);
      trip.selectedVariants.forEach(choice => {
        if (choice.optionId !== "primary") currentChoices.push(`${trip.name} ${choice.dayLabel}: ${choice.optionLabel} (${choice.optionTitle})`);
      });
    });
    if (!currentChoices.length) {
      els["selected-variants-summary"].append(createNode("p", { text: "Current modeled choices use default directions and primary itinerary options." }));
      return;
    }
    const list = createNode("ul");
    currentChoices.forEach(text => list.append(createNode("li", { text })));
    els["selected-variants-summary"].append(list);
  }

  function renderDecision() {
    const summary = model.summarizeVotes(resolvedTrips, appState.votes);
    renderDecisionSummary(summary);
    renderTripVotes();
    renderAnchorVotes();
    renderSelectedVariants();
  }

  function dayFigure(image) {
    const figure = createNode("figure", { className: "day-figure" });
    const img = createNode("img", { className: "day-thumb" });
    img.src = image.url;
    img.alt = image.alt;
    img.width = image.width;
    img.height = image.height;
    img.loading = "lazy";
    img.decoding = "async";
    const caption = createNode("figcaption", { text: `Photo: ${image.credit}, via Wikimedia Commons` });
    figure.append(img, caption);
    return figure;
  }

  function detailRow(label, value) {
    const p = createNode("p");
    const strong = createNode("strong", { text: `${label}: ` });
    p.append(strong, value);
    return p;
  }

  function detailLinks(links) {
    const wrapper = createNode("div", { className: "day-links" });
    const strong = createNode("strong", { text: "Selected planning links:" });
    const ul = createNode("ul");
    renderLinks(ul, links);
    wrapper.append(strong, ul);
    return wrapper;
  }

  function applyVariantSelection(tripId, groupId, optionId) {
    persistState(draft => {
      draft.itinerarySelections = draft.itinerarySelections || {};
      draft.itinerarySelections[tripId] = draft.itinerarySelections[tripId] || {};
      draft.itinerarySelections[tripId][groupId] = optionId;
    });
    recomputeResolvedTrips();
    renderAll({ reframeDay: true });
    announce("Itinerary alternative updated.");
  }

  function variantControls(tripId, day) {
    if (!day.variantOptions || day.variantOptions.length <= 1) return null;
    const fieldset = createNode("fieldset", { className: "variant-controls" });
    const legend = createNode("legend", { text: day.variantPrompt || "Choose a day variant" });
    fieldset.append(legend);
    day.variantOptions.forEach(option => {
      const label = createNode("label", { className: "choice-chip" });
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${tripId}-${day.variantGroupId}`;
      input.value = option.id;
      input.checked = option.id === day.selectedVariantId;
      input.addEventListener("change", () => {
        applyVariantSelection(tripId, day.variantGroupId, option.id);
      });
      const text = createNode("span", { text: `${option.label}: ${option.title}` });
      label.append(input, text);
      fieldset.append(label);
    });
    if (day.selectedVariantSummary) {
      fieldset.append(createNode("p", { className: "variant-summary", text: day.selectedVariantSummary }));
    }
    return fieldset;
  }

  function dayDetailRows(entry, includeMain) {
    const rows = [];
    if (includeMain) rows.push(detailRow("Main idea", entry.main));
    if (entry.transit) rows.push(detailRow("Getting there", entry.transit));
    if (entry.selectedVariantLabel) rows.push(detailRow("Selected option", `${entry.selectedVariantLabel}${entry.selectedVariantSummary ? ` — ${entry.selectedVariantSummary}` : ""}`));
    rows.push(
      detailRow("Companion idea", entry.companion),
      detailRow("Why it fits", entry.fit),
      detailRow("Pace / terrain", entry.pace),
      detailRow("Fallback", entry.fallback),
      detailLinks(entry.links)
    );
    return rows;
  }

  function renderItinerary(day) {
    const trip = currentTrip();
    els["beat-position"].textContent = `${day.label} · ${dayIndex + 1} of ${trip.daysPlan.length}`;
    els["beat-title"].textContent = day.title;
    els["beat-detail"].textContent = day.main;
    els["beat-extra"].replaceChildren(...dayDetailRows(day, false));
    els["beat-variant-controls"].replaceChildren();
    const beatControls = variantControls(trip.id, day);
    if (beatControls) els["beat-variant-controls"].append(beatControls);
    els["previous-beat"].disabled = dayIndex === 0;
    els["next-beat"].disabled = dayIndex === trip.daysPlan.length - 1;

    els["itinerary-list"].replaceChildren();
    els["rail-beats"].replaceChildren();
    trip.daysPlan.forEach((entry, index) => {
      const li = createNode("li");
      li.classList.toggle("active", index === dayIndex);
      const select = createNode("button", { className: "day-select", text: `${entry.label} — ${entry.title}` });
      select.type = "button";
      if (index === dayIndex) select.setAttribute("aria-current", "true");
      select.addEventListener("click", () => setDay(index, true));
      const body = createNode("div", { className: "day-expanded" });
      const text = createNode("div", { className: "day-text" });
      text.append(...dayDetailRows(entry, true));
      const variant = variantControls(trip.id, entry);
      if (variant) text.append(variant);
      body.append(text);
      if (entry.image) body.append(dayFigure(entry.image));
      li.append(select, body);
      els["itinerary-list"].append(li);

      const rail = createNode("button", { className: "rail-beat", text: entry.title });
      rail.type = "button";
      rail.classList.toggle("active", index === dayIndex);
      const count = createNode("span", { text: entry.label });
      rail.append(count);
      rail.addEventListener("click", () => setDay(index, true));
      els["rail-beats"].append(rail);
    });
  }

  function renderMobility(trip) {
    els["mobility-summary"].replaceChildren();
    [
      ["Hardest day", trip.mobility.hardest],
      ["Likely walking / standing", trip.mobility.walking],
      ["Lower-walking / seated option", trip.mobility.lower],
      ["Protected recovery", trip.mobility.recovery]
    ].forEach(([label, value]) => {
      const li = createNode("li");
      li.append(createNode("strong", { text: `${label}: ` }), value);
      els["mobility-summary"].append(li);
    });
  }

  function renderImages(trip) {
    els["image-gallery"].replaceChildren();
    trip.images.forEach(image => {
      const figure = createNode("figure");
      const img = createNode("img");
      img.src = image.file;
      img.alt = image.alt;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 800;
      img.height = 533;
      const caption = createNode("figcaption");
      const source = createNode("a", { text: image.credit });
      source.href = image.source;
      const license = createNode("a", { text: "License details" });
      license.href = image.license;
      caption.append(source, document.createTextNode(` ${image.note} `), license);
      figure.append(img, caption);
      els["image-gallery"].append(figure);
    });
  }

  function renderTextList(container, entries) {
    container.replaceChildren();
    entries.forEach(entry => container.append(createNode("li", { text: entry })));
  }

  function renderRental(trip) {
    const rental = trip.rentalFeasibility;
    if (!rental) {
      els["rental-panel"].hidden = true;
      return;
    }
    els["rental-panel"].hidden = false;
    els["rental-status"].textContent = rental.status;
    els["rental-primary"].textContent = rental.primary;
    renderTextList(els["rental-checklist"], rental.checklist);
    renderTextList(els["rental-fallbacks"], rental.fallbackOptions);
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
    els["repair"].textContent = trip.repair;
    els["route-description"].textContent = `${trip.route}. Working season: ${trip.timing}.`;
    els["fallback-route"].textContent = mapTextSummary(trip);
    els["route-facts"].replaceChildren(
      fact("Calendar", `${trip.calendarEntries} days`),
      fact("Hotel nights", String(trip.nights)),
      fact("Bases", String(trip.bases)),
      fact("Hotel moves", trip.effectiveFrictionMetrics.hotelChanges.toFixed(1)),
      fact("Transfer days", trip.effectiveFrictionMetrics.transferDays.toFixed(1)),
      fact("Inter-base time", `${trip.effectiveFrictionMetrics.interBaseHours.toFixed(1)}h`),
      fact("Friction", `${trip.friction.score.toFixed(2)} / 5`),
      fact("Customized estimate", asMoney(trip.budget.customizedTotal, trip.budget.currency))
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
    renderRental(trip);
    renderDirectionPanel(trip);
    renderFriction(trip);
    renderBudget(trip);
    renderMobility(trip);
    renderImages(trip);
    els["responsible-copy"].textContent = trip.responsible;
    renderItinerary(day);
  }

  function closeConceptList() {
    els["concept-list"].classList.remove("open");
    els["concept-trigger"].setAttribute("aria-expanded", "false");
  }

  function toggleConceptList() {
    const open = els["concept-list"].classList.toggle("open");
    els["concept-trigger"].setAttribute("aria-expanded", String(open));
  }

  function selectTrip(id, nextDay = 0, updateHash = false) {
    selectedId = tripIdSet.has(id) ? id : defaultTrip.id;
    dayIndex = normalizeDayIndex(selectedId, nextDay);
    persistState();
    recomputeResolvedTrips();
    renderAll({ fitMap: true });
    closeConceptList();
    if (updateHash) updateUrl();
    announce(`${currentTrip().name} selected.`);
  }

  function setDay(index, updateHash = false) {
    dayIndex = normalizeDayIndex(selectedId, index);
    persistState();
    recomputeResolvedTrips();
    renderAll({ reframeDay: true });
    if (updateHash) updateUrl();
    announce(`${currentTrip().daysPlan[dayIndex].title}.`);
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
      if (!from || !to) return;
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
        const match = trip.daysPlan.findIndex(day => day.stops.includes(stop.id));
        if (match >= 0) setDay(match, true);
      });
      routeLayers.push(marker);
    });
    return bounds;
  }

  function fitBounds(bounds) {
    if (!map || !bounds || !bounds.isValid()) return;
    map.fitBounds(bounds, { padding: [35, 35], maxZoom: 8, animate: !matchMedia("(prefers-reduced-motion: reduce)").matches });
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
    const trip = currentTrip();
    const activeIds = stopIdsForDay(trip.daysPlan[dayIndex]);
    const activeStops = trip.stops.filter(stop => activeIds.includes(stop.id));
    const animate = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (activeStops.length === 1) map.setView([activeStops[0].lat, activeStops[0].lng], Math.max(map.getZoom(), 6), { animate });
    else if (activeStops.length > 1) map.fitBounds(activeStops.map(stop => [stop.lat, stop.lng]), { padding: [55, 55], maxZoom: 7, animate });
  }

  function showTileNotice() {
    if (byId("tile-notice")) return;
    const notice = createNode("div", { className: "map-legend tile-notice", text: "Map detail is unavailable. Route lines and itinerary controls still work." });
    notice.id = "tile-notice";
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

  function setLegendExpanded(expanded, options = {}) {
    const announceChange = options.announceChange !== false;
    legendExpanded = expanded;
    els["map-legend"].hidden = !expanded;
    els["toggle-legend"].setAttribute("aria-expanded", String(expanded));
    els["toggle-legend"].textContent = expanded ? "Hide legend" : "Show legend";
    if (announceChange) announce(expanded ? "Map legend shown." : "Map legend hidden.");
  }

  function syncLegendForViewport() {
    setLegendExpanded(!mapLegendPhoneQuery.matches, { announceChange: false });
  }

  function setMapExpanded(expanded, options = {}) {
    const announceChange = options.announceChange !== false;
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
    if (announceChange) {
      announce(expanded ? "Map expanded. Press Escape or Collapse map to return." : "Map returned to split view.");
    }
  }

  function initMap() {
    if (!window.L) return showMapFallback("Leaflet did not load.");
    try {
      map = L.map("map", {
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        keyboard: true,
        zoomControl: true,
        attributionControl: true,
        preferCanvas: true
      });
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

  function renderAll(options = {}) {
    const fitMap = !!options.fitMap;
    const reframeDay = !!options.reframeDay;
    renderConcepts();
    renderEvidence();
    renderComparison();
    renderDecision();
    if (map) {
      if (fitMap) drawRoutes(true);
      else if (reframeDay) updateMapDay(true);
      else drawRoutes(false);
    }
  }

  function bindEvents() {
    els["sort-concepts"].addEventListener("change", () => renderConcepts());
    els["concept-trigger"].addEventListener("click", toggleConceptList);
    els["previous-beat"].addEventListener("click", () => setDay(dayIndex - 1, true));
    els["next-beat"].addEventListener("click", () => setDay(dayIndex + 1, true));
    document.querySelector(".itinerary-section").addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDay(dayIndex - 1, true);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDay(dayIndex + 1, true);
      }
    });
    els["fit-route"].addEventListener("click", () => drawRoutes(true));
    els["enable-map"].addEventListener("click", () => setMapInteraction(!mapEnabled));
    els["toggle-legend"].addEventListener("click", () => setLegendExpanded(!legendExpanded));
    els["expand-map"].addEventListener("click", () => {
      const expanded = document.querySelector(".route-table").classList.contains("map-expanded");
      setMapExpanded(!expanded);
    });
    els["retry-map"].addEventListener("click", () => location.reload());
    els["reset-budget"].addEventListener("click", () => {
      const tripId = selectedId;
      persistState(draft => {
        if (draft.budgetOverrides) delete draft.budgetOverrides[tripId];
      });
      recomputeResolvedTrips();
      renderAll();
      announce("Budget overrides reset for this trip.");
    });

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
      const stateFromUrl = readUrl();
      selectedId = stateFromUrl.id;
      dayIndex = stateFromUrl.day;
      if (stateFromUrl.directionOverride) {
        persistState(draft => {
          draft.routeDirectionByTrip = draft.routeDirectionByTrip || {};
          draft.routeDirectionByTrip["italy-slovenia"] = stateFromUrl.directionOverride;
        });
      } else {
        persistState();
      }
      recomputeResolvedTrips();
      renderAll({ fitMap: true });
      if (location.hash !== stateFromUrl.canonical) updateUrl("replace");
    });

    if (mapLegendPhoneQuery.addEventListener) {
      mapLegendPhoneQuery.addEventListener("change", syncLegendForViewport);
    } else {
      mapLegendPhoneQuery.addListener(syncLegendForViewport);
    }
  }

  function start() {
    recomputeResolvedTrips();
    const stateFromUrl = readUrl();
    selectedId = stateFromUrl.id;
    dayIndex = stateFromUrl.day;
    if (stateFromUrl.directionOverride) {
      persistState(draft => {
        draft.routeDirectionByTrip = draft.routeDirectionByTrip || {};
        draft.routeDirectionByTrip["italy-slovenia"] = stateFromUrl.directionOverride;
      });
    } else {
      persistState();
    }
    recomputeResolvedTrips();
    bindEvents();
    syncLegendForViewport();
    renderAll({ fitMap: false });
    initMap();
    if (location.hash !== stateFromUrl.canonical) updateUrl("replace");
    if (recoveredState) {
      const message = "Saved local planning state was malformed or outdated and has been safely reset.";
      if (els["state-recovery-note"]) els["state-recovery-note"].textContent = message;
      announce(message);
      recoveredState = false;
    } else if (els["state-recovery-note"]) {
      els["state-recovery-note"].textContent = "";
    }
  }

  start();
})();
