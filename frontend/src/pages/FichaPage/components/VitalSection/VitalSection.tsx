import RuneHeader from '../../../../layout/RuneHeader'
import RpgLabel from '../../../../layout/RpgLabel'
import VitalDetails from './Component/VitalDetails'

const VitalSection = ({ sheet, set }: { sheet: any; set: any; }) => {
    return (
        <section className="card-section animate-in">
            <RuneHeader label="VITALIDADE" />
            <div className='flex flex-col md:flex-row justify-evenly gap-6'>
                <VitalDetails label="PONTOS DE VIDA" color="#e57373" barClass="bar-hp"
                    vital={sheet.hp} onChange={(v) => set("hp", v)} />
                <VitalDetails label="PONTOS DE VIDA EXTRA" color="#64b5f6" barClass="bar-hp-extra"
                    vital={sheet.hpExtra} onChange={(v) => set("hpExtra", v)} />
                <VitalDetails label="EXPERIÊNCIA" color="#c9a84c" barClass="bar-xp"
                    vital={sheet.xp} onChange={(v) => set("xp", v)} />
            </div>

            <div className="flex flex-wrap sm:flex-row justify-evenly gap-3 mt-5 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                {[
                    { label: "CA", key: "ca" as const, placeholder: "15" },
                    { label: "INICIATIVA", key: "iniciativa" as const, placeholder: "+3" },
                    { label: "DESLOCAMENTO", key: "deslocamento" as const, placeholder: "9m" },
                    { label: "BÔNUS PROFIC.", key: "bonusProficiencia" as const, placeholder: "+2" }
                ].map(({ label, key, placeholder }) => (
                    <div key={key} className="text-center ">
                        <RpgLabel>{label}</RpgLabel>
                        <input type="text" className="rpg-input max-w-25" style={{ textAlign: "center" }}
                            placeholder={placeholder} value={sheet[key] as string}
                            onChange={(e) => set(key, e.target.value)} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default VitalSection