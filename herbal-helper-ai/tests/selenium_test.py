import os
import sys
import time
import json
import threading
import http.server
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ----------------- 1. MOCK SERVERS SETUP -----------------

class ApiHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress logging server requests to stdout for cleaner output
        pass

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Respond with valid mock user session details
        response = {
            "access_token": "mock-jwt-access-token-xyz-123",
            "refresh_token": "mock-jwt-refresh-token-abc-789",
            "token_type": "Bearer",
            "user": {
                "id": "mock-user-id-999",
                "name": "Selenium Tester",
                "email": "selenium_tester@example.com"
            }
        }
        self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        if self.path.endswith('/auth/me'):
            response = {
                "id": "mock-user-id-999",
                "name": "Selenium Tester",
                "email": "selenium_tester@example.com"
            }
        else:
            response = {"status": "ok", "model": "mock-mode"}
            
        self.wfile.write(json.dumps(response).encode('utf-8'))


class WebHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def translate_path(self, path):
        # Extract clean path without query params / hash router parts
        clean_path = path.split('?')[0].split('#')[0]
        # Serve relative to the built vite dist folder
        tests_dir = os.path.dirname(os.path.abspath(__file__))
        base_dir = os.path.abspath(os.path.join(tests_dir, '..', 'dist'))
        
        local_path = os.path.join(base_dir, clean_path.lstrip('/'))
        if os.path.isdir(local_path):
            local_path = os.path.join(local_path, 'index.html')
        elif not os.path.exists(local_path):
            # Fallback to index.html for React Router single page application routing
            local_path = os.path.join(base_dir, 'index.html')
        return local_path


def start_server(port, handler_class):
    server = http.server.HTTPServer(('127.0.0.1', port), handler_class)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server

# ----------------- 2. RUN TESTS -----------------

def run_tests():
    print("🚀 Starting Selenium E2E Automation tests...")
    
    # 1. Start mock servers
    api_server = start_server(8000, ApiHandler)
    web_server = start_server(8080, WebHandler)
    print("✅ Local SPA Server live on http://localhost:8080")
    print("✅ Mock Auth API Server live on http://localhost:8000")

    # Check if we are in CI or headless environment
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    driver = None
    try:
        # Initializing Chrome Driver
        driver = webdriver.Chrome(options=chrome_options)
        wait = WebDriverWait(driver, 10)
        
        # Test 1: Navigation and Signup Page
        print("\n📝 Test 1: Signup Flow")
        driver.get("http://localhost:8080/signup")
        print("   Navigated to signup page successfully.")
        
        # Locate elements
        name_input = wait.until(EC.presence_of_element_located((By.ID, "signup-name")))
        email_input = driver.find_element(By.ID, "signup-email")
        password_input = driver.find_element(By.ID, "signup-password")
        submit_btn = driver.find_element(By.ID, "signup-submit")
        
        # Fill inputs
        name_input.send_keys("Selenium Tester")
        email_input.send_keys("selenium_tester@example.com")
        password_input.send_keys("securepassword123")
        print("   Filled signup input fields.")
        
        # Click Sign Up
        submit_btn.click()
        print("   Clicked Signup submit button.")
        
        # Wait for redirect to home
        wait.until(lambda d: d.current_url == "http://localhost:8080/")
        print("   ✅ Signup completed. Redirected to homepage successfully.")
        
        # Clear storage/session to test Login
        driver.execute_script("window.localStorage.clear();")
        
        # Test 2: Login Page
        print("\n🔑 Test 2: Login Flow")
        driver.get("http://localhost:8080/login")
        print("   Navigated to login page successfully.")
        
        login_email = wait.until(EC.presence_of_element_located((By.ID, "login-email")))
        login_pass = driver.find_element(By.ID, "login-password")
        login_submit = driver.find_element(By.ID, "login-submit")
        
        login_email.send_keys("selenium_tester@example.com")
        login_pass.send_keys("securepassword123")
        print("   Filled login input fields.")
        
        login_submit.click()
        print("   Clicked Login submit button.")
        
        wait.until(lambda d: d.current_url == "http://localhost:8080/")
        print("   ✅ Login completed. Redirected to homepage successfully.")
        
        print("\n🎉 ALL SELENIUM INTEGRATION TESTS PASSED SUCCESSFULLY!")
        
    except Exception as e:
        print(f"\n❌ Selenium automation execution failed: {e}")
        sys.exit(1)
    finally:
        if driver:
            driver.quit()
        api_server.shutdown()
        web_server.shutdown()
        print("🛑 Mock servers shut down successfully.")

if __name__ == "__main__":
    run_tests()
