import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Déconnexion réussie',
  });
  
  // Supprimer le refresh token cookie
  response.cookies.delete('refreshToken');
  
  return response;
}
