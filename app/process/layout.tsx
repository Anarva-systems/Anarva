import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Process - System Methodology | Anarva Systems",
    description: "Discover Anarva's precision-engineered development workflow. From discovery and UX wireframing to robust UI design, QA testing, and scaleable launch.",
    keywords: ["Development Process", "Agency Methodology", "How We Work", "Web Design Process", "App Development Phases", "Software QA"],
    openGraph: {
        title: "Our Process - System Methodology",
        description: "Precision engineered workflows for rapid deployment and scalable growth.",
        url: "https://www.anarva.online/process",
        siteName: "Anarva Systems",
        type: "website",
    },
};

export default function ProcessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
