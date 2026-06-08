"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/icon";
import { siteConfig } from "@/lib/site";

const socialLinks: { icon: IconName; url: string; title: string }[] = [
  { icon: "github", url: "https://github.com/muhiburmahin", title: "GitHub" },
  { icon: "linkedin", url: "https://www.linkedin.com/in/muhiburmahin", title: "LinkedIn" },
  { icon: "facebook", url: "https://www.facebook.com/profile.php?id=61583224643452", title: "Facebook" },
];

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "#skills", label: "Web Development" },
  { href: "#projects", label: "App Development" },
  { href: "#contact", label: "Consulting" },
  { href: "#contact", label: "Code Review" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg-secondary pb-8 pt-12 sm:pt-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* grid — 2×2 on mobile, 4 cols on lg */}
        <div className="mb-10 grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">

          {/* brand — full width on smallest, 2 cols otherwise */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <Icon name="code" size={18} />
              </div>
              <span className="text-lg font-bold text-brand">Mahin</span>
            </div>
            <p className="flex gap-2 text-sm leading-relaxed text-text-secondary">
              <Icon name="quote" size={15} className="mt-0.5 shrink-0" />
              Full Stack Developer crafting beautiful and functional digital experiences for the web.
            </p>

            {/* socials inline on mobile brand block */}
            <div className="mt-5 flex gap-3 lg:hidden">
              {socialLinks.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.title}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-white"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-heading sm:text-base">
              <Icon name="link" className="text-brand" size={15} />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-brand"
                  >
                    <Icon name="chevronRight" size={12} className="shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-heading sm:text-base">
              <Icon name="settings" className="text-accent" size={15} />
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    <Icon name="chevronRight" size={12} className="shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* follow — hidden on mobile (shown in brand block), visible on lg */}
          <div className="hidden lg:block">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-heading">
              <Icon name="share" className="text-pink-500" size={15} />
              Follow Me
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.title}
                  title={s.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand transition-all hover:-translate-y-1 hover:bg-brand hover:text-white"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* divider + copyright */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col items-center gap-2 text-xs text-text-secondary sm:flex-row sm:justify-between sm:text-sm">
            <p className="flex items-center gap-1.5">
              <Icon name="copyright" size={13} />
              {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon name="heart" className="text-red-500" size={13} />
              </motion.span>{" "}
              using <span className="font-semibold text-brand">Next.js & Tailwind</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
