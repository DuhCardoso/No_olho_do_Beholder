import RpgLabel from '../../../layout/RpgLabel'
import RuneHeader from '../../../layout/RuneHeader'

const IdentidadeSection = ({ sistemaDetail, sheet, set }: { sistemaDetail: any; sheet: any; set: any }) => {
    return (
        <section className="card-section animate-in">
            <RuneHeader label="IDENTIDADE" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 12, paddingBottom: 12 }}>
                {[
                    { label: "NOME DO PERSONAGEM", key: "nome" as const, placeholder: "Ex: Aldric, o Cinzento" },
                    { label: "ANTECEDENTE", key: "antecedente" as const, placeholder: "Ex: Soldado, Nobre, Sábio..." },

                ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                        <RpgLabel>{label}</RpgLabel>
                        <input type="text" className="rpg-input" placeholder={placeholder}
                            value={sheet[key] as string}
                            onChange={(e) => set(key, e.target.value)} />
                    </div>
                ))}

                {/* ALINHAMENTO */}
                <div>
                    <RpgLabel>ALINHAMENTO</RpgLabel>
                    <select className="rpg-input cursor-pointer" value={sheet.alinhamento} onChange={(e) => set("alinhamento", e.target.value)}>
                        <option value="">— Escolha —</option>
                        {sistemaDetail.alinhamentos?.map((alinhamento: string) => <option key={alinhamento}>{alinhamento}</option>)}
                    </select>
                </div>

                {/* RAÇA */}
                <div>
                    <RpgLabel>RAÇA</RpgLabel>
                    <select className="rpg-input cursor-pointer" value={sheet.raca} onChange={(e) => set("raca", e.target.value)}>
                        <option value="">— Escolha —</option>
                        {sistemaDetail.racas?.map((raca: string) => <option key={raca}>{raca}</option>)}
                    </select>
                </div>
            </div>

            <RuneHeader label="CLASSE" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>

                {/* CLASSE */}
                <div>
                    <RpgLabel>CLASSE</RpgLabel>
                    <select className="rpg-input cursor-pointer" value={sheet.classe} onChange={(e) => set("classe", e.target.value)}>
                        <option value="">— Escolha —</option>
                        {sistemaDetail.classes?.map((classe: { name: string }) =>
                            <option key={classe.name}>{classe.name}</option>
                        )}
                    </select>
                </div>

                {/* NÍVEL */}
                <div key="nivel">
                    <RpgLabel>NIVEL</RpgLabel>
                    <input type="number" min={sheet.nivel.min} max={sheet.nivel.max} className="rpg-input" placeholder={"1"}
                        value={sheet["nivel"] as string}
                        onChange={(e) => set("nivel", e.target.value)} />
                </div>

                {/* SUB-CLASSE */}
                <div>
                    <RpgLabel>SUB-CLASSE</RpgLabel>
                    <select className={`rpg-input ${sheet.nivel >= 3 && "cursor-pointer"}`} value={sheet.subclasse} onChange={(e) => set("subclasse", e.target.value)} disabled={sheet.nivel < 3 || !sheet.classe}>
                        <option value="">— Escolha —</option>
                        {sistemaDetail.subClasses?.[sheet.classe]?.map((subclasse: string) => <option key={subclasse}>{subclasse}</option>)}
                    </select>
                </div>

            </div>
        </section >
    )
}

export default IdentidadeSection