import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { User, Bell, Shield, Plug, CreditCard, Globe } from "lucide-react";

export const Route = createFileRoute("/_app/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — Univers Canada" }] }),
  component: SettingsPage,
});

const integrations = [
  { name: "Google Calendar", desc: "Synchronisation rendez-vous", on: true },
  { name: "Outlook 365", desc: "Emails et calendrier", on: true },
  { name: "WhatsApp Business API", desc: "Messagerie automatisée", on: true },
  { name: "API Immigration Canada", desc: "Suivi temps réel IRCC", on: true },
  { name: "OCR Documents IA", desc: "Reconnaissance automatique", on: true },
  { name: "Stripe Payments", desc: "Encaissement en ligne", on: false },
];

function SettingsPage() {
  return (
    <>
      <Topbar title="Paramètres" subtitle="Gérez votre cabinet et vos intégrations" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 grid lg:grid-cols-[220px_1fr] gap-4">
        <div className="bg-card rounded-2xl border border-border p-3 h-fit">
          {[
            { i: User, l: "Profil cabinet", a: true },
            { i: Bell, l: "Notifications" },
            { i: Shield, l: "Sécurité & RGPD" },
            { i: Plug, l: "Intégrations" },
            { i: CreditCard, l: "Abonnement" },
            { i: Globe, l: "Langue & région" },
          ].map((e) => (
            <button key={e.l} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${e.a ? "bg-primary text-white" : "hover:bg-muted"}`}>
              <e.i className="w-4 h-4" /> {e.l}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold mb-1">Informations du cabinet</h3>
            <p className="text-xs text-muted-foreground mb-5">Visible sur vos factures et communications</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Nom du cabinet", "Univers Canada"],
                ["Email principal", "contact@universcanada.ma"],
                ["Téléphone", "+212 522-345-678"],
                ["Adresse", "12 Bd Mohammed V, Casablanca"],
                ["RC", "456789"],
                ["ICE", "002345678000098"],
              ].map(([l, v]) => (
                <div key={l}>
                  <label className="text-xs text-muted-foreground mb-1 block">{l}</label>
                  <input defaultValue={v} className="w-full h-10 px-3 rounded-lg border border-border text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold mb-1">Intégrations</h3>
            <p className="text-xs text-muted-foreground mb-5">Connectez vos outils favoris</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {integrations.map((i) => (
                <div key={i.name} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className="w-9 h-9 rounded-lg canada-gradient text-white flex items-center justify-center text-xs font-bold">
                    {i.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{i.name}</div>
                    <div className="text-[11px] text-muted-foreground">{i.desc}</div>
                  </div>
                  <button className={`text-[10px] font-bold px-2 py-1 rounded-md ${i.on ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    {i.on ? "Connecté" : "Connecter"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
