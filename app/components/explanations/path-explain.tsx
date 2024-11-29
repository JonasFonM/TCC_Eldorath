import { path } from "@prisma/client";

interface props {
    path: path;
    isHidden: boolean;
    onCancel: () => void;
    style: string;

}

export function PathExplain({ path, isHidden, onCancel, style }: props) {
    const prerequisites = [];

    if (path.reqTechniques) prerequisites.push(`Técnicas: ${path.reqTechniques}`);
    if (path.reqManeuvers) prerequisites.push(`Manobras: ${path.reqManeuvers}`);
    if (path.reqOaths) prerequisites.push(`Juramentos: ${path.reqOaths}`);
    if (path.reqTricks) prerequisites.push(`Truques: ${path.reqTricks}`);
    if (path.reqMagics) prerequisites.push(`Mágicas: ${path.reqMagics}`);

    return (
        <>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
            <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity:'0', width: '100%', height: '100%', zIndex: '1' }}></button>

                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: "black" }}>{path.name}</h1>
                    {prerequisites.length > 0 && <h3 style={{ color: 'black', marginTop: '0', fontSize: '1rem' }}>Pré requisitos: {prerequisites.join(' | ')}</h3>}

                    <p style={{ color: "black" }}>{path.pathTier}</p>
                    <p style={{ color: "black" }}>{path.description}</p>



                </div>

            </div>
        </>
    )
}