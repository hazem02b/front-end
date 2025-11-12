"""
Script de test complet de l'API Flask
Test les endpoints avec et sans authentification
"""
import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_cors():
    """Test 1: Vérifier si CORS est configuré"""
    print("\n=== TEST 1: CORS OPTIONS ===")
    try:
        response = requests.options(
            f"{BASE_URL}/api/users/me",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "Authorization"
            }
        )
        print(f"Status: {response.status_code}")
        print(f"Headers CORS:")
        for h in ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']:
            print(f"  {h}: {response.headers.get(h, 'NON PRÉSENT')}")
        return response.status_code in [200, 204]
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_register():
    """Test 2: Créer un compte test"""
    print("\n=== TEST 2: REGISTER ===")
    try:
        data = {
            "email": "test.api@test.com",
            "password": "Test123!",
            "name": "Test API",
            "type": "STUDENT"
        }
        response = requests.post(
            f"{BASE_URL}/api/register",
            json=data,
            headers={"Origin": "http://localhost:3000"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 201:
            print("✅ Register réussi")
            return result.get('accessToken')
        elif "already used" in result.get('error', ''):
            print("ℹ️ Compte existe déjà, tentative de login...")
            return test_login()
        return None
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return None

def test_login():
    """Test 3: Login et obtenir le code 2FA"""
    print("\n=== TEST 3: LOGIN ===")
    try:
        data = {
            "email": "test.api@test.com",
            "password": "Test123!"
        }
        response = requests.post(
            f"{BASE_URL}/api/login",
            json=data,
            headers={"Origin": "http://localhost:3000"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✅ Login réussi - Vérifiez la console Flask pour le code 2FA")
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_verify_2fa(code):
    """Test 4: Vérifier le code 2FA"""
    print("\n=== TEST 4: VERIFY 2FA ===")
    try:
        data = {
            "email": "test.api@test.com",
            "code": code
        }
        response = requests.post(
            f"{BASE_URL}/api/verify-2fa",
            json=data,
            headers={"Origin": "http://localhost:3000"}
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✅ 2FA vérifié")
            return result.get('accessToken')
        return None
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return None

def test_users_me_get(token):
    """Test 5: GET /api/users/me"""
    print("\n=== TEST 5: GET /api/users/me ===")
    try:
        response = requests.get(
            f"{BASE_URL}/api/users/me",
            headers={
                "Authorization": f"Bearer {token}",
                "Origin": "http://localhost:3000"
            }
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✅ GET réussi")
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_users_me_put(token):
    """Test 6: PUT /api/users/me (ajouter téléphone)"""
    print("\n=== TEST 6: PUT /api/users/me (téléphone) ===")
    try:
        data = {
            "name": "Test API Updated",
            "phone": "+216 12 345 678"
        }
        response = requests.put(
            f"{BASE_URL}/api/users/me",
            json=data,
            headers={
                "Authorization": f"Bearer {token}",
                "Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            }
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✅ PUT téléphone réussi")
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_upload(token):
    """Test 7: POST /api/upload (CV)"""
    print("\n=== TEST 7: POST /api/upload (CV) ===")
    try:
        # Créer un fichier PDF de test
        test_pdf = b"%PDF-1.4\n%Test PDF\n1 0 obj\n<<>>\nendobj\n%%EOF"
        
        files = {'file': ('test_cv.pdf', test_pdf, 'application/pdf')}
        response = requests.post(
            f"{BASE_URL}/api/upload",
            files=files,
            headers={
                "Authorization": f"Bearer {token}",
                "Origin": "http://localhost:3000"
            }
        )
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✅ Upload CV réussi")
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("🧪 TEST COMPLET DE L'API FLASK")
    print("=" * 60)
    
    # Test 1: CORS
    if not test_cors():
        print("\n⚠️ CORS pourrait ne pas être configuré correctement")
    
    # Test 2 & 3: Register ou Login
    token = test_register()
    if not token:
        if test_login():
            code = input("\n📱 Entrez le code 2FA affiché dans la console Flask: ")
            token = test_verify_2fa(code)
    
    if not token:
        print("\n❌ Impossible d'obtenir un token. Arrêt des tests.")
        exit(1)
    
    print(f"\n🔑 Token obtenu: {token[:20]}...")
    
    # Test 5: GET users/me
    test_users_me_get(token)
    
    # Test 6: PUT users/me (téléphone)
    test_users_me_put(token)
    
    # Test 7: Upload CV
    test_upload(token)
    
    print("\n" + "=" * 60)
    print("✅ TESTS TERMINÉS")
    print("=" * 60)
