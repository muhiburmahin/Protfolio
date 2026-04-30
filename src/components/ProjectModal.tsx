// "use client";

// import { motion, AnimatePresence } from "framer-motion";

// export default function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
//   if (!project) return null;

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         />
        
//         <motion.div 
//           initial={{ opacity: 0, y: 50, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 20, scale: 0.95 }}
//           className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-primary border border-border rounded-2xl shadow-2xl p-6 md:p-8"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-bold text-heading">{project.name}</h2>
//             <button 
//               onClick={onClose}
//               className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:text-brand hover:bg-brand/10 transition-colors"
//             >
//               <i className="fas fa-times text-xl"></i>
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <img src={project.image} alt={project.name} className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-lg" />
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-bold text-brand mb-3 flex items-center gap-2">
//                   <i className="fas fa-info-circle"></i>
//                   Overview
//                 </h3>
//                 <p className="text-text-secondary leading-relaxed">{project.description}</p>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
//                   <i className="fas fa-tools"></i>
//                   Technologies Used
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech: string) => (
//                     <span key={tech} className="px-3 py-1 text-sm bg-brand text-white rounded-full shadow-sm">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-pink-500 mb-3 flex items-center gap-2">
//                   <i className="fas fa-exclamation-circle"></i>
//                   Challenges Faced
//                 </h3>
//                 <p className="text-text-secondary leading-relaxed">{project.challenges}</p>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-orange-500 mb-3 flex items-center gap-2">
//                   <i className="fas fa-rocket"></i>
//                   Future Improvements
//                 </h3>
//                 <p className="text-text-secondary leading-relaxed">{project.future}</p>
//               </div>

//               <div className="flex gap-4 pt-4 flex-wrap">
//                 <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary">
//                   <i className="fas fa-external-link-alt"></i>
//                   View Live
//                 </a>
//                 <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
//                   <i className="fab fa-github"></i>
//                   Repository
//                 </a>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// }
