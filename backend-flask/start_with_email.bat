@echo off
echo ============================================
echo    DEMARRAGE FLASK AVEC CONFIG EMAIL
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Verification du fichier .env...
if not exist ".env" (
    echo ERREUR: Fichier .env introuvable!
    pause
    exit /b 1
)
echo    OK - Fichier .env trouve

echo.
echo [2/3] Verification de la configuration email...
findstr /C:"EMAIL_USER=hazembellili80@gmail.com" .env >nul
if errorlevel 1 (
    echo    ATTENTION: EMAIL_USER non configure
) else (
    echo    OK - EMAIL_USER configure
)

findstr /C:"EMAIL_HOST=smtp-relay.brevo.com" .env >nul
if errorlevel 1 (
    echo    ATTENTION: EMAIL_HOST non configure
) else (
    echo    OK - EMAIL_HOST configure
)

echo.
echo [3/3] Demarrage de Flask...
echo.
echo ============================================
echo    Flask demarre sur http://127.0.0.1:5000
echo    Les emails 2FA seront envoyes via Brevo
echo ============================================
echo.

.\.venv\Scripts\python.exe app.py

pause
