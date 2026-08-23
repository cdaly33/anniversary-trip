# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Scope, priorities, and final comparisons | Trip Lead | Rank concepts, resolve tradeoffs, protect the anniversary vision |
| Destination research | Destination Guide | History, culture, weather, safety, food, standout experiences |
| Itinerary design | Itinerary | Build balanced 10–14 day plans with 1–2 meaningful experiences daily and 2–3 bases |
| Transportation and booking sequence | Logistics | Flights, trains, ferries, transfers, routing, booking order |
| Budget, lodging, and neighborhoods | Value | Trip-cost ranges, hotel comparisons, comfort, location, value |
| Session logging | Scribe | Automatic — never needs routing |
| Queue monitoring | Ralph | Track open questions, dependencies, stalled work, and follow-through |
| RAI review | Rai | Safety, accessibility, privacy, and responsible travel concerns |
| Verification and challenge | Fact Checker | Current prices, schedules, closures, source checks, weak assumptions |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Trip Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Trip Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
8. **Research is provisional until verified.** Date-sensitive claims route through Fact Checker before being presented as current.
9. **Planning source of truth.** Accepted direction belongs in `.squad/decisions.md`; personal learnings belong only in the owning agent's append-only `history.md`.
