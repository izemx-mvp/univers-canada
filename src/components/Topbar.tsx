import { Bell, Search, Plus, Globe } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 shrink-0 bg-card/90 backdrop-blur border-b border-border px-6 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-display font-semibold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>

      <div className="hidden md:flex relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Rechercher dossier, candidat..."
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent focus:bg-background focus:border-border outline-none text-sm transition"
        />
      </div>

      <button className="hidden md:flex h-9 px-3 items-center gap-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted">
        <Globe className="w-3.5 h-3.5" /> FR
      </button>

      <button className="relative h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
      </button>

      <button className="hidden sm:inline-flex h-9 px-3 items-center gap-1.5 rounded-lg canada-gradient text-white text-xs font-semibold shadow-elegant hover:opacity-95">
        <Plus className="w-3.5 h-3.5" /> Nouveau dossier
      </button>

      <div className="flex items-center gap-2 pl-2 border-l border-border">
        <div className="w-9 h-9 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold">
          NF
        </div>
        <div className="hidden lg:block">
          <div className="text-sm font-medium leading-tight">Nadia Fathallah</div>
          <div className="text-[10px] text-muted-foreground">Conseiller senior</div>
        </div>
      </div>
    </header>
  );
}
