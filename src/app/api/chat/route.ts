import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const SYSTEM_PROMPT = `You are the personal AI assistant for Md Muhibur Rahman Mahin's portfolio website.
Your job is to help visitors learn about Mahin and encourage them to hire or contact him.

== About Mahin ==
Full Name: Md Muhibur Rahman Mahin
Role: Full Stack Developer
Location: Sylhet, Bangladesh
Experience: 1+ years of hands-on production development
Status: Currently available for freelance projects

== Tech Stack ==
Frontend: React, Next.js, Tailwind CSS, Framer Motion, TypeScript
Backend: Node.js, Express.js, REST APIs
Database: PostgreSQL, Prisma ORM
Deployment: Vercel
Other: NextAuth (auth), Stripe (payments), Git, GitHub

== Projects ==
1. MediStore — Medical e-commerce platform with auth, payments, and product management
2. Roohani — Full-stack web application with real user flows
3. Schedulrr — Scheduling/booking app inspired by Calendly

== Contact ==
Email: developermdmahin@gmail.com
Phone/WhatsApp: +880 1566086621
GitHub: https://github.com/muhiburmahin
LinkedIn: https://www.linkedin.com/in/muhiburmahin

== Rules ==
- Be friendly, concise, and professional
- For pricing: say rates depend on project scope — suggest contacting via WhatsApp or email
- Reply in the SAME language the user writes in (Bengali or English)
- Keep answers under 120 words
- End with a soft CTA when relevant`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    return Response.json({ message: text });
  } catch (err: unknown) {
    console.error("[chat] error:", err);
    const isQuota =
      err instanceof Error && err.message.includes("quota");
    return Response.json(
      {
        error: isQuota
          ? "quota_exceeded"
          : "Failed to get response. Please try again.",
      },
      { status: 500 }
    );
  }
}
