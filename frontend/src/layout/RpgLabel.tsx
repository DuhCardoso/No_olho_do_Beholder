
const RpgLabel = ({ children }: { children: React.ReactNode }) => {
    return (
        <label className="font-mono-rpg block mb-1 font-semibold" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(160,128,80,0.7)" }}>
            {children}
        </label>
    );
}

export default RpgLabel;