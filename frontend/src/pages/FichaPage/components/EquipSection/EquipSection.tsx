import { useEffect, useRef, useState } from "react";
import RpgLabel from "../../../../layout/RpgLabel"
import RuneHeader from "../../../../layout/RuneHeader"
import type { SheetState } from "../../types/FichaTypes";

const EquipSection = ({ sheet, set }: { sheet: SheetState; set: any; }) => {
    const [text, setText] = useState<string>("");

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleResize = () => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        handleResize();
    }, [text]);;

    return (
        <section className="card-section animate-in flex-1">
            <RuneHeader label="EQUIPAMENTO" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                    { label: "ARMA PRINCIPAL", key: "armaPrincipal" as const, placeholder: "Ex: Espada Longa +1  |  1d8+4 cortante" },
                    { label: "ARMA SECUNDÁRIA", key: "armaSecundaria" as const, placeholder: "Ex: Adaga  |  1d4+2 perfurante" },
                    { label: "ARMADURA", key: "armadura" as const, placeholder: "Ex: Cota de Malha  |  CA 16" },
                ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                        <RpgLabel>{label}</RpgLabel>
                        <input type="text" className="rpg-input" placeholder={placeholder}
                            value={sheet[key] as string} onChange={(e) => set(key, e.target.value)} />
                    </div>
                ))}
                <div className="flex justify-evenly gap-3 ">
                    {[
                        { label: "PC", key: "PC" as const, placeholder: "0" },
                        { label: "PP", key: "PP" as const, placeholder: "0" },
                        { label: "PE", key: "PE" as const, placeholder: "0" },
                        { label: "PO", key: "PO" as const, placeholder: "0" },
                        { label: "PL", key: "PL" as const, placeholder: "0" },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key} className="text-center">
                            <RpgLabel>{label}</RpgLabel>
                            <input type="text" className={"rpg-input text-center"}
                                placeholder={placeholder} value={sheet.moedas[key]} maxLength={4} onChange={(e) => { set("moedas", { ...sheet.moedas, [key]: parseInt(e.target.value.replace(/^0+/, "").replace(/[^0-9]/g, "")) || 0 }) }} />
                        </div>
                    ))}
                </div>
                <div>
                    <RpgLabel>ITENS </RpgLabel>
                    <textarea ref={textareaRef} className={`rpg-input resize-none
          overflow-hidden`} placeholder="Poção de cura ×2, 150 PO, Chave enferrujada..."
                        value={sheet.itens} onChange={(e) => { set("itens", e.target.value); setText(e.target.value); }} />
                </div>
            </div>
        </section>
    )
}

export default EquipSection