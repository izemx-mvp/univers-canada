import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { dossiers, statusLabels, kanbanColumns, type DossierStatus, type Dossier } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, MoreVertical, Calendar, Tag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dossiers")({
  head: () => ({ meta: [{ title: "Dossiers — Univers Canada" }] }),
  component: KanbanPage,
});

const columnColors: Record<DossierStatus, string> = {
  nouveau: "border-t-slate-400",
  qualifie: "border-t-blue-500",
  rdv: "border-t-indigo-500",
  documents: "border-t-amber-500",
  analyse: "border-t-purple-500",
  preparation: "border-t-cyan-500",
  soumis: "border-t-violet-500",
  attente: "border-t-orange-500",
  approuve: "border-t-emerald-500",
  cloture: "border-t-zinc-400",
  refuse: "border-t-red-500",
};

function KanbanPage() {
  const [items, setItems] = useState<Dossier[]>(dossiers);
  const [dragId, setDragId] = useState<string | null>(null);

  function onDrop(col: DossierStatus) {
    if (!dragId) return;
    setItems(items.map(d => d.id === dragId ? { ...d, status: col } : d));
    setDragId(null);
  }

  return (
    <>
      <Topbar title="Pipeline des dossiers" subtitle="Vue Kanban — Glissez-déposez pour faire évoluer les étapes" />
      <div className="flex-1 overflow-x-auto scrollbar-thin p-6">
        <div className="flex gap-4 min-w-max pb-4">
          {kanbanColumns.map((col) => {
            const colItems = items.filter(i => i.status === col);
            return (
              <div
                key={col}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(col)}
                className={cn(
                  "w-72 shrink-0 bg-muted/40 rounded-2xl border-t-4 flex flex-col",
                  columnColors[col],
                )}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{statusLabels[col]}</h3>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-background text-muted-foreground">{colItems.length}</span>
                  </div>
                  <button className="w-6 h-6 rounded hover:bg-background flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="px-2 pb-2 space-y-2 max-h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin">
                  {colItems.map((d) => (
                    <div
                      key={d.id}
                      draggable
                      onDragStart={() => setDragId(d.id)}
                      className="bg-card rounded-xl border border-border p-3 cursor-grab active:cursor-grabbing hover:shadow-elegant transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full canada-gradient text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {d.prenom[0]}{d.nom[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate">{d.prenom} {d.nom}</div>
                            <div className="text-[10px] text-muted-foreground">{d.ref}</div>
                          </div>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="text-[11px] text-foreground/80 mb-2 line-clamp-1">{d.procedure}</div>

                      <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                        {d.tags.map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                            <Tag className="inline w-2.5 h-2.5 mr-0.5" />{t}
                          </span>
                        ))}
                        {d.priorite === "haute" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-medium inline-flex items-center">
                            <AlertCircle className="w-2.5 h-2.5 mr-0.5" /> Urgent
                          </span>
                        )}
                      </div>

                      <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-2">
                        <div className="h-full canada-gradient" style={{ width: `${d.progression}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {d.dateCreation.slice(5)}
                        </div>
                        <div className="font-semibold text-foreground">{d.scoreIA}% IA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
