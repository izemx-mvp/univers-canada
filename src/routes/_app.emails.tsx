import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { Mail, Star, Paperclip, Inbox, Send, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/emails")({
  head: () => ({ meta: [{ title: "Emails — Univers Canada" }] }),
  component: EmailsPage,
});

const emails = [
  { from: "Yassine El Mansouri", sub: "Question sur mon dossier Entrée Express", preview: "Bonjour, j'aimerais savoir où en est l'analyse...", time: "10:42", unread: true, star: true },
  { from: "Sara Bennis", sub: "Confirmation RDV demain", preview: "Merci pour les détails du RDV de demain à 10h...", time: "09:18", unread: true, star: false },
  { from: "IRCC Notification", sub: "Mise à jour dossier UC-2025-1004", preview: "Une décision a été prise concernant le dossier...", time: "08:30", unread: false, star: true },
  { from: "Imane Ait Lahcen", sub: "IELTS résultats reçus", preview: "Bonjour, je viens de recevoir mes résultats...", time: "Hier", unread: false, star: false },
  { from: "Mehdi Chraibi", sub: "Documents financiers", preview: "Veuillez trouver ci-joint mon relevé bancaire...", time: "Hier", unread: false, star: false },
];

function EmailsPage() {
  return (
    <>
      <Topbar title="Emails" subtitle="Boîte unifiée — IMAP & Gmail synchronisés" />
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4">
          <div className="bg-card rounded-2xl border border-border p-3 space-y-1">
            {[
              { i: Inbox, l: "Boîte de réception", n: 47, a: true },
              { i: Star, l: "Favoris", n: 12 },
              { i: Send, l: "Envoyés", n: 0 },
              { i: FileText, l: "Brouillons", n: 3 },
            ].map((e) => (
              <button key={e.l} className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm", e.a ? "bg-primary text-white" : "hover:bg-muted")}>
                <e.i className="w-4 h-4" />
                <span className="flex-1 text-left">{e.l}</span>
                {e.n > 0 && <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-bold", e.a ? "bg-white/20" : "bg-muted")}>{e.n}</span>}
              </button>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-y-auto scrollbar-thin">
            <div className="divide-y divide-border">
              {emails.map((e, i) => (
                <div key={i} className={cn("px-5 py-3.5 flex items-center gap-4 hover:bg-muted/40 cursor-pointer", e.unread && "bg-primary/[0.03]")}>
                  <Star className={cn("w-4 h-4 shrink-0", e.star ? "text-amber-500 fill-current" : "text-muted-foreground")} />
                  <div className="w-9 h-9 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {e.from[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn("text-sm truncate", e.unread ? "font-semibold" : "font-normal")}>{e.from}</div>
                    <div className={cn("text-sm truncate", e.unread && "font-medium")}>{e.sub}</div>
                    <div className="text-xs text-muted-foreground truncate">{e.preview}</div>
                  </div>
                  <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                  <div className="text-[11px] text-muted-foreground w-16 text-right">{e.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
