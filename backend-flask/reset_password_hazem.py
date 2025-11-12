from models import db, User
from app import app
from utils import hash_password

app.app_context().push()

# Utilisateur à réinitialiser
email = 'hazem.bellili@supcom.tn'
new_password = 'Forstek2024!'

user = User.query.filter_by(email=email).first()

if user:
    print(f"👤 Utilisateur trouvé: {user.email} ({user.name})")
    print(f"🔐 Réinitialisation du mot de passe...")
    
    # Changer le mot de passe
    user.password = hash_password(new_password)
    db.session.commit()
    
    print(f"✅ Mot de passe réinitialisé avec succès!")
    print(f"\n📝 Nouvelles identifiants:")
    print(f"   Email: {email}")
    print(f"   Mot de passe: {new_password}")
    print(f"\n🌐 Connectez-vous sur: http://localhost:3000/login")
else:
    print(f"❌ Utilisateur {email} non trouvé!")
