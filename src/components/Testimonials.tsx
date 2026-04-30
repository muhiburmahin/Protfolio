"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

// --- Types ---
interface Testimonial {
  name: string;
  role: string;
  text: string;
  iconColor: string;
}

// --- Data (6 Testimonials for a smooth loop) ---
const testimonials: Testimonial[] = [
  {
    name: "James Miller",
    role: "CEO at FutureScale",
    text: "Mahin's work was exceptional. He delivered a complete e-commerce platform ahead of schedule with outstanding quality. His attention to detail is unmatched!",
    iconColor: "from-brand to-pink-500",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager at TechFlow",
    text: "Working with Mahin was a great experience. His designs are clean, modern, and easily incorporated my feedback. Communication was excellent!",
    iconColor: "from-accent to-blue-500",
  },
  {
    name: "Sarah Chen",
    role: "Founder at StartupHub",
    text: "Excellent developer! Fresh ideas, innovative solutions to the table. Mahin has been instrumental in scaling our platform rapidly.",
    iconColor: "from-pink-500 to-rose-500",
  },
  {
    name: "David Wilson",
    role: "CTO at CloudBase",
    text: "The performance optimization Mahin did for our dashboard was mind-blowing. Highly recommended for complex full-stack applications!",
    iconColor: "from-blue-600 to-cyan-400",
  },
  {
    name: "Sofia Rodriguez",
    role: "Creative Director",
    text: "He has an eye for UI/UX that is rare. Every detail feels intentional and user-centric. Truly a top-tier developer to work with.",
    iconColor: "from-orange-400 to-red-500",
  },
  {
    name: "Arjun Mehta",
    role: "Lead Developer",
    text: "Mahin is a team player who writes incredibly clean code. His integration skills with backend APIs and database logic are flawless.",
    iconColor: "from-emerald-400 to-brand",
  }
];

// Double the list to create a seamless infinite scroll effect
const scrollList = [...testimonials, ...testimonials];

// --- Custom SVG Icons ---
const Icons = {
  Quote: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-brand opacity-20 absolute -top-4 -left-4 -z-10"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C14.017 13.821 17.517 10 21.017 8V11C19.017 11 18.017 12.343 18.017 14V16M3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C9.12117 16 10.0166 16.8954 10.0166 18V21C10.0166 22.1046 9.12117 23 8.0166 23H5.0166C3.91203 23 3.0166 22.1046 3.0166 21ZM3.0166 21C3.0166 13.821 6.5166 10 10.0166 8V11C8.0166 11 7.0166 12.343 7.0166 14V16" /></svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  Message: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  )
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-bg-secondary/30 relative overflow-hidden">

      {/* Header Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <Icons.Message />
            <h2 className="section-title">
              What <span className="text-brand">Clients</span> Say
            </h2>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            className="h-1.5 bg-gradient-to-r from-brand to-accent rounded-full"
          />
        </div>
      </div>

      {/* Infinite Horizontal Scroll Container */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-8 py-10"
          animate={{
            x: ["0%", "-50%"] // Scroll from start to half (since list is doubled)
          }}
          transition={{
            duration: 35, // Speed of movement (Higher = Slower)
            ease: "linear",
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: "paused" }} // Stops moving when mouse is over
        >
          {scrollList.map((review, idx) => (
            <div
              key={idx}
              className="w-[380px] md:w-[450px] flex-shrink-0 card-hover bg-bg-primary/60 backdrop-blur-md border border-border/50 p-10 rounded-[2rem] relative group"
            >
              {/* Background Quote Icon */}
              <Icons.Quote />

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Icons.Star key={i} />)}
              </div>

              {/* Review Text */}
              <p className="text-text-secondary mb-10 leading-relaxed italic text-lg relative z-10">
                &quot;{review.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${review.iconColor} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  <Icons.User />
                </div>
                <div>
                  <h4 className="text-heading font-bold text-xl">{review.name}</h4>
                  <p className="text-brand/80 text-sm font-semibold tracking-wide uppercase">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Side Fading Gradients (For smooth entry/exit look) */}
        <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}