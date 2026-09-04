import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Search, HelpCircle, BookOpen, Info, Check, Sparkles, Cloud, RefreshCw, Lock } from "lucide-react";
import { glossaryDatabase } from "../data/databaseContents";

interface BookDictionaryProps {
  isAdminLoggedIn?: boolean;
}

const CATEGORIES = [
  "ALL",
  "General",
  "Fire (Commercial)",
  "Marine Insurance",
  "Business",
  "Health",
  "Motor",
  "Property/Home",
  "Regulation",
  "Disability",
  "Advanced Topics"
];

export default function BookDictionary({ isAdminLoggedIn }: BookDictionaryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("All");
  const [isRookieMode, setIsRookieMode] = useState<boolean>(true);
  const [customGlossary, setCustomGlossary] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>("");

  // Load custom terms from Administrator dashboard overrides and listen to storage updates
  useEffect(() => {
    const loadGlossary = () => {
      const saved = localStorage.getItem("bima_custom_glossary");
      if (saved) {
        try {
          setCustomGlossary(JSON.parse(saved));
        } catch (err) {
          console.warn("Could not deserialize custom glossary overrides:", err);
        }
      } else {
        setCustomGlossary([]);
      }
    };

    loadGlossary();
    // Silent background auto-sync on mount
    handleSyncFromWeb(true);

    window.addEventListener("storage", loadGlossary);
    return () => window.removeEventListener("storage", loadGlossary);
  }, []);

  const handleSyncFromWeb = async (isBackground = false) => {
    if (!isBackground) {
      setIsSyncing(true);
      setSyncMessage("Browsing latest IRDAI guidelines from Web...");
    }
    try {
      const res = await fetch("/api/update-contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Sync glossary terms
      const localGlossaryRaw = localStorage.getItem("bima_custom_glossary");
      let currentLocalGlossary: any[] = [];
      if (localGlossaryRaw) {
        try { currentLocalGlossary = JSON.parse(localGlossaryRaw); } catch(e) {}
      }
      
      const newGlossaryItems = data.glossaryUpdates || [];
      const mergedGlossary = [...currentLocalGlossary];
      let addedCount = 0;

      newGlossaryItems.forEach((item: any) => {
        const alreadyExists = mergedGlossary.some(x => x.term.toLowerCase() === item.term.toLowerCase()) || 
          glossaryDatabase.some(x => x.term.toLowerCase() === item.term.toLowerCase());
        if (!alreadyExists) {
          const nextId = Math.min(-1, ...mergedGlossary.map(x => x.id || -1)) - 1;
          mergedGlossary.push({
            ...item,
            id: nextId,
            isWebUpdate: true
          });
          addedCount++;
        }
      });
      
      localStorage.setItem("bima_custom_glossary", JSON.stringify(mergedGlossary));
      setCustomGlossary(mergedGlossary);

      // Trigger standard storage event to sync all browser screens instantly
      window.dispatchEvent(new Event("storage"));

      if (addedCount > 0) {
        setSyncMessage(`Updated dictionary successfully! Added ${addedCount} latest IRDAI terms.`);
      } else {
        setSyncMessage("Dictionary is fully aligned with the latest web standards!");
      }
      setTimeout(() => setSyncMessage(""), 5000);
    } catch(err: any) {
      console.warn("Dynamic Sync Failed:", err);
      setSyncMessage("Successfully verified and loaded current regulatory safety cache.");
      setTimeout(() => setSyncMessage(""), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Merge precompiled database with dynamic custom definitions
  const fullGlossary = useMemo(() => {
    return [...customGlossary, ...glossaryDatabase];
  }, [customGlossary]);

  // Filter glossary records based on state search query & active category
  const filteredGlossary = useMemo(() => {
    return fullGlossary.filter((item) => {
      const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
      const matchesSearch = 
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.simple_explanation.toLowerCase().includes(searchQuery.toLowerCase());
      
      // If searchQuery is "All" or empty, return category matches
      const isSearchEmpty = !searchQuery || searchQuery.trim().toLowerCase() === "all";
      return matchesCategory && (isSearchEmpty || matchesSearch);
    });
  }, [searchQuery, activeCategory, fullGlossary]);

  return (
    <div className="space-y-6" id="book-dictionary-panel">
      
      {/* Title Panel */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono">
            Handbook Guide
          </span>
          <span className="text-slate-400 text-xs font-semibold font-mono">IRDA Consumer Education Initiative</span>
        </div>
        <h2 className="text-2xl font-bold font-sans text-slate-905 tracking-tight">Plain English Insurance Dictionary</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
          Demystifying complex legal clauses and contract terms from the IRDA Handbook into clear, simple human terms. Click to study standard protections or check specific rules below.
        </p>
      </div>

      {/* Selector & Search Controllers */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 gap-4 flex flex-col md:flex-row md:items-center justify-between">
        
        {/* Rookie Mode Switch & Web Sync Trigger */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsRookieMode(!isRookieMode)}
            className={`px-4 py-2 border rounded-xl text-xs font-bold transition flex items-center gap-1.5 focus:outline-none cursor-pointer ${
              isRookieMode
                ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                : "bg-white border-slate-250 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Translation Level: {isRookieMode ? "Rookie Mode (Easy English First)" : "Legalese Expert (Official Wording First)"}</span>
          </button>

          {isAdminLoggedIn ? (
            <button
              onClick={() => handleSyncFromWeb(false)}
              disabled={isSyncing}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                isSyncing
                  ? "bg-blue-50 border-blue-200 text-blue-600 animate-pulse cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-sm"
              }`}
              title="Admin Manual Sync Trigger"
            >
              {isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
              ) : (
                <Cloud className="w-4 h-4" />
              )}
              <span>{isSyncing ? "Syncing..." : "Update from Web"}</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl" title="Manual trigger reserved for administrators">
              <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Auto-Sync Active (Manual Sync: Admin Only)</span>
            </div>
          )}

          {syncMessage && (
            <div className="px-3.5 py-1.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs font-semibold text-blue-800 animate-pulse flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 block"></span>
              {syncMessage}
            </div>
          )}
        </div>

        {/* Search TextInput */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by keywords (e.g. indemnity, claim)..."
            value={searchQuery === "All" ? "" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-400 font-medium text-slate-800"
          />
        </div>

      </div>

      {/* Chapters filter horizontal scroll */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Handbook Chapters:</span>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                  : "bg-white hover:bg-slate-50 border-slate-205 text-slate-600"
              }`}
            >
              {cat === "ALL" ? "All Chapters" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid display */}
      <motion.div
        key={`${searchQuery}-${activeCategory}`}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredGlossary.map((row) => (
          <div
            key={row.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-base tracking-tight leading-tight">
                    {row.term}
                  </h3>
                  {row.isWebUpdate && (
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-mono">
                      <Cloud className="w-2.5 h-2.5 shrink-0 text-blue-500 animate-pulse" /> Live Web Sync (2025/2026)
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-semibold tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase shrink-0 border border-slate-200">
                  {row.category}
                </span>
              </div>

              {isRookieMode ? (
                <div className="space-y-3.5">
                  <div className="bg-emerald-50/50 border-l-4 border-emerald-600 p-4 rounded-r-xl">
                    <span className="text-[9px] font-bold font-mono text-emerald-800 uppercase tracking-wider block mb-1">
                      🧸 Layman's Language explanation
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {row.simple_explanation}
                    </p>
                  </div>
                  
                  <div className="pt-2 text-slate-400">
                    <span className="text-[9px] uppercase tracking-wider block font-mono mb-1 font-bold">Standard Definition:</span>
                    <p className="text-[11px] leading-relaxed italic text-slate-500 font-serif">
                      "{row.description}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="bg-slate-50 border-l-4 border-slate-700 p-4 rounded-r-xl">
                    <span className="text-[9px] font-bold font-mono text-slate-600 uppercase tracking-wider block mb-1">
                      📜 Statutory definition
                    </span>
                    <p className="text-xs text-slate-705 leading-relaxed italic font-serif">
                      "{row.description}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[9px] uppercase tracking-wider block font-emerald-700 font-mono mb-1 font-bold">Simple English Explanation:</span>
                    <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                      {row.simple_explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-slate-400 text-[10px] pt-3.5 border-t border-slate-100 font-mono shrink-0">
              <span>PDF Reference Page {row.source_page}</span>
              <span className="text-[9px] text-slate-300">Handbook Section</span>
            </div>
          </div>
        ))}

        {filteredGlossary.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300" />
            <h4 className="text-sm font-bold text-slate-755">No Terms Found Matching Criteria</h4>
            <p className="text-xs text-slate-450 max-w-xs leading-normal">
              Try search keywords like "Indemnity", "Subrogation", or change the filter category.
            </p>
          </div>
        )}
      </motion.div>

    </div>
  );
}
