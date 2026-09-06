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
  Compass,
  Maximize2,
  X,
  Sparkles,
  Layers
} from "lucide-react";

interface PyrametricBoxProps {
  onExploreInternal?: () => void;
}

const PYRAMETRIC_APP_URL = "https://pyrametric.vercel.app/";

const PYRAMETRIC_AIFT_FEATURES = [
  {
    icon: Calculator,
    title: "Statutory AIFT & IIB Rate Matrix",
    desc: "Explore 100+ industrial & commercial occupancy base rates across TAC Sections 1–8, IIB burning cost benchmarks, and statutory FLEXA & STFI tables.",
    badge: "TAC 1–8 Rates",
    accent: "text-blue-400 border-blue-500/30 bg-blue-950/40"
  },
  {
    icon: Compass,
    title: "IS 1893 Seismic & NATCAT Engine",
    desc: "Navigate zonal geo-pricing across Seismic Zones II–V, discover flood and storm hazard matrices, and simulate IMTRIP pool treaty rules.",
    badge: "IS 1893 Geo-Pricing",
    accent: "text-amber-400 border-amber-500/30 bg-amber-950/40"
  },
  {
    icon: ShieldCheck,
    title: "FEA Discount Matrix Optimization",
    desc: "Maximize statutory premium savings up to 25% by configuring Fire Extinguishing Appliances—from manual hydrants to automatic sprinkler systems.",
    badge: "Up to 25% FEA Rebate",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40"
  },
  {
    icon: FileSpreadsheet,
    title: "IRDAI Underwriting Slip Generator",
    desc: "Instantly draft audit-ready slips for Bharat Sookshma Udyam, Bharat Laghu Udyam, SFSP, and Mega IAR risks with Condition of Average clauses.",
    badge: "IRDAI Underwriting Slips",
    accent: "text-rose-400 border-rose-500/30 bg-rose-950/40"
  }
];

interface BoxComponentSI {
  building: number;
  plantMachinery: number;
  stocks: number;
  furnitureFixtures: number;
}

const OCCUPANCY_SCENARIOS = [
  {
    id: "chemical",
    name: "Specialty Chemical Plant (Gujarat)",
    category: "Industrial High Hazard (Section 5)",
    baseRatePerMille: 2.85,
    stfiRatePerMille: 0.35,
    seismicZone: "Zone IV (High)",
    eqRatePerMille: 0.40,
    defaultComponents: { building: 15, plantMachinery: 25, stocks: 8, furnitureFixtures: 2 },
    icon: Factory,
    description: "Petrochemicals, solvent distillation, and flammable storage requiring stringent AIFT Section 5 underwriting."
  },
  {
    id: "cotton",
    name: "Cotton Spinning Mill (Tamil Nadu)",
    category: "Industrial Medium Hazard (Section 4)",
    baseRatePerMille: 1.95,
    stfiRatePerMille: 0.25,
    seismicZone: "Zone III (Moderate)",
    eqRatePerMille: 0.25,
    defaultComponents: { building: 8, plantMachinery: 12, stocks: 4, furnitureFixtures: 1 },
    icon: Factory,
    description: "Blow-room, spinning frames, and high-lint yarn processing subject to spontaneous combustion perils."
  },
  {
    id: "it_park",
    name: "Modern IT Business Park (Bengaluru)",
    category: "Commercial Non-Manufacturing (Section 3)",
    baseRatePerMille: 0.75,
    stfiRatePerMille: 0.15,
    seismicZone: "Zone II (Low)",
    eqRatePerMille: 0.10,
    defaultComponents: { building: 60, plantMachinery: 45, stocks: 5, furnitureFixtures: 10 },
    icon: Cpu,
    description: "Grade-A tech park with addressable smoke detection, gas suppression, and automatic sprinkler systems."
  },
  {
    id: "cold_storage",
    name: "Ammonia Cold Storage (Punjab)",
    category: "Storage & Utilities (Section 6)",
    baseRatePerMille: 1.45,
    stfiRatePerMille: 0.20,
    seismicZone: "Zone IV (High)",
    eqRatePerMille: 0.30,
    defaultComponents: { building: 5, plantMachinery: 7, stocks: 2.5, furnitureFixtures: 0.5 },
    icon: Building2,
    description: "Refrigerated perishable storage with ammonia leak peril endorsements and machinery breakdown extensions."
  }
];

export default function PyrametricBox({ onExploreInternal }: PyrametricBoxProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("chemical");
  const [components, setComponents] = useState<BoxComponentSI>({
    building: 15,
    plantMachinery: 25,
    stocks: 8,
    furnitureFixtures: 2
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showEmbeddedModal, setShowEmbeddedModal] = useState<boolean>(false);

  const currentScenario = OCCUPANCY_SCENARIOS.find(s => s.id === activeScenarioId) || OCCUPANCY_SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    const scen = OCCUPANCY_SCENARIOS.find(s => s.id === id);
    if (scen) {
      setComponents(scen.defaultComponents);
    }
  };

  const handleLaunchClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // Open directly in a new tab reliably
    try {
      window.open(PYRAMETRIC_APP_URL, "_blank", "noopener,noreferrer");
    } catch {
      // In case window.open is blocked by strict iframe policies, fallback to native anchor navigation
    }
  };

  const updateComponent = (field: keyof BoxComponentSI, value: string) => {
    const parsed = parseFloat(value);
    setComponents(prev => ({
      ...prev,
      [field]: isNaN(parsed) || parsed < 0 ? 0 : parsed
    }));
  };

  // Indicative Actuarial Rate Calculations (Per Mille: ₹ per 1000 SI, Zero Discount)
  const totalSumInsuredCrores = Number((components.building + components.plantMachinery + components.stocks + components.furnitureFixtures).toFixed(3));
  const baseFLEXARate = currentScenario.baseRatePerMille;
  const natcatRate = currentScenario.stfiRatePerMille + currentScenario.eqRatePerMille;
  const totalGrossTariffRatePerMille = Number((baseFLEXARate + natcatRate).toFixed(3)); // Zero discount logic
  
  const totalSumInsuredRupees = totalSumInsuredCrores * 10000000;
  const indicativeAnnualNetPremium = Math.round((totalSumInsuredRupees / 1000) * totalGrossTariffRatePerMille);
  const gstAmount = Math.round(indicativeAnnualNetPremium * 0.18);
  const indicativeGrossPayable = indicativeAnnualNetPremium + gstAmount;

  return (
    <>
      <div 
        className="relative rounded-2xl border border-sky-400/40 bg-gradient-to-r from-[#0B132B] via-[#0F1C3F] to-[#0A1020] p-3.5 sm:p-4 text-white overflow-hidden shadow-lg transition-all duration-300"
        id="pyrametric-showcase-box"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-blue-600/15 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-24 bg-amber-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          {/* Compact Banner Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Logo & Core Identity */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Authentic PyraMetric SVG Logo */}
              <div className="relative shrink-0 p-1.5 rounded-xl bg-slate-950/80 border border-blue-500/40 shadow-sm shadow-blue-500/30">
                <svg 
                  className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_0_10px_rgba(37,99,235,0.6)]" 
                  viewBox="0 0 512 512" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="pyrShieldGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="pyrFlameGradComp" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="40%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="pyrFlameInnerComp" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="60%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M256 72 L392 124 C392 260 334 380 256 428 C178 380 120 260 120 124 Z" 
                    fill="url(#pyrShieldGradComp)" 
                    stroke="#60a5fa" 
                    strokeWidth="12" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M256 94 L370 138 C370 252 320 354 256 396 C192 354 142 252 142 138 Z" 
                    fill="#0f172a" 
                    opacity="0.7" 
                  />
                  <path 
                    d="M256 160 C256 160 296 210 296 250 C296 276 278 296 256 296 C234 296 216 276 216 250 C216 220 236 190 256 160 Z" 
                    fill="url(#pyrFlameGradComp)" 
                  />
                  <path 
                    d="M256 170 C274 210 320 234 320 286 C320 324 291 354 256 354 C221 354 192 324 192 286 C192 250 216 224 236 196 C240 230 258 248 266 252 C266 230 260 206 256 170 Z" 
                    fill="url(#pyrFlameGradComp)" 
                  />
                  <path 
                    d="M256 240 C270 262 282 278 282 298 C282 320 270 336 256 336 C242 336 230 320 230 298 C230 282 242 264 256 240 Z" 
                    fill="url(#pyrFlameInnerComp)" 
                  />
                </svg>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full border border-slate-900 animate-pulse"></div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white font-sans">
                    PyraMetric™
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/40">
                    <Flame className="w-2.5 h-2.5 text-amber-400" /> AIFT Actuarial Suite
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    IS 1893 & TAC 1–8
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-xs text-slate-300 font-medium truncate max-w-xl">
                  Explore statutory AIFT & IIB rate matrices, IS 1893 seismic geo-pricing, FEA discounts up to 25%, and instant IRDAI underwriting slips.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-end sm:self-auto">
              {onExploreInternal && (
                <button
                  onClick={onExploreInternal}
                  className="py-1.5 px-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 border border-blue-600/40 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer font-mono shadow-sm"
                  title="Switch to full PyraMetric tab"
                >
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Full Tab</span>
                </button>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="py-1.5 px-3 bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer font-mono"
                title="Toggle feature details and live rate sandbox"
              >
                <span>{isExpanded ? "Collapse" : "Explore & Sandbox"}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-400" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-400" />}
              </button>

              <button
                onClick={() => setShowEmbeddedModal(true)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer font-mono"
                title="Open PyraMetric embedded live window inside app"
              >
                <Maximize2 className="w-3 h-3 text-blue-400" />
                <span className="hidden sm:inline">Embed View</span>
              </button>

              <a
                href={PYRAMETRIC_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLaunchClick}
                className="py-1.5 px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-[11px] rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-mono hover:scale-102 active:scale-98 border border-blue-400/40"
                title="Launch PyraMetric app at pyrametric.vercel.app"
                id="go-to-pyrametric-direct-btn"
              >
                <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Launch App</span>
                <ArrowUpRight className="w-3 h-3 text-blue-100" />
              </a>
            </div>
          </div>

          {/* Quick Feature Pills (Compact Single Row) */}
          {!isExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5 border-t border-slate-800/80">
              {PYRAMETRIC_AIFT_FEATURES.map((feat, idx) => {
                const IconCmp = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    <IconCmp className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="truncate">{feat.badge}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Expanded View: Full Feature Cards & Interactive Rate Sandbox */}
          {isExpanded && (
            <div className="space-y-3 pt-2 border-t border-slate-800/80 animate-fade-in">
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PYRAMETRIC_AIFT_FEATURES.map((feat, idx) => {
                  const IconCmp = feat.icon;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl p-3 border bg-slate-900/80 ${feat.accent} flex flex-col justify-between space-y-1.5`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <IconCmp className="w-4 h-4" />
                          <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-slate-300">
                            {feat.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white tracking-tight">
                          {feat.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-300 leading-snug">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive AIFT Rate Sandbox */}
              <div className="rounded-xl bg-[#09101F] border border-blue-500/30 p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white font-sans">
                    <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    <span>AIFT Occupancy Underwriting Matrix & Premium Sandbox</span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-300 uppercase tracking-wider bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                    Statutory Tariff
                  </span>
                </div>

                {/* Occupancy Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {OCCUPANCY_SCENARIOS.map((scen) => {
                    const ScenIcon = scen.icon;
                    const active = scen.id === activeScenarioId;
                    return (
                      <button
                        key={scen.id}
                        onClick={() => handleScenarioChange(scen.id)}
                        className={`p-2 rounded-lg text-left transition flex items-center justify-between cursor-pointer border ${
                          active
                            ? "bg-blue-600/30 border-blue-400 text-white"
                            : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[11px] font-bold truncate">
                          <ScenIcon className={`w-3 h-3 shrink-0 ${active ? "text-amber-400" : "text-slate-400"}`} />
                          <span className="truncate">{scen.name.split("(")[0]}</span>
                        </div>
                        <span className="text-[9px] font-mono shrink-0 text-slate-400">
                          ₹{scen.baseRatePerMille.toFixed(2)}‰
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Component-Wise Free Text Controls and Indicative Calculated Result */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 space-y-2.5 bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-800 pb-1.5">
                      <span className="text-slate-300 font-bold">Component-Wise Sum Insured (₹ Crores):</span>
                      <span className="font-bold text-blue-300">Total: ₹{totalSumInsuredCrores} Cr</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-0.5 bg-slate-950/70 p-1.5 rounded border border-slate-800">
                        <label className="text-[10px] font-mono text-slate-400 block">1. Building (₹ Cr)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={components.building || ""}
                          onChange={(e) => updateComponent("building", e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-0.5 bg-slate-950/70 p-1.5 rounded border border-slate-800">
                        <label className="text-[10px] font-mono text-slate-400 block">2. Plant & Machinery (₹ Cr)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={components.plantMachinery || ""}
                          onChange={(e) => updateComponent("plantMachinery", e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-0.5 bg-slate-950/70 p-1.5 rounded border border-slate-800">
                        <label className="text-[10px] font-mono text-slate-400 block">3. Stocks (₹ Cr)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={components.stocks || ""}
                          onChange={(e) => updateComponent("stocks", e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-0.5 bg-slate-950/70 p-1.5 rounded border border-slate-800">
                        <label className="text-[10px] font-mono text-slate-400 block">4. Furniture/Fixtures (₹ Cr)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={components.furnitureFixtures || ""}
                          onChange={(e) => updateComponent("furnitureFixtures", e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="text-[10px] text-amber-300/90 font-mono bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                      ⚠️ Zero discount applied. For statutory FEA discounts & risk add-ons, visit <a href={PYRAMETRIC_APP_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-200">pyrametric.vercel.app</a>.
                    </div>
                  </div>

                  {/* Result Card */}
                  <div className="p-3 rounded-lg border border-blue-500/40 bg-blue-950/30 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] font-mono text-slate-300">
                        <span className="text-slate-400">Indicative Rate:</span>
                        <span className="font-bold text-emerald-400">₹{totalGrossTariffRatePerMille.toFixed(3)}‰</span>
                      </div>
                      <div className="flex justify-between text-[10.5px] font-mono text-slate-300">
                        <span className="text-slate-400">Indicative Net:</span>
                        <span className="text-white font-semibold">₹{indicativeAnnualNetPremium.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono font-black text-amber-300 pt-1 border-t border-slate-800">
                        <span>Gross (+GST):</span>
                        <span>₹{indicativeGrossPayable.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <a
                      href={PYRAMETRIC_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLaunchClick}
                      className="w-full py-1.5 px-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-[10.5px] rounded text-center transition font-mono uppercase tracking-wider block"
                    >
                      Explore Discounts & Add-ons →
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct launch link */}
              <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-400 pt-1">
                <span className="truncate">Embedded Link: <strong className="text-blue-300">https://pyrametric.vercel.app/</strong></span>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <button
                    onClick={() => setShowEmbeddedModal(true)}
                    className="text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1 cursor-pointer transition"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Embedded Viewer</span>
                  </button>
                  <a
                    href={PYRAMETRIC_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLaunchClick}
                    className="text-blue-300 hover:text-blue-200 font-bold flex items-center gap-1 transition underline"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Embedded In-App Modal Viewer for PyraMetric */}
      {showEmbeddedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-6xl h-[88vh] bg-slate-900 border border-blue-500/40 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0B132B] via-[#0F1C3F] to-[#0A1020] border-b border-slate-800 text-white">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">PyraMetric™ Actuarial Platform</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                      https://pyrametric.vercel.app/
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PYRAMETRIC_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLaunchClick}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-blue-200 hover:text-white bg-blue-950 hover:bg-blue-900 border border-blue-700/50 rounded-lg flex items-center gap-1 transition"
                  title="Open in external window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
                <button
                  onClick={() => setShowEmbeddedModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
                  title="Close embedded preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Iframe Container */}
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={PYRAMETRIC_APP_URL}
                title="PyraMetric Live Platform"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
