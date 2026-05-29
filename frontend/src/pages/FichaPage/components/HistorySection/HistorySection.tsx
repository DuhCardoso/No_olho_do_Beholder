import { useEffect, useRef, useState } from "react";
import RpgLabel from "../../../../layout/RpgLabel"
import RuneHeader from "../../../../layout/RuneHeader"

const HistorySection = ({ sheet, set }: { sheet: any; set: any }) => {
    const [closeSections, setCloseSections] = useState<boolean>(true);

    const [Text, setText] = useState<string>("");

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleResize = () => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        handleResize();
    }, [Text]);;


    return (
        <section className="card-section animate-in">
            <RuneHeader label="HISTÓRIA & TRAÇOS" />
            {closeSections && (
                <div className="animate-in flex flex-col gap-4" style={{ gap: 16 }}>
                    <div className="w-full grid grid-row-4 md:grid-row-2 md:grid-cols-2 gap-4 ">
                        {[
                            { label: "TRAÇO DE PERSONALIDADE", key: "traco" as const, placeholder: "Como o personagem se comporta? O que o torna único?" },
                            { label: "IDEAL", key: "ideal" as const, placeholder: "O que o personagem valoriza acima de tudo?" },
                            { label: "VÍNCULO", key: "vinculo" as const, placeholder: "O que conecta o personagem ao mundo?" },
                            { label: "FRAQUEZA", key: "fraqueza" as const, placeholder: "Qual o calcanhar de Aquiles do personagem?" },
                        ].map(({ label, key, placeholder }) => (
                            <div key={key}>
                                <RpgLabel>{label}</RpgLabel>
                                <textarea className="rpg-input " placeholder={placeholder}
                                    value={sheet[key] as string} onChange={(e) => set(key, e.target.value)} />
                            </div>
                        ))}
                    </div>
                    <div    >
                        <RpgLabel>HISTÓRIA DE FUNDO</RpgLabel>
                        <textarea ref={textareaRef} className="rpg-input overflow-hidden" style={{ minHeight: 120 }}
                            placeholder="Conte a origem e a jornada do seu herói..."
                            value={sheet.historia} onChange={(e) => { set("historia", e.target.value); setText(e.target.value); }} />
                    </div>
                </div>)
            }
            <div className={`flex justify-center mt-4 ${closeSections && "border-t border-[rgba(201,168,76,0.1)]"} pt-4 `}>
                <span className="font-display text-sm tracking-widest cursor-pointer opacity-85 scale-95 hover:opacity-100 hover:scale-100  transition duration-300" style={{ color: "#a07830" }} onClick={() => setCloseSections(!closeSections)}>
                    {closeSections ? "Mostrar menos" : "Mostrar mais"}
                </span>
            </div>

        </section >
    )
}

export default HistorySection