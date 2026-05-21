import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — DeepShield360" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      setErr(e.message?.replace("Firebase: ", "") || "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-12 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className="w-full max-w-md"
      >
        <div className="silver-border rounded-2xl glass p-8 md:p-10 shadow-elegant">
          <div className="flex flex-col items-center text-center mb-8">
            <Shield className="h-10 w-10 text-silver-bright mb-3" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold text-gradient-silver font-display">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your command hub</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />

            {err && <p className="text-xs text-destructive">{err}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright via-silver to-silver-bright hover:shadow-silver transition-all disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-electric hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function Field({
  icon: Icon, type, placeholder, value, onChange,
}: { icon: any; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/60" />
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-input/60 border border-border rounded-lg pl-10 pr-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-electric/60 focus:ring-1 focus:ring-electric/40 transition"
      />
    </div>
  );
}
