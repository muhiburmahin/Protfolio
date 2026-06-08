import { siteConfig } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        email: CONTACT_EMAIL,
        jobTitle: "Full Stack Developer",
        sameAs: [
          "https://github.com/muhiburmahin",
          "https://www.linkedin.com/in/muhiburmahin",
        ],
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
