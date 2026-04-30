"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", icon: "fas fa-bolt text-brand", hoverColor: "group-hover:from-purple-500/20 group-hover:to-brand/20" },
  { name: "React.js", icon: "fab fa-react text-blue-400", hoverColor: "group-hover:from-blue-400/20 group-hover:to-blue-500/20" },
  { name: "TypeScript", icon: "fas fa-code text-blue-600", hoverColor: "group-hover:from-blue-600/20 group-hover:to-blue-700/20" },
  { name: "Node.js", icon: "fab fa-node text-green-500", hoverColor: "group-hover:from-green-500/20 group-hover:to-green-600/20" },
  { name: "PostgreSQL", icon: "fas fa-server text-blue-500", hoverColor: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20" },
  { name: "Prisma", icon: "fas fa-gem text-emerald-500", hoverColor: "group-hover:from-emerald-500/20 group-hover:to-green-500/20" },
  { name: "Tailwind CSS", icon: "fas fa-palette text-cyan-400", hoverColor: "group-hover:from-cyan-400/20 group-hover:to-cyan-500/20" },
  { name: "Framer Motion", icon: "fas fa-wave-square text-pink-500", hoverColor: "group-hover:from-pink-500/20 group-hover:to-rose-500/20" },
  { name: "GSAP", icon: "fas fa-magic text-green-400", hoverColor: "group-hover:from-green-400/20 group-hover:to-lime-500/20" },
  { name: "Lenis", icon: "fas fa-mouse text-slate-400", hoverColor: "group-hover:from-slate-400/20 group-hover:to-slate-500/20" },
  { name: "Docker", icon: "fab fa-docker text-blue-400", hoverColor: "group-hover:from-blue-400/20 group-hover:to-blue-600/20" },
  { name: "Git/GitHub", icon: "fab fa-github text-slate-800 dark:text-white", hoverColor: "group-hover:from-slate-500/20 group-hover:to-slate-600/20" },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-24 bg-bg-secondary/30 relative z-10 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Heading with Icon Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <motion.i
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="fas fa-microchip text-brand mr-4 inline-block"
            ></motion.i>
            Tech Stack
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mt-4">
            Leveraging the latest technologies to build high-performance web applications with seamless animations and robust backends.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="text-center group"
            >
              <div className={`icon-badge mx-auto mb-5 relative overflow-hidden transition-all duration-500 bg-bg-secondary group-hover:glow-box bg-gradient-to-br ${tech.hoverColor}`}>
                {/* Floating shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />

                <i className={`${tech.icon} text-3xl transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(var(--brand-rgb),0.5)]`}></i>
              </div>

              <p className="text-text-primary font-bold text-sm tracking-wide transition-colors duration-300 group-hover:text-brand">
                {tech.name}
              </p>

              {/* Subtle indicator under name */}
              <motion.div
                className="h-1 w-0 bg-brand mx-auto mt-2 rounded-full"
                whileHover={{ width: "20px" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}