"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  MapPin, 
  Briefcase,
  Award,
  Users,
  MessageCircle,
  Calendar,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle,
  TrendingUp,
  Bell,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_MENTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    location: "Paris, France",
    expertise: ["React", "Node.js", "Architecture", "Leadership"],
    rating: 4.9,
    reviews: 127,
    sessions: 342,
    languages: ["Français", "Anglais"],
    availability: "Disponible",
    price: "Gratuit",
    avatar: "👩‍💼",
    verified: true
  },
  {
    id: 2,
    name: "Ahmed Ben Ali",
    title: "Product Manager",
    company: "Microsoft",
    location: "Tunis, Tunisie",
    expertise: ["Product Management", "Agile", "Strategy", "UX"],
    rating: 4.8,
    reviews: 98,
    sessions: 256,
    languages: ["Français", "Anglais", "Arabe"],
    availability: "Disponible",
    price: "50 DT/session",
    avatar: "👨‍💼",
    verified: true
  },
  {
    id: 3,
    name: "Marie Dupont",
    title: "Data Scientist",
    company: "Amazon",
    location: "Remote",
    expertise: ["Machine Learning", "Python", "Data Analysis", "AI"],
    rating: 5.0,
    reviews: 156,
    sessions: 428,
    languages: ["Français", "Anglais"],
    availability: "Complet jusqu'au 20 Nov",
    price: "Gratuit",
    avatar: "👩‍🔬",
    verified: true
  },
  {
    id: 4,
    name: "Karim Mansour",
    title: "UX/UI Designer",
    company: "Spotify",
    location: "Stockholm, Suède",
    expertise: ["UI Design", "UX Research", "Figma", "Design System"],
    rating: 4.7,
    reviews: 84,
    sessions: 189,
    languages: ["Français", "Anglais"],
    availability: "Disponible",
    price: "30 DT/session",
    avatar: "🎨",
    verified: true
  },
  {
    id: 5,
    name: "Fatima Zahra",
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Amsterdam, Pays-Bas",
    expertise: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    rating: 4.9,
    reviews: 112,
    sessions: 298,
    languages: ["Français", "Anglais", "Arabe"],
    availability: "Disponible",
    price: "Gratuit",
    avatar: "☁️",
    verified: true
  },
  {
    id: 6,
    name: "Mehdi Gharbi",
    title: "Cybersecurity Expert",
    company: "IBM",
    location: "Sfax, Tunisie",
    expertise: ["Security", "Penetration Testing", "Compliance", "Risk"],
    rating: 4.8,
    reviews: 91,
    sessions: 234,
    languages: ["Français", "Anglais", "Arabe"],
    availability: "Disponible",
    price: "40 DT/session",
    avatar: "🔐",
    verified: true
  }
];

const EXPERTISE_FILTERS = [
  "Tous",
  "Développement",
  "Design",
  "Data Science",
  "Product",
  "DevOps",
  "Marketing",
  "Cybersécurité"
];

export default function MentorshipPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('Tous');

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
              <Link href="/forum" className="text-gray-300 hover:text-white transition-colors">Forum</Link>
              <Link href="/mentorship" className="text-white font-medium">Mentorship</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/20 mb-6">
            <Users className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm text-gray-300">Mentorship</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              Trouvez votre mentor idéal
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Connectez-vous avec des experts qui vous guideront vers le succès
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, compétence ou entreprise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>
              <Button className="h-12 px-6 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50">
                <Filter className="w-5 h-5 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Expertise Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {EXPERTISE_FILTERS.map((expertise, index) => (
              <button
                key={index}
                onClick={() => setSelectedExpertise(expertise)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedExpertise === expertise
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/30'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {expertise}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Mentors", value: "500+" },
              { icon: <MessageCircle className="w-5 h-5" />, label: "Sessions", value: "10k+" },
              { icon: <Star className="w-5 h-5" />, label: "Note moyenne", value: "4.8/5" },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Taux de succès", value: "96%" }
            ].map((stat, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center text-3xl border border-white/10">
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2 group-hover:text-[#60A5FA] transition-colors">
                        {mentor.name}
                        {mentor.verified && (
                          <CheckCircle className="w-4 h-4 text-[#60A5FA]" />
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm">{mentor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold text-sm">{mentor.rating}</span>
                    <span className="text-gray-400 text-xs">({mentor.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Company & Location */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Briefcase className="w-4 h-4 text-[#60A5FA]" />
                  {mentor.company}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-[#60A5FA]" />
                  {mentor.location}
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-[#2563EB]/10 to-[#7C3AED]/10 border border-[#2563EB]/20 text-xs text-white"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400">
                    +{mentor.expertise.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {mentor.sessions} sessions
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {mentor.languages.join(", ")}
                </div>
              </div>

              {/* Availability & Price */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#60A5FA]" />
                  <span className="text-sm text-gray-300">{mentor.availability}</span>
                </div>
                <div className="text-white font-semibold">{mentor.price}</div>
              </div>

              {/* CTA Button */}
              <Button className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/30 group-hover:shadow-[#2563EB]/50 transition-all">
                Réserver une session
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 h-12"
          >
            Voir plus de mentors
          </Button>
        </div>
      </section>
    </div>
  );
}
