import { useState, useMemo } from "react";
import { Search, X, ChevronUp, ChevronDown, Minus } from "lucide-react";

type Tier = "champion" | "skeptic" | "supporter" | "observer" | "outcomes" | "approvers";

interface Stakeholder {
  id: number;
  mirrorOf?: number;
  name: string;
  initials: string;
  title: string;
  company: string;
  dept: string;
  influence: number;
  engagement: number;
  tier: Tier;
  budget: number;
  lastContact: string;
  nextAction: string;
  notes: string;
  trend: "up" | "down" | "flat";
  sme: string;
}

const DATA: Stakeholder[] = [
  { id: 1, name: "Collin McNeese", initials: "CM", title: "GHEC Lead, CS Practices", company: "GitHub", dept: "CS Practices", influence: 87, engagement: 88, tier: "skeptic", budget: 250000, lastContact: "Jun 20, 2026", nextAction: "Advisory board Q3 kickoff", notes: "The CS Practices team are close partners for establishing best practices for adoption across our core product SKUs. We keep an active line of communication going via the Slack channel #cs-practices-and-success-at-scale-collaboration and will often work async in Loop.", trend: "up", sme: "GHEC" },
  { id: 3, name: "Brielle Johnston", initials: "BJ", title: "Program Manager, SaS", company: "GitHub", dept: "Success at Scale", influence: 72, engagement: 78, tier: "skeptic", budget: 180000, lastContact: "Jun 18, 2026", nextAction: "Partner summit keynote", notes: "Enthusiastic about co-marketing. Has introduced 3 qualified referrals this quarter. Championing integration roadmap internally.", trend: "up", sme: "Digital Campaigns" },
  { id: 4, name: "Amanda Selck", initials: "AS", title: "Senior Ops Analyst, Project Alfred", company: "GitHub", dept: "Project Alfred", influence: 68, engagement: 72, tier: "supporter", budget: 120000, lastContact: "Jun 1, 2026", nextAction: "Technical deep-dive Jul 10", notes: "Security and SSO integration concerns unresolved. Needs dedicated solutions architect. Potential blocker for enterprise expansion.", trend: "down", sme: "Gainsight" },
  { id: 5, name: "Tom Horton", initials: "TH", title: "GHAS Lead, CS Practices", company: "GitHub", dept: "CS Practices", influence: 62, engagement: 85, tier: "skeptic", budget: 60000, lastContact: "Jun 23, 2026", nextAction: "Monthly check-in Jul 7", notes: "The CS Practices team are close partners for establishing best practices for adoption across our core product SKUs. We keep an active line of communication going via the Slack channel #cs-practices-and-success-at-scale-collaboration and will often work async in Loop.", trend: "up", sme: "GHAS" },
  { id: 8, name: "Michelle Lou", initials: "ML", title: "Data Analyst, CS Analytics", company: "GitHub", dept: "CS Analytics", influence: 65, engagement: 78, tier: "observer", budget: 40000, lastContact: "Jun 24, 2026", nextAction: "User group facilitation Jul 2", notes: "Champions user community events. Drives forum engagement. High activity, limited organizational influence beyond community sphere.", trend: "up", sme: "Audience/Reporting" },
  { id: 9, name: "Abir Chowdhury", initials: "AC", title: "Program Manager, SaS", company: "GitHub", dept: "Success at Scale", influence: 98, engagement: 65, tier: "skeptic", budget: 1200000, lastContact: "Jun 10, 2026", nextAction: "Exec dinner Q3", notes: "Supportive at executive level but time-constrained. Delegates decisions through Collin McNeese. Strategic alignment confirmed in last board meeting.", trend: "flat", sme: "Digital Campaigns" },
  { id: 10, name: "Sneha Modi", initials: "SM", title: "Director, CS Analytics", company: "GitHub", dept: "CS Analytics", influence: 75, engagement: 25, tier: "observer", budget: 75000, lastContact: "May 28, 2026", nextAction: "Product roadmap review Jul 8", notes: "Evaluating product fit against internal roadmap. Engaged but not committed. Attending Scale Summit as passive attendee.", trend: "flat", sme: "Audience/Reporting" },
  { id: 12, name: "Lauren Bosnjak", initials: "LB", title: "Copilot Lead, CS Practices", company: "GitHub", dept: "CS Practices", influence: 60, engagement: 72, tier: "skeptic", budget: 45000, lastContact: "Jun 21, 2026", nextAction: "Team training session Jul 3", notes: "The CS Practices team are close partners for establishing best practices for adoption across our core product SKUs. We keep an active line of communication going via the Slack channel #cs-practices-and-success-at-scale-collaboration and will often work async in Loop.", trend: "up", sme: "Copilot" },
  { id: 13, name: "Amy Kassir", initials: "AK", title: "Senior Manager, SaS", company: "GitHub", dept: "Success at Scale", influence: 65, engagement: 72, tier: "approvers", budget: 95000, lastContact: "Jun 17, 2026", nextAction: "Program review Jul 9", notes: "Coordinates cross-functional initiatives within the campaign. Strong relationship with exec sponsors and field teams.", trend: "up", sme: "Digital/Scaled Success" },
  { id: 14, name: "Amanda Boyle", initials: "AB", title: "Director, SaS", company: "GitHub", dept: "Success at Scale", influence: 74, engagement: 55, tier: "approvers", budget: 130000, lastContact: "Jun 12, 2026", nextAction: "Quarterly business review Jul 14", notes: "Oversees customer health metrics for key accounts. Building internal dashboard for campaign attribution tracking.", trend: "flat", sme: "Digital/Scaled Success and Community" },
  { id: 15, name: "Solutions Engineer", initials: "SE", title: "Solutions Engineer", company: "GitHub", dept: "Sales", influence: 45, engagement: 25, tier: "champion", budget: 130000, lastContact: "Jun 12, 2026", nextAction: "Quarterly business review Jul 14", notes: "Oversees customer health metrics for key accounts. Building internal dashboard for campaign attribution tracking.", trend: "flat", sme: "Net-New Logo" },
  { id: 16, name: "Customer Success", initials: "CS", title: "CSM", company: "GitHub", dept: "Customer Outcomes", influence: 45, engagement: 25, tier: "outcomes", budget: 130000, lastContact: "Jun 12, 2026", nextAction: "Quarterly business review Jul 14", notes: "Oversees customer health metrics for key accounts. Building internal dashboard for campaign attribution tracking.", trend: "flat", sme: "Customer Success" },
  { id: 17, name: "CS Architect", initials: "CA", title: "CSA", company: "GitHub", dept: "Customer Outcomes", influence: 45, engagement: 25, tier: "outcomes", budget: 130000, lastContact: "Jun 12, 2026", nextAction: "Quarterly business review Jul 14", notes: "Oversees customer health metrics for key accounts. Building internal dashboard for campaign attribution tracking.", trend: "flat", sme: "Technical CS" },
];

const TIER = {
  champion:  { label: "Sales",             color: "#00c9a7", dimColor: "rgba(0,201,167,0.15)",   quadrant: "Core Execution"  },
  skeptic:   { label: "Content",           color: "#f4a261", dimColor: "rgba(244,162,97,0.12)",  quadrant: "Core Execution"  },
  supporter: { label: "Tooling/Systems",   color: "#60a5fa", dimColor: "rgba(96,165,250,0.12)",  quadrant: "Core Execution"  },
  observer:  { label: "Data",              color: "#94a3b8", dimColor: "rgba(148,163,184,0.1)",  quadrant: "Core Execution"  },
  outcomes:  { label: "Customer Outcomes", color: "#c084fc", dimColor: "rgba(192,132,252,0.13)", quadrant: "Build Alignment" },
  approvers: { label: "Final Approvers",   color: "#f87171", dimColor: "rgba(248,113,113,0.13)", quadrant: "Core Execution"  },
};

const SW = 960, SH = 680;
const PL = 48, PR = 16, PT = 16, PB = 44;
const PW = SW - PL - PR;
const PH = SH - PT - PB;
const BUBBLE_R = 24;
const MONITOR_RESULTS_MIRRORS = new Set(["BJ", "CM", "LB", "TH", "AB", "AK", "SE"]);
const BUILD_ALIGNMENT_MIRRORS = new Set(["SE", "CS", "CA"]);

function buildMapStakeholders(stakeholders: Stakeholder[]) {
  const monitorMirrors = stakeholders
    .filter((s) => MONITOR_RESULTS_MIRRORS.has(s.initials))
    .map((s) => ({
      ...s,
      id: s.id + 1000,
      mirrorOf: s.id,
      influence: 45,
      engagement: 75,
    }));

  const buildMirrors = stakeholders
    .filter((s) => BUILD_ALIGNMENT_MIRRORS.has(s.initials))
    .map((s) => ({
      ...s,
      id: s.id + 2000,
      mirrorOf: s.id,
      engagement: 25,
      influence: 75,
    }));

  return [...stakeholders, ...monitorMirrors, ...buildMirrors];
}

function layoutBubbles(stakeholders: Stakeholder[]) {
  const midX = PL + PW / 2;
  const midY = PT + PH / 2;
  const pad = BUBBLE_R + 28;
  const groups = {
    topLeft:     stakeholders.filter(s => s.engagement < 50 && s.influence >= 50),
    topRight:    stakeholders.filter(s => s.engagement >= 50 && s.influence >= 50),
    bottomLeft:  stakeholders.filter(s => s.engagement < 50 && s.influence < 50),
    bottomRight: stakeholders.filter(s => s.engagement >= 50 && s.influence < 50),
  };
  const positions: { id: number; x: number; y: number }[] = [];
  const minStep = BUBBLE_R * 2 + 16;
  function gridPlace(items: Stakeholder[], x0: number, x1: number, y0: number, y1: number) {
    const n = items.length;
    if (n === 0) return;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const stepX = Math.max((x1 - x0) / (cols + 1), minStep);
    const stepY = Math.max((y1 - y0) / (rows + 1), minStep);
    items.forEach((s, i) => {
      positions.push({ id: s.id, x: x0 + ((i % cols) + 1) * stepX, y: y0 + (Math.floor(i / cols) + 1) * stepY });
    });
  }
  gridPlace(groups.topLeft,     PL + pad, midX - pad, PT + pad, midY - pad);
  gridPlace(groups.topRight,    midX + pad, PL + PW - pad, PT + pad, midY - pad);
  gridPlace(groups.bottomLeft,  PL + pad, midX - pad, midY + pad, PT + PH - pad);
  gridPlace(groups.bottomRight, midX + pad, PL + PW - pad, midY + pad, PT + PH - pad);
  return positions;
}

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <ChevronUp style={{ width: 12, height: 12, color: "#34d399" }} />;
  if (trend === "down") return <ChevronDown style={{ width: 12, height: 12, color: "#f87171" }} />;
  return <Minus style={{ width: 12, height: 12, color: "#7a93aa" }} />;
}

function getQuadrantLabel(engagement: number, influence: number): string {
  if (engagement >= 50 && influence >= 50) return "Core Execution";
  if (engagement < 50 && influence >= 50) return "Build Alignment";
  if (engagement >= 50 && influence < 50) return "Monitor Results";
  return "Keep Informed";
}

function getStakeholderQuadrants(s: Stakeholder): string[] {
  const quadrants = new Set<string>();
  quadrants.add(getQuadrantLabel(s.engagement, s.influence));
  if (MONITOR_RESULTS_MIRRORS.has(s.initials)) quadrants.add("Monitor Results");
  if (BUILD_ALIGNMENT_MIRRORS.has(s.initials)) quadrants.add("Build Alignment");
  return [...quadrants];
}

function MetaRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 12, color: "#7a93aa" }}>{label}</span>
      {children ?? <span style={{ fontSize: 12, color: "#e2eaf4" }}>{value}</span>}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Stakeholder | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const depts = [...new Set(DATA.map(s => s.dept))].sort();
  const mapStakeholders = useMemo(() => buildMapStakeholders(DATA), []);
  const bubblePositions = useMemo(() => layoutBubbles(mapStakeholders), [mapStakeholders]);
  const visible = DATA.filter(s => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q))
      && (tierFilter === "all" || s.tier === tierFilter)
      && (deptFilter === "all" || s.dept === deptFilter);
  });
  const stakeholderById = useMemo(() => new Map(DATA.map((stakeholder) => [stakeholder.id, stakeholder])), []);
  const visibleIds = new Set(visible.map((stakeholder) => stakeholder.id));
  const counts = Object.fromEntries((Object.keys(TIER) as Tier[]).map(t => [t, DATA.filter(s => s.tier === t).length])) as Record<Tier, number>;

  const s = { fontFamily: "'DM Sans', sans-serif" };
  const mono = { fontFamily: "'DM Mono', monospace" };
  const serif = { fontFamily: "'Instrument Serif', serif" };
  const bg = { backgroundColor: "var(--background)" };

  return (
    <div style={{ ...s, ...bg, color: "var(--foreground)", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <p style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7a93aa", marginBottom: 2 }}>Success at Scale · Campaign 2026</p>
            <h1 style={{ ...serif, fontSize: 20, color: "var(--foreground)", margin: 0 }}>Stakeholder Map</h1>
          </div>
          <div style={{ width: 1, height: 32, backgroundColor: "var(--border)" }} />
          <div style={{ display: "flex", gap: 20 }}>
            {(Object.keys(TIER) as Tier[]).map(t => (
              <button key={t} onClick={() => setTierFilter(tierFilter === t ? "all" : t)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", opacity: tierFilter !== "all" && tierFilter !== t ? 0.3 : 1, color: "var(--foreground)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: TIER[t].color, display: "inline-block" }} />
                <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{counts[t]}</span>
                <span style={{ fontSize: 12, color: "#7a93aa" }}>{TIER[t].label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#7a93aa" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stakeholders…"
              style={{ ...s, paddingLeft: 36, paddingRight: 12, paddingTop: 6, paddingBottom: 6, backgroundColor: "var(--secondary)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 14, color: "var(--foreground)", width: 208, outline: "none" }} />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            style={{ ...s, backgroundColor: "var(--secondary)", border: "1px solid var(--border)", borderRadius: 4, padding: "6px 12px", fontSize: 14, color: "var(--foreground)", outline: "none" }}>
            <option value="all">All Departments</option>
            {depts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar list */}
        <aside style={{ width: 256, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
          <div style={{ ...mono, padding: "8px 16px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a93aa", borderBottom: "1px solid var(--border)" }}>
            {visible.length} / {DATA.length} stakeholders
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {visible.map(s => {
              const tc = TIER[s.tier];
              const isActive = selected?.id === s.id;
              return (
                <button key={s.id} onClick={() => setSelected(isActive ? null : s)}
                  onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: isActive ? "var(--secondary)" : "none", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left", color: "var(--foreground)" }}>
                  <div style={{ ...mono, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, backgroundColor: tc.dimColor, color: tc.color, border: `1px solid ${tc.color}50` }}>{s.initials}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</p>
                    <p style={{ fontSize: 12, color: "#7a93aa", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
                    <TrendIcon trend={s.trend} />
                    <span style={{ ...mono, fontSize: 9, letterSpacing: "0.08em", color: tc.color }}>{tc.label.toUpperCase()}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Map */}
        <main style={{ flex: 1, position: "relative", overflow: "hidden", padding: 20 }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet">
            <rect x={PL} y={PT} width={PW/2} height={PH/2} fill="rgba(244,162,97,0.04)" />
            <rect x={PL+PW/2} y={PT} width={PW/2} height={PH/2} fill="rgba(0,201,167,0.05)" />
            <rect x={PL} y={PT+PH/2} width={PW/2} height={PH/2} fill="rgba(148,163,184,0.03)" />
            <rect x={PL+PW/2} y={PT+PH/2} width={PW/2} height={PH/2} fill="rgba(96,165,250,0.04)" />
            <line x1={PL+PW/2} y1={PT} x2={PL+PW/2} y2={PT+PH} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 5" />
            <line x1={PL} y1={PT+PH/2} x2={PL+PW} y2={PT+PH/2} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 5" />
            <text x={PL+10} y={PT+14} fill="rgba(244,162,97,0.45)" fontSize={9} fontFamily="DM Mono,monospace" letterSpacing={1.5}>BUILD ALIGNMENT</text>
            <text x={PL+PW/2+10} y={PT+14} fill="rgba(0,201,167,0.45)" fontSize={9} fontFamily="DM Mono,monospace" letterSpacing={1.5}>CORE EXECUTION</text>
            <text x={PL+10} y={PT+PH/2+14} fill="rgba(148,163,184,0.4)" fontSize={9} fontFamily="DM Mono,monospace" letterSpacing={1.5}>KEEP INFORMED</text>
            <text x={PL+PW/2+10} y={PT+PH/2+14} fill="rgba(96,165,250,0.45)" fontSize={9} fontFamily="DM Mono,monospace" letterSpacing={1.5}>MONITOR RESULTS</text>
            <rect x={PL} y={PT} width={PW} height={PH} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            {[0,25,50,75,100].map(p => (
              <g key={p}>
                <text x={PL-7} y={PT+(1-p/100)*PH+3.5} fill="rgba(122,147,170,0.6)" fontSize={8.5} fontFamily="DM Mono,monospace" textAnchor="end">{p}</text>
                <text x={PL+(p/100)*PW} y={PT+PH+16} fill="rgba(122,147,170,0.6)" fontSize={8.5} fontFamily="DM Mono,monospace" textAnchor="middle">{p}</text>
              </g>
            ))}
            <text x={PL+PW/2} y={SH-4} fill="rgba(122,147,170,0.7)" fontSize={9} fontFamily="DM Mono,monospace" textAnchor="middle" letterSpacing={1.5}>ENGAGEMENT LEVEL</text>
            {mapStakeholders.map(s => {
              const pos = bubblePositions.find(p => p.id === s.id)!;
              const tc = TIER[s.tier];
              const isV = visibleIds.has(s.mirrorOf ?? s.id);
              const sourceStakeholder = stakeholderById.get(s.mirrorOf ?? s.id) ?? s;
              const isSel = selected?.id === sourceStakeholder.id;
              const isHov = hovered === s.id;
              return (
                <g key={s.id} style={{ cursor: "pointer", opacity: isV ? 1 : 0.15 }}
                  onClick={() => setSelected(sourceStakeholder)}
                  onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}>
                  {isHov && !isSel && <circle cx={pos.x} cy={pos.y} r={BUBBLE_R+4} fill="none" stroke={tc.color} strokeWidth={1} opacity={0.35} />}
                  <circle cx={pos.x} cy={pos.y} r={BUBBLE_R} fill={tc.dimColor} stroke={tc.color} strokeWidth={isSel ? 2 : 1.5} />
                  <text x={pos.x} y={pos.y+4} textAnchor="middle" fill={tc.color} fontSize={11} fontFamily="DM Mono,monospace" fontWeight={500} pointerEvents="none">{s.initials}</text>
                  {isHov && (
                    <g pointerEvents="none">
                      <rect x={pos.x - (s.name.length * 6.2 + 12) / 2} y={pos.y - BUBBLE_R - 21} width={s.name.length * 6.2 + 12} height={16} rx={2} fill="rgba(0,0,0,0.78)" />
                      <text x={pos.x} y={pos.y-BUBBLE_R-8} textAnchor="middle" fill={tc.color} fontSize={11} fontFamily="DM Sans,sans-serif" fontWeight={500}>{s.name}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </main>

        {/* Detail panel */}
        <aside style={{ borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden", width: selected ? 288 : 0, transition: "width 0.2s" }}>
          {selected && (
            <div style={{ width: 288, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ ...mono, width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, backgroundColor: TIER[selected.tier].dimColor, color: TIER[selected.tier].color, border: `1px solid ${TIER[selected.tier].color}60` }}>{selected.initials}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{selected.name}</p>
                    <p style={{ fontSize: 12, color: "#7a93aa", margin: 0 }}>{selected.title}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7a93aa", marginTop: 2 }}><X style={{ width: 16, height: 16 }} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ ...mono, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, fontSize: 12, letterSpacing: "0.08em", backgroundColor: TIER[selected.tier].dimColor, color: TIER[selected.tier].color }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: TIER[selected.tier].color, display: "inline-block" }} />
                  {TIER[selected.tier].label.toUpperCase()} · {TIER[selected.tier].quadrant}
                </div>
                <div>
                  <p style={{ ...mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a93aa", marginBottom: 6 }}>Notes</p>
                  <p style={{ fontSize: 14, color: "#7a93aa", lineHeight: 1.6, margin: 0 }}>{selected.notes}</p>
                </div>
                <div>
                  <p style={{ ...mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a93aa", marginBottom: 6 }}>Details</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <MetaRow label="Department" value={selected.dept} />
                    <MetaRow label="SME" value={selected.sme} />
                    {(() => { const qs = getStakeholderQuadrants(selected); return qs.length > 1 ? <MetaRow label="Stages" value={qs.join(" · ")} /> : null; })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Footer legend */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "10px 24px", display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
        <span style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a93aa" }}>Legend</span>
        {(Object.keys(TIER) as Tier[]).map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: TIER[t].color, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--foreground)" }}>{TIER[t].label}</span>
          </div>
        ))}
      </footer>
    </div>
  );
}
