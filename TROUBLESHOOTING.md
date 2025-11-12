# 🔧 Guide de dépannage - Forstek

## Problèmes courants et solutions

### ❌ Erreur : "Failed to fetch" lors de la connexion

**Symptômes** :
- Message d'erreur "Failed to fetch" dans le navigateur
- Impossible de se connecter ou s'inscrire
- Le formulaire ne répond pas

**Cause** :
Le backend Flask n'est pas en cours d'exécution. Le frontend (Next.js) ne peut pas communiquer avec l'API.

**Solution** :

#### Méthode rapide (Recommandé) ✅
1. Ouvrez le dossier du projet
2. Double-cliquez sur `DEMARRER.bat`
3. Attendez que les 2 serveurs démarrent (environ 10 secondes)
4. Les fenêtres suivantes s'ouvriront automatiquement :
   - Terminal Flask (port 5000)
   - Terminal Next.js (port 3000)
5. Allez sur http://localhost:3000

#### Méthode manuelle

**Terminal 1 - Backend Flask** :
```bash
cd backend-flask
.\.venv\Scripts\python.exe app.py
```
Attendez le message : `* Running on http://0.0.0.0:5000`

**Terminal 2 - Frontend Next.js** :
```bash
npm run dev
```
Attendez le message : `Ready on http://localhost:3000`

**Vérification** :
- Flask : http://localhost:5000 ✅
- Next.js : http://localhost:3000 ✅
- Aucune erreur "Failed to fetch" ✅

---

### ❌ Erreur : "Module not found" ou "Cannot find module"

**Cause** :
Les dépendances ne sont pas installées.

**Solution** :
```bash
npm install
```

---

### ❌ Erreur : "Port 5000 already in use"

**Cause** :
Un autre processus utilise le port 5000.

**Solution Windows** :
```powershell
# Trouver le processus
netstat -ano | findstr :5000

# Tuer le processus (remplacez PID par le numéro affiché)
taskkill /F /PID <PID>
```

**Ou utilisez** :
```powershell
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

---

### ❌ Erreur : "Invalid or expired token"

**Cause** :
Votre token JWT a expiré (durée de vie : 24 heures).

**Solution** :
1. Cliquez sur "Déconnexion"
2. Reconnectez-vous avec vos identifiants
3. Entrez le nouveau code 2FA

---

### ❌ Je ne reçois pas le code 2FA par email

**Diagnostic** :

1. **Vérifiez la console Flask** - Le code s'affiche toujours dans le terminal :
   ```
   ====================================
   📧 CODE 2FA (MODE DÉVELOPPEMENT)
   ====================================
   👤 Destinataire: Votre Nom (email@example.com)
   🔐 CODE: 123456
   ====================================
   ```

2. **Configuration email manquante** :
   - Vérifiez que `backend-flask/.env` contient :
   ```env
   EMAIL_HOST=smtp-relay.brevo.com
   EMAIL_PORT=587
   EMAIL_USER=votre_email@gmail.com
   EMAIL_PASSWORD=votre_cle_smtp_brevo
   EMAIL_FROM=VotreApp <noreply@votreapp.com>
   ```

3. **Créer un compte Brevo** (si pas encore fait) :
   - Allez sur https://www.brevo.com
   - Créez un compte gratuit (300 emails/jour)
   - Settings → SMTP & API → Create SMTP Key
   - Copiez les credentials dans `.env`

**Solution alternative** :
Utilisez le mode console (code affiché dans terminal Flask uniquement).

---

### ❌ Erreur : "Update failed" lors de la sauvegarde du profil

**Cause** :
Base de données corrompue ou schéma obsolète.

**Solution** :
```bash
cd backend-flask

# Supprimer l'ancienne base de données
Remove-Item instance/tunilink.db

# Relancer Flask (créera une nouvelle DB)
.\.venv\Scripts\python.exe app.py
```

⚠️ **Attention** : Vous perdrez tous les comptes existants. Créez-en un nouveau.

---

### ❌ Erreur : "python: command not found" (Windows)

**Cause** :
Python n'est pas dans le PATH ou l'environnement virtuel n'est pas activé.

**Solution** :
```bash
# Utiliser le chemin complet
.\.venv\Scripts\python.exe app.py

# Ou activer l'environnement
.\.venv\Scripts\Activate.ps1
python app.py
```

---

### ❌ Page blanche ou "Module build failed"

**Cause** :
Erreur de compilation Next.js.

**Solution** :
```bash
# Supprimer le cache
Remove-Item -Recurse -Force .next

# Réinstaller les dépendances
Remove-Item -Recurse -Force node_modules
npm install

# Relancer
npm run dev
```

---

### ❌ "Cannot find package 'bcrypt'" (Backend Python)

**Cause** :
Dépendances Python manquantes.

**Solution** :
```bash
cd backend-flask
.\.venv\Scripts\Activate.ps1
pip install Flask Flask-Cors Flask-SQLAlchemy python-dotenv passlib PyJWT bcrypt
```

---

## 🧪 Tests de vérification

### Tester Flask (Backend)
```bash
curl http://localhost:5000/api/register -Method OPTIONS
```
Doit retourner : `200 OK`

### Tester Next.js (Frontend)
Ouvrez : http://localhost:3000
Doit afficher : Page d'accueil Forstek

### Tester la connexion complète
1. Inscription : http://localhost:3000/register
2. Créez un compte
3. Vérifiez la console Flask pour le code 2FA
4. Entrez le code sur /2fa
5. Accès au dashboard → **Succès !** ✅

---

## 📞 Support

Si le problème persiste :
1. Vérifiez les logs dans les terminaux Flask et Next.js
2. Consultez `CONFIGURATION_2FA.md` pour la configuration email
3. Ouvrez une issue sur GitHub avec :
   - Message d'erreur complet
   - Commandes exécutées
   - Système d'exploitation

---

**Dernière mise à jour** : 12 novembre 2025
