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
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="/logo.png" 
                  alt="Forstek Logo" 
                  className="relative h-12 w-12 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent tracking-tight">Forstek</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres</Link>
              <Link href="/roadmaps" className="text-gray-300 hover:text-white transition-colors">Roadmaps</Link>
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
              <span className="text-white">stage</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Connectez-vous avec des opportunités de stages. 
              Développez vos compétences, trouvez des mentors et lancez votre carrière.
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
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-400">Stages disponibles</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">2,000+</div>
                <div className="text-sm text-gray-400">Étudiants actifs</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-gray-400">Taux de satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/40 to-[#7C3AED]/40 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-500"></div>
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-6 border-2 border-white/20 shadow-2xl hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_50px_rgba(37,99,235,0.3)]">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/hero-image.png"
                  alt="Étudiants travaillant ensemble"
                  className="w-full h-[400px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to Unsplash if local image fails
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Comment ça</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">fonctionne ?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trouvez votre stage en 4 étapes simples
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Créez votre profil",
              description: "Inscrivez-vous gratuitement et complétez votre profil en quelques minutes"
            },
            {
              step: "02",
              title: "Explorez les offres",
              description: "Parcourez des centaines de stages filtrés selon vos préférences"
            },
            {
              step: "03",
              title: "Postulez facilement",
              description: "Candidatez en un clic et suivez l'état de vos candidatures"
            },
            {
              step: "04",
              title: "Décrochez votre stage",
              description: "Préparez-vous avec nos ressources et décrochez le stage parfait"
            }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all h-full hover:bg-white/[0.07]">
                <div className="text-6xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent mb-6 opacity-50">{step.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#2563EB] to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Ce que disent</span>
            <br />
            <span className="text-white">nos étudiants</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Amira Ben Salem",
              role: "Étudiante en Informatique",
              content: "Grâce à Forstek, j'ai décroché un stage chez Google. La plateforme est intuitive et les ressources sont excellentes !",
              rating: 5
            },
            {
              name: "Mohamed Trabelsi",
              role: "Étudiant en Marketing",
              content: "Le système de mentorat m'a énormément aidé à préparer mes entretiens. Je recommande vivement Forstek !",
              rating: 5
            },
            {
              name: "Salma Khediri",
              role: "Étudiante en Design",
              content: "Interface moderne, processus simple et des opportunités incroyables. Forstek a changé ma recherche de stage.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-[#2563EB]/20 hover:bg-white/[0.07]"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
                  <span className="text-white font-bold">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Prêt à démarrer</span>
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">votre carrière professionnelle ?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants tunisiens qui ont déjà trouvé 
              leur stage grâce à Forstek.
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
                <img 
                  src="/logo.png" 
                  alt="Forstek Logo" 
                  className="h-10 w-10 rounded-xl"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Forstek</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                La plateforme qui connecte les étudiants tunisiens avec les meilleures 
                opportunités de stages et de carrière.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/company/forstek" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/forstek" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/forstek" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/forstek" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
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
