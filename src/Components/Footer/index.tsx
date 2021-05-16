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
        <div className="c-footer-row__column">
          <p className="c-footer-row__item">Britsierlaan 5, 1030 Schaarbeek</p>
          <p className="c-footer-row__item">
            Tel: <a href="tel:022465300">02/246.53.00</a>
          </p>
          <p className="c-footer-row__item">info@kaj.be</p>
        </div>
        <div className="c-footer-row__column c-footer-row__column-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/kajvzw"
          >
            <img
              className="c-footer-row__item c-footer-social"
              src={facebook}
              alt="facebook-icon"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/kajvzw/"
          >
            <img
              className="c-footer-row__item c-footer-social"
              src={instagram}
              alt="instagram-icon"
            />
          </a>
        </div>
      </div>
      <div className="c-attribution-container">
        <p className="c-attribution">
          Created by{" "}
          <a href="https://nobilus.be" target="_blank">
            Nobilus
          </a>
        </p>
        <p className="c-attribution">
          Designed by{" "}
          <a href="https://henrivanoost.be/" target="_blank">
            Creabiz
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
