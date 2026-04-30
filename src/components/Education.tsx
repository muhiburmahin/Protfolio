"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  color: string;
  dotColor: string;
  icon: JSX.Element;
}

const educationData = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Metropolitan University, Sylhet",
    period: "2024 - Present",
    status: "Ongoing",
    description: "Focusing on Software Engineering, Database Systems, and Microprocessor architecture. Maintaining a strong academic record while building real-world projects.",
    color: "text-brand",
    dotColor: "bg-brand",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="2" x2="12" y2="22" /></svg>
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Sylhet Science & Technology College",
    period: "2022 - 2023",
    status: "Completed",
    description: "Successfully completed higher secondary education with a major in Science with a focus on Physics and Mathematics.",
    color: "text-accent",
    dotColor: "bg-accent",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Thana Sadar High School,Companiganj,Sylhet",
    period: "2019 - 2021",
    status: "Completed",
    description: "Foundation in science and mathematics, achieving excellence in academic results and participating in science fairs.",
    color: "text-pink-500",
    dotColor: "bg-pink-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-bg-primary/50">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest"
          >
            Academic Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center"
          >
            Education
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-accent to-transparent md:-translate-x-1/2 opacity-30"></div>

          <div className="space-y-12">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isEven ? -100 : 100 // Left if even, Right if odd
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: "easeOut"
                  }}
                  className={`flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Connector Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-bg-primary z-20 md:-translate-x-1/2 shadow-[0_0_10px_rgba(var(--brand-rgb),0.5)] ${edu.dotColor}`}
                  ></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ml-12 md:ml-0`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card-hover group p-8 bg-bg-secondary/40 backdrop-blur-sm border border-border/50"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-bg-primary border border-border group-hover:rotate-12 transition-transform ${edu.color}`}>
                          {edu.icon}
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand">
                          {edu.period}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-heading mb-1 text-left">
                        {edu.degree}
                      </h3>

                      <p className="text-accent font-semibold text-sm mb-4">
                        {edu.institution}
                      </p>

                      <p className="text-text-secondary text-sm leading-relaxed">
                        {edu.description}
                      </p>

                      {edu.status === "Ongoing" && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-[10px] uppercase font-bold text-green-500 tracking-wider">Currently Enrolled</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty Space for layout */}
                  <div className="hidden md:block md:w-[45%]"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}