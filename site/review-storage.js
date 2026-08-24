(function (root, factory) {
  const storage = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = storage;
  else root.ANNIVERSARY_REVIEW_STORAGE = storage;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function emptyReview() {
    return { schemaVersion: 1, updatedAt: null, trips: {} };
  }

  function sanitizeReview(value, retainedIds) {
    if (!value || value.schemaVersion !== 1 || !value.trips || typeof value.trips !== "object") {
      return emptyReview();
    }
    const allowlist = retainedIds instanceof Set ? retainedIds : new Set(retainedIds);
    const trips = {};
    for (const id of allowlist) {
      if (Object.prototype.hasOwnProperty.call(value.trips, id)) trips[id] = value.trips[id];
    }
    return {
      schemaVersion: 1,
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : null,
      trips
    };
  }

  return { emptyReview, sanitizeReview };
});
