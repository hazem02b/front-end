"""
Script de démarrage Flask avec rechargement forcé de la config email
"""
import os
import sys

# S'assurer qu'on est dans le bon dossier
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Forcer le rechargement du .env
from dotenv import load_dotenv
load_dotenv(override=True)

# Vérifier la configuration email AVANT de démarrer Flask
print("\n" + "="*60)
print("🔍 VÉRIFICATION DE LA CONFIGURATION EMAIL")
print("="*60)

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

print(f"\n📧 EMAIL_HOST: {EMAIL_HOST or '❌ NON DÉFINI'}")
print(f"📧 EMAIL_PORT: {EMAIL_PORT or '❌ NON DÉFINI'}")
print(f"📧 EMAIL_USER: {EMAIL_USER or '❌ NON DÉFINI'}")
print(f"📧 EMAIL_PASSWORD: {'✅ DÉFINI' if EMAIL_PASSWORD else '❌ NON DÉFINI'}")

if not EMAIL_HOST or not EMAIL_USER or not EMAIL_PASSWORD:
    print("\n❌ ERREUR: Configuration email incomplète!")
    print("⚠️  Les codes 2FA seront affichés dans la console")
    print("="*60 + "\n")
else:
    print("\n✅ Configuration email COMPLÈTE")
    print("📧 Les emails 2FA seront envoyés via Brevo")
    print("="*60 + "\n")

# Maintenant importer et démarrer Flask
from app import app

if __name__ == '__main__':
    host = os.getenv('APP_HOST', '127.0.0.1')
    port = int(os.getenv('APP_PORT', '5000'))
    
    print(f"🚀 Démarrage de Flask sur http://{host}:{port}")
    print("="*60 + "\n")
    
    app.run(
        host=host,
        port=port,
        debug=True
    )
