import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: 1,
    slug: "medistore",
    name: "MediStore: Complete Medicine Delivery App",
    images: ["/project/111/1.png", "/project/111/2.png", "/project/111/3.png"],
    description:
      "Production-ready medicine ordering platform with secure authentication, Stripe checkout, and a responsive storefront — built for real users on Vercel.",
    challenge:
      "Design a trustworthy ordering experience for medicine delivery with secure login, payment handling, and a mobile-friendly catalog that works reliably on slow networks.",
    metrics: [
      "Live production deployment on Vercel",
      "Clerk authentication for user sessions",
      "Stripe checkout for secure payments",
    ],
    highlights: ["Live on Vercel", "Clerk auth", "Stripe payments"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe", "Clerk"],
    liveLink: "https://medistore-iota.vercel.app",
    githubClient: "https://github.com/muhiburmahin/MediStore_Fontend",
    githubServer: "https://github.com/muhiburmahin/MediStore_Backend",
  },
  {
    id: 2,
    slug: "roohani",
    name: "Roohani — Premium Clothing Brand",
    images: ["/project/222/1.png", "/project/222/2.png", "/project/222/3.png"],
    description:
      "Full-stack e-commerce for premium fabrics and traditional wear — category filtering, cart flow, and a polished shopping experience deployed to production.",
    challenge:
      "Build a premium brand storefront that feels elegant on mobile and desktop, with category browsing, cart management, and a checkout flow that scales as inventory grows.",
    metrics: [
      "Full-stack Next.js + PostgreSQL architecture",
      "Category filtering and product discovery",
      "Stripe payments integrated in production",
    ],
    highlights: ["Live storefront", "PostgreSQL + Prisma", "Stripe integration"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe", "Clerk"],
    liveLink: "https://roohani.vercel.app",
    githubClient: "https://github.com/muhiburmahin/Roohani_Frontend",
    githubServer: "https://github.com/muhiburmahin/Roohani_Backend",
  },
  {
    id: 3,
    slug: "schedulrr",
    name: "Schedulrr: Smart Appointment Manager",
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80",
      "https://images.unsplash.com/photo-1616587894289-86480e533129?w=500&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80",
    ],
    description:
      "Appointment scheduling platform in active development — real-time booking, role-based dashboards, and secure auth with a Prisma + Neon PostgreSQL backend.",
    challenge:
      "Reduce no-shows and manual scheduling by giving providers and clients a shared dashboard with role-based access and real-time availability updates.",
    metrics: [
      "Prisma ORM with Neon PostgreSQL",
      "Role-based dashboard architecture planned",
      "Clerk authentication integration in progress",
    ],
    highlights: ["In development", "Prisma ORM", "Clerk auth planned"],
    technologies: ["Next.js", "Tailwind CSS", "Prisma", "Neon DB", "Clerk"],
    comingSoon: true,
  },
];
