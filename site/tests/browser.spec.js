"use strict";

const { expect, test } = require("@playwright/test");

const EMPTY_TILE = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9s2l4f4AAAAASUVORK5CYII=",
  "base64"
);

const VIEWPORT_CASES = [
  { name: "phone-390x844", width: 390, height: 844, mode: "phone" },
  { name: "tablet-820x1180", width: 820, height: 1180, mode: "tablet" },
  { name: "tablet-1099x820", width: 1099, height: 820, mode: "tablet" },
  { name: "desktop-1180x820", width: 1180, height: 820, mode: "desktop" },
  { name: "desktop-1440x900", width: 1440, height: 900, mode: "desktop" }
];

function trackClientErrors(page) {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

async function defaultSnapshot(page) {
  return page.evaluate(() => {
    const compare = (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
      || a.name.localeCompare(b.name);
    const trips = globalThis.ANNIVERSARY_TRIPS;
    const explicit = trips.filter(trip => trip.isDefault || trip.default === true).sort(compare);
    const fallback = [...trips].sort(compare)[0];
    const selectedButton = document.querySelector(".concept-item[aria-pressed='true']");
    const resolved = explicit[0] || fallback;
    return {
      resolvedDefaultId: resolved.id,
      resolvedDefaultName: resolved.name,
      explicitDefaultCount: explicit.length,
      hash: location.hash,
      selectedTripId: selectedButton?.dataset.tripId ?? null,
      currentConcept: document.querySelector("#current-concept")?.textContent ?? "",
      conceptTitle: document.querySelector("#concept-title")?.textContent ?? ""
    };
  });
}

test.beforeEach(async ({ page }) => {
  await page.route("https://tile.openstreetmap.org/**", route => route.fulfill({
    status: 200,
    contentType: "image/png",
    body: EMPTY_TILE
  }));
});

test("clean load resolves one default and canonical hash", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");
  await expect(page.locator("#concept-title")).toBeVisible();

  const state = await defaultSnapshot(page);
  expect(state.explicitDefaultCount).toBeLessThanOrEqual(1);
  expect(state.hash).toBe(`#${state.resolvedDefaultId}/day-1`);
  expect(state.selectedTripId).toBe(state.resolvedDefaultId);
  expect(state.currentConcept).toBe(state.resolvedDefaultName);
  expect(state.conceptTitle).toBe(state.resolvedDefaultName);
  expect(errors).toEqual([]);
});

test("invalid hash recovers to the leading trip", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/#italy-croatia/day-5");
  await expect(page.locator("#concept-title")).toBeVisible();

  const state = await defaultSnapshot(page);
  expect(state.hash).toBe(`#${state.resolvedDefaultId}/day-1`);
  expect(state.selectedTripId).toBe(state.resolvedDefaultId);
  await expect(page.locator("#beat-position")).toContainText("1 of");
  expect(errors).toEqual([]);
});

test("trip selection and day selection keep hash, card, and content in sync", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");
  const initialRouteDescription = await page.locator("#route-description").innerText();
  await page.locator("#concept-trigger").click();

  const targetId = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll(".concept-item"));
    const target = buttons.find(button => button.getAttribute("aria-pressed") !== "true");
    return target?.dataset.tripId || null;
  });
  expect(targetId).not.toBeNull();

  await page.locator(`.concept-item[data-trip-id="${targetId}"]`).click();
  await expect(page.locator(`.concept-item[data-trip-id="${targetId}"]`)).toHaveAttribute("aria-pressed", "true");
  const selectedTitle = ((await page.locator("#concept-title").textContent()) || "").trim();
  const escapedTitle = selectedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  await expect(page.locator("#map-heading")).toContainText(new RegExp(escapedTitle, "i"));
  await expect.poll(() => new URL(page.url()).hash).toBe(`#${targetId}/day-1`);
  await expect(page.locator("#route-description")).not.toHaveText(initialRouteDescription);

  await page.locator("#itinerary-list .day-select").nth(2).click();
  await expect(page.locator("#itinerary-list .day-select").nth(2)).toHaveAttribute("aria-current", "true");
  await expect.poll(() => new URL(page.url()).hash).toBe(`#${targetId}/day-3`);
  expect(errors).toEqual([]);
});

for (const viewport of VIEWPORT_CASES) {
  test(`${viewport.name} renders without horizontal overflow and keeps controls usable`, async ({ page }, testInfo) => {
    const errors = trackClientErrors(page);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(page.locator("#concept-trigger")).toBeVisible();
    await expect(page.locator("#enable-map")).toBeVisible();
    await expect(page.locator("#fit-route")).toBeVisible();

    const layout = await page.evaluate(() => {
      const concept = document.querySelector(".concept-region").getBoundingClientRect();
      const map = document.querySelector(".map-region").getBoundingClientRect();
      const evidence = document.querySelector(".evidence-region").getBoundingClientRect();
      return {
        mapPosition: getComputedStyle(document.querySelector(".map-region")).position,
        routeTableDisplay: getComputedStyle(document.querySelector(".route-table")).display,
        mapTop: map.top,
        mapBottom: map.bottom,
        mapLeft: map.left,
        evidenceTop: evidence.top,
        evidenceLeft: evidence.left,
        conceptBottom: concept.bottom,
        rootOverflow: document.documentElement.scrollWidth - window.innerWidth,
        bodyOverflow: document.body.scrollWidth - window.innerWidth
      };
    });

    expect(layout.rootOverflow).toBeLessThanOrEqual(1);
    expect(layout.bodyOverflow).toBeLessThanOrEqual(1);

    if (viewport.mode === "desktop") {
      expect(layout.mapPosition).toBe("sticky");
      expect(Math.abs(layout.mapTop - layout.evidenceTop)).toBeLessThan(40);
      expect(layout.mapLeft).toBeLessThan(layout.evidenceLeft);
    } else {
      expect(layout.mapPosition).toBe("static");
      expect(layout.routeTableDisplay).toBe("flex");
      expect(layout.mapTop).toBeGreaterThanOrEqual(layout.conceptBottom - 2);
      expect(layout.evidenceTop).toBeGreaterThanOrEqual(layout.mapBottom - 2);

      if (viewport.mode === "tablet") {
        const widths = await page.evaluate(() => {
          const rt = document.querySelector(".route-table").getBoundingClientRect();
          const cr = document.querySelector(".concept-region").getBoundingClientRect();
          const ct = document.querySelector("#concept-trigger").getBoundingClientRect();
          return { routeTableWidth: rt.width, conceptRegionWidth: cr.width, conceptTriggerWidth: ct.width };
        });
        // .concept-region must fill the full .route-table column (within 2 px for sub-pixel/border)
        expect(widths.conceptRegionWidth).toBeGreaterThanOrEqual(widths.routeTableWidth - 2);
        // #concept-trigger (width:100% of concept-region minus padding) must be substantially wide
        expect(widths.conceptTriggerWidth).toBeGreaterThan(widths.routeTableWidth * 0.75);
      }
    }

    await expect(page.locator("#map-shell")).toHaveClass(/interaction-off/);
    await page.locator("#enable-map").click();
    await expect(page.locator("#map-shell")).not.toHaveClass(/interaction-off/);
    await page.locator("#enable-map").click();
    await expect(page.locator("#map-shell")).toHaveClass(/interaction-off/);

    if (viewport.mode === "phone") {
      await expect(page.locator("#toggle-legend")).toBeVisible();
      await expect(page.locator("#toggle-legend")).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#map-legend")).toBeHidden();
      await page.locator("#toggle-legend").click();
      await expect(page.locator("#toggle-legend")).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#map-legend")).toBeVisible();
    }

    await page.screenshot({ path: testInfo.outputPath(`${viewport.name}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}
