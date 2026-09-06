import React, { useState, useMemo } from "react";
import {
  Ship,
  Anchor,
  Compass,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  Truck,
  Plane,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Layers,
  ArrowRight,
  Download,
  Copy,
  Check,
  Info,
  BadgeAlert,
  Search,
  BookOpen
} from "lucide-react";

interface PerilItem {
  name: string;
  category: "Domestic (ITC)" | "International (ICC)" | "Both";
  itcA: boolean;
  itcB: boolean;
  itcC: boolean;
  iccA: boolean;
  iccB: boolean;
  iccC: boolean;
  description: string;
}

const PERILS_DATA: PerilItem[] = [
  {
    name: "Fire or Explosion",
    category: "Both",
    itcA: true,
    itcB: true,
    itcC: true,
    iccA: true,
    iccB: true,
    iccC: true,
    description: "Physical fire combustion, flash ignition, or chemical explosion during carriage."
  },
  {
    name: "Vessel Stranding, Grounding, or Sinking",
    category: "Both",
    itcA: true,
    itcB: true,
    itcC: true,
    iccA: true,
    iccB: true,
    iccC: true,
    description: "Total loss or critical damage resulting from waterborne hull stranding or sinking."
  },
  {
    name: "Overturning or Derailment of Land Conveyance",
    category: "Both",
    itcA: true,
    itcB: true,
    itcC: false,
    iccA: true,
    iccB: true,
    iccC: true,
    description: "Truck overturning, container toppling, or railway wagon derailment on Indian or foreign tracks."
  },
  {
    name: "Collision or Impact of Conveyance",
    category: "Both",
    itcA: true,
    itcB: true,
    itcC: false,
    iccA: true,
    iccB: true,
    iccC: true,
    description: "Collision with another vehicle, ship, or external object (excluding water contact alone)."
  },
  {
    name: "Breakage of Bridges or Culverts",
    category: "Domestic (ITC)",
    itcA: true,
    itcB: true,
    itcC: false,
    iccA: true,
    iccB: false,
    iccC: false,
    description: "Collapse of highway bridges, culverts, or flyovers causing cargo vehicle plunging."
  },
  {
    name: "Earthquake and Volcanic Eruption",
    category: "Both",
    itcA: true,
    itcB: true,
    itcC: false,
    iccA: true,
    iccB: true,
    iccC: false,
    description: "Tectonic shockwaves, seismic subsidence, or volcanic fallout directly impacting transit."
  },
  {
    name: "General Average Sacrifice & Jettison",
    category: "International (ICC)",
    itcA: true,
    itcB: false,
    itcC: true,
    iccA: true,
    iccB: true,
    iccC: true,
    description: "Voluntary throwing overboard of cargo or sacrifice authorized by the Master to save the common venture."
  },
  {
    name: "Washing Overboard",
    category: "International (ICC)",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: true,
    iccC: false,
    description: "Deck cargo swept into ocean waves during heavy swell or adverse marine weather."
  },
  {
    name: "Sea, Lake, or River Water Ingress into Hold",
    category: "International (ICC)",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: true,
    iccC: false,
    description: "Accidental flooding of cargo hold by saltwater or inland river waters."
  },
  {
    name: "Rainwater & Freshwater Damage",
    category: "Domestic (ITC)",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: false,
    iccC: false,
    description: "Monsoon deluge, open-tarp leakage, or freshwater soaking during loading/unloading."
  },
  {
    name: "Theft, Pilferage & Non-Delivery (TPND)",
    category: "Both",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: false,
    iccC: false,
    description: "Clandestine parcel pilferage, highway hijacking, or complete missing consignment upon destination delivery."
  },
  {
    name: "Handling Breakage & Rough Shunting",
    category: "Both",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: false,
    iccC: false,
    description: "Forklift drops, crane cable snapping, slings slipping, or rail shunting shock damage."
  },
  {
    name: "Leakage, Spillage & Contamination",
    category: "Both",
    itcA: true,
    itcB: false,
    itcC: false,
    iccA: true,
    iccB: false,
    iccC: false,
    description: "Liquid drum puncture, container flooring stains, or chemical cross-contamination."
  },
  {
    name: "Strike, Riots & Civil Commotion (SRCC)",
    category: "Both",
    itcA: false,
    itcB: false,
    itcC: false,
    iccA: false,
    iccB: false,
    iccC: false,
    description: "Requires explicit endorsement (Inland Transit Strike Clauses or Institute Strikes Clauses Cargo)."
  }
];

const PUBLIC_INSURERS = [
  {
    name: "The New India Assurance Co. Ltd.",
    badge: "PSU - Largest General Insurer",
    tagline: "Premier Underwriter of Global & Domestic Marine Portfolios",
    products: [
      "Inland Transit Specific Voyage Policy (ITC-A / ITC-B)",
      "Marine Open Policy / Open Cover for Exporters & Importers",
      "Sales Turnover Policy (STOP) for Indian Corporates",
      "Customs Duty Insurance for Consignments into Indian Ports"
    ],
    guideline: "Tariff Advisory Committee (TAC) benchmarked clauses with 10% statutory markup allowance for anticipated profits."
  },
  {
    name: "National Insurance Company Ltd.",
    badge: "PSU - Oldest Composite Insurer",
    tagline: "Extensive Marine Transit Coverage across Inland Waterways & Rail Corridors",
    products: [
      "Specific Cargo Voyage Policy (Road, Rail, Steamer, Air)",
      "Tea & Commodity Specialized Transit Policies",
      "Annual Marine Cargo Float Cover",
      "Special Storage cum Erection Transit Endorsements"
    ],
    guideline: "Requires monetary claim notice to transit carrier within 7 days (Railways Act / Carriage by Road Act) to preserve subrogation rights."
  },
  {
    name: "The Oriental Insurance Company Ltd.",
    badge: "PSU - Industrial Special Lines",
    tagline: "Robust Multi-Modal Containerized Freight Underwriting",
    products: [
      "Marine Cargo All Risks Open Cover",
      "Sellers' Contingency Interest Policy",
      "Bulk Oil & Chemical Cargo Transit Clause",
      "Inland Transit Rail-cum-Road Floating Policy"
    ],
    guideline: "Mandatory pre-shipment surveyor inspection for second-hand imported machinery and cargo valued above INR 50 Lakhs."
  },
  {
    name: "United India Insurance Company Ltd.",
    badge: "PSU - Nationwide Rural & Coastal Reach",
    tagline: "Coastal Vessels, Fishing Fleets, and Multimodal Freight Protection",
    products: [
      "Domestic Inland Transit Comprehensive Cover",
      "Marine Hull & Machinery Policy",
      "Exim Containerized Cargo (ICC A/B/C)",
      "Cold Chain Reefer Breakdown Add-on"
    ],
    guideline: "Mandates continuous temperature loggers for pharmaceutical and frozen marine consignments under reefer transit endorsements."
  }
];

export default function MarineInsurance() {
  const [activeTab, setActiveTab] = useState<"overview" | "clauses" | "policies" | "calculator" | "claims" | "draft">("overview");
  const [filterClause, setFilterClause] = useState<"ALL" | "ITC" | "ICC">("ALL");
  const [searchPeril, setSearchPeril] = useState<string>("");
  const [expandedPeril, setExpandedPeril] = useState<string | null>(null);

  // Calculator State
  const [commodityType, setCommodityType] = useState<string>("manufactured");
  const [transitMode, setTransitMode] = useState<string>("inland_road");
  const [cargoValue, setCargoValue] = useState<number>(1500000);
  const [freightValue, setFreightValue] = useState<number>(75000);
  const [markupPct, setMarkupPct] = useState<number>(10);
  const [incoterm, setIncoterm] = useState<string>("CIF");
  const [includeSrcc, setIncludeSrcc] = useState<boolean>(true);
  const [includeWar, setIncludeWar] = useState<boolean>(false);

  // Draft Generator State
  const [consignorName, setConsignorName] = useState<string>("Apex Industrial Components Ltd.");
  const [transporterName, setTransporterName] = useState<string>("National Express Logistics Services");
  const [lrNumber, setLrNumber] = useState<string>("LR-2026-MUM-88491");
  const [policyNumber, setPolicyNumber] = useState<string>("NIA/MUM/2026/MAR-77310");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-2026-0941");
  const [damageDescription, setDamageDescription] = useState<string>("Severe rainwater ingress and forklift carton puncture discovered during unloading at Bhiwandi central warehouse, impacting 24 master pallets.");
  const [claimAmount, setClaimAmount] = useState<number>(485000);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Computed Values
  const computedSumInsured = useMemo(() => {
    const base = cargoValue + freightValue;
    return Math.round(base * (1 + markupPct / 100));
  }, [cargoValue, freightValue, markupPct]);

  const recommendedClause = useMemo(() => {
    if (transitMode === "inland_road" || transitMode === "inland_rail") {
      if (commodityType === "fragile" || commodityType === "electronics" || commodityType === "manufactured") {
        return {
          code: "ITC (A) - All Risks",
          scope: "Inland Transit Clauses (A)",
          endorsements: includeSrcc ? ["Strike, Riots & Civil Commotion (SRCC)", "TPND Extension"] : ["TPND Extension"],
          reason: "Covers accidental handling damage, rainwater soaking, and transit theft on Indian road and rail networks."
        };
      } else {
        return {
          code: "ITC (B) - Named Perils",
          scope: "Inland Transit Clauses (B)",
          endorsements: includeSrcc ? ["SRCC Extension"] : [],
          reason: "Adequate for bulk raw materials (coal, ores, scrap) where accidental overturning and fire are the primary risks."
        };
      }
    } else if (transitMode === "international_ocean") {
      return {
        code: "ICC (A) - Institute Cargo Clauses (A)",
        scope: "Institute Cargo Clauses (A) 2009 / 1982",
        endorsements: [
          ...(includeSrcc ? ["Institute Strikes Clauses (Cargo)"] : []),
          ...(includeWar ? ["Institute War Clauses (Cargo)"] : []),
          "Incoterm Alignment: " + incoterm
        ],
        reason: "Comprehensive coverage against maritime risks, container sea water ingress, heavy weather damage, and total loss."
      };
    } else {
      return {
        code: "Institute Cargo Clauses (Air)",
        scope: "All Risks Air Carriage",
        endorsements: [
          ...(includeSrcc ? ["Institute Strikes Clauses (Air Cargo)"] : []),
          ...(includeWar ? ["Institute War Clauses (Air Cargo)"] : [])
        ],
        reason: "Formulated specifically for airport-to-airport transit with rapid handling and runway transshipment perils."
      };
    }
  }, [transitMode, commodityType, includeSrcc, includeWar, incoterm]);

  const filteredPerils = useMemo(() => {
    return PERILS_DATA.filter((item) => {
      const matchFilter =
        filterClause === "ALL" ||
        (filterClause === "ITC" && (item.category === "Domestic (ITC)" || item.category === "Both")) ||
        (filterClause === "ICC" && (item.category === "International (ICC)" || item.category === "Both"));
      const matchSearch =
        item.name.toLowerCase().includes(searchPeril.toLowerCase()) ||
        item.description.toLowerCase().includes(searchPeril.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filterClause, searchPeril]);

  const generatedNoticeText = useMemo(() => {
    const todayStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    return `FORMAL NOTICE OF MONETARY LOSS & CLAIM UNDER CARRIERS ACT / MARINE INSURANCE
Date: ${todayStr}

To:
The Regional Claims Manager,
${transporterName}

Copy To:
Claims Department,
Underwriting Branch (Policy: ${policyNumber})

Subject: Formal Notice of Monetary Loss / Damage to Consignment under Consignment Note / LR No: ${lrNumber}

Dear Sir / Madam,

We hereby give you formal statutory notice that the consignment dispatched under your Lorry Receipt / Waybill No. ${lrNumber}, covered under Commercial Invoice No. ${invoiceNumber}, has arrived at the destination warehouse in a severely damaged and defective condition.

CONSIGNMENT DETAILS:
1. Consignor / Insured: ${consignorName}
2. Transporter / Carrier: ${transporterName}
3. LR / Air Waybill / BL No: ${lrNumber}
4. Commercial Invoice & Date: ${invoiceNumber}
5. Marine Insurance Policy No: ${policyNumber}
6. Estimated Financial Loss: INR ${claimAmount.toLocaleString("en-IN")}

INCIDENT & DAMAGE SUMMARY:
${damageDescription}

In accordance with the statutory provisions of the Carriage by Road Act, 2007 / Railways Act, 1989 and the Indian Marine Insurance Act, 1963, we hereby hold your transport agency fully responsible and liable for this monetary loss caused due to negligence, improper carriage, or transit casualties.

You are requested to:
1. Arrange for an immediate joint inspection of the damaged goods along with the IRDAI-appointed Marine Insurance Surveyor.
2. Issue an official Damage / Shortage Certificate without delay.
3. Remit the claimed sum of INR ${claimAmount.toLocaleString("en-IN")} or confirm that our insurer may settle the claim with complete right of subrogation against your company.

Kindly preserve the damaged packing containers and seals for official surveying.

Yours faithfully,
Authorized Signatory
For ${consignorName}`;
  }, [consignorName, transporterName, lrNumber, policyNumber, invoiceNumber, damageDescription, claimAmount]);

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(generatedNoticeText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 border border-cyan-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase border border-cyan-400/30">
            <Anchor className="w-3.5 h-3.5" />
            <span>Commercial Marine & Cargo Insurance Hub</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                Marine Cargo & Inland Transit Insurance
              </h1>
              <p className="text-cyan-100/80 text-xs md:text-sm max-w-3xl leading-relaxed mt-1 font-sans">
                A regulatory and practical guide grounded in the <strong>Marine Insurance Act, 1963 (India)</strong>, 
                Tariff Advisory Committee (TAC) Inland Transit Clauses (ITC A/B/C), and international Institute Cargo Clauses (ICC A/B/C) 
                used by Indian public underwriters like New India Assurance, National Insurance, Oriental, and United India.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shrink-0">
              <Scale className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-200 block font-bold">Governing Act</span>
                <span className="text-xs font-bold text-white">Marine Insurance Act, 1963</span>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-800/50">
            {[
              { id: "overview", label: "Foundations & Insurers", icon: Building2 },
              { id: "clauses", label: "ITC vs ICC Perils Matrix", icon: Layers },
              { id: "policies", label: "Policy Structures", icon: FileText },
              { id: "calculator", label: "Sum Insured & Clause Advisor", icon: Compass },
              { id: "claims", label: "SOP & Carrier Liability", icon: ShieldCheck },
              { id: "draft", label: "Notice to Carrier Generator", icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-md font-extrabold"
                      : "bg-white/5 hover:bg-white/10 text-cyan-100 hover:text-white border border-white/5"
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

      {/* TAB 1: FOUNDATIONS & PUBLIC INSURERS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Insurable Interest Timing</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Unlike fire insurance (where insurable interest must exist at policy inception), in Marine Insurance, 
                insurable interest must exist <strong>at the time of loss</strong> (Section 8, Marine Insurance Act 1963). 
                Crucial for buyers on FOB or CFR terms where ownership transfers at ship's rail.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Utmost Good Faith (Uberrimae Fidei)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                The proposer must disclose every <strong>material circumstance</strong> known regarding cargo packing, 
                voyage route, transshipment hubs, vessel age, and carrier reliability prior to the contract conclusion. 
                Nondisclosure entitles the insurer to avoid the policy (Section 19).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">General Average Contribution</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                If the Master of a vessel deliberately sacrifices cargo or incurs extraordinary salvage expenses to save 
                the vessel and remaining cargo from total peril (York-Antwerp Rules), all participating cargo owners 
                must contribute proportionately to the loss.
              </p>
            </div>
          </div>

          {/* Public Insurers in India */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-sans">
                  <Building2 className="w-4 h-4 text-cyan-600" />
                  <span>Public Indian Insurers Marine Cargo Portfolios</span>
                </h2>
                <p className="text-xs text-slate-600">
                  Government general insurance corporations administering nationwide marine cargo underwriting.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                4 Key PSUs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PUBLIC_INSURERS.map((ins, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-xs hover:border-cyan-400 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-extrabold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        {ins.badge}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-1 font-sans">
                        {ins.name}
                      </h3>
                      <p className="text-[11px] text-slate-600 italic">
                        {ins.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono block">
                      Core Policy Offerings:
                    </span>
                    <ul className="space-y-1">
                      {ins.products.map((p, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 border border-slate-200 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Underwriting Note:</strong> {ins.guideline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERILS MATRIX (ITC vs ICC) */}
      {activeTab === "clauses" && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono shrink-0">
                Scope Filter:
              </span>
              <div className="flex gap-1.5">
                {(["ALL", "ITC", "ICC"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterClause(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      filterClause === filter
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {filter === "ALL" ? "All Clauses" : filter === "ITC" ? "Domestic (Inland ITC)" : "International (ICC)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search peril or risk clause..."
                value={searchPeril}
                onChange={(e) => setSearchPeril(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Comparative Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                    <th className="p-3.5 pl-4">Covered Peril / Event</th>
                    <th className="p-3.5 text-center font-mono">ITC (A)<br/><span className="text-[10px] font-normal text-slate-500">All Risks</span></th>
                    <th className="p-3.5 text-center font-mono">ITC (B)<br/><span className="text-[10px] font-normal text-slate-500">Named Perils</span></th>
                    <th className="p-3.5 text-center font-mono">ITC (C)<br/><span className="text-[10px] font-normal text-slate-500">Major Fire/Loss</span></th>
                    <th className="p-3.5 text-center font-mono border-l border-slate-200">ICC (A)<br/><span className="text-[10px] font-normal text-slate-500">Intl All Risks</span></th>
                    <th className="p-3.5 text-center font-mono">ICC (B)<br/><span className="text-[10px] font-normal text-slate-500">Intl Water/Loss</span></th>
                    <th className="p-3.5 text-center font-mono">ICC (C)<br/><span className="text-[10px] font-normal text-slate-500">Intl Catastrophe</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPerils.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr
                        onClick={() => setExpandedPeril(expandedPeril === item.name ? null : item.name)}
                        className="hover:bg-slate-50 cursor-pointer transition"
                      >
                        <td className="p-3.5 pl-4 font-bold text-slate-900 flex items-center justify-between gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {expandedPeril === item.name ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          {item.itcA ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                        <td className="p-3.5 text-center">
                          {item.itcB ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                        <td className="p-3.5 text-center">
                          {item.itcC ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                        <td className="p-3.5 text-center border-l border-slate-200">
                          {item.iccA ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                        <td className="p-3.5 text-center">
                          {item.iccB ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                        <td className="p-3.5 text-center">
                          {item.iccC ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                        </td>
                      </tr>
                      {expandedPeril === item.name && (
                        <tr className="bg-cyan-50/70 text-slate-700">
                          <td colSpan={7} className="p-3.5 pl-6 text-xs leading-relaxed">
                            <strong className="text-cyan-900">Scope Definition:</strong> {item.description}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLICY STRUCTURES & SPECIALTY COVERS */}
      {activeTab === "policies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-600">
                <Truck className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Specific Voyage Policy
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Covers a single designated trip from point of origin to destination (e.g., dispatch of 1 transformer from Vadodara to Chennai). 
              Policy expires immediately upon arrival and delivery at the destination warehouse or after 7 days from arrival at destination railway station/carrier godown.
            </p>
            <div className="text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700">
              <strong>Best for:</strong> One-off consignments, retail traders, machinery movements, and non-repetitive despatches.
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <Ship className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Marine Open Policy (Floating Policy)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              An annual continuous contract taken for an estimated total value of dispatches over a 12-month period. 
              The insured pays advance premium and submits periodic (weekly or monthly) declarations of actual shipments. 
              Premium is debited from the advance deposit against declarations until the sum insured is exhausted.
            </p>
            <div className="text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700">
              <strong>Best for:</strong> Domestic manufacturers, FMCG distributors, auto-part suppliers with hundreds of monthly despatches.
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-600">
                <Anchor className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Marine Open Cover (Export / Import)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              A continuous permanent memorandum of agreement between an international exporter/importer and an Indian public insurer. 
              The insurer agrees to cover all future shipments within agreed limits (limit per bottom/vessel and limit per location), 
              and individual stamped insurance certificates are generated for letter of credit (LC) negotiation.
            </p>
            <div className="text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700">
              <strong>Best for:</strong> Import/Export businesses negotiating bank LCs under ICC (A) terms.
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
                <Building2 className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Customs Duty Insurance Policy
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              When imported goods arrive at an Indian port and custom duties are assessed, the duty component increases the financial value of the cargo. 
              If the cargo is subsequently lost or damaged before physical clearance into the importer's warehouse, 
              customs authorities do not refund duty paid. This policy covers the duty value component under ITC (A).
            </p>
            <div className="text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700">
              <strong>Statutory Requirement:</strong> Must be taken before the shipment arrives at the Indian port of discharge.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CALCULATOR & ADVISOR */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-200 pb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-600" />
              <span>Transit Risk & Sum Insured Evaluator</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">Cargo Category:</label>
                <select
                  value={commodityType}
                  onChange={(e) => setCommodityType(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-sans"
                >
                  <option value="manufactured">Manufactured Goods / Machinery</option>
                  <option value="electronics">Consumer Electronics & Instruments</option>
                  <option value="fragile">Glassware & Ceramics (Fragile)</option>
                  <option value="bulk">Bulk Commodities (Grain, Minerals, Coal)</option>
                  <option value="chemicals">Industrial Chemicals & Liquids</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">Transit Route & Mode:</label>
                <select
                  value={transitMode}
                  onChange={(e) => setTransitMode(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-sans"
                >
                  <option value="inland_road">Domestic Inland Transit (Road Logistics / Highway)</option>
                  <option value="inland_rail">Domestic Inland Transit (Indian Railways / Freight Corridor)</option>
                  <option value="international_ocean">International Ocean Freight (Containerized / Bulk)</option>
                  <option value="international_air">International Air Freight Cargo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">Invoice Value of Goods (INR):</label>
                <input
                  type="number"
                  value={cargoValue}
                  onChange={(e) => setCargoValue(Math.max(1000, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">Freight & Forwarding Charges (INR):</label>
                <input
                  type="number"
                  value={freightValue}
                  onChange={(e) => setFreightValue(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">
                  Statutory Markup (% Anticipated Profit / Overhead):
                </label>
                <select
                  value={markupPct}
                  onChange={(e) => setMarkupPct(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-sans"
                >
                  <option value={0}>0% (Base Cost Only)</option>
                  <option value={10}>10% (TAC Standard Benchmark for Indian PSUs)</option>
                  <option value={15}>15% (Special Commercial Allowance)</option>
                  <option value={20}>20% (High Value Project Equipment)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 font-mono uppercase">Commercial Incoterm (2020):</label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 bg-white rounded-xl text-slate-900 font-sans"
                >
                  <option value="CIF">CIF (Cost, Insurance & Freight - Seller Buys Marine Cover)</option>
                  <option value="FOB">FOB (Free on Board - Buyer Insures Post-Loading)</option>
                  <option value="CFR">CFR (Cost & Freight - Buyer Insures Sea Leg)</option>
                  <option value="EXW">EXW (Ex-Works - Buyer Insures Entire Transit from Factory)</option>
                  <option value="DDP">DDP (Delivered Duty Paid - Seller Covers Through Destination)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 border-t border-slate-200">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSrcc}
                  onChange={(e) => setIncludeSrcc(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
                <span>Include Strike, Riots & Civil Commotion (SRCC) Clause</span>
              </label>

              {(transitMode === "international_ocean" || transitMode === "international_air") && (
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeWar}
                    onChange={(e) => setIncludeWar(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded"
                  />
                  <span>Include Institute War Clauses (Waterborne / In-Flight Only)</span>
                </label>
              )}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-slate-900 to-cyan-950 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 border border-cyan-800/40 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                  Recommended Clause
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
                  {incoterm}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-cyan-200 font-sans">
                  {recommendedClause.code}
                </h4>
                <p className="text-[11px] text-cyan-100/70 leading-relaxed">
                  {recommendedClause.reason}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl space-y-2 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block font-bold">
                  Recommended Sum Insured Calculation:
                </span>
                <div className="text-xl font-extrabold text-white font-mono">
                  INR {computedSumInsured.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-cyan-200/80 font-mono leading-tight">
                  Formula: (Invoice ₹{cargoValue.toLocaleString("en-IN")} + Freight ₹{freightValue.toLocaleString("en-IN")}) + {markupPct}% Markup
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Mandatory Endorsements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recommendedClause.endorsements.map((end, idx) => (
                    <span key={idx} className="text-[10px] bg-cyan-950/80 text-cyan-200 border border-cyan-700/50 px-2 py-0.5 rounded font-mono font-bold">
                      {end}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-white/10 pt-3 italic leading-normal">
              * Rates are governed by Indian public tariff guidelines or bilateral underwriter quotas depending on annual turnover.
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CLAIMS SOP & CARRIER NOTICE */}
      {activeTab === "claims" && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900 font-sans">
                Statutory Subrogation Preservation Rule (Carriage by Road Act, 2007)
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed font-sans">
                In India, insurance companies settle marine claims under the strict legal principle of <strong>Subrogation</strong>. 
                If the insured fails to serve a formal written notice of monetary loss onto the carrier within the statutory notice period 
                (usually within 180 days under Carriage by Road Act, or within 7 days for Indian Railways), 
                the underwriter's recovery rights are prejudiced and the claim may be legitimately repudiated!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-900 font-sans">
                Immediate Notice & Segregation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediately inform the insurer's branch office and the transporting carrier within 24 to 48 hours of cargo arrival. 
                Segregate damaged packages from sound packages to prevent worsening damage (Sue & Labour duty).
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-900 font-sans">
                Independent IRDAI Marine Survey
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The insurer appoints an IRDAI-licensed independent marine cargo surveyor. 
                A joint inspection is conducted in presence of the carrier's representative to determine root cause, extent of loss, and salvage value.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-900 font-sans">
                Letter of Subrogation & Settlement
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Execute a stamped Letter of Subrogation and Special Power of Attorney in favor of the insurer. 
                Insurer disburses net assessed loss directly to the insured's bank account via NEFT/RTGS.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Essential Claims Documentation Dossier:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Original Policy Document or Stamped Declaration Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Original Consignment Note / Lorry Receipt (LR) with damage endorsement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Commercial Invoice & Itemized Packing List showing weights/specs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Carrier Damage / Shortage Certificate issued by transporter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Copy of Monetary Claim Notice lodged against the carrier with postal acknowledgment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>IRDAI Surveyor Assessment Report and salvage disposal bills</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DRAFT NOTICE GENERATOR */}
      {activeTab === "draft" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-200 pb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Notice to Carrier Parameters</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Consignor / Insured Name:</label>
                <input
                  type="text"
                  value={consignorName}
                  onChange={(e) => setConsignorName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Carrier / Logistics Operator:</label>
                <input
                  type="text"
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">LR / B/L Number:</label>
                  <input
                    type="text"
                    value={lrNumber}
                    onChange={(e) => setLrNumber(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Invoice Reference:</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Marine Policy No:</label>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Claimed Amount (INR):</label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">Damage Discovery Description:</label>
                <textarea
                  rows={3}
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 font-sans">
                  Compiled Notice Document
                </span>
                <button
                  onClick={handleCopyNotice}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDraft ? "Copied to Clipboard!" : "Copy Notice Text"}</span>
                </button>
              </div>

              <pre className="bg-slate-50 p-3.5 rounded-xl text-[11px] font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto border border-slate-200">
                {generatedNoticeText}
              </pre>
            </div>

            <p className="text-[10px] text-slate-500 italic">
              * Send this letter via Registered Post with Acknowledgment Due (RPAD) or Speed Post to maintain official legal proof of dispatch.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
