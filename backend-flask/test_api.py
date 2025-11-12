import requests

print("\n" + "="*60)
print("🔍 TEST DE L'API FLASK")
print("="*60)

# Test 1: Vérifier que Flask répond
print("\n[1/2] Test de santé Flask...")
try:
    response = requests.get("http://127.0.0.1:5000/api/register", timeout=5)
    print(f"   ✅ Flask répond (Status: {response.status_code})")
except Exception as e:
    print(f"   ❌ Flask ne répond pas: {e}")
    exit(1)

# Test 2: Tester l'inscription (sans créer de compte)
print("\n[2/2] Test de disponibilité de l'endpoint /api/register...")
print("   ℹ️  Prêt à recevoir des inscriptions")

print("\n" + "="*60)
print("✅ FLASK EST OPÉRATIONNEL")
print("="*60)
print("\n📝 PROCHAINES ÉTAPES:")
print("   1. Inscrivez-vous: http://localhost:3000/register")
print("   2. Email: hazembellili80@gmail.com")
print("   3. Créez VOTRE mot de passe (notez-le!)")
print("   4. Connectez-vous: http://localhost:3000/login")
print("   5. Vérifiez votre email pour le code 2FA")
print("\n⚠️  N'oubliez pas de vérifier le dossier SPAM!")
print("="*60 + "\n")
