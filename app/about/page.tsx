"use client";

import Link from 'next/link';
import { 
  Target, 
  Eye, 
  Heart,
  Users,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Shield,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';

const TEAM_MEMBERS = [
  { name: "Sarah Johnson", role: "CEO & Fondatrice", avatar: "👩‍💼", description: "Ex-Google, passionnée par l'éducation" },
  { name: "Ahmed Mansour", role: "CTO", avatar: "👨‍💻", description: "15 ans d'expérience en tech" },
  { name: "Leila Karim", role: "Head of Product", avatar: "👩‍🎨", description: "Ex-Microsoft, UX enthusiast" },
  { name: "Mehdi Ben Ali", role: "Head of Growth", avatar: "👨‍🚀", description: "Expert en stratégie digitale" }
];

const VALUES = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Passion",
    description: "Nous sommes passionnés par l'accompagnement des étudiants vers leur réussite professionnelle."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Communauté",
    description: "Nous croyons en la force de la communauté et de l'entraide entre étudiants et professionnels."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Innovation",
    description: "Nous innovons constamment pour offrir la meilleure expérience à nos utilisateurs."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Transparence",
    description: "Nous privilégions la transparence et l'honnêteté dans toutes nos interactions."
  }
];

const STATS = [
  { value: "10,000+", label: "Étudiants accompagnés" },
  { value: "500+", label: "Entreprises partenaires" },
  { value: "15,000+", label: "Stages trouvés" },
  { value: "95%", label: "Taux de satisfaction" }
];

const MILESTONES = [
  { year: "2020", title: "Création", description: "Lancement de Forstek avec une vision claire" },
  { year: "2021", title: "Expansion", description: "500 étudiants et 50 entreprises" },
  { year: "2022", title: "International", description: "Ouverture vers l'Europe et le Moyen-Orient" },
  { year: "2023", title: "Innovation", description: "Lancement du mentorship et du forum" },
  { year: "2024", title: "Leadership", description: "Leader en Tunisie avec 10k+ utilisateurs" },
  { year: "2025", title: "Futur", description: "Expansion en Afrique du Nord" }
];

export default function AboutPage() {
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
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres</Link>
              <Link href="/about" className="text-white font-medium">À propos</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
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
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50"
                >
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm text-gray-300">À propos de Forstek</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Notre mission :</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              Connecter talents et opportunités
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Forstek est la plateforme leader qui connecte les étudiants tunisiens avec les meilleures 
            opportunités de stages et de carrière, en Tunisie et à l'international.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Notre Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Faciliter l'accès aux opportunités professionnelles pour tous les étudiants, 
              en créant un pont entre le monde académique et professionnel.
            </p>
          </div>

          {/* Vision */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/20 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Notre Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Devenir la référence africaine en matière de placement de stages et 
              d'accompagnement de carrière pour les jeunes talents.
            </p>
          </div>

          {/* Impact */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Notre Impact</h2>
            <p className="text-gray-300 leading-relaxed">
              Plus de 10,000 étudiants accompagnés vers leur premier stage, avec un taux 
              de réussite de 95% et une satisfaction client exceptionnelle.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center mx-auto mb-4 text-[#60A5FA]">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Notre Parcours</h2>
          <p className="text-gray-400 text-lg">De l'idée initiale à aujourd'hui</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2563EB] to-[#7C3AED] hidden md:block"></div>

          <div className="space-y-12">
            {MILESTONES.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all inline-block">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:block w-4 h-4 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] border-4 border-[#0A0F1E] z-10"></div>
                
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Notre Équipe</h2>
          <p className="text-gray-400 text-lg">Des experts passionnés à votre service</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 hover:bg-white/10 transition-all group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center text-5xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                {member.avatar}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#60A5FA] transition-colors">
                {member.name}
              </h3>
              <p className="text-[#60A5FA] text-sm mb-2">{member.role}</p>
              <p className="text-gray-400 text-xs">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="backdrop-blur-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-white">Prêt à rejoindre</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">la communauté Forstek ?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui ont déjà trouvé leur voie grâce à Forstek
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button className="h-14 px-8 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-2xl shadow-[#2563EB]/50 text-lg group">
                Créer mon compte
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-lg"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
