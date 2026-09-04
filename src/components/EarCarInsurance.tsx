import React, { useState, useMemo } from "react";
import {
  HardHat,
  Wrench,
  Building,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Clock,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Calculator,
  Info,
  Building2,
  Copy,
  Check,
  Search,
  Settings,
  Flame,
  Truck
} from "lucide-react";

interface EndorsementItem {
  id: string;
  name: string;
  category: "Standard Tariff" | "Extended Maintenance" | "Financial & Logistics" | "Operational";
  premiumBearing: boolean;
  tariffCode: string;
  description: string;
  recommendedFor: string;
}

const ENDORSEMENTS_DATA: EndorsementItem[] = [
  {
    id: "72_hour",
    name: "72-Hour Catastrophe Clause",
    category: "Standard Tariff",
    premiumBearing: false,
    tariffCode: "TAC-ENG-CL01",
    description: "Groups all continuous loss or damage arising from flood, storm, tempest, or earthquake occurring within any 72 consecutive hours into a single occurrence, applying only one policy deductible.",
    recommendedFor: "All CAR/EAR projects exposed to monsoon inundation or seismic belts."
  },
  {
    id: "extended_maintenance",
    name: "Extended Maintenance Cover",
    category: "Extended Maintenance",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL04",
    description: "Extends Section I coverage during the contractual maintenance/defect liability period (typically 12 or 24 months) for damage caused by the contractor while carrying out rectification works or arising from faults during the construction period.",
    recommendedFor: "Civil contracts and mechanical plant projects with mandatory defect liability periods."
  },
  {
    id: "surrounding_property",
    name: "Owners Surrounding Property Clause",
    category: "Operational",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL07",
    description: "Covers loss or physical damage to existing property belonging to or held in custody by the Principal/Owner situated on or adjacent to the site, caused by contract activities.",
    recommendedFor: "Plant expansion, refinery upgrades, or retrofits within an active operating facility."
  },
  {
    id: "escalation",
    name: "Escalation Clause (Up to 50%)",
    category: "Financial & Logistics",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL11",
    description: "Provides an automatic percentage increase (typically 10% to 50%) in the Sum Insured of Section I to accommodate rising costs of cement, steel, labor, and inflation during extended execution periods.",
    recommendedFor: "Multi-year infrastructure projects (highways, metros, dams, heavy industrial plants)."
  },
  {
    id: "air_freight",
    name: "Air Freight & Express Delivery",
    category: "Financial & Logistics",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL14",
    description: "Indemnifies extra charges incurred for air freight or express cargo to rapidly fly in critical replacement parts, turbine components, or motors from overseas manufacturers following an indemnifiable loss.",
    recommendedFor: "EAR projects with imported precision machinery or custom-engineered components."
  },
  {
    id: "overtime_night_work",
    name: "Overtime, Night Work & Holiday Work",
    category: "Financial & Logistics",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL15",
    description: "Reimburses premium labor charges for overtime, weekend, and public holiday work necessitated to expedite repairs and maintain contractual commissioning deadlines after an insured casualty.",
    recommendedFor: "Time-critical infrastructure projects with milestone penalties or liquidated damages."
  },
  {
    id: "debris_removal",
    name: "Debris Removal Expenses (Tariff Scale)",
    category: "Standard Tariff",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL18",
    description: "Covers necessary costs of dismantling, demolishing, shoring up, or clearing away wreckage and debris of damaged contract works prior to reconstruction, up to the agreed sub-limit.",
    recommendedFor: "Large building complexes, heavy civil foundations, and offshore structures."
  },
  {
    id: "dewatering",
    name: "Dewatering Expenses Endorsement",
    category: "Operational",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL22",
    description: "Covers additional pumping, draining, and silt-clearing expenses required to dewater flooded excavations, coffer dams, or basement pits following severe inundation or storm surge.",
    recommendedFor: "Deep basement construction, river bridge piers, metro tunneling, and hydro projects."
  },
  {
    id: "cross_liability",
    name: "Cross Liability Cover (Section II)",
    category: "Operational",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL25",
    description: "Treats each co-insured party (Principal, Main Contractor, Subcontractor, Specialist Engineers) as separate entities under Third Party Liability, allowing one contractor to claim against another under the policy.",
    recommendedFor: "Multi-contractor sites with distinct mechanical, civil, and electrical consortia."
  },
  {
    id: "offsite_storage",
    name: "Off-Site Storage & Pre-Fabrication Yards",
    category: "Financial & Logistics",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL29",
    description: "Extends physical damage protection to prefabricated steel structures, equipment, and building materials temporarily stored in off-site warehouses or fabrication yards away from the main construction site.",
    recommendedFor: "Projects utilizing modular pre-cast concrete or pre-engineered steel buildings (PEB)."
  },
  {
    id: "design_defect",
    name: "Design Defect Clause (DE3 / DE4 / DE5)",
    category: "Operational",
    premiumBearing: true,
    tariffCode: "TAC-ENG-CL33",
    description: "Extends coverage beyond strict material failure. While standard policy excludes defective design, DE3/DE4 covers resultant physical damage to correctly executed surrounding contract parts.",
    recommendedFor: "Cutting-edge civil engineering, architectural innovations, and high-spec industrial plants."
  }
];

const PUBLIC_INDIAN_INSURERS = [
  {
    name: "The New India Assurance Co. Ltd.",
    badge: "PSU - Market Leader in Engineering Lines",
    tagline: "Premier Insurer of Mega-Infrastructure, Metros, & Power Plants",
    features: [
      "Contractors All Risks (CAR) for national highway corridors and smart city projects",
      "Erection All Risks (EAR) including full Hot & Cold Testing commissioning cover",
      "Contractors Plant and Machinery (CPM) standalone and project-linked policies",
      "Advance Loss of Profits (ALOP) / Delay in Start-Up (DSU) underwriting"
    ],
    norm: "Standard TAC engineering tariff base with specialized Munich Re / Swiss Re facultative reinsurance arrangements for projects exceeding INR 500 Crores."
  },
  {
    name: "National Insurance Company Ltd.",
    badge: "PSU - Heavy Engineering Expertise",
    tagline: "Industrial Erection, Thermal & Hydro Projects Portfolio",
    features: [
      "EAR policies for high-voltage substations, boiler plants, and steel mills",
      "CAR coverage for multi-story institutional complexes and flyovers",
      "Testing period extensions with dedicated engineering surveyor monitoring",
      "Civil Engineering Completed Risks (CECR) operational coverage"
    ],
    norm: "Mandatory pre-loss site inspection by empanelled engineers for projects with testing periods exceeding 3 months."
  },
  {
    name: "The Oriental Insurance Company Ltd.",
    badge: "PSU - Energy & Industrial Risk Specialist",
    tagline: "Renewable Energy (Solar/Wind), Refineries & Pipeline Projects",
    features: [
      "Solar & Wind Farm turnkey CAR/EAR composite package",
      "Cross-country hydrocarbon pipeline laying and hydrostatic testing cover",
      "Surrounding property endorsements for brownfield chemical expansions",
      "Comprehensive Third Party Liability (TPL) up to 25% of contract value"
    ],
    norm: "Strict hydrostatic and electrical insulation test compliance certificates required before initiating testing phase cover."
  },
  {
    name: "United India Insurance Company Ltd.",
    badge: "PSU - Coastal & Regional Infrastructure",
    tagline: "Bridges, Ports, Irrigation Dams & Urban Water Supply",
    features: [
      "CAR policies for marine berths, jetties, and coastal breakwaters",
      "Erection policies for wastewater treatment plants and pump houses",
      "Limited and Extended Maintenance defect liability coverage",
      "Expediting expense add-on for public interest utility contracts"
    ],
    norm: "Special flood and dewatering excess scales applied for riverbed and deep marine pier construction."
  }
];

export default function EarCarInsurance() {
  const [activeTab, setActiveTab] = useState<"comparison" | "endorsements" | "architecture" | "evaluator" | "claims" | "draft">("comparison");
  const [searchEndorsement, setSearchEndorsement] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // Project Evaluator State
  const [projectCategory, setProjectCategory] = useState<string>("civil_building");
  const [contractValueCrores, setContractValueCrores] = useState<number>(45);
  const [principalMaterialsCrores, setPrincipalMaterialsCrores] = useState<number>(5);
  const [cpmValueCrores, setCpmValueCrores] = useState<number>(3.5);
  const [projectMonths, setProjectMonths] = useState<number>(24);
  const [testingWeeks, setTestingWeeks] = useState<number>(4);
  const [maintenanceMonths, setMaintenanceMonths] = useState<number>(12);
  const [selectedEndorsements, setSelectedEndorsements] = useState<string[]>([
    "72_hour",
    "extended_maintenance",
    "surrounding_property",
    "debris_removal"
  ]);

  // Draft Intimation Letter State
  const [contractorName, setContractorName] = useState<string>("Shreeji Infrastructure Projects Pvt. Ltd.");
  const [principalName, setPrincipalName] = useState<string>("National Highways Authority of India (NHAI)");
  const [projectName, setProjectName] = useState<string>("Construction of 6-Lane Elevated Corridor & Flyover (Pkg-3)");
  const [policyNumber, setPolicyNumber] = useState<string>("OIC/ENG/2026/CAR-991204");
  const [incidentDate, setIncidentDate] = useState<string>("2026-08-28");
  const [incidentDescription, setIncidentDescription] = useState<string>("During heavy monsoon precipitation, formwork and staging of Pier P-14 collapsed into the riverbed, damaging freshly cast pier caps and submerging mobile dewatering pumps and rebar cages.");
  const [estimatedLossCrores, setEstimatedLossCrores] = useState<number>(2.4);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Computed Values
  const recommendedPolicyType = useMemo(() => {
    if (projectCategory === "civil_building" || projectCategory === "highway" || projectCategory === "bridge") {
      return {
        type: "Contractors All Risks (CAR)",
        badge: "CAR Standard Policy",
        rationale: "Civil construction represents the overwhelming proportion of the work. Primary hazards are earth settlement, collapse, weather perils, and civil structural failures.",
        testingRequired: false
      };
    } else if (projectCategory === "machinery_erection" || projectCategory === "power_plant") {
      return {
        type: "Erection All Risks (EAR)",
        badge: "EAR Erection Policy",
        rationale: "Major contract value lies in mechanical assembly, electrical equipment, turbines, cabling, and hot/cold commissioning. Testing phase is the highest risk window.",
        testingRequired: true
      };
    } else {
      return {
        type: "Composite CAR / EAR Policy",
        badge: "Composite Package",
        rationale: "Involves substantial civil viaduct/tunnel construction alongside sophisticated signaling, power sub-stations, and rolling stock erection.",
        testingRequired: true
      };
    }
  }, [projectCategory]);

  const totalSumInsuredCrores = useMemo(() => {
    return (contractValueCrores + principalMaterialsCrores + cpmValueCrores).toFixed(2);
  }, [contractValueCrores, principalMaterialsCrores, cpmValueCrores]);

  const recommendedTplCrores = useMemo(() => {
    const base = Number(totalSumInsuredCrores);
    // Typical Indian TAC guideline: 5% to 10% of contract value or min INR 5-10 Crores
    const tpl = Math.max(5, Math.round(base * 0.08));
    return tpl;
  }, [totalSumInsuredCrores]);

  const filteredEndorsements = useMemo(() => {
    return ENDORSEMENTS_DATA.filter((item) => {
      const matchCat = filterCategory === "ALL" || item.category === filterCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchEndorsement.toLowerCase()) ||
        item.description.toLowerCase().includes(searchEndorsement.toLowerCase()) ||
        item.tariffCode.toLowerCase().includes(searchEndorsement.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filterCategory, searchEndorsement]);

  const toggleEndorsement = (id: string) => {
    setSelectedEndorsements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const compiledLetter = useMemo(() => {
    const todayStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    return `FORMAL NOTICE OF ENGINEERING CASUALTY & CLAIM INTIMATION
Date: ${todayStr}

To:
The Senior Divisional Manager / Engineering Claims Cell,
${PUBLIC_INDIAN_INSURERS[0].name}

Subject: Immediate Intimation of Accident / Material Damage under Engineering Policy No: ${policyNumber}
Project: ${projectName}
Insured: ${contractorName} (Main Contractor) & ${principalName} (Principal / Employer)

Dear Sir / Madam,

We write to provide formal immediate intimation of a serious sudden and unforeseen physical damage accident that occurred at our construction project site on ${incidentDate}.

PROJECT & POLICY PARTICULARS:
1. Insured Policy Number: ${policyNumber}
2. Named Insured: ${contractorName} (Jointly with ${principalName})
3. Project Name & Location: ${projectName}
4. Date & Estimated Time of Incident: ${incidentDate}
5. Estimated Loss / Quantum of Damage: Approximately INR ${estimatedLossCrores} Crores

DESCRIPTION OF OCCURRENCE & ROOT CAUSE:
${incidentDescription}

IMMEDIATE MITIGATION ACTIONS TAKEN:
1. The site has been safely cordoned off to prevent any secondary collapse or injury to workmen/third parties.
2. Photographic and drone footage of the undisturbed wreckage has been recorded for surveyor inspection.
3. Relevant entries have been made in the Project Measurement Book (MB) and site engineer's daily log register.
4. Dewatering and temporary shoring measures are underway to protect adjoining structural columns.

We hereby request you to:
1. Depute an IRDAI-empanelled Independent Engineering Insurance Surveyor to conduct an immediate preliminary joint survey at the site.
2. Furnish the official claim docket number and required survey checklist.

Kindly treat this communication as formal timely notice in compliance with the General Conditions of the policy.

Yours faithfully,
Authorized Project Director / Signatory,
${contractorName}`;
  }, [contractorName, principalName, projectName, policyNumber, incidentDate, incidentDescription, estimatedLossCrores]);

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(compiledLetter);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-stone-900 text-white rounded-3xl p-6 md:p-8 border border-amber-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase border border-amber-400/30">
            <HardHat className="w-3.5 h-3.5" />
            <span>Engineering All Risks (EAR / CAR) Hub</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                Contractor’s All Risks (CAR) & Erection All Risks (EAR)
              </h1>
              <p className="text-amber-100/80 text-xs md:text-sm max-w-3xl leading-relaxed mt-1 font-sans">
                Comprehensive technical guide for Indian engineering projects governed by Tariff Advisory Committee (TAC) 
                specifications and public general insurers (New India Assurance, National, Oriental, United India). 
                Covering civil infrastructure, plant erection, hot/cold testing periods, and contractual third-party liabilities.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shrink-0">
              <Building className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-200 block font-bold">Standard Framework</span>
                <span className="text-xs font-bold text-white">Munich Re / TAC India Wording</span>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-800/50">
            {[
              { id: "comparison", label: "CAR vs EAR Diagnostic", icon: Layers },
              { id: "architecture", label: "Two-Section Architecture", icon: Building },
              { id: "endorsements", label: "Endorsements & Clauses", icon: FileText },
              { id: "evaluator", label: "Project Risk & Sum Insured", icon: Calculator },
              { id: "claims", label: "Survey & Claims Protocol", icon: ShieldCheck },
              { id: "draft", label: "Intimation Letter Generator", icon: HardHat }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                      : "bg-white/5 hover:bg-white/10 text-amber-100 hover:text-white border border-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TAB 1: CAR vs EAR COMPARATIVE DIAGNOSTIC */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CAR CARD */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans">
                    Contractors All Risks (CAR)
                  </h3>
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">
                    Civil Construction Works
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                Designed primarily for civil engineering contracts where brick, mortar, concrete, and structural steel predominate. 
                Provides complete protection from commencement of ground excavations until final handover to the Principal.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  Typical Project Applicability:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Commercial & Residential Tower Complexes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Highways, Expressways, Bridges & Flyovers (NHAI/State PWD)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dams, Irrigation Canals, Tunnels & Marine Jetties</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Airport Terminals, Runways & Metro Rail Viaducts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300">
                <strong>Key Risk Driver:</strong> Natural catastrophes (AOG: Act of God) like floods, cloudbursts, earthquakes, landslide subsidence, and formwork collapse.
              </div>
            </div>

            {/* EAR CARD */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans">
                    Erection All Risks (EAR)
                  </h3>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
                    Mechanical & Electrical Plant Installation
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                Formulated for projects involving the installation, erection, alignment, and testing of machinery, industrial plant, 
                and electrical equipment. Begins upon unloading the first consignment on site and extends through critical testing phases.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  Typical Project Applicability:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Thermal, Hydro, Solar & Wind Power Generation Stations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Chemical Refineries, Steel Mills, Cement & Fertilizer Plants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Substations, High-Voltage Transformers & Transmission Towers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Factory Production Lines, Conveyors & Heavy CNC Assembly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-200 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300">
                <strong>Critical Phase:</strong> Testing and Commissioning (cold and hot tests) where machinery is energized, carrying elevated explosion and mechanical breakdown hazards.
              </div>
            </div>
          </div>

          {/* Public Sector Insurers Profile */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Public Indian General Insurers Engineering Tariff Capacities</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PUBLIC_INDIAN_INSURERS.map((ins, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                      {ins.badge}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 font-sans">
                      {ins.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">
                      {ins.tagline}
                    </p>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-700 dark:text-zinc-300">
                    {ins.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-slate-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans">
                    <strong>Tariff Norm:</strong> {ins.norm}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TWO-SECTION ARCHITECTURE */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SECTION I: MATERIAL DAMAGE */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-mono">
                    I
                  </span>
                  <span>Section I: Material Damage</span>
                </h3>
                <span className="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
                  Property in Contract
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                <p>
                  Provides cover against sudden and unforeseen physical loss or damage from any cause, other than those specifically excluded, 
                  to the contract works, construction materials, temporary structures, and equipment.
                </p>

                <div className="space-y-1.5 pt-1">
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    Sum Insured Breakdown Components:
                  </strong>
                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                    <div>1. Full Contract Value (Completed replacement value)</div>
                    <div>2. Materials & Equipment supplied by Principal (Free-issue items)</div>
                    <div>3. Freight, Customs Duties, Taxes & Handling Costs</div>
                    <div>4. Construction Plant & Equipment (Cranes, scaffolding, formwork)</div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    Standard Covered Perils:
                  </strong>
                  <p>
                    Fire, lightning, explosion, aircraft impact, flood, storm, tempest, inundation, earthquake, landslide, 
                    accidental structural collapse, theft & burglary, and human handling errors during erection.
                  </p>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300">
                  <strong>Standard Exclusions:</strong> Normal wear and tear, gradual corrosion, defective design (unless specifically endorsed), 
                  cost of rectifying defective workmanship, inventory shortages, war and nuclear risks, cessation of work.
                </div>
              </div>
            </div>

            {/* SECTION II: THIRD PARTY LIABILITY */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
                    II
                  </span>
                  <span>Section II: Third Party Liability</span>
                </h3>
                <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
                  Legal Liabilities (TPL)
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                <p>
                  Indemnifies the Insured up to the specified limits against legal liability to pay compensation for 
                  accidental bodily injury or property damage to third parties occurring in direct connection with the execution of the contract works.
                </p>

                <div className="space-y-1.5 pt-1">
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    Indemnity Scope:
                  </strong>
                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                    <div>1. Accidental Bodily Injury or Death to Third Parties</div>
                    <div>2. Accidental Physical Damage to Third-Party Property</div>
                    <div>3. Legal defense fees and litigation costs awarded against Insured</div>
                    <div>4. Limit of Indemnity specified on AOA (Any One Accident) / AOY basis</div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    Vibration & Support Removal Caution:
                  </strong>
                  <p>
                    Damage caused by vibration, weakening or removal of support (pile driving, deep excavation) is excluded by default 
                    unless specifically reinstated by special endorsement (Endorsement CL08).
                  </p>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300">
                  <strong>Section II Exclusions:</strong> Injury/death to employees or workmen of contractor/principal (covered under Workmen's Compensation), 
                  damage to property owned or held in trust by the contractor, road traffic accidents by registered motor vehicles.
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline Phases */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase font-sans tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Engineering Policy Lifecycle Phases</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">Phase 1</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Storage on Site</h4>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Begins the moment equipment or building materials are unloaded at the project site godowns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">Phase 2</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Erection / Construction</h4>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Active structural assembly, concrete pouring, welding, rigging, and mechanical fitment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2">
                <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">Phase 3 (EAR Only)</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Testing & Commissioning</h4>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Standard tariff provides 4 weeks. Additional weeks require prorated premium loading.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">Phase 4</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Maintenance / Defect Liability</h4>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  12 to 24 months post Practical Completion Certificate under Extended Maintenance clause.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ENDORSEMENTS & CLAUSES */}
      {activeTab === "endorsements" && (
        <div className="space-y-5">
          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono shrink-0">
                Category:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["ALL", "Standard Tariff", "Extended Maintenance", "Financial & Logistics", "Operational"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      filterCategory === cat
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clause name, tariff code..."
                value={searchEndorsement}
                onChange={(e) => setSearchEndorsement(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEndorsements.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xs hover:border-amber-400 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      {item.tariffCode}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 font-sans">
                      {item.name}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      item.premiumBearing
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    }`}
                  >
                    {item.premiumBearing ? "Premium Bearing" : "Standard Tariff"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <strong className="text-slate-800 dark:text-zinc-200 font-bold">Recommended When:</strong> {item.recommendedFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROJECT EVALUATOR & SUM INSURED */}
      {activeTab === "evaluator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase font-sans tracking-wide border-b border-slate-200 dark:border-zinc-700 pb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Engineering Project Risk Profiler</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Project Classification:</label>
                <select
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-sans"
                >
                  <option value="civil_building">Commercial / Residential Real Estate (Civil)</option>
                  <option value="highway">Highways & Expressways (NHAI / PWD)</option>
                  <option value="bridge">River Bridge / Elevated Viaduct</option>
                  <option value="power_plant">Thermal / Solar / Wind Power Station</option>
                  <option value="machinery_erection">Factory Plant & Heavy Machinery Erection</option>
                  <option value="composite_metro">Metro Rail (Civil Viaduct + Electrical Traction)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Total Contract Value (INR Crores):</label>
                <input
                  type="number"
                  value={contractValueCrores}
                  onChange={(e) => setContractValueCrores(Math.max(0.5, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Principal Supplied Materials (INR Cr):</label>
                <input
                  type="number"
                  value={principalMaterialsCrores}
                  onChange={(e) => setPrincipalMaterialsCrores(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Contractor Plant & Machinery (CPM) (INR Cr):</label>
                <input
                  type="number"
                  value={cpmValueCrores}
                  onChange={(e) => setCpmValueCrores(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Construction Duration (Months):</label>
                <input
                  type="number"
                  value={projectMonths}
                  onChange={(e) => setProjectMonths(Math.max(1, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-mono uppercase">Defect Liability / Maintenance (Months):</label>
                <select
                  value={maintenanceMonths}
                  onChange={(e) => setMaintenanceMonths(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl text-slate-900 dark:text-white font-sans"
                >
                  <option value={0}>0 Months (None)</option>
                  <option value={6}>6 Months (Limited)</option>
                  <option value={12}>12 Months (Standard Indian Public Works)</option>
                  <option value={24}>24 Months (Extended Infrastructure Period)</option>
                </select>
              </div>
            </div>

            {recommendedPolicyType.testingRequired && (
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/40 space-y-2">
                <label className="text-[11px] font-bold text-blue-900 dark:text-blue-300 font-mono uppercase block">
                  Testing & Commissioning Period (Weeks):
                </label>
                <input
                  type="number"
                  value={testingWeeks}
                  onChange={(e) => setTestingWeeks(Math.max(1, Number(e.target.value)))}
                  className="w-full text-xs p-2 border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white font-mono"
                />
                <p className="text-[10px] text-blue-700 dark:text-blue-300">
                  Standard tariff covers up to 4 weeks. Additional weeks require specific prorated loading under TAC norms.
                </p>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-zinc-700">
              <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 font-mono uppercase">
                Select Critical Add-On Endorsements:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ENDORSEMENTS_DATA.slice(0, 6).map((end) => (
                  <label key={end.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedEndorsements.includes(end.id)}
                      onChange={() => toggleEndorsement(end.id)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="truncate">{end.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Evaluation Card */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 border border-amber-800/40 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Recommended Architecture
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono">
                  {recommendedPolicyType.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-amber-200 font-sans">
                  {recommendedPolicyType.type}
                </h4>
                <p className="text-[11px] text-amber-100/70 leading-relaxed">
                  {recommendedPolicyType.rationale}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl space-y-2.5 border border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block font-bold">
                    Section I Recommended Sum Insured:
                  </span>
                  <div className="text-xl font-extrabold text-white font-mono">
                    INR {totalSumInsuredCrores} Crores
                  </div>
                  <div className="text-[10px] text-amber-200/80 font-mono">
                    Contract (₹{contractValueCrores} Cr) + Free Issue (₹{principalMaterialsCrores} Cr) + CPM (₹{cpmValueCrores} Cr)
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block font-bold">
                    Section II Recommended TPL Limit:
                  </span>
                  <div className="text-base font-bold text-amber-300 font-mono">
                    INR {recommendedTplCrores} Crores (AOA / AOY)
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Selected Endorsement Pack:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedEndorsements.map((id) => {
                    const end = ENDORSEMENTS_DATA.find((x) => x.id === id);
                    return (
                      <span key={id} className="text-[9px] bg-amber-950/80 text-amber-200 border border-amber-700/50 px-1.5 py-0.5 rounded font-mono font-bold">
                        {end ? end.name : id}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-white/10 pt-3 italic leading-normal">
              * Rates are determined by TAC guidelines based on soil conditions, seismic zone rating, and contractor loss track record.
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SURVEY & CLAIMS PROTOCOL */}
      {activeTab === "claims" && (
        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-5 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 font-sans">
                Critical Condition: Preservation of Undisturbed Evidence
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed font-sans">
                Except for emergency actions necessary to prevent further collapse or safeguard human life, 
                the insured must NOT clear or alter the damaged contract works before the arrival of the IRDAI-appointed 
                independent engineering surveyor. Clearing rubble prematurely may result in claim repudiation due to inability to verify root cause.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                Immediate Notice & Police FIR
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Provide immediate written notice to the insurer within 24 hours. For theft, burglary, malicious damage, 
                or serious site fatalities, lodge a formal First Information Report (FIR) with local police immediately.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                Joint On-Site Survey & Logbooks
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Facilitate site visit for the loss adjuster. Provide certified copies of the Measurement Book (MB), 
                site daily logbooks, rainfall/weather reports, and structural drawings showing pre-incident status.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                Reinstatement & Claim Discharge
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Execute repairs in accordance with the surveyor's recommendation. Submit itemized reconstruction contractor invoices, 
                salvage credit vouchers, and signed Joint Discharge Voucher for direct NEFT settlement.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Engineering Claims Verification Checklist:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Original CAR/EAR Policy schedule with all endorsement slips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Contract Agreement between Principal and Main Contractor (with BOQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Certified extract of Measurement Book (MB) immediately preceding loss</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Structural drawings, erection bar-chart schedules, and testing logs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Police FIR / Panchnama copy (if burglary, collapse, or third-party injury)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Indian Meteorological Department (IMD) rainfall/storm verification bulletin</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTIMATION LETTER GENERATOR */}
      {activeTab === "draft" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase font-sans tracking-wide border-b border-slate-200 dark:border-zinc-700 pb-2 flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-amber-600" />
              <span>Accident Intimation Parameters</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Contractor / Insured Firm:</label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Principal / Employer Body:</label>
                <input
                  type="text"
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Project Name & Section:</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">CAR/EAR Policy No:</label>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Date of Incident:</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Estimated Loss (INR Crores):</label>
                <input
                  type="number"
                  step="0.1"
                  value={estimatedLossCrores}
                  onChange={(e) => setEstimatedLossCrores(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Damage & Accident Details:</label>
                <textarea
                  rows={3}
                  value={incidentDescription}
                  onChange={(e) => setIncidentDescription(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                  Compiled Intimation Letter
                </span>
                <button
                  onClick={handleCopyLetter}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDraft ? "Copied to Clipboard!" : "Copy Letter Text"}</span>
                </button>
              </div>

              <pre className="bg-slate-50 dark:bg-zinc-950 p-3.5 rounded-xl text-[11px] font-mono text-slate-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto border border-slate-200 dark:border-zinc-800">
                {compiledLetter}
              </pre>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-zinc-500 italic">
              * Send this letter immediately via email to the underwriting branch and claims department, followed by a signed physical copy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
