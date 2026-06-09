import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { rendezVous } from "@/lib/mock-data";
import { Calendar, Clock, Video, MapPin, Plus, CheckCircle2, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/rendez-vous")({
  head: () => ({ meta: [{ title: "Rendez-vous — Univers Canada" }] }),
  component: RdvPage,
});

const statutBadge = {
  confirme: "bg-emerald-50 text-emerald-700 border-emerald-200",
  en_attente: "bg-amber-50 text-amber-700 border-amber-200",
  termine: "bg-slate-100 text-slate-700 border-slate-200",
};

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const hours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function RdvPage() {
  return (
    <>
      <Topbar title="Calendrier & rendez-vous" subtitle="Synchronisé avec Google Calendar & Outlook" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold">Juin 2026</h3>
              <p className="text-xs text-muted-foreground">Semaine du 8 au 14 juin</p>
            </div>
            <div className="flex gap-2">
              <button className="h-9 px-3 rounded-lg border border-border text-xs hover:bg-muted">Aujourd'hui</button>
              <button className="h-9 w-9 rounded-lg border border-border hover:bg-muted">‹</button>
              <button className="h-9 w-9 rounded-lg border border-border hover:bg-muted">›</button>
              <button className="h-9 px-3 rounded-lg canada-gradient text-white text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> RDV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-px bg-border rounded-lg overflow-hidden text-xs">
            <div className="bg-card p-2"></div>
            {days.map((d, i) => (
              <div key={d} className={cn("bg-card p-2 text-center", i === 1 && "text-primary font-bold")}>
                <div className="text-[10px] text-muted-foreground uppercase">{d}</div>
                <div className="text-sm font-semibold">{8 + i}</div>
              </div>
            ))}
            {hours.map((h) => (
              <>
                <div key={h} className="bg-card p-2 text-[10px] text-muted-foreground text-right">{h}</div>
                {days.map((d, di) => {
                  const hasEvent = (di === 1 && h === "10:00") || (di === 2 && h === "14:00") || (di === 3 && h === "11:00") || (di === 4 && h === "15:00");
                  return (
                    <div key={`${h}-${d}`} className="bg-card p-1 min-h-[44px] hover:bg-muted/40 cursor-pointer relative">
                      {hasEvent && (
                        <div className="text-[9px] p-1 rounded bg-primary/10 border-l-2 border-primary text-primary font-medium truncate">
                          {di === 1 ? "S. Bennis" : di === 2 ? "M. Chraibi" : di === 3 ? "I. Lahcen" : "Y. Mansouri"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-display font-semibold mb-1">Prochains RDV</h3>
            <p className="text-xs text-muted-foreground mb-4">7 rendez-vous cette semaine</p>
            <div className="space-y-3">
              {rendezVous.slice(0, 6).map((r) => (
                <div key={r.id} className="flex gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition">
                  <div className="w-12 h-12 rounded-xl canada-gradient text-white flex flex-col items-center justify-center shrink-0">
                    <div className="text-[9px] uppercase font-semibold">JUIN</div>
                    <div className="text-base font-bold leading-none">{r.date.slice(8, 10)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{r.candidat}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{r.type}</div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {r.date.slice(11, 16)}</span>
                      <span className="flex items-center gap-0.5">
                        {r.mode === "Visioconférence" ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                        {r.mode}
                      </span>
                    </div>
                  </div>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium h-fit", statutBadge[r.statut as keyof typeof statutBadge])}>
                    {r.statut === "confirme" ? "Confirmé" : r.statut === "en_attente" ? "En attente" : "Terminé"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" /> Rappels automatiques
            </h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between"><span>WhatsApp 24h avant</span><input type="checkbox" defaultChecked className="accent-primary" /></label>
              <label className="flex items-center justify-between"><span>Email 1h avant</span><input type="checkbox" defaultChecked className="accent-primary" /></label>
              <label className="flex items-center justify-between"><span>SMS 30min avant</span><input type="checkbox" className="accent-primary" /></label>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Google Calendar synchronisé</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Outlook 365 synchronisé</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
