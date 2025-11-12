import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { verifyPassword, generate2FACode, get2FAExpiry } from '@/lib/auth';
import { send2FAEmail } from '@/lib/email';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validatedData = loginSchema.parse(body);
    
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Générer et sauvegarder le code 2FA
    const code2FA = generate2FACode();
    const expiry2FA = get2FAExpiry();
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorCode: code2FA,
        twoFactorExpiry: expiry2FA,
      },
    });
    
    // Envoyer l'email avec le code (non bloquant)
    send2FAEmail(user.email, code2FA, user.name).catch(console.error);
    
    return NextResponse.json({
      success: true,
      message: 'Code de vérification envoyé par email',
      email: user.email, // Pour afficher sur la page 2FA
      userId: user.id, // Pour la vérification 2FA
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Erreur login:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
