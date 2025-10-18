import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { colors } from 'Utils/colors';
import parse from 'html-react-parser';

interface IDropdownButton {
  title: string;
  items: any[];
  slug: string;
  backgroundColor?: string;
  color?: string;
  mobile?: boolean;
  onClick?: () => void;
}

function DropdownButton({
  title,
  items,
  slug,
  backgroundColor = colors.primaryDark,
  color,
  mobile,
  onClick,
}: IDropdownButton) {
  const [toggleList, setToggleList] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes(title)) {
      setToggleList(false);
    }
  }, [location, title]);

  return (
    <>
      <li className='c-nav__item'>
        <button
          className='o-button-reset c-nav__link'
          style={color && !mobile ? { color, opacity: 0.5 } : undefined}
          onClick={() => setToggleList(!toggleList)}>
          {parse(title)}
        </button>
        {toggleList && (
          <ul
            style={{ backgroundColor: backgroundColor }}
            className='c-nav__dropdownlist'>
            {items.map((item, index) => (
              <li
                key={item.id || item.object_slug || index}
                className='c-nav__dropdown-item'
                style={
                  location.pathname === '/home' && !mobile
                    ? { opacity: 0.5 }
                    : undefined
                }>
                <NavLink
                  className='c-nav__link'
                  to={`/${slug}/${item.object_slug}`}
                  style={{ color }}
                  onClick={onClick}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
}

export default DropdownButton;
