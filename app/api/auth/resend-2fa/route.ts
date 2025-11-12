import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generate2FACode, get2FAExpiry } from '@/lib/auth';
import { send2FAEmail } from '@/lib/email';

const resend2FASchema = z.object({
  email: z.string().email('Email invalide'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validatedData = resend2FASchema.parse(body);
    
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      // Ne pas révéler si l'utilisateur existe ou non
      return NextResponse.json({
        success: true,
        message: 'Si cet email existe, un nouveau code a été envoyé',
      });
    }
    
    // Générer et sauvegarder un nouveau code 2FA
    const code2FA = generate2FACode();
    const expiry2FA = get2FAExpiry();
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorCode: code2FA,
        twoFactorExpiry: expiry2FA,
      },
    });
    
    // Envoyer l'email avec le nouveau code (non bloquant)
    send2FAEmail(user.email, code2FA, user.name).catch(console.error);
    
    return NextResponse.json({
      success: true,
      message: 'Un nouveau code a été envoyé par email',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Erreur resend-2fa:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du code' },
      { status: 500 }
    );
  }
}
