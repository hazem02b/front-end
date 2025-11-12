@echo off
echo ========================================
echo   REDEMARRAGE COMPLET TUNILINK
echo ========================================
echo.

echo [1/4] Arret de tous les processus...
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
timeout /t 3 /nobreak >nul

echo [2/4] Demarrage de Flask...
cd /d "%~dp0backend-flask"
start "Flask Server" cmd /k ".\.venv\Scripts\python.exe app.py"
timeout /t 5 /nobreak

echo [3/4] Demarrage de Next.js...
cd /d "%~dp0"
start "Next.js Server" cmd /k "npm run dev"
timeout /t 8 /nobreak

echo [4/4] Verification...
echo.
echo ========================================
echo   SERVEURS DEMARRES !
echo ========================================
echo.
echo Flask:   http://localhost:5000
echo Next.js: http://localhost:3000
echo.
echo IMPORTANT:
echo - Gardez les 2 fenetres CMD ouvertes
echo - Allez sur http://localhost:3000 (PAS 127.0.0.1)
echo - Reconnectez-vous si necessaire
echo.
pause
