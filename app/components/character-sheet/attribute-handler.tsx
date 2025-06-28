interface props {
    title: string,
    attributeName: string;
    attributeValue: number;
    onPlus: (attribute: string, value: number) => void;
    onMinus: (attribute: string, value: number) => void;

}

export function AttributeHandler({ title, attributeName, attributeValue, onPlus, onMinus }: props) {
    return (

        <div className="col-12"
            style={{
                background: 'black',
                border: '14px solid transparent',
                padding: 'auto',
                margin: 'auto',
                borderImage: 'url(/TopBorder.png) 6% round'
            }}>
            <div className='container' style={{
                borderRadius: '2%', height: '16.5vh',
            }}>
                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginRight: '1%', maxHeight: '5vh', width: '50%' }}
                        type="button"
                        className="button"
                        onClick={() => onMinus(attributeName, -1)}>-</button>
                </div>
                <div className="col-6">
                    <div className="col-12">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.9rem' }}>
                            {title}: {attributeValue}
                        </label>
                    </div>
                </div>

                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginLeft: '1%', maxHeight: '5vh', width: '50%' }}
                        type="button"
                        className="button"
                        onClick={() => onPlus(attributeName, 1)}>+</button>
                </div>

            </div >
        </div>

    )
}