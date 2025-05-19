interface props {
    title: string;
    description: string;
    isHidden: boolean;
    onCancel: () => void;
}

export function GeneralExplain({ title, description, isHidden, onCancel }: props) {

    return (
        <div className="modal-overlay" style={{ display: isHidden ? 'none' : 'flex' }}>
            <div className="modal-content" style={{ backgroundImage: 'linear-gradient(to bottom, lightgrey, gold)' }}>
                <h1 style={{ color: 'black' }}> {title}</h1>
                <p style={{ color: 'black', textAlign: 'center', fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.25rem', width: '100%' }}>{description}</p>
            </div>
            <button type="button" onClick={onCancel} style={{ position: 'fixed', cursor: 'default', left: '0', top: '0', opacity: '0', width: '100%', height: '100%', zIndex: '6' }}></button>
        </div >
    )
}
