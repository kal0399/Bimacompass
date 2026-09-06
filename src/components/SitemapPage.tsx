import React, { useState, useEffect } from "react";
import { 
  Network, 
  Map, 
  Flame, 
  Heart, 
  Ship, 
  HardHat, 
  PhoneCall, 
  Compass, 
  BookOpen, 
  Scale, 
  ExternalLink, 
  Globe, 
  Server,
  Database,
  ArrowRight,
  Wifi,
  WifiOff,
  Files,
  Waves
} from "lucide-react";

type TabId = "dictionary" | "handbook" | "retail_health" | "marine" | "ear_car" | "helplines" | "planner" | "legal" | "sitemap" | "pyrametric" | "parametric";

interface SitemapPageProps {
  setActiveTab: (tab: TabId) => void;
  currentAppVersion?: string;
}

export default function SitemapPage({ setActiveTab, currentAppVersion = "1.0.0" }: SitemapPageProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [swRegistered, setSwRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Monitor network state
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const goOnline = () => setIsOnline(true);
      const goOffline = () => setIsOnline(false);

      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);

      // 2. Check Service Worker status
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          setSwRegistered(!!reg);
        });
      } else {
        setSwRegistered(false);
      }

      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
      };
    }
  }, []);

  const sitemapModules = [
    {
      id: "handbook" as TabId,
      name: "Commercial Lines Handbook",
      icon: Flame,
      color: "text-rose-600 bg-rose-50",
      category: "Statutory Property & Liability Protection",
      description: "Covers Standard Fire & Special Perils Policy (SFSP), Marine Cargo transit open insurance cover, General Average salvage rules, and Workmen's Compensation statutory liabilities.",
      sections: ["SFSP Statutory Exclusions", "Marine Claims Protocols", "Workmen Liability Scale", "General Average Declarations"]
    },
    {
      id: "retail_health" as TabId,
      name: "Retail Health Insurance",
      icon: Heart,
      color: "text-emerald-600 bg-emerald-50",
      category: "Individual & Family Welfare Guidelines",
      description: "Step-by-step health coverage evaluation, cash-less hospital authorization pipelines, pre-existence waiting criteria guides, and room rent cap parameters.",
      sections: ["Co-payment Clauses", "Pre-existing Disease Waivers", "Pre/Post Hospitalization Periods", "Exclusion Index"]
    },
    {
      id: "marine" as TabId,
      name: "Marine Cargo & Transit Insurance",
      icon: Ship,
      color: "text-cyan-600 bg-cyan-50",
      category: "Transit Risk & Cargo Logistics Architecture",
      description: "Inland Transit Clauses (ITC A/B/C) under TAC guidelines, international ocean Institute Cargo Clauses (ICC A/B/C), carrier subrogation notices, and open covers from Indian PSUs.",
      sections: ["ITC vs ICC Perils Matrix", "Public Insurers Directory", "Open Policy vs Open Cover", "Notice to Carrier Draft Generator"]
    },
    {
      id: "ear_car" as TabId,
      name: "EAR & CAR Engineering Insurance",
      icon: HardHat,
      color: "text-amber-600 bg-amber-50",
      category: "Civil Works & Plant Erection Risk Management",
      description: "Contractor's All Risks (CAR) for infrastructure/civil construction and Erection All Risks (EAR) for machinery, testing periods, and TAC tariff endorsements.",
      sections: ["CAR vs EAR Diagnostic", "Section I Material Damage", "Section II Third Party Liability", "Accident Intimation Docket"]
    },
    {
      id: "helplines" as TabId,
      name: "Redressal Helplines",
      icon: PhoneCall,
      color: "text-amber-600 bg-amber-50",
      category: "Statutory Resolution Portals",
      description: "Directory of Bima Lokpal (Insurance Ombudsman) across Indian jurisdictions, dynamic claim escalation forms, and contact phone databases.",
      sections: ["Ombudsman Regional Directory", "IRDAI Grievance Call Center", "Grievance Redressal Officer (GRO) rules", "Sample Appeal Templates"]
    },
    {
      id: "planner" as TabId,
      name: "Need-Based Matchmaker",
      icon: Compass,
      color: "text-sky-600 bg-sky-50",
      category: "Interactive Diagnostic Assessment App",
      description: "On-device dynamic policy advisor recommending structural coverages based on age, lifestyle segment, or business profile risk index.",
      sections: ["Commercial Coverage Diagnostic", "Retail Premium Planner", "Asset Protection Rating Profile", "Dynamic Coverage Summary Export"]
    },
    {
      id: "dictionary" as TabId,
      name: "Insurance Policy Glossary",
      icon: BookOpen,
      color: "text-teal-600 bg-teal-50",
      category: "Comprehensive On-Device Translation Index",
      description: "Plain English definitions of compound legal-jargon words found in binding policy wordings (e.g. Subrogation, Utmost Good Faith, General Average).",
      sections: ["Subrogation Principles", "Indemnification Math models", "Co-insurance Factors", "Deductible calculations"]
    },
    {
      id: "parametric" as TabId,
      name: "Parametric Policy Repository",
      icon: Waves,
      color: "text-cyan-600 bg-cyan-50",
      category: "Swiss Re Parametric Solutions Framework",
      description: "Based on Gianni Biason's Swiss Re doctrine. Features pre-agreed index-triggered policies for cyclones, earthquakes, rainfall, and solar revenue with 2–14 day automated payouts.",
      sections: ["USGS Seismic ShakeMap Index", "Cat-In-A-Circle Cyclone Model", "Solar GHI & Wind Volume Hedges", "Automated Payout Underwriting Simulator"]
    },
    {
      id: "pyrametric" as TabId,
      name: "PyraMetric™ Actuarial Platform",
      icon: Flame,
      color: "text-amber-600 bg-amber-50",
      category: "Statutory AIFT & IIB Rate Engine",
      description: "Explore 100+ industrial & commercial base rates across TAC Sections 1–8, IIB burning cost benchmarks, IS 1893 seismic pricing, and IRDAI underwriting slips.",
      sections: ["TAC 1–8 Tariff Rates", "IS 1893 Seismic Geo-Pricing", "FEA Discount Matrix", "IRDAI Underwriting Slips"]
    },
    {
      id: "legal" as TabId,
      name: "Legal & Privacy Policy",
      icon: Scale,
      color: "text-slate-700 bg-slate-100",
      category: "Consumer Safety Codes of Operation",
      description: "Fair-use clauses, Sections of the Indian Copyright Act safeguards, copyright compliance certifications, and 72-hour swift email legal redressal channels.",
      sections: ["Section 52 Fair-Use Protection", "Zero-PII Privacy Pledge", "Safe Harbor Trademark Declarations", "72-Hour Legal Adjustment Covenant"]
    }
  ];

  const cachedAssets = [
    { name: "/ (Root Document Domain)", type: "Client Navigation Shell", cache: "Network-First / Offline Fallback" },
    { name: "/index.html", type: "Main Canvas Template", cache: "Stale-While-Revalidate" },
    { name: "/manifest.json", type: "PWA Standard Configuration", cache: "Stale-While-Revalidate" },
    { name: "/sitemap.xml", type: "SEO Search Console Index", cache: "Stale-While-Revalidate" },
    { name: "/google573dda10fb21271c.html", type: "Google Search Console Verification Domain Token", cache: "Stale-While-Revalidate" },
    { name: "/sw.js", type: "Active Service Worker Code", cache: "Network-Only Bypass" },
    { name: "/favicon.svg", type: "Classic Vector Branding Logo", cache: "Stale-While-Revalidate" },
    { name: "/src/main.tsx", type: "React Entry point bundle", cache: "Stale-While-Revalidate" }
  ];

  const externalPortals = [
    { title: "IRDAI Official Regulatory Site", url: "https://www.irda.gov.in", desc: "Supreme regulator overseeing insurer conduct, corporate compliance certificates, and consumer circulars in the Indian market." },
    { title: "Bima Bharosa Portal", url: "https://bimabharosa.irdai.gov.in", desc: "United central system to register grievance complaints directly and track progress from filing through executive remediation." },
    { title: "Policyholder Education Hub", url: "https://www.policyholder.gov.in", desc: "IRDAI's informational library rich with instructional booklets, guidance pamphlets, and regulatory legal indexes." },
    { title: "NCDRC Consumer Disputes Forum", url: "http://www.ncdrc.nic.in", desc: "Appellate judiciary for consumer litigation, enabling direct online docket filing and dispute tracking." }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="pwa-master-sitemap-root">
      
      {/* Title Header */}
      <div className="border-b border-slate-200 pb-5 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xs">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              BimaCompass Sitemap & PWA Portal
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Interactive map of standard offline assets, regulatory portals, and module indices.
            </p>
          </div>
        </div>
      </div>

      {/* Network Status & PWA Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Network Status Indicator */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between transition ${
          isOnline 
            ? "bg-emerald-50/60 border-emerald-200 text-emerald-950" 
            : "bg-amber-50/60 border-amber-200 text-amber-950"
        }`}>
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold font-mono tracking-wider uppercase opacity-85 block">Signal State</span>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-emerald-600 shrink-0 select-none" />
              ) : (
                <WifiOff className="w-5 h-5 text-amber-600 shrink-0 select-none" />
              )}
              <span className="text-sm font-extrabold font-sans">
                {isOnline ? "Network Status: Online" : "Network Status: Off-Line"}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-sans">
              {isOnline 
                ? "Connected directly to bimacompass.cloud cloud systems." 
                : "Swapped seamlessly to standard PWA client database cache."}
            </p>
          </div>
        </div>

        {/* Card 2: PWA Service Worker Engine */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between transition ${
          swRegistered 
            ? "bg-indigo-50/60 border-indigo-200 text-indigo-950" 
            : "bg-slate-55 bg-slate-50 border-slate-200 text-slate-950"
        }`}>
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold font-mono tracking-wider uppercase opacity-85 block">PWA Engine</span>
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-600 shrink-0" />
              <span className="text-sm font-extrabold font-sans">
                Service Worker: Active
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-sans">
              Local vault daemon handles cached file assets to enable fully offline handbook usage.
            </p>
          </div>
        </div>

        {/* Card 3: Target Domain Synchronization */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-950">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold font-mono tracking-wider uppercase text-slate-400 block">Domain Mapping</span>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-700 shrink-0" />
              <span className="text-sm font-extrabold font-sans truncate">
                bimacompass.cloud
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-sans">
              Synchronized to direct static client parameters. Seamless redirect is fully operational.
            </p>
          </div>
        </div>

      </div>

      {/* Main Interactive Index Map */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono px-1 flex items-center gap-2">
          <span>🗺️</span>
          <span>Interactive Chapter Directory</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sitemapModules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div 
                key={mod.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-xs transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[9px] font-mono bg-slate-100 font-bold border border-slate-200 text-slate-600 rounded px-1.5 py-0.5">
                      {mod.category}
                    </span>
                    <div className={`p-2.5 rounded-xl shrink-0 ${mod.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition">
                      {mod.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {mod.description}
                    </p>
                  </div>

                  {/* Sections list tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {mod.sections.map((sec) => (
                      <span key={sec} className="text-[9px] font-sans font-semibold bg-sky-50 text-sky-800 rounded-md px-2 py-0.5 border border-sky-200">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setActiveTab(mod.id)}
                    className="text-xs text-indigo-700 hover:text-indigo-900 font-extrabold flex items-center gap-1 transition-all cursor-pointer group-hover:mr-1"
                  >
                    <span>Inspect Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard Offline Asset Manifest Table */}
      <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
            <Files className="w-4 h-4 text-slate-700 shrink-0" />
            <span>PWA Precache Vault Manifest</span>
          </h3>
          <span className="text-[9px] font-mono bg-sky-100 text-sky-800 font-extrabold px-1.5 py-0.5 rounded-md border border-sky-200">
            IMMUTABLE CORE SHELL
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-2xl">
          Under the service worker caching strategy registry, this site stores standard files locally inside the client's cache storage. When the user travels offline, BimaCompass operates without loss of core utilities.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                <th className="pb-2 font-mono text-[10px]">Static Shell Resource</th>
                <th className="pb-2 font-mono text-[10px]">Asset Classification</th>
                <th className="pb-2 font-mono text-[10px] text-right">Service Worker Routing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150/50">
              {cachedAssets.map((asset) => (
                <tr key={asset.name} className="hover:bg-white/80 transition">
                  <td className="py-2.5 font-mono text-[11px] text-slate-800 font-bold">{asset.name}</td>
                  <td className="py-2.5 text-slate-500 font-medium">{asset.type}</td>
                  <td className="py-2.5 text-right font-mono text-[10px] text-emerald-800 font-bold">{asset.cache}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* External Regulatory Registry Portal */}
      <div className="space-y-4 bg-slate-900 text-white rounded-3xl p-6 shadow-md border-2 border-slate-800">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-indigo-400 flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Official Regulatory Resource Directory</span>
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-1 font-sans">
            BimaCompass is an independent citizen educational catalog. We encourage consumers to always bookmark, consult, and utilize public IRDAI systems for real claims submission, company directory lookup, and legal complaints registration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {externalPortals.map((portal) => (
            <div key={portal.title} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-100 flex items-center gap-1">
                  <span>{portal.title}</span>
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  {portal.desc}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800/60 flex justify-end">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold inline-flex items-center gap-0.5 transition"
                >
                  <span>Access Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
