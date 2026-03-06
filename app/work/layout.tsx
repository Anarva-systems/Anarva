import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work - Web & App Portfolio | Anarva Systems",
    description: "Explore Anarva's curated portfolio of premium digital experiences. We build high-end web applications, mobile apps, and AI platforms for industry leaders.",
    keywords: ["Anarva Portfolio", "Case Studies", "Web Design Portfolio", "App Development Projects", "Digital Experiences", "UI/UX Showcase", "Next.js Projects"],
    openGraph: {
        title: "Our Work - Curated Digital Experiences",
        description: "Explore premium digital solutions we've crafted for industry leaders",
        url: "https://www.anarva.online/work",
        siteName: "Anarva Systems",
        images: [{
            url: "/og-image-work.jpg",
            width: 1200,
            height: 630,
            alt: "Anarva Portfolio - Featured Projects",
        }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Anarva Portfolio - Premium Digital Experiences",
        description: "Case studies from fintech to healthcare",
        images: ["/og-image-work.jpg"],
    },
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
