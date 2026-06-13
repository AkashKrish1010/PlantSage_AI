import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect to target path or home
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row relative"
      style={{ backgroundColor: "var(--color-immersive-black)" }}
    >
      {/* ── Unveil Curtain Mask ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 bg-[#030803] pointer-events-none"
      />

      {/* ── Panel Left: Form ── */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(12, 31, 12, 0.45) 0%, rgba(3, 8, 3, 0.95) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md z-10"
        >
          {/* Header */}
          <span className="adaline-micro block mb-3" style={{ color: "var(--color-moss-veil)" }}>Welcome Back</span>
          <h1
            className="adaline-heading mb-6"
            style={{ fontSize: "38px", letterSpacing: "-1.2px", color: "var(--color-cream-paper)" }}
          >
            Access your journal
          </h1>
          <p
            className="adaline-body-sm mb-8"
            style={{ color: "rgba(251,253,246,0.6)", lineHeight: "1.5" }}
          >
            Review your saved gardens, check plant identification history, and explore medicinal flora recipes.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg flex items-start gap-3 border"
                style={{
                  backgroundColor: "rgba(74,50,18,0.2)",
                  borderColor: "rgba(251,253,246,0.15)",
                  color: "var(--color-cream-paper)",
                }}
              >
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--color-moss-veil)" }} />
                <div>
                  <span className="adaline-micro block mb-1" style={{ color: "var(--color-moss-veil)" }}>Attention</span>
                  <p className="adaline-body-sm leading-relaxed" style={{ fontSize: "13px" }}>
                    {error}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="adaline-micro block text-[11px] font-semibold" style={{ color: "rgba(251,253,246,0.85)" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 text-cream-paper" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cream-paper/30"
                  style={{
                    backgroundColor: "rgba(251, 253, 246, 0.04)",
                    border: "1px solid rgba(251, 253, 246, 0.15)",
                    borderRadius: "20px",
                    fontFamily: "var(--font-akkurat)",
                    color: "var(--color-cream-paper)",
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="adaline-micro block text-[11px] font-semibold" style={{ color: "rgba(251,253,246,0.85)" }}>
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 text-cream-paper" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-cream-paper/30"
                  style={{
                    backgroundColor: "rgba(251, 253, 246, 0.04)",
                    border: "1px solid rgba(251, 253, 246, 0.15)",
                    borderRadius: "20px",
                    fontFamily: "var(--font-akkurat)",
                    color: "var(--color-cream-paper)",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-cream-paper)" }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 opacity-60 text-cream-paper" /> : <Eye className="h-4 w-4 opacity-60 text-cream-paper" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="adaline-btn-primary w-full justify-center py-3 mt-2 font-bold"
              style={{ borderRadius: "20px" }}
            >
              {submitting ? (
                <div className="h-5 w-5 border-2 border-cream-paper border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle link */}
          <div className="mt-8 text-center">
            <span
              className="adaline-body-sm mr-2"
              style={{ color: "rgba(251,253,246,0.5)" }}
            >
              New to PlantSage?
            </span>
            <Link
              to="/signup"
              className="adaline-body-sm font-bold underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-moss-veil)" }}
            >
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Panel Right: Artwork ── */}
      <div className="hidden md:block w-1/2 relative overflow-hidden bg-zinc-900 select-none">
        <img
          src="/signup-image.jpg"
          alt="Contemplative nature"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        
        {/* Adaline Glassmorphic caption box */}
        <div className="absolute bottom-12 left-12 right-12 p-8 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <span className="text-[11px] tracking-wider uppercase font-mono text-white/60 block mb-2">
            AI + Ancient Ayurveda
          </span>
          <h3 className="text-xl font-normal text-white mb-3 tracking-tight" style={{ fontFamily: "var(--font-akkurat)" }}>
            Contemplative botanical journal
          </h3>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            Our neural classification maps more than 70 native Indian herbs with AYUSH-verified safety frameworks, cataloging centuries of botanical tradition.
          </p>
        </div>
      </div>
    </div>
  );
}
