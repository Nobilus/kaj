import React, { useEffect, useState } from "react";
import logo from "Images/Png/logo.png";
import { NavLink } from "react-router-dom";
//@ts-ignore
import HamburgerMenu from "react-hamburger-menu";
import { possibleRoutes } from "Utils/possibleRoutes";

export default function Burger() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <aside className={`c-mobile-nav ${!menuOpen ? "has-mobile-nav" : ""}`}>
    <div className="c-header">
      <div className={`${menuOpen ? "has-mobile-nav" : ""}`}>
        <aside className={`c-mobile-nav`}>
          <div className="c-mobile-nav__bg"></div>
          <div className="c-mobile-nav__body">
            <div className="c-mobile-nav__header">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="o-button-reset c-nav-trigger js-toggle-nav"
              >
                <svg
                  className="c-nav-trigger__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                    transform="translate(-5 -5)"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
            <div className="c-mobile-nav__nav c-mobile-nav__nav--main">
              <nav className="c-nav">
                <ul className="o-list c-nav__list">
                  {Object.entries(possibleRoutes).map((route, index) => {
                    return (
                      <li className="c-nav__item">
                        <NavLink className="c-nav__link" to={"/" + route[0]}>
                          {route[0]}
                        </NavLink>
                      </li>
                    );
                  })}
                  {/* <li className="c-nav__item">
                <a href="index.html" className="c-nav__link">
                  Home
                </a>
              </li>
              <li className="c-nav__item">
                <a href="vrijdag.html" className="c-nav__link">
                  Vrijdag
                </a>
              </li>
              <li className="c-nav__item">
                <a href="zaterdag.html" className="c-nav__link">
                  Zaterdag
                </a>
              </li>
              <li className="c-nav__item">
                <a href="info.html" className="c-nav__link">
                  Info
                </a>
              </li>
              <li className="c-nav__item">
                <a href="inschrijvingen.html" className="c-nav__link">
                  Inschrijvingen
                </a>
              </li>
              <li className="c-nav__item">
                <a href="contact.html" className="c-nav__link">
                  Contact
                </a>
              </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
