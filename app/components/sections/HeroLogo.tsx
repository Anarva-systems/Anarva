import { Outfit } from 'next/font/google'; // Adjust paths to your font local/google config

const outfit = Outfit({ subsets: ['latin'] });

export default function HeroLogo() {
    return (
        <div className="container text-black w-full flex flex-col justify-center items-center mx-auto px-6 mt-32 relative z-0 select-none">
            <div className="relative inline-block group">

                {/* The Tagline: Calibrated for the 'An' pocket */}
                <p
                    className={`absolute top-[11.5%] left-[19%] text-[2vw] 
          text-muted-foreground font-light tracking-[0.3em] z-20 whitespace-nowrap uppercase ${outfit.className}`}
                >
                    Weightless Digital Experiences
                </p>

                {/* The "Divine Spark" (Floating Bindu) */}
                {/* This represents the eternal element that is 'not of this earth' */}
                <div className="absolute top-[8%] right-[1%] w-[3vw] h-[3vw] md:w-[45px] md:h-[45px] 
                        bg-primary rounded-full shadow-[0_0_40px_var(--color-primary)] 
                        animate-pulse"></div>

                {/* Main Heading: Anarva */}
                <h1
                    className={`text-[25vw] leading-[0.75] font-bold 
          text-foreground tracking-tighter transition-transform duration-1000 
          group-hover:scale-[1.01] ${outfit.className}`}
                >
                    Anarva
                </h1>

                {/* Subtle Background Glow for 'Infinite' depth */}
                <div className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>

            {/* Philosophy Subtext */}
            <div className="mt-4 text-muted-foreground text-sm md:text-base tracking-[0.5em] uppercase opacity-40">
                The Ineffable • Absolute • Eternal
            </div>
        </div>
    );
}