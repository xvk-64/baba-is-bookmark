import React from 'react';
import logo from 'assets/img/react-logo.svg';
import './Main.css';

function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the website
        </p>
      </header>
    </div>
  );
}

export default Main;
