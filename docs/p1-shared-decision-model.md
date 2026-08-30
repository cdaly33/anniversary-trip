# P1 Shared Decision Model (Frontend)

This document defines the production model added for P1 in `site/`.

## 1) Comparison data model

- Source: `trip-data.js` (4 concept entries after Italy+Slovenia consolidation).
- Runtime resolver: `trip-model.js::resolveTrip()`.
- Compare output fields (`trip.compare`) power both:
  - desktop matrix (`#compare-table`)
  - mobile snap cards (`#compare-cards`)
- Required fields included:
  - calendar days, hotel nights, bases, hotel moves, transfer days, inter-base time
  - rental requirement + rental days, internal flights, international flight complexity
  - recovery/flex-day credits, full destination days, customized estimated total cost
  - scenery, historic sites/castles, food, relaxation, logistical simplicity
  - biggest strength/concern, why choose, why regret

## 2) Friction formula (normalized, deterministic, inspectable)

Implemented in `trip-model.js` with a 0–5 normalized score:

`score = clamp((Σ(weight_i * normalized_i) / Σ(positive weights)) * 5, 0, 5)`

Where `normalized_i = clamp(raw_i / max_i, 0, 1)`.

Factors and weights:

| Factor | Max | Weight |
|---|---:|---:|
| hotelChanges | 4 | 0.55 |
| transferDays | 5 | 0.75 |
| interBaseHours | 18 | 0.90 |
| internalFlights | 2 | 1.05 |
| rentalDependencyDays | 7 | 0.70 |
| crossBorderOneWayRental | 1 | 0.95 |
| scheduleDependencyDays (early/late) | 7 | 0.70 |
| longHaulBurden | 5 | 0.85 |
| recoveryFlexDays | 5 | **-0.90** (credit) |

UI exposure:
- total score (`#friction-score`)
- raw metric summary (`#friction-summary`)
- per-factor table with raw/normalized/weight/impact (`#friction-breakdown`)

## 3) Persisted local state schema

Storage key: `anniversary-trip:v1`  
Version: `1`  
Normalizer/recovery: `state-store.js`

```json
{
  "version": 1,
  "selectedTripId": "italy-slovenia",
  "selectedDayByTrip": { "italy-slovenia": 0 },
  "compareTripIds": ["italy-slovenia", "northern-italy", "spain"],
  "routeDirectionByTrip": { "italy-slovenia": "como-to-bled" },
  "itinerarySelections": {
    "italy-slovenia": { "day-10-vintgar-primary-day-relaxed-bled-bohinj": "primary" }
  },
  "budgetOverrides": {
    "italy-slovenia": { "airfare": { "estimate": 2800, "low": 2500, "high": 3400 } }
  },
  "votes": {
    "trips": { "italy-slovenia": { "chris": "Love", "rachel": "Like" } },
    "anchors": { "italy-slovenia:como-villas": { "chris": "Love", "rachel": "Love" } }
  }
}
```

Recovery behavior:
- malformed JSON, missing payload, or wrong version => safe reset to defaults
- unknown trip/category/day IDs are stripped
- compare selection clamped to 2–3 trips

## 4) Budget model

Per-trip `budgetModel` includes **all required categories**:

1. airfare
2. lodging
3. intercity transportation
4. rental car
5. fuel/tolls/vignettes
6. local transportation
7. food
8. activities
9. anniversary experience
10. insurance
11. contingency
12. optional upgrades/extras

Each category stores:
- `baselineEstimate`
- `baselineLow`
- `baselineHigh`

Runtime (`resolveTrip`) computes:
- baseline total
- customized total (after overrides + modeled direction/variant adjustments)
- per-person total
- delta vs baseline

## 5) Variant model

Per-trip `itineraryVariants[]`:
- `dayId`
- `prompt`
- `options[]` with `label` (Primary / Alternative A / Alternative B), `title`, optional field overrides, budget adjustments, friction adjustments.

Behavior:
- selection persisted in `itinerarySelections`
- selected option updates:
  - day content rendered in itinerary
  - budget totals
  - friction score
  - decision summary (“current modeled choices”)

## 6) P2 sync seam (not implemented in P1)

No server sync or booking tracking was added.

The seam is intentionally isolated in `state-store.js`:
- adapters: `createLocalStorageAdapter`, `createMemoryAdapter`
- repository wrapper: `createStateRepository({ adapter, model })`

For P2, a remote adapter can be introduced without changing UI components:
- load merge strategy (local + remote)
- authenticated push/pull
- conflict policy for votes/budgets/variants
