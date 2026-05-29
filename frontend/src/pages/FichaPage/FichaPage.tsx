import { useState, useCallback, useEffect } from "react";

// Types
import { type SheetState, type Skill, type Stat, } from "./types/FichaTypes";

// Scripts
import { getSistemaDetails } from "../../script/api/SistemaDetails";

// Components
import RpgLabel from "../../layout/RpgLabel";
import RuneHeader from "../../layout/RuneHeader";
import Navbar from "../../layout/Navbar";
import IdentidadeSection from "./components/IdentidadeSection";
import HeroBanner from "../../layout/HeroBanner";
import VitalSection from "./components/VitalSection/VitalSection";
import StatsSection from "./components/StatsSection/StatsSection";
import SkillsSection from "./components/SkillsSection/SkillsSection";
import EquipSection from "./components/EquipSection/EquipSection";


const INITIAL_SKILLS: Skill[] = [
    { name: "Acrobacia", attr: "DES", proficient: false, trained: false },
    { name: "Arcanismo", attr: "INT", proficient: false, trained: false },
    { name: "Atletismo", attr: "FOR", proficient: false, trained: false },
    { name: "Atuação", attr: "CAR", proficient: false, trained: false },
    { name: "Enganação", attr: "CAR", proficient: false, trained: false },
    { name: "Furtividade", attr: "DES", proficient: false, trained: false },
    { name: "História", attr: "INT", proficient: false, trained: false },
    { name: "Intimidação", attr: "CAR", proficient: false, trained: false },
    { name: "Intuição", attr: "SAB", proficient: false, trained: false },
    { name: "Investigação", attr: "INT", proficient: false, trained: false },
    { name: "Lidar c/ Animais", attr: "SAB", proficient: false, trained: false },
    { name: "Medicina", attr: "SAB", proficient: false, trained: false },
    { name: "Natureza", attr: "INT", proficient: false, trained: false },
    { name: "Percepção", attr: "SAB", proficient: false, trained: false },
    { name: "Persuasão", attr: "CAR", proficient: false, trained: false },
    { name: "Prestidigitação", attr: "DES", proficient: false, trained: false },
    { name: "Religião", attr: "INT", proficient: false, trained: false },
    { name: "Sobrevivência", attr: "SAB", proficient: false, trained: false },
];

const INITIAL_STATS: Stat[] = [
    { key: "FOR", label: "FOR", value: 10 },
    { key: "DES", label: "DES", value: 10 },
    { key: "CON", label: "CON", value: 10 },
    { key: "INT", label: "INT", value: 10 },
    { key: "SAB", label: "SAB", value: 10 },
    { key: "CAR", label: "CAR", value: 10 },
];

const INITIAL_SHEET: SheetState = {
    sistema: "",
    nome: "", raca: "", classe: "", antecedente: "", alinhamento: "", nivel: 1,
    ca: "", iniciativa: "", deslocamento: "9m", bonusProficiencia: "+2",
    hp: { current: 10, max: 10 },
    hpExtra: { current: 0, max: 5 },
    xp: { current: 0, max: 450 },
    stats: INITIAL_STATS,
    skills: INITIAL_SKILLS,
    armaPrincipal: "", armaSecundaria: "", armadura: "", itens: "", moedas: { PC: 0, PP: 0, PE: 0, PO: 0, PL: 0 },
    traco: "", ideal: "", vinculo: "", fraqueza: "", historia: "", habilidades: "",
};

/* ── Main component ── */
function FichaPage() {
    // SISTEMA DETAILS
    const [sistemaDetail, setSistemaDetail] = useState<{ sistema: string; racas: string[]; classes: string[]; subClasses: object; alinhamentos: string[] }>(
        { sistema: "", racas: [], classes: [], subClasses: [], alinhamentos: [] }
    );
    const [error, setError] = useState<string>("");


    useEffect(() => {
        if (sistemaDetail) {
            getSistemaDetails(setSistemaDetail, setError);
        }
    }, []);


    // FICHASHEET
    const [sheet, setSheet] = useState<SheetState>(localStorage.getItem("novaFicha") ? JSON.parse(localStorage.getItem("novaFicha")!) : INITIAL_SHEET);
    console.log(sheet);


    useEffect(() => {
        localStorage.setItem("novaFicha", JSON.stringify(sheet));
        console.log("SALVOU");
    }, [sheet]);

    const set = useCallback(<K extends keyof SheetState>(key: K, val: SheetState[K]) => {
        setSheet((prev) => ({ ...prev, [key]: val }));
    }, []);


    const toggleSkill = (idx: number) => {
        const updated = sheet.skills.map((s, i) => i === idx ? { ...s, proficient: !s.proficient } : s);
        set("skills", updated);
    };

    const updateStat = (idx: number, val: number) => {
        const updated = sheet.stats.map((s, i) => i === idx ? { ...s, value: val } : s);
        set("stats", updated);
    };

    // TOAST
    const [toast, setToast] = useState<{ msg: string; visible: boolean; }>({ msg: "", visible: false });

    const showToast = (msg: string) => {
        setToast({ msg, visible: true });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
    };

    const clearSheet = () => {
        if (window.confirm("Limpar toda a ficha?")) {
            setSheet({ ...INITIAL_SHEET, stats: INITIAL_STATS.map((s) => ({ ...s })), skills: INITIAL_SKILLS.map((s) => ({ ...s })) });
            localStorage.removeItem("novaFicha");

            showToast("✦ FICHA LIMPA");
        }
    };


    return (
        <>
            {/* inject global CSS once */}

            <div className="rpg-root">
                {/* Ember particles */}
                {/* {[
                    { left: "10%", delay: "0s", dx: "10px" },
                    { left: "25%", delay: "0.7s", dx: "-8px" },
                    { left: "50%", delay: "1.4s", dx: "12px" },
                    { left: "75%", delay: "0.3s", dx: "-6px" },
                    { left: "90%", delay: "1.9s", dx: "8px" },
                ].map((e, i) => (
                    <div key={i} className="ember" style={{ left: e.left, animationDelay: e.delay, ["--dx" as string]: e.dx }} />
                ))} */}

                {/* ── HEADER ── */}
                <Navbar />

                {/* ── HERO BANNER ── */}
                <HeroBanner sistema={sistemaDetail.sistema} />

                {/* ── MAIN ── */}
                <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "0 16px 80px", display: "flex", flexDirection: "column", gap: 20 }}>

                    {/* IDENTIDADE */}
                    <IdentidadeSection sistemaDetail={sistemaDetail} sheet={sheet} set={set} />

                    {/* VITALIDADE */}
                    <VitalSection sheet={sheet} set={set} />

                    {/* ATRIBUTOS */}
                    <StatsSection stats={sheet.stats} updateStat={updateStat} />


                    {/* PERÍCIAS + EQUIPAMENTO */}
                    <div className="flex flex-col md:flex-row justify-between gap-5" style={{ gap: 20 }}>

                        {/* Perícias */}
                        <SkillsSection skills={sheet.skills} toggleSkill={toggleSkill} stats={sheet.stats} proficiencia={sheet.bonusProficiencia} />

                        {/* Equipamento */}
                        <EquipSection sheet={sheet} set={set} />

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

export default FichaPage