"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Icon, type IconName } from "@/components/ui/icon";

const contactInfo: {
  icon: IconName;
  color: string;
  bg: string;
  hoverBg: string;
  title: string;
  value: string;
  link?: string;
}[] = [
  {
    icon: "mail",
    color: "text-brand",
    bg: "bg-brand/10",
    hoverBg: "group-hover:bg-brand",
    title: "Email Address",
    value: CONTACT_EMAIL,
    link: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: "phone",
    color: "text-accent",
    bg: "bg-accent/10",
    hoverBg: "group-hover:bg-accent",
    title: "Phone Number",
    value: "+880 1566086621",
  },
  {
    icon: "whatsapp",
    color: "text-green-500",
    bg: "bg-green-500/10",
    hoverBg: "group-hover:bg-green-500",
    title: "WhatsApp",
    value: "+880 1566086621",
  },
  {
    icon: "mapPin",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    hoverBg: "group-hover:bg-pink-500",
    title: "Location",
    value: "Sylhet, Bangladesh",
  },
  {
    icon: "clock",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    hoverBg: "group-hover:bg-orange-500",
    title: "Availability",
    value: "Available for projects",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";
const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Failed to send. Please try again.");
        return;
      }
      setStatus("success");
      setFeedback("Message sent! I'll get back to you soon.");
      setFormData(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Network error. Check your connection and retry.");
    }
  };

  const isLoading = status === "loading";

  return (
    <section id="contact" className="relative z-10 py-16 sm:py-20 md:py-24">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-1/4 bottom-0 h-[min(60vw,28rem)] w-[min(60vw,28rem)] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -right-1/4 top-0 h-[min(50vw,24rem)] w-[min(50vw,24rem)] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 space-y-3 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
            <Icon name="mail" size={13} />
            Let&apos;s Talk
          </div>
          <h2 className="section-title text-center">Get In Touch</h2>
          <p className="mx-auto max-w-md text-sm text-text-secondary sm:text-base">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">

          {/* contact info */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-heading sm:text-xl md:text-2xl">
              <Icon name="info" className="text-brand" size={20} />
              Contact Information
            </h3>

            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="card-hover group cursor-pointer p-4 sm:p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${info.bg} ${info.hoverBg}`}
                  >
                    <Icon
                      name={info.icon}
                      size={18}
                      className={`transition-colors duration-300 ${info.color} group-hover:text-white`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-secondary sm:text-sm">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="block truncate text-sm font-semibold text-heading transition-colors hover:text-brand sm:text-base"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="truncate text-sm font-semibold text-heading sm:text-base">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="card-hover h-fit p-5 sm:p-6 md:p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-heading sm:text-xl md:text-2xl">
              <Icon name="send" className="text-accent" size={20} />
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* honeypot */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {[
                { id: "contact-name", label: "Your Name", icon: "user" as IconName, iconColor: "text-brand", type: "text", placeholder: "John Doe", field: "name" as const, focusRing: "focus:border-brand focus:ring-brand" },
                { id: "contact-email", label: "Email Address", icon: "mail" as IconName, iconColor: "text-accent", type: "email", placeholder: "john@example.com", field: "email" as const, focusRing: "focus:border-accent focus:ring-accent" },
                { id: "contact-subject", label: "Subject", icon: "text" as IconName, iconColor: "text-pink-500", type: "text", placeholder: "Project Inquiry", field: "subject" as const, focusRing: "focus:border-pink-500 focus:ring-pink-500" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-text-secondary">
                    <Icon name={f.icon} className={f.iconColor} size={15} />
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    disabled={isLoading}
                    value={formData[f.field]}
                    onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                    className={`w-full rounded-lg border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none ring-1 ring-transparent transition-all focus:ring-1 disabled:opacity-60 sm:py-3 ${f.focusRing}`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="contact-message" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <Icon name="messages" className="text-green-500" size={15} />
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  disabled={isLoading}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none ring-1 ring-transparent transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-60 sm:rows-5 sm:py-3"
                />
              </div>

              {feedback && (
                <p
                  role="status"
                  className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                    status === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-500"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary mt-2 w-full justify-center group disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Icon name="loader" className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon
                      name="send"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      size={18}
                    />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
