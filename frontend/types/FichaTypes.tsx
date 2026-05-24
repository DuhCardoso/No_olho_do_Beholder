/* ── Types ── */
export interface Stat {
    key: string;
    label: string;
    value: number;
}

export interface Skill {
    name: string;
    attr: string;
    proficient: boolean;
}

export interface VitalBar {
    current: number;
    max: number;
}

export interface SheetState {
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