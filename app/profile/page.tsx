"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers la page des parametres
    router.replace('/settings');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E]">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Redirection vers les parametres...</p>
      </div>
    </div>
  );
}
