import React, { useState, useMemo, useEffect, useRef } from "react";
import * as d3 from "d3";
import { AlertCircle, Flame, ShieldAlert, Sparkles, Filter, RefreshCw, Layers } from "lucide-react";

export interface HeatmapDataPoint {
  state: string;
  stateCode: string;
  scamType: string;
  scamTypeLabel: string;
  reportsCount: number;
  severity: "Medium" | "High" | "Critical";
  recentIncident: string;
}

interface FraudCampaignHeatmapProps {
  onSelectScamIncident?: (scamLabel: string, details: string) => void;
}

export default function FraudCampaignHeatmap({ onSelectScamIncident }: FraudCampaignHeatmapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Custom states and scam labels
  const states = [
    { name: "Maharashtra", code: "MH" },
    { name: "Delhi NCR", code: "DL" },
    { name: "Karnataka", code: "KA" },
    { name: "Uttar Pradesh", code: "UP" },
    { name: "West Bengal", code: "WB" },
    { name: "Tamil Nadu", code: "TN" },
    { name: "Telangana", code: "TS" },
    { name: "Gujarat", code: "GJ" },
    { name: "Rajasthan", code: "RJ" },
    { name: "Bihar", code: "BR" }
  ];

  const scamTypes = [
    { key: "reg_pose", label: "Regulatory Impersonation", desc: "Calls pretending to be IRDAI Special Grievance officers" },
    { key: "bonus_bait", label: "Policy Bonus Bait", desc: "Guaranteed cash release against matured old policy premiums" },
    { key: "release_fee", label: "Claim Release Fee", desc: "Fake verification fees to dispatch pending consumer checks" },
    { key: "churning", label: "Deceptive Churning", desc: "Swapping active policies under false high return projection" },
    { key: "blank_proposal", label: "Proposal Hijack", desc: "Pre-signing blank sheets to enable agent misrepresentation" },
    { key: "cash_demand", label: "Cash Account Fraud", desc: "Direct cash collection requests in physical or personal names" }
  ];

  // Raw dataset representing quarterly regional reported consumer grievance patterns
  const baseData: HeatmapDataPoint[] = useMemo(() => [
    // Maharashtra
    { state: "Maharashtra", stateCode: "MH", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 182, severity: "Critical", recentIncident: "Fake Grievance cell caller targeted retiree claiming ₹85,000 pending bonus" },
    { state: "Maharashtra", stateCode: "MH", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 245, severity: "Critical", recentIncident: "Fraudsters promised ₹2.4L payout in exchange for a temporary ₹15K registry fee" },
    { state: "Maharashtra", stateCode: "MH", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 130, severity: "High", recentIncident: "Victim paid ₹22,000 for standard stamp clearance which was fraudulent" },
    { state: "Maharashtra", stateCode: "MH", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 165, severity: "High", recentIncident: "Misrepresented private health swap in Pune resulting in cancellation of original terms" },
    { state: "Maharashtra", stateCode: "MH", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 94, severity: "Medium", recentIncident: "Agent filled columns of health record themselves with false premium heights" },
    { state: "Maharashtra", stateCode: "MH", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 88, severity: "Medium", recentIncident: "Premium payment collected in agent's own savings bank name in Nagpur" },

    // Delhi NCR
    { state: "Delhi NCR", stateCode: "DL", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 210, severity: "Critical", recentIncident: "Impersonators operated fake helpline mimicking IRDA New Delhi head office" },
    { state: "Delhi NCR", stateCode: "DL", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 290, severity: "Critical", recentIncident: "Aggressive telecalling ring in Noida promised ₹4.5 Lakhs in accrued assets" },
    { state: "Delhi NCR", stateCode: "DL", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 175, severity: "Critical", recentIncident: "Coerced senior citizen to wire safety fee of ₹45,000 via individual phone link" },
    { state: "Delhi NCR", stateCode: "DL", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 154, severity: "High", recentIncident: "Tricked retail owner into closing 8-year ULIP for a fake dual bonus plan" },
    { state: "Delhi NCR", stateCode: "DL", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 82, severity: "Medium", recentIncident: "Agent obtained signatures on blank forms for standard commercial line" },
    { state: "Delhi NCR", stateCode: "DL", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 112, severity: "High", recentIncident: "Direct physical cash collection under false receipt in Central Delhi" },

    // Karnataka
    { state: "Karnataka", stateCode: "KA", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 124, severity: "High", recentIncident: "Caller claimed to be Bangalore Ombudsman to resolve pending dispute for a fee" },
    { state: "Karnataka", stateCode: "KA", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 195, severity: "Critical", recentIncident: "IT engineer parents lost ₹1.8L on phantom accumulated loyalty payouts" },
    { state: "Karnataka", stateCode: "KA", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 98, severity: "High", recentIncident: "Nodal processing fee scam requested from retired educator" },
    { state: "Karnataka", stateCode: "KA", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 142, severity: "High", recentIncident: "Agent recommended terminating tax-saving endowment to buy immediate pension" },
    { state: "Karnataka", stateCode: "KA", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 78, severity: "Medium", recentIncident: "Proposal columns left empty at Bangalore agency resulting in policy omission" },
    { state: "Karnataka", stateCode: "KA", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 65, severity: "Medium", recentIncident: "Individually issued cheque cashed in Mysore without valid corporate code" },

    // Uttar Pradesh
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 156, severity: "Critical", recentIncident: "Scammers claiming IRDA Lucknow headquarters registered fake verification" },
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 220, severity: "Critical", recentIncident: "Mass scale SMS blast in Kanpur claiming ₹12,000 cash grant awaits activation" },
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 144, severity: "High", recentIncident: "Targeted rural savers in Gorakhpur demanding tax clearances for matured claims" },
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 98, severity: "Medium", recentIncident: "Misled farmer in Varanasi to liquidate high value life plans early" },
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 110, severity: "High", recentIncident: "Agent forced client to write blank documents during doorstep signup" },
    { state: "Uttar Pradesh", stateCode: "UP", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 135, severity: "High", recentIncident: "Cash collection racket in Meerut using forged stamp documents" },

    // West Bengal
    { state: "West Bengal", stateCode: "WB", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 118, severity: "High", recentIncident: "Fraudsters in Kolkata posed as insurance authority grievance mediators" },
    { state: "West Bengal", stateCode: "WB", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 185, severity: "Critical", recentIncident: "Scammed retiree for ₹1.2L promising high interest bonus collection" },
    { state: "West Bengal", stateCode: "WB", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 82, severity: "Medium", recentIncident: "Clearing agent fee fraud on health settlement in Howrah" },
    { state: "West Bengal", stateCode: "WB", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 125, severity: "High", recentIncident: "Agent misrepresented single premium policy as monthly interest scheme" },
    { state: "West Bengal", stateCode: "WB", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 89, severity: "Medium", recentIncident: "Blank forms taken in Asansol resulting in claims dispute" },
    { state: "West Bengal", stateCode: "WB", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 76, severity: "Medium", recentIncident: "Personal mobile transfer used to pay premiums resulting in unapplied funds" },

    // Tamil Nadu
    { state: "Tamil Nadu", stateCode: "TN", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 92, severity: "Medium", recentIncident: "Fake regional Ombudsman office called claiming immediate fund discharge" },
    { state: "Tamil Nadu", stateCode: "TN", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 164, severity: "High", recentIncident: "Senior citizen in Chennai targeted for ₹90,000 fake accumulated interest trap" },
    { state: "Tamil Nadu", stateCode: "TN", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 70, severity: "Medium", recentIncident: "Nodal tax processing fee fraud recorded in Coimbatore" },
    { state: "Tamil Nadu", stateCode: "TN", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 118, severity: "High", recentIncident: "Misleading health upgrades resulting in loss of cumulative bonus" },
    { state: "Tamil Nadu", stateCode: "TN", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 62, severity: "Medium", recentIncident: "Blank proposal sign-off at Chennai local desk" },
    { state: "Tamil Nadu", stateCode: "TN", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 54, severity: "Medium", recentIncident: "Premium check in Madurai drawn directly to agency employee rather than firm" },

    // Telangana
    { state: "Telangana", stateCode: "TS", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 104, severity: "High", recentIncident: "Pretended to call from IRDA Hyderabad cell alleging security breaches" },
    { state: "Telangana", stateCode: "TS", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 172, severity: "High", recentIncident: "Fake bonus letter sent on WhatsApp targeting tech workforce parents" },
    { state: "Telangana", stateCode: "TS", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 88, severity: "Medium", recentIncident: "Stamp deposit demanded via wire transfer in Secunderabad" },
    { state: "Telangana", stateCode: "TS", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 120, severity: "High", recentIncident: "Unfair policy conversion by bank representative under home loan pressure" },
    { state: "Telangana", stateCode: "TS", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 74, severity: "Medium", recentIncident: "Signed papers completed without proposal checklist reviews" },
    { state: "Telangana", stateCode: "TS", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 58, severity: "Medium", recentIncident: "Cash collection done without immediate computer-generated receipt in Warangal" },

    // Gujarat
    { state: "Gujarat", stateCode: "GJ", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 88, severity: "Medium", recentIncident: "Ahmadabad trader targeted with fake grievance letter on legal bond paper" },
    { state: "Gujarat", stateCode: "GJ", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 145, severity: "High", recentIncident: "Promise of payout from lapsed 2012 policy after paying registration" },
    { state: "Gujarat", stateCode: "GJ", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 78, severity: "Medium", recentIncident: "Stamp duty fee demanded to clear a ₹3L settlement" },
    { state: "Gujarat", stateCode: "GJ", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 102, severity: "High", recentIncident: "Surrender of existing profitable plan recommended under false bonus guise" },
    { state: "Gujarat", stateCode: "GJ", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 90, severity: "High", recentIncident: "Agent obtained signed proposal with pre-existing ailments omitted" },
    { state: "Gujarat", stateCode: "GJ", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 84, severity: "Medium", recentIncident: "Cash transferred to third-party agency under receipt waiver" },

    // Rajasthan
    { state: "Rajasthan", stateCode: "RJ", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 74, severity: "Medium", recentIncident: "Impersonator claiming Jaipur central ombudsman cell called with threats" },
    { state: "Rajasthan", stateCode: "RJ", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 130, severity: "High", recentIncident: "SMS claiming lottery dividend payout on life policies cleared by Govt" },
    { state: "Rajasthan", stateCode: "RJ", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 67, severity: "Medium", recentIncident: "Tax clearance fee demanded in Jodhpur via UPI link" },
    { state: "Rajasthan", stateCode: "RJ", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 88, severity: "Medium", recentIncident: "Private agent coerced swapping of premium life policies for dynamic ULIPs" },
    { state: "Rajasthan", stateCode: "RJ", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 95, severity: "High", recentIncident: "Agent recorded non-smoker status without customer's disclosure to pass test" },
    { state: "Rajasthan", stateCode: "RJ", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 104, severity: "High", recentIncident: "Doorstep agent collected physical cash in Ajmer; no official receipt delivered" },

    // Bihar
    { state: "Bihar", stateCode: "BR", scamType: "reg_pose", scamTypeLabel: "Regulatory Impersonation", reportsCount: 110, severity: "High", recentIncident: "In Patna, fake grievance commission cell targeted pension policy holders" },
    { state: "Bihar", stateCode: "BR", scamType: "bonus_bait", scamTypeLabel: "Policy Bonus Bait", reportsCount: 165, severity: "High", recentIncident: "Large scale fake post office savings + insurance bonus dispatch ring busted" },
    { state: "Bihar", stateCode: "BR", scamType: "release_fee", scamTypeLabel: "Claim Release Fee", reportsCount: 112, severity: "High", recentIncident: "Coerced wire transfer of ₹30,000 to release locked policy claims" },
    { state: "Bihar", stateCode: "BR", scamType: "churning", scamTypeLabel: "Deceptive Churning", reportsCount: 72, severity: "Medium", recentIncident: "Misinformed policy exchange yielding lower coverage at Muzaffarpur rural area" },
    { state: "Bihar", stateCode: "BR", scamType: "blank_proposal", scamTypeLabel: "Proposal Hijack", reportsCount: 125, severity: "Critical", recentIncident: "Widespread signing of blank proposal sheets by illiterate consumers" },
    { state: "Bihar", stateCode: "BR", scamType: "cash_demand", scamTypeLabel: "Cash Account Fraud", reportsCount: 140, severity: "Critical", recentIncident: "Direct cheque requests in broker private accounts leading to massive default" }
  ], []);

  // UI Interactive States
  const [filterState, setFilterState] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<"ALL" | "Critical" | "High" | "Medium">("ALL");
  const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState<HeatmapDataPoint | null>(null);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalReports = baseData.reduce((acc, curr) => acc + curr.reportsCount, 0);
    const averagedReports = Math.round(totalReports / baseData.length);
    
    // Find absolute highest hotspot
    const highestHotspot = [...baseData].sort((a, b) => b.reportsCount - a.reportsCount)[0];
    
    // Find highest reported vectors
    const vectorScores = scamTypes.map(vector => {
      const sum = baseData.filter(d => d.scamType === vector.key).reduce((acc, d) => acc + d.reportsCount, 0);
      return { key: vector.key, label: vector.label, sum };
    });
    const deadliestVector = vectorScores.sort((a, b) => b.sum - a.sum)[0];

    // Find state with lowest reports
    const stateScores = states.map(st => {
      const sum = baseData.filter(d => d.state === st.name).reduce((acc, d) => acc + d.reportsCount, 0);
      return { name: st.name, code: st.code, sum };
    });
    const safestState = stateScores.sort((a, b) => a.sum - b.sum)[0];

    return {
      totalReports,
      averaged: averagedReports,
      highestHotspot,
      deadliestVector,
      safestState
    };
  }, [baseData]);

  // Responsive D3 Heatmap Drawing Engine
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous drawing
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 20, bottom: 80, left: 140 };
    const width = 760 - margin.left - margin.right;
    const height = 360 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 760 360`)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale (Scam Types labels)
    const x = d3.scaleBand()
      .range([0, width])
      .domain(scamTypes.map(d => d.key))
      .padding(0.06);

    // Y Scale (States list)
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(states.map(d => d.name).reverse()) // reverse so MH/DL appear at top
      .padding(0.06);

    // Color Scale (Burgundy to Warm Rose scale)
    const colorDomain = d3.extent(baseData, d => d.reportsCount) as [number, number];
    const colorScale = d3.scaleLinear<string>()
      .domain([colorDomain[0], (colorDomain[0] + colorDomain[1]) / 2, colorDomain[1]])
      .range(["#fff1f2", "#fb7185", "#9f1239"]); // Rose petals to deep burgundy

    // DRAW AXES
    // X Axis with rotated/clipped labels
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d => {
        const row = scamTypes.find(st => st.key === d);
        return row ? row.label : d;
      }))
      .selectAll("text")
      .attr("transform", "translate(-10,12)rotate(-18)")
      .style("text-anchor", "end")
      .style("font-size", "9.5px")
      .style("font-weight", "600")
      .style("fill", "#475569")
      .style("font-family", "Inter, system-ui, sans-serif");

    // Y Axis (State Names)
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "10.5px")
      .style("font-weight", "700")
      .style("fill", "#0f172a")
      .style("font-family", "Inter, system-ui, sans-serif");

    // Grid cells rendering with staggered enter and update transitions
    const cells = svg.selectAll()
      .data(baseData, (d: any) => d.state + ":" + d.scamType)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.scamType) || 0)
      .attr("y", (d) => y(d.state) || 0)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("cursor", "pointer")
      .style("stroke-dasharray", "none")
      .style("stroke-width", d => selectedCell?.state === d.state && selectedCell?.scamType === d.scamType ? 3.5 : 0.5)
      .style("stroke", d => selectedCell?.state === d.state && selectedCell?.scamType === d.scamType ? "#020617" : "#00000010")
      // Start from a neutral offline-state configuration
      .style("fill", "#f8fafc")
      .style("opacity", 0.1);

    // Apply smooth staggered animation sequence
    cells.transition()
      .duration(500)
      .delay((d, i) => {
        // Compute an elegant spiral or layout-based stagger index based on coordinates
        const stateIdx = states.findIndex(s => s.name === d.state);
        const scamIdx = scamTypes.findIndex(s => s.key === d.scamType);
        return (stateIdx + scamIdx) * 20; // 20ms staggered delay per grid diagonal
      })
      .ease(d3.easeCubicOut)
      .style("fill", (d) => {
        // Highlighting matches based on active filters
        const matchesSearch = filterState === "" || d.state.toLowerCase().includes(filterState.toLowerCase()) || d.stateCode.toLowerCase() === filterState.toLowerCase();
        const matchesSeverity = filterSeverity === "ALL" || d.severity === filterSeverity;
        
        if (!matchesSearch || !matchesSeverity) {
          return "#f1f5f9"; // muted dead gray
        }
        return colorScale(d.reportsCount);
      })
      .style("opacity", (d) => {
        const matchesSearch = filterState === "" || d.state.toLowerCase().includes(filterState.toLowerCase()) || d.stateCode.toLowerCase() === filterState.toLowerCase();
        const matchesSeverity = filterSeverity === "ALL" || d.severity === filterSeverity;
        return matchesSearch && matchesSeverity ? 1.0 : 0.25;
      });

    // Interaction handlers bound directly to D3 nodes
    cells.on("mouseover", (event, d) => {
      setHoveredCell(d);
      
      // Compute relative cursor placement to display popup
      if (containerRef.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        // Shift tooltip relative to viewport bounds but absolute inside container card
        setHoverPos({
          x: event.clientX - bounds.left + 15,
          y: event.clientY - bounds.top + 15
        });
      }
    })
    .on("mousemove", (event) => {
      if (containerRef.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        setHoverPos({
          x: event.clientX - bounds.left + 15,
          y: event.clientY - bounds.top + 15
        });
      }
    })
    .on("mouseleave", () => {
      setHoveredCell(null);
    })
    .on("click", (event, d) => {
      setSelectedCell(d);
      if (onSelectScamIncident) {
        // Feed the caller name pretend role & incident pattern to main comp complaints generator
        const claimRole = `Spurious Call posing as ${d.scamTypeLabel} (from Regional Hotspot: ${d.state})`;
        const detailsText = `Accrued dividends / Phantom payouts promised. Incident details track back to registered threat hotspots. Statement: ${d.recentIncident}`;
        onSelectScamIncident(claimRole, detailsText);
      }
    });

    // Append counts numbers inside cell for high specificity when space allows
    d3.select(svgRef.current).style("overflow", "visible");

  }, [baseData, filterState, filterSeverity, selectedCell, onSelectScamIncident]);

  return (
    <div 
      className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5 shadow-sm"
      ref={containerRef}
      id="threat-heatmap-container"
    >
      {/* Header and Filter Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest font-mono">Real-time Scam Hotspot telemetry</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">
            National Threat Spectrum: D3 Regional Fraud Index
          </h3>
          <p className="text-[11.5px] text-slate-500 leading-normal">
            Visualizing historical consumer grievance density patterns (N = {stats.totalReports} cases). Hover to review reported tactics or <strong>click a cell</strong> to populate the active police report.
          </p>
        </div>

        {/* Hotspot Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* State Text Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter State (e.g. MH, Delhi)"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-3 py-1.5 border border-slate-250 bg-slate-50/50 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500 w-38"
            />
            {filterState && (
              <button 
                onClick={() => setFilterState("")}
                className="absolute right-2.5 top-2 text-[10px] font-extrabold text-slate-400 hover:text-slate-600 font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Severity Select */}
          <div className="flex items-center border border-slate-250 bg-slate-50 rounded-xl overflow-hidden text-xs font-semibold">
            <span className="px-2 py-1.5 bg-slate-100 border-r border-slate-250 text-slate-500 text-[10px] uppercase font-mono tracking-wider">
              Severity
            </span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-2 py-1.5 pr-6 bg-transparent focus:outline-none text-slate-800 cursor-pointer"
            >
              <option value="ALL">All Levels</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High / Above</option>
              <option value="Medium">Medium Only</option>
            </select>
          </div>

          <button
            onClick={() => {
              setFilterState("");
              setFilterSeverity("ALL");
              setSelectedCell(null);
            }}
            title="Reset Grid"
            className="p-1.5 border border-slate-250 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* D3 Canvas container */}
      <div className="relative overflow-x-auto select-none bg-slate-50/20 p-2 text-center rounded-xl border border-slate-100">
        <svg 
          ref={svgRef} 
          className="mx-auto block" 
          style={{ minWidth: "620px", maxHeight: "360px" }}
          id="d3-heatmap-svg"
        />

        {/* React Absolute-Positioned Floating Custom Tooltip */}
        {hoveredCell && (
          <div
            className="absolute z-40 bg-slate-900 border border-slate-800 text-slate-200 text-left p-3.5 rounded-xl text-xs max-w-72 shadow-xl pointer-events-none space-y-2 animate-fadeIn font-sans"
            style={{
              left: `${hoverPos.x}px`,
              top: `${hoverPos.y}px`,
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-extrabold text-white text-[12px]">
                {hoveredCell.state}
              </span>
              <span 
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-white ${
                  hoveredCell.severity === "Critical" 
                    ? "bg-rose-900" 
                    : hoveredCell.severity === "High" 
                    ? "bg-amber-600" 
                    : "bg-sky-700"
                }`}
              >
                {hoveredCell.severity} Severity
              </span>
            </div>
            
            <div className="space-y-1 text-[11px] leading-relaxed">
              <p className="text-slate-400">
                <span className="font-semibold text-slate-300">Modus Operandi:</span> {hoveredCell.scamTypeLabel}
              </p>
              <p className="text-slate-400">
                <span className="font-semibold text-slate-300">Quarterly Cases:</span> <strong className="text-emerald-400 font-mono text-xs">{hoveredCell.reportsCount}</strong> reported cases
              </p>
              
              <div className="pt-2 border-t border-slate-800 mt-2 space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-900">
                <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-bold block">🚨 Modus Record:</span>
                <p className="text-slate-205 leading-normal italic text-[10.5px]">
                  "{hoveredCell.recentIncident}"
                </p>
              </div>
            </div>

            <p className="text-[9.5px] font-semibold text-rose-300/80 animate-pulse text-center pt-1">
              ⚡ Click this node to pre-fill complaint generator!
            </p>
          </div>
        )}
      </div>

      {/* Grid Legend & Interactive Response Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-100">
        
        {/* Metric legend */}
        <div className="md:col-span-4 flex items-center justify-start gap-4 text-xs">
          <span className="font-bold text-slate-700 font-mono text-[10px] uppercase">Grievance Volume Key:</span>
          <div className="flex items-center gap-1.5 select-none">
            <span className="text-[9.5px] font-semibold text-slate-500 mr-1">50 cases (Safe)</span>
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#fff1f2" }} />
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#fda4af" }} />
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#f43f5e" }} />
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#9f1239" }} />
            <span className="text-[9.5px] font-semibold text-slate-900 ml-1">300 cases (Severe)</span>
          </div>
        </div>

        {/* Quick Insights ticker banner */}
        <div className="md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-2 text-xs">
          <div className="bg-rose-50/50 border border-rose-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-slate-700 leading-none">
            <Flame className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>
              <strong>Deadliest threat vector:</strong> {stats.deadliestVector.label} ({stats.deadliestVector.sum} counts)
            </span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100/55 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-slate-700 leading-none">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Safest registered state:</strong> {stats.safestState.name} ({stats.safestState.sum} cases)
            </span>
          </div>
        </div>

      </div>

      {/* Selected cell notification to guide the user */}
      {selectedCell && (
        <div className="bg-slate-900 border border-slate-950 p-4 rounded-xl flex items-center justify-between gap-4 text-xs animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-950/40 rounded-lg text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-white font-bold font-sans">
                Active Node Selection: {selectedCell.state} ({selectedCell.stateCode})
              </p>
              <p className="text-slate-400 text-[11px]">
                Tactics match: <span className="text-slate-200 font-semibold">{selectedCell.scamTypeLabel}</span> with <strong className="text-rose-400">{selectedCell.reportsCount} registered campaigns</strong>.
              </p>
            </div>
          </div>
          <p className="text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider animate-pulse hidden sm:block">
            ✓ Complaint Builder Loaded!
          </p>
        </div>
      )}

    </div>
  );
}
