"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Save,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import CVUploader from '@/components/CVUploader';
import { API_ENDPOINTS } from '@/lib/api-config';

export default function SettingsPage() {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [saved, setSaved] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    university: '',
    degree: '',
    graduation_year: '',
    linkedin: '',
    github: '',
    website: ''
  });

  // Charger les données du profil depuis le backend
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        const response = await fetch(API_ENDPOINTS.usersMe, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('📥 Profil chargé:', data.user);
          if (data.success && data.user) {
            setProfileData({
              name: data.user.name || '',
              email: data.user.email || '',
              phone: data.user.phone || '',
              location: data.user.location || '',
              bio: data.user.bio || '',
              university: data.user.university || '',
              degree: data.user.degree || '',
              graduation_year: data.user.graduation_year || '',
              linkedin: data.user.linkedin || '',
              github: data.user.github || '',
              website: data.user.website || ''
            });
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };

    loadProfile();
  }, []);

  const [securityData, setSecurityData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    jobAlerts: true,
    messages: true
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    theme: 'dark',
    timezone: 'Africa/Tunis'
  });

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      console.log('📤 Envoi des données du profil:', profileData);
      
      // Appeler directement l'API au lieu d'utiliser updateProfile
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(API_ENDPOINTS.usersMe, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          location: profileData.location,
          bio: profileData.bio,
          university: profileData.university,
          degree: profileData.degree,
          graduation_year: profileData.graduation_year,
          linkedin: profileData.linkedin,
          github: profileData.github,
          website: profileData.website
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Profil mis à jour:', data);
        
        // Mettre à jour le localStorage
        const updatedUser = {
          ...user,
          name: profileData.name,
          phone: profileData.phone,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        alert('✅ Profil sauvegardé avec succès !');
      } else if (response.status === 401) {
        // Token expiré ou invalide
        const errorData = await response.json();
        console.error('❌ Token invalide:', errorData);
        alert('❌ Votre session a expiré. Veuillez vous reconnecter.');
        
        // Rediriger vers la page de connexion
        localStorage.clear();
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        alert('❌ Erreur lors de la sauvegarde: ' + (errorData.error || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      alert('❌ Erreur de connexion au serveur. Vérifiez que Flask est démarré.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (securityData.newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await fetch(API_ENDPOINTS.usersMe, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: securityData.oldPassword,
          newPassword: securityData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erreur lors de la mise à jour du mot de passe');
        return;
      }

      alert('Mot de passe mis à jour avec succès !');
      setSecurityData({ 
        oldPassword: '', 
        newPassword: '', 
        confirmPassword: '', 
        twoFactorEnabled: securityData.twoFactorEnabled 
      });
    } catch (error) {
      alert('Erreur de connexion');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
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
                <Link href="/roadmaps" className="text-gray-300 hover:text-white transition-colors">Roadmaps</Link>
                <Link href="/mentorship" className="text-gray-300 hover:text-white transition-colors">Mentorship</Link>
                <Link href="/forum" className="text-gray-300 hover:text-white transition-colors">Forum</Link>
              </div>

              <Link href="/profile">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  {user?.name?.split(' ')[0] || 'Profil'}
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Settings Content */}
        <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Paramètres</span>
            </h1>
            <p className="text-gray-400">Gérez votre compte et vos préférences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profil</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'security' 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Sécurité</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'notifications' 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </button>

                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'preferences' 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Palette className="w-5 h-5" />
                  <span className="font-medium">Préférences</span>
                </button>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                {saved && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Modifications enregistrées avec succès !</span>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Informations du profil</h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="+216 XX XXX XXX"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Localisation</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="Tunis, Tunisie"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        placeholder="Parlez-nous de vous..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Université</label>
                        <input
                          type="text"
                          value={profileData.university}
                          onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                          placeholder="ESPRIT, INSAT..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Diplôme</label>
                        <input
                          type="text"
                          value={profileData.degree}
                          onChange={(e) => setProfileData({ ...profileData, degree: e.target.value })}
                          placeholder="Ingénieur, Licence..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Année de diplôme</label>
                      <input
                        type="text"
                        value={profileData.graduation_year}
                        onChange={(e) => setProfileData({ ...profileData, graduation_year: e.target.value })}
                        placeholder="2025"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn</label>
                          <input
                            type="text"
                            value={profileData.linkedin}
                            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                            placeholder="linkedin.com/in/votre-profil"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">GitHub</label>
                          <input
                            type="text"
                            value={profileData.github}
                            onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                            placeholder="github.com/votre-username"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Site Web</label>
                          <input
                            type="text"
                            value={profileData.website}
                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                            placeholder="votresite.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CV Uploader */}
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">CV</h3>
                      <CVUploader />
                    </div>

                    <Button 
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white border-none shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Sécurité du compte</h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Ancien mot de passe</label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? 'text' : 'password'}
                          value={securityData.oldPassword}
                          onChange={(e) => setSecurityData({ ...securityData, oldPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Nouveau mot de passe</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={securityData.newPassword}
                          onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      />
                    </div>

                    <Button 
                      onClick={handleSavePassword}
                      className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white border-none shadow-lg"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Modifier le mot de passe
                    </Button>

                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Authentification à deux facteurs</h3>
                          <p className="text-sm text-gray-400">Sécurisez votre compte avec 2FA</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securityData.twoFactorEnabled}
                            onChange={(e) => setSecurityData({ ...securityData, twoFactorEnabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 peer-focus:ring-2 peer-focus:ring-[#2563EB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Préférences de notifications</h2>

                    {[
                      { key: 'emailNotifications', label: 'Notifications par email', desc: 'Recevoir des emails pour les mises à jour importantes' },
                      { key: 'pushNotifications', label: 'Notifications push', desc: 'Recevoir des notifications dans le navigateur' },
                      { key: 'weeklyDigest', label: 'Résumé hebdomadaire', desc: 'Recevoir un résumé de vos activités chaque semaine' },
                      { key: 'jobAlerts', label: 'Alertes d\'offres', desc: 'Être notifié des nouvelles offres correspondant à votre profil' },
                      { key: 'messages', label: 'Messages', desc: 'Recevoir des notifications pour les nouveaux messages' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div>
                          <h3 className="text-white font-medium">{item.label}</h3>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 peer-focus:ring-2 peer-focus:ring-[#2563EB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Préférences générales</h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Langue</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Thème</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      >
                        <option value="dark">Sombre</option>
                        <option value="light">Clair</option>
                        <option value="auto">Automatique</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Fuseau horaire</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                      >
                        <option value="Africa/Tunis">Africa/Tunis (GMT+1)</option>
                        <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
