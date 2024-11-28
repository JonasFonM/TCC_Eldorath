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
            <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity:'0', width: '100%', height: '100%', zIndex: '1' }}></button>

                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: "black" }}>{skill.name}</h1>
                    {prerequisites.length > 0 && <h3 style={{ color: 'black', marginTop: '0', fontSize: '1rem' }}>Pré requisitos: {prerequisites.join(' | ')}</h3>}

                    <p style={{ color: "black" }}>{skill.techniqueSubtype || skill.type}</p>
                    <p style={{ color: "black" }}>{skill.description}</p>



                </div>

            </div>
        </>
    )
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skill } from '@prisma/client';

interface Props {
    skill: skill;
    isSelected: boolean;
    onClick: () => void;
    isPureLineage: boolean
}

export function SkillCircle({ skill, isSelected, onClick, isPureLineage }: Props) {


    return (
        <div className='grid-item' onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%', backgroundColor: isSelected ? 'rgb(209, 153, 12)' : '' }}>
            <h3 style={{ backgroundColor: isPureLineage ? 'gold' : '', color: isPureLineage ? 'black' : 'white' }}>{skill.name}</h3>
            <div className='dropdown-content'>

                <p>{skill.techniqueSubtype || skill.type}</p>
                <p>{skill.description}</p>
            </div>
        </div>
    );
}