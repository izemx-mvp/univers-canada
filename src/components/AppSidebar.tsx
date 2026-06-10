import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Briefcase, Calendar, FileText, Receipt,
  Workflow, Bot, BarChart3, Settings, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/dossiers", label: "Dossiers", icon: Briefcase },
  { to: "/rendez-vous", label: "Rendez-vous", icon: Calendar },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/facturation", label: "Facturation", icon: Receipt },
  { to: "/workflows", label: "Workflows", icon: Workflow },
  { to: "/ia-assistant", label: "IA Assistant", icon: Bot },
  { to: "/whatsapp", label: "WhatsApp", icon: MessageCircle },
  { to: "/emails", label: "Emails", icon: Mail },
  { to: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { to: "/parametres", label: "Paramètres", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl canada-gradient flex items-center justify-center shadow-glow">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M12 2l1.5 4.5h4.5l-3.6 2.7L15.8 14 12 11.2 8.2 14l1.4-4.8L6 6.5h4.5L12 2zm-1 14h2v2l4 1v3H7v-3l4-1v-2z"/>
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-white text-base leading-tight">Univers Canada</div>
            <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">CRM Immigration</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.to === "/ia-assistant" && (
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">AI</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-dark/30 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-white" />
          <div className="text-xs font-semibold text-white">Plan Premium</div>
        </div>
        <p className="text-[11px] text-sidebar-foreground/70 leading-relaxed mb-3">
          IA, OCR, WhatsApp & sync calendrier illimités.
        </p>
        <button className="w-full text-xs font-medium bg-white text-primary py-1.5 rounded-md hover:bg-white/90 transition">
          Gérer l'abonnement
        </button>
      </div>
    </aside>
  );
}
