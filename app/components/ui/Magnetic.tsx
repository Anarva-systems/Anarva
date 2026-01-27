'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const width = ref.current?.getBoundingClientRect().width || 0;
        const height = ref.current?.getBoundingClientRect().height || 0;
        const left = ref.current?.getBoundingClientRect().left || 0;
        const top = ref.current?.getBoundingClientRect().top || 0;

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        setPosition({ x, y });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
