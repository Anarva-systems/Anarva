"use client";

import { useEffect, useState } from "react";
import FounderModal from "../modals/FounderModal";

export default function EasterEggManager() {
    const [clickCount, setClickCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleClick = () => {
            setClickCount(prev => {
                const newCount = prev + 1;

                // Clear existing timeout to reset the count if user stops clicking
                clearTimeout(timeout);

                // Set a timeout to reset count if 500ms passes without a click
                timeout = setTimeout(() => {
                    setClickCount(0);
                }, 500);

                if (newCount === 3) {
                    setIsOpen(true);
                    return 0; // Reset count
                }

                return newCount;
            });
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
            clearTimeout(timeout);
        };
    }, []);

    return <FounderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
