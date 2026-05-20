import { Mail, Github, Linkedin, Instagram, Facebook, Shield } from "lucide-react";

const socials = [
  { href: "mailto:recurrex.ofc@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/Recurrex", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/company/recurrexhq/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/recurrex", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/recurrex", icon: Facebook, label: "Facebook" },
  {
    href: "https://x.com/recurrex",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: "X",
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent" />
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-silver-bright" strokeWidth={1.5} />
              <span className="text-lg font-semibold text-gradient-silver font-display">
                DeepShield360
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Transforming raw CCTV footage into structured, searchable, real-time intelligence.
            </p>
          </div>

          <div className="md:text-center">
            <h3 className="text-sm uppercase tracking-widest text-silver mb-4">Get in touch</h3>
            <a
              href="mailto:recurrex.ofc@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-background bg-gradient-to-r from-silver-bright via-silver to-silver-bright hover:shadow-silver hover:scale-[1.02] transition-all"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </a>
          </div>

          <div className="md:text-right">
            <h3 className="text-sm uppercase tracking-widest text-silver mb-4">Follow</h3>
            <div className="flex md:justify-end gap-2 flex-wrap">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 grid place-items-center rounded-lg glass text-silver hover:text-electric hover:border-electric/60 transition-all hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Recurrex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
