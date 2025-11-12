"""
Script de diagnostic pour vérifier que Flask charge bien la config email
"""
import sys
import os

# Ajouter le dossier au path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

# Charger explicitement le .env
load_dotenv(override=True)

print("="*60)
print("🔍 DIAGNOSTIC CONFIGURATION EMAIL")
print("="*60)

# Vérifier les variables d'environnement
EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_FROM = os.getenv('EMAIL_FROM')

print(f"\n📧 Configuration Email:")
print(f"   EMAIL_HOST: {EMAIL_HOST or '❌ NON DÉFINI'}")
print(f"   EMAIL_PORT: {EMAIL_PORT or '❌ NON DÉFINI'}")
print(f"   EMAIL_USER: {EMAIL_USER or '❌ NON DÉFINI'}")
print(f"   EMAIL_PASSWORD: {'✅ DÉFINI (' + str(len(EMAIL_PASSWORD)) + ' chars)' if EMAIL_PASSWORD else '❌ NON DÉFINI'}")
print(f"   EMAIL_FROM: {EMAIL_FROM or '❌ NON DÉFINI'}")

if EMAIL_HOST and EMAIL_USER and EMAIL_PASSWORD:
    print("\n✅ Configuration COMPLÈTE - Les emails devraient être envoyés!")
    
    # Test d'import de la fonction
    try:
        from utils import send_2fa_email, EMAIL_USER as UTILS_EMAIL_USER
        print(f"\n🔧 Vérification de utils.py:")
        print(f"   EMAIL_USER dans utils.py: {UTILS_EMAIL_USER or '❌ NON CHARGÉ'}")
        
        if UTILS_EMAIL_USER:
            print("\n✅ utils.py a bien chargé la configuration!")
        else:
            print("\n❌ PROBLÈME: utils.py n'a pas chargé EMAIL_USER")
            print("   Solution: Redémarrez Flask")
    except Exception as e:
        print(f"\n❌ Erreur lors de l'import: {e}")
else:
    print("\n❌ Configuration INCOMPLÈTE!")
    print("\n🔧 Solution:")
    print("   1. Vérifiez le fichier .env")
    print("   2. Assurez-vous qu'il contient:")
    print("      EMAIL_HOST=smtp-relay.brevo.com")
    print("      EMAIL_USER=hazembellili80@gmail.com")
    print("      EMAIL_PASSWORD=xsmtpsib-...")

print("\n" + "="*60)
