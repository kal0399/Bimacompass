/**
 * Policy Matchmaker & Statutory AIFT Underwriting Database
 * Grounded in All India Fire Tariff (AIFT), IRDAI Master Circulars, and Indian Public Domain Standards
 */

export interface AIFTOccupancy {
  id: string;
  name: string;
  section: string;
  tacRef: string;
  hazardGrade: "Low" | "Medium" | "High" | "Extra High";
  baseFlexaRatePerMille: number; // ₹ per 1000 SI
  description: string;
  keyPerils: string[];
  mandatoryWarranties: string[];
  feaEligibility: string;
}

export interface StatutoryFirePolicyType {
  id: string;
  name: string;
  hindiName: string;
  sumInsuredRange: string;
  minSI: number; // in Crores
  maxSI: number; // in Crores
  irdaiRef: string;
  targetUser: string;
  inBuiltPerils: string[];
  inBuiltAddons: string[];
  underinsuranceWaiverPercent: number; // e.g., 15% waiver (waiver up to 85% value)
  deductible: string;
  keyFeatures: string[];
  description: string;
}

export interface IRDAIReferenceResource {
  id: string;
  title: string;
  category: "Fire & Property" | "Health & Mediclaim" | "Marine & Transit" | "Liability & Cyber" | "Statutory Acts";
  authority: string;
  gazetteRef: string;
  effectiveDate: string;
  summary: string;
  keyConsumerClauses: string[];
  officialPublicDomainNote: string;
}

export const STATUTORY_FIRE_POLICIES: StatutoryFirePolicyType[] = [
  {
    id: "bgr",
    name: "Bharat Griha Raksha (BGR)",
    hindiName: "भारत गृह रक्षा",
    sumInsuredRange: "All Home Dwellings (Any SI / Typically up to ₹5 Cr)",
    minSI: 0,
    maxSI: 5,
    irdaiRef: "IRDAI/NL/GDL/MISC/004/01/2021",
    targetUser: "Individual Homeowners, Flat Owners, Residential Housing Societies, Tenants",
    inBuiltPerils: [
      "Fire, Lightning, Explosion & Implosion (FLEXA)",
      "Storm, Cyclone, Typhoon, Tempest, Hurricane, Tornado, Flood & Inundation (STFI)",
      "Earthquake (EQ) per IS 1893 seismic zoning",
      "Landslide & Rockslide",
      "Terrorism damage cover (in-built with zero extra premium)",
      "Impact damage by road vehicles, trains, or animals",
      "Bursting/overflowing of domestic water tanks & pipes",
      "Bush fire, Forest fire, and Jungle fire"
    ],
    inBuiltAddons: [
      "Automatic 20% of Building SI for General Home Contents (without line-item declaration)",
      "Loss of Rent & Rent for Alternative Accommodation (up to ₹1 Lakh or actuals)",
      "Architects, Surveyors & Consulting Engineers Fees (up to 5% of claim value)",
      "Removal of Debris expenses (up to 2% of claim value)"
    ],
    underinsuranceWaiverPercent: 100, // No underinsurance penalty for dwellings
    deductible: "Nil / Zero Deductible on Home Dwelling claims",
    keyFeatures: [
      "Zero underinsurance penalty (Average clause deleted for dwellings)",
      "Automatic waiver for general home contents up to 20% of structure value",
      "Terrorism and Natural Catastrophe covers included by default",
      "Valuable contents (jewelry, curio, art) covered via optional simple declaration"
    ],
    description: "IRDAI mandatory standard home insurance product replacing the legacy Standard Fire policy for residential premises with simplified wording and zero average clause penalty."
  },
  {
    id: "bsus",
    name: "Bharat Sookshma Udyam Suraksha (BSUS)",
    hindiName: "भारत सूक्ष्म उद्यम सुरक्षा",
    sumInsuredRange: "Total Asset SI up to ₹5 Crores (at any one location)",
    minSI: 0,
    maxSI: 5,
    irdaiRef: "IRDAI/NL/GDL/MISC/005/01/2021",
    targetUser: "Micro-enterprises, small retail shops, clinics, tiny workshops, small offices, neighborhood godowns",
    inBuiltPerils: [
      "FLEXA (Fire, Lightning, Explosion/Implosion)",
      "Full STFI (Storm, Flood, Inundation, Cyclone)",
      "Full Earthquake (EQ) per seismic hazard maps",
      "Terrorism peril included as standard",
      "Riot, Strike & Malicious Damage (RSMD)",
      "Subsidence, Landslide & Rockslide",
      "Impact damage, Aircraft damage, Missile testing operations",
      "Bursting or overflowing of water tanks, apparatus and pipes",
      "Leakage from automatic sprinkler installations"
    ],
    inBuiltAddons: [
      "In-built Add-on: Additions, Alterations & Extensions up to 15% of SI",
      "In-built Add-on: Temporary Removal of Stocks up to 10% of stock SI",
      "In-built Add-on: Architects, Surveyors Fees up to 5% of claim value",
      "In-built Add-on: Removal of Debris up to 2% of claim value",
      "In-built Add-on: Stock on Floater Basis allowed across interconnected godowns"
    ],
    underinsuranceWaiverPercent: 15, // Underinsurance up to 15% is completely ignored
    deductible: "₹5,000 for each and every claim (fixed statutory minimum)",
    keyFeatures: [
      "Underinsurance relaxation: If sum insured is at least 85% of actual value, zero penalty is applied",
      "In-built STFI, Earthquake, and Terrorism covers without add-on tariff surcharge",
      "In-built 15% allowance for newly added machines/stocks during the policy term",
      "Simplified proposal form with clear affirmative warranties"
    ],
    description: "Statutory standardized product for micro-enterprises with total asset values (Building + Plant + Machinery + Stocks + FFF) up to ₹5 Crores."
  },
  {
    id: "blus",
    name: "Bharat Laghu Udyam Suraksha (BLUS)",
    hindiName: "भारत लघु उद्यम सुरक्षा",
    sumInsuredRange: "Total Asset SI > ₹5 Crores up to ₹50 Crores (at one location)",
    minSI: 5.01,
    maxSI: 50,
    irdaiRef: "IRDAI/NL/GDL/MISC/006/01/2021",
    targetUser: "Small to medium manufacturing plants, auto dealerships, supermarkets, hotels, packaging factories, logistics hubs",
    inBuiltPerils: [
      "FLEXA (Fire, Lightning, Explosion/Implosion)",
      "STFI (Storm, Tempest, Flood, Inundation, Cyclone)",
      "Earthquake (EQ) per IS 1893 seismic zoning",
      "Terrorism peril standard inclusion",
      "Riot, Strike & Malicious Damage (RSMD)",
      "Impact damage from third-party vehicles, trains, cranes",
      "Subsidence, Landslide, Rockslide",
      "Bursting/overflowing of water reservoirs, piping systems",
      "Accidental leakage from automatic fire sprinkler networks"
    ],
    inBuiltAddons: [
      "In-built 15% Additions, Alterations & Capital Additions cover",
      "In-built 10% Temporary Removal of Machinery & Stocks for repair/processing",
      "In-built 5% Professional Surveyors and Consulting Engineers Fees",
      "In-built 2% Site Clearance & Debris Removal expenses",
      "In-built 10% Start-up / Re-commissioning expenses"
    ],
    underinsuranceWaiverPercent: 15, // 15% underinsurance buffer
    deductible: "₹10,000 or 5% of claim amount (whichever is less) for non-industrial / ₹25,000 for industrial risks",
    keyFeatures: [
      "Mandatory for all risk locations with sum insured between ₹5 Cr and ₹50 Cr",
      "No separate STFI / EQ / Terrorism endorsement required - in-built coverage",
      "Reinstatement Value Clause (RVC) applicable for buildings and plant machinery",
      "Escalation clause (up to 25%) and Floater stock options available as standard riders"
    ],
    description: "The statutory IRDAI standard product covering small and mid-market enterprises against fire and special perils with uniform policy terms across all Indian general insurers."
  },
  {
    id: "sfsp",
    name: "Standard Fire & Special Perils (SFSP / Mid-Corporate)",
    hindiName: "मानक अग्नि एवं विशेष जोखिम पॉलिसी",
    sumInsuredRange: "Total Asset SI > ₹50 Crores up to ₹2,500 Crores",
    minSI: 50.01,
    maxSI: 2500,
    irdaiRef: "TAC All India Fire Tariff (AIFT) Section 1 - 8 Rules",
    targetUser: "Mid-to-large industrial manufacturers, heavy chemical complexes, steel mills, textile conglomerates, enterprise tech parks",
    inBuiltPerils: [
      "FLEXA (Fire, Lightning, Explosion/Implosion per Section 3 AIFT)",
      "Optional / Endorsement: STFI Perils (per AIFT storm tariff)",
      "Optional / Endorsement: Earthquake Fire & Shock (IS 1893 Zone II - V)",
      "RSMD (Riot, Strike, Malicious Damage)",
      "Aircraft damage, Impact damage, Missile testing",
      "Subsidence and Landslide including Rockslide",
      "Bursting and/or overflowing of Water Tanks, Apparatus and Pipes"
    ],
    inBuiltAddons: [
      "Reinstatement Value Clause (RVC) - Condition 9",
      "Architects / Surveyors Fees Clause (up to 3% or 5% endorsed)",
      "Debris Removal Endorsement (up to 1% statutory or higher declared)",
      "Designation of Property Clause",
      "Agreed Bank Clause (for loan collateral assets)"
    ],
    underinsuranceWaiverPercent: 0, // Strict Condition 10 (Pro-rata Average Clause)
    deductible: "Statutory 5% of claim subject to minimum ₹1 Lakh to ₹5 Lakhs depending on SI band",
    keyFeatures: [
      "Subject to detailed AIFT occupancy rate matrices (Section 4 Industrial, Section 5 Storage, Section 6 Utility)",
      "Eligible for statutory Fire Extinguishing Appliances (FEA) discounts (5% to 25%)",
      "Strict pro-rata average underinsurance condition (Condition 10)",
      "Consequential Business Interruption / Loss of Profits (FLOP) written as a separate accompanying section"
    ],
    description: "Standard industrial fire tariff coverage governing mid-to-large corporates with precise occupancy classification, FEA discount schedules, and risk warranties."
  },
  {
    id: "iar",
    name: "Industrial All Risks (IAR) / Mega Risk Treaty",
    hindiName: "औद्योगिक सर्व-जोखिम (IAR) एवं मेगा रिस्क",
    sumInsuredRange: "Total Asset SI > ₹100 Crores (IAR threshold) or > ₹2,500 Crores (Mega Risks)",
    minSI: 100,
    maxSI: 10000,
    irdaiRef: "TAC Industrial All Risks Tariff & Global Reinsurance Treaty Guidelines",
    targetUser: "Mega refineries, power generation plants, automotive mega-factories, pharmaceutical campuses, semiconductor fabs",
    inBuiltPerils: [
      "Section I: Material Damage (All sudden, accidental physical loss or damage from ANY cause not specifically excluded)",
      "Section II: Business Interruption / Fire Loss of Profits (FLOP) & Machinery Loss of Profits (MLOP)",
      "Machinery Breakdown (MBD) & Boiler Explosion in-built under unified treaty",
      "Comprehensive Natural Catastrophes (Flood, Inundation, Cyclone, Earthquake)",
      "Terrorism and Political Violence (Indian Market Terrorism Pool / GIC Re)"
    ],
    inBuiltAddons: [
      "Reinstatement Value Clause on new replacement cost basis",
      "Supplier's and Customer's Premises Extension (Interdependency BI)",
      "Public Utilities (Electricity/Gas/Water) Failure Extension",
      "Prevention of Access / Ingress-Egress clause",
      "Expediting Expenses, Air Freight & Overtime Labor",
      "Professional Fees, Brand Protection & Minor Works"
    ],
    underinsuranceWaiverPercent: 10, // 85% - 90% average margin
    deductible: "Bespoke time excess (7 - 14 days for BI) and monetary deductibles (₹5 Lakhs to ₹50 Lakhs)",
    keyFeatures: [
      "All-Risks umbrella wording (reverses burden of proof onto insurer for exclusions)",
      "Unifies Property Damage, Machinery Breakdown, and Business Interruption in one single document",
      "Mega risks (> ₹2,500 Cr) eligible for bespoke international reinsurance pricing without domestic tariff caps",
      "High capacity risk engineering surveys & statutory thermography inspection audits"
    ],
    description: "The gold standard all-risks package policy for large industrial enterprises combining material damage, machinery breakdown, and operational business interruption under one treaty."
  }
];

export const AIFT_OCCUPANCIES: AIFTOccupancy[] = [
  {
    id: "chemical_petro",
    name: "Petrochemicals, Solvent Distillation & Organic Bulk Synthetics",
    section: "AIFT Section 5 - Special Hazardous Chemical Risks",
    tacRef: "TAC AIFT Section 5, Item 18 (Chemical Tariff)",
    hazardGrade: "Extra High",
    baseFlexaRatePerMille: 2.80,
    description: "Exothermic synthesis reactors, solvent extraction columns, distillation towers, and flammable volatile chemical storage tanks.",
    keyPerils: ["Flash fire from vapor cloud", "Exothermic runaway reaction", "Boiling Liquid Expanding Vapor Explosion (BLEVE)", "Toxic fumes release", "Spontaneous combustion"],
    mandatoryWarranties: [
      "TAC Hazardous Goods Storage Rule: Bulk solvents stored in diked compound at minimum 15m safety distance",
      "Flameproof / Explosion-proof electrical equipment (IS/IEC 60079 Zone 1 / Zone 2 certification)",
      "Static electricity grounding and bonding continuous copper conductors on all transfer pipes",
      "Daily gas leakage monitoring & catalytic combustible vapor detectors linked to alarm matrix"
    ],
    feaEligibility: "Mandatory: Deluge water spray system (IS 15325) + Nitrogen blanketing + Foam monitors (25% FEA max rebate)"
  },
  {
    id: "textiles_spinning",
    name: "Textile Spinning, Weaving Mills & Ginning Factories",
    section: "AIFT Section 4 - Industrial Manufacturing Occupancies",
    tacRef: "TAC AIFT Section 4, Item 09 (Textile Group II)",
    hazardGrade: "High",
    baseFlexaRatePerMille: 1.65,
    description: "High-speed blow room machinery, carding frames, ring frames, yarn godowns, and finished cotton fabric warehouses.",
    keyPerils: ["Rapid flash fire over cotton lint fibers", "Friction sparks in high-speed carding machines", "Spontaneous heating in stacked raw cotton bales", "Heavy water damage from firefighting efforts"],
    mandatoryWarranties: [
      "Blow room magnetic separators & spark detection / infrared abort damper systems",
      "Daily shift cleaning of combustible fiber lint from ceilings, trusses, and motor casings",
      "No open flame heating or halogen lighting in raw cotton storage yards",
      "Stacking rule: Minimum 1 meter aisle space and 1.5m clearance from roof sprinklers"
    ],
    feaEligibility: "High-density automatic sprinkler system (IS 15105) + Internal yard hydrant ring main (20% - 25% FEA discount)"
  },
  {
    id: "data_center_it",
    name: "Enterprise Data Centers, Tech Parks & IT Campuses",
    section: "AIFT Section 3 - Non-Industrial & Commercial Establishments",
    tacRef: "TAC AIFT Section 3, Item 04 (Offices & Server Rooms)",
    hazardGrade: "Low",
    baseFlexaRatePerMille: 0.45,
    description: "High-density server racks, enterprise cloud infrastructure, UPS battery rooms, precision air conditioning (PAC), and fiber optic risers.",
    keyPerils: ["Lithium-ion / Lead-acid UPS battery thermal runaway", "Electrical short circuit in cable trays", "Water ingress into server bays", "Air-conditioning HVAC duct smoke spread"],
    mandatoryWarranties: [
      "Very Early Warning Aspirating Smoke Detection (VESDA) inside raised floors and ceiling voids",
      "Clean agent gas flooding (NOVEC 1230 / FM-200 / Inergen) in enclosed server halls",
      "2-hour fire-rated partition walls separating battery rooms and generator enclosures",
      "Annual thermographic infrared imaging of all Main Low Tension (LT) power distribution panels"
    ],
    feaEligibility: "Gas flooding clean agent systems + Pre-action dry pipe sprinklers + IS 2190 portable CO2 units (25% FEA discount)"
  },
  {
    id: "cold_storage_food",
    name: "Refrigerated Cold Storages, Food Processing & Ammonia Plants",
    section: "AIFT Section 6 - Storage & Warehouse Occupancies",
    tacRef: "TAC AIFT Section 6, Item 12 (Cold Storages Tariff)",
    hazardGrade: "Medium",
    baseFlexaRatePerMille: 1.15,
    description: "Perishable fruit, vegetable, meat and seafood storage chambers with ammonia refrigerant compressors and insulated PUF/EPS sandwich panels.",
    keyPerils: ["Combustible PUF/EPS insulation panel fire propagation", "Ammonia refrigerant gas leakage causing stock poisoning", "Power breakdown leading to chamber temperature rise", "Machinery breakdown of refrigeration compressors"],
    mandatoryWarranties: [
      "Insulation panel fire safety: Use of FM-approved or PIR fire-retardant sandwich panels",
      "Ammonia gas emergency exhaust scrubbing system and water washdown curtain",
      "Stock log maintenance with weekly thermometer logbook and power backup generator testing",
      "Deterioration of Stocks (DOS) extension requiring operational temperature recorder charts"
    ],
    feaEligibility: "Internal & external yard hydrant network + Standby diesel fire pump (15% - 20% FEA discount)"
  },
  {
    id: "engineering_machining",
    name: "Heavy Engineering, Metal Fabrication & Auto Ancillary Units",
    section: "AIFT Section 4 - Light & Heavy Engineering Works",
    tacRef: "TAC AIFT Section 4, Item 22 (Metal Working Occupancies)",
    hazardGrade: "Medium",
    baseFlexaRatePerMille: 0.85,
    description: "CNC machining centers, casting foundries, hydraulic presses, welding bays, paint spray booths, and tool rooms.",
    keyPerils: ["Welding / cutting slag hot work sparks", "Hydraulic high-pressure oil line rupture & spray fire", "Paint booth solvent vapor explosion", "Electrical transformer failure"],
    mandatoryWarranties: [
      "Hot Work Permit System mandatory for any open flame cutting, grinding, or welding",
      "Paint spray booths with spark-proof exhaust fans and automatic dry powder / water deluge",
      "Transformer yard with 2-hour fire barrier baffle wall and oil soak pit with gravel fill",
      "Regular inspection and ultrasonic testing of overhead crane wire ropes and hydraulic hoses"
    ],
    feaEligibility: "Yard hydrant system with diesel pump + IS 2190 DCP/CO2 portable extinguishers (15% - 20% FEA discount)"
  },
  {
    id: "paper_printing",
    name: "Paper Mills, Corrugated Box Plants & High-Density Printing",
    section: "AIFT Section 4 - Paper & Pulp Industrial Tariff",
    tacRef: "TAC AIFT Section 4, Item 14 (Paper & Board Mills)",
    hazardGrade: "High",
    baseFlexaRatePerMille: 1.95,
    description: "Waste paper storage yards, pulpers, fourdrinier paper machines, steam heated drying cylinders, and corrugated packaging box printing lines.",
    keyPerils: ["Rapid burning of dry stacked waste paper reels", "Friction sparks in calendar rollers and slitters", "Steam pipe bursting and overheating", "Warehouse flue space fires"],
    mandatoryWarranties: [
      "Outdoor waste paper yard: Stacks limited to 4m height with 6m firebreaks between stack rows",
      "Prohibition of smoking, open lights, or mobile phones inside raw paper godowns",
      "Weekly cleaning of combustible paper dust from overhead roof trusses and crane girders",
      "Dedicated overhead water storage tank for fire systems with minimum 4 hours pumping capacity"
    ],
    feaEligibility: "Full automatic high-density sprinkler system + Hydrant network (20% - 25% FEA discount)"
  },
  {
    id: "general_godowns",
    name: "Logistics Warehouses & General Merchandise Godowns",
    section: "AIFT Section 6 - Storage & Warehousing",
    tacRef: "TAC AIFT Section 6, Item 01 (General Storage Godowns)",
    hazardGrade: "Medium",
    baseFlexaRatePerMille: 0.90,
    description: "Multi-tier racked warehouses, distribution centers, palletized consumer goods, electronics, and non-hazardous freight terminals.",
    keyPerils: ["Racked storage chimney effect accelerating vertical fire spread", "Battery charging station fires from electric forklifts", "Overloading of electrical distribution boards", "Water damage to dry boxed cargo"],
    mandatoryWarranties: [
      "Racked storage: In-rack sprinkler heads for racks exceeding 6.5 meters height (NFPA 13 / IS 15105)",
      "Designated battery charging room with explosion-proof ventilation and eye wash stations",
      "Strict clearance rule: Minimum 1 meter clearance between stack top and electrical luminaires",
      "Night patrol watchman log with RFID electronic checkpoint verification"
    ],
    feaEligibility: "Early Suppression Fast Response (ESFR) sprinklers + Yard hydrants (20% - 25% FEA discount)"
  },
  {
    id: "pharmaceutical_formulation",
    name: "Pharmaceutical Formulations, API Synthesis & Clean Rooms",
    section: "AIFT Section 4 - Pharmaceutical Industrial Tariff",
    tacRef: "TAC AIFT Section 4, Item 31 (Pharmaceuticals)",
    hazardGrade: "Medium",
    baseFlexaRatePerMille: 1.10,
    description: "Tablet compression suites, sterile injectable clean rooms, solvent coating pans, fluid bed dryers (FBD), and bulk API synthesis lines.",
    keyPerils: ["Fluid Bed Dryer static electricity dust explosion", "Solvent vapor flash in tablet coating pans", "Decontamination loss in clean room air handling units (AHU)", "Batch contamination following smoke ingress"],
    mandatoryWarranties: [
      "Grounding and anti-static interlocks on all Fluid Bed Dryers (FBD) and powder blenders",
      "Explosion venting panels routed safely to building exterior for dust processing rooms",
      "Clean room smoke dampers with automatic HVAC shutdown on duct smoke detector trigger",
      "Reinstatement Value Clause with validation cost extension for GMP clean room re-certification"
    ],
    feaEligibility: "Clean agent gas flooding in server & lab rooms + Sprinklers in warehouses (20% - 25% FEA discount)"
  }
];

export const FEA_DISCOUNT_TIERS = [
  {
    id: "fea_0",
    name: "No Fire Extinguishing Appliance (0%)",
    standard: "None / Inadequate",
    discountPercent: 0,
    criteria: "Premises with only basic water buckets or non-standard uncertified portable cylinders.",
    tacNorm: "No statutory rebate granted under AIFT Section 1."
  },
  {
    id: "fea_5",
    name: "Hand Appliances & Portable Units (5%)",
    standard: "IS 2190:2010 Certification",
    discountPercent: 5,
    criteria: "Sufficient number of ISI-marked ABC Dry Chemical Powder, CO2, or Foam extinguishers distributed per floor area.",
    tacNorm: "Minimum 1 extinguisher of 9-liter/6kg capacity per 200 sq.m of floor area with annual refilling audit."
  },
  {
    id: "fea_15",
    name: "External Yard Hydrants & Hose Reels (15%)",
    standard: "IS 3844 & TAC Fire Protection Manual",
    discountPercent: 15,
    criteria: "Ring main piping around the entire installation with pressurized hydrant landing valves, canvas fire hoses, branch pipes, and a dedicated diesel engine standby pump.",
    tacNorm: "Minimum water reservoir capacity of 100,000 to 250,000 liters with electric pump (2,850 lpm) + 100% diesel backup."
  },
  {
    id: "fea_25",
    name: "Full Automatic Sprinkler Network + Hydrants (25%)",
    standard: "IS 15105 / NFPA 13 / TAC Sprinkler Rules",
    discountPercent: 25,
    criteria: "Complete automatic wet-pipe quartzoid bulb sprinkler system throughout all processing and storage floors, combined with external yard hydrants and dual high-capacity pumps.",
    tacNorm: "Automatic alarm valve, water flow switches linked to fire control panel, continuous 100% water supply for 90 minutes."
  }
];

export const PUBLIC_DOMAIN_RESOURCES: IRDAIReferenceResource[] = [
  {
    id: "res_health_master_2024",
    title: "IRDAI Master Circular on Health Insurance (June 2024)",
    category: "Health & Mediclaim",
    authority: "Insurance Regulatory and Development Authority of India (IRDAI)",
    gazetteRef: "IRDAI/HLT/CIR/06/2024 (Master Circular Ref No. 2024/06)",
    effectiveDate: "June 2024 (Mandatory Nationwide Implementation)",
    summary: "Landmark regulatory overhaul prioritizing consumer protection, eliminating artificial claim deductions, mandating nationwide cashless access, and capping pre-existing disease waiting periods.",
    keyConsumerClauses: [
      "Cashless Everywhere Protocol: Insurers must process cashless authorization at ANY registered hospital in India within 1 hour of request submission.",
      "Final Claim Discharge within 3 Hours: Hospital discharge authorization must be delivered by TPA/Insurer within 3 hours of receiving final discharge papers.",
      "PED Waiting Period Capped at 36 Months: Maximum Pre-Existing Disease waiting period reduced from 48 months to 36 months across all retail health policies.",
      "Moratorium Period of 60 Months (5 Years): Once a health policy has completed 5 continuous renewal years without fraud, the insurer cannot dispute or reject claims on grounds of non-disclosure.",
      "No Age Limit on Health Insurance Entry: Complete abolition of the age bar (previously 65 years); insurers must offer products for senior citizens of any age.",
      "100% AYUSH Parity: Hospitalization under Ayurveda, Yoga, Unani, Siddha, and Homeopathy must be reimbursed on equal terms as allopathic treatments."
    ],
    officialPublicDomainNote: "Published for public consumer guidance under Section 34 of the Insurance Act 1938 and IRDAI (Protection of Policyholders' Interests) Regulations."
  },
  {
    id: "res_fire_standard_2021",
    title: "IRDAI Guidelines on Standard Fire & Special Perils Products",
    category: "Fire & Property",
    authority: "Tariff Advisory Committee (TAC) & IRDAI",
    gazetteRef: "IRDAI/NL/GDL/MISC/004-006/01/2021",
    effectiveDate: "April 1, 2021 (All Indian Non-Life General Insurers)",
    summary: "Replaced the legacy 2001 Standard Fire policy with three consumer-centric standardized contracts: Bharat Griha Raksha, Bharat Sookshma Udyam Suraksha, and Bharat Laghu Udyam Suraksha.",
    keyConsumerClauses: [
      "In-Built Catastrophe & Terrorism Covers: STFI (Flood/Storm), Earthquake, and Terrorism are standard inclusions without requiring separate add-on endorsements.",
      "Abolition of Average Clause for Dwellings (BGR): Homeowners never face pro-rata underinsurance penalties on structure claims.",
      "15% Underinsurance Waiver for MSMEs (BSUS & BLUS): If actual value is within 85% of sum insured, full loss is settled without deduction.",
      "In-Built Add-Ons: Automatic coverage for 15% plant additions, 10% temporary removal of stocks, and 5% professional consulting fees.",
      "Uniform Wordings: Standardized policy schedules ensure no insurance company can introduce arbitrary restrictive exclusionary fine print."
    ],
    officialPublicDomainNote: "Mandated under Section 14(2)(b) of the IRDA Act 1999 to establish fair baseline standards for home and commercial fire underwriting."
  },
  {
    id: "res_marine_cargo_ilu",
    title: "Institute Cargo Clauses (ICC 1982 / 2009) & Inland Transit Clauses (ITC)",
    category: "Marine & Transit",
    authority: "Joint Cargo Committee (JCC) & General Insurance Council of India",
    gazetteRef: "Institute of London Underwriters (ILU) & ITC Road/Rail Rules",
    effectiveDate: "Standard International Maritime & Inland Trade Practice",
    summary: "The international benchmark clauses governing cargo loss during road, rail, air, and ocean transit, establishing distinct tiers of peril protection.",
    keyConsumerClauses: [
      "Institute Cargo Clauses (A) [All-Risks]: Covers all sudden physical loss or damage to subject-matter cargo, excluding only willful misconduct, ordinary leakage/wear, improper packing, and insolvency.",
      "Institute Cargo Clauses (B): Major accidental casualties (derailment, vessel collision, overturning, fire, earthquake, washing overboard, water ingress).",
      "Institute Cargo Clauses (C): Named catastrophic events only (fire, explosion, stranding, capsizing, collision, discharge at port of distress).",
      "Warehouse-to-Warehouse Transit Clause: Protection attaches from the moment goods leave the warehouse named in policy until delivery at destination consignee warehouse.",
      "110% CIF Valuation Rule: Statutory sum insured declared at 110% of Cost + Insurance + Freight to cover buyer profit margins and inland taxes."
    ],
    officialPublicDomainNote: "Incorporated into standard Indian marine transit insurance policies under the Marine Insurance Act 1963."
  },
  {
    id: "res_employees_comp_act",
    title: "Employee's Compensation Act, 1923 (Amended 2020 Rules)",
    category: "Statutory Acts",
    authority: "Ministry of Labour and Employment, Government of India",
    gazetteRef: "Act No. 8 of 1923; Gazette S.O. 71(E) Wage Ceiling Revision",
    effectiveDate: "Statutory Labor Legislation (All Indian Commercial Establishments)",
    summary: "Mandates employer compensation liability for workplace accidental injuries, occupational diseases, temporary disablement, and death arising out of and in the course of employment.",
    keyConsumerClauses: [
      "Table A (Statutory Compensation): Fatal Accident = 50% of monthly wages × relevant age factor (subject to minimum statutory floor).",
      "Permanent Total Disablement (PTD): 60% of monthly wages × age factor (subject to statutory minimum).",
      "Table B (Common Law Negligence): Covers civil court employer negligence damages and legal defense costs above statutory limits.",
      "Section 12 (Contractor Liability): Principal employer remains strictly liable for subcontractor workforce injuries on company premises.",
      "Occupational Disease Schedule III: Silicosis, asbestosis, lead poisoning, and hearing loss from factory noise covered under statutory injury definitions."
    ],
    officialPublicDomainNote: "Public welfare statute enforceable through state Employee's Compensation Commissioners across India."
  },
  {
    id: "res_dpdp_cyber_2023",
    title: "Digital Personal Data Protection (DPDP) Act & Cyber Insurance",
    category: "Liability & Cyber",
    authority: "Ministry of Electronics and Information Technology (MeitY)",
    gazetteRef: "Act No. 22 of 2023 (DPDP Act Gazette Notification)",
    effectiveDate: "August 2023 (Enacted by Parliament of India)",
    summary: "Establishes heavy monetary penalties (up to ₹250 Crores per incident) on data fiduciaries for security failures leading to personal data leaks, driving corporate cyber liability risk transfer.",
    keyConsumerClauses: [
      "Mandatory Data Breach Notification: Organizations must notify Data Protection Board of India (DPBI) and affected individuals upon discovering data breach.",
      "Cyber Insurance Coverage Tiers: First-party losses (forensic investigation, ransom extortion negotiations, system restoration, crisis PR).",
      "Third-Party Liability: Regulatory fines defense costs, customer litigation indemnity, and privacy class-action settlements.",
      "E&O Retroactive Continuity: Professional Indemnity policies must maintain retroactive dates to cover undisclosed past software vulnerabilities."
    ],
    officialPublicDomainNote: "Enacted statutory framework regulating digital data security and corporate governance in India."
  },
  {
    id: "res_insurance_act_1938",
    title: "Insurance Act 1938: Section 45 & Section 64VB Consumer Protections",
    category: "Statutory Acts",
    authority: "Government of India / Ministry of Finance",
    gazetteRef: "Insurance Laws (Amendment) Act 2015",
    effectiveDate: "Foundational Insurance Legislation",
    summary: "The primary legislative foundation safeguarding consumer rights against arbitrary policy cancellations, claim repudiations, and defining premium collection compliance.",
    keyConsumerClauses: [
      "Section 45 (Incontestability Rule): No policy of insurance can be called into question or cancelled by an insurer after 3 continuous years on ANY grounds (including misstatement).",
      "Section 64VB (Advance Premium Warranty): Risk commences only upon actual receipt of premium payment; prevents insurers from denying coverage if premium was banked before loss date.",
      "Insurance Ombudsman Rules 2017: Free, impartial statutory dispute resolution mechanism binding on insurers for claims up to ₹30 Lakhs."
    ],
    officialPublicDomainNote: "Statutory rights enforceable in Consumer Commissions, High Courts, and Insurance Ombudsman Forums."
  }
];

export const INSURANCE_DOMAINS_LIST = [
  {
    id: "commercial_fire",
    label: "AIFT Commercial Property & Fire Tariff",
    badge: "AIFT / TAC Standard",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
    tag: "Commercial Asset",
    desc: "Bharat Griha Raksha, Bharat Sookshma, Bharat Laghu, SFSP, and Industrial All Risks (IAR) with TAC Section 1–8 occupancy rates.",
    highlights: ["BGR / BSUS / BLUS Statutory Policies", "FEA Extinguishing Rebate (5% - 25%)", "Earthquake IS 1893 & STFI Perils", "Average Clause Underinsurance Rules"]
  },
  {
    id: "engineering_ear_car",
    label: "Engineering Project Risks (CAR & EAR)",
    badge: "Munich Re / TAC",
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
    tag: "Industrial Project",
    desc: "Contractor's All Risks (CAR) for civil infrastructure and Erection All Risks (EAR) for machinery plant installation and hot testing.",
    highlights: ["Section I Material Damage & Section II TPL", "72-Hour Catastrophe Event Clause", "Hot Testing & Commissioning Period Cover", "Extended Maintenance Warranty (12-24 Mo)"]
  },
  {
    id: "retail_health",
    label: "Personal & Family Retail Health (IRDAI 2024)",
    badge: "IRDAI 2024 Circular",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
    tag: "Retail Line",
    desc: "Individual & Family Floater health insurance optimized against room-rent caps, 100% cashless nationwide, and PED reduction rules.",
    highlights: ["No Room-Rent Proportional Deductions", "Cashless Everywhere Protocol", "36-Month Max PED Moratorium", "AYUSH Hospitalization 100% Parity"]
  },
  {
    id: "marine_transit",
    label: "Marine Cargo Transit & Inland Logistics",
    badge: "ICC / ITC Standards",
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300",
    tag: "Logistics",
    desc: "Institute Cargo Clauses (ICC A/B/C) and Inland Transit (ITC A/B/C) covering road, rail, ocean, and air freight shipments.",
    highlights: ["Institute Cargo Clauses (A) All-Risks", "Warehouse-to-Warehouse Clause", "110% CIF Valuation Formula", "General Average Maritime Salvage"]
  },
  {
    id: "workmen_comp",
    label: "Workforce Liabilities (Employee's Comp Act)",
    badge: "EC Act 1923 / 2020",
    color: "from-cyan-500/20 to-sky-500/10 border-cyan-500/40 text-cyan-300",
    tag: "Statutory Employer",
    desc: "Statutory Table A and Common Law Table B defense protecting plant workers, warehouse crew, and contractor labor.",
    highlights: ["Table A Statutory Injury Wage Formulas", "Table B Employer Negligence Civil Defense", "Section 12 Subcontractor Extension", "Accidental Medical Reimbursement (AMER)"]
  },
  {
    id: "corp_liability",
    label: "Cyber Risk, Tech E&O & Board D&O",
    badge: "DPDP 2023 & CGL",
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300",
    tag: "Corporate Liability",
    desc: "Commercial General Liability (CGL), SaaS software Errors & Omissions, DPDP Act 2023 cyber forensics, and Directors & Officers Side A/B/C.",
    highlights: ["DPDP Act 2023 Data Breach Defense", "D&O Personal Asset Shield (Side A/B/C)", "Retroactive Date Coverage Extension", "Commercial General Liability Premises Cover"]
  },
  {
    id: "group_health",
    label: "Corporate Group Health Insurance (GHI)",
    badge: "Corporate Welfare",
    color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-300",
    tag: "Corporate HR",
    desc: "Tailored employer-sponsored healthcare treaties with Day-1 PED waivers, corporate buffer pools, and maternity nursery riders.",
    highlights: ["Day-1 Pre-Existing Disease Waiver", "Corporate Buffer Emergency Pool", "Zero Co-Pay & Executive AC Rooms", "Mental Wellness & Outpatient OPD"]
  },
  {
    id: "group_accident",
    label: "Group Personal Accident (GPA & TTD)",
    badge: "Workforce Safety",
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-300",
    tag: "Employee Safety",
    desc: "24/7 worldwide personal accident protection with Temporary Total Disablement (TTD) 1% weekly salary replacement and air evacuation.",
    highlights: ["1% Weekly TTD Bedridden Salary Support", "Air Ambulance Emergency Evacuation", "Double Payout in Common Carrier Transit", "Child Education Support Lump Sum"]
  }
];
