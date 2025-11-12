import os
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage

load_dotenv(override=True)

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = int(os.getenv('EMAIL_PORT') or 587)
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_FROM = os.getenv('EMAIL_FROM')

print("\n" + "="*60)
print("🧪 TEST DE LA NOUVELLE CLÉ BREVO")
print("="*60)
print(f"\nEmail: {EMAIL_USER}")
print(f"SMTP: {EMAIL_HOST}:{EMAIL_PORT}")
print(f"Clé: {EMAIL_PASSWORD[:30]}...{EMAIL_PASSWORD[-10:]}")

try:
    print("\n📤 Envoi d'un email de test...")
    
    msg = EmailMessage()
    msg['Subject'] = '🎉 Test Forstek - Nouvelle clé'
    msg['From'] = EMAIL_FROM or EMAIL_USER
    msg['To'] = EMAIL_USER
    msg.set_content('Félicitations ! La nouvelle clé SMTP fonctionne parfaitement.')
    msg.add_alternative("""
    <html>
    <body style="font-family: Arial; padding: 20px;">
        <h2 style="color: #2563EB;">🎉 Succès !</h2>
        <p>Votre nouvelle clé SMTP Brevo fonctionne parfaitement.</p>
        <p>Les emails 2FA seront maintenant envoyés automatiquement.</p>
    </body>
    </html>
    """, subtype='html')
    
    with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
        smtp.starttls()
        smtp.login(EMAIL_USER, EMAIL_PASSWORD)
        smtp.send_message(msg)
    
    print("\n" + "="*60)
    print("✅ EMAIL ENVOYÉ AVEC SUCCÈS !")
    print("="*60)
    print(f"\n📬 Vérifiez votre boîte: {EMAIL_USER}")
    print("⚠️  Vérifiez aussi le dossier SPAM !")
    print("\n🎉 La configuration email fonctionne maintenant !")
    print("="*60 + "\n")
    
except Exception as e:
    print(f"\n❌ ERREUR: {e}")
    print("\n🔍 Vérifiez que la clé est correcte dans Brevo")
    print("="*60 + "\n")
