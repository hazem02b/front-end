"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Github, Chrome, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/lib/api-config';
import { DEMO_MODE, checkBackendAvailable } from '@/lib/demo-config';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Vérifier si le backend est disponible
  useEffect(() => {
    const checkMode = async () => {
      const backendAvailable = await checkBackendAvailable();
      setIsDemoMode(!backendAvailable && DEMO_MODE.enabled);
    };
    checkMode();
  }, []);

  // Vérifier si on vient de s'inscrire
  useEffect(() => {
    const registered = searchParams.get('registered');
    const email = searchParams.get('email');
    
    if (registered === 'true') {
      setSuccess('✅ Inscription réussie ! Vous pouvez maintenant vous connecter.');
      if (email) {
        setFormData(prev => ({ ...prev, email: decodeURIComponent(email) }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // MODE DÉMO : Connexion directe sans API
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simuler délai
        const success = await login(formData.email || DEMO_MODE.demoUser.email, formData.password || 'demo');
        if (success) {
          setSuccess('🎭 Connexion en mode démo réussie !');
          setTimeout(() => router.push('/dashboard'), 1000);
        } else {
          setError('Erreur de connexion en mode démo');
        }
        return;
      }

      // MODE NORMAL : Appel API backend pour connexion
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Email ou mot de passe incorrect');
        return;
      }

      // Stocker l'email pour la page 2FA
      localStorage.setItem('pendingEmail', formData.email);
      
      // Redirection vers 2FA
      router.push('/2fa');
    } catch (err: any) {
      // En cas d'erreur réseau, basculer en mode démo
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        setIsDemoMode(true);
        setError('');
        setSuccess('🎭 Backend non disponible. Mode démo activé ! Cliquez sur "Se connecter" pour continuer.');
      } else {
        setError(err.message || 'Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0F1E]">
      <ModernBackground />
      <FloatingParticles />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0F1E]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent tracking-tight">Forstek</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Pas encore de compte ?</span>
              <Link href="/register">
                <Button 
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
                >
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Bon retour !</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Social Login */}
            <div className="space-y-3 mb-8">
              <Button 
                variant="outline"
                className="w-full h-12 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continuer avec Google
              </Button>
              <Button 
                variant="outline"
                className="w-full h-12 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              >
                <Github className="w-5 h-5 mr-2" />
                Continuer avec GitHub
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0A0F1E]/50 text-gray-400 backdrop-blur-sm">ou</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                  {success}
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#2563EB] focus:ring-[#2563EB]/20"
                  />
                  <span className="text-sm text-gray-400">Se souvenir de moi</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/60 transition-all text-base group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              En vous connectant, vous acceptez nos{' '}
              <Link href="/terms" className="text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                Conditions d'utilisation
              </Link>
              {' '}et notre{' '}
              <Link href="/privacy" className="text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
