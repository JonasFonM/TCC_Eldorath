import { character_item, item } from "@prisma/client";

interface props {
    character_item: character_item & { item: item };
    isHidden: boolean;
    onCancel: () => void;
    style: string;

}

export function CharacterItemExplain({ character_item, isHidden, onCancel, style }: props) {

    return (
        <>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
                <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity: '0', width: '100%', height: '100%', zIndex: '1' }}></button>

                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: "black" }}> {character_item.item.name + ' de ' + character_item.material}</h1>

                    <p style={{ color: "black" }}>Categoria de Fabricação: {character_item.craftTier}</p>

                    <p style={{ color: "black" }}>{character_item.item.description}</p>

                </div>

            </div>
        </>
    )
}
