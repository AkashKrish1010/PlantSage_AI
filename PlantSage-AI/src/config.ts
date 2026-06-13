// ─── PlantSage AI App Configuration ───────────────────────────────
//
// The server URL is configured via the root .env file.
// Set  EXPO_PUBLIC_API_URL  in .env to point at your backend:
//
//   • Same-machine Android Emulator  →  http://10.0.2.2:8000
//   • Real device (same WiFi)        →  http://<YOUR-PC-LAN-IP>:8000
//   • iOS Simulator                  →  http://localhost:8000
//   • Deployed to Render / Railway   →  https://your-app.onrender.com
//
// NOTE: The Gemini API key lives in ml/.env (backend only).
//       Do NOT add it here — it would be exposed in the app bundle.

// 🖥️  Backend server URL — reads from .env → EXPO_PUBLIC_API_URL
export const ML_SERVER_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.102:8000";
