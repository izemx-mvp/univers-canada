import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { dossiers, statusLabels, statusColors, type DossierStatus } from "@/lib/mock-data";
import { useState } from "react";
import { Search, Filter, Plus, Phone, Mail, MoreVertical, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/leads")({
  head: () => ({ meta: [{ title: "Leads — Univers Canada" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  const [filter, setFilter] = useState<DossierStatus | "all">("all");
  const list = filter === "all" ? dossiers : dossiers.filter(d => d.status === filter);

  return (
    <>
      <Topbar title="Leads & Prospects" subtitle={`${dossiers.length} prospects · ${dossiers.filter(d => d.status === "nouveau").length} nouveaux`} />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
        <div className="bg-card rounded-2xl border border-border p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Rechercher un lead..." className="w-full h-10 pl-10 pr-3 rounded-lg bg-muted/60 border border-transparent focus:bg-background focus:border-border outline-none text-sm" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value as DossierStatus | "all")} className="h-10 px-3 rounded-lg border border-border text-sm bg-background">
            <option value="all">Tous les statuts</option>
            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button className="h-10 px-3 rounded-lg border border-border text-sm hover:bg-muted flex items-center gap-1.5">
            <Filter className="w-4 h-4" /> Filtres
          </button>
          <button className="h-10 px-4 rounded-lg canada-gradient text-white text-sm font-semibold flex items-center gap-1.5 shadow-elegant">
            <Plus className="w-4 h-4" /> Nouveau lead
          </button>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Candidat</th>
                  <th className="text-left px-5 py-3 font-semibold">Procédure</th>
                  <th className="text-left px-5 py-3 font-semibold">Ville</th>
                  <th className="text-left px-5 py-3 font-semibold">Statut</th>
                  <th className="text-left px-5 py-3 font-semibold">Conseiller</th>
                  <th className="text-left px-5 py-3 font-semibold">Score IA</th>
                  <th className="text-left px-5 py-3 font-semibold">Priorité</th>
                  <th className="text-right px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.map((d) => (
                  <tr key={d.id} className="hover:bg-muted/30 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {d.prenom[0]}{d.nom[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{d.prenom} {d.nom}</div>
                          <div className="text-xs text-muted-foreground truncate">{d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs">{d.procedure}</td>
                    <td className="px-5 py-3.5 text-xs">{d.ville}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[11px] px-2 py-1 rounded-md border font-medium", statusColors[d.status])}>
                        {statusLabels[d.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs">{d.conseiller}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full canada-gradient" style={{ width: `${d.scoreIA}%` }} />
                        </div>
                        <span className="text-xs font-semibold w-8">{d.scoreIA}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium",
                        d.priorite === "haute" && "bg-red-50 text-red-700",
                        d.priorite === "moyenne" && "bg-amber-50 text-amber-700",
                        d.priorite === "basse" && "bg-slate-100 text-slate-700",
                      )}>
                        {d.priorite === "haute" && <Star className="w-3 h-3 fill-current" />}
                        {d.priorite}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"><Phone className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"><Mail className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
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
