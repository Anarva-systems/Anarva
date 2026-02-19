import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-syne)", "var(--font-inter)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            colors: {
                // Cosmic Palette
                cosmic: {
                    black: '#000000',
                    deep: '#0a0a1f',
                    navy: '#0d0d2b',
                    blue: '#00d4ff',
                    purple: '#7b00ff',
                    violet: '#a855f7',
                    pink: '#ec4899',
                },
                brand: {
                    dark: '#030014',
                    accent: '#7000FF',
                    neon: '#00C2FF',
                }
            },
            backgroundImage: {
                'cosmic-gradient': 'linear-gradient(135deg, #000000 0%, #0a0a1f 50%, #0d0d2b 100%)',
                'cosmic-radial': 'radial-gradient(ellipse at center, #0a0a1f 0%, #000000 100%)',
                'glow-gradient': 'linear-gradient(135deg, #00d4ff 0%, #7b00ff 100%)',
                'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            },
            boxShadow: {
                'glow-blue': '0 0 40px rgba(0, 212, 255, 0.4)',
                'glow-purple': '0 0 40px rgba(123, 0, 255, 0.4)',
                'glow-white': '0 0 20px rgba(255, 255, 255, 0.2)',
                'glow-intense': '0 0 60px rgba(0, 212, 255, 0.6), 0 0 120px rgba(123, 0, 255, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out infinite 2s',
                'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
                'comet': 'comet 3s ease-out infinite',
                'orbit': 'orbit 20s linear infinite',
                'orbit-reverse': 'orbit 20s linear infinite reverse',
                'spin-slow': 'spin 20s linear infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '25%': { transform: 'translateY(-10px) rotate(1deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(0deg)' },
                    '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.5', filter: 'blur(40px)' },
                    '50%': { opacity: '0.8', filter: 'blur(60px)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
                comet: {
                    '0%': { transform: 'translateX(-100%) translateY(100%)', opacity: '1' },
                    '70%': { opacity: '1' },
                    '100%': { transform: 'translateX(200%) translateY(-100%)', opacity: '0' },
                },
                orbit: {
                    '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;