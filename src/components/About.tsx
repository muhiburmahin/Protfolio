"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

/** 
 * Props definition
 */
interface FloatingTextProps {
  text: string;
  delay: number;
}

// -- Animation Variants --
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
  },
};

// -- Background Floating Text (Responsive to Theme) --
const FloatingTextElement = ({ text, delay }: FloatingTextProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{
      opacity: [0.03, 0.1, 0.03],
      y: [0, -30, 0],
    }}
    transition={{
      delay: delay,
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute font-black select-none text-7xl md:text-9xl z-0 pointer-events-none hidden md:block text-brand opacity-10"
  >
    {text}
  </motion.div>
);

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden bg-bg-primary transition-colors duration-500">

      {/* --- Theme-Sensitive Animated Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Light Mode: Soft White/Lavender Glow | Dark Mode: Deep Navy/Blue Glow */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <FloatingTextElement text="NODE.JS" delay={0} />
        <div className="absolute top-1/3 right-10">
          <FloatingTextElement text="NEXT.JS" delay={2} />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FloatingTextElement text="PRISMA" delay={1} />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title inline-block">
            <span className="text-accent"></span> About Me
          </h2>
          <div className="h-1 w-20 bg-brand mx-auto rounded-full mt-2" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* --- Image Side --- */}
          <motion.div variants={itemVariants} className="relative group flex justify-center">
            <div className="relative">
              {/* Profile Image Frame with Theme-Sensitive Border */}
              <div className="relative w-72 h-96 md:w-80 md:h-[450px] rounded-2xl overflow-hidden border-2 border-border bg-bg-secondary shadow-2xl z-10">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="/covar2.png"
                  alt="Profile"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 grayscale-[20%]"
                />
              </div>

              {/* Experience Badge (Purple Theme) */}
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-brand to-brand-dark text-white font-bold p-6 rounded-2xl shadow-xl z-20"
              >
                <p className="text-3xl leading-none">1+</p>
                <p className="text-[10px] uppercase tracking-widest mt-1">Years Exp.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* --- Text Content Side --- */}
          <div className="space-y-6">
            <motion.p variants={itemVariants} className="text-xl text-text-primary leading-relaxed font-medium">
              I am a <span className="text-brand">Full Stack Developer</span> with a mission to build robust and scalable web ecosystems.
            </motion.p>

            <motion.p variants={itemVariants} className="text-text-secondary">
              My technical foundation is built on the <span className="font-semibold text-heading">MERN Stack</span> and <span className="font-semibold text-heading">Next.js</span>. I specialize in developing high-performance backends using <span className="text-brand">Node.js, Express, and PostgreSQL</span>, ensuring seamless data management with <span className="text-brand">Prisma ORM</span>.
            </motion.p>

            <motion.p variants={itemVariants} className="text-text-secondary">
              On the frontend, I focus on creating pixel-perfect, responsive interfaces using <span className="text-brand">Tailwind CSS</span>. I enjoy adding life to web pages through smooth animations with <span className="text-accent">Framer Motion</span> and <span className="text-accent">GSAP</span>.
            </motion.p>

            {/* Core Tech Stack Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-4">
              {['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'TypeScript'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-brand/5 border border-border rounded-full text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.div variants={itemVariants} className="pt-8">
              <a href="/resume.pdf" className="btn-primary">
                Download Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}