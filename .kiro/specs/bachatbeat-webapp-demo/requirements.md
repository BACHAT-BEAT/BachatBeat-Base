# Requirements Document

## Introduction

BachatBeat is a professional B2B financial analysis infrastructure and dashboard built for Indian wealth managers, RIAs, CAs, MFDs, and insurance brokers. The platform identifies, optimises, and helps unlock underperforming "trapped capital" across clients' insurance policies, fixed deposits, mutual funds, and loans. This document covers the complete self-contained front-end web application demo, consisting of a public enterprise landing page and a private advisor command center, all served from local HTML/CSS/JS files with robust mock data and simulated interactive workflows.

---

## Glossary

- **BachatBeat**: The platform name; a portmanteau of "Bachat" (Hindi for savings) and "Beat" (pulse/rhythm).
- **Trapped Capital**: Money locked in underperforming financial instruments that yields returns below inflation or benchmark.
- **Trapped Capital Score**: A 0–100 health metric for a client's portfolio; lower scores indicate more trapped capital.
- **IRR**: Internal Rate of Return — the annualised yield of a financial instrument.
- **RIA**: SEBI Registered Investment Advisor.
- **CA**: Chartered Accountant.
- **MFD**: Mutual Fund Distributor.
- **GSV**: Guaranteed Surrender Value — minimum surrender payout guaranteed by insurer formula.
- **SSV**: Special Surrender Value — typically higher than GSV; includes accrued bonuses.
- **CPI**: Consumer Price Index — used as inflation benchmark.
- **ELSS**: Equity Linked Savings Scheme — tax-saving mutual fund under 80C.
- **SIP**: Systematic Investment Plan.
- **TER**: Total Expense Ratio for mutual funds.
- **FD**: Fixed Deposit.
- **EMI**: Equated Monthly Instalment.
- **OCR**: Optical Character Recognition — document parsing simulation.
- **BFP**: Break, Free, Proceed — the FD break vs. hold decision framework.
- **PDF_Generator**: The branded report generation module.
- **Advisor_Dashboard**: The post-login workspace for financial professionals.
- **Landing_Page**: The public-facing marketing and enterprise information page.
- **Policy_Engine**: The insurance IRR computation and scenario projection module.
- **Alert_Feed**: The chronological notification stream for market and policy events.
- **Pulse_Line**: The thin 1.5px ECG/heartbeat trace animation used as a signature UI motif.
- **Score_Gauge**: The circular SVG gauge displaying the Trapped Capital Score.

---

## Requirements

### Requirement 1: Design System and Brand Tokens

**User Story:** As a developer or designer reviewing the demo, I want a consistent, premium design language throughout the app, so that the interface conveys institutional trust and modern fintech credibility.

#### Acceptance Criteria

1. THE Landing_Page AND Advisor_Dashboard SHALL use `#FFFFFF` and `#F8F9FA` as primary and secondary background colours respectively in light mode.
2. THE Landing_Page AND Advisor_Dashboard SHALL apply `#0A705E` (Wealth Green/Teal) as the primary brand and action colour for buttons and positive yield metrics.
3. THE Landing_Page AND Advisor_Dashboard SHALL use `#0F172A` (Deep Navy/Slate) for primary headings and `#475569` for secondary body text.
4. THE Landing_Page AND Advisor_Dashboard SHALL apply `#D97706` (Amber) strictly for review warnings and `#DC2626` (Red) strictly for absolute rupee loss values.
5. THE Landing_Page AND Advisor_Dashboard SHALL load Inter (or Plus Jakarta Sans), JetBrains Mono, and optionally Syne via Google Fonts for typographic hierarchy.
6. THE Landing_Page AND Advisor_Dashboard SHALL render every financial value (premiums, yields, rupee amounts, IRR, dates) using the JetBrains Mono monospaced typeface for perfect column alignment.
7. THE Landing_Page AND Advisor_Dashboard SHALL display a thin 1.5px horizontal Pulse_Line ECG animation running across the top bar on page load.
8. THE Advisor_Dashboard SHALL display the Pulse_Line animation nested beneath each client's Score_Gauge on the profile screen.
9. THE Landing_Page AND Advisor_Dashboard SHALL apply subtle glassmorphism (`backdrop-filter: blur`) to floating navigation bars and modal overlays.
10. THE Landing_Page AND Advisor_Dashboard SHALL mount the file `logo.jpg` from the project root as the brand logo in the navigation bar and onboarding card.
11. THE Landing_Page AND Advisor_Dashboard SHALL mount `founder.jpg` from the project root as the profile image in the topbar avatar and the landing page footer.

---

### Requirement 2: Public Enterprise Landing Page

**User Story:** As a prospective advisor, CA, or RIA visiting the site, I want a high-converting, information-rich landing page, so that I can understand BachatBeat's value proposition and take action to join or log in.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the hero headline: "Uncover and Optimize the Trapped Capital in Your Clients' Portfolios."
2. THE Landing_Page SHALL display the hero sub-headline: "The precision analytical dashboard and API engine built for India's financial professionals."
3. WHEN a visitor loads the Landing_Page, THE Landing_Page SHALL auto-mount and autoplay (muted) the video file at `video/bachatbeat-brand.mp4` in a 16:9 aspect-ratio card with soft shadow elevation.
4. THE Landing_Page SHALL render a "Join Product Waitlist" primary CTA button and an "Advisor Login Portal" secondary CTA button in the hero section.
5. THE Landing_Page SHALL display three bento-style statistics chips: `₹47.2L` trapped capital identified, `15` clients tracked, and `4.8% → 12.4%` average IRR improvement.
6. THE Landing_Page SHALL render a Feature Pipeline Matrix section mounting the images `bachatbeat-font.png` and `coin.png` to illustrate Phase 1 (Policy Engine), Phase 2 (Alert Matrix & FD Trackers), and Phase 3 (MF/SIP Core & Overlap Detectors).
7. THE Landing_Page SHALL display a Tiered B2B Revenue section with exactly three pricing tiers: Basic (₹0, 0–100 API calls/month, 1 portfolio slot), Pro (₹999/month, up to 5,000 API calls/month, 25 client portfolios, PDF exports), and Enterprise (Custom pricing, unlimited API calls, white-labelling, webhook routing, RBI/SEBI compliance logs).
8. WHEN a visitor clicks the "Join Product Waitlist" CTA or pricing tier button, THE Landing_Page SHALL show an email capture form inline.
9. THE Landing_Page SHALL render a Scratch-to-Reveal Ecosystem Matrix containing exactly three interactive cards: Mentor (0.05%–0.5% equity), Validate (0.1%–2.0% equity), and Join as Engineer (0.5%–4.0% equity).
10. WHEN a visitor hovers or clicks a Scratch-to-Reveal card, THE Landing_Page SHALL animate the cover layer sliding away to reveal the equity offer and an action button.
11. THE Landing_Page SHALL display an Enterprise API Specification section highlighting: response time `<200ms`, data residency in India, ISO 27001 compliance, and deep instrument-level parsing.
12. THE Landing_Page SHALL render a scrolling ticker strip carrying live-style market data items (repo rate, CPI, SIP inflow statistics) above the hero section.
13. THE Landing_Page SHALL display a footer section with the founder image from `founder.jpg`, the contact emails `aryanpatel@gmail.com` and `help@bachatbeat.com`, and social/legal links.
14. THE Landing_Page SHALL include a sticky navigation bar with logo, navigation links, a "Pro Trial" badge, an "Advisor Login" button, and a "Join Waitlist" CTA button.
15. WHEN a visitor scrolls the Landing_Page beyond 100px, THE Landing_Page SHALL increase the navbar background opacity and add a bottom border shadow.

---

### Requirement 3: Advisor Authentication Bridge

**User Story:** As an advisor who has clicked "Advisor Login Portal" on the landing page, I want to be directed to the app dashboard, so that I can access my client workspace.

#### Acceptance Criteria

1. WHEN a visitor clicks "Advisor Login Portal" on the Landing_Page, THE Landing_Page SHALL navigate the browser to `app.html`.
2. THE Advisor_Dashboard SHALL check `sessionStorage` for a saved role on load.
3. IF no role is found in `sessionStorage`, THEN THE Advisor_Dashboard SHALL display the onboarding role-selection modal overlay.
4. IF a role is found in `sessionStorage`, THEN THE Advisor_Dashboard SHALL skip onboarding and render the dashboard screen directly.
5. THE Advisor_Dashboard SHALL persist the selected role and firm name in `sessionStorage` across page refreshes within the same session.

---

### Requirement 4: Smart Role Selection Onboarding

**User Story:** As a newly logged-in financial professional, I want to select my role and firm name, so that the dashboard personalises its labels and insights for my practice.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL render an onboarding modal card with a role dropdown containing the options: SEBI Registered Investment Advisor (RIA), Chartered Accountant (CA), Cost & Management Accountant (CMA), Company Secretary (CS), Mutual Fund Distributor (MFD), Insurance Broker, Bank Relationship Manager, and Other / Independent Advisor.
2. THE Advisor_Dashboard SHALL render a text input for "Practice / Firm Name" in the onboarding modal.
3. WHEN a user selects a role, THE Advisor_Dashboard SHALL display a role preview description below the dropdown.
4. THE Advisor_Dashboard SHALL display the ECG Pulse_Line SVG animation inside the onboarding card.
5. WHEN a user selects CA, THE Advisor_Dashboard SHALL display the label "ITR-linked Insights" for the tax navigation item.
6. WHEN a user selects RIA, THE Advisor_Dashboard SHALL display the label "Portfolio Review" for the insurance/portfolio navigation item.
7. WHEN a user selects MFD, THE Advisor_Dashboard SHALL display the label "Regular vs Direct" for the mutual fund navigation item.
8. WHEN a user selects Insurance Broker, THE Advisor_Dashboard SHALL highlight the Portfolio Review navigation item with an emphasis style.
9. WHEN a user submits the onboarding form with a valid role, THE Advisor_Dashboard SHALL animate a loading state for 900ms before transitioning to the dashboard screen.

---

### Requirement 5: Advisor Command Center Shell

**User Story:** As a logged-in advisor, I want a persistent workspace shell with sidebar navigation and profile controls, so that I can navigate between analytical modules without losing my context.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL render a fixed left sidebar of width 240px containing grouped navigation items: Main (Dashboard, All Clients), Analysis Tools (Portfolio/Insurance Review, FD Analysis, Investments/MF, Loan Analysis, Tax Snapshot), and Monitoring (Alerts Feed).
2. THE Advisor_Dashboard SHALL render a fixed top bar containing a search input, role badge, current date, and profile avatar with dropdown.
3. THE Advisor_Dashboard SHALL display the `founder.jpg` image as the profile avatar in the top bar.
4. WHEN the sidebar toggle button is clicked, THE Advisor_Dashboard SHALL collapse the sidebar to 64px width showing only icons.
5. THE Advisor_Dashboard SHALL apply role-based label personalisation to navigation item labels (portfolioLabel, taxLabel, mfLabel) based on the selected role.
6. THE Advisor_Dashboard SHALL render an Alerts Feed nav item with an amber badge showing the count of unactioned urgent/review alerts.
7. THE Advisor_Dashboard SHALL render a mobile bottom navigation bar for screens below 768px width.
8. WHEN a user clicks a navigation item, THE Advisor_Dashboard SHALL animate the screen content with a fade-up and page-enter transition.
9. WHEN a user selects "Change Role / Firm" from the profile dropdown, THE Advisor_Dashboard SHALL clear `sessionStorage` and re-show the onboarding overlay.

---

### Requirement 6: Centralised Advisor Dashboard

**User Story:** As an advisor viewing the dashboard home, I want macro-level metrics and priority actions at a glance, so that I can identify which clients need attention without opening individual profiles.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display four stat cards: Total Clients (15), Aggregate Trapped Capital Identified (`₹47.2L` in JetBrains Mono), Clients Needing Attention (4), and Mean Trapped Capital Score (52).
2. WHEN the dashboard loads, THE Advisor_Dashboard SHALL animate the numeric values counting up from zero to their target values over 1200ms.
3. THE Advisor_Dashboard SHALL display a "This Week's Priority Ledger" with 5 client rows, each showing a name, urgency dot, reason description, urgency badge, and a "View" button.
4. WHEN a user clicks a priority ledger row, THE Advisor_Dashboard SHALL navigate to that client's profile screen.
5. THE Advisor_Dashboard SHALL display an "Asset Distribution Chart" as a horizontal bar chart dividing trapped capital across Insurance Policies (60%), Fixed Deposits (21%), Mutual Funds (13%), and Loans (6%).
6. WHEN the bar chart renders, THE Advisor_Dashboard SHALL animate each bar expanding from 0% to its target width over 900ms.
7. THE Advisor_Dashboard SHALL display a "Recent Activity" section listing the last 6 advisory actions with timestamps in JetBrains Mono.
8. THE Advisor_Dashboard SHALL display a greeting with the firm name and current date in the page header.

---

### Requirement 7: Complete Client Portfolio Directory

**User Story:** As an advisor, I want a searchable, filterable ledger of all my clients, so that I can quickly locate any client and understand their portfolio status at a glance.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display a client table with 15 dummy Indian client profiles containing columns: urgency dot, name/age/email, Score_Gauge (34px SVG), tax slab, asset count badges, trapped capital amount in red JetBrains Mono, last reviewed date, urgency badge, and action button.
2. THE Advisor_Dashboard SHALL render a search input that filters the client list in real-time by name or email as the user types.
3. THE Advisor_Dashboard SHALL render filter chips for All, Urgent, Review, and Watch urgency levels that filter the client table on click.
4. THE Advisor_Dashboard SHALL render a sort dropdown supporting: Worst Score First, Best Score First, Name A–Z, and Last Reviewed.
5. WHEN a table row is clicked or keyboard-activated (Enter/Space), THE Advisor_Dashboard SHALL navigate to that client's profile screen.
6. THE Advisor_Dashboard SHALL support toggling between table view and card grid view via a view-toggle button.
7. WHEN a user clicks "Add New Client", THE Advisor_Dashboard SHALL show a modal with fields for full name, date of birth, phone, email, and tax slab.
8. WHEN the Add New Client form is submitted, THE Advisor_Dashboard SHALL display a toast notification confirming the addition.

---

### Requirement 8: Deep Client Profile and Multi-Asset Analysis Hub

**User Story:** As an advisor viewing a specific client, I want a comprehensive profile header and tabbed workspace, so that I can review all their financial instruments in one place and take targeted actions.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display a client profile header containing: initials avatar, name, urgency badge, age, tax slab, contact info, total trapped capital in red, and a 120px Score_Gauge.
2. THE Advisor_Dashboard SHALL display the Pulse_Line SVG animation beneath the Score_Gauge on the profile header, using amber colour if score < 50 and teal if score ≥ 50.
3. THE Advisor_Dashboard SHALL render "Export PDF Report" and "Share via WhatsApp" and "Run Full Analysis" action buttons in the profile header.
4. THE Advisor_Dashboard SHALL render a horizontal tab bar with tabs: Overview, Insurance, Fixed Deposits, Mutual Funds / SIPs, Loans, and Tax Snapshot — each showing an asset count badge where applicable.
5. WHEN the Overview tab is active, THE Advisor_Dashboard SHALL display four summary cards (one per asset class) with emoji icons, descriptions, and alert status.
6. WHEN the Insurance tab is active, THE Advisor_Dashboard SHALL display an expandable list of the client's insurance policies with inline GSV, SSV, potential gain, and recommendation details.
7. WHEN the Fixed Deposits tab is active, THE Advisor_Dashboard SHALL display a summary card list of FDs with break/hold verdict badges and a CTA to open the full FD analysis screen.
8. WHEN the Mutual Funds tab is active, THE Advisor_Dashboard SHALL display fund cards showing IRR vs. category median and underperformance cost in rupees.
9. WHEN the Loans tab is active, THE Advisor_Dashboard SHALL display loan summary cards with outstanding balance, rate, and EMI, and a CTA to open the full loan analysis screen.
10. WHEN the Tax Snapshot tab is active, THE Advisor_Dashboard SHALL display a side-by-side old vs. new regime comparison with a winner badge.
11. WHEN a user clicks "Export PDF Report", THE Advisor_Dashboard SHALL navigate to the report preview screen for that client.

---

### Requirement 9: Interactive Insurance Policy Diagnostics

**User Story:** As an advisor adding a new insurance policy for analysis, I want a form-based input with OCR simulation and a rich output dashboard, so that I can compute the real IRR and evaluate optimisation scenarios.

#### Acceptance Criteria

1. THE Policy_Engine SHALL render a two-column layout: a form on the left and an OCR upload zone on the right.
2. THE Policy_Engine SHALL provide form inputs for: Insurer (dropdown), Policy Type (dropdown), Annual Premium, Sum Assured, Years Already Paid, Policy Start Date, and Bonus Received.
3. THE Policy_Engine SHALL render a drag-and-drop upload zone accepting PDF files.
4. WHEN a user drops a file or clicks the upload zone, THE Policy_Engine SHALL simulate a 1800ms extraction loading state with a spinner, then auto-populate all form fields with sample LIC Jeevan Anand data.
5. WHEN a user submits the policy form, THE Policy_Engine SHALL simulate a 1600ms IRR calculation loading state before revealing the results dashboard.
6. THE Policy_Engine SHALL display the computed IRR (e.g. `4.8%`) against the CPI inflation benchmark (`6.2%`) with a callout showing the real leakage (e.g. `Real return: −1.4%`).
7. THE Policy_Engine SHALL render a 3-scenario horizontal bar chart comparing: Continue Policy, Surrender + Reinvest in ELSS, and Made Paid-Up — with projected corpus values in Indian rupee format.
8. THE Policy_Engine SHALL display Guaranteed Surrender Value and Special Surrender Value in two side-by-side cards.
9. THE Policy_Engine SHALL display a "Value Realization Callout" card showing the incremental wealth created by optimising (e.g. `₹8,60,000 additional corpus by age 60`).
10. THE Policy_Engine SHALL provide a post-tax toggle that, when activated, reduces the projected gain by approximately 15% (LTCG on ELSS) and updates the displayed values.
11. WHEN the scenario bar chart is revealed, THE Policy_Engine SHALL animate each bar expanding from 0% width over 1000ms.

---

### Requirement 10: Policy Overlap Detector

**User Story:** As an advisor reviewing a client with multiple policies, I want a visual overlap detector, so that I can identify redundant premium waste from duplicate coverage.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL render a Venn diagram visualisation showing overlapping coverage between two insurance policies.
2. THE Advisor_Dashboard SHALL display the total redundant premium in bold red monospace (e.g. `₹18,000/yr`) in the centre overlap region of the Venn diagram.
3. THE Advisor_Dashboard SHALL render an overlap details table listing: Policy 1, Policy 2, overlap reason, redundant premium amount, and recommendation badge.
4. THE Advisor_Dashboard SHALL display an amber callout below the Venn diagram summarising the total combined redundant premium.

---

### Requirement 11: FD Break vs. Hold Analysis

**User Story:** As an advisor reviewing a client's fixed deposits, I want a side-by-side break vs. hold comparison for each FD, so that I can determine whether premature liquidation is financially beneficial.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display summary cards for all FDs associated with the selected client, each showing bank name, principal, rate, maturity date, days remaining, and a break/hold verdict badge.
2. THE Advisor_Dashboard SHALL render a side-by-side comparison card for the primary FD showing: current rate, post-tax return, penalty if broken, days remaining vs. new rate, post-tax return at new rate, break penalty, and net gain.
3. WHEN the FD verdict is "break", THE Advisor_Dashboard SHALL highlight the "Break & Reinvest" column with a winner badge and display an emerald callout explaining the net gain and penalty recoup timeline.
4. THE Advisor_Dashboard SHALL render an FD maturity timeline chart as a horizontal ladder showing all FDs at their maturity positions.
5. THE Advisor_Dashboard SHALL display a "Where to Invest" comparison table showing post-tax returns for short-duration debt funds, FDs, and liquid funds adjusted for the client's tax slab.

---

### Requirement 12: Loan Prepay vs. Invest Calculator

**User Story:** As an advisor analysing a client's loan, I want an interactive prepayment vs. investment calculator, so that I can determine the optimal use of a lump sum.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display the loan summary with outstanding balance, interest rate in amber, EMI, and remaining tenure.
2. THE Advisor_Dashboard SHALL render a prepay vs. invest comparison with two cards: "If Prepaid" (showing interest saved and tenure reduction) and "If Invested" (showing projected corpus at assumed return rate).
3. THE Advisor_Dashboard SHALL provide a numeric input for the available lump sum and a range slider for the assumed investment return rate (6%–18%).
4. WHEN the slider value changes, THE Advisor_Dashboard SHALL recalculate and update the comparison cards in real-time without page reload.
5. THE Advisor_Dashboard SHALL display a callout stating which option wins based on whether the assumed return rate exceeds the loan interest rate.
6. THE Advisor_Dashboard SHALL render a Balance Transfer Comparison table if alternative lenders are available, showing new rate, new EMI, EMI saving, transfer cost, and breakeven month.
7. THE Advisor_Dashboard SHALL render a Loan Health Check checklist showing reset frequency, spread over benchmark, prepayment clause, and insurance cover status with colour-coded ok/warn/alert icons.

---

### Requirement 13: Mutual Fund Underperformance Engine

**User Story:** As an advisor reviewing a client's mutual fund portfolio, I want to see underperformance cost expressed in absolute rupees, so that I can make the financial impact tangible to the client.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display a bold red callout card showing total underperformance cost in rupees (e.g. `₹2.57L`) for the client's MF portfolio.
2. THE Advisor_Dashboard SHALL render a performance table listing each fund with: fund name, plan type (Regular/Direct) badge, SIP amount in JetBrains Mono, years running, IRR earned, category median, percentage gap (+ or −), and underperformance in rupees.
3. WHEN a fund's IRR is below its category median, THE Advisor_Dashboard SHALL colour the IRR and underperformance values in red.
4. THE Advisor_Dashboard SHALL render a Regular vs. Direct Plan comparison card showing expense ratios for each regular fund and the estimated 10-year saving from switching to direct.
5. THE Advisor_Dashboard SHALL display a winner badge on the Direct Plan comparison card.

---

### Requirement 14: Tax Optimisation Module

**User Story:** As an advisor reviewing a client's tax position, I want an old vs. new regime comparison and 80C bucket analysis, so that I can identify which regime to recommend and where the client's deductions are optimally deployed.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL display a side-by-side comparison card for Old Regime vs. New Regime showing: gross income, total deductions, taxable income, gross tax, health & education cess, and total tax in JetBrains Mono.
2. THE Advisor_Dashboard SHALL display a winner badge with savings amount (e.g. "Saves ₹45,282") on the recommended regime card.
3. THE Advisor_Dashboard SHALL display an 80C bucket breakdown as a horizontal stacked bar chart showing allocation across LIC premium, EPF, ELSS, and PPF with their respective IRRs colour-coded (red for < 6%, amber for 6–8%, green for > 8%).
4. THE Advisor_Dashboard SHALL display an 80C reallocation callout with specific advice (e.g. redirecting LIC premium to ELSS for higher returns within the same ₹1,50,000 limit).
5. WHEN the tax screen loads, THE Advisor_Dashboard SHALL animate the 80C bar chart segments expanding from 0% width.

---

### Requirement 15: Advisor Alert Feed

**User Story:** As an advisor monitoring market events, I want a chronological alert feed filterable by urgency and type, so that I can efficiently triage which clients need action today.

#### Acceptance Criteria

1. THE Alert_Feed SHALL render an expandable card list showing all 10 mock alerts with urgency dots, type icons, client name, urgency badge, type badge, and a truncated preview of the message.
2. THE Alert_Feed SHALL provide filter chips for urgency levels (All, Urgent, Review, Watch) and alert types (All Types, Bonus Rate Change, Repo Rate Cut, Policy Anniversary, Tax Season Reminder).
3. WHEN a filter chip is selected, THE Alert_Feed SHALL immediately re-render the list showing only matching alerts.
4. WHEN an alert row is expanded, THE Alert_Feed SHALL reveal the full alert message and action buttons ("View Client" and "Mark as Actioned").
5. WHEN "Mark as Actioned" is clicked, THE Alert_Feed SHALL update the alert's `actioned` flag, reduce its opacity to 0.55, and show an "Actioned" badge.
6. THE Alert_Feed SHALL display notification preference toggles for In-app, WhatsApp, and Email channels with toggle switch components.

---

### Requirement 16: High-Fidelity Branded PDF Report Generator

**User Story:** As an advisor presenting findings to a client, I want a branded PDF report preview that mimics a physical asset summary, so that I can download or share it via WhatsApp with a professional appearance.

#### Acceptance Criteria

1. THE PDF_Generator SHALL render a white paper-card layout with a dark emerald header showing the firm name and report date.
2. THE PDF_Generator SHALL display the client name, age, tax slab, and Score_Gauge circle in the client section of the report.
3. THE PDF_Generator SHALL display the key finding callout with the trapped capital amount in coloured JetBrains Mono.
4. THE PDF_Generator SHALL display an asset portfolio summary grid with insurance policies, FDs, MF count, and loan count.
5. IF policies with computed IRR exist for the client, THEN THE PDF_Generator SHALL include an insurance analysis highlights section with IRR and action tag for each policy.
6. THE PDF_Generator SHALL include a tax recommendation section if a tax snapshot exists for the client.
7. THE PDF_Generator SHALL include a legal disclaimer paragraph.
8. THE PDF_Generator SHALL render "Download PDF" and "Send via WhatsApp" action buttons above the paper card.
9. THE PDF_Generator SHALL be accessible from the client profile screen via the "Export PDF Report" button.

---

### Requirement 17: Financial Number Formatting and Indian Numeric Conventions

**User Story:** As an Indian financial professional using the platform, I want all monetary values to follow Indian numeric conventions (lakhs, crores), so that numbers are immediately readable in my professional context.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL format all rupee amounts using Indian locale conventions (e.g. `₹12,45,000` with lakh separator, not `₹1,245,000`).
2. THE Advisor_Dashboard SHALL use compact notation for large dashboard metric values (e.g. `₹47.2L` for lakhs, `₹1.2Cr` for crores).
3. THE Advisor_Dashboard SHALL render all rupee amounts, IRR percentages, and date values in JetBrains Mono typeface.
4. THE Advisor_Dashboard SHALL constrain all displayed IRR values between 4% and 13% for insurance products to reflect realistic Indian endowment/ULIP returns.
5. THE Advisor_Dashboard SHALL display negative real returns (IRR minus CPI) in red with an explicit minus sign (e.g. `−2.8%`).

---

### Requirement 18: Routing, State Persistence, and Navigation

**User Story:** As an advisor navigating between different analysis screens, I want smooth transitions and preserved context, so that I don't lose my place when drilling down into a client's data.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL route between all 12 screens (onboarding, dashboard, clients, profile, policy_add, overlap, fd, loans, mf, tax, alerts, report) via the `App.navigate()` function without full page reload.
2. THE Advisor_Dashboard SHALL preserve the `currentClientId` in app state so that analysis screens opened from a client profile are pre-populated with that client's data.
3. WHEN navigating to a screen, THE Advisor_Dashboard SHALL scroll the main content area to the top.
4. WHEN a navigation item is clicked, THE Advisor_Dashboard SHALL update the active state indicator (left accent bar) on the sidebar nav item.
5. THE Advisor_Dashboard SHALL support keyboard navigation: pressing Enter or Space on a focusable nav item SHALL trigger the same action as a click.

---

### Requirement 19: Asset File Integration

**User Story:** As a developer building the demo, I want all graphical assets mounted from the local file system rather than using external URLs or placeholders, so that the demo works fully offline and references the actual brand assets.

#### Acceptance Criteria

1. THE Landing_Page AND Advisor_Dashboard SHALL load the logo from the relative path `logo.jpg`.
2. THE Landing_Page AND Advisor_Dashboard SHALL load the founder profile image from the relative path `founder.jpg`.
3. THE Landing_Page SHALL load the brand video from the relative path `video/bachatbeat-brand.mp4`.
4. THE Landing_Page SHALL mount `coin.png` from the project root as the floating coin graphic in the hero section.
5. THE Landing_Page SHALL mount `bachatbeat-font.png` from the project root in the Feature Pipeline Matrix section.
6. IF any referenced asset file is not found, THEN THE Landing_Page AND Advisor_Dashboard SHALL render a styled fallback placeholder that preserves layout integrity without broken image icons.

---

### Requirement 20: Accessibility and Performance

**User Story:** As a financial professional using the platform on various devices, I want accessible, responsive screens, so that I can use the dashboard on desktop browsers without encountering layout breaks or usability barriers.

#### Acceptance Criteria

1. THE Advisor_Dashboard SHALL apply `role="navigation"` to the sidebar and `role="banner"` to the topbar for screen reader labelling.
2. THE Advisor_Dashboard SHALL apply `role="button"` and `tabindex="0"` to all interactive div elements that are not native buttons.
3. THE Advisor_Dashboard SHALL apply `aria-label` attributes to icon-only buttons.
4. THE Landing_Page AND Advisor_Dashboard SHALL be responsive: on screens below 768px, the sidebar SHALL be hidden and replaced by the mobile bottom navigation bar.
5. THE Landing_Page AND Advisor_Dashboard SHALL avoid using custom cursors (CSS `cursor: none`) that interfere with accessibility.
6. WHEN `prefers-reduced-motion` is active in the user's OS settings, THE Landing_Page AND Advisor_Dashboard SHALL disable or minimise all CSS animations and transitions.
7. THE Landing_Page AND Advisor_Dashboard SHALL implement `:focus-visible` styles for keyboard navigation users.
