"use client";

import { useState } from 'react';
import { 
  TrendingUp, 
  FileText, 
  Calendar, 
  Award, 
  Bell, 
  ChevronRight,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  MessageCircle,
  Users,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    company: "Tech Solutions",
    position: "Développeur Full Stack",
    status: "accepted",
    date: "2024-11-05",
    logo: "💻"
  },
  {
    id: 2,
    company: "Digital Agency",
    position: "Marketing Digital",
    status: "pending",
    date: "2024-11-08",
    logo: "📱"
  },
  {
    id: 3,
    company: "Creative Studio",
    position: "Designer UX/UI",
    status: "rejected",
    date: "2024-10-28",
    logo: "🎨"
  },
  {
    id: 4,
    company: "AI Innovators",
    position: "Data Scientist",
    status: "pending",
    date: "2024-11-09",
    logo: "🤖"
  }
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nouvelle offre correspondant à votre profil",
    message: "Stage Développeur React chez WebCorp",
    time: "Il y a 2h",
    type: "offer"
  },
  {
    id: 2,
    title: "Candidature acceptée",
    message: "Tech Solutions a accepté votre candidature",
    time: "Il y a 5h",
    type: "success"
  },
  {
    id: 3,
    title: "Message de mentor",
    message: "Ahmed a répondu à votre question",
    time: "Il y a 1 jour",
    type: "message"
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'notifications'>('overview');
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
            <CheckCircle className="w-3 h-3" />
            Acceptée
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
            <Clock className="w-3 h-3" />
            En attente
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            <XCircle className="w-3 h-3" />
            Refusée
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
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
              <Link href="/roadmaps" className="text-gray-300 hover:text-white transition-colors">Roadmaps</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors">Mentorship</Link>
              <Link href="/forum" className="text-gray-300 hover:text-white transition-colors">Forum</Link>
              <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">Paramètres</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
                <Bell className="w-6 h-6 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-semibold cursor-pointer">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Welcome Banner */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bienvenue, <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">{user?.name || 'Utilisateur'}</span> 👋
              </h1>
              <p className="text-gray-300">
                Continuez votre progression vers votre stage idéal
              </p>
            </div>
            <Link href="/offres">
              <Button className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50">
                Parcourir les offres
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Briefcase className="w-6 h-6" />, label: "Candidatures", value: "12", color: "from-blue-500 to-blue-600" },
            { icon: <CheckCircle className="w-6 h-6" />, label: "Acceptées", value: "3", color: "from-green-500 to-green-600" },
            { icon: <Clock className="w-6 h-6" />, label: "En attente", value: "7", color: "from-yellow-500 to-yellow-600" },
            { icon: <Target className="w-6 h-6" />, label: "Score profil", value: "85%", color: "from-purple-500 to-purple-600" }
          ].map((stat, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Applications & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#60A5FA]" />
                  Mes candidatures récentes
                </h2>
                <Link href="/applications" className="text-[#60A5FA] hover:text-[#A78BFA] text-sm flex items-center gap-1">
                  Voir tout
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {MOCK_APPLICATIONS.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center text-2xl border border-white/10">
                      {app.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{app.position}</h3>
                          <p className="text-gray-400 text-sm">{app.company}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Postulé le {new Date(app.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#60A5FA]" />
                Actions rapides
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: <BarChart3 />, title: "Améliorer mon profil", desc: "Score actuel: 85%", color: "from-blue-500/20 to-blue-600/20" },
                  { icon: <Users />, title: "Trouver un mentor", desc: "200+ mentors disponibles", color: "from-purple-500/20 to-purple-600/20" },
                  { icon: <MessageCircle />, title: "Rejoindre le forum", desc: "Discuter avec la communauté", color: "from-green-500/20 to-green-600/20" },
                  { icon: <Award />, title: "Mes certifications", desc: "Ajouter vos diplômes", color: "from-yellow-500/20 to-yellow-600/20" }
                ].map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-[#60A5FA] transition-colors">{action.title}</h3>
                      <p className="text-gray-400 text-sm">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Notifications & Progress */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#60A5FA]" />
                  Notifications
                </h2>
                <span className="px-2 py-1 rounded-full bg-[#2563EB]/20 text-[#60A5FA] text-xs font-semibold">
                  3 new
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <h3 className="font-semibold text-white text-sm mb-1">{notif.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">{notif.message}</p>
                    <span className="text-gray-500 text-xs">{notif.time}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              >
                Voir toutes les notifications
              </Button>
            </div>

            {/* Progress Card */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-[#60A5FA]" />
                <h2 className="text-xl font-bold text-white">Votre progression</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Profil complété", value: 85 },
                  { label: "CV optimisé", value: 70 },
                  { label: "Lettre de motivation", value: 60 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">{item.label}</span>
                      <span className="text-[#60A5FA] font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/settings">
                <Button className="w-full mt-6 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none">
                  Compléter mon profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
