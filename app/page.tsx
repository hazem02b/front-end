"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, Users, TrendingUp, MessageCircle, Award, BookOpen, Star, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0F1E]">
      {/* Modern Animated Background */}
      <ModernBackground />
      <FloatingParticles />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0F1E]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent tracking-tight">Forstek</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres</Link>
              <Link href="/forum" className="text-gray-300 hover:text-white transition-colors">Forum</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors">Mentorship</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 hover:text-white border-none"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/60 transition-all"
                >
                  Commencer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
              <span className="text-sm text-gray-300">Plateforme #1 pour les étudiants tunisiens</span>
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Trouvez votre</span>
              <br />
              <span className="text-white">stage idéal</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Connectez-vous avec des opportunités de stages exceptionnelles. 
              Développez vos compétences, trouvez des mentors et lancez votre carrière professionnelle.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button 
                  className="h-14 px-8 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-2xl shadow-[#2563EB]/50 hover:shadow-[#2563EB]/60 transition-all text-lg group"
                >
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/offres">
                <Button 
                  variant="outline"
                  className="h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-lg"
                >
                  Voir les offres
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#60A5FA]" />
                <span className="text-gray-300">5000+ étudiants</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#60A5FA]" />
                <span className="text-gray-300">500+ entreprises</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#60A5FA]" />
                <span className="text-gray-300">95% de réussite</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Stage International</div>
                    <div className="text-gray-400 text-sm">France • Allemagne • Canada</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Mentorship Personnalisé</div>
                    <div className="text-gray-400 text-sm">Accompagnement expert</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Formation Continue</div>
                    <div className="text-gray-400 text-sm">Roadmaps & Ressources</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/20 mb-6">
              <Star className="w-4 h-4 text-[#60A5FA]" />
              <span className="text-sm text-gray-300">Fonctionnalités</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Tout ce dont vous avez besoin</span>
              <br />
              <span className="text-white">pour réussir votre carrière</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Une plateforme complète qui vous accompagne de la recherche de stage 
              jusqu'à votre premier emploi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8 text-[#60A5FA]" />,
                title: "Opportunités Globales",
                description: "Accédez à des milliers d'offres de stages en Tunisie et à l'international"
              },
              {
                icon: <Users className="w-8 h-8 text-[#60A5FA]" />,
                title: "Réseau Professionnel",
                description: "Connectez-vous avec des experts et élargissez votre réseau"
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-[#60A5FA]" />,
                title: "Forum & Communauté",
                description: "Échangez avec d'autres étudiants et partagez vos expériences"
              },
              {
                icon: <BookOpen className="w-8 h-8 text-[#60A5FA]" />,
                title: "Roadmaps Carrière",
                description: "Suivez des parcours personnalisés pour atteindre vos objectifs"
              },
              {
                icon: <Award className="w-8 h-8 text-[#60A5FA]" />,
                title: "Mentorship Expert",
                description: "Bénéficiez de l'accompagnement de professionnels expérimentés"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#60A5FA]" />,
                title: "Suivi de Progression",
                description: "Suivez vos candidatures et progressez vers vos objectifs"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300 hover:border-white/20">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 group-hover:from-[#2563EB]/30 group-hover:to-[#7C3AED]/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white text-center group-hover:text-[#60A5FA] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Prêt à démarrer</span>
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">votre aventure ?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants tunisiens qui ont déjà trouvé 
              leur stage idéal grâce à Forstek.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button 
                  className="h-14 px-8 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-2xl shadow-[#2563EB]/50 hover:shadow-[#2563EB]/60 transition-all text-lg group"
                >
                  Créer mon compte
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/offres">
                <Button 
                  variant="outline"
                  className="h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-lg"
                >
                  Voir les offres
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] to-[#000000]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Forstek</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                La plateforme qui connecte les étudiants tunisiens avec les meilleures 
                opportunités de stages et de carrière.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Plateforme</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><Link href="/offres" className="hover:text-white transition-colors">Offres de stage</Link></li>
                <li><Link href="/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
                <li><Link href="/forum" className="hover:text-white transition-colors">Forum</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Forstek. Tous droits réservés.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
