#!/usr/bin/env python3
"""
Test rapide avec un utilisateur existant
"""
import requests
import json

API_URL = "http://localhost:5000"

print("=" * 60)
print("🧪 TEST AVEC UN UTILISATEUR EXISTANT")
print("=" * 60)

# On va créer un nouvel utilisateur d'abord
email = "test.auth@forstek.tn"
password = "Test123!"
name = "Test Auth"

print("\n1️⃣ INSCRIPTION")
print("-" * 40)
register_data = {
    "email": email,
    "password": password,
    "name": name,
    "type": "STUDENT"
}

response = requests.post(
    f"{API_URL}/api/register",
    json=register_data,
    headers={"Origin": "http://localhost:3000"}
)

print(f"📥 Status: {response.status_code}")
if response.status_code == 201:
    print("✅ Utilisateur créé")
elif response.status_code == 400:
    print("⚠️  Utilisateur existe déjà - on continue")
else:
    print(f"❌ Erreur: {response.json()}")

# 2. Login
print("\n2️⃣ LOGIN")
print("-" * 40)
login_data = {
    "email": email,
    "password": password
}

response = requests.post(
    f"{API_URL}/api/login",
    json=login_data,
    headers={"Origin": "http://localhost:3000"}
)

print(f"📥 Status: {response.status_code}")
if response.status_code != 200:
    print(f"❌ Login échoué: {response.json()}")
    exit(1)

print("✅ Login réussi - Code 2FA généré")
print("\n⚠️  REGARDEZ LA FENÊTRE CMD FLASK pour voir le code !")

# 3. Demander le code 2FA
code = input("\n🔐 Entrez le code 2FA de la console Flask: ").strip()

print("\n3️⃣ VÉRIFICATION 2FA")
print("-" * 40)
verify_data = {
    "email": email,
    "code": code
}

response = requests.post(
    f"{API_URL}/api/verify-2fa",
    json=verify_data,
    headers={"Origin": "http://localhost:3000"}
)

print(f"📥 Status: {response.status_code}")
if response.status_code != 200:
    print(f"❌ 2FA échoué: {response.json()}")
    exit(1)

data = response.json()
access_token = data.get('accessToken')
print(f"✅ Token reçu: {access_token[:30]}...")

# 4. Tester OPTIONS (preflight)
print("\n4️⃣ TEST OPTIONS (preflight CORS)")
print("-" * 40)

response = requests.options(
    f"{API_URL}/api/users/me",
    headers={
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "authorization"
    }
)

print(f"📥 Status: {response.status_code}")
print(f"📥 Headers CORS:")
print(f"   Access-Control-Allow-Origin: {response.headers.get('Access-Control-Allow-Origin')}")
print(f"   Access-Control-Allow-Methods: {response.headers.get('Access-Control-Allow-Methods')}")
print(f"   Access-Control-Allow-Headers: {response.headers.get('Access-Control-Allow-Headers')}")

if response.status_code == 200:
    print("✅ OPTIONS OK")
else:
    print("❌ OPTIONS échoué - c'est le problème !")

# 5. Tester GET avec token
print("\n5️⃣ TEST GET /api/users/me avec token")
print("-" * 40)

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
    print("\n" + "=" * 60)
    print("🎉 TOUT FONCTIONNE PARFAITEMENT !")
    print("=" * 60)
    print("\n✅ Vous pouvez maintenant:")
    print(f"   1. Vous connecter avec: {email}")
    print(f"   2. Mot de passe: {password}")
    print("   3. Entrer le code 2FA de la console Flask")
    print("   4. Accéder au dashboard")
else:
    print("\n❌ Problème d'accès au profil !")
    print("C'est ici que le site bloque après la 2FA")
