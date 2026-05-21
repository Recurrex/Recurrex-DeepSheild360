import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create Account — DeepShield360" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (password !== confirm) return setErr("Passwords do not match");
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      setErr(e.message?.replace("Firebase: ", "") || "Sign up failed");
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
            <h1 className="text-3xl font-bold text-gradient-silver font-display">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join the intelligence network</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={User} type="text" placeholder="Full Name" value={name} onChange={setName} />
            <Field icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
            <Field icon={Lock} type="password" placeholder="Confirm Password" value={confirm} onChange={setConfirm} />

            {err && <p className="text-xs text-destructive">{err}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-background bg-gradient-to-r from-silver-bright via-silver to-silver-bright hover:shadow-silver transition-all disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-electric hover:underline">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
