import os
import jwt
from datetime import datetime, timedelta
import bcrypt
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

# Forcer le rechargement du .env au cas où il a été modifié
load_dotenv(override=True)
JWT_SECRET = os.getenv('JWT_SECRET', 'changeme')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')

ACCESS_EXPIRES_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRES_MINUTES', '15'))
REFRESH_EXPIRES_DAYS = int(os.getenv('REFRESH_TOKEN_EXPIRES_DAYS', '7'))

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = int(os.getenv('EMAIL_PORT') or 587)
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_FROM = os.getenv('EMAIL_FROM')


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    # Encode password to bytes and hash it
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against a bcrypt hash"""
    password_bytes = password.encode('utf-8')
    hashed_bytes = hashed.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)


def create_access_token(payload: dict) -> str:
    exp = datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRES_MINUTES)
    token = jwt.encode({**payload, 'exp': exp}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


def create_refresh_token(payload: dict) -> str:
    exp = datetime.utcnow() + timedelta(days=REFRESH_EXPIRES_DAYS)
    token = jwt.encode({**payload, 'exp': exp}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


def generate_2fa_code() -> str:
    import random
    return f"{random.randint(100000,999999)}"


def send_2fa_email(to_email: str, to_name: str, body: str):
    # Extraire le code du message
    code = body.replace('Votre code : ', '').strip()
    
    # TOUJOURS afficher dans la console en mode développement
    print("\n" + "="*60)
    print("📧 CODE 2FA (MODE DÉVELOPPEMENT)")
    print("="*60)
    print(f"👤 Destinataire: {to_name} ({to_email})")
    print(f"🔐 CODE: {code}")
    print("="*60 + "\n")
    
    if not EMAIL_USER or not EMAIL_PASSWORD:
        # Si la config email n'est pas définie, on s'arrête ici
        return

    # Créer un email HTML professionnel
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }}
            .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%); padding: 30px; text-align: center; }}
            .header h1 {{ color: white; margin: 0; font-size: 28px; }}
            .content {{ padding: 40px 30px; }}
            .code-box {{ background: #f8f9fa; border: 2px solid #2563EB; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }}
            .code {{ font-size: 36px; font-weight: bold; color: #2563EB; letter-spacing: 8px; font-family: monospace; }}
            .footer {{ background: #f8f9fa; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }}
            .button {{ display: inline-block; padding: 12px 30px; background: #2563EB; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Forstek - Authentification</h1>
            </div>
            <div class="content">
                <h2 style="color: #1f2937;">Bonjour {to_name},</h2>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    Vous avez demandé à vous connecter à votre compte Forstek. 
                    Voici votre code de vérification :
                </p>
                <div class="code-box">
                    <div class="code">{code}</div>
                </div>
                <p style="color: #4b5563; font-size: 14px;">
                    Ce code est valide pour cette session de connexion uniquement.
                </p>
                <p style="color: #9ca3af; font-size: 13px; margin-top: 30px;">
                    Si vous n'avez pas demandé ce code, ignorez cet email.
                </p>
            </div>
            <div class="footer">
                <p>© 2025 Forstek - Plateforme de stages en Tunisie</p>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    Bonjour {to_name},
    
    Vous avez demandé à vous connecter à votre compte Forstek.
    
    Votre code de vérification : {code}
    
    Ce code est valide pour cette session de connexion uniquement.
    
    Si vous n'avez pas demandé ce code, ignorez cet email.
    
    ---
    © 2025 Forstek - Plateforme de stages en Tunisie
    """

    msg = EmailMessage()
    msg['Subject'] = f'🔐 Votre code Forstek : {code}'
    msg['From'] = EMAIL_FROM or EMAIL_USER
    msg['To'] = to_email
    msg.set_content(text_content)
    msg.add_alternative(html_content, subtype='html')

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
            print(f"✅ Email envoyé à {to_email} avec le code {code}")
    except Exception as e:
        print(f"❌ Erreur d'envoi email: {e}")
        # Afficher le code en console en cas d'erreur
        print(f"\n📧 CODE 2FA pour {to_email}: {code}\n")
        raise


# Simple decorator for routes that require JWT
from functools import wraps
from flask import request, jsonify

def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except Exception:
        return None


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization')
        token = None
        if auth and auth.lower().startswith('bearer '):
            token = auth.split(' ', 1)[1]
        elif 'refreshToken' in request.cookies:
            token = request.cookies.get('refreshToken')

        if not token:
            return jsonify({'error': 'Not authenticated'}), 401

        payload = verify_jwt(token)
        if not payload:
            return jsonify({'error': 'Invalid token'}), 401

        # Attach a simple object with id
        class CUser:
            def __init__(self, data):
                self.id = data.get('user_id')
                self.email = data.get('email')
        return fn(CUser(payload), *args, **kwargs)
    return wrapper
