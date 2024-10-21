interface props {
  name: string;
  isHidden: boolean;
  onClick: () => void;
  onShow: () => void;
  onCancel: () => void;

}

export function DeleteConfirm({ name, isHidden, onShow, onCancel, onClick }: props) {
  return (
    <>
      <button onClick={onShow}>DELETE</button>
      <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
        <div className="modal-content">
          <h2 style={{ color: "black" }}>Are you sure you want to delete {name}?</h2>
          <div className="modal-buttons">
            <input name="confirm" placeholder="Type DELETE to confirm"></input>
            <button type="submit" onClick={onClick} className="btn-delete">DELETE</button>
            <button onClick={onCancel} className="btn-cancel">CANCEL</button>
          </div>
        </div>

      </div>
    </>
  )
}