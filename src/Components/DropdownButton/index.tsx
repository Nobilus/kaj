import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface IDropdownButton {
  title: string;
  items: any[];
  slug: string;
}

function DropdownButton({ title, items, slug }: IDropdownButton) {
  const [toggleList, setToggleList] = useState(false);
  return (
    <li className="c-nav__item">
      <button
        className="o-button-reset"
        onClick={() => setToggleList(!toggleList)}
      >
        <div className="c-nav__link">
          {title}
          {toggleList && (
            <div className="c-nav__dropdownlist" role="list">
              {items.map((item, index) => (
                <NavLink
                  key={index}
                  className="c-nav__link"
                  to={`/${slug}/${item.object_slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </button>
    </li>
  );
}

export default DropdownButton;
