import { type VitalBar } from "../../../types/FichaTypes";

function barPct(current: number, max: number): number {
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (current / max) * 100));
}

const VitalDetails = ({
    label, color, barClass, vital,
    onChange,
}: {
    label: string; color: string; barClass: string;
    vital: VitalBar; onChange: (v: VitalBar) => void;
}) => {
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
                <input type="text" className="rpg-input" style={{ textAlign: "center" }}
                    value={vital.current}
                    onChange={(e) => onChange({ ...vital, current: Number(e.target.value.replace(/^0+/, "").replace(/[^0-9]/g, "") || 0) })} />
                <span style={{ color: "rgba(201,168,76,0.3)", flexShrink: 0 }}>/</span>
                <input type="text" className="rpg-input" style={{ textAlign: "center" }}
                    value={vital.max}
                    onChange={(e) => onChange({ ...vital, max: Number(e.target.value.replace(/^0+/, "").replace(/[^0-9]/g, "") || 1) })} />
            </div>
        </div>
    );
}

export default VitalDetails;