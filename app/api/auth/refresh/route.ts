import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le refresh token depuis les cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Token de rafraîchissement manquant' },
        { status: 401 }
      );
    }
    
    // Vérifier le refresh token
    const payload = verifyRefreshToken(refreshToken);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Token de rafraîchissement invalide' },
        { status: 401 }
      );
    }
    
    // Générer un nouveau access token
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      type: payload.type,
    });
    
    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Erreur refresh:', error);
    return NextResponse.json(
      { error: 'Erreur lors du rafraîchissement' },
      { status: 500 }
    );
  }
}
