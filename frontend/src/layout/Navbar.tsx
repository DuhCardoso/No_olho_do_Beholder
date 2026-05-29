const Navbar = () => {
    return (
        <>
            {/* ── HEADER ── */}
            <header style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(120,80,20,0.25)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22 }}>⚔️</span>
                        <div>
                            <div className="font-display" style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.9)", letterSpacing: "0.2em" }}>FORJA DE HERÓIS</div>
                            <div className="font-mono-rpg" style={{ fontSize: "0.55rem", color: "rgba(120,80,20,0.6)", letterSpacing: "0.2em" }}>CRIADOR DE FICHAS RPG</div>
                        </div>
                    </div>
                    <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
                        {["MINHAS FICHAS", "BESTIÁRIO", "SOBRE"].map((item) => (
                            <a key={item} href="#" className="font-mono-rpg"
                                style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(160,120,40,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.9)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(160,120,40,0.5)")}>
                                {item}
                            </a>
                        ))}
                        <button className="btn-secondary">ENTRAR</button>
                    </nav>
                </div>
            </header>
        </>

    )
}

export default Navbar