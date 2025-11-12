import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { hashPassword, generateAccessToken, generateRefreshToken, sanitizeUser } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional(),
  type: z.enum(['STUDENT', 'COMPANY', 'MENTOR']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validatedData = registerSchema.parse(body);
    
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }
    
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        phone: validatedData.phone,
        type: validatedData.type,
      },
    });
    
    // Créer le profil associé selon le type
    if (validatedData.type === 'STUDENT') {
      await prisma.studentProfile.create({
        data: { userId: user.id },
      });
    } else if (validatedData.type === 'COMPANY') {
      await prisma.companyProfile.create({
        data: { userId: user.id },
      });
    }
    
    // Envoyer l'email de bienvenue (non bloquant)
    sendWelcomeEmail(user.email, user.name).catch(console.error);
    
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
    const response = NextResponse.json(
      {
        success: true,
        user: sanitizeUser(user),
        accessToken,
      },
      { status: 201 }
    );
    
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
    
    console.error('Erreur register:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
