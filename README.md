# 🎓 Forstek - Plateforme de Stages en Tunisie# 🎓 Forstek - Plateforme de Stages pour Étudiants Tunisiens



Plateforme web complète pour connecter étudiants et entreprises tunisiennes, avec système d'authentification 2FA, gestion de profils, et recherche de stages.Plateforme web moderne connectant les étudiants tunisiens avec des opportunités de stages et de mentorat.



## 📋 Table des matières## ✨ Fonctionnalités



- [Technologies](#technologies)- 🏠 **Page d'accueil** : Présentation de la plateforme

- [Fonctionnalités](#fonctionnalités)- 🔐 **Authentification** : Connexion et inscription (Étudiant/Entreprise)

- [Installation](#installation)- 💼 **Offres de stage** : Recherche et filtrage d'opportunités

- [Configuration](#configuration)- 📊 **Dashboard** : Suivi des candidatures et statistiques

- [Démarrage](#démarrage)- 👤 **Profil** : Gestion du profil et compétences

- [Structure du projet](#structure-du-projet)- 💬 **Forum** : Discussions communautaires

- [API Endpoints](#api-endpoints)- 🎯 **Mentorat** : Connexion avec des mentors professionnels

- ℹ️ **À propos** : Histoire et équipe de Forstek

## 🚀 Technologies- 📞 **Contact** : Formulaire de contact et informations



### Frontend## 🚀 Installation Rapide

- **Next.js 14** - Framework React avec App Router

- **TypeScript** - Typage statique### 1️⃣ Cloner le repository

- **Tailwind CSS** - Styling moderne```bash

- **Lucide React** - Icônesgit clone https://github.com/hazem02b/front-end.git

cd front-end

### Backend```

- **Flask** - Framework Python léger

- **SQLAlchemy** - ORM pour la base de données### 2️⃣ Installer les dépendances

- **SQLite** - Base de données```bash

- **JWT** - Authentification par tokensnpm install

- **Bcrypt** - Hashage des mots de passe```

- **2FA** - Authentification à deux facteurs⚠️ **IMPORTANT** : Cette étape est OBLIGATOIRE après chaque clonage !



## ✨ Fonctionnalités### 3️⃣ Lancer le serveur

```bash

### Authentificationnpm run dev

- ✅ Inscription avec validation (email, mot de passe, type de compte)```

- ✅ Connexion avec authentification 2FA

- ✅ Codes 2FA envoyés par email (Brevo SMTP)### 4️⃣ Ouvrir dans le navigateur

- ✅ Tokens JWT avec expiration 24hVisitez : **http://localhost:3000**

- ✅ Protection des routes privées

- ✅ Gestion de session avec localStorage



### Profils Utilisateurs## 🛠️ Technologies

- ✅ Profil étudiant complet (bio, formation, compétences)

- ✅ Profil entreprise- **Next.js 16** (App Router + Turbopack)

- ✅ Modification en temps réel- **TypeScript**

- ✅ Upload de CV (PDF)- **Tailwind CSS v4**

- ✅ Liens sociaux (LinkedIn, GitHub, Website)- **Lucide React** (Icônes)

- **Framer Motion** (Animations)

### Interface- **Radix UI** (Composants accessibles)

- ✅ Design moderne avec animations

- ✅ Navigation conditionnelle selon authentification## 📁 Structure du Projet

- ✅ Dashboard personnalisé

- ✅ Page paramètres unifiée```

- ✅ Responsive designfront-end/

├── app/                    # Pages (Next.js App Router)

## 📦 Installation│   ├── page.tsx           # Accueil

│   ├── login/             # Connexion

### Prérequis│   ├── register/          # Inscription

- Node.js 18+ et npm│   ├── offres/            # Offres de stage

- Python 3.10+│   ├── dashboard/         # Tableau de bord

- Git│   ├── profile/           # Profil

│   ├── forum/             # Forum

### 1. Cloner le projet│   ├── mentorship/        # Mentorat

│   ├── about/             # À propos

```bash│   └── contact/           # Contact

git clone https://github.com/hazem02b/front-back-forstek.git├── components/            # Composants réutilisables

cd front-back-forstek│   ├── Navbar.tsx

```│   ├── ModernBackground.tsx

│   └── ui/                # Composants UI

### 2. Installation Frontend└── public/                # Assets statiques

```

```bash

npm install## 📝 Commandes Disponibles

```

| Commande | Description |

### 3. Installation Backend|----------|-------------|

| `npm run dev` | Serveur de développement |

```bash| `npm run build` | Build de production |

cd backend-flask| `npm start` | Lancer la production |

python -m venv .venv| `npm run lint` | Vérifier le code |



# Windows## ⚠️ Pourquoi `npm install` est nécessaire ?

.\.venv\Scripts\activate

Le dossier **`node_modules`** (contenant ~428 packages) n'est **PAS** inclus dans Git car :

# Linux/Mac- Il pèse environ **500 MB**

source .venv/bin/activate- Il est listé dans `.gitignore`

- Il doit être généré localement via `npm install`

pip install Flask Flask-Cors Flask-SQLAlchemy python-dotenv passlib PyJWT bcrypt

```**Sans cette étape, le site ne fonctionnera pas !**



## ⚙️ Configuration## 🐛 Problèmes Courants



### Backend - Fichier `.env`### ❌ Le serveur ne démarre pas

```bash

Créez `backend-flask/.env` :# Solution 1 : Réinstaller les dépendances

rm -rf node_modules package-lock.json

```envnpm install

# JWT Configuration

JWT_SECRET=votre_secret_jwt_tres_long_et_complexe_ici# Solution 2 : Vérifier Node.js

JWT_ALGORITHM=HS256node --version  # Doit être >= 18.0.0

ACCESS_TOKEN_EXPIRES_MINUTES=1440```

REFRESH_TOKEN_EXPIRES_DAYS=7

### ❌ Port 3000 occupé

# Email Configuration (Brevo SMTP)Next.js choisira automatiquement un port libre (3001, 3002...)

EMAIL_HOST=smtp-relay.brevo.com

EMAIL_PORT=587### ❌ Erreurs de compilation

EMAIL_USER=votre_email@exemple.comAssurez-vous d'avoir bien exécuté `npm install`

EMAIL_PASSWORD=votre_cle_api_brevo

EMAIL_FROM=noreply@forstek.tn## 📖 Documentation Complète

```

Pour plus de détails, consultez [INSTALLATION.md](./INSTALLATION.md)

### Frontend - Configuration API

## 🔐 Configuration Git (pour les contributeurs)

Le fichier `lib/api-config.ts` est déjà configuré pour pointer vers `http://localhost:5000/api`.

```bash

## 🎯 Démarragegit config user.name "Votre Nom"

git config user.email "votre@email.com"

### Option 1 : Démarrage automatique (Windows)```


Double-cliquez sur `DEMARRER.bat` qui lance automatiquement :
- Backend Flask sur port 5000
- Frontend Next.js sur port 3000

### Option 2 : Démarrage manuel

**Terminal 1 - Backend :**
```bash
cd backend-flask
.\.venv\Scripts\python.exe app.py
```

**Terminal 2 - Frontend :**
```bash
npm run dev
```

### Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api

## 📁 Structure du projet

```
front-back-forstek/
├── app/                          # Pages Next.js (App Router)
│   ├── register/                 # Page d'inscription
│   ├── login/                    # Page de connexion
│   ├── 2fa/                      # Vérification 2FA
│   ├── dashboard/                # Dashboard utilisateur
│   ├── settings/                 # Paramètres & profil
│   ├── offres/                   # Offres de stage
│   ├── roadmaps/                 # Roadmaps d'apprentissage
│   ├── mentorship/               # Programme de mentorat
│   └── forum/                    # Forum communautaire
├── components/                   # Composants React
│   ├── ProtectedRoute.tsx        # HOC pour routes protégées
│   ├── CVUploader.tsx            # Upload de CV
│   ├── ModernBackground.tsx      # Background animé
│   └── FloatingParticles.tsx     # Particules flottantes
├── contexts/                     # Contextes React
│   └── AuthContext.tsx           # Gestion authentification
├── lib/                          # Utilitaires
│   └── api-config.ts             # Configuration API
├── backend-flask/                # Backend Flask
│   ├── app.py                    # Application Flask principale
│   ├── models.py                 # Modèles SQLAlchemy
│   ├── utils.py                  # Fonctions utilitaires
│   ├── create_db.py              # Script création DB
│   ├── .env                      # Variables d'environnement
│   ├── instance/                 # Base de données SQLite
│   └── uploads/cvs/              # CVs uploadés
├── public/                       # Assets statiques
├── .gitignore                    # Fichiers ignorés par Git
├── package.json                  # Dépendances Node.js
├── tailwind.config.ts            # Configuration Tailwind
├── tsconfig.json                 # Configuration TypeScript
└── README.md                     # Ce fichier
```

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Inscription d'un nouvel utilisateur |
| POST | `/api/login` | Connexion et génération code 2FA |
| POST | `/api/verify-2fa` | Vérification code 2FA et obtention tokens |
| POST | `/api/resend-2fa` | Renvoyer le code 2FA |

### Utilisateur

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users/me` | Récupérer profil utilisateur actuel |
| PUT | `/api/users/me` | Mettre à jour profil utilisateur |

### Upload

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload de CV (PDF uniquement) |

## 🔐 Authentification

### Flux d'inscription

1. Utilisateur s'inscrit sur `/register`
2. Backend crée compte et profil
3. Redirection vers `/login` avec message de succès
4. Utilisateur se connecte
5. Backend génère code 2FA (affiché dans console Flask)
6. Redirection vers `/2fa`
7. Utilisateur entre le code
8. Backend génère tokens JWT
9. Tokens stockés dans localStorage
10. Redirection vers `/dashboard`

### Flux de connexion

1. Utilisateur entre email/password sur `/login`
2. Backend vérifie identifiants et génère code 2FA
3. Code affiché dans console Flask (et envoyé par email si configuré)
4. Redirection vers `/2fa`
5. Vérification du code
6. Génération tokens JWT
7. Stockage dans localStorage
8. Accès aux routes protégées

## 🛡️ Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Tokens JWT avec expiration
- ✅ Authentification à deux facteurs
- ✅ Validation des données côté backend
- ✅ CORS configuré pour localhost en développement
- ✅ Protection des routes sensibles

## 🐛 Debugging

### Voir les codes 2FA

Les codes 2FA s'affichent dans la console Flask :
```
====================================
📧 CODE 2FA (MODE DÉVELOPPEMENT)
====================================
👤 Destinataire: Nom (email@exemple.com)
🔐 CODE: 123456
====================================
```

### Problèmes courants

**Erreur "Invalid or expired token"**
- Token expiré (24h) → Se reconnecter
- Token absent → Vérifier localStorage

**Erreur "Update failed"**
- Base de données corrompue → Supprimer `instance/tunilink.db` et relancer Flask

**Port déjà utilisé**
```bash
# Tuer le processus sur port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

## 📝 Modifications récentes

### ✅ Correction flux d'inscription (12/11/2025)
- Redirection `/register` → `/login` (au lieu de `/dashboard`)
- Message de succès avec pré-remplissage email
- Flow complet : Inscription → Login → 2FA → Dashboard

### ✅ Gestion profil complète
- 11 champs profil étudiant (bio, formation, liens sociaux)
- Sauvegarde en temps réel via API
- Gestion erreurs 401 avec déconnexion automatique

### ✅ Navigation conditionnelle
- Boutons "Connexion/Commencer" cachés si authentifié
- Avatar + notifications affichés si connecté
- Appliqué sur 4 pages : offres, roadmaps, mentorship, forum

## 👨‍💻 Développeur

**Hazem Ben Brahim**
- GitHub: [@hazem02b](https://github.com/hazem02b)
- Email: hazem@forstek.tn

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**Note :** Ce projet est en développement actif. Consultez les issues GitHub pour les fonctionnalités à venir.
