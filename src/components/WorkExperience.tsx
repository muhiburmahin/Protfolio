"use client";

import { motion, useReducedMotion } from "framer-motion";
import { workExperience } from "@/data/experience";
import type { ExperienceIcon } from "@/types/portfolio";
import { Icon, type IconName } from "@/components/ui/icon";

const experienceIconMap: Record<ExperienceIcon, IconName> = {
  briefcase: "briefcase",
  code: "code",
  rocket: "rocket",
};

export default function WorkExperience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-bg-secondary/20 py-16 sm:py-20 md:py-24"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[min(60vw,28rem)] w-[min(60vw,28rem)] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Icon name="briefcase" size={13} />
            Professional Journey
          </div>
          <h2 className="section-title text-center">Work Experience</h2>
          <p className="mx-auto max-w-2xl text-sm text-text-secondary sm:text-base">
            Hands-on full-stack delivery through freelance work, production apps, and continuous learning.
          </p>
        </motion.div>

        {/* cards */}
        <div className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
          {workExperience.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="card-hover group bg-bg-primary/50 border border-border/50 p-5 sm:p-6 md:p-8"
            >
              {/* top row */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                    <Icon name={experienceIconMap[job.icon]} size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-heading sm:text-lg md:text-xl">{job.role}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-accent">{job.company}</p>
                  </div>
                </div>

                <div className="ml-14 flex items-center gap-3 sm:ml-0 sm:flex-col sm:items-end sm:gap-2">
                  <span className="rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-bold text-brand">
                    {job.period}
                  </span>
                  {job.status === "Current" && (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-500">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      Current
                    </span>
                  )}
                </div>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-text-secondary sm:text-sm">{job.description}</p>

              {/* highlights */}
              <ul className="mb-3 flex flex-wrap gap-1.5 sm:gap-2">
                {job.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent sm:py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* tech tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-text-secondary sm:py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
