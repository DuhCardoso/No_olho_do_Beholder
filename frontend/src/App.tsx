import { useState, useCallback } from "react";

/* ── Types ── */
interface Stat {
  key: string;
  label: string;
  value: number;
}

interface Skill {
  name: string;
  attr: string;
  proficient: boolean;
}

interface VitalBar {
  current: number;
  max: number;
}

interface SheetState {
  sistema: string;
  nome: string;
  raca: string;
  classe: string;
  antecedente: string;
  alinhamento: string;
  nivel: string;
  ca: string;
  iniciativa: string;
  deslocamento: string;
  bonusProficiencia: string;
  hp: VitalBar;
  mp: VitalBar;
  xp: VitalBar;
  stats: Stat[];
  skills: Skill[];
  armaPrincipal: string;
  armaSecundaria: string;
  armadura: string;
  itens: string;
  traco: string;
  ideal: string;
  vinculo: string;
  fraqueza: string;
  historia: string;
  habilidades: string;
}

/* ── Constants ── */
const SISTEMAS = ["D&D 5e", "Pathfinder", "Tormenta20", "Livre"];

const RACAS = ["Humano", "Elfo", "Anão", "Halfling", "Meio-Orc", "Tiefling", "Draconato", "Gnomo", "Personalizado"];
const CLASSES = ["Guerreiro", "Mago", "Ladino", "Clérigo", "Paladino", "Ranger", "Druida", "Bárbaro", "Bardo", "Feiticeiro", "Bruxo", "Monge"];
const ALINHAMENTOS = ["Leal e Bom", "Neutro e Bom", "Caótico e Bom", "Leal e Neutro", "Neutro", "Caótico e Neutro", "Leal e Mau", "Neutro e Mau", "Caótico e Mau"];

const INITIAL_STATS: Stat[] = [
  { key: "FOR", label: "FOR", value: 16 },
  { key: "DES", label: "DES", value: 14 },
  { key: "CON", label: "CON", value: 15 },
  { key: "INT", label: "INT", value: 10 },
  { key: "SAB", label: "SAB", value: 12 },
  { key: "CAR", label: "CAR", value: 13 },
];

const INITIAL_SKILLS: Skill[] = [
  { name: "Acrobacia", attr: "DES", proficient: false },
  { name: "Arcanismo", attr: "INT", proficient: false },
  { name: "Atletismo", attr: "FOR", proficient: false },
  { name: "Atuação", attr: "CAR", proficient: false },
  { name: "Enganação", attr: "CAR", proficient: false },
  { name: "Furtividade", attr: "DES", proficient: false },
  { name: "História", attr: "INT", proficient: false },
  { name: "Intimidação", attr: "CAR", proficient: false },
  { name: "Intuição", attr: "SAB", proficient: false },
  { name: "Investigação", attr: "INT", proficient: false },
  { name: "Lidar c/ Animais", attr: "SAB", proficient: false },
  { name: "Medicina", attr: "SAB", proficient: false },
  { name: "Natureza", attr: "INT", proficient: false },
  { name: "Percepção", attr: "SAB", proficient: false },
  { name: "Persuasão", attr: "CAR", proficient: false },
  { name: "Prestidigitação", attr: "DES", proficient: false },
  { name: "Religião", attr: "INT", proficient: false },
  { name: "Sobrevivência", attr: "SAB", proficient: false },
];

const INITIAL_SHEET: SheetState = {
  sistema: "",
  nome: "", raca: "", classe: "", antecedente: "", alinhamento: "", nivel: "",
  ca: "", iniciativa: "", deslocamento: "", bonusProficiencia: "",
  hp: { current: 85, max: 100 },
  mp: { current: 40, max: 60 },
  xp: { current: 2400, max: 6500 },
  stats: INITIAL_STATS,
  skills: INITIAL_SKILLS,
  armaPrincipal: "", armaSecundaria: "", armadura: "", itens: "",
  traco: "", ideal: "", vinculo: "", fraqueza: "", historia: "", habilidades: "",
};

/* ── Helpers ── */
function modifier(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function barPct(current: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (current / max) * 100));
}

/* ── Sub-components ── */

function RuneHeader({ label }: { label: string }) {
  return (
    <div className="rune-header">
      <span className="font-display text-xs tracking-widest" style={{ color: "#a07830" }}>{label}</span>
    </div>
  );
}

function RpgLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono-rpg block mb-1 font-semibold" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(160,128,80,0.7)" }}>
      {children}
    </label>
  );
}

function StatCircle({ stat, onChange }: { stat: Stat; onChange: (val: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div className="stat-circle">
        <input
          type="number"
          min={1} max={30}
          value={stat.value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#a09070", textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace" }}>
          {stat.label}
        </span>
      </div>
      <span className="font-mono-rpg" style={{ fontSize: "0.7rem", color: "rgba(160,128,60,0.7)" }}>
        {modifier(stat.value)}
      </span>
    </div>
  );
}

function VitalSection({
  label, color, barClass, vital,
  onChange,
}: {
  label: string; color: string; barClass: string;
  vital: VitalBar; onChange: (v: VitalBar) => void;
}) {
  const pct = barPct(vital.current, vital.max);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span className="font-mono-rpg" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color }}>{label}</span>
        <span className="font-mono-rpg" style={{ fontSize: "0.65rem", color }}>{vital.current} / {vital.max}</span>
      </div>
      <div className="bar-track" style={{ marginBottom: 8 }}>
        <div className={`bar-fill ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="number" className="rpg-input" style={{ textAlign: "center" }}
          value={vital.current}
          onChange={(e) => onChange({ ...vital, current: Number(e.target.value) })} />
        <span style={{ color: "rgba(201,168,76,0.3)", flexShrink: 0 }}>/</span>
        <input type="number" className="rpg-input" style={{ textAlign: "center" }}
          value={vital.max}
          onChange={(e) => onChange({ ...vital, max: Number(e.target.value) })} />
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function ForjaDeHerois() {
  const [sheet, setSheet] = useState<SheetState>(INITIAL_SHEET);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });

  const set = useCallback(<K extends keyof SheetState>(key: K, val: SheetState[K]) => {
    setSheet((prev) => ({ ...prev, [key]: val }));
  }, []);

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  const clearSheet = () => {
    if (window.confirm("Limpar toda a ficha?")) {
      setSheet({ ...INITIAL_SHEET, stats: INITIAL_STATS.map((s) => ({ ...s })), skills: INITIAL_SKILLS.map((s) => ({ ...s })) });
      showToast("✦ FICHA LIMPA");
    }
  };

  const toggleSkill = (idx: number) => {
    const updated = sheet.skills.map((s, i) => i === idx ? { ...s, proficient: !s.proficient } : s);
    set("skills", updated);
  };

  const updateStat = (idx: number, val: number) => {
    const updated = sheet.stats.map((s, i) => i === idx ? { ...s, value: val } : s);
    set("stats", updated);
  };

  return (
    <>
      {/* inject global CSS once */}

      <div className="rpg-root">
        {/* Ember particles */}
        {[
          { left: "10%", delay: "0s", dx: "10px" },
          { left: "25%", delay: "0.7s", dx: "-8px" },
          { left: "50%", delay: "1.4s", dx: "12px" },
          { left: "75%", delay: "0.3s", dx: "-6px" },
          { left: "90%", delay: "1.9s", dx: "8px" },
        ].map((e, i) => (
          <div key={i} className="ember" style={{ left: e.left, animationDelay: e.delay, ["--dx" as string]: e.dx }} />
        ))}

        {/* ── HEADER ── */}
        <header style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(120,80,20,0.25)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>⚔️</span>
              <div>
                <div className="font-display" style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.9)", letterSpacing: "0.2em" }}>FORJA DE HERÓIS</div>
                <div className="font-mono-rpg" style={{ fontSize: "0.55rem", color: "rgba(120,80,20,0.6)", letterSpacing: "0.2em" }}>CRIADOR DE FICHAS RPG</div>
              </div>
            </div>
            <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {["MINHAS FICHAS", "BESTIÁRIO", "SOBRE"].map((item) => (
                <a key={item} href="#" className="font-mono-rpg"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(160,120,40,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.9)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(160,120,40,0.5)")}>
                  {item}
                </a>
              ))}
              <button className="btn-secondary">ENTRAR</button>
            </nav>
          </div>
        </header>

        {/* ── HERO BANNER ── */}
        <div className="animate-in" style={{ position: "relative", zIndex: 10, padding: "36px 16px", textAlign: "center" }}>
          <div className="font-display hero-name-glow" style={{ fontSize: "clamp(1.6rem,5vw,3rem)", color: "#c9a84c", marginBottom: 6 }}>
            Nova Ficha
          </div>
          <p className="font-mono-rpg" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(120,80,20,0.6)" }}>
            FORJE SEU DESTINO — ESCREVA SUA LENDA
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {SISTEMAS.map((s) => (
              <button key={s}
                className={`trait-tag ${sheet.sistema === s ? "active" : "inactive"}`}
                onClick={() => set("sistema", s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN ── */}
        <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "0 16px 80px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* IDENTIDADE */}
          <section className="card-section animate-in">
            <RuneHeader label="IDENTIDADE" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { label: "NOME DO PERSONAGEM", key: "nome" as const, placeholder: "Ex: Aldric, o Cinzento" },
                { label: "ANTECEDENTE", key: "antecedente" as const, placeholder: "Ex: Soldado, Nobre, Sábio..." },
                { label: "NÍVEL", key: "nivel" as const, placeholder: "1" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <RpgLabel>{label}</RpgLabel>
                  <input type="text" className="rpg-input" placeholder={placeholder}
                    value={sheet[key] as string}
                    onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}

              {/* RAÇA */}
              <div>
                <RpgLabel>RAÇA</RpgLabel>
                <select className="rpg-input" value={sheet.raca} onChange={(e) => set("raca", e.target.value)}>
                  <option value="">— Escolha —</option>
                  {RACAS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>

              {/* CLASSE */}
              <div>
                <RpgLabel>CLASSE</RpgLabel>
                <select className="rpg-input" value={sheet.classe} onChange={(e) => set("classe", e.target.value)}>
                  <option value="">— Escolha —</option>
                  {CLASSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* ALINHAMENTO */}
              <div>
                <RpgLabel>ALINHAMENTO</RpgLabel>
                <select className="rpg-input" value={sheet.alinhamento} onChange={(e) => set("alinhamento", e.target.value)}>
                  <option value="">— Escolha —</option>
                  {ALINHAMENTOS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* VITALIDADE */}
          <section className="card-section animate-in">
            <RuneHeader label="VITALIDADE" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
              <VitalSection label="PONTOS DE VIDA" color="#e57373" barClass="bar-hp"
                vital={sheet.hp} onChange={(v) => set("hp", v)} />
              <VitalSection label="PONTOS DE MANA" color="#64b5f6" barClass="bar-mana"
                vital={sheet.mp} onChange={(v) => set("mp", v)} />
              <VitalSection label="EXPERIÊNCIA" color="#c9a84c" barClass="bar-xp"
                vital={sheet.xp} onChange={(v) => set("xp", v)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", gap: 12, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(201,168,76,0.1)" }}>
              {[
                { label: "CA", key: "ca" as const, placeholder: "15" },
                { label: "INICIATIVA", key: "iniciativa" as const, placeholder: "+3" },
                { label: "DESLOCAMENTO", key: "deslocamento" as const, placeholder: "9m" },
                { label: "BÔNUS PROFIC.", key: "bonusProficiencia" as const, placeholder: "+3" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} style={{ textAlign: "center" }}>
                  <RpgLabel>{label}</RpgLabel>
                  <input type="text" className="rpg-input" style={{ textAlign: "center" }}
                    placeholder={placeholder} value={sheet[key] as string}
                    onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* ATRIBUTOS */}
          <section className="card-section animate-in">
            <RuneHeader label="ATRIBUTOS" />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 24px" }}>
              {sheet.stats.map((stat, i) => (
                <StatCircle key={stat.key} stat={stat} onChange={(val) => updateStat(i, val)} />
              ))}
            </div>
          </section>

          {/* PERÍCIAS + EQUIPAMENTO */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 20 }}>

            {/* Perícias */}
            <section className="card-section animate-in">
              <RuneHeader label="PERÍCIAS" />
              <p className="font-mono-rpg" style={{ fontSize: "0.6rem", color: "rgba(100,70,20,0.55)", marginBottom: 10, letterSpacing: "0.08em" }}>
                Clique para marcar proficiência
              </p>
              {sheet.skills.map((skill, i) => (
                <div key={skill.name} className="skill-row" onClick={() => toggleSkill(i)}>
                  <div className={`skill-dot ${skill.proficient ? "active" : ""}`} />
                  <span style={{ flex: 1, fontSize: "0.9rem", color: "rgba(212,201,176,0.75)" }}>{skill.name}</span>
                  <span className="font-mono-rpg" style={{ fontSize: "0.6rem", color: "rgba(120,90,40,0.6)" }}>{skill.attr}</span>
                  <span className="font-mono-rpg" style={{ fontSize: "0.6rem", color: "rgba(160,120,60,0.7)", width: 28, textAlign: "right" }}>+0</span>
                </div>
              ))}
            </section>

            {/* Equipamento */}
            <section className="card-section animate-in">
              <RuneHeader label="EQUIPAMENTO" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "ARMA PRINCIPAL", key: "armaPrincipal" as const, placeholder: "Ex: Espada Longa +1  |  1d8+4 cortante" },
                  { label: "ARMA SECUNDÁRIA", key: "armaSecundaria" as const, placeholder: "Ex: Adaga  |  1d4+2 perfurante" },
                  { label: "ARMADURA", key: "armadura" as const, placeholder: "Ex: Cota de Malha  |  CA 16" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <RpgLabel>{label}</RpgLabel>
                    <input type="text" className="rpg-input" placeholder={placeholder}
                      value={sheet[key] as string} onChange={(e) => set(key, e.target.value)} />
                  </div>
                ))}
                <div>
                  <RpgLabel>ITENS E MOEDAS</RpgLabel>
                  <textarea className="rpg-input" placeholder="Poção de cura ×2, 150 PO, Chave enferrujada..."
                    value={sheet.itens} onChange={(e) => set("itens", e.target.value)} />
                </div>
              </div>
            </section>
          </div>

          {/* HISTÓRIA & TRAÇOS */}
          <section className="card-section animate-in">
            <RuneHeader label="HISTÓRIA & TRAÇOS" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 }}>
              {[
                { label: "TRAÇO DE PERSONALIDADE", key: "traco" as const, placeholder: "Como o personagem se comporta? O que o torna único?" },
                { label: "IDEAL", key: "ideal" as const, placeholder: "O que o personagem valoriza acima de tudo?" },
                { label: "VÍNCULO", key: "vinculo" as const, placeholder: "O que conecta o personagem ao mundo?" },
                { label: "FRAQUEZA", key: "fraqueza" as const, placeholder: "Qual o calcanhar de Aquiles do personagem?" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <RpgLabel>{label}</RpgLabel>
                  <textarea className="rpg-input" placeholder={placeholder}
                    value={sheet[key] as string} onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <RpgLabel>HISTÓRIA DE FUNDO</RpgLabel>
                <textarea className="rpg-input" style={{ minHeight: 120 }}
                  placeholder="Conte a origem e a jornada do seu herói..."
                  value={sheet.historia} onChange={(e) => set("historia", e.target.value)} />
              </div>
            </div>
          </section>

          {/* HABILIDADES */}
          <section className="card-section animate-in">
            <RuneHeader label="HABILIDADES ESPECIAIS" />
            <textarea className="rpg-input" style={{ minHeight: 100 }}
              placeholder="Liste magias, talentos, habilidades de classe, poderes raciais..."
              value={sheet.habilidades} onChange={(e) => set("habilidades", e.target.value)} />
          </section>

          {/* ACTIONS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", paddingTop: 8 }}>
            <button className="btn-forge" onClick={() => showToast("✦ FICHA SALVA COM SUCESSO")}>
              ⚒ FORJAR FICHA
            </button>
            <button className="btn-secondary" onClick={clearSheet}>✦ LIMPAR TUDO</button>
            <button className="btn-secondary" onClick={() => window.print()}>⬡ IMPRIMIR</button>
          </div>
        </main>

        {/* FOOTER */}
        <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(120,80,20,0.2)", padding: "20px 16px", textAlign: "center" }}>
          <p className="font-mono-rpg" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(80,50,10,0.5)" }}>
            FORJA DE HERÓIS · QUE OS DADOS SEJAM FAVORÁVEIS ⚔️
          </p>
        </footer>

        {/* TOAST */}
        {toast.visible && (
          <div className="toast-box">{toast.msg}</div>
        )}
      </div>
    </>
  );
}