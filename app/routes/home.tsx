import { NavLink } from '@remix-run/react'
import { useState } from 'react';
import { GeneralExplain } from '~/components/explanations/general-explain';



export default function Home() {
  const [showAtr, setShowAtr] = useState<number>();


  return (
    <>
      <div className='title-container'>
        <div className='title-screen'>
          <h1 id='first'>Bem Vindo</h1>
          <h1 id='second'>A</h1>
          <h1 id='third'>Æternida<button onClick={() => setShowAtr(1)} className="question-button">?</button></h1>
        </div>
      </div>
      <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Æternida'} description='Æternida é um RPG "de mesa" completamente digital, centrado em um universo vasto de fantasia (principalmente) medieval inspirado em várias temáticas famosas (ou não) na cultura pop.' isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />

      <NavLink to={`../user/home`}><button className="button">Entrar</button></NavLink>
    </>
  )
}