import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Eye, FileText, Bell, Search, Sparkles, Activity, Cpu, Database, LayoutDashboard } from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { TiltCard } from "@/components/TiltCard";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepShield360 — Intelligence in Motion" },
      { name: "description", content: "AI-powered surveillance that turns raw CCTV into searchable real-time intelligence." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Eye, title: "Real Time Detection", desc: "High-speed identification of people, vehicles, and suspicious activity across every feed." },
  { icon: FileText, title: "Video To Text", desc: "Automatic generation of human-readable timestamped event logs from raw frames." },
  { icon: Bell, title: "Smart Alerts", desc: "Instant notification for loitering, intrusions, or unattended objects." },
  { icon: Search, title: "Semantic Search", desc: "Convert visual data into searchable intelligence — 'red truck near warehouse at 10 PM'." },
];

const stats = [
  { value: "90%", label: "Faster Retrieval", icon: Activity },
  { value: "24/7", label: "Autonomous Monitoring", icon: Cpu },
  { value: "∞", label: "Searchable Frames", icon: Database },
];

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const go = () => navigate({ to: "/features" });
  const openDashboard = () => navigate({ to: user ? "/dashboard" : "/login" });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0">
          <ParticleField />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="container mx-auto px-6 relative z-10 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-electric" />
              <span className="text-xs uppercase tracking-widest text-silver">Proprietary AI Surveillance</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05]">
              <span className="text-gradient-silver">DeepShield360:</span>
              <br />
              <span className="text-foreground">Intelligence in</span>{" "}
              <span className="text-gradient-chrome italic font-display">Motion</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform raw CCTV footage into structured, searchable, real-time intelligence using proprietary AI analysis.
            </p>

            <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={openDashboard}
                className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright via-silver to-silver-bright bg-[length:200%_100%] hover:bg-right transition-all duration-500 shadow-elegant"
              >
                <span className="absolute inset-0 rounded-xl bg-electric/40 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <LayoutDashboard className="relative h-4 w-4" />
                <span className="relative">{user ? "Open Dashboard" : "Get Started"}</span>
                <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="#features"
                className="text-sm text-silver hover:text-silver-bright transition-colors underline-offset-4 hover:underline"
              >
                See capabilities ↓
              </a>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-24 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 text-center">
                <s.icon className="h-5 w-5 text-electric mx-auto mb-2" />
                <div className="text-2xl md:text-4xl font-bold text-gradient-silver font-display">{s.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES PREVIEW */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-electric mb-4">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-silver">
              Four pillars of autonomous surveillance.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Click any pillar to see the full system in depth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard onClick={go} className="h-full">
                  <div className="silver-border rounded-2xl p-6 h-full flex flex-col bg-card/80 hover:bg-card transition-colors">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-background border border-border grid place-items-center mb-5 group-hover:border-electric/60 transition-colors">
                      <f.icon className="h-5 w-5 text-silver-bright" />
                    </div>
                    <h3 className="text-lg font-semibold text-silver-bright mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
                    <div className="mt-6 flex items-center gap-1.5 text-xs text-electric opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
            style={{ perspective: "1200px" }}
          >
            <TiltCard onClick={go}>
              <div className="silver-border rounded-2xl p-8 md:p-10 bg-gradient-to-br from-card via-secondary/40 to-card relative overflow-hidden">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-electric mb-2">Full system</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient-silver">View More Features</h3>
                    <p className="mt-2 text-muted-foreground max-w-xl">
                      Deep dive into the pipeline, command hub, and 90% faster retrieval architecture.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright to-silver shadow-silver whitespace-nowrap">
                    Explore all <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
