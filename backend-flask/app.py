"""
TUNILINK - Backend Flask API
Backend complet avec authentification 2FA, gestion profil et upload CV
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
import time

# Charger les variables d'environnement
load_dotenv(override=True)

# Imports des models et utils
from models import db, User, StudentProfile, CompanyProfile
from utils import (
    hash_password, verify_password, 
    create_access_token, create_refresh_token,
    send_2fa_email, generate_2fa_code, verify_jwt
)

# ============================================================================
# CONFIGURATION FLASK
# ============================================================================

app = Flask(__name__)

# CORS - Configuration permissive pour développement
CORS(app, 
     origins=["http://localhost:3000", "http://127.0.0.1:3000"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Base de données SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tunilink.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max

# Dossier pour les CV
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads', 'cvs')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialiser la base de données
db.init_app(app)

with app.app_context():
    db.create_all()
    print("✅ Base de données créée/vérifiée")


# ============================================================================
# MIDDLEWARE
# ============================================================================

@app.before_request
def log_request():
    """Logger les requêtes pour debug"""
    print(f"📥 {request.method} {request.path}")


# ============================================================================
# HELPER: VÉRIFICATION AUTHENTIFICATION
# ============================================================================

def get_current_user():
    """
    Récupère l'utilisateur à partir du token Bearer
    Retourne (user, None) si OK, (None, error_response) si erreur
    """
    auth_header = request.headers.get('Authorization', '')
    
    if not auth_header.startswith('Bearer '):
        return None, (jsonify({'error': 'No token provided'}), 401)
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload:
        return None, (jsonify({'error': 'Invalid or expired token'}), 401)
    
    user = User.query.get(payload.get('user_id'))
    
    if not user:
        return None, (jsonify({'error': 'User not found'}), 404)
    
    return user, None


# ============================================================================
# ROUTES: AUTHENTIFICATION
# ============================================================================

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    """Inscription d'un nouvel utilisateur"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        name = data.get('name', '').strip()
        user_type = data.get('type', 'STUDENT').upper()
        
        # Validation
        if not email or not password or not name:
            return jsonify({'error': 'Email, password and name are required'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        # Vérifier si l'utilisateur existe déjà
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Créer l'utilisateur
        new_user = User(
            email=email,
            password=hash_password(password),
            name=name,
            type=user_type
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        # Créer le profil
        if user_type == 'STUDENT':
            profile = StudentProfile(user_id=new_user.id)
        else:
            profile = CompanyProfile(user_id=new_user.id)
        
        db.session.add(profile)
        db.session.commit()
        
        print(f"✅ Inscription réussie: {email}")
        
        # Envoyer email de bienvenue (optionnel)
        try:
            send_2fa_email(email, name, 'Bienvenue sur Tunilink !')
        except Exception as e:
            print(f"⚠️  Email non envoyé: {e}")
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully'
        }), 201
        
    except Exception as e:
        print(f"❌ Erreur inscription: {e}")
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500


@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    """Connexion - génère un code 2FA"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        # Trouver l'utilisateur
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Vérifier le mot de passe
        if not verify_password(password, user.password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Générer code 2FA
        code = generate_2fa_code()
        user.two_fa_code = code
        db.session.commit()
        
        print(f"✅ Login: {email}")
        print(f"🔐 Code 2FA: {code}")
        
        # Envoyer par email
        try:
            send_2fa_email(user.email, user.name, f'Votre code : {code}')
        except Exception as e:
            print(f"⚠️  Email non envoyé: {e}")
        
        return jsonify({
            'success': True,
            'message': 'Code 2FA sent'
        }), 200
        
    except Exception as e:
        print(f"❌ Erreur login: {e}")
        return jsonify({'error': 'Login failed'}), 500


@app.route('/api/verify-2fa', methods=['POST', 'OPTIONS'])
def verify_2fa():
    """Vérifier le code 2FA et générer les tokens"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        code = data.get('code', '').strip()
        
        # Trouver l'utilisateur
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Vérifier le code
        if user.two_fa_code != code:
            return jsonify({'error': 'Invalid code'}), 400
        
        # Générer les tokens JWT
        access_token = create_access_token({
            'user_id': user.id,
            'email': user.email
        })
        
        refresh_token = create_refresh_token({
            'user_id': user.id,
            'email': user.email
        })
        
        print(f"✅ 2FA validé: {email}")
        
        # Préparer la réponse
        response = jsonify({
            'success': True,
            'accessToken': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'phone': user.phone,
                'type': user.type,
                'cv': user.cv
            }
        })
        
        # Ajouter le refresh token en cookie httpOnly
        response.set_cookie(
            'refreshToken',
            refresh_token,
            httponly=True,
            secure=False,  # True en production avec HTTPS
            samesite='Lax'
        )
        
        return response, 200
        
    except Exception as e:
        print(f"❌ Erreur 2FA: {e}")
        return jsonify({'error': '2FA verification failed'}), 500


@app.route('/api/resend-2fa', methods=['POST', 'OPTIONS'])
def resend_2fa():
    """Renvoyer un code 2FA"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Générer nouveau code
        code = generate_2fa_code()
        user.two_fa_code = code
        db.session.commit()
        
        print(f"🔄 Renvoi 2FA: {email}")
        print(f"🔐 Code 2FA: {code}")
        
        # Envoyer par email
        try:
            send_2fa_email(user.email, user.name, f'Votre code : {code}')
        except Exception as e:
            print(f"⚠️  Email non envoyé: {e}")
        
        return jsonify({
            'success': True,
            'message': 'New code sent'
        }), 200
        
    except Exception as e:
        print(f"❌ Erreur resend 2FA: {e}")
        return jsonify({'error': 'Resend failed'}), 500


# ============================================================================
# ROUTES: PROFIL UTILISATEUR
# ============================================================================

@app.route('/api/users/me', methods=['GET', 'PUT', 'OPTIONS'])
def users_me():
    """Récupérer ou modifier le profil de l'utilisateur connecté"""
    if request.method == 'OPTIONS':
        return '', 200
    
    # Vérifier l'authentification
    user, error = get_current_user()
    if error:
        return error
    
    # GET - Récupérer le profil
    if request.method == 'GET':
        profile_data = {}
        
        # Si c'est un étudiant, récupérer le profil étudiant
        if user.type in ['STUDENT', 'student']:
            student_profile = StudentProfile.query.filter_by(user_id=user.id).first()
            if student_profile:
                profile_data = {
                    'bio': student_profile.bio,
                    'location': student_profile.location,
                    'university': student_profile.university,
                    'degree': student_profile.degree,
                    'graduation_year': student_profile.graduation_year,
                    'linkedin': student_profile.linkedin,
                    'github': student_profile.github,
                    'website': student_profile.website,
                    'skills': student_profile.skills
                }
        
        return jsonify({
            'success': True,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'phone': user.phone,
                'type': user.type,
                'cv': user.cv,
                **profile_data
            }
        }), 200
    
    # PUT - Mettre à jour le profil
    try:
        data = request.json
        
        # Mise à jour du nom
        if 'name' in data and data['name'].strip():
            user.name = data['name'].strip()
        
        # Mise à jour du téléphone
        if 'phone' in data:
            user.phone = data['phone'].strip() if data['phone'] else None
        
        # Si c'est un étudiant, mettre à jour le profil étudiant
        if user.type in ['STUDENT', 'student']:
            student_profile = StudentProfile.query.filter_by(user_id=user.id).first()
            
            # Créer le profil s'il n'existe pas
            if not student_profile:
                student_profile = StudentProfile(user_id=user.id)
                db.session.add(student_profile)
            
            # Mettre à jour les champs du profil
            if 'bio' in data:
                student_profile.bio = data['bio'].strip() if data['bio'] else None
            if 'location' in data:
                student_profile.location = data['location'].strip() if data['location'] else None
            if 'university' in data:
                student_profile.university = data['university'].strip() if data['university'] else None
            if 'degree' in data:
                student_profile.degree = data['degree'].strip() if data['degree'] else None
            if 'graduation_year' in data:
                student_profile.graduation_year = data['graduation_year'].strip() if data['graduation_year'] else None
            if 'linkedin' in data:
                student_profile.linkedin = data['linkedin'].strip() if data['linkedin'] else None
            if 'github' in data:
                student_profile.github = data['github'].strip() if data['github'] else None
            if 'website' in data:
                student_profile.website = data['website'].strip() if data['website'] else None
        
        # Changement de mot de passe
        if 'currentPassword' in data and 'newPassword' in data:
            if not verify_password(data['currentPassword'], user.password):
                return jsonify({'error': 'Current password is incorrect'}), 400
            
            if len(data['newPassword']) < 6:
                return jsonify({'error': 'New password must be at least 6 characters'}), 400
            
            user.password = hash_password(data['newPassword'])
        
        db.session.commit()
        
        print(f"✅ Profil mis à jour: {user.email}")
        
        # Récupérer les données du profil pour la réponse
        profile_data = {}
        if user.type in ['STUDENT', 'student']:
            student_profile = StudentProfile.query.filter_by(user_id=user.id).first()
            if student_profile:
                profile_data = {
                    'bio': student_profile.bio,
                    'location': student_profile.location,
                    'university': student_profile.university,
                    'degree': student_profile.degree,
                    'graduation_year': student_profile.graduation_year,
                    'linkedin': student_profile.linkedin,
                    'github': student_profile.github,
                    'website': student_profile.website,
                }
        
        return jsonify({
            'success': True,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'phone': user.phone,
                'type': user.type,
                'cv': user.cv,
                **profile_data
            }
        }), 200
        
    except Exception as e:
        print(f"❌ Erreur mise à jour profil: {e}")
        db.session.rollback()
        return jsonify({'error': 'Update failed'}), 500


# ============================================================================
# ROUTES: UPLOAD CV
# ============================================================================

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload():
    """Upload d'un CV"""
    if request.method == 'OPTIONS':
        return '', 200
    
    # Vérifier l'authentification
    user, error = get_current_user()
    if error:
        return error
    
    try:
        # Vérifier qu'un fichier est présent
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Vérifier le type de fichier
        allowed_types = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        
        if file.content_type not in allowed_types:
            return jsonify({'error': 'Invalid file type. Only PDF, DOC, DOCX allowed'}), 400
        
        # Vérifier la taille (max 5MB)
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > 5 * 1024 * 1024:
            return jsonify({'error': 'File too large (max 5MB)'}), 400
        
        # Générer un nom de fichier sécurisé
        timestamp = int(time.time())
        original_filename = file.filename.replace(' ', '_')
        filename = f"cv_{user.id}_{timestamp}_{original_filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        
        # Sauvegarder le fichier
        file.save(filepath)
        
        # Mettre à jour la BDD
        user.cv = filename
        db.session.commit()
        
        print(f"✅ CV uploadé: {user.email} -> {filename}")
        
        return jsonify({
            'success': True,
            'fileName': original_filename,
            'fileUrl': f'/uploads/cvs/{filename}'
        }), 200
        
    except Exception as e:
        print(f"❌ Erreur upload: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Upload failed'}), 500


@app.route('/uploads/cvs/<path:filename>')
def serve_cv(filename):
    """Servir un fichier CV uploadé"""
    return send_from_directory(UPLOAD_FOLDER, filename)


# ============================================================================
# ROUTES: HEALTH CHECK
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health():
    """Route pour vérifier que l'API est en ligne"""
    return jsonify({
        'status': 'ok',
        'message': 'Tunilink API is running',
        'version': '2.0'
    }), 200


@app.route('/', methods=['GET'])
def root():
    """Page d'accueil de l'API"""
    return jsonify({
        'message': 'Tunilink Backend API',
        'endpoints': {
            'register': 'POST /api/register',
            'login': 'POST /api/login',
            'verify2FA': 'POST /api/verify-2fa',
            'resend2FA': 'POST /api/resend-2fa',
            'profile': 'GET/PUT /api/users/me',
            'upload': 'POST /api/upload',
            'health': 'GET /api/health'
        }
    }), 200


# ============================================================================
# DÉMARRAGE
# ============================================================================

if __name__ == '__main__':
    print("\n" + "="*70)
    print("  🚀 TUNILINK - BACKEND API")
    print("="*70)
    print(f"  📡 Serveur:          http://0.0.0.0:5000")
    print(f"  🌐 Frontend:         http://localhost:3000")
    print(f"  💾 Base de données:  tunilink.db")
    print(f"  📁 Upload folder:    {UPLOAD_FOLDER}")
    print("="*70)
    print("  🔐 Pour tester: créez un compte via le frontend")
    print("  📧 Le code 2FA s'affichera dans cette console")
    print("="*70 + "\n")
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=False,
        use_reloader=False
    )
