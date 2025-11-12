# 📧 Configuration Email Gmail pour 2FA

## Étapes Rapides (5 minutes)

### 1️⃣ Créer un mot de passe d'application Gmail

1. **Aller sur votre compte Google** : https://myaccount.google.com/
2. **Cliquer sur "Sécurité"** dans le menu à gauche
3. **Activer la validation en 2 étapes** (si ce n'est pas déjà fait)
   - Cliquer sur "Validation en 2 étapes"
   - Suivre les instructions
4. **Créer un mot de passe d'application** :
   - Retourner dans "Sécurité"
   - Chercher "Mots de passe des applications" (en bas)
   - Sélectionner "Application" → "Autre (nom personnalisé)"
   - Taper : `Forstek Backend`
   - Cliquer sur "Générer"
   - **COPIER le mot de passe à 16 caractères** (exemple: `abcd efgh ijkl mnop`)

### 2️⃣ Configurer le fichier .env

Ouvrez le fichier `.env` et remplacez :

```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
```

Par vos vraies informations :

```env
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="abcdefghijklmnop"
```

⚠️ **IMPORTANT** : Enlevez les espaces du mot de passe Gmail (les 16 caractères collés)

### 3️⃣ Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis relancer :
npm run dev
```

### 4️⃣ Tester

1. Aller sur http://localhost:3000/register
2. S'inscrire avec votre email
3. Vous recevrez un email de bienvenue !
4. Aller sur http://localhost:3000/login
5. Se connecter → Vous recevrez le code 2FA par email ! 🎉

---

## 🔧 Alternative : Tester sans Gmail

Si vous n'avez pas Gmail ou ne voulez pas configurer, **le code 2FA s'affiche dans la console du serveur** :

```
🔐 Code 2FA pour user@email.com : 123456
```

Vous pouvez copier ce code et l'utiliser sur la page 2FA.

---

## 📝 Informations EMAIL_FROM

L'adresse `EMAIL_FROM` est juste pour l'affichage :
```env
EMAIL_FROM="Forstek <noreply@forstek.tn>"
```

Les emails seront envoyés depuis votre Gmail, mais afficheront "Forstek" comme nom d'expéditeur.
