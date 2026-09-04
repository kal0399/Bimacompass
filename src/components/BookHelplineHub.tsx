import React, { useState, useMemo } from "react";
import { Search, PhoneCall, Mail, FileText, Check, Copy, Globe } from "lucide-react";
import { complaintsDatabase } from "../data/databaseContents";

export default function BookHelplineHub() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedText, setCopiedText] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);

  // Form states to construct a custom complaint draft letter
  const [insurerName, setInsurerName] = useState("");
  const [policyNum, setPolicyNum] = useState("");
  const [issueType, setIssueType] = useState("Claim Rejection");
  const [disputedSum, setDisputedSum] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [policyholderName, setPolicyholderName] = useState("");
  const [chronology, setChronology] = useState("");
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  const prebuiltSubjects: Record<string, string> = {
    "Claim Rejection": "Formal Escalation: Wrongful Claim Rejection and Request for Re-auditing",
    "Delay in Refund": "Urgent Remonstrance: Regulatory Request Regarding Unreasonable Premium Refund Delays",
    "Agent Mismatch Terms": "Complaint Profile: Misrepresentation of Policy Exclusions during Sales Solicitation"
  };

  const getSubject = () => {
    return prebuiltSubjects[issueType] || "Formal Grievance Complaint Escalation";
  };

  const activeSubject = getSubject();

  const handleCopySubject = () => {
    navigator.clipboard.writeText(activeSubject);
    setSubjectCopied(true);
    setTimeout(() => setSubjectCopied(false), 2000);
  };

  const complaintBodyText = `To,
The Grievance Redressal Officer / Nodal Commissioner,
${insurerName || "[INSURER'S NAME]"} Head Office,

Subject: ${activeSubject}
Policy/proposal reference: ${policyNum || "[ENTER YOUR CONTRACT REFERENCE ID]"}
Complainant Name: ${policyholderName || "[YOUR COMPLAINANT NAME]"}
Disputed Valued Area: ${disputedSum ? "₹" + disputedSum : "[STATE VALUES, E.G. CLAIM AMOUNT IN RUPEES]"}
Date of Original Accident/Purchase: ${incidentDate || "[EVENT TIMELINE DATE]"}

Dear Sir/Madam,

I am writing to formally request a dispute resolution under the IRDAI (Protection of Policyholders' Interests) Regulations, 2002. 

STATEMENT of FACTS:
${chronology || "Provide a brief, factual description of what occurred (e.g. Agent assured heart surgery was covered post standard pre-existing disease waiting, claim was declined without clear written explanations)."}

DEMANDS REQUESTED:
1. Conduct a full auditing of this incident under standard fair-treatment guidelines.
2. Formally declare standard written reasons if the claim remains declined.
3. Provide copy transcripts of the verbal phone solicitation pitch if distance sales was used.

Under standard regulatory guidelines on Customer Protection, insurers are expected to resolve, reply, or compromise this grievance within 15 days of continuous receipt. I have appended my receipts, claim forms, and previous agent chats.

Sincerely,

Complainant Name: ${policyholderName || "[YOUR COMPLAINANT NAME]"}
Contact phone: [YOUR MOBILE PHONE NUMBER]
Complainant Email: [YOUR ESCALATION EMAIL ADDRESS]`;

  const handleCopyBody = () => {
    navigator.clipboard.writeText(complaintBodyText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const filteredChannels = useMemo(() => {
    return complaintsDatabase.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn" id="book-helpline-hub">
      
      {/* Title */}
      <div className="space-y-2 border-b border-amber-50 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono">
            Redressal Hub
          </span>
          <span className="text-slate-400 text-xs font-semibold font-mono font-bold">IRDA Channels for Redressal</span>
        </div>
        <h2 className="text-2xl font-bold font-sans text-slate-905 tracking-tight">Official Insurance Complaint & Escalation Desk</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
          Direct toll-free hotlines, central registrar links, and an Ombudsman directory to resolve claim disputes efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Helplines List (Left 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Grievance Hotlines:</span>
            <div className="relative w-44">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-[11px] bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredChannels.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 hover:border-amber-400 transition-colors shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-950 font-sans leading-snug">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal mt-1">{item.description}</p>
                </div>

                <div className="space-y-1.5 text-[10.5px] font-mono border-t border-slate-100 pt-3 text-slate-600">
                  {item.toll_free !== "N/A" && (
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Phone: <strong className="text-slate-800 font-bold">{item.toll_free}</strong></span>
                    </div>
                  )}
                  {item.email !== "N/A" && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Email: <strong className="text-slate-800 font-bold">{item.email}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">URL: <span className="text-slate-800 font-bold hover:underline">{item.contact_info}</span></span>
                  </div>
                </div>
              </div>
            ))}

            {filteredChannels.length === 0 && (
              <div className="text-center py-6 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-450">No redressal channels match search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Custom Complaint Form Builder (Right 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-210 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-start gap-3 border-b border-slate-105 pb-3">
            <div className="bg-amber-50 text-amber-800 p-2.5 rounded-xl shrink-0">
              <FileText className="w-5 h-5 text-amber-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Escalation Complaint Draft Assistant</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Easily generate a complete, structured dispute letter draft to email your insurer's Grievance cell or submit to the Ombudsman cell.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Insurer Name:</label>
              <input
                type="text"
                placeholder="e.g. Life Shield India Corp"
                value={insurerName}
                onChange={(e) => {
                  setInsurerName(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Your Policy / Claim Number:</label>
              <input
                type="text"
                placeholder="e.g. POL/89721/X"
                value={policyNum}
                onChange={(e) => {
                  setPolicyNum(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Grievance Category:</label>
              <select
                value={issueType}
                onChange={(e) => {
                  setIssueType(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-semibold"
              >
                <option value="Claim Rejection">Claim Rejection (Indemnity standard dispute)</option>
                <option value="Delay in Refund">Unreasonable Payout/Refund delays</option>
                <option value="Agent Mismatch Terms">False Misrepresentation by Agent</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Disputed Sum (₹):</label>
              <input
                type="number"
                placeholder="e.g. 150000"
                value={disputedSum}
                onChange={(e) => {
                  setDisputedSum(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Incident Date:</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => {
                  setIncidentDate(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Your Full Name:</label>
              <input
                type="text"
                placeholder="Enter client name"
                value={policyholderName}
                onChange={(e) => {
                  setPolicyholderName(e.target.value);
                  setShowLetterPreview(true);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 font-mono block">Dispute facts & chronology summary:</label>
            <textarea
              placeholder="Chronological background. For example: On 4th June, checked health card. On 20th Oct, underwent knee surgery. Claim got rejected on ground of false exclusion, but I have renewed continuously for 4 years without break..."
              value={chronology}
              onChange={(e) => {
                setChronology(e.target.value);
                setShowLetterPreview(true);
              }}
              rows={3}
              className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs leading-relaxed"
            />
          </div>

          {!showLetterPreview ? (
            <div className="p-4 bg-slate-50 text-slate-400 text-xs italic text-center rounded-xl border border-slate-105">
              Fill details above to compile and preview your formal escalation draft.
            </div>
          ) : (
            <div className="space-y-3.5 pt-3.5 border-t border-slate-100 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded font-mono">
                  ✓ Grievance letter compiled
                </span>
                
                <div className="flex gap-2 text-[10px]">
                  <button
                    onClick={handleCopySubject}
                    className="py-1 px-3 bg-slate-900 font-bold hover:bg-slate-800 rounded-md text-white transition flex items-center gap-1 cursor-pointer text-[10px]"
                  >
                    {subjectCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{subjectCopied ? "Subject Copied!" : "Copy Subject"}</span>
                  </button>
                  <button
                    onClick={handleCopyBody}
                    className="py-1 px-3 bg-emerald-600 font-bold hover:bg-emerald-500 rounded-md text-white transition flex items-center gap-1 cursor-pointer text-[10px]"
                  >
                    {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText ? "Full Body Copied!" : "Copy Full Body"}</span>
                  </button>
                </div>
              </div>

              {/* Subject box */}
              <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-lg text-xs leading-snug font-semibold text-slate-800 flex gap-2">
                <span className="text-[9px] font-mono text-amber-900 uppercase">SUBJECT:</span>
                <span>{activeSubject}</span>
              </div>

              {/* Letter preformatted block */}
              <div className="bg-slate-950 text-slate-350 p-4 border border-slate-900 rounded-xl overflow-auto select-all max-h-56">
                <pre className="text-[10.5px] leading-relaxed font-mono whitespace-pre-wrap text-left">
                  {complaintBodyText}
                </pre>
              </div>

              {copiedText && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 font-semibold rounded-lg text-xs">
                  ✓ Draft Body Copied successfully! You can paste this straight into your email. Use the contacts cell directory in the left pane (such as <code className="bg-slate-100 px-1 rounded text-red-800">complaints@irda.gov.in</code>) to escalate.
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
