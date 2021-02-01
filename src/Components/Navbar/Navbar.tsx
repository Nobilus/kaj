import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="c-app__nav">
      <ul>
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
