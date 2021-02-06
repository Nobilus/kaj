import React, { useEffect, useState } from "react";
import logo from "Images/Png/logo.png";
import { NavLink } from "react-router-dom";
//@ts-ignore
import HamburgerMenu from "react-hamburger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MenuI } from "Utils/Types/menuItems";

interface IBurger {
  items?: MenuI;
}

export default function Burger({ items }: IBurger) {
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
          {items?.items.map(({ object_slug, title, id, parent }) => {
            if (parent === 0)
              return (
                <li className="c-nav__item">
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
