"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { getAllTechnologies } from "@/lib/projects";
import type { Project } from "@/types/portfolio";
import { Icon } from "@/components/ui/icon";

const allTechnologies = getAllTechnologies();

const ProjectImageSlider = ({ images, name }: { images: string[]; name: string }) => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl sm:h-52 md:h-56">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${name} screenshot ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const comingSoonBtnClass =
  "flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-border bg-bg-secondary py-2 text-xs font-bold opacity-55";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const [currentPage, setCurrentPage] = useState(1);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const itemsPerPage = 3;

  const filteredProjects = useMemo(
    () => (!techFilter ? projects : projects.filter((p) => p.technologies.includes(techFilter))),
    [techFilter]
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectTechFilter = (tech: string | null) => {
    setTechFilter(tech);
    setCurrentPage(1);
  };

  return (
    <section id="projects" className="bg-bg-primary py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 space-y-4 text-center sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            <Icon name="rocket" size={13} />
            My Work
          </div>

          <h2 className="flex flex-wrap items-center justify-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-heading">Featured</span>
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <motion.div
            initial={prefersReducedMotion ? false : { width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto h-1.5 rounded-full bg-gradient-to-r from-brand via-accent to-brand shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          />

          <p className="mx-auto max-w-lg text-sm text-text-secondary sm:text-base md:text-lg">
            Production apps and works in progress — explore case studies for challenge, metrics, and stack details.
          </p>
        </motion.div>

        {/* filter chips — scrollable on mobile */}
        <div className="mb-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0 sm:mb-10">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            <button
              type="button"
              onClick={() => selectTechFilter(null)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold uppercase transition-all ${
                techFilter === null
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-bg-secondary text-text-secondary hover:border-brand/50"
              }`}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => selectTechFilter(tech)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold uppercase transition-all ${
                  techFilter === tech
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-bg-secondary text-text-secondary hover:border-brand/50"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* project grid */}
        {filteredProjects.length === 0 ? (
          <p className="py-12 text-center text-text-secondary">No projects match this filter.</p>
        ) : (
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project: Project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="card-hover group flex flex-col overflow-hidden bg-bg-secondary/20 p-0"
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    <ProjectImageSlider images={project.images} name={project.name} />
                  </Link>

                  <div className="flex flex-grow flex-col p-5 sm:p-6">
                    <div className="mb-3 flex min-h-[3rem] items-start justify-between gap-2">
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-base font-bold leading-tight text-heading transition-colors hover:text-brand sm:text-lg md:text-xl">
                          {project.name}
                        </h3>
                      </Link>
                      {project.comingSoon && (
                        <span className="shrink-0 rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] font-bold uppercase text-accent">
                          Soon
                        </span>
                      )}
                    </div>

                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
                      {project.description}
                    </p>

                    <p className="mb-3 line-clamp-2 border-l-2 border-brand/40 pl-3 text-xs italic text-text-secondary/90">
                      {project.challenge}
                    </p>

                    <ul className="mb-4 space-y-1">
                      {project.metrics.slice(0, 3).map((metric) => (
                        <li key={metric} className="flex items-start gap-2 text-[11px] text-text-secondary">
                          <span className="mt-0.5 text-brand">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>

                    {project.highlights.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-brand/20 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-text-secondary transition-colors group-hover:border-brand/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* action buttons */}
                    <div className="mt-auto flex flex-col gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand/30 bg-brand/10 py-2 text-sm font-bold text-brand transition-all hover:bg-brand/20"
                      >
                        View case study
                        <Icon name="chevronRight" size={16} />
                      </Link>

                      {project.comingSoon ? (
                        <div className="flex gap-2">
                          <span className={comingSoonBtnClass}>
                            <Icon name="github" size={14} /> Coming Soon
                          </span>
                          <span className={comingSoonBtnClass}>
                            <Icon name="clock" size={14} /> Coming Soon
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {(project.githubClient || project.githubServer) && (
                            <div className="flex gap-2">
                              {project.githubClient && (
                                <a
                                  href={project.githubClient}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-bg-secondary py-2 text-xs font-bold transition-all hover:bg-brand/10"
                                >
                                  <Icon name="github" size={14} /> Frontend
                                </a>
                              )}
                              {project.githubServer && (
                                <a
                                  href={project.githubServer}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-bg-secondary py-2 text-xs font-bold transition-all hover:bg-brand/10"
                                >
                                  <Icon name="github" size={14} /> Backend
                                </a>
                              )}
                            </div>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-brand/30"
                            >
                              <Icon name="externalLink" size={16} /> Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3 sm:mt-14 sm:gap-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex items-center gap-1 text-xs font-bold text-text-secondary transition-colors hover:text-brand disabled:opacity-30"
            >
              ← PREV
            </button>

            <div className="flex items-center gap-1.5 rounded-full border border-border bg-bg-secondary/50 p-1.5 sm:gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "scale-110 bg-white text-black shadow-lg"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-1 text-xs font-bold text-text-secondary transition-colors hover:text-brand disabled:opacity-30"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
