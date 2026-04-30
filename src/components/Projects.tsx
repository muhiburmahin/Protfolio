"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projectsData = [
  {
    id: 1,
    name: 'MediStore: Complete Medicine Delivery App',
    images: [
      "/project/111/1.png",
      "/project/111/2.png",
      "/project/111/3.png",
    ],
    description: 'Medicine Ordering App is a full-stack solution built with React.js, MongoDB, Express, and Node.js. It offers secure order placement, user authentication, and real-time updates.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Stripe', 'Clerk'],
    liveLink: 'https://medistore-iota.vercel.app',
    github: 'https://github.com/muhiburmahin/MediStore_Fontend'
  },
  {
    id: 2,
    name: 'Roohani - Premium Clothing Brand',
    images: [
      "/project/222/1.png",
      "/project/222/2.png",
      "/project/222/3.png",
    ],
    description: 'Roohani is an elegant e-commerce platform for high-quality fabrics and traditional wear. It features a modern product showcase, category filtering, and a seamless shopping experience designed for fashion enthusiasts.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Stripe', 'Clerk'],
    liveLink: 'https://roohani.vercel.app',
    github: 'https://github.com/muhiburmahin/Roohani_Full-Stack'
  },
  {
    id: 3,
    name: 'Schedulrr: Smart Appointment Manager',
    images: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80',
      'https://images.unsplash.com/photo-1616587894289-86480e533129?w=500&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80'
    ],
    description: 'Built with Next.js and Prisma, Schedulrr streamlines scheduling with real-time updates, secure authentication, and a responsive dashboard.',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'Neon DB', 'Clerk'],
    liveLink: '#',
    github: '#'
  },
  {
    id: 4,
    name: 'Schedulrr: Smart Appointment Manager',
    images: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80',
      'https://images.unsplash.com/photo-1616587894289-86480e533129?w=500&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80'
    ],
    description: 'Built with Next.js and Prisma, Schedulrr streamlines scheduling with real-time updates, secure authentication, and a responsive dashboard.',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'Neon DB', 'Clerk'],
    liveLink: '#',
    github: '#'
  },
];

const ProjectImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${index === i ? "bg-white w-4" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
};

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  const paginatedProjects = projectsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="projects" className="py-24 bg-bg-primary">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            {/* Animated Rocket Icon */}
            <div className="p-3 rounded-2xl bg-brand/10 border border-brand/20 shadow-[0_0_20px_rgba(var(--brand-rgb),0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand animate-pulse"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13 0-2.97l-3-3.03Z" />
                <path d="M15 9l-9 9" />
                <path d="M13 15l8.09-8.09a2 2 0 0 0 0-2.83l-.17-.17a2 2 0 0 0-2.83 0L9.91 12.09l1.18 1.18L13 15Z" />
                <path d="M10 10l.73-.73a2 2 0 0 1 2.82 0l1.47 1.47a2 2 0 0 1 0 2.82L14.3 14.3" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-heading">Featured</span>{" "}
              <span className="text-brand bg-clip-text text-transparent bg-gradient-to-r from-brand to-accent">
                Projects
              </span>
            </h2>
          </motion.div>

          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "120px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1.5 bg-gradient-to-r from-brand via-accent to-brand rounded-full shadow-[0_0_15px_rgba(var(--brand-rgb),0.5)]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-6 text-text-secondary max-w-lg text-lg"
          >
            See my best works here, created with a simple and modern interface.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-hover group flex flex-col p-0 bg-bg-secondary/20 overflow-hidden"
              >
                {/* 3 Image Slider */}
                <ProjectImageSlider images={project.images} />

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-heading mb-4 min-h-[3.5rem] leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-6 line-clamp-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-[10px] font-bold uppercase bg-bg-primary text-text-secondary border border-border rounded-md group-hover:border-brand/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-3">
                    <a href={project.github} className="flex-1 py-2 rounded-lg bg-bg-secondary border border-border flex items-center justify-center gap-2 text-sm font-bold hover:bg-brand/10 transition-all">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                    <a href={project.liveLink} className="flex-1 py-2 rounded-lg bg-brand text-white flex items-center justify-center gap-2 text-sm font-bold hover:shadow-lg hover:shadow-brand/30 transition-all">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Pagination (Image style) */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="text-text-secondary hover:text-brand disabled:opacity-30 flex items-center gap-1 font-bold text-xs"
          >
            ← PREV
          </button>

          <div className="flex items-center gap-2 bg-bg-secondary/50 p-1.5 rounded-full border border-border">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${currentPage === i + 1
                  ? "bg-white text-black scale-110 shadow-lg"
                  : "text-text-secondary hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="text-text-secondary hover:text-brand disabled:opacity-30 flex items-center gap-1 font-bold text-xs"
          >
            NEXT →
          </button>
        </div>
      </div>
    </section>
  );
}