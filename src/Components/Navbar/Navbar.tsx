import React from "react";
import { Link } from "react-router-dom";
import { MenuI } from "Utils/Types/menuItems";

interface INavbar {
  items?: MenuI;
}

export default function Navbar({ items }: INavbar) {
  return (
    <nav className="c-app__nav">
      <ul>
        {items?.items.map(({ object_slug, title, id }) => {
          return (
            <li key={id}>
              <Link to={"/" + { object_slug }}>{title}</Link>
            </li>
          );
        })}
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/praktisch"}>Praktisch</Link>
        </li>
        <li>
          <Link to={"/themas"}>Thema's</Link>
        </li>
        <li>
          <Link to={"/kernenergie"}>Kernenergie</Link>
        </li>
        <li>
          <Link to={"/shop"}>Shop</Link>
        </li>
        <li>
          <Link to={"/afdelingen"}>Afdelingen</Link>
        </li>
        <li>
          <Link to={"/over-ons"}>Over ons</Link>
        </li>
        <li>
          <Link to={"/ons-team"}>Ons team</Link>
        </li>
      </ul>
    </nav>
  );
}
