"""
Script pour déboguer pourquoi l'email n'est pas envoyé
"""
import os
from dotenv import load_dotenv

print("\n" + "="*70)
print("🔍 DEBUG - POURQUOI L'EMAIL N'EST PAS ENVOYÉ ?")
print("="*70)

# Test 1: Vérifier si le fichier .env existe
print("\n[1/4] Vérification du fichier .env...")
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    print(f"   ✅ Fichier .env trouvé: {env_path}")
    with open(env_path, 'r', encoding='utf-8') as f:
        content = f.read()
        if 'EMAIL_USER=hazembellili80@gmail.com' in content:
            print("   ✅ EMAIL_USER configuré dans le fichier")
        else:
            print("   ❌ EMAIL_USER NON configuré dans le fichier")
        
        if 'EMAIL_HOST=smtp-relay.brevo.com' in content:
            print("   ✅ EMAIL_HOST configuré dans le fichier")
        else:
            print("   ❌ EMAIL_HOST NON configuré dans le fichier")
else:
    print(f"   ❌ Fichier .env NON TROUVÉ à: {env_path}")

# Test 2: Charger le .env et vérifier les variables
print("\n[2/4] Chargement du .env avec load_dotenv()...")
load_dotenv(override=True)

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_FROM = os.getenv('EMAIL_FROM')

print(f"   EMAIL_HOST = {EMAIL_HOST if EMAIL_HOST else '❌ VIDE'}")
print(f"   EMAIL_PORT = {EMAIL_PORT if EMAIL_PORT else '❌ VIDE'}")
print(f"   EMAIL_USER = {EMAIL_USER if EMAIL_USER else '❌ VIDE'}")
print(f"   EMAIL_PASSWORD = {'✅ DÉFINI (' + str(len(EMAIL_PASSWORD)) + ' chars)' if EMAIL_PASSWORD else '❌ VIDE'}")
print(f"   EMAIL_FROM = {EMAIL_FROM if EMAIL_FROM else '❌ VIDE'}")

# Test 3: Simuler ce que utils.py voit
print("\n[3/4] Simulation de l'import de utils.py...")
if EMAIL_HOST and EMAIL_USER and EMAIL_PASSWORD:
    print("   ✅ utils.py devrait ENVOYER les emails")
else:
    print("   ❌ utils.py va afficher le code dans la CONSOLE")
    print("   Raison: Variables EMAIL manquantes")

# Test 4: Test d'envoi réel
print("\n[4/4] Test d'envoi d'email réel...")
if EMAIL_HOST and EMAIL_USER and EMAIL_PASSWORD:
    try:
        import smtplib
        from email.message import EmailMessage
        
        msg = EmailMessage()
        msg['Subject'] = '🧪 Test Forstek'
        msg['From'] = EMAIL_FROM or EMAIL_USER
        msg['To'] = EMAIL_USER
        msg.set_content('Test de configuration email')
        
        print(f"   📤 Connexion à {EMAIL_HOST}:{EMAIL_PORT}...")
        with smtplib.SMTP(EMAIL_HOST, int(EMAIL_PORT)) as smtp:
            smtp.starttls()
            print(f"   🔐 Authentification avec {EMAIL_USER}...")
            smtp.login(EMAIL_USER, EMAIL_PASSWORD)
            print(f"   📧 Envoi de l'email à {EMAIL_USER}...")
            smtp.send_message(msg)
        
        print("\n" + "="*70)
        print("✅ EMAIL ENVOYÉ AVEC SUCCÈS !")
        print("="*70)
        print(f"\n📬 Vérifiez votre boîte mail: {EMAIL_USER}")
        print("⚠️  N'oubliez pas de vérifier le dossier SPAM!")
        
    except Exception as e:
        print(f"\n❌ ERREUR lors de l'envoi: {e}")
        print("\n🔍 Vérifiez:")
        print("   1. Votre clé SMTP Brevo est correcte")
        print("   2. Votre compte Brevo est actif")
        print("   3. Vous avez bien vérifié votre email Brevo")
else:
    print("   ⚠️  Configuration incomplète - Test d'envoi impossible")

print("\n" + "="*70)
print("📊 DIAGNOSTIC COMPLET")
print("="*70)

if EMAIL_HOST and EMAIL_USER and EMAIL_PASSWORD:
    print("\n✅ Configuration COMPLÈTE")
    print("📧 Flask DEVRAIT envoyer les emails")
    print("\n⚠️  Si Flask affiche toujours 'Mode Développement':")
    print("   → Flask n'a PAS été redémarré après la config")
    print("   → Solution: Fermez la fenêtre Flask et relancez run_flask.py")
else:
    print("\n❌ Configuration INCOMPLÈTE")
    print("📝 Flask affichera les codes dans la console")
    print("\n🔧 Solution:")
    print("   1. Vérifiez le fichier .env")
    print("   2. Assurez-vous que ces lignes existent:")
    print("      EMAIL_HOST=smtp-relay.brevo.com")
    print("      EMAIL_PORT=587")
    print("      EMAIL_USER=hazembellili80@gmail.com")
    print("      EMAIL_PASSWORD=xsmtpsib-...")

print("\n" + "="*70 + "\n")
