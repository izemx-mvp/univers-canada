import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { MessageCircle, Search, Send, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/whatsapp")({
  head: () => ({ meta: [{ title: "WhatsApp — Univers Canada" }] }),
  component: WhatsAppPage,
});

const conv = [
  { name: "Yassine El Mansouri", last: "Merci pour les informations !", time: "10:42", unread: 0 },
  { name: "Sara Bennis", last: "À demain pour le RDV", time: "09:18", unread: 2 },
  { name: "Imane Ait Lahcen", last: "J'ai uploadé mon IELTS", time: "Hier", unread: 0 },
  { name: "Mehdi Chraibi", last: "Voici mon relevé bancaire", time: "Hier", unread: 1 },
  { name: "Hamza El Fassi", last: "🎉🎉🎉", time: "08/06", unread: 0 },
];

const messages = [
  { from: "them", text: "Bonjour, j'ai bien reçu votre email", time: "10:32" },
  { from: "me", text: "Bonjour Sara 👋 Avez-vous pu rassembler les documents ?", time: "10:35" },
  { from: "them", text: "Oui, je les ai tous sauf le test IELTS", time: "10:38" },
  { from: "me", text: "Parfait, vous pouvez le passer cette semaine. Je vous envoie les créneaux disponibles.", time: "10:40" },
  { from: "them", text: "Merci beaucoup !", time: "10:42" },
];

function WhatsAppPage() {
  return (
    <>
      <Topbar title="WhatsApp Business" subtitle="Conversations centralisées" />
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-card rounded-2xl border border-border grid grid-cols-1 md:grid-cols-[320px_1fr] overflow-hidden">
          <div className="border-r border-border flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 text-sm outline-none" placeholder="Rechercher..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {conv.map((c, i) => (
                <div key={c.name} className={cn("px-4 py-3 flex gap-3 cursor-pointer border-b border-border hover:bg-muted/40", i === 1 && "bg-primary/5")}>
                  <div className="w-10 h-10 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold">{c.name[0]}{c.name.split(" ")[1]?.[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between"><span className="font-semibold text-sm truncate">{c.name}</span><span className="text-[10px] text-muted-foreground">{c.time}</span></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground truncate">{c.last}</span>
                      {c.unread > 0 && <span className="text-[10px] bg-emerald-500 text-white px-1.5 rounded-full font-bold ml-2">{c.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold">SB</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Sara Bennis</div>
                <div className="text-[11px] text-emerald-600">● en ligne</div>
              </div>
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-muted/20">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[70%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                    m.from === "me" ? "bg-emerald-100 text-emerald-950 rounded-br-sm" : "bg-card border border-border rounded-bl-sm"
                  )}>
                    <div>{m.text}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-0.5 justify-end">
                      {m.time} {m.from === "me" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input placeholder="Écrire un message..." className="flex-1 h-10 px-3 rounded-lg border border-border text-sm outline-none focus:border-primary" />
              <button className="w-10 h-10 rounded-lg canada-gradient text-white flex items-center justify-center"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
