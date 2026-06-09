import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { Workflow, Zap, Mail, MessageCircle, Bell, ArrowRight, Play, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/workflows")({
  head: () => ({ meta: [{ title: "Workflows — Univers Canada" }] }),
  component: WorkflowsPage,
});

const flows = [
  { name: "Onboarding nouveau lead", desc: "Email + WhatsApp + RDV proposé automatiquement", runs: 142, status: "Actif", icon: Mail },
  { name: "Relance documents manquants", desc: "Relance J+3, J+7, J+14 par WhatsApp", runs: 87, status: "Actif", icon: MessageCircle },
  { name: "Notification visa approuvé", desc: "Email félicitations + facture finale", runs: 14, status: "Actif", icon: Bell },
  { name: "Suivi post-RDV", desc: "Récap, prochaines étapes, checklist documents", runs: 56, status: "Actif", icon: Zap },
  { name: "Pré-qualification IA", desc: "Score de qualification automatique des leads", runs: 234, status: "Actif", icon: Workflow },
];

function WorkflowsPage() {
  return (
    <>
      <Topbar title="Workflows & automatisations" subtitle="Gagnez 4h par jour grâce à l'automatisation" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
        <div className="flex items-center justify-end">
          <button className="h-10 px-4 rounded-lg canada-gradient text-white text-sm font-semibold flex items-center gap-1.5 shadow-elegant">
            <Plus className="w-4 h-4" /> Nouveau workflow
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {flows.map((f) => (
            <div key={f.name} className="bg-card rounded-2xl border border-border p-5 hover:shadow-elegant transition">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl canada-gradient text-white flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold">{f.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold">{f.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{f.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground"><strong className="text-foreground">{f.runs}</strong> exécutions ce mois</span>
                    <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                      <Play className="w-3 h-3" /> Configurer <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
