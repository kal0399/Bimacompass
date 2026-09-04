import React, { useState, useMemo } from "react";
import { Search, Filter, ShieldCheck, Check, Info } from "lucide-react";
import { buyerRightsDatabase } from "../data/databaseContents";

export default function BookBuyerRights() {
  const [activeStage, setActiveStage] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Audit state tracking
  const [auditChecks, setAuditChecks] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const handleToggleCheck = (id: number) => {
    setAuditChecks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const passedCount = Object.values(auditChecks).filter(Boolean).length;
  const progressPercent = Math.round((passedCount / buyerRightsDatabase.length) * 100);

  // Filter buyer rights based on search query and active stage filter
  const filteredRights = useMemo(() => {
    return buyerRightsDatabase.filter((item) => {
      const matchStage = activeStage === "ALL" || item.stage === activeStage;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.duty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStage && matchQuery;
    });
  }, [searchQuery, activeStage]);

  return (
    <div className="space-y-6 animate-fadeIn" id="book-buyer-rights-panel">
      
      {/* Title */}
      <div className="space-y-2 border-b border-indigo-55 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono">
            Vigilance Book
          </span>
          <span className="text-slate-400 text-xs font-semibold font-mono">Statutory Protections & Consumer Duties</span>
        </div>
        <h2 className="text-2xl font-bold font-sans text-slate-905 tracking-tight">Smart-Buyer's Bill of Rights & Obligations</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
          Legally protected consumer rights guaranteed, paired chronologically with corresponding buyer due-diligence obligations before, during, and after policy issuance.
        </p>
      </div>

      {/* Due Diligence Audit Progress Panel */}
      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800/65">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-indigo-900/60">
          <div className="space-y-1">
            <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-mono font-bold block">Smart Buyer Workbook</span>
            <h3 className="text-base font-bold font-sans">Consumer Pre-buying Due Diligence Auditor</h3>
            <p className="text-slate-300 text-xs max-w-lg leading-relaxed">
              Verify if your insurance acquisition process complies with the basic safety audits mandated in Section 2, 4, and 5 of the IRDA Handbook.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-indigo-900/40 border border-indigo-800/45 p-3 px-4.5 rounded-2xl shrink-0 self-start md:self-auto">
            <div className="text-right">
              <span className="text-[10px] text-indigo-400 font-mono block">AUDIT PASSED:</span>
              <strong className="text-sm font-mono text-emerald-400 font-extrabold block">{passedCount} of {buyerRightsDatabase.length} Checked</strong>
            </div>
            <div className="w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center font-bold text-xs text-emerald-400 font-mono border-2 border-indigo-500">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Audit mini checklist cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-5">
          {buyerRightsDatabase.map((row) => {
            const checked = auditChecks[row.id] || false;
            return (
              <div
                key={row.id}
                onClick={() => handleToggleCheck(row.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 text-left items-start ${
                  checked
                    ? "bg-indigo-900/40 border-indigo-505 text-white shadow-sm"
                    : "bg-slate-950/20 hover:bg-slate-950/40 border-indigo-950 text-indigo-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {checked ? (
                    <div className="bg-emerald-500 text-slate-955 rounded p-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-4.5 h-4.5 rounded border border-indigo-500/80 shrink-0" />
                  )}
                </div>
                <div className="space-y-0.5 select-none">
                  <span className="font-bold text-xs block leading-snug">{row.title}</span>
                  <p className="text-[10px] text-indigo-300 leading-normal line-clamp-2">
                    {row.duty}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Phase Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 border border-slate-205 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono mr-1">Purchase Phase:</span>
          {["ALL", "Buying Stage", "Post-Purchase", "Claim Time"].map((stg) => (
            <button
              key={stg}
              onClick={() => setActiveStage(stg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                activeStage === stg
                  ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                  : "bg-white text-slate-650 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {stg === "ALL" ? "All Phases" : stg}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search rights & duties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>

      {/* Chronological Statutes displaying protections */}
      <div className="space-y-4">
        {filteredRights.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-400 hover:shadow-xs transition-all flex flex-col md:flex-row"
          >
            {/* Left side timeline tag */}
            <div className="bg-slate-50 border-r border-slate-100 p-5 flex md:flex-col justify-between items-start md:w-44 shrink-0 gap-2">
              <span className="text-[9px] font-mono font-bold bg-indigo-100 text-indigo-850 px-2 py-0.5 rounded uppercase">
                {item.stage}
              </span>
              <span className="text-slate-400 text-xs font-semibold font-mono">
                Statute #{item.id}
              </span>
            </div>

            {/* Right side content split */}
            <div className="p-5 flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Your Statutory Right:</span>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.details}
                </p>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 border border-slate-200/50 rounded-xl">
                <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest block font-mono">🛡️ Corresponding Buyer Duty:</span>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {item.duty}
                </p>
                
                <button
                  onClick={() => handleToggleCheck(item.id)}
                  className={`mt-2 py-1 px-2.5 rounded text-[10px] font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                    auditChecks[item.id]
                      ? "bg-slate-900 text-white border-slate-800"
                      : "bg-white text-indigo-750 border-indigo-200 hover:bg-indigo-50"
                  }`}
                >
                  {auditChecks[item.id] ? "✓ Checked & Complied" : "Mark as Complied"}
                </button>
              </div>

            </div>

          </div>
        ))}

        {filteredRights.length === 0 && (
          <div className="text-center py-10 bg-white border border-slate-205 rounded-2xl flex flex-col items-center justify-center space-y-2">
            <Info className="w-8 h-8 text-slate-350" />
            <h4 className="text-xs font-bold text-slate-700">No Statutory Protections Listed</h4>
            <p className="text-xs text-slate-400">Toggle filters to view smart buyer statutory records.</p>
          </div>
        )}
      </div>

    </div>
  );
}
