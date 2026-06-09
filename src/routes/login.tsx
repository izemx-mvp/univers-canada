import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, Shield, ArrowRight, Sparkles, Globe2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Univers Canada CRM" },
      { name: "description", content: "Accédez à votre espace cabinet immigration Canada." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("karim.benali@universcanada.ma");
  const [password, setPassword] = useState("••••••••••");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left visual */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 canada-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute -top-20 -right-20 w-[500px] h-[500px]" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 20l12 36h36l-29 22 11 38-30-22-30 22 11-38-29-22h36z" />
          </svg>
          <svg className="absolute bottom-10 -left-10 w-72 h-72 opacity-30" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M12 2l1.5 4.5h4.5l-3.6 2.7L15.8 14 12 11.2 8.2 14l1.4-4.8L6 6.5h4.5L12 2zm-1 14h2v2l4 1v3H7v-3l4-1v-2z"/>
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">Univers Canada</div>
            <div className="text-[11px] uppercase tracking-widest text-white/70">CRM Immigration</div>
          </div>
        </div>

        <div className="relative max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Plateforme nouvelle génération
          </div>
          <h1 className="text-4xl font-display font-bold leading-tight">
            Pilotez vos dossiers d'immigration vers le Canada en toute simplicité.
          </h1>
          <p className="text-white/85 leading-relaxed">
            Centralisez vos prospects, automatisez vos workflows et bénéficiez d'un assistant IA spécialisé immigration canadienne.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { v: "+1 240", l: "Dossiers traités" },
              { v: "97%", l: "Taux satisfaction" },
              { v: "24/7", l: "Assistant IA" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-display font-bold">{s.v}</div>
                <div className="text-[11px] text-white/70 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-white/70">
          <Globe2 className="w-3.5 h-3.5" /> Casablanca · Montréal · Toronto
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl canada-gradient flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2l1.5 4.5h4.5l-3.6 2.7L15.8 14 12 11.2 8.2 14l1.4-4.8L6 6.5h4.5L12 2zm-1 14h2v2l4 1v3H7v-3l4-1v-2z"/>
              </svg>
            </div>
            <div className="font-display font-bold">Univers Canada</div>
          </div>

          <h2 className="text-3xl font-display font-bold mb-2">Bon retour 👋</h2>
          <p className="text-muted-foreground text-sm mb-8">Connectez-vous à votre espace conseiller immigration.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Email professionnel</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-border bg-background focus:border-primary outline-none text-sm transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-border bg-background focus:border-primary outline-none text-sm transition"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border accent-primary" />
                <span className="text-foreground/80 flex items-center gap-1.5"><Shield className="w-3 h-3" /> Connexion sécurisée</span>
              </label>
              <a className="text-primary font-medium hover:underline">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              className="w-full h-11 canada-gradient text-white rounded-lg font-semibold text-sm shadow-elegant hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Se connecter <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-xs text-center text-muted-foreground">
            Besoin d'un compte ? <Link to="/dashboard" className="text-primary font-medium hover:underline">Demander un accès</Link>
          </div>

          <div className="mt-12 pt-6 border-t border-border text-[11px] text-muted-foreground text-center">
            © 2025 Univers Canada · Tous droits réservés
          </div>
        </div>
      </div>
    </div>
  );
}
