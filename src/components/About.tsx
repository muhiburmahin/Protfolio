"use client";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { aboutContent } from "@/data/about";
import { Icon } from "@/components/ui/icon";
import { useMounted } from "@/lib/hooks/use-mounted";
import { RESUME_DOWNLOAD_URL, RESUME_FILENAME } from "@/lib/constants";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface FloatingTextProps {
  text: string;
  delay: number;
  className?: string;
  reducedMotion: boolean;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

/* ─────────────────────────── data ──────────────────────────── */
const STATS: StatItem[] = [
  {
    value: 3,
    suffix: "+",
    label: "Projects Shipped",
    icon: <Icon name="rocket" size={20} />,
  },
  {
    value: 1,
    suffix: "+",
    label: "Years Experience",
    icon: <Icon name="briefcase" size={20} />,
  },
  {
    value: 7,
    suffix: "+",
    label: "Technologies",
    icon: <Icon name="bolt" size={20} />,
  },
  {
    value: 100,
    suffix: "%",
    label: "Dedication",
    icon: <Icon name="heart" size={20} />,
  },
];

const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: <Icon name="laptop" size={24} />,
    title: "Frontend Dev",
    description: "Pixel-perfect UIs with React & Next.js — fast, accessible, and beautifully animated.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "from-brand/20 to-brand/5 border-brand/20",
  },
  {
    icon: <Icon name="server" size={24} />,
    title: "Backend Dev",
    description: "Robust REST APIs with Node.js, Express, and type-safe data models using Prisma + PostgreSQL.",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma"],
    color: "from-accent/20 to-accent/5 border-accent/20",
  },
  {
    icon: <Icon name="rocket" size={24} />,
    title: "Full Stack Deploy",
    description: "End-to-end delivery — auth, payments, CI/CD, and production deployments on Vercel.",
    tags: ["Vercel", "NextAuth", "Stripe", "TypeScript"],
    color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  },
];

/* ─────────────────────────── variants ──────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] },
  },
};

/* ─────────────────────────── sub-components ────────────────── */
function FloatingTextElement({ text, delay, className, reducedMotion }: FloatingTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={
        reducedMotion
          ? { opacity: 0.05, y: 0 }
          : { opacity: [0.03, 0.09, 0.03], y: [0, -22, 0] }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { delay, duration: 7, repeat: Infinity, ease: "easeInOut" }
      }
      className={cn(
        "pointer-events-none absolute z-0 hidden select-none font-black text-brand md:block md:text-7xl lg:text-9xl",
        className
      )}
    >
      {text}
    </motion.div>
  );
}

/* Animated counter */
function Counter({ value, suffix, reducedMotion }: { value: number; suffix: string; reducedMotion: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || reducedMotion) {
      setCount(value);
      return;
    }
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(duration / value);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────── main component ────────────────── */
export default function About() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !mounted || Boolean(prefersReducedMotion);

  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-bg-primary py-16 transition-colors duration-500 sm:py-20 md:py-24"
    >
      {/* ── background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-25 dark:opacity-40">
          <motion.div
            className="absolute -left-[10%] -top-[10%] h-[min(55vw,22rem)] w-[min(55vw,22rem)] rounded-full bg-brand/20 blur-[100px]"
            animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-[10%] -right-[10%] h-[min(50vw,20rem)] w-[min(50vw,20rem)] rounded-full bg-accent/20 blur-[100px]"
            animate={reduceMotion ? undefined : { scale: [1.04, 1, 1.04], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        <FloatingTextElement text="NEXT.JS" delay={0} className="left-4 top-16 lg:left-10" reducedMotion={reduceMotion} />
        <FloatingTextElement text="NODE.JS" delay={2} className="right-6 top-1/3 lg:right-10" reducedMotion={reduceMotion} />
        <FloatingTextElement text="PRISMA" delay={1} className="bottom-16 left-1/4" reducedMotion={reduceMotion} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── section header with LOGO ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col items-center gap-5 text-center sm:mb-16 md:mb-20"
        >
          {/* Icon */}
          <motion.div
            initial={reduceMotion ? false : { scale: 0.7, opacity: 0, rotate: -15 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative"
          >
            <div className="absolute inset-0 scale-125 rounded-full bg-brand/30 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/20 to-accent/10 shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl">
              <Icon name="user" size={32} className="text-brand sm:hidden" />
              <Icon name="user" size={40} className="hidden text-brand sm:block" />
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="inline-block rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
              Get to know me
            </div>
            <h2 className="section-title">About Me</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-brand sm:w-20" />
          </div>
        </motion.div>

        {/* ── main grid: image + text ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-40px" }}
          className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
        >
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="order-1 flex justify-center lg:order-none"
          >
            <div className="relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-xs md:max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-brand/25 to-accent/20 blur-2xl sm:-inset-4"
              />

              <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-border bg-bg-secondary shadow-2xl">
                <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src="/covar2.png"
                      alt={`${siteConfig.name} — profile`}
                      fill
                      className="object-cover object-top grayscale-[15%] transition-all duration-500 hover:grayscale-0"
                      sizes="(max-width: 640px) 272px, (max-width: 768px) 320px, 384px"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={reduceMotion ? false : { rotate: -12, scale: 0.8, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.25 }}
                className="absolute -bottom-4 right-2 z-20 rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 py-3 text-white shadow-xl sm:-bottom-5 sm:-right-5 sm:rounded-2xl sm:px-6 sm:py-4"
              >
                <p className="text-2xl font-black leading-none sm:text-3xl">{aboutContent.experienceLabel}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-widest opacity-90 sm:text-[10px]">Years Exp.</p>
              </motion.div>

              {/* Open-to-work pill */}
              <motion.div
                initial={reduceMotion ? false : { x: -16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -left-3 top-6 z-20 flex items-center gap-2 rounded-full border border-green-500/30 bg-bg-secondary/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:-left-6 sm:top-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[10px] font-bold text-green-500 sm:text-xs">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-2 space-y-4 text-center sm:space-y-5 md:text-left lg:order-none lg:space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-balance text-base font-medium leading-relaxed text-text-primary sm:text-lg md:text-xl"
            >
              I am a{" "}
              <span className="font-semibold text-brand">{aboutContent.role}</span> focused on
              building robust, scalable web products from idea to deployment.
            </motion.p>

            {aboutContent.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 40)}
                variants={itemVariants}
                className="text-sm leading-relaxed text-text-secondary sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Tech tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 pt-1 sm:gap-2.5 md:justify-start"
              role="list"
              aria-label="Core technologies"
            >
              {aboutContent.techTags.map((skill) => (
                <span
                  key={skill}
                  role="listitem"
                  className="rounded-full border border-border bg-brand/5 px-3 py-1.5 text-[11px] font-semibold text-brand transition-all hover:border-brand/40 hover:bg-brand hover:text-white sm:px-4 sm:py-2 sm:text-xs"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-stretch gap-3 pt-3 sm:flex-row sm:justify-center md:justify-start md:pt-5"
            >
              <a
                href={RESUME_DOWNLOAD_URL}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group w-full justify-center sm:w-auto"
              >
                <Icon name="fileText" size={18} className="transition-transform group-hover:-translate-y-0.5" />
                Download Resume
              </a>
              <a href="#contact" className="btn-secondary w-full justify-center sm:w-auto">
                <Icon name="send" size={18} />
                Hire Me
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── stats row ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-6 md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="card-hover flex flex-col items-center gap-2 py-5 text-center sm:py-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand sm:h-11 sm:w-11">
                {stat.icon}
              </span>
              <p className="text-2xl font-black text-heading sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix} reducedMotion={reduceMotion} />
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-secondary sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── "What I Build" service cards ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 sm:mt-12"
        >
          <h3 className="mb-6 text-center text-lg font-bold text-heading sm:mb-8 sm:text-xl">
            What I Build
          </h3>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {SERVICE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className={cn(
                  "rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 sm:p-6",
                  card.color
                )}
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-bg-secondary/80 text-brand shadow-sm sm:mb-4 sm:h-12 sm:w-12">
                  {card.icon}
                </span>
                <h4 className="mb-2 font-bold text-heading">{card.title}</h4>
                <p className="mb-4 text-xs leading-relaxed text-text-secondary sm:text-sm">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-bg-secondary/70 px-2 py-0.5 text-[10px] font-semibold text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
