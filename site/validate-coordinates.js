"use strict";

const trips = require("./trip-data.js");

const expectedTrips = {
  portugal: [
    ["lisbon", "Lisbon", "base", 38.7077507, -9.1365919, 10],
    ["sintra", "Sintra", "excursion", 38.8355446, -9.3522371, 10],
    ["porto", "Porto", "base", 41.1502195, -8.6103497, 10],
    ["douro", "Douro Valley", "excursion", 41.1822538, -7.5357745, 25],
    ["guimaraes", "Guimarães — alternative", "alternative", 41.4417677, -8.2955712, 10],
    ["braga", "Braga — alternative", "alternative", 41.5510583, -8.4280045, 10]
  ],
  spain: [
    ["madrid", "Madrid", "base", 40.416782, -3.703507, 10],
    ["toledo", "Toledo", "excursion", 39.8558913, -4.024265, 10],
    ["segovia", "Segovia — optional", "alternative", 40.9481192, -4.1172101, 10],
    ["seville", "Seville", "base", 37.3886303, -5.9953403, 10],
    ["cordoba", "Córdoba", "excursion", 37.8845813, -4.7760138, 10]
  ],
  "italy-croatia": [
    ["como", "Lake Como", "base", 45.9917589, 9.264881, 10],
    ["venice", "Dolomites", "base", 46.5754, 11.6713, 25],
    ["rovinj", "Lake Bled", "base", 46.3683, 14.1146, 10],
    ["istria", "Piran or Slovenia side trip", "alternative", 45.5286, 13.5684, 10]
  ],
  "italy-slovenia-reversed": [
    ["como", "Lake Como", "base", 45.9917589, 9.264881, 10],
    ["venice", "Dolomites", "base", 46.5754, 11.6713, 25],
    ["rovinj", "Lake Bled", "base", 46.3683, 14.1146, 10],
    ["istria", "Piran or Slovenia side trip", "alternative", 45.5286, 13.5684, 10]
  ],
  "new-zealand-australia": [
    ["queenstown", "Queenstown", "base", -45.0321923, 168.661, 10],
    ["glenorchy", "Glenorchy area", "excursion", -44.849749, 168.3851983, 25],
    ["te-anau", "Te Anau", "base", -45.41449, 167.717489, 10],
    ["milford", "Milford Sound", "excursion", -44.6190189, 167.8687603, 25],
    ["sydney", "Sydney", "base", -33.8698439, 151.2082848, 10]
  ]
};

const expectedSegments = {
  portugal: ["lisbon>sintra:excursion", "lisbon>porto:rail", "porto>douro:excursion", "porto>guimaraes:alternative", "porto>braga:alternative"],
  spain: ["madrid>toledo:excursion", "madrid>segovia:alternative", "madrid>seville:rail", "seville>cordoba:excursion"],
  "italy-croatia": ["como>venice:rail", "venice>rovinj:road", "rovinj>istria:alternative"],
  "italy-slovenia-reversed": ["rovinj>venice:road", "venice>como:rail", "rovinj>istria:alternative"],
  "new-zealand-australia": ["queenstown>glenorchy:excursion", "queenstown>te-anau:road", "te-anau>milford:road-excursion", "te-anau>queenstown:road", "queenstown>sydney:flight"]
};

function haversineKm(aLat, aLng, bLat, bLng) {
  const radians = degrees => degrees * Math.PI / 180;
  const dLat = radians(bLat - aLat);
  const dLng = radians(bLng - aLng);
  const value = Math.sin(dLat / 2) ** 2
    + Math.cos(radians(aLat)) * Math.cos(radians(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}
function validate(data) {
  const errors = [];
  const allowedRoles = new Set(["base", "excursion", "alternative"]);
  const fail = message => errors.push(message);
  const tripIds = data.map(trip => trip.id);

  if (new Set(tripIds).size !== tripIds.length) fail("Duplicate trip ID found.");
  if (tripIds.length !== 5) fail(`Expected exactly 5 trips, found ${tripIds.length}.`);

  for (const trip of data) {
    const expected = expectedTrips[trip.id];
    if (!expected) {
      fail(`Unknown or removed trip ID: ${trip.id}`);
      continue;
    }
    const expectedById = new Map(expected.map(item => [item[0], item]));
    const localIds = new Set();
    const coordinateKeys = new Map();
    for (const stop of trip.stops) {
      const path = `${trip.id}/${stop.id}`;
      if (localIds.has(stop.id)) fail(`Duplicate marker ID in trip: ${path}`);
      localIds.add(stop.id);
      const reference = expectedById.get(stop.id);
      if (!reference) {
        fail(`Unknown marker ID: ${path}`);
        continue;
      }
      const [, expectedName, expectedRole, refLat, refLng, maxKm] = reference;
      if (stop.name !== expectedName) fail(`${path} label is "${stop.name}", expected "${expectedName}".`);
      if (stop.role !== expectedRole || !allowedRoles.has(stop.role)) fail(`${path} has invalid role "${stop.role}".`);
      if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) fail(`${path} has a non-finite coordinate.`);
      if (Math.abs(stop.lat) > 90 || Math.abs(stop.lng) > 180) fail(`${path} is outside latitude/longitude ranges.`);
      if (stop.lat === 0 && stop.lng === 0) fail(`${path} uses the zero/default coordinate.`);
      const key = `${stop.lat},${stop.lng}`;
      if (coordinateKeys.has(key)) fail(`${path} duplicates coordinates used by ${coordinateKeys.get(key)} within the same trip.`);
      coordinateKeys.set(key, path);
      if (Math.abs(refLat) > 1 && Math.sign(stop.lat) !== Math.sign(refLat)) fail(`${path} latitude sign differs from its reference.`);
      if (Math.abs(refLng) > 1 && Math.sign(stop.lng) !== Math.sign(refLng)) fail(`${path} longitude sign differs from its reference.`);
      const distance = haversineKm(stop.lat, stop.lng, refLat, refLng);
      if (distance > maxKm) fail(`${path} is ${distance.toFixed(2)} km from its reference (limit ${maxKm} km).`);
      const swappedDistance = haversineKm(stop.lng, stop.lat, refLat, refLng);
      if (swappedDistance <= maxKm && distance > maxKm) fail(`${path} appears to have latitude and longitude swapped.`);
    }
    expectedById.forEach((_, id) => { if (!localIds.has(id)) fail(`Missing marker ID: ${trip.id}/${id}`); });
    const actualSegments = trip.segments.map(segment => `${segment.from}>${segment.to}:${segment.type}`);
    if (JSON.stringify(actualSegments) !== JSON.stringify(expectedSegments[trip.id])) fail(`${trip.id} segment order/endpoints/types differ from the approved route.`);
    trip.segments.forEach(segment => {
      if (!localIds.has(segment.from) || !localIds.has(segment.to)) fail(`${trip.id} segment references an unknown marker.`);
    });
    trip.daysPlan.forEach(day => day.stops.forEach(id => {
      if (!localIds.has(id)) fail(`${trip.id} itinerary day references unknown marker "${id}".`);
    }));
  }

  Object.keys(expectedTrips).forEach(id => { if (!tripIds.includes(id)) fail(`Missing trip ID: ${id}`); });
  return errors;
}

const errors = validate(trips);
const signRegression = structuredClone(trips);
signRegression.find(trip => trip.id === "italy-croatia").stops.find(stop => stop.id === "como").lng *= -1;
const signErrors = validate(signRegression);
if (!signErrors.some(error => error.includes("italy-croatia/como longitude sign differs"))) {
  errors.push("Negative longitude-sign regression did not detect the Lake Como sign flip.");
}

if (errors.length) {
  console.error(`Coordinate validation failed (${errors.length} error${errors.length === 1 ? "" : "s"}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const markerCount = trips.reduce((sum, trip) => sum + trip.stops.length, 0);
  const segmentCount = trips.reduce((sum, trip) => sum + trip.segments.length, 0);
  console.log(`Coordinate validation passed: ${markerCount} markers, ${segmentCount} segments, ${trips.length} trips; sign regression detected.`);
}
