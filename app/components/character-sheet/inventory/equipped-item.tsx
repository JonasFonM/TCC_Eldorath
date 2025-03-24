import { character_item, item } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import React, { useRef, useState } from "react";

interface props {
    slotType: string;
    isHidden: boolean;
    index: number;
    item: (character_item & { item: item }),
    onCancel: () => void;
}

export function EquippedItem({ slotType, index, item, isHidden, onCancel }: props) {

    return (
        <React.Fragment key={slotType + index}>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>

                <button onClick={onCancel} className={'modal-close'}></button>

                <div className="modal-content">

                    <h1>{item.item.name} de {item.material}</h1>

                    <div className="modal-buttons">

                        <NavLink to={`/item/unequip/${item.id}`} className="btn-cancel">Desequipar</NavLink>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}