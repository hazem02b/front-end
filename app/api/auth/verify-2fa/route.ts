import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generateAccessToken, generateRefreshToken, sanitizeUser } from '@/lib/auth';

const verify2FASchema = z.object({
  userId: z.string(),
  code: z.string().length(6, 'Le code doit contenir 6 chiffres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validatedData = verify2FASchema.parse(body);
    
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      include: {
        studentProfile: true,
        companyProfile: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
    
    // Vérifier si le code existe
    if (!user.twoFactorCode || !user.twoFactorExpiry) {
      return NextResponse.json(
        { error: 'Code non trouvé. Veuillez vous reconnecter.' },
        { status: 400 }
      );
    }
    
    // Vérifier si le code n'est pas expiré
    if (new Date() > user.twoFactorExpiry) {
      return NextResponse.json(
        { error: 'Le code a expiré. Veuillez vous reconnecter.' },
        { status: 400 }
      );
    }
    
    // Vérifier le code
    if (user.twoFactorCode !== validatedData.code) {
      return NextResponse.json(
        { error: 'Code incorrect' },
        { status: 401 }
      );
    }
    
    // Effacer le code 2FA et marquer l'email comme vérifié
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorCode: null,
        twoFactorExpiry: null,
        emailVerified: true,
      },
    });
    
    // Générer les tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      type: user.type,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      type: user.type,
    });
    
    // Créer la réponse avec les cookies
    const response = NextResponse.json({
      success: true,
      user: sanitizeUser(user),
      accessToken,
    });
    
    // Définir le refresh token en cookie HTTP-only
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',
    });
    
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Erreur verify-2fa:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}
