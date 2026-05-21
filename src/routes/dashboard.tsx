import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, LayoutDashboard, Video, Cctv, Bell, Search, FileText,
  LogOut, Menu, X, Plus, Upload, Activity,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Command Hub — DeepShield360" }] }),
  component: DashboardPage,
});

type ModalType = "video" | "cam" | null;

function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-silver text-sm tracking-widest uppercase animate-pulse">Authenticating…</div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };

  const nav = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Video, label: "Feeds" },
    { icon: Bell, label: "Alerts" },
    { icon: FileText, label: "Event Logs" },
    { icon: Search, label: "Semantic Search" },
  ];

  return (
    <div className="min-h-screen flex overflow-x-hidden -mt-24 pt-24">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 glass border-r border-border/50 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-6 w-6 text-silver-bright" strokeWidth={1.5} />
            <span className="font-display font-semibold text-gradient-silver">DeepShield360</span>
          </div>

          <nav className="flex-1 space-y-1">
            {nav.map((n) => (
              <button key={n.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-silver hover:bg-secondary/60 hover:text-silver-bright transition">
                <n.icon className="h-4 w-4" />
                {n.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-border/50 space-y-2">
            <div className="px-3 py-2 text-xs">
              <p className="text-muted-foreground">Signed in as</p>
              <p className="text-silver-bright truncate">{user.displayName || user.email}</p>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-silver hover:bg-destructive/20 hover:text-destructive transition">
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top header */}
        <header className="sticky top-24 z-20 backdrop-blur-xl bg-background/70 border-b border-border/50">
          <div className="flex items-center justify-between p-4 md:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-silver-bright">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-electric">Command Hub</p>
                <h1 className="text-lg md:text-xl font-display font-semibold text-silver-bright">
                  Welcome, {user.displayName?.split(" ")[0] || "Operator"}
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
              All systems online
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Action controls */}
          <section className="grid sm:grid-cols-2 gap-4">
            <ActionButton icon={Upload} title="Add Video" desc="Upload local footage for analysis" onClick={() => setModal("video")} />
            <ActionButton icon={Cctv} title="Add CCTV Cam" desc="Connect a live RTSP stream" onClick={() => setModal("cam")} />
          </section>

          {/* Semantic Search */}
          <section className="silver-border rounded-2xl p-5 bg-card/60">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-electric flex-shrink-0" />
              <input
                placeholder='Try: "red truck near warehouse at 10 PM"'
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60"
              />
              <button className="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-md bg-gradient-to-r from-silver-bright to-silver text-background font-medium">
                Search
              </button>
            </div>
          </section>

          {/* Grid */}
          <section className="grid lg:grid-cols-3 gap-6">
            {/* Live feeds */}
            <div className="lg:col-span-2 silver-border rounded-2xl p-5 bg-card/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-silver-bright">Live Camera Feeds</h2>
                <span className="text-xs text-muted-foreground">4 active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-video rounded-lg border border-border bg-gradient-to-br from-secondary/60 to-background relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] text-electric">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" /> CAM-0{i}
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <Video className="h-8 w-8 text-silver/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="silver-border rounded-2xl p-5 bg-card/60">
              <h2 className="font-display font-semibold text-silver-bright mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-electric" /> Real-time Alerts
              </h2>
              <div className="space-y-3">
                {[
                  { t: "Loitering detected", c: "CAM-02 • 2m ago" },
                  { t: "Unattended object", c: "CAM-04 • 8m ago" },
                  { t: "Vehicle match", c: "CAM-01 • 15m ago" },
                ].map((a, i) => (
                  <div key={i} className="rounded-lg p-3 bg-secondary/40 border border-border/60">
                    <p className="text-sm text-silver-bright">{a.t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.c}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Event Logs */}
          <section className="silver-border rounded-2xl p-5 bg-card/60">
            <h2 className="font-display font-semibold text-silver-bright mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-electric" /> Event Logs
            </h2>
            <div className="space-y-2 text-sm">
              {[
                "10:42:18 — Person entered restricted zone (CAM-03)",
                "10:39:02 — Vehicle parked > 5min (CAM-01)",
                "10:31:45 — Motion outside business hours (CAM-04)",
                "10:21:09 — Crowd density threshold exceeded (CAM-02)",
              ].map((l, i) => (
                <div key={i} className="font-mono text-xs text-muted-foreground border-l-2 border-electric/40 pl-3 py-1">{l}</div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <Modal onClose={() => setModal(null)}>
            {modal === "video" ? (
              <>
                <h3 className="text-xl font-display font-semibold text-gradient-silver mb-2">Add Video</h3>
                <p className="text-sm text-muted-foreground mb-6">Upload local footage for AI analysis.</p>
                <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-electric/60 transition cursor-pointer">
                  <Upload className="h-8 w-8 text-silver mx-auto mb-3" />
                  <p className="text-sm text-silver-bright">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI up to 2GB</p>
                  <input type="file" accept="video/*" className="hidden" />
                </label>
              </>
            ) : (
              <>
                <h3 className="text-xl font-display font-semibold text-gradient-silver mb-2">Add CCTV Camera</h3>
                <p className="text-sm text-muted-foreground mb-6">Enter the RTSP stream URL.</p>
                <div className="space-y-3">
                  <input placeholder="Camera name" className="w-full bg-input/60 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-electric/60" />
                  <input placeholder="rtsp://username:password@host:port/stream" className="w-full bg-input/60 border border-border rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-electric/60" />
                  <button className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright to-silver hover:shadow-silver">
                    Connect Stream
                  </button>
                </div>
              </>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon: Icon, title, desc, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="group silver-border rounded-2xl p-5 text-left bg-card/60 hover:bg-card transition relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-2xl group-hover:bg-electric/30 transition" />
      <div className="relative flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-background border border-border grid place-items-center group-hover:border-electric/60 transition">
          <Icon className="h-5 w-5 text-silver-bright" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-silver-bright">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
        <Plus className="h-5 w-5 text-silver/60 group-hover:text-electric transition" />
      </div>
    </motion.button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="silver-border rounded-2xl bg-card p-6 md:p-8 w-full max-w-md relative shadow-elegant"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-silver/60 hover:text-silver-bright">
          <X className="h-5 w-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
