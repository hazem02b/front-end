"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/api-config';

interface User {
  id?: number;
  email: string;
  name: string;
  phone?: string;
  type: 'student' | 'company' | 'STUDENT' | 'COMPANY';
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, type: 'student' | 'company') => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger l'utilisateur depuis localStorage au démarrage (sans appel API)
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      const isAuth = localStorage.getItem('isAuthenticated');
      
      console.log('🔍 Chargement AuthContext:', { 
        hasToken: !!token, 
        hasUser: !!storedUser, 
        isAuth 
      });
      
      if (token && storedUser && isAuth === 'true') {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('✅ Utilisateur chargé depuis localStorage:', parsedUser.email);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Vérifier le token en arrière-plan (ne bloque pas l'authentification)
          fetch(API_ENDPOINTS.usersMe, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 401) {
              // Token vraiment invalide
              console.log('❌ Token invalide (401)');
              throw new Error('Unauthorized');
            }
            // Autres erreurs : on ignore
            return null;
          })
          .then(data => {
            if (data?.success && data?.user) {
              const userWithProfile = {
                ...data.user,
                profileComplete: !!data.user.phone,
                type: (data.user.type?.toLowerCase() || 'student') as 'student' | 'company',
              };
              console.log('✅ Profil mis à jour depuis API:', userWithProfile.email);
              setUser(userWithProfile);
              localStorage.setItem('user', JSON.stringify(userWithProfile));
            }
          })
          .catch(error => {
            if (error.message === 'Unauthorized') {
              // Vraiment déconnecté
              console.log('🚪 Déconnexion (token invalide)');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('user');
              localStorage.removeItem('isAuthenticated');
              setUser(null);
              setIsAuthenticated(false);
            } else {
              // Erreur réseau ou autre : on garde l'utilisateur connecté
              console.warn('⚠️  Erreur vérification token (ignorée):', error);
            }
          });
        } catch (error) {
          console.error('❌ Erreur parsing user localStorage:', error);
        }
      } else {
        console.log('❌ Pas d\'utilisateur authentifié dans localStorage');
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Note: Le login avec 2FA est géré ailleurs
      // Cette fonction est juste pour la compatibilité
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    type: 'student' | 'company'
  ): Promise<boolean> => {
    try {
      // Note: Le register est géré ailleurs (avec 2FA)
      // Cette fonction est juste pour la compatibilité
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuthenticated');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return false;

      const response = await fetch(API_ENDPOINTS.usersMe, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.user) {
          const updatedUser = {
            ...user,
            ...result.user,
            profileComplete: !!result.user.phone,
            type: (result.user.type?.toLowerCase() || user?.type || 'student') as 'student' | 'company',
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
