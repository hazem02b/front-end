"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, RefreshCw, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { useAuth } from '@/contexts/AuthContext';

export default function TwoFactorAuthPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simuler l'envoi d'email au chargement
  useEffect(() => {
    // Rediriger si pas connecté
    if (!user) {
      router.push('/login');
      return;
    }

    // Simuler l'envoi d'email
    setTimeout(() => {
      setEmailSent(true);
      console.log('📧 Code 2FA envoyé à:', user.email);
      console.log('🔑 Code de test: 123456');
    }, 500);

    inputRefs.current[0]?.focus();
  }, [user, router]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });
    setCode(newCode);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const resendCode = () => {
    setCode(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
    setEmailSent(false);
    inputRefs.current[0]?.focus();
    
    // Simuler l'envoi d'email
    setTimeout(() => {
      setEmailSent(true);
      alert(`📧 Un nouveau code a été envoyé à ${user?.email} !\n\n🔑 Code de test: 123456`);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Veuillez entrer le code à 6 chiffres complet');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // For demo: accept 123456 as valid code
      if (fullCode === '123456') {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError('Code incorrect. Veuillez réessayer.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0F1E] flex items-center justify-center py-12 px-6">
      <ModernBackground />
      <FloatingParticles />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img 
              src="/logo.png" 
              alt="Forstek Logo" 
              className="relative h-12 w-12 rounded-xl object-cover shadow-lg"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Forstek</span>
        </Link>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-3">
            <span className="text-white">Authentification à</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Deux Facteurs</span>
          </h1>
          
          {emailSent ? (
            <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-400 font-medium">Code envoyé avec succès !</p>
                <p className="text-gray-400">Vérifiez votre boîte mail : <span className="text-white font-mono">{user?.email}</span></p>
              </div>
            </div>
          ) : (
            <div className="mb-8 flex items-center justify-center gap-2 text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
              <span className="text-sm">Envoi du code en cours...</span>
            </div>
          )}
          
          <p className="text-center text-gray-400 mb-8">
            Entrez le code à 6 chiffres pour continuer
          </p>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-400 text-sm">Code vérifié avec succès ! Redirection...</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Code Inputs */}
            <div className="flex gap-3 mb-6 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={loading || success}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-white/5 border-2 border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              ))}
            </div>

            {/* Resend Code */}
            <button
              type="button"
              onClick={resendCode}
              disabled={loading || success}
              className="w-full mb-6 text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Renvoyer le code
            </button>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={loading || success || code.some(d => !d)}
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Vérification...'
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Vérifié
                </>
              ) : (
                <>
                  Vérifier
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Vous n'avez pas reçu le code ? Vérifiez vos spams ou{' '}
            <button 
              onClick={resendCode}
              className="text-[#60A5FA] hover:underline"
            >
              renvoyez-le
            </button>
          </p>

          {/* Demo Hint */}
          <div className="mt-6 p-4 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20">
            <p className="text-xs text-center text-gray-400">
              💡 <strong>Demo:</strong> Utilisez le code <span className="font-mono text-[#60A5FA]">123456</span> pour tester
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link 
            href="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
