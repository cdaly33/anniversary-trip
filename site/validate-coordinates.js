"use strict";

const trips = require("./app.js");

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
    ["venice", "Venice", "base", 45.4371908, 12.3345898, 10],
    ["rovinj", "Rovinj", "base", 45.0807411, 13.6417282, 10],
    ["istria", "Istrian interior", "excursion", 45.1934345, 13.9150536, 25]
  ],
  "new-zealand-australia": [
    ["queenstown", "Queenstown", "base", -45.0321923, 168.661, 10],
    ["glenorchy", "Glenorchy area", "excursion", -44.849749, 168.3851983, 25],
    ["te-anau", "Te Anau", "base", -45.41449, 167.717489, 10],
    ["milford", "Milford Sound", "excursion", -44.6190189, 167.8687603, 25],
    ["sydney", "Sydney", "base", -33.8698439, 151.2082848, 10]
  ],
  turkiye: [
    ["istanbul", "Istanbul", "base", 41.006381, 28.9758715, 10],
    ["bosphorus", "Bosphorus", "excursion", 41.1125268, 29.0718072, 25],
    ["cappadocia", "Cappadocia", "base", 38.6386124, 34.8455184, 25],
    ["underground", "Derinkuyu Underground City", "excursion", 38.3735761, 34.7351222, 10],
    ["valleys", "Cappadocia valleys", "excursion", 38.642089, 34.8296234, 25]
  ],
  "austria-slovenia": [
    ["ljubljana", "Ljubljana", "base", 46.0500268, 14.5069289, 10],
    ["bled", "Lake Bled", "excursion", 46.3639132, 14.0938069, 25],
    ["bohinj", "Lake Bohinj", "excursion", 46.2822654, 13.8645306, 25],
    ["predjama", "Predjama", "excursion", 45.8157344, 14.1265916, 10],
    ["vienna", "Vienna", "base", 48.2083537, 16.3725042, 10],
    ["wachau", "Wachau", "excursion", 48.3275518, 15.4116456, 25]
  ],
  "sicily-malta": [
    ["ortigia", "Ortigia / Syracuse", "base", 37.0606437, 15.2947166, 10],
    ["noto", "Noto", "excursion", 36.8908864, 15.0706454, 10],
    ["etna", "Mount Etna", "excursion", 37.7510251, 14.9940321, 25],
    ["valletta", "Valletta", "base", 35.8989979, 14.5136607, 10],
    ["mdina", "Mdina", "excursion", 35.8858923, 14.4025288, 10],
    ["gozo", "Gozo", "excursion", 36.0467778, 14.2582565, 25]
  ]
};

const expectedSegments = {
  portugal: ["lisbon>sintra:excursion", "lisbon>porto:rail", "porto>douro:excursion", "porto>guimaraes:alternative", "porto>braga:alternative"],
  spain: ["madrid>toledo:excursion", "madrid>segovia:alternative", "madrid>seville:rail", "seville>cordoba:excursion"],
  "italy-croatia": ["como>venice:uncertain", "venice>rovinj:uncertain", "rovinj>istria:excursion"],
  "new-zealand-australia": ["queenstown>glenorchy:excursion", "queenstown>te-anau:road", "te-anau>milford:road-excursion", "te-anau>queenstown:road", "queenstown>sydney:flight"],
  turkiye: ["istanbul>bosphorus:excursion", "istanbul>cappadocia:flight", "cappadocia>underground:excursion", "cappadocia>valleys:excursion"],
  "austria-slovenia": ["ljubljana>bled:excursion", "ljubljana>bohinj:excursion", "ljubljana>predjama:excursion", "ljubljana>vienna:rail", "vienna>wachau:excursion"],
  "sicily-malta": ["ortigia>noto:excursion", "ortigia>etna:excursion", "ortigia>valletta:uncertain", "valletta>mdina:excursion", "valletta>gozo:excursion"]
};

const errors = [];
const globalIds = new Set();
const coordinateKeys = new Map();
const allowedRoles = new Set(["base", "excursion", "alternative"]);

function fail(message) {
  errors.push(message);
}

function haversineKm(aLat, aLng, bLat, bLng) {
  const radians = degrees => degrees * Math.PI / 180;
  const dLat = radians(bLat - aLat);
  const dLng = radians(bLng - aLng);
  const value = Math.sin(dLat / 2) ** 2
    + Math.cos(radians(aLat)) * Math.cos(radians(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

const tripIds = trips.map(trip => trip.id);
if (new Set(tripIds).size !== tripIds.length) fail("Duplicate trip ID found.");

for (const trip of trips) {
  const expected = expectedTrips[trip.id];
  if (!expected) {
    fail(`Unknown trip ID: ${trip.id}`);
    continue;
  }

  const expectedById = new Map(expected.map(item => [item[0], item]));
  const localIds = new Set();
  for (const stop of trip.stops) {
    const path = `${trip.id}/${stop.id}`;
    if (localIds.has(stop.id)) fail(`Duplicate marker ID in trip: ${path}`);
    if (globalIds.has(stop.id)) fail(`Duplicate marker ID across trips: ${stop.id}`);
    localIds.add(stop.id);
    globalIds.add(stop.id);

    const reference = expectedById.get(stop.id);
    if (!reference) {
      fail(`Unknown marker ID: ${path}`);
      continue;
    }
    const [, expectedName, expectedRole, refLat, refLng, maxKm] = reference;
    if (stop.name !== expectedName) fail(`${path} label is "${stop.name}", expected "${expectedName}".`);
    if (stop.role !== expectedRole) fail(`${path} role is "${stop.role}", expected "${expectedRole}".`);
    if (!allowedRoles.has(stop.role)) fail(`${path} has unknown marker role "${stop.role}".`);
    if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) fail(`${path} has a non-finite coordinate.`);
    if (Math.abs(stop.lat) > 90 || Math.abs(stop.lng) > 180) fail(`${path} is outside latitude/longitude ranges.`);
    if (stop.lat === 0 && stop.lng === 0) fail(`${path} uses the zero/default coordinate.`);

    const key = `${stop.lat},${stop.lng}`;
    if (coordinateKeys.has(key)) fail(`${path} duplicates coordinates used by ${coordinateKeys.get(key)}.`);
    coordinateKeys.set(key, path);

    if (Math.abs(refLat) > 1 && Math.sign(stop.lat) !== Math.sign(refLat)) fail(`${path} latitude sign differs from its reference.`);
    if (Math.abs(refLng) > 1 && Math.sign(stop.lng) !== Math.sign(refLng)) fail(`${path} longitude sign differs from its reference.`);
    const distance = haversineKm(stop.lat, stop.lng, refLat, refLng);
    if (distance > maxKm) fail(`${path} is ${distance.toFixed(2)} km from its reference (limit ${maxKm} km).`);
    const swappedDistance = haversineKm(stop.lng, stop.lat, refLat, refLng);
    if (swappedDistance <= maxKm && distance > maxKm) fail(`${path} appears to have latitude and longitude swapped.`);
  }

  for (const markerId of expectedById.keys()) {
    if (!localIds.has(markerId)) fail(`Missing marker ID: ${trip.id}/${markerId}`);
  }

  const actualSegments = trip.segments.map(segment => `${segment.from}>${segment.to}:${segment.type}`);
  const expectedRoute = expectedSegments[trip.id];
  if (JSON.stringify(actualSegments) !== JSON.stringify(expectedRoute)) {
    fail(`${trip.id} segment order/endpoints/types differ from the approved route.`);
  }
  for (const segment of trip.segments) {
    if (!localIds.has(segment.from)) fail(`${trip.id} segment has unknown origin "${segment.from}".`);
    if (!localIds.has(segment.to)) fail(`${trip.id} segment has unknown destination "${segment.to}".`);
  }
  for (const beat of trip.beats) {
    const beatIds = Array.isArray(beat[2]) ? beat[2] : [beat[2]];
    for (const markerId of beatIds) {
      if (!localIds.has(markerId)) fail(`${trip.id} itinerary beat references unknown marker "${markerId}".`);
    }
  }
}

for (const expectedTripId of Object.keys(expectedTrips)) {
  if (!tripIds.includes(expectedTripId)) fail(`Missing trip ID: ${expectedTripId}`);
}

const como = trips.find(trip => trip.id === "italy-croatia").stops.find(stop => stop.id === "como");
if (como.lng <= 0) fail("Lake Como must have positive-east longitude.");
const underground = trips.find(trip => trip.id === "turkiye").stops.find(stop => stop.id === "underground");
if (underground.name !== "Derinkuyu Underground City") fail("The underground-city marker must explicitly identify Derinkuyu.");

if (errors.length) {
  console.error(`Coordinate validation failed (${errors.length} error${errors.length === 1 ? "" : "s"}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const markerCount = trips.reduce((sum, trip) => sum + trip.stops.length, 0);
  const segmentCount = trips.reduce((sum, trip) => sum + trip.segments.length, 0);
  console.log(`Coordinate validation passed: ${markerCount} markers, ${segmentCount} segments, ${trips.length} trips.`);
}
