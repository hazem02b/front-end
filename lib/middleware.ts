import { NextRequest } from 'next/server';
import { verifyAccessToken } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    type: 'STUDENT' | 'COMPANY' | 'MENTOR';
  };
}

export async function authenticate(request: NextRequest): Promise<{ 
  authenticated: boolean; 
  user?: { userId: string; email: string; type: 'STUDENT' | 'COMPANY' | 'MENTOR' }; 
  error?: string 
}> {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authenticated: false, error: 'Token manquant' };
    }
    
    const token = authHeader.substring(7); // Enlever "Bearer "
    
    // Vérifier le token
    const payload = verifyAccessToken(token);
    
    if (!payload) {
      return { authenticated: false, error: 'Token invalide ou expiré' };
    }
    
    return { 
      authenticated: true, 
      user: {
        userId: payload.userId,
        email: payload.email,
        type: payload.type as 'STUDENT' | 'COMPANY' | 'MENTOR',
      }
    };
  } catch (error) {
    console.error('Erreur authentification:', error);
    return { authenticated: false, error: 'Erreur d\'authentification' };
  }
}

// Helper pour extraire l'utilisateur ou retourner une erreur 401
export async function requireAuth(request: NextRequest) {
  const auth = await authenticate(request);
  
  if (!auth.authenticated || !auth.user) {
    return {
      user: null,
      error: new Response(
        JSON.stringify({ error: auth.error || 'Non authentifié' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ),
    };
  }
  
  return { user: auth.user, error: null };
}
