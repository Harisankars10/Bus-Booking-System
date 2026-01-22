"""Quick test script to verify backend is working"""
import requests
import sys

try:
    response = requests.get("http://localhost:5000/api/buses", timeout=5)
    if response.status_code == 200:
        print("✅ Backend is running successfully!")
        print(f"Response: {response.json()}")
    else:
        print(f"⚠️ Backend responded with status code: {response.status_code}")
except requests.exceptions.ConnectionError:
    print("❌ Cannot connect to backend. Make sure:")
    print("   1. Backend is running (python run.py)")
    print("   2. MySQL server is started")
    print("   3. Database 'busdb' exists")
except Exception as e:
    print(f"❌ Error: {e}")






