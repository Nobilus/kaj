import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/locations"}>Locations</Link>
          </li>
          <li>
            <Link to={"/graphs"}>Graphs</Link>
          </li>
          <li>
            <Link to={"/settings"}>Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
