"""Test simple et rapide de l'API"""
import requests
import json

BASE = "http://localhost:5000"

print("\n" + "="*50)
print("TEST RAPIDE DE L'API")
print("="*50)

# Test 1: Le serveur répond-il ?
try:
    r = requests.get(f"{BASE}/api/register", timeout=2)
    print("\n✅ Serveur accessible")
except Exception as e:
    print(f"\n❌ Serveur inaccessible: {e}")
    exit(1)

# Test 2: Créer un compte test
email = "test.quick@test.com"
password = "Test123!"

print(f"\n📝 Création compte: {email}")
data = {"email": email, "password": password, "name": "Test Quick", "type": "STUDENT"}
r = requests.post(f"{BASE}/api/register", json=data)

if r.status_code == 201:
    token = r.json()['accessToken']
    print("✅ Compte créé")
elif "already used" in r.text:
    # Compte existe, on se connecte
    print("ℹ️  Compte existe, login...")
    r = requests.post(f"{BASE}/api/login", json={"email": email, "password": password})
    if r.status_code == 200:
        code = input("📱 Code 2FA (dans console Flask): ")
        r = requests.post(f"{BASE}/api/verify-2fa", json={"email": email, "code": code})
        if r.status_code == 200:
            token = r.json()['accessToken']
            print("✅ Connecté")
        else:
            print("❌ Code invalide")
            exit(1)
else:
    print(f"❌ Erreur: {r.text}")
    exit(1)

# Test 3: Lire le profil
print("\n📖 Lecture profil...")
r = requests.get(f"{BASE}/api/users/me", 
                 headers={"Authorization": f"Bearer {token}"})
print(f"Status: {r.status_code}")
print(f"Données: {json.dumps(r.json(), indent=2)}")

# Test 4: Mettre à jour le téléphone
print("\n📞 Ajout téléphone...")
r = requests.put(f"{BASE}/api/users/me",
                 headers={"Authorization": f"Bearer {token}",
                         "Content-Type": "application/json"},
                 json={"name": "Test Quick", "phone": "+216 98 765 432"})
print(f"Status: {r.status_code}")
print(f"Résultat: {json.dumps(r.json(), indent=2)}")

if r.status_code == 200:
    print("\n" + "="*50)
    print("✅ TOUT FONCTIONNE !")
    print("="*50)
    print("\nL'API backend fonctionne correctement.")
    print("Si l'erreur persiste sur le site, c'est un problème frontend.")
    print("\nToken à utiliser dans le navigateur (F12 console):")
    print(f"localStorage.setItem('accessToken', '{token}')")
else:
    print("\n❌ Échec de la mise à jour")
