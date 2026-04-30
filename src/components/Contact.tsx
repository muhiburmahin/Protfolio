"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const contactInfo = [
  { icon: "fas fa-envelope", color: "text-brand", bg: "bg-brand/10", hover: "hover:bg-brand", title: "Email Address", value: "developermdmahin@gmail.com", link: "" },
  { icon: "fas fa-phone", color: "text-accent", bg: "bg-accent/10", hover: "hover:bg-accent", title: "Phone Number", value: "+880 1566086621" },
  { icon: "fab fa-whatsapp", color: "text-green-500", bg: "bg-green-500/10", hover: "hover:bg-green-500", title: "WhatsApp", value: "+880 1566086621" },
  { icon: "fas fa-map-marker-alt", color: "text-pink-500", bg: "bg-pink-500/10", hover: "hover:bg-pink-500", title: "Location", value: "Sylhet, Bangladesh" },
  { icon: "fas fa-clock", color: "text-orange-500", bg: "bg-orange-500/10", hover: "hover:bg-orange-500", title: "Availability", value: "Available for projects" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:muhib@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          <i className="fas fa-envelope text-brand mr-3"></i>
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-heading mb-8 flex items-center gap-2">
              <i className="fas fa-info-circle text-brand"></i>
              Contact Information
            </h3>

            {contactInfo.map((info, idx) => (
              <div key={info.title} className="card-hover group cursor-pointer p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${info.bg} ${info.hover} group-hover:text-white`}>
                    <i className={`${info.icon} text-xl transition-colors duration-300 ${info.color} group-hover:text-white`}></i>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm font-semibold mb-1">{info.title}</p>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noreferrer" className="text-heading font-semibold hover:text-brand transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-heading font-semibold">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-hover p-8 h-fit"
          >
            <h3 className="text-2xl font-bold text-heading mb-8 flex items-center gap-2">
              <i className="fas fa-paper-plane text-accent"></i>
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text-secondary font-semibold mb-2 flex items-center gap-2">
                  <i className="fas fa-user text-brand"></i> Your Name
                </label>
                <input
                  required type="text" placeholder="John Doe"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-text-secondary font-semibold mb-2 flex items-center gap-2">
                  <i className="fas fa-envelope text-accent"></i> Email Address
                </label>
                <input
                  required type="email" placeholder="john@example.com"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:accent focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-text-secondary font-semibold mb-2 flex items-center gap-2">
                  <i className="fas fa-heading text-pink-500"></i> Subject
                </label>
                <input
                  required type="text" placeholder="Project Inquiry"
                  value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-text-secondary font-semibold mb-2 flex items-center gap-2">
                  <i className="fas fa-comment text-green-500"></i> Message
                </label>
                <textarea
                  required rows={5} placeholder="Tell me about your project..."
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center group mt-4">
                <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300"></i>
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
