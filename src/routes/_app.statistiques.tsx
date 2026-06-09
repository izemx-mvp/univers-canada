import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { revenusMensuels } from "@/lib/mock-data";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/statistiques")({
  head: () => ({ meta: [{ title: "Statistiques — Univers Canada" }] }),
  component: StatsPage,
});

const procData = [
  { name: "Entrée Express", value: 28, color: "#D80621" },
  { name: "Études", value: 22, color: "#3b82f6" },
  { name: "Travail", value: 18, color: "#10b981" },
  { name: "Famille", value: 14, color: "#a855f7" },
  { name: "Touristique", value: 12, color: "#f59e0b" },
];

function StatsPage() {
  return (
    <>
      <Topbar title="Statistiques & analytics" subtitle="Performance globale du cabinet" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 grid lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-display font-semibold mb-4">Évolution du CA</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenusMensuels}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D80621" stopOpacity={0.4}/><stop offset="100%" stopColor="#D80621" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="mois" stroke="#94a3b8" fontSize={11} /><YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip /><Area type="monotone" dataKey="revenu" stroke="#D80621" fill="url(#g1)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-display font-semibold mb-4">Dossiers par type de procédure</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={procData} dataKey="value" innerRadius={50} outerRadius={90}>{procData.map(d => <Cell key={d.name} fill={d.color} />)}</Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">Performance conseillers</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { name: "Karim B.", dossiers: 18, approuves: 14 },
              { name: "Nadia R.", dossiers: 22, approuves: 19 },
              { name: "Youssef A.", dossiers: 15, approuves: 11 },
              { name: "Leila C.", dossiers: 19, approuves: 16 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} /><YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip /><Bar dataKey="dossiers" fill="#D80621" radius={[8,8,0,0]} /><Bar dataKey="approuves" fill="#10b981" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">Taux d'approbation visa (12 mois)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { m: "Juil", taux: 78 }, { m: "Août", taux: 82 }, { m: "Sept", taux: 79 }, { m: "Oct", taux: 85 },
              { m: "Nov", taux: 88 }, { m: "Déc", taux: 84 }, { m: "Jan", taux: 90 }, { m: "Fév", taux: 92 },
              { m: "Mar", taux: 89 }, { m: "Avr", taux: 94 }, { m: "Mai", taux: 91 }, { m: "Juin", taux: 96 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} /><YAxis stroke="#94a3b8" fontSize={11} domain={[60, 100]} />
              <Tooltip /><Line type="monotone" dataKey="taux" stroke="#D80621" strokeWidth={3} dot={{ fill: "#D80621", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
