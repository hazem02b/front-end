"use client";

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[15%] left-[8%] w-48 h-48 border-2 border-[#2563EB]/20 rounded-2xl rotate-45 animate-pulse"></div>
      <div className="absolute top-[60%] right-[12%] w-40 h-40 border-2 border-[#7C3AED]/20 rounded-3xl rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[25%] left-[25%] w-44 h-44 border-2 border-[#06B6D4]/20 rounded-xl -rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}