"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MessageCircle, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp,
  Clock,
  Filter,
  Plus,
  Users,
  Eye,
  Award,
  Sparkles,
  Bell,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_TOPICS = [
  {
    id: 1,
    title: "Comment préparer un entretien technique pour un stage de développement ?",
    author: "Sarah M.",
    category: "Conseils",
    tags: ["entretien", "développement", "préparation"],
    replies: 24,
    views: 456,
    likes: 18,
    lastActivity: "Il y a 2h",
    avatar: "👩‍💻",
    isPinned: true
  },
  {
    id: 2,
    title: "Stage à l'étranger : visa et démarches administratives",
    author: "Ahmed K.",
    category: "International",
    tags: ["visa", "étranger", "administratif"],
    replies: 15,
    views: 289,
    likes: 12,
    lastActivity: "Il y a 5h",
    avatar: "👨‍🎓",
    isPinned: false
  },
  {
    id: 3,
    title: "Retour d'expérience : mon stage chez Google",
    author: "Fatima B.",
    category: "Témoignage",
    tags: ["google", "expérience", "tech"],
    replies: 42,
    views: 1240,
    likes: 85,
    lastActivity: "Il y a 1 jour",
    avatar: "🌟",
    isPinned: true
  },
  {
    id: 4,
    title: "Quel salaire demander pour un stage de 6 mois ?",
    author: "Mehdi T.",
    category: "Salaire",
    tags: ["salaire", "négociation", "contrat"],
    replies: 31,
    views: 678,
    likes: 23,
    lastActivity: "Il y a 3h",
    avatar: "💰",
    isPinned: false
  },
  {
    id: 5,
    title: "Les meilleures plateformes pour trouver un stage en informatique",
    author: "Leila S.",
    category: "Ressources",
    tags: ["plateformes", "recherche", "informatique"],
    replies: 19,
    views: 534,
    likes: 34,
    lastActivity: "Il y a 4h",
    avatar: "🔍",
    isPinned: false
  },
  {
    id: 6,
    title: "Comment rédiger une lettre de motivation efficace ?",
    author: "Karim N.",
    category: "Conseils",
    tags: ["lettre", "motivation", "candidature"],
    replies: 28,
    views: 892,
    likes: 41,
    lastActivity: "Il y a 6h",
    avatar: "✍️",
    isPinned: false
  }
];

const CATEGORIES = [
  { name: "Tous", count: 156, icon: "🌐" },
  { name: "Conseils", count: 45, icon: "💡" },
  { name: "Témoignage", count: 32, icon: "⭐" },
  { name: "International", count: 28, icon: "🌍" },
  { name: "Salaire", count: 19, icon: "💰" },
  { name: "Ressources", count: 32, icon: "📚" }
];

export default function ForumPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

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
              <Link href="/forum" className="text-white font-medium">Forum</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors">Mentorship</Link>
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
            <MessageCircle className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm text-gray-300">Communauté</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              Forum Forstek
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Posez vos questions, partagez vos expériences et connectez-vous avec la communauté
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans le forum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>
              <Button className="h-12 px-6 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50">
                <Plus className="w-5 h-5 mr-2" />
                Nouveau sujet
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <MessageSquare className="w-5 h-5" />, label: "Discussions", value: "1,234" },
              { icon: <Users className="w-5 h-5" />, label: "Membres", value: "5,678" },
              { icon: <MessageCircle className="w-5 h-5" />, label: "Messages", value: "12,456" },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Actifs aujourd'hui", value: "234" }
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

      {/* Forum Content */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#60A5FA]" />
                Catégories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-[#2563EB]/40 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Top Contributors */}
              <div className="mt-8">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#60A5FA]" />
                  Top Contributeurs
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah M.", points: 1250, avatar: "👩‍💻" },
                    { name: "Ahmed K.", points: 980, avatar: "👨‍🎓" },
                    { name: "Fatima B.", points: 856, avatar: "🌟" }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-sm">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{user.name}</div>
                        <div className="text-gray-500 text-xs">{user.points} points</div>
                      </div>
                      <div className="text-[#60A5FA] text-xs font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Topics List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {MOCK_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center text-2xl border border-white/10">
                        {topic.avatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          {topic.isPinned && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] text-xs font-semibold mb-2">
                              <Sparkles className="w-3 h-3" />
                              Épinglé
                            </div>
                          )}
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#60A5FA] transition-colors mb-1">
                            {topic.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>Par {topic.author}</span>
                            <span>•</span>
                            <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                              {topic.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {topic.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#60A5FA]" />
                          <span>{topic.replies} réponses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#60A5FA]" />
                          <span>{topic.views} vues</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-[#60A5FA]" />
                          <span>{topic.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Clock className="w-4 h-4" />
                          <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 h-12"
              >
                Charger plus de discussions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
