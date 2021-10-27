import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuI } from "Utils/Types/menuItems";
import Logo from "../../Images/Png/logo.png";
import { useLocation } from "react-router-dom";
import useWindowSize from "Utils/Hooks/useWindowSize";
import Burger from "Components/HamburgerMenu";
import DropdownButton from "Components/DropdownButton";
import parse from "html-react-parser";

interface INavbar {
  items?: MenuI;
}

export default function Navbar({ items }: INavbar) {
  const location = useLocation();
  const { width, height } = useWindowSize();

  if (width && width >= 992) {
    if (location.pathname === "/home") {
      return (
        <nav className="c-app__nav" style={{ position: "absolute" }}>
          <img className="c-nav__logo" src={Logo} alt="KAJ Logo" />
          <ul className="c-nav__list">
            {items?.items.map(({ object_slug, title, id, children }) => {
              if (children && title !== "Praktisch") {
                return (
                  <DropdownButton
                    slug={object_slug}
                    title={title}
                    items={children}
                    color={"white"}
                    backgroundColor={"none"}
                  />
                );
              }
              return (
                // <li className="c-nav__item" key={id}>
                <NavLink
                  activeClassName="active"
                  style={{ color: "white", opacity: 0.5 }}
                  activeStyle={{ opacity: 1 }}
                  className="c-nav__item"
                  to={`/${object_slug}`}
                >
                  {parse(title)}
                </NavLink>
                // </li>
              );
            })}
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="c-app__nav backgroundcolor">
          <Link to="/home">
            <img className="c-nav__logo" src={Logo} alt="KAJ Logo" />
          </Link>
          <ul className="c-nav__list">
            {items?.items.map(({ object_slug, title, id, children }) => {
              if (children && title !== "Praktisch") {
                return (
                  <DropdownButton
                    slug={object_slug}
                    title={title}
                    items={children}
                  />
                );
              }
              return (
                // <li className="c-nav__item" key={id}>
                <NavLink
                  activeClassName="active"
                  className="c-nav__item"
                  to={`/${object_slug}`}
                >
                  {parse(title)}
                </NavLink>
                // </li>
              );
            })}
          </ul>
        </nav>
      );
    }
  } else {
    return <Burger items={items} />;
  }
}
