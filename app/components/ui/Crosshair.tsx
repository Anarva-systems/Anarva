export default function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute w-3 h-3 flex items-center justify-center pointer-events-none opacity-50 z-20 ${className}`}>
            <div className="absolute w-full h-[1px] bg-white/40" />
            <div className="absolute h-full w-[1px] bg-white/40" />
        </div>
    );
}
