"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const trips = require("../../trip-data.js");
const model = require("../../trip-model.js");
const stateStore = require("../../state-store.js");

const preparedTrips = model.prepareTrips(trips);
const stateModel = model.createStateModel(preparedTrips);

test("malformed persisted JSON recovers to safe defaults", () => {
  const adapter = stateStore.createMemoryAdapter("{ bad-json");
  const { state, recovered } = stateStore.loadState(adapter, stateModel);
  assert.equal(recovered, true);
  assert.equal(state.version, stateStore.SCHEMA_VERSION);
  assert.equal(state.selectedTripId, stateModel.defaultTripId);
  assert.ok(state.compareTripIds.length >= stateStore.MIN_COMPARE_TRIPS);
});

test("missing persisted state initializes defaults without recovery", () => {
  const adapter = stateStore.createMemoryAdapter(null);
  const { state, recovered } = stateStore.loadState(adapter, stateModel);
  assert.equal(recovered, false);
  assert.equal(state.version, stateStore.SCHEMA_VERSION);
  assert.equal(state.selectedTripId, stateModel.defaultTripId);
  assert.equal(adapter.read(), null);
});

test("outdated version recovers and rewrites normalized state", () => {
  const adapter = stateStore.createMemoryAdapter(JSON.stringify({
    version: 0,
    selectedTripId: "spain"
  }));
  const { state, recovered } = stateStore.loadState(adapter, stateModel);
  assert.equal(recovered, true);
  assert.equal(state.version, stateStore.SCHEMA_VERSION);
  assert.equal(state.selectedTripId, stateModel.defaultTripId);
});

test("normalization strips unknown trip IDs and unsupported fields", () => {
  const normalized = stateStore.normalizeState({
    version: stateStore.SCHEMA_VERSION,
    selectedTripId: "unknown",
    selectedDayByTrip: { "italy-slovenia": 3.7, unknown: 10 },
    compareTripIds: ["italy-slovenia", "unknown", "spain", "new-zealand-australia", "northern-italy"],
    routeDirectionByTrip: { "italy-slovenia": "bled-to-como", "spain": "not-real" },
    itinerarySelections: { "italy-slovenia": { invalid: "primary" } },
    budgetOverrides: { "italy-slovenia": { airfare: { estimate: 3000, badField: 12 }, invalid: { estimate: 3 } } },
    votes: {
      trips: { "italy-slovenia": { chris: "Love", rachel: "Nope" } },
      anchors: { "italy-slovenia:como-villas": { chris: "Like", rachel: "Meh" }, unknown: { chris: "Love", rachel: "Love" } }
    }
  }, stateModel);

  assert.equal(normalized.selectedTripId, stateModel.defaultTripId);
  assert.equal(normalized.selectedDayByTrip["italy-slovenia"], 3);
  assert.ok(normalized.compareTripIds.length <= stateStore.MAX_COMPARE_TRIPS);
  assert.equal(normalized.routeDirectionByTrip["italy-slovenia"], "bled-to-como");
  assert.equal(normalized.routeDirectionByTrip.spain, undefined);
  assert.equal(normalized.budgetOverrides["italy-slovenia"].airfare.estimate, 3000);
  assert.equal(normalized.budgetOverrides["italy-slovenia"].airfare.badField, undefined);
  assert.deepEqual(normalized.votes.trips["italy-slovenia"], { chris: "Love" });
});

test("save and load preserve valid vote, budget, and variant preferences", () => {
  const adapter = stateStore.createMemoryAdapter(null);
  const start = stateStore.createEmptyState(stateModel);
  start.selectedTripId = "spain";
  start.compareTripIds = ["spain", "italy-slovenia", "northern-italy"];
  start.votes.trips.spain = { chris: "Like", rachel: "Love" };
  start.budgetOverrides.spain = { airfare: { estimate: 2600 } };
  start.itinerarySelections.spain = { "day-5-segovia-castle-day-or-recovery": "alternative-b" };

  stateStore.saveState(adapter, start, stateModel);
  const { state, recovered } = stateStore.loadState(adapter, stateModel);
  assert.equal(recovered, false);
  assert.equal(state.selectedTripId, "spain");
  assert.equal(state.votes.trips.spain.chris, "Like");
  assert.equal(state.budgetOverrides.spain.airfare.estimate, 2600);
  assert.equal(state.itinerarySelections.spain["day-5-segovia-castle-day-or-recovery"], "alternative-b");
});
