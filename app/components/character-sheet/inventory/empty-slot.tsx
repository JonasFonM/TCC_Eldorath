import { character_item, item } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import React from "react";

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
            <div className="modal-overlay" onClick={onCancel} style={{ display: isHidden ? 'none' : 'flex' }}>
                <div className="modal-content">
                    <div className="grid" style={{ width: '100%', gridTemplateColumns: `repeat(8) 1fr` }}>
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
                </div>
            </div>
        </React.Fragment>
    )
}