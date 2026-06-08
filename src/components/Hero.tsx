"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { useMounted } from "@/lib/hooks/use-mounted";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const HERO_ROLES = ["Full Stack Developer", "Problem Solver"] as const;
const FULL_NAME = siteConfig.name;

// Fixed values — no Math.random() to avoid SSR/client hydration mismatch
const HERO_PARTICLES = [
  { id: 0,  width: 96,  height: 68,  left: 16.2, top: 48.9, driftX: -12, driftY:  8,  duration: 11.2, mobileOnly: true  },
  { id: 1,  width: 151, height: 98,  left: 29.2, top: 25.4, driftX:  18, driftY: -14, duration: 13.5, mobileOnly: true  },
  { id: 2,  width: 114, height: 121, left: 32.1, top: 92.7, driftX: -16, driftY:  12, duration: 10.8, mobileOnly: true  },
  { id: 3,  width: 157, height: 49,  left: 10.9, top: 46.3, driftX:  10, driftY: -18, duration: 14.1, mobileOnly: true  },
  { id: 4,  width: 103, height: 109, left: 84.6, top: 41.6, driftX: -20, driftY:  16, duration: 12.7, mobileOnly: true  },
  { id: 5,  width: 101, height: 116, left: 39.6, top: 11.2, driftX:  14, driftY:  -8, duration: 9.4,  mobileOnly: false },
  { id: 6,  width: 56,  height: 141, left: 7.6,  top: 20.3, driftX:  -6, driftY:  18, duration: 15.0, mobileOnly: false },
  { id: 7,  width: 100, height: 49,  left: 75.0, top: 32.6, driftX:  16, driftY: -12, duration: 11.6, mobileOnly: false },
  { id: 8,  width: 91,  height: 57,  left: 76.6, top: 23.0, driftX: -18, driftY:  10, duration: 13.2, mobileOnly: false },
  { id: 9,  width: 80,  height: 148, left: 98.8, top: 40.3, driftX:  12, driftY: -16, duration: 14.8, mobileOnly: false },
  { id: 10, width: 120, height: 120, left: 44.2, top: 71.1, driftX:  -8, driftY:  14, duration: 10.3, mobileOnly: false },
  { id: 11, width: 80,  height: 96,  left: 10.1, top: 42.2, driftX:  20, driftY: -10, duration: 12.0, mobileOnly: false },
];

const SOCIAL_LINKS = [
  { icon: "github" as IconName, url: "https://github.com/muhiburmahin", label: "GitHub" },
  { icon: "linkedin" as IconName, url: "https://www.linkedin.com/in/muhiburmahin", label: "LinkedIn" },
  {
    icon: "facebook" as IconName,
    url: "https://www.facebook.com/profile.php?id=61583224643452",
    label: "Facebook",
  },
] as const;

export default function Hero() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const [typedName, setTypedName] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  const showAnimations = mounted && !prefersReducedMotion;

  useEffect(() => {
    if (!showAnimations) {
      setTypedName(FULL_NAME);
      setDisplayText(HERO_ROLES[0]);
      return;
    }

    let i = 0;
    const typing = setInterval(() => {
      setTypedName(FULL_NAME.slice(0, i + 1));
      i++;
      if (i === FULL_NAME.length) clearInterval(typing);
    }, 70);

    return () => clearInterval(typing);
  }, [showAnimations]);

  useEffect(() => {
    if (!showAnimations) return;

    let charIndex = 0;
    const currentText = HERO_ROLES[roleIndex];

    const typing = setInterval(() => {
      setDisplayText(currentText.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentText.length) {
        clearInterval(typing);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
          setDisplayText("");
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typing);
  }, [showAnimations, roleIndex]);

  const nameDisplay = mounted ? typedName : FULL_NAME;
  const roleDisplay = mounted ? displayText : HERO_ROLES[0];

  const particles = useMemo(
    () =>
      HERO_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full bg-brand/10 blur-2xl dark:bg-accent/5",
            !particle.mobileOnly && "hidden md:block"
          )}
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={
            showAnimations
              ? {
                  x: [0, particle.driftX, 0],
                  y: [0, particle.driftY, 0],
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.5, 0.25],
                }
              : undefined
          }
          transition={
            showAnimations
              ? { duration: particle.duration, repeat: Infinity }
              : undefined
          }
        />
      )),
    [showAnimations]
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-bg-primary pt-[calc(4.5rem+env(safe-area-inset-top))] pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20"
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[min(70vw,28rem)] w-[min(70vw,28rem)] rounded-full bg-brand/15 blur-3xl dark:bg-brand/10"
          animate={showAnimations ? { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] } : undefined}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-1/4 h-[min(60vw,24rem)] w-[min(60vw,24rem)] rounded-full bg-accent/10 blur-3xl"
          animate={showAnimations ? { scale: [1.05, 1, 1.05], opacity: [0.2, 0.4, 0.2] } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 overflow-hidden">{particles}</div>
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        initial={showAnimations ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Text column — first on mobile, left on desktop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
            className="order-2 flex flex-col space-y-5 sm:space-y-7 lg:order-1 lg:space-y-8"
          >
            <motion.div
              className="space-y-3 text-center sm:space-y-4 md:text-left"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand sm:gap-3 sm:text-sm sm:tracking-[0.28em] md:justify-start">
                <span className="h-px w-6 bg-brand sm:w-10 sm:h-[2px]" aria-hidden />
                Welcome to my world
              </p>

              <h1 className="text-balance font-black leading-[1.15] text-heading">
                <span className="block text-[clamp(1.75rem,5.5vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-6xl">
                  Hey, I&apos;m
                </span>
                <span className="mt-1 block bg-gradient-to-r from-brand via-brand-light to-accent bg-clip-text font-heading text-[clamp(1.35rem,4.2vw+0.4rem,3.75rem)] italic leading-[1.2] text-transparent sm:mt-2">
                  {nameDisplay}
                  {showAnimations && (
                    <span className="ml-0.5 inline-block animate-pulse text-brand not-italic">|</span>
                  )}
                </span>
              </h1>

              <motion.div
                className="flex min-h-[2.75rem] items-center justify-center sm:min-h-[3.25rem] md:min-h-16 md:justify-start"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="text-balance text-base font-bold text-text-secondary sm:text-xl md:text-2xl lg:text-4xl">
                  I am a{" "}
                  <span className="text-accent underline decoration-brand/30 underline-offset-4 sm:underline-offset-6 md:underline-offset-8">
                    {roleDisplay}
                    {showAnimations && (
                      <span className="ml-0.5 inline-block animate-pulse">|</span>
                    )}
                  </span>
                </p>
              </motion.div>

              <p className="mx-auto max-w-md border-l-4 border-brand pl-3 text-sm italic leading-relaxed text-text-secondary sm:max-w-lg sm:pl-4 sm:text-base md:mx-0 md:text-lg">
                &ldquo;Crafting modern, responsive, and user-friendly web experiences as a{" "}
                <span className="font-medium text-heading">Full Stack Modern Website Developer</span>
                . Transforming complex problems into elegant solutions.&rdquo;
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-stretch gap-4 pt-1 sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:justify-start md:pt-2"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="#contact"
                className="btn-primary group w-full justify-center sm:w-auto"
              >
                <Icon
                  name="send"
                  className="transition-transform group-hover:rotate-12"
                  size={18}
                />
                Say Hello
              </Link>

              <motion.div
                className="flex justify-center gap-5 sm:justify-start"
                role="list"
                aria-label="Social profiles"
              >
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    aria-label={social.label}
                    role="listitem"
                  >
                    <Icon name={social.icon} size={22} className="sm:h-6 sm:w-6" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image column — shown first on mobile for visual punch */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            className="order-1 flex justify-center lg:order-2"
          >
            <motion.div
              className="relative mx-auto w-fit max-w-full px-2 sm:px-0"
              animate={showAnimations ? { y: [0, -10, 0] } : undefined}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 scale-110 rounded-full border-2 border-brand/20 max-sm:hidden"
                animate={showAnimations ? { scale: [1.1, 1.18, 1.1], opacity: [0.4, 0.15, 0.4] } : undefined}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 scale-125 rounded-full border-2 border-accent/10 max-sm:hidden"
                animate={showAnimations ? { scale: [1.2, 1.28, 1.2], opacity: [0.25, 0.08, 0.25] } : undefined}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-brand to-accent opacity-20 blur-2xl transition duration-700 group-hover:opacity-35 sm:-inset-4 sm:blur-3xl" />

              <div className="relative z-10 mx-auto size-52 overflow-hidden rounded-full border-[6px] border-bg-secondary shadow-2xl min-[400px]:size-60 sm:size-72 sm:border-8 md:size-80 lg:size-96 lg:border-[10px]">
                <Image
                  src="/hiro.jpg"
                  alt={FULL_NAME}
                  fill
                  priority
                  className="object-cover object-top grayscale-[15%] transition duration-700 hover:grayscale-0"
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              <motion.div
                className="absolute bottom-2 right-0 z-20 rounded-xl border border-border bg-bg-secondary/95 px-3 py-2 shadow-xl backdrop-blur-md sm:bottom-auto sm:top-8 sm:-right-4 sm:rounded-2xl sm:px-5 sm:py-3 md:-right-8"
                initial={showAnimations ? { opacity: 0, x: 12 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="text-lg font-black text-brand sm:text-xl"
                  animate={showAnimations ? { scale: [1, 1.05, 1] } : undefined}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  1+
                </motion.div>
                <motion.div className="text-[9px] uppercase tracking-wide text-text-secondary sm:text-[10px]">
                  Years Experience
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint — hidden on very small screens to avoid overlap */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 sm:block"
        initial={showAnimations ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-text-secondary transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label="Scroll to about section"
        >
          <span className="mb-1 text-xs sm:text-sm">Scroll Down</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-current p-1 sm:h-10 sm:w-6">
            <div className="h-1.5 w-1 animate-bounce rounded-full bg-current" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
