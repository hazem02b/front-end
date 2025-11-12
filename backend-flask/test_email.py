"""
Script de test pour vérifier la configuration email
Utilisez ce script pour tester l'envoi d'email sans avoir à s'inscrire sur le site
"""

import os
import sys
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Importer les fonctions depuis utils
sys.path.append(os.path.dirname(__file__))
from utils import send_2fa_email

def test_email():
    """Teste l'envoi d'un email 2FA"""
    
    print("\n" + "="*60)
    print("🧪 TEST D'ENVOI EMAIL - FORSTEK")
    print("="*60 + "\n")
    
    # Demander l'email de test
    test_email = input("📧 Entrez votre email pour le test: ").strip()
    
    if not test_email or '@' not in test_email:
        print("❌ Email invalide !")
        return
    
    test_name = input("👤 Entrez votre nom (ou laissez vide): ").strip() or "Utilisateur Test"
    
    print(f"\n📤 Envoi d'un email de test à {test_email}...\n")
    
    try:
        # Envoyer un email de test
        send_2fa_email(test_email, test_name, "Votre code : 123456")
        
        print("\n" + "="*60)
        print("✅ EMAIL ENVOYÉ AVEC SUCCÈS !")
        print("="*60)
        print(f"\n📬 Vérifiez votre boîte mail : {test_email}")
        print("💡 Conseil : Regardez aussi dans les SPAM/Courrier indésirable\n")
        
    except Exception as e:
        print("\n" + "="*60)
        print("❌ ERREUR D'ENVOI")
        print("="*60)
        print(f"\nDétails : {str(e)}\n")
        print("🔧 Solutions possibles :")
        print("   1. Vérifiez le fichier .env")
        print("   2. Vérifiez EMAIL_USER et EMAIL_PASSWORD")
        print("   3. Vérifiez votre connexion internet")
        print("   4. Consultez CONFIGURATION_EMAIL.md pour l'aide\n")

if __name__ == "__main__":
    print("\n🚀 Forstek Backend - Test Email\n")
    
    # Vérifier si l'email est configuré
    email_user = os.getenv('EMAIL_USER')
    email_password = os.getenv('EMAIL_PASSWORD')
    
    if not email_user or not email_password:
        print("⚠️  CONFIGURATION EMAIL MANQUANTE")
        print("\nVous devez d'abord configurer l'email dans le fichier .env")
        print("Consultez : CONFIGURATION_EMAIL.md pour les instructions\n")
        
        response = input("Voulez-vous quand même tester (affichera dans console)? (o/n): ")
        if response.lower() != 'o':
            sys.exit(0)
    else:
        print(f"✅ Configuration détectée: {email_user}")
    
    test_email()
