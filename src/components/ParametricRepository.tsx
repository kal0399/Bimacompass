import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Waves,
  CloudRain,
  Flame,
  Sun,
  Wind,
  Sprout,
  Thermometer,
  Anchor,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Download,
  Copy,
  Check,
  FileText,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Activity,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Share2,
  Database,
  Globe,
  Sliders,
  CheckCircle2,
  XCircle,
  Layers,
  Sparkles
} from "lucide-react";
import { jsPDF } from "jspdf";

// Official Swiss Re Reference URL as provided by user
export const SWISS_RE_SOURCE_URL = "https://www.swissre.com/dam/jcr:eb93d964-a0a0-47b4-883d-7fe5b5745064/Biason%20-%20Parametric%20Solutions.pdf";

export interface ParametricPolicy {
  id: string;
  name: string;
  perilCategory: "Earthquake" | "Cyclone / Wind" | "Flood / Rain" | "Renewable Energy" | "Agriculture" | "Heatwave" | "Marine & Logistics";
  industry: string;
  indexMetric: string;
  oracleAgency: string;
  oracleUrl?: string;
  payoutModel: "Binary (Step)" | "Multi-Tier Stepped" | "Linear Scale";
  typicalSettlementDays: number;
  triggerCondition: string;
  payoutSchedule: { trigger: string; payoutPct: number; notes: string }[];
  protectionGapAddressed: string;
  basisRiskMitigation: string;
  swissReCaseStudy: string;
  specimenTermSheet: {
    insuredInterest: string;
    coveredTerritory: string;
    limitOfLiability: string;
    indexCalculationFormula: string;
    conditionsPrecedent: string;
  };
}

export const PARAMETRIC_POLICIES_DATABASE: ParametricPolicy[] = [
  {
    id: "eq-usgs-pga",
    name: "ShakeGuard™ Seismic Acceleration Parametric Cover",
    perilCategory: "Earthquake",
    industry: "Commercial Real Estate, Chip Fabs, Metro Transit & Manufacturing",
    indexMetric: "Peak Ground Acceleration (%g PGA) & Instrumental Intensity (MMI)",
    oracleAgency: "United States Geological Survey (USGS ShakeMap) / National Center for Seismology (NCS)",
    oracleUrl: "https://earthquake.usgs.gov/data/shakemap/",
    payoutModel: "Multi-Tier Stepped",
    typicalSettlementDays: 7,
    triggerCondition: "USGS ShakeMap confirmed PGA within 25km radius of geographic centroid exceeding predefined gravitational acceleration thresholds.",
    payoutSchedule: [
      { trigger: "PGA 0.20g – 0.35g (MMI VII - Very Strong)", payoutPct: 35, notes: "Immediate emergency shoring, tenant rent rebates, structural audit fees" },
      { trigger: "PGA 0.36g – 0.50g (MMI VIII - Severe)", payoutPct: 70, notes: "Non-damage business interruption (NDBI), inventory loss, utility re-connection" },
      { trigger: "PGA > 0.50g (MMI IX+ - Violent)", payoutPct: 100, notes: "Maximum liquidity injection to prevent corporate debt default & restart operations" }
    ],
    protectionGapAddressed: "Traditional indemnity requires 6-18 months of physical structural inspection and excludes non-damage access denial by civil defense authorities. Parametric pays within 7 days regardless of physical damage.",
    basisRiskMitigation: "Uses multi-station gridded ground motion interpolation; coordinates locked via GPS polygon around the client's campuses.",
    swissReCaseStudy: "Commercial campus and industrial park protection where access denial caused millions in downtime without building collapse.",
    specimenTermSheet: {
      insuredInterest: "Economic loss, business interruption, supply chain disruption and emergency response costs arising from ground shaking.",
      coveredTerritory: "Coordinates bounding box: 25km radial perimeter centered at asset location.",
      limitOfLiability: "₹50 Crores ($6.0M USD) per event / in the aggregate.",
      indexCalculationFormula: "PGA = Max(Horizontal component ground acceleration recorded on authoritative USGS ShakeMap within perimeter).",
      conditionsPrecedent: "Active operations verified at location within 30 days preceding the seismic event; valid insurable interest proof."
    }
  },
  {
    id: "cyclone-cat-in-circle",
    name: "Cat-In-A-Circle™ Tropical Cyclone Wind & Pressure Policy",
    perilCategory: "Cyclone / Wind",
    industry: "Coastal Resorts & Hospitality, Seaports, Offshore Energy, Marinas",
    indexMetric: "Sustained 1-Minute Wind Speed (knots / km/h) & Central Pressure (hPa/mbar)",
    oracleAgency: "Joint Typhoon Warning Center (JTWC) / NOAA NHC / India Meteorological Department (IMD)",
    oracleUrl: "https://www.nhc.noaa.gov/",
    payoutModel: "Multi-Tier Stepped",
    typicalSettlementDays: 5,
    triggerCondition: "Track of a named Tropical Cyclone / Super Cyclonic Storm enters defined concentric radial zones with verified sustained winds.",
    payoutSchedule: [
      { trigger: "Category 2 / Severe Cyclonic Storm (64-82 kts) within 50km", payoutPct: 25, notes: "Debris clearance, beach restoration, cancelation compensation" },
      { trigger: "Category 3 / Very Severe Cyclonic Storm (83-95 kts) within 50km", payoutPct: 50, notes: "Loss of attraction, forward booking refunds, employee retention" },
      { trigger: "Category 4 / Extremely Severe Cyclonic Storm (96-113 kts) within 50km", payoutPct: 80, notes: "Major infrastructure shoring, temporary power generator charter" },
      { trigger: "Category 5 / Super Cyclone (> 114 kts) within 75km", payoutPct: 100, notes: "Total parametric limit released for operational stabilization" }
    ],
    protectionGapAddressed: "Covers 'Loss of Attraction'—when a hurricane misses the hotel by 10 miles causing zero physical roof damage, but tourists cancel bookings for the entire 4-month season.",
    basisRiskMitigation: "Concentric circular rings (25km, 50km, 100km) with sliding intensity multipliers to align track proximity with financial disruption.",
    swissReCaseStudy: "Caribbean luxury resort portfolio and Pacific coastal ports protected against catastrophic tourist cancellation and port approach shoaling.",
    specimenTermSheet: {
      insuredInterest: "Loss of turnover, customer cancellation penalties, brand restoration, and emergency grounds rehabilitation.",
      coveredTerritory: "Radial circle of 50 km radius centered on the resort / port main terminal.",
      limitOfLiability: "₹30 Crores ($3.6M USD) any one cyclone occurrence.",
      indexCalculationFormula: "Verified track position and peak 1-min sustained wind speed published in JTWC Best Track / IMD Cyclone Bulletin.",
      conditionsPrecedent: "Cyclone designated with an official storm name by regional tracking meteorological agency."
    }
  },
  {
    id: "excess-rain-flood",
    name: "PluviaShield™ Inundation & Heavy Rainfall Index",
    perilCategory: "Flood / Rain",
    industry: "Urban Metro Transit, E-Commerce Logistics Hubs, Open-Cast Mining, Event Venues",
    indexMetric: "Cumulative 48-Hour Precipitation (mm) & Local River Gauge Crest Height (meters)",
    oracleAgency: "IMD Automatic Weather Station (AWS) / ECMWF ERA5 Copernicus Gridded Reanalysis / CWC River Gauges",
    oracleUrl: "https://mausam.imd.gov.in/",
    payoutModel: "Linear Scale",
    typicalSettlementDays: 10,
    triggerCondition: "Cumulative 48-hour rainfall exceeds 1-in-25 year historical return threshold (> 220 mm) at certified grid points.",
    payoutSchedule: [
      { trigger: "Rainfall 200 mm – 250 mm in 48 hrs", payoutPct: 30, notes: "Pumping costs, subterranean water clearing, delivery fleet overtime" },
      { trigger: "Rainfall 251 mm – 320 mm in 48 hrs", payoutPct: 65, notes: "Warehouse stock relocation, contract SLA delay penalty indemnification" },
      { trigger: "Rainfall > 320 mm in 48 hrs", payoutPct: 100, notes: "Maximum operational halt compensation for deep water inundation" }
    ],
    protectionGapAddressed: "Standard fire/flood insurance excludes 'rising groundwater' or surface run-off without overflow of natural water bodies, and requires high sub-limits with 30-day waiting periods.",
    basisRiskMitigation: "Dual-trigger requirement: combines rainfall gauge volume with regional streamflow or satellite soil saturation index.",
    swissReCaseStudy: "Open-pit copper mine and metropolitan delivery aggregator where excess rain stops excavation or motorcycle fleets without direct asset destruction.",
    specimenTermSheet: {
      insuredInterest: "Extra expense, demurrage, worker standby wages, and supply chain rerouting costs resulting from pluvial inundation.",
      coveredTerritory: "Defined catchment polygon including key transit corridors and dispatch centers.",
      limitOfLiability: "₹20 Crores ($2.4M USD) total aggregate per monsoon season.",
      indexCalculationFormula: "R48 = Sum of hourly precipitation (mm) recorded between T0 and T+48 hours.",
      conditionsPrecedent: "Data recorded by certified primary station or predetermined fallback satellite gridded mesh."
    }
  },
  {
    id: "solar-irradiance-hedge",
    name: "HelioHedge™ Solar Yield & Global Horizontal Irradiance (GHI) Cover",
    perilCategory: "Renewable Energy",
    industry: "Utility-Scale Solar Photovoltaic (PV) Parks, Independent Power Producers (IPPs)",
    indexMetric: "Cumulative Monthly Global Horizontal Irradiance (kWh/m² GHI) vs. P90 Baseline",
    oracleAgency: "NASA POWER Project / Solargis / ECMWF / On-site IEC 61724 Class A Pyranometer",
    oracleUrl: "https://power.larc.nasa.gov/",
    payoutModel: "Linear Scale",
    typicalSettlementDays: 14,
    triggerCondition: "Total solar irradiance over a calendar quarter drops below 92% of the historical P90 expected generation baseline.",
    payoutSchedule: [
      { trigger: "GHI 5% – 10% below P90 Baseline", payoutPct: 25, notes: "Covers minor power purchase agreement (PPA) shortfall penalties" },
      { trigger: "GHI 11% – 20% below P90 Baseline", payoutPct: 60, notes: "Safeguards Debt Service Coverage Ratio (DSCR) to prevent loan covenants default" },
      { trigger: "GHI > 20% below P90 Baseline (Persistent cloud/dust/monsoon)", payoutPct: 100, notes: "Full revenue replacement for severe quarterly solar radiation deficit" }
    ],
    protectionGapAddressed: "Weather volume risk is 100% uninsurable under traditional property policies. If prolonged overcast weather cuts solar output, the bank still demands debt servicing. HelioHedge pays the revenue gap.",
    basisRiskMitigation: "Pyranometers calibrated to international standards, cross-referenced with high-resolution satellite solar irradiance rasters.",
    swissReCaseStudy: "Non-recourse project financing for 350 MW utility-scale solar parks across Rajasthan and Southern Europe where lenders required parametric yield protection to approve debt.",
    specimenTermSheet: {
      insuredInterest: "Shortfall in expected gross electricity generation revenues under Power Purchase Agreements (PPA).",
      coveredTerritory: "Solar farm site footprint and contiguous grid substation connection points.",
      limitOfLiability: "₹15 Crores ($1.8M USD) per policy year.",
      indexCalculationFormula: "Shortfall = Max(0, (GHI_P90_Benchmark - GHI_Actual) * Contractual_Tariff_Multiplier).",
      conditionsPrecedent: "Plant availability factor maintained above 95% (excluding weather-related solar deficit)."
    }
  },
  {
    id: "wind-shortfall-hedge",
    name: "AeolusRisk™ Wind Speed Volume Revenue Floor",
    perilCategory: "Renewable Energy",
    industry: "Onshore & Offshore Wind Turbine Operators, Clean Energy Funds",
    indexMetric: "Average Hub-Height (100m) Wind Velocity (m/s) per production quarter",
    oracleAgency: "European Centre for Medium-Range Weather Forecasts (ECMWF) / Certified Met Masts",
    oracleUrl: "https://www.ecmwf.int/",
    payoutModel: "Linear Scale",
    typicalSettlementDays: 14,
    triggerCondition: "Quarterly mean wind speed at turbine hub height falls below the minimum generation breakeven velocity (e.g. < 5.8 m/s).",
    payoutSchedule: [
      { trigger: "Wind speed 5% to 10% below P50 expected", payoutPct: 30, notes: "Compensates lost renewable energy certificate (REC) trading margins" },
      { trigger: "Wind speed 11% to 20% below P50 expected", payoutPct: 75, notes: "Protects project EBITDA and senior debt amortization schedule" },
      { trigger: "Wind speed > 20% below P50 expected (Wind drought)", payoutPct: 100, notes: "Total parametric revenue floor activated" }
    ],
    protectionGapAddressed: "'Wind droughts' (prolonged calm atmospheric blocking) cannot be insured under conventional machinery breakdown or property covers. AeolusRisk stabilizes cashflows.",
    basisRiskMitigation: "Met-mast correlation with nacelle LIDAR measurements and ECMWF global atmospheric reanalysis.",
    swissReCaseStudy: "Major European wind farm portfolio refinancing where parametric wind-index hedges reduced borrowing spreads by 40 basis points.",
    specimenTermSheet: {
      insuredInterest: "Cashflow shortfall from reduced wind energy production.",
      coveredTerritory: "Licensed wind park boundary coordinates.",
      limitOfLiability: "₹25 Crores ($3.0M USD) per operational year.",
      indexCalculationFormula: "Deficit Payout = Deficit_Hours * (Rated_Power * PPA_Price).",
      conditionsPrecedent: "Turbines serviced in accordance with OEM manufacturer guidelines."
    }
  },
  {
    id: "agri-drought-ndvi",
    name: "AgriPulse™ Soil Moisture & Satellite NDVI Drought Cover",
    perilCategory: "Agriculture",
    industry: "Agribusiness, Tea & Coffee Plantations, Seed Manufacturers, Rural Cooperatives",
    indexMetric: "Normalized Difference Vegetation Index (NDVI) & Surface Soil Moisture Index (SSMI)",
    oracleAgency: "Copernicus Sentinel-2 Satellite / NASA SMAP Soil Moisture Active Passive / IMD Agromet",
    oracleUrl: "https://sentinels.copernicus.eu/",
    payoutModel: "Multi-Tier Stepped",
    typicalSettlementDays: 10,
    triggerCondition: "Satellite-derived vegetation greenness (NDVI) or cumulative rainfall during critical germination/flowering window drops below 75% of 10-year mean.",
    payoutSchedule: [
      { trigger: "NDVI deficit 15% – 25% during flowering phase", payoutPct: 30, notes: "Emergency irrigation fuel subsidy, foliar nutrition spray deployment" },
      { trigger: "NDVI deficit 26% – 40% during grain filling phase", payoutPct: 65, notes: "Compensates harvest yield losses and loan interest service" },
      { trigger: "Severe Drought: NDVI deficit > 40% over whole season", payoutPct: 100, notes: "Full parametric indemnity to preserve farmer solvency" }
    ],
    protectionGapAddressed: "Traditional crop cutting experiments (CCE) take 6 to 12 months, suffer from political interference, and delay relief until farmers face insolvency. Satellite parametric pays automatically.",
    basisRiskMitigation: "High-resolution 10m Sentinel-2 multi-spectral imagery segmented by farm field cadastral maps.",
    swissReCaseStudy: "African & Indian regional agricultural micro-insurance programs protecting hundreds of thousands of smallholders against severe seasonal monsoon failure.",
    specimenTermSheet: {
      insuredInterest: "Production loss, input cost recovery, and revenue decline from agro-climatic stress.",
      coveredTerritory: "Specified agricultural taluks / districts in state crop notification.",
      limitOfLiability: "₹40 Crores ($4.8M USD) season limit.",
      indexCalculationFormula: "Index = Mean NDVI observed over 10-day composite cloud-free satellite passes.",
      conditionsPrecedent: "Verified planting of notified crops within the statutory sowing window."
    }
  },
  {
    id: "extreme-heatwave-labor",
    name: "ThermoSafe™ Urban Heatwave & Worker Moratorium Policy",
    perilCategory: "Heatwave",
    industry: "Civil Construction, Municipal Utilities, Dairy Farms, Cold Chain Logistics",
    indexMetric: "Daily Maximum Dry-Bulb Temperature (°C) & Wet-Bulb Globe Temperature (WBGT)",
    oracleAgency: "National Meteorological Department / WMO Certified High-Precision Weather Stations",
    oracleUrl: "https://worldweather.wmo.int/",
    payoutModel: "Binary (Step)",
    typicalSettlementDays: 5,
    triggerCondition: "Maximum daytime temperature exceeds 43.5°C (or Wet-Bulb > 32°C) for 3 or more consecutive calendar days.",
    payoutSchedule: [
      { trigger: "3 consecutive days > 43.5°C", payoutPct: 40, notes: "Compensates mandated midday construction shutdown wages under government heat action plans" },
      { trigger: "5 consecutive days > 43.5°C or any day > 46.0°C", payoutPct: 75, notes: "Cold storage auxiliary chiller power surges, concrete cooling ice slurry expenses" },
      { trigger: "Extreme heat emergency: > 7 consecutive days > 43.5°C", payoutPct: 100, notes: "Complete liquidity buffer for project delay penalty and livestock mortality protection" }
    ],
    protectionGapAddressed: "Municipal heat action plans mandate halting outdoor labor between 11 AM and 4 PM. Standard insurance pays zero for labor shutdowns without physical property damage.",
    basisRiskMitigation: "Official certified airport weather station data backed by on-site automated calibrated thermal loggers.",
    swissReCaseStudy: "Middle Eastern and South Asian infrastructure contractors insured against statutory summer working hour restrictions and cooling utility surcharges.",
    specimenTermSheet: {
      insuredInterest: "Mandatory labor standstill wages, project delay liquidated damages, and refrigeration surge costs.",
      coveredTerritory: "City metropolitan development boundary and designated project sites.",
      limitOfLiability: "₹10 Crores ($1.2M USD) per summer season.",
      indexCalculationFormula: "T_max confirmed in official State Heat Action Plan daily bulletin.",
      conditionsPrecedent: "Compliance with municipal worker safety guidelines."
    }
  },
  {
    id: "marine-port-swell",
    name: "OceanSwell™ Marine Port Approach & Wave Height Interruption",
    perilCategory: "Marine & Logistics",
    industry: "Container Terminals, Bulk Mineral Jetties, Offshore Crew Transfer, Island Ferries",
    indexMetric: "Significant Wave Height (Hs in meters) & Sea Surface Current Velocity (knots)",
    oracleAgency: "National Oceanographic Data Center (NODC) / Offshore Metocean Data Buoys / Copernicus Marine Service",
    oracleUrl: "https://marine.copernicus.eu/",
    payoutModel: "Multi-Tier Stepped",
    typicalSettlementDays: 7,
    triggerCondition: "Significant Wave Height (Hs) at harbor approach buoy exceeds safety threshold (> 3.5m) for more than 24 continuous hours.",
    payoutSchedule: [
      { trigger: "Wave Height Hs > 3.5m for 24 – 48 continuous hours", payoutPct: 30, notes: "Compensates vessel demurrage and tugboat standby charges" },
      { trigger: "Wave Height Hs > 3.5m for 49 – 96 continuous hours", payoutPct: 70, notes: "Berth congestion penalties and perishable cargo deterioration" },
      { trigger: "Wave Height Hs > 4.5m or closure > 96 hours", payoutPct: 100, notes: "Maximum port business interruption parametric compensation" }
    ],
    protectionGapAddressed: "Heavy swells prevent pilots from boarding container vessels, creating massive shipping backlogs without damaging the concrete quayside. Standard marine hull or port property covers reject this non-damage loss.",
    basisRiskMitigation: "Direct telemetry from dedicated calibrated ADCP oceanographic wave buoys moored at the port fairway buoy.",
    swissReCaseStudy: "Deepwater container hub in the Indian Ocean where seasonal monsoon swells routinely trapped laden container ships offshore.",
    specimenTermSheet: {
      insuredInterest: "Demurrage claims, vessel charter cancellation, pilot standby costs, and port revenue loss.",
      coveredTerritory: "Port nautical limits and designated anchorage grounds.",
      limitOfLiability: "₹18 Crores ($2.1M USD) per voyage season.",
      indexCalculationFormula: "Hs calculated as 4 times the square root of zeroth moment of wave spectrum.",
      conditionsPrecedent: "Harbor Master official pilotage suspension notice logged in port records."
    }
  }
];

export const INDEMNITY_VS_PARAMETRIC = [
  {
    dimension: "Core Trigger",
    indemnity: "Actual physical loss or material damage to insured property, verified by loss adjusters.",
    parametric: "Pre-agreed objective parameter or index breaching a quantitative threshold (e.g. PGA, windspeed, rainfall mm).",
    winner: "Parametric (Objective, zero ambiguity)"
  },
  {
    dimension: "Claim Settlement Speed",
    indemnity: "6 months to 2+ years of tedious documentation, site visits, forensic accounting, and negotiations.",
    parametric: "Rapid automated disbursement in 2 to 14 days once the independent oracle confirms data.",
    winner: "Parametric (Immediate liquidity)"
  },
  {
    dimension: "Claims Documentation",
    indemnity: "Extensive asset ledgers, original purchase invoices, salvage certificates, forensic accounting reports.",
    parametric: "Zero claim invoices required. Payout is automated by public oracle feed and insurable interest proof.",
    winner: "Parametric (Frictionless)"
  },
  {
    dimension: "Use of Payout Proceeds",
    indemnity: "Strictly limited to reinstating, repairing, or replacing the damaged physical assets.",
    parametric: "Complete flexible discretion: working capital, emergency employee wages, debt service, tenant rebates.",
    winner: "Parametric (Total flexibility)"
  },
  {
    dimension: "Protection Gap & NDBI",
    indemnity: "Strictly requires direct physical damage. Denies coverage for non-damage business interruption (NDBI) or loss of attraction.",
    parametric: "Closes the gap! Covers loss of attraction, infrastructure access denial, customer cancellations, emergency relief.",
    winner: "Parametric (Covers uninsurable risks)"
  },
  {
    dimension: "Basis Risk Exposure",
    indemnity: "Low basis risk (pays exact proved loss), but high adjustment friction, disputes, and delayed cashflow.",
    parametric: "Has basis risk: potential mismatch between index trigger and actual loss, mitigated via dual triggers & micro-zoning.",
    winner: "Indemnity (for exact replacement)"
  },
  {
    dimension: "Loss Adjuster & Legal Fees",
    indemnity: "High surveyor costs, loss adjusters, arbitration lawyers, and court litigation expenses.",
    parametric: "Zero loss adjusting expenses. Pre-agreed formula eliminates forensic accounting disputes.",
    winner: "Parametric (Zero overhead)"
  }
];

export default function ParametricRepository() {
  const [selectedPeril, setSelectedPeril] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePolicyId, setActivePolicyId] = useState<string>("eq-usgs-pga");
  const [activeViewMode, setActiveViewMode] = useState<"repository" | "comparator" | "simulator" | "principles">("repository");

  // Interactive Simulator State
  const [simPolicyId, setSimPolicyId] = useState<string>("cyclone-cat-in-circle");
  const [simSumInsured, setSimSumInsured] = useState<number>(25); // In Crores
  const [simTriggerMetric, setSimTriggerMetric] = useState<number>(92); // e.g. knots windspeed or %g
  const [simModelType, setSimModelType] = useState<"stepped" | "linear">("stepped");
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);

  // Filtered policies
  const filteredPolicies = useMemo(() => {
    return PARAMETRIC_POLICIES_DATABASE.filter(policy => {
      const matchPeril = selectedPeril === "All" || policy.perilCategory === selectedPeril;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        policy.name.toLowerCase().includes(q) ||
        policy.industry.toLowerCase().includes(q) ||
        policy.perilCategory.toLowerCase().includes(q) ||
        policy.oracleAgency.toLowerCase().includes(q) ||
        policy.indexMetric.toLowerCase().includes(q);
      return matchPeril && matchSearch;
    });
  }, [selectedPeril, searchQuery]);

  const activePolicy = useMemo(() => {
    return PARAMETRIC_POLICIES_DATABASE.find(p => p.id === activePolicyId) || PARAMETRIC_POLICIES_DATABASE[0];
  }, [activePolicyId]);

  const simPolicy = useMemo(() => {
    return PARAMETRIC_POLICIES_DATABASE.find(p => p.id === simPolicyId) || PARAMETRIC_POLICIES_DATABASE[1];
  }, [simPolicyId]);

  // Simulator payout calculation
  const simCalculation = useMemo(() => {
    let payoutPercent = 0;
    let triggerTierName = "Below Trigger Threshold";
    let triggerStatus: "none" | "partial" | "full" = "none";

    if (simPolicy.id === "cyclone-cat-in-circle") {
      // Wind speed in knots: < 64 (none), 64-82 (25%), 83-95 (50%), 96-113 (80%), > 114 (100%)
      if (simTriggerMetric < 64) {
        payoutPercent = 0;
        triggerTierName = "Below Cat 2 (No Trigger: Winds < 64 kts)";
      } else if (simTriggerMetric <= 82) {
        payoutPercent = simModelType === "stepped" ? 25 : Math.round(20 + ((simTriggerMetric - 64) / (82 - 64)) * 15);
        triggerTierName = "Category 2 / Severe Cyclone (25% Tier)";
        triggerStatus = "partial";
      } else if (simTriggerMetric <= 95) {
        payoutPercent = simModelType === "stepped" ? 50 : Math.round(35 + ((simTriggerMetric - 83) / (95 - 83)) * 25);
        triggerTierName = "Category 3 / Very Severe Cyclone (50% Tier)";
        triggerStatus = "partial";
      } else if (simTriggerMetric <= 113) {
        payoutPercent = simModelType === "stepped" ? 80 : Math.round(60 + ((simTriggerMetric - 96) / (113 - 96)) * 25);
        triggerTierName = "Category 4 / Extremely Severe (80% Tier)";
        triggerStatus = "partial";
      } else {
        payoutPercent = 100;
        triggerTierName = "Category 5 / Super Cyclone (100% Full Limit Trigger)";
        triggerStatus = "full";
      }
    } else if (simPolicy.id === "eq-usgs-pga") {
      // Peak ground acceleration in %g (e.g. 10 to 60)
      if (simTriggerMetric < 20) {
        payoutPercent = 0;
        triggerTierName = "PGA < 0.20g (Sub-threshold ground acceleration)";
      } else if (simTriggerMetric <= 35) {
        payoutPercent = 35;
        triggerTierName = "MMI VII: Moderate-to-Strong Shaking (35% Tier)";
        triggerStatus = "partial";
      } else if (simTriggerMetric <= 50) {
        payoutPercent = 70;
        triggerTierName = "MMI VIII: Severe Ground Shaking (70% Tier)";
        triggerStatus = "partial";
      } else {
        payoutPercent = 100;
        triggerTierName = "MMI IX+: Violent Acceleration (> 0.50g: 100% Full Limit)";
        triggerStatus = "full";
      }
    } else {
      // General normalized scale
      payoutPercent = Math.min(100, Math.max(0, Math.round(simTriggerMetric)));
      triggerTierName = payoutPercent > 0 ? `${payoutPercent}% Parametric Index Trigger` : "Below Trigger Threshold";
      triggerStatus = payoutPercent >= 100 ? "full" : payoutPercent > 0 ? "partial" : "none";
    }

    const grossPayoutAmount = (simSumInsured * 10000000 * payoutPercent) / 100; // in INR
    return {
      payoutPercent,
      triggerTierName,
      triggerStatus,
      grossPayoutAmount,
      formattedGross: `₹${(grossPayoutAmount / 10000000).toFixed(2)} Crores`,
      settlementDays: simPolicy.typicalSettlementDays
    };
  }, [simPolicy, simTriggerMetric, simModelType, simSumInsured]);

  // Export Spec Sheet as PDF
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("SWISS RE PARAMETRIC INSURANCE TERM SHEET SPECIFICATION", 14, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Reference Framework: Gianni Biason - Parametric Solutions (Swiss Re)`, 14, 28);
      doc.text(`Generated via BimaCompass Open Parametric Repository on: ${new Date().toLocaleDateString()}`, 14, 34);

      doc.setLineWidth(0.5);
      doc.line(14, 38, 196, 38);

      let y = 46;
      const addSection = (title: string, content: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(title, 14, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        const splitText = doc.splitTextToSize(content, 175);
        doc.text(splitText, 14, y);
        y += splitText.length * 5 + 4;
      };

      addSection("1. Policy Name & Peril Category", `${activePolicy.name} | Peril: ${activePolicy.perilCategory}`);
      addSection("2. Target Industry & Asset Class", activePolicy.industry);
      addSection("3. Index Parameter & Metric", activePolicy.indexMetric);
      addSection("4. Authorized Independent Data Oracle", activePolicy.oracleAgency);
      addSection("5. Trigger Mechanism & Payout Model", `${activePolicy.payoutModel} (Disbursement within ${activePolicy.typicalSettlementDays} days)`);
      addSection("6. Trigger Condition", activePolicy.triggerCondition);
      addSection("7. Protection Gap & NDBI Addressed", activePolicy.protectionGapAddressed);
      addSection("8. Basis Risk Mitigation Protocol", activePolicy.basisRiskMitigation);
      addSection("9. Swiss Re Benchmark Case Study", activePolicy.swissReCaseStudy);

      if (y < 230) {
        addSection("10. Insured Interest & Conditions Precedent", activePolicy.specimenTermSheet.insuredInterest + " | " + activePolicy.specimenTermSheet.conditionsPrecedent);
      }

      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text("Official Source Citation: https://www.swissre.com/dam/jcr:eb93d964-a0a0-47b4-883d-7fe5b5745064/Biason%20-%20Parametric%20Solutions.pdf", 14, 285);

      doc.save(`Parametric_Spec_${activePolicy.id}.pdf`);
    } catch (e) {
      console.error("PDF generation error", e);
    }
  };

  // Copy Markdown Specification
  const handleCopySpec = () => {
    const specMarkdown = `
# PARAMETRIC INSURANCE TERM SHEET SPECIFICATION
**Source:** Swiss Re Parametric Solutions Framework (Gianni Biason)
**Document Citation:** ${SWISS_RE_SOURCE_URL}

### Policy Overview
- **Policy Name:** ${activePolicy.name}
- **Peril Category:** ${activePolicy.perilCategory}
- **Industry Applicability:** ${activePolicy.industry}
- **Index Metric:** ${activePolicy.indexMetric}
- **Authorized Data Oracle:** ${activePolicy.oracleAgency}
- **Payout Model:** ${activePolicy.payoutModel}
- **Disbursement Speed:** Within ${activePolicy.typicalSettlementDays} calendar days

### Trigger & Payout Schedule
${activePolicy.payoutSchedule.map(s => `- **${s.trigger}:** ${s.payoutPct}% of Total Limit (${s.notes})`).join("\n")}

### Structural Safeguards
- **Protection Gap Solved:** ${activePolicy.protectionGapAddressed}
- **Basis Risk Mitigation:** ${activePolicy.basisRiskMitigation}
- **Specimen Formula:** ${activePolicy.specimenTermSheet.indexCalculationFormula}
- **Conditions Precedent:** ${activePolicy.specimenTermSheet.conditionsPrecedent}

*Synthesized for BimaCompass Consumer and Institutional Literacy Repository.*
    `.trim();

    navigator.clipboard.writeText(specMarkdown);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="parametric-repository-root">
      
      {/* Header Banner with Swiss Re Citation */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
        {/* Subtle grid and ambient lighting */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/15 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-[10.5px] font-extrabold text-blue-300 uppercase tracking-widest font-mono">
                <Waves className="w-3.5 h-3.5 text-blue-400" /> Swiss Re Model Framework
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-[10px] font-bold text-emerald-300 font-mono">
                <Clock className="w-3 h-3 text-emerald-400" /> 2–14 Day Auto-Disbursement
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-[10px] font-bold text-amber-300 font-mono">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Zero Loss Adjuster Friction
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-white leading-tight">
              Parametric Insurance Policy Repository
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
              Based on the landmark <strong>Swiss Re Parametric Solutions</strong> treatise by <strong>Gianni Biason</strong> (Head of Parametric & Emerging Solutions, Swiss Re). Explore pre-agreed index-triggered policies designed to close the protection gap for non-damage business interruption, natural catastrophes, climate volatility, and renewable energy shortfalls.
            </p>

            {/* Official Source Link & Credit */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={SWISS_RE_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[11px] transition shadow-xs cursor-pointer font-sans"
              >
                <span>Read Swiss Re Source Paper (Biason - Parametric Solutions.pdf)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-slate-400 font-mono">
                Swiss Re Tour de Raison • Corporate Solutions
              </span>
            </div>
          </div>

          {/* Quick Stats Pill Deck */}
          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto shrink-0 font-mono text-center">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-extrabold text-blue-400">8+</div>
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400">Peril Blueprints</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-extrabold text-emerald-400">100%</div>
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400">Objective Oracles</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-extrabold text-amber-400">0 Days</div>
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400">Surveyor Delay</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-extrabold text-purple-400">NDBI</div>
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400">Non-Damage Cover</div>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-800">
          {[
            { id: "repository", label: "Policy Blueprints Repository", icon: Database },
            { id: "simulator", label: "Live Parametric Lab & Simulator", icon: Sliders },
            { id: "comparator", label: "Indemnity vs. Parametric Matrix", icon: Activity },
            { id: "principles", label: "Swiss Re Anatomy & Core Principles", icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeViewMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveViewMode(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer font-sans ${
                  isCurrent
                    ? "bg-white text-slate-950 shadow-sm"
                    : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE 1: REPOSITORY OF PARAMETRIC POLICY BLUEPRINTS
          ========================================================================= */}
      {activeViewMode === "repository" && (
        <div className="space-y-6 animate-fade-in" id="parametric-catalog-section">
          
          {/* Filter & Search Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mr-1">
                Filter Peril:
              </span>
              {[
                "All",
                "Earthquake",
                "Cyclone / Wind",
                "Flood / Rain",
                "Renewable Energy",
                "Agriculture",
                "Heatwave",
                "Marine & Logistics"
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedPeril(cat)}
                  className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    selectedPeril === cat
                      ? "bg-sky-600 text-white shadow-2xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search index, oracle, or peril..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400 font-sans"
              />
            </div>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Blueprint Selector List (4 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                  Indexed Blueprints ({filteredPolicies.length})
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Sourced from Swiss Re Case Studies
                </span>
              </div>

              <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                {filteredPolicies.map(policy => {
                  const isSelected = activePolicyId === policy.id;
                  return (
                    <div
                      key={policy.id}
                      onClick={() => setActivePolicyId(policy.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left space-y-2.5 ${
                        isSelected
                          ? "bg-sky-50 border-sky-500 shadow-xs ring-1 ring-sky-500/30"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          policy.perilCategory === "Earthquake" ? "bg-amber-100 text-amber-800" :
                          policy.perilCategory === "Cyclone / Wind" ? "bg-cyan-100 text-cyan-800" :
                          policy.perilCategory === "Flood / Rain" ? "bg-sky-100 text-sky-800" :
                          policy.perilCategory === "Renewable Energy" ? "bg-emerald-100 text-emerald-800" :
                          policy.perilCategory === "Agriculture" ? "bg-lime-100 text-lime-800" :
                          policy.perilCategory === "Heatwave" ? "bg-red-100 text-red-800" :
                          "bg-indigo-100 text-indigo-800"
                        }`}>
                          {policy.perilCategory}
                        </span>

                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          ⏱ {policy.typicalSettlementDays} Days
                        </span>
                      </div>

                      <div>
                        <h4 className={`text-sm font-bold font-sans ${isSelected ? "text-sky-950" : "text-slate-900"}`}>
                          {policy.name}
                        </h4>
                        <p className="text-[11px] text-slate-600 font-sans line-clamp-1 mt-0.5">
                          {policy.industry}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[10.5px] font-mono flex items-center justify-between text-slate-600">
                        <span className="truncate max-w-[200px]">Index: {policy.indexMetric.split("&")[0]}</span>
                        <span className="font-bold text-sky-700">{policy.payoutModel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep Blueprint Specimen Sheet (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
              
              {/* Policy Header & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded uppercase">
                    Swiss Re Specimen Slip #{activePolicy.id.toUpperCase()}
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 font-sans">
                    {activePolicy.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans">
                    Sector: <strong>{activePolicy.industry}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopySpec}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer"
                    title="Copy Policy Markdown Slip"
                  >
                    {copiedSpec ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSpec ? "Copied" : "Copy Slip"}</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Export PDF Term Sheet"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Vital Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                    Underlying Index & Metric
                  </span>
                  <p className="text-xs font-bold text-slate-900 font-sans">
                    {activePolicy.indexMetric}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                    Independent Data Oracle
                  </span>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-slate-900 font-sans">
                      {activePolicy.oracleAgency}
                    </p>
                    {activePolicy.oracleUrl && (
                      <a
                        href={activePolicy.oracleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-700 p-1"
                        title="Open Oracle Data Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                    Payout Formula Structure
                  </span>
                  <p className="text-xs font-bold text-sky-700 font-sans">
                    {activePolicy.payoutModel}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                    Target Disbursement Window
                  </span>
                  <p className="text-xs font-bold text-emerald-700 font-sans flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activePolicy.typicalSettlementDays} Calendar Days post oracle data</span>
                  </p>
                </div>
              </div>

              {/* Trigger Condition Statement */}
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-900 block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-sky-600" />
                  Contractual Trigger Condition:
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  {activePolicy.triggerCondition}
                </p>
              </div>

              {/* Payout Schedule Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 font-sans uppercase font-mono tracking-wider block">
                  Stepped Payout Matrix:
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left font-sans">
                    <thead className="bg-slate-50 text-[10.5px] font-mono text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3">Trigger Threshold</th>
                        <th className="p-3 text-center">Disbursement %</th>
                        <th className="p-3">Loss Application / Liquidity Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11.5px]">
                      {activePolicy.payoutSchedule.map((tier, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="p-3 font-semibold text-slate-900">{tier.trigger}</td>
                          <td className="p-3 text-center">
                            <span className="font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                              {tier.payoutPct}%
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 leading-normal">{tier.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Protection Gap & Basis Risk Explanations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 block flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Protection Gap Addressed:
                  </span>
                  <p className="text-[11.5px] text-slate-700 leading-relaxed font-sans">
                    {activePolicy.protectionGapAddressed}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Basis Risk Mitigation:
                  </span>
                  <p className="text-[11.5px] text-slate-700 leading-relaxed font-sans">
                    {activePolicy.basisRiskMitigation}
                  </p>
                </div>
              </div>

              {/* Swiss Re Benchmark Case Study Note */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 block">
                  Swiss Re Tour de Raison Benchmark:
                </span>
                <p className="text-xs text-amber-950 font-sans italic leading-relaxed">
                  "{activePolicy.swissReCaseStudy}"
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: INTERACTIVE PARAMETRIC POLICY SIMULATOR & LAB
          ========================================================================= */}
      {activeViewMode === "simulator" && (
        <div className="space-y-6 animate-fade-in" id="parametric-simulator-section">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-sky-600" />
              <h3 className="font-extrabold text-base text-slate-900 font-sans">
                Interactive Parametric Underwriting & Trigger Lab
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Experience the mechanics of Swiss Re parametric underwriting in real time. Select a peril policy, adjust your total limit (Sum Insured), and simulate hazard index telemetry (e.g. storm windspeed or seismic PGA) to witness the automated payout calculation and swift disbursement timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Simulator Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-5 shadow-xs">
              
              {/* 1. Policy Archetype Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 font-sans block">
                  1. Select Parametric Peril Policy:
                </label>
                <select
                  value={simPolicyId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setSimPolicyId(newId);
                    if (newId === "cyclone-cat-in-circle") setSimTriggerMetric(90);
                    else if (newId === "eq-usgs-pga") setSimTriggerMetric(38);
                    else setSimTriggerMetric(65);
                  }}
                  className="w-full text-xs font-sans p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                >
                  {PARAMETRIC_POLICIES_DATABASE.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.perilCategory})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Total Sum Insured / Policy Limit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-slate-900">
                    2. Total Sum Insured (Limit):
                  </span>
                  <span className="font-mono font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    ₹{simSumInsured} Crores ($~{(simSumInsured * 0.12).toFixed(1)}M USD)
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={simSumInsured}
                  onChange={(e) => setSimSumInsured(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>₹2 Cr</span>
                  <span>₹25 Cr</span>
                  <span>₹50 Cr</span>
                  <span>₹100 Cr</span>
                </div>
              </div>

              {/* 3. Hazard Event Metric Simulator Slider */}
              <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-slate-900">
                    3. Simulated Oracle Telemetry:
                  </span>
                  <span className="font-mono font-bold text-amber-700">
                    {simPolicy.id === "cyclone-cat-in-circle" ? `${simTriggerMetric} Knots (${Math.round(simTriggerMetric * 1.852)} km/h)` :
                     simPolicy.id === "eq-usgs-pga" ? `${(simTriggerMetric / 100).toFixed(2)}g Peak Acceleration` :
                     `${simTriggerMetric}% Metric Index Level`}
                  </span>
                </div>

                <input
                  type="range"
                  min={simPolicy.id === "cyclone-cat-in-circle" ? 40 : simPolicy.id === "eq-usgs-pga" ? 5 : 0}
                  max={simPolicy.id === "cyclone-cat-in-circle" ? 140 : simPolicy.id === "eq-usgs-pga" ? 75 : 100}
                  step="1"
                  value={simTriggerMetric}
                  onChange={(e) => setSimTriggerMetric(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                  Reporting Oracle: <strong>{simPolicy.oracleAgency}</strong>
                </p>
              </div>

              {/* 4. Trigger Model Switcher */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 font-sans block">
                  4. Structure Model:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setSimModelType("stepped")}
                    className={`p-2.5 rounded-xl border font-bold transition text-left cursor-pointer ${
                      simModelType === "stepped"
                        ? "bg-sky-600 text-white border-sky-600 shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div>Stepped Bracket</div>
                    <div className="text-[9.5px] opacity-80 font-normal">Standard 25/50/80/100% tiers</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimModelType("linear")}
                    className={`p-2.5 rounded-xl border font-bold transition text-left cursor-pointer ${
                      simModelType === "linear"
                        ? "bg-sky-600 text-white border-sky-600 shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div>Continuous Linear</div>
                    <div className="text-[9.5px] opacity-80 font-normal">Interpolated payout curve</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Simulator Output Deck (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Primary Payout Confirmation Card */}
              <div className={`p-6 rounded-2xl border text-white transition-all shadow-sm ${
                simCalculation.triggerStatus === "full" ? "bg-slate-900 border-emerald-500/50" :
                simCalculation.triggerStatus === "partial" ? "bg-slate-900 border-sky-500/50" :
                "bg-slate-900 border-slate-700/60"
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
                      Live Trigger Evaluation Result
                    </span>
                    <span className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded ${
                      simCalculation.triggerStatus === "full" ? "bg-emerald-400 text-slate-950" :
                      simCalculation.triggerStatus === "partial" ? "bg-sky-400 text-slate-950" :
                      "bg-slate-700 text-slate-200"
                    }`}>
                      {simCalculation.triggerStatus === "full" ? "100% FULL PAYOUT" :
                       simCalculation.triggerStatus === "partial" ? `${simCalculation.payoutPercent}% TRIGGER BREACHED` :
                       "NO PAYOUT (BELOW THRESHOLD)"}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-300">
                      Automated Parametric Payout Amount:
                    </h4>
                    <div className="text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-white mt-1">
                      {simCalculation.formattedGross}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-sans">
                      Calculation: <strong>{simCalculation.payoutPercent}%</strong> of ₹{simSumInsured} Cr Limit based on <em>{simCalculation.triggerTierName}</em>.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-sans">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Disbursement Timeframe</span>
                      <strong className="text-emerald-300 font-mono">~{simCalculation.settlementDays} Days automated wire</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Loss Adjuster Deductions</span>
                      <strong className="text-white font-mono">₹0.00 (Zero Fee)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Timeline: Parametric vs Traditional Indemnity */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <span className="text-xs font-bold text-slate-900 font-sans uppercase font-mono tracking-wider block">
                  Speed-to-Cash Liquidity Comparison:
                </span>

                <div className="space-y-3 font-sans text-xs">
                  {/* Parametric Track */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <strong className="text-emerald-950 font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" />
                        Swiss Re Parametric Model:
                      </strong>
                      <span className="font-mono font-bold text-emerald-700">
                        {simCalculation.settlementDays} Days Total
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-emerald-800">
                      <span className="bg-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Day 1</span> Event Occurs →
                      <span className="bg-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Day 3</span> Oracle Validates →
                      <span className="bg-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Day {simCalculation.settlementDays}</span> Wire Transfer
                    </div>
                  </div>

                  {/* Traditional Indemnity Track */}
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 opacity-90">
                    <div className="flex justify-between items-center">
                      <strong className="text-rose-950 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        Traditional Indemnity Claim:
                      </strong>
                      <span className="font-mono font-bold text-rose-700">
                        180 – 365+ Days
                      </span>
                    </div>
                    <div className="text-[10.5px] text-rose-800 leading-relaxed">
                      Surveyor appointment (Wk 2) → Site visits (Wk 6) → Forensic books audit (Mth 4) → Depreciation disputes (Mth 7) → Arbitrations & Final Release (Mth 12+).
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 font-sans leading-relaxed border border-slate-200">
                  💡 <strong>Swiss Re Key Insight:</strong> Parametric insurance does not replace indemnity for rebuilding factories—it operates in tandem as a <em>liquidity accelerator</em> to fund emergency payroll, supplier advance payments, and customer retention during the first 90 days of catastrophe.
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW MODE 3: INDEMNITY VS PARAMETRIC COMPARATIVE MATRIX
          ========================================================================= */}
      {activeViewMode === "comparator" && (
        <div className="space-y-6 animate-fade-in" id="parametric-comparator-section">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="font-extrabold text-base text-slate-900 font-sans">
              Structural Comparison: Traditional Indemnity vs. Parametric Solutions
            </h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Adapted directly from <strong>Gianni Biason's Swiss Re Tour de Raison</strong> presentation. Examine how index-based triggers eliminate claims disputes and address previously uninsurable business continuity risks.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="p-4 w-1/4">Structural Dimension</th>
                  <th className="p-4 w-1/3 text-rose-700 bg-rose-50/60">Traditional Indemnity Insurance</th>
                  <th className="p-4 w-1/3 text-sky-700 bg-sky-50/60">Swiss Re Parametric Solutions</th>
                  <th className="p-4 w-1/6 text-slate-700">Strategic Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[12px]">
                {INDEMNITY_VS_PARAMETRIC.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-900 font-sans">
                      {item.dimension}
                    </td>
                    <td className="p-4 text-slate-600 bg-rose-50/30 leading-relaxed">
                      {item.indemnity}
                    </td>
                    <td className="p-4 text-slate-800 font-medium bg-sky-50/30 leading-relaxed">
                      {item.parametric}
                    </td>
                    <td className="p-4 font-mono font-bold text-[11px] text-emerald-600">
                      {item.winner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900 block">1. The "Pure Fortuity" Pillar</span>
              <p className="text-slate-600 leading-relaxed">
                Parametric insurance contracts are legally structured to require an underlying insurable interest, ensuring compliance with global insurance regulatory mandates rather than speculative financial derivatives.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900 block">2. Managing Basis Risk</span>
              <p className="text-slate-600 leading-relaxed">
                Basis risk—the chance that an event triggers without loss, or a loss occurs without triggering—is minimized using dual triggers, tight geographic micro-corridors, and high-density weather station networks.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900 block">3. Corporate Solvency Shield</span>
              <p className="text-slate-600 leading-relaxed">
                By delivering millions in cash within days, parametric insurance prevents post-disaster credit rating downgrades, covenant defaults on senior loans, and supplier flight during the rehabilitation window.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW MODE 4: SWISS RE ANATOMY & CORE PRINCIPLES
          ========================================================================= */}
      {activeViewMode === "principles" && (
        <div className="space-y-6 animate-fade-in" id="parametric-principles-section">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="font-extrabold text-base text-slate-900 font-sans">
              Anatomy of a Parametric Solution (Swiss Re Engineering Guide)
            </h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Gianni Biason's Swiss Re methodology defines four mandatory pillars required to construct any viable parametric insurance contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
              <div className="p-2.5 w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-700 font-bold">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                The Index (Parameter)
              </h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Must be an objective physical variable (wind speed, ground acceleration, river height, precipitation mm, solar radiation) that closely correlates with economic hardship.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
              <div className="p-2.5 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                Independent Oracle
              </h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Data must be monitored and published by an independent, disinterested third-party scientific institution (USGS, NOAA, IMD, ECMWF, Copernicus) without insurer or buyer influence.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
              <div className="p-2.5 w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-bold">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                Payout Matrix
              </h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                A pre-agreed mathematical schedule defining the exact cash payout as a function of the parameter breach (e.g. 35% at Category 3, 100% at Category 5), leaving zero room for subjective dispute.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
              <div className="p-2.5 w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                Insurable Interest
              </h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                The insured party must demonstrate ongoing physical operations, commercial risk, or economic vulnerability within the designated geographic polygon to confirm legality under insurance contract law.
              </p>
            </div>

          </div>

          {/* Source Document Citation Box */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <h4 className="font-bold text-sm font-sans">
                Official Regulatory Citation & Document Source
              </h4>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              This repository is architected upon the published technical paper: <strong>"Biason - Parametric Solutions.pdf"</strong> by Gianni Biason, Head of Parametric and Emerging Solutions, Swiss Re Tour de Raison.
            </p>
            <div className="pt-1">
              <a
                href={SWISS_RE_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 underline break-all inline-flex items-center gap-1.5"
              >
                <span>{SWISS_RE_SOURCE_URL}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
