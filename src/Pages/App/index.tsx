import React from "react";
import logo from "Images/Png/logo.png";

function App() {
  return (
    <div className="App">
      <div className="c-header">
        <div className="c-header__homepage"></div>
        <img className="c-header__logo" src={logo} alt="logo-kaj" />
        <div className="c-header__moto">
          <h1>ZIEN</h1>
          <h1>OORDELEN</h1>
          <h1>HANDELEN</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
