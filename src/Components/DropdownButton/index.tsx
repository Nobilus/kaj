import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { colors } from "Utils/colors";

interface IDropdownButton {
  title: string;
  items: any[];
  slug: string;
  backgroundColor?: string;
}

function DropdownButton({
  title,
  items,
  slug,
  backgroundColor = colors.primaryDark,
}: IDropdownButton) {
  const [toggleList, setToggleList] = useState(false);
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (!location.pathname.includes(title)) {
      setToggleList(false);
    }
  }, [location]);

  return (
    <li className="c-nav__item">
      <button
        className="o-button-reset c-nav__link"
        onClick={() => setToggleList(!toggleList)}
      >
        {title}
        {toggleList && (
          <ul
            style={{ backgroundColor: backgroundColor }}
            className="c-nav__dropdownlist"
          >
            {items.map((item, index) => (
              <li className="c-nav__dropdown-item">
                <NavLink
                  className="c-nav__link"
                  key={index}
                  to={`/${slug}/${item.object_slug}`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </button>
    </li>
  );
}

export default DropdownButton;
