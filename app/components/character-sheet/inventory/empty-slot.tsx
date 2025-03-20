import React, { useRef, useState } from "react";

interface props {
    slotType: string;
    isHidden: boolean;
    index: number;
    onCancel: () => void;
}

export function EmptySlot({ slotType, index, isHidden, onCancel }: props) {

    return (
        <React.Fragment key={slotType + index}>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
                <div className="modal-content">
                    <h1>{index}</h1>
                    <div className="modal-buttons">

                        <button onClick={onCancel} className="btn-cancel">Cancelar</button>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}