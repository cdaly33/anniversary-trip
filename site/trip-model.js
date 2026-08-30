(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ANNIVERSARY_TRIP_MODEL = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const VOTE_VALUES = Object.freeze(["Love", "Like", "Meh", "No"]);

  const FRICTION_FACTORS = Object.freeze([
    { id: "hotelChanges", label: "Hotel changes", max: 4, weight: 0.55, unit: "moves" },
    { id: "transferDays", label: "Transfer days", max: 5, weight: 0.75, unit: "days" },
    { id: "interBaseHours", label: "Inter-base transfer time", max: 18, weight: 0.9, unit: "hours" },
    { id: "internalFlights", label: "Internal flights", max: 2, weight: 1.05, unit: "segments" },
    { id: "rentalDependencyDays", label: "Rental dependency", max: 7, weight: 0.7, unit: "days" },
    { id: "crossBorderOneWayRental", label: "Cross-border one-way rental complexity", max: 1, weight: 0.95, unit: "index" },
    { id: "scheduleDependencyDays", label: "Early/late schedule dependencies", max: 7, weight: 0.7, unit: "days" },
    { id: "longHaulBurden", label: "Long-haul burden", max: 5, weight: 0.85, unit: "index" },
    { id: "recoveryFlexDays", label: "Recovery/flex-day credit", max: 5, weight: -0.9, unit: "days" }
  ]);

  const POSITIVE_FRICTION_WEIGHT = FRICTION_FACTORS
    .filter(factor => factor.weight > 0)
    .reduce((sum, factor) => sum + factor.weight, 0);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function toFiniteNumber(value, fallback = 0) {
    return Number.isFinite(value) ? value : fallback;
  }

  function isRecord(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function deepMerge(base, overrides) {
    if (!isRecord(base) || !isRecord(overrides)) return clone(overrides);
    const output = clone(base);
    Object.keys(overrides).forEach(key => {
      const incoming = overrides[key];
      const existing = output[key];
      if (isRecord(existing) && isRecord(incoming)) output[key] = deepMerge(existing, incoming);
      else output[key] = clone(incoming);
    });
    return output;
  }

  function compareTripOrder(a, b) {
    return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
      || a.name.localeCompare(b.name);
  }

  function resolveDefaultTrip(data) {
    const explicit = data.filter(trip => trip.isDefault || trip.default === true).sort(compareTripOrder);
    if (explicit.length) return explicit[0];
    return [...data].sort(compareTripOrder)[0];
  }

  function selectedDirection(trip, directionId) {
    if (!Array.isArray(trip.routeDirections) || !trip.routeDirections.length) return null;
    return trip.routeDirections.find(direction => direction.id === directionId)
      || trip.routeDirections.find(direction => direction.id === trip.defaultDirectionId)
      || trip.routeDirections[0];
  }

  function applyDirection(trip, directionId) {
    const direction = selectedDirection(trip, directionId);
    if (!direction || !direction.overrides) {
      return {
        direction,
        trip: clone(trip)
      };
    }
    const directedTrip = deepMerge(trip, direction.overrides);
    return {
      direction,
      trip: directedTrip
    };
  }

  function createVariantIndex(trip) {
    const index = new Map();
    (trip.itineraryVariants || []).forEach(group => {
      if (!group || !group.dayId || !Array.isArray(group.options) || !group.options.length) return;
      index.set(group.dayId, group);
    });
    return index;
  }

  function addNumericAdjustments(target, additions) {
    if (!isRecord(additions)) return;
    Object.keys(additions).forEach(key => {
      target[key] = toFiniteNumber(target[key]) + toFiniteNumber(additions[key]);
    });
  }

  function resolveDays(trip, itinerarySelections) {
    const variantIndex = createVariantIndex(trip);
    const selections = isRecord(itinerarySelections) ? itinerarySelections : {};
    const selectedVariants = [];
    const budgetAdjustments = {};
    const frictionAdjustments = {};

    const days = trip.daysPlan.map(day => {
      const group = variantIndex.get(day.id);
      if (!group) {
        return {
          ...clone(day),
          variantGroupId: null,
          variantPrompt: "",
          variantOptions: [],
          selectedVariantId: null,
          selectedVariantLabel: "",
          selectedVariantSummary: ""
        };
      }

      const preferredId = selections[group.dayId];
      const selectedOption = group.options.find(option => option.id === preferredId)
        || group.options.find(option => option.id === "primary")
        || group.options[0];

      const mergedDay = selectedOption.overrides ? deepMerge(day, selectedOption.overrides) : clone(day);
      if (selectedOption.title) mergedDay.title = selectedOption.title;
      addNumericAdjustments(budgetAdjustments, selectedOption.budgetAdjustments);
      addNumericAdjustments(frictionAdjustments, selectedOption.frictionAdjustments);

      selectedVariants.push({
        dayId: group.dayId,
        dayLabel: day.label,
        dayTitle: day.title,
        optionId: selectedOption.id,
        optionLabel: selectedOption.label,
        optionTitle: selectedOption.title || mergedDay.title,
        summary: selectedOption.summary || ""
      });

      return {
        ...mergedDay,
        variantGroupId: group.dayId,
        variantPrompt: group.prompt || "Choose the plan for this day.",
        variantOptions: group.options.map(option => ({
          id: option.id,
          label: option.label,
          title: option.title || mergedDay.title,
          summary: option.summary || ""
        })),
        selectedVariantId: selectedOption.id,
        selectedVariantLabel: selectedOption.label,
        selectedVariantSummary: selectedOption.summary || ""
      };
    });

    return { days, budgetAdjustments, frictionAdjustments, selectedVariants };
  }

  function budgetCategoryMap(trip) {
    const map = new Map();
    ((trip.budgetModel && trip.budgetModel.categories) || []).forEach(category => {
      map.set(category.id, category);
    });
    return map;
  }

  function normalizeBudgetOverride(override) {
    if (!isRecord(override)) return {};
    const result = {};
    ["estimate", "low", "high"].forEach(field => {
      if (Number.isFinite(override[field])) result[field] = Math.max(0, override[field]);
    });
    return result;
  }

  function calculateBudget(trip, overrides, dynamicAdjustments) {
    const overrideMap = isRecord(overrides) ? overrides : {};
    const categories = ((trip.budgetModel && trip.budgetModel.categories) || []).map(category => {
      const categoryAdjustment = toFiniteNumber(dynamicAdjustments[category.id], 0);
      const baselineEstimate = Math.max(0, toFiniteNumber(category.baselineEstimate) + categoryAdjustment);
      const baselineLow = Number.isFinite(category.baselineLow)
        ? Math.max(0, toFiniteNumber(category.baselineLow) + categoryAdjustment)
        : null;
      const baselineHigh = Number.isFinite(category.baselineHigh)
        ? Math.max(0, toFiniteNumber(category.baselineHigh) + categoryAdjustment)
        : null;
      const normalizedOverride = normalizeBudgetOverride(overrideMap[category.id]);
      const currentEstimate = Number.isFinite(normalizedOverride.estimate)
        ? normalizedOverride.estimate
        : baselineEstimate;
      const currentLow = Number.isFinite(normalizedOverride.low) ? normalizedOverride.low : baselineLow;
      const currentHigh = Number.isFinite(normalizedOverride.high) ? normalizedOverride.high : baselineHigh;

      return {
        id: category.id,
        label: category.label,
        baseline: { estimate: baselineEstimate, low: baselineLow, high: baselineHigh },
        current: { estimate: currentEstimate, low: currentLow, high: currentHigh },
        overrides: normalizedOverride
      };
    });

    const baselineTotal = categories.reduce((sum, category) => sum + category.baseline.estimate, 0);
    const customizedTotal = categories.reduce((sum, category) => sum + category.current.estimate, 0);
    const travelers = Math.max(1, toFiniteNumber(trip.budgetModel?.travelers, 2));
    const delta = customizedTotal - baselineTotal;

    return {
      currency: trip.budgetModel?.currency || "USD",
      travelers,
      categories,
      baselineTotal,
      customizedTotal,
      perPerson: customizedTotal / travelers,
      delta
    };
  }

  function applyFrictionAdjustments(metrics, directionAdjustments, variantAdjustments) {
    const merged = clone(metrics || {});
    addNumericAdjustments(merged, directionAdjustments);
    addNumericAdjustments(merged, variantAdjustments);
    Object.keys(merged).forEach(key => {
      merged[key] = Math.max(0, toFiniteNumber(merged[key]));
    });
    return merged;
  }

  function calculateFriction(metrics) {
    const breakdown = FRICTION_FACTORS.map(factor => {
      const raw = Math.max(0, toFiniteNumber(metrics[factor.id], 0));
      const normalized = clamp(raw / factor.max, 0, 1);
      const weightedImpact = normalized * factor.weight;
      return {
        id: factor.id,
        label: factor.label,
        unit: factor.unit,
        raw,
        normalized,
        weight: factor.weight,
        weightedImpact
      };
    });

    const weightedSum = breakdown.reduce((sum, factor) => sum + factor.weightedImpact, 0);
    const score = clamp((weightedSum / POSITIVE_FRICTION_WEIGHT) * 5, 0, 5);
    return {
      score,
      weightedSum,
      breakdown
    };
  }

  function countKinds(days, allowedKinds) {
    const kinds = new Set(allowedKinds);
    return days.filter(day => kinds.has(day.kind)).length;
  }

  function formatCurrency(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  }

  function pluralize(value, noun) {
    const rounded = Number.isInteger(value) ? value : Number(value.toFixed(1));
    return `${rounded} ${noun}${Math.abs(rounded) === 1 ? "" : "s"}`;
  }

  function compareSummary(trip, budget, friction, metrics) {
    const profile = trip.compareProfile || {};
    const fullDestinationDays = countKinds(trip.daysPlan, ["day", "recovery"]);
    return {
      calendarDays: pluralize(trip.calendarEntries, "calendar day"),
      hotelNights: pluralize(trip.nights, "hotel night"),
      bases: pluralize(trip.bases, "base"),
      hotelMoves: pluralize(metrics.hotelChanges, "hotel move"),
      transferDays: pluralize(metrics.transferDays, "transfer day"),
      interBaseTime: `~${metrics.interBaseHours.toFixed(1)} total inter-base hours`,
      rentalRequirement: `${profile.rentalRequirement || "See trip notes"} (${pluralize(metrics.rentalDependencyDays, "day")})`,
      internalFlights: metrics.internalFlights > 0 ? pluralize(metrics.internalFlights, "internal flight") : "None",
      internationalFlightComplexity: trip.flight?.burden || "Provisional",
      recoveryFlexDays: `${metrics.recoveryFlexDays.toFixed(1)} recovery/flex-day credits`,
      fullDestinationDays: pluralize(fullDestinationDays, "full destination day"),
      estimatedTotalCost: `${formatCurrency(budget.customizedTotal, budget.currency)} customized`,
      tripFriction: `${friction.score.toFixed(2)} / 5`,
      scenery: profile.scenery || "",
      historicSitesCastles: profile.historicSitesCastles || "",
      food: profile.food || "",
      relaxation: profile.relaxation || "",
      logisticalSimplicity: profile.logisticalSimplicity || "",
      biggestStrength: profile.biggestStrength || "",
      biggestConcern: profile.biggestConcern || "",
      whyChoose: profile.whyChoose || "",
      whyRegret: profile.whyRegret || ""
    };
  }

  function resolveTrip(trip, stateSlice) {
    const slice = isRecord(stateSlice) ? stateSlice : {};
    const { direction, trip: directedTrip } = applyDirection(trip, slice.directionId);
    const { days, budgetAdjustments: variantBudget, frictionAdjustments: variantFriction, selectedVariants } = resolveDays(
      directedTrip,
      slice.itinerarySelections
    );

    directedTrip.daysPlan = days;
    const directionBudget = isRecord(direction?.budgetAdjustments) ? direction.budgetAdjustments : {};
    const directionFriction = isRecord(direction?.frictionAdjustments) ? direction.frictionAdjustments : {};
    const mergedBudgetAdjustments = {};
    addNumericAdjustments(mergedBudgetAdjustments, directionBudget);
    addNumericAdjustments(mergedBudgetAdjustments, variantBudget);

    const effectiveMetrics = applyFrictionAdjustments(directedTrip.frictionMetrics, directionFriction, variantFriction);
    const friction = calculateFriction(effectiveMetrics);
    const budget = calculateBudget(directedTrip, slice.budgetOverrides, mergedBudgetAdjustments);

    return {
      ...directedTrip,
      activeDirectionId: direction ? direction.id : null,
      activeDirectionLabel: direction ? direction.label : "",
      directionCompare: (trip.routeDirections || []).map(item => ({
        id: item.id,
        label: item.label,
        compare: clone(item.compare || {})
      })),
      selectedVariants,
      budget,
      friction,
      effectiveFrictionMetrics: effectiveMetrics,
      compare: compareSummary(directedTrip, budget, friction, effectiveMetrics)
    };
  }

  function prepareTrips(rawTrips) {
    return [...rawTrips].sort(compareTripOrder).map(trip => clone(trip));
  }

  function createStateModel(trips) {
    const ordered = [...trips].sort(compareTripOrder);
    const defaultTrip = resolveDefaultTrip(ordered);
    const compareDefaults = ordered.slice(0, Math.min(3, ordered.length)).map(trip => trip.id);
    const model = {
      tripIds: ordered.map(trip => trip.id),
      defaultTripId: defaultTrip?.id || (ordered[0] ? ordered[0].id : null),
      compareDefaults,
      directionIdsByTrip: {},
      variantIdsByTrip: {},
      budgetCategoryIdsByTrip: {},
      anchorIdsByTrip: {}
    };

    ordered.forEach(trip => {
      model.directionIdsByTrip[trip.id] = (trip.routeDirections || []).map(direction => direction.id);
      model.variantIdsByTrip[trip.id] = (trip.itineraryVariants || []).map(group => group.dayId);
      model.budgetCategoryIdsByTrip[trip.id] = (trip.budgetModel?.categories || []).map(category => category.id);
      model.anchorIdsByTrip[trip.id] = (trip.anchorExperiences || []).map(anchor => anchor.id);
    });

    return model;
  }

  function classifyVotes(chris, rachel) {
    if (!chris || !rachel) return "unrated";
    if (chris === "No" || rachel === "No") return "rejectedByEither";
    if (chris === "Love" && rachel === "Love") return "bothLove";
    if (chris === "Like" && rachel === "Like") return "bothLike";
    if ((chris === "Love" && rachel === "Meh") || (rachel === "Love" && chris === "Meh")) return "oneLovesOneNeutral";
    if (chris === "Meh" && rachel === "Meh") return "bothIndifferent";
    return "conflict";
  }

  function emptyBuckets() {
    return {
      bothLove: [],
      bothLike: [],
      oneLovesOneNeutral: [],
      conflict: [],
      bothIndifferent: [],
      rejectedByEither: [],
      unrated: []
    };
  }

  function summarizeVotes(resolvedTrips, votes) {
    const voteState = isRecord(votes) ? votes : {};
    const tripVotes = isRecord(voteState.trips) ? voteState.trips : {};
    const anchorVotes = isRecord(voteState.anchors) ? voteState.anchors : {};
    const tripBuckets = emptyBuckets();
    const anchorBuckets = emptyBuckets();

    resolvedTrips.forEach(trip => {
      const pair = tripVotes[trip.id] || {};
      const bucket = classifyVotes(pair.chris, pair.rachel);
      tripBuckets[bucket].push({ id: trip.id, label: trip.name, votes: pair });

      (trip.anchorExperiences || []).forEach(anchor => {
        const anchorPair = anchorVotes[anchor.id] || {};
        const anchorBucket = classifyVotes(anchorPair.chris, anchorPair.rachel);
        anchorBuckets[anchorBucket].push({ id: anchor.id, label: anchor.label, tripId: trip.id, tripName: trip.name, votes: anchorPair });
      });
    });

    const favorites = [
      ...tripBuckets.bothLove.map(item => `${item.label} (trip)`),
      ...anchorBuckets.bothLove.map(item => `${item.label} (${item.tripName})`)
    ];

    return { tripBuckets, anchorBuckets, favorites };
  }

  function validVoteValue(value) {
    return VOTE_VALUES.includes(value);
  }

  return {
    VOTE_VALUES,
    FRICTION_FACTORS,
    compareTripOrder,
    resolveDefaultTrip,
    prepareTrips,
    createStateModel,
    resolveTrip,
    summarizeVotes,
    classifyVotes,
    calculateFriction,
    calculateBudget,
    compareSummary,
    formatCurrency,
    validVoteValue,
    budgetCategoryMap
  };
});
