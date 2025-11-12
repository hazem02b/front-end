#!/usr/bin/env python3
"""
Vérifier les utilisateurs dans la base de données
"""
from app import app, db, User
import sys

with app.app_context():
    users = User.query.all()
    
    print("=" * 60)
    print("📋 UTILISATEURS DANS LA BASE DE DONNÉES")
    print("=" * 60)
    
    if not users:
        print("\n❌ Aucun utilisateur trouvé !")
        print("\n💡 Vous devez d'abord créer un compte sur le site :")
        print("   1. Allez sur http://localhost:3000")
        print("   2. Cliquez sur 'S'inscrire'")
        print("   3. Créez un compte")
        sys.exit(0)
    
    print(f"\n✅ {len(users)} utilisateur(s) trouvé(s) :\n")
    
    for i, user in enumerate(users, 1):
        print(f"{i}. Email: {user.email}")
        print(f"   Nom: {user.name}")
        print(f"   Type: {user.type}")
        print(f"   Téléphone: {user.phone or 'Non renseigné'}")
        print(f"   ID: {user.id}")
        print()
    
    print("=" * 60)
    print("💡 Utilisez un de ces emails pour vous connecter")
    print("=" * 60)
