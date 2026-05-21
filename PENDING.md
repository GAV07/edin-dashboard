# Pending Items — Investor Dashboard

Items remaining after the 2026-05-20 partner meeting changes. Target: reviewable draft by Friday 5/23, presentable to LPs by Monday 5/26.

---

## Awaiting Input

### Portfolio Support Page — Aurelia's Content
- **Page:** `/portfolio-support`
- **Status:** Placeholder is live with generic framework (strategic guidance, network access, operational support, community)
- **Needed:** Aurelia said she'd put her draft in Notion. Once that's in, replace the placeholder content with her layered approach: (1) what we provide independently/free through our network, (2) what requires paid services/perks, (3) deeper engagements like fractional support
- **Note from meeting:** Don't be overly prescriptive here either. Aurelia hasn't finalized the structure and needs collaboration from the team. Keep it honest about what's confirmed vs aspirational

### Team Bios — Verify & Update
- **Page:** `/team`
- **Status:** Expanded bios written based on what was available. Collapsible format is working
- **Needed:** Andrew needs to drop his deep bio into Notion (task tracker, search "deep bio"). Verify all three bios are accurate — especially Aurelia's and Andrew's. The long bios I wrote are educated extrapolations; partners should confirm the details
- **Note:** Eric mentioned wanting to fix his headshot image (has a "wavy thing"). Replace `/images/team/erick.jpeg` when the new image is ready

### Pro Forma — Reconnect to New Google Sheet
- **Page:** `/pro-forma`
- **Status:** Currently connected to the old Google Sheet (`1dR8V0zwmybcKOR0Tg8MWQWjDuVLxQ_YUu4WDUBEqxSM`). Numbers are stale
- **Needed:** New Google Sheet ID from Andrew once the model is updated with the new fee structure from their conversation a few weeks ago. Update `GOOGLE_SHEET_ID` in `.env.local` and verify all cell range references in `src/lib/googleSheetsAPI.ts` and `src/app/api/dashboard/route.ts` still map correctly
- **Note from meeting:** Andrew is also planning to take a stab at redoing the deck and updating the model with the new fee structure

---

## Technical

### Database Caching — Fix API Loading Issues
- **Why:** The dashboard currently fetches from Google Sheets on every page load, causing the flickering/loading Eric demonstrated in the meeting. He mentioned building a database to fix this
- **Status:** Postgres caching exists in `src/lib/database.ts` with a 1-hour TTL for the dashboard route, but other routes (`/api/pro-forma`, `/api/portfolio`, `/api/portfolio-stats`) don't use it yet
- **Action:** Extend the Postgres cache layer to all API routes. This will eliminate the loading spinner on every navigation and reduce Google Sheets API quota usage
- **Note:** Eric said "the database that I'm gonna build is also gonna fix this longer loading problem." The infra is partially there — just needs to be applied consistently

### Venture Bond Calculator — Visual Condensing
- **Page:** `/venture-bond`
- **Why from meeting:** Eric said "I want to condense this a bit so that they can see all of this without scrolling so much"
- **Ideas:** Put the input parameters and quick-start scenario buttons in a more compact layout. Consider a side-by-side view (inputs left, results right) on desktop. The table and chart could be tabs instead of stacked vertically
- **Note:** The disclaimer banner I added takes some space at the top now — factor that into the condensed layout

---

## Pages That Need More Context / Cleanup

### Thesis Page (`/thesis`)
- **What it replaced:** Executive Summary tab
- **What's there now:** The opportunity, human flourishing, Venture Bond advantage, economic development flywheel, why now
- **Still needed:** The executive summary content (fund terms, metrics, target returns) should be accessible somewhere — either as a downloadable PDF linked from the Overview page, or as a section within the Thesis page. Eric mentioned "the executive summary could just be a link on the overview page." The old exec summary page still exists at `/executive-summary` but is no longer in the nav
- **Decision needed:** Do we add a "View Executive Summary" link/button on the Overview page? Or fold the key metrics into the Thesis page?

### Deal Flow Page (`/deal-flow`)
- **What changed:** Replaced the aspirational funnel (1000+ deals → 500 screened → 100 meetings → 35 companies) with anonymized pipeline distributions and sourcing channel counts
- **Still needed:** The pipeline distribution data (industry %, stage %, region %) is placeholder/estimated. Need to pull real numbers from the generator list and LinkedIn founder data that Eric has in the existing database. Eric mentioned he already built visualizations for this data (company analysis, geographic distribution map) — those could be integrated
- **Note from meeting:** Aurelia said don't reveal specific channel names (secret sauce). Andrew agreed. Current version shows national/regional/local counts only, which they approved
- **CrunchBase API:** Eric and Andrew discussed getting a CrunchBase API key to enrich the founder/company data with revenue info. If that happens, the pipeline distributions can be made more accurate

### Market Research Page (`/market-research`)
- **What changed:** Restructured from custom analysis to source-led format organized by topic
- **Still needed:** The team discussed adding more sources over time — Stanford articles on liquidity, foundation research, etc. The current sources are preserved from the original page. As they find new authoritative sources, they can be added to the `researchTopics` array in `src/components/MarketResearch.tsx`
- **Note from meeting:** Eric wanted this to be a "what is the market saying" page with links organized by topic. That's what it is now, but it could benefit from a few more topics or sources as the team identifies them

### EdinOS Page (`/edin-os`)
- **What changed:** Stripped down from a fintech product page to a 3-phase roadmap (Core Operations → Intelligence Layer → Where This Goes)
- **Old sub-components still in repo:** `EdinOSHero.tsx`, `EdinOSFeatures.tsx`, `IntelligenceEcosystem.tsx`, `OperationsArchitecture.tsx`, `CompetitiveAdvantages.tsx` — these are no longer imported but haven't been deleted. Can be cleaned up once the team confirms they're happy with the new version
- **Decision needed:** Should any of the items marked "In Development" be changed to "Live" once they're actually built? The status badges are easy to toggle in the component

### Overview Page (`/`)
- **Not changed yet but discussed:** The overview dashboard pulls metrics from Google Sheets (committed capital $86M, management fee 2.5%, carry 20%, etc.). Eric mentioned these numbers need to be adjusted once the new Google Sheet is connected. Also the annual returns and cumulative returns charts depend on the same data
- **Potential addition:** A link to the executive summary PDF or the polished exec summary doc could live here

### Old Pages Still in Repo (not in nav)
- `/executive-summary` — old exec summary page, still accessible by direct URL
- `/faq` — FAQ page, still accessible by direct URL
- These can be deleted or kept as unlisted pages. No rush — they're just not linked anywhere

---

## Compliance & Legal (Discussed but Not Started)

- **PPM (Private Placement Memorandum):** Team agreed to take a first stab using Claude, then have Fenwick review. Not blocking the portal launch but needed before institutional LPs (e.g., American Bible Society). Eric will own this after the portal is done
- **Compliance Manual:** Andrew took a stab at a draft — will share with Eric for review. Includes data privacy, cybersecurity, access control. Eric may need admin access to Google Drive for this
- **Aduro Onboarding:** Intro call scheduled for tomorrow (5/21). Need to clarify: does Aduro handle subscription agreement flow, or does Fenwick? And do LPs need a separate Aduro login?
- **Insurance:** Professional liability insurance in progress, expected within 2 weeks
