import React from 'react';
import backgroundImg from './Assets/background.svg';
import MainPage from './Components/MainPage/mainPage';
import './App.css';

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImg})`}}>
      <MainPage/>
    </div>
  );
}

export default App;
