"""
Supprimer vos comptes pour vous permettre de créer vos propres mots de passe
"""
from models import db, User
from app import app

app.app_context().push()

print("="*60)
print("🗑️  SUPPRESSION DE VOS COMPTES")
print("="*60)

# Liste de vos emails
your_emails = [
    'hazem.bellili@supcom.tn',
    'hazembellili80@gmail.com'
]

deleted = 0
for email in your_emails:
    user = User.query.filter_by(email=email).first()
    if user:
        print(f"\n❌ Suppression: {email} ({user.name})")
        db.session.delete(user)
        deleted += 1
    else:
        print(f"\n⚠️  Non trouvé: {email}")

if deleted > 0:
    db.session.commit()
    print(f"\n✅ {deleted} compte(s) supprimé(s)")
else:
    print("\n⚠️  Aucun compte à supprimer")

print("\n" + "="*60)
print("📝 VOUS POUVEZ MAINTENANT VOUS RÉINSCRIRE")
print("="*60)
print("\n🌐 Allez sur: http://localhost:3000/register")
print("\n📝 Créez votre compte avec:")
print("   - Email: hazembellili80@gmail.com (ou autre)")
print("   - Nom: Votre nom")
print("   - Mot de passe: LE MOT DE PASSE DE VOTRE CHOIX ✅")
print("   - Type: Étudiant ou Entreprise")
print("\n💡 NOTEZ BIEN votre mot de passe pour ne pas l'oublier!")
print("="*60 + "\n")
