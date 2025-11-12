/**
 * Configuration du mode démo
 * Active le mode démo quand le backend n'est pas disponible
 */

export const DEMO_MODE = {
  // Mode démo activé par défaut (désactive les appels API)
  enabled: true,
  
  // Utilisateur de démo
  demoUser: {
    id: 1,
    email: "demo@forstek.tn",
    name: "Utilisateur Démo",
    phone: "+216 20 123 456",
    type: "STUDENT" as const,
    profileComplete: true,
  },
  
  // Profil étudiant de démo
  demoProfile: {
    bio: "Étudiant passionné par le développement web et les nouvelles technologies.",
    skills: "JavaScript, React, Node.js, Python, TypeScript",
    location: "Tunis, Tunisie",
    university: "École Nationale d'Ingénieurs de Tunis (ENIT)",
    degree: "Ingénieur en Informatique",
    graduation_year: "2025",
    linkedin: "https://linkedin.com/in/demo",
    github: "https://github.com/demo",
    website: "https://demo-portfolio.com",
  },
};

/**
 * Vérifie si le backend est disponible
 */
export async function checkBackendAvailable(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // Timeout 2 secondes
    });
    return response.ok;
  } catch {
    return false;
  }
}
