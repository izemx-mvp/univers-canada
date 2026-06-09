import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { factures } from "@/lib/mock-data";
import { DollarSign, TrendingUp, Clock, CheckCircle2, Download, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/facturation")({
  head: () => ({ meta: [{ title: "Facturation — Univers Canada" }] }),
  component: FacturationPage,
});

const statBadge = {
  paye: "bg-emerald-50 text-emerald-700 border-emerald-200",
  impaye: "bg-red-50 text-red-700 border-red-200",
  partiel: "bg-amber-50 text-amber-700 border-amber-200",
};

function FacturationPage() {
  const total = factures.reduce((s, f) => s + f.montant, 0);
  const paye = factures.filter(f => f.statut === "paye").reduce((s, f) => s + f.montant, 0);
  const impaye = factures.filter(f => f.statut === "impaye").reduce((s, f) => s + f.montant, 0);

  const kpis = [
    { label: "Chiffre d'affaires", value: `${total.toLocaleString("fr-FR")} MAD`, icon: DollarSign, color: "from-emerald-500 to-teal-600" },
    { label: "Encaissé", value: `${paye.toLocaleString("fr-FR")} MAD`, icon: CheckCircle2, color: "from-blue-500 to-indigo-600" },
    { label: "En attente", value: `${impaye.toLocaleString("fr-FR")} MAD`, icon: Clock, color: "from-amber-500 to-orange-600" },
    { label: "Taux conversion", value: "87.4%", icon: TrendingUp, color: "from-rose-500 to-red-600" },
  ];

  return (
    <>
      <Topbar title="Facturation & devis" subtitle="Suivez vos paiements et générez vos documents" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-card rounded-2xl border border-border p-5">
              <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center mb-3", k.color)}>
                <k.icon className="w-5 h-5" />
              </div>
              <div className="text-xl font-display font-bold">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border">
          <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Rechercher une facture..." className="w-full h-10 pl-10 pr-3 rounded-lg bg-muted/60 focus:bg-background border border-transparent focus:border-border outline-none text-sm" />
            </div>
            <button className="h-10 px-4 rounded-lg border border-border text-sm hover:bg-muted flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Exporter
            </button>
            <button className="h-10 px-4 rounded-lg canada-gradient text-white text-sm font-semibold flex items-center gap-1.5 shadow-elegant">
              <Plus className="w-4 h-4" /> Nouvelle facture
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3">N° Facture</th>
                  <th className="text-left px-5 py-3">Candidat</th>
                  <th className="text-left px-5 py-3">Description</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Méthode</th>
                  <th className="text-right px-5 py-3">Montant</th>
                  <th className="text-left px-5 py-3">Statut</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {factures.map((f) => (
                  <tr key={f.id} className="hover:bg-muted/30 transition">
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold text-primary">{f.id}</td>
                    <td className="px-5 py-3.5">{f.candidat}</td>
                    <td className="px-5 py-3.5 text-xs">{f.description}</td>
                    <td className="px-5 py-3.5 text-xs">{f.date}</td>
                    <td className="px-5 py-3.5 text-xs">{f.methode}</td>
                    <td className="px-5 py-3.5 text-right font-semibold">{f.montant.toLocaleString("fr-FR")} MAD</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[11px] px-2 py-1 rounded-md border font-medium", statBadge[f.statut as keyof typeof statBadge])}>
                        {f.statut === "paye" ? "Payé" : f.statut === "impaye" ? "Impayé" : "Partiel"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-xs text-primary font-medium hover:underline">Voir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
