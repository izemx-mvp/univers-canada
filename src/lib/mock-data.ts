export type DossierStatus =
  | "nouveau"
  | "qualifie"
  | "rdv"
  | "documents"
  | "analyse"
  | "preparation"
  | "soumis"
  | "attente"
  | "approuve"
  | "cloture"
  | "refuse";

export type ProcedureType =
  | "Entrée Express"
  | "Études au Canada"
  | "Permis de travail"
  | "Regroupement familial"
  | "Visa touristique"
  | "Résidence permanente"
  | "Immigration économique";

export interface Dossier {
  id: string;
  ref: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  age: number;
  niveauEtude: string;
  langues: string[];
  revenus: string;
  procedure: ProcedureType;
  status: DossierStatus;
  conseiller: string;
  scoreIA: number;
  progression: number;
  priorite: "haute" | "moyenne" | "basse";
  dateCreation: string;
  dateRdv?: string;
  montant: number;
  tags: string[];
  avatar?: string;
}

const villes = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Agadir", "Meknès", "Oujda", "Tétouan", "Salé"];
const conseillers = ["Karim Benali", "Nadia Rochdi", "Youssef Amrani", "Leila Chakir"];
const procedures: ProcedureType[] = [
  "Entrée Express", "Études au Canada", "Permis de travail",
  "Regroupement familial", "Visa touristique", "Résidence permanente", "Immigration économique",
];

const candidats = [
  { p: "Yassine", n: "El Mansouri" }, { p: "Sara", n: "Bennis" },
  { p: "Imane", n: "Ait Lahcen" }, { p: "Mehdi", n: "Chraibi" },
  { p: "Hamza", n: "El Fassi" }, { p: "Kaoutar", n: "Benjelloun" },
  { p: "Othmane", n: "Idrissi" }, { p: "Salma", n: "Tazi" },
  { p: "Zakaria", n: "Alaoui" }, { p: "Aya", n: "Lahlou" },
  { p: "Rachid", n: "Berrada" }, { p: "Fatima", n: "Zahraoui" },
  { p: "Anas", n: "El Khattabi" }, { p: "Houda", n: "Naciri" },
  { p: "Ilyas", n: "Mountassir" }, { p: "Nora", n: "El Amrani" },
  { p: "Soufiane", n: "Bouazza" }, { p: "Meryem", n: "Tahiri" },
  { p: "Khalid", n: "Sabri" }, { p: "Lina", n: "Bouhlal" },
  { p: "Adam", n: "Cherkaoui" }, { p: "Yasmine", n: "El Idrissi" },
  { p: "Mohamed", n: "Belhaj" }, { p: "Ghita", n: "Benkirane" },
];

const statuses: DossierStatus[] = [
  "nouveau", "qualifie", "rdv", "documents", "analyse",
  "preparation", "soumis", "attente", "approuve", "cloture", "refuse",
];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

function makePhone(i: number): string {
  const n = (600000000 + i * 1234567) % 700000000;
  const s = String(600000000 + n).slice(0, 9);
  return `+212 ${s.slice(0, 1)}${s.slice(1, 3)}-${s.slice(3, 6)}-${s.slice(6, 9)}`;
}

export const dossiers: Dossier[] = candidats.map((c, i) => {
  const status = pick(statuses, i);
  const procedure = pick(procedures, i + 1);
  const conseiller = pick(conseillers, i);
  const ville = pick(villes, i + 2);
  const age = 22 + ((i * 3) % 25);
  const score = 55 + ((i * 7) % 45);
  const progression = Math.min(95, 10 + ((i * 11) % 95));
  const montants = [500, 2500, 5000, 8500, 12000, 15000];
  const priorite: Dossier["priorite"] = i % 5 === 0 ? "haute" : i % 3 === 0 ? "moyenne" : "basse";
  const day = ((i * 3) % 28) + 1;
  const month = ((i % 6) + 1).toString().padStart(2, "0");
  return {
    id: `DOS-${1000 + i}`,
    ref: `UC-2025-${(1000 + i).toString()}`,
    prenom: c.p,
    nom: c.n,
    email: `${c.p.toLowerCase()}.${c.n.toLowerCase().replace(/\s/g, "")}@gmail.com`,
    telephone: makePhone(i),
    ville,
    age,
    niveauEtude: pick(["Bac+2", "Licence", "Master", "Doctorat", "Bac+5", "Ingénieur"], i),
    langues: i % 2 === 0 ? ["Français", "Anglais"] : ["Français", "Arabe", "Anglais"],
    revenus: pick(["8 000 MAD", "12 000 MAD", "18 000 MAD", "25 000 MAD", "35 000 MAD"], i),
    procedure,
    status,
    conseiller,
    scoreIA: score,
    progression,
    priorite,
    dateCreation: `2025-${month}-${day.toString().padStart(2, "0")}`,
    dateRdv: i % 2 === 0 ? `2026-06-${(10 + (i % 20)).toString().padStart(2, "0")}T${(9 + (i % 8)).toString().padStart(2, "0")}:00` : undefined,
    montant: pick(montants, i),
    tags: i % 3 === 0 ? ["VIP", "Urgent"] : i % 2 === 0 ? ["Étudiant"] : ["Famille"],
  };
});

export const statusLabels: Record<DossierStatus, string> = {
  nouveau: "Nouveau lead",
  qualifie: "Lead qualifié",
  rdv: "Premier rendez-vous",
  documents: "Documents reçus",
  analyse: "Analyse du dossier",
  preparation: "Préparation du dépôt",
  soumis: "Dossier soumis",
  attente: "Attente immigration",
  approuve: "Visa approuvé",
  cloture: "Dossier clôturé",
  refuse: "Refusé",
};

export const statusColors: Record<DossierStatus, string> = {
  nouveau: "bg-slate-100 text-slate-700 border-slate-200",
  qualifie: "bg-blue-50 text-blue-700 border-blue-200",
  rdv: "bg-indigo-50 text-indigo-700 border-indigo-200",
  documents: "bg-amber-50 text-amber-700 border-amber-200",
  analyse: "bg-purple-50 text-purple-700 border-purple-200",
  preparation: "bg-cyan-50 text-cyan-700 border-cyan-200",
  soumis: "bg-violet-50 text-violet-700 border-violet-200",
  attente: "bg-orange-50 text-orange-700 border-orange-200",
  approuve: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cloture: "bg-zinc-100 text-zinc-700 border-zinc-200",
  refuse: "bg-red-50 text-red-700 border-red-200",
};

export const kanbanColumns: DossierStatus[] = [
  "nouveau", "qualifie", "rdv", "documents", "analyse",
  "preparation", "soumis", "attente", "approuve", "cloture",
];

export const rendezVous = dossiers
  .filter(d => d.dateRdv)
  .slice(0, 12)
  .map((d, i) => ({
    id: `RDV-${i + 1}`,
    dossierId: d.id,
    candidat: `${d.prenom} ${d.nom}`,
    date: d.dateRdv!,
    duree: 45,
    type: pick(["Consultation initiale", "Suivi dossier", "Préparation entretien", "Signature contrat"], i),
    conseiller: d.conseiller,
    mode: i % 2 === 0 ? "Visioconférence" : "Présentiel",
    statut: i % 3 === 0 ? "confirme" : i % 3 === 1 ? "en_attente" : "termine",
  }));

export const factures = dossiers.slice(0, 14).map((d, i) => ({
  id: `FAC-2025-${(200 + i).toString()}`,
  candidat: `${d.prenom} ${d.nom}`,
  dossierId: d.id,
  description: pick(["Consultation immigration", "Étude de dossier", "Procédure visa complète", "Préparation entretien"], i),
  montant: d.montant,
  date: d.dateCreation,
  statut: i % 4 === 0 ? "impaye" : i % 4 === 1 ? "partiel" : "paye",
  methode: pick(["Virement", "Carte bancaire", "Espèces", "Chèque"], i),
}));

export const documents = [
  { nom: "Passeport.pdf", taille: "2.4 MB", date: "2025-05-12", type: "Identité" },
  { nom: "Diplome_Bac.pdf", taille: "1.1 MB", date: "2025-05-12", type: "Diplôme" },
  { nom: "Releve_Bancaire.pdf", taille: "890 KB", date: "2025-05-14", type: "Financier" },
  { nom: "IELTS_Result.pdf", taille: "420 KB", date: "2025-05-18", type: "Langue" },
  { nom: "Contrat_Travail.pdf", taille: "1.8 MB", date: "2025-05-20", type: "Professionnel" },
  { nom: "Photo_Identite.jpg", taille: "320 KB", date: "2025-05-21", type: "Identité" },
  { nom: "Acte_Naissance.pdf", taille: "510 KB", date: "2025-05-22", type: "Civil" },
];

export const activites = [
  { id: 1, type: "lead", texte: "Nouveau lead : Yassine El Mansouri (Casablanca)", time: "Il y a 5 min", couleur: "bg-blue-500" },
  { id: 2, type: "rdv", texte: "RDV confirmé avec Sara Bennis pour demain 10h00", time: "Il y a 22 min", couleur: "bg-indigo-500" },
  { id: 3, type: "doc", texte: "Imane Ait Lahcen a uploadé IELTS_Result.pdf", time: "Il y a 1h", couleur: "bg-amber-500" },
  { id: 4, type: "paiement", texte: "Paiement reçu : 12 000 MAD — Mehdi Chraibi", time: "Il y a 2h", couleur: "bg-emerald-500" },
  { id: 5, type: "visa", texte: "🎉 Visa approuvé pour Hamza El Fassi", time: "Il y a 3h", couleur: "bg-emerald-500" },
  { id: 6, type: "ai", texte: "Score IA mis à jour pour 4 dossiers", time: "Il y a 5h", couleur: "bg-primary" },
];

export const stats = {
  totalDossiers: dossiers.length,
  enCours: dossiers.filter(d => !["approuve", "refuse", "cloture"].includes(d.status)).length,
  approuves: dossiers.filter(d => d.status === "approuve").length,
  refuses: dossiers.filter(d => d.status === "refuse").length,
  rdvJour: 7,
  leadsQualifies: dossiers.filter(d => d.status === "qualifie" || d.status === "nouveau").length,
  revenus: factures.filter(f => f.statut === "paye").reduce((s, f) => s + f.montant, 0),
  docsManquants: 18,
};

export const revenusMensuels = [
  { mois: "Jan", revenu: 42000, dossiers: 8 },
  { mois: "Fév", revenu: 56000, dossiers: 11 },
  { mois: "Mar", revenu: 71000, dossiers: 14 },
  { mois: "Avr", revenu: 65000, dossiers: 12 },
  { mois: "Mai", revenu: 89000, dossiers: 17 },
  { mois: "Juin", revenu: 104000, dossiers: 21 },
];
