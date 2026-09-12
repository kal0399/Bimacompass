import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Flame, 
  Heart, 
  Ship,
  HardHat,
  ShieldCheck, 
  PhoneCall, 
  Compass, 
  BookOpen, 
  Scale, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  Bookmark, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Newspaper,
  Calendar,
  Radio,
  Lock,
  ExternalLink,
  Waves
} from "lucide-react";
import PyrametricBox from "./PyrametricBox";

interface HomeDashboardProps {
  setActiveTab: (tab: any) => void;
  isAdminLoggedIn?: boolean;
}

const INSIGHT_TIPS = [
  {
    title: "The 15-Day Plan Return Period",
    desc: "You have exactly 15 days (30 days if you buy online) after getting your policy papers to return it if you changed your mind, and get a full refund."
  },
  {
    title: "Room Rent Limits: The Hidden Traps",
    desc: "Check your room rent limit carefully. If you pick a hospital room that costs more than this limit, the company will deduct a large percentage from your whole hospital bill, not just the room price!"
  },
  {
    title: "The Free Ombudsman Option",
    desc: "If your insurance claim is rejected unfairly, you can complain to the official ombudsman helper for free. Their decision is binding on the company, but not on you!"
  },
  {
    title: "Pre-Approval is Not Final Approval",
    desc: "Getting a card check at the hospital entrance is just a quick validation. The company does their main audit when you check out, so keep all treatment letters and bill receipts safe."
  },
  {
    title: "Staying Safe While Renewing",
    desc: "If you miss your insurance renewal date, you get 30 extra days to pay. Paying inside this time protects your waiting periods for illnesses you already have."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      mass: 0.9
    }
  }
};

export default function HomeDashboard({ setActiveTab, isAdminLoggedIn }: HomeDashboardProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isSyncingNews, setIsSyncingNews] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("");
  const [newsMessage, setNewsMessage] = useState<string>("");

  useEffect(() => {
    // Pick a random tip on mount
    const rand = Math.floor(Math.random() * INSIGHT_TIPS.length);
    setTipIndex(rand);

    // Load cached news for instant render
    const savedNews = localStorage.getItem("bima_custom_news");
    if (savedNews) {
      try {
        setNewsList(JSON.parse(savedNews));
      } catch (err) {
        // Fallback
      }
    }

    // Realtime background auto-sync on mount
    fetchNewsFromInternet(true);

    // Periodic realtime background auto-sync every 5 minutes
    const interval = setInterval(() => {
      fetchNewsFromInternet(true);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const fetchNewsFromInternet = async (isBackground = false) => {
    if (!isBackground) {
      setIsSyncingNews(true);
      setNewsMessage("Syncing latest Indian insurance industry news from live web...");
    }
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.news && Array.isArray(data.news)) {
        setNewsList(data.news);
        localStorage.setItem("bima_custom_news", JSON.stringify(data.news));
        setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      // Also sync any updated terms into local glossary automatically
      if (data.glossaryUpdates && Array.isArray(data.glossaryUpdates) && data.glossaryUpdates.length > 0) {
        const localGlossaryRaw = localStorage.getItem("bima_custom_glossary");
        let currentLocalGlossary: any[] = [];
        if (localGlossaryRaw) {
          try { currentLocalGlossary = JSON.parse(localGlossaryRaw); } catch(e) {}
        }
        const mergedGlossary = [...currentLocalGlossary];
        data.glossaryUpdates.forEach((item: any) => {
          const alreadyExists = mergedGlossary.some(x => x.term.toLowerCase() === item.term.toLowerCase());
          if (!alreadyExists) {
            mergedGlossary.push({ ...item, isWebUpdate: true });
          }
        });
        localStorage.setItem("bima_custom_glossary", JSON.stringify(mergedGlossary));
        window.dispatchEvent(new Event("storage"));
      }
      if (!isBackground) {
        setNewsMessage("Successfully updated news and internet terms!");
        setTimeout(() => setNewsMessage(""), 3500);
      }
    } catch (err) {
      if (!isBackground) {
        setNewsMessage("Using verified offline news cache.");
        setTimeout(() => setNewsMessage(""), 3500);
      }
    } finally {
      if (!isBackground) {
        setIsSyncingNews(false);
      }
    }
  };

  const rotateTip = () => {
    setTipIndex((prev) => (prev + 1) % INSIGHT_TIPS.length);
  };

  const modules = [
    {
      id: "handbook",
      title: "Business Insurance Guide",
      desc: "Understand clear coverages for businesses—including cargo transit, fire damage, and work stoppage protection with simple interactive checklists.",
      icon: Flame,
      color: "from-rose-50/70 to-rose-100/30 hover:border-rose-300 hover:shadow-rose-100/40",
      iconColor: "text-rose-600 bg-rose-100/80",
      badge: "Business Cover",
      actionText: "Explore Guide"
    },
    {
      id: "retail_health",
      title: "Personal Health Insurance",
      desc: "Learn about hospital room rent limits, illnesses you already had, waiting periods, and how to get pre-approval before your hospital stay.",
      icon: Heart,
      color: "from-emerald-50/70 to-emerald-100/30 hover:border-emerald-300 hover:shadow-emerald-100/40",
      iconColor: "text-emerald-600 bg-emerald-100/80",
      badge: "Health Help",
      actionText: "Check Rules"
    },
    {
      id: "marine",
      title: "Marine & Cargo Transit",
      desc: "Inland Transit Clauses (ITC A/B/C), ocean freight ICC rules, carrier liability notices, and public Indian insurer policies (New India, National, Oriental, United India).",
      icon: Ship,
      color: "from-cyan-50/70 to-cyan-100/30 hover:border-cyan-300 hover:shadow-cyan-100/40",
      iconColor: "text-cyan-600 bg-cyan-100/80",
      badge: "Marine & Cargo",
      actionText: "Explore Marine"
    },
    {
      id: "ear_car",
      title: "EAR / CAR Engineering",
      desc: "Erection All Risks & Contractor's All Risks policies for civil structures, highway corridors, factory machinery, testing periods, and TAC tariff endorsements.",
      icon: HardHat,
      color: "from-amber-50/70 to-amber-100/30 hover:border-amber-300 hover:shadow-amber-100/40",
      iconColor: "text-amber-600 bg-amber-100/80",
      badge: "Project Insurance",
      actionText: "Explore CAR/EAR"
    },
    {
      id: "helplines",
      title: "Helplines & Support",
      desc: "A simple list of customer helpline offices, government complaint centers, and easy-to-use complaint letter formats.",
      icon: PhoneCall,
      color: "from-amber-50/70 to-amber-100/30 hover:border-amber-300 hover:shadow-amber-100/40",
      iconColor: "text-amber-600 bg-amber-100/80",
      badge: "Support Contact",
      actionText: "Find Contacts"
    },
    {
      id: "dictionary",
      title: "Easy Word Dictionary",
      desc: "Search hard insurance terms and get them translated from complex policy language into plain, simple English words.",
      icon: BookOpen,
      color: "from-teal-50/70 to-teal-100/30 hover:border-teal-300 hover:shadow-teal-100/40",
      iconColor: "text-teal-600 bg-teal-100/80",
      badge: "Translation Tool",
      actionText: "Search Words"
    },
    {
      id: "pyrametric",
      title: "PyraMetric™ Actuarial Platform",
      desc: "Explore statutory All India Fire Tariff (AIFT) TAC 1–8 occupancy rates, IS 1893 seismic geo-pricing, and IRDAI underwriting slips.",
      icon: Flame,
      color: "from-sky-950/15 to-blue-900/10 hover:border-sky-500/50 hover:shadow-sky-950/10",
      iconColor: "text-amber-600 bg-sky-50 border border-sky-200",
      badge: "AIFT Tariff Suite",
      actionText: "Open Underwriter"
    },
    {
      id: "parametric",
      title: "Parametric Policy Repository",
      desc: "Based on Swiss Re's model (Gianni Biason). Explore index-triggered policies for cyclones, earthquakes, rainfall, and solar revenue with 2–14 day automated payouts.",
      icon: Waves,
      color: "from-sky-50/80 to-cyan-100/40 hover:border-sky-400 hover:shadow-sky-100/40",
      iconColor: "text-sky-700 bg-sky-100/80",
      badge: "Swiss Re Model",
      actionText: "Open Repository"
    },
    {
      id: "legal",
      title: "Our Core Policies",
      desc: "Check our on-device safety details and see how our offline tool protects your data securely without sharing anything.",
      icon: Scale,
      color: "from-slate-50 to-slate-100/70 hover:border-slate-300 hover:shadow-slate-100/40",
      iconColor: "text-slate-700 bg-slate-200/80",
      badge: "App Information",
      actionText: "View Policies"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="home-dashboard-landing">
           {/* Immersive Welcome Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#182026] via-[#10161C] to-[#0A0E13] border border-slate-800/80 p-6 md:p-8 text-white overflow-hidden shadow-lg">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        {/* Ambient radial flare behind buttons */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Independent Consumer Initiative
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-sans text-white leading-tight">
                Your Trustworthy Guide in the Fine Print.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                An independent, non-profit resource dedicated to simplifying difficult policy details, explaining coverage rules clearly, and protecting you from telephone scams.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-semibold bg-slate-800/80 text-slate-200 border border-slate-700/50 px-3 py-1 rounded-lg">
                📋 Clear Policy Rules
              </span>
              <span className="text-[10px] font-semibold bg-slate-800/80 text-slate-200 border border-slate-700/50 px-3 py-1 rounded-lg">
                🔐 Plain-English Dictionary
              </span>
              <span className="text-[10px] font-semibold bg-slate-800/80 text-slate-200 border border-slate-700/50 px-3 py-1 rounded-lg">
                🚫 100% Free & Secure
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 relative z-10">
            <button
              onClick={() => setActiveTab("handbook")}
              className="py-3 px-5.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-sky-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider font-mono hover:scale-105"
            >
              <Flame className="w-4 h-4" />
              <span>Commercial Handbook</span>
            </button>
            <button
              onClick={() => setActiveTab("dictionary")}
              className="py-3 px-5.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/85 font-extrabold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider font-mono hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explain Policy Terms</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pyrametric Ecosystem Gateway Box (Directly below hero banner) */}
      <PyrametricBox onExploreInternal={() => setActiveTab("pyrametric")} />

      {/* Modules Selector Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-extrabold text-sky-700 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-sky-600" />
            <span>Tell us what you are looking for</span>
          </h2>
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            Total Sections: {modules.length}
          </span>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {modules.map((m) => {
            const IconComponent = m.icon;
            return (
              <motion.div
                key={m.id}
                variants={cardVariants}
                onClick={() => setActiveTab(m.id)}
                className={`group relative rounded-2xl border border-slate-200/90 bg-gradient-to-br ${m.color} p-6 transition-all duration-300 hover:shadow-lg cursor-pointer select-none hover:-translate-y-1.5 flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`p-2.5 rounded-xl ${m.iconColor} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-[9px] font-extrabold tracking-wider bg-white/90 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md uppercase font-mono">
                      {m.badge}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition duration-150 text-sm md:text-base tracking-tight leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-sky-700 transition">
                  <span className="font-mono uppercase tracking-wider text-[10px]">{m.actionText}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition duration-200 shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Indian Insurance Industry News Section (Placed directly above Interactive Insurance Tip) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs space-y-4 relative overflow-hidden transition-all duration-300" id="indian-insurance-news-section">
        {/* News Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-150 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Newspaper className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="font-extrabold text-slate-900 text-sm md:text-base font-sans tracking-tight">
                Indian Insurance Industry News
              </h3>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Realtime Auto-Sync
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Verified IRDAI regulatory updates, industry developments, and consumer advisories automatically synced in real time.
            </p>
          </div>

          {/* Admin-only Sync Now Trigger vs Non-Admin Info Badge */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdminLoggedIn ? (
              <button
                onClick={() => fetchNewsFromInternet(false)}
                disabled={isSyncingNews}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white font-extrabold text-[10.5px] rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer font-mono uppercase tracking-wider hover:scale-105 active:scale-95"
                title="Admin Manual Sync Trigger"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingNews ? "animate-spin" : ""}`} />
                <span>{isSyncingNews ? "Syncing..." : "Sync News Now"}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl" title="Manual trigger reserved for administrators">
                <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                <span>Auto-Sync Active (Manual Sync: Admin Only)</span>
              </div>
            )}
          </div>
        </div>

        {newsMessage && (
          <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 animate-fade-in flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse shrink-0" />
            <span>{newsMessage}</span>
          </div>
        )}

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsList.map((item) => (
            <div 
              key={item.id || item.title}
              className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 space-y-2.5 hover:border-sky-300 transition duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    {item.category || "Regulatory"}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{item.date || "August 2026"}</span>
                  </div>
                </div>

                <h4 className="font-extrabold text-slate-900 text-xs md:text-sm tracking-tight leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Radio className="w-3 h-3 text-emerald-500 animate-pulse shrink-0" />
                  <span>{item.source || "IRDAI Bulletin"}</span>
                </span>
                <a
                  href="https://www.irda.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:underline flex items-center gap-0.5 font-bold"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span>
            Background Realtime Sync Channel: Active
          </span>
          {lastSyncedTime && <span>Last Auto-Synced: {lastSyncedTime}</span>}
        </div>
      </div>

      {/* Dynamic Interactive Citizen Tip of the Day Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 md:p-6 shadow-3xs space-y-3.5 relative overflow-hidden transition-all duration-300">
        <div className="flex items-center justify-between gap-4 border-b border-amber-150 pb-2.5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-sans">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
            <span>Interactive Insurance Tip</span>
          </div>
          <button
            onClick={rotateTip}
            className="p-1 px-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-[10px] font-bold border border-amber-200 flex items-center gap-1 cursor-pointer transition select-none"
            title="Show Next Tip"
          >
            <RefreshCw className="w-3 h-3 text-amber-700" />
            <span>Next Insight</span>
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">
            {INSIGHT_TIPS[tipIndex].title}
          </h3>
          <p className="text-xs text-slate-755 leading-relaxed font-sans">
            {INSIGHT_TIPS[tipIndex].desc}
          </p>
        </div>
        
        <div className="text-[9px] text-amber-800/80 font-mono font-medium flex items-center gap-1 pt-1 opacity-75">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Information sourced directly from public education notices.</span>
        </div>
      </div>

      {/* Citizen Safety Manifesto Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>How to use BimaCompass easily?</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          BimaCompass compiles simple rules and guides locally on your device. Choose any section above to start reading. If you are checking room rent limits or waiting periods before a hospital visit, read the <strong className="text-slate-800 font-semibold">Personal Health Insurance</strong> section. If you want to check business setups, open the <strong className="text-slate-801 font-semibold">Business Insurance Guide</strong>. You can use the search tool to verify and check terms instantly.
        </p>
      </div>

    </div>
  );
}
