import RuneHeader from "../../../../layout/RuneHeader"
import type { Stat } from "../../types/FichaTypes"
import StatCircle from "./component/StatCircle"

const StatsSection = ({ stats, updateStat }: { stats: Stat[], updateStat: (index: number, value: number) => void }) => {
    return (
        <section className="card-section animate-in">
            <RuneHeader label="ATRIBUTOS" />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 24px" }}>
                {stats.map((stat, i) => (
                    <StatCircle key={stat.key} stat={stat} onChange={(val) => updateStat(i, val)} />
                ))}
            </div>
        </section>
    )
}

export default StatsSection