import { character_weapon, weapon } from "@prisma/client";

interface props {
    character_weapon: character_weapon & { weapon: weapon };
    isHidden: boolean;
    onCancel: () => void;
    style: string;

}

export function CharacterWeaponExplain({ character_weapon, isHidden, onCancel, style }: props) {

    return (
        <>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
                <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity: '0', width: '100%', height: '100%', zIndex: '1' }}></button>

                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: "black" }}> {character_weapon.weapon.name + ' de ' + character_weapon.material}</h1>

                    <p style={{ color: "black" }}>Categoria de Fabricação: {character_weapon.craftTier}</p>

                    <p style={{ color: "black" }}>{character_weapon.weapon.description}</p>

                </div>

            </div>
        </>
    )
}
