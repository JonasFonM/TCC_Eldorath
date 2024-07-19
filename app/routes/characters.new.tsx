import { useState } from "react";

export default function NewCharacterRoute() {
 
  const [name, setName] = useState("")
  const [agi, setAgi] = useState(0)
  /*const [bdy, setBdy] = useState(0)
  const [mnd, setMnd] = useState(0)*/



  return (
        <>
      <h2>{name}</h2>
        <div className="container">
          <form method="get">
            <div className="block">
              <label>
                Name: <input value={name} onChange={e => {setName(e.target.value)}} />
              </label>
            </div>
            <div className="block">
              <label>
                AGILITY: {agi}
              </label>
              <button className="agiUp" onClick={() => setAgi(agi+1)}>+</button>
            </div>
            <div className="block">
              <label>
                BODY: <input type="number" defaultValue={0}  name="bdy" />
              </label>
            </div>
            <div className="block">
              <label>
                MIND: <input type="number" defaultValue={0} name="mnd" />
              </label>
            </div>
            <div className="block">
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
        </div>
         </>);
}
