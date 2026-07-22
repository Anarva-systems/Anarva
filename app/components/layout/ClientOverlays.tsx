"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("../Chatbot"), { ssr: false });
const EasterEggManager = dynamic(() => import("./EasterEggManager"), { ssr: false });

export default function ClientOverlays() {
    return (
        <>
            <EasterEggManager />
            <Chatbot />
        </>
    );
}
