import { NavLink, Link, useLocation } from "react-router-dom";
import { Camera, Search, Flower2, MapPin, BookOpen, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/identify",        label: "Identify",     icon: Camera  },
  { to: "/search",          label: "Search",        icon: Search  },
  { to: "/encyclopedia",    label: "Encyclopedia",  icon: BookOpen },
  { to: "/garden",          label: "Garden",        icon: Flower2 },
  { to: "/saved-locations", label: "Saved",         icon: MapPin  },
  { to: "/about",           label: "About",         icon: BookOpen },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [useLightText, setUseLightText] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  const isOverlayHeader = isHome || isAuthPage;

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      setUseLightText(isAuthPage);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobileViewport = window.innerWidth <= 768;
      
      if (isMobileViewport) {
        setIsScrolled(scrollY > 80);
        setUseLightText(false);
        return;
      }

      // Check DOM sections to determine transparency and link color
      const howItWorksEl = document.getElementById("how-it-works-section");
      const ctaBannerEl = document.getElementById("cta-banner-section");
      
      const heroEnd = window.innerHeight * 2.8;
      
      let transparent = false;
      let lightText = false;

      // 1. Hero: transparent with dark text
      if (scrollY <= heroEnd) {
        transparent = true;
        lightText = false;
      }

      // 2. How It Works: transparent with light text
      if (howItWorksEl) {
        const top = howItWorksEl.offsetTop;
        const bottom = top + howItWorksEl.offsetHeight;
        if (scrollY >= top - 60 && scrollY < bottom - 60) {
          transparent = true;
          lightText = true;
        }
      }

      // 3. CTA Banner & Footer: transparent with light text
      if (ctaBannerEl) {
        const top = ctaBannerEl.offsetTop;
        if (scrollY >= top - 60) {
          transparent = true;
          lightText = true;
        }
      }

      setIsScrolled(!transparent);
      setUseLightText(lightText);
    };

    // Initialize state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome, isAuthPage]);

  const isTransparent = (isHome && !isScrolled) || isAuthPage;

  return (
    <header
      className={`${isOverlayHeader ? "fixed left-0 right-0" : "sticky"} top-0 z-50 animate-fade-in transition-all duration-300 ease-in-out`}
      style={{
        backgroundColor: isTransparent ? "transparent" : "var(--color-cream-paper)",
        borderBottom: isTransparent ? "1px solid transparent" : "1px solid var(--color-lichen)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-8 h-14 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 group"
          style={{ textDecoration: "none" }}
        >
          <span
            className="font-bold tracking-tight transition-colors duration-300"
            style={{
              fontFamily: "var(--font-akkurat)",
              fontSize: "15px",
              letterSpacing: "-0.04em",
              color: useLightText ? "var(--color-cream-paper)" : "var(--color-botanical-ink)"
            }}
          >
            PlantSage
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => {
                const baseClasses = "transition-all duration-300 px-3 py-1.5 text-sm font-semibold";
                if (useLightText) {
                  return `${baseClasses} ${
                    isActive
                      ? "text-cream-paper underline underline-offset-4 decoration-1"
                      : "text-cream-paper/60 hover:text-cream-paper"
                  }`;
                } else {
                  return `${baseClasses} ${
                    isActive
                      ? "text-botanical-ink underline underline-offset-4 decoration-1"
                      : "text-botanical-ink/50 hover:text-botanical-ink"
                  }`;
                }
              }}
              style={{
                fontFamily: "var(--font-akkurat)",
                letterSpacing: "-0.04em",
                borderRadius: "var(--radius-nav)"
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA & User Session ── */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              {/* User profile capsule */}
              <div
                className={`flex items-center gap-2 px-3 py-1 border transition-all duration-300 ${
                  useLightText
                    ? "border-cream-paper/20 bg-cream-paper/5"
                    : "border-lichen bg-sage-mist/40"
                }`}
                style={{ borderRadius: "20px" }}
              >
                <User className={`h-3.5 w-3.5 opacity-60 transition-colors duration-300 ${useLightText ? "text-cream-paper" : "text-botanical-ink"}`} />
                <span
                  className="adaline-micro text-[10px] transition-colors duration-300"
                  style={{ textTransform: "none", color: useLightText ? "var(--color-cream-paper)" : "var(--color-botanical-ink)" }}
                >
                  {user.name.split(" ")[0]}
                </span>
              </div>

              {/* Log out action */}
              <button
                onClick={() => logout()}
                className="transition-all duration-300 hover:opacity-75 inline-flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-akkurat)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: useLightText ? "var(--color-cream-paper)" : "var(--color-botanical-ink)",
                  opacity: 0.6
                }}
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 rounded-button font-akkurat font-bold tracking-[-0.56px] border transition-all duration-300 ${
                  useLightText
                    ? "border-cream-paper text-cream-paper hover:bg-cream-paper/15"
                    : "border-botanical-ink text-botanical-ink hover:bg-sage-mist"
                }`}
                style={{ fontSize: "12px", padding: "6px 16px" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="transition-colors hover:opacity-75 text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-akkurat)",
                  color: useLightText ? "var(--color-cream-paper)" : "var(--color-botanical-ink)"
                }}
              >
                Create Account
              </Link>
            </div>
          )}

          <Link
            to="/identify"
            className="adaline-btn-primary hidden md:inline-flex"
            style={{ fontSize: "13px", padding: "8px 20px" }}
          >
            <Camera className="h-3.5 w-3.5" />
            Identify Plant
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-nav transition-colors duration-300"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: useLightText ? "var(--color-cream-paper)" : "var(--color-botanical-ink)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "var(--color-cream-paper)", borderColor: "var(--color-lichen)" }}
        >
          <nav className="max-w-[1200px] mx-auto px-8 py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? "bg-sage-mist" : "hover:bg-sage-mist/50"
                  }`
                }
                style={{ fontFamily: "var(--font-akkurat)", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}
              >
                <Icon className="h-4 w-4 opacity-60" />
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="border-t border-lichen my-2 pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs opacity-60" style={{ fontFamily: "var(--font-akkurat)" }}>
                  <User className="h-4 w-4" />
                  <span>Logged in as: {user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-sage-mist/50 text-left"
                  style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)" }}
                >
                  <LogOut className="h-4 w-4 opacity-60" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-lichen my-2 pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-sage-mist/50"
                  style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)" }}
                >
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-sage-mist/50"
                  style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)" }}
                >
                  <span>Create Account</span>
                </Link>
              </div>
            )}

            <Link
              to="/identify"
              onClick={() => setMobileOpen(false)}
              className="adaline-btn-primary mt-3 justify-center"
            >
              <Camera className="h-4 w-4" />
              Identify Plant
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
