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
                border: '16px solid transparent',
                padding: '16px',
                borderImage: 'url(/SuperBorder.png) 10% round'
            }}>
            <div className='container' style={{ borderRadius: '2%' }}>
                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginRight: '1%' }} type="button" className="button" onClick={() => onMinus(attributeName, -1)}>-</button>
                </div>
                <div className="col-6">
                    <div className="col-12">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.9rem' }}>
                            {title}: {attributeValue}
                        </label>
                    </div>
                </div>

                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginLeft: '1%' }} type="button" className="button" onClick={() => onPlus(attributeName, 1)}>+</button>
                </div>

            </div >
        </div>

    )
}