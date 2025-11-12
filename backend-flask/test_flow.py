#!/usr/bin/env python3
"""
Test complet du flow d'authentification
"""
import requests
import json

API_URL = "http://localhost:5000"

print("=" * 60)
print("🧪 TEST COMPLET DU FLOW D'AUTHENTIFICATION")
print("=" * 60)

# 1. Login
print("\n1️⃣ LOGIN")
print("-" * 40)
login_data = {
    "email": "hazem@forstek.tn",
    "password": "Forstek2024!"
}
print(f"📤 Envoi: {login_data}")

response = requests.post(
    f"{API_URL}/api/login",
    json=login_data,
    headers={"Origin": "http://localhost:3000"}
)

print(f"📥 Status: {response.status_code}")
print(f"📥 Response: {json.dumps(response.json(), indent=2)}")

if response.status_code != 200:
    print("❌ Login échoué")
    exit(1)

print("✅ Login réussi - Code 2FA généré")
print("\n⚠️  REGARDEZ LA CONSOLE FLASK pour voir le code 2FA !")
print("Ou utilisez le code de test: 123456")

# 2. Demander le code 2FA à l'utilisateur
code = input("\n🔐 Entrez le code 2FA: ").strip()

print("\n2️⃣ VÉRIFICATION 2FA")
print("-" * 40)
verify_data = {
    "email": "hazem@forstek.tn",
    "code": code
}
print(f"📤 Envoi: {verify_data}")

response = requests.post(
    f"{API_URL}/api/verify-2fa",
    json=verify_data,
    headers={"Origin": "http://localhost:3000"}
)

print(f"📥 Status: {response.status_code}")
print(f"📥 Response: {json.dumps(response.json(), indent=2)}")

if response.status_code != 200:
    print("❌ Vérification 2FA échouée")
    exit(1)

data = response.json()
access_token = data.get('accessToken')
print(f"✅ 2FA vérifié - Token reçu: {access_token[:20]}...")

# 3. Tester l'accès au profil
print("\n3️⃣ ACCÈS AU PROFIL")
print("-" * 40)
print(f"📤 GET /api/users/me avec token")

response = requests.get(
    f"{API_URL}/api/users/me",
    headers={
        "Authorization": f"Bearer {access_token}",
        "Origin": "http://localhost:3000"
    }
)

print(f"📥 Status: {response.status_code}")
print(f"📥 Response: {json.dumps(response.json(), indent=2)}")

if response.status_code == 200:
    print("✅ Accès au profil OK !")
    print("\n" + "=" * 60)
    print("🎉 TOUS LES TESTS SONT PASSÉS !")
    print("=" * 60)
else:
    print("❌ Erreur d'accès au profil")
    print("\n⚠️  C'EST ICI QUE LE PROBLÈME SE TROUVE !")
    exit(1)
