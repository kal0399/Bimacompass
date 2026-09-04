// Enriched Database Content for BimaCompass
// Compiled directly from the I.I.I. Insurance Handbook PDF

export interface GlossaryRow {
  id: number;
  term: string;
  category: string;
  description: string;
  simple_explanation: string;
  source_page: number;
}

export interface FraudRow {
  id: number;
  pattern: string;
  warning_signs: string[];
  countermeasure: string;
  severity: "HIGH" | "CRITICAL" | "MODERATE";
  caller_claim_type: string;
}

export interface BuyerRightRow {
  id: number;
  title: string;
  stage: "Buying Stage" | "Post-Purchase" | "Claim Time";
  details: string;
  duty: string;
}

export interface ComplaintChannelRow {
  id: number;
  name: string;
  toll_free: string;
  email: string;
  contact_info: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

// 1. Expanded Glossary Table (incorporating actual content from all sections of the PDF)
export const glossaryDatabase: GlossaryRow[] = [
  {
    id: 1,
    term: "Insurance (Risk Transfer)",
    category: "General",
    description: "The primary mechanism for safeguarding individual or business assets by transferring the financial risk of potential loss to an Insurer, which operates as a financial intermediary.",
    simple_explanation: "An agreement where you pay a small regular amount (premium) to an Insurer. In return, if a sudden disaster or accident happens, they pay the massive recovery costs from their collective pool, protecting you from losing your savings.",
    source_page: 1
  },
  {
    id: 2,
    term: "Law of Large Numbers",
    category: "General",
    description: "The mathematical principle of probability upon which the viability of insurance is based. It states that the larger the group of similar insured units, the more accurate the prediction of future losses becomes.",
    simple_explanation: "The secret formula that makes insurance work. If millions of stable people pay tiny sums, predictions of who will have an accident become highly accurate. This lets the company keep enough money cached to cover the unexpected bills of the few who suffer losses.",
    source_page: 105
  },
  {
    id: 3,
    term: "Auto Insurance Basics",
    category: "Motor",
    description: "A contractual financial agreement that covers physical property damage, liability, and medical coverage arising from motor accidents. It is legally mandated in almost all states.",
    simple_explanation: "Your baseline shield on the road. It pays to fix cars, covers injuries, and handles legal claims when a collision occurs so you don't face lawsuits alone.",
    source_page: 3
  },
  {
    id: 4,
    term: "Bodily Injury Liability",
    category: "Motor",
    description: "Auto policy coverage that applies to injuries that the policyholder or family members cause to someone else, protecting personal assets like homes and savings from lawsuit claims.",
    simple_explanation: "If you cause an accident and injure other people, this pays for their hospital stays, surgeries, and recovery. In short: it protects you from being sued for their medical bills.",
    source_page: 3
  },
  {
    id: 5,
    term: "Personal Injury Protection (PIP)",
    category: "Motor",
    description: "A broad first-party medical payment coverage that pays for the treatment of injuries to the driver and passengers of your car, regardless of who is at fault, often covering lost wages and rehabilitation.",
    simple_explanation: "Your personal medical fund. No matter whose fault the crash was, this immediately starts paying for your own injuries and those of your passengers, so you aren't waiting for a courtroom battle to settle.",
    source_page: 3
  },
  {
    id: 6,
    term: "Property Damage Liability",
    category: "Motor",
    description: "Coverage that pays for damage that the policyholder causes to someone else's physical property, such as vehicles, lamp posts, fences, buildings, or other structures.",
    simple_explanation: "This fixes other people's stuff when your car crashes into them. It covers their car repairs, or the cost to rebuild a fence or pole you accidentally struck.",
    source_page: 3
  },
  {
    id: 7,
    term: "Collision Coverage",
    category: "Motor",
    description: "Optional coverage that pays for physical damage to the policyholder's car resulting from colliding with another vehicle or object, or flipping over, sold with a deductible from $250 to $1,000.",
    simple_explanation: "Pays to repair or replace your own vehicle after a crash or roll-over, even if you were the one who caused it. You pay a small set portion (deductible) first, and insurance covers the rest.",
    source_page: 4
  },
  {
    id: 8,
    term: "Comprehensive Auto Coverage",
    category: "Motor",
    description: "Coverage that reimburses loss due to theft or physical damage caused by elements other than direct collision, such as fire, windstorms, hail, floods, earthquakes, falling objects, or animal contact.",
    simple_explanation: "Your 'Acts of Nature' shield. It pays to replace your car if it is stolen, crushed by a tree, flooded, or damaged in a storm.",
    source_page: 4
  },
  {
    id: 9,
    term: "Uninsured/Underinsured Motorist",
    category: "Motor",
    description: "Coverage that reimburses the policyholder or family members if they are struck by a hit-and-run driver or a motorist who carries no liability insurance, or insufficient limits to cover the full loss.",
    simple_explanation: "A safeguard against irresponsible drivers. If a driver with no insurance hits you, or flees the scene, your own policy steps in to pay for your repairs and medical costs.",
    source_page: 4
  },
  {
    id: 10,
    term: "Subrogation",
    category: "General",
    description: "The legal process by which an Insurer, after compensating their policyholder, seeks to recover the payment amount from the third party responsible for causing the loss.",
    simple_explanation: "If someone else damages your car and your insurer pays to fix it, they will legally chase the guilty person's insurer to get their money back. If they succeed, they even refund the deductible you paid!",
    source_page: 4
  },
  {
    id: 11,
    term: "Homeowners Insurance Basics",
    category: "Property/Home",
    description: "A package policy that provides financial protection against disasters, covering both property damage (structure and personal belongings) and personal liability for injuries caused to other people.",
    simple_explanation: "A comprehensive shield for your household. It helps rebuild your home, replace ruined clothes or furniture, and pays the legal bills if a guest slips on your steps and sues you.",
    source_page: 5
  },
  {
    id: 12,
    term: "Structure Coverage (HO-3)",
    category: "Property/Home",
    description: "Part of a homeowner policy that pays to repair or rebuild a house if it is damaged by fire, windstorms, hail, lightning, or other disasters, including detached garages or gazebos.",
    simple_explanation: "Money to rebuild the physical walls and roof of your house after a fire, storm, or lightning strike. It also covers your tool shed or garage.",
    source_page: 5
  },
  {
    id: 13,
    term: "Personal Belongings (Floaters)",
    category: "Property/Home",
    description: "Coverage for furniture, clothes, and personal items destroyed by an insured disaster. High-value items like jewelry, furs, and silverware have strict limits and require an endorsement called a floater.",
    simple_explanation: "Reimburses you for your ruined or stolen clothes, laptops, and furniture. For extremely expensive items like jewelry, you must buy a special plug-in (floater) to cover their full appraised value.",
    source_page: 5
  },
  {
    id: 14,
    term: "Additional Living Expenses (Loss of Use)",
    category: "Property/Home",
    description: "A provision in home policies that pays the extra costs of living away from home (hotels, restaurants) if a covered disaster makes the dwelling completely uninhabitable during rebuilding.",
    simple_explanation: "Your emergency displacement fund. If a house fire forces you out, this pays for your hotel rooms and restaurant meals while your home is being safely rebuilt.",
    source_page: 6
  },
  {
    id: 15,
    term: "Homeowners Policy Exclusions",
    category: "Property/Home",
    description: "Standard catastrophic perils that are explicitly excluded from standard homeowners and renters policies, majorly including floods, earthquakes, landslides, and poor home maintenance.",
    simple_explanation: "Dangers your standard policy will NOT pay for. Standard home insurance never covers floods or earthquakes. You must buy special, separate policies to be protected against those disasters.",
    source_page: 8
  },
  {
    id: 16,
    term: "Actual Cash Value (ACV)",
    category: "Property/Home",
    description: "A loss settlement option that pays the cost of replacing damaged or destroyed property minus a deduction representing cumulative physical wear-and-tear or depreciation.",
    simple_explanation: "A payout standard that factors in age. If an old TV is destroyed, this only pays what that old TV was worth today, not what a brand-new one costs at the store. It is cheaper but covers less.",
    source_page: 9
  },
  {
    id: 17,
    term: "Replacement Cost Coverage",
    category: "Property/Home",
    description: "A loss settlement standard that pays the full actual building or repair cost to rebuild the house or replace items without any deduction for depreciation.",
    simple_explanation: "The more secure payout option. It gives you enough cash to buy a brand-new equivalent item or rebuild your house, regardless of how old and worn-out it was before the disaster.",
    source_page: 9
  },
  {
    id: 18,
    term: "Extended Replacement Cost",
    category: "Property/Home",
    description: "An endorsement that pays an extra percentage (generally 20% to 25%) above the stated policy limit to rebuild a home if post-disaster local labor and material costs spike.",
    simple_explanation: "Post-disaster safety buffer. If a major storm hits your town, contractors and wood prices get incredibly expensive. This adds a 20%+ bonus fund so you can still afford to rebuild.",
    source_page: 9
  },
  {
    id: 19,
    term: "Business Insurance Basics",
    category: "Business",
    description: "Specialized commercial safety products covering property damage, business interruption, legal liabilities (CGL), and mandatory workers compensation.",
    simple_explanation: "A package of shields designed to keep businesses alive. It covers fire damages, liability lawsuits from customers, employee injuries, and lost profits during shutdowns.",
    source_page: 10
  },
  {
    id: 20,
    term: "Business Interruption Insurance",
    category: "Business",
    description: "Commercial coverage that compensates a business owner for lost income, profits, and continuing fixed operational expenditures (like rent or utility bills) while physical property is being repaired after a fire or storm.",
    simple_explanation: "Profit safety net. If a covered fire forces your restaurant to close for three months, this pays your employee wages, fixed rent, and estimated lost profits so you don't go bankrupt while rebuilding.",
    source_page: 10
  },
  {
    id: 21,
    term: "Commercial General Liability (CGL)",
    category: "Business",
    description: "A broad business policy covering customer bodily injury, customer property damage, personal injury (slander), or advertising injury caused on business premises.",
    simple_explanation: "Protects your business from slip-and-fall lawsuits or claims of defective products. It pays customer medical costs and covers your legal defense team in court.",
    source_page: 11
  },
  {
    id: 22,
    term: "Occurrence Policy vs Claims-Made",
    category: "Business",
    description: "A choice in commercial liability. Occurrence covers incidents that happened during the active policy term, regardless of when the claim is filed. Claims-Made only covers if both happen while the policy is active.",
    simple_explanation: "Occurrence is the safer, premium choice. It protects you even if a customer sues you years database-wise for a slip-and-fall that happened back when your policy was active. Claims-Made is cheaper but has more complex rules.",
    source_page: 12
  },
  {
    id: 23,
    term: "Workers Compensation Coverage",
    category: "Business",
    description: "State-mandated coverage paying medical care and lost wage replacement for workers injured on the job, operating under an 'exclusive remedy' social contract that prevents employees from suing employers direct for negligence.",
    simple_explanation: "Mutual protection. If a worker is injured on the job, this pays their hospital bills and covers their living salary. In return, the employee cannot sue your business in court, preventing expensive legal battles.",
    source_page: 12
  },
  {
    id: 24,
    term: "Errors and Omissions (E&O)",
    category: "Business",
    description: "Professional liability insurance that indemnifies specialists (like doctors, lawyers, adjusters, or consultants) against clients claiming financial harm due to advice errors, omissions, or professional negligence.",
    simple_explanation: "Professional mistakes shield. If you give a client advice that backfires, or make a severe calculation mistake that costs them thousands, this covers your legal defense and payout costs.",
    source_page: 13
  },
  {
    id: 25,
    term: "BOP (Businessowners Policy)",
    category: "Business",
    description: "An affordable off-the-shelf bundled package for small/medium businesses (usually under 100 employees) combining basic commercial brick-and-mortar property, general liability, and business shutdown insurance.",
    simple_explanation: "The ultimate starter pack for small shops. It combines standard property and liability shields into one bundle that is significantly cheaper than buying them separately.",
    source_page: 14
  },
  {
    id: 26,
    term: "Life Insurance Basics",
    category: "Life",
    description: "A vital personal financial tool acting as the cornerstone of planning, paying a lump-sum death benefit to designated beneficiaries upon the policyholder's passing to replace income or pay estate taxes.",
    simple_explanation: "A financial pact with your family. If something happens to you, this gives your named loved ones a large cash payout to pay off the mortgage, buy groceries, and cover children's college fees.",
    source_page: 16
  },
  {
    id: 27,
    term: "Term Life Insurance",
    category: "Life",
    description: "The simplest, most economical form of life insurance that pays a death benefit strictly if demise occurs during a pre-set term (usually 1 to 30 years), offering zero maturity or survival cash back.",
    simple_explanation: "Pure and cheap protection. You pay a small regular premium for a set period (like 20 years). If you pass away, your family receives a massive cash shield. If you survive, the policy ends with no cash back, but it kept you safe for pennies.",
    source_page: 17
  },
  {
    id: 28,
    term: "Whole Life / Permanent",
    category: "Life",
    description: "Permanent life insurance that covers you for your entire lifetime and includes a cash value savings element that accumulates tax-deferred and can be borrowed against.",
    simple_explanation: "Continuous protection that never expires. Part of your premium goes toward a permanent life payout, and the other part is saved inside an in-app compound cash nest egg. It is more secure but far more expensive.",
    source_page: 17
  },
  {
    id: 29,
    term: "Universal & Variable Life",
    category: "Life",
    description: "Flexible permanent life variations. Universal lets you adjust premium amounts and coverage sizes over time. Variable lets you invest the policy's cash nest egg directly into stocks or mutual funds.",
    simple_explanation: "Life insurance with dynamic controls. Universal lets you change your payment sizes if you face tight budgets. Variable lets you link your policy's built-in savings to stock markets for higher risk and reward.",
    source_page: 17
  },
  {
    id: 30,
    term: "Annuity Basics",
    category: "Annuities",
    description: "A contract between an individual and a life Insurer designed to enhance retirement security, converting saved assets into a guaranteed, regular stream of lifetime income.",
    simple_explanation: "Reverse life insurance. You give an insurer a lump sum of money, and they guarantee to pay you a steady monthly paycheck for the rest of your life, ensuring you never run out of retirement funds.",
    source_page: 19
  },
  {
    id: 31,
    term: "Fixed vs Variable Annuity",
    category: "Annuities",
    description: "Annuity investment choices. Fixed options deposit your cash securely and guarantee a baseline, steady interest rate. Variable options link your returns to the performance of selected stock mutual funds.",
    simple_explanation: "Fixed is the ultra-safe route: it guarantees a set paycheck size every month. Variable links your paycheck size to underlying market trends, giving professional upside but risking loss in down cycles.",
    source_page: 20
  },
  {
    id: 32,
    term: "Annuity Savings vs Payout Phase",
    category: "Annuities",
    description: "The two parts of a deferred annuity. The Accumulation Phase is when you build assets tax-deferred. The Payout (or Annuitization) Phase is when the funds convert into steady checks.",
    simple_explanation: "Phase 1: You save and let your cash compile with zero taxes. Phase 2: You flip the switch and the insurer starts sending you regular payouts.",
    source_page: 21
  },
  {
    id: 33,
    term: "Long-Term Care Basics",
    category: "Health",
    description: "Insurance designed to pay for skilled nursing, assisted living, or in-home daily care for elderly or disabled individuals who cannot perform basic activities of daily living.",
    simple_explanation: "Safeguards your retirement fund. If you get old or sick and need help with daily items like getting dressed, bathing, or eating, this pays for professional caregivers so your life savings aren't completely drained.",
    source_page: 22
  },
  {
    id: 34,
    term: "Activities of Daily Living (ADLs)",
    category: "Health",
    description: "The six primary physical tasks used to measure disability or determine when long-term care policy benefits begin: bathing, dressing, eating, toileting, continence, and transferring.",
    simple_explanation: "The trigger points for benefit payouts. If a doctor certifies that you cannot do 2 or 3 of these basic actions (like bathing or dressing yourself) without assistance, your nursing care coverage officially kicks in.",
    source_page: 22
  },
  {
    id: 35,
    term: "Elimination (Waiting) Period",
    category: "Health",
    description: "A policy provision akin to a timeline deductible: the number of days (usually 30 to 90) the insured must personally receive and pay for care before the Insurer pays.",
    simple_explanation: "A waiting buffer. After a doctor certifies you need care, you must pay for the first 30, 60, or 90 days out of your own pocket. A longer waiting timeline makes your baseline premium significantly cheaper.",
    source_page: 22
  },
  {
    id: 36,
    term: "Disability Insurance Basics",
    category: "Disability",
    description: "Income replacement coverage that pays a percentage (usually 50% to 70%) of your normal taxable salary if a serious injury or long illness leaves you completely unable to work.",
    simple_explanation: "Your paycheck's safety shield. If an accident or major sickness keeps you out of your job, this replaces most of your weekly paycheck so you can still afford groceries and pay your rent.",
    source_page: 24
  },
  {
    id: 37,
    term: "Own Occupation vs Any Occupation",
    category: "Disability",
    description: "The definitions of disability. 'Own Occupation' pays benefits if you cannot perform the specific duties of your current specialized career. 'Any Occupation' only pays if you cannot do any work suited to your general skills.",
    simple_explanation: "'Own occupation' is premium and highly desirable: if a surgeon injures their hand and can't operate, it pays out even if they could work as a teacher. 'Any occupation' is cheaper but much harder to collect.",
    source_page: 25
  },
  {
    id: 38,
    term: "Waiver of Premium",
    category: "Disability",
    description: "A common provision holding that once a policyholder has been verified as disabled for a set period (usually 90 days), they do not have to pay premiums.",
    simple_explanation: "A premium freeze. If you are sick and disabled, the company waives your monthly fee but keeps your protection active, so you don't lose coverage when money is tightest.",
    source_page: 25
  },
  {
    id: 39,
    term: "Reinsurance (Insurers' Protection)",
    category: "Advanced Topics",
    description: "Insurance purchased by Insurers to spread high concentration risk and transfer excessive loss exposure to global reinsurers.",
    simple_explanation: "Insurance for Insurers. Big Insurers pay small regular portions of their premiums to global giants. If a catastrophic hurricane hit their entire state, the global giant covers the excessive bills so the local Insurer doesn't go bankrupt.",
    source_page: 60
  },
  {
    id: 40,
    term: "Catastrophe (Cat) Bonds",
    category: "Advanced Topics",
    description: "Specialized risk-linked financial securities sold to capital market institutional investors. It pays high interest, but if a pre-specified disaster model occurs, the principal is kept to pay claims.",
    simple_explanation: "Investing in disaster risks. Investors get paid high interest, but if a massive hurricane hit and caused billions in damages, investors lose their initial money, which is immediately used to fund rebuilding.",
    source_page: 61
  },
  {
    id: 41,
    term: "Insurance Credit Scores",
    category: "Advanced Topics",
    description: "Confidential numbers generated by analyzing consumer credit history, shown to be a powerful predictor of future insurance claims.",
    simple_explanation: "How your cards affect your cash. Numerical data proves that people who manage their money responsibly (good score >760) tend to take better care of their cars and homes. A stable score gives you deep premium discounts.",
    source_page: 39
  },
  {
    id: 42,
    term: "The Insurance cycle",
    category: "Advanced Topics",
    description: "The historical property/casualty corporate cycle characterized by swings between 'Hard' (expensive premiums, tight criteria) and 'Soft' (cheap premiums, high competition) markets.",
    simple_explanation: "Market swings. When insurers are highly profitable with high capital pool sizes, they cut rates to win customers (Soft Market). When high disasters claim payouts hit they tighten rules and hike premiums (Hard Market).",
    source_page: 45
  },
  {
    id: 43,
    term: "Spurious / Fraudulent Solicitations",
    category: "Regulation",
    description: "Deceptive sales methods where callers pose as regulators, offer fake bonuses, or demand direct cash payments in exchange for policy enrollment.",
    simple_explanation: "Scam alerts. Official regulators never sell policies or call you offering cash dividends over the phone. Real policies require check vouchers made strictly inside the company's verified name.",
    source_page: 50
  },
  {
    id: 44,
    term: "Free-Look Period Rule",
    category: "Regulation",
    description: "A mandatory, statutory consumer protection window of 15 to 30 days enabling buyers to cancel a policy for a 100% refund of premium if they find mismatching terms.",
    simple_explanation: "A legal return window. If you receive your physical policy book and find that the agent lied about terms or the fees are too high, you can return it within 15-30 days for every penny back.",
    source_page: 97
  },
  {
    id: 45,
    term: "Standard Fire & Special Perils Policy (SFSP)",
    category: "Fire (Commercial)",
    description: "The primary commercial structure protection form published by general insurers. It covers 12 standard named perils including fire, lightning, explosion, aircraft damage, storm, tempest, flood, inundation (STFI), landslide, and sprinkler leakage.",
    simple_explanation: "The foundational property protection for businesses, shops, and warehouses. It guarantees that if a fire, flood, or lightning strike ruins your physical structure, machinery, or raw materials, you will be compensated for the rebuild or recovery costs.",
    source_page: 249
  },
  {
    id: 46,
    term: "Reinstatement Value Clause (RVC)",
    category: "Fire (Commercial)",
    description: "An essential commercial fire endorsement (standard in general insurers' downloads) that modifies the indemnity principle. It commits the insurer to pay the cost of replacing the destroyed property with a brand new equivalent, without any deduction for wear-and-tear or depreciation.",
    simple_explanation: "The 'New for Old' upgrade for business infrastructure. Instead of receiving a deprecated cash payout for old scorched machinery, this clause buys you identical brand-new replacements, completely saving your business from paying out of pocket for upgrades.",
    source_page: 243
  },
  {
    id: 47,
    term: "Consequential Loss (Fire Profit) Policy",
    category: "Fire (Commercial)",
    description: "A product downloaded from standard general insurers' commercial menus. It monitors post-fire operations and compensates for the lost net profit, standing charges (like salaries, rent, taxes), and the increased cost of working during the recovery or interruption window.",
    simple_explanation: "Your business survival salary. If a fire forces your factory to close for months during repairs, this policy keeps paying your employees, landlord, and lost profits, keeping your business from going bankrupted while silent.",
    source_page: 252
  },
  {
    id: 48,
    term: "Industrial All Risks (IAR) Policy",
    category: "Fire (Commercial)",
    description: "A comprehensive corporate package policy downloaded from general insurers, specifically designed for large industries with fixed assets values exceeding ₹100 Crores. It combines fire, STFI, machinery breakdown, boiler explosion, and business interruption into a single policy.",
    simple_explanation: "The ultimate coverage bundle for massive factories. Instead of buying separate, scattered binders for fire, machine breakdowns, or boiler bursts, it consolidates every main industrial protection into one simpler, more economical corporate package.",
    source_page: 250
  },
  {
    id: 49,
    term: "Standard Underinsurance Average Clause",
    category: "Fire (Commercial)",
    description: "A fundamental wording in general insurers' policies holding that if at the time of loss, the sum insured is lower than the actual market value of property, the customer stands as their own insurer for the difference and bears a ratable share of the loss.",
    simple_explanation: "The under-reporting penalty. If you value your ₹1 Crore factory at only ₹50 Lakhs to avoid higher fees, and a partial fire causes ₹20 Lakhs in damage, the insurer will only pay ₹10 Lakhs (50% of the claim). You must report 100% true values to get fully paid.",
    source_page: 238
  },
  {
    id: 50,
    term: "Terrorism Pool buyback clause",
    category: "Fire (Commercial)",
    description: "An optional buyback wording that overrides the standard terrorism damage exclusion clause. Premiums are directed to the Indian National Terrorism Pool to guarantee indemnity for structures damaged by direct acts of terror.",
    simple_explanation: "Standard corporate fire insurance excludes any loss caused by bomb blast or acts of terrorism. Ticking this buy-back option adds a critical protection shield to cover acts of sabotage and physical terror attacks.",
    source_page: 245
  },
  {
    id: 51,
    term: "Marine Cargo Insurance",
    category: "Marine Insurance",
    description: "A policy type standard to general insurers' marine cargo menus. It covers physical loss or damage to goods or stock in transit through sea, air, rail, road, or designated postal parcel routes.",
    simple_explanation: "Protection for merchandise in motion. If your imported raw materials or exported goods are water-logged on a ship, stolen from a truck, or crushed in a plane cargo bay, this pays for the lost inventory value.",
    source_page: 253
  },
  {
    id: 52,
    term: "Marine Open Policy",
    category: "Marine Insurance",
    description: "An annually renewable policy designed for frequent domestic cargo transits inside India, downloaded commonly from general insurers. It establishes a set estimated annual transit turnover, where premium is deposited upfront and deducted with each declaration.",
    simple_explanation: "A continuous transit shield. Instead of filing an insurance application for every single delivery truck you release, you buy one annual deposit plan. Every time you ship cargo, the inventory value is reported and automatically deducted from your prepay pool.",
    source_page: 255
  },
  {
    id: 53,
    term: "Marine Open Cover Agreement",
    category: "Marine Insurance",
    description: "A continuous treaty document downloaded from general insurers, widely used for import/export transits. It contains no sum insured limit but guarantees that the insurer will cover all shipments of the policyholder at fixed pre-determined rates for a twelve-month duration.",
    simple_explanation: "The exporter's treaty. A legal commitment where the insurer guarantees to cover every single container load you ship internationally at fixed, predictable pricing, ensuring you can sign foreign buyer deals without fluctuating insurance rates.",
    source_page: 255
  },
  {
    id: 54,
    term: "Institute Cargo Clauses (A) (ICC-A)",
    category: "Marine Insurance",
    description: "The widest available marine cargo set of clauses downloaded across general insurers' downloads. It represents an 'All Risks' framework, covering all accidental losses of cargo in transit except for globally excluded perils (like war, strikes, or poor packing).",
    simple_explanation: "The premium cover for transits. It pays for almost any random accident, drop, water leak, or theft that hits your cargo box, unless it is specifically listed in standard global exclusions (like shipping already-spoiled food).",
    source_page: 257
  },
  {
    id: 55,
    term: "Institute Cargo Clauses (B) & (C) (ICC-B / ICC-C)",
    category: "Marine Insurance",
    description: "Standard named-perils clauses. ICC-C covers minimum standard transit catastrophes (fire, sinking, stranding, collision, jettison). ICC-B adds intermediate named-perils covering earthquakes, volcanic eruptions, washing overboard, or sea water enter.",
    simple_explanation: "A budget named-hazard transit cover. Instead of buying absolute 'All Risks', you choose limited named protections. Class C is the most restricted (only sinking/fire). Class B is mid-tier (adds lightning and water leakage), making them cheaper option.",
    source_page: 257
  },
  {
    id: 56,
    term: "Warehouse-to-Warehouse Transit Clause",
    category: "Marine Insurance",
    description: "A critical duration wording in standard general insurers' marine templates. It dictates that coverage incepts immediately when goods leave the dispatch warehouse, continues during transshipment overland/oversea, and terminates upon final recipient unloading or 60 days post-discharge.",
    simple_explanation: "Continuous door-to-door transit protection. Your cargo is shielded from the exact moment it is lifted onto a truck at the factory, through ocean voyages, and inside custom bays, until the delivery is fully unpacked at the buyer's warehouse.",
    source_page: 254
  },
  {
    id: 57,
    term: "Customs Duty Insurance Policy",
    category: "Marine Insurance",
    description: "A specialized marine cargo endorsement standard in general insurers' downloads, protecting Indian importers against paying non-recoverable customs duty taxes on goods that arrive heavily damaged.",
    simple_explanation: "Import tax safeguard. If you import precision machinery and pay 30% customs duties at port, only to find the machine was secretly ruined by sea-salt water during transit, this policy pays you back the expensive tax duties you had to pay.",
    source_page: 256
  },
  {
    id: 58,
    term: "Sellers' Interest Clause",
    category: "Marine Insurance",
    description: "An endorsement downloaded from general insurers' downloads, protecting exporters selling under FOB (Free on Board) or CFR terms, in the event the buyer refuses to accept the goods at destination or defaults, leaving the sender with unprotected inventory transit exposure.",
    simple_explanation: "The exporter's fallback shield. If you ship goods and key terms state the buyer's insurance takes over at port, but they reject the delivery or go bankrupt mid-voyage, this clause automatically boots up your own insurer cover so your floating cargo remains protected.",
    source_page: 253
  },
  {
    id: 59,
    term: "Zero Depreciation Cover",
    category: "Motor",
    description: "A premium add-on cover pioneered by major Insurers that eliminates depreciation deductions on plastic, rubber, glass, and metal parts during motor accident claim settlements.",
    simple_explanation: "Standard motor insurance pays less for older car parts due to wear-and-tear (depreciation). This popular upgrade from leading Insurers ensures the company pays 100% of the replacement cost of any damaged car parts (except tires), saving you major out-of-pocket expenses.",
    source_page: 11
  },
  {
    id: 60,
    term: "Telematics Smart Car Cover",
    category: "Motor",
    description: "An option offered by modern Insurers incorporating IoT sensors to adjust premium costs dynamically in proportion to driving discipline and mileage logs.",
    simple_explanation: "Also known as 'Pay How You Drive'. A telematics link tracks how safely you drive and how many kilometers you cover. Safer and less frequent drivers receive heavy discount caches on their insurer renewal premiums.",
    source_page: 12
  },
  {
    id: 61,
    term: "Donor Expenses Cover",
    category: "Health",
    description: "A standard inclusion in comprehensive health policies by major Insurers that covers the medical, hospitalization, and surgical expenses of an active organ donor during an organ transplant procedure.",
    simple_explanation: "If you have to undergo an organ transplant, this critical clause pays the extensive hospital bills and operation expenses for the generous person donating the organ to you.",
    source_page: 15
  },
  {
    id: 62,
    term: "Reset Benefit",
    category: "Health",
    description: "An automated policy benefit by leading Insurers that fully reinstates 100% of the basic sum insured once it is exhausted by other claims during the same policy year.",
    simple_explanation: "If a major illness exhausts your entire health insurance fund, this feature instantly refuels your balance back to 100% for free. This ensures you still have cover if another family member gets sick or a different illness strikes in the same year.",
    source_page: 16
  },
  {
    id: 63,
    term: "NCB Protect Add-on",
    category: "Motor",
    description: "A popular motor insurance protector designed by leading Insurers that permits you to make up to a specific number of claims in a term without losing your accrued No Claim Bonus (NCB) discount.",
    simple_explanation: "Usually, making even a single small claim resets your No Claim Bonus (safe-driving discount) to zero. This protector add-on from your Insurer shields your discount percentage even if you have to file a repair claim during the year.",
    source_page: 22
  },
  {
    id: 64,
    term: "Consumables Protector",
    category: "Motor",
    description: "An add-on offered by modern Insurers covering the costs of consumable items such as engine oil, screws, nuts, bolts, washers, and lubricants which are excluded from standard motor policies.",
    simple_explanation: "Standard car insurance doesn't cover 'consumable' items like engine oil, nuts, bolts, or coolant used during repairs. This protector from your Insurer saves you from paying those sneaky, essential service charges yourself.",
    source_page: 24
  },
  {
    id: 65,
    term: "Consolidated Global Cover",
    category: "Health",
    description: "A premium benefit in global health insurance menus providing coverage for medical treatments obtained outside India, including travel and accommodation for catastrophic illnesses.",
    simple_explanation: "If you are diagnosed with a severe illness and decide to seek world-class medical treatment in a foreign country, this comprehensive policy by your Insurer covers your hospital stays, treatment costs, and international travel expenses.",
    source_page: 26
  },
  {
    id: 66,
    term: "Return to Invoice (RTI) Clause",
    category: "Motor",
    description: "An add-on cover by leading Insurers that guarantees to pay the full original invoice price of the vehicle, including road tax and registration charges, in the event of theft or total constructive loss.",
    simple_explanation: "If your car is stolen or completely crushed in a crash, standard policies only pay its current depreciated market value. This RTI clause by your Insurer pays the full original invoice price you paid at the showroom, allowing you to buy an identical brand-new car.",
    source_page: 28
  },
  {
    id: 67,
    term: "Hydrostatic Lock Cover (Engine Protect)",
    category: "Motor",
    description: "A premier add-on pioneered by top Insurers designed to shield your car’s engine from hydrostatic lock damage, typically occurring when a vehicle is started while submerged in deep floodwaters.",
    simple_explanation: "Water entering an engine causes catastrophic, expensive damage that standard motor insurance excludes. This engine cover pays to repair or replace water-logged engine blocks, which is vital during heavy monsoon floods.",
    source_page: 31
  },
  {
    id: 68,
    term: "Cumulative Bonus Multiplier",
    category: "Health",
    description: "A health policy feature of leading Insurers that doubles or increases your sum insured by a high percentage for every claim-free year, up to a maximum cap.",
    simple_explanation: "A rewarding loyalty system. If you do not make any claims during the year, your Insurer increases your total medical coverage size (e.g. by 50% or 100%) for the next year without raising your premium cost.",
    source_page: 35
  },
  {
    id: 69,
    term: "Roadside Assistance (RSA) Elite",
    category: "Motor",
    description: "A comprehensive emergency assistance package by leading Insurers that provides on-spot towing, flat tire replacement, fuel delivery, key retrieval, and taxi coordination.",
    simple_explanation: "Your 24/7 highway rescue shield. If your car breaks down, gets a flat tire, runs out of fuel, or gets locked out anywhere, your Insurer dispatches mechanics to assist you or tow your vehicle directly.",
    source_page: 38
  },
  {
    id: 70,
    term: "OPD Daily Care Benefit",
    category: "Health",
    description: "A health insurance provision from premier Insurers covering outpatient department expenses, such as general physician consultation fees, prescribed medicines, and routine diagnostic laboratory tests.",
    simple_explanation: "Normal health insurance only pays if you are hospitalized for at least 24 hours. This outpatient benefit covers regular clinic visits, dental care, eye examinations, and doctor-prescribed pharmacy bills without requiring hospital admission.",
    source_page: 40
  },
  {
    id: 71,
    term: "Insurers' Wellness TakeCare Benefit",
    category: "Health",
    description: "An innovative preventive health program underwritten by premier multi-line retail Insurers (originally developed for retail protection portfolios), which compensates for scheduled annual diagnostic check-ups, unlimited video-consultation panel sessions, weight management panels, and cumulative wellness points used to slash renewal pricing.",
    simple_explanation: "A proactive fitness program from your Insurers. It covers routine doctor check-ups and diagnostic medical profile tests, together with gym tracking apps that reward you with major renewal premium discounts for staying in high shape.",
    source_page: 44
  },
  {
    id: 72,
    term: "Insurers' Auto Secure Depreciation Waiver",
    category: "Motor",
    description: "A widely utilized private Insurer add-on (often referred to as zero-depreciation or bumper-to-bumper shield, standard in leading multi-transit auto policies), which guarantees that physical accident repairs on composite material, bumper fiberglass, glass, and metal panels are settled at 100% replacement asset valuation with zero depreciation deductions.",
    simple_explanation: "A premium booster from your Insurers. Standard collision claims pay you less for old or delicate car parts due to wear-and-tear. This option eliminates depreciation, ensuring your Insurer pays the absolute full cost of all brand-new repair components.",
    source_page: 48
  },
  {
    id: 73,
    term: "Insurers' Drive Smart Telematics Cover",
    category: "Motor",
    description: "A telematics-linked billing model pioneered by leading general Insurers, integrating high-precision GPS telemetry loggers or connected mobile apps to calculate mileage, velocity thresholds, and sudden acceleration and deceleration profiles.",
    simple_explanation: "The 'Pay How You Drive' revolution from modern Insurers. A smart sensor logs how safely and how often you drive. If you maintain safe road metrics, your Insurers rewards your policy with deep compound discounts.",
    source_page: 51
  }
];

// 2. Frauds Table Entries (Page 11-13 Spurious Call warnings)
export const fraudsDatabase: FraudRow[] = [
  {
    id: 1,
    pattern: "Guaranteed Direct Bonus & Profit Share Claims",
    warning_signs: [
      "Caller claims the central Insurance Regulator (IRDA/FEMA) is distributing a massive accumulated cash pool of old policies.",
      "Buyer must first purchase a brand-new policy to show 'active account activation' and register.",
      "Requires depositing minor registration fees directly in cash or an individual agent's personal bank account."
    ],
    countermeasure: "Decline immediately! Regulatory bodies are supervisory administrative agencies. They never sell insurance or distribute cash bonuses over the phone.",
    severity: "CRITICAL",
    caller_claim_type: "Fake Regulatory Commissioner"
  },
  {
    id: 2,
    pattern: "Fake Grievance Transfer and Refund Claims",
    warning_signs: [
      "Caller claims the benefits or maturity payouts of your old policy are being illegally transferred to a fraudulent account.",
      "Asks you to instantly courier physical PAN, signature proof, and blank checks to solve the crisis."
    ],
    countermeasure: "Never courier sensitive files or blank signs! Contact your Insurer's official branch phone or website directly to verify.",
    severity: "CRITICAL",
    caller_claim_type: "Fake Grievance Inspector"
  },
  {
    id: 3,
    pattern: "Uncertified Agents / Cash-only Premium Requests",
    warning_signs: [
      "Agent tries to pressure you into signing a blank proposal form, promising to fill minor details later for 'convenience'.",
      "Demands cash payments directly in their personal name or name of a local agency, refusing cheques."
    ],
    countermeasure: "Refuse. Always fill details yourself. Write premium cheques strictly in the official name of the registered Insurer, never a person.",
    severity: "HIGH",
    caller_claim_type: "Spurious Agent"
  },
  {
    id: 4,
    pattern: "Policy replacement scams (Churning)",
    warning_signs: [
      "Caller advice holds that surrendering your existing active life cover and buying a new one instantly doubles returns.",
      "Fails to explain that surrendering early kills your accumulated savings and resets critical health waiting buffers."
    ],
    countermeasure: "Existing long-form policies are highly precious. Early surrenders result in heavy penalties. Never cancel without written proof from head offices.",
    severity: "HIGH",
    caller_claim_type: "Fake Advisor"
  }
];

// 3. Buyer Rights and Duties Table Entries (Page 6-9)
export const buyerRightsDatabase: BuyerRightRow[] = [
  {
    id: 1,
    title: "Verify Agent & Intermediary Credentials",
    stage: "Buying Stage",
    details: "You possess a complete legal right to verify the agent's identity card, official registration license certificate, and branch phone numbers.",
    duty: "Always audit credentials inside the authorized insurer directory or state registry before passing any checks or signing."
  },
  {
    id: 2,
    title: "Truthful Information Disclosure",
    stage: "Buying Stage",
    details: "Your right is to have all questions explained simply. Your matching duty is to declare pre-existing health habits completely truthfully on proposal files.",
    duty: "Never let an agent write false statements or check 'No' for health illnesses you currently carry. Honest forms guaranteepaid claims."
  },
  {
    id: 3,
    title: "The Free-Look Return Window",
    stage: "Post-Purchase",
    details: "If you buy online or over distance calls, you have up to 30 days (15 days for standard physical buying) to review the printed book and cancel for a full refund.",
    duty: "Open your policy folder immediately on delivery. Read dates, sums, and premium size. Report mismatches to head offices in writing."
  },
  {
    id: 4,
    title: "Audio Transcript Request",
    stage: "Post-Purchase",
    details: "If a telecaller pitched the insurance, you have an absolute right to demand full audio voice recordings or printed verbal transcripts.",
    duty: "Compare verbal scripts with printed books to ensure the teleseller didn't hide critical exclusions or lock-in terms."
  },
  {
    id: 5,
    title: "Prompt Claim Redressal",
    stage: "Claim Time",
    details: "The right to have your claim evaluated, processed, and either paid or formally rejected with legal written reasons within strict state timelines.",
    duty: "Notify the company of the disaster immediately, submit all genuine medical bills or repair receipts, and request an official reference case number."
  }
];

// 4. Grievance Redressal Channels (Page 10)
export const complaintsDatabase: ComplaintChannelRow[] = [
  {
    id: 1,
    name: "IGMS (Central Grievance Management System)",
    toll_free: "N/A",
    email: "complaints@irda.gov.in",
    contact_info: "www.igms.irda.gov.in",
    description: "A centralized online platform allowing buyers to log disputes against any Insurer and monitor tracking logs under strict state regulatory oversight."
  },
  {
    id: 2,
    name: "State Grievance Tele-Call Helpline (IGCC)",
    toll_free: "155255 or 1800 425 4732",
    email: "complaints@irda.gov.in",
    contact_info: "Consumer Protection Cell, Hyderabad Center",
    description: "Direct offline toll-free voice helplines where consumers can report scam calls, log formal service complaints, and query agent validation logs."
  },
  {
    id: 3,
    name: "The Insurance Ombudsman",
    toll_free: "N/A",
    email: "gbic@gov.in",
    contact_info: "Governing Board of Insurance Council - www.gbic.co.in",
    description: "An out-of-court independent judicial court. If your Insurer wrongfully rejects or delays your claim, you can report here for a free, fast, binding legal verdict up to statutory limits."
  }
];

// 5. Training Quiz questions "Become Bima Smart"
export const bimaQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "A caller introduces themselves as an IRDA officer and offers you a guaranteed bonus if you buy a new policy. What should you do?",
    options: [
      "Buy the policy and wait for the bonus, it seems registered.",
      "Ask the advisor to send written details via email and then pay.",
      "Hang up immediately! IRDA is a regulatory body and does not sell insurance or announce bonuses.",
      "Pay half the amount as a security charge."
    ],
    answerIndex: 2,
    explanation: "IRDA does not involve directly in sale of any insurance or investment of premiums. Spurious callers often pose as IRDA officials offering bonuses to scam buyers."
  },
  {
    id: 2,
    question: "How long is your Free-Look Period to cancel a policy purchased via online/telesales if you disagree with its terms?",
    options: [
      "Only 5 Days",
      "30 Days from receipt of the policy document",
      "No cancel option exists for distance mode",
      "1 Year"
    ],
    answerIndex: 1,
    explanation: "Under IRDA, policies purchased via distance mode offer a 30-day Free-Look cancellation window (as opposed to 15 days for in-person) to let you return if premium or terms differ."
  },
  {
    id: 3,
    question: "Which of the following describes a 'Term Plan'?",
    options: [
      "A plan with savings and guaranteed returns on the market.",
      "A pension plan for elderly years.",
      "A pure risk life cover of maximum duration which provides NO survival maturity benefit.",
      "A health critical illness plan."
    ],
    answerIndex: 2,
    explanation: "A Term plan offers high cover for low premium with zero survival maturity sum. It's strictly for protecting loved ones against death risk during the active term."
  },
  {
    id: 4,
    question: "If an agent tells you to sign a blank policy proposal form and promises to fill details for your convenience, what is the right action?",
    options: [
      "Agree, as it saves time.",
      "Sign only with a blank date.",
      "Decline. Never sign blank proposals, fill all statements yourself to prevent frauds.",
      "Let the agent sign instead."
    ],
    answerIndex: 2,
    explanation: "Never sign blank proposal forms. You are personally responsible for everything written on the proposal forms bearing your signature."
  },
  {
    id: 5,
    question: "To whom should you issue the premium cheque?",
    options: [
      "In the name of the licensed insurance agent's personal account.",
      "In the name of the registered Insurer directly.",
      "To the telemarketer's broker holding company.",
      "In cash directly without a voucher."
    ],
    answerIndex: 1,
    explanation: "Always write premium cheques directly in the name of the registered Insurer itself, never an individual. Request official receipts immediately."
  }
];
