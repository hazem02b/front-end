@echo off@echo off

chcp 65001 >nulecho ========================================

title TUNILINK - Démarrageecho   INSTALLATION ET DEMARRAGE FORSTEK

echo ========================================

echo.echo.

echo ╔════════════════════════════════════════════════════════════════════╗

echo ║                     🚀 TUNILINK - DÉMARRAGE                        ║REM Vérifier si node_modules existe

echo ╚════════════════════════════════════════════════════════════════════╝if not exist "node_modules" (

echo.    echo [ETAPE 1/3] Installation des dependances...

    echo Cette operation peut prendre 2-3 minutes la premiere fois.

REM Arrêter les anciens processus    echo.

echo [1/4] 🛑 Arrêt des anciens processus...    call npm install

taskkill /F /IM python.exe >nul 2>&1    if errorlevel 1 (

taskkill /F /IM node.exe >nul 2>&1        echo.

timeout /t 2 >nul        echo ERREUR: L'installation a echoue!

echo       ✅ Processus arrêtés        echo Verifiez que Node.js est installe: node --version

echo.        pause

        exit /b 1

REM Démarrer Flask    )

echo [2/4] 🔥 Démarrage du backend Flask...    echo.

start "🔥 Flask Backend - Tunilink" cmd /k "cd /d %~dp0backend-flask && .venv\Scripts\python.exe app.py"    echo Installation terminee avec succes!

timeout /t 6 >nul) else (

echo       ✅ Flask démarré sur http://localhost:5000    echo [ETAPE 1/3] Dependances deja installees (node_modules trouve)

echo.)



REM Démarrer Next.jsecho.

echo [3/4] ⚛️  Démarrage du frontend Next.js...echo [ETAPE 2/3] Verification de la configuration...

start "⚛️  Next.js Frontend - Tunilink" cmd /k "cd /d %~dp0 && npm run dev"echo.

timeout /t 10 >nul

echo       ✅ Next.js démarré sur http://localhost:3000echo [ETAPE 3/3] Demarrage du serveur de developpement...

echo.echo.

echo Le site sera accessible sur: http://localhost:3000

REM Ouvrir le navigateurecho.

echo [4/4] 🌐 Ouverture du navigateur...echo IMPORTANT: Ne fermez pas cette fenetre!

start http://localhost:3000echo Pour arreter le serveur, appuyez sur Ctrl+C

echo       ✅ Navigateur ouvertecho.

echo.echo ========================================

echo.

echo ╔════════════════════════════════════════════════════════════════════╗

echo ║                  ✅ TUNILINK EST MAINTENANT EN LIGNE !             ║call npm run dev

echo ╚════════════════════════════════════════════════════════════════════╝
echo.
echo   📍 Frontend:  http://localhost:3000
echo   📍 Backend:   http://localhost:5000
echo.
echo   📝 INSTRUCTIONS:
echo      1. Créez un compte sur la page d'inscription
echo      2. Le code 2FA s'affichera dans la fenêtre Flask
echo      3. Utilisez ce code pour vous connecter
echo.
echo   💡 ASTUCE: Gardez les 2 fenêtres CMD ouvertes !
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
pause
