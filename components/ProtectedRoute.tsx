"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Donner 500ms pour que AuthContext se charge depuis localStorage (maintenant plus rapide)
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      console.log('🛡️ ProtectedRoute: Vérification après chargement');
      console.log('📦 isAuthenticated:', isAuthenticated);
      
      if (!isAuthenticated) {
        console.log('🚫 ProtectedRoute: Non authentifié, redirection vers /login');
        router.push('/login');
      } else {
        console.log('✅ ProtectedRoute: Utilisateur authentifié');
      }
    }, 500); // Réduit à 500ms car chargement immédiat maintenant

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Pendant le chargement initial, afficher un loader
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E]">
        <div className="text-white flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span>{isLoading ? 'Chargement...' : 'Redirection...'}</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
