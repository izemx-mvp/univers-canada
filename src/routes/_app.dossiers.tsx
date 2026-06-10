import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  dossiers,
  statusLabels,
  kanbanColumns,
  type DossierStatus,
  type Dossier,
} from "@/lib/mock-data";
import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Calendar,
  Tag,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Languages,
  Wallet,
  Briefcase,
  Bot,
  Receipt,
} from "lucide-react";
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
  const [selected, setSelected] = useState<Dossier | null>(null);

  function onDrop(col: DossierStatus) {
    if (!dragId) return;
    setItems(items.map((d) => (d.id === dragId ? { ...d, status: col } : d)));
    setDragId(null);
  }

  return (
    <>
      <Topbar
        title="Pipeline des dossiers"
        subtitle="Vue Kanban — Glissez-déposez pour faire évoluer les étapes"
      />
      <div className="flex-1 overflow-x-auto scrollbar-thin p-6">
        <div className="flex gap-4 min-w-max pb-4">
          {kanbanColumns.map((col) => {
            const colItems = items.filter((i) => i.status === col);
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
                    <h3 className="font-semibold text-sm truncate">
                      {statusLabels[col]}
                    </h3>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-background text-muted-foreground">
                      {colItems.length}
                    </span>
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
                      onClick={() => setSelected(d)}
                      className="bg-card rounded-xl border border-border p-3 cursor-grab active:cursor-grabbing hover:shadow-elegant transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full canada-gradient text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {d.prenom[0]}
                            {d.nom[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate">
                              {d.prenom} {d.nom}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {d.ref}
                            </div>
                          </div>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-foreground/80 mb-2 line-clamp-1">
                        {d.procedure}
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                        {d.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
                          >
                            <Tag className="inline w-2.5 h-2.5 mr-0.5" />
                            {t}
                          </span>
                        ))}
                        {d.priorite === "haute" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-medium inline-flex items-center">
                            <AlertCircle className="w-2.5 h-2.5 mr-0.5" /> Urgent
                          </span>
                        )}
                      </div>

                      <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-2">
                        <div
                          className="h-full canada-gradient"
                          style={{ width: `${d.progression}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {d.dateCreation.slice(5)}
                        </div>
                        <div className="font-semibold text-foreground">
                          {d.scoreIA}% IA
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          {selected && <DossierDetailView dossier={selected} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function DossierDetailView({ dossier: d }: { dossier: Dossier }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full canada-gradient text-white flex items-center justify-center text-sm font-bold shrink-0">
            {d.prenom[0]}
            {d.nom[0]}
          </div>
          <div>
            <DialogTitle className="text-xl">
              {d.prenom} {d.nom}
            </DialogTitle>
            <DialogDescription>
              {d.ref} · {statusLabels[d.status]}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-5 mt-2">
        {/* Progression */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-medium">Progression du dossier</span>
            <span className="font-bold">{d.progression}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full canada-gradient transition-all"
              style={{ width: `${d.progression}%` }}
            />
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-2 gap-3">
          <InfoRow icon={Mail} label="Email" value={d.email} />
          <InfoRow icon={Phone} label="Téléphone" value={d.telephone} />
          <InfoRow icon={MapPin} label="Ville" value={d.ville} />
          <InfoRow icon={User} label="Âge" value={`${d.age} ans`} />
          <InfoRow icon={GraduationCap} label="Niveau d'études" value={d.niveauEtude} />
          <InfoRow
            icon={Languages}
            label="Langues"
            value={d.langues.join(", ")}
          />
          <InfoRow icon={Wallet} label="Revenus" value={d.revenus} />
          <InfoRow icon={Briefcase} label="Conseiller" value={d.conseiller} />
        </div>

        {/* Procédure & score IA */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{d.procedure}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Bot className="w-4 h-4 text-primary" />
              Score IA : {d.scoreIA}%
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {d.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
              >
                {t}
              </span>
            ))}
            {d.priorite === "haute" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">
                Priorité haute
              </span>
            )}
          </div>
        </div>

        {/* Dates & montant */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Date de création
            </div>
            <div className="text-sm font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              {d.dateCreation}
            </div>
          </div>
          {d.dateRdv && (
            <div className="rounded-lg border border-border p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Prochain rendez-vous
              </div>
              <div className="text-sm font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                {d.dateRdv.replace("T", " ")}
              </div>
            </div>
          )}
          <div className="rounded-lg border border-border p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Montant estimé
            </div>
            <div className="text-sm font-medium flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
              {d.montant.toLocaleString("fr-FR")} MAD
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 text-muted-foreground">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
