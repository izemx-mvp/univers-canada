import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import {
  Briefcase, TrendingUp, Calendar, Users, DollarSign, CheckCircle2,
  XCircle, FileWarning, ArrowUpRight, ArrowDownRight, Bot, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";
import { stats, revenusMensuels, activites, dossiers, statusLabels, statusColors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Univers Canada CRM" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Total dossiers", value: stats.totalDossiers, delta: "+12%", up: true, icon: Briefcase, color: "from-rose-500 to-red-600" },
  { label: "Dossiers en cours", value: stats.enCours, delta: "+8%", up: true, icon: TrendingUp, color: "from-blue-500 to-indigo-600" },
  { label: "RDV aujourd'hui", value: stats.rdvJour, delta: "+2", up: true, icon: Calendar, color: "from-violet-500 to-purple-600" },
  { label: "Leads qualifiés", value: stats.leadsQualifies, delta: "+24%", up: true, icon: Users, color: "from-amber-500 to-orange-600" },
  { label: "Revenus générés", value: `${(stats.revenus / 1000).toFixed(0)}k MAD`, delta: "+18%", up: true, icon: DollarSign, color: "from-emerald-500 to-teal-600" },
  { label: "Visas approuvés", value: stats.approuves, delta: "+3", up: true, icon: CheckCircle2, color: "from-green-500 to-emerald-600" },
  { label: "Dossiers refusés", value: stats.refuses, delta: "-1", up: false, icon: XCircle, color: "from-zinc-500 to-slate-600" },
  { label: "Documents manquants", value: stats.docsManquants, delta: "-6", up: false, icon: FileWarning, color: "from-orange-500 to-red-500" },
];

const pipelineData = [
  { name: "Nouveaux", value: 24, color: "#94a3b8" },
  { name: "Qualifiés", value: 18, color: "#3b82f6" },
  { name: "En analyse", value: 12, color: "#a855f7" },
  { name: "Soumis", value: 9, color: "#8b5cf6" },
  { name: "Approuvés", value: 14, color: "#10b981" },
];

function Dashboard() {
  return (
    <>
      <Topbar title="Tableau de bord" subtitle="Vue globale de votre cabinet — Mardi 9 Juin 2026" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="group relative bg-card rounded-2xl border border-border p-5 hover:shadow-elegant transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center mb-4", k.color)}>
                <k.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-display font-bold tracking-tight">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
              <div className={cn(
                "absolute top-5 right-5 inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md",
                k.up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
              )}>
                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-foreground">Revenus & dossiers</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Évolution sur 6 mois</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1.5 rounded-md bg-primary text-white font-medium">6M</button>
                <button className="px-3 py-1.5 rounded-md hover:bg-muted">1A</button>
                <button className="px-3 py-1.5 rounded-md hover:bg-muted">Tout</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenusMensuels}>
                <defs>
                  <linearGradient id="gradR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D80621" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#D80621" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="mois" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Area type="monotone" dataKey="revenu" stroke="#D80621" strokeWidth={2.5} fill="url(#gradR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">Pipeline dossiers</h3>
            <p className="text-xs text-muted-foreground mb-4">Répartition par étape</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pipelineData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {pipelineData.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {pipelineData.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </div>
                  <span className="font-semibold">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities + AI insight */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold">Derniers dossiers</h3>
              <a className="text-xs text-primary font-medium hover:underline cursor-pointer">Voir tout →</a>
            </div>
            <div className="divide-y divide-border">
              {dossiers.slice(0, 6).map((d) => (
                <div key={d.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition">
                  <div className="w-9 h-9 rounded-full canada-gradient text-white flex items-center justify-center text-xs font-bold">
                    {d.prenom[0]}{d.nom[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{d.prenom} {d.nom}</div>
                    <div className="text-xs text-muted-foreground truncate">{d.procedure} · {d.ville}</div>
                  </div>
                  <div className={cn("hidden md:inline-flex text-[11px] px-2 py-1 rounded-md border font-medium", statusColors[d.status])}>
                    {statusLabels[d.status]}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-primary">{d.scoreIA}%</div>
                    <div className="text-[10px] text-muted-foreground">Score IA</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-display font-semibold mb-4">Activité récente</h3>
              <div className="space-y-3">
                {activites.map((a) => (
                  <div key={a.id} className="flex gap-3 text-sm">
                    <span className={cn("w-2 h-2 mt-1.5 rounded-full shrink-0", a.couleur)} />
                    <div className="flex-1 min-w-0">
                      <div className="text-foreground/90 leading-snug">{a.texte}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl canada-gradient text-white p-5 relative overflow-hidden">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10" />
              <Bot className="w-6 h-6 mb-3" />
              <div className="font-display font-semibold mb-1">Insight IA</div>
              <p className="text-xs text-white/85 leading-relaxed mb-3">
                3 dossiers ont une probabilité d'approbation supérieure à 90%. Prioriser le dépôt cette semaine peut accélérer 18 jours.
              </p>
              <button className="text-xs bg-white text-primary px-3 py-1.5 rounded-md font-semibold hover:bg-white/90">
                Voir les recommandations
              </button>
            </div>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-display font-semibold mb-4">Nouveaux dossiers par mois</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenusMensuels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="mois" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Bar dataKey="dossiers" fill="#D80621" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
