// Configuration de l'API backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/register`,
  login: `${API_BASE_URL}/api/login`,
  verify2FA: `${API_BASE_URL}/api/verify-2fa`,
  resend2FA: `${API_BASE_URL}/api/resend-2fa`,
  logout: `${API_BASE_URL}/api/logout`,
  refresh: `${API_BASE_URL}/api/refresh`,
  usersMe: `${API_BASE_URL}/api/users/me`,
  upload: `${API_BASE_URL}/api/upload`,
};
