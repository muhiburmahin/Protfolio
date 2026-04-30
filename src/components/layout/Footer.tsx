"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          {/* Branding */}
          <div>
            <h3 className="text-xl font-bold text-brand mb-4 flex items-center gap-2">
              <i className="fas fa-code"></i>
              Mahin
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm">
              <i className="fas fa-quote-left mr-2"></i>
              Full Stack Developer crafting beautiful and functional digital experiences for the web.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
              <i className="fas fa-link text-brand"></i>
              Quick Links
            </h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <Link href="#home" className="hover:text-brand transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-brand transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>About Me
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-brand transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-brand transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
              <i className="fas fa-cogs text-accent"></i>
              Services
            </h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <a href="#" className="hover:text-accent transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>App Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Consulting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>Code Review
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
              <i className="fas fa-share-alt text-pink-500"></i>
              Follow Me
            </h4>
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: "fab fa-github", url: "https://github.com/muhiburmahin", title: "GitHub" },
                { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/muhiburmahin", title: "LinkedIn" },
                { icon: "fab fa-facebook", url: "https://www.facebook.com/profile.php?id=61583224643452", title: "Facebook" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all duration-300 hover:-translate-y-1"
                  title={social.title}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-text-secondary text-center md:text-left flex items-center gap-2">
              <i className="fas fa-copyright"></i>
              {new Date().getFullYear()} Md Muhibur Rahman Mahin. All rights reserved.
            </p>
            <p className="text-text-secondary text-center mt-4 md:mt-0">
              Built with <i className="fas fa-heart text-red-500 mx-1"></i> using{" "}
              <span className="text-brand font-semibold">Next.js & Tailwind</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}