import RuneHeader from '../../../../layout/RuneHeader'
import type { Skill, Stat } from '../../types/FichaTypes';

const SkillsSection = ({ skills, toggleSkill, stats, proficiencia }: { skills: Skill[]; toggleSkill: (i: number) => void; stats: Stat[]; proficiencia: string }) => {
    const modifier = (value: any, proficiente?: boolean): string => {
        if (proficiente) {
            const mod = Math.floor((value - 10) / 2 + Number(proficiencia));
            return mod >= 0 ? `+${mod}` : `${mod}`;
        }
        const mod = Math.floor((value - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    return (
        <section className="card-section animate-in flex-1">
            <RuneHeader label="PERÍCIAS" />
            <p className="font-mono-rpg" style={{ fontSize: "0.6rem", color: "rgba(100,70,20,0.55)", marginBottom: 10, letterSpacing: "0.08em" }}>
                Clique para marcar proficiência
            </p>
            {skills.map((skill, i) => (
                <div key={skill.name} className="skill-row" onClick={() => toggleSkill(i)}>
                    <div className={`skill-dot ${skill.proficient ? "active" : ""}`} />
                    <span className='flex-1 text-[0.9rem] ' style={{ color: "rgba(212,201,176,0.75)" }}>{skill.name}</span>
                    <span className="font-mono-rpg text-[0.8rem]" style={{ color: "rgba(120,90,40,0.6)" }}>{skill.attr}</span>
                    <span className="font-mono-rpg w-7 text-[0.9rem] text-right" style={{ color: "rgba(160,120,60,0.8)" }}>{skill.proficient ? modifier(stats.find((s) => s.label === skill.attr)?.value, skill.proficient) : modifier(stats.find((s) => s.label === skill.attr)?.value)}</span>
                </div>
            ))}
        </section>
    )
}

export default SkillsSection