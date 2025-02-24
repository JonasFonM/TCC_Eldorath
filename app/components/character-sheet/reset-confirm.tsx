import { NavLink } from "@remix-run/react";
import { useState } from "react";

interface props {
  name: string;
  isHidden: boolean;
  id: string;
  onShow: () => void;
  onCancel: () => void;

}

export function ResetConfirm({ name, isHidden, onShow, onCancel, id }: props) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "RESETAR";

  return (
    <>
      <button id="reset" onClick={onShow} className="question-button">R</button>

      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">
          <h2 style={{ color: "black", fontSize: "1.4rem" }}>Tem certeza que quer resetar {name}?</h2>

          <p style={{ color: 'black', fontSize: "1rem" }}>Este processo vai retornar o personagem ao nível 1 além de excluir todos os seus Caminhos, Linhagens, Talentos e Itens</p>

          <div className="modal-buttons">

            <input placeholder="Digite RESETAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

            <NavLink to={`/user/character/${id}/reset/`}> <button onClick={onCancel} className="btn-delete" disabled={!isConfirmed}>RESETAR</button></NavLink>

            <button onClick={onCancel} className="btn-cancel">CANCELAR</button>

          </div>
        </div>
      </div>
    </>
  )
}