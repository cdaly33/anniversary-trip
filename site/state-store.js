(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ANNIVERSARY_STATE_STORE = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STORAGE_KEY = "anniversary-trip:v1";
  const SCHEMA_VERSION = 1;
  const MAX_COMPARE_TRIPS = 3;
  const MIN_COMPARE_TRIPS = 2;
  const VOTE_VALUES = new Set(["Love", "Like", "Meh", "No"]);

  function isRecord(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function toFiniteNumber(value, fallback = 0) {
    return Number.isFinite(value) ? value : fallback;
  }

  function createEmptyState(model) {
    const defaultId = model.defaultTripId || model.tripIds[0] || null;
    return {
      version: SCHEMA_VERSION,
      selectedTripId: defaultId,
      selectedDayByTrip: {},
      compareTripIds: [...model.compareDefaults],
      routeDirectionByTrip: {},
      itinerarySelections: {},
      budgetOverrides: {},
      votes: {
        trips: {},
        anchors: {}
      }
    };
  }

  function normalizeVoteEntry(value) {
    if (!isRecord(value)) return {};
    const output = {};
    ["chris", "rachel"].forEach(person => {
      if (VOTE_VALUES.has(value[person])) output[person] = value[person];
    });
    return output;
  }

  function normalizeVotes(rawVotes, model) {
    const votes = {
      trips: {},
      anchors: {}
    };
    const source = isRecord(rawVotes) ? rawVotes : {};
    const tripVotes = isRecord(source.trips) ? source.trips : {};
    model.tripIds.forEach(tripId => {
      const entry = normalizeVoteEntry(tripVotes[tripId]);
      if (Object.keys(entry).length) votes.trips[tripId] = entry;
    });

    const anchorVotes = isRecord(source.anchors) ? source.anchors : {};
    Object.values(model.anchorIdsByTrip || {}).flat().forEach(anchorId => {
      const entry = normalizeVoteEntry(anchorVotes[anchorId]);
      if (Object.keys(entry).length) votes.anchors[anchorId] = entry;
    });

    return votes;
  }

  function normalizeDaySelection(rawSelection) {
    const parsed = Number(rawSelection);
    if (!Number.isFinite(parsed)) return 0;
    if (parsed < 0) return 0;
    return Math.floor(parsed);
  }

  function normalizeCompareTripIds(rawCompareIds, model) {
    const requested = Array.isArray(rawCompareIds) ? rawCompareIds : [];
    const uniqueValid = [];
    requested.forEach(id => {
      if (!model.tripIds.includes(id)) return;
      if (!uniqueValid.includes(id)) uniqueValid.push(id);
    });
    if (uniqueValid.length < MIN_COMPARE_TRIPS) {
      return [...model.compareDefaults.slice(0, Math.min(MAX_COMPARE_TRIPS, model.compareDefaults.length))];
    }
    return uniqueValid.slice(0, MAX_COMPARE_TRIPS);
  }

  function normalizeRouteDirections(rawDirections, model) {
    const source = isRecord(rawDirections) ? rawDirections : {};
    const result = {};
    model.tripIds.forEach(tripId => {
      const allowed = new Set(model.directionIdsByTrip[tripId] || []);
      if (!allowed.size) return;
      const value = source[tripId];
      if (allowed.has(value)) result[tripId] = value;
    });
    return result;
  }

  function normalizeItinerarySelections(rawSelections, model) {
    const source = isRecord(rawSelections) ? rawSelections : {};
    const output = {};
    model.tripIds.forEach(tripId => {
      const perTrip = isRecord(source[tripId]) ? source[tripId] : {};
      const allowedDayIds = new Set(model.variantIdsByTrip[tripId] || []);
      if (!allowedDayIds.size) return;
      const accepted = {};
      Object.keys(perTrip).forEach(dayId => {
        if (!allowedDayIds.has(dayId)) return;
        const optionId = perTrip[dayId];
        if (typeof optionId === "string" && optionId.trim()) accepted[dayId] = optionId;
      });
      if (Object.keys(accepted).length) output[tripId] = accepted;
    });
    return output;
  }

  function normalizeBudgetOverrides(rawOverrides, model) {
    const source = isRecord(rawOverrides) ? rawOverrides : {};
    const output = {};
    model.tripIds.forEach(tripId => {
      const tripOverrides = isRecord(source[tripId]) ? source[tripId] : {};
      const allowedCategories = new Set(model.budgetCategoryIdsByTrip[tripId] || []);
      if (!allowedCategories.size) return;
      const acceptedCategories = {};
      Object.keys(tripOverrides).forEach(categoryId => {
        if (!allowedCategories.has(categoryId)) return;
        const fields = isRecord(tripOverrides[categoryId]) ? tripOverrides[categoryId] : {};
        const acceptedFields = {};
        ["estimate", "low", "high"].forEach(field => {
          if (!Number.isFinite(fields[field])) return;
          acceptedFields[field] = Math.max(0, fields[field]);
        });
        if (Object.keys(acceptedFields).length) acceptedCategories[categoryId] = acceptedFields;
      });
      if (Object.keys(acceptedCategories).length) output[tripId] = acceptedCategories;
    });
    return output;
  }

  function normalizeState(rawState, model) {
    const fallback = createEmptyState(model);
    if (!isRecord(rawState)) return fallback;

    const isVersioned = Number(rawState.version) === SCHEMA_VERSION;
    if (!isVersioned) return fallback;

    const selectedTripId = model.tripIds.includes(rawState.selectedTripId)
      ? rawState.selectedTripId
      : fallback.selectedTripId;

    const selectedDayByTrip = {};
    const incomingDays = isRecord(rawState.selectedDayByTrip) ? rawState.selectedDayByTrip : {};
    model.tripIds.forEach(tripId => {
      selectedDayByTrip[tripId] = normalizeDaySelection(incomingDays[tripId]);
    });

    const compareTripIds = normalizeCompareTripIds(rawState.compareTripIds, model);
    const routeDirectionByTrip = normalizeRouteDirections(rawState.routeDirectionByTrip, model);
    const itinerarySelections = normalizeItinerarySelections(rawState.itinerarySelections, model);
    const budgetOverrides = normalizeBudgetOverrides(rawState.budgetOverrides, model);
    const votes = normalizeVotes(rawState.votes, model);

    return {
      version: SCHEMA_VERSION,
      selectedTripId,
      selectedDayByTrip,
      compareTripIds,
      routeDirectionByTrip,
      itinerarySelections,
      budgetOverrides,
      votes
    };
  }

  function safeJsonParse(raw) {
    if (typeof raw !== "string" || !raw.trim()) return { ok: true, value: null };
    try {
      return { ok: true, value: JSON.parse(raw) };
    } catch (error) {
      return { ok: false, value: null, error };
    }
  }

  function createLocalStorageAdapter(storage, key = STORAGE_KEY) {
    const target = storage || (typeof globalThis !== "undefined" ? globalThis.localStorage : null);
    return {
      key,
      read() {
        if (!target) return null;
        try {
          return target.getItem(key);
        } catch {
          return null;
        }
      },
      write(raw) {
        if (!target) return;
        try {
          target.setItem(key, raw);
        } catch {
          // Ignore quota or availability errors and continue with in-memory state.
        }
      },
      remove() {
        if (!target) return;
        try {
          target.removeItem(key);
        } catch {
          // Ignore storage errors.
        }
      }
    };
  }

  function createMemoryAdapter(initial = null, key = STORAGE_KEY) {
    let value = initial;
    return {
      key,
      read() { return value; },
      write(raw) { value = raw; },
      remove() { value = null; }
    };
  }

  function saveState(adapter, state, model) {
    const normalized = normalizeState(state, model);
    adapter.write(JSON.stringify(normalized));
    return normalized;
  }

  function loadState(adapter, model) {
    const parsed = safeJsonParse(adapter.read());
    const normalized = normalizeState(parsed.value, model);
    const recovered = !parsed.ok || !parsed.value || Number(parsed.value.version) !== SCHEMA_VERSION;
    if (recovered) adapter.write(JSON.stringify(normalized));
    return { state: normalized, recovered };
  }

  function createStateRepository({ adapter, model }) {
    const selectedAdapter = adapter || createLocalStorageAdapter();
    return {
      load() {
        return loadState(selectedAdapter, model);
      },
      save(state) {
        return saveState(selectedAdapter, state, model);
      },
      clear() {
        selectedAdapter.remove();
      }
    };
  }

  function normalizeAndSave(adapter, model, mutate) {
    const { state } = loadState(adapter, model);
    const draft = clone(state);
    const nextCandidate = mutate ? (mutate(draft) || draft) : draft;
    const next = normalizeState(nextCandidate, model);
    adapter.write(JSON.stringify(next));
    return next;
  }

  return {
    STORAGE_KEY,
    SCHEMA_VERSION,
    MAX_COMPARE_TRIPS,
    MIN_COMPARE_TRIPS,
    createEmptyState,
    normalizeState,
    createLocalStorageAdapter,
    createMemoryAdapter,
    loadState,
    saveState,
    createStateRepository,
    normalizeAndSave,
    normalizeCompareTripIds,
    normalizeBudgetOverrides,
    normalizeVotes,
    toFiniteNumber
  };
});
