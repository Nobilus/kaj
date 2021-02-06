import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuI } from "Utils/Types/menuItems";
import Logo from "Images/Png/logo.png";
import { useLocation } from "react-router-dom";
import useWindowSize from "Utils/Hooks/useWindowSize";

interface INavbar {
  items?: MenuI;
}

export default function Navbar({ items }: INavbar) {
  const location = useLocation();
  const { width, height } = useWindowSize();

  console.log(width);

  if (width && width >= 992) {
    if (location.pathname === "/home") {
      return (
        <nav className="c-app__nav">
          <img className="c-nav__logo" src={Logo} alt="KAJ Logo" />
          <ul className="c-nav__list">
            {items?.items.map(({ object_slug, title, id }) => {
              console.log(object_slug);
              return (
                <li className="c-nav__item" key={id}>
                  <NavLink
                    activeClassName="active"
                    className="c-nav__link"
                    to={`/${object_slug}`}
                  >
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="c-app__nav backgroundcolor">
          <img className="c-nav__logo" src={Logo} alt="KAJ Logo" />
          <ul className="c-nav__list">
            {items?.items.map(({ object_slug, title, id }) => {
              console.log(object_slug);
              return (
                <li className="c-nav__item" key={id}>
                  <NavLink
                    activeClassName="active"
                    className="c-nav__link"
                    to={`/${object_slug}`}
                  >
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      );
    }
  } else {
    return <></>;
  }
}
