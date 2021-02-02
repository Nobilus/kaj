import React, { useEffect, useState } from "react";
import logo from "Images/Png/logo.png";
import { NavLink } from "react-router-dom";
//@ts-ignore
import HamburgerMenu from "react-hamburger-menu";
import { possibleRoutes } from "Utils/possibleRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Burger() {
  const [menuOpen, setMenuOpen] = useState(false);

  let menu;
  if (menuOpen) {
    menu = (
      <>
        <div className="c-mobile-nav__body">
          <span className="c-mobile-nav__icon-container--open">
            <FontAwesomeIcon
              className={"c-mobile-nav__icon"}
              color={"white"}
              icon={faTimes}
              onClick={() => setMenuOpen(false)}
            />
          </span>
          {Object.entries(possibleRoutes).map((route, index) => {
            return (
              <li className="c-nav__item">
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  className="c-nav__link"
                  to={"/" + route[0]}
                >
                  {route[0]}
                </NavLink>
              </li>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <nav className="c-mobile-nav">
      <span
        style={menuOpen ? { backgroundColor: "#FADA73" } : undefined}
        className="c-mobile-nav__icon-container"
      >
        {!menuOpen && (
          <FontAwesomeIcon
            className="c-mobile-nav__icon"
            color={"white"}
            icon={faBars}
            onClick={() => setMenuOpen(true)}
          />
        )}
      </span>
      {menu}
    </nav>
  );
}
