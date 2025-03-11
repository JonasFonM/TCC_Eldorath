import { skill } from '@prisma/client';
interface props {
    skill: skill;
    isHidden: boolean;
    onCancel: () => void;
    style: string;

}

export function SkillExplain({ skill, isHidden, onCancel, style }: props) {
    const prerequisites = [];

    if (skill.lvl) prerequisites.push(`Nível ${skill.lvl}`);
    if (skill.rlSiz) prerequisites.push(`Tamanho Relativo ${skill.rlSiz}`);
    if (skill.trSiz) prerequisites.push(`Tamanho Real ${skill.trSiz}`);
    if (skill.agi) prerequisites.push(`Agilidade ${skill.agi}`);
    if (skill.bdy) prerequisites.push(`Corpo ${skill.bdy}`);
    if (skill.mnd) prerequisites.push(`Mente ${skill.mnd}`);



    return (
        <>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
                <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity: '0', width: '100%', height: '100%', zIndex: '1' }}></button>

                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: "gold" }}>{skill.name}</h1>
                    {prerequisites.length > 0 && <h3 style={{ color: 'white', marginTop: '0', fontSize: '1rem' }}>Pré requisitos: {prerequisites.join(' | ')}</h3>}

                    <p style={{ color: "gold" }}>{skill.techniqueSubtype || skill.type}</p>
                    <p style={{ color: "white" }}>{skill.description}</p>

                </div>

            </div>
        </>
    )
}

