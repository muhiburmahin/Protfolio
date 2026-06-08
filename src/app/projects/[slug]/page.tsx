import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.images[0]?.startsWith("http")
        ? [project.images[0]]
        : [{ url: new URL(project.images[0], siteConfig.url).toString() }],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroImage = project.images[0];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="border-b border-border/50 bg-bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="text-sm font-semibold text-brand hover:text-accent transition-colors"
          >
            ← Back to projects
          </Link>
          {!project.comingSoon && project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4"
            >
              Live demo
            </a>
          )}
        </div>
      </div>

      <article className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <header className="mb-12 space-y-6">
          {project.comingSoon && (
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase bg-accent/10 text-accent border border-accent/30 rounded-md">
              In development
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-heading leading-tight">
            {project.name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[10px] font-bold uppercase bg-bg-secondary text-text-secondary border border-border rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 mb-16">
          <Image
            src={heroImage}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-heading mb-4">The challenge</h2>
          <p className="text-text-secondary leading-relaxed">{project.challenge}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-heading mb-4">Impact & outcomes</h2>
          <ul className="space-y-3">
            {project.metrics.map((metric) => (
              <li
                key={metric}
                className="flex items-start gap-3 text-text-secondary"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                {metric}
              </li>
            ))}
          </ul>
        </section>

        {project.highlights.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-heading mb-4">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-brand/10 text-brand border border-brand/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
          {project.githubClient && (
            <a
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-lg bg-bg-secondary border border-border text-center text-sm font-bold hover:bg-brand/10 transition-all"
            >
              Frontend repo
            </a>
          )}
          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-lg bg-bg-secondary border border-border text-center text-sm font-bold hover:bg-brand/10 transition-all"
            >
              Backend repo
            </a>
          )}
          {!project.comingSoon && project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-lg bg-brand text-white text-center text-sm font-bold hover:shadow-lg hover:shadow-brand/30 transition-all"
            >
              View live site
            </a>
          )}
        </section>
      </article>
    </main>
  );
}
