import { useState } from "react";

const AbilityIten = ({ name, description }: { name: string, description: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <li className=" flex flex-col gap-3 list-none mt-3">
            <button className="rune-ability w-full opacity-80 hover:opacity-100 transition-opacity" onClick={() => setIsOpen(!isOpen)}>
                <p className="font-display text-xs tracking-widest">
                    {name} <span className="ml-2 text-sm opacity-75">{isOpen ? "▲" : "▼"}</span>
                </p>
            </button>
            {isOpen && <p className="animate-in rpg-input list-none opacity-100">
                {description}
            </p>}
        </li>
    )
}

export default AbilityIten