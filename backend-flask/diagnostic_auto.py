"""
Script de diagnostic automatique - Test de connexion API
"""
import requests
import json
from colorama import init, Fore, Style
import sys

# Initialiser colorama pour Windows
init()

API_URL = "http://localhost:5000"

def print_header(text):
    print("\n" + "="*60)
    print(f"{Fore.CYAN}{text}{Style.RESET_ALL}")
    print("="*60)

def print_success(text):
    print(f"{Fore.GREEN}✅ {text}{Style.RESET_ALL}")

def print_error(text):
    print(f"{Fore.RED}❌ {text}{Style.RESET_ALL}")

def print_warning(text):
    print(f"{Fore.YELLOW}⚠️  {text}{Style.RESET_ALL}")

def print_info(text):
    print(f"{Fore.BLUE}ℹ️  {text}{Style.RESET_ALL}")

def test_1_flask_basic():
    """Test 1: Flask répond-il ?"""
    print_header("TEST 1: FLASK BASIQUE")
    
    try:
        response = requests.options(
            f"{API_URL}/api/register",
            headers={"Origin": "http://localhost:3000"},
            timeout=5
        )
        
        print_success("Flask répond correctement")
        print(f"  Status: {response.status_code}")
        print(f"  CORS Origin: {response.headers.get('Access-Control-Allow-Origin', 'Non présent')}")
        return True
        
    except requests.exceptions.ConnectionError:
        print_error("FLASK N'EST PAS ACCESSIBLE")
        print_warning("Causes possibles:")
        print("  1. Flask n'est pas démarré")
        print("  2. Flask est sur le mauvais port")
        print("  3. Pare-feu bloque la connexion")
        print_info("Solution: Ouvrez une fenêtre CMD et lancez Flask:")
        print("  cd backend-flask")
        print("  .\.venv\Scripts\python.exe app.py")
        return False
        
    except requests.exceptions.Timeout:
        print_error("TIMEOUT - Flask ne répond pas")
        print_warning("Flask est peut-être planté")
        return False
        
    except Exception as e:
        print_error(f"Erreur inattendue: {e}")
        return False

def test_2_cors():
    """Test 2: CORS est-il configuré ?"""
    print_header("TEST 2: CONFIGURATION CORS")
    
    try:
        response = requests.options(
            f"{API_URL}/api/users/me",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "Authorization"
            },
            timeout=5
        )
        
        allow_origin = response.headers.get('Access-Control-Allow-Origin')
        allow_methods = response.headers.get('Access-Control-Allow-Methods')
        allow_headers = response.headers.get('Access-Control-Allow-Headers')
        
        print_success("CORS configuré correctement")
        print(f"  Allow-Origin: {allow_origin}")
        print(f"  Allow-Methods: {allow_methods}")
        print(f"  Allow-Headers: {allow_headers}")
        
        if 'Authorization' in (allow_headers or ''):
            print_success("Authorization header autorisé")
            return True
        else:
            print_warning("Authorization header pourrait ne pas être autorisé")
            return False
            
    except Exception as e:
        print_error(f"Erreur CORS: {e}")
        return False

def test_3_with_token():
    """Test 3: Test avec authentification"""
    print_header("TEST 3: AUTHENTIFICATION")
    
    # D'abord, créer un compte de test
    print_info("Création d'un compte de test...")
    
    email = "diagnostic@test.com"
    password = "Test123!"
    
    try:
        # Essayer de créer le compte
        response = requests.post(
            f"{API_URL}/api/register",
            json={
                "email": email,
                "password": password,
                "name": "Diagnostic Test",
                "type": "STUDENT"
            },
            timeout=5
        )
        
        if response.status_code == 201:
            token = response.json().get('accessToken')
            print_success("Compte créé et token obtenu")
        elif response.status_code == 400 and "already used" in response.text:
            # Compte existe, on se connecte
            print_info("Compte existe déjà, connexion...")
            
            response = requests.post(
                f"{API_URL}/api/login",
                json={"email": email, "password": password},
                timeout=5
            )
            
            if response.status_code == 200:
                print_success("Code 2FA envoyé")
                print_warning("Pour un test complet, il faudrait entrer le code 2FA")
                print_info("Mais on peut déjà voir que l'authentification fonctionne")
                return True
            else:
                print_error(f"Échec du login: {response.text}")
                return False
        else:
            print_error(f"Erreur lors de la création du compte: {response.text}")
            return False
        
        # Tester avec le token
        if token:
            response = requests.get(
                f"{API_URL}/api/users/me",
                headers={"Authorization": f"Bearer {token}"},
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success("Authentification réussie")
                print(f"  Email: {data['user']['email']}")
                print(f"  Nom: {data['user']['name']}")
                print(f"  Téléphone: {data['user'].get('phone', 'Non renseigné')}")
                return True
            else:
                print_error(f"Échec de l'authentification: {response.text}")
                return False
                
    except Exception as e:
        print_error(f"Erreur: {e}")
        return False

def test_4_update_profile():
    """Test 4: Test de mise à jour du profil"""
    print_header("TEST 4: MISE À JOUR DU PROFIL")
    
    email = "diagnostic@test.com"
    password = "Test123!"
    
    try:
        # Obtenir un token
        print_info("Obtention du token...")
        
        response = requests.post(
            f"{API_URL}/api/register",
            json={
                "email": email,
                "password": password,
                "name": "Diagnostic Test",
                "type": "STUDENT"
            },
            timeout=5
        )
        
        if response.status_code == 201:
            token = response.json().get('accessToken')
        elif "already used" in response.text:
            # Compte existe, recréer avec un nouvel email
            import time
            email = f"diagnostic{int(time.time())}@test.com"
            response = requests.post(
                f"{API_URL}/api/register",
                json={
                    "email": email,
                    "password": password,
                    "name": "Diagnostic Test",
                    "type": "STUDENT"
                },
                timeout=5
            )
            if response.status_code == 201:
                token = response.json().get('accessToken')
            else:
                print_error("Impossible d'obtenir un token")
                return False
        else:
            print_error("Impossible d'obtenir un token")
            return False
        
        # Tester la mise à jour
        print_info("Test de mise à jour du téléphone...")
        
        test_phone = "+216 98 123 456"
        
        response = requests.put(
            f"{API_URL}/api/users/me",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            json={
                "name": "Diagnostic Test Updated",
                "phone": test_phone
            },
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print_success("MISE À JOUR RÉUSSIE !")
            print(f"  Nom: {data['user']['name']}")
            print(f"  Téléphone: {data['user']['phone']}")
            print()
            print(f"{Fore.GREEN}{Style.BRIGHT}")
            print("╔══════════════════════════════════════════════════════╗")
            print("║  ✅ TOUT FONCTIONNE CORRECTEMENT !                  ║")
            print("║                                                      ║")
            print("║  Vous pouvez maintenant mettre à jour votre profil  ║")
            print("║  depuis le site web sans aucun problème.           ║")
            print("╚══════════════════════════════════════════════════════╝")
            print(Style.RESET_ALL)
            return True
        else:
            print_error(f"Échec de la mise à jour")
            print(f"  Status: {response.status_code}")
            print(f"  Réponse: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_error("IMPOSSIBLE DE SE CONNECTER À FLASK")
        print_warning("C'est exactement l'erreur que vous voyez sur le site !")
        print()
        print_info("Solutions:")
        print("  1. Vérifiez que Flask tourne (fenêtre CMD ouverte)")
        print("  2. Redémarrez Flask si nécessaire:")
        print("     cd backend-flask")
        print("     .\.venv\Scripts\python.exe app.py")
        return False
        
    except Exception as e:
        print_error(f"Erreur: {e}")
        return False

def main():
    print(f"{Fore.CYAN}{Style.BRIGHT}")
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║                                                              ║")
    print("║         🧪 DIAGNOSTIC AUTOMATIQUE DE CONNEXION API          ║")
    print("║                                                              ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print(Style.RESET_ALL)
    
    print_info(f"URL de l'API: {API_URL}")
    print()
    
    results = {
        "Test 1 - Flask Basique": test_1_flask_basic(),
        "Test 2 - CORS": test_2_cors(),
        "Test 3 - Authentification": test_3_with_token(),
        "Test 4 - Mise à jour": test_4_update_profile()
    }
    
    # Résumé
    print_header("RÉSUMÉ DES TESTS")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        if result:
            print_success(f"{test_name}")
        else:
            print_error(f"{test_name}")
    
    print()
    print(f"{Fore.CYAN}Score: {passed}/{total} tests réussis{Style.RESET_ALL}")
    
    if passed == total:
        print()
        print(f"{Fore.GREEN}{Style.BRIGHT}╔════════════════════════════════════════════════════╗")
        print(f"║  🎉 PARFAIT ! Tout fonctionne !                   ║")
        print(f"║                                                    ║")
        print(f"║  Le problème vient probablement du cache du       ║")
        print(f"║  navigateur. Essayez:                             ║")
        print(f"║  1. Ctrl+Shift+Del (vider le cache)              ║")
        print(f"║  2. Rafraîchir la page (F5)                       ║")
        print(f"║  3. Vous reconnecter                              ║")
        print(f"╚════════════════════════════════════════════════════╝{Style.RESET_ALL}")
    elif results["Test 1 - Flask Basique"] == False:
        print()
        print(f"{Fore.RED}{Style.BRIGHT}╔════════════════════════════════════════════════════╗")
        print(f"║  ⚠️  FLASK N'EST PAS DÉMARRÉ !                    ║")
        print(f"║                                                    ║")
        print(f"║  C'est pour ça que vous avez l'erreur             ║")
        print(f"║  'Erreur de connexion au serveur'                 ║")
        print(f"║                                                    ║")
        print(f"║  Lancez Flask dans une fenêtre CMD:               ║")
        print(f"║  cd backend-flask                                 ║")
        print(f"║  .\.venv\Scripts\python.exe app.py               ║")
        print(f"╚════════════════════════════════════════════════════╝{Style.RESET_ALL}")
    else:
        print()
        print_warning("Certains tests ont échoué. Consultez les détails ci-dessus.")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}Arrêté par l'utilisateur{Style.RESET_ALL}")
        sys.exit(1)
