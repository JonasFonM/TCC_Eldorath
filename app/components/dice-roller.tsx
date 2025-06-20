import { useRef, useState } from "react";

interface Props {
  die: number;
  amountLimit: number;
  flatBonus: number;
}

export function DiceRoller({ die, amountLimit, flatBonus }: Props) {
  function roll(die: number) { return (Math.floor(Math.random() * die) + 1) };
  const result = useRef<number>(0)
  const amount = useRef<number>(1);
  const [, forceUpdate] = useState(0);

  const totalRoll = () => {
    let finalRoll = 0
    for (let index = 0; index < amount.current; index++) {
      const nRoll = roll(die)
      finalRoll += nRoll
    }
    result.current = (finalRoll + flatBonus)
    forceUpdate(result.current)
  }

  const increaseAmount = () => {
    if (amount.current >= amountLimit) return amount.current = amountLimit;
    (amount.current++)
    forceUpdate(amount.current)
  }

  const decreaseAmount = () => {
    if (amount.current <= 1) return amount.current = 1;
    (amount.current--)
    forceUpdate(amount.current)

  }

  return (
    <div className="container">
      <button className="col-3" onClick={decreaseAmount}>-</button>
      <button className="col-6" onClick={totalRoll}>Rolar {amount.current} d{die}</button>
      <button className="col-3" onClick={increaseAmount}>+</button>
      <p style={{ width: '64px', backgroundImage: 'radial-gradient(black, white)' }} className="col-12">{result.current}</p>
    </div>

  );
}