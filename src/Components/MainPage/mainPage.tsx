import React from 'react'
import Text from '../Text/text'
import Animation from '../Animation/aniamtion'
import Timer from '../Timer/timer'
import rocket from '../../Assets/rocket.png'
import hero from '../../Assets/hero.png'
import './mainPage.css'
function mainPage() {
  return (
    <div className='main-page'>
    <Animation url = {rocket}/>
    <div className='middle-container'>
      <Text></Text>
      <img className='hero' src={hero}/>
    </div>
    <Timer/>
    <div >
    </div>
  </div>    
  )
}

export default mainPage