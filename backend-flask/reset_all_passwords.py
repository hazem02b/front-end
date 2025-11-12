from models import db, User
from app import app
from utils import hash_password, verify_password

app.app_context().push()

print("="*60)
print("👥 LISTE DES UTILISATEURS ET RESET DES MOTS DE PASSE")
print("="*60)

users = User.query.all()

print(f"\n📊 Total: {len(users)} utilisateurs\n")

# Nouveau mot de passe pour tous
new_password = "Forstek2024!"

for user in users:
    print(f"👤 {user.email}")
    print(f"   Nom: {user.name}")
    print(f"   Type: {user.type}")
    
    # Réinitialiser le mot de passe
    user.password = hash_password(new_password)
    print(f"   🔐 Mot de passe réinitialisé: {new_password}")
    print()

# Sauvegarder tous les changements
db.session.commit()

print("="*60)
print("✅ TOUS LES MOTS DE PASSE ONT ÉTÉ RÉINITIALISÉS")
print("="*60)
print(f"\n🔑 Mot de passe universel: {new_password}")
print("\n📝 Vous pouvez maintenant vous connecter avec:")
print("   - Email: n'importe quel email de la liste ci-dessus")
print(f"   - Mot de passe: {new_password}")
print("\n🌐 Page de connexion: http://localhost:3000/login")
print("="*60)
