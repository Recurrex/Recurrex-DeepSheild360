import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const intro: Msg = {
  role: "bot",
  text: "Hi, I'm Shield AI. Ask me anything about DeepShield360 — features, pipeline, or use cases.",
};

const knowledge: { keywords: string[]; reply: string }[] = [
  { keywords: ["detection", "real-time", "real time", "live"], reply: "Real-Time Detection identifies people, vehicles and suspicious activity at high speed across all your camera feeds." },
  { keywords: ["text", "log", "transcript", "video to text"], reply: "Video To Text auto-generates human-readable, timestamped event logs from every frame so you can search footage like a document." },
  { keywords: ["alert", "notification", "loiter", "intrusion"], reply: "Smart Alerts notify you instantly about loitering, intrusions, or unattended objects — no manual monitoring required." },
  { keywords: ["search", "semantic", "find"], reply: "Semantic Search lets you query footage naturally, e.g. 'Find red truck near warehouse at 10 PM'." },
  { keywords: ["pipeline", "how", "work"], reply: "Our pipeline: Capture → Analyze → Extract → Store (vector DB) → Trigger alerts. End-to-end, fully autonomous." },
  { keywords: ["team", "who", "recurrex", "about"], reply: "DeepShield360 is built by Team Recurrex — a group of AI engineers solving the static-data crisis in surveillance." },
  { keywords: ["contact", "email", "reach"], reply: "Reach us at recurrex.ofc@gmail.com — we'd love to hear from you." },
];

function reply(input: string): string {
  const q = input.toLowerCase();
  const hit = knowledge.find((k) => k.keywords.some((kw) => q.includes(kw)));
  if (hit) return hit.reply;
  return "Great question. DeepShield360 turns raw CCTV into searchable intelligence. Try asking about real-time detection, alerts, semantic search, or our pipeline.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMsgs((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(trimmed) }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] flex flex-col rounded-2xl glass shadow-elegant overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-gradient-to-r from-background/60 to-secondary/60">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-electric" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-background animate-pulse-glow" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-silver-bright">Shield AI</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-silver-bright">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-silver-bright to-silver text-background rounded-br-sm"
                        : "bg-secondary/70 text-foreground rounded-bl-sm border border-border/60"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border/60 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Shield AI..."
                className="flex-1 bg-secondary/60 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              />
              <button
                onClick={send}
                className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-silver-bright to-silver text-background hover:scale-105 transition"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative h-14 w-14 rounded-full grid place-items-center bg-gradient-to-br from-silver-bright via-silver to-silver/70 text-background shadow-elegant"
        aria-label="Open AI chat"
      >
        <div className="absolute inset-0 rounded-full bg-electric/40 blur-xl animate-pulse-glow" />
        <div className="relative">{open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}</div>
      </motion.button>
    </div>
  );
}
