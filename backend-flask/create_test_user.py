#!/usr/bin/env python3
"""Script pour créer un utilisateur de test"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User, StudentProfile
from utils import hash_password

with app.app_context():
    # Supprimer l'utilisateur s'il existe
    existing = User.query.filter_by(email='test@tunilink.tn').first()
    if existing:
        db.session.delete(existing)
        db.session.commit()
        print("🗑️  Ancien utilisateur supprimé")
    
    # Créer un nouvel utilisateur
    user = User(
        email='test@tunilink.tn',
        password=hash_password('Test123!'),
        name='Utilisateur Test',
        type='STUDENT',
        phone=None
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Créer le profil étudiant
    profile = StudentProfile(user_id=user.id)
    db.session.add(profile)
    db.session.commit()
    
    print("\n" + "="*60)
    print("✅ UTILISATEUR DE TEST CRÉÉ")
    print("="*60)
    print(f"📧 Email: test@tunilink.tn")
    print(f"🔐 Mot de passe: Test123!")
    print(f"👤 Nom: Utilisateur Test")
    print(f"🎓 Type: STUDENT")
    print("="*60 + "\n")
