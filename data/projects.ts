export type CaseStudy = {
  problem: string;
  approach: string;
  pipeline: string[];
  technologies: string[];
  results: string[];
  learnings: string[];
};

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  category: string;
  tags: string[];
  featured?: boolean;
  publication?: string;
  codeUrl?: string;
  metrics?: { label: string; value: string; note?: string }[];
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "fee-recovery-automation-platform",
    title: "Automated Fee-Recovery Platform for Amazon-Seller Clients",
    oneLiner:
      "An end-to-end audit, automation, and dashboard platform that surfaces fee-recovery opportunities across 72 client accounts every month.",
    category: "FULL-STACK · DATA ENGINEERING",
    tags: ["Python", "AWS EKS", "Snowflake", "React.js", "Selenium"],
    featured: true,
    metrics: [
      { label: "Client accounts", value: "72", note: "monthly" },
      { label: "Reports automated", value: "8" },
      { label: "Est. impact", value: "$10K–100K+", note: "per client" },
      { label: "Invoice downloads", value: "1,000+", note: "per run" },
    ],
    caseStudy: {
      problem:
        "Amazon-seller clients lose money to fee discrepancies buried across thousands of invoices, and verifying them by hand across 72 accounts every month doesn't scale — it's slow, inconsistent, and easy to miss real recovery opportunities.",
      approach:
        "Authored Python audit logic to detect fee discrepancies in seller invoices and standardise fee-recovery calculations across accounts, with Selenium automation sourcing 1,000+ invoice downloads per run across clients and regions. Built Snowflake pipelines feeding operational dashboards with refreshed metrics and configurable alerts, then designed and deployed end-to-end automation for 8 fee-recovery reports (including cooperative audit calculations) on AWS EKS. Integrated the backend APIs with dashboard microservices and React components so ops teams could act on the findings directly, and added S3-backed data download workflows via Retool for analyst self-service.",
      pipeline: [
        "Selenium — invoice sourcing (1,000+ / run)",
        "Python — audit logic & discrepancy detection",
        "Snowflake — pipelines & alerting",
        "AWS EKS / ECS — automated report deployment",
        "React dashboards — insights across 72 accounts",
      ],
      technologies: [
        "Python",
        "Selenium",
        "Snowflake",
        "AWS EKS",
        "AWS ECS",
        "React.js",
        "Retool",
        "S3",
      ],
      results: [
        "Automated 8 fee-recovery reports end-to-end on AWS EKS, eliminating manual processing.",
        "Surfaced insights across 72 client accounts monthly, informing roughly 10 new recovery opportunities per month projected at $10K–100K+ per client depending on invoice volume.",
        "Built S3-backed data download workflows via Retool, improving analyst self-service and cutting data-access latency.",
        "Automated data generation and verification pipelines on AWS ECS, improving deployment reliability and shortening release cycles.",
      ],
      learnings: [
        "Standardising audit logic once and running it across every account catches discrepancies that ad-hoc, per-client checks miss.",
        "Pairing a backend automation pipeline with a self-service dashboard turns a one-off analyst task into a repeatable operational process.",
        "Deploying on managed orchestration (EKS/ECS) rather than ad-hoc scripts made the pipeline reliable enough to run unattended every month.",
      ],
    },
  },
  {
    slug: "distributed-caching-layer",
    title: "Distributed Caching Layer for High-Volume Case Deduplication",
    oneLiner:
      "A Redis + MySQL caching layer with SHA-256 content fingerprinting that cut duplicate case submissions by 88% across 10,400+ product listings.",
    category: "SYSTEMS ENGINEERING · BACKEND",
    tags: ["Redis", "MySQL", "AWS RDS", "SHA-256", "Distributed Systems"],
    metrics: [
      { label: "Dup. reduction", value: "88%" },
      { label: "ASIN cases", value: "10,400+" },
      { label: "DB round-trips", value: "1,000 → 1", note: "per batch" },
    ],
    caseStudy: {
      problem:
        "A workflow generating cases from product-detail-page changes was submitting massive numbers of duplicate cases across 10,400+ ASINs, each triggering redundant database round-trips and inflating processing cost.",
      approach:
        "Designed and built a distributed Redis + MySQL RDS caching layer that fingerprints incoming case content with SHA-256 to detect duplicates before they ever reach the database. Replaced per-record queries with Redis batch reads and pipelined writes to collapse roughly 1,000 database calls into a single round-trip, and made cache writes asynchronous and non-blocking so case-creation latency stayed unaffected. This work was part of a broader infrastructure migration that also touched data-pipeline refactoring, backend authentication, and a move to PostgreSQL and Snowflake.",
      pipeline: [
        "Incoming case submission",
        "SHA-256 content fingerprint",
        "Redis — deduplication lookup",
        "MySQL RDS — batched reads / pipelined writes",
        "Async, non-blocking cache write-back",
      ],
      technologies: ["Redis", "MySQL", "AWS RDS", "Python", "SHA-256"],
      results: [
        "Cut duplicate case submissions by 88% across 10,400+ ASIN PDP-change cases.",
        "Reduced database round-trips from roughly 1,000 queries to a single batched call via Redis batch reads and pipelined writes.",
        "Made cache writes async and non-blocking, keeping case-creation throughput unaffected by the added caching layer.",
        "Contributed to the broader infrastructure migration: data-pipeline refactoring, backend authentication changes, and the move to PostgreSQL and Snowflake.",
      ],
      learnings: [
        "Content fingerprinting is a cheap, effective way to dedupe at scale before load ever reaches the database.",
        "Batching and pipelining reads eliminates most of the round-trip cost in high-volume systems — the win is architectural, not just a faster cache.",
        "Async writes decouple latency-sensitive request paths from caching overhead, which matters more than the cache hit rate itself under load.",
      ],
    },
  },
  {
    slug: "idd-automated-annotation",
    title: "Automated Data Annotation for the Indian Driving Dataset",
    oneLiner:
      "A two-stage zero-shot annotation pipeline that approaches supervised performance on complex Indian road scenes — with no dataset-specific training.",
    category: "COMPUTER VISION · RESEARCH",
    tags: ["Grounding DINO", "SAM/SAM2", "Zero-Shot Inference", "Semantic Segmentation"],
    publication: "Co-authored conference paper — PES University, DSAI",
    metrics: [
      { label: "mIoU", value: "0.5527", note: "vs 0.5541 supervised ERFNet" },
      { label: "AP@0.5", value: "0.4029", note: "vs 0.4991 supervised ResNet101" },
      { label: "Detection images", value: "46,588" },
      { label: "Object classes", value: "34" },
    ],
    caseStudy: {
      problem:
        "Manually annotating driving datasets is slow and expensive, and the Indian Driving Dataset captures unusually complex, unstructured road scenes. Supervised annotation models need dataset-specific training on labels that don't exist yet — a chicken-and-egg problem at scale.",
      approach:
        "Designed a two-stage zero-shot pipeline: Grounding DINO performs language-conditioned object detection — locating objects from text prompts with no dataset-specific training — and its detections seed SAM/SAM2 for instance segmentation. The pipeline was run across the IDD's 46,588 detection images and 10,003 segmentation images spanning 34 object classes, then benchmarked against strongly supervised baselines on the validation split.",
      pipeline: [
        "IDD Images — 46,588 detection / 10,003 segmentation",
        "Text Prompts — 34 object classes",
        "Grounding DINO — language-conditioned detection",
        "SAM / SAM2 — instance segmentation",
        "Benchmark vs supervised baselines — mIoU, AP@0.5",
        "Annotated Dataset",
      ],
      technologies: [
        "Grounding DINO",
        "SAM / SAM2",
        "Python",
        "OpenCV",
        "Zero-Shot Inference",
        "Semantic Segmentation",
      ],
      results: [
        "Achieved 0.5527 mIoU — effectively matching a strongly supervised ERFNet baseline at 0.5541.",
        "Achieved 0.4029 AP@0.5 against 0.4991 for a supervised ResNet101 baseline.",
        "Processed the IDD's 46,588 detection images and 10,003 segmentation images across 34 object classes.",
        "Published as a co-authored conference paper (PES University, DSAI).",
      ],
      learnings: [
        "Zero-shot foundation models can approach task-specific supervised performance on complex, unstructured real-world scenes without any dataset-specific training.",
        "Chaining a language-conditioned detector with a promptable segmenter turns annotation into a prompt-engineering problem rather than a labelling one.",
        "Segmentation quality (mIoU) transfers to zero-shot far more readily than detection precision (AP@0.5), where the supervised baseline retained a clear edge.",
      ],
    },
  },
  {
    slug: "mask-detection",
    title: "Mask Detection System",
    oneLiner:
      "Real-time computer vision classifier detecting face masks from live video.",
    category: "COMPUTER VISION",
    tags: ["MobileNetV2", "OpenCV", "Keras", "Real-Time Inference"],
    codeUrl: "https://github.com/kvarun314",
    caseStudy: {
      problem:
        "Classifying whether people are wearing face masks in real time requires a model light enough to keep up with a live video stream on commodity hardware.",
      approach:
        "Built a real-time computer vision classifier using MobileNetV2 as an efficient backbone, with OpenCV handling video capture and face processing.",
      pipeline: [
        "Live Video",
        "OpenCV — frame capture & face processing",
        "MobileNetV2 — classification",
        "Real-time prediction overlay",
      ],
      technologies: ["MobileNetV2", "OpenCV", "Python", "Keras"],
      results: [
        "Real-time mask classification from live video; code available on GitHub.",
      ],
      learnings: [
        "Lightweight mobile-first backbones like MobileNetV2 make practical real-time inference possible without dedicated accelerators.",
      ],
    },
  },
  {
    slug: "enterprise-itsm-deployment",
    title: "Full-Stack ITSM Platform Deployment for Reliance Jio Network Stack",
    oneLiner:
      "Deployed and scaled an open-source ITSM tool across Reliance Jio's Network Stack instances, alongside 10 Java microservices for service assurance.",
    category: "FULL-STACK · ENTERPRISE",
    tags: ["Java", "Spring Boot", "Microservices", "React.js"],
    metrics: [
      { label: "Microservices delivered", value: "10" },
      { label: "Apps remediated", value: "18", note: "security compliance" },
      { label: "Instances scaled", value: "2" },
    ],
    caseStudy: {
      problem:
        "Jio's Network Stack Assurance Layer needed HP Service Manager integration and a reliable, full-stack ITSM tool that could scale across multiple network instances while meeting enterprise security-compliance requirements.",
      approach:
        "Designed and delivered 10 Java microservice applications to Solutions Architect specifications for the Network Stack Assurance Layer's HP Service Manager integration. Deployed a full-stack open-source ITSM tool for the IAX instance and scaled it to a second Reliance Jio Network Stack instance, and remediated security vulnerabilities across 18 Java applications to bring them into enterprise compliance.",
      pipeline: [
        "HP Service Manager integration",
        "Java microservices (Spring Boot) — Assurance Layer",
        "Open-source ITSM tool — deployed to IAX instance",
        "Scaled to second Network Stack instance",
        "Security remediation — 18 applications",
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "React.js"],
      results: [
        "Delivered 10 Java microservice applications to Solutions Architect specifications.",
        "Deployed a full-stack open-source ITSM tool and scaled it to a second Reliance Jio Network Stack instance.",
        "Remediated security vulnerabilities across 18 Java applications for enterprise compliance.",
      ],
      learnings: [
        "Scaling an enterprise tool to a second instance surfaces configuration and environment assumptions that a single deployment never exposes.",
        "Security remediation at this scale requires systematic triage across many codebases at once, not one-off fixes per application.",
      ],
    },
  },
];

export type Publication = {
  title: string;
  venue: string;
};

export const publications: Publication[] = [
  {
    title: "Automated Data Annotation for the Indian Driving Dataset",
    venue: "Co-authored conference paper — PES University, DSAI",
  },
  {
    title: "Artificial Intelligence for the Blind",
    venue: "NCRTEECIT 2016",
  },
  {
    title: "Application of Big Data Analytics with Evidence Based Medicine",
    venue: "IJTSRD, Volume 2 Issue 4, ISSN 2456-6470",
  },
  {
    title: "Decentralised Application for Digital Certification",
    venue: "IJTSRD, Volume 2 Issue 4, ISSN 2456-6470",
  },
];
