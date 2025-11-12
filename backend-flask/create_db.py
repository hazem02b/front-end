"""
Script pour créer/recréer la base de données
"""
from app import app, db
from models import User, StudentProfile, CompanyProfile

print("🔧 Création de la base de données...")

with app.app_context():
    # Supprimer toutes les tables
    db.drop_all()
    print("✅ Anciennes tables supprimées")
    
    # Créer toutes les tables
    db.create_all()
    print("✅ Nouvelles tables créées")
    
    # Vérifier que les tables existent
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    
    print(f"\n📋 Tables créées: {tables}")
    
    # Afficher les colonnes de StudentProfile
    if 'student_profile' in tables:
        columns = [col['name'] for col in inspector.get_columns('student_profile')]
        print(f"\n📝 Colonnes de student_profile:")
        for col in columns:
            print(f"   - {col}")

print("\n✅ Base de données prête!")
