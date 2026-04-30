"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home", id: "home", icon: "fas fa-home" },
  { name: "About", href: "#about", id: "about", icon: "fas fa-user" },
  { name: "Skills", href: "#skills", id: "skills", icon: "fas fa-star" },
  { name: "Projects", href: "#projects", id: "projects", icon: "fas fa-briefcase" },
];

const moreItems = [
  { name: "Technologies", href: "#technologies", id: "technologies", icon: "fas fa-microchip" },
  { name: "Education", href: "#education", id: "education", icon: "fas fa-graduation-cap" },
  { name: "Reviews", href: "#testimonials", id: "testimonials", icon: "fas fa-comments" },
  { name: "Contact", href: "#contact", id: "contact", icon: "fas fa-envelope" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Scroll Spy Logic
      const sections = [...navItems, ...moreItems].map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop Navbar - Floating Pill Design */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl hidden lg:block">
        <div className="bg-bg-secondary/70 backdrop-blur-xl border border-border rounded-full px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(168,85,247,0.1)] transition-all duration-300">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" />
            </a>

            {/* Main Links */}
            <ul className="flex items-center gap-2 relative">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <li 
                    key={item.name} 
                    className="relative z-10 px-4 py-2"
                    onMouseEnter={() => setHoveredPath(item.href)}
                    onMouseLeave={() => setHoveredPath(null)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative z-10 flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${
                        isActive ? "text-brand" : "text-text-primary hover:text-heading"
                      }`}
                    >
                      <i className={`${item.icon} ${isActive ? "text-brand" : "text-text-secondary"}`}></i>
                      {item.name}
                    </a>
                    
                    {/* Hover indicator */}
                    {hoveredPath === item.href && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 bg-brand/10 rounded-full -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 rounded-full bg-brand -translate-x-1/2"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </li>
                );
              })}
              
              {/* More Dropdown */}
              <li 
                className="relative z-10 px-4 py-2 cursor-pointer"
                onMouseEnter={() => setIsMoreHovered(true)}
                onMouseLeave={() => setIsMoreHovered(false)}
              >
                <div className="flex items-center gap-2 font-medium text-sm text-text-primary hover:text-heading transition-colors">
                  <i className="fas fa-ellipsis-h text-text-secondary"></i>
                  More
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isMoreHovered ? "rotate-180 text-brand" : ""}`}></i>
                </div>

                <AnimatePresence>
                  {isMoreHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 pt-4"
                    >
                      <div className="bg-bg-secondary/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-2 w-56 relative overflow-hidden">
                        {/* Subtle glow inside dropdown */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl rounded-full"></div>
                        
                        {moreItems.map((item) => {
                          const isActive = activeSection === item.id;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={(e) => {
                                handleNavClick(e, item.href);
                                setIsMoreHovered(false);
                              }}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                                isActive ? "bg-brand/10 text-brand" : "hover:bg-bg-primary text-text-primary"
                              }`}
                            >
                              {/* Hover sweep effect */}
                              <span className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/5 to-brand/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                              
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isActive ? "bg-brand/20" : "bg-bg-primary group-hover:bg-brand/10"
                              }`}>
                                <i className={`${item.icon} ${isActive ? "text-brand" : "text-text-secondary group-hover:text-brand"}`}></i>
                              </div>
                              <span className="font-medium text-sm relative z-10">{item.name}</span>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-primary hover:text-brand hover:border-brand transition-all duration-300 hover:rotate-12"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.i
                      key={theme}
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className={`fas ${theme === "dark" ? "fa-sun text-yellow-400" : "fa-moon text-indigo-600"}`}
                    ></motion.i>
                  </AnimatePresence>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 w-full z-50 lg:hidden">
        <div className="bg-bg-secondary/90 backdrop-blur-xl border-b border-border px-5 py-4 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          </a>
          
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-primary"
              >
                <i className={`fas ${theme === "dark" ? "fa-sun text-yellow-400" : "fa-moon text-indigo-600"}`}></i>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-brand/10 rounded-lg text-brand"
            >
              <motion.span 
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} 
                className="w-5 h-0.5 bg-current block transition-all"
              />
              <motion.span 
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-5 h-0.5 bg-current block transition-all"
              />
              <motion.span 
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
                className="w-5 h-0.5 bg-current block transition-all"
              />
            </button>
          </div>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-0 top-[73px] bg-bg-secondary/95 backdrop-blur-2xl border-t border-border z-40 overflow-y-auto"
            >
              <div className="p-6 pb-24 space-y-2">
                {[...navItems, ...moreItems].map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={item.name}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                          isActive ? "bg-brand/10 border border-brand/20" : "hover:bg-bg-primary border border-transparent"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-brand text-white shadow-lg shadow-brand/30" : "bg-bg-secondary border border-border text-text-secondary"}`}>
                          <i className={`${item.icon}`}></i>
                        </div>
                        <span className={`font-bold text-lg ${isActive ? "text-brand" : "text-heading"}`}>{item.name}</span>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
