import React, { useState } from "react";
import { 
  Flame, 
  ArrowUpRight, 
  Activity, 
  Building2, 
  Factory, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Calculator,
  Maximize2,
  Sparkles,
  Layers,
  FileText,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

const PYRAMETRIC_APP_URL = "https://pyrametric.vercel.app/";
const BIMACOMPASS_APP_URL = "https://bimacompass.ai.studio";

const AIFT_SECTIONS = [
  { id: "s1", name: "Section 1: Dwellings & Offices", baseRate: "0.20 - 0.50‰", desc: "Residential buildings, corporate headquarters, and institutional offices." },
  { id: "s2", name: "Section 2: Educational & Utilities", baseRate: "0.40 - 0.85‰", desc: "Schools, universities, water treatment plants, and civic infrastructure." },
  { id: "s3", name: "Section 3: Commercial Non-Manufacturing", baseRate: "0.60 - 1.20‰", desc: "Malls, retail centers, modern IT business parks, and hospital complexes." },
  { id: "s4", name: "Section 4: Industrial Medium Hazard", baseRate: "1.20 - 2.50‰", desc: "Textile mills, engineering fabrication, assembly lines, and plastics." },
  { id: "s5", name: "Section 5: Industrial High Hazard", baseRate: "2.50 - 6.50‰", desc: "Petrochemicals, specialty chemical synthesis, distilleries, and solvents." },
  { id: "s6", name: "Section 6: Storage & Warehousing", baseRate: "0.80 - 2.20‰", desc: "General godowns, ammonia cold storages, and hazardous bulk storage." },
  { id: "s7", name: "Section 7: Power Plants & Utilities", baseRate: "1.00 - 3.50‰", desc: "Thermal, hydroelectric, solar farms, and gas turbine substations." },
  { id: "s8", name: "Section 8: Mega Risks (> ₹2,500 Cr)", baseRate: "Market Underwritten", desc: "Mega Industrial All Risk (IAR) policies with bespoke global treaty terms." },
];

interface ComponentSI {
  building: number; // in Crores
  plantMachinery: number; // in Crores
  stocks: number; // in Crores
  furnitureFixtures: number; // in Crores
}

const OCCUPANCY_SCENARIOS = [
  {
    id: "chemical",
    name: "Specialty Chemical Synthesis Plant (Gujarat)",
    category: "Industrial High Hazard (AIFT Section 5)",
    baseRatePerMille: 2.85,
    stfiRatePerMille: 0.35,
    seismicZone: "Zone IV (High Risk)",
    eqRatePerMille: 0.40,
    defaultComponents: { building: 15, plantMachinery: 25, stocks: 8, furnitureFixtures: 2 },
    icon: Factory,
    tacRef: "TAC AIFT Section 5, Item 18",
    description: "Multi-stage organic solvent distillation, bulk flammable storage tanks, and exothermic reactor vessels requiring statutory TAC Section 5 underwriting rules."
  },
  {
    id: "cotton",
    name: "Automated Cotton Spinning & Ginning Mill (Tamil Nadu)",
    category: "Industrial Medium Hazard (AIFT Section 4)",
    baseRatePerMille: 1.95,
    stfiRatePerMille: 0.25,
    seismicZone: "Zone III (Moderate Risk)",
    eqRatePerMille: 0.25,
    defaultComponents: { building: 8, plantMachinery: 12, stocks: 4, furnitureFixtures: 1 },
    icon: Factory,
    tacRef: "TAC AIFT Section 4, Item 09",
    description: "High-speed blow-room machinery, ring frames, and yarn warehousing with high combustible lint loading and spontaneous combustion hazards."
  },
  {
    id: "it_park",
    name: "Grade-A IT Cyber Park & Tier-IV Data Center (Bengaluru)",
    category: "Commercial Non-Manufacturing (AIFT Section 3)",
    baseRatePerMille: 0.75,
    stfiRatePerMille: 0.15,
    seismicZone: "Zone II (Low Risk)",
    eqRatePerMille: 0.10,
    defaultComponents: { building: 60, plantMachinery: 45, stocks: 5, furnitureFixtures: 10 },
    icon: Cpu,
    tacRef: "TAC AIFT Section 3, Item 04",
    description: "High-value enterprise server infrastructure, clean-agent NOVEC/FM-200 gas flooding, and full NFPA-13 wet pipe automatic sprinkler systems."
  },
  {
    id: "cold_storage",
    name: "Ammonia Refrigerated Cold Chain Storage (Punjab)",
    category: "Storage & Utilities (AIFT Section 6)",
    baseRatePerMille: 1.45,
    stfiRatePerMille: 0.20,
    seismicZone: "Zone IV (High Risk)",
    eqRatePerMille: 0.30,
    defaultComponents: { building: 5, plantMachinery: 7, stocks: 2.5, furnitureFixtures: 0.5 },
    icon: Building2,
    tacRef: "TAC AIFT Section 6, Item 12",
    description: "Refrigerated perishable food warehouse with ammonia piping network, deterioration of stock extensions, and electrical substation perils."
  }
];

export default function PyrametricTab() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("chemical");
  const [components, setComponents] = useState<ComponentSI>({
    building: 15,
    plantMachinery: 25,
    stocks: 8,
    furnitureFixtures: 2
  });
  const [isSandboxExpanded, setIsSandboxExpanded] = useState<boolean>(true);
  const [activeViewMode, setActiveViewMode] = useState<"interactive" | "embedded">("interactive");

  const currentScenario = OCCUPANCY_SCENARIOS.find(s => s.id === activeScenarioId) || OCCUPANCY_SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    const scen = OCCUPANCY_SCENARIOS.find(s => s.id === id);
    if (scen) {
      setComponents(scen.defaultComponents);
    }
  };

  const handleLaunchExternal = () => {
    try {
      window.open(PYRAMETRIC_APP_URL, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback
    }
  };

  const updateComponent = (field: keyof ComponentSI, value: string) => {
    const parsed = parseFloat(value);
    setComponents(prev => ({
      ...prev,
      [field]: isNaN(parsed) || parsed < 0 ? 0 : parsed
    }));
  };

  // Zero Discount Indicative Calculations
  const totalSumInsuredCrores = Number((components.building + components.plantMachinery + components.stocks + components.furnitureFixtures).toFixed(3));
  const baseFLEXARate = currentScenario.baseRatePerMille;
  const natcatRate = currentScenario.stfiRatePerMille + currentScenario.eqRatePerMille;
  const totalGrossTariffRatePerMille = Number((baseFLEXARate + natcatRate).toFixed(3)); // Zero discount logic
  
  const totalSumInsuredRupees = totalSumInsuredCrores * 10000000;
  const indicativeAnnualNetPremium = Math.round((totalSumInsuredRupees / 1000) * totalGrossTariffRatePerMille);
  const gstAmount = Math.round(indicativeAnnualNetPremium * 0.18);
  const indicativeGrossPayable = indicativeAnnualNetPremium + gstAmount;

  return (
    <div className="space-y-6 animate-fade-in" id="pyrametric-full-tab">
      {/* Top Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0F1C3F] to-[#0A1020] border border-blue-500/40 p-6 md:p-8 text-white overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-48 bg-blue-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-32 bg-amber-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-[10.5px] font-mono font-extrabold text-blue-300 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> PyraMetric™ Actuarial Underwriting Platform
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                AIFT Tariff & IS 1893 Engine
              </span>
            </div>

            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-white font-sans leading-tight">
              All India Fire Tariff (AIFT) Actuarial Underwriting Matrix
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              Explore statutory TAC Sections 1–8 occupancy base rates, dynamic IS 1893 seismic & STFI geo-pricing, statutory Fire Extinguishing Appliance (FEA) rebates up to 25%, and audit-ready IRDAI underwriting slips.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-300">
              <span className="bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                🔥 100+ AIFT Occupancy Classes
              </span>
              <span className="bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                🌍 Zones II–V Seismic Geo-Pricing
              </span>
              <span className="bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                🛡️ Pro-Rata Condition of Average
              </span>
              <span className="bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                📑 Bharat Laghu / Sookshma / SFSP
              </span>
            </div>
          </div>

          {/* Quick Action Switches */}
          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 relative z-10">
            <div className="flex bg-slate-900/90 border border-slate-700 p-1 rounded-xl">
              <button
                onClick={() => setActiveViewMode("interactive")}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeViewMode === "interactive"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Matrix</span>
              </button>
              <button
                onClick={() => setActiveViewMode("embedded")}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeViewMode === "embedded"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Live App View</span>
              </button>
            </div>

            <a
              href={PYRAMETRIC_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLaunchExternal}
              className="py-2.5 px-4.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-mono hover:scale-105 active:scale-95 border border-amber-300"
            >
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>Launch pyrametric.vercel.app</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Mode View */}
      {activeViewMode === "interactive" ? (
        <div className="space-y-6">
          {/* Dropdown-Style Interactive Rate Sandbox */}
          <div className="rounded-2xl border border-blue-500/30 bg-[#09101F] p-5 md:p-6 text-white shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
                <div>
                  <h3 className="text-base md:text-lg font-black text-white tracking-tight font-sans">
                    AIFT Actuarial Underwriting Matrix & Dynamic Rate Sandbox
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Select an occupancy risk profile to simulate FLEXA base rates, STFI/Seismic loadings, and FEA discount calculations in real time.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSandboxExpanded(!isSandboxExpanded)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>{isSandboxExpanded ? "Collapse Sandbox" : "Expand Sandbox"}</span>
                {isSandboxExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-400" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            </div>

            {isSandboxExpanded && (
              <div className="space-y-5 animate-fade-in">
                {/* Occupancy Scenario Selector Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {OCCUPANCY_SCENARIOS.map((scen) => {
                    const ScenIcon = scen.icon;
                    const active = scen.id === activeScenarioId;
                    return (
                      <button
                        key={scen.id}
                        onClick={() => handleScenarioChange(scen.id)}
                        className={`p-3.5 rounded-xl text-left transition flex flex-col justify-between space-y-2 cursor-pointer border ${
                          active
                            ? "bg-blue-600/30 border-blue-400 shadow-md shadow-blue-900/40 text-white"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <ScenIcon className={`w-4 h-4 ${active ? "text-amber-400" : "text-blue-400"}`} />
                          <span className="text-[10px] font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                            ₹{scen.baseRatePerMille.toFixed(2)}‰
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs leading-snug line-clamp-1">{scen.name}</h4>
                          <p className="text-[10.5px] text-slate-400 mt-0.5">{scen.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Occupancy Specs & Tariff Reference */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{currentScenario.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                        {currentScenario.tacRef}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {currentScenario.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start md:self-auto font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300">
                      🌍 {currentScenario.seismicZone}
                    </span>
                  </div>
                </div>

                {/* Component-Wise Free Text Sum Insured & Indicative Premium Output */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left Column: Component-wise Free Text Inputs */}
                  <div className="lg:col-span-2 space-y-4 bg-slate-900/90 border border-slate-800 p-4.5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold text-slate-200">
                          Component-Wise Property Sum Insured (₹ in Crores)
                        </span>
                        <p className="text-[10.5px] text-slate-400 font-sans">
                          Enter asset values per line item to compute the statutory indicative gross tariff.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-blue-300">
                        Total SI: ₹{totalSumInsuredCrores} Cr
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Building Component */}
                      <div className="space-y-1 bg-slate-950/80 border border-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <label className="text-slate-300 font-semibold">1. Building & Superstructures</label>
                          <span className="text-slate-500 text-[10px]">(₹ Cr)</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-slate-400 font-mono text-xs">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={components.building || ""}
                            onChange={(e) => updateComponent("building", e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-6 pr-16 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400">Crores</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">
                          = ₹{((components.building || 0) * 10000000).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Plant & Machinery */}
                      <div className="space-y-1 bg-slate-950/80 border border-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <label className="text-slate-300 font-semibold">2. Plant, Machinery & Equipment</label>
                          <span className="text-slate-500 text-[10px]">(₹ Cr)</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-slate-400 font-mono text-xs">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={components.plantMachinery || ""}
                            onChange={(e) => updateComponent("plantMachinery", e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-6 pr-16 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400">Crores</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">
                          = ₹{((components.plantMachinery || 0) * 10000000).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Stocks */}
                      <div className="space-y-1 bg-slate-950/80 border border-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <label className="text-slate-300 font-semibold">3. Stocks (Raw, WIP & Finished)</label>
                          <span className="text-slate-500 text-[10px]">(₹ Cr)</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-slate-400 font-mono text-xs">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={components.stocks || ""}
                            onChange={(e) => updateComponent("stocks", e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-6 pr-16 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400">Crores</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">
                          = ₹{((components.stocks || 0) * 10000000).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Furniture, Fixtures & Fittings */}
                      <div className="space-y-1 bg-slate-950/80 border border-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <label className="text-slate-300 font-semibold">4. Furniture, Fixtures & Fittings (FFF)</label>
                          <span className="text-slate-500 text-[10px]">(₹ Cr)</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-slate-400 font-mono text-xs">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={components.furnitureFixtures || ""}
                            onChange={(e) => updateComponent("furnitureFixtures", e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-6 pr-16 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                          <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400">Crores</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">
                          = ₹{((components.furnitureFixtures || 0) * 10000000).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Zero Discount Guidance Note */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-300 font-mono text-[11px] uppercase tracking-wide">
                          Indicative Statutory Tariff (Zero Discount Applied)
                        </span>
                        <p className="text-[10.5px] text-slate-300 font-sans leading-relaxed">
                          This preview displays the baseline statutory tariff rate without commercial discounts or FEA allowances. To unlock up to 25% Fire Extinguishing Appliance (FEA) rebates, voluntary deductibles, IIB loss cost benchmarking, and custom add-on covers (STFI, Earthquake, Terrorism, Deterioration of Stock, Flop / BI), open the dedicated platform at <a href={PYRAMETRIC_APP_URL} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline font-bold hover:text-amber-200">pyrametric.vercel.app</a>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Indicative Rate Breakdown & Call to Action */}
                  <div className="p-4.5 rounded-xl border border-blue-500/40 bg-gradient-to-b from-blue-950/40 to-slate-900/90 flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-[10px] font-mono font-extrabold text-blue-300 uppercase tracking-widest block">
                          Indicative Statutory Rate
                        </span>
                        <span className="text-[9px] font-mono text-amber-300 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
                          Zero Discount
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-400">Total Sum Insured:</span>
                          <span className="font-bold text-white">₹{totalSumInsuredCrores} Cr</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-400">Base FLEXA Rate:</span>
                          <span>₹{baseFLEXARate.toFixed(2)}‰</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>FEA Discount:</span>
                          <span className="text-slate-500">0.00% (Standard)</span>
                        </div>
                        <div className="flex justify-between text-amber-300">
                          <span className="text-slate-400">STFI Tariff:</span>
                          <span>+₹{currentScenario.stfiRatePerMille.toFixed(2)}‰</span>
                        </div>
                        <div className="flex justify-between text-amber-300">
                          <span className="text-slate-400">IS 1893 Earthquake:</span>
                          <span>+₹{currentScenario.eqRatePerMille.toFixed(2)}‰</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1.5">
                          <span>Total Indicative Tariff Rate:</span>
                          <span>₹{totalGrossTariffRatePerMille.toFixed(3)}‰</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="space-y-1 text-right font-mono">
                        <div className="text-xs text-slate-400">
                          Indicative Net Premium: <strong className="text-white">₹{indicativeAnnualNetPremium.toLocaleString("en-IN")}</strong>
                        </div>
                        <div className="text-xs text-slate-400">
                          GST (18%): <strong className="text-slate-300">₹{gstAmount.toLocaleString("en-IN")}</strong>
                        </div>
                        <div className="text-sm font-black text-amber-300 pt-1">
                          Indicative Gross: ₹{indicativeGrossPayable.toLocaleString("en-IN")}
                        </div>
                      </div>

                      {/* Redirect CTA Box */}
                      <a
                        href={PYRAMETRIC_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLaunchExternal}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider font-mono cursor-pointer"
                      >
                        <span>Explore Full Discounts on PyraMetric</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TAC 1–8 Statutory Sections Reference Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>All India Fire Tariff (AIFT) Section Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AIFT_SECTIONS.map((sec) => (
                <div 
                  key={sec.id}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sec.name.split(":")[0]}</span>
                    <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                      {sec.baseRate}
                    </span>
                  </div>
                  <div className="text-[11.5px] font-semibold text-slate-300">{sec.name.split(":")[1]}</div>
                  <p className="text-[10.5px] text-slate-400 leading-snug">{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Full Embedded Iframe View of PyraMetric */
        <div className="rounded-2xl border border-blue-500/40 bg-slate-950 overflow-hidden shadow-2xl space-y-0 flex flex-col h-[750px]">
          {/* Iframe Browser Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-bold text-white">Live Embedded Sandbox:</span>
              <span className="text-blue-300 underline font-mono">{PYRAMETRIC_APP_URL}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={PYRAMETRIC_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLaunchExternal}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold flex items-center gap-1 transition"
              >
                <span>Open New Window</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full relative bg-slate-950">
            <iframe
              src={PYRAMETRIC_APP_URL}
              title="PyraMetric Live Platform"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            />
          </div>
        </div>
      )}
    </div>
  );
}
