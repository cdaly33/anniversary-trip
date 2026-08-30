"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const trips = require("../../trip-data.js");
const model = require("../../trip-model.js");

test("trip data is consolidated into four concepts", () => {
  const prepared = model.prepareTrips(trips);
  assert.equal(prepared.length, 4);
  assert.ok(prepared.some(trip => trip.id === "italy-slovenia"));
  assert.ok(!prepared.some(trip => trip.id === "italy-slovenia-reversed"));
});

test("italy direction toggle applies reversed route overrides", () => {
  const prepared = model.prepareTrips(trips);
  const italy = prepared.find(trip => trip.id === "italy-slovenia");
  const forward = model.resolveTrip(italy, {});
  const reversed = model.resolveTrip(italy, { directionId: "bled-to-como" });

  assert.equal(forward.activeDirectionId, "como-to-bled");
  assert.equal(reversed.activeDirectionId, "bled-to-como");
  assert.match(forward.route, /Lake Como .* Lake Bled/);
  assert.match(reversed.route, /Lake Bled .* Lake Como/);
  assert.deepEqual(
    forward.segments.map(segment => `${segment.from}>${segment.to}`),
    ["como>venice", "venice>rovinj", "rovinj>istria"]
  );
  assert.deepEqual(
    reversed.segments.map(segment => `${segment.from}>${segment.to}`),
    ["rovinj>venice", "venice>como", "rovinj>istria"]
  );
});

test("itinerary variant selection changes visible day content and modeled totals", () => {
  const prepared = model.prepareTrips(trips);
  const italy = prepared.find(trip => trip.id === "italy-slovenia");
  const variantGroup = italy.itineraryVariants.find(group => group.options.some(option => option.id === "alternative-a"));

  const baseline = model.resolveTrip(italy, {});
  const withAlt = model.resolveTrip(italy, {
    itinerarySelections: {
      [variantGroup.dayId]: "alternative-a"
    }
  });

  const baselineDay = baseline.daysPlan.find(day => day.id === variantGroup.dayId);
  const altDay = withAlt.daysPlan.find(day => day.id === variantGroup.dayId);
  assert.notEqual(altDay.title, baselineDay.title);
  assert.notEqual(withAlt.budget.customizedTotal, baseline.budget.customizedTotal);
  assert.notEqual(withAlt.friction.score, baseline.friction.score);
});

test("friction credits lower the normalized score deterministically", () => {
  const baseMetrics = {
    hotelChanges: 2,
    transferDays: 2,
    interBaseHours: 8,
    internalFlights: 0,
    rentalDependencyDays: 1,
    crossBorderOneWayRental: 0.6,
    scheduleDependencyDays: 4,
    longHaulBurden: 3,
    recoveryFlexDays: 0
  };
  const noRecovery = model.calculateFriction(baseMetrics);
  const withRecovery = model.calculateFriction({ ...baseMetrics, recoveryFlexDays: 3 });

  assert.ok(withRecovery.score < noRecovery.score);
  assert.equal(Number(noRecovery.score.toFixed(4)), Number(model.calculateFriction(baseMetrics).score.toFixed(4)));
});

test("budget overrides and dynamic adjustments compute totals correctly", () => {
  const prepared = model.prepareTrips(trips);
  const spain = prepared.find(trip => trip.id === "spain");
  const baseline = model.resolveTrip(spain, {});
  const customized = model.resolveTrip(spain, {
    budgetOverrides: {
      airfare: { estimate: 2700 },
      activities: { estimate: 600 }
    }
  });

  assert.equal(customized.budget.categories.find(category => category.id === "airfare").current.estimate, 2700);
  assert.equal(customized.budget.categories.find(category => category.id === "activities").current.estimate, 600);
  assert.ok(customized.budget.customizedTotal > baseline.budget.customizedTotal);
});
