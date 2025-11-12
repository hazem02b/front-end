'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testRegister = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test${Date.now()}@forstek.tn`,
          password: 'Forstek2024!',
          name: 'Test Utilisateur',
          type: 'STUDENT',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Erreur lors de l\'inscription');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@forstek.tn',
          password: 'Forstek2024!',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Erreur lors de la connexion');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🧪 Test Backend API</h1>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Tests disponibles</h2>
          
          <div className="space-y-4">
            <button
              onClick={testRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {loading ? 'Chargement...' : '1️⃣ Test Inscription (Register)'}
            </button>
            
            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {loading ? 'Chargement...' : '2️⃣ Test Connexion (Login)'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-xl rounded-3xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-300 mb-2">❌ Erreur</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-500/20 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="text-xl font-bold text-green-300 mb-4">✅ Succès</h3>
            <pre className="bg-black/30 p-4 rounded-xl overflow-x-auto text-green-200 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
