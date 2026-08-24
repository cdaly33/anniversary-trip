# Four-Trip Site Refresh — RAI Review

**Verdict: 🟡 Yellow — publication may proceed after the normal verification gate.**

## Blocking findings

None. No Red issue was identified, so the Trip Lead is not locked out.

## Non-blocking findings

### 1. Cost and flight uncertainty must remain visible — Yellow

**What:** The handoff responsibly calls costs broad 2027 estimates and flights plausible patterns, but some reassuring language (“medium-high” confidence, “normally one connection,” and value verdicts) may visually outweigh those qualifications. “SWAG” is also insider shorthand that may be unclear to Rachel.

**Why:** A tooltip or methodology link is too easy to miss when a bold total, hotel band, or route example looks decision-ready.

**How:** Use “rough 2027 planning range for two,” not “SWAG,” in primary UI. Keep “not a quote,” inclusions, hotel-night assumption, last-checked date, and major exclusions beside every range. Put “2027 schedules not confirmed” beside each flight pattern, not only in a tooltip. Do not rank or sort routes by apparent price precision. Require recalculation after any gateway, positioning-night, season, or hotel-night change.

### 2. Mobility and energy framing is strong but needs comparable summaries — Yellow

**What:** The itineraries consistently identify hills, cobbles, stairs, standing, boarding, luggage, heat, long sitting, recovery time, and valid lower-effort fallbacks. A few phrases remain vague or potentially overclaiming, including “mostly manageable paving” and “accessible historical content.”

**Why:** Readers should not have to infer whether “light” means short distance, few stairs, mostly seated, or simply slower. “Accessible” can imply verified step-free access.

**How:** Give every trip the same compact burden summary: transfer days, hardest day, likely walking/standing, major terrain barriers, seated/lower-walking option, and protected recovery days. Replace unverified “accessible” with the specific feature offered. State that conditions vary and venue-level access must be confirmed; do not assign a medical or binary accessibility score.

### 3. The amount of itinerary copy could obscure the decision — Yellow

**What:** Four detailed itineraries, flight caveats, costs, sources, and credits create a dense reading task.

**Why:** Important warnings can disappear in long cards, particularly on mobile, at 200% zoom, or for readers with lower energy or cognitive load tolerance.

**How:** Lead each trip with a plain-language summary and progressively disclose day details. Keep status, nights, transfer count, rough cost, hardest mobility day, recovery allowance, and unresolved decisions visible before expansion. Use semantic headings, lists, and a responsive comparison layout rather than a horizontally scrolling table. Do not rely on color, hover, icons, or tooltip-only text.

### 4. External links need predictable behavior — Yellow

**What:** The content includes many official, reference, license, and source links, but the handoff does not define how external navigation is communicated.

**Why:** Unexpected new tabs and indistinguishable source links can disorient keyboard, screen-reader, and mobile users.

**How:** Open links in the same tab by default. If a new tab is necessary, disclose it in visible text and the accessible name and use safe `rel` attributes. Use descriptive link names rather than repeated “source” or raw URLs. Group research links below the decision content so they do not interrupt reading. This review does not duplicate the Fact Checker’s URL/claim audit.

### 5. Image plan is usable only with a strict implementation gate — Yellow

**What:** The eight retained candidates have useful alt-text drafts and attribution records, and the ambiguous Villa del Balbianello image is correctly excluded. Commons metadata can still change, and cropping a CC BY-SA image creates reuse obligations.

**Why:** A copied credit without the source page, license link, modification notice, or applicable share-alike treatment is incomplete. Draft alt text may become inaccurate after cropping.

**How:** Reconfirm each file page immediately before download. Self-host only the verified original; retain creator spelling, source-page link, license link, and modification notice in a visible caption or nearby credits panel. Apply share-alike terms to modified CC BY-SA image files as required. Rewrite alt text against the final crop; use empty alt only when the same image is truly decorative and its information is already present nearby. Keep the Canaletto work visibly labeled as historical artwork, not a current view.

### 6. Responsible-travel framing should be more consistent — Yellow

**What:** The proposal avoids alcohol assumptions, acknowledges First Nations art and Aboriginal history, uses Piopiotahi, discourages overpacked travel, and prefers rail or shared/seated transport where practical. It does not consistently surface aviation burden, overtourism pressure, resident impact, or locally grounded cultural interpretation.

**Why:** The four options have materially different flight, transfer, and pressure-sensitive destination impacts.

**How:** Add a short, non-scored “responsible-travel considerations” section for each trip: long-haul/extra-flight burden, practical rail or shared-transfer choices, peak-pressure sites, local etiquette, locally owned operators, and culturally qualified interpretation. For Venice, Sintra, Barcelona-free Spain, Queenstown/Fiordland, and Indigenous histories, avoid treating communities as scenery or promising cultural interpretation from an unverified operator. Do not invent a sustainability ranking.

### 7. Status hierarchy must not become persuasive framing — Yellow

**What:** Portugal is labeled the “leading fit,” Spain the “strongest challenger,” and New Zealand + Australia remains visually attractive despite being structurally rejected.

**Why:** Hero photography and positive “wow” language can override burden, uncertainty, and rejection labels.

**How:** Give all four cards equal visual weight. Place the full status next to the title and repeat it in comparison/export views. For New Zealand + Australia, show the rejection reason before imagery and price. Present Portugal’s lead as provisional, not as Rachel’s presumed preference or a booking recommendation.

## Concrete UI acceptance checks

- Status and uncertainty remain understandable with CSS, color, images, and tooltips unavailable.
- All controls, disclosures, credits, accordions, and external-link notices work by keyboard and at 200% zoom.
- Body and utility text meet the existing 14 px minimum; line length and spacing remain comfortable on mobile.
- Comparison cards expose the same cost, nights, transfers, recovery, terrain, and unresolved-route fields.
- Cost and flight caveats appear in copied/downloaded summaries, not only on screen.
- Final image crops have reviewed alt text and visible, complete attribution.
