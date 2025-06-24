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


    const getConfirm = () => {
        if (isConfirmed) {
            return <button className="lineBtn col-12" onClick={onCancel}><NavLink className="col-12 logout button" to={`/user/friend/block/${userId}`}>Bloquear</NavLink></button>

        }
        if (!isConfirmed) {
            return <button type="button" className="button disabled col-12" onClick={() => null} disabled>Bloquear</button>

        }
    }

    return (
        <React.Fragment key={userId}>
            <button style={{ color: 'red', border: 0, padding: '16px' }} className="lineBtn col-12" onClick={onShow}>Bloquear</button>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>

                <div className="modal-content">

                    <h3 style={{ color: 'gold', fontSize: "1.4rem" }}>Você tem certeza que quer bloquear {name}?</h3>

                    <div className="modal-buttons container">

                        <input className="title-input col-12" style={{ animation: 'none', border: 'none' }} placeholder="Digite BLOQUEAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

                        {getConfirm()}

                        <button onClick={onCancel} className="button col-12">Cancelar</button>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}