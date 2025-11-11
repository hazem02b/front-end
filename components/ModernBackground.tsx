"use client";

export default function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0F172A] to-[#1E293B]"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#2563EB]/40 to-[#1D4ED8]/25 blur-[130px] animate-pulse"></div>
        <div className="absolute top-[5%] right-[-8%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#7C3AED]/35 to-[#6D28D9]/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-15%] left-[5%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#06B6D4]/40 to-[#0891B2]/25 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}