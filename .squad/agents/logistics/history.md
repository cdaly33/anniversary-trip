# Project Context

- **Requester:** @cdaly33
- **Project:** Rachel and Chris's 30th anniversary trip in 2027
- **Planning medium:** Markdown research and decisions in a local-backend Squad repository
- **Created:** 2026-08-23T12:33:15.248-05:00

## Seeded Context

- Minimize logistical friction, hotel changes, and avoidable intra-trip flights.
- Strong bases with rail, ferry, private-tour, or easy day-trip access are preferred.
- New Zealand + Australia must earn its long-haul time; Italy + Croatia must not become a rapid multi-city checklist.
- Booking guidance must distinguish sequencing advice from live availability.

## Learnings

Initial logistics principles established.

- 2026-08-24: Reality-checked every `flight` block in `site/trip-data.js` against current 2026 schedules. Key learning: the "STL has no transatlantic service" assumption is outdated — Lufthansa runs seasonal STL–FRA and BA launches seasonal STL–LHR (Apr 19, 2026, 4x/wk). Every other overseas routing still needs a hub; no direct STL–LIS/MAD/MXP/Oceania exists. Wrote corrected per-concept routings to `.squad/decisions/inbox/logistics-flight-corrections.md` for Web Developer; flagged five date-sensitive items for Fact Checker. Durable habit: always re-verify STL's nonstop map before asserting connection counts — the airport's intercontinental profile is changing.

📌 Team update (2026-08-23T19:00:01.589-05:00): The four retained concepts now use authoritative expected STL flight patterns under shared economy-airfare and provisional-planning assumptions — decided by Logistics and Trip Lead

📌 Team update (2026-08-24T17:04:52.553-05:00): Reality-checked all flight blocks against 2026 schedules. Key finding: STL nonstop transatlantic now exists (Lufthansa STL–FRA seasonal, BA STL–LHR from Apr 2026, 4x/wk); all other intercontinental still requires hub. Corrected per-concept flight routings (Portugal one-stop via ORD/EWR/JFK/IAD, Spain similar plus FRA/LHR seasonal, Italy–Croatia return VCE-only one-stop, NZ–Australia return one to two connections via Qantas SYD–DFW or LA/SF). Flagged 5 date-sensitive items for Fact Checker (BA/LH season ends, seasonal US nonstops, AA DFW–AKL Nov 2027, Qantas SYD–DFW Nov 2027, TAP ORD–LIS shoulder-season). Durable habit: always re-verify STL's nonstop map before asserting connection counts — the airport's intercontinental profile is changing — decided by Logistics
