@echo off
echo ====================================
echo    CONFIGURATION AUTOMATIQUE FORSTEK
echo ====================================
echo.

echo [1/5] Verification de la base de donnees...
echo.
echo Options disponibles :
echo.
echo A. Supabase (RECOMMANDE - Cloud gratuit)
echo    1. Aller sur https://supabase.com
echo    2. Creer un compte (gratuit)
echo    3. Cliquer "New Project"
echo    4. Choisir un nom et mot de passe
echo    5. Attendre 2 minutes (creation du projet)
echo    6. Aller dans Settings ^> Database
echo    7. Copier "Connection string" (URI, pas Pooler)
echo    8. Ouvrir .env et remplacer DATABASE_URL par votre URL
echo.
echo B. Base locale (plus complexe)
echo    - Necessite Docker Desktop
echo    - Installation longue
echo.
echo.
echo [2/5] Generation du client Prisma...
cd /d "%~dp0"
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: La base de donnees n'est pas configuree
    echo Veuillez d'abord configurer DATABASE_URL dans .env
    echo Voir les instructions ci-dessus
    pause
    exit /b 1
)
echo ✓ Client Prisma genere
echo.

echo [3/5] Creation des tables...
call npx prisma migrate dev --name init
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Impossible de creer les tables
    pause
    exit /b 1
)
echo ✓ Tables creees
echo.

echo [4/5] Verification de l'email...
echo.
echo Pour que les emails 2FA fonctionnent :
echo.
echo 1. Aller sur https://myaccount.google.com/security
echo 2. Activer "Validation en deux etapes"
echo 3. Aller sur https://myaccount.google.com/apppasswords
echo 4. Creer un nouveau mot de passe d'application
echo 5. Copier le mot de passe (16 caracteres)
echo 6. Ouvrir .env et mettre a jour :
echo    EMAIL_USER=votre-email@gmail.com
echo    EMAIL_PASSWORD=le-mot-de-passe-16-caracteres
echo.
set /p email_ready="Email configure ? (o/n) : "
if /i "%email_ready%"=="o" (
    echo ✓ Email configure
) else (
    echo ⚠ Emails 2FA ne fonctionneront pas
    echo   Le code s'affichera dans la console du serveur
)
echo.

echo [5/5] Demarrage du serveur...
echo.
start cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
echo.
echo ====================================
echo    CONFIGURATION TERMINEE !
echo ====================================
echo.
echo Le serveur demarre sur http://localhost:3000
echo.
echo Prochaines etapes :
echo 1. Tester l'inscription : http://localhost:3000/register
echo 2. Verifier Prisma Studio : npx prisma studio
echo 3. Voir les guides : BACKEND_TEST.md
echo.
pause
