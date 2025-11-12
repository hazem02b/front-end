"use client";

import { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Euro, Filter, Star, TrendingUp, Building, ChevronRight, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_OFFERS = [
  {
    id: 1,
    title: "Stage Développeur Full Stack",
    company: "Tech Solutions",
    location: "Tunis, Tunisie",
    type: "Stage",
    duration: "6 mois",
    salary: "800-1200 DT",
    logo: "💻",
    tags: ["React", "Node.js", "MongoDB"],
    posted: "Il y a 2 jours",
    featured: true
  },
  {
    id: 2,
    title: "Stage Marketing Digital",
    company: "Digital Agency",
    location: "Sfax, Tunisie",
    type: "Stage",
    duration: "3 mois",
    salary: "600-900 DT",
    logo: "📱",
    tags: ["SEO", "Social Media", "Analytics"],
    posted: "Il y a 5 jours",
    featured: false
  },
  {
    id: 3,
    title: "Stage Data Scientist",
    company: "AI Innovators",
    location: "Paris, France",
    type: "Stage",
    duration: "6 mois",
    salary: "1500-2000€",
    logo: "🤖",
    tags: ["Python", "Machine Learning", "TensorFlow"],
    posted: "Il y a 1 semaine",
    featured: true
  },
  {
    id: 4,
    title: "Stage Designer UX/UI",
    company: "Creative Studio",
    location: "Sousse, Tunisie",
    type: "Stage",
    duration: "4 mois",
    salary: "700-1000 DT",
    logo: "🎨",
    tags: ["Figma", "Adobe XD", "Prototyping"],
    posted: "Il y a 3 jours",
    featured: false
  },
  {
    id: 5,
    title: "Stage Développeur Mobile",
    company: "Mobile Apps Co",
    location: "Remote",
    type: "Stage",
    duration: "5 mois",
    salary: "900-1400 DT",
    logo: "📲",
    tags: ["React Native", "Flutter", "iOS"],
    posted: "Il y a 4 jours",
    featured: true
  },
  {
    id: 6,
    title: "Stage DevOps Engineer",
    company: "Cloud Services",
    location: "Tunis, Tunisie",
    type: "Stage",
    duration: "6 mois",
    salary: "1000-1500 DT",
    logo: "☁️",
    tags: ["Docker", "Kubernetes", "AWS"],
    posted: "Il y a 1 jour",
    featured: false
  }
];

export default function OffersPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredOffers = MOCK_OFFERS.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || offer.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

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
              <Link href="/offres" className="text-white font-medium">Offres</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">Paramètres</Link>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
                    <Bell className="w-6 h-6 text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <Link href="/settings">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </div>
                  </Link>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Search Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              Trouvez votre stage idéal
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {filteredOffers.length} offres de stage disponibles
          </p>
        </div>

        {/* Search Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, entreprise ou compétence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>
            <div className="relative w-full md:w-64">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">Toutes les villes</option>
                <option value="Tunis">Tunis</option>
                <option value="Sfax">Sfax</option>
                <option value="Sousse">Sousse</option>
                <option value="Remote">Remote</option>
                <option value="France">France</option>
              </select>
            </div>
            <Button className="h-12 px-6 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50">
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Briefcase className="w-5 h-5" />, label: "Total Offres", value: "850+" },
            { icon: <Building className="w-5 h-5" />, label: "Entreprises", value: "200+" },
            { icon: <TrendingUp className="w-5 h-5" />, label: "Taux de réussite", value: "95%" },
            { icon: <Star className="w-5 h-5" />, label: "Satisfaction", value: "4.9/5" }
          ].map((stat, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-xl">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers List */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
            >
              {offer.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full text-white text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  En vedette
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center text-3xl backdrop-blur-sm border border-white/10">
                    {offer.logo}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#60A5FA] transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-400">{offer.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#60A5FA]" />
                      {offer.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#60A5FA]" />
                      {offer.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-[#60A5FA]" />
                      {offer.salary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {offer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{offer.posted}</span>
                    <Button
                      className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/30 group-hover:shadow-[#2563EB]/50 transition-all"
                    >
                      Postuler
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 h-12"
          >
            Charger plus d'offres
          </Button>
        </div>
      </section>
    </div>
  );
}
