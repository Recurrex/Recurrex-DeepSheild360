import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Users, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Team Recurrex" },
      { name: "description", content: "Team Recurrex builds DeepShield360 to solve the static-data crisis in modern surveillance." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Mission", desc: "Make every CCTV camera a source of structured, actionable intelligence — not a static archive." },
  { icon: Sparkles, title: "Approach", desc: "Proprietary vision models, vector search, and a human-centered command hub. Built for operators." },
  { icon: Users, title: "Team", desc: "AI engineers, security veterans, and product designers from across the industry." },
];

function AboutPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-electric mb-4">About</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
              <span className="text-gradient-silver">Team Recurrex.</span>
              <br />
              <span className="text-foreground">Building the eyes</span>{" "}
              <span className="text-gradient-chrome italic font-display">behind every camera.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              We are the creators of DeepShield360 — a platform engineered to turn passive surveillance into active intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Crisis */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ perspective: "1200px" }}
        >
          <TiltCard>
            <div className="silver-border rounded-3xl p-10 md:p-14 bg-card/80 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-destructive/15 blur-3xl" />
              <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-destructive/30 to-destructive/10 border border-destructive/40 grid place-items-center shrink-0">
                  <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-destructive mb-3">The Problem</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gradient-silver mb-6">
                    The static data crisis.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                    Traditional CCTV systems generate massive amounts of unstructured video data that is{" "}
                    <span className="text-silver-bright">impossible to monitor manually</span>. Hours of footage sit unwatched. Critical events are missed. When something happens, teams spend days reviewing tapes for a single frame.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-3xl">
                    DeepShield360 ends that. Every frame becomes intelligence — searchable, queryable, and alerted on in real time.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard>
                <div className="silver-border rounded-2xl p-8 bg-card/80 h-full">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-background border border-border grid place-items-center mb-5">
                    <v.icon className="h-5 w-5 text-silver-bright" />
                  </div>
                  <h3 className="text-xl font-semibold text-silver-bright mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-electric/10" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient-silver max-w-2xl mx-auto">
              Want to see DeepShield360 in your environment?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Get in touch with Team Recurrex. We'll set up a tailored walkthrough.
            </p>
            <a
              href="mailto:recurrex.ofc@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright via-silver to-silver-bright shadow-elegant hover:shadow-silver transition-all"
            >
              Contact Team Recurrex
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
