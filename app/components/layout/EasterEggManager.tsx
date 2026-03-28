"use client";

import { useEffect, useState } from "react";
import FounderModal from "../modals/FounderModal";

export default function EasterEggManager() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let clickCount = 0;
        let lastClickTime = 0;

        const handleClick = () => {
            const now = Date.now();
            if (now - lastClickTime > 500) {
                clickCount = 1;
            } else {
                clickCount++;
            }
            lastClickTime = now;

            if (clickCount === 3) {
                setIsOpen(true);
                clickCount = 0; // Reset after trigger
            }
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    return <FounderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
