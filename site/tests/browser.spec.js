"use strict";

const { expect, test } = require("@playwright/test");

const STORAGE_KEY = "anniversary-trip:v1";
const EMPTY_TILE = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9s2l4f4AAAAASUVORK5CYII=",
  "base64"
);

const VIEWPORTS = [
  { name: "phone-390x844", width: 390, height: 844, mode: "phone" },
  { name: "tablet-820x1180", width: 820, height: 1180, mode: "tablet" },
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

async function tableCellByLabel(page, label, columnIndex = 1) {
  const row = page.locator(".matrix-table tbody tr").filter({ has: page.locator("th", { hasText: label }) }).first();
  return row.locator("td").nth(columnIndex - 1);
}

test.beforeEach(async ({ page }) => {
  await page.route("https://tile.openstreetmap.org/**", route => route.fulfill({
    status: 200,
    contentType: "image/png",
    body: EMPTY_TILE
  }));
});

test("clean load resolves consolidated concepts and canonical hash", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");
  await expect(page.locator("#concept-title")).toBeVisible();
  await expect(page.locator(".concept-item")).toHaveCount(4);
  await expect(page.locator(".concept-item[data-trip-id='italy-slovenia-reversed']")).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).hash).toBe("#italy-slovenia/day-1");
  await expect(page.locator("#direction-options input[type='radio']")).toHaveCount(2);
  await expect(errors).toEqual([]);
});

test("legacy reversed hash redirects into italy direction toggle", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/#italy-slovenia-reversed/day-5");
  await expect(page.locator("#concept-title")).toHaveText("Italy + Slovenia");
  await expect.poll(() => new URL(page.url()).hash).toBe("#italy-slovenia/day-5");
  await expect(page.locator("#direction-options input[value='bled-to-como']")).toBeChecked();
  await expect(page.locator("#beat-title")).toContainText("Vintgar");
  await expect(errors).toEqual([]);
});

test("comparison selection renders required matrix fields", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");

  const selectedChecks = page.locator("#compare-selection input:checked");
  await expect(selectedChecks).toHaveCount(3);
  await expect(await tableCellByLabel(page, "Calendar days")).toContainText("calendar day");
  await expect(await tableCellByLabel(page, "Hotel moves")).toContainText("move");
  await expect(await tableCellByLabel(page, "Rental requirement / days")).toContainText("day");
  await expect(await tableCellByLabel(page, "Trip friction score")).toContainText("/ 5");

  const tripToggles = page.locator("#compare-selection input");
  await tripToggles.nth(2).uncheck();
  await expect(selectedChecks).toHaveCount(2);
  await tripToggles.nth(2).check();
  await expect(selectedChecks).toHaveCount(3);
  await expect(errors).toEqual([]);
});

test("votes persist for trips and anchor experiences", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");

  const italyTripRow = page.locator("#trip-vote-rows tr").filter({ has: page.locator("th", { hasText: "Italy + Slovenia" }) }).first();
  await italyTripRow.locator("select").nth(0).selectOption("Love");
  await italyTripRow.locator("select").nth(1).selectOption("Like");

  await page.locator("details").filter({ has: page.locator("summary", { hasText: "Vote major anchor experiences" }) }).locator("summary").click();
  const firstAnchorTable = page.locator("#anchor-vote-groups .anchor-group").first();
  await firstAnchorTable.locator("tbody tr").first().locator("select").nth(0).selectOption("Love");
  await firstAnchorTable.locator("tbody tr").first().locator("select").nth(1).selectOption("Love");

  await page.reload();
  const italyTripRowAfter = page.locator("#trip-vote-rows tr").filter({ has: page.locator("th", { hasText: "Italy + Slovenia" }) }).first();
  await expect(italyTripRowAfter.locator("select").nth(0)).toHaveValue("Love");
  await expect(italyTripRowAfter.locator("select").nth(1)).toHaveValue("Like");
  await expect(page.locator("#decision-summary")).toContainText("Both love");
  await expect(errors).toEqual([]);
});

test("budget overrides persist and reset", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");

  await page.locator("details").filter({ has: page.locator("summary", { hasText: "Edit category estimates" }) }).locator("summary").click();
  const airfareCard = page.locator(".budget-card").filter({ has: page.locator("h4", { hasText: "Airfare" }) }).first();
  const estimateInput = airfareCard.locator(".budget-input").filter({ hasText: "Current estimate" }).locator("input");
  await estimateInput.fill("3100");
  await estimateInput.blur();
  await expect(page.locator("#budget-totals")).toContainText("Customized total");
  await page.reload();
  const airfareCardAfter = page.locator(".budget-card").filter({ has: page.locator("h4", { hasText: "Airfare" }) }).first();
  const estimateInputAfter = airfareCardAfter.locator(".budget-input").filter({ hasText: "Current estimate" }).locator("input");
  await expect(estimateInputAfter).toHaveValue("3100");

  await page.locator("#reset-budget").click();
  await expect(estimateInputAfter).not.toHaveValue("3100");
  await expect(errors).toEqual([]);
});

test("itinerary alternatives update modeled day and persist", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.goto("/");

  const frictionBefore = await page.locator("#friction-score").innerText();
  await page.locator("#itinerary-list .day-select").filter({ hasText: "Day 10" }).first().click();
  await page.locator("#beat-variant-controls .choice-chip").filter({ hasText: "Alternative A" }).first().click();
  await expect(page.locator("#beat-title")).toContainText("Piran");
  const frictionAfter = await page.locator("#friction-score").innerText();
  expect(frictionAfter).not.toEqual(frictionBefore);

  await page.reload();
  await page.locator("#itinerary-list .day-select").filter({ hasText: "Day 10" }).first().click();
  await expect(page.locator("#beat-title")).toContainText("Piran");
  await expect(page.locator("#beat-extra")).toContainText("Selected option: Alternative A");
  await expect(errors).toEqual([]);
});

test("malformed localStorage state is recovered safely", async ({ page }) => {
  const errors = trackClientErrors(page);
  await page.addInitScript(key => localStorage.setItem(key, "{ malformed-json"), STORAGE_KEY);
  await page.goto("/");
  await expect(page.locator("#state-recovery-note")).toContainText("safely reset");
  await expect(page.locator("#concept-title")).toBeVisible();
  await expect(errors).toEqual([]);
});

for (const viewport of VIEWPORTS) {
  test(`${viewport.name} responsive layout keeps map and decision controls usable`, async ({ page }) => {
    const errors = trackClientErrors(page);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(page.locator("#concept-trigger")).toBeVisible();
    await expect(page.locator("#enable-map")).toBeVisible();
    await expect(page.locator("#fit-route")).toBeVisible();
    await expect(page.locator("#compare-selection")).toBeVisible();

    const overflow = await page.evaluate(() => ({
      root: document.documentElement.scrollWidth - window.innerWidth,
      body: document.body.scrollWidth - window.innerWidth,
      mapPosition: getComputedStyle(document.querySelector(".map-region")).position,
      routeDisplay: getComputedStyle(document.querySelector(".route-table")).display
    }));
    expect(overflow.root).toBeLessThanOrEqual(1);
    expect(overflow.body).toBeLessThanOrEqual(1);

    if (viewport.mode === "desktop") {
      expect(overflow.mapPosition).toBe("sticky");
      await expect(page.locator("#compare-table .matrix-table")).toBeVisible();
    } else if (viewport.mode === "tablet") {
      expect(overflow.mapPosition).toBe("static");
      expect(overflow.routeDisplay).toBe("flex");
      await expect(page.locator("#compare-table .matrix-table")).toBeVisible();
    } else {
      expect(overflow.mapPosition).toBe("static");
      expect(overflow.routeDisplay).toBe("flex");
      await expect(page.locator("#compare-cards .snap-card").first()).toBeVisible();
    }

    await expect(page.locator("#map-shell")).toHaveClass(/interaction-off/);
    await page.locator("#enable-map").click();
    await expect(page.locator("#map-shell")).not.toHaveClass(/interaction-off/);
    await page.locator("#enable-map").click();
    await expect(page.locator("#map-shell")).toHaveClass(/interaction-off/);
    await expect(errors).toEqual([]);
  });
}
