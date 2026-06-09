import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "user" | "ai"; text: string; suggestions?: string[] };

const scripted: Record<string, Msg[]> = {
  initial: [{
    from: "ai",
    text: "Bonjour 👋 Je suis l'assistant IA d'Univers Canada. Je peux vous accompagner dans votre projet d'immigration. Quel est votre profil ?",
    suggestions: ["Je suis étudiant", "Salarié", "Entrepreneur", "Regroupement familial"],
  }],
};

const flow: Record<string, Msg> = {
  "je suis étudiant": {
    from: "ai",
    text: "Parfait ! Pour qualifier votre dossier d'études au Canada, j'ai besoin de :\n\n• Votre niveau d'étude actuel\n• Votre âge\n• Votre niveau de français/anglais\n• Votre budget estimé",
    suggestions: ["Réserver un rendez-vous", "Voir les délais", "Documents requis"],
  },
  "salarié": {
    from: "ai",
    text: "Très bien. Le programme Entrée Express pourrait vous correspondre. Pouvez-vous m'indiquer votre profession et vos années d'expérience ?",
    suggestions: ["Voir les programmes", "Calculer mon score", "Prendre RDV"],
  },
  "entrepreneur": {
    from: "ai",
    text: "Le Canada offre plusieurs programmes pour entrepreneurs : Start-up Visa, programmes provinciaux... Quel est votre secteur d'activité ?",
    suggestions: ["Start-up Visa", "Programme Québec", "Prendre RDV"],
  },
  "regroupement familial": {
    from: "ai",
    text: "Le parrainage familial est possible pour un conjoint, enfant ou parent. Quel est votre lien avec la personne au Canada ?",
    suggestions: ["Conjoint", "Enfant", "Parent"],
  },
  "réserver un rendez-vous": {
    from: "ai",
    text: "Très bien ✅ Voici les créneaux disponibles avec un conseiller immigration :",
    suggestions: ["Jeudi 12 Juin – 10:00", "Vendredi 13 Juin – 14:30", "Lundi 16 Juin – 09:00"],
  },
  "voir les délais": {
    from: "ai",
    text: "Délais moyens 2025 :\n\n• Permis d'études : 8 à 12 semaines\n• Entrée Express : 6 mois\n• Visa visiteur : 30 jours\n• Permis de travail : 2 à 4 mois",
    suggestions: ["Prendre RDV", "Prix de nos services"],
  },
  "documents requis": {
    from: "ai",
    text: "Pour un permis d'études :\n\n• Passeport valide\n• Lettre d'acceptation DEC/établissement\n• Preuve de fonds (10 000 CAD/an)\n• Test linguistique (IELTS/TEF)\n• Photo d'identité aux normes",
    suggestions: ["Prendre RDV", "Prix des services"],
  },
  "prix de nos services": {
    from: "ai",
    text: "Nos tarifs :\n\n• Consultation : 500 MAD\n• Étude de dossier : 2 500 MAD\n• Procédure visa complète : 12 000 MAD\n\nPaiement échelonné disponible.",
    suggestions: ["Réserver un rendez-vous"],
  },
};

const defaultReply: Msg = {
  from: "ai",
  text: "Je transmets votre demande à un conseiller. Souhaitez-vous prendre rendez-vous dès maintenant ?",
  suggestions: ["Réserver un rendez-vous", "Voir les délais"],
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(scripted.initial);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const key = text.toLowerCase().trim();
      const match = Object.keys(flow).find((k) => key.includes(k));
      const reply = match ? flow[match] : defaultReply;
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 900);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full canada-gradient text-white flex items-center justify-center shadow-glow transition-all hover:scale-105",
          open && "rotate-90"
        )}
        aria-label="Assistant IA"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!open && <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse-dot" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] bg-card rounded-2xl shadow-glow border border-border flex flex-col overflow-hidden animate-fade-in-up">
          <div className="canada-gradient text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold text-sm">Assistant IA Immigration</div>
              <div className="text-[11px] text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse-dot" /> En ligne · Réponse instantanée
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed shadow-sm",
                  m.from === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm",
                )}>
                  {m.text}
                  {m.suggestions && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 transition font-medium"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-1.5 mb-2">
              <button onClick={() => send("Réserver un rendez-vous")} className="text-[10px] px-2 py-1 rounded-md bg-muted hover:bg-muted/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> RDV
              </button>
              <button onClick={() => send("Documents requis")} className="text-[10px] px-2 py-1 rounded-md bg-muted hover:bg-muted/70 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Documents
              </button>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="w-10 h-10 rounded-lg canada-gradient text-white flex items-center justify-center hover:opacity-90 transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
