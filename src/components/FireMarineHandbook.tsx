import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BimaIconLogo from "./BimaIconLogo";
import { 
  Flame, 
  Anchor, 
  HelpCircle, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Compass, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  Scale,
  Users,
  Heart,
  Activity,
  Printer,
  Mail
} from "lucide-react";

type HandbookSection = "fire" | "marine" | "liability" | "wc" | "gpa" | "ghi";

export default function FireMarineHandbook() {
  const [activeSection, setActiveSection] = useState<HandbookSection>("fire");

  // Interactive Marine Questionnaire State
  const [marineFrequency, setMarineFrequency] = useState<string>("");
  const [marineGeography, setMarineGeography] = useState<string>("");
  const [marineGoodsType, setMarineGoodsType] = useState<string>("");

  // Interactive Fire/IAR Questionnaire State
  const [fireAssetValue, setFireAssetValue] = useState<string>("");
  const [fireInterruption, setFireInterruption] = useState<string>("");
  const [fireStockFluctuation, setFireStockFluctuation] = useState<string>("");
  const [activeFireSubTab, setActiveFireSubTab] = useState<"sfsp" | "bgr" | "iar">("sfsp");
  const [activePerilId, setActivePerilId] = useState<number | null>(1);

  const statutoryPerils = [
    {
      id: 1,
      name: "Fire (Spontaneous Ignitions)",
      meaning: "Covers standard physical burning. Excludes damage caused by heat or smoking/singeing without active ignition, or loss caused by own spontaneous combustion."
    },
    {
      id: 2,
      name: "Lightning Strokes",
      meaning: "Covers direct structural cracks, electric fires, or roof collapse induced by lightning strikes. Excludes general grid power surges."
    },
    {
      id: 3,
      name: "Explosion / Implosion (Domestic)",
      meaning: "Covers shockwaves or blast damage from standard domestic boilers/gas cylinders. Excludes heavy industrial turbine explosions unless endorsed."
    },
    {
      id: 4,
      name: "Aircraft Damage & Aerial Drops",
      meaning: "Covers impact damage from planes, drones, satellites, or debris dropping from air travel. Excludes noise/vibration cracking (sonic booms)."
    },
    {
      id: 5,
      name: "Riot, Strike & Malicious Damage",
      meaning: "Covers intentional vandalism, arson, or physical destruction by rioting mobs or striking personnel. Excludes slow theft or cold storage spoilage due to strike downtime."
    },
    {
      id: 6,
      name: "Storm, Cyclone, Flood (STFI)",
      meaning: "Covers heavy rains, flash floods, hurricanes, and cyclone physical washes. This can sometimes be excluded to save premium, but leaving this out is highly risky."
    },
    {
      id: 7,
      name: "Impact Damage (Vehicles/Animals)",
      meaning: "Covers structural hits from external civilian third-party trucks, trains, cars, or wild beasts. Excludes collisions from the policyholder's own company forks/cranes."
    },
    {
      id: 8,
      name: "Subsidence, Landslides & Rockslides",
      meaning: "Covers sudden sliding of topsoil, bedrock, or hillside shifting that impacts the warehouse. Excludes slow foundation settlement over decades."
    },
    {
      id: 9,
      name: "Water Tank Burst / Pipe Overflows",
      meaning: "Covers water flood damage from bursting of physical rooftop tanks, pipe networks, or public conduits. Excludes repair bills for fixing the faulty plumbing itself."
    },
    {
      id: 10,
      name: "Missile Testing Operations",
      meaning: "Covers fire or explosive impact originating directly from defense forces, military aircraft drills, or domestic testing of scientific projectiles."
    },
    {
      id: 11,
      name: "Automatic Sprinkler Installation Leakage",
      meaning: "Covers emergency water damage resulting from accidental, faulty sprinkler heads discharge. Excludes water discharge during major building layout renovations."
    },
    {
      id: 12,
      name: "Bush Fire (uncontrolled wild brush)",
      meaning: "Covers flames arriving from surrounding high-density bushes, dry grass fields, or outer forests. Excludes controlled cleaning fires lit by forest departments."
    }
  ];

  const [activeIarProvisionId, setActiveIarProvisionId] = useState<number | null>(1);

  const iarProvisions = [
    {
      id: 1,
      name: "Section I: Material Damage (MD)",
      meaning: "Operates on an 'All Risks' framework. Covers physical loss, destruction, or damage to entire factory buildings, machinery, utilities, pipeline systems, and warehouse stocks unless explicitly excluded. It merges traditional Named Perils (fire) with engineering breakdown covers."
    },
    {
      id: 2,
      name: "Section II: Business Interruption (FLOP)",
      meaning: "Compensates for loss of net profits (Fire Loss of Profits) and helps clear continuous fixed expenses (e.g., bank loan interest, base electricity indices, mandatory staff salaries, and rent values) that persist while the physical facilities are being reconstructed."
    },
    {
      id: 3,
      name: "Reinstatement Value Clause (RVC)",
      meaning: "Mandatory standard clause in Section I. Forces the Insurer to pay full replacement cost of purchasing current brand-new substitute machinery, raw materials, or structures without deducting arbitrary usage depreciation percentages."
    },
    {
      id: 4,
      name: "Average Clause Waiver Conditions",
      meaning: "Under IAR standard terms, underinsurance penalty is only initiated if the actual asset value at the time of loss exceeds the declared Sum Insured by more than 15%. This offers a crucial security buffer compared to strict 0% tolerance under basic SFSP."
    },
    {
      id: 5,
      name: "Compulsory Deductible Scales",
      meaning: "Because of the open-ended 'All Risks' nature, IAR carries high deductibles (usually 5% of the total claim subject to a minimum of ₹5 Lakhs, scaling up to ₹25 Lakhs for larger mega-plants). Small everyday losses must be borne by the client."
    },
    {
      id: 6,
      name: "Machinery Breakdown (MBD) Cover",
      meaning: "Integrates complete electrical, machinery, and mechanical disruption security. Traditional fire policies exclude internal machine breakdowns, but Section I of IAR wraps this directly into the master treaty protection."
    },
    {
      id: 7,
      name: "Terrorism Pool Buyback",
      meaning: "Traditional reinsurance treaties exclude acts of political sabotage or terrorism strikes. This is an optional buyback extension which feeds into the Indian National Terrorism Pool, reinstating full commercial structural safety."
    },
    {
      id: 8,
      name: "Design Defect & Faulty Materials",
      meaning: "Standard wording exclusionary clause. Excludes the cost of rectifying incorrect blueprint designs, bad craftsmanship, or faulty materials, though subsequent accidental physical damage to other parts of the plant resulting from such defects remains covered."
    }
  ];

  // Interactive Liability Questionnaire State
  const [liabilitySector, setLiabilitySector] = useState<string>("");
  const [liabilityRisks, setLiabilityRisks] = useState<string>("");
  const [liabilityBoard, setLiabilityBoard] = useState<string>("");

  // Interactive WC Questionnaire State
  const [wcWorkforce, setWcWorkforce] = useState<string>("");
  const [wcSubcontractors, setWcSubcontractors] = useState<string>("");
  const [wcAddons, setWcAddons] = useState<string>("");

  // Interactive GPA Questionnaire State
  const [gpaWorkRisk, setGpaWorkRisk] = useState<string>("");
  const [gpaScaleSize, setGpaScaleSize] = useState<string>("");
  const [gpaRidersNeeded, setGpaRidersNeeded] = useState<string>("");
  const [gpaAddonsSelected, setGpaAddonsSelected] = useState<string[]>([]);

  // Interactive GHI Questionnaire State
  const [ghiTeamSize, setGhiTeamSize] = useState<string>("");
  const [ghiMaternityScope, setGhiMaternityScope] = useState<string>("");
  const [ghiClassWaivers, setGhiClassWaivers] = useState<string>("");
  const [openLiabilityFAQ, setOpenLiabilityFAQ] = useState<number | null>(null);

  const downloadAdvisorySummary = () => {
    let title = "";
    let colorTheme = "#0f172a"; // Slate-900 default
    let selectionRows = "";
    let assessmentRecommendationLabel = "";
    let assessmentRecommendationDesc = "";
    let assessmentAdvisoryRules: string[] = [];
    let auditListTitle = "";
    let auditListItems: string[] = [];

    if (activeSection === "fire") {
      title = "Fire & Industrial All Risks (IAR) Advisory Audit";
      colorTheme = "#dc2626"; // red-600
      
      const valText = fireAssetValue === "over_100" ? "Over ₹100 Crores (Large-scale Asset)" : fireAssetValue === "under_100" ? "Under ₹100 Crores (SME Asset)" : "Not Declared";
      const interText = fireInterruption === "critical" ? "Critical Downtime Risk" : fireInterruption === "not_critical" ? "Minimal / Manageable" : "Not Declared";
      const stockText = fireStockFluctuation === "fluctuating" ? "Peaks & Seasonal Cycles" : fireStockFluctuation === "steady" ? "Stable & Constant" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Overall Asset Valuation:</strong></td><td>${valText}</td></tr>
        <tr><td><strong>2. Downtime Exposure:</strong></td><td>${interText}</td></tr>
        <tr><td><strong>3. Stock & Inventory Profile:</strong></td><td>${stockText}</td></tr>
      `;

      if (fireAssetValue === "over_100") {
        assessmentRecommendationLabel = "Industrial All Risks (IAR) Treaty";
        assessmentRecommendationDesc = "With commercial assets exceeding ₹100 Crores, you are legally eligible for a comprehensive corporate Industrial All Risks package. Unlike the standard named-perils SFSP model, this binds all physical losses, boiler breakdown expenses, and business interruptions into a single sovereign sheet.";
      } else {
        assessmentRecommendationLabel = "Standard Fire & Special Perils (SFSP) Policy";
        assessmentRecommendationDesc = "For SME physical offices and warehousing assets worth under ₹100 Crores, a Standard Fire & Special Perils (SFSP) policy is the appropriate market choice. It protects you against exactly twelve named perils (lightning, standard structural fires, floods, burst water conduits, and landslides).";
      }

      if (fireInterruption === "critical") {
        assessmentAdvisoryRules.push("Add a Consequential Loss (Fire Loss of Profits) rider to pay out standing salaries and rent indices while machines are rebuilt.");
      } else {
        assessmentAdvisoryRules.push("Minimal Business Interruption coverage needed, focusing core premiums on hardware asset replacement.");
      }

      if (fireStockFluctuation === "fluctuating") {
        assessmentAdvisoryRules.push("Equip your plan with a Stock Declaration Clause to pay dynamic, flexible premiums matching exact monthly warehousing levels.");
      } else {
        assessmentAdvisoryRules.push("Opt for standard Fixed Sum Insured terms since your raw materials stay highly constant.");
      }
      
      assessmentAdvisoryRules.push("Observe and lock in the Reinstatement Value Clause (RVC) to avoid heavy usage depreciation deductions in claims.");
      assessmentAdvisoryRules.push("Maintain strict, daily off-site digital logs of inventory registers to fulfill standard auditing requirements.");

      auditListTitle = "Small Business Fire Claim Readiness Audit List";
      auditListItems = [
        "Are daily stock registers saved to an offsite digital cloud (Physical copies easily burn to ashes)?",
        "Does your declared sum matched direct current replacement costs of machines (excluding land Value)?",
        "Is your business downtime insurance window set to at least 6-12 months limit?",
        "Do you have updated fire safety NOC certifications and active sprinkler checklists?"
      ];
    } else if (activeSection === "marine") {
      title = "Marine Cargo & Logistics Advisory Audit";
      colorTheme = "#4f46e5"; // indigo-600

      const freqText = marineFrequency === "regular" ? "Continuous & recurring shipments (Regular)" : marineFrequency === "occasional" ? "Single-time or very rare voyages" : "Not Declared";
      const geoText = marineGeography === "domestic" ? "Domestic Transit within India" : marineGeography === "international" ? "International Imports & Exports" : "Not Declared";
      const goodsText = marineGoodsType === "standard" ? "Standard Packaged Merchandise" : marineGoodsType === "highvalue" ? "Project Cargo / High-Value Machinery" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Shipping Frequency:</strong></td><td>${freqText}</td></tr>
        <tr><td><strong>2. Transit Geography:</strong></td><td>${geoText}</td></tr>
        <tr><td><strong>3. Type of Goods:</strong></td><td>${goodsText}</td></tr>
      `;

      if (marineFrequency === "occasional") {
        assessmentRecommendationLabel = "Specific Voyage Policy";
        assessmentRecommendationDesc = "Since you only run single-time or occasional shipments, an individual Specific Voyage Policy is the most suitable, premium-efficient choice for your profile. Each policy protects a defined journey from Point A to Point B and terminates immediately upon final delivery, keeping overheads strictly aligned with real individual shipments.";
      } else if (marineFrequency === "regular" && marineGeography === "domestic") {
        assessmentRecommendationLabel = "Marine Open Policy";
        assessmentRecommendationDesc = "For frequent, regular shipments within India (domestic overland/air/rail transit), a 12-month domestic Marine Open Policy is perfect. It works via standard upfront dynamic deposits which automatically deduct daily shipment declarations, radically reducing individual certification burdens and admin friction.";
      } else {
        assessmentRecommendationLabel = "Open Cover Agreement";
        assessmentRecommendationDesc = "For recurring international import & export flows, an Open Cover Agreement is the correct market answer. It acts as a long-term contract agreement (treaty) in which the insurer legally agrees to cover all overseas shipments throughout the contract year at predetermined locked-in premium rates with no static sum-insured restricts.";
      }

      assessmentAdvisoryRules.push("Ensure to incorporate a Warehouse-to-Warehouse Transit Clause to cover overland loops from factory dock to ocean port.");
      assessmentAdvisoryRules.push("Verify shipping contract terms (FOB vs. CIF) and consider Seller's Interest endorsements.");
      assessmentAdvisoryRules.push("Check that ICC Class A is locked is for high-value merchandise to get complete 'All Risks' cover.");
      assessmentAdvisoryRules.push("Be fully aware of General Average salvage joint-liabilities and verify coverage is active.");

      auditListTitle = "Maritime Transit Risk & Claims Readiness List";
      auditListItems = [
        "Is the Warehouse-to-Warehouse clause explicitly printed in your active cargo certificates?",
        "Do your declared cargo sums match the current CIF plus 10% target asset value?",
        "Are your shipping logs and transport manifests synchronized and backed up automatically to the cloud?",
        "Have you verified whether your transit routes traverse high-risk maritime zones requiring specific premium war overrides?"
      ];
    } else if (activeSection === "liability") {
      title = "Fiduciary Liability & Cyber Risk Advisory Audit";
      colorTheme = "#059669"; // emerald-650

      const rSector = liabilitySector === "software" ? "Software, SaaS & IT Tech" : liabilitySector === "retail_manufacturing" ? "Retail, Factory or Services" : "Not Declared";
      const rRisk = liabilityRisks === "data_ransom" ? "Data Breach / Ransomware Exposure" : liabilityRisks === "premises_harm" ? "Premises Accident / Defects Exposure" : "Not Declared";
      const rBoard = liabilityBoard === "yes_investors" ? "External Board / VC Backed" : liabilityBoard === "single_founder" ? "Bootstrapped / Single Founder" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Corporate Sector Focus:</strong></td><td>${rSector}</td></tr>
        <tr><td><strong>2. Major Risk Concern:</strong></td><td>${rRisk}</td></tr>
        <tr><td><strong>3. Fiduciary Board Setup:</strong></td><td>${rBoard}</td></tr>
      `;

      const isTech = liabilitySector === "software" || liabilityRisks === "data_ransom";
      if (isTech) {
        assessmentRecommendationLabel = "Cyber Security & Data Liability Shield";
        assessmentRecommendationDesc = "Since your enterprise focuses heavily on SaaS code, digital hosting, or processes value records, securing a Cyber Liability Framework is your highest priority. It covers security breach forensic diagnostics, ransom recovery payouts, legally mandated notification costs, and statutory regulatory fines.";
      } else {
        assessmentRecommendationLabel = "Commercial General Liability (CGL) Framework";
        assessmentRecommendationDesc = "For your physical premises, showrooms, or manufacturing lines, standard Commercial General Liability (CGL) is critical. This secures the establishment from third-party bodily injuries (e.g. wet-floor slips) and property claims resulting from defective product batches.";
      }

      if (liabilityBoard === "yes_investors") {
        assessmentAdvisoryRules.push("Directors & Officers (D&O) Cover is strongly recommended. External investors and fiduciary board members require explicit personal asset protections to shield them from management lawsuits.");
      } else {
        assessmentAdvisoryRules.push("No active D&O priority is required. However, we suggest adding a standard 'Severability of Interests' clause to safeguard your partners.");
      }

      if (isTech) {
        assessmentAdvisoryRules.push("Check if client contracts mandate Professional Indemnity (Errors & Omissions) to cover financial damages from system downtime.");
      } else {
        assessmentAdvisoryRules.push("Verify that you have a Commercial Crime & Fidelity Guarantee rider to block internal accounting fraud.");
      }

      auditListTitle = "Corporate Liability Claim Preparedness Checklist";
      auditListItems = [
        "Do you have clear written vendor contracts outlining hold-harmless and indemnity liabilities?",
        "Are retroactive coverage dates preserved correctly when moving your D&O/Cyber policies between underwriters?",
        "Are multi-factor authentication (MFA) and routine server backups documented to maintain Cyber policy compliance?",
        "Is your fidelity control mechanism double-signed by two high-ranking accounting officers to block internal siphoning?"
      ];
    } else if (activeSection === "wc") {
      title = "Employees' Compensation Act Compliance Audit";
      colorTheme = "#0891b2"; // cyan-600

      const wForce = wcWorkforce === "hazardous" ? "Industrial / Hazardous floor" : wcWorkforce === "corporate_office" ? "Desk-Bound & Administrative" : "Not Declared";
      const wSub = wcSubcontractors === "yes_contractors" ? "Hire Temporary Crews / Agencies" : wcSubcontractors === "no_contractors" ? "Direct Regular Staff Only" : "Not Declared";
      const wAdd = wcAddons === "yes_medical" ? "Include Medical Trauma Overrides" : wcAddons === "no_medical" ? "Basic Act Compensation Only" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Workforce Profile:</strong></td><td>${wForce}</td></tr>
        <tr><td><strong>2. Subcontractor Liability:</strong></td><td>${wSub}</td></tr>
        <tr><td><strong>3. Emergency Medical Rider:</strong></td><td>${wAdd}</td></tr>
      `;

      if (wcWorkforce === "hazardous") {
        assessmentRecommendationLabel = "Table A + Table B Combined WC Policy Model";
        assessmentRecommendationDesc = "Since your team handles physical assets, high-power boilers, or warehouse dispatch, choosing Table A (rigid statutory compensation scales under the Act) combined with Table B (Civil Common Law Negligence Liability cover) is critical. This secures the organization from both statutory worker tribunals and unpredictable negligence damage claims.";
      } else {
        assessmentRecommendationLabel = "Table A (Statutory Act) WC Policy Outline";
        assessmentRecommendationDesc = "For corporate offices or administrative teams, keeping Table A Statutory Act coverage is sufficient to meet official legal requirements. This covers statutory schedules for accidental bodily incidents with minimal premium loads.";
      }

      if (wcSubcontractors === "yes_contractors") {
        assessmentAdvisoryRules.push("Under Section 12 of the Indian Employees' Compensation Act, the principal employer is directly liable to clear injured subcontractor wages. Ensure your policy lists a 'Section 12 Contractor Crew Extension' to cover sub-contractor headcounts.");
      } else {
        assessmentAdvisoryRules.push("Direct workforce only. Ensure your declared active muster heads match your digital logs to avoid underinsurance discrepancies.");
      }

      if (wcAddons === "yes_medical") {
        assessmentAdvisoryRules.push("Your selected Accidental Medical Reimbursement rider overrides typical waiting-period constraints, authorizing the insurer to directly clear trauma-surgical hospital bills.");
      } else {
        assessmentAdvisoryRules.push("Observe that employees must rely on personal health files since basic statutory WC excludes standard room boarding costs.");
      }

      auditListTitle = "Workmen's Compensation Compliance Checklist";
      auditListItems = [
        "Do you maintain formal, daily signed muster wage books that document monthly salaries, OT, and bonus structures clearly?",
        "Have all contract-based workers, day laborers, and warehouse sweepers been included under your declared employee count?",
        "Have you set up a robust, 24-hour workspace injury protocol to notify the central help lines instantly?",
        "Are employee workplace addresses, site divisions, and hazardous machine sections accurately declared on the policy schedule?"
      ];
    } else if (activeSection === "gpa") {
      title = "Group Personal Accident (GPA) Policy Blueprint";
      colorTheme = "#ea580c"; // orange-600

      const gRisk = gpaWorkRisk === "high_field" ? "High Field Logistics / Sales" : gpaWorkRisk === "low_desk" ? "Administrative / Desk-Bound" : "Not Declared";
      const gScale = gpaScaleSize === "under_25" ? "Growing SME (Under 25 staff)" : gpaScaleSize === "over_25" ? "Enterprise Team (25+ staff)" : "Not Declared";
      const gRiders = gpaRidersNeeded === "support_all" ? "Full Welfare Support Riders" : gpaRidersNeeded === "death_disability" ? "Core AD, PPD & PTD Tables Only" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Transit & Active Work Risk:</strong></td><td>${gRisk}</td></tr>
        <tr><td><strong>2. Overall Employee Scale:</strong></td><td>${gScale}</td></tr>
        <tr><td><strong>3. Choice of Support Riders:</strong></td><td>${gRiders}</td></tr>
      `;

      if (gpaWorkRisk === "high_field") {
        assessmentRecommendationLabel = "Enhanced GPA Scheme with TTD Weekly Salary Safety";
        assessmentRecommendationDesc = "With field logistics, dispatch transit, or active site hazards, matching your GPA with a Temporary Total Disablement (TTD) endorsement is paramount. If a worker gets bedridden, TTD refunds 1% of their Sum Insured as a weekly salary buffer (up to 104 weeks) to secure household survival costs.";
      } else {
        assessmentRecommendationLabel = "Standard GPA Death & Permanent Disablement Policy";
        assessmentRecommendationDesc = "For remote, clerical desk environments, keeping primary Accidental Death (AD) and Permanent Partial/Total Disablement (PPD/PTD) covers active represents a highly cost-efficient corporate safeguard. This ensures core financial safety nets for all staff families.";
      }

      if (gpaRidersNeeded === "support_all") {
        assessmentAdvisoryRules.push("The Accidental Medical Reimbursement (AMR) rider is active to fund out-of-pocket trauma up to 15-20% Sum Insured.");
        assessmentAdvisoryRules.push("The Child Education rider is included. If fatal events disrupt family breadwinners, the policy clears custom cash sums to support downstream education indices.");
      } else {
        assessmentAdvisoryRules.push("Core Disablement Schedules will be prioritized with zero support add-ons, ensuring a highly optimized, clean base layout with low premium overheads.");
      }

      if (gpaScaleSize === "over_25") {
        assessmentAdvisoryRules.push("Structured enterprise scale: Leverage your headcounts to lock in standard group discounts (typically up to 5-15% discount tiers) with flexible mid-term employee add/deletion terms.");
      } else {
        assessmentAdvisoryRules.push("Smaller team: Direct names must be precisely entered inside the standard policy register to keep claim clearances prompt.");
      }

      auditListTitle = "GPA Corporate Compliance and Claim Mandate Checklist";
      auditListItems = [
        "Are employee names and Nominee percentages recorded accurately to prevent legal heir succession delays?",
        "Is there an official system to report any fatal accident to the claims Desk within the mandatory policy window?",
        "Has the HR team secured certified Post Mortem and Police FIR reports before lodging accidental death claims?",
        "Are employees traveling overseas adequately covered by updating global geographic range riders?"
      ];
    } else if (activeSection === "ghi") {
      title = "Group Health Insurance (GHI) Operational Blueprint";
      colorTheme = "#db2777"; // pink-600

      const hSize = ghiTeamSize === "micro_sme" ? "Startup / SME (Under 15 staff)" : ghiTeamSize === "mid_enterprise" ? "Enterprise Corp (15+ staff)" : "Not Declared";
      const hMat = ghiMaternityScope === "yes_maternity" ? "Critical Maternity & Newborn Cover" : ghiMaternityScope === "no_maternity" ? "Standalone Employees Only" : "Not Declared";
      const hWaiv = ghiClassWaivers === "day_1_waiver" ? "Immediate Day 1 PED Waiver" : ghiClassWaivers === "standard_waiting" ? "Accept Normal Waiting Terms (1-2 years)" : "Not Declared";

      selectionRows = `
        <tr><td><strong>1. Corporate Team Size:</strong></td><td>${hSize}</td></tr>
        <tr><td><strong>2. Family Maternity Focus:</strong></td><td>${hMat}</td></tr>
        <tr><td><strong>3. PED Waiting Periods:</strong></td><td>${hWaiv}</td></tr>
      `;

      if (ghiTeamSize === "mid_enterprise") {
        assessmentRecommendationLabel = "Bespoke Corporate Group Health (GHI) Plan";
        assessmentRecommendationDesc = "With a mature operational headcount of over 15 employees, your enterprise qualifies for tailored underwriting from leading providers. This unlocks direct custom options, like custom single private room limits (or zero capping) and specific co-payment waivers.";
      } else {
        assessmentRecommendationLabel = "Specialty Micro-SME Group Health Care Plan";
        assessmentRecommendationDesc = "For small startups or boutique shops, selecting a standard Micro-SME Group package provides a fantastic premium-efficient model. These plans bundle necessary in-patient covers with simplified digital health card clearances for small teams.";
      }

      if (ghiClassWaivers === "day_1_waiver") {
        assessmentAdvisoryRules.push("Day 1 Pre-Existing Disease (PED) Waiver activated! Traditional 2-4 year waiting-periods are overridden; staff ailments are fully insured from their first hour on rolls.");
      } else {
        assessmentAdvisoryRules.push("Standard Waiting periods apply. Instruct your staff that chronic ailments may require up to 1-2 years before coverage initiates.");
      }

      if (ghiMaternityScope === "yes_maternity") {
        assessmentAdvisoryRules.push("Maternity & Newborn Baby Day 1 Benefit included. Clears delivery fees (Normal up to ₹50k, C-Section up to ₹75k-100k) and shields neonatal incubators instantly.");
      } else {
        assessmentAdvisoryRules.push("Standalone individual cover selected. Maternity and neonatal care are bypassed to optimized base budgets.");
      }

      if (ghiTeamSize === "mid_enterprise") {
        assessmentAdvisoryRules.push("Highly Advised: Allocate a pooled 'Corporate Floater Buffer' (e.g., ₹5 to ₹10 Lakhs) to backstop extreme major ICU claims when employees drain their individual float limits.");
      }

      auditListTitle = "Corporate Health Insurance Operations Checklist";
      auditListItems = [
        "Are newly hired employees and dependents registered on the platform portal within the default 30-day grace window?",
        "Have room rent ceilings (e.g. ₹3,000/day private room limit) been shared clearly to insulate insured staff from co-pay penalties?",
        "Are employees aware of Pre-authorization timelines (typically 48 hours for planned, 24 hours for emergency cases)?",
        "Have health card PDFs or digital mobile apps been shared directly with your distributed factory and operations staff?"
      ];
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BIMA Advisory Report - Raw PDF / Print-Ready Document</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    .badge {
      display: inline-block;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 9999px;
      background-color: ${colorTheme}15;
      color: ${colorTheme};
      margin-bottom: 12px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      letter-spacing: -0.02em;
    }
    h2 {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
      margin: 32px 0 16px 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h3 {
      font-size: 14px;
      font-weight: 700;
      color: #334155;
      margin: 24px 0 12px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    table td {
      padding: 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 13px;
    }
    table td:first-child {
      width: 40%;
      color: #475569;
    }
    .recommendation-box {
      border: 1px solid ${colorTheme}30;
      background-color: ${colorTheme}05;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .recommendation-title {
      font-size: 15px;
      font-weight: bold;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .recommendation-desc {
      font-size: 13px;
      color: #334155;
      margin: 0;
    }
    .rule-list {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    .rule-list li {
      font-size: 13px;
      color: #334155;
      padding: 8px 12px;
      margin-bottom: 8px;
      background-color: #f8fafc;
      border-left: 3px solid ${colorTheme};
      border-radius: 0 4px 4px 0;
    }
    .checklist {
      list-style-type: none;
      padding-left: 0;
    }
    .checklist li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 13px;
      color: #334155;
      margin-bottom: 12px;
    }
    .chk-box {
      width: 16px;
      height: 16px;
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      margin-top: 2px;
      flex-shrink: 0;
    }
    .btn-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #f1f5f9;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background-color: #0f172a;
      color: #ffffff;
      font-size: 13px;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      padding: 10px 18px;
      cursor: pointer;
      text-decoration: none;
    }
    .footer-stamp {
      font-size: 10px;
      font-weight: bold;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    @media print {
      .no-print {
        display: none !important;
      }
      body {
        background-color: #ffffff;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="no-print" style="margin-bottom: 24px; display: flex; justify-content: flex-end;">
      <button class="btn" onclick="window.print()">🖨️ Print to PDF / Save File</button>
    </div>
    
    <div class="header">
      <div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background-color: #1A237E; border-radius: 12px; padding: 4px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 100%; height: 100%;">
          <path d="M 256, 256 m -240, 0 a 240,240 0 1 1 480, 0 a 240,240 0 1 1 -480, 0" fill="#1A237E" />
          <path d="M 256, 256 m -220, 0 a 220,220 0 1 1 440, 0 a 220,220 0 1 1 -440, 0" stroke="#FFD700" stroke-width="4" fill="none" />
          <path d="M 256, 90 C 310, 90 380, 110 380, 110 C 380, 110 400, 260 256, 410 C 112, 260 132, 110 132, 110 C 132, 110 202, 90 256, 90 Z" fill="#283593" stroke="#FFD700" stroke-width="12" stroke-linejoin="round" />
          <path d="M 256, 310 C 230, 285 180, 285 180, 285 L 180, 185 C 180, 185 230, 185 256, 210 Z" fill="#FFFFFF" />
          <path d="M 256, 310 C 282, 285 332, 285 332, 285 L 332, 185 C 332, 185 282, 185 256, 210 Z" fill="#ECEFF1" />
          <path d="M 256, 210 L 256, 312" stroke="#FFD700" stroke-width="6" stroke-linecap="round" />
          <path d="M 195, 215 L 235, 215 M 195, 235 L 235, 235 M 195, 255 L 220, 255" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" />
          <path d="M 277, 215 L 317, 215 M 277, 235 L 317, 235 M 277, 255 L 300, 255" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" />
          <path d="M 256, 310 L 256, 340 L 266, 332 L 276, 340 L 276, 300" fill="#FFC107" />
          <path d="M 175, 145 L 178, 153 L 186, 153 L 180, 158 L 182, 166 L 175, 161 L 168, 166 L 170, 158 L 164, 153 L 172, 153 Z" fill="#FFD700" />
          <path d="M 256, 120 L 259, 128 L 267, 128 L 261, 133 L 263, 141 L 256, 136 L 249, 141 L 251, 133 L 245, 128 L 253, 128 Z" fill="#FFD700" />
          <path d="M 337, 145 L 340, 153 L 348, 153 L 342, 158 L 344, 166 L 337, 161 L 330, 166 L 332, 158 L 326, 153 L 334, 153 Z" fill="#FFD700" />
        </svg>
      </div>
      <div>
        <h1 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2;">BimaCompass: Your Shield in the Fine Print</h1>
        <div style="font-size: 11px; color: #475569; font-weight: 600; margin-top: 3px; line-height: 1.3;">
          Demystifying IRDAI Guidelines • Clear Policies • Smart Scam Shields
        </div>
        <div style="font-size: 11px; color: #0f172a; margin-top: 4px; font-weight: 600;">
          A free to use non profit tool created by <a href="https://www.linkedin.com/in/kalyanjit-naik/" target="_blank" style="color: #059669; text-decoration: underline; font-weight: 700;">Kalyanjit Naik</a>
        </div>
      </div>
    </div>

    <span class="badge">${activeSection.toUpperCase()} Risk Segment</span>
    <h2 style="margin-top: 0; font-size: 15px;">${title}</h2>

    <h3>Client Questionnaire Responses</h3>
    <table>
      <tbody>
        ${selectionRows}
      </tbody>
    </table>

    <h3>Policy Recommendation Summary</h3>
    <div class="recommendation-box">
      <div class="recommendation-title">🎯 Recommended Strategy: ${assessmentRecommendationLabel}</div>
      <p class="recommendation-desc">${assessmentRecommendationDesc}</p>
    </div>

    <h3>Expert Advisory & Endorsement Blueprints</h3>
    <ul class="rule-list">
      ${assessmentAdvisoryRules.map(rule => `<li>${rule}</li>`).join("")}
    </ul>

    <h3>${auditListTitle}</h3>
    <ul class="checklist">
      ${auditListItems.map(item => `
        <li>
          <div class="chk-box"></div>
          <div>${item}</div>
        </li>
      `).join("")}
    </ul>

    <div class="btn-row">
      <div class="footer-stamp">Verbatim Consumer Protection Protocol Sourced from BIMA</div>
      <div style="font-size: 11px; color: #64748b;">Report Generated: ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `BIMA_Consumer_Advocacy_${activeSection.toUpperCase()}_Report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareEmail = () => {
    const sectionNames: Record<HandbookSection, string> = {
      fire: "Fire & Industrial All Risks (IAR)",
      marine: "Marine Cargo & Inland Transit Clauses (ITC)",
      liability: "Professional Indemnity (E&O) & Commercial General Liability",
      wc: "Workmen Compensation (WC Act) Statutory Claims",
      gpa: "Group Personal Accident (GPA) Benefits",
      ghi: "Group Health Insurance (GHI) Scope",
    };

    const sectionName = sectionNames[activeSection] || activeSection;
    const currentUrl = window.location.href;

    const subject = encodeURIComponent(`BIMA Handbook: Reference Section on ${sectionName}`);
    const body = encodeURIComponent(
      `Hi,\n\nI am reviewing the interactive BimaCompass section for "${sectionName}".\n\nYou can access the live handbook and explore key statutory safety clauses, interactive checklists, and risk assessments here:\n${currentUrl}\n\nHope this is helpful!`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6" id="fire-marine-handbook-container">
      {/* Title & Introduction Panel */}
      <div className="border-b border-slate-100 pb-5 space-y-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <BimaIconLogo className="w-12 h-12 hover:scale-105 hover:rotate-1 transition duration-300 drop-shadow-xs shrink-0" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Commercial Lines Handbook
            </h2>
            <p className="text-xs text-slate-550 font-medium font-sans">
              A comprehensive consumer advocacy guide explaining corporate property, cargo logistics, liabilities, and employee benefits (WC, GPA, and GHI) safeguards.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={handleShareEmail}
            className="flex items-center gap-2 px-3.5 py-1.5 md:py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition duration-200 cursor-pointer shadow-3xs hover:shadow-2xs font-sans"
            id="btn-share-email"
          >
            <Mail className="w-4 h-4 text-indigo-650 shrink-0" />
            <span>Share via Email</span>
          </button>
          <button
            onClick={downloadAdvisorySummary}
            className="flex items-center gap-2 px-3.5 py-1.5 md:py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition duration-200 cursor-pointer shadow-3xs hover:shadow-2xs font-sans"
            id="btn-download-advisory"
          >
            <Printer className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Download Summary as PDF</span>
          </button>
        </div>
      </div>

      {/* Switcher Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:flex p-1 bg-slate-100 rounded-xl w-full gap-1" id="handbook-sections-toggle">
        <button
          onClick={() => setActiveSection("fire")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "fire"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Flame className={`w-4 h-4 transition ${activeSection === "fire" ? "text-red-500" : "text-slate-400"}`} />
          <span>🔥 Fire & IAR</span>
        </button>
        <button
          onClick={() => setActiveSection("marine")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "marine"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Anchor className={`w-4 h-4 transition ${activeSection === "marine" ? "text-indigo-600" : "text-slate-400"}`} />
          <span>⚓ Marine Cargo</span>
        </button>
        <button
          onClick={() => setActiveSection("liability")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "liability"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Scale className={`w-4 h-4 transition ${activeSection === "liability" ? "text-emerald-600" : "text-slate-400"}`} />
          <span>⚖️ Liability & Cyber</span>
        </button>
        <button
          onClick={() => setActiveSection("wc")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "wc"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Users className={`w-4 h-4 transition ${activeSection === "wc" ? "text-cyan-600" : "text-slate-400"}`} />
          <span>👷 WC / Employees</span>
        </button>
        <button
          onClick={() => setActiveSection("gpa")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "gpa"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Activity className={`w-4 h-4 transition ${activeSection === "gpa" ? "text-orange-500" : "text-slate-400"}`} />
          <span>🩹 Group Accident (GPA)</span>
        </button>
        <button
          onClick={() => setActiveSection("ghi")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
            activeSection === "ghi"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Heart className={`w-4 h-4 transition ${activeSection === "ghi" ? "text-pink-600" : "text-slate-400"}`} />
          <span>🏥 Group Health (GHI)</span>
        </button>
      </div>

      {/* ACTIVE DISPLAY: Commercial Fire Section */}
      {activeSection === "fire" && (
        <div className="space-y-6 animate-fade-in" id="fire-handbook-content">
          {/* Executive Overview Banner & Sub-Tabs */}
          <div className="bg-gradient-to-r from-red-50/50 via-slate-50 to-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
              <div className="flex gap-3.5 items-start">
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 shrink-0">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-950 text-sm">Commercial Fire & Properties Statutory Handbook</h3>
                  <p className="text-xs text-slate-640 leading-relaxed font-sans font-semibold">
                    Explore standardized coverage frameworks and statutory policy wordings of major Insurers. Learn standard rules for SFSP, BGR, and IAR files.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full uppercase shrink-0">
                100% Insurer Aligned
              </span>
            </div>

            {/* Sub-Tab Selector Navigation */}
            <div className="flex flex-col sm:flex-row gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveFireSubTab("sfsp")}
                type="button"
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  activeFireSubTab === "sfsp"
                    ? "bg-white text-slate-950 shadow-3xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                🏢 Standard Fire (SFSP) Wording
              </button>
              <button
                onClick={() => setActiveFireSubTab("bgr")}
                type="button"
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  activeFireSubTab === "bgr"
                    ? "bg-white text-slate-950 shadow-3xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                🏡 Bharat Griha Raksha (BGR) Terms
              </button>
              <button
                onClick={() => setActiveFireSubTab("iar")}
                type="button"
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                  activeFireSubTab === "iar"
                    ? "bg-white text-slate-950 shadow-3xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                🏭 Industrial All Risks (IAR) Treaty
              </button>
            </div>
          </div>

          {/* Core Dynamic Content Panel */}
          <div className="space-y-4">
            
            {activeFireSubTab === "sfsp" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-3xs animate-fade-in text-left">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-1.5 bg-red-50 text-red-600 rounded-lg shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-950 font-sans">Standard Fire & Special Perils (SFSP) Policy Wording</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Statutory named-perils framework standard across major Insurers for sum insureds up to ₹100 Crores.</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                    The SFSP policy protects property owners, factory operators, and stock holders from exactly twelve broad disasters. Any peril not explicitly listed is omitted from coverage, meaning the Burden of Proof falls on you during a claim to show one of these 12 events occurred:
                  </p>

                  {/* 12 Named Perils Grid */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 border-b border-slate-200 pb-2">
                      <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase tracking-wider block px-1">Detailed Coverage Schedule (Click any peril to explore its meaning):</span>
                      <span className="text-[9px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 uppercase sm:self-center">Interactive Checklist</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] font-medium text-slate-705">
                      {statutoryPerils.map((peril) => {
                        const isActive = activePerilId === peril.id;
                        return (
                          <button
                            key={peril.id}
                            onClick={() => setActivePerilId(peril.id)}
                            type="button"
                            className={`flex items-center gap-1.5 p-2 border rounded-lg text-left transition duration-150 cursor-pointer focus:outline-none w-full ${
                              isActive
                                ? "bg-red-50 border-red-300 text-slate-950 font-bold shadow-3xs"
                                : "bg-white border-slate-150 hover:bg-slate-100 hover:border-slate-300 text-slate-650"
                            }`}
                          >
                            <span className={`font-extrabold text-xs transition duration-150 ${isActive ? "text-red-650 scale-110" : "text-slate-400"}`}>
                              {String(peril.id).padStart(2, "0")}
                            </span>
                            <span className="truncate leading-tight">{peril.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Concise Meaning Panel */}
                    <div className="mt-3 bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-3xs transition-all duration-300">
                      {activePerilId ? (
                        (() => {
                          const peril = statutoryPerils.find((p) => p.id === activePerilId);
                          return peril ? (
                            <div className="space-y-1.5 animate-fade-in text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-red-50 border border-red-100 rounded text-red-700">Peril #{String(peril.id).padStart(2, "0")}</span>
                                <h5 className="font-extrabold text-xs text-slate-905">{peril.name}</h5>
                              </div>
                              <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                                <strong className="text-slate-950 font-bold">Scope of Coverage:</strong> {peril.meaning}
                              </p>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <div className="text-center py-2 text-xs text-slate-400 font-mono italic">
                          💡 Click any of the 12 statutory perils above to see its precise legal scope and meaning under Fire Insurance policies...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50/40 border border-red-100 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] font-mono font-extrabold text-red-900 uppercase tracking-widest block">Standard Exclusions (Wording of Insurers):</span>
                      <ul className="text-[11px] text-slate-650 space-y-1 list-disc list-inside font-sans leading-normal font-medium">
                        <li>Cold storage deterioration caused by ambient temperature changes.</li>
                        <li>Spontaneous fermentation, natural heating or combustion of stocks.</li>
                        <li>Internal electrical burnout, short-circuits, or arcing within the machine itself.</li>
                        <li>Theft or burglary of merchandise during or immediately after a fire.</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] font-mono font-extrabold text-slate-800 uppercase tracking-widest block">Advocacy Advice:</span>
                      <p className="text-[11px] text-slate-600 font-sans leading-relaxed font-medium">
                        SFSP policies suffer from the strict application of the <strong className="text-slate-900 font-semibold">Underinsurance Penalty (Average Clause)</strong>. Insurers will cut partial payouts if properties are found undervalued at the time of fire. Always add the <strong className="text-slate-850 font-extrabold">Reinstatement Value Clause (RVC)</strong> to claim fresh factory machine values instead of heavily depreciated scrap values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFireSubTab === "bgr" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-3xs animate-fade-in text-left">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-950 font-sans">Bharat Griha Raksha (BGR) Standard Terms</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Consumer-friendly residential and home contents wording implemented under regulatory mandate by leading Insurers.</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                    The Bharat Griha Raksha policy represents a historical consumer-protection rewrite of property insurance rules in India. Aligned with filings from major Insurers (such as private, national, and joint-venture Insurers), it removes many hidden exclusions that used to entrap retail buyers.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* BGR Special Advantages */}
                    <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-4 space-y-2.5">
                      <span className="text-[10px] font-mono font-extrabold text-emerald-920 uppercase tracking-widest block">🔑 Key Consumer Safeguards In BGR Policy:</span>
                      <div className="space-y-3 text-[11px] font-sans font-medium">
                        <div>
                          <strong className="text-emerald-950 block font-bold">1. 100% Waiver of Underinsurance:</strong>
                          <p className="text-slate-600 mt-0.5 font-normal leading-relaxed">
                            Under BGR standardized policy wording, underinsurance penalties are <strong className="text-emerald-800 font-bold">never applied</strong>. If your home is insured for slightly less than its true valuation, the Insurer is bound to pay the actual damages up to the Sum Insured without shaving off any percentages.
                          </p>
                        </div>
                        <div>
                          <strong className="text-emerald-950 block font-bold">2. Automatic Home Contents Security:</strong>
                          <p className="text-slate-600 mt-0.5 font-normal leading-relaxed">
                            Standard BGR policies automatically expand to cover household furniture, appliances, and clothes up to <strong className="text-emerald-800 font-bold">10% of the building sum insured</strong> (capping at ₹10 Lakhs) on a first-loss basis, without demanding complex asset declarations.
                          </p>
                        </div>
                        <div>
                          <strong className="text-emerald-950 block font-bold">3. Relocation Rent Support:</strong>
                          <p className="text-slate-600 mt-0.5 font-normal leading-relaxed">
                            Pays up to ₹50,000 per month for up to 30 days to cover alternate housing rent or emergency transit when a major fire or flood leaves the principal home structure unsafe.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Exclusions and Scope */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-mono font-extrabold text-slate-800 uppercase tracking-widest block">Covered Natural Events:</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium">
                          BGR provides robust protection for the home structure against wildfires, earthquakes, volcanic eruptions, hurricane forces, tsunamis, land subsiding, landslides, burst conduits, sewer backup floods, and standard rioting damage.
                        </p>
                      </div>

                      <div className="bg-slate-100/50 border border-slate-150 rounded-lg p-3 text-[11px] text-slate-500 font-sans space-y-1.5 text-left">
                        <strong className="text-slate-800 block text-[10px] uppercase font-mono font-extrabold">Standard Exclusions in BGR:</strong>
                        <ul className="list-disc list-inside space-y-0.5 leading-snug font-medium">
                          <li>Precious gems, high-value art, or silver blocks above statutory limits unless custom values are locked.</li>
                          <li>Cracks or structural collapse due to normal building settlement, foundation alignment, or slow wear-and-tear.</li>
                          <li>Loss or damage caused by war, chemical fallout, or severe state-enforced evacuations.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFireSubTab === "iar" && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-3xs animate-fade-in text-left" id="iar-handbook-content">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-1.5 bg-slate-900 text-slate-200 rounded-lg shrink-0">
                    <Layers className="w-4 h-4 text-red-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-950 font-sans">Industrial All Risks (IAR) Corporate Treaty</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Highly integrated corporate multi-perils policy mandatory for properties where static asset exposure exceeds ₹100 Crores.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                    Unlike the named-perils limits of standard fire (SFSP), the IAR policy wording operates on an <strong className="text-slate-900 font-bold">All-Risks Basis</strong>. If a sudden property damage occurs and it is not explicitly listed in the exclusion clause, the Insurer is legally required to resolve the claim.
                  </p>

                  {/* Interactive IAR Provisions Explorer */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 border-b border-slate-200 pb-2">
                      <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase tracking-wider block px-1">Detailed Technical Clauses (Click any clause to explore):</span>
                      <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-100 uppercase sm:self-center">Interactive Handbook</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] font-medium text-slate-705">
                      {iarProvisions.map((provision) => {
                        const isActive = activeIarProvisionId === provision.id;
                        return (
                          <button
                            key={provision.id}
                            onClick={() => setActiveIarProvisionId(provision.id)}
                            type="button"
                            className={`flex items-center gap-1.5 p-2 border rounded-lg text-left transition duration-155 cursor-pointer focus:outline-none w-full ${
                              isActive
                                ? "bg-slate-900 border-slate-950 text-white font-bold shadow-3xs"
                                : "bg-white border-slate-150 hover:bg-slate-100 hover:border-slate-300 text-slate-650"
                            }`}
                          >
                            <span className={`font-extrabold text-xs transition duration-150 ${isActive ? "text-red-500 scale-110" : "text-slate-400"}`}>
                              {String(provision.id).padStart(2, "0")}
                            </span>
                            <span className="truncate leading-tight">{provision.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed Meaning Display */}
                    <div className="mt-3 bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-3xs transition-all duration-300">
                      {activeIarProvisionId ? (
                        (() => {
                          const provision = iarProvisions.find((p) => p.id === activeIarProvisionId);
                          return provision ? (
                            <div className="space-y-1.5 animate-fade-in text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700">Provision #{String(provision.id).padStart(2, "0")}</span>
                                <h5 className="font-extrabold text-xs text-slate-905">{provision.name}</h5>
                              </div>
                              <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                                <strong className="text-slate-950 font-bold">Standard Policy Scope:</strong> {provision.meaning}
                              </p>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <div className="text-center py-2 text-xs text-slate-400 font-mono italic flex items-center justify-center gap-1">
                          💡 Click any of the corporate IAR provisions above to explore its precise policy wording, exclusions, and statutory meanings...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary / Exclusions footer */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-slate-650 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-medium">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-950 block">Standard Comprehensive Deductible</span>
                      <p className="text-[11px] text-slate-500 leading-normal">Typically 5% of each and every claim subject to a minimum of ₹5 Lakhs under general reinsurance guidelines.</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 text-red-800 text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider shrink-0">
                      High Retention Risk
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Crucial Technical Principles Card */}
          <div className="bg-amber-50/45 border border-amber-250 rounded-2xl p-5 space-y-4 text-left">
            <h4 className="text-xs font-extrabold text-amber-950 tracking-wider uppercase flex items-center gap-1.5 font-sans">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0" />
              Do Not Skip: Crucial Principles in Fire Insurance Legal Wording
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
              
              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">1. Reinstatement Clause (New for Old)</span>
                <p className="text-slate-600 leading-normal font-normal">
                  A standard policy gives you 'Indemnity basis'—meaning the Insurer takes away large sums for depreciation or wear-and-tear in claims. Ensure your agent adds a <strong className="text-slate-800">Reinstatement Value Clause (RVC)</strong>. This forces the Insurer to replace physical plant/machinery with brand-new equivalents without subtracting usage age.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">2. Underinsurance Penalty Clause</span>
                <p className="text-slate-600 leading-normal font-normal">
                  If your commercial structure is worth ₹10 Crore, but you insure it for ₹5 Crore to cut premium costs: you have violated the statutory code. If a partial fire ruins only ₹2 Crore of assets, the Insurer will apply a ratable reduction and pay you only ₹1 Crore! Value assets honestly to secure full payouts (Waiver up to 15% is standard under certain IAR conditions; fully waived under BGR).
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">3. Terrorism Pool Exclusion Overrides</span>
                <p className="text-slate-600 leading-normal font-normal">
                  Standard corporate fire policies globally exclude any physical damage caused directly by terrorism, armed riots, or political sabotage. Check your policy document for the <strong className="text-slate-800">Terrorism Pool Buyback Clause</strong>. Opting-in deposits funds to the Indian National Pool to reinstate full terror protection from your Insurers.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Checklist for Small Businesses */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-sm text-left animate-fade-in">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              Small Business Fire Claim Readiness Audit List
            </h4>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-slate-350 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Are stock registers logged daily and saved to an off-site digital cloud server? (Physical registers kept in a matching cabinet easily turn to ashes, making it impossible for Insurers to verify claims)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Does the policy sum match the absolute current replacement value of physical machines (excluding land value)?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Is your business interruption compensation window set to at least 6-12 months with your Insurers?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Do you have fully updated fire safety NOC certifications and sprinkler audits? (Lack of compliance makes rejection easy)</span>
              </li>
            </ul>
          </div>

          {/* Interactive Fire Questionnaire */}
          <div className="bg-radial from-slate-50 to-red-50/20 border border-red-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs animate-fade-in" id="fire-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-red-50 text-red-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  🔥 Fire & IAR Policy Matcher Questionnaire
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Define your physical architecture, operational safety gaps, and inventory cycles to match with the ideal statutory Fire framework.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Asset Replacement Value */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Overall Asset Valuation
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setFireAssetValue("under_100")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireAssetValue === "under_100"
                        ? "border-red-600 bg-red-50/40 text-slate-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏢 Under ₹100 Crores</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Small & Medium Enterprise (SME) factories or offices</div>
                  </button>
                  <button
                    onClick={() => setFireAssetValue("over_100")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireAssetValue === "over_100"
                        ? "border-red-600 bg-red-50/40 text-slate-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏭 Over ₹100 Crores</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Large-scale industrial blocks or large corporations</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Business Interruption */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Downtime Exposure
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setFireInterruption("critical")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireInterruption === "critical"
                        ? "border-red-600 bg-red-50/40 text-slate-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">⚡ Critical Downtime Risk</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Long closures will completely dry out profits & key clients</div>
                  </button>
                  <button
                    onClick={() => setFireInterruption("not_critical")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireInterruption === "not_critical"
                        ? "border-red-600 bg-red-50/40 text-slate-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">☕ Minimal / Manageable</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Operations are highly agile or can resume remotely</div>
                  </button>
                </div>
              </div>

              {/* Question 3: Stock Fluctuation */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  3. Stock & Inventory Profile
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setFireStockFluctuation("fluctuating")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireStockFluctuation === "fluctuating"
                        ? "border-red-600 bg-red-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">📈 Peaks & Seasonal Cycles</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Warehouse holdings vary significantly month-by-month</div>
                  </button>
                  <button
                    onClick={() => setFireStockFluctuation("steady")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      fireStockFluctuation === "steady"
                        ? "border-red-600 bg-red-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">⚖️ Stable & Constant</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Static, predictable raw material and appliance reserves</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {fireAssetValue && fireInterruption && fireStockFluctuation ? (
              (() => {
                let recommendation = null;
                const isIAR = fireAssetValue === "over_100";
                
                if (isIAR) {
                  recommendation = {
                    title: "Industrial All Risks (IAR) Treaty",
                    desc: "With commercial assets exceeding ₹100 Crores, you are legally eligible for a comprehensive corporate Industrial All Risks package. Unlike the standard named-perils SFSP model, this binds all physical losses, boiler breakdown expenses, and business interruptions into a single sovereign sheet.",
                    badge: "All-Risks Treaty",
                    color: "border-red-150 bg-red-50/40 text-slate-950",
                    badgeColor: "bg-red-100 text-red-900"
                  };
                } else {
                  recommendation = {
                    title: "Standard Fire & Special Perils (SFSP) Policy",
                    desc: "For SME physical offices and warehousing assets worth under ₹100 Crores, a Standard Fire & Special Perils (SFSP) policy is the appropriate market choice. It protects you against exactly twelve named perils (lightning, standard structural fires, floods, burst water conduits, and landslides).",
                    badge: "Statutory Named Perils",
                    color: "border-slate-205 bg-slate-50 text-slate-950",
                    badgeColor: "bg-slate-200 text-slate-800"
                  };
                }

                // Append interruption advice 
                let adviceClauses = [];
                if (fireInterruption === "critical") {
                  adviceClauses.push("Add a Consequential Loss (Fire Loss of Profits) rider to pay out standing salaries and rent indices while machines are rebuilt.");
                } else {
                  adviceClauses.push("Minimal Business Interruption coverage needed, focusing core premiums on hardware asset replacement.");
                }

                // Append inventory advice
                if (fireStockFluctuation === "fluctuating") {
                  adviceClauses.push("Equip your plan with a Stock Declaration Clause to pay dynamic, flexible premiums matching exact monthly warehousing levels.");
                } else {
                  adviceClauses.push("Opt for standard Fixed Sum Insured terms since your raw materials stay highly constant.");
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${recommendation.color} space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-red-100/40">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Policy Structure</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
                          🛡️ {recommendation.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${recommendation.badgeColor}`}>
                        {recommendation.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-700 font-medium font-sans">
                      {recommendation.desc}
                    </p>

                    <div className="space-y-2 border-t border-red-100/30 pt-3">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Endorsement & Advisory Blueprints:</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-655 font-medium leading-relaxed font-sans">
                        {adviceClauses.map((clause, idx) => (
                          <li key={idx}><strong className="text-slate-850">Advice:</strong> {clause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500 font-sans">
                      <div className="flex items-center gap-1">
                        <span>💡 Verification Tips:</span>
                        <span className="text-slate-705">Make sure to lock in the <strong className="font-semibold text-slate-900">Reinstatement Value Clause (RVC)</strong>.</span>
                      </div>
                      <button
                        onClick={() => {
                          setFireAssetValue("");
                          setFireInterruption("");
                          setFireStockFluctuation("");
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6 font-sans">
                ✨ Answer all three property characteristics above to generate your custom Fire & IAR policy audit report instantly!
              </div>
            )}

          </div>

        </div>
      )}

      {/* ACTIVE DISPLAY: Marine Transit Section */}
      {activeSection === "marine" && (
        <div className="space-y-6 animate-fade-in" id="marine-handbook-content">
          
          {/* Executive Overview Banner */}
          <div className="bg-radial from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shrink-0">
              <Anchor className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-950 text-sm">Understanding Marine Cargo & Logistics Rules</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether you ship goods across state borders inside India by road, rail, or air, or transfer international containers on oceans worldwide, <strong className="text-slate-950 font-semibold font-sans">Marine Cargo Insurance</strong> protects products in transit against physical wreck, structural crushing, water-logging, or hijackings. Marine transit operates under an extremely ancient international treaty model.
              </p>
            </div>
          </div>

          {/* Marine Policy Structures Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono">
              The Three Core Forms of Marine Policies
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Form 1: Marine Open Policy */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-305 transition shadow-3xs">
                <span className="text-[10px] bg-indigo-50 text-indigo-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">
                  Continuous (Domestic)
                </span>
                <h5 className="font-bold text-xs text-slate-950">Marine Open Policy</h5>
                <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                  Sourced frequently from standard packages of general insurers, this is a continuous 12-month agreement covering frequent domestic transits. You make an upfront deposit based on your estimated annual logistics volume, and as cargo travels, you log daily declarations which deduct automatically from your deposit balance.
                </p>
              </div>

              {/* Form 2: Marine Open Cover Agreement */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-305 transition shadow-3xs">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">
                  TREATY (Import & Export)
                </span>
                <h5 className="font-bold text-xs text-slate-950">Open Cover Agreement</h5>
                <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                  Commonly downloaded from general insurers, this treaty includes no static "sum insured" limit, but represents a commitment where the insurer legally agrees to cover all international shipments of the trader at locked-in, pre-determined premium rates for a whole year.
                </p>
              </div>

              {/* Form 3: Voyage Policy (Specific) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-305 transition shadow-3xs">
                <span className="text-[10px] bg-red-50 text-red-850 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">
                  Single Voyage
                </span>
                <h5 className="font-bold text-xs text-slate-950">Specific Voyage Cover</h5>
                <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                  A single-use package. Perfect for micro-businesses transit needs. It covers a specific shipment journey from Point A to Point B (e.g., shipping machinery from Mumbai to Singapore port). The coverage dissolves the second the cargo box reaches its designated destination.
                </p>
              </div>

            </div>
          </div>

          {/* Under the Hood: Institute Cargo Clauses (ICC) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-3 shadow-3xs">
            <h4 className="text-xs font-extrabold text-indigo-900 tracking-wider uppercase font-mono">
              The Three Standard Institute Cargo Clauses (ICC-A, B, C)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed pb-2 border-b border-slate-100">
              Logistics insurance globally is indexed with letters created by the International Underwriting Association. They define exactly how "all-risk" or "named-peril" your cover is:
            </p>

            <div className="space-y-4 pt-3">
              
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-[10px] font-extrabold font-mono shrink-0">
                  ICC CLASS A
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-950 block">"All Risks" Premium Coverage Framework</span>
                  <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                    This provides the comprehensive blanket possible. It covers any sudden accidental damage, drops, collisions, fire, theft, or ship sinks, except for specific standard world-class exclusions (such as sending perishable foods in an un-refrigerated crate or structural damage from standard war). Highly recommended for high-value machinery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md text-[10px] font-extrabold font-mono shrink-0 font-sans">
                  ICC CLASS B
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-950 block">Intermediate Named Hazards Coverage</span>
                  <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                    Covers all risk clauses found under Class C, but adds protections for natural disasters like earthquakes, volcanic eruptions, lightning strikes, getting washed overboard by massive sea waves, or sea water entering the container.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-100 text-red-800 px-2.5 py-1 rounded-md text-[10px] font-extrabold font-mono shrink-0">
                  ICC CLASS C
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-950 block">Basic Minimum Catastrophe Coverage</span>
                  <p className="text-[11px] text-slate-550 leading-relaxed font-normal">
                    The cheapest, highly restrictive cargo cover. It shields your merchandise from absolute catastrophes only, such as cargo vessel sinking, fire/explosion, ship grounding on a reef, collision, or jettison (pitching stock overboard to save a tilting ship).
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* New Segment: Indian Inland Transit Clauses (ITC) & Risk Ownership Blueprint */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs" id="marine-itc-risk-blueprint">
            <div className="border-b border-indigo-100 pb-3">
              <span className="text-[10px] bg-indigo-50 text-indigo-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                Regulatory Reference Guide
              </span>
              <h4 className="text-sm font-extrabold text-slate-950 mt-1.5 font-sans">
                Inland Transit Clauses (ITC) & Risk Ownership Blueprint
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                For domestic logistics within India (road, rail, air), standard cargo policies reference the legal frameworks established under <strong className="font-semibold text-slate-800 font-sans">Inland Transit Clauses (ITC)</strong>. Review coverage sub-types paired with legal guidelines surrounding transfer points and claimant burden of proof.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Column 1: ITC Terminology & Coverage Classes */}
              <div className="space-y-4" id="itc-terminology-column">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-5 h-5 rounded bg-indigo-50 border border-indigo-100 text-indigo-750 flex items-center justify-center font-bold text-xs">
                    T
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 font-sans uppercase tracking-wider">
                    ITC Standard Terminology & Classes
                  </h5>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-50/20 transition duration-150 relative">
                    <span className="absolute top-3.5 right-3.5 text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded font-mono">
                      ALL RISKS
                    </span>
                    <h6 className="font-bold text-xs text-slate-950">Inland Transit Clause A (ITC-A)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-sans font-normal">
                      The default comprehensive standard for inland transport. It covers **all risks** of physical loss or damage to the cargo during overland transit (road/rail), save for specific standard statutory exclusions such as:
                    </p>
                    <ul className="list-disc pl-4 text-[10px] text-slate-500 space-y-1 mt-1 font-mono">
                      <li>Inherent vice of goods (decay, leakage, condensation)</li>
                      <li>Insufficiency or unsuitability of packing or preparation</li>
                      <li>Deliberate damage or willful misconduct by the insured</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-50/20 transition duration-150 relative">
                    <span className="absolute top-3.5 right-3.5 text-[9px] bg-amber-100/80 text-amber-800 font-extrabold px-1.5 py-0.5 rounded font-mono">
                      NAMED PERILS
                    </span>
                    <h6 className="font-bold text-xs text-slate-950">Inland Transit Clause B (ITC-B)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-sans font-normal">
                      An intermediate named-perils package. Covers damage or physical destruction directly caused by:
                    </p>
                    <ul className="list-disc pl-4 text-[10px] text-slate-500 space-y-1 mt-1 font-sans font-medium">
                      <li>Fire, lightning, and explosion</li>
                      <li>Overturning or derailment of the land conveyance</li>
                      <li>Bridge collapses, landslides, or falling objects damaging the truck</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-50/20 transition duration-150 relative">
                    <span className="absolute top-3.5 right-3.5 text-[9px] bg-red-100 text-red-800 font-extrabold px-1.5 py-0.5 rounded font-mono">
                      RESTRICTED
                    </span>
                    <h6 className="font-bold text-xs text-slate-950">Inland Transit Clause C (ITC-C)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-sans font-normal">
                      The cheapest, highly restrictive tier. Coverage is exclusively locked to direct vehicle catastrophes:
                    </p>
                    <ul className="list-disc pl-4 text-[10px] text-slate-500 space-y-1 mt-1 font-mono">
                      <li>Fire or explosion only (while the vehicle is on route)</li>
                      <li>Major collision of the transport carrying vehicle</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 2: Onus of Risk & Transfer of Risk */}
              <div className="space-y-4" id="itc-risk-ownership-column">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-5 h-5 rounded bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    ⚖️
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 font-sans uppercase tracking-wider">
                    Onus of Risk & Transfer Mechanics
                  </h5>
                </div>

                <div className="space-y-4">
                  
                  {/* Aspect A: Onus of Risk (Burden of Proof) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-950">
                      <span className="w-2 h-2 rounded-full bg-indigo-650 shrink-0"></span>
                      <h6>Onus of Risk (Claim Burden of Proof)</h6>
                    </div>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-sans font-normal">
                      Who carries the burden of proving why or how the damage was sustained when filing an insurance claim? It changes entirely based on your chosen ITC tier:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="bg-white border border-slate-150 rounded-lg p-2.5 space-y-1">
                        <span className="text-[9px] font-extrabold text-blue-700 block uppercase font-mono">Under ITC-A (All-Risks)</span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          <strong className="text-slate-800">Onus rests on the Insurer</strong>. The company must prove that an exclusion applies (eg: bad packing) to deny a claim.
                        </p>
                      </div>
                      <div className="bg-white border border-slate-150 rounded-lg p-2.5 space-y-1">
                        <span className="text-[9px] font-extrabold text-amber-700 block uppercase font-mono">Under ITC-B or C</span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          <strong className="text-slate-800">Onus rests on the Claimant</strong>. The policyholder must physically prove damage was directly caused by a listed named-peril.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Aspect B: Transfer of Risk (Incoterms Alignment) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-950">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                      <h6>Transfer of Risk (Incoterms & Sale of Goods Act)</h6>
                    </div>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-sans font-normal">
                      Transfer of Risk refers to the precise moment responsibility for loss passes from the Seller to the Buyer. When trading, policy placement must match commercial Incoterms:
                    </p>

                    <div className="space-y-2 pt-1 font-sans">
                      <div className="bg-white border border-slate-150 rounded-lg p-2.5 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-900 block font-sans">1. FOB (Free On Board)</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Risk transfers to the buyer as soon as the goods cross the ship's rail. Seller must insure the overland journey up to port; buyer handles ocean transit.
                          </p>
                        </div>
                        <span className="text-[9px] bg-indigo-50 text-indigo-800 font-extrabold px-1.5 py-0.5 rounded font-mono shrink-0">FOB</span>
                      </div>

                      <div className="bg-white border border-slate-150 rounded-lg p-2.5 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-900 block font-sans">2. CIF (Cost, Insurance & Freight)</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Seller covers ocean freight and marine cargo policy premiums up to the destination port, protecting the buyers' assets during shipment.
                          </p>
                        </div>
                        <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded font-mono shrink-0">CIF</span>
                      </div>

                      <div className="bg-white border border-slate-150 rounded-lg p-2.5 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-900 block font-sans">3. EXW (Ex Works)</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Risk passes fully to the buyer the split second the goods are made available at the seller's warehouse loading bay. Buyer carries entire transit liability.
                          </p>
                        </div>
                        <span className="text-[9px] bg-slate-100 text-slate-800 font-extrabold px-1.5 py-0.5 rounded font-mono shrink-0">EXW</span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Statutory Marine Add-ons & General Average */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Marine Door to Door Duration Rule */}
            <div className="bg-indigo-50/50 border border-indigo-205/60 rounded-xl p-4.5 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Warehouse-to-Warehouse Transit Clause</span>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-normal">
                Does your policy end when the cargo lands at the port dock? Without this clause, yes! Incorporate a <strong className="text-slate-800">Warehouse-to-Warehouse Directive</strong> to ensure that your goods are fully insured from the moment the container leaves your factory loading dock, overland to the port, across ocean lanes, and onto delivery trucks until final drop-off at the buyer's destination or up to 60 days post-discharge.
              </p>
            </div>

            {/* Seller Interest Safeguard */}
            <div className="bg-indigo-50/50 border border-indigo-205/60 rounded-xl p-4.5 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Seller's Interest & Duty Tax Clauses</span>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-normal">
                If trading FOB, the foreign buyer's insurance covers the ocean journey. But if they refuse to accept the goods or default mid-voyage, you may find your container floating in international waters without any protection. The <strong className="text-slate-850">Seller's Interest Endorsement</strong> automatically triggers your local marine coverage in such emergencies to keep your financial balance fully insulated.
              </p>
            </div>

          </div>

          {/* Interactive Questionnaire */}
          <div className="bg-radial from-slate-50 to-indigo-50/30 border border-indigo-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs" id="marine-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-indigo-50 text-indigo-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  ⚓ Cargo Policy Matcher Questionnaire
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Identify which standard marine policy format (Open Policy, Open Cover, or Specific Voyage) aligns best with your actual logistics volume and patterns.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Shipping Frequency */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Shipping Frequency
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setMarineFrequency("regular")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineFrequency === "regular"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🔄 Regular</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Continuous & recurring shipments</div>
                  </button>
                  <button
                    onClick={() => setMarineFrequency("occasional")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineFrequency === "occasional"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">⏱️ Occasional</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Single-time or very rare voyages</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Geography */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Transit Geography
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setMarineGeography("domestic")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineGeography === "domestic"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🇮🇳 Domestic (In India)</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Overland by Trucks, Rail or domestic Air</div>
                  </button>
                  <button
                    onClick={() => setMarineGeography("international")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineGeography === "international"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🌐 International</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Imports & Exports across oceans or air lanes</div>
                  </button>
                </div>
              </div>

              {/* Question 3: Goods Type */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  3. Type of Goods
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setMarineGoodsType("standard")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineGoodsType === "standard"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">📦 Standard Merchandise</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Commodities, raw items, packaged retail</div>
                  </button>
                  <button
                    onClick={() => setMarineGoodsType("highvalue")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      marineGoodsType === "highvalue"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">⚙️ Project Cargo / High Value</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Heavy industrial plant machinery or tech</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {marineFrequency && marineGeography && marineGoodsType ? (
              (() => {
                let recommendation = null;
                if (marineFrequency === "occasional") {
                  recommendation = {
                    title: "Specific Voyage Policy",
                    desc: "Since you only run single-time or occasional shipments, an individual Specific Voyage Policy is the most suitable, premium-efficient choice for your profile. Each policy protects a defined journey from Point A to Point B and terminates immediately upon final delivery, keeping overheads strictly aligned with real individual shipments.",
                    badge: "Single Voyage",
                    color: "border-rose-150 bg-rose-50/30 text-rose-950",
                    badgeColor: "bg-rose-100 text-rose-900"
                  };
                } else if (marineFrequency === "regular" && marineGeography === "domestic") {
                  recommendation = {
                    title: "Marine Open Policy",
                    desc: "For frequent, regular shipments within India (domestic overland/air/rail transit), a 12-month domestic Marine Open Policy is perfect. It works via standard upfront dynamic deposits which automatically deduct daily shipment declarations, radically reducing individual certification burdens and admin friction.",
                    badge: "Continuous Domestic",
                    color: "border-indigo-150 bg-indigo-50/40 text-indigo-950",
                    badgeColor: "bg-indigo-100/70 text-indigo-900"
                  };
                } else {
                  recommendation = {
                    title: "Open Cover Agreement",
                    desc: "For recurring international import & export flows, an Open Cover Agreement is the correct market answer. It acts as a long-term contract agreement (treaty) in which the insurer legally agrees to cover all overseas shipments throughout the contract year at predetermined locked-in premium rates with no static sum-insured restricts.",
                    badge: "Treaty Import & Export",
                    color: "border-emerald-150 bg-emerald-50/40 text-emerald-950",
                    badgeColor: "bg-emerald-100 text-emerald-900"
                  };
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${recommendation.color} space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-indigo-100/40">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Policy Structure</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
                          🛡️ {recommendation.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${recommendation.badgeColor}`}>
                        {recommendation.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-700 font-medium">
                      {recommendation.desc}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500">
                      <div className="flex items-center gap-1">
                        <span>🔍 Advice:</span>
                        <span className="text-slate-705">Ensure to embed the <strong className="font-semibold text-slate-900">Warehouse-to-Warehouse</strong> clause to cover ground transit loops.</span>
                      </div>
                      <button
                        onClick={() => {
                          setMarineFrequency("");
                          setMarineGeography("");
                          setMarineGoodsType("");
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6">
                ✨ Answer all three transit profile characteristics above to generate your policy recommendation instantly!
              </div>
            )}

          </div>

          {/* Ancient Marine Factbox */}
          <div className="bg-slate-150 border border-slate-205 rounded-xl p-4 text-[11px] text-slate-600 leading-relaxed">
            🌿 <strong className="text-slate-905 font-bold">Important Statutory Concept - General Average:</strong> An ancient maritime law ruling that if a ship is in distress (e.g. stranded) and the captain intentionally throws cargo overboard or incurs salvage costs to save the vessel and live crews, <strong className="text-slate-800">all cargo owners legally fraction the salvage cost</strong> proportional to their cargo value. Marine cargo insurance protects you from paying these severe joint-liability charges out of pocket.
          </div>

        </div>
      )}

      {/* ACTIVE DISPLAY: Liability Section */}
      {activeSection === "liability" && (
        <div className="space-y-6 animate-fade-in" id="liability-handbook-content">
          
          {/* Executive Overview Banner */}
          <div className="bg-radial from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 shrink-0">
              <Scale className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-950 text-sm">Understanding Commercial Liability & Board Safeguards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corporate risk mitigation goes beyond physical property. Sourced from standard public templates under a free-use advocacy model, these chapters break down how commercial liability policies insulate modern enterprises, executive directors, and operations from catastrophic legal defense costs, regulatory investigations, and third-party damages.
              </p>
            </div>
          </div>

          {/* Core Types Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono">
              The Four Core Pillars of Liability Insurance
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1: CGL */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono text-[9px] font-bold">1</div>
                  <h5 className="font-bold text-xs text-slate-900">Commercial General Liability (CGL)</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  The fundamental standard of business safety. It protects against standard third-party risks like <strong className="text-slate-800">public liability</strong> (e.g., a client slipping on your wet office floor and breaking a limb) and <strong className="text-slate-800">product liability</strong> (e.g., a manufactured consumer batch causing bodily illness or property damage to buyers).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  ⚖️ Sourced from public liability modules covering premises and products.
                </div>
              </div>

              {/* Pillar 2: Cyber Liability Shield */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono text-[9px] font-bold">2</div>
                  <h5 className="font-bold text-xs text-slate-900">Cyber Liability & Data Protection</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Essential for modern digital, cloud, or SaaS systems. Sourced from standard public liability guidelines, this protects you against ransom demands, server breach diagnostics, forensic investigations, notification costs to affected users, and regulatory regulatory fines following a security setback.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  💻 Sourced from modern technical breach blueprints.
                </div>
              </div>

              {/* Pillar 3: Directors & Officers (D&O) */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono text-[9px] font-bold">3</div>
                  <h5 className="font-bold text-xs text-slate-900">Directors & Officers (D&O) Policy</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  The corporate governance armor. Sourced from standard executive risk chapters, D&O protects the personal inheritance and assets of your advisory board, CEO, and managers from lawsuits filed by shareholders, regulatory bodies, competitors, or creditors alleging mismanagement or fiduciary omissions.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  👔 Sourced from standard corporate executive protection schedules.
                </div>
              </div>

              {/* Pillar 4: Commercial Crime / Fidelity */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono text-[9px] font-bold">4</div>
                  <h5 className="font-bold text-xs text-slate-900">Commercial Crime & Fidelity Coverage</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Insulates you from financial fraud and inventory leaks caused by inside actors. It covers <strong className="text-slate-800">employee criminality</strong> (such as wire transfers redirected to rogue accounts, corporate embezzlement, physical inventory siphoning, forge check fraud, or counterfeit security intrusions).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  🔍 Sourced from public fidelity and commercial sabotage templates.
                </div>
              </div>

            </div>
          </div>

          {/* Crucial Technical Principles Card */}
          <div className="bg-amber-50/40 border border-amber-205 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase flex items-center gap-1.5 font-sans">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0" />
              Do Not Skip: Crucial Principles in liability Claims and Triggers
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
              
              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">1. Claims-Made vs. Occurrence Trigger</span>
                <p className="text-slate-600 leading-normal font-normal">
                  Standard CGL policies work on an <strong className="text-slate-800">"Occurrence" basis</strong> (events occurring during active coverage are covered forever, regardless of when the suit starts). D&O and Cyber operate under a strict <strong className="text-slate-800">"Claims-Made" trigger</strong>: the claim must be officially brought against the company *and* reported to the insurer while the policy remains actively in force.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">2. Duty to Defend Provision</span>
                <p className="text-slate-600 leading-normal font-normal">
                  In massive liability lawsuits, the lawyer fees and court-related depositions can easily drain accounts faster than any eventual settlement. Check if your package has a robust <strong className="text-slate-800">"Duty to Defend" clause</strong>, wherein the insurer directly arranges, controls, and pays for your legal counsel up to the limit of coverage.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">3. Severability of Interests Clause</span>
                <p className="text-slate-600 leading-normal font-normal">
                  If one rogue director commits intentional fraud or breaks corporate bylaws, a general exclusion under the policy could theoretically cancel protection for everyone. A <strong className="text-slate-800">"Severability" clause</strong> prevents this: it ensures honest directors and officers remain fully protected regardless of another peer's malicious deeds.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Checklist for Small Businesses */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              Corporate Liability Claim Preparedness Checklist
            </h4>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Do you have clear written vendor contracts outlining hold-harmless and indemnity liabilities?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Are retroactive coverage dates preserved correctly when moving your D&O/Cyber policies between underwriters?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Are multi-factor authentication (MFA) and routine server backups documented to maintain Cyber policy compliance?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-extrabold select-none">•</span>
                <span>Is your fidelity control mechanism double-signed by two high-ranking accounting officers to block internal siphoning?</span>
              </li>
            </ul>
          </div>

          {/* Interactive Liability & Cyber Questionnaire */}
          <div className="bg-radial from-slate-50 to-emerald-50/20 border border-emerald-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs animate-fade-in" id="liability-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  ⚖️ Liability & Cyber Risk Matcher
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Assess your technological exposure, advisory fiduciary risk, and physical office footprint to map your business liabilities.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Core Business Sector */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Corporate Sector Focus
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setLiabilitySector("software")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilitySector === "software"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">💻 Software, SaaS & IT Tech</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Cloud-scale services, software delivery, online databases</div>
                  </button>
                  <button
                    onClick={() => setLiabilitySector("retail_manufacturing")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilitySector === "retail_manufacturing"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏢 Retail, Factory or Services</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Spacious stores, assembly factories, or physical showrooms</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Primary Threat Exposure */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Major Risk Concern
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setLiabilityRisks("data_ransom")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilityRisks === "data_ransom"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🛡️ Data Breach / Ransomware</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Server compromises, phishing, or client records leakages</div>
                  </button>
                  <button
                    onClick={() => setLiabilityRisks("premises_harm")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilityRisks === "premises_harm"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">⚡ Site Accidents / Defects</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Slipping risks on location or manufactured batch complications</div>
                  </button>
                </div>
              </div>

              {/* Question 3: Board Structure */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  3. Fiduciary Board Setup
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setLiabilityBoard("yes_investors")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilityBoard === "yes_investors"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">👔 External Board / VC Fund</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Advisory board with outside shareholders or VC backing</div>
                  </button>
                  <button
                    onClick={() => setLiabilityBoard("single_founder")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      liabilityBoard === "single_founder"
                        ? "border-emerald-600 bg-emerald-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🌱 bootstrapped / Single Founder</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Sole proprietorship or private partners with zero outside board</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {liabilitySector && liabilityRisks && liabilityBoard ? (
              (() => {
                let primaryPolicy = null;
                const isTech = liabilitySector === "software" || liabilityRisks === "data_ransom";
                
                if (isTech) {
                  primaryPolicy = {
                    title: "Cyber Security & Data Liability Shield",
                    desc: "Since your enterprise focuses heavily on SaaS code, digital hosting, or processes valuable user records, securing a Cyber Liability Framework is your highest priority. It covers security breach forensic diagnostics, ransom recovery payouts, legally mandated notification costs, and statutory regulatory fines.",
                    badge: "Tech Risk Pillar",
                    color: "border-emerald-150 bg-emerald-50/30 text-slate-950",
                    badgeColor: "bg-emerald-100 text-emerald-900"
                  };
                } else {
                  primaryPolicy = {
                    title: "Commercial General Liability (CGL) Framework",
                    desc: "For your physical premises, showrooms, or manufacturing lines, standard Commercial General Liability (CGL) is critical. This secures the establishment from third-party bodily injuries (e.g. wet-floor slips) and property claims resulting from defective product batches.",
                    badge: "Physical Premises Liability",
                    color: "border-slate-205 bg-slate-50 text-slate-950",
                    badgeColor: "bg-slate-200 text-slate-800"
                  };
                }

                let secondaryAdviceList = [];
                if (liabilityBoard === "yes_investors") {
                  secondaryAdviceList.push("Directors & Officers (D&O) Cover is strongly recommended. External investors and fiduciary board members require explicit personal asset protections to shield them from management lawsuits.");
                } else {
                  secondaryAdviceList.push("No active D&O priority is required. However, we suggest adding a standard 'Severability of Interests' clause to safeguard your partners.");
                }

                if (isTech) {
                  secondaryAdviceList.push("Check if your client contracts mandate a 'Professional Indemnity (Errors & Omissions)' framework to cushion against financial hits from code failures or consulting delays.");
                } else {
                  secondaryAdviceList.push("Verify that you have a 'Commercial Crime & Fidelity Guarantee' rider to insulate your cash boxes or physical inventory from inside fraudulent actors.");
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${primaryPolicy.color} space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-emerald-100/40">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Corporate Liability Map</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
                          🛡️ {primaryPolicy.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${primaryPolicy.badgeColor}`}>
                        {primaryPolicy.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-705 font-medium">
                      {primaryPolicy.desc}
                    </p>

                    <div className="space-y-2 border-t border-emerald-100/30 pt-3">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Mandatory Endorsements & Fiduciary Advice:</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-655 font-medium leading-relaxed font-sans">
                        {secondaryAdviceList.map((clause, idx) => (
                          <li key={idx}><strong className="text-slate-850">Guidance:</strong> {clause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500 font-sans">
                      <div className="flex items-center gap-1">
                        <span>🕵️ Advocacy Audit:</span>
                        <span className="text-slate-705">Observe if your policies operate on a <strong className="font-semibold text-slate-900">Claims-Made</strong> or <strong className="font-semibold text-slate-900">Occurrence</strong> timeline.</span>
                      </div>
                      <button
                        onClick={() => {
                          setLiabilitySector("");
                          setLiabilityRisks("");
                          setLiabilityBoard("");
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6 font-sans">
                ✨ Provide your sector focus, active board design, and high-priority liability concerns above to build your corporate framework advice sheet instantly!
              </div>
            )}

          </div>

          {/* FAQ: Professional Indemnity Triggers & Prospectus Exclusions */}
          <div className="bg-white border border-slate-200/95 rounded-2xl p-5 md:p-6 space-y-4 shadow-3xs" id="liability-faq-block">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 shrink-0">
                <HelpCircle className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider block w-max">
                  Consultant & SaaS Reference Manual
                </span>
                <h4 className="text-sm font-extrabold text-slate-950 font-sans">
                  Technical FAQ: Professional Indemnity (E&O) Exclusions & Triggers
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Compiled from standard Indian insurance guidelines and real-world corporate prospectus exclusion schedules. Learn how technical omissions trigger indemnity events and understand key exclusion barriers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                {
                  id: 1,
                  q: "What constitutes an active Professional Indemnity (E&O) claim trigger for technology consultants and SaaS operators?",
                  sub: "Trigger Mechanics & Defining Events",
                  a: "For SaaS providers and digital consultants, a Professional Indemnity / Errors & Omissions (E&O) trigger requires a pure financial loss suffered by a client resulting from a lapse, code bug, or service omission. Unlike standard Commercial General Liability (CGL) which strictly demands bodily injury or property damage, a PI claim triggers on events like database downtime breaches, erroneous algorithm advisory sheets, major code integration failures, or late custom software deliveries.",
                  exclusions: "Note: Underwriters enforce the 'Retroactive Date' parameter. Claims triggered by code pushed or services delivered prior to this date are ineligible for coverage."
                },
                {
                  id: 2,
                  q: "How do standard 'Prior & Pending Litigation' exclusions limit liability under corporate prospectus schemas?",
                  sub: "Retroactive Limitations & Known Circumstances",
                  a: "Practically all corporate prospectus guidelines exclude any lawsuits, notices, or official regulatory audits that were active, pending, or known to existing partners prior to the policy's retroactive commencement date. If a SaaS provider is aware of a severe server leak or a threat of litigation from a client, they cannot purchase a policy subsequently to shift that specific liability to the underwriter.",
                  exclusions: "Exclusion Scope: Known circumstances with high probability of ripening into a legal claim are strictly excluded under the 'Known Wrongs' doctrine."
                },
                {
                  id: 3,
                  q: "Are liabilities assumed solely under voluntary written contracts or customer SLAs protected by the underwriter?",
                  sub: "Contractual Assumed Liability Limitations",
                  a: "No. Standard insurers exclude any liability assumed by the insured under a voluntary contract (such as custom service level agreements offering unlimited damages, absolute performance warranties, or holding clients harmless regardless of fault) that exceeds standard common law liabilities. For a claim to trigger coverage, there must have been an actual count of negligence, error, or omission that would stand legally under standard tort laws even without the contract.",
                  exclusions: "Key Insight: Ensure client contracts limit liability caps to either fees paid or standard negligence thresholds to maintain policy matching."
                },
                {
                  id: 4,
                  q: "Why are budget overruns, cost estimates, and speculative performance targets strictly excluded?",
                  sub: "Commercial Risk vs. Professional Omission",
                  a: "Insurers cover technical negligence, code defects, or flawed consulting frameworks. However, they explicitly refuse to act as a guarantor for your business profit/loss projections, unrealistic estimations of hours to deliver software, or speculative client profitability. For example, if a SaaS app fails to increase user retention by 20% as promised in a sales slide, that is considered a speculative commercial business risk, not a professional error, and is excluded.",
                  exclusions: "Exclude Scope: Financial guarantees, project delay penalties, and cost estimates are standard exclusions in global corporate prospectus filings."
                }
              ].map((faq, idx) => {
                const isOpen = openLiabilityFAQ === idx;
                return (
                  <div key={idx} className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition duration-200">
                    <button
                      onClick={() => setOpenLiabilityFAQ(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-start justify-between gap-4 font-sans cursor-pointer bg-transparent border-0 outline-none"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          {faq.sub}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 leading-snug">
                          {faq.q}
                        </h5>
                      </div>
                      <span className="text-slate-400 shrink-0 mt-0.5 select-none font-bold text-sm bg-white hover:bg-slate-100 rounded border border-slate-200 w-5 h-5 flex items-center justify-center">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="bg-white text-xs text-slate-650 leading-relaxed font-sans border-t border-slate-105 overflow-hidden"
                        >
                          <div className="px-4 pb-4.5 pt-2.5">
                            <p className="pb-3 text-slate-705 font-medium">
                              {faq.a}
                            </p>
                            <div className="bg-red-50/40 border border-red-100/50 rounded-lg p-3 text-[11px] font-sans text-slate-600 flex items-start gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-red-900 font-bold font-sans">Prospectus Exclusion Scope:</strong> {faq.exclusions}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ACTIVE DISPLAY: Workers' Compensation Section */}
      {activeSection === "wc" && (
        <div className="space-y-6 animate-fade-in" id="wc-handbook-content">
          
          {/* Executive Overview Banner */}
          <div className="bg-radial from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-600 shrink-0">
              <Users className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-950 text-sm">Understanding Workmen's / Employees' Compensation (WC) Cover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Workplace human capital safety is a strict statutory mandate. Sourced from standard public guidelines of leading market insurers under the <strong className="text-slate-950 font-semibold">Indian Employees' Compensation Act, 1923</strong>, this policy insulates employers from crushing financial liabilities when an employee faces bodily injury, occupational disease, or fatal accidents arising during and in the course of employment.
              </p>
            </div>
          </div>

          {/* Core Areas */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono">
              The Four Integral Core Pillars of WC Protection
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1: Table A statutory */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold">1</div>
                  <h5 className="font-bold text-xs text-slate-900">Table A - Statutory Act Liability</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Guarantees absolute legal indemnity to pay statutory compensation scheduled under the <strong className="text-slate-800">Employees' Compensation Act, 1923</strong>. Covers payouts for temporary disablement, permanent partial/total disablement, and death resulting from workplace accidental triggers.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  🇮🇳 Strictly tied to national labor compensation calculations.
                </div>
              </div>

              {/* Pillar 2: Table B common law */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold">2</div>
                  <h5 className="font-bold text-xs text-slate-900">Table B - Civil & Common Law Liability</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Extends legal coverage to civil or common law claims brought against the organization by affected employees or their legal heirs. This protects the company if sued for negligence or failure to provide safe operating conditions beyond the rigid statutory tables of the Act.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  ⚖️ Safeguards against expensive, unpredictable civil court lawsuits.
                </div>
              </div>

              {/* Pillar 3: Occupational diseases */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold">3</div>
                  <h5 className="font-bold text-xs text-slate-900">Occupational Disease Defense</h5>
                </div>
                <p className="text-xs text-slate-555 leading-relaxed font-normal">
                  Protects employers when staff slow-contract illnesses intimately tied to their day-to-day work environment (e.g. Silicosis in quarries, Asbestosis, or lead poisoning) as cataloged under <strong className="text-slate-800">Schedule III of the Employees' Compensation Act, 1923</strong>.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  🩺 Sourced from standard public guidelines of market insurers.
                </div>
              </div>

              {/* Pillar 4: Contractor crew cover */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold">4</div>
                  <h5 className="font-bold text-xs text-slate-900">Contractor & Casual Labor Extension</h5>
                </div>
                <p className="text-xs text-slate-555 leading-relaxed font-normal">
                  Ensures sub-contracted, temporary, and casual laborers who perform critical floor tasks on your behalf are completely covered. Prevents severe corporate liability exposure under Section 12 of the Act, which deems the principal employer liable for contractor staff accidents.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  🏗️ Essential safeguard for outsourced manufacturing and building crews.
                </div>
              </div>

            </div>
          </div>

          {/* Statutory Payout Formulas Panel */}
          <div className="bg-cyan-50/40 border border-cyan-200 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-cyan-900 tracking-wider uppercase flex items-center gap-1.5 font-sans">
              <TrendingUp className="w-4.5 h-4.5 text-cyan-700 shrink-0" />
              Statutory Payout Formulas (Under Employees' Compensation Act, 1923)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
              
              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">1. In Case of Death</span>
                <p className="text-slate-600 leading-normal font-normal">
                  The statutory compensation payout equals <strong className="text-slate-800">50% of the employee's monthly wage</strong> multiplied by the relevant factor based on their age factor table, or a static legal minimum of <strong className="text-slate-800">₹1,40,000</strong> (whichever is greater). Wages are capped at the statutory ceiling (currently <strong className="text-slate-800">₹15,000</strong> max per month for calculation formulas).
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">2. Permanent Total Disablement (PTD)</span>
                <p className="text-slate-600 leading-normal font-normal">
                  If injuries leave an employee permanently disabled, they are entitled to <strong className="text-slate-800">60% of their monthly wage</strong> multiplied by the scheduled statutory age factor, or a guaranteed minimum of <strong className="text-slate-800">₹1,20,000</strong>, whichever is higher, to sustain lifetime therapy costs, backed by standard market insurer templates.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-905 block">3. Temporary & Medical Extensions</span>
                <p className="text-slate-600 leading-normal font-normal">
                  Provides <strong className="text-slate-800">half-monthly cash compensation payouts</strong> (for up to 5 consecutive years during recovering disability) alongside essential medical expense add-on riders. Also includes standard funerary expense aid of <strong className="text-slate-800">₹5,000</strong> to directly support family members.
                </p>
              </div>

            </div>
          </div>

          {/* Critical Exclusions & Pitfalls Card */}
          <div className="bg-amber-50/45 border border-amber-205 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase flex items-center gap-1.5 font-sans">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0" />
              Critical Legal Exclusions Under WC Policies
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-amber-950">
              <div className="space-y-1 p-3 bg-white/70 border border-amber-100/50 rounded-xl">
                <span className="font-extrabold block text-amber-900">🚫 The 3-day Disablement Rule</span>
                <p className="text-slate-600 leading-relaxed font-normal text-[11px]">
                  Under Indian law, the employer is not liable for temporary injuries that do not disable the worker for a minimum period of 3 entire consecutive days.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-white/70 border border-amber-100/50 rounded-xl">
                <span className="font-extrabold block text-amber-900">🚫 Misconduct, Alcohol & Drugs</span>
                <p className="text-slate-600 leading-relaxed font-normal text-[11px]">
                  All claims are denied if an accident occurs because the employee was under direct influence of industrial spirits, liquor, or drugs, or was guilty of willful safety guard removals.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-white/70 border border-amber-100/50 rounded-xl">
                <span className="font-extrabold block text-amber-900">🚫 Excluded Statutory Penalties</span>
                <p className="text-slate-600 leading-relaxed font-normal text-[11px]">
                  Standard insurance policies strictly refuse to pay interest or late fees imposed by the Commissioner on the employer due to unjust claim delays.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Checklist and Declarations */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              Workmen's Compensation Compliance Checklist
            </h4>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-extrabold select-none">•</span>
                <span>Do you maintain formal, daily signed muster wage books that document monthly salaries, OT, and bonus structures clearly?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-extrabold select-none">•</span>
                <span>Have all contract-based workers, day laborers, and warehouse sweepers been included under your declared employee count?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-extrabold select-none">•</span>
                <span>Have you set up a robust, 24-hour workspace injury protocol to notify the central help lines instantly?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-extrabold select-none">•</span>
                <span>Are employee workplace addresses, site divisions, and hazardous machine sections accurately declared on the policy schedule?</span>
              </li>
            </ul>
          </div>

          {/* Interactive WC Questionnaire */}
          <div className="bg-radial from-slate-50 to-cyan-50/20 border border-cyan-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs animate-fade-in" id="wc-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-cyan-50 text-cyan-800 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max font-sans">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  👷 WC / Employees' Policy Planner
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Align your workforce hazards, subcontractor reliance, and statutory health limits under the Indian Employees' Compensation Act, 1923.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Workforce Hazard Level */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Workforce Profile
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setWcWorkforce("hazardous")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcWorkforce === "hazardous"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold font-sans">🏭 Industrial / Hazardous Floor</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Heavy assembly plants, physical warehouse handling, boiler operators</div>
                  </button>
                  <button
                    onClick={() => setWcWorkforce("corporate_office")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcWorkforce === "corporate_office"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">💻 Desk-Bound & Administrative</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Corporate headquarters, retail cashiers, screen-based offices</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Contractor / Subcontractor Usage */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Subcontractor Liability
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setWcSubcontractors("yes_contractors")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcSubcontractors === "yes_contractors"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏗️ Hire Temporary Crews</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Utilize outsourcing agencies, contract workers or dispatch staff</div>
                  </button>
                  <button
                    onClick={() => setWcSubcontractors("no_contractors")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcSubcontractors === "no_contractors"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🌱 Direct Regular Staff Only</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">100% full-time regular workers on organization rolls</div>
                  </button>
                </div>
              </div>

              {/* Question 3: Medical Benefit Scope */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  3. Emergency Medical Rider
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setWcAddons("yes_medical")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcAddons === "yes_medical"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🚑 Include Medical Coverage</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Fund active surgeon inpatient fees due to workplace trauma</div>
                  </button>
                  <button
                    onClick={() => setWcAddons("no_medical")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      wcAddons === "no_medical"
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">📜 Basic Act Compensation Only</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5 font-sans">Rely exclusively on statutory disablement formulas</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {wcWorkforce && wcSubcontractors && wcAddons ? (
              (() => {
                let reportStyle = null;
                const isHeavy = wcWorkforce === "hazardous";
                
                if (isHeavy) {
                  reportStyle = {
                    title: "Table A + Table B Combined WC Policy Model",
                    desc: "Since your team handles physical assets, high-power boilers, or warehouse dispatch, choosing Table A (rigid statutory compensation scales under the Act) combined with Table B (Civil Common Law Negligence Liability cover) is critical. This secures the organ from both statutory worker tribunals and unpredictable negligence damage claims.",
                    badge: "Industrial Compliance Cover",
                    color: "border-cyan-155 bg-cyan-50/40 text-slate-950",
                    badgeColor: "bg-cyan-100 text-cyan-900"
                  };
                } else {
                  reportStyle = {
                    title: "Table A (Statutory Act) WC Policy Outline",
                    desc: "For corporate offices or administrative teams, keeping Table A Statutory Act coverage is sufficient to meet official legal requirements. This covers statutory schedules for accidental bodily incidents with minimal premium loads.",
                    badge: "Standard Compliance Suit",
                    color: "border-slate-205 bg-slate-50 text-slate-950",
                    badgeColor: "bg-slate-200 text-slate-800"
                  };
                }

                let extraWCUpdates = [];
                if (wcSubcontractors === "yes_contractors") {
                  extraWCUpdates.push("Under Section 12 of the Indian Employees' Compensation Act, the principal employer is directly liable to clear injured subcontractor wages. Ensure your policy lists a 'Section 12 Contractor Crew Extension' to cover sub-contractor headcounts.");
                } else {
                  extraWCUpdates.push("Direct workforce only. Ensure your declared active muster heads match your digital logs to avoid underinsurance discrepancies.");
                }

                if (wcAddons === "yes_medical") {
                  extraWCUpdates.push("Your selected Accidental Medical Reimbursement rider overrides typical waiting-period constraints, authorizing the insurer to directly clear trauma-surgical hospital bills.");
                } else {
                  extraWCUpdates.push("Observe that employees must rely on personal health files since basic statutory WC excludes standard room boarding costs.");
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${reportStyle.color} space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-cyan-100/40">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Workplace Safety Layout</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 font-sans">
                          👷 {reportStyle.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${reportStyle.badgeColor}`}>
                        {reportStyle.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-705 font-medium font-sans">
                      {reportStyle.desc}
                    </p>

                    <div className="space-y-2 border-t border-cyan-100/30 pt-3">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Mandatory Endorsements & Statutory Advice:</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-655 font-medium leading-relaxed font-sans">
                        {extraWCUpdates.map((clause, idx) => (
                          <li key={idx}><strong className="text-slate-850 font-semibold text-slate-900">Advice:</strong> {clause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500 font-sans">
                      <div className="flex items-center gap-1">
                        <span>💡 Penalty Alert:</span>
                        <span className="text-slate-705">Lock in wages honestly! Submitting down-capped salaries under ₹15k results in ratable penalty claims.</span>
                      </div>
                      <button
                        onClick={() => {
                          setWcWorkforce("");
                          setWcSubcontractors("");
                          setWcAddons("");
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6 font-sans">
                ✨ Feed in your industrial profile, subcontractor count, and active healthcare rider targets above to generate your statutory WC policy blueprint instantly!
              </div>
            )}

          </div>

        </div>
      )}

      {/* ACTIVE DISPLAY: Group Personal Accident (GPA) Section */}
      {activeSection === "gpa" && (
        <div className="space-y-6 animate-fade-in" id="gpa-handbook-content">
          
          {/* Executive Overview Banner */}
          <div className="bg-radial from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start font-sans">
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl text-orange-600 shrink-0">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-950 text-sm">Understanding Group Personal Accident (GPA) Benefits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A GPA policy offers round-the-clock, worldwide security to a defined collective of individuals against bodily injury or death exclusively resultant from an accident. Sourced from standard regulatory <strong className="text-slate-955 font-semibold">Market Insurer Personal Accident Wordings</strong>, this handbook unpacks critical claim categories, disablement tables, and tactical statutory benefits key to HR administrators and enterprise risks.
              </p>
            </div>
          </div>

          {/* Core Benefit Schedules */}
          <div className="space-y-4 font-sans">
            <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono">
              Core Benefit Categories & Payout Schedules
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Accidental Death */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-orange-400 flex items-center justify-center font-mono text-[9px] font-bold">1</div>
                  <h5 className="font-bold text-xs text-slate-900">Accidental Death (AD) Indemnity</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Pays out 100% of the Capital Sum Insured (CSI) in the event of an accidental death occurring within 12 calendar months from the date of sustaining the physical injury. It provides primary financial protection to designated family nominees.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  🛡️ Worldwide coverage, functioning 24 hours a day, 365 days a year.
                </div>
              </div>

              {/* Permanent Total Disablement */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-orange-400 flex items-center justify-center font-mono text-[9px] font-bold">2</div>
                  <h5 className="font-bold text-xs text-slate-900">Permanent Total Disablement (PTD)</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Triggers when injury results in total, permanent inability to engage in any employment. Standard payouts are <strong className="text-slate-950 font-semibold">100% of the CSI</strong> (or up to <strong className="text-slate-955 font-semibold">125%</strong> if specific enhancement riders for home/vehicle modification are selected).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  🧠 Covers loss of sight in both eyes, both limbs and total paralysis.
                </div>
              </div>

              {/* Permanent Partial Disablement */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-orange-400 flex items-center justify-center font-mono text-[9px] font-bold">3</div>
                  <h5 className="font-bold text-xs text-slate-900">Permanent Partial Disablement (PPD)</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Handles permanent loss of use of specific body parts or sensors. Payout percentages are rigorously scaled based on the standard market statutory scale to sustain living standards based on localized bodily impairments.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  📊 Leverages precise, granular percentage tables proportional to the trauma.
                </div>
              </div>

              {/* Temporary Total Disablement */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-orange-400 flex items-center justify-center font-mono text-[9px] font-bold">4</div>
                  <h5 className="font-bold text-xs text-slate-900">Temporary Total Disablement (TTD)</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Provides a vital weekly cash buffer to workers who are temporarily bedridden and unable to work. Typically pays <strong className="text-slate-955 font-semibold">1% of the Sum Insured per week</strong> (capped at ₹20,000 to ₹100,000 weekly) for a maximum of 104 consecutive weeks.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  💵 Crucial for gig-workers, field forces, and factory floor managers.
                </div>
              </div>

            </div>
          </div>

          {/* Scale of Disablement Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-900 px-4.5 py-3 border-b border-slate-150 text-white flex justify-between items-center text-xs font-bold font-sans">
              <span>Market Standard Disablement Percentage Scale (PPD/PTD)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 rounded font-semibold text-orange-400 shrink-0">Official Wordings Reference</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 font-sans">
                <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-150">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Nature of Bodily Disability / Loss</th>
                    <th className="py-2.5 px-4 text-right font-bold">Percent of Capital Sum Insured Payable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-semibold text-slate-900">Loss of both hands, both feet, or sight of both eyes</td>
                    <td className="py-2 px-4 text-right font-bold text-slate-900">100%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-semibold text-slate-900">Total Paralysis or complete bed-confinement</td>
                    <td className="py-2 px-4 text-right font-bold text-slate-900">100%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-semibold text-slate-800">Loss of hearing in both ears</td>
                    <td className="py-2 px-4 text-right font-semibold text-slate-800">75%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-semibold text-slate-800">Loss of one hand or one foot, or sight of one eye</td>
                    <td className="py-2 px-4 text-right font-semibold text-slate-800">50%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-medium text-slate-700">Loss of hearing in one ear</td>
                    <td className="py-2 px-4 text-right text-slate-700 font-semibold">30%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-medium text-slate-705">Loss of entire thumb (both phalanges)</td>
                    <td className="py-2 px-4 text-right text-slate-705 font-semibold">25%</td>
                  </tr>
                  <tr className="hover:bg-slate-100/40 transition">
                    <td className="py-2 px-4 font-medium text-slate-600">Loss of index finger (all 3 phalanges)</td>
                    <td className="py-2 px-4 text-right text-slate-600">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Expanded 10 GPA Add-on Riders Catalog */}
          <div className="bg-orange-50/40 border border-orange-200 rounded-2xl p-5 space-y-5" id="gpa-expanded-addons-catalog">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-orange-200/50">
              <h4 className="text-xs font-extrabold text-orange-900 tracking-wider uppercase flex items-center gap-1.5 font-sans">
                <Compass className="w-4.5 h-4.5 text-orange-700 shrink-0" />
                Strategic GPA Add-ons & Riders Offered by Commercial Insurers
              </h4>
              <span className="text-[10px] bg-orange-100 text-orange-850 font-extrabold px-2 py-0.5 rounded-full font-mono uppercase">
                10 Standard Insurer Clauses Included
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              While a base GPA policy compensates only for basic physical loss of life or specific dismemberment tables, corporate risk managers can attach standardized market extensions. Below is the comprehensive master suite of <strong>all 10 GPA Add-ons</strong> offered by top commercial insurance providers, detailing their statutory purposes, sub-limits, and underwriting implications:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 text-xs font-sans">
              
              {/* Addon 1 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚑</span>
                  <span className="font-extrabold text-slate-900 block font-sans">1. Accidental Medical Expenses (AMER)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Extends coverage to cover IPD (In-Patient) and OPD (Out-Patient) medical boarding and clinical expenses resulting directly from an accident.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">10% to 40% of GPA claim or actuals</span>
                </div>
              </div>

              {/* Addon 2 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">⏰</span>
                  <span className="font-extrabold text-slate-900 block font-sans">2. Temporary Total Disablement (TTD)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Weekly salary compensation replacement for employees who survive accidents but are medically confined to bed rest or temporary cast support systems.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">1% of CSI weekly up to 104 weeks</span>
                </div>
              </div>

              {/* Addon 3 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎓</span>
                  <span className="font-extrabold text-slate-900 block font-sans">3. Child Education & Marriage Aid</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Pays a one-time cash lump sum to secure school/college tuition fees or marriage milestones of the deceased employee&apos;s dependent children.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">₹25K to ₹1 Lakh per child (Max 2)</span>
                </div>
              </div>

              {/* Addon 4 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚰️</span>
                  <span className="font-extrabold text-slate-900 block font-sans">4. Carriage of Mortal Remains</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Covers expenses to pack and transport the body of the deceased back from the accidental site to their standard residential region or native hometown.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">1% of CSI or actuals up to ₹10k</span>
                </div>
              </div>

              {/* Addon 5 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚨</span>
                  <span className="font-extrabold text-slate-900 block font-sans">5. Ambulance & Air Evacuation Cover</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Reimbursements for emergency trauma transit, encompassing intensive ICU ambulances, state-border corridors, or urgent air ambulance services.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">Actual charges up to ₹1,00,000</span>
                </div>
              </div>

              {/* Addon 6 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🦴</span>
                  <span className="font-extrabold text-slate-900 block font-sans">6. Broken Bones & Fractures Scale</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Grants diagnostic cash payments immediately upon sustaining bone fractures or splits, without waiting for long-term permanent disability assessment.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">5% to 50% scale based on fracture severity</span>
                </div>
              </div>

              {/* Addon 7 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚀</span>
                  <span className="font-extrabold text-slate-900 block font-sans">7. Double Indemnity for Public Transport</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Doubles the payout (200% instead of 100%) if the fatal accident happens while traveling as a fare-paying passenger inside a licensed common carrier.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">Double CSI on certified passenger tickets</span>
                </div>
              </div>

              {/* Addon 8 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏥</span>
                  <span className="font-extrabold text-slate-900 block font-sans">8. Accidental Hospital Daily Cash</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Provides a clean, fixed daily pocket money stipend during trauma hospitalization to support family expenses, cabs, or nursing helpers.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">₹1K to ₹5K per day (Max 30 days)</span>
                </div>
              </div>

              {/* Addon 9 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🧠</span>
                  <span className="font-extrabold text-slate-900 block font-sans">9. Irreversible Coma Benefit</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Additional lump-sum bonus paid if the accidental physical injury places the insured into a permanent vegetative or documented deep comatose state.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">Additional 50% on top of Capital SI</span>
                </div>
              </div>

              {/* Addon 10 */}
              <div className="p-4 bg-white border border-orange-100 rounded-xl space-y-2 hover:border-orange-200 transition shadow-3xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🦽</span>
                  <span className="font-extrabold text-slate-900 block font-sans">10. House & Motor Car Modification</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-normal">
                  Funds modifications like wheelchair ramps inside rooms, stair railings, or hand lever modifications inside the insured&apos;s motor vehicle.
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-100 font-semibold">
                  <span>Standard Sublimit:</span>
                  <span className="text-orange-700">Up to 10% of CSI or ₹1,00,000 maximum</span>
                </div>
              </div>

            </div>
          </div>

          {/* Absolute Exclusions List */}
          <div className="bg-amber-50/45 border border-amber-205 rounded-2xl p-5 space-y-4 font-sans">
            <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0" />
              Critical Exclusions to Note (Standard Market Wording Reference)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-amber-950">
              <ul className="space-y-2 list-disc list-inside text-slate-655 font-normal">
                <li><strong className="text-slate-800">Alcohol & Influencers:</strong> Claims are totally denied if the event occurred while under direct influence of therapeutics, alcohol, or liquors.</li>
                <li><strong className="text-slate-800">Aviation & Flight:</strong> Accidents arising while traveling on un-licensed airlines or participating in trial flights as active flight crew.</li>
                <li><strong className="text-slate-800">Suicide Loop & Self-harm:</strong> Intentionally planned self-inflicted wounds, suicide attempts, or psychiatric insanity lapses.</li>
              </ul>
              <ul className="space-y-2 list-disc list-inside text-slate-655 font-normal">
                <li><strong className="text-slate-800">Professional/Adventure Sports:</strong> High-risk hazards (such as ballooning, bungee jumps, diving, motor-racing) unless custom loading is paid.</li>
                <li><strong className="text-slate-800">Pregnancy Hazards:</strong> Death or disability caused directly or indirectly by childbirth, miscarriage, or prenatal surgeries.</li>
                <li><strong className="text-slate-800">War & Radioactive Fallouts:</strong> Injuries sustained in active military combat or chemical warfare nuclear leaks.</li>
              </ul>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-sm font-sans">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
              GPA Corporate Compliance and Claim Mandate
            </h4>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 font-extrabold select-none">•</span>
                <span>Are employee names and Nominee percentages recorded accurately to prevent legal heir succession delays?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 font-extrabold select-none">•</span>
                <span>Is there an official system to report any fatal accident to the claims Desk within the mandatory policy window?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 font-extrabold select-none">•</span>
                <span>Has the HR team secured certified Post Mortem and Police FIR reports before lodging accidental death claims?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-400 font-extrabold select-none">•</span>
                <span>Are employees traveling overseas adequately covered by updating global geographic range riders?</span>
              </li>
            </ul>
          </div>

          {/* Interactive GPA Questionnaire */}
          <div className="bg-radial from-slate-50 to-orange-50/20 border border-orange-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs animate-fade-in" id="gpa-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-orange-50 text-orange-850 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max font-sans">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  🩹 GPA Policy Custom Matcher
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Assess field transit risks, daily corporate headcounts, and dynamic child education protection rider needs under standard GPA scales.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Workforce Exposure Risk */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Transit & Active Work Risk
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setGpaWorkRisk("high_field")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      gpaWorkRisk === "high_field"
                        ? "border-orange-600 bg-orange-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🚴 High Field Logistics / Sales</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5 font-sans">Delivery riders, field engineers, warehouse operations, machinery workers</div>
                  </button>
                  <button
                    onClick={() => setGpaWorkRisk("low_desk")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      gpaWorkRisk === "low_desk"
                        ? "border-orange-600 bg-orange-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold font-sans">💻 Administrative / Desk-Bound</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Work-from-home coders, office managers, screen-based accountants</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Group Scale */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Overall Employee Scale
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setGpaScaleSize("under_25")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      gpaScaleSize === "under_25"
                        ? "border-orange-600 bg-orange-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🌱 Growing SME (Under 25 staff)</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Slight team with direct personal management setups</div>
                  </button>
                  <button
                    onClick={() => setGpaScaleSize("over_25")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      gpaScaleSize === "over_25"
                        ? "border-orange-600 bg-orange-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏢 Enterprise Team (25+ staff)</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5 font-sans">Structured corporation with branch offices and HR channels</div>
                  </button>
                </div>
              </div>

              {/* Enhanced Question 3: Insurer 10 GPA Add-ons Selection */}
              <div className="md:col-span-3 space-y-3 pt-3 border-t border-orange-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                      3. Select Insurer GPA Add-ons & Riders (Select options below)
                    </label>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Multi-select from standard add-ons offered by all major commercial insurers to customize your team&apos;s protection.
                    </p>
                  </div>
                  
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setGpaAddonsSelected([]);
                        setGpaRidersNeeded("death_disability");
                      }}
                      className="px-2 py-1 text-[10px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded transition cursor-pointer"
                    >
                      Core Base Only
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGpaAddonsSelected(["amer", "ttd", "child_edu", "air_evac"]);
                        setGpaRidersNeeded("support_all");
                      }}
                      className="px-2 py-1 text-[10px] font-bold bg-orange-100 hover:bg-orange-200 text-orange-950 border border-orange-200 rounded transition cursor-pointer"
                    >
                      Welfare-Pack Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGpaAddonsSelected(["amer", "ttd", "child_edu", "remains", "air_evac", "fracture", "double_indem", "hospital_cash", "coma", "modification"]);
                        setGpaRidersNeeded("support_all");
                      }}
                      className="px-2 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 rounded transition cursor-pointer"
                    >
                      All 10 Add-Ons Selected
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5">
                  {[
                    { id: "amer", label: "1. Accidental Medical (AMER)", emoji: "🚑", load: 15, sub: "Clinic & Hospital Bills" },
                    { id: "ttd", label: "2. Weekly Income (TTD)", emoji: "⏰", load: 20, sub: "1% CSI Weekly Salary" },
                    { id: "child_edu", label: "3. Child Education Benefit", emoji: "🎓", load: 5, sub: "Schooling Continuity" },
                    { id: "remains", label: "4. Carriage of Mortal Remains", emoji: "⚰️", load: 1, sub: "Repatriation Transport" },
                    { id: "air_evac", label: "5. Air Evacuation Charges", emoji: "🚨", load: 3, sub: "Helicopter Air Transit" },
                    { id: "fracture", label: "6. Broken Bones / Fractures", emoji: "🦴", load: 10, sub: "Diagnostic Payout Matrix" },
                    { id: "double_indem", label: "7. Double Public Carrier SI", emoji: "🚀", load: 8, sub: "Auto-200% Payout Ticket" },
                    { id: "hospital_cash", label: "8. Hospital Daily Pocket Cash", emoji: "🏥", load: 5, sub: "Daily Family Stipends" },
                    { id: "coma", label: "9. Irreversible Coma Benefit", emoji: "🧠", load: 4, sub: "Additional 50% CSI" },
                    { id: "modification", label: "10. House & Car Modification", emoji: "🦽", load: 5, sub: "Ramps & Controls Adapt" }
                  ].map((addon) => {
                    const isSelected = gpaAddonsSelected.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => {
                          let updated;
                          if (isSelected) {
                            updated = gpaAddonsSelected.filter(item => item !== addon.id);
                          } else {
                            updated = [...gpaAddonsSelected, addon.id];
                          }
                          setGpaAddonsSelected(updated);
                          setGpaRidersNeeded(updated.length > 0 ? "support_all" : "death_disability");
                        }}
                        className={`text-left p-2.5 rounded-xl border text-xs transition duration-200 cursor-pointer flex flex-col justify-between h-20 ${
                          isSelected
                            ? "border-orange-600 bg-orange-50/50 text-orange-950 shadow-3xs ring-1 ring-orange-400"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm shrink-0">{addon.emoji}</span>
                          <span className="font-extrabold text-[11px] leading-tight font-sans text-slate-850">{addon.label}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between w-full border-t border-slate-100 pt-1 text-[9px] font-mono">
                          <span className="text-[9px] font-normal font-sans text-slate-500 leading-none">{addon.sub}</span>
                          <span className="font-bold text-orange-700 font-mono">+{addon.load}% Load</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {gpaWorkRisk && gpaScaleSize ? (
              (() => {
                let ratingProfile = null;
                const isHighTravel = gpaWorkRisk === "high_field";
                const employeeCount = gpaScaleSize === "over_25" ? 65 : 12;
                
                if (isHighTravel) {
                  ratingProfile = {
                    title: "Enhanced GPA Scheme with TTD Weekly Salary Safety",
                    desc: "With active field logistics, heavy dispatch transit, or active site hazards, matching your Group Personal Accident (GPA) with a Temporary Total Disablement (TTD) endorsement is highly critical to keep workers protected while bedridden.",
                    badge: "High Field Risk Model",
                    color: "border-orange-200 bg-orange-50/30 text-slate-950",
                    badgeColor: "bg-orange-100 text-orange-900"
                  };
                } else {
                  ratingProfile = {
                    title: "Standard GPA Death & Permanent Disablement Policy",
                    desc: "For remote, clerical desk environments, keeping primary Accidental Death (AD) and Permanent Partial/Total Disablement (PPD/PTD) covers active represents a highly cost-efficient corporate safeguard.",
                    badge: "Clerical Office Suit",
                    color: "border-slate-200 bg-slate-50 text-slate-950",
                    badgeColor: "bg-slate-200 text-slate-800"
                  };
                }

                // Custom Premium Estimation Logic
                const basePremiumPerEmployee = isHighTravel ? 450 : 220;
                
                // Sum loading from all selected 10 add-ons
                const loadingMap: { [key: string]: number } = {
                  amer: 15,
                  ttd: 20,
                  child_edu: 5,
                  remains: 1,
                  air_evac: 3,
                  fracture: 10,
                  double_indem: 8,
                  hospital_cash: 5,
                  coma: 4,
                  modification: 5
                };
                
                let totalRidersLoading = 0;
                gpaAddonsSelected.forEach(id => {
                  totalRidersLoading += loadingMap[id] || 0;
                });

                const loadedPremiumPerCapita = Math.round(basePremiumPerEmployee * (1 + totalRidersLoading / 100));
                
                // Team scale factor
                const scaleDiscountPercent = gpaScaleSize === "over_25" ? 15 : 0;
                const totalBasePremium = loadedPremiumPerCapita * employeeCount;
                const estimatedYearlyPremium = Math.round(totalBasePremium * (1 - scaleDiscountPercent / 100));

                let dynamicGPAPlan = [];
                
                if (gpaAddonsSelected.length === 0) {
                  dynamicGPAPlan.push("Core Disablement Schedules prioritized with zero support add-ons, ensuring a highly optimized, clean base layout with low premium overheads.");
                } else {
                  if (gpaAddonsSelected.includes("amer")) {
                    dynamicGPAPlan.push("Accidental Medical Expenses (AMER) rider is active: Funds up to 10-40% of the Capital Sum Insured for out-of-pocket clinic visits or immediate in-hospital trauma surgeries.");
                  }
                  if (gpaAddonsSelected.includes("ttd")) {
                    dynamicGPAPlan.push("Temporary Total Disablement (TTD) rider is active: Refunds 1% of Sum Insured per week as a weekly salary buffer (up to 104 weeks) to secure household survival costs.");
                  }
                  if (gpaAddonsSelected.includes("child_edu")) {
                    dynamicGPAPlan.push("Child Education & Marriage rider is active: Releases lump-sum school fees per dependent child (up to 2 children) in case of parental fatal accidents.");
                  }
                  if (gpaAddonsSelected.includes("remains")) {
                    dynamicGPAPlan.push("Carriage of Mortal Remains active: Covers cost up to ₹10K or actuals for biological remains repatriation transport to local home cities.");
                  }
                  if (gpaAddonsSelected.includes("air_evac")) {
                    dynamicGPAPlan.push("Air Ambulance Evacuation active: Secures helicopter logistics up to ₹1 Lakh in extreme remote/mountain trauma rescue environments.");
                  }
                  if (gpaAddonsSelected.includes("fracture")) {
                    dynamicGPAPlan.push("Broken Bones / Fractures active: Grants diagnostics-guided cash lump-sums directly upon orthopedic bone fracture confirmation.");
                  }
                  if (gpaAddonsSelected.includes("double_indem")) {
                    dynamicGPAPlan.push("Double Transit Indemnity active: Pays 200% death benefit sum if accident occurs under valid passenger tickets inside regular public common carriers.");
                  }
                  if (gpaAddonsSelected.includes("hospital_cash")) {
                    dynamicGPAPlan.push("Hospital Daily Cash active: Payout of direct stipend pocket allowances (e.g. ₹1K-₹5K per day) to support auxiliary nurse/bystander expenses.");
                  }
                  if (gpaAddonsSelected.includes("coma")) {
                    dynamicGPAPlan.push("Irreversible Coma safety terms active: Triggers a supplemental 50% of base CSI if trauma results in permanent vegetative comatose conditions.");
                  }
                  if (gpaAddonsSelected.includes("modification")) {
                    dynamicGPAPlan.push("House & Motor Modification benefit active: Finances wheelchair ramps, hand railings, or vehicle controls restructuring up to ₹1 Lakh.");
                  }
                }

                if (gpaScaleSize === "over_25") {
                  dynamicGPAPlan.push("Structured enterprise scale: Leveraging employee headcount of 25+ staff (" + employeeCount + " employees estimated) to lock in " + scaleDiscountPercent + "% group volume discounts with flexible mid-term employee add/deletion clauses.");
                } else {
                  dynamicGPAPlan.push("SME team scale (" + employeeCount + " employees estimated): Direct names of staff must be updated live with nominee records inside the active policy registers.");
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${ratingProfile.color} space-y-4 shadow-3xs`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-orange-200/50">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Insurer Accident Design</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 font-sans">
                          🩹 {ratingProfile.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${ratingProfile.badgeColor}`}>
                        {ratingProfile.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-705 font-medium">
                      {ratingProfile.desc}
                    </p>

                    {/* Dynamic Premium Calculation Widget */}
                    <div className="bg-white border border-orange-100 rounded-xl p-3.5 space-y-3 font-sans">
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-orange-950 tracking-wider font-mono">
                        <span>💰</span>
                        <span>GPA Premium Builder & Loading Breakdown</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="space-y-0.5 border-r border-slate-100 pr-1">
                          <span className="text-[10px] text-slate-400 block font-mono">Base Per-Capita:</span>
                          <span className="font-bold text-slate-900">₹{basePremiumPerEmployee} / yr</span>
                        </div>
                        <div className="space-y-0.5 border-r border-slate-100 pr-1">
                          <span className="text-[10px] text-slate-400 block font-mono">Selected Add-ons Load:</span>
                          <span className="font-bold text-orange-700">+{totalRidersLoading}%</span>
                        </div>
                        <div className="space-y-0.5 border-r border-slate-100 pr-1">
                          <span className="text-[10px] text-slate-400 block font-mono">Per-Employee Rate:</span>
                          <span className="font-bold text-slate-900">₹{loadedPremiumPerCapita} / yr</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 block font-mono">Total Est. Premium:</span>
                          <span className="font-extrabold text-orange-850">₹{estimatedYearlyPremium.toLocaleString()}/yr</span>
                        </div>
                      </div>

                      {gpaAddonsSelected.length > 0 && (
                        <div className="text-[10px] bg-orange-50/50 border border-orange-100/50 rounded-lg p-2 text-slate-650 flex flex-wrap gap-1.5">
                          <strong className="text-orange-950">Active Riders Loaded:</strong>
                          {gpaAddonsSelected.map(id => (
                            <span key={id} className="bg-white border border-orange-150 px-1.5 py-0.5 rounded font-bold text-[9px] text-slate-700">
                              +{loadingMap[id]}% {id.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 border-t border-orange-200/40 pt-3">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Recommended Policy Endorsements & Advice:</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-655 font-medium leading-relaxed font-sans">
                        {dynamicGPAPlan.map((clause, idx) => (
                          <li key={idx}><strong className="text-slate-850 font-semibold text-slate-900 font-sans">Policy Term:</strong> {clause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500 font-sans">
                      <div className="flex items-center gap-1 font-sans">
                        <span>💡 Claim Note:</span>
                        <span className="text-slate-705">Lock in worldwide 24/7/365 active protection terms regardless of clock shifts.</span>
                      </div>
                      <button
                        onClick={() => {
                          setGpaWorkRisk("");
                          setGpaScaleSize("");
                          setGpaRidersNeeded("");
                          setGpaAddonsSelected([]);
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs hover:text-slate-900"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6 font-sans">
                ✨ Feed in your active work risks, corporate staff count, and check corresponding insurer add-ons above to generate your custom GPA premium advice chart instantly!
              </div>
            )}

          </div>

        </div>
      )}

      {/* ACTIVE DISPLAY: Group Health Insurance (GHI) Section */}
      {activeSection === "ghi" && (
        <div className="space-y-6 animate-fade-in" id="ghi-handbook-content">
          
          {/* Executive Overview Banner */}
          <div className="bg-radial from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start font-sans">
            <div className="p-3 bg-pink-50 border border-pink-100 rounded-xl text-pink-600 shrink-0">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-955 text-sm">Understanding Group Health Insurance (GHI) Shields</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a fundamental pillar of modern employee benefits, a Group Health Insurance policy provides dynamic, non-discriminatory health protection for corporate employees and families. Compiled from standard regulatory <strong className="text-slate-955 font-semibold">Market Insurer Group Health Wordings</strong>, this segment outlines cashless hospitalization rules, essential waiting-period overrides, and critical corporate buffer designs.
              </p>
            </div>
          </div>

          {/* Core Hospitalization Pillars */}
          <div className="space-y-4 font-sans">
            <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono">
              The Four Dynamic Core Pillars of GHI Cover
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* In-Patient Hospitalization */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-pink-400 flex items-center justify-center font-mono text-[9px] font-bold">1</div>
                  <h5 className="font-bold text-xs text-slate-900">In-Patient Hospitalization (IPD)</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Reimburses room boarding, ICU rent, medical practitioner consultation fees, nursing fees, and pharmaceutical drugs during an admission of 24 hours or longer in a registered hospital. Fits room-level sublimits of standard corporate grades (e.g. 1% single private room or 2% ICU caps).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium font-sans">
                  🏥 Cashless admission at partner network hospitals is facilitated worldwide.
                </div>
              </div>

              {/* Day Care Surgery */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-pink-400 flex items-center justify-center font-mono text-[9px] font-bold">2</div>
                  <h5 className="font-bold text-xs text-slate-900">Day Care Procedures & Micro-Surgeries</h5>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-normal">
                  Covers medical interventions or surgeries completed in less than 24 hours due to high-end medical tech evolution (e.g. cataract lasers, dialysis cycles, chemotherapy radiation sessions, minor ENT interventions, or appendicitis incisions).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  ⚡ Hundreds of specific day-care surgeries are supported under cashless limits.
                </div>
              </div>

              {/* Pre and Post Hospitalization */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-pink-400 flex items-center justify-center font-mono text-[9px] font-bold">3</div>
                  <h5 className="font-bold text-xs text-slate-900">Pre/Post Medical Expenses</h5>
                </div>
                <p className="text-xs text-slate-555 leading-relaxed font-normal font-sans">
                  Extends medical cost limits to diagnostic scans, tests, physical consultations, and medicines taken before active hospitalization (standard <strong className="text-slate-950 font-semibold">30 days</strong>) and downstream recovery medicines (standard <strong className="text-slate-950 font-semibold">60 to 90 days</strong>).
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  🩹 Retrospectively claimed alongside parent hospitalization cases.
                </div>
              </div>

              {/* Home Hospitalization (Domiciliary) */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 space-y-3 shadow-3xs hover:border-slate-300 transition">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-pink-400 flex items-center justify-center font-mono text-[9px] font-bold">4</div>
                  <h5 className="font-bold text-xs text-slate-900">Domiciliary & AYUSH Alternative Care</h5>
                </div>
                <p className="text-xs text-slate-555 leading-relaxed font-normal">
                  Covers home-based treatment of diseases (domiciliary) when transfer is risky or ICU beds are unavailable. Also covers natural Indian medical pathways (Ayurveda, Unani, Siddha, Homeopathy, Yoga) taking place in recognized central structures.
                </p>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[11px] text-slate-600 font-medium">
                  🌿 Fully honors standard AYUSH benefits defined by the insurance authority.
                </div>
              </div>

            </div>
          </div>

          {/* Advanced GHI corporate clauses */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-4 p-5 font-sans">
            <h4 className="text-xs font-extrabold text-slate-500 tracking-wider uppercase font-mono">
              The Power of Corporate GHI: Waivers & Buffer Pools
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs text-slate-650">
              
              <div className="bg-pink-50/10 border border-pink-100 p-4.5 rounded-xl space-y-2">
                <span className="font-extrabold text-pink-950 block">🚀 PED Waiver (1st Day Cover)</span>
                <p className="text-[11px] leading-relaxed font-normal">
                  Unlike retail health covers where Pre-Existing Diseases (PED) are excluded for 2 to 4 years, a corporate Group Health policy under standard market wordings typically overrides this waiting period entirely. Employees get complete wellness protection for ailments starting on <strong className="text-slate-950 font-semibold">Day 1 of active coverage</strong>.
                </p>
              </div>

              <div className="bg-pink-50/10 border border-pink-100 p-4.5 rounded-xl space-y-2">
                <span className="font-extrabold text-pink-950 block">👶 Maternity & Baby Day 1 Benefit</span>
                <p className="text-[11px] leading-relaxed font-normal">
                  Designed explicitly for active labor groups. Restores immediate Maternity expenses (Normal/C-Section up to ₹50,000 to ₹100,000 limits) and protects complex neonatal care costs for newborn infants as custom beneficiaries, entirely bypassing typical waiting period exclusions.
                </p>
              </div>

              <div className="bg-pink-50/10 border border-pink-100 p-4.5 rounded-xl space-y-2 font-sans">
                <span className="font-extrabold text-pink-950 block">🏢 Corporate Floater Buffer Pool</span>
                <p className="text-[11px] leading-relaxed font-normal">
                  A dedicated reserve pool managed by the employer (e.g. ₹10 Lakhs to ₹50 Lakhs). If an individual worker's float health limit gets fully drained during massive critical incidents (e.g., organ transplants, bypass surgery, oncology), the corporate buffer pool replenishes their sum insured immediately.
                </p>
              </div>

            </div>
          </div>

          {/* Critical GHI Medical Exclusions */}
          <div className="bg-amber-50/45 border border-amber-205 rounded-2xl p-5 space-y-4 font-sans">
            <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0" />
              Standard Medical Exclusions (Standard Market Wordings)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-amber-950">
              <ul className="space-y-2 list-disc list-inside text-slate-655 font-normal">
                <li><strong className="text-slate-800">Cosmetics & Aesthetics:</strong> Hair transplants, chemical peels, and plastic reconstruction operations, unless directly motivated by accident-based plastic surgery needs.</li>
                <li><strong className="text-slate-800">Obesity Control:</strong> Any weight reduction surgery, dietary adjustments, or nutritional rehabilitation courses.</li>
                <li><strong className="text-slate-805">Gender Reassignment:</strong> Surgical procedures intended to change or restructure biological sex attributes.</li>
              </ul>
              <ul className="space-y-2 list-disc list-inside text-slate-655 font-normal">
                <li><strong className="text-slate-808">Outpatient Wellness (OPD):</strong> Ordinary clinic OPD health consultations, eye refraction testing checkups, or dental decay fillings (except when custom OOP riders are added).</li>
                <li><strong className="text-slate-810">Alternative Therapies/Experimentals:</strong> Medical practices outside established sciences, un-licensed remedies, or clinical trials.</li>
                <li><strong className="text-slate-812">Self-Inflicted & Psych:</strong> Therapy for depression, trauma, or attempted self-harm unless specifically written into psychiatric health riders.</li>
              </ul>
            </div>
          </div>

          {/* Compliance Checklist and Declarations */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-sm font-sans">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
              Corporate Health Insurance Operations Checklist
            </h4>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-pink-400 font-extrabold select-none">•</span>
                <span>Are newly hired employees and dependents registered on the platform portal within the default 30-day grace window?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-pink-400 font-extrabold select-none">•</span>
                <span>Have room rent ceilings (e.g. ₹3,000/day private room limit) been shared clearly to insulate insured staff from co-pay penalties?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-pink-400 font-extrabold select-none">•</span>
                <span>Are employees aware of Pre-authorization timelines (typically 48 hours for planned, 24 hours for emergency cases)?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-pink-400 font-extrabold select-none">•</span>
                <span>Have health card PDFs or digital mobile apps been shared directly with your distributed factory and operations staff?</span>
              </li>
            </ul>
          </div>

          {/* Interactive GHI Questionnaire */}
          <div className="bg-radial from-slate-50 to-pink-50/20 border border-pink-150 rounded-2xl p-5 md:p-6 space-y-5 shadow-3xs animate-fade-in" id="ghi-questionnaire-card">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] bg-pink-50 text-pink-850 font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest block w-max font-sans">Interactive Tool</span>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 font-sans">
                  🏥 GHI Policy Custom Matcher
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium font-sans">
                  Design your corporate healthcare limits, maternity benefits, and pre-existing sickness waiting overrides under standard GHI schedules.
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-pink-400 shrink-0 mt-0.5 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Question 1: Corporate Size */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  1. Corporate Team Size
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setGhiTeamSize("micro_sme")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiTeamSize === "micro_sme"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🌱 Startup / SME (Under 15 staff)</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5 font-sans">Slight early-stage team with standard package limits</div>
                  </button>
                  <button
                    onClick={() => setGhiTeamSize("mid_enterprise")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiTeamSize === "mid_enterprise"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🏢 Enterprise Corp (15+ staff)</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Bespoke customized underwriting with custom room-rent grades</div>
                  </button>
                </div>
              </div>

              {/* Question 2: Maternity Benefit Prioritization */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  2. Family Maternity Focus
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setGhiMaternityScope("yes_maternity")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiMaternityScope === "yes_maternity"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">👶 Critical Maternity Cover</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Cover delivery rooms and newborn infant incubation from Day 1</div>
                  </button>
                  <button
                    onClick={() => setGhiMaternityScope("no_maternity")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiMaternityScope === "no_maternity"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold font-sans">💼 Standalone Employees Only</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Focus priority on active staff in-patient admissions only</div>
                  </button>
                </div>
              </div>

              {/* Question 3: Pre-Existing Disease Waiting Period */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-extrabold text-[11px] uppercase tracking-wider font-mono">
                  3. PED Waiting Periods
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setGhiClassWaivers("day_1_waiver")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiClassWaivers === "day_1_waiver"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-650 bg-white"
                    }`}
                  >
                    <div className="font-bold">🚀 Immediate Day 1 PED Waiver</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Eliminate traditional pre-existing illness exclusions completely</div>
                  </button>
                  <button
                    onClick={() => setGhiClassWaivers("standard_waiting")}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      ghiClassWaivers === "standard_waiting"
                        ? "border-pink-600 bg-pink-50/40 text-slate-955 shadow-3xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-655 bg-white"
                    }`}
                  >
                    <div className="font-bold">⏳ Accept Normal Waiting Terms</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Select standard waits (e.g. 1-2 years) for budget pricing</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Dynamic Results Display */}
            {ghiTeamSize && ghiMaternityScope && ghiClassWaivers ? (
              (() => {
                let layoutMatch = null;
                const isEnterprise = ghiTeamSize === "mid_enterprise";
                
                if (isEnterprise) {
                  layoutMatch = {
                    title: "Bespoke Corporate Group Health (GHI) Plan",
                    desc: "With a mature operational headcount of over 15 employees, your enterprise qualifies for tailored underwriting from leading providers. This unlocks direct custom options, like custom single private room limits (or zero capping) and specific co-payment waivers.",
                    badge: "Enterprise Bespoke Cover",
                    color: "border-pink-155 bg-pink-50/40 text-slate-950",
                    badgeColor: "bg-pink-100 text-pink-900"
                  };
                } else {
                  layoutMatch = {
                    title: "Specialty Micro-SME Group Health Care Plan",
                    desc: "For small startups or boutique shops, selecting a standard Micro-SME Group package provides a fantastic premium-efficient model. These plans bundle necessary in-patient covers with simplified digital health card clearances for small teams.",
                    badge: "Start-up Micro Suit",
                    color: "border-slate-205 bg-slate-50 text-slate-955",
                    badgeColor: "bg-slate-200 text-slate-800"
                  };
                }

                let extraGHIDisplays = [];
                if (ghiClassWaivers === "day_1_waiver") {
                  extraGHIDisplays.push("Day 1 Pre-Existing Disease (PED) Waiver activated! Traditional 2-4 year waiting-periods are overridden; staff ailments are fully insured from their first hour on rolls.");
                } else {
                  extraGHIDisplays.push("Standard Waiting periods apply. Instruct your staff that chronic ailments may require up to 1-2 years before coverage initiates.");
                }

                if (ghiMaternityScope === "yes_maternity") {
                  extraGHIDisplays.push("Maternity & Newborn Baby Day 1 Benefit included. Clears delivery fees (Normal up to ₹50k, C-Section up to ₹75k-100k) and shields neonatal incubators instantly.");
                } else {
                  extraGHIDisplays.push("Standalone individual cover selected. Maternity and neonatal care are bypassed to optimized base budgets.");
                }

                if (isEnterprise) {
                  extraGHIDisplays.push("Highly Advised: Allocate a pooled 'Corporate Floater Buffer' (e.g., ₹5 to ₹10 Lakhs) to backstop extreme major ICU claims when employees drain their individual float limits.");
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`border rounded-xl p-4 md:p-5 text-xs ${layoutMatch.color} space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-pink-100/40">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Recommended Corporate Healthcare Layout</span>
                        <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 font-sans font-sans">
                          🏥 {layoutMatch.title}
                        </h5>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wide w-max ${layoutMatch.badgeColor}`}>
                        {layoutMatch.badge}
                      </span>
                    </div>
                    
                    <p className="leading-relaxed font-sans text-slate-705 font-medium font-sans">
                      {layoutMatch.desc}
                    </p>

                    <div className="space-y-2 border-t border-pink-100/30 pt-3">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-mono font-sans">Custom Underwriting & Waiver Blueprints:</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-655 font-medium leading-relaxed font-sans">
                        {extraGHIDisplays.map((clause, idx) => (
                          <li key={idx}><strong className="text-slate-850 font-semibold text-slate-900">Custom Clause:</strong> {clause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 text-[11px] font-medium text-slate-500 font-sans">
                      <div className="flex items-center gap-1">
                        <span>💡 Cashless Note:</span>
                        <span className="text-slate-705 font-sans">Ensure employees use partner network hospitals to leverage direct cashless settlements.</span>
                      </div>
                      <button
                        onClick={() => {
                          setGhiTeamSize("");
                          setGhiMaternityScope("");
                          setGhiClassWaivers("");
                        }}
                        className="py-1 px-2.5 text-[10px] font-bold bg-white border border-slate-300 text-slate-705 rounded-md hover:bg-slate-50 transition duration-150 cursor-pointer w-max shrink-0 shadow-3xs"
                      >
                        Reset Matcher
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="bg-slate-100/60 border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500 font-semibold py-6 font-sans">
                ✨ Provide your company staff count, family maternity wishes, and PED waiting options above to generate your customized GHI policy advice chart instantly!
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
