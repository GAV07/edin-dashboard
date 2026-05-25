# Pending Items — Investor Dashboard

Items remaining after the 2026-05-20 partner meeting changes. Target: reviewable draft by Friday 5/23, presentable to LPs by Monday 5/26.

---

## Completed (since 5/20 meeting)

- [x] **Login gate disclaimer** — Mandatory checkbox on sign-in with comprehensive language
- [x] **Database caching** — Postgres on Railway, admin-only sync from Google Sheets, no per-request API calls
- [x] **FAQ removed from nav** — Page exists but not in sidebar
- [x] **Documents removed from nav** — No documents page in sidebar
- [x] **EdinOS restructured as roadmap** — 3-phase format, no longer fintech product page
- [x] **Market Research source-focused** — Organized by topic with external source links
- [x] **Deal Flow anonymized** — Industry/stage/region distributions, no channel names revealed
- [x] **Team bios with collapsible expand** — Expandable format working
- [x] **Thesis page replaces Exec Summary in nav** — `/thesis` in nav, `/executive-summary` removed from nav
- [x] **Portfolio Support page added** — `/portfolio-support` in nav with placeholder content
- [x] **Per-page disclaimers on Venture Bond & Pro Forma** — Prominent banners at top of both pages
- [x] **Executive Summary link on Overview** — "View Executive Summary" button on the Overview page
- [x] **Venture Bond visual condensing** — Compact layout: inputs/results side-by-side, tabbed chart/table, compact founder journey
- [x] **Old EdinOS sub-components deleted** — Removed EdinOSHero, EdinOSFeatures, IntelligenceEcosystem, OperationsArchitecture, CompetitiveAdvantages
- [x] **Design polish pass** — Consistent layout (max-w container, unified header style, border cards vs shadow cards, green accent color), applied across Overview, Venture Bond, Team pages

---

## Awaiting Input

### Portfolio Support Page — Aurelia's Content
- **Page:** `/portfolio-support`
- **Status:** Placeholder is live with generic framework (strategic guidance, network access, operational support, community)
- **Needed:** Aurelia said she'd put her draft in Notion. Once that's in, replace the placeholder content with her layered approach: (1) what we provide independently/free through our network, (2) what requires paid services/perks, (3) deeper engagements like fractional support
- **Note from meeting:** Don't be overly prescriptive. Keep it honest about what's confirmed vs aspirational

### Team Bios — Verify & Update
- **Page:** `/team`
- **Status:** Expanded bios written based on what was available. Collapsible format is working
- **Needed:** Andrew needs to drop his deep bio into Notion (task tracker, search "deep bio"). Verify all three bios are accurate — the long bios are educated extrapolations; partners should confirm details
- **Note:** Eric mentioned wanting to fix his headshot image (has a "wavy thing"). Replace `/images/team/erick.jpeg` when the new image is ready

### Pro Forma — Reconnect to New Google Sheet
- **Page:** `/pro-forma`
- **Status:** Currently connected to the old Google Sheet (`1dR8V0zwmybcKOR0Tg8MWQWjDuVLxQ_YUu4WDUBEqxSM`). Numbers are stale
- **Needed:** New Google Sheet ID from Andrew once the model is updated with the new fee structure. Update `GOOGLE_SHEET_ID` in `.env.local` and verify all cell range references in `src/lib/googleSheetsAPI.ts`

---

## Design & UX Gaps

### Overall Visual Polish
- **Status:** First pass complete — unified layout containers, consistent card borders, green accent color system, consistent header patterns across pages
- **Still needed:** Several pages could benefit from further refinement:
  - Pro Forma dashboard has a different visual density than other pages (data-heavy by nature, but could use card-border consistency)
  - Consider adding subtle page-level illustrations or icons to break up text-heavy pages (Thesis, Portfolio Support)
  - Mobile responsiveness needs testing across all pages — especially the Venture Bond calculator inputs
  - Color consistency audit: some pages still use blue accents (market research links, deal flow steps) while the brand direction is green

---

## Pages That Need More Context

### Deal Flow Page (`/deal-flow`)
- **Still needed:** Pipeline distribution data (industry %, stage %, region %) is placeholder/estimated. Need to pull real numbers from the generator list and LinkedIn founder data in the existing database
- **Note from meeting:** Aurelia said don't reveal specific channel names (secret sauce). Current version shows national/regional/local counts only
- **CrunchBase API:** Discussed for enriching company data with revenue info. Would improve pipeline distributions

### Market Research Page (`/market-research`)
- **Still needed:** More sources over time — Stanford articles on liquidity, foundation research. Current sources are from the original page
- **Note from meeting:** Eric wanted "what is the market saying" with links organized by topic — that's what it is now

### EdinOS Page (`/edin-os`)
- **Decision needed:** Should any "In Development" items be changed to "Live" once built? Status badges are easy to toggle

### Overview Page (`/`)
- **Depends on:** Pro Forma reconnect (#3 above). Numbers need updating when new Google Sheet is connected

### Old Pages Still in Repo (not in nav)
- `/executive-summary` — Now linked from Overview page as supplementary detail
- `/faq` — Accessible by direct URL but not linked. Can delete or keep for future chat replacement

---

## Compliance & Legal (Not Blocking Portal)

- **PPM (Private Placement Memorandum):** Team agreed to draft using Claude, then have Fenwick review. Not blocking portal but needed before institutional LPs (e.g., American Bible Society). Eric will own this after portal is done
- **Compliance Manual:** Andrew took a stab at a draft — will share with Eric for review
- **Aduro Onboarding:** Clarify subscription agreement flow with Aduro vs Fenwick
- **Insurance:** Professional liability in progress, expected within 2 weeks

---

## Explicitly Deferred

- **AI chat function** — Eric hasn't cracked it yet; Andrew agrees it's nice-to-have, do last
- **BundleIQ integration** — Andrew mentioned Nick's platform for data room chat; parked
- **CrunchBase API enrichment** — Needs paid access; would improve deal flow data
