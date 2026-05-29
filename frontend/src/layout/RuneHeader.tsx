const RuneHeader = ({ label }: { label: string }) => {
    return (
        <div className="rune-header">
            <span className="font-display text-xs tracking-widest" style={{ color: "#a07830" }}>{label}</span>
        </div>
    );
}

export default RuneHeader;