import React, { useEffect } from 'react';
import backgroundImg from './Assets/background.svg';
import rocket from './Assets/rocket.png'
import hero from './Assets/hero.png'
import  Animation from './Components/Animation/aniamtion'
import Text from './Components/Text/text'
import Timer from './Components/Timer/timer';
import MainPage from './Components/MainPage/mainPage';
import './App.css';

function App() {
  useEffect(()=>{
    console.log("app useeffect")
  },[])
  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImg})`}}>
      <MainPage/>
    </div>
  );
}

export default App;
