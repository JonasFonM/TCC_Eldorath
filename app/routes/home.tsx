import { NavLink } from '@remix-run/react'
import React, { useState } from 'react';
import { GeneralExplain } from '~/components/explanations/general-explain';



export default function Home() {
  const [showAtr, setShowAtr] = useState<number>();


  return (
    <React.Fragment>
      <div className='title-container'>
        <div className='title-screen'>
          <h1 id='first'>Bem Vindo</h1>
          <h1 id='second'>A</h1>
          <h1 id='third'>Eldorath<button onClick={() => setShowAtr(1)} className="question-button">?</button></h1>
        </div>
      </div>
      <GeneralExplain title={'Eldorath'} description='Eldorath é um RPG "de mesa" completamente digital, centrado em um universo vasto de fantasia (principalmente) medieval inspirado em várias temáticas famosas (ou não) na cultura pop.' isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />
      <h1 id='third'><NavLink className='lineBtn' to={`../user/home/profile/`}>Entrar</NavLink></h1>
      <h1 id='third'><NavLink className='lineBtn' to={`../intro/`}>Introdução</NavLink></h1>
    </React.Fragment>
  )
}