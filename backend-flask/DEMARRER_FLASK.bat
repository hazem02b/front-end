@echo off
echo ========================================
echo   DEMARRAGE FLASK FORSTEK
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Arret des anciens processus Flask...
taskkill /F /IM python.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/2] Demarrage de Flask...
echo.
echo ========================================
echo   Flask sur http://127.0.0.1:5000
echo   Mode: Console (codes 2FA visibles)
echo ========================================
echo.

.\.venv\Scripts\python.exe run_flask.py

pause
