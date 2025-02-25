import { NavLink } from "@remix-run/react";
import { useState } from "react";

interface props {
    isHidden: boolean;
    campaignId: string;
    onCancel: () => void;

}

export function SceneCreator({ isHidden, onCancel, campaignId }: props) {
    const [title, setTitle] = useState({
        title: 'Título'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTitle((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
            <div className="modal-content" style={{ backgroundImage: 'linear-gradient(to bottom, #222222, black)' }}>
                <h1>Dê um nome à Cena</h1>
                <input className="title-input" name="title" placeholder="Título" type="text" value={title.title} onChange={handleChange}></input>

                <div className="modal-buttons">

                    <NavLink to={`/user/campaign/${campaignId}/${title.title}/scene`}> <button onClick={onCancel} className="btn">CONFIRMAR</button></NavLink>

                    <button onClick={onCancel} className="btn-cancel">CANCELAR</button>

                </div>
            </div>
        </div>
    )
}