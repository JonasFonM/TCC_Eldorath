import { character_item, item } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import React from "react";
import { translateSlotTypes } from "~/routes/user.character";

interface props {
    slotType: string;
    isHidden: boolean;
    index: number;
    availableItems: (character_item & { item: item })[],
    onCancel: () => void;
}

export function EmptySlot({ slotType, index, isHidden, availableItems, onCancel }: props) {

    return (
        <React.Fragment key={slotType + index}>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'grid' }}>
                <button onClick={onCancel} className={'modal-close'}></button>

                <div className="modal-content">
                    <h1>{translateSlotTypes[slotType]}</h1>

                    {availableItems.length > 0 ?
                        <>
                            <div className="grid" style={{ width: '100%', padding: "5%" }}>
                                {
                                    availableItems.map(ai =>
                                        <NavLink
                                            key={ai.id}
                                            className="grid-item"
                                            to={`/item/equip/${ai.id}/${index}`}
                                        >{ai.item.name} de {ai.material}
                                        </NavLink>
                                    )

                                }

                            </div>
                        </>
                        :
                        <>
                            <h3>Sem Itens</h3>
                            <p style={{ color: 'white' }}>Você não possui itens deste tipo para equipar.</p>
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}