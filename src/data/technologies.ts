import type { IconName } from "@/components/ui/icon";

export type Technology = {
  name: string;
  icon: IconName;
  iconClassName: string;
  hoverColor: string;
};

export const technologies: Technology[] = [
  { name: "Next.js", icon: "bolt", iconClassName: "text-brand", hoverColor: "group-hover:from-purple-500/20 group-hover:to-brand/20" },
  { name: "TypeScript", icon: "typescript", iconClassName: "text-blue-600", hoverColor: "group-hover:from-blue-600/20 group-hover:to-blue-700/20" },
  { name: "Node.js", icon: "node", iconClassName: "text-green-500", hoverColor: "group-hover:from-green-500/20 group-hover:to-green-600/20" },
  { name: "PostgreSQL", icon: "database", iconClassName: "text-blue-500", hoverColor: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20" },
  { name: "Prisma", icon: "gem", iconClassName: "text-emerald-500", hoverColor: "group-hover:from-emerald-500/20 group-hover:to-green-500/20" },
  { name: "React.js", icon: "react", iconClassName: "text-blue-400", hoverColor: "group-hover:from-blue-400/20 group-hover:to-blue-500/20" },
  { name: "Tailwind CSS", icon: "palette", iconClassName: "text-cyan-400", hoverColor: "group-hover:from-cyan-400/20 group-hover:to-cyan-500/20" },
  { name: "Framer Motion", icon: "waves", iconClassName: "text-pink-500", hoverColor: "group-hover:from-pink-500/20 group-hover:to-rose-500/20" },
  { name: "Lenis", icon: "mouse", iconClassName: "text-slate-400", hoverColor: "group-hover:from-slate-400/20 group-hover:to-slate-500/20" },
  { name: "Docker", icon: "docker", iconClassName: "text-blue-400", hoverColor: "group-hover:from-blue-400/20 group-hover:to-blue-600/20" },
  { name: "Git/GitHub", icon: "github", iconClassName: "text-heading", hoverColor: "group-hover:from-slate-500/20 group-hover:to-slate-600/20" },
];
