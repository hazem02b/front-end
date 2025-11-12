"""
Script pour tester la connexion complète et l'accès aux paramètres
"""
import requests
import json

BASE_URL = "http://127.0.0.1:5000"

print("\n" + "="*70)
print("🧪 TEST COMPLET - INSCRIPTION → CONNEXION → PARAMÈTRES")
print("="*70)

# Étape 1: Inscription
print("\n[1/4] Test d'inscription...")
register_data = {
    "email": "test.forstek@gmail.com",
    "password": "Test123!",
    "name": "Test User",
    "type": "STUDENT"
}

try:
    response = requests.post(f"{BASE_URL}/api/register", json=register_data)
    if response.status_code == 200:
        print("   ✅ Inscription réussie")
    elif response.status_code == 400 and "already exists" in response.text.lower():
        print("   ℹ️  Utilisateur existe déjà (c'est OK)")
    else:
        print(f"   ⚠️  Status: {response.status_code}")
        print(f"   Réponse: {response.json()}")
except Exception as e:
    print(f"   ❌ Erreur: {e}")
    exit(1)

# Étape 2: Connexion
print("\n[2/4] Test de connexion...")
login_data = {
    "email": "test.forstek@gmail.com",
    "password": "Test123!"
}

try:
    response = requests.post(f"{BASE_URL}/api/login", json=login_data)
    if response.status_code == 200:
        print("   ✅ Connexion réussie")
        print("   ⚠️  Regardez la console Flask pour le code 2FA")
    else:
        print(f"   ❌ Status: {response.status_code}")
        print(f"   Réponse: {response.json()}")
        exit(1)
except Exception as e:
    print(f"   ❌ Erreur: {e}")
    exit(1)

# Étape 3: Demander le code 2FA à l'utilisateur
print("\n[3/4] Vérification 2FA...")
print("   👀 Regardez la console Flask")
code_2fa = input("   🔐 Entrez le code 2FA affiché dans la console: ")

# Vérifier le code 2FA
verify_data = {
    "email": "test.forstek@gmail.com",
    "code": code_2fa
}

try:
    response = requests.post(f"{BASE_URL}/api/verify-2fa", json=verify_data)
    if response.status_code == 200:
        data = response.json()
        access_token = data.get('accessToken')
        print("   ✅ Code 2FA vérifié")
        print(f"   🎫 Token obtenu: {access_token[:30]}...")
    else:
        print(f"   ❌ Status: {response.status_code}")
        print(f"   Réponse: {response.json()}")
        exit(1)
except Exception as e:
    print(f"   ❌ Erreur: {e}")
    exit(1)

# Étape 4: Tester l'accès aux paramètres
print("\n[4/4] Test de l'endpoint /api/users/me (Paramètres)...")
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

try:
    response = requests.get(f"{BASE_URL}/api/users/me", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print("   ✅ Accès aux paramètres réussi")
        print(f"   👤 Utilisateur: {data.get('user', {}).get('name')}")
        print(f"   📧 Email: {data.get('user', {}).get('email')}")
    else:
        print(f"   ❌ Status: {response.status_code}")
        print(f"   Réponse: {response.json()}")
        exit(1)
except Exception as e:
    print(f"   ❌ Erreur: {e}")
    exit(1)

print("\n" + "="*70)
print("✅ TOUS LES TESTS RÉUSSIS !")
print("="*70)
print("\n💡 L'API fonctionne correctement.")
print("📝 Si vous avez une erreur dans le navigateur:")
print("   1. Assurez-vous d'être connecté")
print("   2. Vérifiez la console du navigateur (F12)")
print("   3. Vérifiez que le token est bien stocké dans localStorage")
print("="*70 + "\n")
