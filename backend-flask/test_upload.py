#!/usr/bin/env python3
"""
Test complet de l'upload de CV
"""

import requests
import io
import sys

BASE_URL = "http://localhost:5000"

print("\n" + "="*60)
print("TEST UPLOAD CV")
print("="*60)

# 1. Login pour obtenir un token
print("\n1️⃣  LOGIN")
print("-" * 60)
login_data = {
    "email": "test.auth@forstek.tn",
    "password": "Test123!"
}

try:
    response = requests.post(f"{BASE_URL}/api/login", json=login_data, headers={"Origin": "http://localhost:3000"})
    print(f"📥 Status: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ Login échoué: {response.text}")
        sys.exit(1)
    
    print("✅ Login réussi")
    
    # Récupérer le code 2FA de l'utilisateur (on va simuler)
    code = input("🔐 Entrez le code 2FA de la console Flask: ").strip()
    
    # 2. Vérification 2FA
    print("\n2️⃣  VÉRIFICATION 2FA")
    print("-" * 60)
    verify_data = {
        "email": "test.auth@forstek.tn",
        "code": code
    }
    
    response = requests.post(f"{BASE_URL}/api/verify-2fa", json=verify_data, headers={"Origin": "http://localhost:3000"})
    print(f"📥 Status: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ Vérification échouée: {response.text}")
        sys.exit(1)
    
    data = response.json()
    token = data.get('accessToken')
    print(f"✅ Token reçu: {token[:50]}...")
    
    # 3. Test OPTIONS preflight
    print("\n3️⃣  TEST OPTIONS /api/upload")
    print("-" * 60)
    response = requests.options(
        f"{BASE_URL}/api/upload",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "authorization,content-type"
        }
    )
    print(f"📥 Status: {response.status_code}")
    print(f"📥 Headers CORS:")
    for header in ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']:
        value = response.headers.get(header, 'NON DÉFINI')
        print(f"   {header}: {value}")
    
    if response.status_code == 200:
        print("✅ OPTIONS OK")
    else:
        print("❌ OPTIONS échoué")
    
    # 4. Test upload avec un fichier PDF factice
    print("\n4️⃣  TEST UPLOAD CV")
    print("-" * 60)
    
    # Créer un fichier PDF factice
    pdf_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources <<\n/Font <<\n/F1 4 0 R\n>>\n>>\n/MediaBox [0 0 612 792]\n/Contents 5 0 R\n>>\nendobj\n4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Times-Roman\n>>\nendobj\n5 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Test CV) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000262 00000 n\n0000000341 00000 n\ntrailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n437\n%%EOF"
    
    files = {
        'file': ('test_cv.pdf', io.BytesIO(pdf_content), 'application/pdf')
    }
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Origin': 'http://localhost:3000'
    }
    
    response = requests.post(f"{BASE_URL}/api/upload", files=files, headers=headers)
    print(f"📥 Status: {response.status_code}")
    print(f"📥 Response: {response.text}")
    
    if response.status_code == 200:
        print("✅ Upload réussi!")
        data = response.json()
        print(f"📄 Fichier: {data.get('fileName')}")
        print(f"🔗 URL: {data.get('fileUrl')}")
    else:
        print("❌ Upload échoué")
    
    print("\n" + "="*60)
    if response.status_code == 200:
        print("🎉 TOUS LES TESTS PASSENT !")
    else:
        print("❌ ÉCHEC DU TEST")
    print("="*60 + "\n")
    
except Exception as e:
    print(f"❌ Erreur: {e}")
    import traceback
    traceback.print_exc()
