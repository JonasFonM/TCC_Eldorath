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
      <li id="reset" style={{ float: 'right', marginRight: '0', display: 'inline' }}><button style={{marginLeft: '0'}} onClick={onShow}>Reset</button></li>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">
          <h2 style={{ color: "black" }}>Tem certeza que quer resetar {name}?</h2>
          <p style={{color:'black'}}>Este processo vai retornar o personagem ao nível 1 e excluir todas as suas Capacidades</p>
          <div className="modal-buttons">
            <input placeholder="Digite RESETAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>
            <NavLink to={`/user/character/${id}/reset/`}> <button onClick={onCancel} className="btn-delete" disabled = {!isConfirmed}>RESETAR</button></NavLink>
            <button onClick={onCancel} className="btn-cancel">CANCELAR</button>
          </div>
        </div>

      </div>
    </>
  )
}