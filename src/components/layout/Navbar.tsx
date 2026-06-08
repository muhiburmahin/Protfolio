"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/icon";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useNavbarScroll } from "@/lib/hooks/use-navbar-scroll";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
  id: string;
  icon: IconName;
};

const MAIN_LINKS: NavLink[] = [
  { label: "Home", href: "#home", id: "home", icon: "home" },
  { label: "About", href: "#about", id: "about", icon: "user" },
  { label: "Skills", href: "#skills", id: "skills", icon: "star" },
  { label: "Projects", href: "#projects", id: "projects", icon: "rocket" },
];

const MORE_LINKS: NavLink[] = [
  { label: "Technologies", href: "#technologies", id: "technologies", icon: "microchip" },
  { label: "Experience", href: "#experience", id: "experience", icon: "briefcase" },
  { label: "Education", href: "#education", id: "education", icon: "graduationCap" },
  { label: "Contact", href: "#contact", id: "contact", icon: "mail" },
];

const ALL_LINKS = [...MAIN_LINKS, ...MORE_LINKS];
const SCROLL_OFFSET = 72;

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { isScrolled } = useNavbarScroll(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const position = window.scrollY + SCROLL_OFFSET;
      let current = "home";

      for (const link of ALL_LINKS) {
        const el = document.getElementById(link.id);
        if (el && position >= el.offsetTop) current = link.id;
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreHover(false);
  };

  const scrollTo = (href: string) => {
    closeMenus();
    const el = document.getElementById(href.replace("#", ""));
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - SCROLL_OFFSET + 4, behavior: "smooth" });
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  const isMoreActive = MORE_LINKS.some((l) => l.id === activeId);

  const linkClasses = (isActive: boolean, scrolled: boolean) =>
    cn(
      "relative z-10 flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
      scrolled
        ? isActive
          ? "text-white"
          : "text-white/80 hover:text-white"
        : isActive
          ? "text-brand"
          : "text-text-secondary hover:text-heading"
    );

  const iconClasses = (isActive: boolean, scrolled: boolean) =>
    cn(
      "shrink-0 transition-colors duration-200",
      scrolled
        ? isActive
          ? "text-white"
          : "text-white/70"
        : isActive
          ? "text-brand"
          : "text-text-secondary"
    );

  const renderDesktopLink = (link: NavLink) => {
    const isActive = activeId === link.id;
    return (
      <a
        key={link.id}
        href={link.href}
        onClick={(e) => onNavClick(e, link.href)}
        className="relative rounded-full px-3 py-1.5"
      >
        <span className={linkClasses(isActive, isScrolled)}>
          <Icon name={link.icon} size={15} className={iconClasses(isActive, isScrolled)} />
          {link.label}
        </span>
        {isActive && (
          <motion.span
            layoutId="active-nav-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              isScrolled ? "bg-white/20" : "bg-brand/12 dark:bg-brand/20"
            )}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
          />
        )}
      </a>
    );
  };

  const renderMobileLink = (link: NavLink) => {
    const isActive = activeId === link.id;
    return (
      <a
        key={link.id}
        href={link.href}
        onClick={(e) => onNavClick(e, link.href)}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors active:scale-[0.98]",
          isScrolled
            ? isActive
              ? "bg-white/20 text-white"
              : "text-white/90 hover:bg-white/10"
            : isActive
              ? "bg-brand/10 text-brand"
              : "text-heading hover:bg-bg-primary"
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            isScrolled
              ? isActive
                ? "bg-white/25 text-white"
                : "bg-white/10 text-white/80"
              : isActive
                ? "bg-brand/15 text-brand"
                : "bg-bg-primary text-text-secondary"
          )}
        >
          <Icon name={link.icon} size={18} />
        </span>
        {link.label}
      </a>
    );
  };

  if (!mounted) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-[padding] duration-300",
          isScrolled ? "p-0" : "px-2 sm:px-3 lg:px-0 lg:pt-[env(safe-area-inset-top,0px)]"
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative mx-auto w-full border backdrop-blur-xl transition-colors duration-300",
            isScrolled
              ? "max-w-none rounded-none border-x-0 border-t-0 border-white/10 bg-brand shadow-md"
              : "max-w-5xl rounded-full border-border bg-bg-secondary/80 shadow-lg lg:mt-5",
            isScrolled ? "h-14 px-3 sm:px-5 lg:px-8" : "h-11 px-3 sm:h-12 sm:px-4"
          )}
        >
          <div className="flex h-full items-center justify-between gap-2 sm:gap-3">
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => onNavClick(e, "#home")}
              className="group flex min-w-0 shrink-0 items-center gap-2"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm sm:h-9 sm:w-9 sm:rounded-xl",
                  isScrolled
                    ? "bg-white text-brand"
                    : "bg-gradient-to-br from-brand to-brand-light text-white"
                )}
              >
                <Image src="/logo.png" alt="Mahin" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
              </motion.div>
              <span
                className={cn(
                  "truncate font-heading text-base font-black tracking-tight sm:text-lg",
                  isScrolled ? "text-white" : "text-heading"
                )}
              >
                Mahin<span className={isScrolled ? "text-white/70" : "text-brand"}>.</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {MAIN_LINKS.map(renderDesktopLink)}

              <div
                className="relative"
                onMouseEnter={() => setMoreHover(true)}
                onMouseLeave={() => setMoreHover(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                    isScrolled
                      ? isMoreActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : isMoreActive
                        ? "text-brand"
                        : "text-text-secondary hover:text-heading"
                  )}
                  aria-expanded={moreHover}
                  aria-haspopup="menu"
                >
                  <Icon
                    name="more"
                    size={15}
                    className={cn(
                      isScrolled ? (isMoreActive ? "text-white" : "text-white/70") : isMoreActive ? "text-brand" : "text-text-secondary"
                    )}
                  />
                  <span className="relative z-10">More</span>
                  <Icon
                    name="chevronDown"
                    size={14}
                    className={cn(
                      "relative z-10 transition-transform duration-200",
                      moreHover && "rotate-180",
                      isScrolled ? "text-white/70" : "text-text-secondary"
                    )}
                  />
                  {isMoreActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className={cn(
                        "absolute inset-0 rounded-full",
                        isScrolled ? "bg-white/20" : "bg-brand/12 dark:bg-brand/20"
                      )}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {moreHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[13rem]"
                    >
                      <div className="rounded-xl border border-border bg-bg-secondary p-1.5 shadow-xl">
                        {MORE_LINKS.map((link) => {
                          const isActive = activeId === link.id;
                          return (
                            <a
                              key={link.id}
                              href={link.href}
                              onClick={(e) => onNavClick(e, link.href)}
                              className={cn(
                                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                  ? "bg-brand/10 text-brand"
                                  : "text-text-primary hover:bg-bg-primary"
                              )}
                            >
                              <Icon name={link.icon} size={16} className={isActive ? "text-brand" : "text-text-secondary"} />
                              {link.label}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <a
                href="#contact"
                onClick={(e) => onNavClick(e, "#contact")}
                className={cn(
                  "hidden items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm transition-all sm:inline-flex sm:text-sm",
                  isScrolled
                    ? "bg-white text-brand hover:bg-white/90"
                    : "bg-brand text-white hover:bg-brand-dark"
                )}
              >
                Hire me
              </a>

              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors sm:h-9 sm:w-9 sm:rounded-full",
                  isScrolled
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    : "border-border bg-bg-primary text-text-primary hover:border-brand/40"
                )}
                aria-label="Toggle theme"
              >
                <Icon
                  name={theme === "dark" ? "sun" : "moon"}
                  size={16}
                  className={theme === "dark" ? "text-yellow-300" : "text-indigo-500"}
                />
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors lg:hidden sm:h-9 sm:w-9",
                  isScrolled
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-border bg-bg-primary text-heading"
                )}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <Icon name={menuOpen ? "x" : "menu"} size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu — full panel, no top gap */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMenus}
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "fixed inset-x-0 z-50 border-b shadow-xl lg:hidden",
                isScrolled
                  ? "top-[calc(env(safe-area-inset-top,0px)+3.5rem)]"
                  : "top-[calc(env(safe-area-inset-top,0px)+2.75rem)] sm:top-[calc(env(safe-area-inset-top,0px)+3rem)]",
                isScrolled ? "border-white/10 bg-brand" : "border-border bg-bg-secondary"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <nav className="mx-auto max-h-[calc(100dvh-3.5rem)] max-w-lg overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
                <div className="flex flex-col gap-0.5">
                  {ALL_LINKS.map(renderMobileLink)}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => onNavClick(e, "#contact")}
                  className={cn(
                    "mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-md active:scale-[0.98]",
                    isScrolled ? "bg-white text-brand" : "bg-brand text-white"
                  )}
                >
                  <Icon name="mail" size={18} />
                  Hire me
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
