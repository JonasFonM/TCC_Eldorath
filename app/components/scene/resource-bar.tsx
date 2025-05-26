interface Props {
    currentValue: number;
    maxValue: number;
    color: string;
    halvedColor: string;
}

export function ResourceBar({ currentValue, maxValue, color, halvedColor }: Props) {
    return (
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
            <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#111111',
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${(currentValue / maxValue) * 100}%`,
                    height: '100%',
                    backgroundImage: `linear-gradient(to right,${color},${halvedColor})`,
                    transition: 'width 0.3s ease'
                }}
                    className={currentValue / maxValue > 0.25 ? '' : "hp-bar-critical"} />
            </div>
            <div style={{ fontSize: '1.1rem', fontFamily: 'serif', fontWeight: 'bolder', marginTop: '2px' }}>
                {currentValue} / {maxValue}
            </div>
        </div>
    )
}