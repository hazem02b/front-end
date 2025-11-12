# Script de configuration automatique Forstek Backend
# Exécuter : .\configure-backend.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CONFIGURATION BACKEND FORSTEK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Aller dans le bon répertoire
Set-Location "c:\Users\HAZEM\tunilink\tunilink-web"

# Étape 1 : Vérifier si .env existe
if (Test-Path ".env") {
    Write-Host "[✓] Fichier .env trouvé" -ForegroundColor Green
} else {
    Write-Host "[✗] Fichier .env manquant" -ForegroundColor Red
    Write-Host "Création de .env depuis .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "[✓] .env créé" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ÉTAPE 1/4 : BASE DE DONNÉES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si DATABASE_URL est configuré
$envContent = Get-Content ".env" -Raw
if ($envContent -match 'DATABASE_URL="postgresql://') {
    Write-Host "[✓] DATABASE_URL semble configuré" -ForegroundColor Green
    Write-Host ""
    $continue = Read-Host "Voulez-vous reconfigurer la base de données ? (o/N)"
    if ($continue -ne "o") {
        Write-Host "Conservation de la configuration actuelle" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "INSTRUCTIONS :" -ForegroundColor Yellow
        Write-Host "1. Ouvrez https://supabase.com dans votre navigateur" -ForegroundColor White
        Write-Host "2. Créez un compte (gratuit)" -ForegroundColor White
        Write-Host "3. Cliquez 'New Project'" -ForegroundColor White
        Write-Host "4. Name: forstek-db, Password: FoRsTeK2024!@#" -ForegroundColor White
        Write-Host "5. Attendez 2 minutes que le projet soit créé" -ForegroundColor White
        Write-Host "6. Allez dans Settings > Database" -ForegroundColor White
        Write-Host "7. Copiez la 'Connection string' (onglet URI)" -ForegroundColor White
        Write-Host "8. Remplacez [YOUR-PASSWORD] par: FoRsTeK2024!@#" -ForegroundColor White
        Write-Host ""
        $dbUrl = Read-Host "Collez votre DATABASE_URL ici"
        
        if ($dbUrl -ne "") {
            $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$dbUrl`""
            $envContent | Set-Content ".env"
            Write-Host "[✓] DATABASE_URL mis à jour dans .env" -ForegroundColor Green
        }
    }
} else {
    Write-Host "[⚠] DATABASE_URL non configuré" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Vous devez configurer Supabase :" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Ouvrez : https://supabase.com" -ForegroundColor White
    Write-Host "2. Créez un compte gratuit" -ForegroundColor White
    Write-Host "3. 'New Project' > Name: forstek-db" -ForegroundColor White
    Write-Host "4. Password: FoRsTeK2024!@#" -ForegroundColor White
    Write-Host "5. Attendez 2 minutes..." -ForegroundColor White
    Write-Host "6. Settings > Database > Connection string (URI)" -ForegroundColor White
    Write-Host "7. Copiez l'URL et remplacez [YOUR-PASSWORD] par FoRsTeK2024!@#" -ForegroundColor White
    Write-Host ""
    $dbUrl = Read-Host "Collez DATABASE_URL (ou tapez 'skip' pour plus tard)"
    
    if ($dbUrl -eq "skip") {
        Write-Host ""
        Write-Host "[⚠] Configuration de la base de données reportée" -ForegroundColor Yellow
        Write-Host "Suivez le guide : GUIDE_RAPIDE.md" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Appuyez sur Entrée pour quitter"
        exit
    } elseif ($dbUrl -ne "") {
        $envContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$dbUrl`""
        $envContent | Set-Content ".env"
        Write-Host "[✓] DATABASE_URL configuré" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ÉTAPE 2/4 : GÉNÉRATION PRISMA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Génération du client Prisma..." -ForegroundColor Yellow

npx prisma generate 2>&1 | Out-String | Write-Host

if ($LASTEXITCODE -eq 0) {
    Write-Host "[✓] Client Prisma généré avec succès" -ForegroundColor Green
} else {
    Write-Host "[✗] Erreur lors de la génération Prisma" -ForegroundColor Red
    Write-Host "Vérifiez DATABASE_URL dans .env" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ÉTAPE 3/4 : CRÉATION DES TABLES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Création des tables dans la base de données..." -ForegroundColor Yellow

npx prisma migrate dev --name init 2>&1 | Out-String | Write-Host

if ($LASTEXITCODE -eq 0) {
    Write-Host "[✓] Tables créées avec succès" -ForegroundColor Green
} else {
    Write-Host "[✗] Erreur lors de la création des tables" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ÉTAPE 4/4 : EMAIL (OPTIONNEL)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration de l'envoi d'emails 2FA..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Si vous sautez cette étape, le code 2FA s'affichera" -ForegroundColor Gray
Write-Host "dans la console du serveur (suffisant pour les tests)" -ForegroundColor Gray
Write-Host ""

$configEmail = Read-Host "Voulez-vous configurer Gmail maintenant ? (o/N)"

if ($configEmail -eq "o") {
    Write-Host ""
    Write-Host "INSTRUCTIONS :" -ForegroundColor Yellow
    Write-Host "1. Allez sur : https://myaccount.google.com/apppasswords" -ForegroundColor White
    Write-Host "2. Créez un mot de passe d'application" -ForegroundColor White
    Write-Host "3. Copiez le mot de passe (16 caractères)" -ForegroundColor White
    Write-Host ""
    
    $emailUser = Read-Host "Votre email Gmail"
    $emailPass = Read-Host "Mot de passe application"
    
    if ($emailUser -ne "" -and $emailPass -ne "") {
        $envContent = Get-Content ".env" -Raw
        $envContent = $envContent -replace 'EMAIL_USER="[^"]*"', "EMAIL_USER=`"$emailUser`""
        $envContent = $envContent -replace 'EMAIL_PASSWORD="[^"]*"', "EMAIL_PASSWORD=`"$emailPass`""
        $envContent | Set-Content ".env"
        Write-Host "[✓] Email configuré" -ForegroundColor Green
    }
} else {
    Write-Host "[⚠] Configuration email sautée" -ForegroundColor Yellow
    Write-Host "Le code 2FA s'affichera dans la console" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CONFIGURATION TERMINÉE !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Base de données : Configurée" -ForegroundColor Green
Write-Host "✅ Client Prisma : Généré" -ForegroundColor Green
Write-Host "✅ Tables : Créées (11 tables)" -ForegroundColor Green
Write-Host ""
Write-Host "PROCHAINES ÉTAPES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Démarrer le serveur :" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Tester l'API (dans un nouveau terminal) :" -ForegroundColor White
Write-Host "   Voir BACKEND_TEST.md pour les commandes" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Voir les données :" -ForegroundColor White
Write-Host "   npx prisma studio" -ForegroundColor Cyan
Write-Host "   Puis ouvrir http://localhost:5555" -ForegroundColor Cyan
Write-Host ""

$startServer = Read-Host "Voulez-vous démarrer le serveur maintenant ? (O/n)"

if ($startServer -ne "n") {
    Write-Host ""
    Write-Host "Démarrage du serveur..." -ForegroundColor Green
    Write-Host "Appuyez sur Ctrl+C pour arrêter" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "Pour démarrer plus tard, exécutez : npm run dev" -ForegroundColor Yellow
    Write-Host ""
}
