"use strict";

const trips = require("./trip-data.js");

const expectedTrips = {
  "northern-italy": [
    ["venice", "Venice", "base", 45.4372, 12.3346, 10],
    ["murano", "Murano", "excursion", 45.4581, 12.3566, 10],
    ["burano", "Burano — alternative", "alternative", 45.4853, 12.4167, 10],
    ["cinque-terre", "Cinque Terre", "base", 44.11, 9.72, 10],
    ["monterosso", "Monterosso", "excursion", 44.1461, 9.6536, 10],
    ["vernazza", "Vernazza", "excursion", 44.1345, 9.6842, 10],
    ["manarola", "Manarola", "excursion", 44.1067, 9.7275, 10],
    ["riomaggiore", "Riomaggiore — alternative", "alternative", 44.0989, 9.7383, 10],
    ["portovenere", "Portovenere — alternative", "alternative", 44.0491, 9.8397, 10],
    ["como", "Lake Como", "base", 45.987, 9.2572, 10],
    ["villa-carlotta", "Villa Carlotta", "excursion", 45.9864, 9.225, 10],
    ["bellagio", "Bellagio — alternative", "alternative", 45.9869, 9.261, 10]
  ],
  spain: [
    ["madrid", "Madrid", "base", 40.416782, -3.703507, 10],
    ["toledo", "Toledo", "excursion", 39.8558913, -4.024265, 10],
    ["segovia", "Segovia — optional", "alternative", 40.9481192, -4.1172101, 10],
    ["seville", "Seville", "base", 37.3886303, -5.9953403, 10],
    ["cordoba", "Córdoba", "excursion", 37.8845813, -4.7760138, 10]
  ],
  "italy-slovenia": [
    ["como", "Lake Como", "base", 45.9917589, 9.264881, 10],
    ["venice", "Dolomites", "base", 46.5754, 11.6713, 25],
    ["rovinj", "Lake Bled", "base", 46.3683, 14.1146, 10],
    ["istria", "Piran or Slovenia finale option", "alternative", 45.5286, 13.5684, 10]
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
  "northern-italy": ["venice>murano:excursion", "venice>burano:alternative", "venice>cinque-terre:rail", "cinque-terre>monterosso:excursion", "cinque-terre>vernazza:excursion", "cinque-terre>manarola:excursion", "cinque-terre>riomaggiore:alternative", "cinque-terre>portovenere:alternative", "cinque-terre>como:rail", "como>villa-carlotta:excursion", "como>bellagio:alternative"],
  spain: ["madrid>toledo:excursion", "madrid>segovia:alternative", "madrid>seville:rail", "seville>cordoba:excursion"],
  "italy-slovenia": ["como>venice:rail", "venice>rovinj:road", "rovinj>istria:alternative"],
  "italy-slovenia:bled-to-como": ["rovinj>venice:road", "venice>como:rail", "rovinj>istria:alternative"],
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

function validateSegments(trip, segments, localIds, expected, errors, label) {
  const actualSegments = segments.map(segment => `${segment.from}>${segment.to}:${segment.type}`);
  if (JSON.stringify(actualSegments) !== JSON.stringify(expected)) {
    errors.push(`${label} segment order/endpoints/types differ from approved route.`);
  }
  segments.forEach(segment => {
    if (!localIds.has(segment.from) || !localIds.has(segment.to)) {
      errors.push(`${label} segment references an unknown marker.`);
    }
  });
}

function validateDays(days, localIds, errors, label) {
  days.forEach((day, dayIndex) => {
    if (!Array.isArray(day.stops) || !day.stops.length) {
      errors.push(`${label} day ${dayIndex + 1} has no stop references.`);
      return;
    }
    day.stops.forEach(stopId => {
      if (!localIds.has(stopId)) errors.push(`${label} day ${dayIndex + 1} references unknown marker "${stopId}".`);
    });
  });
}

function validate(data) {
  const errors = [];
  const allowedRoles = new Set(["base", "excursion", "alternative"]);
  const tripIds = data.map(trip => trip.id);

  if (tripIds.includes("italy-slovenia-reversed")) {
    errors.push("Legacy top-level trip ID italy-slovenia-reversed is still present.");
  }
  if (tripIds.length !== Object.keys(expectedTrips).length) {
    errors.push(`Expected exactly ${Object.keys(expectedTrips).length} trips, found ${tripIds.length}.`);
  }
  if (new Set(tripIds).size !== tripIds.length) errors.push("Duplicate trip IDs found.");

  for (const trip of data) {
    const expected = expectedTrips[trip.id];
    if (!expected) {
      errors.push(`Unknown trip ID: ${trip.id}`);
      continue;
    }

    const expectedById = new Map(expected.map(item => [item[0], item]));
    const localIds = new Set();
    const coordinateKeys = new Map();

    for (const stop of trip.stops) {
      const path = `${trip.id}/${stop.id}`;
      if (localIds.has(stop.id)) errors.push(`Duplicate marker ID in trip: ${path}`);
      localIds.add(stop.id);
      const reference = expectedById.get(stop.id);
      if (!reference) {
        errors.push(`Unknown marker ID: ${path}`);
        continue;
      }
      const [, expectedName, expectedRole, refLat, refLng, maxKm] = reference;
      if (stop.name !== expectedName) errors.push(`${path} label is "${stop.name}", expected "${expectedName}".`);
      if (stop.role !== expectedRole || !allowedRoles.has(stop.role)) errors.push(`${path} has invalid role "${stop.role}".`);
      if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) errors.push(`${path} has a non-finite coordinate.`);
      if (Math.abs(stop.lat) > 90 || Math.abs(stop.lng) > 180) errors.push(`${path} is outside latitude/longitude ranges.`);
      if (stop.lat === 0 && stop.lng === 0) errors.push(`${path} uses the zero/default coordinate.`);
      const key = `${stop.lat},${stop.lng}`;
      if (coordinateKeys.has(key)) errors.push(`${path} duplicates coordinates used by ${coordinateKeys.get(key)} within the same trip.`);
      coordinateKeys.set(key, path);
      if (Math.abs(refLat) > 1 && Math.sign(stop.lat) !== Math.sign(refLat)) errors.push(`${path} latitude sign differs from reference.`);
      if (Math.abs(refLng) > 1 && Math.sign(stop.lng) !== Math.sign(refLng)) errors.push(`${path} longitude sign differs from reference.`);
      const distance = haversineKm(stop.lat, stop.lng, refLat, refLng);
      if (distance > maxKm) errors.push(`${path} is ${distance.toFixed(2)} km from reference (limit ${maxKm} km).`);
      const swappedDistance = haversineKm(stop.lng, stop.lat, refLat, refLng);
      if (swappedDistance <= maxKm && distance > maxKm) errors.push(`${path} appears to have latitude/longitude swapped.`);
    }

    expectedById.forEach((_, id) => {
      if (!localIds.has(id)) errors.push(`Missing marker ID: ${trip.id}/${id}`);
    });

    validateSegments(trip, trip.segments, localIds, expectedSegments[trip.id], errors, trip.id);
    validateDays(trip.daysPlan, localIds, errors, trip.id);

    if (trip.id === "italy-slovenia") {
      const reversed = (trip.routeDirections || []).find(direction => direction.id === "bled-to-como");
      if (!reversed || !reversed.overrides) {
        errors.push("italy-slovenia is missing the bled-to-como route direction overrides.");
      } else {
        const reversedSegments = reversed.overrides.segments;
        if (!Array.isArray(reversedSegments)) {
          errors.push("italy-slovenia reversed route direction is missing segments.");
        } else {
          validateSegments(trip, reversedSegments, localIds, expectedSegments["italy-slovenia:bled-to-como"], errors, "italy-slovenia:bled-to-como");
        }
        if (!Array.isArray(reversed.overrides.daysPlan)) {
          errors.push("italy-slovenia reversed route direction is missing daysPlan.");
        } else {
          validateDays(reversed.overrides.daysPlan, localIds, errors, "italy-slovenia:bled-to-como");
        }
      }
    }
  }

  Object.keys(expectedTrips).forEach(id => {
    if (!tripIds.includes(id)) errors.push(`Missing trip ID: ${id}`);
  });
  return errors;
}

const errors = validate(trips);
const signRegression = structuredClone(trips);
signRegression.find(trip => trip.id === "italy-slovenia").stops.find(stop => stop.id === "como").lng *= -1;
const signErrors = validate(signRegression);
if (!signErrors.some(error => error.includes("italy-slovenia/como longitude sign differs"))) {
  errors.push("Negative longitude-sign regression did not detect the Lake Como sign flip.");
}

if (errors.length) {
  console.error(`Coordinate validation failed (${errors.length} error${errors.length === 1 ? "" : "s"}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const markerCount = trips.reduce((sum, trip) => sum + trip.stops.length, 0);
  const segmentCount = trips.reduce((sum, trip) => sum + trip.segments.length, 0);
  console.log(`Coordinate validation passed: ${markerCount} markers, ${segmentCount} top-level segments, ${trips.length} trips; reversed direction and sign regression verified.`);
}
