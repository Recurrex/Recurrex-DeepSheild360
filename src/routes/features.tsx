import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Eye, FileText, Bell, Search, Camera, Brain, FileSearch, Database, Zap,
  Command, Gauge, ArrowRight,
} from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — DeepShield360" },
      { name: "description", content: "Explore the DeepShield360 AI pipeline, command hub, and 90% faster retrieval." },
    ],
  }),
  component: FeaturesPage,
});

const core = [
  { icon: Eye, title: "Real Time Detection", desc: "GPU-accelerated identification of people, vehicles and behaviors across unlimited concurrent feeds — sub-second latency." },
  { icon: FileText, title: "Video To Text", desc: "Every scene becomes a timestamped, human-readable log entry. Query footage like a document." },
  { icon: Bell, title: "Smart Alerts", desc: "Behavioral triggers for loitering, perimeter intrusion, unattended objects, crowd density and more." },
  { icon: Search, title: "Semantic Search", desc: "Natural-language queries return frames in milliseconds. 'Red truck near warehouse at 10 PM' — done." },
];

const pipeline = [
  { icon: Camera, title: "Capture", subtitle: "Frame Ingestion", desc: "Multi-stream RTSP/ONVIF ingestion with adaptive sampling." },
  { icon: Brain, title: "Analyze", subtitle: "Object Detection", desc: "Proprietary vision models detect objects, people, behaviors." },
  { icon: FileSearch, title: "Extract", subtitle: "Event Recognition", desc: "Convert raw detections into structured semantic events." },
  { icon: Database, title: "Store", subtitle: "Vector Database", desc: "Embeddings indexed for instant similarity & semantic lookup." },
  { icon: Zap, title: "Trigger", subtitle: "Instant Alerts", desc: "Rule + ML driven notifications, routed to your channels." },
];

function FeaturesPage() {
  return (
    <div className="pb-10">
      {/* Header */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-6 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-electric mb-4">The Platform</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient-silver leading-[1.05]">
              A complete surveillance intelligence stack.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              DeepShield360 unifies detection, extraction, search and alerting into one autonomous pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core feature grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
          {core.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <TiltCard>
                <div className="silver-border rounded-2xl p-8 bg-card/80 h-full">
                  <div className="flex items-start gap-5">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-secondary to-background border border-border grid place-items-center shrink-0">
                      <f.icon className="h-6 w-6 text-silver-bright" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-silver-bright mb-2">{f.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section className="relative py-24 border-y border-border/50 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-electric mb-4">AI Processing Pipeline</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-silver">
              From frame to intelligence in milliseconds.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-silver/40 to-transparent" />

            <div className="grid lg:grid-cols-5 gap-6 relative">
              {pipeline.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-silver-bright via-silver to-silver/50 grid place-items-center mb-5 shadow-silver">
                      <p.icon className="h-6 w-6 text-background" />
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background border border-electric/60 text-[10px] grid place-items-center text-electric font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-silver-bright">{p.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-electric mt-1">{p.subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
                  </div>
                  {i < pipeline.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-6 -right-3 h-4 w-4 text-silver/60" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Command Hub + Retrieval */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-8" style={{ perspective: "1200px" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard>
              <div className="silver-border rounded-3xl p-10 bg-card/80 h-full relative overflow-hidden">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
                <Command className="h-10 w-10 text-electric mb-6" strokeWidth={1.5} />
                <h3 className="text-3xl font-bold text-gradient-silver mb-4">User Command Hub</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A unified operator console for live feeds, alert triage, search, and audit. Designed for control rooms, security ops, and analysts — keyboard-first, dark-mode, latency-aware.
                </p>
                <ul className="space-y-2 text-sm">
                  {["Multi-feed live grid", "Natural language query bar", "Alert timeline & forensics", "Role-based access & audit log"].map((x) => (
                    <li key={x} className="flex items-center gap-2 text-silver">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard>
              <div className="silver-border rounded-3xl p-10 bg-card/80 h-full relative overflow-hidden">
                <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
                <Gauge className="h-10 w-10 text-electric mb-6" strokeWidth={1.5} />
                <p className="text-xs uppercase tracking-[0.3em] text-electric mb-3">Performance</p>
                <h3 className="text-3xl font-bold text-gradient-silver mb-4">90% Faster Retrieval</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Vector indexing and pre-computed semantic tags reduce footage review time from hours to seconds. What used to take a full shift now takes a single query.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border/60 p-4">
                    <div className="text-3xl font-bold text-gradient-silver font-display">{"<200ms"}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Query latency</div>
                  </div>
                  <div className="rounded-xl border border-border/60 p-4">
                    <div className="text-3xl font-bold text-gradient-silver font-display">10×</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Analyst output</div>
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
