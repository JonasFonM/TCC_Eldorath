import { NavLink } from "@remix-run/react";
import React, { useState } from "react";

interface props {
    name: string;
    isHidden: boolean;
    userId: string;
    onShow: () => void;
    onCancel: () => void;
}

export function BlockConfirm({ name, isHidden, onShow, onCancel, userId }: props) {
    const [confirmText, setConfirmText] = useState("");
    const isConfirmed = confirmText === "BLOQUEAR";

    return (
        <React.Fragment key={userId}>
            <button style={{ color: 'red', border: 0 }} className="lineBtn" onClick={onShow}>Bloquear Amizade</button>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>

                <div className="modal-content">

                    <h3 style={{color: 'gold'}}>Você tem certeza que quer bloquear {name}?</h3>

                    <div className="modal-buttons">

                        <input placeholder="Digite BLOQUEAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

                        <NavLink to={`/user/friend/block/${userId}`}> <button className="btn-delete" disabled={!isConfirmed}>BLOQUEAR</button></NavLink>

                        <button onClick={onCancel} className="btn-cancel">CANCELAR</button>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}