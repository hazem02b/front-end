@echo off
chcp 65001 >nul
color 0A
title Démarrage TuniLink

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║          🚀 DÉMARRAGE TUNILINK                     ║
echo ║                                                    ║
echo ╔════════════════════════════════════════════════════╗
echo.

:: Arrêter les anciens processus
echo [1/4] Arrêt des anciens processus...
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

:: Démarrer Flask
echo [2/4] Démarrage de Flask (Backend)...
cd /d "%~dp0backend-flask"
start "🔥 FLASK SERVER - NE PAS FERMER" cmd /k "color 0C && title FLASK SERVER && echo. && echo ╔════════════════════════════════════════╗ && echo ║     FLASK SERVER - Port 5000          ║ && echo ║     Gardez cette fenetre ouverte      ║ && echo ╚════════════════════════════════════════╝ && echo. && .\.venv\Scripts\python.exe app.py"
timeout /t 5 /nobreak >nul

:: Démarrer Next.js
echo [3/4] Démarrage de Next.js (Frontend)...
cd /d "%~dp0"
start "⚡ NEXT.JS SERVER - NE PAS FERMER" cmd /k "color 0B && title NEXT.JS SERVER && echo. && echo ╔════════════════════════════════════════╗ && echo ║    NEXT.JS SERVER - Port 3000         ║ && echo ║     Gardez cette fenetre ouverte      ║ && echo ╚════════════════════════════════════════╝ && echo. && npm run dev"
timeout /t 10 /nobreak >nul

:: Ouvrir le navigateur
echo [4/4] Ouverture du navigateur...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║  ✅ TUNILINK EST DÉMARRÉ !                         ║
echo ║                                                    ║
echo ║  📌 Flask:   http://localhost:5000                 ║
echo ║  📌 Next.js: http://localhost:3000                 ║
echo ║                                                    ║
echo ║  ⚠️  IMPORTANT:                                     ║
echo ║  - Gardez les 2 fenêtres CMD ouvertes             ║
echo ║  - Le navigateur devrait s'ouvrir automatiquement ║
echo ║  - Si le site ne charge pas, attendez 20 secondes ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
echo (Les serveurs continueront à tourner)
pause >nul
