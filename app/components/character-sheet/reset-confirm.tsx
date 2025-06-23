import { Link } from "@remix-run/react";
import { useState } from "react";

interface props {
  name: string;
  isHidden: boolean;
  id: string;
  onCancel: () => void;

}

export function ResetConfirm({ name, isHidden, onCancel, id }: props) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "RESETAR";

  const getConfirm = () => {
    if (isConfirmed) {
      return <Link className="button col-12" to={`/user/character/${id}/reset/`}>Resetar</Link>
    }
    if (!isConfirmed) {
      return <button type="button" className="button logout col-12" onClick={() => null} disabled>Resetar</button>

    }
  }

  return (
    <>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">

          <h2 style={{ color: "gold", fontSize: "1.4rem" }}>Tem certeza que quer resetar {name}?</h2>

          <p style={{ color: 'white', fontVariant: 'none', fontFamily: 'serif', fontSize: "1.3rem" }}>Este processo vai retornar o personagem ao nível 1 além de excluir todos os seus Caminhos, Linhagens, Talentos e Itens</p>

          <div className="modal-buttons container">

            <input className="title-input col-12" style={{ animation: 'none', border: 'none' }} placeholder="Digite RESETAR" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>

            {getConfirm()}

            <button type="button" onClick={onCancel} className="button col-12">Cancelar</button>

          </div>
        </div>
      </div>
    </>
  )
}