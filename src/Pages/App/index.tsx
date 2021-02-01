import React from "react";
import logo from "Images/Png/logo.png";
import MenuCard from "Components/MenuCard";

// Menucard icons
import shop from "Images/Png/MenuCard/shop_icon_small.png";
import locatie from "Images/Png/MenuCard/location_on-24px.png";
import praktisch from "Images/Png/MenuCard/praktisch_icon.png";
import overons from "Images/Png/MenuCard/over_ons_icon.png";

function App() {
  return (
    <div className="App">
      <div className="c-header">
        <div className="c-header__homepage">
          <img className="c-header__logo" src={logo} alt="logo-kaj" />
          <div className="c-header__moto">
            <h1>ZIEN</h1>
            <h1>OORDELEN</h1>
            <h1>HANDELEN</h1>
          </div>
        </div>
      </div>
      <div className="c-menu-card__row">
        <MenuCard iconSource={overons} title={"Over ons"} />
        <MenuCard iconSource={shop} title={"Shop"} />
        <MenuCard iconSource={locatie} title={"KAJ\nin de buurt"} />
        <MenuCard iconSource={praktisch} title={"Praktisch"} />
      </div>
      <div></div>
    </div>
  );
}

export default App;
