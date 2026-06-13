import { Outlet, Link, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import { Leaf } from "lucide-react";

export default function AppLayout() {
  const location = useLocation();
  const hideFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-cream-paper)" }}>
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Adaline Footer ─────────────────────────────── */}
      {!hideFooter && (
        <footer
        className="relative pt-10 pb-4 overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: "30vh",
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.85)), url('https://static.vecteezy.com/system/resources/thumbnails/075/463/316/small/dark-leaves-stand-against-a-black-background-photo.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTop: "1px solid rgba(251, 253, 246, 0.1)",
        }}
      >
        <div className="page-wrap max-w-[1200px] mx-auto px-8 w-full flex-1 flex flex-col justify-between gap-12 z-10">
          
          {/* Top section: Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Col 1: Brand details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5" style={{ color: "var(--color-moss-veil)" }} />
                <span
                  className="text-base font-bold text-cream-paper"
                  style={{ fontFamily: "var(--font-akkurat)", letterSpacing: "-0.04em" }}
                >
                  PlantSage AI
                </span>
              </div>
              <p
                style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", lineHeight: "1.5", color: "rgba(251, 253, 246, 0.6)" }}
                className="max-w-[200px]"
              >
                Bridging ancient Ayurvedic wisdom with modern Artificial Intelligence for holistic wellness.
              </p>
            </div>

            {/* Col 2: Core Platform Links */}
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-moss-veil)" }}>
                Platform
              </p>
              <nav className="flex flex-col gap-2">
                {[
                  { to: "/", label: "Home" },
                  { to: "/identify", label: "Identify Plant" },
                  { to: "/search", label: "Symptom Search" },
                  { to: "/encyclopedia", label: "Ayur-Encyclopedia" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="transition-colors duration-150 text-cream-paper/70 hover:text-cream-paper"
                    style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.02em" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Resources & Organization Links */}
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-moss-veil)" }}>
                Ministry & Research
              </p>
              <nav className="flex flex-col gap-2">
                <a
                  href="https://ayush.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 text-cream-paper/70 hover:text-cream-paper"
                  style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.02em" }}
                >
                  Ministry of AYUSH
                </a>
                <a
                  href="https://www.ccras.res.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 text-cream-paper/70 hover:text-cream-paper"
                  style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.02em" }}
                >
                  CCRAS Research
                </a>
                <Link
                  to="/about"
                  className="transition-colors duration-150 text-cream-paper/70 hover:text-cream-paper"
                  style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.02em" }}
                >
                  About the Project
                </Link>
                <Link
                  to="/garden"
                  className="transition-colors duration-150 text-cream-paper/70 hover:text-cream-paper"
                  style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.02em" }}
                >
                  My Herbal Garden
                </Link>
              </nav>
            </div>

            {/* Col 4: Safety & Verification */}
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-moss-veil)" }}>
                Verified Science
              </p>
              <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", lineHeight: "1.5", color: "rgba(251, 253, 246, 0.5)" }}>
                All remedies are cross-checked against standard AYUSH databases and validated by qualified botanists.
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-moss-veil uppercase tracking-widest font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live AI Pipeline Active
              </div>
            </div>
          </div>

          {/* Bottom section: Legal & Copyright */}
          <div className="pt-8 border-t border-cream-paper/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "rgba(251, 253, 246, 0.4)" }}>
              &copy; {new Date().getFullYear()} PlantSage AI. Project SIH1555. Developed for the Ministry of AYUSH.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "var(--color-eucalyptus)" }}>
              SIH1555 · Indian Pharmacopoeia standards · v1.0
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
