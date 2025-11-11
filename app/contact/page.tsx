"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Clock,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernBackground from '@/components/ModernBackground';
import FloatingParticles from '@/components/FloatingParticles';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
    // TODO: Send to backend
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
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
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link>
              <Link href="/contact" className="text-white font-medium">Contact</Link>
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/20 mb-6">
            <MessageCircle className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm text-gray-300">Contact</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-6 text-lg">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Email</div>
                    <a href="mailto:contact@forstek.tn" className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm">
                      contact@forstek.tn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Téléphone</div>
                    <a href="tel:+21612345678" className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm">
                      +216 12 345 678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Adresse</div>
                    <p className="text-gray-400 text-sm">
                      Centre Urbain Nord<br />
                      1082 Tunis, Tunisie
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Horaires</div>
                    <p className="text-gray-400 text-sm">
                      Lun - Ven: 9h00 - 18h00<br />
                      Sam: 10h00 - 14h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 text-lg">Suivez-nous</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", color: "from-blue-500 to-blue-600" },
                  { icon: <Twitter className="w-5 h-5" />, name: "Twitter", color: "from-sky-500 to-sky-600" },
                  { icon: <Facebook className="w-5 h-5" />, name: "Facebook", color: "from-blue-600 to-blue-700" },
                  { icon: <Instagram className="w-5 h-5" />, name: "Instagram", color: "from-pink-500 to-purple-600" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {social.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-2 text-lg">Questions fréquentes ?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Consultez notre FAQ pour trouver des réponses rapides
              </p>
              <Link href="/faq">
                <Button 
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                >
                  Voir la FAQ
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message envoyé !</h3>
                  <p className="text-gray-400">
                    Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                        placeholder="L'objet de votre message"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="privacy"
                        className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-[#2563EB] focus:ring-[#2563EB]/20"
                        required
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-400">
                        J'accepte que mes données soient utilisées pour me recontacter concernant ma demande. *
                      </label>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border-none shadow-lg shadow-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/60 transition-all text-lg group"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 h-64 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#60A5FA] mx-auto mb-4" />
                  <p className="text-white font-semibold mb-2">Centre Urbain Nord, Tunis</p>
                  <p className="text-gray-400 text-sm">Carte interactive bientôt disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
