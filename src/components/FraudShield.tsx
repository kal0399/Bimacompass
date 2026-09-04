import React, { useState, useEffect, useMemo } from "react";
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Check, Copy } from "lucide-react";
import { fraudsDatabase } from "../data/databaseContents";
import FraudCampaignHeatmap from "./FraudCampaignHeatmap";

export default function FraudShield() {
  const [customFrauds, setCustomFrauds] = useState<any[]>([]);

  // Load custom fraud bulletins from Administrator panel overrides and listen to storage updates
  useEffect(() => {
    const loadFrauds = () => {
      const saved = localStorage.getItem("bima_custom_frauds");
      if (saved) {
        try {
          setCustomFrauds(JSON.parse(saved));
        } catch (err) {
          console.warn("Could not deserialize custom fraud campaigns:", err);
        }
      } else {
        setCustomFrauds([]);
      }
    };

    loadFrauds();

    window.addEventListener("storage", loadFrauds);
    return () => window.removeEventListener("storage", loadFrauds);
  }, []);

  // Combine static and custom report registries
  const fullFrauds = useMemo(() => {
    return [...customFrauds, ...fraudsDatabase];
  }, [customFrauds]);

  // Wizard checklist state to allow a consumer to check unknown callers
  const [checklist, setChecklist] = useState({
    poser: false,
    bonusOffer: false,
    buyToRelease: false,
    sensitiveDocs: false,
    blankForm: false,
    cashDemand: false,
  });

  const [verified, setVerified] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"SAFE" | "WARNING" | "CRITICAL">("SAFE");

  // FIR Draft letter builder state
  const [callerName, setCallerName] = useState("");
  const [callerPhone, setCallerPhone] = useState("");
  const [promisedBait, setPromisedBait] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const checklistItems = [
    {
      id: "poser",
      label: "Does the caller claim to be an IRDA, FEMA, or Grievance Cell commissioner?",
      desc: "Warning: Official regulatory bodies like IRDA do not hire calling agents or call citizens directly to pitch plans."
    },
    {
      id: "bonusOffer",
      label: "Are they promising bonuses, accumulated dividends, or profits on mature old policies?",
      desc: "Warning: High-return gains are fake. These baits are designed to obtain your bank details."
    },
    {
      id: "buyToRelease",
      label: "Do they assert you must purchase a brand-new policy first to trigger payouts?",
      desc: "Warning: This is a classic misrepresentation scheme called policy churning used to pocket commissions."
    },
    {
      id: "sensitiveDocs",
      label: "Are they asking you to courier your original PAN, checkbooks, or sign blank sheets?",
      desc: "Warning: Never send original physical contracts or write blank dates/cheques to an agent."
    },
    {
      id: "blankForm",
      label: "Is an agent pressuring you to leave columns of your proposal blank for 'fast writing'?",
      desc: "Warning: All columns must be filled yourself. Leaving gaps empowers scammers to misrepresent your health."
    },
    {
      id: "cashDemand",
      label: "Are they requesting direct cash payments or cheque written in an agent's individual name?",
      desc: "Warning: Write cheques strictly in the verified corporate name of the registered Insurer, never a person."
    }
  ];

  const handleToggle = (id: string) => {
    setChecklist((prev: any) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAssessRisk = () => {
    const selectedCount = Object.values(checklist).filter(Boolean).length;
    let computedRating: "SAFE" | "WARNING" | "CRITICAL" = "SAFE";

    if (checklist.poser || checklist.bonusOffer || checklist.buyToRelease || checklist.sensitiveDocs) {
      computedRating = "CRITICAL";
    } else if (selectedCount > 0) {
      computedRating = "WARNING";
    }

    setRiskLevel(computedRating);
    setVerified(true);
  };

  const handleReset = () => {
    setChecklist({
      poser: false,
      bonusOffer: false,
      buyToRelease: false,
      sensitiveDocs: false,
      blankForm: false,
      cashDemand: false,
    });
    setVerified(false);
    setRiskLevel("SAFE");
  };

  const generatedComplaintDraft = `To,
The Cyber Crime Investigation Cell / Nodal Officer,
Consumer Protection Division,

Subject: Official Incident Report Regarding Spurious Call Scam & Misleading Sales Solicitation

Respected Sir/Madam,

I am writing to log a formal incident record under consumer helpline criteria regarding a registered spurious calling attempt received today:

INCIDENT DETAILS FOR RECORD:
1. Caller Pretence Identity: ${callerName || "[DECLARE CLAIMS, E.G. FAKE IRDA CELL COMMISSIONER]"}
2. Telephone Number Used: ${callerPhone || "[TELEPHONE NUMBER RECEIVED]"}
3. Bait Offered / Refund Claimed: ${promisedBait || "[DESCRIBE ACCUMULATED CHECK OR BONUS PROMISED]"}
4. Date of Incident: ${new Date().toLocaleDateString()}

BRIEF STATEMENT:
The caller reached out under the pretense of distributing old policy bonuses. They demanded personal financial files and premium payments. Under standard IRDA Handbook guidance, I identified these markers as active deceptive tele-fraud modus operandi and disconnected.

I request your department to record this digital footprint and take appropriate corrective action to protect consumers against these calling rings.

Sincerely,

Complainant Name: [YOUR RETURNING NAME]
Complainant Active Contact: [YOUT REGISTERED MOBILE ID]`;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedComplaintDraft);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2050);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="fraud-shield-panel">
      
      {/* Title */}
      <div className="space-y-2 border-b border-indigo-50 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono">
            Vigilance Book
          </span>
          <span className="text-slate-400 text-xs font-semibold font-mono">Defense Against Spurious Calling Rings</span>
        </div>
        <h2 className="text-2xl font-bold font-sans text-rose-950 tracking-tight">Predatory Call & Scam Protection Guard</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
          Check warning flags encountered over unknown calls, explore reported spurious call campaign directories, and draft cyber-crime grievance files instantly.
        </p>
      </div>

      {/* D3 Hybrid Fraud Telemetry Spectrum Heatmap */}
      <FraudCampaignHeatmap 
        onSelectScamIncident={(scamLabel, details) => {
          setCallerName(scamLabel);
          setPromisedBait(details);
          setVerified(true);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Call Risk Authenticator Tool (Left 7 Columns) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            
            <div className="bg-rose-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white leading-none">Interactive Spurious Call Auditor</h3>
                  <p className="text-rose-200 text-[10px] uppercase font-mono mt-1">Audit calling behaviors in real-time</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs text-slate-550 leading-relaxed font-medium">
                Tick each marker encountered during your call. The system will rate the risk level based directly on reported IRDA advisory warnings.
              </p>

              <div className="space-y-3">
                {checklistItems.map((item) => {
                  const checked = (checklist as any)[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3.5 ${
                        checked
                          ? "bg-rose-50/50 border-rose-300"
                          : "bg-slate-50/50 hover:bg-slate-50 border-slate-205"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}} // Driven by container select click
                        className="w-4.5 h-4.5 mt-0.5 accent-rose-700 pointer-events-none shrink-0"
                      />
                      <div className="space-y-1 select-none">
                        <span className={`text-xs font-bold block ${checked ? "text-rose-900" : "text-slate-800"}`}>
                          {item.label}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                {verified && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded-xl text-xs transition cursor-pointer"
                  >
                    Reset Checklists
                  </button>
                )}
                <button
                  onClick={handleAssessRisk}
                  className="px-5 py-2.5 bg-rose-800 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm transition cursor-pointer"
                >
                  Verify Call Authentication
                </button>
              </div>

              {/* Assessment Report and Letter Block */}
              {verified && (
                <div className="pt-4 border-t border-slate-100 space-y-4 animate-fadeIn">
                  
                  {/* Risks Alert Badge */}
                  <div className="flex gap-4 p-4 rounded-2xl border bg-slate-50">
                    <div className="shrink-0 mt-0.5">
                      <AlertTriangle className={`w-8 h-8 ${riskLevel === "CRITICAL" ? "text-red-600 animate-pulse" : "text-amber-500"}`} />
                    </div>
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded text-white ${riskLevel === "CRITICAL" ? "bg-red-700" : "bg-amber-600"}`}>
                        {riskLevel} Scam Hazard Level
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {riskLevel === "CRITICAL" ? "WARNING: Spurious Fake Call Pattern Identified!" : "Caution: High Risk Sales Strategy Detected"}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1">
                        {riskLevel === "CRITICAL" 
                          ? "This matches recorded tele-fraud campaign modus operandi exactly. Spurious rings pose as grievance cells to prompt new policy purchases. Refuse immediately—IRDA never holds consumer funds or announces lottery bonuses."
                          : "While not matching direct regulator impersonators yet, demanding blank signed files and cash payments is prohibited. Insistently decline. Write premium checks solely inside the registered insurer corporate title."
                        }
                      </p>
                    </div>
                  </div>

                  {/* Complaint Draft Builder */}
                  <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl space-y-4 shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">Incident Draft Companion</span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Cyber Complaint Letter Draft Builder</h4>
                      <p className="text-[11px] text-slate-400">Fill standard logs below to populate your official Police or Cyber complaint draft.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block font-mono">Posed Caller Name / Title:</label>
                        <input
                          type="text"
                          placeholder="e.g. Officer Rakesh from IRDA helpline"
                          value={callerName}
                          onChange={(e) => setCallerName(e.target.value)}
                          className="w-full mt-1 p-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block font-mono">Suspected Phone Number:</label>
                        <input
                          type="text"
                          placeholder="e.g. +91 98XX-XXXXXX"
                          value={callerPhone}
                          onChange={(e) => setCallerPhone(e.target.value)}
                          className="w-full mt-1 p-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 block font-mono">Bait Offered / Claim:</label>
                        <input
                          type="text"
                          placeholder="e.g. Promised ₹50,000 refund on old lapsed policy if I pay ₹5,000 activation fee"
                          value={promisedBait}
                          onChange={(e) => setPromisedBait(e.target.value)}
                          className="w-full mt-1 p-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs pb-1">
                        <span className="text-slate-400 font-mono text-[9px]">Grievance Composing Preview:</span>
                        <button
                          onClick={handleCopyDraft}
                          className="p-1 px-3 bg-rose-700 hover:bg-rose-600 text-white rounded font-bold transition flex items-center gap-1 cursor-pointer text-[10px]"
                        >
                          {isCopied ? "✓ Incident Draft Copied" : "Copy Complete Complaint Draft"}
                        </button>
                      </div>

                      <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg max-h-44 overflow-auto">
                        <pre className="text-[10.5px] leading-relaxed font-mono whitespace-pre-wrap text-left text-teal-400 select-all">
                          {generatedComplaintDraft}
                        </pre>
                      </div>

                      {isCopied && (
                        <p className="text-[11px] text-emerald-400 font-semibold animate-pulse">
                          ✓ Successfully copied template! Paste directly into email drafts to complaints@irda.gov.in or your regional police cyber portal.
                        </p>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* reported Campaign Modus Operandi (Right 5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Scam Campaign Warning Cases (Page 13, 14):</span>
          
          <div className="space-y-3.5">
            {fullFrauds.map((row) => (
              <div
                key={row.id}
                className="bg-white border border-slate-205 rounded-xl p-4.5 space-y-3.5 hover:border-rose-400 hover:shadow-sm transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold font-mono text-slate-400">Bulletin Record #{row.id}</span>
                      {row.isWebUpdate && (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                          🌐 Live Sync
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-bold bg-rose-50 border border-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                      {row.severity} Severity
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{row.pattern}</h4>
                  <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold inline-block">
                    Modus Operandi: {row.caller_claim_type}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-450 block font-bold">Caller warning tags:</span>
                  <ul className="space-y-1 text-[11px] text-slate-600 leading-relaxed font-normal">
                    {row.warning_signs.map((sign, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start">
                        <span className="text-rose-600 shrink-0 font-bold">•</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200/50 p-3.5 rounded-xl space-y-0.5">
                  <span className="text-[9.5px] font-bold text-emerald-800 uppercase tracking-wider block font-mono">✓ Right Buying Defense:</span>
                  <p className="text-[11px] text-slate-700 leading-relaxed font-semibold italic">
                    {row.countermeasure}
                  </p>
                </div>

                {/* Pre-fill draft auto helper */}
                <button
                  onClick={() => {
                    setCallerName(row.caller_claim_type);
                    setCallerPhone("+91 9XXXX-XXXXX");
                    setPromisedBait(row.pattern);
                    setVerified(true);
                    // scroll parent div smoothly
                    const scrollTarget = document.getElementById("fraud-shield-panel");
                    if (scrollTarget) scrollTarget.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-center hover:bg-slate-50 border border-slate-300 py-1.5 rounded-lg text-[10px] font-bold text-slate-700 flex items-center justify-center gap-1 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600" />
                  <span>Use This Campaign in Complaint Generator</span>
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
