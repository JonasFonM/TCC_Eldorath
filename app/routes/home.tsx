import { NavLink } from '@remix-run/react'



export default function Home() {
  return (
    <>
      <div className='title-container'>
        <div className='title-screen'>
          <h1 id='first'>Bem Vindo</h1>
          <h1 id='second'>A</h1>
          <h1 id='third'>Æternida<NavLink to={"../intro"} className='question-button'>?</NavLink></h1>
        </div>
      </div>
      <NavLink to={`../user/home`}><button className="button">Entrar</button></NavLink>
      <NavLink to={`../intro`}><button className="button">Leia Mais</button></NavLink>
    </>
  )
}