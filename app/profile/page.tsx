"use client";

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Upload,
  Edit,
  Save,
  Plus,
  X,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Jean Dupont",
    email: "jean.dupont@exemple.com",
    phone: "+216 12 345 678",
    location: "Tunis, Tunisie",
    bio: "Étudiant passionné en informatique, spécialisé en développement web full stack. À la recherche d'un stage pour mettre en pratique mes compétences.",
    university: "ESPRIT",
    degree: "Ingénieur en Informatique",
    graduationYear: "2025",
    linkedin: "linkedin.com/in/jeandupont",
    github: "github.com/jeandupont",
    website: "jeandupont.com"
  });

  const [skills, setSkills] = useState([
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Git"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend
    console.log("Saving profile:", profileData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
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
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/profile" className="text-white font-medium">Profil</Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-semibold cursor-pointer">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Profile Header */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-5xl font-bold">
                JD
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Upload className="w-5 h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileData.fullName}</h1>
                  <p className="text-gray-400 text-lg">{profileData.degree} • {profileData.university}</p>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </>
                  )}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-[#60A5FA]" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-[#60A5FA]" />
                  {profileData.phone}
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-[#60A5FA]" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-[#60A5FA]" />
                  Diplôme en {profileData.graduationYear}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {profileData.linkedin && (
                  <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {profileData.github && (
                  <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {profileData.website && (
                  <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#60A5FA]" />
                À propos
              </h2>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all resize-none"
                  placeholder="Parlez de vous..."
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#60A5FA]" />
                Compétences
              </h2>
              
              {isEditing && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                    placeholder="Ajouter une compétence..."
                  />
                  <Button
                    onClick={addSkill}
                    className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white border-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB]/10 to-[#7C3AED]/10 border border-[#2563EB]/20 text-white group hover:border-[#2563EB]/40 transition-all"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#60A5FA]" />
                Formation
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{profileData.degree}</h3>
                      <p className="text-gray-400 text-sm mb-2">{profileData.university}</p>
                      <p className="text-gray-500 text-xs">2022 - {profileData.graduationYear}</p>
                    </div>
                  </div>
                </div>
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une formation
                </Button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Documents */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#60A5FA]" />
                Documents
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">CV.pdf</div>
                      <div className="text-gray-500 text-xs">Mis à jour il y a 2 jours</div>
                    </div>
                  </div>
                  <Edit className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">Lettre de motivation.pdf</div>
                      <div className="text-gray-500 text-xs">Mis à jour il y a 1 semaine</div>
                    </div>
                  </div>
                  <Edit className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              >
                <Upload className="w-4 h-4 mr-2" />
                Télécharger un document
              </Button>
            </div>

            {/* Profile Score */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Score de profil</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">85%</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm text-center mb-4">
                Complétez votre profil pour augmenter vos chances de trouver un stage
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  Informations personnelles complètes
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  CV téléchargé
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  Ajouter plus de compétences
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  Ajouter une photo de profil
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
