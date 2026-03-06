import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Start Your Project | Anarva Systems",
    description: "Ready to build the future? Contact Anarva Systems. Submit your project requirements for Web Development, App Design, or AI Integration.",
    keywords: ["Contact Anarva", "Hire a Web Agency", "Web Development Inquiry", "App Development Consultation", "Submit Project Requirements", "AI Project Consultation"],
    openGraph: {
        title: "Start Your Project with Anarva",
        description: "Submit your project requirements and let's build something amazing together",
        url: "https://www.anarva.online/contact",
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
