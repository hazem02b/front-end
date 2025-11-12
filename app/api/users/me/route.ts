import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware';
import { sanitizeUser, hashPassword, verifyPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const { user, error } = await requireAuth(request);
    if (error) return error;
    
    // Récupérer le profil complet de l'utilisateur
    const fullUser = await prisma.user.findUnique({
      where: { id: user!.userId },
      include: {
        studentProfile: true,
        companyProfile: true,
      },
    });
    
    if (!fullUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: sanitizeUser(fullUser),
    });
  } catch (error) {
    console.error('Erreur GET /api/users/me:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du profil' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const { user, error } = await requireAuth(request);
    if (error) return error;
    
    const body = await request.json();
    const { name, phone, location, bio, avatar, currentPassword, newPassword } = body;
    
    // Si l'utilisateur veut changer son mot de passe
    if (currentPassword && newPassword) {
      // Récupérer l'utilisateur avec son mot de passe
      const currentUser = await prisma.user.findUnique({
        where: { id: user!.userId },
      });

      if (!currentUser) {
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        );
      }

      // Vérifier l'ancien mot de passe
      const isPasswordValid = await verifyPassword(currentPassword, currentUser.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Mot de passe actuel incorrect' },
          { status: 400 }
        );
      }

      // Hasher le nouveau mot de passe
      const hashedPassword = await hashPassword(newPassword);

      // Mettre à jour le mot de passe
      await prisma.user.update({
        where: { id: user!.userId },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        success: true,
        message: 'Mot de passe mis à jour avec succès',
      });
    }
    
    // Mettre à jour le profil normal
    const updatedUser = await prisma.user.update({
      where: { id: user!.userId },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(location !== undefined && { location }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
      },
      include: {
        studentProfile: true,
        companyProfile: true,
      },
    });
    
    return NextResponse.json({
      success: true,
      user: sanitizeUser(updatedUser),
      message: 'Profil mis à jour avec succès',
    });
  } catch (error) {
    console.error('Erreur PUT /api/users/me:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
}
