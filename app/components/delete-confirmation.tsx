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

  const getConfirm = () => {
    if (isConfirmed) {
      return <NavLink className="col-12 button" to={`/delete/${entity}/${id}`}>Deletar</NavLink>

    }
    if (!isConfirmed) {
      return <button type="button" className="button logout col-12" onClick={() => null} disabled>Deletar</button>

    }
  }

  return (
    <React.Fragment key={id}>
      <button style={{ color: 'red', border: 0 }} className="question-button" onClick={onShow}>X</button>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">

          <h2 style={{ color: 'gold', fontSize: "1.4rem" }}>Tem certeza que quer deletar {name}?</h2>
          
          <div className="modal-buttons container">

            <input className="title-input col-12" style={{ animation: 'none', border: 'none' }} placeholder="Digite DELETAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

            {getConfirm()}

            <button type="button" onClick={onCancel} className="button col-12">Cancelar</button>

          </div>

        </div>

      </div>
    </React.Fragment>
  )
}