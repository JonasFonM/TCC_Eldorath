import { NavLink } from "@remix-run/react";
import React, { useState } from "react";

interface props {
  name: string;
  isHidden: boolean;
  entity: string;
  id: string;
  onShow: () => void;
  onCancel: () => void;

}

export function DeleteConfirm({ name, isHidden, onShow, onCancel, entity, id }: props) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "DELETAR";

  return (
    <React.Fragment key={id}>
      <button style={{ color: 'red', border: 0 }} className="question-button" onClick={onShow}>X</button>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>

        <div className="modal-content">

          <h2 style={{ color: 'gold' }}>Você tem certeza que quer deletar {name}?</h2>

          <div className="modal-buttons">

            <input placeholder="Digite DELETAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

            <NavLink to={`/delete/${entity}/${id}`}> <button className="btn-delete" disabled={!isConfirmed}>DELETAR</button></NavLink>

            <button onClick={onCancel} className="btn-cancel">CANCELAR</button>
          </div>

        </div>

      </div>
    </React.Fragment>
  )
}