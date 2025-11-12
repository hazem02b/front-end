# Backend Flask for Forstek

This folder contains a minimal Flask backend to replace the Next.js API routes.
It uses SQLite (zero-config) with SQLAlchemy, JWT for auth, and a simple file upload endpoint.

Quick start (Windows PowerShell):

1. Copy `.env.example` to `.env` and edit the variables.
2. Run the helper script:

```powershell
cd backend-flask
./run.ps1
```

3. The backend will be available at `http://127.0.0.1:5000`.

Endpoints:
- `POST /api/register`
- `POST /api/login`
- `POST /api/verify-2fa`
- `POST /api/resend-2fa`
- `GET|PUT /api/users/me`
- `POST /api/upload` (multipart/form-data)

Notes:
- To receive real emails configure the `.env` email fields (Gmail app password recommended).
- The backend is intentionally small and readable for local development.
