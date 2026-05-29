
const HeroBanner = ({ sistema }: { sistema: string }) => {
    return (
        <div className="animate-in" style={{ position: "relative", zIndex: 10, padding: "36px 16px", textAlign: "center" }}>
            <div className="font-display hero-name-glow" style={{ fontSize: "clamp(1.6rem,5vw,3rem)", color: "#c9a84c", marginBottom: 6 }}>
                Nova Ficha - {sistema || "Sistema Desconecido"}
            </div>
            <p className="font-mono-rpg" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(120,80,20,0.6)" }}>
                FORJE SEU DESTINO — ESCREVA SUA LENDA
            </p>
            {/* <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        {SISTEMAS.map((s) => (
                            <button key={s}
                                className={`trait-tag ${sheet.sistema === s ? "active" : "inactive"}`}
                                onClick={() => set("sistema", s)}>
                                {s}
                            </button>
                        ))}
                    </div> */}
        </div>
    )
}

export default HeroBanner