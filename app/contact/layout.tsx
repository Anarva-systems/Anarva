import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Start Your Project - Submit Requirements | Anarva Systems",
    description: "Ready to build the future? Submit your project requirements and connect with our expert team to transform your ideas into reality.",
    keywords: ["submit project", "project requirements", "get started", "web development inquiry", "AI project consultation"],
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Start Your Project with Anarva",
        description: "Submit your project requirements and let's build something amazing together",
        url: "https://anarva.online/submit-requirements",
        siteName: "Anarva Systems",
        type: "website",
    },
};

export default function SubmitRequirementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
