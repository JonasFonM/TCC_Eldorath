import { character } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import React, { useState } from "react";

interface props {
    npcs: boolean;
    creatures: character[];
    isHidden: boolean;
    sceneId: string;
    onShow: () => void;
    onCancel: () => void;

}

export function CreatureSelector({ npcs, creatures, sceneId, isHidden, onShow, onCancel }: props) {
    const [selectedCreatureId, setSelectedCreatureId] = useState<number>(creatures.map(creature => creature.id)[0]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedCreatureId(Number(value));
    };

    return (
        <React.Fragment key={"CS"}>
            <button style={{ color: 'white', border: 0 }} className="button col-12" onClick={onShow}>Adicionar NPC</button>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>

                <div className="modal-content">

                    <h2 style={{ color: 'gold' }}>{
                        npcs
                            ? `Selecione um NPC`
                            : `Selecione um Personagem`
                    }</h2>

                    <div className="modal-buttons">

                        <div className="container">
                            <select title="creature" name="creature" value={selectedCreatureId} onChange={handleSelect}>
                                {creatures.map(c =>
                                    <React.Fragment key={c.id}>
                                        <option value={c.id}>{c.name} | Nível: {c.level}</option>
                                    </React.Fragment>
                                )
                                }
                            </select>

                            <NavLink className={"col-6 button"} to={
                                selectedCreatureId
                                    ? `/user/scene/${sceneId}/bind/${selectedCreatureId}/`
                                    : ''}>Selecionar</NavLink>

                            <button onClick={onCancel} className="btn-cancel col-6">Cancelar</button>
                        </div>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}