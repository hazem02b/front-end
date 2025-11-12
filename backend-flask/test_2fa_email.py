import requests
import json

print("="*60)
print("🧪 TEST D'ENVOI EMAIL 2FA")
print("="*60)

# Configuration
email = "hazem.bellili@supcom.tn"
password = "Forstek2024!"  # Mot de passe par défaut des tests

print(f"\n📧 Test avec: {email}")
print(f"🔐 Mot de passe: {password}")

# Test de login
url = "http://127.0.0.1:5000/api/login"
headers = {
    "Content-Type": "application/json",
    "Origin": "http://localhost:3000"
}
data = {
    "email": email,
    "password": password
}

print(f"\n📤 Envoi de la requête de login...")

try:
    response = requests.post(url, json=data, headers=headers)
    
    print(f"\n📊 Status Code: {response.status_code}")
    print(f"📋 Réponse: {response.json()}")
    
    if response.status_code == 200:
        print("\n✅ SUCCESS! Le code 2FA devrait être envoyé!")
        print(f"📬 Vérifiez votre boîte mail: {email}")
        print("⚠️  N'oubliez pas de vérifier le dossier SPAM!")
        print("\n💡 Regardez aussi la console Flask pour voir:")
        print("   '✅ Email envoyé à hazem.bellili@supcom.tn avec le code XXXXXX'")
    else:
        print("\n❌ ERREUR!")
        if "Invalid credentials" in str(response.json()):
            print(f"⚠️  Le mot de passe '{password}' est incorrect.")
            print("\n🔧 Solution: Réinitialisez le mot de passe de cet utilisateur:")
            print("   1. Exécutez: .\\venv\\Scripts\\python.exe reset_user.py")
            print("   2. Réinscrivez-vous sur http://localhost:3000/register")
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERREUR: Impossible de se connecter à Flask!")
    print("⚠️  Vérifiez que Flask est en cours d'exécution sur le port 5000")
    print("   Commande: .\\venv\\Scripts\\python.exe app.py")
except Exception as e:
    print(f"\n❌ ERREUR: {e}")

print("\n" + "="*60)
