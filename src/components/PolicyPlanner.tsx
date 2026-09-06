import React, { useState, useMemo } from "react";
import { 
  Compass, 
  Sparkles, 
  AlertCircle, 
  Info, 
  Anchor, 
  ShieldCheck, 
  RefreshCw, 
  Printer, 
  Heart,
  Users,
  ShieldAlert,
  Shield,
  FileText,
  Flame,
  Building2,
  Cpu,
  Factory,
  Search,
  Filter,
  BookOpen,
  ExternalLink,
  Download,
  Copy,
  CheckCircle2,
  Layers,
  ChevronRight,
  ChevronLeft,
  Check,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import {
  STATUTORY_FIRE_POLICIES,
  PUBLIC_DOMAIN_RESOURCES,
  INSURANCE_DOMAINS_LIST,
  StatutoryFirePolicyType,
  IRDAIReferenceResource
} from "../data/policyData";

type ProtectionDomain = 
  | "commercial_fire" 
  | "engineering_ear_car"
  | "retail_health" 
  | "marine_transit" 
  | "workmen_comp" 
  | "corp_liability" 
  | "group_health" 
  | "group_accident";

type PlannerMode = "wizard" | "regulatory_matrix";

export const INSURER_BRANDS = [
  { id: "suggest_optimal", name: "Insurers - Optimal Advisory (Let BIMA Matchmaker Choose)", desc: "Dynamically select optimal based on your domain profile, AIFT ratings & settlement history" },
  { id: "hdfc", name: "Insurers - HDFC ERGO General", desc: "Top-tier claim turnaround, Optima Secure structures, comprehensive 100% cashless hospital network" },
  { id: "star", name: "Insurers - Star Health & Allied", desc: "Specialized retail health, massive diagnostic hospital network, senior citizen PED programs" },
  { id: "icici", name: "Insurers - ICICI Lombard", desc: "Dynamic commercial lines indemnity, quick cashless approvals, robust cyber and tech E&O underwriting" },
  { id: "religare", name: "Insurers - Care Health (Religare)", desc: "Unlimited automatic restoration, zero room capping, comprehensive health inflation shields" },
  { id: "tata", name: "Insurers - Tata AIG General", desc: "In-patient room upgrade flexibility, global medical covers, robust Marine Return-to-Invoice" },
  { id: "nia", name: "Insurers - New India Assurance", desc: "Premier statutory public brand, highest solvency buffer, reliable AIFT baseline tariff administration" },
  { id: "bajaj", name: "Insurers - Bajaj Allianz General", desc: "Excellent overland transit logistics claim corridors and statutory WC labor lawsuit defense track records" }
];

export const ADDON_OPTIONS: Record<ProtectionDomain, { id: string; label: string; desc: string; statutoryRef?: string; }[]> = {
  commercial_fire: [
    { 
      id: "consequential_loss", 
      label: "Consequential Loss / Fire Loss of Profits (FLOP)", 
      desc: "Reimburses standing overhead charges (bank interest, salaries, rent) and net operating profits lost while physical factory is rebuilt after a fire.",
      statutoryRef: "AIFT Section 7 & Consequential Loss (Fire) Tariff"
    },
    { 
      id: "rvc", 
      label: "Reinstatement Value Clause (RVC)", 
      desc: "Replaces destroyed buildings, machines, and equipment with brand-new equivalents with zero deduction for past operational depreciation.",
      statutoryRef: "AIFT General Rule 9 (Reinstatement Clause)"
    },
    { 
      id: "escalation_clause", 
      label: "Escalation Clause (up to 25% Sum Insured buffer)", 
      desc: "Automatically increases building and plant machinery sums insured during the policy year to account for inflation in construction materials.",
      statutoryRef: "AIFT General Rule 11 (Escalation Provision)"
    },
    { 
      id: "earthquake_stfi", 
      label: "Full Earthquake & STFI extended perils rider", 
      desc: "Explicitly protects against river floods, cyclones, landslides, and seismic shock according to IS 1893:2016 seismic zoning.",
      statutoryRef: "IS 1893:2016 & AIFT Natural Catastrophe Tariffs"
    },
    { 
      id: "debris_removal", 
      label: "Removal of Debris & Hazardous Clearance (Over Statutory Limit)", 
      desc: "Covers heavy site-clearing operations, burnt debris cartage, and crane transport to clear grounds for rebuilding.",
      statutoryRef: "AIFT Endorsement Clause 2"
    },
    { 
      id: "architects_fees", 
      label: "Architects, Surveyors & Consulting Engineers Fees (up to 5% SI)", 
      desc: "Reimburses certified professional fees required to prepare new structural blueprints and statutory rebuilding permits.",
      statutoryRef: "AIFT Endorsement Clause 1"
    },
    { 
      id: "omission_additions", 
      label: "Omission to Insure Additions / Capital Works (5% Automatic Buffer)", 
      desc: "Safeguards newly installed machines and minor extensions added during the year from suffering underinsurance penalties.",
      statutoryRef: "IRDAI Commercial Fire Guidelines"
    },
    { 
      id: "spontaneous_combustion", 
      label: "Spontaneous Combustion & Self-Heating Peril Extension", 
      desc: "Covers organic raw materials (coal, cotton, oilseeds, grain) that catch fire spontaneously without external ignition sources.",
      statutoryRef: "AIFT Section 4 Category B Special Peril"
    }
  ],
  engineering_ear_car: [
    { 
      id: "testing_period_ext", 
      label: "Testing & Commissioning Period Extension (Cold & Hot Runs)", 
      desc: "Crucial extension covering mechanical and electrical breakdown hazards during machinery startup and trial load tests.",
      statutoryRef: "TAC EAR Standard Testing Regulations"
    },
    { 
      id: "cat_72hr_clause", 
      label: "72-Hour Catastrophe / Continuous Event Aggregation Clause", 
      desc: "Treats all storm, flood, inundation, or earthquake losses occurring within 72 consecutive hours as a single deductible event.",
      statutoryRef: "Munich Re / TAC CAR/EAR Standard Clause"
    },
    { 
      id: "surrounding_property", 
      label: "Surrounding Property & Existing Structures Endorsement (Endorsement 001)", 
      desc: "Protects existing adjacent buildings, factory sheds, and switchyards owned by the principal not included in the contract works.",
      statutoryRef: "CAR/EAR Endorsement 001"
    },
    { 
      id: "clearance_debris_car", 
      label: "Clearance & Removal of Burnt or Collapsed Debris (Endorsement 002)", 
      desc: "Reimburses heavy site clearance, demolition rubble hauling, and crane excavation required following collapse or storm damage.",
      statutoryRef: "CAR Endorsement 002"
    },
    { 
      id: "extended_maintenance", 
      label: "Extended Maintenance Warranty Guarantee (12 - 24 Months)", 
      desc: "Protects contractors against damage arising during the defects liability maintenance period and rectifying pre-handover workmanship defects.",
      statutoryRef: "Munich Re Maintenance Standard"
    },
    { 
      id: "cross_liability", 
      label: "Cross Liability Clause (Section II Third-Party Protection)", 
      desc: "Applies third-party liability indemnity separately to each insured party as if a distinct policy had been issued to each contractor.",
      statutoryRef: "CAR Section II Cross-Liability Clause"
    }
  ],
  retail_health: [
    { 
      id: "no_room_rent_cap", 
      label: "Zero Room-Rent Capping Guarantee (No Proportional Deductions)", 
      desc: "Allows choosing single private AC rooms or suites without triggering punitive proportionate deductions on doctors' and surgery bills.",
      statutoryRef: "IRDAI Master Circular June 2024"
    },
    { 
      id: "ped_reduction", 
      label: "PED Pre-Existing Disease Wait Reduction (to 12-24 Months)", 
      desc: "Contracts standard waiting period on declared chronic conditions (diabetes, BP, thyroid) down from 36 months to 12-24 months.",
      statutoryRef: "IRDAI 2024 PED Moratorium Rules"
    },
    { 
      id: "consumables", 
      label: "Consumables Protect (Gloves, Syringes, PPE & Surgical Packs)", 
      desc: "Mandates insurer to pay for non-medical single-use disposal items that TPAs traditionally deduct (10-15% of hospital bill).",
      statutoryRef: "IRDAI Non-Medical List Standard"
    },
    { 
      id: "restoration", 
      label: "Unlimited Automatic Sum Insured Restoration", 
      desc: "Instantly recharges 100% of your policy sum insured upon partial or complete exhaustion for unrelated hospitalizations in the same year.",
      statutoryRef: "Standard Health Feature"
    },
    { 
      id: "ncb_super", 
      label: "No-Claim Bonus (NCB) Super Multiplier Shield", 
      desc: "Accelerates cumulative bonus up to 200% rapidly without resetting to zero in case of a single minor diagnostic claim.",
      statutoryRef: "Retail Health Guidelines"
    },
    { 
      id: "ayush_100", 
      label: "100% AYUSH Inpatient Parity (Ayurveda, Yoga, Homeopathy)", 
      desc: "Full coverage for certified AYUSH hospital treatments on equal terms with allopathic procedures up to full Sum Insured.",
      statutoryRef: "IRDAI AYUSH Treatment Mandate"
    }
  ],
  marine_transit: [
    { 
      id: "icc_a", 
      label: "Institute Cargo Clauses Type A (All-Risks Transit Standard)", 
      desc: "The premier global cargo cover protecting goods against water ingress, rough handling, and maritime General Average salvage shares.",
      statutoryRef: "Institute of London Underwriters (ILU) ICC 2009"
    },
    { 
      id: "warehouse_to_warehouse", 
      label: "Warehouse-to-Warehouse Continuous Transit Clause", 
      desc: "Extends coverage seamlessly from the moment cargo is packed at the supplier's warehouse until delivered at the recipient's dock.",
      statutoryRef: "Marine Transit Standard Rule"
    },
    { 
      id: "srcc", 
      label: "Strikes, Riots, Civil Commotions & War Perils Extension", 
      desc: "Protects shipments against losses arising from port worker strikes, civil blockades, or geopolitical transit disruptions.",
      statutoryRef: "Institute War & Strikes Clauses"
    },
    { 
      id: "cif_110", 
      label: "110% CIF Valuation Clause (Duty & Incidental Freight)", 
      desc: "Values cargo at 110% of Cost + Insurance + Freight to cover customs tariffs, import taxes, and buyer margin protection.",
      statutoryRef: "Incoterms & Marine Insurance Act 1963"
    },
    { 
      id: "seller_interest", 
      label: "Seller's Contingency Interest Protection Clause", 
      desc: "Guarantees financial fallback if the overseas buyer refuses acceptance or fails to deposit documentary trade letters of credit.",
      statutoryRef: "Marine Trade Credit Standard"
    }
  ],
  workmen_comp: [
    { 
      id: "contractor_crew", 
      label: "Contractor & Subcontractor Crew Extension (Section 12 EC Act)", 
      desc: "Extends statutory compensation to contract laborers and temporary agency personnel working on your industrial premises.",
      statutoryRef: "Employee's Compensation Act 1923 Sec 12"
    },
    { 
      id: "common_law", 
      label: "Table B Common Law Employer Negligence Legal Defense", 
      desc: "Funds senior legal defense advocates and settles civil court negligence lawsuits awarded above statutory Act schedules.",
      statutoryRef: "Table B Common Law Liability"
    },
    { 
      id: "amer", 
      label: "Accidental Medical Expenses Reimbursement (AMER)", 
      desc: "Reimburses immediate hospital emergency triage, surgical stitching, and intensive ICU care following on-duty accidents.",
      statutoryRef: "WC Endorsement AMER Rule"
    },
    { 
      id: "occupational_diseases", 
      label: "Occupational Diseases Schedule III Extension", 
      desc: "Provides compensation for factory-induced chronic health ailments (silicosis, asbestosis, chemical dermatitis, hearing loss).",
      statutoryRef: "EC Act 1923 Schedule III"
    }
  ],
  corp_liability: [
    { 
      id: "dpdp_cyber", 
      label: "DPDP Act 2023 Forensic Audit, Ransomware & Notification Cover", 
      desc: "Funds cybersecurity forensics, ransom negotiation specialists, customer notification, and regulatory defense under DPDP Act 2023.",
      statutoryRef: "Digital Personal Data Protection Act 2023"
    },
    { 
      id: "d_o_shield", 
      label: "Directors & Officers (D&O) Personal Assets Shield (Side A/B/C)", 
      desc: "Safeguards board members' personal homes, savings, and investments against shareholder class-action suits or regulatory probes.",
      statutoryRef: "Companies Act 2013 D&O Standard"
    },
    { 
      id: "retroactive", 
      label: "Retroactive Date Coverage (36+ Months Backtrack)", 
      desc: "Protects against code vulnerabilities, API bugs, or service errors shipped in previous years before current policy purchase.",
      statutoryRef: "E&O Claims-Made Doctrine"
    },
    { 
      id: "global_jurisdiction", 
      label: "Worldwide Global Legal Jurisdiction (including US & Canada)", 
      desc: "Authorizes defense coverage and settlements inside North American, European, and international cross-border court venues.",
      statutoryRef: "Cross-Border Commercial Terms"
    }
  ],
  group_health: [
    { 
      id: "day_1_ped", 
      label: "Day-1 Pre-Existing Disease & Maternity Waiver", 
      desc: "Bypasses all standard waiting cooling periods for employee chronic ailments (diabetes, hypertension) and immediate childbirth.",
      statutoryRef: "Corporate GHI Underwriting Standard"
    },
    { 
      id: "corporate_buffer", 
      label: "Corporate Sum Insured Emergency Pool Buffer (₹10 - ₹25 Lakhs)", 
      desc: "Establishes a shared employer-held emergency fund to sponsor critical multi-organ surgeries when individual limits are exhausted.",
      statutoryRef: "Group Health Treaty Buffer"
    },
    { 
      id: "opd_mental_wellness", 
      label: "Outpatient OPD Consultations, Diagnostics & Mental Wellness", 
      desc: "Covers daily telemedicine doctor visits, pharmacy bills, diagnostic blood panels, and clinical psychologist sessions.",
      statutoryRef: "IRDAI Corporate Wellness Framework"
    }
  ],
  group_accident: [
    { 
      id: "ttd_salary", 
      label: "Temporary Total Disablement (TTD) 1% Weekly Bedridden Salary Support", 
      desc: "Pays 1% of the employee's sum insured weekly to replace lost income while bedridden and recovering from accidental trauma.",
      statutoryRef: "GPA Standard Policy Conditions"
    },
    { 
      id: "air_ambulance", 
      label: "Emergency Air Ambulance Helicopter Evacuation", 
      desc: "Funds emergency air ambulance flights from remote highway or industrial accident sites directly to tier-1 trauma centers.",
      statutoryRef: "GPA Emergency Evacuation Rider"
    },
    { 
      id: "child_education", 
      label: "Dependent Child Education Tuition Assistance Fund", 
      desc: "Provides a guaranteed lump sum educational grant for up to 2 dependent children in the tragic event of fatal accident or permanent total disablement.",
      statutoryRef: "Welfare Education Endorsement"
    }
  ]
};

interface MatchmakerAnswer {
  domain?: ProtectionDomain;
  step1?: string;
  step2_insurer?: string;
  step2_addons?: string[];
  // AIFT Fire specific fields
  propertyType?: string;
  assetSumInsuredCrores?: number;
  occupancyHazardId?: string;
  feaTierId?: string;
}

export default function PolicyPlanner() {
  const [plannerMode, setPlannerMode] = useState<PlannerMode>("wizard");
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3>(0);
  const [answers, setAnswers] = useState<MatchmakerAnswer>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);

  // Regulatory matrix filter
  const [matrixCategory, setMatrixCategory] = useState<string>("All");
  const [matrixSearch, setMatrixSearch] = useState<string>("");

  // Restart diagnostic flow
  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  // Move back in wizard
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as any);
      setIsSubmitted(false);
    }
  };

  // Selections
  const handleSelectDomain = (domain: ProtectionDomain) => {
    setAnswers({ 
      domain, 
      step2_insurer: "suggest_optimal", 
      step2_addons: [],
      assetSumInsuredCrores: domain === "commercial_fire" ? 15 : undefined,
      occupancyHazardId: "chemical_petro",
      feaTierId: "fea_15"
    });
    setCurrentStep(2);
  };

  const handleSelectStep1 = (val: string) => {
    setAnswers(prev => ({ ...prev, step1: val }));
    setCurrentStep(3);
  };

  const selectInsurer = (val: string) => {
    setAnswers(prev => ({ ...prev, step2_insurer: val }));
  };

  const toggleAddon = (addonVal: string) => {
    setAnswers(prev => {
      const currentAddons = prev.step2_addons || [];
      const updatedAddons = currentAddons.includes(addonVal)
        ? currentAddons.filter(item => item !== addonVal)
        : [...currentAddons, addonVal];
      return { ...prev, step2_addons: updatedAddons };
    });
  };

  const handleGenerateReport = () => {
    setIsSubmitted(true);
  };

  // ------------------------------------------------------------------------
  // Helper to determine Statutory Fire Policy Type from Sum Insured (Crores)
  // ------------------------------------------------------------------------
  const getStatutoryFirePolicyForSI = (siCrores: number, isDwelling = false): StatutoryFirePolicyType => {
    if (isDwelling) {
      return STATUTORY_FIRE_POLICIES.find(p => p.id === "bgr") || STATUTORY_FIRE_POLICIES[0];
    }
    if (siCrores <= 5) {
      return STATUTORY_FIRE_POLICIES.find(p => p.id === "bsus") || STATUTORY_FIRE_POLICIES[1];
    }
    if (siCrores <= 50) {
      return STATUTORY_FIRE_POLICIES.find(p => p.id === "blus") || STATUTORY_FIRE_POLICIES[2];
    }
    if (siCrores <= 100) {
      return STATUTORY_FIRE_POLICIES.find(p => p.id === "sfsp") || STATUTORY_FIRE_POLICIES[3];
    }
    return STATUTORY_FIRE_POLICIES.find(p => p.id === "iar") || STATUTORY_FIRE_POLICIES[4];
  };

  // ------------------------------------------------------------------------
  // Comprehensive Recommendation Engine
  // ------------------------------------------------------------------------
  const getRecommendation = () => {
    const { domain, step1, step2_insurer, step2_addons, assetSumInsuredCrores } = answers;

    let title = "Comprehensive Indemnity Risk Protection Package";
    let planType = "Statutory General Indemnity Coverage";
    let themeColor = "#0f172a";
    let statutoryStandard = "IRDAI / Public Domain Regulatory Reference";
    let explanation = "Our diagnostic underwriting engine mapped your requirements against public domain regulatory standards, indemnity principles, and statutory baseline guidelines.";
    let checklist: string[] = [];
    let suitabilityScore = 94;
    let aiftDetails: { policyName?: string; irdaiRef?: string; feaDiscount?: string; avgClauseWaiver?: string } = {};

    const insurerId = step2_insurer || "suggest_optimal";
    const insurerBrand = INSURER_BRANDS.find(b => b.id === insurerId);
    const insurerName = insurerBrand ? insurerBrand.name : "Optimal Advisory Partner";

    // 1. Domain-specific intelligence
    if (domain === "commercial_fire") {
      themeColor = "#ea580c"; // orange-600
      
      const isHome = step1 === "home_dwelling";
      const isMicro = step1 === "micro_under_5cr";
      const isSme = step1 === "sme_5_to_50cr";
      const isMid = step1 === "mid_50_to_100cr";
      const isEnterprise = step1 === "enterprise_above_100cr";

      let targetSI = assetSumInsuredCrores || 15;
      if (isHome) targetSI = 2;
      else if (isMicro) targetSI = 3.5;
      else if (isSme) targetSI = 25;
      else if (isMid) targetSI = 75;
      else if (isEnterprise) targetSI = 250;

      const statPolicy = getStatutoryFirePolicyForSI(targetSI, isHome);
      planType = `${statPolicy.name} (${statPolicy.hindiName})`;
      statutoryStandard = `IRDAI Guideline ${statPolicy.irdaiRef} & TAC All India Fire Tariff`;
      
      aiftDetails = {
        policyName: statPolicy.name,
        irdaiRef: statPolicy.irdaiRef,
        feaDiscount: "Eligible for 5% to 25% statutory FEA rebate per TAC Fire Protection Manual",
        avgClauseWaiver: statPolicy.underinsuranceWaiverPercent === 100 
          ? "Average Clause Deleted (Zero underinsurance penalty on dwellings)"
          : `${statPolicy.underinsuranceWaiverPercent}% Statutory Underinsurance buffer applied`
      };

      if (isHome) {
        title = "Bharat Griha Raksha Comprehensive Dwelling Cover";
        explanation = `Under IRDAI standard guidelines (Ref: ${statPolicy.irdaiRef}), residential dwellings are insured under Bharat Griha Raksha. The legacy Standard Fire average clause is completely deleted, meaning homeowners are never penalized with pro-rata deductions if construction costs fluctuate. An automatic 20% of building sum insured is granted for general household contents without itemized declaration. STFI (Flood/Cyclone), Earthquake (IS 1893), and Terrorism are in-built with zero surcharge.`;
      } else if (isMicro) {
        title = "Bharat Sookshma Udyam Suraksha (Micro Enterprise Tariff)";
        explanation = `For micro-enterprises, small workshops, and retail stores with total asset value up to ₹5 Crores at one location, IRDAI mandates Bharat Sookshma Udyam Suraksha. This statutory product features a 15% underinsurance waiver (if your declared sum insured is at least 85% of actual value, full loss is paid without penalty). In-built STFI, Earthquake, Terrorism, and 15% capital additions allowance protect your balance sheet without expensive riders.`;
      } else if (isSme) {
        title = "Bharat Laghu Udyam Suraksha (SME Manufacturing Suite)";
        explanation = `For commercial enterprises with total assets between ₹5 Crores and ₹50 Crores, Bharat Laghu Udyam Suraksha is the mandatory IRDAI standard contract. It provides uniform, uncompromised terms across all Indian general insurers, incorporating in-built 15% capital additions, 10% temporary removal of machinery for repair, and Reinstatement Value Clause (RVC) on brand new replacement costs.`;
      } else if (isMid) {
        title = "Standard Fire & Special Perils (AIFT Mid-Corporate Section 1-8)";
        explanation = `For corporate installations between ₹50 Crores and ₹100 Crores, coverage is governed by the Tariff Advisory Committee (TAC) All India Fire Tariff (AIFT). Pricing is determined by occupancy hazard grading (Sections 4 Industrial, 5 Hazardous Chemical, or 6 Storage). Installing automatic sprinkler networks (IS 15105) and internal yard hydrants qualifies the risk for up to 25% statutory FEA discounts. Consequential Loss / Fire Loss of Profits (FLOP) is highly recommended.`;
      } else {
        title = "Industrial All Risks (IAR) & Mega Risk Treaty";
        explanation = `For large enterprise complexes with sum insured exceeding ₹100 Crores, standard named-perils policies are insufficient. You require the Industrial All Risks (IAR) package treaty. It unifies Section I Material Damage (all-risks accidental physical damage and machinery breakdown) and Section II Fire & Machinery Loss of Profits (FLOP/MLOP) under one consolidated wording with zero gaps in operational coverage.`;
      }

      checklist = [
        `Statutory Policy Mapping: Auto-classified as ${statPolicy.name} with standard deductible: ${statPolicy.deductible}.`,
        "Reinstatement Value Clause (RVC): Ensure Building and Plant & Machinery are declared at current replacement cost (not book/depreciated value) to avoid average clause deductions.",
        "Underinsurance Vigilance: Conduct annual structural and equipment re-valuations to ensure values remain above the 85% statutory threshold.",
        "Fire Extinguishing Appliances (FEA): Maintain valid ISI-marked fire extinguishers (IS 2190) and hydrant test logs to secure up to 25% statutory premium rebates."
      ];
    } else if (domain === "engineering_ear_car") {
      themeColor = "#d97706"; // amber-600
      statutoryStandard = "Munich Re / TAC Standard Engineering Tariff (CAR/EAR)";
      planType = "Combined Section I Material Damage + Section II TPL Project Policy";

      const isCar = step1 === "civil_construction";
      const isEar = step1 === "plant_machinery";

      if (isCar) {
        title = "Contractor's All Risks (CAR) Civil Infrastructure Suite";
        explanation = "For civil construction works (commercial buildings, bridges, metro corridors, highway flyovers), Contractor's All Risks (CAR) is the statutory engineering benchmark. Section I indemnifies material damage caused by flood, inundation, earthquake, landslide, and site structural collapse. Section II wraps comprehensive Third-Party Liability (TPL) defending against cross-liability suits, neighbor property subsidence, and public roadway injury.";
      } else if (isEar) {
        title = "Erection All Risks (EAR) Plant & Machinery Installation Suite";
        explanation = "For heavy industrial machinery assembly, electrical turbines, power plants, and automated conveyor lines, Erection All Risks (EAR) provides indispensable project protection. Coverage begins upon equipment unloading at the jobsite, continues through intermediate storage and crane lifting, and critically protects through the cold and hot testing & commissioning phase where breakdown and electrical fire hazards peak.";
      } else {
        title = "Turnkey EPC Infrastructure CAR / EAR Hybrid Treaty";
        explanation = "For integrated EPC infrastructure works combining both extensive civil engineering structures and heavy electro-mechanical plant erection, a blended CAR/EAR package prevents inter-contractor coverage disputes and guarantees seamless protection under a single 72-hour catastrophe aggregation clause and extended defects maintenance period.";
      }

      checklist = [
        "Testing & Commissioning Period: Verify that the testing period endorsement strictly mirrors the mechanical cold/hot trial schedule (typically 4 to 12 weeks).",
        "72-Hour Catastrophe Event Clause: Confirm that storm, flood, and earthquake occurrences within 72 consecutive hours are aggregated into a single deductible.",
        "Surrounding Property (Endorsement 001): Ensure pre-existing facilities or nearby owner-owned installations are insured against crane collapse and excavation damage.",
        "Cross-Liability Extension: Verify that each contractor, sub-contractor, and the project principal are treated as separate insureds under Section II TPL."
      ];
    } else if (domain === "retail_health") {
      themeColor = "#059669"; // emerald-600
      statutoryStandard = "IRDAI Master Circular on Health Insurance (June 2024 Ref: 2024/06)";
      planType = "Comprehensive Personal & Family Floater Health Indemnity";

      const isYoung = step1 === "young";
      const isMid = step1 === "mid";

      if (isYoung) {
        title = "Optima Shield Early-Career Professional Health Plan";
        explanation = "Under the IRDAI 2024 Master Circular, young adults (18-35) entering the health insurance pool lock in the lowest lifetime entry brackets. Your core strategy should focus on building the cumulative No-Claim Bonus (NCB) up to 200% and securing zero room-rent capping. This establishes an unassailable financial shield before lifestyle-related medical conditions develop.";
      } else if (isMid) {
        title = "Optima Family Floater Health & Maternity Shield";
        explanation = "For families with dependent children, a shared family floater provides the most cost-efficient protection. Per 2024 IRDAI mandates, ensure your policy has zero room-rent capping to avoid proportional deductions on surgery and ICU fees. Pre-Existing Disease (PED) waiting periods across all Indian insurers are now legally capped at a maximum of 36 months.";
      } else {
        title = "Senior Citizen Dignity Healthcare Plan (Zero Age-Bar)";
        explanation = "Pursuant to the landmark IRDAI April/June 2024 notification, the maximum entry age bar (previously 65 years) has been completely abolished. Insurers are legally mandated to offer health products to senior citizens of any age. Focus on securing 100% AYUSH hospital parity, pre-existing disease waivers, and modest co-pay options (10-20%) to keep annual premiums affordable.";
      }

      checklist = [
        "Zero Room-Rent Capping: Ensure your policy has 'No Room Rent Sub-Limit' so you are never penalized with proportional cuts across your entire hospital bill.",
        "Cashless Everywhere Guarantee: Under the GI Council & IRDAI initiative, you are entitled to cashless admission at ANY registered hospital in India within 1 hour.",
        "36-Month Max PED Cap: All pre-existing disease waiting periods cannot exceed 36 months, with full moratorium protection after 60 continuous months.",
        "100% AYUSH Parity: Inpatient Ayurvedic, Homeopathic, and Unani treatments must be reimbursed on equal terms with allopathy up to the full sum insured."
      ];
    } else if (domain === "marine_transit") {
      themeColor = "#4f46e5"; // indigo-600
      statutoryStandard = "Institute Cargo Clauses (ICC 2009) & Marine Insurance Act 1963";
      planType = "Marine Cargo Open Cover / Inland Transit Open Policy";

      const isSea = step1 === "sea";
      const isAir = step1 === "air";

      if (isSea) {
        title = "Institute Cargo Clauses (A) Global Maritime Suite";
        explanation = "International ocean freight faces complex perils, including vessel capsizing, seawater ingress, container loss overboard, and General Average salvage contributions. Applying Institute Cargo Clauses (A) [All-Risks] provides the highest standard of international protection against physical maritime damage.";
      } else if (isAir) {
        title = "Institute Cargo Clauses (Air) Express Logistics Shield";
        explanation = "Air freight provides rapid delivery for high-value microprocessors, biotech therapeutics, and precision tooling. Institute Cargo Clauses (Air) cover handling shock, tarmac exposure, transit turbulence, and airport terminal storage.";
      } else {
        title = "Inland Transit Clauses (ITC-A) National Freight Policy";
        explanation = "Domestic road and rail transport encounters frequent highway collision risks, vehicular overturning, bridge washouts, and terminal theft. Sourcing an Inland Transit Clauses (ITC-A) All-Risks open policy with a Warehouse-to-Warehouse extension guarantees end-to-end supply chain resilience.";
      }

      checklist = [
        "110% CIF Valuation Rule: Always declare sums insured at 110% of Cost + Insurance + Freight to cover customs tariffs, landing fees, and business profit margins.",
        "Warehouse-to-Warehouse Clause: Confirm transit protection attaches from initial loading at the supplier's warehouse until final unloading at the destination dock.",
        "Institute Cargo Clauses (A): Ensure All-Risks cover is specified. Avoid restrictive named-peril classes (ICC-B or ICC-C) for finished manufactured goods."
      ];
    } else if (domain === "workmen_comp") {
      themeColor = "#0891b2"; // cyan-600
      statutoryStandard = "Employee's Compensation Act, 1923 (Amended 2020 Rules)";
      planType = "Combined Table A + Table B Employer Liability Policy";

      const isHazardous = step1 === "hazardous";
      if (isHazardous) {
        title = "Comprehensive Industrial Workforce Compliance Shield";
        explanation = "For manufacturing plants, heavy machinery assembly, and warehousing setups, physical accident risks are elevated. Employers must maintain dual Table A (Statutory EC Act liability formulas) and Table B (Common Law negligence defense). This covers both statutory compensation schedules and defends against civil lawsuits filed in civil courts.";
      } else {
        title = "Statutory Table A Commercial Employer Compliance Cover";
        explanation = "For clerical, software, and administrative teams, physical workplace hazards are low. A statutory Table A policy fulfills legal requirements under state labor laws, covering on-duty travel accidents, occupational exposure, and commuting trauma during active duty.";
      }

      checklist = [
        "Wage Declaration Audit: Accurately declare monthly wage sheets including overtime, as claim payouts are calculated as a statutory percentage of monthly base salary (50% for death / 60% for PTD).",
        "Section 12 Subcontractor Extension: Ensure contract agency workers and temporary facility labor are explicitly endorsed under your policy schedule.",
        "Accidental Medical Expenses (AMER): Add AMER riders to reimburse immediate private hospital emergency treatment and surgical stitching bills."
      ];
    } else if (domain === "corp_liability") {
      themeColor = "#0d9488"; // teal-600
      statutoryStandard = "Digital Personal Data Protection (DPDP) Act 2023 & Companies Act 2013";
      planType = "Combined Cyber Risk, Tech E&O & D&O Corporate Shield";

      const isCyber = step1 === "cyber_software";
      if (isCyber) {
        title = "SaaS Professional Indemnity & DPDP Cyber Risk Shield";
        explanation = "For tech firms, cloud agencies, and database operators, data leaks, software bugs, and ransomware extortion represent acute balance sheet threats. With the enactment of India's DPDP Act 2023, penalties for data security failures can reach ₹250 Crores. Combining Errors & Omissions (E&O) with Cyber Risk covers forensic audit investigations, ransom negotiations, and customer liability claims.";
      } else {
        title = "Commercial General Liability (CGL) Premises & Products Safeguard";
        explanation = "For commercial showrooms, hospitality venues, and retail networks, primary exposures center on third-party slip-and-fall injuries and defective product damages. A Commercial General Liability (CGL) program covers defense legal costs and settles customer claims.";
      }

      checklist = [
        "DPDP Act 2023 Compliance: Include coverage for mandatory data breach forensic audits, public relation crisis management, and Data Protection Board defense.",
        "Retroactive Date Maintenance: Verify that your underwriter writes in an unbroken retroactive date to protect past code deployments and legacy databases.",
        "Global Jurisdiction: Ensure your policy territorial limits cover North American and international cross-border client service contracts."
      ];
    } else if (domain === "group_health") {
      themeColor = "#1e1b4b"; // indigo-950
      statutoryStandard = "IRDAI Corporate Health Guidelines & GHI Underwriting Rules";
      planType = "Enterprise Group Health Insurance (GHI) Treaty";

      title = "Enterprise Group Health Treaty (Custom Floater & Buffer Pool)";
      explanation = "A customized corporate group health program provides superior employee welfare, offering Day-1 coverage for pre-existing diseases, zero room-rent sub-limits, executive single private AC rooms, and an employer-held Corporate Emergency Buffer Pool (₹10 to ₹25 Lakhs) to sponsor critical organ transplants and major surgeries.";

      checklist = [
        "Day-1 PED & Maternity Waiver: Ensure standard 36-month waiting periods are waived for all employees and their dependent spouses/children.",
        "Zero Co-Payment & Room Caps: Remove restrictive co-pays and room-rent sub-limits to prevent out-of-pocket claim surprises for staff.",
        "Corporate Emergency Buffer: Maintain a dedicated corporate pool fund to assist employees facing catastrophic healthcare bills exceeding their base sum insured."
      ];
    } else if (domain === "group_accident") {
      themeColor = "#c2410c"; // orange-700
      statutoryStandard = "General Insurance Council GPA Standards & Labor Welfare Guidelines";
      planType = "Group Personal Accident (GPA) 24/7 Worldwide Policy";

      title = "Enhanced Group Personal Accident Suite with Weekly TTD Salary";
      explanation = "For field employees, sales teams, and logistical crews who travel frequently, roadside transit hazards are heightened. Adding Temporary Total Disablement (TTD) is essential. If an accident leaves an employee bedridden, TTD pays 1% of their sum insured weekly to replace lost income during recovery.";

      checklist = [
        "1% Weekly TTD Salary Benefit: Protects injured employees against loss of earnings during prolonged orthopedic or trauma rehabilitation.",
        "Air Ambulance Helicopter Evacuation: Covers rapid airlift from remote transit sites directly to tertiary trauma hospital facilities.",
        "24/7 Worldwide Protection: Covers accidental injury around the clock, both on-duty and off-duty, globally."
      ];
    }

    // 2. Format custom insurer notes & highlights
    let insurerHighlight = "";
    if (insurerId === "hdfc") {
      insurerHighlight = "Selected Carrier: Insurers - HDFC ERGO General — Offering 100% cashless hospital network access, rapid turnaround times, and Optima Secure multiplier structures.";
    } else if (insurerId === "star") {
      insurerHighlight = "Selected Carrier: Insurers - Star Health & Allied — Backed by specialized retail health protocols, expansive diagnostic hospital networks, and dedicated senior citizen programs.";
    } else if (insurerId === "icici") {
      insurerHighlight = "Selected Carrier: Insurers - ICICI Lombard — Sourced with high-tier commercial E&O clauses, robust asset schedules, and fast-track cashless corporate settlement corridors.";
    } else if (insurerId === "religare") {
      insurerHighlight = "Selected Carrier: Insurers - Care Health (Religare) — Sourced with unlimited automatic restoration of limits, zero room caps, and comprehensive inflation shields.";
    } else if (insurerId === "tata") {
      insurerHighlight = "Selected Carrier: Insurers - Tata AIG General — Sourced with flexible room upgrade terms, global medical coverage, and Return-to-Invoice marine parameters.";
    } else if (insurerId === "nia") {
      insurerHighlight = "Selected Carrier: Insurers - New India Assurance — India's premier public sector general insurer with supreme solvency ratio stability and robust AIFT baseline tariff execution.";
    } else if (insurerId === "bajaj") {
      insurerHighlight = "Selected Carrier: Insurers - Bajaj Allianz General — Top-rated logistics claim settlement track record and proven employer liability legal defense.";
    } else {
      insurerHighlight = "Optimal Advisory Recommendation: We recommend cross-evaluating quotes between Insurers - New India Assurance, Insurers - Tata AIG, and Insurers - ICICI Lombard for this risk profile.";
    }

    explanation = `${explanation}\n\n${insurerHighlight}`;

    // 3. Process Checked Add-Ons
    const activeAddons = step2_addons || [];
    if (activeAddons.length > 0) {
      activeAddons.forEach(addonId => {
        const matchedOpt = ADDON_OPTIONS[domain!]?.find(o => o.id === addonId);
        if (matchedOpt) {
          checklist.unshift(`Selected Policy Add-On [${matchedOpt.label}]: ${matchedOpt.desc} (${matchedOpt.statutoryRef || "Standard Clause"})`);
        }
      });
      suitabilityScore = Math.min(99, suitabilityScore + (activeAddons.length * 2));
    } else {
      checklist.unshift("No optional Add-On Coverages selected. We recommend including key endorsements (e.g. RVC for property or Consumables for health) to prevent out-of-pocket claim deductions.");
    }

    return { 
      title, 
      planType, 
      themeColor, 
      statutoryStandard, 
      explanation, 
      checklist, 
      suitabilityScore, 
      aiftDetails,
      selectedDomain: domain,
      selectedInsurerName: insurerName
    };
  };

  const matchedReportResult = isSubmitted ? getRecommendation() : null;

  // ------------------------------------------------------------------------
  // PDF Report Downloader Core Function
  // ------------------------------------------------------------------------
  const downloadReportAsPDF = () => {
    if (!matchedReportResult) return;
    const reportValue = matchedReportResult;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const cleanPDFText = (text: string): string => {
      if (!text) return "";
      return text
        .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "")
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const primaryColor = { r: 15, g: 23, b: 42 }; // slate-900
    const secondaryColor = { r: 16, g: 185, b: 129 }; // emerald-500
    const grayText = { r: 71, g: 85, b: 105 };
    const bodyText = { r: 51, g: 65, b: 85 };
    const darkText = { r: 15, g: 23, b: 42 };

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (margin * 2);

    let y = 18;

    // Header Banner
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(margin, y, contentWidth, 24, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("BIMA Unified Policy Matchmaker & AIFT Underwriter", margin + 6, y + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
    doc.text("Statutory Needs Analysis  |  AIFT & IRDAI Master Circular Standard References", margin + 6, y + 16);

    y += 30;

    // Category Badge Bar
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 8, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 8, "S");

    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(`REGULATORY DOMAIN: ${cleanPDFText(reportValue.statutoryStandard).toUpperCase()}`, margin + 5, y + 5.5);

    y += 14;

    // Document Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    doc.text(cleanPDFText(reportValue.title), margin, y);

    y += 5.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(grayText.r, grayText.g, grayText.b);
    doc.text(`Statutory Product Class: ${cleanPDFText(reportValue.planType)}  |  Suitability Index: ${reportValue.suitabilityScore}%`, margin, y);

    y += 8;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);

    y += 8;

    // Fact Finder Declarations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text("Fact Finder Declarations & Underwriting Parameters", margin, y);
    y += 5.5;

    const insurerId = answers.step2_insurer || "suggest_optimal";
    const selectedBrand = INSURER_BRANDS.find(b => b.id === insurerId)?.name || "Optimal Advisory Fit";
    const activeAddonsCount = answers.step2_addons ? answers.step2_addons.length : 0;

    const mappingTable = [
      { label: "Target Protection Area", val: answers.domain ? answers.domain.replace("_", " ").toUpperCase() : "COMMERCIAL PROPERTY" },
      { label: "Risk Profile / Asset Size", val: answers.step1 || "Standard Profile" },
      { label: "Preferred Carrier Partner", val: selectedBrand },
      { label: "Selected Coverage Endorsements", val: activeAddonsCount > 0 ? `${activeAddonsCount} Active Endorsements Added` : "Standard Base Package" },
      { label: "Suitability Rating", val: `${reportValue.suitabilityScore}% Compliance Match` }
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    mappingTable.forEach(row => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(grayText.r, grayText.g, grayText.b);
      doc.text(cleanPDFText(row.label), margin + 4, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(darkText.r, darkText.g, darkText.b);
      doc.text(`:  ${cleanPDFText(row.val)}`, margin + 65, y);
      y += 5.5;
    });

    y += 5;

    // Rationale Box
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text("Underwriting & Statutory Strategic Rationale", margin, y);
    y += 5.5;

    const explanationClean = cleanPDFText(reportValue.explanation);
    const explanationLines = doc.splitTextToSize(explanationClean, contentWidth - 10);
    const boxHeight = (explanationLines.length * 4.5) + 10;

    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, contentWidth, boxHeight, "F");
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(margin, y, 1.5, boxHeight, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, boxHeight, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text("Strategic Underwriting Analysis:", margin + 5, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(bodyText.r, bodyText.g, bodyText.b);
    explanationLines.forEach((line: string, i: number) => {
      doc.text(line, margin + 5, y + 10 + (i * 4.5));
    });

    y += boxHeight + 8;

    // Coverage Vigilance Checklist
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text("Coverage Vigilance & Statutory Compliance Checklist", margin, y);
    y += 5.5;

    reportValue.checklist.forEach((item, index) => {
      const itemClean = cleanPDFText(item);
      const checklistLines = doc.splitTextToSize(itemClean, contentWidth - 18);
      const itemHeight = (checklistLines.length * 4.5) + 3;

      if (y + itemHeight > pageHeight - 35) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      doc.text(`[${index + 1}] `, margin + 4, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(bodyText.r, bodyText.g, bodyText.b);
      checklistLines.forEach((line: string, i: number) => {
        doc.text(line, margin + 12, y + (i * 4.5));
      });
      
      y += itemHeight;
    });

    y += 6;

    // Disclaimer
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(254, 243, 199);
    doc.rect(margin, y, contentWidth, 20, "F");
    doc.setDrawColor(251, 191, 36);
    doc.rect(margin, y, contentWidth, 20, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(180, 83, 9);
    doc.text("Statutory Consumer Advisory (IRDA Act 1999 & TAC AIFT Standard)", margin + 5, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(bodyText.r, bodyText.g, bodyText.b);
    const disclaimerLines = doc.splitTextToSize(
      "Outputs are mapped against public domain IRDAI master circulars, the All India Fire Tariff (AIFT), and General Insurance Council benchmarks. Designed strictly for educational reference and pre-underwriting needs analysis.",
      contentWidth - 10
    );
    disclaimerLines.forEach((line: string, i: number) => {
      doc.text(line, margin + 5, y + 9 + (i * 3.5));
    });

    // Footer
    y = pageHeight - 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("BIMA POLICY SUITABILITY & AIFT UNDERWRITING SPECIFICATION LEDGER", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Generated: ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`,
      pageWidth - margin,
      y,
      { align: "right" }
    );

    doc.save(`BIMA_Policy_Needs_${answers.domain?.toUpperCase()}_Report.pdf`);
  };

  const copyBrokerSpecSheet = () => {
    if (!matchedReportResult) return;
    const spec = `=====================================================
BIMA POLICY MATCHMAKER & STATUTORY SPEC SHEET
=====================================================
Target Protection Domain: ${matchedReportResult.selectedDomain}
Recommended Product: ${matchedReportResult.planType}
Statutory Reference: ${matchedReportResult.statutoryStandard}
Suitability Compliance Score: ${matchedReportResult.suitabilityScore}%
Preferred Carrier Partner: ${matchedReportResult.selectedInsurerName}

STRATEGIC RATIONALE:
${matchedReportResult.explanation}

STATUTORY ACTION CHECKLIST & ENDORSEMENTS:
${matchedReportResult.checklist.map((item, i) => `${i + 1}. ${item}`).join("\n")}

Generated via BimaCompass Open Regulatory Advisor (AIFT & IRDAI Aligned)
=====================================================`;
    navigator.clipboard.writeText(spec);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 3000);
  };

  // Filtered Public Resources in Regulatory Matrix tab
  const filteredResources = useMemo(() => {
    return PUBLIC_DOMAIN_RESOURCES.filter(res => {
      const matchCat = matrixCategory === "All" || res.category === matrixCategory;
      const matchText = matrixSearch === "" || 
        res.title.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        res.summary.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        res.authority.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        res.keyConsumerClauses.some(c => c.toLowerCase().includes(matrixSearch.toLowerCase()));
      return matchCat && matchText;
    });
  }, [matrixCategory, matrixSearch]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs animate-fade-in transition-all duration-200" id="policy-planner-root">
      
      {/* Header Panel with Mode Switcher */}
      <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500/20 text-sky-300 p-2.5 rounded-xl border border-sky-500/30 shrink-0">
              <Compass className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold tracking-tight text-white font-sans flex items-center gap-2">
                <span>Find the Right Policy & Statutory Underwriting Engine</span>
                <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-200 border border-sky-400/40 px-2 py-0.5 rounded-full uppercase">
                  AIFT & IRDAI 2024
                </span>
              </h2>
              <p className="text-slate-300 text-xs mt-0.5 font-sans">
                Statutory policy mapping for Fire (AIFT TAC Sections 1–8), Retail Health (2024 Master Circular), Marine & Liabilities.
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto shrink-0">
            <button
              onClick={() => setPlannerMode("wizard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-1.5 cursor-pointer ${
                plannerMode === "wizard" 
                  ? "bg-sky-600 text-white shadow-xs" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Matchmaker</span>
            </button>
            <button
              onClick={() => setPlannerMode("regulatory_matrix")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-1.5 cursor-pointer ${
                plannerMode === "regulatory_matrix" 
                  ? "bg-sky-700 text-white shadow-xs" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Public Domain Rules</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        
        {/* =========================================================================
            MODE 1: GUIDED SMART MATCHMAKER (WIZARD)
            ========================================================================= */}
        {plannerMode === "wizard" && (
          <div className="space-y-5">
            {/* Step Indicator (If in questionnaire) */}
            {!isSubmitted && (
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3" id="matchmaker-progress-header">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block">
                    Diagnostic Flow
                  </span>
                  <p className="text-xs text-slate-700 font-bold">
                    {currentStep === 0 && "Overview & Regulatory Alignment"}
                    {currentStep === 1 && "Step 1: Risk Target & Statutory Domain"}
                    {currentStep === 2 && "Step 2: Risk Profile & Exposure Level"}
                    {currentStep === 3 && "Step 3: Carrier & Statutory Add-Ons"}
                  </p>
                </div>
                {currentStep > 0 && (
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    Step {currentStep} of 3
                  </span>
                )}
              </div>
            )}

            {/* SCREEN 0: WELCOME OVERVIEW */}
            {currentStep === 0 && !isSubmitted && (
              <div className="space-y-5 py-2 animate-fade-in" id="matchmaker-welcome-card">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl mt-0.5 select-none">🎯</span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm md:text-base text-slate-900 font-sans tracking-tight">
                        Intelligent Policy Matchmaker & Statutory Underwriting Advisor
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans">
                        Discover the exact policy structure, statutory riders, and carrier suitability tailored to your unique risks. Grounded directly in the <strong>Tariff Advisory Committee (TAC) All India Fire Tariff (AIFT)</strong>, <strong>Engineering All Risks (CAR/EAR)</strong>, the <strong>IRDAI 2024 Master Circular on Health</strong>, <strong>Institute Cargo Clauses (ICC)</strong>, and the <strong>Employee's Compensation Act</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold font-mono text-sky-700 uppercase">🏢 AIFT Fire Standard</span>
                      <p className="text-[11px] text-slate-600">
                        Automatic mapping to Bharat Griha Raksha, Bharat Sookshma, Bharat Laghu, SFSP & IAR with FEA discount logic.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold font-mono text-amber-700 uppercase">⚙️ Engineering All Risks</span>
                      <p className="text-[11px] text-slate-600">
                        Contractor's (CAR) & Erection All Risks (EAR) with hot testing, 72-hr CAT clause, and surrounding property.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold font-mono text-emerald-700 uppercase">🏥 IRDAI 2024 Circular</span>
                      <p className="text-[11px] text-slate-600">
                        Zero room-rent capping, 100% cashless nationwide, 36-month max PED moratorium, and full AYUSH parity.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold font-mono text-cyan-700 uppercase">🚢 Cargo & Transit</span>
                      <p className="text-[11px] text-slate-600">
                        Institute Cargo Clauses (A) All-Risks, Warehouse-to-Warehouse, 110% CIF valuation & WC Table A/B compliance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-2 font-sans"
                  >
                    <span>Launch Diagnostic Needs Matchmaker</span>
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 1: STEP 1 - CHOOSE DOMAIN */}
            {currentStep === 1 && !isSubmitted && (
              <div className="space-y-4 animate-fade-in" id="matchmaker-question-1">
                <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">
                  1. Select your target protection domain or risk subject:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {INSURANCE_DOMAINS_LIST.map((domainItem) => (
                    <button
                      key={domainItem.id}
                      onClick={() => handleSelectDomain(domainItem.id as ProtectionDomain)}
                      type="button"
                      className="p-4 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/50 hover:border-sky-300 transition flex flex-col justify-between cursor-pointer space-y-2 group shadow-2xs"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs text-slate-900 group-hover:text-sky-700 transition font-sans">
                            {domainItem.label}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {domainItem.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                          {domainItem.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {domainItem.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="text-[9.5px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200/80">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="px-4 py-2 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-300 transition cursor-pointer"
                  >
                    Back to Overview
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: STEP 2 - SPECIFIC ATTRIBUTES */}
            {currentStep === 2 && answers.domain && !isSubmitted && (
              <div className="space-y-4 animate-fade-in" id="matchmaker-question-2">
                <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">
                  {answers.domain === "commercial_fire" && "2. Identify your property type and approximate total asset value (Building + Plant + Machinery + Stocks):"}
                  {answers.domain === "engineering_ear_car" && "2. Identify your project scope, civil engineering class, or plant installation phase:"}
                  {answers.domain === "retail_health" && "2. Select target demographic age group to optimize retail health premium and PED clauses:"}
                  {answers.domain === "marine_transit" && "2. Identify the core transit shipping mode used:"}
                  {answers.domain === "workmen_comp" && "2. Identify workplace physical hazard level and labor workforce structure:"}
                  {answers.domain === "corp_liability" && "2. Identify your primary corporate exposure or regulatory liability focus:"}
                  {answers.domain === "group_health" && "2. Specify your corporate active staff headcount roster scale:"}
                  {answers.domain === "group_accident" && "2. Specify field team transit travel frequency and hazardous exposure:"}
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {answers.domain === "commercial_fire" && [
                    { value: "home_dwelling", label: "🏠 Home Dwelling / Residential Flat (Bharat Griha Raksha)", desc: "Statutory product for homeowners/tenants. Average clause deleted (zero underinsurance penalty), automatic 20% home contents in-built, zero deductible on dwellings." },
                    { value: "micro_under_5cr", label: "🏬 Micro-Enterprise / Small Shop / Clinic (Assets up to ₹5 Crores)", desc: "Mandatory Bharat Sookshma Udyam Suraksha. Features a 15% underinsurance waiver, in-built STFI, Earthquake & Terrorism without tariff surcharges." },
                    { value: "sme_5_to_50cr", label: "🏭 Small to Medium Factory / Commercial Plant (Assets ₹5 Cr to ₹50 Cr)", desc: "Mandatory Bharat Laghu Udyam Suraksha. Standardized wording across all insurers, in-built 15% capital additions, and Reinstatement Value Clause." },
                    { value: "mid_50_to_100cr", label: "🏢 Mid-Corporate Complex (Assets ₹50 Cr to ₹100 Cr)", desc: "Standard Fire & Special Perils (SFSP) under AIFT Sections 1–8. Eligible for 5% to 25% statutory FEA extinguisher and hydrant rebates." },
                    { value: "enterprise_above_100cr", label: "⚡ Large Industrial Enterprise / Mega Risk (Assets over ₹100 Crores)", desc: "Industrial All Risks (IAR) Comprehensive Treaty. Unifies Property Material Damage, Machinery Breakdown, and Business Interruption / FLOP in one policy." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "engineering_ear_car" && [
                    { value: "civil_construction", label: "🏗️ Civil Construction Project (Bridges, Highways, Commercial Buildings - CAR)", desc: "Contractor's All Risks (CAR) Section I Material Damage + Section II Third-Party Liability (TPL) covering structural collapse, flood, and subsidence." },
                    { value: "plant_machinery", label: "⚙️ Industrial Machinery & Plant Erection (Turbines, Assembly Lines - EAR)", desc: "Erection All Risks (EAR) covering assembly, wiring, and high-risk mechanical/electrical hot testing and commissioning trial runs." },
                    { value: "hybrid_turnkey", label: "🌐 Turnkey EPC Infrastructure Complex (Blended CAR + EAR Package)", desc: "Combined civil engineering works and heavy plant erection with synchronized 72-hour CAT clause and extended maintenance warranty." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "retail_health" && [
                    { value: "young", label: "Young Adult / Single Professional (18 - 35 Years)", desc: "Lowest baseline rates. Locks in early No-Claim Bonus (NCB) multipliers up to 200% with zero room-rent capping." },
                    { value: "mid", label: "Active Family Floater with Spouse & Children (36 - 55 Years)", desc: "Shared sum insured pool. Features maternity nursery riders and 36-month max PED moratorium per 2024 IRDAI Master Circular." },
                    { value: "senior", label: "Senior Citizens & Aged Parents (56+ Years / No Age Bar)", desc: "Leverages the April 2024 IRDAI abolition of entry age limit. Emphasizes pre-existing disease waivers, AYUSH parity, and modest co-pay buffers." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "marine_transit" && [
                    { value: "sea", label: "🚢 Intercontinental Maritime Ocean Shipments (ICC-A All Risks)", desc: "Covers cargo against vessel capsizing, container seawater ingress, and General Average salvage contributions." },
                    { value: "air", label: "✈️ International Air Express Freight (ICC Air Standards)", desc: "Rapid logistics for microchips, biotech vials, and precision components with airport terminal protection." },
                    { value: "road", label: "🚛 Domestic Overland Logistics (ITC-A Road/Rail Open Policy)", desc: "Protects highway container trucks and rail freight against transit collisions, overturning, and terminal theft." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "workmen_comp" && [
                    { value: "hazardous", label: "⚠️ High Risk (Plant Assembly, Warehousing, Chemical Processing)", desc: "Requires combined Table A (Act compensation formulas) and Table B (Common Law employer negligence defense) with AMER riders." },
                    { value: "office", label: "💻 Low Risk (Desk-bound IT, Corporate Office, Clerical Staff)", desc: "Fulfills statutory Employee's Compensation Act requirements for on-duty commuting accidents and occupational schedules." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "corp_liability" && [
                    { value: "cyber_software", label: "🔒 Digital Assets, SaaS Code & DPDP Act 2023 Cyber Exposure", desc: "Combines Tech Errors & Omissions (E&O) and Cyber Risk to cover ransomware extortion, data forensic audits, and statutory DPDP penalties." },
                    { value: "premises_slip", label: "🏢 Physical Premises, Product Defects & Commercial General Liability (CGL)", desc: "Protects against customer slip-and-fall injuries, site third-party property damages, and defective product warranty liabilities." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "group_health" && [
                    { value: "sme_health", label: "👥 Startup / SME Team (Under 25 Headcount Staff)", desc: "Simplified onboarding, zero pre-policy medical checkups, and standard inpatient cashless coverage." },
                    { value: "enterprise_health", label: "🏢 Enterprise Workforce (25+ Staffers with Custom Buffer)", desc: "Customized corporate health treaty with Day-1 PED waivers, zero room caps, and a dedicated corporate emergency buffer pool." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}

                  {answers.domain === "group_accident" && [
                    { value: "high_transit", label: "🚗 High Road Exposure (Sales teams, field engineers, logistics drivers)", desc: "High roadside risk. Highly recommends Temporary Total Disablement (TTD) 1% weekly salary replacement and air evacuation." },
                    { value: "low_desk", label: "🖥️ Low Exposure (Clerical, remote developers, desk administration)", desc: "Standard Accidental Death (AD), Permanent Total Disablement (PTD), and partial disability schedules." }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectStep1(opt.value)}
                      type="button"
                      className="p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-sky-50/60 hover:border-sky-300 text-slate-800 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-xs block font-sans text-slate-900 group-hover:text-sky-700 transition">{opt.label}</span>
                        <span className="text-[10.5px] block text-slate-600 leading-relaxed font-sans mt-0.5">{opt.desc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 ml-3" />
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-300 transition cursor-pointer"
                  >
                    Back to Domain Select
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 3: STEP 3 - CARRIER PREFERENCE & ADD-ONS */}
            {currentStep === 3 && answers.domain && !isSubmitted && (
              <div className="space-y-5 animate-fade-in" id="matchmaker-question-3">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">
                    Step 3: Define Carrier Parameters & Statutory Add-On Endorsements
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans mt-0.5">
                    Select preferred underwriting partner and attach essential regulatory riders to eliminate out-of-pocket claim deductions.
                  </p>
                </div>

                {/* Part A: Insurer Partner */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-extrabold text-slate-600 block uppercase tracking-wider font-mono">
                    Part A: Select Preferred Underwriting Carrier
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {INSURER_BRANDS.map(brand => {
                      const isSelected = (answers.step2_insurer || "suggest_optimal") === brand.id;
                      return (
                        <button
                          key={brand.id}
                          onClick={() => selectInsurer(brand.id)}
                          type="button"
                          className={`p-3 text-left rounded-xl border transition flex flex-col justify-between cursor-pointer ${
                            isSelected 
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs" 
                              : "bg-white border-slate-200 hover:bg-sky-50/60 hover:border-sky-300 text-slate-800"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition ${
                                isSelected ? "bg-sky-500 border-sky-500 text-white" : "border-slate-300 bg-white"
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className="font-extrabold text-[11.5px] font-sans">{brand.name}</span>
                            </div>
                            <span className={`text-[10px] block leading-relaxed mt-1.5 pl-5 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                              {brand.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Part B: Multiple Add-ons Toggle */}
                <div className="space-y-2.5 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-extrabold text-slate-600 block uppercase tracking-wider font-mono">
                      Part B: Key Add-On Endorsements (Select Multiple to prevent claim shortfalls)
                    </label>
                    <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {answers.step2_addons?.length || 0} Endorsements Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {(ADDON_OPTIONS[answers.domain!] || []).map(addon => {
                      const isChecked = answers.step2_addons?.includes(addon.id) || false;
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          type="button"
                          className={`p-3 text-left rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                            isChecked 
                              ? "bg-sky-50 border-sky-400 text-slate-900 shadow-xs" 
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                            isChecked ? "bg-sky-600 border-sky-600 text-white" : "border-slate-300 bg-white"
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-bold text-[11.5px] block font-sans text-slate-900">{addon.label}</span>
                            <span className="text-[9.5px] block leading-relaxed text-slate-600">
                              {addon.desc}
                            </span>
                            {addon.statutoryRef && (
                              <span className="inline-block text-[8.5px] font-mono text-slate-500 font-semibold mt-0.5">
                                📌 {addon.statutoryRef}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-300 transition cursor-pointer"
                  >
                    Back to Step 2
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGenerateReport}
                    disabled={!answers.step2_insurer}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer font-sans"
                  >
                    <span>Generate Statutory Suitability Report</span>
                    <Sparkles className="w-4 h-4 text-sky-400" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: DETAILED SUITABILITY OUTPUT REPORT */}
            {isSubmitted && matchedReportResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 py-2"
                id="matchmaker-report-panel"
              >
                {/* Top Analysis Header Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 items-start justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="bg-slate-900 text-white p-3 rounded-2xl shrink-0 shadow-xs">
                      <Sparkles className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono bg-slate-900 text-white font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          Statutory Suitability Result
                        </span>
                        <span className="text-[9px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-md">
                          Match Index: {matchedReportResult.suitabilityScore}%
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                        {matchedReportResult.title}
                      </h3>
                      <p className="text-xs text-slate-700 font-medium">
                        Standard Class: <strong className="text-slate-900">{matchedReportResult.planType}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Reference: {matchedReportResult.statutoryStandard}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Export Buttons */}
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      onClick={copyBrokerSpecSheet}
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs font-sans"
                      title="Copy Broker Specification"
                    >
                      {copiedSpec ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedSpec ? "Copied!" : "Copy Spec"}</span>
                    </button>

                    <button
                      onClick={downloadReportAsPDF}
                      type="button"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer shadow-2xs font-sans"
                      title="Download PDF Specification"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* PyraMetric Actuarial Benchmark Link Callout */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                      λ
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sky-950 font-sans">
                        Benchmark Base Tariff Rates with PyraMetric™ Engine
                      </h4>
                      <p className="text-[11px] text-sky-800 font-sans mt-0.5">
                        Verify statutory AIFT Section rates, burning cost projections, and deductible rebates for this policy.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://pyrametric.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold font-sans transition shrink-0 shadow-2xs"
                  >
                    <span>Launch PyraMetric™</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Strategic Rationale Explanation Box */}
                <div className="space-y-2 font-sans" id="matchmaker-rationale-section">
                  <span className="font-bold text-[11px] text-slate-700 block uppercase tracking-wider font-mono">
                    Underwriting & Statutory Analysis Rationale:
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-2xl font-medium whitespace-pre-line">
                    {matchedReportResult.explanation}
                  </div>
                </div>

                {/* Coverage Vigilance Checklist */}
                <div className="space-y-3 pt-2 font-sans" id="matchmaker-checklist-section">
                  <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2 uppercase font-mono tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    Coverage Vigilance & Statutory Compliance Checklist:
                  </span>
                  <ul className="space-y-2.5">
                    {matchedReportResult.checklist.map((item, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs text-slate-700 leading-relaxed font-medium">
                        <div className="bg-emerald-50 rounded-full border border-emerald-300 text-emerald-700 p-0.5 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer box */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-slate-700">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 font-sans">
                    <span className="font-bold text-slate-900 uppercase font-mono text-[9px] tracking-wider block">
                      Standard Regulatory Clause (IRDA Act 1999 & TAC AIFT Standard)
                    </span>
                    <p className="leading-relaxed text-[11px] text-slate-600">
                      Outputs are mapped against public domain IRDAI master circulars, the All India Fire Tariff (AIFT), and General Insurance Council benchmarks. Designed strictly for educational reference and pre-underwriting needs analysis.
                    </p>
                  </div>
                </div>

                {/* Restart Control */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center gap-1.5 font-sans"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Configure Another Domain</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlannerMode("regulatory_matrix")}
                    className="px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-extrabold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center gap-1.5 font-sans"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Public Domain Rules</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* =========================================================================
            MODE 2: PUBLIC DOMAIN REGULATORY RESOURCE REPOSITORY
            ========================================================================= */}
        {plannerMode === "regulatory_matrix" && (
          <div className="space-y-5 animate-fade-in" id="regulatory-matrix-root">
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-slate-200 pb-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {["All", "Fire & Property", "Health & Mediclaim", "Marine & Transit", "Liability & Cyber", "Statutory Acts"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setMatrixCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-sans transition cursor-pointer ${
                      matrixCategory === cat
                        ? "bg-sky-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search rules, circulars..."
                  value={matrixSearch}
                  onChange={(e) => setMatrixSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* List of Regulatory Benchmarks */}
            <div className="grid grid-cols-1 gap-4">
              {filteredResources.map(res => (
                <div 
                  key={res.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5 transition hover:shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                          {res.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {res.gazetteRef}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 font-sans">
                        {res.title}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto shrink-0">
                      Authority: {res.authority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {res.summary}
                  </p>

                  {/* Key Clauses Bullet Points */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider block">
                      Key Consumer Safeguards & Mandatory Standards:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {res.keyConsumerClauses.map((clause, ci) => (
                        <li key={ci} className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 leading-relaxed flex items-start gap-2 shadow-2xs">
                          <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                          <span>{clause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-200">
                    ℹ️ {res.officialPublicDomainNote}
                  </div>
                </div>
              ))}

              {filteredResources.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <p className="text-xs text-slate-600 font-medium">No regulatory resources matched your search filter.</p>
                  <button
                    onClick={() => { setMatrixCategory("All"); setMatrixSearch(""); }}
                    className="text-xs text-sky-600 font-bold hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
