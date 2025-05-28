interface Props {
    currentValue: number;
    maxValue: number;
    color: string;
    halvedColor: string;
}

export function ResourceBar({ currentValue, maxValue, color, halvedColor }: Props) {
    return (
        <div style={{
            fontWeight: 'bold',
            marginBottom: '0.75%',
            justifyItems: 'center',

        }}>
            <div
                style={{
                    width: '100%',
                    height: '32px',
                    backgroundColor: 'black',
                    padding: '6px',
                    border: '8px solid transparent',
                    borderImage: 'url(/SuperBorder.png) 25 round',
                    overflow: 'hidden',
                }}>
                <div
                    style={{
                        width: `${(currentValue / maxValue) * 100}%`,
                        height: '100%',
                        backgroundImage: currentValue > maxValue
                            ? `linear-gradient(to right, ${color}, ${halvedColor}, gold, gold, white, white)`
                            : `linear-gradient(to right,${color}, ${halvedColor})`,
                        transition: 'width 0.3s ease'
                    }}
                    className={
                        currentValue / maxValue > 0.25
                            ? ''
                            : "hp-bar-critical"
                    }
                />
            </div>

        </div>
    )
}