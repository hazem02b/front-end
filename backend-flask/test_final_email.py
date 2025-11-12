import requests
import json

print("\n" + "="*60)
print("🧪 TEST ENVOI EMAIL 2FA - FINAL")
print("="*60)

# D'abord, réinitialiser le mot de passe de l'utilisateur
print("\n[1/3] Réinitialisation du mot de passe...")

try:
    from models import db, User
    from app import app
    from utils import hash_password
    
    with app.app_context():
        user = User.query.filter_by(email='hazem.bellili@supcom.tn').first()
        if user:
            user.password = hash_password('Forstek2024!')
            db.session.commit()
            print("   ✅ Mot de passe réinitialisé: Forstek2024!")
        else:
            print("   ❌ Utilisateur non trouvé")
            exit(1)
except Exception as e:
    print(f"   ❌ Erreur: {e}")
    exit(1)

# Tester la connexion
print("\n[2/3] Test de connexion avec envoi du code 2FA...")

url = "http://127.0.0.1:5000/api/login"
headers = {"Content-Type": "application/json"}
data = {
    "email": "hazem.bellili@supcom.tn",
    "password": "Forstek2024!"
}

try:
    response = requests.post(url, json=data, headers=headers, timeout=10)
    
    print(f"   Status: {response.status_code}")
    print(f"   Réponse: {response.json()}")
    
    if response.status_code == 200:
        print("\n[3/3] ✅ SUCCESS!")
        print("\n" + "="*60)
        print("📧 LE CODE 2FA A ÉTÉ ENVOYÉ !")
        print("="*60)
        print("\n🔍 VÉRIFICATIONS:")
        print("   1. ✅ Regardez la console Flask")
        print("      → Vous devriez voir: '✅ Email envoyé à hazem.bellili@supcom.tn'")
        print("\n   2. 📬 Vérifiez votre boîte mail: hazem.bellili@supcom.tn")
        print("      → Cherchez un email de: 'Forstek <noreply@forstek.tn>'")
        print("\n   3. ⚠️  N'oubliez pas de vérifier le dossier SPAM!")
        print("\n" + "="*60)
    else:
        print(f"\n❌ Échec: {response.json()}")
        
except requests.exceptions.Timeout:
    print("   ❌ Timeout - Flask ne répond pas")
except requests.exceptions.ConnectionError:
    print("   ❌ Impossible de se connecter à Flask")
except Exception as e:
    print(f"   ❌ Erreur: {e}")

print()
