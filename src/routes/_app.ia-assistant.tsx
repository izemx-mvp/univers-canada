import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { Bot, Sparkles, MessageCircle, Calendar, FileText, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/ia-assistant")({
  head: () => ({ meta: [{ title: "IA Assistant — Univers Canada" }] }),
  component: IAPage,
});

const capacites = [
  { icon: MessageCircle, title: "Conversations multilingues", desc: "Français, anglais, arabe — 24/7" },
  { icon: Calendar, title: "Prise de RDV intelligente", desc: "Synchronisation calendrier conseillers" },
  { icon: FileText, title: "Pré-qualification dossiers", desc: "Score IA basé sur critères CIC" },
  { icon: TrendingUp, title: "Prédiction approbation", desc: "Modèle entraîné sur 8 000+ dossiers" },
];

function IAPage() {
  return (
    <>
      <Topbar title="Assistant IA Immigration" subtitle="Votre conseiller virtuel propulsé par l'IA" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
        <div className="rounded-2xl canada-gradient text-white p-8 relative overflow-hidden">
          <Sparkles className="absolute -top-6 -right-6 w-40 h-40 opacity-10" />
          <Bot className="w-10 h-10 mb-3" />
          <h2 className="text-2xl font-display font-bold mb-2">Bonjour, je suis votre Assistant IA</h2>
          <p className="text-white/85 max-w-2xl">
            Spécialisé en immigration canadienne, j'analyse vos dossiers, qualifie vos leads et automatise vos suivis. Cliquez sur l'icône en bas à droite pour démarrer une conversation.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-6 max-w-lg">
            <div><div className="text-3xl font-bold">2 847</div><div className="text-xs text-white/70">Conversations</div></div>
            <div><div className="text-3xl font-bold">97%</div><div className="text-xs text-white/70">Satisfaction</div></div>
            <div><div className="text-3xl font-bold">4.2s</div><div className="text-xs text-white/70">Temps réponse</div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capacites.map((c) => (
            <div key={c.title} className="bg-card rounded-2xl border border-border p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm mb-1">{c.title}</div>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
