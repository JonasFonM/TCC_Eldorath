export function DiceRoll(die: number) {
    const value = Math.floor(Math.random() * die) + 1;
    return (value);
  }