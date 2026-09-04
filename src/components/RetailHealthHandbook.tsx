import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  ShieldAlert, 
  Info, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Layers, 
  Scale, 
  Clock, 
  UserPlus
} from "lucide-react";

export default function RetailHealthHandbook() {
  // Simulator State
  const [coverType, setCoverType] = useState<"individual" | "floater">("individual");
  const [sumInsured, setSumInsured] = useState<number>(500000);
  const [ageGroup, setAgeGroup] = useState<"young" | "mid" | "older" | "senior">("mid");
  const [desiredRoom, setDesiredRoom] = useState<"general" | "private" | "suite">("private");

  // Why Retail Health State
  const [activeReason, setActiveReason] = useState<string>("inflation");

  // PED Guide State
  const [pedTab, setPedTab] = useState<"definition" | "linkage" | "moratorium" | "best_practice">("definition");

  // Accordion FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Claim Checklist State
  const [claimedRecords, setClaimedRecords] = useState({
    claimForm: false,
    dischargeSummary: false,
    originalBills: false,
    pharmacyBills: false,
    investigationReports: false,
    canceledCheque: false,
    fitCertificate: false,
  });

  const toggleClaimedRecord = (id: keyof typeof claimedRecords) => {
    setClaimedRecords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Diagnostic calculations for standard Indian retail health patterns
  const roomRentCapping = sumInsured < 500000 ? Math.floor(sumInsured * 0.01) : "No Capping (Standard Standard AC Room allowed)";
  const icuCapping = sumInsured < 500000 ? Math.floor(sumInsured * 0.02) : "No Capping (Actual ICU charges covered)";

  // Room expense simulation and potential warnings
  let roomWarning = "";
  let proportionatePenaltyMultiplier = 0; // percentage deduction if exceeding cap
  if (sumInsured < 500000) {
    const dailyCap = sumInsured * 0.01;
    if (desiredRoom === "private") {
      roomWarning = `⚠️ Room Rent capping on your ₹${(sumInsured/100000).toFixed(1)}L policy is ₹${dailyCap}/day. A Standard Private AC Room typically costs ₹4,500 - ₹6,000/day. Exceeding this limit will trigger a severe Proportionate Deduction Penalty!`;
      proportionatePenaltyMultiplier = Math.round((1 - (dailyCap / 5000)) * 100);
    } else if (desiredRoom === "suite") {
      roomWarning = `🚨 Room Rent capping is ₹${dailyCap}/day, but a Suite/Deluxe Room typically costs ₹9,000+/day. An extreme Proportionate Deduction Penalty will be levied across your entire claim, excluding medicines!`;
      proportionatePenaltyMultiplier = Math.round((1 - (dailyCap / 9000)) * 100);
    }
  } else {
    if (desiredRoom === "suite") {
      roomWarning = `⚠️ Even though there is no 1% capping, many general insurers' downloads limit 'No Capping' strictly to a Single Standard Private AC Room. Upgrading to a Suite or Deluxe room can still trigger arbitrary proportional deductions from doctor fees, unless a 'Suite Upgrade' rider is active.`;
      proportionatePenaltyMultiplier = 35; // standard average deduction for luxury rooms in higher bands
    }
  }

  // Pre-Existing Disease (PED) Waiting periods
  let pedWaiting = "36 Months (3 Years)";
  let copayTerm = "0% (Nil Co-payment)";
  if (ageGroup === "young") {
    pedWaiting = "36 Months (3 Years)";
    copayTerm = "0% (Nil Co-payment)";
  } else if (ageGroup === "mid") {
    pedWaiting = "36 Months (3 Years)";
    copayTerm = "0% (Nil Co-payment)";
  } else if (ageGroup === "older") {
    pedWaiting = "48 Months (4 Years)";
    copayTerm = "0% - 10% Zone-based Co-payment may apply";
  } else if (ageGroup === "senior") {
    pedWaiting = "48 Months (4 Years)";
    copayTerm = "20% Compulsory Co-payment (unless waiver rider is purchased)";
  }

  // No claim bonus schedule
  const yearlyNcb = sumInsured * 0.20; // Avg 20% per year standard NCB

  const exclusionsList = [
    { name: "Cosmetic & Aesthetic Surgery", type: "Standard Exclusion", details: "Plastic surgeries, hair transplants, or Botox unless required due to major accidental trauma reconstruction." },
    { name: "Weight Loss Procedures", type: "Conditional Exclusion", details: "Bariatric surgery is excluded unless it satisfies strict medical criteria (BMI > 40 and physician-certified critical health hazard)." },
    { name: "Maternity & Newborn Expenses", type: "Standard Exclusion", details: "Excluded in base retail health policies unless specifically opted via custom premium Add-ons (usually carries a 2-4 year waiting timeline)." },
    { name: "Dental, Eye Care & Outpatient", type: "Standard Exclusion", details: "OPD consultations, spectacles, and dental fillings are excluded unless requiring actual 24-hr in-patient hospitalization due to injury." },
    { name: "Self-Inflicted Injury", type: "Strict Exclusion", details: "Treatment for suicide attempts, self-inflicted wounds, or injuries sustained under the active influence of alcohol or narcotic substances." }
  ];

  const faqs = [
    {
      q: "What is the 'Proportionate Deduction' clause and why is it highly dangerous?",
      a: "If your policy caps room rent at 1% of the SUM Insured (e.g., ₹3,000 for a ₹3 Lakh policy) and you stay in a room costing ₹6,000, the TPA does not just deduct the room rent difference. Under standard general insurers' terms, the insurer will reduce your entire hospitalization bill (including surgeon fees, anesthetist fees, operation theater charges, and nursing fees) by 50%! Medicines and implant devices are the only components spared from this proportionate slash."
    },
    {
      q: "What are the three different waiting periods inside a retail health contract?",
      a: "1. Initial Waiting Period (30 Days): Zero claims allowed for any sickness, except for hospitalization arising directly from a sudden physical road accident.\n2. Specific Diseases waiting (24 Months): Surgery for Cataract, Hernia, Hysterectomy, Joint Replacements, Piles, and Sinusitis are completely excluded for the first 2 years, regardless of when they developed.\n3. Pre-existing Diseases (PED) waiting (36 to 48 Months): Sicknesses diagnosed or treated within 4 years before buying the policy are covered only after continuous renewal for 3 or 4 years."
    },
    {
      q: "How does the No-Claim Bonus (NCB) work over consecutive claim-free renewals?",
      a: "For every claimed-free year, the insurer increases your basic Sum Insured (typically by 20% to 50% depending on the product) up to a maximum multiplier cap of 100% or 150%, without charging any increased premium. However, if a claim is lodged in any year, the accumulated bonus is reduced at the same rate it was earned during the subsequent renewal."
    },
    {
      q: "What are the rules regarding Sum Insured Restoration / Automatic Recharge?",
      a: "If your base Sum Insured gets completely exhausted due to a major hospitalization, the policy instantly restores 100% of the limit for subsequent hospitalizations in the same policy year. Note that standard basic plans only restore the limit for a different illness, while premium plans allow restoration for the same illness as well."
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn" id="retail-health-panel">
      
      {/* Title Block */}
      <div className="space-y-2 border-b border-indigo-50 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-wider rounded-md font-mono animate-pulse">
            Retail Education
          </span>
          <span className="text-slate-400 text-xs font-semibold font-mono">Personal & Family Healthcare Safeguards</span>
        </div>
        <h2 className="text-2xl font-bold font-sans text-emerald-950 tracking-tight">Retail Health Insurance Advisor</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
          Empower yourself with precise regulatory rules governing Pre-Existing Sickness, Room Rent caps, severe Proportional penalty clauses, and cumulative No-Claim Bonus (NCB) schedules published in public interest.
        </p>
      </div>

      {/* Interactive Core Need Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4" id="retail-why-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Do I Really Need Personal Retail Health Cover?
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Click on the interactive pillars below to explore why corporate (GHI) cover alone is never enough.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5 self-start md:self-auto">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">Why Standard Retail?</span>
          </div>
        </div>

        {/* Interactive Tab Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              id: "inflation",
              label: "Medical Inflation",
              sub: "Rising healthcare costs",
              color: "border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-950",
              activeColor: "bg-rose-900 border-rose-900 text-white shadow-md shadow-rose-900/10",
              miniIcon: "💸"
            },
            {
              id: "independence",
              label: "Corporate Independence",
              sub: "Gaps in company GHI",
              color: "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-950",
              activeColor: "bg-indigo-900 border-indigo-950 text-white shadow-md shadow-indigo-900/10",
              miniIcon: "💼"
            },
            {
              id: "ncb",
              label: "Cumulative NCB Boost",
              sub: "Earn coverage bonuses",
              color: "border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-955",
              activeColor: "bg-amber-900 border-amber-900 text-white shadow-md shadow-amber-900/10",
              miniIcon: "📈"
            },
            {
              id: "tax",
              label: "Tax & Wealth Shield",
              sub: "Section 80D tax savings",
              color: "border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-teal-950",
              activeColor: "bg-teal-900 border-teal-900 text-white shadow-md shadow-teal-900/10",
              miniIcon: "🛡️"
            }
          ].map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveReason(pillar.id)}
              className={`text-left p-3.5 border rounded-2xl transition cursor-pointer flex flex-col justify-between h-24 ${
                activeReason === pillar.id 
                  ? pillar.activeColor 
                  : `${pillar.color} border-slate-200`
              }`}
            >
              <span className="text-lg select-none">{pillar.miniIcon}</span>
              <div>
                <p className="font-extrabold text-[12px] leading-tight tracking-tight">{pillar.label}</p>
                <p className={`text-[10px] mt-0.5 font-medium ${activeReason === pillar.id ? "text-white/80" : "text-slate-500"}`}>{pillar.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Interactive Reason Display (With Motion animation) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-5 items-stretch min-h-[140px]">
          {activeReason === "inflation" && (
            <>
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex flex-col justify-center items-center text-center shrink-0 w-full md:w-44 text-rose-955">
                <span className="text-3xl mb-1">💸</span>
                <span className="font-extrabold text-[24px] font-sans">14% p.a.</span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-rose-700 font-bold">Medical Inflation</span>
              </div>
              <div className="flex-1 space-y-3 flex flex-col justify-center">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span className="text-xl">🏥</span> The Reality of Skyrocketing Hospital Costs
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  Unlike ordinary consumer inflation (which hovers around 5-6%), <strong>Indian healthcare costs hike by 14% every single year</strong>. An unexpected major treatment (e.g., intensive cardiac surgery, oncology care, or long-term organ support) can demand ₹8 Lakhs to ₹15 Lakhs instantly. 
                </p>
                <p className="text-slate-500 text-[11px] leading-normal italic bg-slate-50 border-l-2 border-rose-400 p-2 rounded-r-lg">
                  💡 <strong>Critical Takeaway:</strong> A personal retail health cover secures your hard-earned family savings, guaranteeing that a medical crisis doesn't spiral into physical bankruptcy or debt traps.
                </p>
              </div>
            </>
          )}

          {activeReason === "independence" && (
            <>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-col justify-center items-center text-center shrink-0 w-full md:w-44 text-indigo-950">
                <span className="text-3xl mb-1">🚨</span>
                <span className="font-extrabold text-[24px] font-sans">0 Days</span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-indigo-700">GHI Grace Period</span>
              </div>
              <div className="flex-1 space-y-3 flex flex-col justify-center">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span className="text-xl">💼</span> Why Employer Insurance (GHI) is a Sinking Ship
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  Corporate group covers have <strong>complete dependencies on active employment</strong>. If you decide to transition careers, get laid off, take a sabbatical, or retire, your cover vanishes instantly. Attempting to buy a new policy as you get older can lead to massive premium spikes or total rejection due to newly developed age-related conditions.
                </p>
                <p className="text-slate-500 text-[11px] leading-normal italic bg-slate-50 border-l-2 border-indigo-400 p-2 rounded-r-lg">
                  💡 <strong>Critical Takeaway:</strong> Maintaining a continuous personal retail health cover shields your family with lifetime renewal protection that remains untouched by employment fluctuations.
                </p>
              </div>
            </>
          )}

          {activeReason === "ncb" && (
            <>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col justify-center items-center text-center shrink-0 w-full md:w-44 text-amber-955">
                <span className="text-3xl mb-1">⭐</span>
                <span className="font-extrabold text-[24px] font-sans">+100%</span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-amber-700">SI Multiplier</span>
              </div>
              <div className="flex-1 space-y-3 flex flex-col justify-center">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span className="text-xl">📈</span> Stacking No-Claim Bonus (NCB) Multipliers
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  Buying personal cover at a younger, healthier age is standard financial wisdom. For every year you don't file a claim, insurers award a free coverage boost (usually 20% to 50% extra limit) up to a <strong>maximum of 100% or 150% cumulative rise</strong>—all without charging any added premium!
                </p>
                <p className="text-slate-500 text-[11px] leading-normal italic bg-slate-50 border-l-2 border-amber-400 p-2 rounded-r-lg">
                  💡 <strong>Critical Takeaway:</strong> Starting early guarantees that by the time you require critical illness assistance in older age bands, your basic coverage is effectively doubled for free.
                </p>
              </div>
            </>
          )}

          {activeReason === "tax" && (
            <>
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex flex-col justify-center items-center text-center shrink-0 w-full md:w-44 text-teal-950">
                <span className="text-3xl mb-1">🛡️</span>
                <span className="font-extrabold text-[24px] font-sans">₹75,000</span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-teal-700">Max Deductions</span>
              </div>
              <div className="flex-1 space-y-3 flex flex-col justify-center">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span className="text-xl">📜</span> Double Shield: Instant Tax Relief & Asset Protection
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  Premium outlays paid on retail health covers offer immediate standard deductions under <strong>Section 80D of the Indian Income Tax Act</strong>. You can register deductions up to ₹25,000 for your own family, plus an additional ₹50,000 if premium contributions go towards senior citizen parents.
                </p>
                <p className="text-slate-500 text-[11px] leading-normal italic bg-slate-50 border-l-2 border-teal-400 p-2 rounded-r-lg">
                  💡 <strong>Critical Takeaway:</strong> It acts as a double safeguard—preserving family assets from medical liquidations while offering concrete, tax-saving investment refunds.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pre-Existing Diseases (PED) & Claim Security Master Checklist */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4" id="ped-claims-guide">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-850 text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded tracking-wider">
                Risk Management
              </span>
              <h3 className="text-sm font-bold text-slate-1000 font-sans tracking-tight flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                The Claims Gateway: Pre-Existing Diseases (PED) & Claim Clearances
              </h3>
            </div>
            <p className="text-slate-500 text-xs font-medium">
              Over 70% of private health insurance claim disputes center on PED. Master these regulatory thresholds to secure full claim settlement.
            </p>
          </div>
          <div className="text-[10px] bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto block">
            IRDAI Safeguard Guidelines
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Interactive Pillars */}
          <div className="md:col-span-4 space-y-2">
            {[
              {
                id: "definition",
                title: "1. What Counts as PED?",
                desc: "The 48-month statutory timeline",
                icon: <Clock className="w-4 h-4" />
              },
              {
                id: "linkage",
                title: "2. The Linkage Penalty Trap",
                desc: "How TPAs trace complications",
                icon: <AlertTriangle className="w-4 h-4 text-rose-500" />
              },
              {
                id: "moratorium",
                title: "3. IRDAI 8-Year Moratorium",
                desc: "The continuous renewal safety shield",
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              },
              {
                id: "best_practice",
                title: "4. Disclose or Decline Strategy",
                desc: "Strict proposal form best practices",
                icon: <UserPlus className="w-4 h-4" />
              }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPedTab(item.id as any)}
                type="button"
                className={`w-full text-left p-3 rounded-xl border transition duration-155 cursor-pointer flex items-center gap-3 ${
                  pedTab === item.id
                    ? "bg-amber-50/75 border-amber-300 shadow-3xs"
                    : "bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  pedTab === item.id ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <p className={`font-bold text-[11.5px] tracking-tight leading-tight ${pedTab === item.id ? "text-amber-955" : "text-slate-800"}`}>
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Displays */}
          <div className="md:col-span-8 bg-slate-50/55 border border-slate-200/70 rounded-2xl p-5.5 flex flex-col justify-between text-xs font-sans min-h-[220px]">
            {pedTab === "definition" && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-lg">🔎</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-950">Statutory Definition of PED</h4>
                    <p className="text-[10px] text-slate-400 font-bold font-mono">IRDAI CLASSIFICATION STANDARD</p>
                  </div>
                </div>
                <div className="space-y-2 text-slate-600 leading-relaxed font-sans text-xs">
                  <p>
                    As per the insurance regulator IRDAI, a <strong>Pre-Existing Disease (PED)</strong> is defined as any physical condition, illness, injury, or clinical symptom that:
                  </p>
                  <ul className="list-disc pl-4.5 space-y-1 text-[11px]">
                    <li>Was discovered, diagnosed, or treated by a registered medical practitioner within <strong>48 months (4 years)</strong> immediately prior to purchasing the initial policy.</li>
                    <li>Possesses clinical findings or symptoms for which medical advice or surgical treatment was sought or received.</li>
                  </ul>
                  <p className="text-[10.5px] text-slate-500 bg-amber-50/30 border-l-[3px] border-amber-400 p-2.5 rounded-r">
                    ⚠️ <strong>Note:</strong> Routine temporary illnesses like typhoid, simple successfully resolved appendectomy, or seasonal flu treated and resolved years ago do <strong>not</strong> classify as PED waiting blocks.
                  </p>
                </div>
              </div>
            )}

            {pedTab === "linkage" && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
                  <span className="text-lg">🕸️</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-rose-955">The Linkage Penalty Trap (Secondary Complications)</h4>
                    <p className="text-[10px] text-rose-700 font-bold font-mono">HOW TPAS DECLINE ASSOCIATED CLAIMS</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-slate-600 leading-relaxed font-sans text-xs">
                  <p>
                    This is the most critical and dangerous consequence of non-disclosure. If you fail to disclose a basic illness like <strong>Hypertension</strong> or <strong>Type-2 Diabetes</strong> when signing up, subsequent claims for critical complications will be rejected completely:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10.5px] font-mono mt-1">
                    <div className="p-2 border border-rose-200/60 bg-rose-50/30 rounded-xl space-y-0.5">
                      <p className="text-rose-900 font-extrabold">Undeclared PED:</p>
                      <p className="text-slate-700 font-bold">Diabetes Mellitus</p>
                      <p className="text-rose-700 font-bold mt-1">↳ Resulting TPA Claim Rejections:</p>
                      <p className="text-slate-500">Heart Bypass, Kidney Failure, Eye Retinopathy, Stroke</p>
                    </div>
                    <div className="p-2 border border-rose-200/60 bg-rose-50/30 rounded-xl space-y-0.5">
                      <p className="text-rose-900 font-extrabold">Undeclared PED:</p>
                      <p className="text-slate-700 font-bold">Hypertension (High BP)</p>
                      <p className="text-rose-700 font-bold mt-1">↳ Resulting TPA Claim Rejections:</p>
                      <p className="text-slate-500">Angioplasty, Myocardial Infarction, Brain Hemorrhage</p>
                    </div>
                  </div>
                  <p className="text-[10.5px] leading-relaxed text-slate-500 bg-slate-100 p-2.5 rounded-lg">
                    🧠 <strong>Expert Warning:</strong> Third-Party Auditors (TPAs) match your diagnostic history of prescription medications and healthcare charts. If they verify chronicity exceeding the initial policy date, the entire hospitalization claim is declared null and void!
                  </p>
                </div>
              </div>
            )}

            {pedTab === "moratorium" && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-emerald-950">The 8-Year Moratorium Statute</h4>
                    <p className="text-[10px] text-emerald-700 font-bold font-mono">CONCRETE IRDAI REGULATION PROTECTION</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 leading-relaxed font-sans text-xs">
                  <p>
                    To prevent arbitrary rejections of aged policies, IRDAI introduced the **Moratorium Period of 8 Years**:
                  </p>
                  <div className="bg-emerald-50/40 border border-emerald-100 p-3 rounded-xl text-slate-700 leading-normal">
                    <span className="font-bold text-emerald-950 block mb-0.5">📜 Paragraph 8 Protection Rule:</span>
                    "After completion of 8 continuous, claim-free, or claimed renewals with the same insurer, no claim can be rejected on ground of non-disclosure, misstatement, or pre-existing diseases, except in cases of proven absolute fraud or pre-declared permanent exclusions."
                  </div>
                  <p className="text-[10.5px] leading-relaxed text-slate-500">
                    💡 This means after 8 consecutive policy years, your claims are legally protected and cannot be questioned by TPA underwriters on historical medical accounts.
                  </p>
                </div>
              </div>
            )}

            {pedTab === "best_practice" && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-indigo-950">Disclose vs. Decline: Onboarding Best Practice</h4>
                    <p className="text-[10px] text-indigo-700 font-bold font-mono">PREVENTING SYSTEM REJECTIONS</p>
                  </div>
                </div>
                <div className="space-y-2 text-slate-600 leading-relaxed font-sans text-xs font-medium">
                  <p>
                    Follow these four strict rules to make your next claim 100% bulletproof:
                  </p>
                  <ol className="list-decimal pl-4.5 space-y-1.5 text-[11px] text-slate-700 leading-normal">
                    <li><strong className="text-slate-900">Declare active medications:</strong> Even minor daily dosages of Thyroid pills (Levothyroxine) or cholesterol levels must be recorded in writing.</li>
                    <li><strong className="text-slate-900">Never allow agents to hide history:</strong> Agents often check 'No' on chronic illnesses to speed up quick digital sales. Insist on reading the proposal form beforehand.</li>
                    <li><strong className="text-slate-900">Submit historical papers:</strong> Attach past discharge summaries if applying after a major past surgical event to establish clean risk boundaries.</li>
                    <li><strong className="text-slate-900">Opt for 'PED Waiting Reduction' Riders:</strong> If you have preexisting conditions, pay 10-15% extra premium to reduce the wait period from 3-4 years down to 1-2 years.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Simulator Widget on Left (7 cols), Core Rules on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Simulator Tool (Col span 7) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm" id="health-calculator-widget">
            
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-emerald-300 fill-emerald-300" />
                <div>
                  <h3 className="font-bold text-sm">Regulatory Room Rent & Waiting Period Simulator</h3>
                  <p className="text-[10px] text-emerald-100 font-medium">Verify standard waiting locks, co-pays, and hidden proportionate deduction caps</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-800/80 px-2 py-1 rounded text-emerald-100 font-bold border border-emerald-700/50">
                Quarterly Audited
              </span>
            </div>

            <div className="p-5.5 space-y-4 text-xs">
              
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Cover & Value */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">1. Type of Cover</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCoverType("individual")}
                        className={`py-2 px-3 border rounded-xl font-bold text-center transition cursor-pointer ${
                          coverType === "individual"
                            ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Individual Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoverType("floater")}
                        className={`py-2 px-3 border rounded-xl font-bold text-center transition cursor-pointer ${
                          coverType === "floater"
                            ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Family Floater
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">2. Sum Insured Choice</label>
                    <select
                      value={sumInsured}
                      onChange={(e) => setSumInsured(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 outline-none focus:border-emerald-400"
                    >
                      <option value={300000}>₹3 Lakhs (Tier 2/3 Cap Index)</option>
                      <option value={500000}>₹5 Lakhs (Standard Recommended)</option>
                      <option value={1000000}>₹10 Lakhs (Enhanced Safety)</option>
                      <option value={2000000}>₹20 Lakhs (Premium Core Portfolio)</option>
                      <option value={5000000}>₹50 Lakhs (High-Net-Worth Zone)</option>
                    </select>
                  </div>
                </div>

                {/* Age & Room Standard */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">3. Senior-most Member Age</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "young", l: "18-35 yrs" },
                        { id: "mid", l: "36-50 yrs" },
                        { id: "older", l: "51-60 yrs" },
                        { id: "senior", l: "60+ (Senior)" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAgeGroup(item.id as any)}
                          className={`py-2 px-2.5 border rounded-xl font-bold text-center text-[11px] transition cursor-pointer ${
                            ageGroup === item.id
                              ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {item.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">4. Desired Hospital Room</label>
                    <select
                      value={desiredRoom}
                      onChange={(e) => setDesiredRoom(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 outline-none focus:border-emerald-400"
                    >
                      <option value="general">General / Shared Multi-bed Ward (Under ₹3K/day)</option>
                      <option value="private">Standard Single Private AC Room (Avg ₹5K-6K/day)</option>
                      <option value="suite">Luxury Suite / Deluxe AC Room (Avg ₹9K-12K/day)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Dynamic Outputs Pane */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 mt-2 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block border-b border-slate-200 pb-1.5 mb-2.5">
                  Simulated Statutory Outcomes & Policy Caps:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight font-mono">Pre-Existing Sickness Wait:</p>
                        <p className="text-slate-800 font-extrabold text-sm mt-0.5">{pedWaiting}</p>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">Continuous renewals required before prior diseases get covered under standard terms.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Scale className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight font-mono">Compulsory Co-payment Rule:</p>
                        <p className="text-slate-800 font-extrabold text-sm mt-0.5">{copayTerm}</p>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">The fixed percentage of any claim you must pay out of pocket before the insurer steps in.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div className="flex items-start gap-2.5">
                      <Layers className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight font-mono">Room Rent Daily Limit cap:</p>
                        <p className="text-slate-800 font-extrabold text-sm mt-0.5">
                          {typeof roomRentCapping === "number" ? `₹${roomRentCapping.toLocaleString()}/day` : roomRentCapping}
                        </p>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">Maximum daily allowance for standard hospital room boarding charges under basic wording limits.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Activity className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight font-mono">Cumulative No-Claim Bonus (NCB):</p>
                        <p className="text-emerald-800 font-extrabold text-sm mt-0.5">+{yearlyNcb.toLocaleString()} Sum Insured / year</p>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">Estimated 20% bonus increase awarded for each claim-free cycle, scaling up to +100% total limit boost.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proportionate Deduction Notification Section */}
                {roomWarning && (
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 mt-1.5 transition duration-300 ${
                    proportionatePenaltyMultiplier > 0 
                      ? "bg-rose-50/70 border-rose-200 text-rose-950" 
                      : "bg-amber-50/70 border-amber-200 text-amber-950"
                  }`}>
                    {proportionatePenaltyMultiplier > 0 ? (
                      <ShieldAlert className="w-5.5 h-5.5 text-rose-600 shrink-0" />
                    ) : (
                      <Info className="w-5.5 h-5.5 text-amber-600 shrink-0" />
                    )}
                    <div className="space-y-1">
                      <p className="font-extrabold text-[11px] uppercase tracking-wider font-mono">
                        {proportionatePenaltyMultiplier > 0 ? "🚨 Extreme Proportionate Deduction Penalty Active!" : "⚠️ Potential Room Rent Exceedance Alert!"}
                      </p>
                      <p className="text-[10.5px] leading-relaxed font-semibold">
                        {roomWarning}
                      </p>
                      {proportionatePenaltyMultiplier > 0 && (
                        <p className="text-[10px] font-bold text-rose-800 bg-white/60 inline-block px-2 py-0.5 rounded-md mt-1">
                          Estimated Penalty: Standard TPA audit will reject approximately {proportionatePenaltyMultiplier}% of all associate surgery & doctor bills.
                        </p>
                      )}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Educational Warning Card */}
              <div className="bg-slate-100 hover:bg-slate-200/50 rounded-xl px-4 py-3 text-[11px] leading-relaxed text-slate-500 flex items-start gap-2.5 transition">
                <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <p className="font-medium">
                  <strong>Regulatory Advisory:</strong> Standard general insurers' downloads mandate that you fill the medical proposal yourself. Never allow an intermediary to mark 'No' in pre-existing files regarding diabetes, smoking, hyper-thyroid, or high blood pressure to prevent subsequent terminal claim rejections.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Exclusions and Highlights (Col span 5) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Waiting Period Breakdown Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5 font-sans border-b border-slate-100 pb-2 text-xs">
              <Clock className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
              Standard Waiting Timelines Schedule
            </span>
            
            <div className="space-y-3.5 text-xs">
              <div className="space-y-1 bg-slate-50 border border-slate-205/60 p-2.5 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-800 text-[10.5px]">
                  <span>1. INITIAL 30-DAY WATERMARK</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">Standard</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  Applies to all sicknesses. Hospitalization in the first 30 days is paid <strong>only and strictly</strong> if resulting from a massive direct physical road accident.
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 border border-slate-205/60 p-2.5 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-800 text-[10.5px]">
                  <span>2. TWO-YEAR SURGERY EXCLUSIONS</span>
                  <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">24 Months</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  Common non-emergency treatments (Cataract, Hernia, Joint replacement, Sinus surgery, Gallbladder stones) carry a mandatory 24-month delay.
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 border border-slate-205/60 p-2.5 rounded-xl">
                <div className="flex items-center justify-between font-bold text-slate-800 text-[10.5px]">
                  <span>3. PRE-EXISTING DISEASE LOCKS</span>
                  <span className="text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">36 - 48 Months</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  Any illness known, treated, or advised in the 4 years before buying requires continuous renewal for 3-4 cycles before claim payout clearances.
                </p>
              </div>
            </div>
          </div>

          {/* Standard Exclusions list */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5 font-sans border-b border-slate-100 pb-2 text-xs">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-700 shrink-0" />
              Standard Policy Exclusions List
            </span>
            
            <div className="space-y-2.5 max-h-[175px] overflow-y-auto pr-1">
              {exclusionsList.map((item, idx) => (
                <div key={idx} className="text-left space-y-0.5 border-b border-slate-100 pb-2 last:border-b-0">
                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-800">
                    <span>• {item.name}</span>
                    <span className="text-[8.5px] font-semibold text-rose-700 uppercase font-mono tracking-tight">{item.type}</span>
                  </div>
                  <p className="text-[9.5px] text-slate-500 leading-relaxed font-normal">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Claims Documentation Assistant Widget */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 flex items-center gap-2 font-sans text-xs">
              <FileText className="w-5 h-5 text-emerald-800 shrink-0" />
              TPA Claim Submission Auditor
            </span>
            <p className="text-[10.5px] text-slate-500 font-medium">
              Check off original medical files as you compile them for safe reimbursement clearances.
            </p>
          </div>
          <span className="text-[9px] font-bold font-mono bg-indigo-50 border border-indigo-150 rounded px-2 py-0.5 uppercase text-indigo-700 self-start md:self-auto block">
            Reimbursement Checklist
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {[
              { id: "claimForm", label: "Duly signed Claim Form A (Policyholder) and Form B (Hospital)", desc: "Must be signed by the attending medical officer and carry the hospital's active seal." },
              { id: "dischargeSummary", label: "Original Detailed Discharge Summary", desc: "Outlining exact treatment date, vital medical diagnostic notes, and hourly treatment schedules." },
              { id: "originalBills", label: "Original Hospital Bills, Day-care splits, and receipts", desc: "Must list precise voucher index numbers and clear payment receipt acknowledgement seals." }
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => toggleClaimedRecord(item.id as any)}
                className={`p-3 border rounded-xl flex gap-3 cursor-pointer transition duration-150 select-none ${
                  claimedRecords[item.id as keyof typeof claimedRecords]
                    ? "bg-emerald-50/60 border-emerald-350"
                    : "bg-slate-50/50 border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  claimedRecords[item.id as keyof typeof claimedRecords]
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300"
                }`}>
                  {claimedRecords[item.id as keyof typeof claimedRecords] && <CheckCircle2 className="w-4.5 h-4.5" />}
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800 leading-snug text-[10.5px]">{item.label}</p>
                  <p className="text-[9.5px] text-slate-500 leading-normal font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[
              { id: "pharmacyBills", label: "Original Pharmacy bills accompanied by Doctor Prescriptions", desc: "Standard TPAs refuse to refund cash-register pharmacy chits without signed Doctor prescription matches." },
              { id: "investigationReports", label: "All Diagnostic investigation reports & radiology films", desc: "Includes actual MRI films, blood check panels, ECGS/echocardiograms, or clinical biopsy sheets." },
              { id: "canceledCheque", label: "Canceled Cheque of the primary policyholder", desc: "Cheque must have the primary policyholder's name printed on it for NEFT refund clearances." }
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => toggleClaimedRecord(item.id as any)}
                className={`p-3 border rounded-xl flex gap-3 cursor-pointer transition duration-150 select-none ${
                  claimedRecords[item.id as keyof typeof claimedRecords]
                    ? "bg-emerald-50/60 border-emerald-350"
                    : "bg-slate-50/50 border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  claimedRecords[item.id as keyof typeof claimedRecords]
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300"
                }`}>
                  {claimedRecords[item.id as keyof typeof claimedRecords] && <CheckCircle2 className="w-4.5 h-4.5" />}
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800 leading-snug text-[10.5px]">{item.label}</p>
                  <p className="text-[9.5px] text-slate-500 leading-normal font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion FAQ block */}
      <div className="space-y-3.5">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 text-xs flex items-center gap-1.5">
          <Info className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
          General Consumer Knowledge: Retail Health FAQ
        </h3>

        <div className="space-y-2 max-w-3xl">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-3xs">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 pb-3.5 select-none font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50/60 cursor-pointer transition"
              >
                <span className="font-sans text-[11px] font-bold leading-snug flex items-center gap-2">
                  <span className="text-emerald-700 font-extrabold select-none">Q{(idx+1)}:</span>
                  {faq.q}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-slate-50/50"
                  >
                    <div className="p-4 pt-0 text-[10.5px] leading-relaxed text-slate-500 border-t border-slate-105 font-medium space-y-1.5 whitespace-pre-line font-sans">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
