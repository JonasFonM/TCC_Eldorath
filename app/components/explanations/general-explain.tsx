interface props {
    title: string;
    description: string;
    isHidden: boolean;
    onCancel: () => void;
    style: string;
    color: string;

}

export function GeneralExplain({ title, description, isHidden, onCancel, style, color }: props) {

    return (
        <>
            <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
                <button onClick={onCancel} style={{ position: 'fixed', left: '0', top: '0', opacity: '0', width: '100%', height: '100%', zIndex: '1' }}></button>
                <div className="modal-content" style={{ backgroundImage: style, zIndex: '2' }}>

                    <h1 style={{ color: 'black' }}> {title}</h1>
                    <p style={{ color: color, textAlign: 'center', fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.25rem', width: '100%' }}>{description}</p>
                </div>
            </div >
        </>
    )
}
