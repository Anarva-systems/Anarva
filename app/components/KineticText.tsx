import { useScroll, useTransform, motion } from "framer-motion";

export function KineticText() {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], [0, 0]); // Moves text horizontally on scroll

    return (
        <div className=" flex items-center overflow-hidden whitespace-nowrap">
            <motion.h2 style={{ x }} className="text-[12vw] font-black uppercase text-slate-100 outline-text">
                • Anarva
            </motion.h2>
        </div>
    );
}