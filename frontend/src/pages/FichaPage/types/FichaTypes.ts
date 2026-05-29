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
    trained: boolean;
}

export interface VitalBar {
    current: number;
    max: number;
}

export interface Moedas {
    PC: number | any;
    PP: number | any;
    PE: number | any;
    PO: number | any;
    PL: number | any;
}

export interface SheetState {
    sistema: string;
    nome: string;
    raca: string;
    classe: string;
    antecedente: string;
    alinhamento: string;
    nivel: number;
    ca: string;
    iniciativa: string;
    deslocamento: string;
    bonusProficiencia: string;
    hp: VitalBar;
    hpExtra: VitalBar;
    xp: VitalBar;
    stats: Stat[];
    skills: Skill[];
    armaPrincipal: string;
    armaSecundaria: string;
    armadura: string;
    itens: string;
    moedas: Moedas;
    traco: string;
    ideal: string;
    vinculo: string;
    fraqueza: string;
    historia: string;
    habilidades: string;
}