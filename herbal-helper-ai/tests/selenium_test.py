import os
import sys
import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

TARGET_URL = "https://plant-sage-ai-web.vercel.app"

def run_tests():
    print("🚀 Starting Selenium E2E Automation tests...")
    print(f"🌍 Target Application URL: {TARGET_URL}")

    # Set up headless Chrome options for CI/CD environment
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    driver = None
    try:
        driver = webdriver.Chrome(options=chrome_options)
        wait = WebDriverWait(driver, 15)
        
        # Unique email to avoid registration collision on the live system
        test_email = f"selenium_tester_{random.randint(100000, 999999)}_{int(time.time())}@example.com"
        test_password = "securepassword123!"
        test_name = "Selenium Tester"

        # ----------------- Test 1: Signup Flow -----------------
        print("\n📝 Test 1: Signup Flow")
        driver.get(f"{TARGET_URL}/signup")
        print("   Navigated to signup page successfully.")
        
        # Locate fields with resilient selector fallbacks (in case IDs are not live yet)
        try:
            name_input = wait.until(EC.presence_of_element_located((By.ID, "signup-name")))
        except Exception:
            name_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Elara Varma' or contains(@placeholder, 'Name')]")))

        try:
            email_input = driver.find_element(By.ID, "signup-email")
        except Exception:
            email_input = driver.find_element(By.XPATH, "//input[@type='email']")

        try:
            password_input = driver.find_element(By.ID, "signup-password")
        except Exception:
            password_input = driver.find_element(By.XPATH, "//input[@type='password']")

        try:
            submit_btn = driver.find_element(By.ID, "signup-submit")
        except Exception:
            submit_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
        
        # Fill inputs
        name_input.send_keys(test_name)
        email_input.send_keys(test_email)
        password_input.send_keys(test_password)
        print(f"   Filled signup fields (Email: {test_email}).")
        
        # Click Sign Up
        submit_btn.click()
        print("   Clicked Signup submit button.")
        
        # Wait for redirect to home
        wait.until(lambda d: d.current_url == f"{TARGET_URL}/")
        print("   ✅ Signup completed. Redirected to homepage successfully.")
        
        # Clear storage/session to test Login
        driver.execute_script("window.localStorage.clear();")
        print("   Cleared local storage session.")
        
        # ----------------- Test 2: Login Flow -----------------
        print("\n🔑 Test 2: Login Flow")
        driver.get(f"{TARGET_URL}/login")
        print("   Navigated to login page successfully.")
        
        try:
            login_email = wait.until(EC.presence_of_element_located((By.ID, "login-email")))
        except Exception:
            login_email = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='email']")))

        try:
            login_pass = driver.find_element(By.ID, "login-password")
        except Exception:
            login_pass = driver.find_element(By.XPATH, "//input[@type='password']")

        try:
            login_submit = driver.find_element(By.ID, "login-submit")
        except Exception:
            login_submit = driver.find_element(By.XPATH, "//button[@type='submit']")
        
        # Fill inputs
        login_email.send_keys(test_email)
        login_pass.send_keys(test_password)
        print("   Filled login credentials.")
        
        # Click Sign In
        login_submit.click()
        print("   Clicked Login submit button.")
        
        # Wait for redirect to home
        wait.until(lambda d: d.current_url == f"{TARGET_URL}/")
        print("   ✅ Login completed. Redirected to homepage successfully.")
        
        print("\n🎉 ALL SELENIUM INTEGRATION TESTS PASSED SUCCESSFULLY!")
        
    except Exception as e:
        print(f"\n❌ Selenium automation execution failed: {e}")
        sys.exit(1)
    finally:
        if driver:
            driver.quit()

if __name__ == "__main__":
    run_tests()
