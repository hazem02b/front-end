"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Github, Chrome, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/lib/api-config';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<'student' | 'company'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    setLoading(true);

    try {
      // Appel API backend pour inscription
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          type: accountType === 'student' ? 'STUDENT' : 'COMPANY',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue lors de l\'inscription');
        return;
      }

      // Inscription réussie - Rediriger vers login avec message de succès
      router.push('/login?registered=true&email=' + encodeURIComponent(formData.email));
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
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
              <span className="text-gray-400 text-sm">Déjà un compte ?</span>
              <Link href="/login">
                <Button 
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Rejoignez Forstek</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Créez votre compte et commencez votre aventure professionnelle
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Account Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setAccountType('student')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  accountType === 'student'
                    ? 'border-[#2563EB] bg-[#2563EB]/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <GraduationCap className={`w-8 h-8 mx-auto mb-3 ${
                  accountType === 'student' ? 'text-[#60A5FA]' : 'text-gray-400'
                }`} />
                <div className="text-white font-semibold mb-1">Étudiant</div>
                <div className="text-gray-400 text-sm">Rechercher des stages</div>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('company')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  accountType === 'company'
                    ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <Briefcase className={`w-8 h-8 mx-auto mb-3 ${
                  accountType === 'company' ? 'text-[#A78BFA]' : 'text-gray-400'
                }`} />
                <div className="text-white font-semibold mb-1">Entreprise</div>
                <div className="text-gray-400 text-sm">Publier des offres</div>
              </button>
            </div>

            {/* Social Registration */}
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

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

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

              <div className="grid md:grid-cols-2 gap-4">
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

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Confirmer</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-12 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-[#2563EB] focus:ring-[#2563EB]/20"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                    Conditions d'utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link href="/privacy" className="text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                    Politique de confidentialité
                  </Link>
                </label>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/60 transition-all text-base group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création du compte...' : 'Créer mon compte'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
