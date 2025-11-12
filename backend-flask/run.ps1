Write-Host "DÉMARRAGE DU BACKEND FLASK" -ForegroundColor Cyan
Set-Location (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)
Write-Host "Création/Activation d'un virtualenv (si absent)" -ForegroundColor Green
if (-not (Test-Path .venv)) {
  python -m venv .venv
}

.\.venv\Scripts\Activate.ps1
Write-Host "Installation des dépendances" -ForegroundColor Green
pip install -r requirements.txt

Write-Host "Démarrage du serveur Flask (http://127.0.0.1:5000)" -ForegroundColor Green
$env:DATABASE_URL = $env:DATABASE_URL
python app.py
