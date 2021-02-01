import React from "react";
import logo from "Images/Png/logo.png";
import MenuCard from "Components/MenuCard";

// Menucard icons
import shop from "Images/Png/MenuCard/shop_icon_small.png";
import locatie from "Images/Png/MenuCard/location_on-24px.png";
import praktisch from "Images/Png/MenuCard/praktisch_icon.png";
import overons from "Images/Png/MenuCard/over_ons_icon.png";

// In de kijker icon
import kijker from "Images/Png/in_de_kijker_icon.png";

//socials icons
import facebook from "Images/Png/socials/facebook.png";
import instagram from "Images/Png/socials/instagram.png";
import twitter from "Images/Png/socials/twitter.png";

// sponsors
import dvv from "Images/Png/sponsors/logo-dvv.png";
import vlaanderen from "Images/Png/sponsors/vlaanderen-logo.png";

function App() {
  return (
    <>
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
      <div className="c-homepage-divider">
        <div className="c-kijker">
          <img className="c-kijker__icon" src={kijker} alt="In De Kijker" />
        </div>
        <h4>In de kijker</h4>
      </div>
      <div className="o-row__footer">
        <h4 className="c-footer-title">KAJ VZW</h4>
        <div className="c-footer-row">
          <div className="c-footer-row__item">
            <p>Britsierlaan 5</p>
            <p>1030 Schaarbeek</p>
          </div>
          <div className="c-footer-row__item">
            <p>02/246.53.00</p>
            <p>info@kaj.be</p>
          </div>
        </div>
        <div className="c-footer-row c-footer-social-row">
          <img className="c-footer-social" src={facebook} alt="facebook-icon" />
          <img
            className="c-footer-social"
            src={instagram}
            alt="instagram-icon"
          />
          {/* <img className="c-footer-social" src={twitter} alt="twitter-icon" /> */}
        </div>
        <div className="c-footer-row c-footer-row--sponsors">
          <img
            className="c-footer-row__sponsor"
            src={dvv}
            alt="DVV Verzekeringen"
          />
          <img
            className="c-footer-row__sponsor"
            src={vlaanderen}
            alt="Vlaanderen"
          />
        </div>
      </div>
    </>
  );
}

export default App;
