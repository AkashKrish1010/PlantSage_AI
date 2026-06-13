import { motion } from "framer-motion";
import { Leaf, Shield, BookOpen, AlertTriangle, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div
      className="page-container max-w-3xl mx-auto px-6 py-12"
      style={{ backgroundColor: "var(--color-cream-paper)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-5 w-5" style={{ color: "var(--color-forest-floor)" }} />
          <span className="adaline-micro">Botanical heritage</span>
        </div>
        <h1
          className="adaline-heading mb-2"
          style={{ fontSize: "38px", letterSpacing: "-1.5px" }}
        >
          About PlantSage AI
        </h1>
        <p
          className="adaline-body-sm font-mono italic mb-10"
          style={{ color: "rgba(10,29,8,0.6)" }}
        >
          India's medicinal plant companion · SIH1555
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="space-y-8"
      >
        {/* Mission */}
        <section className="adaline-card">
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)", fontWeight: 400 }}
          >
            Our Mission
          </h2>
          <p
            className="adaline-body-sm leading-relaxed"
            style={{ color: "rgba(10,29,8,0.8)" }}
          >
            PlantSage AI bridges the gap between India's rich 8,000+ medicinal plant heritage and modern accessibility.
            Built in alignment with the Ministry of AYUSH's vision, we bring verified Ayurvedic knowledge to your fingertips
            — helping you identify plants, discover traditional remedies, and make informed health choices rooted in ancient wisdom.
          </p>
        </section>

        {/* Badges Explanation */}
        <section className="adaline-card">
          <h2
            className="text-lg mb-4"
            style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)", fontWeight: 400 }}
          >
            Understanding Our Badges
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border border-forest-floor"
                style={{ backgroundColor: "var(--color-moss-veil)" }}
              >
                <Shield className="h-4 w-4" style={{ color: "var(--color-botanical-ink)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="adaline-micro text-[11px]">Doctor Verified</span>
                  <span className="text-xs">✅</span>
                </div>
                <p className="adaline-body-sm text-xs leading-relaxed" style={{ color: "rgba(10,29,8,0.7)" }}>
                  Remedies backed by scientific research, clinical studies, or recognized by the AYUSH pharmacopoeia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border border-eucalyptus"
                style={{ backgroundColor: "var(--color-sage-mist)" }}
              >
                <BookOpen className="h-4 w-4" style={{ color: "var(--color-botanical-ink)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="adaline-micro text-[11px]">Traditional Use</span>
                  <span className="text-xs">📜</span>
                </div>
                <p className="adaline-body-sm text-xs leading-relaxed" style={{ color: "rgba(10,29,8,0.7)" }}>
                  Based on centuries of traditional knowledge passed through generations. Practices widely honored although clinical trials may still be ongoing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Disclaimer */}
        <section
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "rgba(74,50,18,0.05)",
            borderColor: "var(--color-eucalyptus)",
            color: "var(--color-bark-brown)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4" style={{ color: "var(--color-warm-loam)" }} />
            <h2 className="adaline-micro text-[12px] font-semibold" style={{ color: "var(--color-warm-loam)" }}>
              Safety Disclaimer
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm" style={{ color: "var(--color-bark-brown)", opacity: 0.9 }}>
            <li className="adaline-body-sm text-xs leading-relaxed">• This application is for educational purposes and does not replace professional medical advice.</li>
            <li className="adaline-body-sm text-xs leading-relaxed">• Always consult a qualified healthcare provider before using any herbal preparation.</li>
            <li className="adaline-body-sm text-xs leading-relaxed">• Pay attention to toxic lookalike warnings — misidentification can be highly dangerous.</li>
            <li className="adaline-body-sm text-xs leading-relaxed">• Pregnant or nursing women, and those on active medication, should seek medical guidance.</li>
            <li className="adaline-body-sm text-xs leading-relaxed">• Start with small doses to test for potential allergic reactions.</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="adaline-card">
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: "var(--font-akkurat)", color: "var(--color-botanical-ink)", fontWeight: 400 }}
          >
            Contact & Feedback
          </h2>
          <p className="adaline-body-sm mb-4" style={{ color: "rgba(10,29,8,0.7)" }}>
            We'd love to hear from you. Help us improve PlantSage AI.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" style={{ color: "var(--color-warm-loam)" }} />
            <a
              href="mailto:feedback@plantsage.ai"
              className="adaline-body-sm font-bold underline hover:opacity-75 transition-opacity"
              style={{ color: "var(--color-botanical-ink)" }}
            >
              feedback@plantsage.ai
            </a>
          </div>
        </section>

        <p className="text-center adaline-micro text-[10px] pt-8" style={{ color: "var(--color-eucalyptus)" }}>
          PlantSage AI v1.0 • SIH1555 • Ministry of AYUSH
        </p>
      </motion.div>
    </div>
  );
}
