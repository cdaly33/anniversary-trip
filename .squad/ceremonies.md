# Ceremonies

> Team meetings that happen before or after work. Each squad configures their own.

## Trip Concept Review

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | before |
| **Condition** | comparing destinations or changing the primary shortlist |
| **Facilitator** | Trip Lead |
| **Participants** | all-relevant |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Reconfirm anniversary priorities and non-negotiables
2. Compare wow factor, weather, logistics, fatigue, and value
3. Identify assumptions requiring verification
4. Record the decision or next research actions

---

## Itinerary Balance Review

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | before |
| **Condition** | before presenting a complete 10–14 day itinerary |
| **Facilitator** | Itinerary |
| **Participants** | Trip Lead, Destination Guide, Logistics, Value |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Confirm no more than 2–3 bases
2. Confirm most days have 1–2 meaningful experiences and breathing room
3. Check transfers, hotel changes, and avoidable flights
4. Check anniversary anchors, comfort, and estimated value

---

## Pre-Share Verification

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | before |
| **Condition** | output includes current prices, schedules, operating dates, entry rules, safety claims, or closures |
| **Facilitator** | Fact Checker |
| **Participants** | Fact Checker, Rai, originating agent |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Verify date-sensitive claims with current authoritative sources
2. Mark estimates and uncertainty explicitly
3. Review safety, accessibility, privacy, and responsible-travel concerns
4. Block contradicted claims or critical RAI findings; otherwise attach advisories


---

## Retrospective with Enforcement

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | weekly |
| **Condition** | No *retrospective* log in .squad/log/ within the last 7 days |
| **Facilitator** | lead |
| **Participants** | all |
| **Time budget** | focused |
| **Enabled** | yes |
| **Enforcement skill** | retro-enforcement |

**Agenda:**
1. What shipped this week? (closed issues, merged PRs)
2. What did not ship? (open issues, blockers)
3. Root cause on any failures
4. Action items -- each MUST become a GitHub Issue labeled retro-action

**Coordinator integration:**
At round start, call Test-RetroOverdue (see skill retro-enforcement). If overdue, run this ceremony before the work queue.

**Why GitHub Issues, not markdown:**
Production data: 0% completion across 6 retros using markdown checklists, 100% after switching to GitHub Issues.
