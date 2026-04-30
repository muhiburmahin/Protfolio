"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // ===== NAME TYPEWRITER (RUNS ONCE) =====
  const fullName = "Md Muhibur Rahman Mahin";
  const [typedName, setTypedName] = useState("");

  // ===== ROLE TYPEWRITER (LOOP) =====
  const roles = ["Full Stack Developer", "Problem Solver"];
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  // Name typing effect
  useEffect(() => {
    setMounted(true);

    let i = 0;
    const typing = setInterval(() => {
      setTypedName(fullName.slice(0, i + 1));
      i++;

      if (i === fullName.length) {
        clearInterval(typing);
      }
    }, 70);

    return () => clearInterval(typing);
  }, []);

  // Role typing loop
  useEffect(() => {
    let charIndex = 0;
    let currentText = roles[roleIndex];

    const typing = setInterval(() => {
      setDisplayText(currentText.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentText.length) {
        clearInterval(typing);

        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setDisplayText("");
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typing);
  }, [roleIndex]);

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-32 pb-20 overflow-hidden relative bg-bg-primary"
    >
      {/* ===== BACKGROUND PARTICLES ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand/10 dark:bg-accent/5 rounded-full blur-2xl"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ===== LEFT SIDE ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4 text-center md:text-left">

              <p className="text-brand font-bold flex items-center justify-center md:justify-start gap-3 text-sm tracking-[0.3em] uppercase">
                <span className="w-10 h-[2px] bg-brand"></span>
                Welcome to my world
              </p>

              {/* ===== NAME (NO CUT + TYPEWRITER) ===== */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.2] pb-2 text-heading break-words overflow-visible">
                Hey, I&apos;m <br />
                <span className="inline-block bg-gradient-to-r from-brand via-brand-light to-accent bg-clip-text text-transparent italic font-heading">
                  {typedName}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              {/* ===== ROLE TYPEWRITER ===== */}
              <div className="h-20 flex items-center justify-center md:justify-start">
                <p className="text-2xl md:text-4xl font-bold text-text-secondary">
                  I am a{" "}
                  <span className="text-accent underline decoration-brand/30 underline-offset-8">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </p>
              </div>

              {/* ===== DESCRIPTION UPDATED ===== */}
              <p className="text-text-secondary text-lg leading-relaxed max-w-lg italic border-l-4 border-brand pl-4 mx-auto md:mx-0">
                "Crafting modern, responsive, and user-friendly web experiences as a
                <span className="text-heading font-medium">
                  {" "}Full Stack Modern Website Developer
                </span>.
                Transforming complex problems into elegant solutions."
              </p>
            </div>

            {/* ===== BUTTON + SOCIAL ===== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center md:justify-start">
              <Link href="#contact" className="btn-primary group">
                <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
                Say Hello
              </Link>

              <div className="flex gap-5">
                {[
                  { icon: "fab fa-github", url: "https://github.com/muhiburmahin" },
                  { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/muhiburmahin" },
                  { icon: "fab fa-facebook", url: "https://www.facebook.com/profile.php?id=61583224643452" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-text-secondary hover:text-accent transition-all duration-300 hover:-translate-y-2"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT SIDE IMAGE ===== */}
          {/* ===== RIGHT SIDE IMAGE ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center items-center relative"
          >
            <div className="relative group">

              {/* Animated Rings */}
              <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-[ping_3s_linear_infinite] scale-110"></div>
              <div className="absolute inset-0 border-2 border-accent/10 rounded-full animate-[ping_5s_linear_infinite] scale-125"></div>

              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand to-accent rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-700"></div>

              {/* IMAGE */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[10px] border-bg-secondary shadow-2xl z-10"
              >
                <img
                  src="/hiro.jpg"
                  alt="Mahin"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition duration-700"
                />
              </motion.div>

              {/* ✅ BADGE ON RIGHT SIDE */}
              <div className="absolute top-10 -right-6 md:-right-10 bg-bg-secondary/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-border shadow-xl z-20">
                <div className="text-brand text-xl font-black">1+</div>
                <div className="text-[10px] uppercase tracking-wide text-text-secondary">
                  Years Experience
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== SCROLL DOWN ===== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#about"
          className="flex flex-col items-center text-text-secondary hover:text-accent transition"
        >
          <span className="text-sm mb-1">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-text-secondary rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
}

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Hero() {
//   const [textIndex, setTextIndex] = useState(0);
//   const roles = ["Full Stack Developer", "Problem Solver"];

//   // Typewriter effect for roles
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTextIndex((prev) => (prev + 1) % roles.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center pt-32 pb-20 overflow-hidden relative transition-colors duration-500 bg-white dark:bg-slate-950"
//     >
//       {/* Background Animation: Floating Particles (Mode Sensitive) */}
//       <div className="absolute inset-0 z-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bg-brand/10 dark:bg-brand/20 rounded-full blur-xl"
//             style={{
//               width: Math.random() * 100 + 50,
//               height: Math.random() * 100 + 50,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               x: [0, Math.random() * 100 - 50, 0],
//               y: [0, Math.random() * 100 - 50, 0],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-8"
//           >
//             <div className="space-y-4 text-center md:text-left">
//               <motion.p className="text-brand font-bold flex items-center justify-center md:justify-start gap-2 text-xl tracking-widest uppercase">
//                 <span className="w-12 h-[2px] bg-brand inline-block"></span>
//                 Welcome to my world
//               </motion.p>

//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-slate-900 dark:text-white">
//                 Hey, I&apos;m <br />
//                 <span className="bg-gradient-to-r from-brand via-purple-500 to-accent bg-clip-text text-transparent animate-gradient-x italic">
//                   Md Muhibur Rahman Mahin
//                 </span>
//               </h1>

//               <div className="h-20 flex items-center justify-center md:justify-start">
//                 <AnimatePresence mode="wait">
//                   <motion.p
//                     key={textIndex}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="text-3xl md:text-4xl font-bold text-slate-600 dark:text-slate-300"
//                   >
//                     I am a <span className="text-accent underline decoration-brand/40">{roles[textIndex]}</span>
//                   </motion.p>
//                 </AnimatePresence>
//               </div>

//               <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-lg italic border-l-4 border-brand pl-4 mx-auto md:mx-0">
//                 &quot;Crafting modern, responsive, and user-friendly web experiences with cutting-edge technologies. Transforming complex problems into elegant solutions.&quot;
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center md:justify-start">
//               <Link
//                 href="#contact"
//                 className="btn-primary px-8 py-4 rounded-full bg-brand hover:bg-brand-dark text-white font-bold transition-all transform hover:scale-105 shadow-[0_10px_20px_rgba(var(--brand-rgb),0.3)] flex items-center gap-2 group"
//               >
//                 <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
//                 Say Hello
//               </Link>

//               {/* Social Icons with Links */}
//               <div className="flex gap-5">
//                 {[
//                   { icon: "fab fa-github", url: "https://github.com/muhiburmahin", color: "hover:text-black dark:hover:text-white" },
//                   { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/muhiburmahin", color: "hover:text-blue-600 dark:hover:text-blue-400" },
//                   { icon: "fab fa-facebook", url: "https://www.facebook.com/profile.php?id=61583224643452", color: "hover:text-blue-700 dark:hover:text-blue-500" },
//                 ].map((social, i) => (
//                   <a
//                     key={i}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`text-2xl text-slate-400 dark:text-slate-500 transition-all duration-300 hover:-translate-y-2 ${social.color}`}
//                   >
//                     <i className={social.icon}></i>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Image Content */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="flex justify-center items-center relative"
//           >
//             <div className="relative group">
//               {/* Animated Rings around image */}
//               <div className="absolute inset-0 border-2 border-brand/30 rounded-full animate-[ping_3s_linear_infinite] scale-110"></div>
//               <div className="absolute inset-0 border-2 border-accent/20 rounded-full animate-[ping_5s_linear_infinite] scale-125"></div>

//               <div className="absolute -inset-4 bg-gradient-to-r from-brand to-accent rounded-full blur-2xl opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity"></div>

//               <motion.div
//                 animate={{ y: [0, -15, 0] }}
//                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl z-10"
//               >
//                 <img
//                   src="/hiro.jpg"
//                   alt="Md Muhib Ur Rahman Mahin"
//                   className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
//                 />
//               </motion.div>

//               {/* Floating Badge 1 */}
//               <motion.div
//                 animate={{ x: [0, 10, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-10 -right-8 md:-right-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl z-20"
//               >
//                 <div className="text-brand text-2xl font-black">1+</div>
//                 <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tighter font-bold">Years of Exp.</div>
//               </motion.div>

//               {/* Floating Badge 2 */}
//               <motion.div
//                 animate={{ x: [0, -10, 0] }}
//                 transition={{ duration: 5, repeat: Infinity }}
//                 className="absolute bottom-10 -left-8 md:-left-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl z-20"
//               >
//                 <div className="text-accent text-2xl font-black">5</div>
//                 <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tighter font-bold">Global Clients</div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }