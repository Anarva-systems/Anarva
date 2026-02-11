import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Meet the Anarva Team | Anarva Systems",
    description: "Learn about Anarva Systems, our mission to build weightless interfaces, and the team behind cutting-edge digital solutions.",
    keywords: ["about us", "company", "team", "mission", "digital studio", "San Francisco"],
    openGraph: {
        title: "About Anarva Systems - Digital Product Studio",
        description: "Bridging heavy engineering and delicate design since day one",
        url: "https://anarva.tech/about",
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
