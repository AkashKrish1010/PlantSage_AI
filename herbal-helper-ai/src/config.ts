// ML backend (VanaVaidhya/ml server) — run: python ml/server.py
// Override in .env: VITE_ML_SERVER_URL=http://localhost:8000
export const ML_SERVER_URL =
  import.meta.env.VITE_ML_SERVER_URL ?? "http://localhost:8000";

export const WEB_CLIENT_SECRET =
  import.meta.env.VITE_WEB_CLIENT_SECRET ?? "plantsage_web_bypass_key_2026";
