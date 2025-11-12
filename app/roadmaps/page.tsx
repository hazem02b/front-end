"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Circle, Lock, ArrowRight, Clock, Star, Award, TrendingUp, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { useAuth } from '@/contexts/AuthContext';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  resources: string[];
  completed: boolean;
  locked: boolean;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  icon: any;
  color: string;
  steps: RoadmapStep[];
}

const ROADMAPS: Roadmap[] = [
  {
    id: 'web-dev',
    title: 'Développement Web Full-Stack',
    description: 'Maîtrisez le développement web moderne de A à Z',
    level: 'Débutant à Avancé',
    duration: '6 mois',
    icon: BookOpen,
    color: 'from-[#2563EB] to-[#1D4ED8]',
    steps: [
      {
        id: 1,
        title: 'HTML & CSS Fundamentals',
        description: 'Apprenez les bases du développement web avec HTML5 et CSS3',
        duration: '3 semaines',
        resources: ['MDN Web Docs', 'FreeCodeCamp', 'CSS-Tricks'],
        completed: true,
        locked: false
      },
      {
        id: 2,
        title: 'JavaScript Moderne (ES6+)',
        description: 'Maîtrisez JavaScript et ses fonctionnalités modernes',
        duration: '4 semaines',
        resources: ['JavaScript.info', 'Eloquent JavaScript', 'You Don\'t Know JS'],
        completed: true,
        locked: false
      },
      {
        id: 3,
        title: 'React.js & Next.js',
        description: 'Créez des applications web modernes avec React et Next.js',
        duration: '6 semaines',
        resources: ['React Docs', 'Next.js Tutorial', 'React Patterns'],
        completed: false,
        locked: false
      },
      {
        id: 4,
        title: 'Backend avec Node.js',
        description: 'Développez des APIs RESTful avec Node.js et Express',
        duration: '5 semaines',
        resources: ['Node.js Docs', 'Express.js Guide', 'MongoDB University'],
        completed: false,
        locked: true
      },
      {
        id: 5,
        title: 'Base de Données & SQL',
        description: 'Apprenez à gérer des bases de données relationnelles et NoSQL',
        duration: '4 semaines',
        resources: ['PostgreSQL Tutorial', 'MongoDB Docs', 'SQL for Beginners'],
        completed: false,
        locked: true
      },
      {
        id: 6,
        title: 'Déploiement & DevOps',
        description: 'Déployez vos applications en production',
        duration: '3 semaines',
        resources: ['Vercel Docs', 'Docker Tutorial', 'CI/CD with GitHub Actions'],
        completed: false,
        locked: true
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science & Machine Learning',
    description: 'Devenez un expert en analyse de données et IA',
    level: 'Intermédiaire',
    duration: '8 mois',
    icon: TrendingUp,
    color: 'from-[#7C3AED] to-[#6D28D9]',
    steps: [
      {
        id: 1,
        title: 'Python pour Data Science',
        description: 'Maîtrisez Python et ses bibliothèques scientifiques',
        duration: '4 semaines',
        resources: ['Python.org', 'NumPy Docs', 'Pandas Tutorial'],
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: 'Statistiques & Mathématiques',
        description: 'Les fondamentaux mathématiques pour la data science',
        duration: '5 semaines',
        resources: ['Khan Academy', 'Statistics by Example', 'Linear Algebra'],
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: 'Visualisation de Données',
        description: 'Créez des visualisations percutantes avec Matplotlib & Seaborn',
        duration: '3 semaines',
        resources: ['Matplotlib Gallery', 'Seaborn Tutorial', 'Plotly Docs'],
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: 'Machine Learning',
        description: 'Algorithmes de ML et applications pratiques',
        duration: '8 semaines',
        resources: ['Scikit-learn Docs', 'ML Course by Andrew Ng', 'Kaggle'],
        completed: false,
        locked: true
      }
    ]
  },
  {
    id: 'design-ui-ux',
    title: 'Design UI/UX',
    description: 'Créez des expériences utilisateur exceptionnelles',
    level: 'Débutant',
    duration: '4 mois',
    icon: Award,
    color: 'from-[#06B6D4] to-[#0891B2]',
    steps: [
      {
        id: 1,
        title: 'Principes du Design',
        description: 'Les fondamentaux du design graphique et UI',
        duration: '3 semaines',
        resources: ['Design Principles', 'Laws of UX', 'Refactoring UI'],
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: 'Figma & Prototypage',
        description: 'Maîtrisez Figma pour créer des maquettes professionnelles',
        duration: '4 semaines',
        resources: ['Figma Tutorials', 'Design Systems', 'Component Libraries'],
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: 'UX Research',
        description: 'Comprenez vos utilisateurs et leurs besoins',
        duration: '3 semaines',
        resources: ['UX Research Methods', 'User Testing', 'Analytics'],
        completed: false,
        locked: true
      }
    ]
  }
];

export default function RoadmapsPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const currentRoadmap = selectedRoadmap 
    ? ROADMAPS.find(r => r.id === selectedRoadmap) 
    : null;

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
                <img 
                  src="/logo.png" 
                  alt="Forstek Logo" 
                  className="relative h-12 w-12 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent tracking-tight">Forstek</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres</Link>
              <Link href="/roadmaps" className="text-[#60A5FA] font-semibold">Roadmaps</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors">Mentorship</Link>
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

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {!selectedRoadmap ? (
          <>
            {/* Roadmaps List */}
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Roadmaps</span>
                <br />
                <span className="text-white">de Compétences</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Suivez des parcours d'apprentissage structurés pour développer vos compétences et atteindre vos objectifs professionnels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROADMAPS.map((roadmap) => {
                const Icon = roadmap.icon;
                const completedSteps = roadmap.steps.filter(s => s.completed).length;
                const totalSteps = roadmap.steps.length;
                const progress = (completedSteps / totalSteps) * 100;

                return (
                  <div 
                    key={roadmap.id}
                    onClick={() => setSelectedRoadmap(roadmap.id)}
                    className="group cursor-pointer backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl hover:bg-white/[0.07]"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{roadmap.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{roadmap.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Niveau</span>
                        <span className="text-white font-medium">{roadmap.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Durée</span>
                        <span className="text-white font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {roadmap.duration}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progression</span>
                        <span className="text-white font-medium">{completedSteps}/{totalSteps}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${roadmap.color} hover:opacity-90 text-white border-none shadow-lg transition-all group`}
                    >
                      Commencer
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Selected Roadmap Detail */}
            <Button 
              onClick={() => setSelectedRoadmap(null)}
              variant="ghost"
              className="mb-8 text-gray-400 hover:text-white"
            >
              ← Retour aux roadmaps
            </Button>

            <div className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                {currentRoadmap && (
                  <>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentRoadmap.color} flex items-center justify-center shadow-xl`}>
                      {(() => {
                        const Icon = currentRoadmap.icon;
                        return <Icon className="w-10 h-10 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-3">{currentRoadmap.title}</h1>
                      <p className="text-xl text-gray-400 mb-4">{currentRoadmap.description}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#60A5FA]" />
                          {currentRoadmap.level}
                        </span>
                        <span className="text-gray-400 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#60A5FA]" />
                          {currentRoadmap.duration}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {currentRoadmap?.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`backdrop-blur-xl bg-white/5 rounded-3xl p-8 border transition-all ${
                      step.locked 
                        ? 'border-white/5 opacity-60' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500/20 border-2 border-green-500' 
                          : step.locked
                          ? 'bg-white/5 border-2 border-white/10'
                          : 'bg-[#2563EB]/20 border-2 border-[#2563EB]'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : step.locked ? (
                          <Lock className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-[#2563EB]" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 mb-4">{step.description}</p>
                          </div>
                          <span className="text-sm text-gray-400 flex items-center gap-1 flex-shrink-0 ml-4">
                            <Clock className="w-4 h-4" />
                            {step.duration}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm text-gray-400 mb-2">Ressources recommandées :</div>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                              >
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>

                        {!step.locked && !step.completed && (
                          <Button 
                            className={`bg-gradient-to-r ${currentRoadmap.color} hover:opacity-90 text-white border-none shadow-lg`}
                          >
                            Commencer cette étape
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}

                        {step.completed && (
                          <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            Étape complétée
                          </div>
                        )}

                        {step.locked && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Lock className="w-4 h-4" />
                            Complétez les étapes précédentes pour déverrouiller
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
