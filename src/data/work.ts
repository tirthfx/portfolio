// Work experience. Task details come from Tirth's own Meritshot task files (~/meritshot);
// per Tirth, every task is treated as completed. Company facts: see vault "Work - Meritshot".

export interface WorkTask {
  no: string;
  title: string;
  kind: string;
  tools: string[];
  dataset: string;
  summary: string;
  points: string[];
}

export interface Role {
  company: string;
  role: string;
  location: string;
  period: string;
  about: string;
  tools: string[];
  facts: { value: string; label: string }[];
  tasks: WorkTask[];
}

export const ROLES: Role[] = [
  {
    company: "Meritshot",
    role: "Data Analyst Intern",
    location: "Noida, India",
    period: "May – Jul 2026",
    about:
      "Meritshot is a Noida-based online upskilling platform, founded in 2020, that runs programs in data science, business analytics, full-stack development, cybersecurity and investment banking.",
    tools: ["Excel", "SQL", "Python", "Tableau", "Power BI"],
    facts: [
      { value: "4", label: "analytics projects, all completed" },
      { value: "~21K", label: "rows of sales and banking data cleaned and analysed" },
      { value: "5", label: "tools: Excel, SQL, Python, Tableau, Power BI" },
    ],
    tasks: [
      {
        no: "01",
        title: "Superstore sales analysis",
        kind: "Dashboard · Retail",
        tools: ["Tableau"],
        dataset: "9,974 orders × 13 columns",
        summary:
          "An interactive Tableau dashboard on store-wide sales and profit, built to find top products, loss-making categories and regional trends.",
        points: [
          "Cleaned missing values and 17 duplicate records, and fixed data types and geographic roles",
          "Found that Furniture sells 741K but returns only 18K profit, a clear margin problem",
          "Phones (330K) and Chairs (328K) lead sales; the West is the strongest region at over 700K",
        ],
      },
      {
        no: "02",
        title: "Sales performance dashboard",
        kind: "Dashboard · KPIs",
        tools: ["Tableau", "Excel"],
        dataset: "9,801 orders × 18 columns",
        summary:
          "KPI tracking and business analysis on four years of orders: top and loss-making products, best and worst regions, and seasonal trends.",
        points: [
          "Ranked top products and listed the loss-makers by sales",
          "California leads on sales and North Dakota trails; 2018 was the best year (722K), 2016 the weakest (459K)",
          "With no profit or quantity columns, adapted the dashboard with category-sales and ship-mode views",
        ],
      },
      {
        no: "03",
        title: "E-commerce case study",
        kind: "Case study · Strategy",
        tools: ["PowerPoint", "Dashboard wireframing"],
        dataset: "No dataset: full analytical framework",
        summary:
          "Why sales were falling while site traffic kept rising: the full analytical plan, from framing the problem to recommendations, for leadership.",
        points: [
          "Framed the problem, stakeholders, KPIs and the data needed: transactions, customers, marketing and web analytics",
          "Planned the cleaning, exploratory analysis (seasonality, segments, funnel) and an executive dashboard",
          "Delivered a 12+ slide deck, report, KPI document, root-cause analysis and dashboard wireframe",
        ],
      },
      {
        no: "04",
        title: "Credit risk & loan default analytics",
        kind: "Capstone · Banking",
        tools: ["Excel", "SQL", "Python", "Power BI"],
        dataset: "German Credit: 1,000 customers × 21 attributes",
        summary:
          "As a junior banking data analyst, analysed which borrowers are likely to default and how lending decisions could improve, end to end across four tools.",
        points: [
          "Cleaned and prepared the data, with derived features like age segments, credit bands and employment stability",
          "Excel pivots and a slicer dashboard, about 30 SQL queries with window functions and CTEs, and Python EDA",
          "A Power BI dashboard, a root-cause analysis of defaults, and lending recommendations",
        ],
      },
    ],
  },
];
