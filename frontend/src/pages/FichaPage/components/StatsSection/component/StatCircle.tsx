import { type Stat } from "../../../types/FichaTypes";

const StatCircle = ({ stat, onChange }: { stat: Stat; onChange: (val: number) => void }) => {
    const modifier = (value: number): string => {
        const mod = Math.floor((value - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div className="stat-circle">
                <input
                    type="text"
                    min={1} max={30}
                    value={stat.value}
                    onChange={(e) => onChange(Number(e.target.value.replace(/^0+/, "").replace(/[^0-9]/g, "") || 1))}
                // onChange={(e) => { set("moedas", { ...sheet.moedas, [key]: parseInt(e.target.value.replace(/^0+/, "").replace(/[^0-9]/g, "")) || 0 }) }}
                />
                <span className="text-sm text-[#a09070]" style={{ letterSpacing: "0.1em", color: "#a09070", textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace" }}>
                    {stat.label}
                </span>
            </div>
            <span className="font-mono-rpg" style={{ fontSize: "0.7rem", color: "rgba(160,128,60,0.7)" }}>
                {modifier(stat.value)}
            </span>
        </div>
    );
}

export default StatCircle;