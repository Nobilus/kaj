import React, { useEffect, useState } from "react";
import logo from "Images/Png/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
//@ts-ignore
import HamburgerMenu from "react-hamburger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MenuI } from "Utils/Types/menuItems";
import Logo from "Images/Png/logo.png";

interface IBurger {
  items?: MenuI;
}

export default function Burger({ items }: IBurger) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
          {items?.items.map(({ object_slug, title, id, parent }) => {
            if (parent === 0)
              return (
                <li className="c-nav__item" key={id}>
                  <NavLink
                    onClick={() => setMenuOpen(false)}
                    className="c-nav__link"
                    to={"/" + object_slug}
                  >
                    {title}
                  </NavLink>
                </li>
              );
          })}
        </div>
      </>
    );
  }

  if (location.pathname === "/home") {
    return (
      <nav className="c-mobile-nav--absolute">
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
  } else {
    return (
      <nav className="c-mobile-nav">
        <Link to="/home">
          <img className="c-nav__logo--mobile" src={Logo} alt="KAJ Logo" />
        </Link>
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
}
