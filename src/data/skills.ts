import type { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "laptop",
    color: "text-brand",
    skills: [
      { name: "Next.js", icon: "react", iconClassName: "text-blue-500", proficiency: "Production" },
      { name: "React.js", icon: "react", iconClassName: "text-blue-400", proficiency: "Production" },
      { name: "Tailwind CSS", icon: "palette", iconClassName: "text-cyan-400", proficiency: "Production" },
      { name: "TypeScript", icon: "typescript", iconClassName: "text-blue-500", proficiency: "Comfortable" },
      { name: "Framer Motion", icon: "waves", iconClassName: "text-pink-500", proficiency: "Comfortable" },
    ],
  },
  {
    title: "Backend & Database",
    icon: "server",
    color: "text-accent",
    skills: [
      { name: "Node.js / Express", icon: "node", iconClassName: "text-green-400", proficiency: "Production" },
      { name: "PostgreSQL / Prisma", icon: "database", iconClassName: "text-blue-400", proficiency: "Comfortable" },
      { name: "MongoDB / Mongoose", icon: "leaf", iconClassName: "text-green-600", proficiency: "Comfortable" },
      { name: "Clerk / NextAuth", icon: "shield", iconClassName: "text-yellow-500", proficiency: "Comfortable" },
      { name: "REST APIs", icon: "plug", iconClassName: "text-orange-400", proficiency: "Production" },
    ],
  },
  {
    title: "Core Programming",
    icon: "brain",
    color: "text-purple-500",
    skills: [
      { name: "C++ (Competitive)", icon: "terminal", iconClassName: "text-indigo-400", proficiency: "Production" },
      { name: "Data Structures", icon: "network", iconClassName: "text-brand", proficiency: "Comfortable" },
      { name: "Algorithms", icon: "gitBranch", iconClassName: "text-accent", proficiency: "Comfortable" },
      { name: "System Design", icon: "network", iconClassName: "text-blue-500", proficiency: "Learning" },
      { name: "Git & Docker", icon: "git", iconClassName: "text-orange-500", proficiency: "Production" },
    ],
  },
];
