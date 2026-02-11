"use client";

import { useState } from "react";
import PremiumLoader from "./PremiumLoader";
import { AnimatePresence } from "framer-motion";

export default function GlobalIntro() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <PremiumLoader onComplete={() => setIsLoading(false)} />
            )}
        </AnimatePresence>
    );
}
