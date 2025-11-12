# 📧 Configuration de l'authentification 2FA par email

## 🎯 Comment fonctionne le système 2FA ?

Lorsqu'un utilisateur se connecte :
1. Il entre son **email** et **mot de passe**
2. Le backend génère un **code à 6 chiffres** (ex: `123456`)
3. Le code est envoyé **par email** à l'utilisateur
4. L'utilisateur entre le code sur la page `/2fa`
5. S'il est correct, il accède au dashboard

---

## ⚙️ Options de configuration

### Option 1 : Avec envoi d'emails (PRODUCTION) ✅

**Pour que les utilisateurs reçoivent les codes 2FA par email, vous devez configurer un service SMTP.**

#### Étape 1 : Créer un compte Brevo (gratuit)

1. Aller sur [https://www.brevo.com](https://www.brevo.com)
2. Créer un compte gratuit
   - ✅ 300 emails/jour gratuits
   - ✅ Pas de carte bancaire requise
3. Aller dans **Settings → SMTP & API**
4. Cliquer sur **Create a new SMTP key**
5. Copier :
   - **SMTP Server** : `smtp-relay.brevo.com`
   - **Login (email)** : Votre email
   - **SMTP Key** : La clé générée (commence par `xsmtpsib-...`)

#### Étape 2 : Configurer le fichier `.env`

```bash
cd backend-flask
cp .env.example .env
```

Éditer `backend-flask/.env` :

```env
# Email Configuration - Brevo
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=xsmtpsib-VOTRE_CLE_API_ICI
EMAIL_FROM=VotreApp <noreply@votreapp.com>

# JWT (Changez le secret !)
JWT_SECRET=un_secret_tres_long_et_complexe_changez_moi
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRES_MINUTES=1440
REFRESH_TOKEN_EXPIRES_DAYS=7
```

#### Étape 3 : Tester l'envoi d'email

```bash
cd backend-flask
.\.venv\Scripts\python.exe test_2fa_email.py
```

Résultat attendu :
```
✅ Email envoyé avec succès !
📧 Vérifiez votre boîte de réception
```

---

### Option 2 : Mode développement (SANS EMAIL) 🔧

**Si vous ne configurez PAS les emails, les codes 2FA s'afficheront dans la console Flask.**

#### Configuration

Dans `backend-flask/.env`, laissez vide :

```env
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=
```

#### Utilisation

1. Lancez Flask :
   ```bash
   cd backend-flask
   .\.venv\Scripts\python.exe app.py
   ```

2. Lorsqu'un utilisateur se connecte, le code s'affiche dans la console :
   ```
   ====================================
   📧 CODE 2FA (MODE DÉVELOPPEMENT)
   ====================================
   👤 Destinataire: John Doe (john@example.com)
   🔐 CODE: 123456
   ====================================
   ```

3. Copiez le code et entrez-le sur la page `/2fa`

⚠️ **Limitation** : Seul le développeur (qui voit la console) peut se connecter. Ne convient PAS pour la production.

---

## 🔐 Sécurité

### ⚠️ IMPORTANT : Ne commitez JAMAIS votre `.env` sur GitHub !

Le fichier `.env` contient des **credentials sensibles** :
- Clé API SMTP (permet d'envoyer des emails depuis votre compte)
- JWT_SECRET (permet de créer des tokens d'authentification)

**Protection actuelle** :
- ✅ `.env` est dans `.gitignore`
- ✅ Seul `.env.example` (sans credentials) est sur GitHub
- ✅ Chaque développeur doit créer son propre `.env`

### Si vous avez accidentellement commit votre `.env` :

```bash
# 1. Supprimer du repo
git rm --cached backend-flask/.env
git commit -m "Remove .env from repo"
git push

# 2. Révoquer les credentials compromis
# - Brevo : Supprimer l'ancienne clé SMTP et en créer une nouvelle
# - JWT_SECRET : Générer un nouveau secret

# 3. Mettre à jour votre .env local avec les nouvelles credentials
```

---

## 🧪 Tester le flux complet

### 1. Inscription

```bash
# Aller sur http://localhost:3000/register
# Créer un compte avec votre vrai email
```

### 2. Connexion

```bash
# Aller sur http://localhost:3000/login
# Entrer email et mot de passe
```

### 3. Recevoir le code

**Avec emails configurés** :
- Vérifiez votre boîte de réception (ou spam)
- Vous recevrez un email avec le code à 6 chiffres

**Sans emails** :
- Regardez la console Flask
- Le code s'affiche entre les `====`

### 4. Vérification

```bash
# Entrer le code sur http://localhost:3000/2fa
# Si correct → Redirection vers /dashboard
```

---

## 📊 Limites des comptes gratuits

| Service | Plan Gratuit | Limite |
|---------|-------------|--------|
| **Brevo** | ✅ Gratuit | 300 emails/jour |
| **SendGrid** | ✅ Gratuit | 100 emails/jour |
| **Mailgun** | ⚠️ Carte requise | 5,000 emails/mois |
| **Gmail SMTP** | ⚠️ Risqué | Bloqué si trop d'envois |

**Recommandation** : Brevo (meilleur plan gratuit pour débuter)

---

## 🚀 Alternative : Services SMS (Plus avancé)

Pour envoyer les codes 2FA par **SMS** au lieu d'email :

- **Twilio** : 15$ de crédit gratuit
- **Vonage (Nexmo)** : 2€ de crédit gratuit
- **AWS SNS** : 100 SMS gratuits/mois

Documentation Twilio : [https://www.twilio.com/docs/sms](https://www.twilio.com/docs/sms)

---

## ❓ FAQ

### Q : Puis-je utiliser Gmail pour envoyer les emails ?
**R** : Oui, mais c'est plus complexe :
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=mot_de_passe_application  # Pas votre mot de passe Gmail !
```
⚠️ Vous devez activer "Mots de passe d'application" dans Google Account.

### Q : Les codes 2FA expirent-ils ?
**R** : Actuellement, non. Vous pouvez améliorer cela en ajoutant :
```python
# Dans models.py
two_fa_expires = db.Column(db.DateTime)

# Dans app.py lors de la génération du code
user.two_fa_expires = datetime.utcnow() + timedelta(minutes=5)
```

### Q : Combien d'utilisateurs peuvent se connecter simultanément ?
**R** : Illimité ! Chaque utilisateur reçoit son propre code unique.

### Q : Puis-je changer le design de l'email ?
**R** : Oui ! Éditez la variable `html_content` dans `backend-flask/utils.py` (ligne ~75).

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Flask (`console où tourne app.py`)
2. Testez avec `test_2fa_email.py`
3. Vérifiez que votre clé API Brevo est valide
4. Essayez le mode développement (sans email) pour isoler le problème

---

**Dernière mise à jour** : 12 novembre 2025
