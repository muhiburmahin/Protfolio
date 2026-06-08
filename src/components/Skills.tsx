"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { getProficiencyStyles, getSkillBarWidth } from "@/lib/skills";
import { Icon } from "@/components/ui/icon";

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-16 transition-colors duration-500 sm:py-20 md:py-24"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-[min(60vw,30rem)] w-[min(60vw,30rem)] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[min(50vw,24rem)] w-[min(50vw,24rem)] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 space-y-4 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            <Icon name="sparkles" size={14} />
            My Expertise
          </div>

          <h2 className="section-title text-center">Professional Skills</h2>

          <p className="mx-auto max-w-xl text-sm font-medium text-text-secondary sm:text-base">
            Proficiency reflects real project usage —{" "}
            <span className="font-semibold text-brand">Production</span>,{" "}
            <span className="font-semibold text-accent">Comfortable</span>, or{" "}
            <span className="font-semibold text-text-secondary">Learning</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-1 text-[10px] font-bold uppercase sm:gap-3">
            {(["Production", "Comfortable", "Learning"] as const).map((level) => {
              const styles = getProficiencyStyles(level);
              return (
                <span key={level} className={`rounded-full border px-3 py-1 sm:px-4 ${styles.badge}`}>
                  {level}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* cards */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card-hover group"
            >
              <div className="mb-6 flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-primary transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                  <Icon name={category.icon} className={category.color} size={20} />
                </div>
                <h3 className="text-base font-bold text-heading sm:text-lg md:text-xl">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => {
                  const styles = getProficiencyStyles(skill.proficiency);
                  const barWidth = getSkillBarWidth(skill.proficiency);

                  return (
                    <div key={skill.name} className="relative">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-semibold text-text-primary sm:text-sm">
                          <Icon
                            name={skill.icon}
                            className={`${skill.iconClassName} transition-transform group-hover:scale-110`}
                            size={16}
                          />
                          {skill.name}
                        </span>
                        <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${styles.badge}`}>
                          {skill.proficiency}
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-border/20 sm:h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${barWidth}%` }}
                          viewport={{ once: true }}
                          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: "circOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${styles.bar}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center sm:mt-16"
        >
          <a href="#contact" className="btn-primary inline-flex">
            <Icon name="mail" size={18} />
            Hire Me Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
