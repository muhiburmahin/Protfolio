import type { WorkExperienceItem } from "@/types/portfolio";

export const workExperience: WorkExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance & Personal Projects",
    period: "2024 — Present",
    status: "Current",
    description:
      "Designing and shipping production web applications end-to-end — from UI and API design to deployment on Vercel with PostgreSQL, authentication, and payments.",
    highlights: [
      "3+ deployed production apps",
      "Next.js App Router + TypeScript",
      "Stripe & Clerk integrations",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    icon: "briefcase",
  },
  {
    role: "Open Source & Learning",
    company: "Self-directed",
    period: "2023 — Present",
    status: "Current",
    description:
      "Building portfolio projects, contributing to personal repos, and strengthening fundamentals in DSA, system design, and modern full-stack patterns alongside university coursework.",
    highlights: [
      "GitHub portfolio maintenance",
      "Competitive programming (C++)",
      "Continuous upskilling",
    ],
    technologies: ["TypeScript", "MongoDB", "Docker", "Git"],
    icon: "code",
  },
];
