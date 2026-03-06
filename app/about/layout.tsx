import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Digital Architecture Studio | Anarva Systems",
    description: "Anarva Systems is a digital product studio bridging heavy engineering and delicate design. We specialize in UI/UX, AI infrastructure, and Web3 development.",
    keywords: ["About Anarva", "Digital Product Studio", "Web Agency Team", "UI/UX Design Agency", "AI Infrastructure", "Web3 Development", "San Francisco Web Agency"],
    openGraph: {
        title: "About Anarva Systems - Digital Product Studio",
        description: "Bridging heavy engineering and delicate design since day one",
        url: "https://www.anarva.online/about",
        siteName: "Anarva Systems",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
