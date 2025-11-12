import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

export interface JWTPayload {
  userId: string;
  email: string;
  type: string;
}

// Hasher le mot de passe
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Vérifier le mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Générer un access token
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

// Générer un refresh token
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// Vérifier un access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Vérifier un refresh token
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Générer un code 2FA à 6 chiffres
export function generate2FACode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Calculer l'expiration du code 2FA (10 minutes)
export function get2FAExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000);
}

// Extraire le user sans le mot de passe
export function sanitizeUser(user: User) {
  const { password, twoFactorCode, ...sanitized } = user;
  return sanitized;
}
