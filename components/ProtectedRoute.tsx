"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Donner 300ms pour que AuthContext se charge depuis localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (!isAuthenticated) {
        console.log('🚫 ProtectedRoute: Non authentifié, redirection vers /login');
        router.push('/login');
      } else {
        console.log('✅ ProtectedRoute: Utilisateur authentifié');
      }
    }, 300);

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
