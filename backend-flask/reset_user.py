from models import db, User
from app import app

app.app_context().push()

# Email à supprimer
email = 'hazembellili80@gmail.com'

# Trouver et supprimer l'utilisateur
user = User.query.filter_by(email=email).first()

if user:
    print(f"🔍 Utilisateur trouvé: {user.email} ({user.name})")
    db.session.delete(user)
    db.session.commit()
    print(f"✅ Utilisateur {email} supprimé avec succès!")
    print("\n📝 Vous pouvez maintenant vous réinscrire sur:")
    print("   http://localhost:3000/register")
    print("\n💡 Utilisez un mot de passe que vous allez retenir, par exemple:")
    print("   - Forstek2024!")
    print("   - Hazem123!")
    print("   - Test123!")
else:
    print(f"❌ Aucun utilisateur trouvé avec l'email: {email}")

print("\n📊 Utilisateurs restants:")
users = User.query.all()
for u in users:
    print(f"  - {u.email} ({u.name})")
