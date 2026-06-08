import type { SkillProficiency } from "@/types/portfolio";

const proficiencyBarWidth: Record<SkillProficiency, number> = {
  Learning: 55,
  Comfortable: 78,
  Production: 95,
};

const proficiencyStyles: Record<
  SkillProficiency,
  { badge: string; bar: string }
> = {
  Learning: {
    badge: "bg-bg-primary text-text-secondary border-border",
    bar: "from-slate-400 to-slate-500",
  },
  Comfortable: {
    badge: "bg-accent/10 text-accent border-accent/30",
    bar: "from-brand/80 to-accent",
  },
  Production: {
    badge: "bg-brand/10 text-brand border-brand/30",
    bar: "from-brand to-accent",
  },
};

export function getSkillBarWidth(proficiency: SkillProficiency): number {
  return proficiencyBarWidth[proficiency];
}

export function getProficiencyStyles(proficiency: SkillProficiency) {
  return proficiencyStyles[proficiency];
}
