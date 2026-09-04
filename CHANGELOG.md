# Changelog

All notable changes and technical integrations for the BimaCompass application are documented below.

---

## [1.9.0] - 2026-08-19

### Added
- **PyraMetric™ Actuarial Underwriting Platform Showcase**: Integrated the official PyraMetric™ Fire & NATCAT Actuarial Precision Suite (AIFT) gateway box directly below the "Your Trustworthy Guide in the Fine Print" hero banner, featuring the authentic Shield & Fire Flame SVG logo, statutory AIFT & IIB rate matrix, IS 1893 seismic geo-pricing, FEA appliance discount optimizer, and direct launch links to the deployed PyraMetric application (`https://all-india-fire-tariff-aift-rate-calculator-underw-563556753186.asia-southeast1.run.app/`).

---

## [1.8.0] - 2026-08-02

### Added
- **Indian Insurance & InsurTech Industry News**: Added a dedicated live news feed directly above the Interactive Insurance Tip box on the home dashboard, featuring IRDAI circulars, InsurTech startup innovations (Acko, Digit Insurance, Plum, InsuranceDekho), micro-policy releases, and consumer alerts.
- **Realtime Background Web-Sync Engine**: Integrated automatic background realtime synchronization for news and policy terms via search-grounded Gemini 3.5 protocols.
- **Admin-Only Manual Sync Rights**: Restricted manual "Sync News Now" and "Update from Web" triggers to authenticated administrators while maintaining seamless background auto-sync for all users.

---

## [1.7.0] - 2026-08-02

### Changed
- **Section Heading Styling & Grammar**: Styled the home dashboard section header "Tell us what you are looking for" in a vibrant orange hue with a matching orange bookmark icon and updated sentence casing.

---

## [1.6.0] - 2026-08-02

### Changed
- **App Page Background Palette**: Replaced the cool blue tint background with an appealing warm alabaster/warm-stone canvas (`#FAF9F5`) in light mode and a deep obsidian canvas (`#0E1117`) in dark mode.
- **Ambient Accent Glows**: Upgraded background glows with warm amber, rose, and emerald radial accents.
- **Hero Banner Canvas**: Replaced the cold dark blue hero banner with a rich charcoal and emerald slate gradient paired with emerald badge highlights.

---

## [1.5.0] - 2026-07-18

### Changed
- **Terminology Upgrade**: Overhauled user terminology in the standard consumer dictionary from `"Simple human translation"` to `"Layman's Language explanation"` for clearer context and accessibility.

---

## [1.4.0] - 2026-07-18

### Changed
- **Premium Glassmorphic Navigation & Headers**: Upgraded the primary header layout to feature high-fidelity glassmorphism with custom backdrop blur filters, supporting seamless light and dark mode ambient adjustments.
- **Atmospheric Visual Accent Orbs**: Integrated slow-pulsing background radial gradient glows in deep indigo, purple, and emerald to generate a modern bento-box canvas layout.
- **High-Contrast Dashboard Cards**: Overhauled the home menu selectors with robust dual-mode gradient fills, custom interactive hover state elevation offsets, and border shadow styling.

---

## [1.3.0] - 2026-07-18

### Added
- **Sidebar Admin Secure Hub Countdown Timer**: Integrated a real-time, visual, color-coded active session timer inside the secure settings panel. The timer dynamically displays session duration progress and turns red when less than 3 minutes remain.
- **Automated Security Sign-Out**: Implemented automatic clean token disposal and session termination when the countdown reaches zero, mitigating potential security risks of unattended open sessions.

---

## [1.2.0] - 2026-06-21

### Fixed
- **Policy Matchmaker Wizard Progression Bug**: Fixed the state coordination error where Step 3 inputs (Preferred Carrier & Add-on Coverage selection panels) remained active and rendered alongside the final suitability report when submitting. Underwriters and users are no longer "struck" on Step 3; the questionnaire elegantly fades out to display the comprehensive diagnostic report.
- **Downloaded PDF Symbol Corruptions**: Integrated a robust sanitize routine (`cleanPDFText`) during PDF generation to eliminate random un-encodable symbols and high-order Unicode emojis. Prevents jsPDF font mismatch glyph failures and guarantees crisp, clean legal PDF exports.

### Added
- **True Multi-Select Add-On Coverage Suite**: Upgraded the policy advisor with multi-select checkbox arrays allowing users to combine multiple optional rider packets (e.g. Critical Illness Riders, OPD Waivers, Zero-Depreciation Shields) into a single unified recommendation mix.
- **IRDAI Guidelines Mapping**: Linked matchmaker outputs directly to state Employees' Compensation Acts, named fire peril policies (SFSP), and standard commercial lines cargo parameters.

### Changed
- **Verified Insurer Designations**: Renamed raw placeholder tags to standardized, professional brand labels including "Insurers - HDFC General", "Insurers - Star Specialist", "Insurers - ICICI Lombard", "Insurers - Religare Health", "Insurers - Tata AIG", "Insurers - New India Assurance", and "Insurers - Bajaj Allianz".

---

## [1.1.0] - 2026-06-20

### Added
- **Inspector Exposure Controls**: Disabled production React source map emission (`sourcemap: false` configured inside Vite build configurations) preventing standard browser inspector dev tools from exposing original TypeScript code files to end-users.
- **Client Side Anti-Debugging Safeguards**: Embedded continuous interval timer loops (`anti-debugger`) and robust keydown/right-click listener blocks to block inspection, console snooping, and contextual element modification.
- **Secure Server-Side API Proxies**: Moved analytical operations and heavy prompt pipelines behind standard express routes to ensure absolute safety of developer endpoints and underlying systems.
