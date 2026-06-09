import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { documents } from "@/lib/mock-data";
import { FileText, Upload, Download, Eye, FileCheck2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/documents")({
  head: () => ({ meta: [{ title: "Documents — Univers Canada" }] }),
  component: DocsPage,
});

const typeColors: Record<string, string> = {
  Identité: "bg-blue-50 text-blue-700",
  Diplôme: "bg-purple-50 text-purple-700",
  Financier: "bg-emerald-50 text-emerald-700",
  Langue: "bg-amber-50 text-amber-700",
  Professionnel: "bg-cyan-50 text-cyan-700",
  Civil: "bg-rose-50 text-rose-700",
};

function DocsPage() {
  return (
    <>
      <Topbar title="Documents administratifs" subtitle="OCR automatique & classification IA" />
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold">Documents récents</h3>
              <button className="h-9 px-3 rounded-lg canada-gradient text-white text-xs font-semibold flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Téléverser
              </button>
            </div>
            <div className="divide-y divide-border">
              {documents.map((d) => (
                <div key={d.nom} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{d.nom}</div>
                    <div className="text-[11px] text-muted-foreground">{d.taille} · {d.date}</div>
                  </div>
                  <span className={`text-[11px] px-2 py-1 rounded-md font-medium ${typeColors[d.type] || "bg-muted text-muted-foreground"}`}>
                    {d.type}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    <FileCheck2 className="w-3 h-3" /> OCR validé
                  </div>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"><Download className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-display font-semibold mb-3">Checklist standard</h3>
              <div className="space-y-2 text-xs">
                {["Passeport", "Diplômes", "Relevés bancaires", "Test linguistique", "Photo identité", "Acte de naissance"].map((c, i) => (
                  <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={i < 4} className="accent-primary" />
                    <span className={i < 4 ? "line-through text-muted-foreground" : ""}>{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="rounded-2xl canada-gradient text-white p-5">
              <Sparkles className="w-5 h-5 mb-2" />
              <div className="font-display font-semibold text-sm">OCR + IA</div>
              <p className="text-xs text-white/85 mt-1">Extraction et classification automatique des documents en moins de 3 secondes.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
