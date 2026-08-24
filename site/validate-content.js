"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const trips = require("./trip-data.js");
const fixture = require("./approved-content-fixture.json");

const errors = [];
const fail = message => errors.push(message);
const expectedDayKeys = ["companion", "fallback", "fit", "kind", "label", "links", "main", "pace", "stops", "title"];

if (trips.length !== fixture.trips.length) fail(`Expected ${fixture.trips.length} trips, found ${trips.length}.`);

for (const expected of fixture.trips) {
  const trip = trips.find(item => item.id === expected.id);
  if (!trip) {
    fail(`Missing retained trip ${expected.id}.`);
    continue;
  }
  if (trip.daysPlan.length !== expected.entries) fail(`${trip.id} has ${trip.daysPlan.length} entries, expected ${expected.entries}.`);
  const placementCount = trip.daysPlan.reduce((sum, day) => sum + day.links.length, 0);
  if (placementCount !== expected.dayLinkPlacements) {
    fail(`${trip.id} has ${placementCount} day-link placements, expected ${expected.dayLinkPlacements}.`);
  }
  trip.daysPlan.forEach((day, index) => {
    const keys = Object.keys(day).sort();
    if (JSON.stringify(keys) !== JSON.stringify(expectedDayKeys)) fail(`${trip.id} entry ${index + 1} has an unexpected field set.`);
    for (const field of ["label", "title", "main", "companion", "fit", "pace", "fallback", "kind"]) {
      if (typeof day[field] !== "string" || !day[field].trim()) fail(`${trip.id} entry ${index + 1} has an empty ${field}.`);
    }
    if (!Array.isArray(day.stops) || !day.stops.length) fail(`${trip.id} entry ${index + 1} has no stop reference.`);
    if (!Array.isArray(day.links) || !day.links.length) fail(`${trip.id} entry ${index + 1} has no planning link.`);
    day.links.forEach((link, linkIndex) => {
      if (!link.label || !/^https:\/\//.test(link.url)) fail(`${trip.id} entry ${index + 1} link ${linkIndex + 1} is incomplete.`);
      if (/^UNESCO$/i.test(link.label.trim())) fail(`${trip.id} entry ${index + 1} has an ambiguous link label.`);
    });
  });
}

const snapshot = JSON.stringify(trips.map(trip => ({ id: trip.id, daysPlan: trip.daysPlan })));
const hash = crypto.createHash("sha256").update(snapshot).digest("hex");
if (hash !== fixture.sha256) fail(`Approved day-content fixture mismatch: ${hash}.`);

const productionUrls = new Set([
  "https://www.openstreetmap.org/",
  "https://osmfoundation.org/wiki/Privacy_Policy"
]);
for (const trip of trips) {
  trip.flight.links.forEach(link => productionUrls.add(link.url));
  trip.daysPlan.forEach(day => day.links.forEach(link => productionUrls.add(link.url)));
  trip.images.forEach(image => {
    productionUrls.add(image.source);
    productionUrls.add(image.license);
    if (!image.note.toLowerCase().includes("uncropped resized derivative") || !image.note.includes("WebP")) {
      fail(`${trip.id} image ${image.file} lacks complete transformation disclosure.`);
    }
    if (!fs.existsSync(path.join(__dirname, image.file))) fail(`${trip.id} image file is missing: ${image.file}.`);
  });
}

if (errors.length) {
  console.error(`Content validation failed (${errors.length}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const entryCount = trips.reduce((sum, trip) => sum + trip.daysPlan.length, 0);
  const placementCount = trips.reduce((sum, trip) => sum + trip.daysPlan.reduce((daySum, day) => daySum + day.links.length, 0), 0);
  console.log(`Content validation passed: ${trips.length} trips, ${entryCount} entries, ${placementCount} day-link placements, ${productionUrls.size} unique production URLs.`);
}
