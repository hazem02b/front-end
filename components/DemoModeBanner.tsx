"use client";

import { Info, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { checkBackendAvailable, DEMO_MODE } from '@/lib/demo-config';

export default function DemoModeBanner() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMode = async () => {
      const backendAvailable = await checkBackendAvailable();
      setIsDemoMode(!backendAvailable && DEMO_MODE.enabled);
    };
    checkMode();
  }, []);

  if (!isDemoMode || !isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            <span className="font-bold">Mode Démo</span> - Backend non disponible. 
            Vous pouvez explorer l'interface librement !
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
