import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work - Portfolio & Case Studies | Anarva Systems",
    description: "Explore our curated portfolio of digital experiences for elite brands across fintech, e-commerce, healthcare, aerospace, and automotive industries.",
    keywords: ["portfolio", "case studies", "web design projects", "digital experiences", "fintech design", "e-commerce development", "healthcare tech", "project showcase"],
    openGraph: {
        title: "Our Work - Curated Digital Experiences",
        description: "Explore premium digital solutions we've crafted for industry leaders",
        url: "https://anarva.tech/work",
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
