from dotenv import load_dotenv
import os

load_dotenv()

print("="*60)
print("📧 DIAGNOSTIC CONFIGURATION EMAIL")
print("="*60)

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_FROM = os.getenv('EMAIL_FROM')

print(f"\n✅ EMAIL_HOST: {EMAIL_HOST}")
print(f"✅ EMAIL_PORT: {EMAIL_PORT}")
print(f"✅ EMAIL_USER: {EMAIL_USER}")
print(f"✅ EMAIL_PASSWORD: {'*' * 30 if EMAIL_PASSWORD else 'NOT SET'}")
print(f"✅ EMAIL_FROM: {EMAIL_FROM}")

if EMAIL_HOST and EMAIL_USER and EMAIL_PASSWORD:
    print("\n✅ Configuration complète - Email devrait fonctionner!")
    print("\n🧪 Test d'envoi d'email...")
    
    try:
        from utils import send_2fa_email
        
        # Envoyer un email de test
        test_email = EMAIL_USER  # Envoyer à vous-même
        test_name = "Test Forstek"
        test_code = "123456"
        
        print(f"📤 Envoi à: {test_email}")
        send_2fa_email(test_email, test_name, f"Votre code : {test_code}")
        print("\n✅ Email envoyé avec succès!")
        print(f"📬 Vérifiez votre boîte mail: {test_email}")
        print("⚠️ N'oubliez pas de vérifier le dossier SPAM!")
        
    except Exception as e:
        print(f"\n❌ ERREUR lors de l'envoi: {e}")
        print("\n🔍 Détails de l'erreur:")
        import traceback
        traceback.print_exc()
else:
    print("\n❌ Configuration incomplète!")
    print("⚠️ Vérifiez le fichier .env")

print("\n" + "="*60)
