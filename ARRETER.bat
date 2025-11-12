@echo off
chcp 65001 >nul
color 0C
title Arrêt TuniLink

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║          🛑 ARRÊT TUNILINK                         ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [1/2] Arrêt de Flask (Python)...
taskkill /F /IM python.exe >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Flask arrêté
) else (
    echo ℹ️  Flask n'était pas démarré
)

echo.
echo [2/2] Arrêt de Next.js (Node)...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Next.js arrêté
) else (
    echo ℹ️  Next.js n'était pas démarré
)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║  ✅ TUNILINK EST ARRÊTÉ                            ║
echo ║                                                    ║
echo ║  Pour redémarrer, lancez DEMARRER.bat             ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
timeout /t 3
