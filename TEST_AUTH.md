# Guide de Test - Authentification Forstek

## 🧪 Test de l'authentification

### Étape 1 : Créer un compte
1. Ouvrez **http://localhost:3000/register**
2. Remplissez le formulaire :
   - **Nom complet** : Test User
   - **Email** : test@forstek.com
   - **Mot de passe** : 123456
   - **Confirmer le mot de passe** : 123456
   - **Type de compte** : Étudiant
3. Cliquez sur **"Créer mon compte"**
4. Vous devriez être **automatiquement redirigé vers /dashboard**

### Étape 2 : Vérifier la session
1. Le dashboard doit afficher : **"Bienvenue, Test User"**
2. L'avatar doit afficher les initiales **"TU"**
3. En haut à droite de la navbar, vous devriez voir votre nom

### Étape 3 : Naviguer dans l'application
1. Cliquez sur **"Profil"** dans la navbar
   - Le profil doit être pré-rempli avec votre email et nom
2. Cliquez sur **"Roadmaps"** dans la navbar
   - Vous devriez voir 3 parcours de formation
3. Cliquez sur **"Mentorship"**
   - Vous devriez voir la liste des mentors

### Étape 4 : Tester la déconnexion
1. Cliquez sur le **bouton rouge "Déconnexion"** dans la navbar
2. Vous devriez être redirigé vers la page d'accueil
3. La navbar doit maintenant afficher **"Connexion"** et **"Commencer"**

### Étape 5 : Tester la connexion
1. Allez sur **http://localhost:3000/login**
2. Connectez-vous avec :
   - **Email** : test@forstek.com
   - **Mot de passe** : 123456
3. Cochez **"Se souvenir de moi"** (optionnel)
4. Cliquez sur **"Se connecter"**
5. Vous devriez être redirigé vers **/dashboard**

### Étape 6 : Tester la protection des routes
1. Déconnectez-vous
2. Essayez d'accéder à **http://localhost:3000/dashboard** directement
3. Vous devriez être **automatiquement redirigé vers /login**
4. Même chose pour **http://localhost:3000/profile**

### Étape 7 : Tester la persistance
1. Connectez-vous
2. **Rechargez la page** (F5)
3. Vous devriez **rester connecté**
4. Le dashboard doit toujours afficher votre nom

---

## ✅ Checklist de fonctionnalités

### Pages accessibles
- [x] `/` - Homepage
- [x] `/login` - Connexion
- [x] `/register` - Inscription
- [x] `/offres` - Offres de stage
- [x] `/roadmaps` - Parcours de formation (NOUVEAU)
- [x] `/forum` - Forum communauté
- [x] `/mentorship` - Mentorat
- [x] `/2fa` - Authentification 2FA (NOUVEAU)
- [x] `/about` - À propos
- [x] `/contact` - Contact

### Pages protégées (nécessitent connexion)
- [x] `/dashboard` - Tableau de bord
- [x] `/profile` - Profil utilisateur

### Fonctionnalités
- [x] Inscription avec validation
- [x] Connexion avec validation
- [x] Déconnexion
- [x] Session persistante (localStorage)
- [x] Protection des routes
- [x] Redirection automatique
- [x] Affichage du nom utilisateur
- [x] Avatar avec initiales
- [x] Navbar adaptative (connecté/déconnecté)

---

## 🐛 Problèmes connus à résoudre

### Si la connexion ne fonctionne pas :
1. **Ouvrez la console du navigateur** (F12)
2. Allez dans **Application > Local Storage > http://localhost:3000**
3. Vérifiez que vous avez :
   - `users` : Array avec votre compte
   - `user` : Objet avec vos données (si connecté)
   - `isAuthenticated` : "true" (si connecté)

### Si vous ne voyez pas les données :
1. **Effacez le localStorage** :
   ```javascript
   localStorage.clear()
   ```
2. **Rechargez la page** (F5)
3. **Réinscrivez-vous**

### Si la redirection ne fonctionne pas :
- Vérifiez que vous êtes bien sur **http://localhost:3000** (pas 127.0.0.1)
- Essayez de vider le cache : Ctrl + Shift + Delete

---

## 🎯 Compte de test par défaut

Si vous voulez tester rapidement, utilisez ces identifiants :

**Email** : test@forstek.com  
**Mot de passe** : 123456

(Vous devez d'abord créer ce compte via `/register`)

---

## 📞 Support

Si quelque chose ne fonctionne pas :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez le terminal du serveur
3. Essayez de redémarrer le serveur : `npm run dev`
