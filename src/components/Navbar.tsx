import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass shadow-elegant" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-silver-bright" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-electric/30 blur-xl group-hover:bg-electric/60 transition-all" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-gradient-silver font-display">
              DeepShield360
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative px-4 py-2 text-sm text-muted-foreground hover:text-silver-bright transition-colors"
                  activeProps={{ className: "text-silver-bright" }}
                  activeOptions={{ exact: true }}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
                        />
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="mailto:recurrex.ofc@gmail.com"
            className="hidden md:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-background bg-gradient-to-r from-silver-bright to-silver hover:shadow-silver transition-all"
          >
            Contact
          </a>

          <button
            className="md:hidden text-silver-bright"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-4"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-silver-bright hover:bg-secondary/50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
