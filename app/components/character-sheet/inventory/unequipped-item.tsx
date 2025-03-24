import { character_item, item } from "@prisma/client";
import { Link } from "@remix-run/react";
import React from "react";

interface props {
    slotType: string;
    isHidden: boolean;
    item: (character_item & { item: item }),
    freeSlot: number;
    onCancel: () => void;
}

export function UnequippedItem({ slotType, item, freeSlot, isHidden, onCancel }: props) {

    return (
        <React.Fragment key={slotType + freeSlot}>
            <div className="modal-overlay" onClick={onCancel} style={{ display: isHidden ? 'none' : 'flex' }}>
                <div className="modal-content">

                    <h1>{item.item.name} de {item.material}</h1>

                    <div className="modal-buttons">
                        {freeSlot > -1
                            ? <Link to={`/item/equip/${item.id}/${freeSlot}`} className="btn-cancel">Equipar</Link>
                            : <button disabled> Equipar </button>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}