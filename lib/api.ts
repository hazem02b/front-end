// Client API pour communiquer avec le backend
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  getToken(): string | null {
    if (!this.accessToken && typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Une erreur est survenue');
    }

    return data;
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    type: 'STUDENT' | 'COMPANY' | 'MENTOR';
  }) {
    const result = await this.request<{
      success: boolean;
      user: any;
      accessToken: string;
    }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (result.accessToken) {
      this.setToken(result.accessToken);
    }
    
    return result;
  }

  async login(email: string, password: string) {
    return this.request<{
      success: boolean;
      message: string;
      email: string;
      userId: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verify2FA(userId: string, code: string) {
    const result = await this.request<{
      success: boolean;
      user: any;
      accessToken: string;
    }>('/api/auth/verify-2fa', {
      method: 'POST',
      body: JSON.stringify({ userId, code }),
    });
    
    if (result.accessToken) {
      this.setToken(result.accessToken);
    }
    
    return result;
  }

  async resend2FA(email: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>('/api/auth/resend-2fa', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async logout() {
    const result = await this.request<{
      success: boolean;
      message: string;
    }>('/api/auth/logout', {
      method: 'POST',
    });
    
    this.clearToken();
    return result;
  }

  async refreshToken() {
    const result = await this.request<{
      success: boolean;
      accessToken: string;
    }>('/api/auth/refresh', {
      method: 'POST',
    });
    
    if (result.accessToken) {
      this.setToken(result.accessToken);
    }
    
    return result;
  }

  // User endpoints
  async getProfile() {
    return this.request<{
      success: boolean;
      user: any;
    }>('/api/users/me');
  }

  async updateProfile(data: {
    name?: string;
    phone?: string;
    location?: string;
    bio?: string;
    avatar?: string;
  }) {
    return this.request<{
      success: boolean;
      user: any;
      message: string;
    }>('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
