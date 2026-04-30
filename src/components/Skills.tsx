"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skillsData = [
  {
    title: "Frontend Development",
    icon: "fas fa-laptop-code",
    color: "text-brand",
    skills: [
      { name: "Next.js", icon: "fab fa-react text-blue-500", level: "Expert", percent: 95 },
      { name: "React.js", icon: "fab fa-react text-blue-400", level: "Expert", percent: 95 },
      { name: "Tailwind CSS", icon: "fas fa-palette text-cyan-400", level: "Expert", percent: 92 },
      { name: "TypeScript", icon: "fas fa-code text-blue-500", level: "Intermediate", percent: 80 },
      { name: "Framer Motion / GSAP", icon: "fas fa-running text-pink-500", level: "Expert", percent: 88 },
    ]
  },
  {
    title: "Backend & Database",
    icon: "fas fa-server",
    color: "text-accent",
    skills: [
      { name: "Node.js / Express", icon: "fab fa-node text-green-400", level: "Expert", percent: 88 },
      { name: "PostgreSQL / Prisma", icon: "fas fa-database text-blue-400", level: "Intermediate", percent: 85 },
      { name: "MongoDB / Mongoose", icon: "fas fa-leaf text-green-600", level: "Expert", percent: 90 },
      { name: "Firebase / NextAuth", icon: "fas fa-shield-alt text-yellow-500", level: "Expert", percent: 87 },
      { name: "REST / GraphQL", icon: "fas fa-plug text-orange-400", level: "Expert", percent: 92 },
    ]
  },
  {
    title: "Core Programming",
    icon: "fas fa-brain",
    color: "text-purple-500",
    skills: [
      { name: "C++ (Competitive)", icon: "fas fa-terminal text-indigo-400", level: "Expert", percent: 90 },
      { name: "Data Structures", icon: "fas fa-sitemap text-brand", level: "Expert", percent: 88 },
      { name: "Algorithms", icon: "fas fa-code-branch text-accent", level: "Expert", percent: 85 },
      { name: "System Design", icon: "fas fa-project-diagram text-blue-500", level: "Intermediate", percent: 70 },
      { name: "Git & Docker", icon: "fab fa-git-alt text-orange-500", level: "Expert", percent: 95 },
    ]
  }
];
export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="skills" className="py-24 relative overflow-hidden transition-colors duration-500">

      {/* Background Animation using CSS variables for colors */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-border text-brand text-xs font-bold uppercase tracking-widest"
          >
            My Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center"
          >
            Professional Skills
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text-secondary font-medium"
          >
            Building high-performance applications with <span className="text-brand font-bold">1+ year</span> of experience.
          </motion.p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-hover group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-bg-primary border border-border group-hover:scale-110 transition-transform duration-300">
                  <i className={`${category.icon} text-xl ${category.color}`}></i>
                </div>
                <h3 className="text-xl font-bold text-heading">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-primary font-semibold flex items-center gap-2.5 text-sm">
                        <i className={`${skill.icon} w-5 text-center transition-transform group-hover:scale-110`}></i>
                        {skill.name}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-border/50 bg-bg-primary text-text-secondary`}>
                        {skill.level}
                      </span>
                    </div>

                    {/* Standard Progress Bar */}
                    <div className="h-2 bg-border/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-brand to-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="btn-primary">
            <i className="fas fa-envelope"></i>
            Hire Me Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}