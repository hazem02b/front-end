from models import db, User
from app import app
from utils import verify_password

app.app_context().push()

# Trouver l'utilisateur
email = 'hazembellili80@gmail.com'
user = User.query.filter_by(email=email).first()

if not user:
    print(f"❌ Utilisateur {email} n'existe pas!")
else:
    print(f"👤 Utilisateur trouvé: {user.email}")
    print(f"📛 Nom: {user.name}")
    print(f"🔑 Hash password (premiers 30 chars): {user.password[:30]}...")
    print(f"📏 Longueur du hash: {len(user.password)}")
    print("\n🧪 Test de mots de passe courants:\n")
    
    # Liste de mots de passe à tester
    test_passwords = [
        'Test123!',
        'test123',
        'Forstek2024!',
        'hazem123',
        'Hazem123!',
        '123456'
    ]
    
    for pwd in test_passwords:
        try:
            is_valid = verify_password(pwd, user.password)
            status = "✅ VALIDE" if is_valid else "❌ INVALIDE"
            print(f'  "{pwd}": {status}')
        except Exception as e:
            print(f'  "{pwd}": ❌ ERREUR - {e}')
    
    print("\n" + "="*50)
    print("💡 Si aucun mot de passe ne fonctionne, vous devez:")
    print("   1. Supprimer l'utilisateur de la base")
    print("   2. Vous réinscrire avec un nouveau mot de passe")
    print("="*50)
