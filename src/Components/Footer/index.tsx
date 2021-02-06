import React from "react";

//socials icons
import facebook from "Images/Png/socials/facebook.png";
import instagram from "Images/Png/socials/instagram.png";
import twitter from "Images/Png/socials/twitter.png";

// sponsors
import dvv from "Images/Png/sponsors/logo-dvv.png";
import vlaanderen from "Images/Png/sponsors/vlaanderen-logo.png";

function Footer() {
  return (
    <footer className="o-row__footer">
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
        <img className="c-footer-social" src={instagram} alt="instagram-icon" />
        {/* <img className="c-footer-social" src={twitter} alt="twitter-icon" /> */}
      </div>
    </footer>
  );
}

export default Footer;
