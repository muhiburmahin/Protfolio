"use client";

import { motion, useReducedMotion } from "framer-motion";
import { education } from "@/data/education";
import type { EducationIcon } from "@/types/portfolio";
import { Icon } from "@/components/ui/icon";

const educationIconMap: Record<EducationIcon, React.ReactNode> = {
  code: <Icon name="code" size={18} />,
  book: <Icon name="book" size={18} />,
  school: <Icon name="graduationCap" size={18} />,
};

export default function Education() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-bg-primary/50 py-16 sm:py-20 md:py-24"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[min(60vw,28rem)] w-[min(60vw,28rem)] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 space-y-3 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            <Icon name="graduationCap" size={13} />
            Academic Journey
          </div>
          <h2 className="section-title text-center">Education</h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-brand sm:w-20" />
        </motion.div>

        {/* timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* vertical line — left on mobile, centered on md+ */}
          <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-brand via-accent to-transparent opacity-30 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={edu.degree}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className={`relative flex items-start md:items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
                >
                  {/* dot */}
                  <div
                    className={`absolute left-5 z-20 h-4 w-4 rounded-full border-4 border-bg-primary shadow-[0_0_8px_rgba(168,85,247,0.5)] md:left-1/2 md:-translate-x-1/2 ${edu.dotColor}`}
                  />

                  {/* card */}
                  <div className="w-full pl-14 md:w-[45%] md:pl-0">
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
                      transition={{ duration: 0.25 }}
                      className="card-hover group bg-bg-secondary/40 p-5 backdrop-blur-sm sm:p-6 md:p-7"
                    >
                      {/* top: icon + period */}
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-primary transition-transform duration-300 group-hover:rotate-6 ${edu.color}`}
                        >
                          {educationIconMap[edu.icon]}
                        </div>
                        <span className="rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-bold text-brand">
                          {edu.period}
                        </span>
                      </div>

                      <h3 className="mb-1 text-base font-bold leading-snug text-heading sm:text-lg md:text-xl">
                        {edu.degree}
                      </h3>
                      <p className="mb-3 text-sm font-semibold text-accent">{edu.institution}</p>
                      <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{edu.description}</p>

                      {edu.status === "Ongoing" && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">
                            Currently Enrolled
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* spacer on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
