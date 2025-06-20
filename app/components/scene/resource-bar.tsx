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
            marginBottom: '6px',
            justifyItems: 'center',

        }}>
            <div
                style={{
                    width: '100%',
                    height: '32px',
                    backgroundColor: 'black',
                    padding: '6px',
                    border: '8px solid transparent',
                    borderImage: 'url(/SuperBorder.png) 24 round',
                    overflow: 'hidden',
                }}>
                <div
                    style={{
                        width: `${(currentValue / maxValue) * 100}%`,
                        height: '100%',
                        backgroundImage: `linear-gradient(to right,${color}, ${halvedColor})`,
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