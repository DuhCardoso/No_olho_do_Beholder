import RuneHeader from "../../../../layout/RuneHeader"
import type { SheetState } from "../../types/FichaTypes"
import AbilityIten from "./component/AbilityIten"

const AbilitySection = ({ habilidades }: { habilidades: SheetState["habilidades"] }) => {
    return (
        <section className="card-section animate-in">
            <RuneHeader label="HABILIDADES DE RAÇA" />

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {habilidades && habilidades.raca?.map((habilidade, index) => (
                    <AbilityIten key={index} name={habilidade.name} description={habilidade.description} />
                ))}
            </div>

            <RuneHeader label="HABILIDADES DE CLASSE" />

            <div className="grid md:grid-cols-2 gap-4">
                {habilidades && habilidades.classe?.map((habilidade, index) => (
                    <AbilityIten key={index} name={habilidade.name} description={habilidade.description} />
                ))}
            </div>

        </section>
    )
}
// onChange={(e) => set("habilidades", [...e.target.value.split('\n').filter((v): v is string => !!v)])}

{/* <textarea className="rpg-input" style={{ minHeight: 100 }}
    placeholder="Liste magias, talentos, habilidades de classe, poderes raciais..."
    value={habilidades} onChange={(e) => set("habilidades", [...e.target.value])} /> */}


export default AbilitySection