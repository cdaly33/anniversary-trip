"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const trips = require("./trip-data.js");
const fixture = require("./approved-content-fixture.json");
const tripModel = require("./trip-model.js");

const errors = [];
const fail = message => errors.push(message);

const requiredTripIds = ["italy-slovenia", "northern-italy", "spain", "new-zealand-australia"];
const expectedDayKeys = ["companion", "fallback", "fit", "id", "image", "kind", "label", "links", "main", "pace", "stops", "title", "transit"];
const budgetCategoryIds = [
  "airfare",
  "lodging",
  "intercityTransportation",
  "rentalCar",
  "fuelTollsVignettes",
  "localTransportation",
  "food",
  "activities",
  "anniversaryExperience",
  "insurance",
  "contingency",
  "optionalUpgrades"
];
const frictionFields = [
  "hotelChanges",
  "transferDays",
  "interBaseHours",
  "internalFlights",
  "rentalDependencyDays",
  "crossBorderOneWayRental",
  "scheduleDependencyDays",
  "longHaulBurden",
  "recoveryFlexDays"
];
const compareProfileFields = [
  "scenery",
  "historicSitesCastles",
  "food",
  "relaxation",
  "logisticalSimplicity",
  "biggestStrength",
  "biggestConcern",
  "whyChoose",
  "whyRegret",
  "rentalRequirement"
];

if (trips.length !== requiredTripIds.length) {
  fail(`Expected exactly ${requiredTripIds.length} trips after consolidation, found ${trips.length}.`);
}

const tripIds = trips.map(trip => trip.id);
requiredTripIds.forEach(id => {
  if (!tripIds.includes(id)) fail(`Missing required trip ID: ${id}.`);
});
if (tripIds.includes("italy-slovenia-reversed")) {
  fail("Legacy top-level trip ID italy-slovenia-reversed is still present; it must be consolidated into italy-slovenia route directions.");
}
if (new Set(tripIds).size !== tripIds.length) fail("Duplicate trip IDs found.");

const explicitDefaultCount = trips.filter(trip => trip.isDefault || trip.default === true).length;
if (explicitDefaultCount > 1) fail(`Expected at most one explicit default trip, found ${explicitDefaultCount}.`);
const defaultTrip = tripModel.resolveDefaultTrip(trips);
if (!defaultTrip || defaultTrip.id !== "italy-slovenia") {
  fail(`Default trip should resolve to italy-slovenia, resolved ${defaultTrip ? defaultTrip.id : "none"}.`);
}

const fixtureTripMap = new Map((fixture.trips || []).map(entry => [entry.id, entry]));
if (fixture.trips.length !== requiredTripIds.length) {
  fail(`Fixture trip count mismatch: expected ${requiredTripIds.length}, found ${fixture.trips.length}.`);
}

const productionUrls = new Set([
  "https://www.openstreetmap.org/",
  "https://osmfoundation.org/wiki/Privacy_Policy"
]);

function assertDay(day, pathPrefix) {
  const keys = Object.keys(day).sort();
  if (JSON.stringify(keys) !== JSON.stringify(expectedDayKeys)) {
    fail(`${pathPrefix} has unexpected keys: ${keys.join(", ")}.`);
  }
  for (const field of ["id", "label", "title", "main", "companion", "fit", "pace", "fallback", "kind"]) {
    if (typeof day[field] !== "string" || !day[field].trim()) fail(`${pathPrefix} has an empty ${field}.`);
  }
  if (typeof day.transit !== "string") fail(`${pathPrefix} transit must be a string.`);
  if (!Array.isArray(day.stops) || !day.stops.length) fail(`${pathPrefix} has no stop references.`);
  if (!Array.isArray(day.links) || !day.links.length) fail(`${pathPrefix} has no planning links.`);
  day.links.forEach((link, index) => {
    if (!link.label || !/^https:\/\//.test(link.url)) fail(`${pathPrefix} link ${index + 1} is incomplete.`);
    productionUrls.add(link.url);
  });
  if (day.image !== null) {
    const image = day.image;
    if (!image || typeof image !== "object") fail(`${pathPrefix} has malformed image data.`);
    else {
      if (!/^https:\/\/upload\.wikimedia\.org\//.test(image.url)) fail(`${pathPrefix} image must use Wikimedia upload URL.`);
      if (!image.alt || !image.credit) fail(`${pathPrefix} image needs alt text and credit.`);
      if (!Number.isInteger(image.width) || !Number.isInteger(image.height)) fail(`${pathPrefix} image dimensions must be integers.`);
      productionUrls.add(image.url);
    }
  }
}

for (const trip of trips) {
  const fixtureTrip = fixtureTripMap.get(trip.id);
  if (!fixtureTrip) {
    fail(`Trip ${trip.id} is missing from approved-content-fixture.`);
    continue;
  }
  if (!trip.name || !trip.status || !trip.statusDetail) fail(`${trip.id} is missing top-level summary fields.`);
  if (!trip.compareProfile || typeof trip.compareProfile !== "object") fail(`${trip.id} is missing compareProfile.`);
  else {
    compareProfileFields.forEach(field => {
      if (typeof trip.compareProfile[field] !== "string" || !trip.compareProfile[field].trim()) {
        fail(`${trip.id} compareProfile.${field} is missing.`);
      }
    });
  }

  if (!trip.budgetModel || !Array.isArray(trip.budgetModel.categories)) fail(`${trip.id} is missing budgetModel categories.`);
  else {
    const categories = trip.budgetModel.categories;
    if (categories.length !== budgetCategoryIds.length) {
      fail(`${trip.id} budget categories expected ${budgetCategoryIds.length}, found ${categories.length}.`);
    }
    const categoryIds = categories.map(category => category.id);
    budgetCategoryIds.forEach(categoryId => {
      if (!categoryIds.includes(categoryId)) fail(`${trip.id} budget category missing: ${categoryId}.`);
    });
    categories.forEach(category => {
      if (typeof category.label !== "string" || !category.label.trim()) fail(`${trip.id} budget category ${category.id} has no label.`);
      if (!Number.isFinite(category.baselineEstimate) || category.baselineEstimate < 0) fail(`${trip.id} budget category ${category.id} has invalid baselineEstimate.`);
      if (!Number.isFinite(category.baselineLow) || !Number.isFinite(category.baselineHigh)) {
        fail(`${trip.id} budget category ${category.id} must provide baseline low/high for planning ranges.`);
      }
      if (category.baselineLow > category.baselineHigh) fail(`${trip.id} budget category ${category.id} has low > high.`);
    });
    if (trip.budgetModel.travelers !== 2) fail(`${trip.id} budgetModel.travelers must be 2.`);
    if (trip.budgetModel.currency !== "USD") fail(`${trip.id} budgetModel.currency must be USD.`);
  }

  if (!trip.frictionMetrics || typeof trip.frictionMetrics !== "object") fail(`${trip.id} is missing frictionMetrics.`);
  else {
    frictionFields.forEach(field => {
      if (!Number.isFinite(trip.frictionMetrics[field])) fail(`${trip.id} friction metric ${field} must be numeric.`);
    });
  }

  if (!Array.isArray(trip.anchorExperiences) || !trip.anchorExperiences.length) fail(`${trip.id} has no anchorExperiences.`);
  else {
    trip.anchorExperiences.forEach(anchor => {
      if (typeof anchor.id !== "string" || !anchor.id.startsWith(`${trip.id}:`)) fail(`${trip.id} anchor ID is malformed.`);
      if (typeof anchor.label !== "string" || !anchor.label.trim()) fail(`${trip.id} anchor label is missing.`);
    });
  }

  if (!Array.isArray(trip.itineraryVariants)) fail(`${trip.id} itineraryVariants must be an array.`);
  else {
    const dayIds = new Set(trip.daysPlan.map(day => day.id));
    const directionDayIds = new Set(
      (trip.routeDirections || [])
        .flatMap(direction => direction.overrides?.daysPlan || [])
        .map(day => day.id)
    );
    trip.itineraryVariants.forEach((group, index) => {
      if (typeof group.dayId !== "string") fail(`${trip.id} itineraryVariants[${index}] missing dayId.`);
      if (!dayIds.has(group.dayId) && !directionDayIds.has(group.dayId)) {
        fail(`${trip.id} itineraryVariants[${index}] references unknown dayId ${group.dayId}.`);
      }
      if (typeof group.prompt !== "string" || !group.prompt.trim()) fail(`${trip.id} itineraryVariants[${index}] needs a prompt.`);
      if (!Array.isArray(group.options) || group.options.length < 3) fail(`${trip.id} itineraryVariants[${index}] must provide Primary + Alternative A/B options.`);
      const labels = group.options.map(option => option.label);
      ["Primary", "Alternative A", "Alternative B"].forEach(label => {
        if (!labels.includes(label)) fail(`${trip.id} itineraryVariants[${index}] missing option label "${label}".`);
      });
      group.options.forEach(option => {
        if (typeof option.id !== "string" || !option.id.trim()) fail(`${trip.id} itinerary variant option missing id.`);
        if (typeof option.title !== "string" || !option.title.trim()) fail(`${trip.id} itinerary variant ${option.id} missing title.`);
      });
    });
  }

  if (trip.daysPlan.length !== fixtureTrip.entries) fail(`${trip.id} has ${trip.daysPlan.length} entries, expected ${fixtureTrip.entries}.`);
  const dayLinkPlacements = trip.daysPlan.reduce((sum, day) => sum + day.links.length, 0);
  if (dayLinkPlacements !== fixtureTrip.dayLinkPlacements) {
    fail(`${trip.id} has ${dayLinkPlacements} day-link placements, expected ${fixtureTrip.dayLinkPlacements}.`);
  }
  trip.daysPlan.forEach((day, index) => {
    assertDay(day, `${trip.id} day ${index + 1}`);
  });

  trip.images.forEach(image => {
    productionUrls.add(image.source);
    productionUrls.add(image.license);
    if (!image.note.toLowerCase().includes("uncropped resized derivative") || !image.note.includes("WebP")) {
      fail(`${trip.id} image ${image.file} lacks required transformation disclosure.`);
    }
    if (!fs.existsSync(path.join(__dirname, image.file))) fail(`${trip.id} image file missing: ${image.file}.`);
  });

  if (trip.id === "italy-slovenia") {
    if (!Array.isArray(trip.routeDirections) || trip.routeDirections.length !== 2) {
      fail("italy-slovenia must include exactly two routeDirections.");
    } else {
      const expectedDirectionIds = new Set(["como-to-bled", "bled-to-como"]);
      trip.routeDirections.forEach(direction => {
        if (!expectedDirectionIds.has(direction.id)) fail(`italy-slovenia has unknown route direction ID ${direction.id}.`);
        const compare = direction.compare || {};
        ["gateway", "rentalDirectionComplexity", "openingEnding", "gatewayConvenience", "estimatedCostDelta", "logisticalRisk"].forEach(field => {
          if (typeof compare[field] !== "string" || !compare[field].trim()) fail(`italy-slovenia route direction ${direction.id} missing compare.${field}.`);
        });
      });
      const reversed = trip.routeDirections.find(direction => direction.id === "bled-to-como");
      if (!reversed || !reversed.overrides || !Array.isArray(reversed.overrides.daysPlan) || !Array.isArray(reversed.overrides.segments)) {
        fail("italy-slovenia reversed route direction must provide daysPlan and segments overrides.");
      } else {
        const reversedFixture = fixture.directionVariants?.find(entry => entry.tripId === "italy-slovenia" && entry.directionId === "bled-to-como");
        if (!reversedFixture) fail("Missing reversed-direction fixture entry for italy-slovenia.");
        const reversedLinks = reversed.overrides.daysPlan.reduce((sum, day) => sum + day.links.length, 0);
        if (reversedFixture && reversed.overrides.daysPlan.length !== reversedFixture.entries) {
          fail(`italy-slovenia reversed direction has ${reversed.overrides.daysPlan.length} entries, expected ${reversedFixture.entries}.`);
        }
        if (reversedFixture && reversedLinks !== reversedFixture.dayLinkPlacements) {
          fail(`italy-slovenia reversed direction has ${reversedLinks} day-link placements, expected ${reversedFixture.dayLinkPlacements}.`);
        }
        reversed.overrides.daysPlan.forEach((day, index) => assertDay(day, `italy-slovenia reversed day ${index + 1}`));
      }
    }
  } else if (trip.routeDirections) {
    fail(`${trip.id} should not define routeDirections.`);
  }
}

const snapshot = JSON.stringify(trips.map(trip => ({
  id: trip.id,
  daysPlan: trip.daysPlan,
  routeDirections: (trip.routeDirections || []).map(direction => ({
    id: direction.id,
    daysPlan: direction.overrides?.daysPlan || null
  })),
  itineraryVariants: trip.itineraryVariants,
  compareProfile: trip.compareProfile
})));
const hash = crypto.createHash("sha256").update(snapshot).digest("hex");
if (hash !== fixture.sha256) fail(`Approved content fixture mismatch: ${hash}.`);

if (errors.length) {
  console.error(`Content validation failed (${errors.length}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const topLevelEntries = trips.reduce((sum, trip) => sum + trip.daysPlan.length, 0);
  const topLevelPlacements = trips.reduce((sum, trip) => sum + trip.daysPlan.reduce((daySum, day) => daySum + day.links.length, 0), 0);
  console.log(`Content validation passed: ${trips.length} trips, ${topLevelEntries} top-level entries, ${topLevelPlacements} day-link placements, ${productionUrls.size} unique production URLs.`);
}
