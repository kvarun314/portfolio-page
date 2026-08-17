export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary?: string;
  highlights: string[];
  technologies: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Analyst – Software Engineer",
    company: "Endava Solutions India",
    location: "Bengaluru, India",
    period: "Jul 2026 — Present",
    current: true,
    summary:
      "Transferred from Omnicom Media Group – Flywheel/Omni following Omni's strategic partnership with Endava, which moved Flywheel/Omni Product & Technology into Endava's operating model — same role and responsibilities.",
    highlights: [],
    technologies: ["Python", "Java", "AWS", "PostgreSQL", "Snowflake"],
  },
  {
    role: "Analyst – Software Engineer",
    company: "Omnicom Media Group – Flywheel",
    location: "Bengaluru, India",
    period: "Apr 2026 — Jun 2026",
    highlights: [
      "Built a distributed Redis + MySQL RDS caching layer with SHA-256 content fingerprinting, cutting duplicate WFL case submissions by 88% across 10,400+ ASIN PDP change cases.",
      "Cut database round-trips from 1,000 queries to a single call via Redis batch reads and pipelined writes; added async, non-blocking cache writes to keep case creation unaffected.",
      "Contributed to Flywheel's infrastructure migration to Omni: data pipeline refactoring, backend authentication changes, and architectural migration to PostgreSQL and Snowflake.",
    ],
    technologies: ["Redis", "MySQL", "PostgreSQL", "Snowflake", "AWS"],
  },
  {
    role: "Senior Associate Software Developer",
    company: "Omnicom Media Group – Flywheel",
    location: "Bengaluru, India",
    period: "Apr 2025 — Mar 2026",
    highlights: [
      "Designed and deployed end-to-end automation for 8 fee recovery reports (incl. cooperative audit calculations) on AWS EKS, eliminating manual processing.",
      "Integrated backend APIs with dashboard microservices and React components to surface fee-recovery insights across 72 client accounts monthly, informing roughly 10 new recovery opportunities per month projected at $10K–$100K+ per client depending on invoice volume.",
      "Built S3-backed data download workflows via Retool APIs, improving analyst self-service and cutting data access latency.",
      "Automated data generation and verification pipelines on AWS ECS, improving deployment reliability and shortening release cycles.",
    ],
    technologies: ["Python", "AWS EKS", "AWS ECS", "React.js", "Retool", "S3"],
  },
  {
    role: "Associate Software Developer",
    company: "Omnicom Media Group – Flywheel",
    location: "Bengaluru, India",
    period: "Jul 2024 — Apr 2025",
    highlights: [
      "Authored Python audit logic to detect fee discrepancies in Amazon-seller client invoices, standardising fee recovery calculations across accounts and eliminating manual verification; built Selenium automation to source 1,000+ invoice downloads per run across clients and regions.",
      "Built Snowflake pipelines feeding operational dashboards with refreshed metrics and configurable alerts for the operations team.",
      "Developed chargeback report APIs with Snowflake integration, delivering accurate, timely financial data to stakeholders.",
    ],
    technologies: ["Python", "Selenium", "Snowflake", "SQL", "ETL"],
  },
  {
    role: "Software Development Engineer",
    company: "Jio Platforms Ltd.",
    location: "Bengaluru, India",
    period: "Feb 2022 — Jul 2024",
    highlights: [
      "Contributed to the Network Stack Assurance Layer (HP Service Manager integration); designed and delivered 10 Java microservice applications to Solutions Architect specifications, and remediated security vulnerabilities across 18 Java applications for enterprise compliance.",
      "Deployed a full-stack open-source ITSM tool for the IAX instance and scaled it to a second Reliance Jio Network Stack instance.",
    ],
    technologies: ["Java", "Spring Boot", "Microservices", "React.js"],
  },
];
