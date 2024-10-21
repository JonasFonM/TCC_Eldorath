import { NavLink } from "@remix-run/react";
import { useState } from "react";

interface props {
  name: string;
  isHidden: boolean;
  entity: string;
  id: string;
  onShow: () => void;
  onCancel: () => void;

}

export function DeleteConfirm({ name, isHidden, onShow, onCancel, entity, id }: props) {
  const [confirmText, setConfirmText] = useState(""); // State to track input
  const isConfirmed = confirmText === "DELETE"; // Boolean condition for enabling the delete button

  return (
    <>
      <button onClick={onShow}>DELETE</button>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">
          <h2 style={{ color: "black" }}>Are you sure you want to delete {name}?</h2>
          <div className="modal-buttons">
            <input placeholder="Type DELETE to confirm" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}></input>
            <NavLink to={`/${entity}/delete/${id}`}> <button className="btn-delete" disabled={!isConfirmed}>DELETE</button></NavLink>
            <button onClick={onCancel} className="btn-cancel">CANCEL</button>
          </div>
        </div>

      </div>
    </>
  )
}