interface props {
    title: string,
    itemName: string;
    typeBasedStat: string;
    itemStat: string;
    itemQuantity: number;
    itemCost: number;
    itemWeight: number;
    open: boolean;
    onPlus: (item: string, value: number) => void;
    onMinus: (item: string, value: number) => void;

}

export function ItemHandler({ title, itemName, itemQuantity, itemCost, itemWeight, typeBasedStat, itemStat, open, onPlus, onMinus }: props) {
    return (

        <div className="col-12"
            style={
                open
                    ? {
                        backgroundColor: 'black',
                        animation: 'descend 0.2s ease-in-out',
                        border: '16px solid transparent',
                        padding: '12px',
                        borderImage: 'url(/TopBorder.png) 7% round'
                    }
                    : { display: 'none' }
            }>
            <div className='container' style={{ borderRadius: '2%' }}>
                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginLeft: '50%', maxHeight: '5vh', width: '50%' }} type="button" className="button" onClick={() => onMinus(itemName, -1)}>-</button>
                </div>
                <div className="col-6">
                    <div className="col-12">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.9rem' }}>
                            {title} <span style={{color: 'gold', font: 'inherit'}}>({itemQuantity})</span>
                        </label>
                    </div>

                    <div className="col-4">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.7rem' }}>
                            Custo
                        </label>
                    </div>

                    <div className="col-4">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.7rem' }}>
                            {typeBasedStat}
                        </label>
                    </div>

                    <div className="col-4">
                        <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.7rem' }}>
                            Peso
                        </label>
                    </div>
                    <div className="col-12">

                        <div className="col-4">
                            <label style={{ fontVariant: 'small-caps', color: 'gold', fontFamily: 'serif', fontSize: '1.7rem' }}>
                                DK {itemCost}
                            </label>
                        </div>

                        <div className="col-4">
                            <label style={{ fontVariant: 'small-caps', color: 'gold', fontFamily: 'serif', fontSize: '1.7rem' }}>
                                {itemStat}
                            </label>
                        </div>

                        <div className="col-4">
                            <label style={{ fontVariant: 'small-caps', color: 'gold', fontFamily: 'serif', fontSize: '1.7rem' }}>
                                {itemWeight}
                            </label>
                        </div>

                    </div>
                </div>

                <div className="col-3">
                    <button style={{ fontSize: '2rem', marginRight: '50%', maxHeight: '5vh', width: '50%' }} type="button" className="button" onClick={() => onPlus(itemName, 1)}>+</button>
                </div>

            </div >
        </div >

    )
}