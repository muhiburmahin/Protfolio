"use client";

import { motion, useReducedMotion } from "framer-motion";
import { technologies } from "@/data/technologies";
import { Icon } from "@/components/ui/icon";

export default function Technologies() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="technologies"
      className="relative z-10 overflow-hidden bg-bg-secondary/30 py-16 transition-colors duration-500 sm:py-20 md:py-24"
    >
      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-1/4 top-0 h-[min(60vw,24rem)] w-[min(60vw,24rem)] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -left-1/4 bottom-0 h-[min(50vw,20rem)] w-[min(50vw,20rem)] rounded-full bg-accent/5 blur-3xl" />
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
          <div className="inline-block rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            My Arsenal
          </div>

          <h2 className="section-title flex flex-wrap items-center justify-center gap-3">
            <motion.span
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-flex"
            >
              <Icon name="microchip" className="text-brand" size={32} />
            </motion.span>
            Tech Stack
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Leveraging modern technologies to build high-performance web applications with
            seamless animations and robust backends.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 sm:gap-6 md:grid-cols-5 lg:grid-cols-6 lg:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`relative mx-auto mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:mb-4 sm:h-16 sm:w-16 bg-gradient-to-br ${tech.hoverColor}`}
              >
                <motion.div className="-translate-x-full absolute inset-0 bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                <Icon
                  name={tech.icon}
                  className={`${tech.iconClassName} transition-transform duration-300 group-hover:scale-110`}
                  size={26}
                />
              </div>

              <p className="text-xs font-bold tracking-wide text-text-primary transition-colors duration-300 group-hover:text-brand sm:text-sm">
                {tech.name}
              </p>

              <motion.div
                className="mx-auto mt-1.5 h-0.5 w-0 rounded-full bg-brand"
                whileHover={{ width: 20 }}
                transition={{ duration: 0.25 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
